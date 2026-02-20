// ══════════════════════════════════════════════════════════════════════════════
//  AUDITDNA — EMAIL SERVICE
//  Path: C:\AuditDNA\auditdna-realestate\backend\services\email_service.js
//  Handles all outbound emails: registration, PIN, audit complete, receipts
// ══════════════════════════════════════════════════════════════════════════════
'use strict';

const nodemailer = require('nodemailer');

// ── TRANSPORT ─────────────────────────────────────────────────────────────────
const createTransport = () => nodemailer.createTransport({
  host:   process.env.EMAIL_SMTP_HOST || 'mail.mexausafg.com',
  port:   parseInt(process.env.EMAIL_SMTP_PORT) || 587,
  secure: process.env.EMAIL_SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SMTP_USER || 'saul@mexausafg.com',
    pass: process.env.EMAIL_SMTP_PASS
  },
  tls: { rejectUnauthorized: false }
});

const FROM = `"${process.env.EMAIL_FROM_NAME || 'AuditDNA'}" <${process.env.EMAIL_SMTP_USER || 'saul@mexausafg.com'}>`;

// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const styles = {
  wrapper:  'font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;',
  header:   'background:#1e293b;padding:30px;text-align:center;border-bottom:2px solid #cba658;',
  body:     'padding:30px;',
  footer:   'background:#1e293b;padding:20px;text-align:center;font-size:11px;color:#64748b;border-top:1px solid #334155;',
  gold:     'color:#cba658;',
  label:    'color:#94a3b8;font-size:11px;letter-spacing:1px;text-transform:uppercase;',
  value:    'color:#e2e8f0;font-size:14px;margin-bottom:12px;',
  pinBox:   'background:#1e293b;border:2px solid #cba658;border-radius:8px;padding:20px;text-align:center;margin:20px 0;',
  pinText:  'font-size:36px;font-weight:700;letter-spacing:12px;color:#cba658;',
  btnWrap:  'text-align:center;margin:24px 0;',
  btn:      'background:linear-gradient(135deg,#cba658,#b8944d);color:#0f172a;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:1px;display:inline-block;'
};

// ── 1. REGISTRATION CONFIRMATION ──────────────────────────────────────────────
const sendRegistrationEmail = async ({ email, fullName, pin, consumerRef, propertyAddress, photoIDReceived, selfieReceived }) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from:    FROM,
    to:      email,
    subject: `Your AuditDNA Account — PIN: ${pin} — Ref: ${consumerRef}`,
    html: `
    <div style="${styles.wrapper}">
      <div style="${styles.header}">
        <h1 style="${styles.gold}margin:0;font-size:24px;letter-spacing:3px;">AUDITDNA</h1>
        <p style="margin:6px 0 0;font-size:11px;letter-spacing:2px;color:#94a3b8;">MORTGAGE AUDIT SERVICES | NMLS #337526</p>
      </div>
      <div style="${styles.body}">
        <h2 style="${styles.gold}margin-top:0;">Welcome, ${fullName}</h2>
        <p style="color:#94a3b8;">Your account has been created. Save your PIN — you will need it to access your audit results.</p>

        <div style="${styles.pinBox}">
          <p style="${styles.label}margin:0 0 8px;">YOUR ACCESS PIN</p>
          <div style="${styles.pinText}">${pin}</div>
          <p style="color:#64748b;font-size:11px;margin:8px 0 0;">Keep this confidential — do not share</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr><td style="${styles.label}padding:8px 0;">Reference ID</td><td style="${styles.value}padding:8px 0;">${consumerRef}</td></tr>
          <tr><td style="${styles.label}padding:8px 0;">Email</td><td style="${styles.value}padding:8px 0;">${email}</td></tr>
          <tr><td style="${styles.label}padding:8px 0;">Property</td><td style="${styles.value}padding:8px 0;">${propertyAddress || 'On file'}</td></tr>
          <tr><td style="${styles.label}padding:8px 0;">Photo ID</td><td style="padding:8px 0;color:${photoIDReceived ? '#86efac' : '#f87171'}">${photoIDReceived ? '✓ Received' : '✗ Not submitted'}</td></tr>
          <tr><td style="${styles.label}padding:8px 0;">Selfie</td><td style="padding:8px 0;color:${selfieReceived ? '#86efac' : '#f87171'}">${selfieReceived ? '✓ Received' : '✗ Not submitted'}</td></tr>
        </table>

        <div style="${styles.btnWrap}">
          <a href="https://enjoybaja.com/audit-recovery" style="${styles.btn}">START MY MORTGAGE AUDIT →</a>
        </div>

        <p style="color:#64748b;font-size:11px;line-height:1.6;">
          You are receiving this email because you registered for mortgage audit services with AuditDNA, 
          a service of MFG, Inc. NMLS #337526. If you did not register, please contact us immediately.
        </p>
      </div>
      <div style="${styles.footer}">
        AuditDNA | MFG, Inc. | NMLS #337526<br>
        saul@mexausafg.com | 831-251-3116<br>
        <a href="https://enjoybaja.com" style="color:#cba658;">enjoybaja.com</a>
      </div>
    </div>`
  });
  console.log(`✅ [EMAIL] Registration sent to: ${email}`);
};

