const crypto = require('crypto');
const axios = require('axios');

class ZadarmaService {
  constructor() {
    this.apiKey = 'a2aaea04d645d80e739c';
    this.apiSecret = '424a974e04f67227b466';
    this.baseURL = 'https://api.zadarma.com/v1';
    this.tollFreeNumber = null; // Set this when you get toll-free number
    this.callCenterNumber = '+526463402686'; // Your main number
  }

  // Generate signature for Zadarma API
  generateSignature(method, params = '') {
    const data = method + params + crypto.createHash('md5').update(params).digest('hex');
    return Buffer.from(crypto.createHmac('sha1', this.apiSecret).update(data).digest()).toString('base64');
  }

  // Configure toll-free forwarding to Zadarma call center
  async configureTollFreeForwarding(tollFreeNumber) {
    try {
      this.tollFreeNumber = tollFreeNumber;
      const method = '/v1/request/redirect/';
      const params = `number=${tollFreeNumber}&destination=${this.callCenterNumber}`;
      const signature = this.generateSignature(method, params);

      const response = await axios.get(`${this.baseURL}${method}?${params}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Toll-free forwarding error:', error);
      return { success: false, error: error.message };
    }
  }

  // Make outbound call (call center feature)
  async makeCall(to, from = null) {
    try {
      const method = '/v1/request/callback/';
      const params = `from=${from || this.callCenterNumber}&to=${to}`;
      const signature = this.generateSignature(method, params);

      const response = await axios.get(`${this.baseURL}${method}?${params}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get call statistics (CRM feature)
  async getCallStats(start, end) {
    try {
      const method = '/v1/statistics/';
      const params = `start=${start}&end=${end}`;
      const signature = this.generateSignature(method, params);

      const response = await axios.get(`${this.baseURL}${method}?${params}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Record call (CRM feature)
  async recordCall(callId) {
    try {
      const method = '/v1/record/request/';
      const params = `call_id=${callId}`;
      const signature = this.generateSignature(method, params);

      const response = await axios.get(`${this.baseURL}${method}?${params}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Send SMS notification for new leads
  async notifyNewLead(leadData) {
    try {
      const method = '/v1/sms/send/';
      const message = `NEW LEAD: ${leadData.name} - ${leadData.email} - ${leadData.phone || 'No phone'}`;
      const params = `number=${this.callCenterNumber}&message=${encodeURIComponent(message)}`;
      const signature = this.generateSignature(method, params);

      const response = await axios.get(`${this.baseURL}${method}?${params}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('SMS notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get call center stats (for CRM dashboard)
  async getCallCenterStats() {
    const today = new Date().toISOString().split('T')[0];
    return await this.getCallStats(today, today);
  }
}

module.exports = new ZadarmaService();