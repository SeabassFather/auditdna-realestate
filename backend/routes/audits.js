// ══════════════════════════════════════════════════════════════════════════════
//  AUDITDNA — AUDIT ROUTES
//  Path:  C:\AuditDNA\auditdna-realestate\backend\routes\audits.js
//
//  POST /api/audits/mortgage           — Run full 6-tier mortgage audit
//  POST /api/audits/:caseId/legal      — Save legal signature + checks
//  POST /api/audits/:caseId/finalize   — Finalize + record cooling-off period
//  GET  /api/audits/stats              — Dashboard stats
//  GET  /api/audits/:auditId           — Fetch single audit
//  POST /api/audits/:auditId/authorize — Legacy authorize endpoint
// ══════════════════════════════════════════════════════════════════════════════

'use strict';

const express = require('express');
const router  = express.Router();
const { pool } = require('../server');

const tier1 = require('../services/miners/tier1_extraction');
const tier2 = require('../services/miners/tier2_compliance');
const tier3 = require('../services/miners/tier3_jurisdiction');
const tier4 = require('../services/miners/tier4_chain');
const tier5 = require('../services/miners/tier5_financial');
const tier6 = require('../services/miners/tier6_legal');

// ── POST /api/audits/mortgage ─────────────────────────────────────────────────
router.post('/mortgage', async (req, res) => {
  const { caseId, consumerData, loanData, documents } = req.body;

  try {
    console.log(`\n🔍 [MORTGAGE AUDIT] Starting case: ${caseId}`);
    console.log(`   Consumer: ${consumerData?.email || 'unknown'}`);
    console.log(`   Path: ${loanData?.selectedPath || 'unknown'}`);
    console.log(`   Files: ${Array.isArray(documents) ? documents.length : 0}`);

    // ── Run all 6 tiers ──
    const extractedData         = await tier1.extractAllDocuments(documents);
    const feeViolations         = await tier2.analyzeFeeCompliance(extractedData, loanData);
    const jurisdictionViolations = await tier3.analyzeJurisdiction(extractedData, consumerData?.state, consumerData?.zip);
    const chainViolations       = await tier4.analyzeChainOfCommand(extractedData, loanData);
    const financialViolations   = await tier5.reconcileFinancials(extractedData, loanData);
    const legalAnalysis         = await tier6.analyzeLegalCompliance(extractedData, loanData, consumerData?.state);

    const allViolations  = [
      ...feeViolations,
      ...jurisdictionViolations,
      ...chainViolations,
      ...financialViolations,
      ...(legalAnalysis.violations || [])
    ];

    const totalRecovery    = allViolations.reduce((s, v) => s + (v.recoveryAmount || 0), 0);
    const feePct           = loanData?.selectedPath === 'escrow' ? 0.39 : 0.30;
    const ourFee           = totalRecovery * feePct;
    const consumerReceives = totalRecovery - ourFee;

    // ── Save to DB ──
    let auditId = null;
    try {
      // Resolve consumer_id if email is known
      let consumerId = null;
      if (consumerData?.email) {
        const cResult = await pool.query(
          'SELECT id FROM consumers WHERE email = $1', [consumerData.email]
        );
        if (cResult.rows.length) consumerId = cResult.rows[0].id;
      }

      const result = await pool.query(
        `INSERT INTO audit_results
           (case_id, consumer_id, consumer_email, selected_path,
            total_violations, total_recovery, our_fee, our_fee_pct,
            consumer_receives, files_uploaded, status, audit_data, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'pending',$11,NOW())
         ON CONFLICT (case_id) DO UPDATE SET
           total_violations  = EXCLUDED.total_violations,
           total_recovery    = EXCLUDED.total_recovery,
           our_fee           = EXCLUDED.our_fee,
           consumer_receives = EXCLUDED.consumer_receives,
           audit_data        = EXCLUDED.audit_data,
           updated_at        = NOW()
         RETURNING id`,
        [
          caseId,
          consumerId,
          consumerData?.email || null,
          loanData?.selectedPath || null,
          allViolations.length,
          totalRecovery,
          ourFee,
          feePct * 100,
          consumerReceives,
          Array.isArray(documents) ? documents.length : 0,
          JSON.stringify({ violations: allViolations, extractedData, legalAnalysis, consumerData, loanData })
        ]
      );
      auditId = result.rows[0].id;

      // Save individual violations
      for (const v of allViolations) {
        await pool.query(
          `INSERT INTO audit_violations
             (audit_id, case_id, tier, violation_type, law_reference, description, recovery_amount, confidence)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [
            auditId, caseId,
            v.tier || null,
            v.type || v.violationType || null,
            v.law  || v.lawReference  || null,
            v.description || null,
            v.recoveryAmount || 0,
            v.confidence     || 0
          ]
        ).catch(() => {}); // don't fail audit if individual insert fails
      }

      console.log(`✅ [MORTGAGE AUDIT] Saved to DB — audit_id: ${auditId}`);
    } catch (dbErr) {
      console.error(`⚠️  [MORTGAGE AUDIT] DB error (offline): ${dbErr.message}`);
    }

    console.log(`✅ [MORTGAGE AUDIT] Complete! ${allViolations.length} violations | $${totalRecovery.toLocaleString()}`);

    res.json({
      success:   true,
      auditId,
      caseId,
      summary: {
        totalViolations:  allViolations.length,
        totalRecovery,
        ourFee,
        ourFeePct:        feePct * 100,
        consumerReceives,
      },
      violations: allViolations,
      breakdown: {
        fees:         { count: feeViolations.length,          total: feeViolations.reduce((s,v)         => s + (v.recoveryAmount||0), 0) },
        jurisdiction: { count: jurisdictionViolations.length, total: jurisdictionViolations.reduce((s,v) => s + (v.recoveryAmount||0), 0) },
        chain:        { count: chainViolations.length,        total: chainViolations.reduce((s,v)        => s + (v.recoveryAmount||0), 0) },
        financial:    { count: financialViolations.length,    total: financialViolations.reduce((s,v)    => s + (v.recoveryAmount||0), 0) },
        legal:        { count: (legalAnalysis.violations||[]).length, total: (legalAnalysis.violations||[]).reduce((s,v) => s + (v.recoveryAmount||0), 0) }
      },
      legalDocuments: legalAnalysis.documents || []
    });

  } catch (error) {
    console.error('❌ [MORTGAGE AUDIT] Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── POST /api/audits/:caseId/legal ────────────────────────────────────────────
//  Save legal signature + checkbox states after user signs agreement
router.post('/:caseId/legal', async (req, res) => {
  const { caseId }    = req.params;
  const { signature, legalChecks, signedAt } = req.body;

  if (!signature) {
    return res.status(400).json({ success: false, error: 'Signature is required' });
  }

  try {
    // Find audit record
    const auditResult = await pool.query(
      'SELECT id FROM audit_results WHERE case_id = $1', [caseId]
    );

    const auditId = auditResult.rows[0]?.id || null;

    await pool.query(
      `INSERT INTO consumer_authorizations
         (audit_id, case_id, signature_data, legal_checks, signed_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        auditId,
        caseId,
        signature,
        JSON.stringify(legalChecks || {}),
        signedAt || new Date().toISOString(),
        req.ip   || null,
        req.headers['user-agent'] || null
      ]
    );

    // Update audit status
    if (auditId) {
      await pool.query(
        `UPDATE audit_results SET status = 'legal_signed', updated_at = NOW() WHERE id = $1`,
        [auditId]
      );
    }

    console.log(`✅ [LEGAL] Signature saved for case: ${caseId}`);
    res.json({ success: true, message: 'Legal agreement recorded' });

  } catch (err) {
    console.error(`⚠️  [LEGAL] DB error (offline): ${err.message}`);
    // Don't block frontend — still confirm
    res.json({ success: true, message: 'Legal agreement recorded (offline mode)' });
  }
});

// ── POST /api/audits/:caseId/finalize ─────────────────────────────────────────
//  Record final confirmation + cooling-off period
router.post('/:caseId/finalize', async (req, res) => {
  const { caseId }  = req.params;
  const {
    selectedPath,
    fees,
    coolingOffStart,
    coolingOffEnd
  } = req.body;

  try {
    // Find audit
    const auditResult = await pool.query(
      'SELECT id, consumer_email, total_recovery, our_fee, consumer_receives FROM audit_results WHERE case_id = $1',
      [caseId]
    );

    const audit   = auditResult.rows[0];
    const auditId = audit?.id || null;

    // Update audit status to authorized
    if (auditId) {
      await pool.query(
        `UPDATE audit_results
         SET status = 'authorized', authorized_at = NOW(), updated_at = NOW()
         WHERE id = $1`,
        [auditId]
      );
    }

    // Create cooling-off record
    await pool.query(
      `INSERT INTO cooling_off_periods
         (case_id, audit_id, consumer_email, selected_path,
          total_recovery, our_fee, consumer_receives,
          cooling_off_start, cooling_off_end, cancelled)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,FALSE)
       ON CONFLICT (case_id) DO UPDATE SET
         cooling_off_end = EXCLUDED.cooling_off_end,
         updated_at      = NOW()`,
      [
        caseId,
        auditId,
        audit?.consumer_email || null,
        selectedPath || null,
        fees?.total            || audit?.total_recovery    || 0,
        fees?.fee              || audit?.our_fee           || 0,
        fees?.youReceive       || audit?.consumer_receives || 0,
        coolingOffStart        || new Date().toISOString(),
        coolingOffEnd          || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      ]
    );

    console.log(`✅ [FINALIZE] Case authorized + cooling-off recorded: ${caseId}`);
    res.json({
      success:         true,
      message:         'Audit finalized',
      coolingOffEnd:   coolingOffEnd || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    });

  } catch (err) {
    console.error(`⚠️  [FINALIZE] DB error (offline): ${err.message}`);
    res.json({ success: true, message: 'Audit finalized (offline mode)' });
  }
});

// ── GET /api/audits/stats ─────────────────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*)                                               AS total,
        SUM(CASE WHEN status = 'authorized'  THEN 1 ELSE 0 END) AS completed,
        SUM(CASE WHEN status = 'pending'     THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status = 'legal_signed'THEN 1 ELSE 0 END) AS legal_signed,
        COALESCE(SUM(total_recovery), 0)                       AS total_recovered,
        COALESCE(SUM(our_fee), 0)                              AS total_fees,
        COALESCE(AVG(total_recovery), 0)                       AS avg_recovery
      FROM audit_results
    `);
    const row = result.rows[0];
    res.json({
      total:          parseInt(row.total)          || 0,
      completed:      parseInt(row.completed)      || 0,
      pending:        parseInt(row.pending)        || 0,
      legalSigned:    parseInt(row.legal_signed)   || 0,
      totalRecovered: `$${Math.round(row.total_recovered).toLocaleString()}`,
      totalFees:      `$${Math.round(row.total_fees).toLocaleString()}`,
      avgRecovery:    `$${Math.round(row.avg_recovery).toLocaleString()}`
    });
  } catch (error) {
    res.json({ total: 0, completed: 0, pending: 0, totalRecovered: '$0', totalFees: '$0', avgRecovery: '$0' });
  }
});

// ── GET /api/audits/:auditId ──────────────────────────────────────────────────
router.get('/:auditId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM audit_results WHERE id = $1', [req.params.auditId]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Audit not found' });
    res.json({ success: true, audit: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── POST /api/audits/:auditId/authorize (legacy) ──────────────────────────────
router.post('/:auditId/authorize', async (req, res) => {
  const { signature, path: pathChosen } = req.body;
  try {
    await pool.query(
      `UPDATE audit_results SET status = 'authorized', authorized_at = NOW(), updated_at = NOW() WHERE id = $1`,
      [req.params.auditId]
    );
    await pool.query(
      `INSERT INTO consumer_authorizations (audit_id, signature_data, path_chosen, signed_at)
       VALUES ($1, $2, $3, NOW())`,
      [req.params.auditId, signature, pathChosen]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;