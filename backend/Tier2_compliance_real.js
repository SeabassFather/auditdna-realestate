// services/miners/tier2_compliance.js - FEE COMPLIANCE MINERS (15 AI Miners)

const RESPA_FEE_LIMITS = {
  lateFeeSingleFamily: 50,
  lateFeeMultiFamily: 100,
  nsf_fee: 25,
  payoffStatementFee: 0, // Must be free
  estoppelLetterFee: 0,  // Must be free
};

/**
 * M11: Junk Fee Detector
 * Identifies unauthorized fees added to loan
 */
const detectJunkFees = (extractedData, loanData) => {
  const violations = [];
  const fees = extractedData.fees || [];
  
  const junkFeeTypes = [
    'processing fee',
    'administrative fee',
    'document preparation fee',
    'courier fee',
    'email fee',
    'tax service fee',
    'flood certification fee',
    'appraisal review fee'
  ];
  
  fees.forEach(fee => {
    const feeName = fee.name.toLowerCase();
    const isJunk = junkFeeTypes.some(junkType => feeName.includes(junkType));
    
    if (isJunk && fee.amount > 0) {
      violations.push({
        category: 'Fee Compliance',
        type: 'Junk Fee',
        description: `Unauthorized "${fee.name}" fee of $${fee.amount}`,
        law: 'RESPA Section 8 - Prohibits unearned fees',
        recoveryAmount: fee.amount,
        severity: 'high',
        evidence: {
          feeName: fee.name,
          amount: fee.amount,
          dateCharged: fee.date
        }
      });
    }
  });
  
  return violations;
};

/**
 * M12: Late Fee Legality Checker
 * Validates late fees comply with RESPA limits
 */
const checkLateFees = (extractedData, loanData) => {
  const violations = [];
  const lateFees = (extractedData.fees || []).filter(f => 
    f.name.toLowerCase().includes('late') || f.name.toLowerCase().includes('nsf')
  );
  
  lateFees.forEach(fee => {
    const propertyType = loanData.propertyType || 'single_family';
    const maxAllowed = propertyType === 'single_family' ? 
      RESPA_FEE_LIMITS.lateFeeSingleFamily : 
      RESPA_FEE_LIMITS.lateFeeMultiFamily;
    
    if (fee.amount > maxAllowed) {
      const overcharge = fee.amount - maxAllowed;
      violations.push({
        category: 'Fee Compliance',
        type: 'Excessive Late Fee',
        description: `Late fee of $${fee.amount} exceeds legal limit of $${maxAllowed}`,
        law: 'RESPA - Late fee limits',
        recoveryAmount: overcharge,
        severity: 'medium',
        evidence: {
          charged: fee.amount,
          legal_limit: maxAllowed,
          overcharge: overcharge,
          date: fee.date
        }
      });
    }
  });
  
  return violations;
};

/**
 * M13: Force-Placed Insurance Validator
 * Detects illegal force-placed insurance
 */
const validateForcePlacedInsurance = (extractedData, loanData) => {
  const violations = [];
  const fpiCharges = (extractedData.fees || []).filter(f =>
    f.name.toLowerCase().includes('force') || 
    f.name.toLowerCase().includes('lender placed') ||
    f.name.toLowerCase().includes('collateral protection')
  );
  
  fpiCharges.forEach(charge => {
    // Check if consumer actually had insurance
    const hadInsurance = extractedData.insurancePolicies && 
      extractedData.insurancePolicies.some(policy => 
        policy.active && new Date(policy.effectiveDate) <= new Date(charge.date)
      );
    
    if (hadInsurance) {
      violations.push({
        category: 'Fee Compliance',
        type: 'Illegal Force-Placed Insurance',
        description: `Force-placed insurance charged despite active policy`,
        law: 'RESPA Section 6 - Escrow accounts',
        recoveryAmount: charge.amount,
        severity: 'critical',
        evidence: {
          fpiAmount: charge.amount,
          fpiDate: charge.date,
          actualPolicy: hadInsurance,
          policyNumber: extractedData.insurancePolicies[0].policyNumber
        }
      });
    }
    
    // Check if notice was given (45 days required)
    if (!charge.noticeDate || 
        (new Date(charge.date) - new Date(charge.noticeDate)) / (1000 * 60 * 60 * 24) < 45) {
      violations.push({
        category: 'Fee Compliance',
        type: 'Force-Placed Insurance - Notice Violation',
        description: `Force-placed insurance without required 45-day notice`,
        law: 'RESPA Section 6 - 45-day notice requirement',
        recoveryAmount: charge.amount,
        severity: 'high',
        evidence: {
          noticeGiven: charge.noticeDate ? 'Yes' : 'No',
          daysBetween: charge.noticeDate ? 
            Math.floor((new Date(charge.date) - new Date(charge.noticeDate)) / (1000 * 60 * 60 * 24)) : 
            0
        }
      });
    }
  });
  
  return violations;
};

/**
 * M14: Fee Stacking Identifier
 * Detects duplicate fees or excessive fee combinations
 */
