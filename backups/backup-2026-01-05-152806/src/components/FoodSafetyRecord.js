// ================================================================
// FOOD SAFETY RECORD MODEL
// ================================================================
// Date: 2025-11-11 19:30:52 UTC
// Author: SeabassFather
// ================================================================

import mongoose from 'mongoose';

const FoodSafetyRecordSchema = new mongoose.Schema({
  growerId: {
    type: String,
    required: true,
    index: true
  },
  facilityName: String,
  certifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certification'
  }],
  labResults: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LabResult'
  }],
  haccpPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HACCPPlan'
  },
  inspectionRecords: [{
    date: Date,
    auditor: String,
    score: Number,
    findings: String,
    status: {
      type: String,
      enum: ['Pass', 'Conditional', 'Fail']
    }
  }],
  safetyScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Under Review', 'Suspended'],
    default: 'Active'
  }
}, {
  timestamps: true
});

// Calculate safety score before saving
FoodSafetyRecordSchema.pre('save', async function(next) {
  // Weights: certs 40%, lab 30%, sanitation 20%, training 10%
  let score = 0;
  
  if (this.certifications && this.certifications.length > 0) {
    score += 40;
  }
  if (this.labResults && this.labResults.length > 0) {
    score += 30;
  }
  // Add sanitation and training logic here
  
  this.safetyScore = score;
  
  // Determine risk level
  if (score >= 90) this.riskLevel = 'Low';
  else if (score >= 70) this.riskLevel = 'Medium';
  else if (score >= 50) this.riskLevel = 'High';
  else this.riskLevel = 'Critical';
  
  next();
});

export default mongoose.model('FoodSafetyRecord', FoodSafetyRecordSchema);