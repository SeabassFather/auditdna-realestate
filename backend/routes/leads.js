// ═══════════════════════════════════════════════════════════════
// LEADS ROUTE v2.0 — Full PostgreSQL CRUD
// C:\AuditDNA\auditdna-realestate\backend\routes\leads.js
//
// GET    /api/leads              — all leads (admin)
// GET    /api/leads/stats        — pipeline stats dashboard
// GET    /api/leads/:id          — single lead
// POST   /api/leads              — create (buyer/partner/appraisal/agent/contact)
// PUT    /api/leads/:id          — update lead
// PUT    /api/leads/:id/status   — update status / assign
// DELETE /api/leads/:id          — delete lead
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const router  = express.Router();
const { pool } = require('../server');

// ── Bootstrap table ──────────────────────────────────────────
const initTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id            SERIAL PRIMARY KEY,
      source        VARCHAR(50)  DEFAULT 'buyer',
      status        VARCHAR(30)  DEFAULT 'new',
      nombre        TEXT,
      apellidos     TEXT,
      email         TEXT,
      phone         TEXT,
      whatsapp      TEXT,
      company       TEXT,
      license_num   TEXT,
      message       TEXT,
      budget_min    NUMERIC(15,2),
      budget_max    NUMERIC(15,2),
      value         NUMERIC(15,2),
      municipio     TEXT,
      estado        TEXT,
      tipo_interes  TEXT,
      referido_por  TEXT,
      assigned_to   TEXT,
      prop_address  TEXT,
      prop_city     TEXT,
      prop_state    TEXT,
      notes         TEXT,
      last_contact  TIMESTAMPTZ,
      follow_up_at  TIMESTAMPTZ,
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_leads_status  ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_source  ON leads(source);
    CREATE INDEX IF NOT EXISTS idx_leads_email   ON leads(email);
    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
  `);
  console.log('✅ [LEADS] PostgreSQL table ready');
};
initTable().catch(e => console.error('❌ [LEADS] Init failed:', e.message));

// ── GET /stats ────────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        COUNT(*)                                              AS total,
        COUNT(*) FILTER (WHERE status='hot')                  AS hot,
        COUNT(*) FILTER (WHERE status='warm')                 AS warm,
        COUNT(*) FILTER (WHERE status='cold')                 AS cold,
        COUNT(*) FILTER (WHERE status='new')                  AS new_leads,
        COUNT(*) FILTER (WHERE status='contacted')            AS contacted,
        COUNT(*) FILTER (WHERE status='closed')               AS closed,
        COUNT(*) FILTER (WHERE status='lost')                 AS lost,
        COUNT(*) FILTER (WHERE source='buyer')                AS buyers,
        COUNT(*) FILTER (WHERE source='partner')              AS partners,
        COUNT(*) FILTER (WHERE source='appraisal')            AS appraisals,
        COUNT(*) FILTER (WHERE source='agent')                AS agents,
        COUNT(*) FILTER (WHERE last_contact::date=CURRENT_DATE) AS contacts_today,
        COALESCE(SUM(value) FILTER (WHERE status!='lost'),0)  AS pipeline_value,
        COALESCE(SUM(value) FILTER (WHERE status='closed'),0) AS closed_value
      FROM leads
    `);
    const r = rows[0];
    const total  = parseInt(r.total)  || 0;
    const closed = parseInt(r.closed) || 0;
    const pipelineVal = parseFloat(r.pipeline_value) || 0;
    res.json({
      success: true,
      stats: {
        total,
        hot:           parseInt(r.hot),
        warm:          parseInt(r.warm),
        cold:          parseInt(r.cold),
        new:           parseInt(r.new_leads),
        contacted:     parseInt(r.contacted),
        closed,
        lost:          parseInt(r.lost),
        buyers:        parseInt(r.buyers),
        partners:      parseInt(r.partners),
        appraisals:    parseInt(r.appraisals),
        agents:        parseInt(r.agents),
        contactsToday: parseInt(r.contacts_today),
        pipeline:      pipelineVal,
        pipelineFormatted: pipelineVal >= 1000000
          ? `$${(pipelineVal/1000000).toFixed(1)}M`
          : `$${(pipelineVal/1000).toFixed(0)}K`,
        closedValue:   parseFloat(r.closed_value) || 0,
        convRate:      total > 0 ? `${Math.round((closed/total)*100)}%` : '0%',
      }
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── GET / ─────────────────────────────────────────────────
router.get('/', async (req, res) => {
  const { status, source, assigned_to, limit = 100, offset = 0 } = req.query;
  const conditions = [];
  const params     = [];
  if (status)      { params.push(status);      conditions.push(`status=$${params.length}`); }
  if (source)      { params.push(source);      conditions.push(`source=$${params.length}`); }
  if (assigned_to) { params.push(assigned_to); conditions.push(`assigned_to=$${params.length}`); }
  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  params.push(parseInt(limit), parseInt(offset));
  try {
    const { rows } = await pool.query(
      `SELECT * FROM leads ${where} ORDER BY created_at DESC LIMIT $${params.length-1} OFFSET $${params.length}`, params
    );
    res.json({ success: true, count: rows.length, leads: rows });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── GET /:id ──────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM leads WHERE id=$1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Lead not found' });
    res.json({ success: true, lead: rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── POST / — create lead ──────────────────────────────────
router.post('/', async (req, res) => {
  const d = req.body;
  try {
    const { rows } = await pool.query(`
      INSERT INTO leads (
        source, status,
        nombre, apellidos, email, phone, whatsapp, company, license_num,
        message, budget_min, budget_max, value,
        municipio, estado, tipo_interes,
        referido_por, assigned_to,
        prop_address, prop_city, prop_state, notes
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,
        $14,$15,$16,$17,$18,$19,$20,$21,$22
      ) RETURNING *
    `, [
      d.source       || 'buyer',
      d.status       || 'new',
      d.nombre       || d.name        || null,
      d.apellidos    || null,
      d.email        || null,
      d.phone        || null,
      d.whatsapp     || null,
      d.company      || null,
      d.licenseNum   || d.license_num || null,
      d.message      || null,
      d.budgetMin    ? parseFloat(d.budgetMin) : null,
      d.budgetMax    ? parseFloat(d.budgetMax) : null,
      d.value        ? parseFloat(d.value)     : null,
      d.municipio    || null,
      d.estado       || null,
      d.tipoInteres  || d.tipo_interes || null,
      d.referidoPor  || null,
      d.assignedTo   || null,
      d.propAddress  || null,
      d.propCity     || null,
      d.propState    || null,
      d.notes        || null,
    ]);
    res.status(201).json({ success: true, lead: rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── PUT /:id — update ─────────────────────────────────────
router.put('/:id', async (req, res) => {
  const d = req.body;
  try {
    const { rows } = await pool.query(`
      UPDATE leads SET
        nombre=$1, apellidos=$2, email=$3, phone=$4, whatsapp=$5,
        company=$6, message=$7, notes=$8,
        budget_min=$9, budget_max=$10, value=$11,
        municipio=$12, tipo_interes=$13,
        updated_at=NOW()
      WHERE id=$14 RETURNING *
    `, [
      d.nombre, d.apellidos, d.email, d.phone, d.whatsapp,
      d.company, d.message, d.notes,
      d.budgetMin ? parseFloat(d.budgetMin) : null,
      d.budgetMax ? parseFloat(d.budgetMax) : null,
      d.value     ? parseFloat(d.value)     : null,
      d.municipio, d.tipoInteres,
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).json({ error: 'Lead not found' });
    res.json({ success: true, lead: rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── PUT /:id/status ───────────────────────────────────────
router.put('/:id/status', async (req, res) => {
  const { status, assignedTo, followUpAt, notes } = req.body;
  const valid = ['new','hot','warm','cold','contacted','closed','lost'];
  if (!valid.includes(status)) return res.status(400).json({ error: `Invalid status. Use: ${valid.join(', ')}` });
  try {
    const { rows } = await pool.query(`
      UPDATE leads SET
        status=$1,
        assigned_to=COALESCE($2, assigned_to),
        follow_up_at=COALESCE($3::timestamptz, follow_up_at),
        notes=COALESCE($4, notes),
        last_contact=NOW(),
        updated_at=NOW()
      WHERE id=$5 RETURNING *
    `, [status, assignedTo || null, followUpAt || null, notes || null, req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Lead not found' });
    res.json({ success: true, lead: rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── DELETE /:id ───────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('DELETE FROM leads WHERE id=$1 RETURNING id', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Lead not found' });
    res.json({ success: true, deleted: rows[0].id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;