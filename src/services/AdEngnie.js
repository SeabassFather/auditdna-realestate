// =============================================
// AUDITDNA MEDIA INTELLIGENCE ENGINE (AMIE)
// AD ENGINE - CORE SLOT MANAGEMENT
// =============================================
// This is the brain - manages all ad operations
// Does NOT touch App.js or routes
// =============================================

import AdSlotConfig, { getSlotById, getSlotsByPage, calculateSlotPrice } from '../config/AdSlotConfig';

// ========== AD STATES ==========
export const AdStates = {
  DRAFT: 'DRAFT',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  APPROVED: 'APPROVED',
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  EXPIRING: 'EXPIRING',
  EXPIRED: 'EXPIRED',
  ARCHIVED: 'ARCHIVED',
  REJECTED: 'REJECTED',
  PAUSED: 'PAUSED'
};

// ========== AD ENGINE CLASS ==========
class AdEngine {
  constructor() {
    this.campaigns = new Map();
    this.slotOccupancy = new Map();
    this.listeners = [];
    this.auditLog = [];
  }

  // ========== CAMPAIGN MANAGEMENT ==========
  
  createCampaign(campaignData) {
    const campaign = {
      id: this.generateId('CAMP'),
      ...campaignData,
      state: AdStates.DRAFT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [{
        state: AdStates.DRAFT,
        timestamp: new Date().toISOString(),
        action: 'CREATED'
      }]
    };
    
    this.campaigns.set(campaign.id, campaign);
    this.log('CAMPAIGN_CREATED', campaign);
    this.notifyListeners('campaignCreated', campaign);
    
    return campaign;
  }

