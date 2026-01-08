<<<<<<< HEAD
const axios = require('axios');
=======
﻿const axios = require('axios');
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
const logger = require('../config/logger');

// Calculate DSCR (Debt Service Coverage Ratio)
exports.calculateDSCR = (data) => {
  const { monthlyRent, mortgagePayment, taxes = 0, insurance = 0, hoa = 0, maintenance = 0 } = data;

  const totalExpenses = mortgagePayment + taxes + insurance + hoa + maintenance;
  const dscr = monthlyRent / totalExpenses;

  return parseFloat(dscr.toFixed(2));
};

// Interpret DSCR
exports.interpretDSCR = (dscr) => {
  if (dscr >= 1.25) {
    return {
      rating: 'excellent',
      description: 'Strong cash flow coverage',
      lenderAppeal: 'Very favorable to lenders'
    };
  } else if (dscr >= 1.0) {
    return {
      rating: 'good',
      description: 'Adequate cash flow coverage',
      lenderAppeal: 'Acceptable to most lenders'
    };
  } else if (dscr >= 0.75) {
    return {
      rating: 'fair',
      description: 'Marginal cash flow',
      lenderAppeal: 'May require additional review'
    };
  } else {
    return {
      rating: 'poor',
      description: 'Negative cash flow',
      lenderAppeal: 'High risk - likely to be declined'
    };
  }
};

// Interpret DTI
exports.interpretDTI = (dti) => {
  if (dti <= 28) {
    return {
      rating: 'excellent',
      description: 'Well within qualified mortgage standards',
      impact: 'Highly favorable for loan approval'
    };
  } else if (dti <= 36) {
    return {
      rating: 'good',
      description: 'Within conventional lending guidelines',
      impact: 'Favorable for loan approval'
    };
  } else if (dti <= 43) {
    return {
      rating: 'acceptable',
      description: 'At qualified mortgage threshold',
      impact: 'May qualify with compensating factors'
    };
  } else if (dti <= 50) {
    return {
      rating: 'marginal',
      description: 'Above qualified mortgage threshold',
      impact: 'Requires strong compensating factors'
    };
  } else {
    return {
      rating: 'poor',
      description: 'Significantly above lending guidelines',
      impact: 'Likely to be declined'
    };
  }
};

// Check compliance with CFPB regulations
exports.checkCompliance = async (audit) => {
  const issues = [];

  // TILA (Truth in Lending Act) checks
  if (!audit.loan.interestRate || audit.loan.interestRate <= 0) {
    issues.push({
      regulation: 'TILA',
      description: 'Interest rate disclosure missing or invalid',
      violation: true
    });
  }

  // RESPA (Real Estate Settlement Procedures Act) checks
  if (!audit.loan.closingDate) {
    issues.push({
      regulation: 'RESPA',
      description: 'Closing date not documented',
      violation: false
    });
  }

  // Ability-to-Repay Rule (ATR)
  if (!audit.income.monthly || !audit.loan.monthlyPayment) {
    issues.push({
      regulation: 'ATR',
      description: 'Income verification or payment calculation incomplete',
      violation: true
    });
  }

  // Qualified Mortgage (QM) standards
  if (audit.financials.dti > 43) {
    issues.push({
      regulation: 'QM',
      description: 'DTI exceeds 43% qualified mortgage threshold',
      violation: false
    });
  }

  // HMDA (Home Mortgage Disclosure Act) - data completeness
  if (!audit.property.appraisedValue) {
    issues.push({
      regulation: 'HMDA',
      description: 'Property appraisal value not documented',
      violation: false
    });
  }

  // ECOA (Equal Credit Opportunity Act) - fair lending
  if (!audit.borrower.creditScore) {
    issues.push({
      regulation: 'ECOA',
      description: 'Credit score not documented for fair lending analysis',
      violation: false
    });
  }

  return {
    compliant: !issues.some(i => i.violation),
    issues,
    summary: `${issues.filter(i => i.violation).length} violations, ${issues.filter(i => !i.violation).length} warnings`
  };
};

// Compare rates from multiple lenders
exports.compareRates = async (loanData) => {
  const { loanAmount, creditScore, loanType } = loanData;

  // Mock rate comparison - in production, call actual lender APIs
  const mockRates = [
    {
      lender: 'Wells Fargo',
      rate: 6.875,
      apr: 7.125,
      points: 0.5,
      monthlyPayment: calculateMonthlyPayment(loanAmount, 6.875, 360)
    },
    {
      lender: 'Chase',
      rate: 6.750,
      apr: 7.000,
      points: 1.0,
      monthlyPayment: calculateMonthlyPayment(loanAmount, 6.750, 360)
    },
    {
      lender: 'Bank of America',
      rate: 7.000,
      apr: 7.250,
      points: 0.0,
      monthlyPayment: calculateMonthlyPayment(loanAmount, 7.000, 360)
    },
    {
      lender: 'Quicken Loans',
      rate: 6.625,
      apr: 6.875,
      points: 1.5,
      monthlyPayment: calculateMonthlyPayment(loanAmount, 6.625, 360)
    }
  ];

  // Adjust rates based on credit score
  const creditAdjustment = creditScore >= 740 ? -0.25 : creditScore >= 680 ? 0 : 0.5;

  const adjustedRates = mockRates.map(r => ({
    ...r,
    rate: r.rate + creditAdjustment,
    apr: r.apr + creditAdjustment,
    monthlyPayment: calculateMonthlyPayment(loanAmount, r.rate + creditAdjustment, 360)
  }));

  const bestRate = adjustedRates.reduce((min, r) => r.rate < min.rate ? r : min);
  const avgRate = adjustedRates.reduce((sum, r) => sum + r.rate, 0) / adjustedRates.length;

  return {
    rates: adjustedRates,
    bestRate,
    marketAverage: avgRate,
    spread: Math.max(...adjustedRates.map(r => r.rate)) - Math.min(...adjustedRates.map(r => r.rate))
  };
};

