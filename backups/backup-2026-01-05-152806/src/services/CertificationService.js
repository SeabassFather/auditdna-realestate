/**
 * Certification Service - Certification management operations
 */

import { get, post, put } from './api';

/**
 * Get all certifications for an entity
 */
export const getCertifications = async (entityId) => {
  return await get(`/certifications?entityId=${entityId}`);
};

/**
 * Get certification by ID
 */
export const getCertificationById = async (id) => {
  return await get(`/certifications/${id}`);
};

/**
 * Create new certification
 */
export const createCertification = async (certificationData) => {
  return await post('/certifications', certificationData);
};

/**
 * Update certification
 */
export const updateCertification = async (id, certificationData) => {
  return await put(`/certifications/${id}`, certificationData);
};

/**
 * Upload certification document
 */
export const uploadCertificationDocument = async (certificationId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return await post(`/certifications/${certificationId}/upload`, formData);
};

/**
 * Check certification expiry
 */
export const checkExpiryStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) {
    return { status: 'expired', daysUntilExpiry };
  } else if (daysUntilExpiry <= 30) {
    return { status: 'expiring_soon', daysUntilExpiry };
  } else {
    return { status: 'active', daysUntilExpiry };
  }
};

/**
 * Get certification types
 */
export const getCertificationTypes = () => {
  return [
    'USDA Organic',
    'GlobalG.A.P.',
    'Primus GFS',
    'FSMA',
    'SENASICA',
    'SAGARPA',
    'Mexican Organic',
    'Fair Trade',
    'Rainforest Alliance',
  ];
};

export default {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  uploadCertificationDocument,
  checkExpiryStatus,
  getCertificationTypes,
};
