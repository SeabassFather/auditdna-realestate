```markdown
# AuditDNA Standards Verification — Backend

This folder contains:
- server.js — Express API server with endpoints to upload lab files, create verifications, chain-of-custody, attestations, standards lookup.
- analysis/engine.js — analysis engine skeleton (parse → normalize → score → report).
- standards/standards.json — canonical mapping for thresholds (example).
- db/schema.sql — Postgres schema to create necessary tables.
- jobs/notificationScheduler.js — cron job to schedule reminders and calendar events.

Quick start:
1. Create Postgres DB and run `db/schema.sql`.
2. Install dependencies: `npm install express multer pg node-cron`
3. Set environment variables (DATABASE_URL, MAIL credentials, S3, GOOGLE_CALENDAR as needed)
4. Start server: `node server.js`
5. Hook scheduler (in server or run as worker): `require('./jobs/notificationScheduler')()`

Next tasks:
- Implement PDF/Excel/CSV/OCR parsing for lab formats (replace parseLabFileStub).
- Replace digital signature stub with real PKI signing (private key).
- Integrate mailer (SendGrid/SES) for notification delivery and calendar (Google Calendar or Microsoft Graph).
- Add authentication + RBAC for admin users.
```