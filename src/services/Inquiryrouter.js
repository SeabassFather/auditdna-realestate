// =============================================
// AUDITDNA MEDIA INTELLIGENCE ENGINE (AMIE)
// INQUIRY ROUTER - COMMUNICATION SYSTEM
// =============================================
// Routes inquiries to: Email, SMS, WhatsApp
// Handles: Lead verification, Fraud detection, SLA tracking
// =============================================

import adEngine from './AdEngine';

// ========== INQUIRY STATES ==========
export const InquiryStates = {
  NEW: 'NEW',
  VERIFIED: 'VERIFIED',
  ROUTED: 'ROUTED',
  RESPONDED: 'RESPONDED',
  ESCALATED: 'ESCALATED',
  CLOSED: 'CLOSED',
  SPAM: 'SPAM',
  DUPLICATE: 'DUPLICATE'
};

// ========== COMMUNICATION CHANNELS ==========
export const Channels = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
  ADMIN_ALERT: 'ADMIN_ALERT',
  DASHBOARD: 'DASHBOARD'
};

// ========== INQUIRY ROUTER CLASS ==========
class InquiryRouter {
  constructor() {
    this.inquiries = new Map();
    this.advertisers = new Map();
    this.communicationLog = [];
    this.slaHours = 24;
    this.escalationHours = 48;
    
    // Configuration for external services
    this.config = {
      email: {
        enabled: true,
        provider: 'smtp', // or 'sendgrid', 'ses'
        fromAddress: 'inquiries@enjoybaja.com',
        adminEmail: 'admin@enjoybaja.com'
      },
      sms: {
        enabled: true,
        provider: 'twilio',
        fromNumber: '+15551234567'
      },
      whatsapp: {
        enabled: true,
        businessNumber: '+526463402686',
        apiProvider: 'twilio' // or 'meta'
      }
    };
  }

  // ========== ADVERTISER MANAGEMENT ==========
  
  registerAdvertiser(advertiserData) {
    const advertiser = {
      id: this.generateId('ADV'),
      ...advertiserData,
      contacts: advertiserData.contacts || [],
      preferences: {
        primaryChannel: Channels.EMAIL,
        smsEnabled: true,
        whatsappEnabled: true,
        instantNotifications: true,
        ...advertiserData.preferences
      },
      verification: {
        verified: false,
        verifiedAt: null,
        licenseNumber: advertiserData.licenseNumber || null,
        verificationDocs: []
      },
      createdAt: new Date().toISOString()
    };
    
    this.advertisers.set(advertiser.id, advertiser);
    adEngine.log('ADVERTISER_REGISTERED', { advertiserId: advertiser.id });
    
    return advertiser;
  }

  updateAdvertiser(advertiserId, updates) {
    const advertiser = this.advertisers.get(advertiserId);
    if (!advertiser) {
      throw new Error(`Advertiser ${advertiserId} not found`);
    }
    
    Object.assign(advertiser, updates, { updatedAt: new Date().toISOString() });
    adEngine.log('ADVERTISER_UPDATED', { advertiserId, updates });
    
    return advertiser;
  }

  getAdvertiser(advertiserId) {
    return this.advertisers.get(advertiserId);
  }

  // ========== INQUIRY CREATION ==========
  
  createInquiry(inquiryData) {
    const inquiry = {
      id: this.generateId('INQ'),
      ...inquiryData,
      state: InquiryStates.NEW,
      confidenceScore: 0,
      verificationChecks: [],
      communications: [],
      createdAt: new Date().toISOString(),
      slaDeadline: new Date(Date.now() + this.slaHours * 60 * 60 * 1000).toISOString(),
      escalationDeadline: new Date(Date.now() + this.escalationHours * 60 * 60 * 1000).toISOString()
    };
    
    // Run verification checks
    inquiry.verificationChecks = this.runVerificationChecks(inquiry);
    inquiry.confidenceScore = this.calculateConfidenceScore(inquiry);
    
    // Check for spam/duplicates
    if (inquiry.confidenceScore < 30) {
      inquiry.state = InquiryStates.SPAM;
    } else if (this.isDuplicate(inquiry)) {
      inquiry.state = InquiryStates.DUPLICATE;
    } else {
      inquiry.state = InquiryStates.VERIFIED;
    }
    
    this.inquiries.set(inquiry.id, inquiry);
    adEngine.log('INQUIRY_CREATED', { inquiryId: inquiry.id, state: inquiry.state, score: inquiry.confidenceScore });
    
    // Auto-route if verified
    if (inquiry.state === InquiryStates.VERIFIED) {
      this.routeInquiry(inquiry.id);
    }
    
    return inquiry;
  }