// ── 2. AUDIT COMPLETE ─────────────────────────────────────────────────────────
const sendAuditCompleteEmail = async ({ email, fullName, caseId, totalViolations, totalRecovery, ourFee, consumerReceives, selectedPath }) => {
  const transporter = createTransport();
  const fmt = n => `$${Math.round(n).toLocaleString()}`;
  await transporter.sendMail({
    from:    FROM,
    to:      email,
    subject: `Your Audit Results — ${totalViolations} Violations Found — ${fmt(consumerReceives)} Recovery — Case ${caseId}`,
    html: `
    <div style="${styles.wrapper}">
      <div style="${styles.header}">
        <h1 style="${styles.gold}margin:0;font-size:24px;letter-spacing:3px;">AUDITDNA</h1>
        <p style="margin:6px 0 0;font-size:11px;letter-spacing:2px;color:#94a3b8;">AUDIT RESULTS</p>
      </div>
      <div style="${styles.body}">
        <h2 style="${styles.gold}margin-top:0;">Audit Complete, ${fullName}</h2>
        <p style="color:#94a3b8;">Our 6-tier mortgage audit has identified violations in your loan. Here is your summary:</p>

        <div style="background:#1e293b;border-radius:8px;padding:24px;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px;text-align:center;border-right:1px solid #334155;">
                <div style="font-size:28px;font-weight:700;color:#cba658;">${totalViolations}</div>
                <div style="${styles.label}">Violations Found</div>
              </td>
              <td style="padding:12px;text-align:center;border-right:1px solid #334155;">
                <div style="font-size:28px;font-weight:700;color:#cba658;">${fmt(totalRecovery)}</div>
                <div style="${styles.label}">Total Recovery</div>
              </td>
              <td style="padding:12px;text-align:center;">
                <div style="font-size:28px;font-weight:700;color:#86efac;">${fmt(consumerReceives)}</div>
                <div style="${styles.label}">You Receive</div>
              </td>
            </tr>
          </table>
        </div>

        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr><td style="${styles.label}padding:8px 0;">Case ID</td><td style="${styles.value}padding:8px 0;">${caseId}</td></tr>
          <tr><td style="${styles.label}padding:8px 0;">Path Selected</td><td style="${styles.value}padding:8px 0;">${selectedPath === 'escrow' ? 'Escrow (39% fee)' : 'Direct (30% fee)'}</td></tr>
          <tr><td style="${styles.label}padding:8px 0;">Our Fee</td><td style="${styles.value}padding:8px 0;">${fmt(ourFee)}</td></tr>
          <tr><td style="${styles.label}padding:8px 0;">You Receive</td><td style="padding:8px 0;color:#86efac;font-size:18px;font-weight:700;">${fmt(consumerReceives)}</td></tr>
        </table>

        <p style="color:#94a3b8;font-size:12px;">
          ⚠️ You have a 3-day cooling off period to cancel this agreement at no cost. 
          After that period, we will begin recovery proceedings on your behalf.
        </p>

        <div style="${styles.btnWrap}">
          <a href="https://enjoybaja.com/audit-recovery" style="${styles.btn}">VIEW FULL RESULTS →</a>
        </div>
      </div>
      <div style="${styles.footer}">
        AuditDNA | MFG, Inc. | NMLS #337526 | saul@mexausafg.com
      </div>
    </div>`
  });
  console.log(`✅ [EMAIL] Audit results sent to: ${email}`);
};

// ── 3. OTP PHONE VERIFICATION ─────────────────────────────────────────────────
const sendOTPEmail = async ({ email, otp, fullName }) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from:    FROM,
    to:      email,
    subject: `AuditDNA — Phone Verification Code: ${otp}`,
    html: `
    <div style="${styles.wrapper}">
      <div style="${styles.header}">
        <h1 style="${styles.gold}margin:0;font-size:24px;letter-spacing:3px;">AUDITDNA</h1>
      </div>
      <div style="${styles.body}">
        <h2 style="${styles.gold}margin-top:0;">Phone Verification</h2>
        <p style="color:#94a3b8;">Hi ${fullName}, enter this code to verify your phone number:</p>
        <div style="${styles.pinBox}">
          <p style="${styles.label}margin:0 0 8px;">VERIFICATION CODE</p>
          <div style="${styles.pinText}">${otp}</div>
          <p style="color:#64748b;font-size:11px;margin:8px 0 0;">Expires in 10 minutes</p>
        </div>
      </div>
      <div style="${styles.footer}">AuditDNA | MFG, Inc. | NMLS #337526</div>
    </div>`
  });
  console.log(`✅ [EMAIL] OTP sent to: ${email}`);
};

// ── TEST CONNECTION ───────────────────────────────────────────────────────────
const testConnection = async () => {
  try {
    const transporter = createTransport();
    await transporter.verify();
    console.log('✅ [EMAIL] SMTP connection verified');
    return true;
  } catch (err) {
    console.error(`⚠️  [EMAIL] SMTP connection failed: ${err.message}`);
    return false;
  }
};

module.exports = { sendRegistrationEmail, sendAuditCompleteEmail, sendOTPEmail, testConnection };