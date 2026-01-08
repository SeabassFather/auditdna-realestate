/**
 * BuyerRiskEngine - Risk assessment logic for buyers in factoring
 */

/**
 * Assess buyer risk for factoring decisions
 * @param {Object} buyerData - Buyer information
 * @returns {Object} Risk assessment results
 */
export const assessBuyerRisk = (buyerData = {}) => {
  const {
    creditScore = 0,
    paymentHistory = [],
    industryRisk = 'medium',
    yearsInBusiness = 0,
    annualRevenue = 0,
    outstandingDebt = 0
  } = buyerData;

  let riskScore = 100;
  const riskFactors = [];

  // Credit score assessment
  if (creditScore < 600) {
    riskScore -= 30;
    riskFactors.push('Low credit score');
  } else if (creditScore < 700) {
    riskScore -= 15;
    riskFactors.push('Below average credit score');
  }

  // Payment history assessment
  const latePayments = paymentHistory.filter(p => p.daysLate > 0).length;
  if (latePayments > 3) {
    riskScore -= 25;
    riskFactors.push(`${latePayments} late payments in history`);
  } else if (latePayments > 0) {
    riskScore -= 10;
    riskFactors.push(`${latePayments} late payment(s)`);
  }

  // Industry risk assessment
  const industryRiskMap = {
    low: 0,
    medium: -10,
    high: -20
  };
  riskScore += industryRiskMap[industryRisk] || -10;
  if (industryRisk === 'high') {
    riskFactors.push('High-risk industry');
  }

  // Business maturity
  if (yearsInBusiness < 2) {
    riskScore -= 15;
    riskFactors.push('Limited business history');
  } else if (yearsInBusiness < 5) {
    riskScore -= 5;
    riskFactors.push('Young business');
  }

  // Financial health
  const debtToRevenueRatio = annualRevenue > 0 ? outstandingDebt / annualRevenue : 1;
  if (debtToRevenueRatio > 0.5) {
    riskScore -= 20;
    riskFactors.push('High debt-to-revenue ratio');
  } else if (debtToRevenueRatio > 0.3) {
    riskScore -= 10;
    riskFactors.push('Elevated debt levels');
  }

  // Ensure score is between 0 and 100
  riskScore = Math.max(0, Math.min(100, riskScore));

  // Determine risk level
  let riskLevel = 'LOW';
  let recommendation = 'Approved for factoring';
  
  if (riskScore < 50) {
    riskLevel = 'HIGH';
    recommendation = 'Not recommended for factoring';
  } else if (riskScore < 70) {
    riskLevel = 'MEDIUM';
    recommendation = 'Conditional approval - requires additional security';
  }

  return {
    score: riskScore,
    level: riskLevel,
    factors: riskFactors,
    recommendation,
    maxFactoringAmount: calculateMaxFactoringAmount(riskScore, annualRevenue)
  };
};

/**
 * Calculate maximum factoring amount based on risk and revenue
 * @param {number} riskScore - Risk score (0-100)
 * @param {number} annualRevenue - Annual revenue
 * @returns {number} Maximum factoring amount
 */
const calculateMaxFactoringAmount = (riskScore, annualRevenue) => {
  const basePercentage = riskScore >= 80 ? 0.15 : riskScore >= 70 ? 0.10 : 0.05;
  return Math.floor(annualRevenue * basePercentage);
};

/**
 * Calculate factoring fee based on risk
 * @param {number} riskScore - Risk score (0-100)
 * @param {number} invoiceAmount - Invoice amount
 * @returns {Object} Fee calculation
 */
export const calculateFactoringFee = (riskScore, invoiceAmount) => {
  let feePercentage = 3.0; // Base fee 3%

  if (riskScore < 50) {
    feePercentage = 5.0;
  } else if (riskScore < 70) {
    feePercentage = 4.0;
  } else if (riskScore >= 85) {
    feePercentage = 2.5;
  }

  const fee = (invoiceAmount * feePercentage) / 100;
  const netAmount = invoiceAmount - fee;

  return {
    feePercentage,
    fee: Math.round(fee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100
  };
};

export default {
  assessBuyerRisk,
  calculateFactoringFee
};
