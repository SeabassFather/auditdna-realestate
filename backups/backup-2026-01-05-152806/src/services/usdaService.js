<<<<<<< HEAD
const axios = require('axios');
=======
﻿const axios = require('axios');
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
const logger = require('../config/logger');
const USDARecord = require('../models/USDARecord');

// USDA API endpoints
const USDA_AMS_URL = 'https://marsapi.ams.usda.gov/services/v1.2/reports';
const USDA_NASS_URL = 'https://quickstats.nass.usda.gov/api';
const USDA_MMN_URL = 'https://www.marketnews.usda.gov/mnp/fv-report';

// Fetch commodity price from USDA AMS
exports.fetchCommodityPrice = async (commodity, source = 'AMS') => {
  try {
    let priceData = null;

    // Try AMS first
    if (source === 'AMS' || source === 'auto') {
      priceData = await fetchFromAMS(commodity);
    }

    // Fallback to MMN
    if (!priceData && (source === 'MMN' || source === 'auto')) {
      priceData = await fetchFromMMN(commodity);
    }

    // Fallback to NASS
    if (!priceData && (source === 'NASS' || source === 'auto')) {
      priceData = await fetchFromNASS(commodity);
    }

    return priceData;
  } catch (error) {
    logger.error('Error fetching USDA price:', error);
    throw error;
  }
};

// Fetch from AMS
async function fetchFromAMS(commodity) {
  try {
    const response = await axios.get(`${USDA_AMS_URL}`, {
      params: {
        q: commodity,
        api_key: process.env.USDA_AMS_API_KEY
      },
      timeout: 10000
    });

    if (response.data && response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];
      
      return {
        commodity: commodity,
        dataSource: 'AMS',
        reportDate: new Date(result.report_date),
        priceData: {
          low: parseFloat(result.low_price) || 0,
          high: parseFloat(result.high_price) || 0,
          average: parseFloat(result.average_price) || 0
        },
        location: {
          city: result.city,
          state: result.state,
          region: result.region
        },
        sourceReportId: result.slug_id,
        metadata: {
          fetchedAt: new Date(),
          confidence: 100
        }
      };
    }

    return null;
  } catch (error) {
    logger.warn(`AMS fetch failed for ${commodity}:`, error.message);
    return null;
  }
}

// Fetch from MMN
async function fetchFromMMN(commodity) {
  try {
    const response = await axios.get(USDA_MMN_URL, {
      params: {
        commodity: commodity,
        api_key: process.env.USDA_MMN_API_KEY,
        format: 'json'
      },
      timeout: 10000
    });

    if (response.data && response.data.data && response.data.data.length > 0) {
      const result = response.data.data[0];
      
      return {
        commodity: commodity,
        dataSource: 'MMN',
        reportDate: new Date(result.date),
        priceData: {
          low: parseFloat(result.price_low) || 0,
          high: parseFloat(result.price_high) || 0,
          average: (parseFloat(result.price_low) + parseFloat(result.price_high)) / 2
        },
        location: {
          city: result.market_name,
          state: result.state
        },
        metadata: {
          fetchedAt: new Date(),
          confidence: 95
        }
      };
    }

    return null;
  } catch (error) {
    logger.warn(`MMN fetch failed for ${commodity}:`, error.message);
    return null;
  }
}

// Fetch from NASS
async function fetchFromNASS(commodity) {
  try {
    const response = await axios.get(`${USDA_NASS_URL}/api_GET/`, {
      params: {
        key: process.env.USDA_NASS_API_KEY,
        commodity_desc: commodity,
        statisticcat_desc: 'PRICE RECEIVED',
        format: 'JSON'
      },
      timeout: 10000
    });

    if (response.data && response.data.data && response.data.data.length > 0) {
      const result = response.data.data[0];
      
      return {
        commodity: commodity,
        dataSource: 'NASS',
        reportDate: new Date(result.year, 0, 1),
        priceData: {
          low: parseFloat(result.Value) * 0.9,
          high: parseFloat(result.Value) * 1.1,
          average: parseFloat(result.Value)
        },
        location: {
          state: result.state_name,
          region: result.agg_level_desc
        },
        unit: result.unit_desc?.toLowerCase() || 'cwt',
        metadata: {
          fetchedAt: new Date(),
          confidence: 85,
          notes: 'NASS data is typically annual average'
        }
      };
    }

    return null;
  } catch (error) {
    logger.warn(`NASS fetch failed for ${commodity}:`, error.message);
    return null;
  }
}

// Batch fetch prices
exports.batchFetchPrices = async (commodities, source = 'auto') => {
  const results = [];

  for (const commodity of commodities) {
    try {
      const priceData = await exports.fetchCommodityPrice(commodity, source);
      
      if (priceData) {
        const record = await USDARecord.create(priceData);
        results.push(record);
      }
    } catch (error) {
      logger.error(`Failed to fetch ${commodity}:`, error);
    }
  }

  return results;
};

// Generate forecast using linear regression
exports.generateForecast = (historicalData, days) => {
  if (!historicalData || historicalData.length < 2) {
    return null;
  }

  // Extract prices and dates
  const prices = historicalData.map(d => d.priceData.average);
  const dates = historicalData.map(d => new Date(d.reportDate).getTime());

  // Simple linear regression
  const n = prices.length;
  const sumX = dates.reduce((a, b) => a + b, 0);
  const sumY = prices.reduce((a, b) => a + b, 0);
  const sumXY = dates.reduce((sum, x, i) => sum + x * prices[i], 0);
  const sumXX = dates.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Generate forecast
  const forecast = [];
  const lastDate = new Date(dates[dates.length - 1]);

  for (let i = 1; i <= days; i++) {
    const futureDate = new Date(lastDate);
    futureDate.setDate(futureDate.getDate() + i);
    
    const futureTime = futureDate.getTime();
    const predictedPrice = slope * futureTime + intercept;

    forecast.push({
      date: futureDate,
      predictedPrice: Math.max(0, predictedPrice),
      confidence: Math.max(50, 100 - (i * 2)) // Decreasing confidence
    });
  }

  return {
    trend: slope > 0 ? 'increasing' : 'decreasing',
    forecast
  };
<<<<<<< HEAD
};
=======
};
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
