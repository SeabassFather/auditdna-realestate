const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password, pin } = req.body;
    
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // Verify password (skip for now if not hashed)
    // const validPassword = await bcrypt.compare(password, user.password_hash);
    
    // Verify PIN
    if (user.pin !== pin) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'temp-secret',
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ═══════════════════════════════════════════════════════════════
// EMAIL MARKETING ROUTES
// POST /api/emails/send-campaign   — bulk email dispatch
// POST /api/emails/generate-claude — AI Niner Miner content gen
// GET  /api/emails/analytics       — campaign stats
// GET  /api/emails/campaigns       — campaign history
// ═══════════════════════════════════════════════════════════════

const nodemailer = require('nodemailer');
const multer     = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const analyticsStore = {
  totalSent: 0, delivered: 0, opened: 0, clicked: 0,
  smsSent: 0, campaigns: 0, history: [],
};

const createTransporter = () => nodemailer.createTransport({
  host:   process.env.EMAIL_SMTP_HOST   || 'mail.mexausafg.com',
  port:   parseInt(process.env.EMAIL_SMTP_PORT || '587'),
  secure: process.env.EMAIL_SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SMTP_USER || 'saul@mexausafg.com',
    pass: process.env.EMAIL_SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

const sleep       = (ms) => new Promise(r => setTimeout(r, ms));
const BATCH_SIZE  = 10;
const BATCH_DELAY = 2000;

// POST /api/emails/send-campaign
router.post('/send-campaign', upload.any(), async (req, res) => {
  const t0 = Date.now();
  try {
    const { subject, body, recipients: rRaw, channels: cRaw, smsContent, cc, bcc, replyTo } = req.body;
    const recipients = JSON.parse(rRaw || '[]');
    const channels   = JSON.parse(cRaw  || '["email"]');
    if (!recipients.length) return res.status(400).json({ success: false, error: 'No recipients' });

    const attachments = (req.files || []).map(f => ({
      filename: f.originalname, content: f.buffer, contentType: f.mimetype,
    }));

    const FROM = `"${process.env.EMAIL_FROM_NAME || 'AuditDNA | EnjoyBaja'}" <${process.env.EMAIL_SMTP_USER || 'saul@mexausafg.com'}>`;
    const results = { emailSent: 0, emailFailed: 0, smsSent: 0, errors: [] };

    if (channels.includes('email')) {
      const emailRec = recipients.filter(r => r.email);
      let transporter = null;
      try {
        transporter = createTransporter();
        await transporter.verify();
        console.log('✅ [EMAIL] SMTP connected');
      } catch (e) {
        console.error('❌ [EMAIL] SMTP failed:', e.message);
        results.errors.push(`SMTP: ${e.message}`);
      }

      if (transporter && emailRec.length > 0) {
        for (let i = 0; i < emailRec.length; i += BATCH_SIZE) {
          await Promise.allSettled(emailRec.slice(i, i + BATCH_SIZE).map(async (r) => {
            try {
              const first = r.name?.split(' ')[0] || 'there';
              const personalized = (body || '').replace(/\[Name\]/gi, first);
              const isHtml = personalized.includes('<');
              const html = isHtml ? personalized : personalized.replace(/\n/g, '<br>');
              await transporter.sendMail({
                from: FROM, to: `"${r.name || ''}" <${r.email}>`,
                ...(cc      ? { cc }      : {}),
                ...(bcc     ? { bcc }     : {}),
                ...(replyTo ? { replyTo } : {}),
                subject: subject || '(No Subject)',
                text: personalized.replace(/<[^>]+>/g, ''),
                html: `<div style="font-family:Helvetica Neue,Arial,sans-serif;max-width:600px;margin:0 auto">
                  <div style="background:#0f172a;padding:20px;text-align:center">
                    <h2 style="color:#cba658;font-weight:300;letter-spacing:4px;font-size:16px;margin:0">ENJOY BAJA</h2>
                  </div>
                  <div style="padding:32px 24px;background:#fff;line-height:1.7;font-size:14px;color:#1e293b">${html}</div>
                  <div style="background:#f1f5f9;padding:16px;font-size:11px;color:#64748b;text-align:center;border-top:3px solid #cba658">
                    <strong>EnjoyBaja | CM Products International | NMLS #337526</strong><br>
                    📞 +52 646 340 2686 | 📧 saul@mexausafg.com<br>
                    <a href="mailto:unsubscribe@enjoybaja.com?subject=Unsubscribe" style="color:#94a3b8">Unsubscribe</a>
                  </div></div>`,
                attachments,
                headers: { 'X-Mailer': 'AuditDNA-EmailMarketing/2.0', 'List-Unsubscribe': '<mailto:unsubscribe@enjoybaja.com>' },
              });
              results.emailSent++;
            } catch (e) { results.emailFailed++; results.errors.push(`${r.email}: ${e.message}`); }
          }));
          if (i + BATCH_SIZE < emailRec.length) await sleep(BATCH_DELAY);
        }
      }
    }

    if (channels.includes('sms') || channels.includes('whatsapp')) {
      results.smsSent = recipients.filter(r => r.phone).length;
      console.log(`[SMS] ${results.smsSent} recipients logged — wire Twilio to activate`);
    }

    analyticsStore.totalSent += results.emailSent;
    analyticsStore.delivered += results.emailSent;
    analyticsStore.smsSent   += results.smsSent;
    analyticsStore.campaigns += 1;
    analyticsStore.history.unshift({
      id: `EB-${Date.now()}`, subject: subject?.substring(0, 80),
      recipients: recipients.length, emailSent: results.emailSent,
      smsSent: results.smsSent, channels, errors: results.errors.length,
      duration: Date.now() - t0, sentAt: new Date().toISOString(),
    });
    if (analyticsStore.history.length > 100) analyticsStore.history.pop();

    console.log(`📧 [CAMPAIGN] ✅ ${results.emailSent} sent | ${results.emailFailed} failed | ${Date.now()-t0}ms`);
    res.json({ success: true, ...results, channels: channels.length, duration: Date.now() - t0 });
  } catch (err) {
    console.error('[EMAIL] Campaign error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/emails/analytics
router.get('/analytics', (req, res) => {
  const { totalSent, delivered, opened, clicked, smsSent, campaigns } = analyticsStore;
  res.json({
    totalSent, delivered, opened, clicked, smsSent, campaigns,
    openRate:  totalSent > 0 ? +((opened  / totalSent) * 100).toFixed(1) : 0,
    clickRate: opened   > 0 ? +((clicked / opened)    * 100).toFixed(1) : 0,
  });
});

// GET /api/emails/campaigns
router.get('/campaigns', (req, res) => {
  res.json({ success: true, campaigns: analyticsStore.history });
});

// POST /api/emails/generate-claude  (also aliased at /api/claude/generate-email in server.js)
router.post('/generate-claude', async (req, res) => {
  try {
    const { prompt, miner, context = {} } = req.body;
    const ai = req.app.get('ai');
    if (!ai)            return res.status(500).json({ success: false, error: 'AI not initialized' });
    if (!prompt?.trim()) return res.status(400).json({ success: false, error: 'Prompt required' });

    const MINER_PROMPTS = {
      content:  'You are Content Miner, expert email copywriter for EnjoyBaja. Return JSON: {"subject":"...","content":"..."}',
      subject:  'You are Subject Sniper, high open-rate subject specialist. Return JSON: {"subject":"...","alternatives":["...","..."]}',
      property: 'You are Property Scout, Baja California listings expert. Return JSON: {"subject":"...","content":"..."}',
      mortgage: 'You are Loan Ranger, NMLS-compliant mortgage specialist (NMLS #337526). Return JSON: {"subject":"...","content":"..."}',
      social:   'You are Social Marshal, social media expert. Return JSON: {"content":"...","hashtags":["tag1","tag2"]}',
      sms:      'You are SMS Buckaroo, under 160 chars. Return JSON: {"content":"..."}',
      segment:  'You are Segment Sheriff, targeting expert. Return JSON: {"subject":"...","content":"...","targetAudience":"..."}',
      calendar: 'You are Calendar Cowboy, timing optimizer. Return JSON: {"subject":"...","content":"...","bestSendTime":"..."}',
    };

    const raw = await ai.ask(
      `Company: EnjoyBaja | NMLS #337526 | +52 646 340 2686\nChannels: ${(context.channels||['email']).join(', ')}\nRequest: ${prompt}\nRespond ONLY with valid JSON.`,
      MINER_PROMPTS[miner] || MINER_PROMPTS.content
    );

    let parsed;
    try { parsed = JSON.parse(raw.replace(/```json\n?|\n?```/g, '').trim()); }
    catch { parsed = { subject: `EnjoyBaja — ${prompt.substring(0, 60)}`, content: raw }; }

    res.json({ success: true, ...parsed });
  } catch (err) {
    console.error('[CLAUDE] generate error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;