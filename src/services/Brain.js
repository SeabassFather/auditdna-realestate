// ================================================================
// BRAIN.JS — SI / AI Event Service
// EnjoyBaja / AuditDNA Real Estate Platform
// Logs all session events for analytics, audit trail & SI learning
// ================================================================

const Brain = {

  // ── Core Logger ───────────────────────────────────────────────
  log: (event, data = {}) => {
    try {
      const entry = {
        event,
        module:    data.module || 'unknown',
        timestamp: new Date().toISOString(),
        sessionId: sessionStorage.getItem('eb_session_id') || Brain._initSession(),
        user:      Brain._getUser(),
        ...data
      };

      // Write to rolling queue (max 500 entries)
      const queue = JSON.parse(localStorage.getItem('brain_event_queue') || '[]');
      queue.push(entry);
      if (queue.length > 500) queue.shift();
      localStorage.setItem('brain_event_queue', JSON.stringify(queue));

      // Console trace for dev
      if (process.env.NODE_ENV === 'development') {
        console.log('[BRAIN ⬡]', event, data);
      }
    } catch (err) {
      // Silent fail — never crash the app
    }
  },

  // ── Session Init ──────────────────────────────────────────────
  _initSession: () => {
    const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem('eb_session_id', id);
    return id;
  },

  // ── Get Current User ─────────────────────────────────────────
  _getUser: () => {
    try {
      return JSON.parse(sessionStorage.getItem('eb_user') || '{}');
    } catch {
      return {};
    }
  },

  // ── Auth Events ───────────────────────────────────────────────
  logSessionEvent: (type, userData = {}) => {
    Brain.log(type === 'login' ? 'user_login' : 'user_logout', {
      module: 'Auth',
      email:  userData.email || 'unknown',
      role:   userData.role  || 'unknown',
      name:   userData.name  || 'unknown',
    });
  },

  // ── Registration ──────────────────────────────────────────────
  logRegistration: (regData = {}) => {
    Brain.log('agent_registration', {
      module:    'MexicoRealEstate',
      agentType: regData.agentType  || 'unknown',
      email:     regData.email      || 'unknown',
      hasINE:    regData.hasINE     || false,
      hasSelfie: regData.hasSelfie  || false,
      status:    regData.status     || 'pending',
    });
  },

  // ── Photo Events ──────────────────────────────────────────────
  logPhotoUpload: (count = 1, aiEnhanced = false) => {
    Brain.log('photo_upload', {
      module:     'MexicoRealEstate',
      count,
      aiEnhanced,
    });
  },

  logPhotoAI: (miner, photoIndex) => {
    Brain.log('ai_photo_miner_applied', {
      module:     'MexicoRealEstate',
      miner,
      photoIndex,
    });
  },

  // ── Listing Events ────────────────────────────────────────────
  logListing: (listingId, type = 'unknown') => {
    Brain.log('listing_submitted', {
      module: 'MexicoRealEstate',
      listingId,
      type,
    });
  },

  // ── Accordion / Navigation ────────────────────────────────────
  logAccordion: (section) => {
    Brain.log('accordion_opened', {
      module: 'MexicoRealEstate',
      section,
    });
  },

  // ── Page Views ────────────────────────────────────────────────
  logPageView: (page, module = 'unknown') => {
    Brain.log('page_view', { page, module });
  },

  // ── Module Access ─────────────────────────────────────────────
  logModuleAccess: (moduleName, role = 'unknown') => {
    Brain.log('module_access', { module: moduleName, role });
  },

  // ── Admin Events ──────────────────────────────────────────────
  logAdminAction: (action, details = {}) => {
    Brain.log('admin_action', {
      module: 'Admin',
      action,
      ...details,
    });
  },

  // ── Error Tracking ────────────────────────────────────────────
  logError: (errorMsg, moduleName = 'unknown') => {
    Brain.log('error', {
      module:  moduleName,
      message: errorMsg,
    });
  },

  // ── Read Queue (for Admin Dashboard) ─────────────────────────
  getQueue: () => {
    try {
      return JSON.parse(localStorage.getItem('brain_event_queue') || '[]');
    } catch {
      return [];
    }
  },

  // ── Clear Queue ───────────────────────────────────────────────
  clearQueue: () => {
    localStorage.removeItem('brain_event_queue');
  },

  // ── Get Stats Summary ─────────────────────────────────────────
  getSummary: () => {
    const queue = Brain.getQueue();
    const summary = {};
    queue.forEach(entry => {
      summary[entry.event] = (summary[entry.event] || 0) + 1;
    });
    return {
      totalEvents: queue.length,
      breakdown:   summary,
      oldest:      queue[0]?.timestamp || null,
      newest:      queue[queue.length - 1]?.timestamp || null,
    };
  },
};

export default Brain;