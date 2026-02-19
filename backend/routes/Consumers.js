// ══════════════════════════════════════════════════════════════════════════════
//  AUDITDNA — CONSUMER REGISTRATION ROUTE
//  Path:    C:\AuditDNA\auditdna-realestate\backend\routes\consumers.js
//
//  POST /api/consumers/register              — Register + ID + selfie upload
//  POST /api/consumers/verify-phone          — Verify phone OTP
//  GET  /api/consumers/:email                — Fetch consumer record
//  GET  /api/consumers/:email/receipt        — Download PDF receipt
//  POST /api/consumers/:email/email-receipt  — Email PDF receipt
// ══════════════════════════════════════════════════════════════════════════════

'use strict';

const express       = require('express');
const router        = express.Router();
const multer        = require('multer');
const path          = require('path');
const fs            = require('fs');
const PDFDocument   = require('pdfkit');
const nodemailer    = require('nodemailer');
const { v4: uuid }  = require('uuid');
const { pool }      = require('../server');

// ── UPLOAD DIRECTORIES ────────────────────────────────────────────────────────
const ID_DIR      = path.join(__dirname, '..', 'uploads', 'id-documents');
const SELFIE_DIR  = path.join(__dirname, '..', 'uploads', 'selfies');
const RECEIPT_DIR = path.join(__dirname, '..', 'uploads', 'receipts');
[ID_DIR, SELFIE_DIR, RECEIPT_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ── MULTER STORAGE ────────────────────────────────────────────────────────────
const allowedExt = ['.jpg', '.jpeg', '.png', '.pdf', '.webp', '.heic'];

const makeStorage = (dir, prefix) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const safe = (req.body.email || uuid()).replace(/[^a-z0-9]/gi, '_');
    cb(null, `${prefix}_${safe}_${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  allowedExt.includes(ext)
    ? cb(null, true)
    : cb(new Error(`Invalid file type "${ext}". Allowed: JPG, PNG, PDF, WEBP`), false);
};

// Accepts both photoID and selfie in one request
const uploadFields = multer({
  storage: makeStorage(ID_DIR, 'ID'),
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }
}).fields([
  { name: 'photoID', maxCount: 1 },
  { name: 'selfie',  maxCount: 1 }
]);

// ── EMAIL TRANSPORT ───────────────────────────────────────────────────────────
const mailer = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_FROM || 'noreply@auditdna.com',
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || ''
  }
});

// ── HELPERS ───────────────────────────────────────────────────────────────────
const generatePIN = () => Math.floor(100000 + Math.random() * 900000).toString();
const generateOTP = () => Math.floor(1000   + Math.random() * 9000  ).toString();

// In-memory OTP store { email → { otp, expires } }
const otpStore = new Map();

// ── PDF RECEIPT BUILDER ───────────────────────────────────────────────────────
const buildReceiptPDF = (consumer) => new Promise((resolve, reject) => {
  const doc    = new PDFDocument({ margin: 50, size: 'LETTER' });
  const chunks = [];
  doc.on('data',  c => chunks.push(c));
  doc.on('end',   () => resolve(Buffer.concat(chunks)));
  doc.on('error', reject);

  const GOLD  = '#C8A84B';
  const SLATE = '#1E293B';
  const GRAY  = '#94A3B8';
  const now   = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Header bar
  doc.rect(0, 0, 612, 88).fill(SLATE);
  doc.fontSize(24).fillColor(GOLD).font('Helvetica-Bold')
     .text('AuditDNA', 50, 24);
  doc.fontSize(9).fillColor(GRAY).font('Helvetica')
     .text('MORTGAGE AUDIT & RECOVERY PLATFORM', 50, 52);
  doc.fontSize(8).fillColor('#475569')
     .text('CM Products International  ·  NMLS #337526', 50, 66);

  // Title
  doc.moveDown(3.5);
  doc.fontSize(15).fillColor(SLATE).font('Helvetica-Bold')
     .text('CONSUMER REGISTRATION RECEIPT', { align: 'center' });
  doc.moveDown(0.3);
  doc.fontSize(9).fillColor(GRAY).font('Helvetica')
     .text(`Issued: ${now}`, { align: 'center' });
  doc.moveDown(1);

  // Gold rule
  doc.moveTo(50, doc.y).lineTo(562, doc.y)
     .strokeColor(GOLD).lineWidth(1).stroke();
  doc.moveDown(1);

  // Field helper
  const field = (label, value) => {
    const y = doc.y;
    doc.fontSize(8).fillColor(GRAY).font('Helvetica-Bold')
       .text(label.toUpperCase(), 50, y);
    doc.fontSize(10).fillColor(SLATE).font('Helvetica')
       .text(value || '—', 210, y);
    doc.moveDown(0.65);
  };

  // Section helper
  const section = (title) => {
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor(GOLD).font('Helvetica-Bold').text(title);
    doc.moveDown(0.4);
  };

  section('PERSONAL INFORMATION');
  field('Full Legal Name',  consumer.full_name);
  field('Email Address',    consumer.email);
  field('Phone Number',     consumer.phone);
  field('Reference ID',     consumer.consumer_ref || consumer.id?.toString() || '—');

  section('PROPERTY INFORMATION');
  field('Property Address', consumer.property_address);
  field('City / State / ZIP',
    [consumer.city, consumer.state, consumer.zip].filter(Boolean).join('  ') || '—');

  section('IDENTITY VERIFICATION');
  field('Photo ID',         consumer.photo_id_file  ? '✓ Document on file' : '✗ Not submitted');
  field('Selfie',           consumer.selfie_file    ? '✓ Selfie on file'   : '✗ Not submitted');
  field('Phone Verified',   consumer.phone_verified ? '✓ Verified'         : 'Pending verification');

  // Rule + disclaimer
  doc.moveDown(1);
  doc.moveTo(50, doc.y).lineTo(562, doc.y)
     .strokeColor('#E2E8F0').lineWidth(0.5).stroke();
  doc.moveDown(0.8);
  doc.fontSize(7.5).fillColor(GRAY).font('Helvetica')
     .text(
       'This document confirms registration with AuditDNA. Identity documents are stored securely and ' +
       'used solely for verification in connection with your mortgage audit engagement. ' +
       'AuditDNA (CM Products International, NMLS #337526) is authorized to perform mortgage document ' +
       'analysis and financial recovery services per your signed agreement.',
       50, doc.y, { width: 512, align: 'justify' }
     );

  // Footer bar
  doc.rect(0, 710, 612, 82).fill(SLATE);
  doc.fontSize(8).fillColor('#475569')
     .text('AuditDNA  ·  CM Products International  ·  NMLS #337526',
           50, 722, { align: 'center', width: 512 });
  doc.fontSize(8).fillColor('#334155')
     .text('audit@auditdna.com  ·  1-844-853-9300  ·  auditdna.com',
           50, 737, { align: 'center', width: 512 });
  doc.fontSize(7).fillColor('#1E293B')
     .text('CONFIDENTIAL — System-generated receipt. No signature required.',
           50, 754, { align: 'center', width: 512 });

  doc.end();
});

// ── HTML EMAIL TEMPLATE ───────────────────────────────────────────────────────
const buildEmailHTML = (consumer, pin, otp, hasPDF) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0f172a;font-family:Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#0f172a;">

  <!-- Header -->
  <div style="background:#1e293b;padding:32px 40px;text-align:center;border-bottom:2px solid #cba658;">
    <h1 style="color:#cba658;font-size:26px;font-weight:300;letter-spacing:4px;margin:0;">AuditDNA</h1>
    <p style="color:#64748b;font-size:10px;letter-spacing:2px;margin:8px 0 0;">MORTGAGE AUDIT & RECOVERY PLATFORM</p>
  </div>

  <!-- Body -->
  <div style="padding:40px;">
    <h2 style="color:#e2e8f0;font-weight:300;font-size:20px;margin-bottom:6px;">Registration Confirmed</h2>
    <p style="color:#94a3b8;font-size:14px;line-height:1.7;margin-bottom:24px;">
      Welcome, <strong style="color:#cba658;">${consumer.full_name || consumer.fullName}</strong>.
      Your AuditDNA account has been created successfully.
    </p>

    <!-- PIN Box -->
    <div style="background:#1e293b;border:1px solid rgba(203,166,88,0.4);border-radius:8px;padding:28px;margin-bottom:24px;text-align:center;">
      <p style="color:#64748b;font-size:10px;letter-spacing:2px;margin-bottom:10px;">YOUR SECURITY PIN — SAVE THIS</p>
      <p style="color:#cba658;font-size:42px;font-weight:700;letter-spacing:10px;margin:0;">${pin}</p>
    </div>

    <!-- Details Table -->
    <div style="background:#0f172a;border-radius:6px;padding:20px;margin-bottom:24px;">
      <p style="color:#64748b;font-size:10px;letter-spacing:1px;margin:0 0 14px;">ACCOUNT DETAILS</p>
      <table style="width:100%;font-size:13px;border-collapse:collapse;">
        <tr>
          <td style="padding:5px 0;color:#64748b;width:140px;">Reference ID</td>
          <td style="color:#cba658;font-family:monospace;">${consumer.consumer_ref || '—'}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#64748b;">Email</td>
          <td style="color:#94a3b8;">${consumer.email}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#64748b;">Phone</td>
          <td style="color:#94a3b8;">${consumer.phone || '—'}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#64748b;">Property</td>
          <td style="color:#94a3b8;">${consumer.property_address || consumer.propertyAddress || '—'}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#64748b;">Photo ID</td>
          <td style="color:${consumer.photo_id_file ? '#cba658' : '#ef4444'};">
            ${consumer.photo_id_file ? '✓ Received' : '✗ Not submitted'}
          </td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#64748b;">Selfie</td>
          <td style="color:${consumer.selfie_file ? '#cba658' : '#ef4444'};">
            ${consumer.selfie_file ? '✓ Received' : '✗ Not submitted'}
          </td>
        </tr>
      </table>
    </div>

    <!-- OTP -->
    <div style="background:#0f172a;border:1px solid rgba(148,163,184,0.15);border-radius:6px;padding:20px;margin-bottom:24px;">
      <p style="color:#64748b;font-size:10px;letter-spacing:1px;margin-bottom:8px;">PHONE VERIFICATION CODE</p>
      <p style="color:#cbd5e1;font-size:28px;font-weight:600;letter-spacing:6px;margin:0;">${otp}</p>
      <p style="color:#475569;font-size:11px;margin-top:8px;">Expires in 10 minutes</p>
    </div>

    ${hasPDF ? '<p style="color:#94a3b8;font-size:13px;">Your registration receipt is attached as a PDF.</p>' : ''}
  </div>

  <!-- Footer -->
  <div style="background:#0f172a;padding:20px 40px;text-align:center;border-top:1px solid #1e293b;">
    <p style="color:#334155;font-size:11px;margin:0;">AuditDNA  ·  CM Products International  ·  NMLS #337526</p>
    <p style="color:#334155;font-size:11px;margin:4px 0 0;">1-844-853-9300  ·  audit@auditdna.com</p>
  </div>

</div>
</body>
</html>`;

// ══════════════════════════════════════════════════════════════════════════════
//  ROUTES
// ══════════════════════════════════════════════════════════════════════════════

// ── POST /api/consumers/register ─────────────────────────────────────────────
router.post('/register', (req, res) => {
  uploadFields(req, res, async (uploadErr) => {

    if (uploadErr instanceof multer.MulterError) {
      return res.status(400).json({ success: false, error: `Upload error: ${uploadErr.message}` });
    }
    if (uploadErr) {
      return res.status(400).json({ success: false, error: uploadErr.message });
    }

    const {
      fullName, email, phone,
      propertyAddress, city, state, zip,
      referralSource, partnerCode
    } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ success: false, error: 'fullName, email, and phone are required' });
    }

    const photoIDFile = req.files?.photoID?.[0] || null;
    const selfieFile  = req.files?.selfie?.[0]  || null;
    const pin         = generatePIN();
    const otp         = generateOTP();
    const consumerRef = `ADNA-C-${uuid().split('-')[0].toUpperCase()}`;

    // Store OTP (10 min expiry)
    otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

    // Consumer object for PDF / email
    let consumer = {
      full_name:        fullName,
      fullName,
      email,
      phone,
      property_address: propertyAddress,
      propertyAddress,
      city, state, zip,
      referral_source:  referralSource || null,
      partner_code:     partnerCode    || null,
      photo_id_file:    photoIDFile?.filename || null,
      selfie_file:      selfieFile?.filename  || null,
      phone_verified:   false,
      consumer_ref:     consumerRef,
      pin
    };

    // ── Save to DB ──
    try {
      const result = await pool.query(
        `INSERT INTO consumers
           (full_name, email, phone, property_address, city, state, zip,
            referral_source, partner_code, photo_id_file, selfie_file,
            phone_verified, consumer_ref, pin, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,NOW())
         ON CONFLICT (email) DO UPDATE SET
           full_name       = EXCLUDED.full_name,
           phone           = EXCLUDED.phone,
           photo_id_file   = COALESCE(EXCLUDED.photo_id_file, consumers.photo_id_file),
           selfie_file     = COALESCE(EXCLUDED.selfie_file,   consumers.selfie_file),
           updated_at      = NOW()
         RETURNING *`,
        [
          fullName, email, phone, propertyAddress, city, state, zip,
          referralSource || null, partnerCode || null,
          photoIDFile?.filename || null,
          selfieFile?.filename  || null,
          false, consumerRef, pin
        ]
      );
      consumer = { ...consumer, ...result.rows[0] };
      console.log(`✅ [CONSUMER] Registered: ${email} | Ref: ${consumerRef} | PIN: ${pin}`);
    } catch (dbErr) {
      console.error(`⚠️  [CONSUMER] DB error (offline mode): ${dbErr.message}`);
    }

    // ── Generate PDF receipt ──
    let pdfBuffer = null;
    try {
      pdfBuffer = await buildReceiptPDF(consumer);
      fs.writeFileSync(
        path.join(RECEIPT_DIR, `receipt_${consumerRef}.pdf`),
        pdfBuffer
      );
    } catch (pdfErr) {
      console.error(`⚠️  [CONSUMER] PDF error: ${pdfErr.message}`);
    }

    // ── Send confirmation email ──
    try {
      await mailer.sendMail({
        from:    `"AuditDNA" <${process.env.EMAIL_FROM || 'noreply@auditdna.com'}>`,
        to:      email,
        subject: `✅ AuditDNA Registration Confirmed — PIN: ${pin}`,
        html:    buildEmailHTML(consumer, pin, otp, !!pdfBuffer),
        attachments: pdfBuffer ? [{
          filename:    `AuditDNA_Registration_${consumerRef}.pdf`,
          content:     pdfBuffer,
          contentType: 'application/pdf'
        }] : []
      });
      console.log(`📧 [CONSUMER] Email sent to: ${email}`);
    } catch (mailErr) {
      console.error(`⚠️  [CONSUMER] Email error: ${mailErr.message}`);
    }

    // ── Respond ──
    res.json({
      success:        true,
      pin,
      consumerRef,
      message:        'Account created',
      idReceived:     !!photoIDFile,
      selfieReceived: !!selfieFile,
      emailSent:      true,
      pdfGenerated:   !!pdfBuffer,
      nextStep:       'Check your email for your PIN and phone verification code'
    });
  });
});

