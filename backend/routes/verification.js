const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// In-memory storage
let verifications = [];

// POST - Submit ID for verification
router.post('/submit', (req, res) => {
  const { email, name, phone, idType, idNumber, userType } = req.body;
  
  // Check if already exists
  const existing = verifications.find(v => v.email === email);
  if (existing) {
    return res.status(400).json({ success: false, error: 'Verification already submitted' });
  }
  
  // Generate email verification token
  const token = crypto.randomBytes(32).toString('hex');
  
  const newVerification = {
    id: verifications.length + 1,
    email,
    name,
    phone,
    idType,
    idNumber,
    userType,
    status: 'pending',
    emailVerified: false,
    emailVerificationToken: token,
    createdAt: new Date().toISOString()
  };
  
  verifications.push(newVerification);
  
  // TODO: Send verification email with token
  console.log('Email verification link:', `http://localhost:3000/verify-email/${token}`);
  
  res.json({
    success: true,
    message: 'Verification submitted. Please check your email.',
    verification: newVerification
  });
});

// GET - Verify email
router.get('/verify-email/:token', (req, res) => {
  const verification = verifications.find(v => v.emailVerificationToken === req.params.token);
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Invalid token' });
  }
  
  verification.emailVerified = true;
  
  res.json({
    success: true,
    message: 'Email verified! Your ID is pending admin approval.'
  });
});

// GET - Check verification status
router.get('/status/:email', (req, res) => {
  const verification = verifications.find(v => v.email === req.params.email);
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Not found' });
  }
  
  res.json({
    success: true,
    status: verification.status,
    emailVerified: verification.emailVerified,
    canUpload: verification.status === 'approved' && verification.emailVerified
  });
});

// PUT - Admin approve/reject
router.put('/admin/:id', (req, res) => {
  const { status, rejectionReason } = req.body;
  const verification = verifications.find(v => v.id === parseInt(req.params.id));
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Not found' });
  }
  
  verification.status = status;
  if (status === 'approved') {
    verification.verifiedAt = new Date().toISOString();
  }
  if (rejectionReason) {
    verification.rejectionReason = rejectionReason;
  }
  
  res.json({ success: true, verification });
});

module.exports = router;