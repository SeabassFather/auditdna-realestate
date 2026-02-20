// ═══════════════════════════════════════════════════════════════
// PROPERTIES ROUTE v2.0 — Full PostgreSQL CRUD
// C:\AuditDNA\auditdna-realestate\backend\routes\properties.js
//
// GET    /api/properties              — public approved listings
// GET    /api/properties/all          — admin: all listings
// GET    /api/properties/pending      — admin: pending review
// GET    /api/properties/stats        — dashboard stats
// GET    /api/properties/:id          — single listing + view++
// POST   /api/properties              — create listing (FSBO/agent)
// PUT    /api/properties/:id          — update listing
// PUT    /api/properties/:id/status   — approve / reject / feature / sold
// DELETE /api/properties/:id          — delete listing
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const router  = express.Router();
const { pool } = require('../server');

// ── Bootstrap table ──────────────────────────────────────────
const initTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS properties (
      id              SERIAL PRIMARY KEY,
      type            VARCHAR(20)   DEFAULT 'fsbo',
      status          VARCHAR(30)   DEFAULT 'pending_review',
      uploaded_by     VARCHAR(30)   DEFAULT 'fsbo',
      agent_email     VARCHAR(150),
      calle           TEXT,
      num_ext         VARCHAR(20),
      num_int         VARCHAR(20),
      colonia         TEXT,
      municipio       TEXT,
      estado          TEXT          DEFAULT 'Baja California Norte',
      cp              VARCHAR(10),
      carretera       TEXT,
      lat             VARCHAR(30),
      lng             VARCHAR(30),
      tipo            TEXT,
      recamaras       INTEGER,
      banos           NUMERIC(4,1),
      cajones         INTEGER,
      m2_const        NUMERIC(10,2),
      sqft_const      NUMERIC(10,2),
      m2_lot          NUMERIC(10,2),
      sqft_lot        NUMERIC(10,2),
      price_usd       NUMERIC(15,2),
      price_mxn       NUMERIC(18,2),
      descripcion     TEXT,
      amenidades      TEXT[]        DEFAULT '{}',
      photos          TEXT[]        DEFAULT '{}',
      seller_name     TEXT,
      seller_email    TEXT,
      seller_phone    TEXT,
      seller_id       TEXT,
      commission_rate NUMERIC(4,2)  DEFAULT 6.00,
      views           INTEGER       DEFAULT 0,
      featured        BOOLEAN       DEFAULT false,
      created_at      TIMESTAMPTZ   DEFAULT NOW(),
      updated_at      TIMESTAMPTZ   DEFAULT NOW(),
      approved_at     TIMESTAMPTZ,
      approved_by     VARCHAR(150),
      rejection_note  TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_props_status    ON properties(status);
    CREATE INDEX IF NOT EXISTS idx_props_municipio  ON properties(municipio);
    CREATE INDEX IF NOT EXISTS idx_props_tipo       ON properties(tipo);
    CREATE INDEX IF NOT EXISTS idx_props_price      ON properties(price_usd);
    CREATE INDEX IF NOT EXISTS idx_props_created    ON properties(created_at);
  `);
  console.log('✅ [PROPERTIES] PostgreSQL table ready');
};
initTable().catch(e => console.error('❌ [PROPERTIES] Init failed:', e.message));

// ── Shape row → clean JSON ─────────────────────────────────
const shape = (r) => ({
  id:         r.id,
  type:       r.type,
  status:     r.status,
  uploadedBy: r.uploaded_by,
  agentEmail: r.agent_email,
  featured:   r.featured,
  views:      r.views,
  commissionRate: r.commission_rate,
  createdAt:  r.created_at,
  updatedAt:  r.updated_at,
  approvedAt: r.approved_at,
  approvedBy: r.approved_by,
  rejectionNote: r.rejection_note,
  address: {
    calle:     r.calle,     numExt:    r.num_ext,
    numInt:    r.num_int,   colonia:   r.colonia,
    municipio: r.municipio, estado:    r.estado,
    cp:        r.cp,        carretera: r.carretera,
    lat:       r.lat,       lng:       r.lng,
  },
  details: {
    tipo:      r.tipo,      recamaras: r.recamaras,
    banos:     r.banos,     cajones:   r.cajones,
    m2Const:   r.m2_const,  sqftConst: r.sqft_const,
    m2Lot:     r.m2_lot,    sqftLot:   r.sqft_lot,
  },
  pricing: {
    priceUSD:  r.price_usd,
    priceMXN:  r.price_mxn,
  },
  content: {
    descripcion: r.descripcion,
    amenidades:  r.amenidades || [],
    photos:      r.photos     || [],
  },
  seller: {
    name:  r.seller_name,  email: r.seller_email,
    phone: r.seller_phone, id:    r.seller_id,
  },
});

// ── GET /stats ─────────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        COUNT(*)                                          AS total,
        COUNT(*) FILTER (WHERE type='fsbo')               AS fsbo,
        COUNT(*) FILTER (WHERE uploaded_by='agent')       AS agent_uploads,
        COUNT(*) FILTER (WHERE status='pending_review')   AS pending,
        COUNT(*) FILTER (WHERE status='approved')         AS approved,
        COUNT(*) FILTER (WHERE status='sold')             AS sold,
        COUNT(*) FILTER (WHERE featured=true)             AS featured,
        COALESCE(SUM(views),0)                            AS total_views,
        COALESCE(AVG(price_usd) FILTER (WHERE status='approved'),0) AS avg_price_usd,
        COALESCE(MIN(price_usd) FILTER (WHERE status='approved'),0) AS min_price_usd,
        COALESCE(MAX(price_usd) FILTER (WHERE status='approved'),0) AS max_price_usd
      FROM properties
    `);
    res.json({ success: true, stats: rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── GET /pending (admin) ───────────────────────────────────
router.get('/pending', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM properties WHERE status='pending_review' ORDER BY created_at ASC`
    );
    res.json({ success: true, count: rows.length, properties: rows.map(shape) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── GET /all (admin) ───────────────────────────────────────
router.get('/all', async (req, res) => {
  const { status, type, municipio, limit = 100, offset = 0 } = req.query;
  const conditions = [];
  const params     = [];
  if (status)    { params.push(status);          conditions.push(`status=$${params.length}`); }
  if (type)      { params.push(type);            conditions.push(`type=$${params.length}`); }
  if (municipio) { params.push(`%${municipio}%`);conditions.push(`municipio ILIKE $${params.length}`); }
  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  params.push(parseInt(limit), parseInt(offset));
  try {
    const { rows }  = await pool.query(
      `SELECT * FROM properties ${where} ORDER BY created_at DESC LIMIT $${params.length-1} OFFSET $${params.length}`, params
    );
    const cnt = await pool.query(`SELECT COUNT(*) FROM properties ${where}`, params.slice(0,-2));
    res.json({ success: true, count: parseInt(cnt.rows[0].count), properties: rows.map(shape) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── GET / (public — approved only) ─────────────────────────
router.get('/', async (req, res) => {
  const { municipio, tipo, minPrice, maxPrice, beds, featured, limit = 50, offset = 0 } = req.query;
  const conditions = [`status='approved'`];
  const params     = [];
  if (municipio) { params.push(`%${municipio}%`); conditions.push(`municipio ILIKE $${params.length}`); }
  if (tipo)      { params.push(tipo);              conditions.push(`tipo=$${params.length}`); }
  if (minPrice)  { params.push(minPrice);          conditions.push(`price_usd >= $${params.length}`); }
  if (maxPrice)  { params.push(maxPrice);          conditions.push(`price_usd <= $${params.length}`); }
  if (beds)      { params.push(parseInt(beds));    conditions.push(`recamaras >= $${params.length}`); }
  if (featured === 'true') { conditions.push(`featured=true`); }
  params.push(parseInt(limit), parseInt(offset));
  try {
    const { rows } = await pool.query(
      `SELECT * FROM properties WHERE ${conditions.join(' AND ')}
       ORDER BY featured DESC, created_at DESC
       LIMIT $${params.length-1} OFFSET $${params.length}`, params
    );
    res.json({ success: true, count: rows.length, properties: rows.map(shape) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── GET /:id ───────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM properties WHERE id=$1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Property not found' });
    pool.query('UPDATE properties SET views=views+1 WHERE id=$1', [req.params.id]).catch(() => {});
    res.json({ success: true, property: shape(rows[0]) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── POST / — create listing ────────────────────────────────
router.post('/', async (req, res) => {
  const d = req.body;
  try {
    const { rows } = await pool.query(`
      INSERT INTO properties (
        type, uploaded_by, agent_email,
        calle, num_ext, num_int, colonia, municipio, estado, cp, carretera, lat, lng,
        tipo, recamaras, banos, cajones,
        m2_const, sqft_const, m2_lot, sqft_lot,
        price_usd, price_mxn, descripcion, amenidades, photos,
        seller_name, seller_email, seller_phone, seller_id,
        commission_rate, status
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,
        $14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,
        $27,$28,$29,$30,$31,$32
      ) RETURNING *
    `, [
      d.type         || 'fsbo',
      d.uploadedBy   || 'fsbo',
      d.agentEmail   || null,
      d.calle        || null,  d.numExt    || null, d.numInt  || null,
      d.colonia      || null,  d.municipio || null,
      d.estado       || 'Baja California Norte',
      d.cp           || null,  d.carretera || null,
      d.lat          || null,  d.lng       || null,
      d.tipo         || null,
      d.recamaras    ? parseInt(d.recamaras)   : null,
      d.banos        ? parseFloat(d.banos)     : null,
      d.cajones      ? parseInt(d.cajones)     : null,
      d.m2Const      ? parseFloat(d.m2Const)   : null,
      d.sqftConst    ? parseFloat(d.sqftConst) : null,
      d.m2Lot        ? parseFloat(d.m2Lot)     : null,
      d.sqftLot      ? parseFloat(d.sqftLot)   : null,
      d.priceUSD     ? parseFloat(d.priceUSD)  : null,
      d.priceMXN     ? parseFloat(d.priceMXN)  : null,
      d.descripcion  || null,
      d.amenidades   || [],
      d.photos       || [],
      d.sellerName   || null,  d.sellerEmail || null,
      d.sellerPhone  || null,  d.sellerID    || null,
      d.commissionRate ? parseFloat(d.commissionRate) : 6.00,
      d.status       || 'pending_review',
    ]);
    res.status(201).json({ success: true, property: shape(rows[0]) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── PUT /:id — update listing ──────────────────────────────
router.put('/:id', async (req, res) => {
  const d = req.body;
  try {
    const { rows } = await pool.query(`
      UPDATE properties SET
        calle=$1, num_ext=$2, num_int=$3, colonia=$4, municipio=$5, estado=$6,
        cp=$7, carretera=$8, lat=$9, lng=$10,
        tipo=$11, recamaras=$12, banos=$13, cajones=$14,
        m2_const=$15, sqft_const=$16, m2_lot=$17, sqft_lot=$18,
        price_usd=$19, price_mxn=$20, descripcion=$21,
        amenidades=$22, photos=$23,
        seller_name=$24, seller_email=$25, seller_phone=$26,
        updated_at=NOW()
      WHERE id=$27 RETURNING *
    `, [
      d.calle, d.numExt, d.numInt, d.colonia, d.municipio, d.estado,
      d.cp, d.carretera, d.lat, d.lng,
      d.tipo,
      d.recamaras ? parseInt(d.recamaras)   : null,
      d.banos     ? parseFloat(d.banos)     : null,
      d.cajones   ? parseInt(d.cajones)     : null,
      d.m2Const   ? parseFloat(d.m2Const)   : null,
      d.sqftConst ? parseFloat(d.sqftConst) : null,
      d.m2Lot     ? parseFloat(d.m2Lot)     : null,
      d.sqftLot   ? parseFloat(d.sqftLot)   : null,
      d.priceUSD  ? parseFloat(d.priceUSD)  : null,
      d.priceMXN  ? parseFloat(d.priceMXN)  : null,
      d.descripcion,
      d.amenidades || [],
      d.photos     || [],
      d.sellerName, d.sellerEmail, d.sellerPhone,
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).json({ error: 'Property not found' });
    res.json({ success: true, property: shape(rows[0]) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── PUT /:id/status — approve/reject/feature/sold ──────────
router.put('/:id/status', async (req, res) => {
  const { status, approvedBy, rejectionNote, featured } = req.body;
  const validStatuses = ['pending_review','approved','rejected','sold'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Use: ${validStatuses.join(', ')}` });
  }
  try {
    const sets   = [];
    const params = [];
    if (status) {
      params.push(status); sets.push(`status=$${params.length}`);
      if (status === 'approved') {
        sets.push('approved_at=NOW()');
        if (approvedBy) { params.push(approvedBy); sets.push(`approved_by=$${params.length}`); }
      }
      if (status === 'rejected' && rejectionNote) {
        params.push(rejectionNote); sets.push(`rejection_note=$${params.length}`);
      }
    }
    if (typeof featured === 'boolean') {
      params.push(featured); sets.push(`featured=$${params.length}`);
    }
    sets.push('updated_at=NOW()');
    params.push(req.params.id);
    const { rows } = await pool.query(
      `UPDATE properties SET ${sets.join(',')} WHERE id=$${params.length} RETURNING *`, params
    );
    if (!rows.length) return res.status(404).json({ error: 'Property not found' });
    res.json({ success: true, property: shape(rows[0]) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── DELETE /:id ────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('DELETE FROM properties WHERE id=$1 RETURNING id', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Property not found' });
    res.json({ success: true, deleted: rows[0].id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;