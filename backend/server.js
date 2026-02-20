// ═══════════════════════════════════════════════════════════════
// AUDITDNA BACKEND SERVER v3.2 – ENTERPRISE + AI LEARNING (STABLE)
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const os = require('os');
require('dotenv').config();

const { Pool } = require('pg');
const Anthropic = require('@anthropic-ai/sdk');

// ═══════════════════════════════════════════════════════════════
// DATABASE
// ═══════════════════════════════════════════════════════════════

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'auditdna',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20
});

pool.on('connect', () => {
  console.log('✅ POSTGRESQL CONNECTED!');
});

pool.on('error', err => {
  console.error('❌ PostgreSQL error:', err);
});

module.exports.pool = pool;

// ═══════════════════════════════════════════════════════════════
// ANTHROPIC AI CLIENT
// ═══════════════════════════════════════════════════════════════

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Quick connectivity test on startup
anthropic.messages.create({
  model:      process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
  max_tokens: 32,
  messages:   [{ role: 'user', content: 'ping' }],
}).then(() => {
  console.log('✅ ANTHROPIC AI: Connected — model:', process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6');
}).catch(err => {
  console.error('❌ ANTHROPIC AI: Connection failed —', err.message);
});

// Global AI helper — call from any route via req.app.get('ai')
// Usage: const ai = req.app.get('ai');
//        const res = await ai.ask('your prompt here');
//        const res = await ai.si('SI scoring prompt');
const aiHelper = {
  // General AI — recommendations, descriptions, analysis
  ask: async (prompt, systemPrompt = 'You are AuditDNA AI, an expert in real estate, mortgage lending, and agricultural supply chains.') => {
    const response = await anthropic.messages.create({
      model:      process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
      max_tokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '4096'),
      system:     systemPrompt,
      messages:   [{ role: 'user', content: prompt }],
    });
    return response.content[0]?.text || '';
  },

  // SI (Synthetic Intelligence) — compliance-critical, deterministic scoring
  // Returns structured JSON only — no narrative, no hallucination risk
  si: async (prompt) => {
    const response = await anthropic.messages.create({
      model:      process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
      max_tokens: 1024,
      system:     'You are AuditDNA SI (Synthetic Intelligence). You perform compliance-critical scoring and analysis. Always respond with valid JSON only. No prose, no markdown, no explanation outside the JSON structure.',
      messages:   [{ role: 'user', content: prompt }],
    });
    try {
      return JSON.parse(response.content[0]?.text || '{}');
    } catch {
      return { error: 'SI parse failed', raw: response.content[0]?.text };
    }
  },

  // Stream — for long-form content (property descriptions, reports)
  stream: (prompt, onChunk, systemPrompt = 'You are AuditDNA AI.') => {
    return anthropic.messages.stream({
      model:      process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
      max_tokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '4096'),
      system:     systemPrompt,
      messages:   [{ role: 'user', content: prompt }],
    }).on('text', onChunk);
  },

  // Raw client — for advanced usage in routes
  client: anthropic,
};

module.exports.ai = aiHelper;

// ═══════════════════════════════════════════════════════════════
// THE BRAIN - NINER MINER ORCHESTRATION
// ═══════════════════════════════════════════════════════════════

const brain = require('./Brain');

console.log('🧠 THE BRAIN: Initializing 81 Niner Miners...');

brain.on('taskAssigned', ({ workflowId, miner, team }) => {
  console.log(`⛏️  [BRAIN] Task assigned to ${miner} (${team}) - Workflow: ${workflowId}`);
});

brain.on('taskCompleted', ({ workflowId, miner, duration }) => {
  console.log(`✅ [BRAIN] Task completed by ${miner} in ${duration}ms - Workflow: ${workflowId}`);
});

// SI event listeners
brain.on('siScoreComplete',    ({ score, leadId }) => console.log(`🤖 [SI] Lead #${leadId} scored → Tier ${score?.tier} (${score?.priority})`));
brain.on('siRiskAssessed',     ({ risk })           => console.log(`🛡️  [SI] Risk assessed → ${risk?.riskLevel}`));
brain.on('siPropertyAnalyzed', ({ intel })          => console.log(`🏠 [SI] Property analyzed → ${intel?.marketabilityScore}/100`));
brain.on('siMortgageAudited',  ({ audit })          => console.log(`💰 [SI] Mortgage audited → ${audit?.cfpbRiskLevel} risk`));

