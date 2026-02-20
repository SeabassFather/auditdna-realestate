// ================================================================
// INTERNAL STAFF MESSENGER — AuditDNA Platform v2.1
// C:\AuditDNA\auditdna-realestate\backend\routes\Internal-messenger.js
//
// ══ POOL LEAK FIX ══
// ROOT CAUSE: GET /presence ran a write UPDATE on every 5-second poll.
// Every pool.query() in Express was triggering pool.on('connect'),
// meaning ~12+ new connections/minute from one user alone.
//
// FIX: Stale-user sweep moved to setInterval(2min) — runs once
//      server-wide, not per request. GET /presence is now pure READ.
//      POST /presence heartbeat interval should be 60s not 5s.
//
// ══ DOUBLE-MOUNT FIX ══
// Server log showed duplicate requests at identical timestamps.
// React StrictMode double-invokes useEffect — frontend InternalMessenger
// must use a ref guard. See comment at bottom of this file.
// ================================================================

const express = require('express');
const router  = express.Router();
const crypto  = require('crypto');
const { pool } = require('../server');

// ── Bootstrap tables ─────────────────────────────────────────
async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS im_channels (
      id          SERIAL PRIMARY KEY,
      channel_id  VARCHAR(60) UNIQUE NOT NULL,
      type        VARCHAR(20) NOT NULL DEFAULT 'group',
      name        VARCHAR(150),
      description TEXT,
      created_by  VARCHAR(150),
      members     JSONB DEFAULT '[]',
      pinned      BOOLEAN DEFAULT false,
      archived    BOOLEAN DEFAULT false,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS im_messages (
      id            SERIAL PRIMARY KEY,
      channel_id    VARCHAR(60) NOT NULL,
      sender_email  VARCHAR(200) NOT NULL,
      sender_name   VARCHAR(150) NOT NULL,
      sender_role   VARCHAR(50),
      content       TEXT NOT NULL,
      msg_type      VARCHAR(30) DEFAULT 'text',
      attachments   JSONB DEFAULT '[]',
      data_payload  JSONB,
      reactions     JSONB DEFAULT '{}',
      edited        BOOLEAN DEFAULT false,
      edited_at     TIMESTAMPTZ,
      deleted       BOOLEAN DEFAULT false,
      read_by       JSONB DEFAULT '[]',
      created_at    TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS im_presence (
      email       VARCHAR(200) PRIMARY KEY,
      name        VARCHAR(150),
      role        VARCHAR(50),
      status      VARCHAR(20) DEFAULT 'offline',
      last_seen   TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS im_notifications (
      id              SERIAL PRIMARY KEY,
      recipient_email VARCHAR(200) NOT NULL,
      channel_id      VARCHAR(60),
      message_id      INTEGER,
      type            VARCHAR(30) DEFAULT 'message',
      read            BOOLEAN DEFAULT false,
      created_at      TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_im_msgs_channel     ON im_messages(channel_id);
    CREATE INDEX IF NOT EXISTS idx_im_msgs_created     ON im_messages(created_at);
    CREATE INDEX IF NOT EXISTS idx_im_notifs_recipient ON im_notifications(recipient_email, read);
    CREATE INDEX IF NOT EXISTS idx_im_presence_status  ON im_presence(status);

    INSERT INTO im_channels (channel_id, type, name, description, created_by)
    SELECT 'ch_general','group','# General','Company-wide announcements','system'
    WHERE NOT EXISTS (SELECT 1 FROM im_channels WHERE channel_id='ch_general');

    INSERT INTO im_channels (channel_id, type, name, description, created_by)
    SELECT 'ch_sales','group','# Sales Team','Sales leads, deals, commissions','system'
    WHERE NOT EXISTS (SELECT 1 FROM im_channels WHERE channel_id='ch_sales');

    INSERT INTO im_channels (channel_id, type, name, description, created_by)
    SELECT 'ch_admin','group','# Admin','Admin operations and platform management','system'
    WHERE NOT EXISTS (SELECT 1 FROM im_channels WHERE channel_id='ch_admin');

    INSERT INTO im_channels (channel_id, type, name, description, created_by)
    SELECT 'ch_agents','group','# RE Agents','Real estate agent coordination','system'
    WHERE NOT EXISTS (SELECT 1 FROM im_channels WHERE channel_id='ch_agents');

    INSERT INTO im_channels (channel_id, type, name, description, created_by)
    SELECT 'ch_mortgage','group','# Mortgage Audit','Audit cases and consumer updates','system'
    WHERE NOT EXISTS (SELECT 1 FROM im_channels WHERE channel_id='ch_mortgage');

    INSERT INTO im_channels (channel_id, type, name, description, created_by)
    SELECT 'ch_alerts','broadcast','# System Alerts','Automated system alerts','system'
    WHERE NOT EXISTS (SELECT 1 FROM im_channels WHERE channel_id='ch_alerts');
  `);
  console.log('✅ [MESSENGER] Internal staff messenger tables ready');
}
ensureTables().catch(console.error);

// ══════════════════════════════════════════════════════════════
// ✅ POOL LEAK FIX — Stale presence sweep runs on a timer,
// NOT inside GET /presence. This is the only change needed
// to stop the ✅ POSTGRESQL CONNECTED! spam in your logs.
// ══════════════════════════════════════════════════════════════
setInterval(async () => {
  try {
    const { rowCount } = await pool.query(`
      UPDATE im_presence
      SET    status='offline', updated_at=NOW()
      WHERE  updated_at < NOW() - INTERVAL '2 minutes'
        AND  status != 'offline'
    `);
    if (rowCount > 0) {
      console.log(`[MESSENGER] Marked ${rowCount} user(s) offline`);
    }
  } catch (e) {
    console.error('[MESSENGER] Stale sweep error:', e.message);
  }
}, 2 * 60 * 1000); // every 2 minutes

// ── Helper ────────────────────────────────────────────────────
function dmId(a, b) {
  return 'dm_' + [a, b].sort().join('__').replace(/[@.]/g, '_');
}

// ================================================================
// CHANNELS
// ================================================================

router.get('/channels', async (req, res) => {
  const { email } = req.query;
  try {
    const result = await pool.query(`
      SELECT c.*,
        (SELECT COUNT(*) FROM im_messages m
         WHERE m.channel_id=c.channel_id AND NOT m.deleted)             AS message_count,
        (SELECT COUNT(*) FROM im_notifications n
         WHERE n.recipient_email=$1
           AND n.channel_id=c.channel_id AND NOT n.read)                AS unread_count,
        (SELECT row_to_json(lm) FROM (
          SELECT content, sender_name, created_at FROM im_messages
          WHERE channel_id=c.channel_id AND NOT deleted
          ORDER BY created_at DESC LIMIT 1
        ) lm)                                                            AS last_message
      FROM im_channels c
      WHERE NOT c.archived
      ORDER BY c.pinned DESC, c.updated_at DESC
    `, [email || '']);
    res.json({ success: true, channels: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/channels', async (req, res) => {
  const { type, name, description, createdBy, members, targetEmail } = req.body;
  try {
    let channelId, channelName;
    if (type === 'direct') {
      if (!targetEmail || !createdBy)
        return res.status(400).json({ error: 'createdBy and targetEmail required for DM' });
      channelId   = dmId(createdBy, targetEmail);
      channelName = `DM: ${createdBy} & ${targetEmail}`;
    } else {
      channelId   = 'ch_' + crypto.randomBytes(6).toString('hex');
      channelName = name || 'New Channel';
    }
    const result = await pool.query(`
      INSERT INTO im_channels (channel_id, type, name, description, created_by, members)
      VALUES ($1,$2,$3,$4,$5,$6)
      ON CONFLICT (channel_id) DO UPDATE SET updated_at=NOW()
      RETURNING *
    `, [channelId, type||'group', channelName, description||null,
        createdBy||'system', JSON.stringify(members||[])]);
    res.json({ success: true, channel: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================================================
// MESSAGES
// ================================================================

router.get('/:channelId/messages', async (req, res) => {
  const limit  = Math.min(parseInt(req.query.limit) || 50, 200);
  const before = req.query.before || null;
  try {
    const params = [req.params.channelId, limit];
    if (before) params.push(before);
    const { rows } = await pool.query(`
      SELECT * FROM im_messages
      WHERE channel_id=$1 AND NOT deleted
        ${before ? 'AND created_at < $3' : ''}
      ORDER BY created_at DESC LIMIT $2
    `, params);

    // Mark notifications read — fire & forget, don't block response
    if (req.query.email) {
      pool.query(
        `UPDATE im_notifications SET read=true WHERE recipient_email=$1 AND channel_id=$2`,
        [req.query.email, req.params.channelId]
      ).catch(() => {});
    }

    res.json({ success: true, messages: rows.reverse() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:channelId/messages', async (req, res) => {
  const { senderEmail, senderName, senderRole, content, msgType, attachments, dataPayload } = req.body;
  if (!senderEmail || !content)
    return res.status(400).json({ error: 'senderEmail and content required' });
  try {
    const { rows } = await pool.query(`
      INSERT INTO im_messages
        (channel_id, sender_email, sender_name, sender_role, content, msg_type, attachments, data_payload)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
    `, [req.params.channelId, senderEmail, senderName, senderRole||'staff',
        content, msgType||'text',
        JSON.stringify(attachments||[]),
        dataPayload ? JSON.stringify(dataPayload) : null]);

    // Update channel timestamp — fire & forget
    pool.query('UPDATE im_channels SET updated_at=NOW() WHERE channel_id=$1',
      [req.params.channelId]).catch(() => {});

    // Notify members — fire & forget, non-blocking
    pool.query('SELECT members FROM im_channels WHERE channel_id=$1', [req.params.channelId])
      .then(ch => {
        const members = ch.rows[0]?.members || [];
        for (const m of members) {
          if (m.email && m.email !== senderEmail) {
            pool.query(
              `INSERT INTO im_notifications (recipient_email, channel_id, message_id, type)
               VALUES ($1,$2,$3,'message')`,
              [m.email, req.params.channelId, rows[0].id]
            ).catch(() => {});
          }
        }
      }).catch(() => {});

    res.json({ success: true, message: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:channelId/messages/:msgId/react', async (req, res) => {
  const { emoji, userEmail } = req.body;
  try {
    const { rows } = await pool.query('SELECT reactions FROM im_messages WHERE id=$1', [req.params.msgId]);
    if (!rows.length) return res.status(404).json({ error: 'Message not found' });
    const reactions = rows[0].reactions || {};
    if (!reactions[emoji]) reactions[emoji] = [];
    const idx = reactions[emoji].indexOf(userEmail);
    if (idx > -1) reactions[emoji].splice(idx, 1);
    else reactions[emoji].push(userEmail);
    if (!reactions[emoji].length) delete reactions[emoji];
    await pool.query('UPDATE im_messages SET reactions=$1 WHERE id=$2',
      [JSON.stringify(reactions), req.params.msgId]);
    res.json({ success: true, reactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:channelId/messages/:msgId', async (req, res) => {
  try {
    await pool.query('UPDATE im_messages SET deleted=true WHERE id=$1 AND channel_id=$2',
      [req.params.msgId, req.params.channelId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================================================
// PRESENCE
// ══ GET /presence is now a PURE READ — zero writes ══
// The stale-user sweep above handles the UPDATE via setInterval.
// ================================================================

// POST /presence — client heartbeat (set this to 60s, not 5s!)
router.post('/presence', async (req, res) => {
  const { email, name, role, status } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  try {
    await pool.query(`
      INSERT INTO im_presence (email, name, role, status, last_seen, updated_at)
      VALUES ($1,$2,$3,$4,NOW(),NOW())
      ON CONFLICT (email) DO UPDATE SET
        status=EXCLUDED.status, last_seen=NOW(), updated_at=NOW(),
        name=EXCLUDED.name, role=EXCLUDED.role
    `, [email, name||email, role||'staff', status||'online']);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /presence — pure SELECT, no writes, no pool churn
router.get('/presence', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT email, name, role, status, last_seen FROM im_presence ORDER BY status, name`
    );
    res.json({ success: true, users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================================================
// NOTIFICATIONS
// ================================================================

router.get('/notifications/:email', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT n.*, m.content, m.sender_name, c.name AS channel_name
      FROM im_notifications n
      LEFT JOIN im_messages m ON m.id=n.message_id
      LEFT JOIN im_channels c ON c.channel_id=n.channel_id
      WHERE n.recipient_email=$1 AND NOT n.read
      ORDER BY n.created_at DESC LIMIT 20
    `, [req.params.email]);
    res.json({ success: true, notifications: rows, unreadCount: rows.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/notifications/:email/read-all', async (req, res) => {
  try {
    await pool.query('UPDATE im_notifications SET read=true WHERE recipient_email=$1', [req.params.email]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// ================================================================
// FRONTEND FIX NEEDED — InternalMessenger.jsx (or wherever polling lives)
//
// React StrictMode double-invokes useEffect in dev, causing 2x requests.
// The duplicate log entries (same timestamp, same endpoint) confirm this.
//
// Fix pattern:
//   const pollingRef = useRef(false);
//   useEffect(() => {
//     if (pollingRef.current) return;   // guard against double-mount
//     pollingRef.current = true;
//
//     const interval = setInterval(fetchPresence, 60000); // 60s not 5s
//     fetchPresence(); // immediate first call
//     return () => { clearInterval(interval); pollingRef.current = false; };
//   }, []);
//
// Also change POST /presence heartbeat from 5s → 60s in the frontend.
// 5-second presence heartbeats on a REST API are overkill — 60s is fine.
// ================================================================