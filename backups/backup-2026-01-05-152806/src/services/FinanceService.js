/**
 * Finance Service - Financial operations and calculations
 */

import { get, post, put } from './api';

/**
 * Get financial products
 */
export const getFinancialProducts = async () => {
  return await get('/finance/products');
};

/**
 * Submit financing application
 */
export const submitFinancingApplication = async (applicationData) => {
  return await post('/finance/applications', applicationData);
};

/**
 * Get application status
 */
export const getApplicationStatus = async (applicationId) => {
  return await get(`/finance/applications/${applicationId}/status`);
};

/**
 * Calculate factoring fees
 */
export const calculateFactoringFees = (invoiceAmount, feePercentage, advancePercentage = 80) => {
  const fee = (invoiceAmount * feePercentage) / 100;
  const advanceAmount = (invoiceAmount * advancePercentage) / 100;
  const reserveAmount = invoiceAmount - advanceAmount;
  const netAdvance = advanceAmount - fee;

  return {
    invoiceAmount,
    feePercentage,
    fee: Math.round(fee * 100) / 100,
    advancePercentage,
    advanceAmount: Math.round(advanceAmount * 100) / 100,
    reserveAmount: Math.round(reserveAmount * 100) / 100,
    netAdvance: Math.round(netAdvance * 100) / 100,
  };
};

/**
 * Calculate PO financing terms
 */
export const calculatePOFinancingTerms = (poAmount, marginPercentage = 10, term = 90) => {
  const financingFee = (poAmount * marginPercentage) / 100;
  const totalCost = poAmount + financingFee;
  const dailyRate = financingFee / term;

  return {
    poAmount,
    marginPercentage,
    financingFee: Math.round(financingFee * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    term,
    dailyRate: Math.round(dailyRate * 100) / 100,
  };
};

/**
 * Assess credit risk
 */
export const assessCreditRisk = async (companyData) => {
  return await post('/finance/risk-assessment', companyData);
};

/**
 * Get interest rate
 */
export const getInterestRate = (creditScore, loanType = 'standard') => {
  const baseRates = {
    premium: 5.5,
    standard: 7.5,
    subprime: 10.5,
  };

  let rate = baseRates[loanType] || baseRates.standard;

  if (creditScore >= 750) rate -= 1.0;
  else if (creditScore >= 700) rate -= 0.5;
  else if (creditScore < 600) rate += 2.0;
  else if (creditScore < 650) rate += 1.0;

  return Math.round(rate * 100) / 100;
};

/**
 * Calculate loan payment
 */
export const calculateLoanPayment = (principal, annualRate, termMonths) => {
  const monthlyRate = annualRate / 100 / 12;
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);

  const totalPayment = payment * termMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: Math.round(payment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    principal,
    annualRate,
    termMonths,
  };
};

/**
 * Get escrow status
 */
export const getEscrowStatus = async (escrowId) => {
  return await get(`/finance/escrow/${escrowId}/status`);
};

/**
 * Create escrow account
 */
export const createEscrowAccount = async (escrowData) => {
  return await post('/finance/escrow', escrowData);
};

export default {
  getFinancialProducts,
  submitFinancingApplication,
  getApplicationStatus,
  calculateFactoringFees,
  calculatePOFinancingTerms,
  assessCreditRisk,
  getInterestRate,
  calculateLoanPayment,
  getEscrowStatus,
  createEscrowAccount,
};