module.exports.brain = brain;

// ═══════════════════════════════════════════════════════════════
// APP INIT
// ═══════════════════════════════════════════════════════════════

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Make AI available to all routes: const ai = req.app.get('ai');
app.set('ai', aiHelper);
app.set('pool', pool);

// Connect Brain to AI + Pool — this is what makes the Niner Miners intelligent
brain.setAI(aiHelper);
brain.setPool(pool);

// ═══════════════════════════════════════════════════════════════
// CORE MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ═══════════════════════════════════════════════════════════════
// REQUEST METRICS
// ═══════════════════════════════════════════════════════════════

const requestStats = { total: 0, success: 0, errors: 0 };

app.use((req, res, next) => {
  requestStats.total++;
  res.on('finish', () => {
    res.statusCode < 400 ? requestStats.success++ : requestStats.errors++;
  });
  next();
});

// ═══════════════════════════════════════════════════════════════
// AUTO ROUTE LOADER
// ═══════════════════════════════════════════════════════════════

const routesDir = path.join(__dirname, 'routes');
const loadedRoutes = [];
const failedRoutes = [];

function loadRoutes(dir, base = '/api') {
  if (!fs.existsSync(dir)) return;
  
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    
    if (fs.statSync(full).isDirectory()) {
      loadRoutes(full, `${base}/${file}`);
      continue;
    }
    
    if (!file.endsWith('.js')) continue;
    
    try {
      app.use(`${base}/${file.replace('.js', '')}`, require(full));
      loadedRoutes.push(full);
    } catch (e) {
      failedRoutes.push({ file: full, error: e.message });
    }
  }
}

console.log('\n🔍 Discovering routes...\n');
loadRoutes(routesDir);

// ═══════════════════════════════════════════════════════════════
// HEALTH + METRICS
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// BRAIN API — frontend event sync + status
// ═══════════════════════════════════════════════════════════════

// Frontend Brain event ingestion — receives brain_event_queue from localStorage
app.post('/api/brain/events', async (req, res) => {
  try {
    const { events } = req.body;
    const result = await brain.ingestFrontendEvents(events);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Brain status — shows AI connection, queue depth, miner metrics
app.get('/api/brain/status', (req, res) => {
  res.json({ success: true, brain: brain.getStatus() });
});

// Trigger a workflow manually — useful for admin dashboard
app.post('/api/brain/workflow', async (req, res) => {
  try {
    const { type, payload } = req.body;
    const result = await brain.processWorkflow(type, payload);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status:        'healthy',
    uptime:        process.uptime(),
    routesLoaded:  loadedRoutes.length,
    routesFailed:  failedRoutes.length,
    ai:            !!process.env.ANTHROPIC_API_KEY ? 'configured' : 'missing_key',
    aiModel:       process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
  });
});

app.get('/metrics', (req, res) => {
  res.json({
    requests: requestStats,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// ═══════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════

const server = app.listen(PORT, () => {
  console.log(`
════════════════════════════════════════════════════════════════
 AUDITDNA BACKEND SERVER v3.2
 Port: ${PORT}
 Env: ${NODE_ENV}
 PID: ${process.pid}
 Routes Loaded: ${loadedRoutes.length}
════════════════════════════════════════════════════════════════
⛏️  YEEHAW! 81 NINER MINERS ARE LIVE! ⛏️
🧠 THE BRAIN IS OPERATIONAL 🧠
💰 MORTGAGE AUDIT SYSTEM READY! 💰
🤖 ANTHROPIC AI: ${process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6'}
════════════════════════════════════════════════════════════════
`);
});

// ═══════════════════════════════════════════════════════════════
// GRACEFUL SHUTDOWN
// ═══════════════════════════════════════════════════════════════

function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down…`);
  
  server.close(() => {
    pool.end(() => {
      console.log('✅ PostgreSQL closed');
      process.exit(0);
    });
  });
  
  setTimeout(() => process.exit(1), 10000);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// ═══════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════

module.exports = app;