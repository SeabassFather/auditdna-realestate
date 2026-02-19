// ============================================================================
// ALL AUDITDNA ROUTES - COMPLETE BACKEND
// Place these files in C:\AuditDNA\auditdna-realestate\backend\routes\
// ============================================================================

// =========================== routes/auth.js =================================
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
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify PIN
    if (user.pin && pin !== user.pin) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
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

// POST /api/auth/register (Consumer registration)
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    
    // Check if email exists
    const existing = await pool.query('SELECT id FROM consumers WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create consumer
    const result = await pool.query(`
      INSERT INTO consumers (full_name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING id, full_name, email, phone
    `, [fullName, email, phone]);
    
    const consumer = result.rows[0];
    
    // Generate JWT
    const token = jwt.sign(
      { userId: consumer.id, email: consumer.email, role: 'consumer' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      consumer
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;

// =========================== routes/consumers.js =============================
const express2 = require('express');
const router2 = express2.Router();

// POST /api/consumers - Create consumer
router2.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, propertyAddress, city, state, zip } = req.body;
    
    const result = await pool.query(`
      INSERT INTO consumers (full_name, email, phone, property_address, city, state, zip)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [fullName, email, phone, propertyAddress, city, state, zip]);
    
    res.json({ success: true, consumer: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create consumer' });
  }
});

// GET /api/consumers/:id
router2.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consumers WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Consumer not found' });
    }
    res.json({ success: true, consumer: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch consumer' });
  }
});

module.exports = router2;

// =========================== routes/emails.js ================================
const express3 = require('express');
const router3 = express3.Router();
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'sendgrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});

// POST /api/emails/cascade - Trigger email cascade
router3.post('/cascade', async (req, res) => {
  try {
    const { caseId, consumerData, auditResults } = req.body;
    
    console.log('📧 TRIGGERING EMAIL CASCADE');
    
    const emails = [];
    
    // Email 1: To First American Title
    const titleEmail = {
      from: process.env.EMAIL_ESCROW,
      to: process.env.FIRST_AMERICAN_EMAIL,
      subject: `Escrow Setup - ${consumerData.fullName} - Case ${caseId}`,
      html: `
        <h2>ESCROW SETUP REQUEST</h2>
        <p>Consumer: ${consumerData.fullName}</p>
        <p>Property: ${consumerData.propertyAddress}</p>
        <p>Total Amount Due: $${auditResults.totalRecovery.toLocaleString()}</p>
        <p>Please find attached:</p>
        <ul>
          <li>Consumer Authorization</li>
          <li>Identity Verification</li>
          <li>Payment Authorization</li>
          <li>VAGUE Findings Report</li>
        </ul>
      `
    };
    emails.push(titleEmail);
    
    // Email 2: To Creditor
    const creditorEmail = {
      from: process.env.EMAIL_CREDITOR,
      to: consumerData.lenderEmail,
      subject: `Demand for Payment - Loan ${consumerData.loanNumber}`,
      html: `
        <h2>DEMAND FOR PAYMENT</h2>
        <p>Total Amount Due: $${auditResults.totalRecovery}</p>
        <p>Deadline: ${auditResults.deadline}</p>
      `
    };
    emails.push(creditorEmail);
    
    // Email 3: To CFPB
    const cfpbEmail = {
      from: process.env.EMAIL_CFPB,
      to: 'cfpb-complaints@consumerfinance.gov',
      subject: `Consumer Complaint - ${consumerData.fullName}`,
      html: `CFPB COMPLAINT CONTENT`
    };
    emails.push(cfpbEmail);
    
    // Email 4: To Consumer
    const consumerEmail = {
      from: process.env.EMAIL_NOTIFICATIONS,
      to: consumerData.email,
      subject: `Your AuditDNA Case Has Been Filed - ${caseId}`,
      html: `
        <h2>Your Case Has Been Filed</h2>
        <p>Case ID: ${caseId}</p>
        <p>Recovery Amount: $${auditResults.totalRecovery}</p>
      `
    };
    emails.push(consumerEmail);
    
    // Send all emails
    for (const email of emails) {
      await transporter.sendMail(email);
      
      // Log to database
      await pool.query(`
        INSERT INTO emails (case_id, recipient_type, recipient_email, subject, body, sent_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
      `, [caseId, 'title', email.to, email.subject, email.html]);
    }
    
    console.log('✅ EMAIL CASCADE COMPLETE');
    
    res.json({ success: true, emailsSent: emails.length });
    
  } catch (error) {
    console.error('Email cascade error:', error);
    res.status(500).json({ error: 'Email cascade failed' });
  }
});

module.exports = router3;

// =========================== routes/admin.js =================================
const express4 = require('express');
const router4 = express4.Router();

// GET /api/admin/stats
router4.get('/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'active') as active_cases,
        COUNT(*) FILTER (WHERE status = 'pending_payment') as pending_payment,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_cases,
        SUM(total_recovery) as total_recovery,
        SUM(commission_amount) as total_commission
      FROM cases
    `);
    
    const stats = result.rows[0];
    
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/admin/cases
router4.get('/cases', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id,
        c.case_number,
        cons.full_name as consumer_name,
        c.loan_number,
        c.property_address,
        c.total_recovery,
        c.status,
        c.creditor_deadline,
        c.created_at
      FROM cases c
      JOIN consumers cons ON c.consumer_id = cons.id
      ORDER BY c.created_at DESC
      LIMIT 100
    `);
    
    res.json({ success: true, cases: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cases' });
  }
});

// GET /api/admin/responses
router4.get('/responses', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM responses
      WHERE status = 'unread'
      ORDER BY received_at DESC
      LIMIT 50
    `);
    
    res.json({ success: true, responses: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

module.exports = router4;

// ============================================================================
// NOTE: Additional routes (documents, payments, escrow, etc.) follow same pattern
// Each route file exports a router with appropriate endpoints
// ============================================================================