<<<<<<< HEAD
// Flood insurance (if in flood zone)
=======
﻿// Flood insurance (if in flood zone)
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  if (loanData.floodZone && !loanData.floodInsurance) {
    issues.push({
      rule: 'Flood Insurance Requirement',
      violation: true,
      description: 'Flood insurance required for properties in flood zones',
      severity: 'high'
    });
  }

  return {
    compliant: !issues.some(i => i.violation),
    issues,
    cfpbCompliant: cfpbCheck.compliant
  };
};

// Check thresholds
exports.checkThresholds = async (industry, metrics) => {
  const thresholds = THRESHOLDS[industry];
  if (!thresholds) {
    throw new Error(`Unknown industry: ${industry}`);
  }

  const violations = [];

  Object.keys(metrics).forEach(key => {
    if (thresholds[key] !== undefined) {
      const value = metrics[key];
      const threshold = thresholds[key];

      if (key.startsWith('max') && value > threshold) {
        violations.push({
          metric: key,
          value,
          threshold,
          type: 'exceeds_maximum'
        });
      } else if (key.startsWith('min') && value < threshold) {
        violations.push({
          metric: key,
          value,
          threshold,
          type: 'below_minimum'
        });
      }
    }
  });

  return {
    passed: violations.length === 0,
    violations,
    industry,
    thresholds
  };
};

// Get thresholds
exports.getThresholds = (industry) => {
  return THRESHOLDS[industry] || {};
};

// Detect red flags
exports.detectRedFlags = async (data) => {
  const redFlags = [];

  // Financial red flags
  if (data.dti && data.dti > 50) {
    redFlags.push({
      category: 'Financial',
      flag: 'Extremely high DTI ratio',
      severity: 'critical',
      value: data.dti
    });
  }

  if (data.ltv && data.ltv > 95) {
    redFlags.push({
      category: 'Financial',
      flag: 'High loan-to-value ratio',
      severity: 'high',
      value: data.ltv
    });
  }

  // Credit red flags
  if (data.creditScore && data.creditScore < 580) {
    redFlags.push({
      category: 'Credit',
      flag: 'Subprime credit score',
      severity: 'high',
      value: data.creditScore
    });
  }

  // Income verification
  if (data.income && data.documentedIncome && 
      Math.abs(data.income - data.documentedIncome) / data.income > 0.1) {
    redFlags.push({
      category: 'Income',
      flag: 'Income discrepancy exceeds 10%',
      severity: 'critical',
      value: {
        stated: data.income,
        documented: data.documentedIncome
      }
    });
  }

  // Employment gaps
  if (data.employmentGapMonths && data.employmentGapMonths > 6) {
    redFlags.push({
      category: 'Employment',
      flag: 'Significant employment gap',
      severity: 'medium',
      value: data.employmentGapMonths
    });
  }

  // Rapid property appreciation
  if (data.purchasePrice && data.appraisedValue && 
      (data.appraisedValue - data.purchasePrice) / data.purchasePrice > 0.2) {
    redFlags.push({
      category: 'Property',
      flag: 'Unusual property appreciation (>20%)',
      severity: 'high',
      value: {
        purchase: data.purchasePrice,
        appraised: data.appraisedValue
      }
    });
  }

  return {
    totalFlags: redFlags.length,
    critical: redFlags.filter(f => f.severity === 'critical').length,
    high: redFlags.filter(f => f.severity === 'high').length,
    flags: redFlags
  };
};