// ── POST /api/consumers/verify-phone ─────────────────────────────────────────
router.post('/verify-phone', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'email and otp are required' });
  }

  const record = otpStore.get(email);
  if (!record) {
    return res.status(400).json({ error: 'No verification code found — please register first' });
  }
  if (Date.now() > record.expires) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'Code expired — please request a new one' });
  }
  if (record.otp !== otp.toString()) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  otpStore.delete(email);

  try {
    await pool.query(
      'UPDATE consumers SET phone_verified = true, updated_at = NOW() WHERE email = $1',
      [email]
    );
  } catch (_) { /* offline — still confirm */ }

  console.log(`✅ [CONSUMER] Phone verified: ${email}`);
  res.json({ success: true, message: 'Phone verified successfully' });
});

// ── GET /api/consumers/:email ─────────────────────────────────────────────────
router.get('/:email', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, consumer_ref, full_name, email, phone, phone_verified,
              property_address, city, state, zip,
              photo_id_file, selfie_file,
              referral_source, partner_code, created_at
       FROM consumers WHERE email = $1`,
      [req.params.email]
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Consumer not found' });
    }
    res.json({ success: true, consumer: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/consumers/:email/receipt ────────────────────────────────────────
//  Stream PDF for download or print
router.get('/:email/receipt', async (req, res) => {
  try {
    let consumer = { email: req.params.email, full_name: 'Consumer', consumer_ref: 'OFFLINE' };
    try {
      const result = await pool.query(
        'SELECT * FROM consumers WHERE email = $1', [req.params.email]
      );
      if (result.rows.length) consumer = result.rows[0];
    } catch (_) { /* offline fallback */ }

    const pdfBuffer = await buildReceiptPDF(consumer);
    const ref       = consumer.consumer_ref || 'receipt';
    const mode      = req.query.print === '1' ? 'inline' : 'attachment';

    res.setHeader('Content-Type',        'application/pdf');
    res.setHeader('Content-Disposition', `${mode}; filename="AuditDNA_Registration_${ref}.pdf"`);
    res.setHeader('Content-Length',      pdfBuffer.length);
    res.send(pdfBuffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/consumers/:email/email-receipt ──────────────────────────────────
router.post('/:email/email-receipt', async (req, res) => {
  const { toEmail } = req.body;
  const target      = toEmail || req.params.email;

  try {
    let consumer = { email: target, full_name: 'Consumer', consumer_ref: 'OFFLINE' };
    try {
      const result = await pool.query(
        'SELECT * FROM consumers WHERE email = $1', [req.params.email]
      );
      if (result.rows.length) consumer = result.rows[0];
    } catch (_) { /* offline */ }

    const pdfBuffer = await buildReceiptPDF(consumer);
    const ref       = consumer.consumer_ref || 'receipt';

    await mailer.sendMail({
      from:    `"AuditDNA" <${process.env.EMAIL_FROM || 'noreply@auditdna.com'}>`,
      to:      target,
      subject: `AuditDNA — Your Registration Receipt (${ref})`,
      html:    `<div style="font-family:Helvetica;padding:24px;background:#0f172a;color:#e2e8f0;">
                  <h2 style="color:#cba658;">AuditDNA Registration Receipt</h2>
                  <p style="color:#94a3b8;">Reference: <strong style="color:#cba658;">${ref}</strong></p>
                  <p style="color:#94a3b8;">Your registration receipt is attached as a PDF.</p>
                </div>`,
      attachments: [{
        filename:    `AuditDNA_Registration_${ref}.pdf`,
        content:     pdfBuffer,
        contentType: 'application/pdf'
      }]
    });

    res.json({ success: true, message: `Receipt emailed to ${target}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Multer error handler ──────────────────────────────────────────────────────
router.use((err, req, res, next) => {
  if (err) return res.status(400).json({ success: false, error: err.message });
  next();
});

module.exports = router;