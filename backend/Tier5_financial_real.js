// services/miners/tier5_financial.js - FINANCIAL RECONCILIATION MINERS (7 SI Miners)

/**
 * M46: Escrow Shortfall Fabrication Detector
 * Detects artificial escrow shortfalls
 */
const detectEscrowShortfall = (extractedData, loanData) => {
  const violations = [];
  
  if (!extractedData.escrowStatements || extractedData.escrowStatements.length === 0) {
    return violations;
  }
  
  // Get most recent escrow analysis
  const latestEscrow = extractedData.escrowStatements[extractedData.escrowStatements.length - 1];
  
  // Check if shortfall is claimed
  if (latestEscrow.shortfall && latestEscrow.shortfall > 0) {
    // Calculate actual expenses
    const actualTaxes = extractedData.taxBills ? 
      extractedData.taxBills.reduce((sum, bill) => sum + bill.amount, 0) : 0;
    const actualInsurance = extractedData.insurancePolicies ?
      extractedData.insurancePolicies[0]?.premium || 0 : 0;
    
    const actualTotal = actualTaxes + actualInsurance;
    const claimedTotal = latestEscrow.projectedExpenses;
    
    // If claimed expenses are more than 10% higher than actual, it's fabricated
    if (claimedTotal > actualTotal * 1.1) {
      const fabricatedAmount = claimedTotal - actualTotal;
      
      violations.push({
        category: 'Financial Reconciliation',
        type: 'Fabricated Escrow Shortfall',
        description: `Escrow shortfall of $${latestEscrow.shortfall} appears fabricated`,
        law: 'RESPA Section 10 - Escrow account analysis',
        recoveryAmount: latestEscrow.shortfall,
        severity: 'critical',
        evidence: {
          claimedShortfall: latestEscrow.shortfall,
          claimedExpenses: claimedTotal,
          actualExpenses: actualTotal,
          fabricatedAmount: fabricatedAmount,
          percentage: Math.round(((claimedTotal - actualTotal) / actualTotal) * 100)
        }
      });
    }
  }
  
  // Check for excessive cushion (max 2 months of expenses)
  if (latestEscrow.cushion) {
    const monthlyEscrow = latestEscrow.monthlyPayment || 0;
    const maxCushion = monthlyEscrow * 2;
    
    if (latestEscrow.cushion > maxCushion) {
      violations.push({
        category: 'Financial Reconciliation',
        type: 'Excessive Escrow Cushion',
        description: `Escrow cushion of $${latestEscrow.cushion} exceeds 2-month limit`,
        law: 'RESPA Section 10 - 2-month cushion limit',
        recoveryAmount: latestEscrow.cushion - maxCushion,
        severity: 'high',
        evidence: {
          currentCushion: latestEscrow.cushion,
          legalLimit: maxCushion,
          overcharge: latestEscrow.cushion - maxCushion
        }
      });
    }
  }
  
  return violations;
};

/**
 * M47: PMI Continuation Detector
 * Detects PMI charged when LTV < 80%
 */
const detectPMIContinuation = (extractedData, loanData) => {
  const violations = [];
  
  const pmiCharges = (extractedData.fees || []).filter(f =>
    f.name.toLowerCase().includes('pmi') ||
    f.name.toLowerCase().includes('mortgage insurance') ||
    f.name.toLowerCase().includes('mi premium')
  );
  
  if (pmiCharges.length === 0) return violations;
  
  // Calculate current LTV
  const currentBalance = loanData.currentBalance || loanData.originalAmount;
  const propertyValue = loanData.originalPropertyValue || loanData.purchasePrice;
  const currentLTV = (currentBalance / propertyValue) * 100;
  
  // Check if LTV is below 80%
  if (currentLTV < 80) {
    // PMI should have been cancelled
    const monthsOvercharged = Math.floor(pmiCharges.length / 12); // Rough estimate
    const monthlyPMI = pmiCharges[0]?.amount || 150; // Default $150/month
    const totalOvercharge = pmiCharges.reduce((sum, charge) => sum + charge.amount, 0);
    
    violations.push({
      category: 'Financial Reconciliation',
      type: 'PMI Continuation (LTV < 80%)',
      description: `PMI continued despite LTV of ${currentLTV.toFixed(1)}% (should stop at 80%)`,
      law: 'Homeowners Protection Act - PMI cancellation rights',
      recoveryAmount: totalOvercharge,
      severity: 'critical',
      evidence: {
        currentLTV: currentLTV.toFixed(1),
        ltvThreshold: 80,
        monthlyPMI: monthlyPMI,
        monthsOvercharged: monthsOvercharged,
        totalOvercharge: totalOvercharge,
        currentBalance: currentBalance,
        propertyValue: propertyValue
      }
    });
  }
  
  // Check for final termination (LTV 78%)
  if (currentLTV < 78) {
    violations.push({
      category: 'Financial Reconciliation',
      type: 'PMI Past Final Termination (LTV < 78%)',
      description: `PMI must be terminated at 78% LTV (current: ${currentLTV.toFixed(1)}%)`,
      law: 'Homeowners Protection Act - Automatic termination',
      recoveryAmount: pmiCharges.reduce((sum, c) => sum + c.amount, 0),
      severity: 'critical',
      evidence: {
        currentLTV: currentLTV.toFixed(1),
        autoTerminationThreshold: 78
      }
    });
  }
  
  return violations;
};

