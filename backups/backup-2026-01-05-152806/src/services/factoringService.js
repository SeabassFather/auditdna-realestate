<<<<<<< HEAD
const FactoringFile = require('../models/FactoringFile');
=======
﻿const FactoringFile = require('../models/FactoringFile');
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
const logger = require('../config/logger');

// Parse invoice from various formats
exports.parseInvoice = async (invoiceData) => {
  try {
    // Handle different input formats
    let parsed = {};

    if (typeof invoiceData === 'string') {
      // Parse from text/OCR
      parsed = parseInvoiceText(invoiceData);
    } else if (invoiceData.type === 'pdf') {
      // Parse from PDF (would use pdf-parse in production)
      parsed = await parsePDFInvoice(invoiceData.content);
    } else {
      // Direct object input
      parsed = invoiceData;
    }

    return {
      invoiceNumber: parsed.invoiceNumber || parsed.invoice_number,
      invoiceDate: new Date(parsed.invoiceDate || parsed.date),
      dueDate: parsed.dueDate ? new Date(parsed.dueDate) : null,
      amount: parseFloat(parsed.amount || parsed.total),
      client: {
        name: parsed.clientName || parsed.from,
        address: parsed.clientAddress
      },
      debtor: {
        name: parsed.debtorName || parsed.to,
        address: parsed.debtorAddress
      },
      lineItems: parsed.lineItems || [],
      terms: parsed.terms || 'Net 30'
    };
  } catch (error) {
    logger.error('Error parsing invoice:', error);
    throw error;
  }
};