// Generate compliance report
exports.generateReport = async (type, dateRange) => {
  let report = {};

  if (type === 'mortgage') {
    const audits = await MortgageAudit.find({
      createdAt: { $gte: dateRange.startDate, $lte: dateRange.endDate }
    });

    const violations = audits.filter(a => 
      a.audit.complianceIssues && a.audit.complianceIssues.some(i => i.violation)
    );

    report = {
      type: 'Mortgage Compliance',
      period: dateRange,
      totalAudits: audits.length,
      violations: violations.length,
      complianceRate: ((audits.length - violations.length) / audits.length * 100).toFixed(2),
      details: violations.map(a => ({
        loanNumber: a.loanNumber,
        issues: a.audit.complianceIssues.filter(i => i.violation)
      }))
    };
  } else if (type === 'factoring') {
    const files = await FactoringFile.find({
      createdAt: { $gte: dateRange.startDate, $lte: dateRange.endDate }
    });

    report = {
      type: 'Factoring Compliance',
      period: dateRange,
      totalFiles: files.length,
      highRisk: files.filter(f => f.riskAssessment.level === 'high' || f.riskAssessment.level === 'severe').length,
      avgRiskScore: files.reduce((sum, f) => sum + (f.riskAssessment.score || 0), 0) / files.length
    };
  }

  return report;
};

// Get violations
exports.getViolations = async (filters) => {
  const audits = await MortgageAudit.find({
    'audit.complianceIssues.violation': true
  })
    .limit(filters.limit || 50)
    .populate('audit.auditedBy', 'name email');

  return audits.map(a => ({
    loanNumber: a.loanNumber,
    violations: a.audit.complianceIssues.filter(i => i.violation),
    riskLevel: a.audit.riskLevel,
    auditedBy: a.audit.auditedBy
  }));
};

// Helper: Calculate eco score
function calculateEcoScore(propertyData) {
  let score = 0;

  if (propertyData.energyRating === 'LEED') score += 30;
  else if (propertyData.energyRating === 'ENERGY_STAR') score += 25;

  if (propertyData.solarPanels) score += 20;
  if (propertyData.waterUsage && propertyData.waterUsage < 50) score += 15;
  if (propertyData.insulationR >= 30) score += 15;

  return Math.min(100, score);
}

// Helper: Generate eco recommendations
function generateEcoRecommendations(issues) {
  const recommendations = [];

  issues.forEach(issue => {
    if (issue.standard === 'Energy Efficiency') {
      recommendations.push('Obtain ENERGY STAR or LEED certification');
    }
    if (issue.standard === 'Water Conservation') {
      recommendations.push('Install low-flow fixtures and water-efficient appliances');
    }
    if (issue.standard === 'Insulation') {
      recommendations.push('Upgrade insulation to R-30 or higher');
    }
  });

  return recommendations;
}

module.exports = exports;const logger = require('../config/logger');
const MortgageAudit = require('../models/MortgageAudit');
const FactoringFile = require('../models/FactoringFile');

// Industry thresholds
const THRESHOLDS = {
  mortgage: {
    maxDTI: 43,
    maxLTV: 95,
    minCreditScore: 620,
    maxLoanAmount: 726200, // 2024 conforming loan limit
    qmPoints: 3
  },
  factoring: {
    maxAdvanceRate: 90,
    maxConcentration: 25, // % of portfolio to single client
    minPaymentHistory: 70, // % on-time payment
    maxAgingDays: 90
  },
  ecoHousing: {
    minEnergyEfficiency: 'ENERGY_STAR',
    maxWaterUsage: 60, // gallons per day per person
    minInsulationR: 30,
    requiredCertifications: ['LEED', 'ENERGY_STAR', 'NGBS']
  }
};