  // ========== VERIFICATION CHECKS ==========
  
  runVerificationChecks(inquiry) {
    const checks = [];
    
    // Email validation
    checks.push({
      type: 'EMAIL_FORMAT',
      passed: this.isValidEmail(inquiry.email),
      weight: 15
    });
    
    // Disposable email check
    checks.push({
      type: 'DISPOSABLE_EMAIL',
      passed: !this.isDisposableEmail(inquiry.email),
      weight: 20
    });
    
    // Phone validation
    if (inquiry.phone) {
      checks.push({
        type: 'PHONE_FORMAT',
        passed: this.isValidPhone(inquiry.phone),
        weight: 15
      });
    }
    
    // Name validation
    checks.push({
      type: 'NAME_FORMAT',
      passed: inquiry.name && inquiry.name.length >= 2,
      weight: 10
    });
    
    // Message content check
    if (inquiry.message) {
      checks.push({
        type: 'MESSAGE_QUALITY',
        passed: inquiry.message.length >= 10 && !this.containsSpamKeywords(inquiry.message),
        weight: 20
      });
    }
    
    // Geo consistency
    if (inquiry.geo && inquiry.slotId) {
      const slot = adEngine.getSlotById ? adEngine.getSlotById(inquiry.slotId) : null;
      checks.push({
        type: 'GEO_CONSISTENCY',
        passed: true, // Would check actual geo vs slot geo
        weight: 10
      });
    }
    
    // Rate limiting (same IP/email)
    checks.push({
      type: 'RATE_LIMIT',
      passed: !this.isRateLimited(inquiry.email, inquiry.ip),
      weight: 10
    });
    
    return checks;
  }

  calculateConfidenceScore(inquiry) {
    let score = 0;
    let totalWeight = 0;
    
    inquiry.verificationChecks.forEach(check => {
      totalWeight += check.weight;
      if (check.passed) {
        score += check.weight;
      }
    });
    
    return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
  }

  // ========== VALIDATION HELPERS ==========
  
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  isDisposableEmail(email) {
    const disposableDomains = [
      'tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com',
      '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'yopmail.com'
    ];
    const domain = email.split('@')[1]?.toLowerCase();
    return disposableDomains.includes(domain);
  }

  isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  containsSpamKeywords(text) {
    const spamKeywords = [
      'viagra', 'casino', 'lottery', 'winner', 'click here',
      'free money', 'act now', 'limited time', 'congratulations'
    ];
    const lower = text.toLowerCase();
    return spamKeywords.some(keyword => lower.includes(keyword));
  }

