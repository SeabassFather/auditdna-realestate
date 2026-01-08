/**
 * TraceCert Service - Traceability and certification operations
 */

import { get, post, put } from './api';

/**
 * Get traceability records
 */
export const getTraceabilityRecords = async (entityId) => {
  return await get(`/tracecert/records?entityId=${entityId}`);
};

/**
 * Create traceability record
 */
export const createTraceabilityRecord = async (recordData) => {
  return await post('/tracecert/records', recordData);
};

/**
 * Upload lab test results
 */
export const uploadLabResults = async (testType, file, metadata) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('testType', testType);
  formData.append('metadata', JSON.stringify(metadata));
  
  return await post('/tracecert/lab-results', formData);
};

/**
 * Get lab test history
 */
export const getLabHistory = async (entityId, testType = null) => {
  const query = testType ? `?entityId=${entityId}&testType=${testType}` : `?entityId=${entityId}`;
  return await get(`/tracecert/lab-history${query}`);
};

/**
 * Calculate TraceCert score
 */
export const calculateTraceCertScore = async (entityId) => {
  return await post(`/tracecert/calculate-score`, { entityId });
};

/**
 * Generate QR certificate
 */
export const generateQRCertificate = async (certificateData) => {
  return await post('/tracecert/generate-qr', certificateData);
};

/**
 * Generate Corrective Action Plan
 */
export const generateCAP = async (issueData) => {
  return await post('/tracecert/generate-cap', issueData);
};

/**
 * Verify traceability chain
 */
export const verifyTraceabilityChain = async (chainId) => {
  return await get(`/tracecert/verify-chain/${chainId}`);
};

/**
 * Get risk assessment
 */
export const getRiskAssessment = async (entityId) => {
  return await get(`/tracecert/risk-assessment/${entityId}`);
};

/**
 * Local score calculation helper
 */
export const calculateLocalScore = (data) => {
  const {
    waterTestsPassed = 0,
    waterTestsTotal = 1,
    soilTestsPassed = 0,
    soilTestsTotal = 1,
    fertilizerCompliance = 0,
    certifications = 0,
  } = data;

  const waterScore = (waterTestsPassed / waterTestsTotal) * 30;
  const soilScore = (soilTestsPassed / soilTestsTotal) * 30;
  const fertilizerScore = fertilizerCompliance * 0.2;
  const certScore = Math.min(certifications * 5, 20);

  const totalScore = Math.round(waterScore + soilScore + fertilizerScore + certScore);

  return {
    score: Math.min(totalScore, 100),
    breakdown: {
      water: Math.round(waterScore),
      soil: Math.round(soilScore),
      fertilizer: Math.round(fertilizerScore),
      certifications: Math.round(certScore),
    },
  };
};

export default {
  getTraceabilityRecords,
  createTraceabilityRecord,
  uploadLabResults,
  getLabHistory,
  calculateTraceCertScore,
  generateQRCertificate,
  generateCAP,
  verifyTraceabilityChain,
  getRiskAssessment,
  calculateLocalScore,
};
