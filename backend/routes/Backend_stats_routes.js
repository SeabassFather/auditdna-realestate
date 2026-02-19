// =============================================================================
// BACKEND STATS ENDPOINTS — Add to existing route files
// =============================================================================
// Add GET /api/properties/stats → properties.js
// Add GET /api/leads/stats      → leads.js
// Add GET /api/agents/stats     → agents.js
// Add GET /api/audits/stats     → audits.js
// Add GET /api/brain/status     → Brain.js routes
// Add GET /api/brain/metrics    → Brain.js routes
// Add GET /api/brain/miners     → Brain.js routes
// =============================================================================

// ── PROPERTIES STATS (add to backend/routes/properties.js) ──────────────────
/*
router.get('/stats', async (req, res) => {
  try {
    const properties = await db.collection('properties').find({}).toArray();
    res.json({
      total:        properties.length,
      fsbo:         properties.filter(p => p.type === 'fsbo').length,
      agentUploads: properties.filter(p => p.uploadedBy === 'agent').length,
      pending:      properties.filter(p => p.status === 'pending').length,
      views:        properties.reduce((s, p) => s + (p.views || 0), 0),
    });
  } catch (err) {
    res.json({ total: 0, fsbo: 0, agentUploads: 0, pending: 0, views: 0 });
  }
});
*/

// ── LEADS STATS (add to backend/routes/leads.js) ─────────────────────────────
/*
router.get('/stats', async (req, res) => {
  try {
    const leads = await db.collection('leads').find({}).toArray();
    res.json({
      total:    leads.length,
      hot:      leads.filter(l => l.status === 'hot').length,
      warm:     leads.filter(l => l.status === 'warm').length,
      cold:     leads.filter(l => l.status === 'cold').length,
      callsToday: leads.filter(l => {
        const d = new Date(l.lastCall);
        return d.toDateString() === new Date().toDateString();
      }).length,
      pipeline: `$${(leads.reduce((s, l) => s + (l.value || 0), 0) / 1000000).toFixed(1)}M`,
      convRate: leads.length > 0 ? `${Math.round((leads.filter(l=>l.status==='closed').length/leads.length)*100)}%` : '0%',
    });
  } catch (err) {
    res.json({ total: 0, hot: 0, warm: 0, cold: 0, callsToday: 0, pipeline: '$0', convRate: '0%' });
  }
});
*/

// ── AGENTS STATS (add to backend/routes/agents.js) ───────────────────────────
/*
router.get('/stats', async (req, res) => {
  try {
    const agents = await db.collection('agents').find({}).toArray();
    res.json({
      total:   agents.length,
      active:  agents.filter(a => a.status === 'active').length,
      pending: agents.filter(a => a.status === 'pending').length,
      inHouse: agents.filter(a => a.type === 'in-house').length,
    });
  } catch (err) {
    res.json({ total: 0, active: 0, pending: 0, inHouse: 0 });
  }
});
*/

// ── AUDITS STATS (add to backend/routes/audits.js) ───────────────────────────
/*
router.get('/stats', async (req, res) => {
  try {
    const audits = await db.collection('audits').find({}).toArray();
    res.json({
      total:      audits.length,
      completed:  audits.filter(a => a.status === 'completed').length,
      pending:    audits.filter(a => a.status === 'pending').length,
      recovered:  `$${(audits.reduce((s, a) => s + (a.recovered || 0), 0)).toLocaleString()}`,
    });
  } catch (err) {
    res.json({ total: 0, completed: 0, pending: 0, recovered: '$0' });
  }
});
*/

// ── BRAIN ROUTES (already in backend/routes/Brain.js — verify these exist) ───
/*
router.get('/status',  (req, res) => res.json(brain.getStatus()));
router.get('/metrics', (req, res) => res.json(brain.getMetrics()));
router.get('/miners',  (req, res) => res.json(brain.getAllMiners()));
router.post('/session', async (req, res) => {
  const result = await brain.processWorkflow('session_event', req.body);
  res.json(result);
});
*/