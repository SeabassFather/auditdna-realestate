// =============================================
// AUDITDNA MEDIA INTELLIGENCE ENGINE (AMIE)
// AD LIFECYCLE MANAGER - TIME AUTOMATION
// =============================================
// Handles: Auto-publish, Auto-expire, Grace periods
// Runs on intervals - NO manual intervention needed
// =============================================

import adEngine, { AdStates } from './AdEngine';

class AdLifecycleManager {
  constructor() {
    this.checkInterval = null;
    this.gracePeriodDays = 3;
    this.expiryWarningDays = 7;
    this.isRunning = false;
    this.lastCheck = null;
    this.scheduledJobs = new Map();
  }

  // ========== START/STOP LIFECYCLE MANAGER ==========
  
  start(intervalMinutes = 5) {
    if (this.isRunning) {
      console.log('AdLifecycleManager already running');
      return;
    }
    
    console.log(`AdLifecycleManager starting with ${intervalMinutes} minute interval`);
    
    // Run immediately on start
    this.runLifecycleCheck();
    
    // Then run on interval
    this.checkInterval = setInterval(() => {
      this.runLifecycleCheck();
    }, intervalMinutes * 60 * 1000);
    
    this.isRunning = true;
    adEngine.log('LIFECYCLE_MANAGER_STARTED', { intervalMinutes });
  }

  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.isRunning = false;
    adEngine.log('LIFECYCLE_MANAGER_STOPPED', {});
    console.log('AdLifecycleManager stopped');
  }

  // ========== MAIN LIFECYCLE CHECK ==========
  
  runLifecycleCheck() {
    const now = new Date();
    this.lastCheck = now.toISOString();
    
    console.log(`Running lifecycle check at ${this.lastCheck}`);
    
    const results = {
      scheduled: this.processScheduledCampaigns(now),
      expiring: this.processExpiringCampaigns(now),
      expired: this.processExpiredCampaigns(now),
      gracePeriod: this.processGracePeriodCampaigns(now)
    };
    
    adEngine.log('LIFECYCLE_CHECK_COMPLETED', { timestamp: this.lastCheck, results });
    
    return results;
  }

  // ========== PROCESS SCHEDULED CAMPAIGNS ==========
  // Auto-publish when start date arrives
  
  processScheduledCampaigns(now) {
    const scheduled = adEngine.getCampaignsByState(AdStates.SCHEDULED);
    const published = [];
    
    scheduled.forEach(campaign => {
      const startDate = new Date(campaign.startDate);
      
      if (startDate <= now) {
        try {
          adEngine.transitionState(campaign.id, AdStates.LIVE, {
            trigger: 'AUTO_PUBLISH',
            scheduledFor: campaign.startDate,
            publishedAt: now.toISOString()
          });
          published.push(campaign.id);
          
          // Trigger notification
          this.triggerNotification('CAMPAIGN_LIVE', campaign);
          
        } catch (error) {
          console.error(`Failed to publish campaign ${campaign.id}:`, error);
          adEngine.log('AUTO_PUBLISH_FAILED', { campaignId: campaign.id, error: error.message });
        }
      }
    });
    
    return { processed: scheduled.length, published: published.length, ids: published };
  }

  // ========== PROCESS EXPIRING CAMPAIGNS ==========
  // Warn before expiry
  
  processExpiringCampaigns(now) {
    const live = adEngine.getCampaignsByState(AdStates.LIVE);
    const warned = [];
    const warningThreshold = new Date(now.getTime() + this.expiryWarningDays * 24 * 60 * 60 * 1000);
    
    live.forEach(campaign => {
      const endDate = new Date(campaign.endDate);
      
      // Check if within warning window but not already marked expiring
      if (endDate <= warningThreshold && endDate > now) {
        if (!campaign.expiryWarningSet) {
          try {
            adEngine.transitionState(campaign.id, AdStates.EXPIRING, {
              trigger: 'EXPIRY_WARNING',
              expiresAt: campaign.endDate,
              warningDays: this.expiryWarningDays
            });
            warned.push(campaign.id);
            
            // Trigger notification
            this.triggerNotification('CAMPAIGN_EXPIRING', campaign);
            
          } catch (error) {
            console.error(`Failed to mark campaign ${campaign.id} as expiring:`, error);
          }
        }
      }
    });
    
    return { processed: live.length, warned: warned.length, ids: warned };
  }

  // ========== PROCESS EXPIRED CAMPAIGNS ==========
  // Auto-remove when end date passes
  
  processExpiredCampaigns(now) {
    const expiring = adEngine.getCampaignsByState(AdStates.EXPIRING);
    const live = adEngine.getCampaignsByState(AdStates.LIVE);
    const allActive = [...expiring, ...live];
    const expired = [];
    
    allActive.forEach(campaign => {
      const endDate = new Date(campaign.endDate);
      
      if (endDate <= now) {
        try {
          adEngine.transitionState(campaign.id, AdStates.EXPIRED, {
            trigger: 'AUTO_EXPIRE',
            scheduledEnd: campaign.endDate,
            expiredAt: now.toISOString()
          });
          expired.push(campaign.id);
          
          // Trigger notification
          this.triggerNotification('CAMPAIGN_EXPIRED', campaign);
          
        } catch (error) {
          console.error(`Failed to expire campaign ${campaign.id}:`, error);
          adEngine.log('AUTO_EXPIRE_FAILED', { campaignId: campaign.id, error: error.message });
        }
      }
    });
    
    return { processed: allActive.length, expired: expired.length, ids: expired };
  }

  // ========== PROCESS GRACE PERIOD ==========
  // Auto-archive after grace period
  
  processGracePeriodCampaigns(now) {
    const expired = adEngine.getCampaignsByState(AdStates.EXPIRED);
    const archived = [];
    const gracePeriodMs = this.gracePeriodDays * 24 * 60 * 60 * 1000;
    
    expired.forEach(campaign => {
      const expiredEntry = campaign.history.find(h => h.state === AdStates.EXPIRED);
      if (!expiredEntry) return;
      
      const expiredAt = new Date(expiredEntry.timestamp);
      const archiveDate = new Date(expiredAt.getTime() + gracePeriodMs);
      
      if (archiveDate <= now) {
        try {
          adEngine.transitionState(campaign.id, AdStates.ARCHIVED, {
            trigger: 'AUTO_ARCHIVE',
            expiredAt: expiredEntry.timestamp,
            archivedAt: now.toISOString(),
            gracePeriodDays: this.gracePeriodDays
          });
          archived.push(campaign.id);
          
        } catch (error) {
          console.error(`Failed to archive campaign ${campaign.id}:`, error);
        }
      }
    });
    
    return { processed: expired.length, archived: archived.length, ids: archived };
  }

  // ========== SCHEDULE SPECIFIC CAMPAIGN ==========
  
  scheduleCampaign(campaignId, startDate, endDate) {
    const campaign = adEngine.getCampaign(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }
    
    // Update campaign with dates
    adEngine.updateCampaign(campaignId, {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString()
    });
    
    // Transition to scheduled
    if (campaign.state === AdStates.APPROVED) {
      adEngine.transitionState(campaignId, AdStates.SCHEDULED, {
        trigger: 'MANUAL_SCHEDULE',
        startDate,
        endDate
      });
    }
    
    adEngine.log('CAMPAIGN_SCHEDULED', { campaignId, startDate, endDate });
    
    return adEngine.getCampaign(campaignId);
  }

  // ========== EXTEND CAMPAIGN ==========
  
  extendCampaign(campaignId, newEndDate) {
    const campaign = adEngine.getCampaign(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }
    
    const previousEndDate = campaign.endDate;
    
    adEngine.updateCampaign(campaignId, {
      endDate: new Date(newEndDate).toISOString()
    });
    
    // If expiring, move back to live
    if (campaign.state === AdStates.EXPIRING) {
      adEngine.transitionState(campaignId, AdStates.LIVE, {
        trigger: 'EXTENSION',
        previousEndDate,
        newEndDate
      });
    }
    
    this.triggerNotification('CAMPAIGN_EXTENDED', campaign);
    adEngine.log('CAMPAIGN_EXTENDED', { campaignId, previousEndDate, newEndDate });
    
    return adEngine.getCampaign(campaignId);
  }

  // ========== PAUSE/RESUME CAMPAIGN ==========
  
  pauseCampaign(campaignId, reason = '') {
    const campaign = adEngine.getCampaign(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }
    
    adEngine.transitionState(campaignId, AdStates.PAUSED, {
      trigger: 'MANUAL_PAUSE',
      reason,
      pausedAt: new Date().toISOString()
    });
    
    this.triggerNotification('CAMPAIGN_PAUSED', campaign);
    
    return adEngine.getCampaign(campaignId);
  }

  resumeCampaign(campaignId) {
    const campaign = adEngine.getCampaign(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }
    
    const now = new Date();
    const endDate = new Date(campaign.endDate);
    
    // Determine target state based on dates
    let targetState = AdStates.SCHEDULED;
    if (new Date(campaign.startDate) <= now && endDate > now) {
      targetState = AdStates.LIVE;
    }
    
    adEngine.transitionState(campaignId, targetState, {
      trigger: 'MANUAL_RESUME',
      resumedAt: now.toISOString()
    });
    
    this.triggerNotification('CAMPAIGN_RESUMED', campaign);
    
    return adEngine.getCampaign(campaignId);
  }

  // ========== NOTIFICATIONS ==========
  
  triggerNotification(type, campaign) {
    const notification = {
      id: `NOTIF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      campaignId: campaign.id,
      advertiserId: campaign.advertiserId,
      timestamp: new Date().toISOString(),
      data: {
        campaignName: campaign.name,
        slotId: campaign.slotId,
        startDate: campaign.startDate,
        endDate: campaign.endDate
      }
    };
    
    // Store notification for pickup by InquiryRouter
    if (!this.pendingNotifications) {
      this.pendingNotifications = [];
    }
    this.pendingNotifications.push(notification);
    
    adEngine.log('NOTIFICATION_TRIGGERED', notification);
    
    return notification;
  }

  getPendingNotifications() {
    const notifications = this.pendingNotifications || [];
    this.pendingNotifications = [];
    return notifications;
  }

  // ========== STATUS & REPORTS ==========
  
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastCheck: this.lastCheck,
      gracePeriodDays: this.gracePeriodDays,
      expiryWarningDays: this.expiryWarningDays,
      pendingNotifications: (this.pendingNotifications || []).length,
      campaignStats: {
        draft: adEngine.getCampaignsByState(AdStates.DRAFT).length,
        pending: adEngine.getCampaignsByState(AdStates.PENDING_VERIFICATION).length,
        approved: adEngine.getCampaignsByState(AdStates.APPROVED).length,
        scheduled: adEngine.getCampaignsByState(AdStates.SCHEDULED).length,
        live: adEngine.getCampaignsByState(AdStates.LIVE).length,
        expiring: adEngine.getCampaignsByState(AdStates.EXPIRING).length,
        expired: adEngine.getCampaignsByState(AdStates.EXPIRED).length,
        paused: adEngine.getCampaignsByState(AdStates.PAUSED).length,
        archived: adEngine.getCampaignsByState(AdStates.ARCHIVED).length
      }
    };
  }

  getUpcomingEvents(days = 30) {
    const now = new Date();
    const horizon = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const events = [];
    
    adEngine.getAllCampaigns().forEach(campaign => {
      if ([AdStates.SCHEDULED, AdStates.LIVE, AdStates.EXPIRING].includes(campaign.state)) {
        const startDate = new Date(campaign.startDate);
        const endDate = new Date(campaign.endDate);
        
        if (startDate > now && startDate <= horizon) {
          events.push({
            type: 'START',
            campaignId: campaign.id,
            campaignName: campaign.name,
            date: campaign.startDate,
            daysUntil: Math.ceil((startDate - now) / (24 * 60 * 60 * 1000))
          });
        }
        
        if (endDate > now && endDate <= horizon) {
          events.push({
            type: 'END',
            campaignId: campaign.id,
            campaignName: campaign.name,
            date: campaign.endDate,
            daysUntil: Math.ceil((endDate - now) / (24 * 60 * 60 * 1000))
          });
        }
      }
    });
    
    // Sort by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return events;
  }
}

// ========== SINGLETON INSTANCE ==========
const lifecycleManager = new AdLifecycleManager();

export default lifecycleManager;
export { AdLifecycleManager };