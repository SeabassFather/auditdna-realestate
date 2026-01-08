/**
 * Grower Service - Grower management operations
 */

import { get, post, put } from './api';

/**
 * Get all growers
 */
export const getGrowers = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  return await get(`/growers?${queryString}`);
};

/**
 * Get grower by ID
 */
export const getGrowerById = async (id) => {
  return await get(`/growers/${id}`);
};

/**
 * Create new grower
 */
export const createGrower = async (growerData) => {
  return await post('/growers', growerData);
};

/**
 * Update grower
 */
export const updateGrower = async (id, growerData) => {
  return await put(`/growers/${id}`, growerData);
};

/**
 * Search growers
 */
export const searchGrowers = async (searchParams) => {
  return await post('/growers/search', searchParams);
};

/**
 * Get grower certifications
 */
export const getGrowerCertifications = async (growerId) => {
  return await get(`/growers/${growerId}/certifications`);
};

/**
 * Get grower products
 */
export const getGrowerProducts = async (growerId) => {
  return await get(`/growers/${growerId}/products`);
};

/**
 * Get grower locations
 */
export const getGrowerLocations = async (growerId) => {
  return await get(`/growers/${growerId}/locations`);
};

/**
 * Filter growers by region
 */
export const filterByRegion = (growers, region) => {
  if (!region || region === 'all') return growers;
  return growers.filter((grower) => grower.region === region);
};

/**
 * Filter growers by product
 */
export const filterByProduct = (growers, product) => {
  if (!product) return growers;
  return growers.filter((grower) =>
    grower.products?.some((p) =>
      p.toLowerCase().includes(product.toLowerCase())
    )
  );
};

/**
 * Calculate grower rating
 */
export const calculateGrowerRating = (growerData) => {
  const {
    certifications = [],
    completedOrders = 0,
    onTimeDeliveryRate = 0,
    qualityScore = 0,
  } = growerData;

  let rating = 3.0; // Base rating

  // Certification bonus
  rating += Math.min(certifications.length * 0.2, 1.0);

  // Order history bonus
  if (completedOrders > 100) rating += 0.5;
  else if (completedOrders > 50) rating += 0.3;
  else if (completedOrders > 10) rating += 0.1;

  // On-time delivery bonus
  rating += (onTimeDeliveryRate / 100) * 0.5;

  // Quality score bonus
  rating += (qualityScore / 100) * 0.5;

  return Math.min(Math.round(rating * 10) / 10, 5.0);
};

export default {
  getGrowers,
  getGrowerById,
  createGrower,
  updateGrower,
  searchGrowers,
  getGrowerCertifications,
  getGrowerProducts,
  getGrowerLocations,
  filterByRegion,
  filterByProduct,
  calculateGrowerRating,
};