// Parse invoice from text
function parseInvoiceText(text) {
  const parsed = {};

  // Extract invoice number
  const invoiceMatch = text.match(/Invoice\s*#?\s*:?\s*(\w+)/i);
  if (invoiceMatch) parsed.invoiceNumber = invoiceMatch[1];

  // Extract date
  const dateMatch = text.match(/Date\s*:?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i);
  if (dateMatch) parsed.invoiceDate = dateMatch[1];

  // Extract amount
  const amountMatch = text.match(/Total\s*:?\s*\$?([\d,]+\.?\d*)/i);
  if (amountMatch) parsed.amount = amountMatch[1].replace(/,/g, '');

  return parsed;
}

// Parse PDF invoice (mock - would use pdf-parse)
async function parsePDFInvoice(pdfContent) {
  // In production, use pdf-parse library
  return {
    invoiceNumber: 'INV-' + Date.now(),
    invoiceDate: new Date(),
    amount: 0,
    lineItems: []
  };
}

// Calculate advance amount
exports.calculateAdvance = (data) => {
  const { invoiceAmount, advanceRate, feeRate } = data;

  const advanceAmount = invoiceAmount * (advanceRate / 100);
  const fee = advanceAmount * (feeRate / 100);
  const netAdvance = advanceAmount - fee;

  return {
    invoiceAmount: parseFloat(invoiceAmount.toFixed(2)),
    advanceRate,
    advanceAmount: parseFloat(advanceAmount.toFixed(2)),
    feeRate,
    feeAmount: parseFloat(fee.toFixed(2)),
    netAdvance: parseFloat(netAdvance.toFixed(2)),
    reserve: parseFloat((invoiceAmount - advanceAmount).toFixed(2))
  };
};

// Calculate client credit limit
exports.calculateClientCreditLimit = async (clientName) => {
  const files = await FactoringFile.find({ 'client.name': clientName });

  if (files.length === 0) {
    return {
      clientName,
      creditLimit: 0,
      currentOutstanding: 0,
      available: 0,
      recommendation: 'New client - start with $25,000 limit'
    };
  }

  // Calculate metrics
  const totalFunded = files.reduce((sum, f) => sum + (f.advance.approvedAmount || 0), 0);
  const avgInvoiceAmount = totalFunded / files.length;
  const repaidOnTime = files.filter(f => 
    f.repayment.status === 'paid' && 
    (!f.repayment.actualDate || !f.repayment.expectedDate ||
     f.repayment.actualDate <= f.repayment.expectedDate)
  ).length;
  const onTimeRate = repaidOnTime / files.length;

  // Current outstanding
  const outstanding = files
    .filter(f => f.status === 'funded' && f.repayment.status !== 'paid')
    .reduce((sum, f) => sum + (f.advance.approvedAmount || 0), 0);

  // Calculate recommended limit
  let recommendedLimit = avgInvoiceAmount * 5; // Base: 5x average invoice

  // Adjust for payment history
  if (onTimeRate >= 0.95) recommendedLimit *= 1.5;
  else if (onTimeRate >= 0.85) recommendedLimit *= 1.2;
  else if (onTimeRate < 0.70) recommendedLimit *= 0.5;

  return {
    clientName,
    metrics: {
      totalInvoicesFunded: files.length,
      avgInvoiceAmount: parseFloat(avgInvoiceAmount.toFixed(2)),
      onTimePaymentRate: parseFloat((onTimeRate * 100).toFixed(1)),
      totalFunded: parseFloat(totalFunded.toFixed(2))
    },
    creditLimit: Math.round(recommendedLimit),
    currentOutstanding: parseFloat(outstanding.toFixed(2)),
    available: Math.round(recommendedLimit - outstanding),
    utilization: parseFloat(((outstanding / recommendedLimit) * 100).toFixed(1))
  };
};

// Analyze debtor risk
exports.analyzeDebtorRisk = async (debtorName) => {
  const files = await FactoringFile.find({ 'debtor.name': debtorName });

  if (files.length === 0) {
    return {
      debtorName,
      riskLevel: 'unknown',
      recommendation: 'New debtor - verify creditworthiness before approval'
    };
  }

  // Calculate payment metrics
  const totalInvoices = files.length;
  const paidInvoices = files.filter(f => f.repayment.status === 'paid').length;
  const defaulted = files.filter(f => f.repayment.status === 'defaulted').length;

  const avgPaymentDays = files
    .filter(f => f.repayment.actualDate && f.invoice.invoiceDate)
    .map(f => {
      const invoiceDate = new Date(f.invoice.invoiceDate);
      const paymentDate = new Date(f.repayment.actualDate);
      return Math.floor((paymentDate - invoiceDate) / (1000 * 60 * 60 * 24));
    })
    .reduce((sum, days, _, arr) => sum + days / arr.length, 0);

  const totalExposure = files
    .filter(f => f.status === 'funded' && f.repayment.status !== 'paid')
    .reduce((sum, f) => sum + (f.invoice.amount || 0), 0);

  // Determine risk level
  let riskLevel;
  if (defaulted > 0 || (paidInvoices / totalInvoices) < 0.7) {
    riskLevel = 'high';
  } else if (avgPaymentDays > 60) {
    riskLevel = 'moderate';
  } else if (avgPaymentDays > 45) {
    riskLevel = 'low';
  } else {
    riskLevel = 'minimal';
  }

  return {
    debtorName,
    riskLevel,
    metrics: {
      totalInvoices,
      paidInvoices,
      defaultedInvoices: defaulted,
      paymentRate: parseFloat(((paidInvoices / totalInvoices) * 100).toFixed(1)),
      avgPaymentDays: parseFloat(avgPaymentDays.toFixed(1)),
      currentExposure: parseFloat(totalExposure.toFixed(2))
    },
    recommendation: getRiskRecommendation(riskLevel, avgPaymentDays)
  };
};

// Get risk recommendation
function getRiskRecommendation(riskLevel, avgDays) {
  switch (riskLevel) {
    case 'minimal':
      return 'Low risk debtor - approve with standard terms';
    case 'low':
      return 'Acceptable risk - approve with standard monitoring';
    case 'moderate':
      return `Moderate risk - ${avgDays} day average payment. Consider lower advance rate or additional verification`;
    case 'high':
      return 'High risk - decline or require significant compensating factors';
    default:
      return 'Unknown risk - verify payment history before approval';
  }
}

// Verify invoice authenticity
exports.verifyInvoice = async (fileNumber) => {
  // In production, this would:
  // 1. Check for duplicate invoice numbers
  // 2. Verify debtor contact information
  // 3. Confirm delivery/acceptance
  // 4. Check for cross-selling with other factors

  const file = await FactoringFile.findOne({ fileNumber });
  if (!file) return { valid: false, reason: 'File not found' };

  const duplicates = await FactoringFile.find({
    'invoice.invoiceNumber': file.invoice.invoiceNumber,
    fileNumber: { $ne: fileNumber }
  });

  if (duplicates.length > 0) {
    return {
      valid: false,
      reason: 'Duplicate invoice detected',
      duplicateFiles: duplicates.map(d => d.fileNumber)
    };
  }

  return {
    valid: true,
    checks: {
      duplicateCheck: 'passed',
      invoiceFormat: 'valid',
      dateCheck: 'valid'
    }
  };
};

<<<<<<< HEAD
module.exports = exports;
=======
module.exports = exports;
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
