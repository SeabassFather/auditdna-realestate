/**
 * Invoice Service - Invoice management and factoring operations
 */

import { get, post, put } from './api';

/**
 * Get all invoices
 */
export const getInvoices = async () => {
  return await get('/invoices');
};

/**
 * Get invoice by ID
 */
export const getInvoiceById = async (id) => {
  return await get(`/invoices/${id}`);
};

/**
 * Create new invoice
 */
export const createInvoice = async (invoiceData) => {
  return await post('/invoices', invoiceData);
};

/**
 * Update invoice
 */
export const updateInvoice = async (id, invoiceData) => {
  return await put(`/invoices/${id}`, invoiceData);
};

/**
 * Submit invoice for factoring
 */
export const submitForFactoring = async (invoiceId, factoringData) => {
  return await post(`/invoices/${invoiceId}/factoring`, factoringData);
};

/**
 * Get invoice status
 */
export const getInvoiceStatus = async (invoiceId) => {
  return await get(`/invoices/${invoiceId}/status`);
};

/**
 * Calculate factoring amount
 */
export const calculateFactoringAmount = (invoiceAmount, feePercentage) => {
  const fee = (invoiceAmount * feePercentage) / 100;
  const netAmount = invoiceAmount - fee;
  
  return {
    invoiceAmount,
    feePercentage,
    fee: Math.round(fee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
  };
};

export default {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  submitForFactoring,
  getInvoiceStatus,
  calculateFactoringAmount,
};
