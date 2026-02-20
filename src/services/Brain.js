// ================================================================
// BRAIN — FRONTEND STUB
// C:\AuditDNA\auditdna-realestate\src\services\Brain.js
//
// NOT the backend Brain.js (that lives in backend/Brain.js).
// This stub gives frontend components the same interface but
// routes all calls to the backend API at localhost:5000.
// ================================================================

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Brain = {

  getStatus: async () => {
    try {
      const res = await fetch(`${API}/api/brain/status`);
      if (res.ok) { const d = await res.json(); return d.brain || null; }
    } catch {}
    return null;
  },

  getMetrics: async () => {
    try {
      const res = await fetch(`${API}/api/brain/status`);
      if (res.ok) { const d = await res.json(); return d.brain?.metrics || null; }
    } catch {}
    return null;
  },

  getMiners: async () => {
    try {
      const res = await fetch(`${API}/api/brain/status`);
      if (res.ok) { const d = await res.json(); return d.brain?.teams || null; }
    } catch {}
    return null;
  },

  getPropertyStats: async () => {
    try {
      const res = await fetch(`${API}/api/properties/stats`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  getLeadStats: async () => {
    try {
      const res = await fetch(`${API}/api/leads/stats`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  getAgentStats: async () => {
    try {
      const res = await fetch(`${API}/api/agents/stats`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  getAuditStats: async () => {
    try {
      const res = await fetch(`${API}/api/audits/stats`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  log: (eventType, payload = {}) => {
    try {
      fetch(`${API}/api/brain/events`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ events: [{ type: eventType, payload, timestamp: Date.now() }] }),
      }).catch(() => {});
    } catch {}
  },

  processWorkflow: async (type, payload = {}) => {
    try {
      const res = await fetch(`${API}/api/brain/workflow`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ type, payload }),
      });
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  // ── Session / Auth events (used by AuthContext, AgentRegistration, etc.) ──
  logSessionEvent: (eventType, payload = {}) => {
    try {
      fetch(`${API}/api/brain/events`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ events: [{ type: eventType, payload, timestamp: Date.now() }] }),
      }).catch(() => {});
    } catch {}
  },

  // ── Aliases — different components use different method names ─
  logEvent:       (type, payload = {}) => Brain.log(type, payload),
  trackEvent:     (type, payload = {}) => Brain.log(type, payload),
  logAction:      (type, payload = {}) => Brain.log(type, payload),
  logAgentEvent:  (type, payload = {}) => Brain.log(type, payload),
  logEscrowEvent: (type, payload = {}) => Brain.log(type, payload),
  logPortalEvent: (type, payload = {}) => Brain.log(type, payload),
  ingestEvent:    (type, payload = {}) => Brain.log(type, payload),
};

const BrainRef = Brain;
export default BrainRef;