// Validate CFPB compliance for mortgage
exports.validateCFPB = async (loanData) => {
  const issues = [];
  let compliant = true;

  // Ability-to-Repay Rule
  if (!loanData.income || !loanData.monthlyPayment) {
    issues.push({
      rule: 'Ability-to-Repay (ATR)',
      violation: true,
      description: 'Income and payment verification required',
      severity: 'critical'
    });
    compliant = false;
  }

  // Qualified Mortgage standards
  if (loanData.dti && loanData.dti > THRESHOLDS.mortgage.maxDTI) {
    issues.push({
      rule: 'Qualified Mortgage (QM)',
      violation: false,
      description: `DTI of ${loanData.dti}% exceeds 43% QM threshold`,
      severity: 'warning'
    });
  }

  // Points and fees test
  if (loanData.points && loanData.points > THRESHOLDS.mortgage.qmPoints) {
    issues.push({
      rule: 'Points and Fees Cap',
      violation: true,
      description: `Points exceed 3% limit for QM loans`,
      severity: 'high'
    });
    compliant = false;
  }

  // TRID disclosure timeline
  if (loanData.closingDate && loanData.disclosureDate) {
    const daysBetween = Math.floor((new Date(loanData.closingDate) - new Date(loanData.disclosureDate)) / (1000 * 60 * 60 * 24));
    if (daysBetween < 3) {
      issues.push({
        rule: 'TRID Waiting Period',
        violation: true,
        description: '3-day waiting period after disclosure not met',
        severity: 'critical'
      });
      compliant = false;
    }
  }

  // HMDA data completeness
  const requiredFields = ['loanAmount', 'propertyValue', 'loanPurpose', 'occupancy'];
  const missingFields = requiredFields.filter(field => !loanData[field]);
  
  if (missingFields.length > 0) {
    issues.push({
      rule: 'HMDA Reporting',
      violation: false,
      description: `Missing fields: ${missingFields.join(', ')}`,
      severity: 'low'
    });
  }

  return {
    compliant,
    issues,
    summary: `${issues.filter(i => i.violation).length} violations, ${issues.filter(i => !i.violation).length} warnings`
  };
};

// Validate eco-housing standards
exports.validateEcoHousing = async (propertyData) => {
  const issues = [];
  let compliant = true;

  // Energy efficiency check
  if (!propertyData.energyRating || 
      !['ENERGY_STAR', 'LEED', 'NGBS'].includes(propertyData.energyRating)) {
    issues.push({
      standard: 'Energy Efficiency',
      violation: true,
      description: 'Property must have recognized energy certification',
      severity: 'high'
    });
    compliant = false;
  }

  // Water usage
  if (propertyData.waterUsage && propertyData.waterUsage > THRESHOLDS.ecoHousing.maxWaterUsage) {
    issues.push({
      standard: 'Water Conservation',
      violation: true,
      description: `Water usage ${propertyData.waterUsage} gpd exceeds ${THRESHOLDS.ecoHousing.maxWaterUsage} gpd limit`,
      severity: 'medium'
    });
  }

  // Insulation requirements
  if (propertyData.insulationR && propertyData.insulationR < THRESHOLDS.ecoHousing.minInsulationR) {
    issues.push({
      standard: 'Insulation',
      violation: true,
      description: `R-value ${propertyData.insulationR} below minimum R-${THRESHOLDS.ecoHousing.minInsulationR}`,
      severity: 'medium'
    });
    compliant = false;
  }

  // Solar panels
  if (propertyData.solarPanels && !propertyData.solarCapacity) {
    issues.push({
      standard: 'Solar Energy',
      violation: false,
      description: 'Solar capacity not documented',
      severity: 'low'
    });
  }

  return {
    compliant,
    issues,
    ecoScore: calculateEcoScore(propertyData),
    recommendations: generateEcoRecommendations(issues)
  };
};

// Validate lending compliance
exports.validateLendingCompliance = async (loanData) => {
  const cfpbCheck = await exports.validateCFPB(loanData);
  const issues = [...cfpbCheck.issues];

  // Fair Lending (ECOA)
  if (!loanData.creditScore || !loanData.income) {
    issues.push({
      rule: 'Equal Credit Opportunity Act',
      violation: false,
      description: 'Ensure decisions based on creditworthiness, not prohibited factors',
      severity: 'medium'
    });
  }

  // Flood insurance (if in flood zone)
  if (loanData.floodZone && !loanData.floodInsurance) {
    issues.push({
      rule: 'Flood Insurance Requirement',
      violation: true,
      description: 'Flood insurance required for properties in flood zones',
      severity: 'high'
<<<<<<< HEAD
    });
=======
    });
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
