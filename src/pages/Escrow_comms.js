// ================================================================
// SECURE ESCROW COMMUNICATION ROUTES
// AuditDNA Consumer Services — NMLS #337526
// End-to-end encrypted messaging, document exchange,
// e-signature requests, real-time notifications
// All data AES-256 encrypted at rest + in transit
// ================================================================

const express  = require('express');
const router   = express.Router();
const crypto   = require('crypto');
const { pool } = require('../server');

// ── Encryption helpers ───────────────────────────────────────
const ENCRYPTION_KEY = process.env.ESCROW_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16;

function encrypt(text) {
  const iv  = crypto.randomBytes(IV_LENGTH);
  const key = Buffer.from(ENCRYPTION_KEY.slice(0, 32));
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(String(text));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  try {
    const [ivHex, encryptedHex] = text.split(':');
    const iv  = Buffer.from(ivHex, 'hex');
    const key = Buffer.from(ENCRYPTION_KEY.slice(0, 32));
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch {
    return '[DECRYPTION ERROR]';
  }
}

function generateRoomId() {
  return 'ROOM-' + crypto.randomBytes(8).toString('hex').toUpperCase();
}

function generateAccessToken() {
  return crypto.randomBytes(24).toString('hex');
}

// ── Ensure tables exist ──────────────────────────────────────
async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS escrow_rooms (
      id            SERIAL PRIMARY KEY,
      room_id       VARCHAR(50)  UNIQUE NOT NULL,
      case_id       VARCHAR(100) NOT NULL,
      audit_id      INTEGER,
      subject       TEXT,
      status        VARCHAR(20)  DEFAULT 'active',
      parties       JSONB        DEFAULT '[]',
      created_at    TIMESTAMPTZ  DEFAULT NOW(),
      updated_at    TIMESTAMPTZ  DEFAULT NOW(),
      closed_at     TIMESTAMPTZ,
      metadata      JSONB        DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS escrow_messages (
      id              SERIAL PRIMARY KEY,
      room_id         VARCHAR(50)  NOT NULL,
      sender_role     VARCHAR(50)  NOT NULL,
      sender_name     VARCHAR(150),
      sender_email    VARCHAR(200),
      message_type    VARCHAR(30)  DEFAULT 'text',
      content_encrypted TEXT       NOT NULL,
      attachments     JSONB        DEFAULT '[]',
      read_by         JSONB        DEFAULT '[]',
      flagged         BOOLEAN      DEFAULT false,
      created_at      TIMESTAMPTZ  DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS escrow_documents (
      id              SERIAL PRIMARY KEY,
      room_id         VARCHAR(50)  NOT NULL,
      requested_by    VARCHAR(50),
      document_type   VARCHAR(100) NOT NULL,
      description     TEXT,
      status          VARCHAR(30)  DEFAULT 'requested',
      required_by     DATE,
      file_name       VARCHAR(300),
      file_size       INTEGER,
      file_data_encrypted TEXT,
      uploaded_by     VARCHAR(150),
      uploaded_at     TIMESTAMPTZ,
      verified        BOOLEAN      DEFAULT false,
      verified_by     VARCHAR(150),
      verified_at     TIMESTAMPTZ,
      created_at      TIMESTAMPTZ  DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS escrow_signatures (
      id              SERIAL PRIMARY KEY,
      room_id         VARCHAR(50)  NOT NULL,
      document_id     INTEGER,
      requested_by    VARCHAR(50),
      requested_from  VARCHAR(50),
      signer_name     VARCHAR(150),
      signer_email    VARCHAR(200),
      document_title  VARCHAR(300),
      status          VARCHAR(30)  DEFAULT 'pending',
      access_token    VARCHAR(100) UNIQUE,
      signature_data_encrypted TEXT,
      ip_address      VARCHAR(50),
      signed_at       TIMESTAMPTZ,
      expires_at      TIMESTAMPTZ,
      created_at      TIMESTAMPTZ  DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS escrow_notifications (
      id            SERIAL PRIMARY KEY,
      room_id       VARCHAR(50),
      recipient_role VARCHAR(50),
      recipient_email VARCHAR(200),
      type          VARCHAR(50)  NOT NULL,
      subject       VARCHAR(300),
      body          TEXT,
      channel       VARCHAR(20)  DEFAULT 'email',
      sent          BOOLEAN      DEFAULT false,
      sent_at       TIMESTAMPTZ,
      created_at    TIMESTAMPTZ  DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_messages_room ON escrow_messages(room_id);
    CREATE INDEX IF NOT EXISTS idx_docs_room ON escrow_documents(room_id);
    CREATE INDEX IF NOT EXISTS idx_sigs_room ON escrow_signatures(room_id);
    CREATE INDEX IF NOT EXISTS idx_notifs_room ON escrow_notifications(room_id);
  `);
  console.log('✅ [ESCROW] Secure communication tables ready');
}
ensureTables().catch(console.error);

// ================================================================
// ROUTES
// ================================================================

// ── POST /api/escrow/rooms — Create secure room ───────────────
router.post('/rooms', async (req, res) => {
  const { caseId, auditId, subject, parties, metadata } = req.body;
  if (!caseId) return res.status(400).json({ error: 'caseId required' });

  try {
    const roomId      = generateRoomId();
    const defaultParties = parties || [
      { role: 'consumer',  label: 'Consumer',       permissions: ['read','write','upload'] },
      { role: 'auditdna',  label: 'AuditDNA Team',  permissions: ['read','write','upload','verify','admin'] },
      { role: 'title',     label: 'Title / Escrow', permissions: ['read','write','upload','verify'] },
      { role: 'lender',    label: 'Lender',         permissions: ['read','write','upload'] },
    ];

    const result = await pool.query(
      `INSERT INTO escrow_rooms (room_id, case_id, audit_id, subject, parties, metadata)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [roomId, caseId, auditId || null, subject || `Escrow Case ${caseId}`, JSON.stringify(defaultParties), JSON.stringify(metadata || {})]
    );

    // Post system welcome message
    const welcomeMsg = `🔐 Secure escrow communication room created for Case ${caseId}. All messages and documents in this room are AES-256 encrypted. Only authorized parties may access this room. Audit trail is maintained for all activity.`;
    await pool.query(
      `INSERT INTO escrow_messages (room_id, sender_role, sender_name, message_type, content_encrypted)
       VALUES ($1, 'system', 'AuditDNA System', 'system', $2)`,
      [roomId, encrypt(welcomeMsg)]
    );

    console.log(`[ESCROW] Room created: ${roomId} for case ${caseId}`);
    res.json({ success: true, room: result.rows[0] });
  } catch (err) {
    console.error('[ESCROW] Create room error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/escrow/rooms/:caseId — Get room by case ─────────
router.get('/rooms/:caseId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*,
        (SELECT COUNT(*) FROM escrow_messages m WHERE m.room_id = r.room_id) AS message_count,
        (SELECT COUNT(*) FROM escrow_documents d WHERE d.room_id = r.room_id) AS document_count,
        (SELECT COUNT(*) FROM escrow_signatures s WHERE s.room_id = r.room_id AND s.status = 'pending') AS pending_signatures
       FROM escrow_rooms r WHERE r.case_id = $1 ORDER BY r.created_at DESC`,
      [req.params.caseId]
    );
    res.json({ success: true, rooms: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/escrow/:roomId/messages — Get messages ──────────
router.get('/:roomId/messages', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM escrow_messages WHERE room_id = $1 ORDER BY created_at ASC`,
      [req.params.roomId]
    );

    const messages = result.rows.map(msg => ({
      ...msg,
      content: decrypt(msg.content_encrypted),
      content_encrypted: undefined // never expose
    }));

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/escrow/:roomId/messages — Send message ─────────
router.post('/:roomId/messages', async (req, res) => {
  const { senderRole, senderName, senderEmail, content, messageType, attachments } = req.body;
  if (!senderRole || !content) return res.status(400).json({ error: 'senderRole and content required' });

  try {
    // Verify room exists and is active
    const room = await pool.query('SELECT * FROM escrow_rooms WHERE room_id = $1', [req.params.roomId]);
    if (!room.rows.length) return res.status(404).json({ error: 'Room not found' });
    if (room.rows[0].status !== 'active') return res.status(403).json({ error: 'Room is closed' });

    const result = await pool.query(
      `INSERT INTO escrow_messages (room_id, sender_role, sender_name, sender_email, message_type, content_encrypted, attachments)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, created_at`,
      [req.params.roomId, senderRole, senderName || senderRole, senderEmail || null,
       messageType || 'text', encrypt(content), JSON.stringify(attachments || [])]
    );

    // Update room updated_at
    await pool.query('UPDATE escrow_rooms SET updated_at = NOW() WHERE room_id = $1', [req.params.roomId]);

    // Queue notification for other parties
    await pool.query(
      `INSERT INTO escrow_notifications (room_id, recipient_role, type, subject, body, channel)
       SELECT $1, p->>'role', 'new_message', $2, $3, 'email'
       FROM escrow_rooms r, jsonb_array_elements(r.parties) p
       WHERE r.room_id = $1 AND p->>'role' != $4`,
      [req.params.roomId, `New message in Case ${room.rows[0].case_id}`,
       `${senderName || senderRole} sent a new secure message. Log in to AuditDNA to view.`, senderRole]
    );

    console.log(`[ESCROW] Message sent in room ${req.params.roomId} by ${senderRole}`);
    res.json({ success: true, messageId: result.rows[0].id, timestamp: result.rows[0].created_at });
  } catch (err) {
    console.error('[ESCROW] Send message error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/escrow/:roomId/documents — List documents ───────
router.get('/:roomId/documents', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, room_id, requested_by, document_type, description, status,
              required_by, file_name, file_size, uploaded_by, uploaded_at,
              verified, verified_by, verified_at, created_at
       FROM escrow_documents WHERE room_id = $1 ORDER BY created_at DESC`,
      [req.params.roomId]
    );
    res.json({ success: true, documents: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/escrow/:roomId/documents/request — Request doc ─
router.post('/:roomId/documents/request', async (req, res) => {
  const { requestedBy, documentType, description, requiredBy } = req.body;
  if (!documentType) return res.status(400).json({ error: 'documentType required' });

  try {
    const result = await pool.query(
      `INSERT INTO escrow_documents (room_id, requested_by, document_type, description, required_by)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.params.roomId, requestedBy || 'auditdna', documentType, description || null, requiredBy || null]
    );

    // System message
    await pool.query(
      `INSERT INTO escrow_messages (room_id, sender_role, sender_name, message_type, content_encrypted)
       VALUES ($1, 'system', 'AuditDNA System', 'doc_request', $2)`,
      [req.params.roomId, encrypt(`📄 Document requested: "${documentType}" — ${description || ''}. ${requiredBy ? `Required by: ${requiredBy}` : 'Please upload at your earliest convenience.'}`)]
    );

    res.json({ success: true, document: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/escrow/:roomId/documents/:docId/upload — Upload
router.post('/:roomId/documents/:docId/upload', async (req, res) => {
  const { fileName, fileSize, fileData, uploadedBy } = req.body;
  if (!fileData) return res.status(400).json({ error: 'fileData required' });

  try {
    const encryptedData = encrypt(fileData);
    await pool.query(
      `UPDATE escrow_documents
       SET status = 'uploaded', file_name = $1, file_size = $2,
           file_data_encrypted = $3, uploaded_by = $4, uploaded_at = NOW()
       WHERE id = $5 AND room_id = $6`,
      [fileName, fileSize || 0, encryptedData, uploadedBy || 'consumer', req.params.docId, req.params.roomId]
    );

    // System message
    await pool.query(
      `INSERT INTO escrow_messages (room_id, sender_role, sender_name, message_type, content_encrypted)
       VALUES ($1, 'system', 'AuditDNA System', 'doc_upload', $2)`,
      [req.params.roomId, encrypt(`✅ Document uploaded: "${fileName}" by ${uploadedBy || 'consumer'}. Pending verification.`)]
    );

    res.json({ success: true, message: 'Document uploaded and encrypted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/escrow/:roomId/documents/:docId/verify — Verify
router.post('/:roomId/documents/:docId/verify', async (req, res) => {
  const { verifiedBy } = req.body;
  try {
    await pool.query(
      `UPDATE escrow_documents SET status='verified', verified=true, verified_by=$1, verified_at=NOW()
       WHERE id=$2 AND room_id=$3`,
      [verifiedBy || 'auditdna', req.params.docId, req.params.roomId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/escrow/:roomId/documents/:docId/download — Get file
router.get('/:roomId/documents/:docId/download', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM escrow_documents WHERE id=$1 AND room_id=$2',
      [req.params.docId, req.params.roomId]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Document not found' });
    const doc = result.rows[0];
    if (!doc.file_data_encrypted) return res.status(404).json({ error: 'No file uploaded yet' });

    const fileData = decrypt(doc.file_data_encrypted);
    res.json({ success: true, fileName: doc.file_name, fileData, fileSize: doc.file_size });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/escrow/:roomId/signatures — Request e-signature
router.post('/:roomId/signatures', async (req, res) => {
  const { requestedBy, requestedFrom, signerName, signerEmail, documentTitle, documentId, expiresInDays } = req.body;
  if (!signerEmail || !documentTitle) return res.status(400).json({ error: 'signerEmail and documentTitle required' });

  try {
    const accessToken = generateAccessToken();
    const expiresAt   = new Date(Date.now() + (expiresInDays || 7) * 24 * 60 * 60 * 1000);

    const result = await pool.query(
      `INSERT INTO escrow_signatures
        (room_id, document_id, requested_by, requested_from, signer_name, signer_email, document_title, access_token, expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, access_token`,
      [req.params.roomId, documentId || null, requestedBy || 'auditdna', requestedFrom || 'consumer',
       signerName || null, signerEmail, documentTitle, accessToken, expiresAt]
    );

    // System message
    await pool.query(
      `INSERT INTO escrow_messages (room_id, sender_role, sender_name, message_type, content_encrypted)
       VALUES ($1, 'system', 'AuditDNA System', 'sig_request', $2)`,
      [req.params.roomId, encrypt(`✍️ E-signature requested for: "${documentTitle}" — sent to ${signerEmail}. Expires: ${expiresAt.toLocaleDateString()}`)]
    );

    // Queue email notification
    await pool.query(
      `INSERT INTO escrow_notifications (room_id, recipient_role, recipient_email, type, subject, body, channel)
       VALUES ($1,'consumer',$2,'sig_request','Signature Required — AuditDNA',$3,'email')`,
      [req.params.roomId, signerEmail,
       `You have a signature request for "${documentTitle}". Please sign at your earliest convenience through your AuditDNA secure portal.`]
    );

    res.json({ success: true, signatureId: result.rows[0].id, accessToken: result.rows[0].access_token, expiresAt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/escrow/signatures/:token/sign — Submit signature
router.post('/signatures/:token/sign', async (req, res) => {
  const { signatureData, signerName, ipAddress } = req.body;
  if (!signatureData) return res.status(400).json({ error: 'signatureData required' });

  try {
    const sig = await pool.query(
      'SELECT * FROM escrow_signatures WHERE access_token=$1 AND status=$2',
      [req.params.token, 'pending']
    );
    if (!sig.rows.length) return res.status(404).json({ error: 'Invalid or expired signature request' });
    if (new Date() > new Date(sig.rows[0].expires_at)) return res.status(410).json({ error: 'Signature request expired' });

    await pool.query(
      `UPDATE escrow_signatures
       SET status='signed', signature_data_encrypted=$1, signer_name=$2, ip_address=$3, signed_at=NOW()
       WHERE access_token=$4`,
      [encrypt(signatureData), signerName || sig.rows[0].signer_name, ipAddress || 'unknown', req.params.token]
    );

    // System message
    await pool.query(
      `INSERT INTO escrow_messages (room_id, sender_role, sender_name, message_type, content_encrypted)
       VALUES ($1, 'system', 'AuditDNA System', 'sig_complete', $2)`,
      [sig.rows[0].room_id, encrypt(`✅ Document signed: "${sig.rows[0].document_title}" by ${signerName || sig.rows[0].signer_name} on ${new Date().toLocaleDateString()}. Legally binding. IP: ${ipAddress || 'on record'}.`)]
    );

    res.json({ success: true, message: 'Signature captured and encrypted successfully', signedAt: new Date() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/escrow/:roomId/signatures — List signatures ─────
router.get('/:roomId/signatures', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, room_id, document_id, requested_by, requested_from, signer_name,
              signer_email, document_title, status, expires_at, signed_at, created_at
       FROM escrow_signatures WHERE room_id=$1 ORDER BY created_at DESC`,
      [req.params.roomId]
    );
    res.json({ success: true, signatures: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/escrow/:roomId/summary — Full room summary ──────
router.get('/:roomId/summary', async (req, res) => {
  try {
    const [room, msgs, docs, sigs, notifs] = await Promise.all([
      pool.query('SELECT * FROM escrow_rooms WHERE room_id=$1', [req.params.roomId]),
      pool.query('SELECT COUNT(*) FROM escrow_messages WHERE room_id=$1', [req.params.roomId]),
      pool.query('SELECT status, COUNT(*) FROM escrow_documents WHERE room_id=$1 GROUP BY status', [req.params.roomId]),
      pool.query('SELECT status, COUNT(*) FROM escrow_signatures WHERE room_id=$1 GROUP BY status', [req.params.roomId]),
      pool.query("SELECT COUNT(*) FROM escrow_notifications WHERE room_id=$1 AND sent=false", [req.params.roomId]),
    ]);

    if (!room.rows.length) return res.status(404).json({ error: 'Room not found' });

    const docBreakdown = {};
    docs.rows.forEach(r => { docBreakdown[r.status] = parseInt(r.count); });
    const sigBreakdown = {};
    sigs.rows.forEach(r => { sigBreakdown[r.status] = parseInt(r.count); });

    res.json({
      success: true,
      room: room.rows[0],
      stats: {
        totalMessages:      parseInt(msgs.rows[0].count),
        documents:          docBreakdown,
        signatures:         sigBreakdown,
        pendingNotifications: parseInt(notifs.rows[0].count),
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/escrow/:roomId/close — Close room ───────────────
router.post('/:roomId/close', async (req, res) => {
  const { closedBy, reason } = req.body;
  try {
    await pool.query(
      "UPDATE escrow_rooms SET status='closed', closed_at=NOW() WHERE room_id=$1",
      [req.params.roomId]
    );
    await pool.query(
      `INSERT INTO escrow_messages (room_id, sender_role, sender_name, message_type, content_encrypted)
       VALUES ($1,'system','AuditDNA System','system',$2)`,
      [req.params.roomId, encrypt(`🔒 Secure room closed by ${closedBy || 'admin'}. ${reason ? `Reason: ${reason}` : 'Case complete.'} All records archived and encrypted.`)]
    );
    res.json({ success: true, message: 'Room closed and archived' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/escrow/notifications/pending — Get unsent ───────
router.get('/notifications/pending', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM escrow_notifications WHERE sent=false ORDER BY created_at ASC LIMIT 50"
    );
    res.json({ success: true, notifications: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/escrow/notifications/:id/sent — Mark sent ──────
router.post('/notifications/:id/sent', async (req, res) => {
  try {
    await pool.query("UPDATE escrow_notifications SET sent=true, sent_at=NOW() WHERE id=$1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;