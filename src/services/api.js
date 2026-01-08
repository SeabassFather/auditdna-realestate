const API_BASE_URL = 'http://localhost:5000/api';

export const propertyAPI = {
  getAll: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/properties?${queryString}`);
    return response.json();
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    return response.json();
  },
  
  create: async (propertyData) => {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData)
    });
    return response.json();
  }
};

export const agentAPI = {
  register: async (agentData) => {
    const response = await fetch(`${API_BASE_URL}/agents/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentData)
    });
    return response.json();
  },
  
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/agents/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }
};

export const leadAPI = {
  create: async (leadData) => {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    return response.json();
  },
  
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/leads`);
    return response.json();
  }
};

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  } catch (err) {
    return { status: 'ERROR', message: err.message };
  }
};