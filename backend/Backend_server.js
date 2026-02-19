// ============================================================================
// AUDITDNA BACKEND SERVER - PRODUCTION
// MFG, Inc. DBA AuditDNA Consumer Services | NMLS #337526
// Complete API for Mortgage Audit Recovery System
// ============================================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Logging
app.use(morgan('combined'));

// File uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================================================
// ROUTE IMPORTS
// ============================================================================

const authRoutes = require('./routes/auth');
const consumerRoutes = require('./routes/consumers');
const documentRoutes = require('./routes/documents');
const auditRoutes = require('./routes/audits');
const legalRoutes = require('./routes/legal');
const paymentRoutes = require('./routes/payments');
const escrowRoutes = require('./routes/escrow');
const emailRoutes = require('./routes/emails');
const responseRoutes = require('./routes/responses');
const adminRoutes = require('./routes/admin');
const complianceRoutes = require('./routes/compliance');
const chainRoutes = require('./routes/chain');

// ============================================================================
// API ROUTES
// ============================================================================

app.use('/api/auth', authRoutes);
app.use('/api/consumers', consumerRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/escrow', escrowRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/chain', chainRoutes);

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AuditDNA API',
    version: '1.0.0',
    nmls: '337526'
  });
});

// ============================================================================
// 60 MINER NINERS STATUS CHECK
// ============================================================================

app.get('/api/miners/status', (req, res) => {
  res.json({
    total: 60,
    tiers: {
      tier1: { count: 10, status: 'operational', type: 'SI' },
      tier2: { count: 15, status: 'operational', type: 'AI' },
      tier3: { count: 10, status: 'operational', type: 'SI' },
      tier4: { count: 10, status: 'operational', type: 'AI' },
      tier5: { count: 7, status: 'operational', type: 'SI' },
      tier6: { count: 8, status: 'operational', type: 'SI' }
    },
    lastCheck: new Date().toISOString()
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.url} not found`,
    availableRoutes: [
      '/api/auth',
      '/api/consumers',
      '/api/documents',
      '/api/audits',
      '/api/legal',
      '/api/payments',
      '/api/escrow',
      '/api/emails',
      '/api/responses',
      '/api/admin',
      '/api/compliance',
      '/api/chain'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
});

// ============================================================================
// SERVER START
// ============================================================================

app.listen(PORT, () => {
  console.log('============================================');
  console.log('🚀 AUDITDNA API SERVER STARTED');
  console.log('============================================');
  console.log(`Port: ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`NMLS: #337526`);
  console.log(`Company: MFG, Inc. DBA AuditDNA Consumer Services`);
  console.log('============================================');
  console.log('Available endpoints:');
  console.log('  - GET  /api/health');
  console.log('  - GET  /api/miners/status');
  console.log('  - POST /api/auth/*');
  console.log('  - *    /api/consumers/*');
  console.log('  - *    /api/documents/*');
  console.log('  - *    /api/audits/*');
  console.log('  - *    /api/legal/*');
  console.log('  - *    /api/payments/*');
  console.log('  - *    /api/escrow/*');
  console.log('  - *    /api/emails/*');
  console.log('  - *    /api/responses/*');
  console.log('  - *    /api/admin/*');
  console.log('  - *    /api/compliance/*');
  console.log('  - *    /api/chain/*');
  console.log('============================================');
});

module.exports = app;