/**
 * M48: Interest Miscalculation Detector
 * Detects errors in interest calculations
 */
const detectInterestMiscalculation = (extractedData, loanData) => {
  const violations = [];
  
  const payments = extractedData.paymentHistory || [];
  if (payments.length === 0) return violations;
  
  // Get stated interest rate
  const statedRate = loanData.interestRate || 0;
  const monthlyRate = statedRate / 100 / 12;
  
  // Check recent payments for interest accuracy
  let totalOvercharge = 0;
  let errorCount = 0;
  
  payments.slice(-12).forEach(payment => {
    const calculatedInterest = payment.principalBalance * monthlyRate;
    const chargedInterest = payment.interestCharged;
    
    const difference = Math.abs(chargedInterest - calculatedInterest);
    
    // If difference is more than $5, it's an error
    if (difference > 5) {
      totalOvercharge += (chargedInterest - calculatedInterest);
      errorCount++;
    }
  });
  
  if (errorCount > 0) {
    violations.push({
      category: 'Financial Reconciliation',
      type: 'Interest Miscalculation',
      description: `${errorCount} payments have interest calculation errors`,
      law: 'Truth in Lending Act - Accurate disclosure',
      recoveryAmount: totalOvercharge,
      severity: 'high',
      evidence: {
        paymentsAffected: errorCount,
        totalOvercharge: totalOvercharge,
        statedRate: statedRate,
        averageError: totalOvercharge / errorCount
      }
    });
  }
  
  return violations;
};

/**
 * M49: Tax/Insurance Overpayment Detector
 * Detects overpayment of property taxes or insurance from escrow
 */
const detectTaxInsuranceOverpayment = (extractedData, loanData) => {
  const violations = [];
  
  // Compare tax bills to escrow disbursements
  if (extractedData.taxBills && extractedData.escrowDisbursements) {
    const taxDisbursements = extractedData.escrowDisbursements.filter(d =>
      d.category === 'property_tax'
    );
    
    const actualTaxes = extractedData.taxBills.reduce((sum, bill) => sum + bill.amount, 0);
    const paidTaxes = taxDisbursements.reduce((sum, d) => sum + d.amount, 0);
    
    if (paidTaxes > actualTaxes) {
      violations.push({
        category: 'Financial Reconciliation',
        type: 'Property Tax Overpayment',
        description: `Escrow paid $${paidTaxes} but actual taxes were $${actualTaxes}`,
        law: 'RESPA Section 10',
        recoveryAmount: paidTaxes - actualTaxes,
        severity: 'high',
        evidence: {
          actualTaxBills: actualTaxes,
          escrowDisbursed: paidTaxes,
          overpayment: paidTaxes - actualTaxes
        }
      });
    }
  }
  
  // Compare insurance to escrow disbursements
  if (extractedData.insurancePolicies && extractedData.escrowDisbursements) {
    const insuranceDisbursements = extractedData.escrowDisbursements.filter(d =>
      d.category === 'insurance'
    );
    
    const actualPremium = extractedData.insurancePolicies[0]?.premium || 0;
    const paidPremiums = insuranceDisbursements.reduce((sum, d) => sum + d.amount, 0);
    
    if (paidPremiums > actualPremium * 1.1) { // 10% tolerance
      violations.push({
        category: 'Financial Reconciliation',
        type: 'Insurance Overpayment',
        description: `Escrow paid $${paidPremiums} but actual premium was $${actualPremium}`,
        law: 'RESPA Section 10',
        recoveryAmount: paidPremiums - actualPremium,
        severity: 'medium',
        evidence: {
          actualPremium: actualPremium,
          escrowDisbursed: paidPremiums,
          overpayment: paidPremiums - actualPremium
        }
      });
    }
  }
  
  return violations;
};

/**
 * M50: Principal Balance Reconciliation
 * Verifies principal reduction matches payments
 */
