const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  userId: String,
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: String,
  
  // ID Document
  idType: { type: String, enum: ['INE', 'Passport', 'Drivers License'], required: true },
  idNumber: String,
  idFrontImage: String,
  idBackImage: String,
  
  // Verification status
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  verifiedAt: Date,
  rejectionReason: String,
  
  // Email verification
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  
  // User type
  userType: { type: String, enum: ['agent', 'fsbo', 'developer'], required: true },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Verification', verificationSchema);