// ================================================================
// USDA API Service - CM Products International Integration
// Date: 2025-11-11 08:07:00 UTC
// User: SeabassFather
// API Key: 4F158DB1-85C2-3243-BFFA-58B53FB40D23
// ================================================================

import axios from 'axios';

const USDA_API_KEY = process.env.REACT_APP_USDA_API_KEY || '4F158DB1-85C2-3243-BFFA-58B53FB40D23';
const AMS_BASE_URL = 'https://marsapi.ams.usda.gov/services/v1.2/reports';
const NASS_BASE_URL = 'https://quickstats.nass.usda.gov/api';
const MMN_BASE_URL = 'https://mymarketnews.ams.usda.gov/api/v1/reports';

console.log('🔑 USDA API Service Initialized');
console.log('📊 API Key Status:', USDA_API_KEY ? '✅ Loaded' : '❌ Missing');

// ================================================================
// AMS (Agricultural Marketing Service) - Market News Reports
// ================================================================
export const fetchAMSMarketReport = async (commodity, slug) => {
  try {
    console.log(`📡 Fetching AMS data for: ${commodity}`);
    
    const response = await axios.get(`${AMS_BASE_URL}/${slug}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AuditDNA/1.0'
      },
      timeout: 30000
    });

    console.log(`✅ AMS data received for ${commodity}`);
    return response.data;
    
  } catch (error) {
    console.warn(`⚠️ AMS API unavailable for ${commodity}, using mock data`);
    return getMockAMSData(commodity);
  }
};

// ================================================================
// NASS (National Agricultural Statistics Service) - Historical Data
// ================================================================
export const fetchNASSQuickStats = async (commodity, year = '2024') => {
  try {
    console.log(`📡 Fetching NASS QuickStats for: ${commodity} (${year})`);
    
    const params = {
      key: USDA_API_KEY,
      source_desc: 'SURVEY',
      sector_desc: 'CROPS',
      commodity_desc: commodity.toUpperCase(),
      year: year,
      agg_level_desc: 'NATIONAL',
      format: 'JSON'
    };

    const response = await axios.get(`${NASS_BASE_URL}/api_GET`, {
      params,
      timeout: 30000
    });

    console.log(`✅ NASS data received for ${commodity}`);
    return response.data;
    
  } catch (error) {
    console.warn(`⚠️ NASS API unavailable for ${commodity}, using mock data`);
    return getMockNASSData(commodity);
  }
};

// ================================================================
// FETCH 5-YEAR HISTORICAL PRICE TRENDS
// ================================================================
export const fetch5YearPriceTrends = async (commodity) => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
  
  try {
    console.log(`📊 Fetching 5-year trends for ${commodity}`);
    
    const promises = years.map(year => fetchNASSQuickStats(commodity, year.toString()));
    const results = await Promise.all(promises);
    
    const trendData = results.map((result, index) => ({
      year: years[index].toString(),
      price: result.data && result.data.length > 0 ? parseFloat(result.data[0].Value) : null,
      commodity: commodity
    }));

    console.log(`✅ 5-year trend data compiled for ${commodity}`);
    return trendData;
    
  } catch (error) {
    console.warn(`⚠️ 5-year trend fetch failed for ${commodity}, using mock data`);
    return getMock5YearData(commodity);
  }
};

// ================================================================
// MOCK DATA (Fallback for Development & API Downtime)
// ================================================================
const getMockAMSData = (commodity) => {
  const mockData = {
    'AVOCADOS': {
      commodity: 'AVOCADOS (HASS)',
      origin: 'CALIFORNIA/MEXICO',
      varieties: [
        {
          variety: 'HASS',
          size: '48S',
          priceLow: 42.00,
          priceHigh: 52.00,
          mostlyAt: 48.00,
          unit: 'per carton'
        },
        {
          variety: 'HASS',
          size: '60S',
          priceLow: 38.00,
          priceHigh: 48.00,
          mostlyAt: 44.00,
          unit: 'per carton'
        }
      ],
      reportDate: new Date().toISOString(),
      marketConditions: 'MODERATE SUPPLIES, STEADY DEMAND',
      volume: '2.4M lbs/week',
      trend: 'STABLE'
    },
    'STRAWBERRIES': {
      commodity: 'STRAWBERRIES',
      origin: 'CALIFORNIA/FLORIDA',
      varieties: [
        {
          variety: 'STRAWBERRIES',
          size: '1 LB TRAY',
          priceLow: 3.50,
          priceHigh: 5.50,
          mostlyAt: 4.50,
          unit: 'per tray'
        }
      ],
      reportDate: new Date().toISOString(),
      marketConditions: 'GOOD SUPPLIES, GOOD DEMAND',
      volume: '1.8M lbs/week',
      trend: 'INCREASING'
    },
    'TOMATOES': {
      commodity: 'TOMATOES',
      origin: 'FLORIDA/MEXICO',
      varieties: [
        {
          variety: 'ROUND',
          size: '25 LB CARTON',
          priceLow: 18.00,
          priceHigh: 28.00,
          mostlyAt: 24.00,
          unit: 'per carton'
        },
        {
          variety: 'ROMA',
          size: '25 LB CARTON',
          priceLow: 16.00,
          priceHigh: 26.00,
          mostlyAt: 22.00,
          unit: 'per carton'
        }
      ],
      reportDate: new Date().toISOString(),
      marketConditions: 'MODERATE SUPPLIES, GOOD DEMAND',
      volume: '3.2M lbs/week',
      trend: 'STABLE'
    },
    'LETTUCE': {
      commodity: 'LETTUCE',
      origin: 'CALIFORNIA/ARIZONA',
      varieties: [
        {
          variety: 'ROMAINE',
          size: '24 COUNT CARTON',
          priceLow: 15.00,
          priceHigh: 22.00,
          mostlyAt: 19.00,
          unit: 'per carton'
        },
        {
          variety: 'ICEBERG',
          size: '24 COUNT CARTON',
          priceLow: 12.00,
          priceHigh: 18.00,
          mostlyAt: 16.00,
          unit: 'per carton'
        }
      ],
      reportDate: new Date().toISOString(),
      marketConditions: 'GOOD SUPPLIES, FAIR DEMAND',
      volume: '2.1M lbs/week',
      trend: 'DECREASING'
    }
  };

  return mockData[commodity.toUpperCase()] || mockData['AVOCADOS'];
};

const getMockNASSData = (commodity) => {
  const currentYear = new Date().getFullYear();
  const basePrice = {
    'AVOCADOS': 45,
    'STRAWBERRIES': 30,
    'TOMATOES': 22,
    'LETTUCE': 18
  }[commodity.toUpperCase()] || 30;
  
  return {
    data: [
      {
        year: currentYear,
        commodity_desc: commodity,
        Value: (basePrice + Math.random() * 10).toFixed(2),
        unit_desc: '$ / CWT'
      }
    ]
  };
};

const getMock5YearData = (commodity) => {
  const currentYear = new Date().getFullYear();
  const basePrice = {
    'AVOCADOS': 38,
    'STRAWBERRIES': 24,
    'TOMATOES': 19,
    'LETTUCE': 15
  }[commodity.toUpperCase()] || 30;

  return [
    { year: (currentYear - 4).toString(), price: basePrice, commodity },
    { year: (currentYear - 3).toString(), price: basePrice + 4, commodity },
    { year: (currentYear - 2).toString(), price: basePrice + 8, commodity },
    { year: (currentYear - 1).toString(), price: basePrice + 12, commodity },
    { year: currentYear.toString(), price: basePrice + 10, commodity }
  ];
};

// ================================================================
// COMMODITY SLUG MAPPINGS (AMS Report Slugs)
// ================================================================
export const COMMODITY_SLUGS = {
  'AVOCADOS': 'fv_rfav_avocado-shipment',
  'STRAWBERRIES': 'fv_rfstrawberry',
  'TOMATOES': 'fv_rftomato',
  'LETTUCE': 'fv_rflettuce',
  'PEPPERS': 'fv_rfpepper',
  'CUCUMBERS': 'fv_rfcucumber',
  'ONIONS': 'fv_rfonion',
  'CITRUS': 'fv_rforange',
  'GRAPES': 'fv_rfgrape',
  'MELONS': 'fv_rfmelon'
};

// ================================================================
// UTILITY FUNCTIONS
// ================================================================
export const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)}`;
};

export const calculatePriceChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(2);
};

export const getMarketTrend = (priceChange) => {
  const change = parseFloat(priceChange);
  
  if (change > 10) return { trend: 'up', color: '#10b981', label: 'Strong Upward', icon: '📈' };
  if (change > 0) return { trend: 'up', color: '#10b981', label: 'Slight Upward', icon: '↗️' };
  if (change < -10) return { trend: 'down', color: '#ef4444', label: 'Strong Downward', icon: '📉' };
  if (change < 0) return { trend: 'down', color: '#ef4444', label: 'Slight Downward', icon: '↘️' };
  
  return { trend: 'stable', color: '#f59e0b', label: 'Stable', icon: '➡️' };
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getRegionalPricing = (commodity) => {
  const regions = ['California', 'Florida', 'Texas', 'Arizona', 'Mexico'];
  const basePrice = getMockAMSData(commodity).varieties[0].mostlyAt;
  
  return regions.map(region => ({
    region,
    price: (basePrice + (Math.random() * 10 - 5)).toFixed(2),
    volume: `${(Math.random() * 500 + 200).toFixed(0)}K lbs`,
    trend: Math.random() > 0.5 ? 'up' : 'down'
  }));
};

// ================================================================
// GROWER DIRECTORY
// ================================================================
export const fetchGrowerDirectory = async (commodity) => {
  console.log(`👨‍🌾 Fetching grower directory for ${commodity}`);
  
  // Mock grower data (replace with real USDA grower registry API)
  return [
    {
      id: 1,
      name: 'Fresh Harvest Co.',
      location: 'California, USA',
      certifications: ['GlobalGAP', 'FSMA', 'Organic'],
      products: [commodity],
      contact: 'john@freshharvest.com',
      score: 94
    },
    {
      id: 2,
      name: 'Valle Verde Organics',
      location: 'Sinaloa, Mexico',
      certifications: ['Organic', 'Fair Trade'],
      products: [commodity],
      contact: 'maria@valleverde.mx',
      score: 88
    }
  ];
};

// ================================================================
// EXPORT DEFAULT
// ================================================================
export default {
  fetchAMSMarketReport,
  fetchNASSQuickStats,
  fetch5YearPriceTrends,
  fetchGrowerDirectory,
  COMMODITY_SLUGS,
  formatPrice,
  calculatePriceChange,
  getMarketTrend,
  formatDate,
  getRegionalPricing
};