const reconcilePrincipalBalance = (extractedData, loanData) => {
  const violations = [];
  
  const payments = extractedData.paymentHistory || [];
  if (payments.length < 2) return violations;
  
  // Check if principal reduction matches payments
  const firstPayment = payments[0];
  const lastPayment = payments[payments.length - 1];
  
  const principalPaid = payments.reduce((sum, p) => sum + (p.principalPaid || 0), 0);
  const expectedReduction = firstPayment.principalBalance - lastPayment.principalBalance;
  
  const difference = Math.abs(principalPaid - expectedReduction);
  
  // If difference is more than $100, something is wrong
  if (difference > 100) {
    violations.push({
      category: 'Financial Reconciliation',
      type: 'Principal Balance Mismatch',
      description: `Principal paid ($${principalPaid}) doesn't match balance reduction ($${expectedReduction})`,
      law: 'Truth in Lending Act',
      recoveryAmount: difference,
      severity: 'high',
      evidence: {
        principalPaidAccordingToStatements: principalPaid,
        actualBalanceReduction: expectedReduction,
        discrepancy: difference
      }
    });
  }
  
  return violations;
};

/**
 * M51: Duplicate Payment Detector
 * Finds payments applied twice or not credited
 */
const detectDuplicatePayments = (extractedData, loanData) => {
  const violations = [];
  
  const payments = extractedData.paymentHistory || [];
  
  // Group payments by amount and date
  const paymentGroups = {};
  
  payments.forEach(payment => {
    const key = `${payment.amount}_${payment.date}`;
    if (!paymentGroups[key]) {
      paymentGroups[key] = [];
    }
    paymentGroups[key].push(payment);
  });
  
  // Check for duplicates
  Object.entries(paymentGroups).forEach(([key, group]) => {
    if (group.length > 1) {
      // Check if they're actually the same payment
      const isSameCheck = group.every(p => p.checkNumber === group[0].checkNumber);
      
      if (isSameCheck) {
        violations.push({
          category: 'Financial Reconciliation',
          type: 'Payment Applied Twice',
          description: `Payment of $${group[0].amount} applied ${group.length} times`,
          law: 'RESPA - Accurate payment accounting',
          recoveryAmount: group[0].amount * (group.length - 1),
          severity: 'critical',
          evidence: {
            paymentAmount: group[0].amount,
            timesApplied: group.length,
            checkNumber: group[0].checkNumber
          }
        });
      }
    }
  });
  
  return violations;
};

/**
 * M52: Late Fee Timing Validator
 * Checks if late fees charged within grace period
 */
const validateLateFeeTiming = (extractedData, loanData) => {
  const violations = [];
  
  const payments = extractedData.paymentHistory || [];
  const lateFees = (extractedData.fees || []).filter(f =>
    f.name.toLowerCase().includes('late')
  );
  
  lateFees.forEach(lateFee => {
    // Find payment for this month
    const payment = payments.find(p => {
      const payDate = new Date(p.date);
      const feeDate = new Date(lateFee.date);
      return payDate.getMonth() === feeDate.getMonth() &&
             payDate.getFullYear() === feeDate.getFullYear();
    });
    
    if (payment) {
      const dueDate = new Date(payment.dueDate);
      const payDate = new Date(payment.date);
      const gracePeriod = loanData.gracePeriod || 15; // Default 15 days
      
      const daysLate = Math.floor((payDate - dueDate) / (1000 * 60 * 60 * 24));
      
      if (daysLate < gracePeriod) {
        violations.push({
          category: 'Financial Reconciliation',
          type: 'Late Fee Within Grace Period',
          description: `Late fee charged at ${daysLate} days (grace period: ${gracePeriod} days)`,
          law: 'RESPA - Grace period requirements',
          recoveryAmount: lateFee.amount,
          severity: 'medium',
          evidence: {
            daysLate: daysLate,
            gracePeriod: gracePeriod,
            lateFeeAmount: lateFee.amount
          }
        });
      }
    }
  });
  
  return violations;
};

/**
 * MAIN EXPORT: Reconcile Financials
 * Runs all 7 financial reconciliation miners
 */
const reconcileFinancials = async (extractedData, loanData) => {
  console.log('   Running M46-M52: Financial Reconciliation Miners...');
  
  const allViolations = [
    ...detectEscrowShortfall(extractedData, loanData),
    ...detectPMIContinuation(extractedData, loanData),
    ...detectInterestMiscalculation(extractedData, loanData),
    ...detectTaxInsuranceOverpayment(extractedData, loanData),
    ...reconcilePrincipalBalance(extractedData, loanData),
    ...detectDuplicatePayments(extractedData, loanData),
    ...validateLateFeeTiming(extractedData, loanData)
  ];
  
  console.log(`   ✓ Found ${allViolations.length} financial violations`);
  
  return allViolations;
};

module.exports = {
  reconcileFinancials,
  detectEscrowShortfall,
  detectPMIContinuation,
  detectInterestMiscalculation,
  detectTaxInsuranceOverpayment,
  reconcilePrincipalBalance,
  detectDuplicatePayments,
  validateLateFeeTiming
};