// Get current market rates
exports.getMarketRates = async () => {
  // Mock market rates - in production, fetch from Freddie Mac or other sources
  return {
    conventional30Year: 6.875,
    conventional15Year: 6.250,
    fha30Year: 6.500,
    va30Year: 6.375,
    jumbo30Year: 7.125,
    lastUpdated: new Date(),
    source: 'Freddie Mac Primary Mortgage Market Survey'
  };
};

// Check HELOC eligibility
exports.checkHELOCEligibility = (data) => {
  const { propertyValue, mortgageBalance, creditScore } = data;

  const equity = propertyValue - mortgageBalance;
  const equityPercent = (equity / propertyValue) * 100;
  const ltv = (mortgageBalance / propertyValue) * 100;
  const maxCLTV = 85; // Combined Loan-to-Value limit

  const maxHELOC = (propertyValue * (maxCLTV / 100)) - mortgageBalance;

  const eligible = creditScore >= 620 && equityPercent >= 15 && maxHELOC > 0;

  return {
    eligible,
    equity,
    equityPercent: parseFloat(equityPercent.toFixed(2)),
    currentLTV: parseFloat(ltv.toFixed(2)),
    maxCLTV,
    maxHELOCAmount: Math.max(0, maxHELOC),
    requirements: {
      minCreditScore: 620,
      currentCreditScore: creditScore,
      minEquity: 15,
      currentEquity: equityPercent
    },
    recommendation: eligible 
      ? `You may qualify for a HELOC up to $${Math.round(maxHELOC).toLocaleString()}`
      : 'Additional equity or credit improvement needed'
  };
};

// Calculate HELOC details
exports.calculateHELOC = (data) => {
  const { propertyValue, mortgageBalance } = data;

  const maxCLTV = 85;
  const maxHELOC = (propertyValue * (maxCLTV / 100)) - mortgageBalance;

  // Typical HELOC terms
  const drawPeriod = 10; // years
  const repaymentPeriod = 20; // years
  const estimatedRate = 8.5; // variable rate

  const monthlyRate = estimatedRate / 100 / 12;
  const interestOnlyPayment = (maxHELOC * monthlyRate).toFixed(2);

  return {
    maxAmount: Math.max(0, Math.round(maxHELOC)),
    drawPeriodYears: drawPeriod,
    repaymentPeriodYears: repaymentPeriod,
    estimatedRate,
    interestOnlyPayment: parseFloat(interestOnlyPayment),
    fullRepaymentPayment: calculateMonthlyPayment(maxHELOC, estimatedRate, repaymentPeriod * 12)
  };
};

// Sync with Point API
exports.syncWithPoint = async (audit) => {
  try {
    if (!process.env.POINT_API_KEY) {
      throw new Error('Point API key not configured');
    }

    const response = await axios.post(
      `${process.env.POINT_API_URL}/loans`,
      {
        loanNumber: audit.loanNumber,
        borrower: audit.borrower,
        property: audit.property,
        loan: audit.loan
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.POINT_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    return {
      success: true,
      pointId: response.data.id,
      syncedAt: new Date()
    };
  } catch (error) {
    logger.error('Point API sync failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Sync with Calyx API
exports.syncWithCalyx = async (audit) => {
  try {
    if (!process.env.CALYX_API_KEY) {
      throw new Error('Calyx API key not configured');
    }

    const response = await axios.post(
      `${process.env.CALYX_API_URL}/loans/import`,
      {
        loanId: audit.loanNumber,
        borrowerInfo: audit.borrower,
        propertyInfo: audit.property,
        loanDetails: audit.loan
      },
      {
        headers: {
          'X-API-Key': process.env.CALYX_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    return {
      success: true,
      calyxId: response.data.loanId,
      syncedAt: new Date()
    };
  } catch (error) {
    logger.error('Calyx API sync failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Helper: Calculate monthly payment
function calculateMonthlyPayment(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
  return parseFloat(payment.toFixed(2));
}

<<<<<<< HEAD
module.exports = exports;
=======
module.exports = exports;
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
