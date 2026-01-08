import crypto from 'crypto-js';

class ZadarmaService {
  constructor() {
    this.apiKey = 'a2aaea04d645d80e739c';
    this.apiSecret = '424a974e04f67227b466';
    this.baseURL = 'https://api.zadarma.com/v1';
    this.whatsappNumber = '+526463402686';
  }

  // Generate authentication signature
  generateSignature(method, params = '') {
    const paramsString = typeof params === 'object' ? new URLSearchParams(params).toString() : params;
    const md5Hash = crypto.MD5(paramsString).toString();
    const dataString = method + paramsString + md5Hash;
    const signature = crypto.HmacSHA1(dataString, this.apiSecret).toString(crypto.enc.Base64);
    return signature;
  }

  // Make Instant Call (Click-to-Call FinTech Feature)
  async makeInstantCall(toNumber, fromNumber = this.whatsappNumber) {
    try {
      const method = '/v1/request/callback/';
      const params = { from: fromNumber, to: toNumber, predicted: 'now' };
      const signature = this.generateSignature(method, params);

      const response = await fetch(`${this.baseURL}${method}?${new URLSearchParams(params)}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return await response.json();
    } catch (error) {
      console.error('Instant call error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send WhatsApp Message
  async sendWhatsApp(to, message) {
    try {
      const method = '/v1/sms/send/';
      const params = { number: to, message: message, caller_id: this.whatsappNumber };
      const signature = this.generateSignature(method, params);

      const response = await fetch(`${this.baseURL}${method}?${new URLSearchParams(params)}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return await response.json();
    } catch (error) {
      console.error('WhatsApp error:', error);
      return { success: false, error: error.message };
    }
  }

  // Record Call (CRM Feature)
  async recordCall(callId) {
    try {
      const method = '/v1/record/request/';
      const params = { call_id: callId };
      const signature = this.generateSignature(method, params);

      const response = await fetch(`${this.baseURL}${method}?${new URLSearchParams(params)}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get Call Statistics (CRM Dashboard)
  async getCallStats(startDate, endDate) {
    try {
      const method = '/v1/statistics/';
      const params = { start: startDate, end: endDate };
      const signature = this.generateSignature(method, params);

      const response = await fetch(`${this.baseURL}${method}?${new URLSearchParams(params)}`, {
        headers: { 'Authorization': `${this.apiKey}:${signature}` }
      });

      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Send Lead Notification
  async notifyNewLead(leadData) {
    const message = `🏠 NEW LEAD!
Name: ${leadData.name}
Email: ${leadData.email}
Phone: ${leadData.phone || 'N/A'}
Interest: ${leadData.propertyInterest || 'General'}
Budget: ${leadData.budgetRange || 'N/A'}`;

    return await this.sendWhatsApp(this.whatsappNumber, message);
  }
}

export default new ZadarmaService();