  isRateLimited(email, ip) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentInquiries = Array.from(this.inquiries.values()).filter(inq => {
      return new Date(inq.createdAt) > oneHourAgo &&
             (inq.email === email || inq.ip === ip);
    });
    return recentInquiries.length >= 5; // Max 5 inquiries per hour per email/IP
  }

  isDuplicate(inquiry) {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const duplicates = Array.from(this.inquiries.values()).filter(inq => {
      return inq.id !== inquiry.id &&
             new Date(inq.createdAt) > oneDayAgo &&
             inq.email === inquiry.email &&
             inq.slotId === inquiry.slotId;
    });
    return duplicates.length > 0;
  }

  // ========== ROUTING ==========
  
  routeInquiry(inquiryId) {
    const inquiry = this.inquiries.get(inquiryId);
    if (!inquiry) {
      throw new Error(`Inquiry ${inquiryId} not found`);
    }
    
    // Get campaign and advertiser
    const campaign = adEngine.getCampaign(inquiry.campaignId);
    if (!campaign) {
      adEngine.log('ROUTING_FAILED', { inquiryId, reason: 'Campaign not found' });
      return null;
    }
    
    const advertiser = this.advertisers.get(campaign.advertiserId);
    if (!advertiser) {
      // Route to admin if no advertiser
      this.sendAdminAlert(inquiry, 'No advertiser found for inquiry');
      return null;
    }
    
    // Determine channels based on advertiser preferences
    const channels = [];
    
    if (advertiser.preferences.primaryChannel === Channels.EMAIL || 
        advertiser.contacts.some(c => c.type === 'email')) {
      channels.push(Channels.EMAIL);
    }
    
    if (advertiser.preferences.smsEnabled && 
        advertiser.contacts.some(c => c.type === 'phone')) {
      channels.push(Channels.SMS);
    }
    
    if (advertiser.preferences.whatsappEnabled && 
        advertiser.contacts.some(c => c.type === 'whatsapp')) {
      channels.push(Channels.WHATSAPP);
    }
    
    // Always send dashboard notification
    channels.push(Channels.DASHBOARD);
    
    // Send to each channel
    const results = channels.map(channel => this.sendToChannel(inquiry, advertiser, channel));
    
    // Update inquiry state
    inquiry.state = InquiryStates.ROUTED;
    inquiry.routedAt = new Date().toISOString();
    inquiry.routedTo = advertiser.id;
    inquiry.communications = results;
    
    adEngine.log('INQUIRY_ROUTED', { inquiryId, advertiserId: advertiser.id, channels });
    
    return results;
  }

  // ========== CHANNEL DELIVERY ==========
  
  sendToChannel(inquiry, advertiser, channel) {
    const communication = {
      id: this.generateId('COMM'),
      inquiryId: inquiry.id,
      advertiserId: advertiser.id,
      channel,
      status: 'PENDING',
      sentAt: new Date().toISOString(),
      deliveredAt: null,
      errorMessage: null
    };
    
    try {
      switch (channel) {
        case Channels.EMAIL:
          this.sendEmail(inquiry, advertiser);
          break;
        case Channels.SMS:
          this.sendSMS(inquiry, advertiser);
          break;
        case Channels.WHATSAPP:
          this.sendWhatsApp(inquiry, advertiser);
          break;
        case Channels.DASHBOARD:
          // Dashboard notifications are instant
          break;
        case Channels.ADMIN_ALERT:
          this.sendAdminAlert(inquiry, 'Manual admin alert');
          break;
      }
      
      communication.status = 'SENT';
      communication.deliveredAt = new Date().toISOString();
      
    } catch (error) {
      communication.status = 'FAILED';
      communication.errorMessage = error.message;
      adEngine.log('COMMUNICATION_FAILED', { channel, error: error.message });
    }
    
    this.communicationLog.push(communication);
    
    return communication;
  }

  // ========== EMAIL ==========
  
  sendEmail(inquiry, advertiser) {
    const emailContact = advertiser.contacts.find(c => c.type === 'email');
    if (!emailContact) {
      throw new Error('No email contact found');
    }
    
    const emailData = {
      to: emailContact.value,
      from: this.config.email.fromAddress,
      subject: `New Inquiry - ${inquiry.name} - EnjoyBaja`,
      body: this.formatEmailBody(inquiry),
      inquiryId: inquiry.id
    };
    
    // In production, this would call actual email service
    // For now, log it
    console.log('EMAIL SEND:', emailData);
    adEngine.log('EMAIL_SENT', emailData);
    
    return emailData;
  }

  formatEmailBody(inquiry) {
    return `
NEW INQUIRY RECEIVED
====================

Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'Not provided'}

Message:
${inquiry.message || 'No message'}

Source: ${inquiry.source || 'Website'}
Page: ${inquiry.page || 'Unknown'}
Slot: ${inquiry.slotId || 'Unknown'}

Confidence Score: ${inquiry.confidenceScore}%
Inquiry ID: ${inquiry.id}

---
Reply within 24 hours to maintain SLA compliance.
This inquiry was verified by AuditDNA Media Intelligence Engine.
    `.trim();
  }

  // ========== SMS ==========
  
  sendSMS(inquiry, advertiser) {
    const phoneContact = advertiser.contacts.find(c => c.type === 'phone');
    if (!phoneContact) {
      throw new Error('No phone contact found');
    }
    
    const smsData = {
      to: phoneContact.value,
      from: this.config.sms.fromNumber,
      body: `EnjoyBaja Inquiry: ${inquiry.name} (${inquiry.email}). Score: ${inquiry.confidenceScore}%. Login to dashboard for details. ID: ${inquiry.id}`,
      inquiryId: inquiry.id
    };
    
    // In production, this would call Twilio API
    console.log('SMS SEND:', smsData);
    adEngine.log('SMS_SENT', smsData);
    
    return smsData;
  }

  // ========== WHATSAPP ==========
  
  sendWhatsApp(inquiry, advertiser) {
    const waContact = advertiser.contacts.find(c => c.type === 'whatsapp');
    if (!waContact) {
      throw new Error('No WhatsApp contact found');
    }
    
    const waData = {
      to: waContact.value,
      from: this.config.whatsapp.businessNumber,
      template: 'inquiry_notification',
      params: {
        name: inquiry.name,
        email: inquiry.email,
        score: inquiry.confidenceScore,
        inquiryId: inquiry.id
      }
    };
    
    // In production, this would call WhatsApp Business API
    console.log('WHATSAPP SEND:', waData);
    adEngine.log('WHATSAPP_SENT', waData);
    
    return waData;
  }

  // ========== ADMIN ALERTS ==========
  
  sendAdminAlert(inquiry, reason) {
    const alertData = {
      to: this.config.email.adminEmail,
      type: 'ADMIN_ALERT',
      subject: `ALERT: ${reason}`,
      inquiry,
      timestamp: new Date().toISOString()
    };
    
    console.log('ADMIN ALERT:', alertData);
    adEngine.log('ADMIN_ALERT_SENT', alertData);
    
    return alertData;
  }

  // ========== SLA MANAGEMENT ==========
  
  checkSLACompliance() {
    const now = new Date();
    const violations = [];
    const warnings = [];
    
    this.inquiries.forEach(inquiry => {
      if (inquiry.state === InquiryStates.ROUTED) {
        const slaDeadline = new Date(inquiry.slaDeadline);
        const escalationDeadline = new Date(inquiry.escalationDeadline);
        
        if (now > escalationDeadline) {
          // Escalate
          inquiry.state = InquiryStates.ESCALATED;
          violations.push(inquiry.id);
          this.sendAdminAlert(inquiry, 'SLA VIOLATION - Escalation deadline exceeded');
        } else if (now > slaDeadline && !inquiry.slaWarningSet) {
          // SLA warning
          inquiry.slaWarningSet = true;
          warnings.push(inquiry.id);
          
          // Send reminder to advertiser
          const campaign = adEngine.getCampaign(inquiry.campaignId);
          if (campaign) {
            const advertiser = this.advertisers.get(campaign.advertiserId);
            if (advertiser) {
              this.sendToChannel(inquiry, advertiser, Channels.EMAIL);
            }
          }
        }
      }
    });
    
    adEngine.log('SLA_CHECK', { violations: violations.length, warnings: warnings.length });
    
    return { violations, warnings };
  }

  // ========== MARK INQUIRY RESPONDED ==========
  
  markResponded(inquiryId, responseData = {}) {
    const inquiry = this.inquiries.get(inquiryId);
    if (!inquiry) {
      throw new Error(`Inquiry ${inquiryId} not found`);
    }
    
    inquiry.state = InquiryStates.RESPONDED;
    inquiry.respondedAt = new Date().toISOString();
    inquiry.responseData = responseData;
    
    // Calculate response time
    const created = new Date(inquiry.createdAt);
    const responded = new Date(inquiry.respondedAt);
    inquiry.responseTimeMinutes = Math.round((responded - created) / (60 * 1000));
    
    adEngine.log('INQUIRY_RESPONDED', { 
      inquiryId, 
      responseTimeMinutes: inquiry.responseTimeMinutes 
    });
    
    return inquiry;
  }

  closeInquiry(inquiryId, outcome = '') {
    const inquiry = this.inquiries.get(inquiryId);
    if (!inquiry) {
      throw new Error(`Inquiry ${inquiryId} not found`);
    }
    
    inquiry.state = InquiryStates.CLOSED;
    inquiry.closedAt = new Date().toISOString();
    inquiry.outcome = outcome;
    
    adEngine.log('INQUIRY_CLOSED', { inquiryId, outcome });
    
    return inquiry;
  }

  // ========== QUERIES ==========
  
  getInquiry(inquiryId) {
    return this.inquiries.get(inquiryId);
  }

  getAllInquiries() {
    return Array.from(this.inquiries.values());
  }

  getInquiriesByState(state) {
    return this.getAllInquiries().filter(i => i.state === state);
  }

  getInquiriesByCampaign(campaignId) {
    return this.getAllInquiries().filter(i => i.campaignId === campaignId);
  }

  getInquiriesByAdvertiser(advertiserId) {
    return this.getAllInquiries().filter(i => {
      const campaign = adEngine.getCampaign(i.campaignId);
      return campaign && campaign.advertiserId === advertiserId;
    });
  }

  // ========== ANALYTICS ==========
  
  getInquiryStats(dateRange = {}) {
    let inquiries = this.getAllInquiries();
    
    if (dateRange.start) {
      inquiries = inquiries.filter(i => new Date(i.createdAt) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      inquiries = inquiries.filter(i => new Date(i.createdAt) <= new Date(dateRange.end));
    }
    
    const stats = {
      total: inquiries.length,
      byState: {},
      avgConfidenceScore: 0,
      avgResponseTimeMinutes: 0,
      slaCompliance: 0,
      spamRate: 0
    };
    
    // Count by state
    Object.values(InquiryStates).forEach(state => {
      stats.byState[state] = inquiries.filter(i => i.state === state).length;
    });
    
    // Average confidence
    const scores = inquiries.map(i => i.confidenceScore);
    stats.avgConfidenceScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
      : 0;
    
    // Average response time
    const responded = inquiries.filter(i => i.responseTimeMinutes);
    stats.avgResponseTimeMinutes = responded.length > 0
      ? Math.round(responded.reduce((a, b) => a + b.responseTimeMinutes, 0) / responded.length)
      : 0;
    
    // SLA compliance
    const slaTracked = inquiries.filter(i => i.state !== InquiryStates.NEW && i.state !== InquiryStates.SPAM);
    const withinSLA = slaTracked.filter(i => {
      if (!i.respondedAt) return false;
      return new Date(i.respondedAt) <= new Date(i.slaDeadline);
    });
    stats.slaCompliance = slaTracked.length > 0 
      ? Math.round((withinSLA.length / slaTracked.length) * 100) 
      : 100;
    
    // Spam rate
    stats.spamRate = inquiries.length > 0
      ? Math.round((stats.byState[InquiryStates.SPAM] / inquiries.length) * 100)
      : 0;
    
    return stats;
  }

  // ========== UTILITIES ==========
  
  generateId(prefix) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${random}`.toUpperCase();
  }
}

// ========== SINGLETON INSTANCE ==========
const inquiryRouter = new InquiryRouter();

export default inquiryRouter;
export { InquiryRouter, InquiryStates, Channels };