  updateCampaign(campaignId, updates) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }
    
    const previousState = { ...campaign };
    Object.assign(campaign, updates, { updatedAt: new Date().toISOString() });
    
    this.log('CAMPAIGN_UPDATED', { campaignId, updates, previousState });
    this.notifyListeners('campaignUpdated', campaign);
    
    return campaign;
  }

  getCampaign(campaignId) {
    return this.campaigns.get(campaignId);
  }

  getAllCampaigns() {
    return Array.from(this.campaigns.values());
  }

  getCampaignsByState(state) {
    return this.getAllCampaigns().filter(c => c.state === state);
  }

  getCampaignsByAdvertiser(advertiserId) {
    return this.getAllCampaigns().filter(c => c.advertiserId === advertiserId);
  }

  // ========== STATE TRANSITIONS ==========
  
  transitionState(campaignId, newState, metadata = {}) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }
    
    const validTransitions = this.getValidTransitions(campaign.state);
    if (!validTransitions.includes(newState)) {
      throw new Error(`Invalid transition from ${campaign.state} to ${newState}`);
    }
    
    const previousState = campaign.state;
    campaign.state = newState;
    campaign.updatedAt = new Date().toISOString();
    campaign.history.push({
      state: newState,
      previousState,
      timestamp: new Date().toISOString(),
      action: 'STATE_TRANSITION',
      metadata
    });
    
    // Handle state-specific logic
    this.handleStateChange(campaign, previousState, newState);
    
    this.log('STATE_TRANSITION', { campaignId, previousState, newState, metadata });
    this.notifyListeners('stateTransition', { campaign, previousState, newState });
    
    return campaign;
  }

  getValidTransitions(currentState) {
    const transitions = {
      [AdStates.DRAFT]: [AdStates.PENDING_VERIFICATION, AdStates.ARCHIVED],
      [AdStates.PENDING_VERIFICATION]: [AdStates.APPROVED, AdStates.REJECTED],
      [AdStates.APPROVED]: [AdStates.SCHEDULED, AdStates.ARCHIVED],
      [AdStates.SCHEDULED]: [AdStates.LIVE, AdStates.PAUSED, AdStates.ARCHIVED],
      [AdStates.LIVE]: [AdStates.EXPIRING, AdStates.PAUSED, AdStates.ARCHIVED],
      [AdStates.EXPIRING]: [AdStates.EXPIRED, AdStates.LIVE],
      [AdStates.EXPIRED]: [AdStates.ARCHIVED],
      [AdStates.PAUSED]: [AdStates.SCHEDULED, AdStates.LIVE, AdStates.ARCHIVED],
      [AdStates.REJECTED]: [AdStates.DRAFT, AdStates.ARCHIVED],
      [AdStates.ARCHIVED]: []
    };
    return transitions[currentState] || [];
  }

  handleStateChange(campaign, previousState, newState) {
    switch (newState) {
      case AdStates.LIVE:
        this.occupySlot(campaign.slotId, campaign.id);
        break;
      case AdStates.EXPIRED:
      case AdStates.ARCHIVED:
      case AdStates.PAUSED:
        this.releaseSlot(campaign.slotId, campaign.id);
        break;
      default:
        break;
    }
  }

  // ========== SLOT OCCUPANCY ==========
  
  occupySlot(slotId, campaignId) {
    const slot = getSlotById(slotId);
    if (!slot) {
      throw new Error(`Slot ${slotId} not found`);
    }
    
    const currentOccupants = this.slotOccupancy.get(slotId) || [];
    if (currentOccupants.length >= slot.maxAdvertisers) {
      throw new Error(`Slot ${slotId} is at maximum capacity`);
    }
    
    currentOccupants.push(campaignId);
    this.slotOccupancy.set(slotId, currentOccupants);
    
    this.log('SLOT_OCCUPIED', { slotId, campaignId, occupants: currentOccupants.length });
  }

  releaseSlot(slotId, campaignId) {
    const currentOccupants = this.slotOccupancy.get(slotId) || [];
    const index = currentOccupants.indexOf(campaignId);
    
    if (index > -1) {
      currentOccupants.splice(index, 1);
      this.slotOccupancy.set(slotId, currentOccupants);
      this.log('SLOT_RELEASED', { slotId, campaignId, occupants: currentOccupants.length });
    }
  }

  isSlotAvailable(slotId) {
    const slot = getSlotById(slotId);
    if (!slot) return false;
    
    const currentOccupants = this.slotOccupancy.get(slotId) || [];
    return currentOccupants.length < slot.maxAdvertisers;
  }

  getSlotOccupancy(slotId) {
    return this.slotOccupancy.get(slotId) || [];
  }

  getAvailableSlots(page = null) {
    let slots = page ? getSlotsByPage(page) : Object.values(AdSlotConfig.slots);
    return slots.filter(slot => this.isSlotAvailable(slot.id));
  }

  // ========== PRICING ==========
  
  calculateCampaignPrice(slotId, duration, multipliers = []) {
    const basePrice = calculateSlotPrice(slotId, multipliers);
    if (!basePrice) return null;
    
    // Duration in months
    const monthlyPrice = basePrice;
    const totalPrice = monthlyPrice * duration;
    
    // Volume discounts
    let discount = 0;
    if (duration >= 12) discount = 0.15;
    else if (duration >= 6) discount = 0.10;
    else if (duration >= 3) discount = 0.05;
    
    const discountedPrice = totalPrice * (1 - discount);
    
    return {
      basePrice,
      monthlyPrice,
      duration,
      totalBeforeDiscount: totalPrice,
      discount: discount * 100,
      totalPrice: Math.round(discountedPrice)
    };
  }

  // ========== QUERIES ==========
  
  getLiveCampaignsForSlot(slotId) {
    const occupants = this.slotOccupancy.get(slotId) || [];
    return occupants.map(id => this.campaigns.get(id)).filter(Boolean);
  }

  getLiveCampaignsForPage(page) {
    const slots = getSlotsByPage(page);
    const campaigns = [];
    
    slots.forEach(slot => {
      campaigns.push(...this.getLiveCampaignsForSlot(slot.id));
    });
    
    return campaigns;
  }

  getExpiringCampaigns(daysThreshold = 7) {
    const now = new Date();
    const threshold = new Date(now.getTime() + daysThreshold * 24 * 60 * 60 * 1000);
    
    return this.getAllCampaigns().filter(campaign => {
      if (campaign.state !== AdStates.LIVE) return false;
      const endDate = new Date(campaign.endDate);
      return endDate <= threshold;
    });
  }

  // ========== AUDIT & LOGGING ==========
  
  log(action, data) {
    const entry = {
      id: this.generateId('LOG'),
      action,
      data,
      timestamp: new Date().toISOString()
    };
    this.auditLog.push(entry);
    
    // Keep only last 10000 entries
    if (this.auditLog.length > 10000) {
      this.auditLog = this.auditLog.slice(-10000);
    }
  }

  getAuditLog(filter = {}) {
    let logs = [...this.auditLog];
    
    if (filter.action) {
      logs = logs.filter(l => l.action === filter.action);
    }
    if (filter.campaignId) {
      logs = logs.filter(l => l.data?.campaignId === filter.campaignId);
    }
    if (filter.since) {
      logs = logs.filter(l => new Date(l.timestamp) >= new Date(filter.since));
    }
    
    return logs;
  }

  // ========== EVENT LISTENERS ==========
  
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notifyListeners(event, data) {
    this.listeners.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Listener error:', error);
      }
    });
  }

  // ========== UTILITIES ==========
  
  generateId(prefix) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${random}`.toUpperCase();
  }

  // ========== EXPORT/IMPORT ==========
  
  exportData() {
    return {
      campaigns: Array.from(this.campaigns.entries()),
      slotOccupancy: Array.from(this.slotOccupancy.entries()),
      auditLog: this.auditLog,
      exportedAt: new Date().toISOString()
    };
  }

  importData(data) {
    if (data.campaigns) {
      this.campaigns = new Map(data.campaigns);
    }
    if (data.slotOccupancy) {
      this.slotOccupancy = new Map(data.slotOccupancy);
    }
    if (data.auditLog) {
      this.auditLog = data.auditLog;
    }
    this.log('DATA_IMPORTED', { importedAt: new Date().toISOString() });
  }
}

// ========== SINGLETON INSTANCE ==========
const adEngine = new AdEngine();

export default adEngine;
export { AdEngine };