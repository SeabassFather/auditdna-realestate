// =============================================================================
// BRAIN — FRONTEND SERVICE
// Connects React components to the 81 Niner Miners backend
// All calls → http://localhost:5000/api/*
// =============================================================================

const BASE = 'http://localhost:5000/api';

const call = async (endpoint, method = 'GET', body = null) => {
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {})
    };
    const res = await fetch(`${BASE}${endpoint}`, opts);
    if (!res.ok) throw new Error(`Brain call failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[BRAIN] ${endpoint} offline:`, err.message);
    return null;
  }
};

const Brain = {

  // ── BRAIN STATUS & METRICS ─────────────────────────────────────────────────
  getStatus:     () => call('/brain/status'),
  getMetrics:    () => call('/brain/metrics'),
  getMiners:     () => call('/brain/miners'),

  // ── SESSION / AUTH ─────────────────────────────────────────────────────────
  logSessionEvent: (data) => call('/brain/session', 'POST', data),

  // ── PROPERTIES ────────────────────────────────────────────────────────────
  getProperties:     ()     => call('/properties'),
  submitProperty:    (data) => call('/properties', 'POST', data),
  updateProperty:    (id, data) => call(`/properties/${id}`, 'PUT', data),
  deleteProperty:    (id)   => call(`/properties/${id}`, 'DELETE'),
  getPropertyStats:  ()     => call('/properties/stats'),

  // ── LEADS / CRM ────────────────────────────────────────────────────────────
  getLeads:      ()     => call('/leads'),
  submitLead:    (data) => call('/leads', 'POST', data),
  updateLead:    (id, data) => call(`/leads/${id}`, 'PUT', data),
  getLeadStats:  ()     => call('/leads/stats'),

  // ── AGENTS / VERIFICATION ─────────────────────────────────────────────────
  registerAgent:          (data) => call('/agents', 'POST', data),
  getAgents:              ()     => call('/agents'),
  getAgentStats:          ()     => call('/agents/stats'),
  submitVerification:     (data) => call('/verification', 'POST', data),
  getVerificationStatus:  (id)   => call(`/verification/${id}`),
  getAllVerifications:     ()     => call('/verification/admin/all'),
  updateVerification:     (id, data) => call(`/verification/admin/${id}`, 'PUT', data),

  // ── AUDITS / MORTGAGE ─────────────────────────────────────────────────────
  runMortgageAudit:  (data) => call('/audits/mortgage', 'POST', data),
  getAudits:         ()     => call('/audits'),
  getAuditStats:     ()     => call('/audits/stats'),

  // ── ANALYTICS (aggregated) ────────────────────────────────────────────────
  getAnalytics: async () => {
    const [properties, leads, agents, audits, brain] = await Promise.all([
      call('/properties/stats'),
      call('/leads/stats'),
      call('/agents/stats'),
      call('/audits/stats'),
      call('/brain/metrics'),
    ]);
    return { properties, leads, agents, audits, brain };
  },

  // ── CONSUMER REGISTRATION ─────────────────────────────────────────────────
  registerConsumer: (data) => call('/leads', 'POST', { ...data, type: 'consumer' }),

};

export default Brain;