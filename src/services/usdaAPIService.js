'use strict';

const axios = require('axios');

// Configuration for USDA and FDA API Keys
const USDA_API_KEY = '4F158DB1-85C2-3243-BFFA-58B53FB40D23';
const FDA_API_URL = 'https://api.fda.gov/food/recalled.json'; // Example endpoint for FDA recalls

// Base URLs for APIs
const USDA_BASE_URL = 'https://api.nass.usda.gov/qt';
const FOOD_RECALL_BASE_URL = 'https://api.fda.gov/Food/recalls';

// Utility function for handling API requests
const fetchFromAPI = async (url, params) => {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        throw new Error('API request failed: ' + error.message);
    }
};

// Fetch market price for a commodity
const fetchMarketPrice = async (commodity) => {
    const url = `${USDA_BASE_URL}/marketprice`;
    const params = { api_key: USDA_API_KEY, commodity };
    return await fetchFromAPI(url, params);
};

// Search for commodities
const searchCommodities = async (searchTerm) => {
    const url = `${USDA_BASE_URL}/commodities`;
    const params = { api_key: USDA_API_KEY, search: searchTerm };
    return await fetchFromAPI(url, params);
};

// Fetch historical data for a commodity
const fetchHistoricalData = async (commodity, year) => {
    const url = `${USDA_BASE_URL}/historicaldata`;
    const params = { api_key: USDA_API_KEY, commodity, year };
    return await fetchFromAPI(url, params);
};

// Track port activity
const trackPortActivity = async (portID) => {
    const url = `${USDA_BASE_URL}/portactivity`;
    const params = { api_key: USDA_API_KEY, portID };
    return await fetchFromAPI(url, params);
};

// Fetch food safety data from FDA recall API
const fetchFoodSafetyData = async () => {
    return await fetchFromAPI(FOOD_RECALL_BASE_URL, { api_key: FDA_API_KEY });
};

// Exporting the methods
module.exports = {
    fetchMarketPrice,
    searchCommodities,
    fetchHistoricalData,
    trackPortActivity,
    fetchFoodSafetyData,
};
