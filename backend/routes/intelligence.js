// ══════════════════════════════════════════════════════════════════════════════
//  AUDITDNA — INTELLIGENCE & MONITORING ROUTE
//  Path: C:\AuditDNA\auditdna-realestate\backend\routes\intelligence.js
//
//  POST /api/intelligence/track-lender        — Log lender violation data
//  GET  /api/intelligence/lender-report       — Violations by lender
//  GET  /api/intelligence/class-action        — Class action candidates
//  GET  /api/intelligence/repeat-offenders    — Lenders failing repeatedly
//  GET  /api/intelligence/market-report       — Geographic + rate patterns
//  POST /api/intelligence/track-loan-sale     — Log loan sale/transfer
//  GET  /api/intelligence/loan-sales          — Loan sale tracking
//  GET  /api/intelligence/dashboard           — Full intel dashboard
// ══════════════════════════════════════════════════════════════════════════════

'use strict';

const express = require('express');
const router  = express.Router();
const { pool } = require('../server');

// ── AUTO-CREATE INTELLIGENCE TABLES ──────────────────────────────────────────
const initTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lender_violations (
        id                SERIAL        PRIMARY KEY,
        lender_name       VARCHAR(255)  NOT NULL,
        servicer_name     VARCHAR(255),
        case_id           VARCHAR(100),
        consumer_email    VARCHAR(255),
        consumer_state    VARCHAR(10),
        consumer_zip      VARCHAR(10),
        violation_type    VARCHAR(100),
        law_reference     VARCHAR(255),
        tier              INTEGER,
        amount_owed       NUMERIC(12,2) DEFAULT 0,
        loan_amount       NUMERIC(12,2),
        loan_type         VARCHAR(50),
        origination_date  VARCHAR(50),
        has_been_transferred BOOLEAN    DEFAULT FALSE,
        audit_date        TIMESTAMP     DEFAULT NOW(),
        created_at        TIMESTAMP     DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS loan_sale_tracking (
        id                SERIAL        PRIMARY KEY,
        case_id           VARCHAR(100),
        original_lender   VARCHAR(255),
        current_servicer  VARCHAR(255),
        sale_date         VARCHAR(50),
        notice_given      BOOLEAN       DEFAULT FALSE,
        notice_date       VARCHAR(50),
        fee_change        NUMERIC(10,2) DEFAULT 0,
        rate_change       NUMERIC(8,4)  DEFAULT 0,
        terms_violated    BOOLEAN       DEFAULT FALSE,
        violation_details TEXT,
        consumer_email    VARCHAR(255),
        consumer_state    VARCHAR(10),
        loan_amount       NUMERIC(12,2),
        created_at        TIMESTAMP     DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS rate_monitoring (
        id              SERIAL        PRIMARY KEY,
        lender_name     VARCHAR(255),
        servicer_name   VARCHAR(255),
        loan_type       VARCHAR(50),
        consumer_state  VARCHAR(10),
        original_rate   NUMERIC(8,4),
        current_rate    NUMERIC(8,4),
        rate_change     NUMERIC(8,4),
        change_date     VARCHAR(50),
        authorized      BOOLEAN       DEFAULT FALSE,
        case_id         VARCHAR(100),
        created_at      TIMESTAMP     DEFAULT NOW()
      );
    `);
    console.log('✅ [INTELLIGENCE] Tables ready');
  } catch (err) {
    console.error('⚠️  [INTELLIGENCE] Table init error:', err.message);
  }
};
initTables();

// ── HELPERS ───────────────────────────────────────────────────────────────────
const getPool = () => pool;

// ── POST /api/intelligence/track-lender ──────────────────────────────────────
//  Called automatically after each audit to log lender violations
router.post('/track-lender', async (req, res) => {
  const {
    lenderName, servicerName, caseId, consumerEmail,
    consumerState, consumerZip, violations,
    loanAmount, loanType, originationDate, hasBeenTransferred
  } = req.body;

  if (!lenderName || !violations?.length) {
    return res.status(400).json({ error: 'lenderName and violations required' });
  }

  try {
    let tracked = 0;
    for (const v of violations) {
      await pool.query(
        `INSERT INTO lender_violations
           (lender_name, servicer_name, case_id, consumer_email,
            consumer_state, consumer_zip, violation_type, law_reference,
            tier, amount_owed, loan_amount, loan_type,
            origination_date, has_been_transferred, audit_date)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,NOW())`,
        [
          lenderName, servicerName || null, caseId || null,
          consumerEmail || null, consumerState || null, consumerZip || null,
          v.violationType || v.type || null,
          v.law || v.lawReference || null,
          v.tier || null,
          v.recoveryAmount || 0,
          loanAmount || null, loanType || null,
          originationDate || null,
          hasBeenTransferred || false
        ]
      );
      tracked++;
    }

    console.log(`✅ [INTELLIGENCE] Tracked ${tracked} violations for: ${lenderName}`);
    res.json({ success: true, tracked, lender: lenderName });

  } catch (err) {
    console.error('⚠️  [INTELLIGENCE] Track error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/intelligence/lender-report ──────────────────────────────────────
//  All lenders ranked by total violations + dollars owed
router.get('/lender-report', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        lender_name,
        servicer_name,
        COUNT(*)                          AS total_violations,
        COUNT(DISTINCT case_id)           AS total_cases,
        COUNT(DISTINCT consumer_state)    AS states_affected,
        ROUND(SUM(amount_owed), 2)        AS total_owed,
        ROUND(AVG(amount_owed), 2)        AS avg_per_violation,
        ROUND(MAX(amount_owed), 2)        AS max_single_violation,
        MIN(audit_date)                   AS first_audit,
        MAX(audit_date)                   AS last_audit,
        ARRAY_AGG(DISTINCT violation_type) FILTER (WHERE violation_type IS NOT NULL) AS violation_types
      FROM lender_violations
      GROUP BY lender_name, servicer_name
      ORDER BY total_owed DESC
    `);

    res.json({
      success:  true,
      count:    result.rows.length,
      lenders:  result.rows,
      generated: new Date().toISOString()
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/intelligence/class-action ───────────────────────────────────────
//  Lenders with multiple consumers + same violation = class action candidates
router.get('/class-action', async (req, res) => {
  const minCases      = parseInt(req.query.minCases)  || 3;
  const minAmount     = parseFloat(req.query.minAmount) || 50000;

  try {
    const result = await pool.query(`
      SELECT
        lender_name,
        violation_type,
        law_reference,
        COUNT(DISTINCT case_id)           AS affected_consumers,
        COUNT(DISTINCT consumer_state)    AS states_affected,
        ROUND(SUM(amount_owed), 2)        AS aggregate_liability,
        ROUND(AVG(amount_owed), 2)        AS avg_per_consumer,
        ARRAY_AGG(DISTINCT consumer_state) FILTER (WHERE consumer_state IS NOT NULL) AS state_list,
        MIN(audit_date)                   AS earliest_violation,
        MAX(audit_date)                   AS latest_violation
      FROM lender_violations
      GROUP BY lender_name, violation_type, law_reference
      HAVING
        COUNT(DISTINCT case_id) >= $1
        AND SUM(amount_owed) >= $2
      ORDER BY aggregate_liability DESC
    `, [minCases, minAmount]);

    // Score each candidate
    const candidates = result.rows.map(r => ({
      ...r,
      class_action_score: Math.min(100, Math.round(
        (parseInt(r.affected_consumers) * 15) +
        (parseInt(r.states_affected) * 10) +
        (parseFloat(r.aggregate_liability) / 10000)
      )),
      recommendation: parseFloat(r.aggregate_liability) > 500000
        ? 'STRONG CLASS ACTION CANDIDATE — Contact class action attorney'
        : parseFloat(r.aggregate_liability) > 100000
        ? 'POTENTIAL CLASS ACTION — Monitor for additional cases'
        : 'PATTERN IDENTIFIED — Continue tracking'
    }));

    res.json({
      success:    true,
      count:      candidates.length,
      candidates,
      criteria: { minCases, minAmount },
      generated:  new Date().toISOString()
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/intelligence/repeat-offenders ────────────────────────────────────
//  Lenders with highest frequency of audit failures
router.get('/repeat-offenders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        lender_name,
        COUNT(DISTINCT case_id)                    AS total_audits_failed,
        COUNT(*)                                   AS total_violations,
        ROUND(SUM(amount_owed), 2)                 AS total_liability,
        ROUND(SUM(amount_owed) / COUNT(DISTINCT case_id), 2) AS avg_per_audit,
        COUNT(DISTINCT violation_type)             AS violation_categories,
        COUNT(DISTINCT consumer_state)             AS states_affected,
        COUNT(DISTINCT CASE WHEN tier = 2 THEN id END) AS fee_violations,
        COUNT(DISTINCT CASE WHEN tier = 5 THEN id END) AS financial_violations,
        MAX(audit_date)                            AS most_recent_failure,
        CASE
          WHEN COUNT(DISTINCT case_id) >= 10 THEN 'SERIAL OFFENDER'
          WHEN COUNT(DISTINCT case_id) >= 5  THEN 'REPEAT OFFENDER'
          WHEN COUNT(DISTINCT case_id) >= 3  THEN 'PATTERN EMERGING'
          ELSE 'SINGLE INCIDENT'
        END AS offender_classification
      FROM lender_violations
      GROUP BY lender_name
      ORDER BY total_audits_failed DESC, total_liability DESC
    `);

    res.json({
      success:    true,
      count:      result.rows.length,
      offenders:  result.rows,
      generated:  new Date().toISOString()
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/intelligence/market-report ──────────────────────────────────────
//  Geographic patterns + violation heat map
router.get('/market-report', async (req, res) => {
  try {
    const [byState, byType, byLoanType, timeline] = await Promise.all([

      // By state
      pool.query(`
        SELECT
          consumer_state                       AS state,
          COUNT(DISTINCT case_id)              AS cases,
          COUNT(*)                             AS violations,
          ROUND(SUM(amount_owed), 2)           AS total_owed,
          COUNT(DISTINCT lender_name)          AS lenders_involved
        FROM lender_violations
        WHERE consumer_state IS NOT NULL
        GROUP BY consumer_state
        ORDER BY total_owed DESC
      `),

      // By violation type
      pool.query(`
        SELECT
          violation_type,
          COUNT(*)                             AS frequency,
          ROUND(SUM(amount_owed), 2)           AS total_owed,
          ROUND(AVG(amount_owed), 2)           AS avg_amount,
          COUNT(DISTINCT lender_name)          AS lenders_involved
        FROM lender_violations
        WHERE violation_type IS NOT NULL
        GROUP BY violation_type
        ORDER BY frequency DESC
      `),

      // By loan type
      pool.query(`
        SELECT
          loan_type,
          COUNT(DISTINCT case_id)              AS cases,
          COUNT(*)                             AS violations,
          ROUND(SUM(amount_owed), 2)           AS total_owed
        FROM lender_violations
        WHERE loan_type IS NOT NULL
        GROUP BY loan_type
        ORDER BY total_owed DESC
      `),

      // Monthly timeline
      pool.query(`
        SELECT
          TO_CHAR(DATE_TRUNC('month', audit_date), 'YYYY-MM') AS month,
          COUNT(DISTINCT case_id)              AS cases,
          COUNT(*)                             AS violations,
          ROUND(SUM(amount_owed), 2)           AS total_owed
        FROM lender_violations
        GROUP BY DATE_TRUNC('month', audit_date)
        ORDER BY month DESC
        LIMIT 24
      `)
    ]);

    res.json({
      success: true,
      market: {
        byState:    byState.rows,
        byType:     byType.rows,
        byLoanType: byLoanType.rows,
        timeline:   timeline.rows
      },
      generated: new Date().toISOString()
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/intelligence/track-loan-sale ────────────────────────────────────
//  Log a loan transfer/sale event
router.post('/track-loan-sale', async (req, res) => {
  const {
    caseId, originalLender, currentServicer, saleDate,
    noticeGiven, noticeDate, feeChange, rateChange,
    termsViolated, violationDetails, consumerEmail,
    consumerState, loanAmount
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO loan_sale_tracking
         (case_id, original_lender, current_servicer, sale_date,
          notice_given, notice_date, fee_change, rate_change,
          terms_violated, violation_details, consumer_email,
          consumer_state, loan_amount)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [
        caseId, originalLender, currentServicer, saleDate,
        noticeGiven || false, noticeDate || null,
        feeChange || 0, rateChange || 0,
        termsViolated || false, violationDetails || null,
        consumerEmail, consumerState, loanAmount
      ]
    );

    console.log(`✅ [INTELLIGENCE] Loan sale tracked: ${originalLender} → ${currentServicer}`);
    res.json({ success: true, message: 'Loan sale tracked' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/intelligence/loan-sales ─────────────────────────────────────────
//  All loan sale/transfer records with violation flags
router.get('/loan-sales', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        original_lender,
        current_servicer,
        COUNT(*)                                          AS total_transfers,
        SUM(CASE WHEN notice_given = false THEN 1 ELSE 0 END) AS missing_notices,
        SUM(CASE WHEN terms_violated = true THEN 1 ELSE 0 END) AS terms_violations,
        SUM(CASE WHEN fee_change > 0 THEN 1 ELSE 0 END)  AS fee_increases,
        ROUND(SUM(fee_change), 2)                         AS total_fee_increases,
        ROUND(AVG(rate_change), 4)                        AS avg_rate_change,
        COUNT(DISTINCT consumer_state)                    AS states_affected
      FROM loan_sale_tracking
      GROUP BY original_lender, current_servicer
      ORDER BY total_transfers DESC
    `);

    res.json({ success: true, transfers: result.rows, generated: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/intelligence/dashboard ──────────────────────────────────────────
//  Full intelligence summary — everything in one call
router.get('/dashboard', async (req, res) => {
  try {
    const [totals, topLenders, topViolations, recentActivity, loanSales] = await Promise.all([

      pool.query(`
        SELECT
          COUNT(DISTINCT case_id)       AS total_cases_audited,
          COUNT(DISTINCT lender_name)   AS unique_lenders,
          COUNT(*)                      AS total_violations,
          ROUND(SUM(amount_owed), 2)    AS total_liability_identified,
          COUNT(DISTINCT consumer_state) AS states_covered
        FROM lender_violations
      `),

      pool.query(`
        SELECT lender_name, COUNT(DISTINCT case_id) AS cases, ROUND(SUM(amount_owed),2) AS owed
        FROM lender_violations
        GROUP BY lender_name ORDER BY owed DESC LIMIT 10
      `),

      pool.query(`
        SELECT violation_type, COUNT(*) AS count, ROUND(SUM(amount_owed),2) AS total
        FROM lender_violations WHERE violation_type IS NOT NULL
        GROUP BY violation_type ORDER BY count DESC LIMIT 10
      `),

      pool.query(`
        SELECT lender_name, violation_type, amount_owed, consumer_state, audit_date
        FROM lender_violations ORDER BY audit_date DESC LIMIT 20
      `),

      pool.query(`
        SELECT COUNT(*) AS total,
          SUM(CASE WHEN notice_given = false THEN 1 ELSE 0 END) AS missing_notices,
          SUM(CASE WHEN terms_violated = true THEN 1 ELSE 0 END) AS terms_violations
        FROM loan_sale_tracking
      `)
    ]);

    const t = totals.rows[0];
    const ls = loanSales.rows[0];

    res.json({
      success: true,
      dashboard: {
        summary: {
          totalCasesAudited:       parseInt(t.total_cases_audited)     || 0,
          uniqueLenders:           parseInt(t.unique_lenders)          || 0,
          totalViolations:         parseInt(t.total_violations)        || 0,
          totalLiabilityIdentified: parseFloat(t.total_liability_identified) || 0,
          statesCovered:           parseInt(t.states_covered)          || 0
        },
        loanSales: {
          totalTransfers:  parseInt(ls?.total)           || 0,
          missingNotices:  parseInt(ls?.missing_notices) || 0,
          termsViolations: parseInt(ls?.terms_violations)|| 0
        },
        topLenders:      topLenders.rows,
        topViolations:   topViolations.rows,
        recentActivity:  recentActivity.rows
      },
      generated: new Date().toISOString()
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;