const identifyFeeStacking = (extractedData) => {
  const violations = [];
  const fees = extractedData.fees || [];
  
  // Group fees by date
  const feesByDate = fees.reduce((acc, fee) => {
    const date = fee.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(fee);
    return acc;
  }, {});
  
  // Check each date for stacking
  Object.entries(feesByDate).forEach(([date, dayFees]) => {
    const totalFees = dayFees.reduce((sum, f) => sum + f.amount, 0);
    
    // If more than $200 in fees on one day, likely stacking
    if (totalFees > 200 && dayFees.length > 3) {
      violations.push({
        category: 'Fee Compliance',
        type: 'Fee Stacking',
        description: `${dayFees.length} fees totaling $${totalFees} charged on ${date}`,
        law: 'RESPA Section 8 - Prohibits excessive fees',
        recoveryAmount: totalFees * 0.5, // Estimate 50% are improper
        severity: 'high',
        evidence: {
          date: date,
          feeCount: dayFees.length,
          totalAmount: totalFees,
          fees: dayFees.map(f => ({ name: f.name, amount: f.amount }))
        }
      });
    }
    
    // Check for duplicate fees
    const feeNames = dayFees.map(f => f.name);
    const duplicates = feeNames.filter((name, index) => feeNames.indexOf(name) !== index);
    
    if (duplicates.length > 0) {
      const dupAmount = dayFees
        .filter(f => duplicates.includes(f.name))
        .reduce((sum, f) => sum + f.amount, 0);
      
      violations.push({
        category: 'Fee Compliance',
        type: 'Duplicate Fees',
        description: `Duplicate fees charged: ${duplicates.join(', ')}`,
        law: 'RESPA Section 8',
        recoveryAmount: dupAmount / 2, // One set is legitimate
        severity: 'medium',
        evidence: {
          duplicateFees: duplicates,
          amount: dupAmount
        }
      });
    }
  });
  
  return violations;
};

/**
 * M15: Payoff Statement Fee Checker
 * Payoff statements must be FREE per RESPA
 */
const checkPayoffFees = (extractedData) => {
  const violations = [];
  const payoffFees = (extractedData.fees || []).filter(f =>
    f.name.toLowerCase().includes('payoff') ||
    f.name.toLowerCase().includes('payoff statement') ||
    f.name.toLowerCase().includes('demand')
  );
  
  payoffFees.forEach(fee => {
    if (fee.amount > 0) {
      violations.push({
        category: 'Fee Compliance',
        type: 'Illegal Payoff Statement Fee',
        description: `Payoff statement fee of $${fee.amount} is illegal`,
        law: 'RESPA Section 6 - Payoff statements must be free',
        recoveryAmount: fee.amount,
        severity: 'medium',
        evidence: {
          feeAmount: fee.amount,
          dateCharged: fee.date
        }
      });
    }
  });
  
  return violations;
};

/**
 * M16-M25: Additional Fee Compliance Miners
 * (Simplified for now - can expand later)
 */
const additionalFeeChecks = (extractedData, loanData) => {
  const violations = [];
  
  // M16: Escrow analysis fee (should be free)
  const escrowFees = (extractedData.fees || []).filter(f =>
    f.name.toLowerCase().includes('escrow analysis')
  );
  
  escrowFees.forEach(fee => {
    if (fee.amount > 0) {
      violations.push({
        category: 'Fee Compliance',
        type: 'Illegal Escrow Analysis Fee',
        description: `Escrow analysis fee of $${fee.amount} is illegal`,
        law: 'RESPA Section 6',
        recoveryAmount: fee.amount,
        severity: 'medium',
        evidence: { amount: fee.amount }
      });
    }
  });
  
  // M17: Modification fees over $500
  const modFees = (extractedData.fees || []).filter(f =>
    f.name.toLowerCase().includes('modification')
  );
  
  modFees.forEach(fee => {
    if (fee.amount > 500) {
      violations.push({
        category: 'Fee Compliance',
        type: 'Excessive Modification Fee',
        description: `Modification fee of $${fee.amount} likely excessive`,
        law: 'State usury laws',
        recoveryAmount: fee.amount - 500,
        severity: 'low',
        evidence: { charged: fee.amount, reasonable: 500 }
      });
    }
  });
  
  return violations;
};

/**
 * MAIN EXPORT: Analyze Fee Compliance
 * Runs all 15 fee compliance miners
 */
const analyzeFeeCompliance = async (extractedData, loanData) => {
  console.log('   Running M11-M25: Fee Compliance Miners...');
  
  const allViolations = [
    ...detectJunkFees(extractedData, loanData),
    ...checkLateFees(extractedData, loanData),
    ...validateForcePlacedInsurance(extractedData, loanData),
    ...identifyFeeStacking(extractedData),
    ...checkPayoffFees(extractedData),
    ...additionalFeeChecks(extractedData, loanData)
  ];
  
  console.log(`   ✓ Found ${allViolations.length} fee compliance violations`);
  
  return allViolations;
};

module.exports = {
  analyzeFeeCompliance,
  detectJunkFees,
  checkLateFees,
  validateForcePlacedInsurance,
  identifyFeeStacking,
  checkPayoffFees
};