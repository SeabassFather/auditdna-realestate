// routes/audits.js - MORTGAGE AUDIT ROUTES
// Auto-loaded by server.js as /api/audits

const express = require('express');
const router = express.Router();
const { pool } = require('../server');

// Import miners
const tier1 = require('../services/miners/tier1_extraction');
const tier2 = require('../services/miners/tier2_compliance');
const tier3 = require('../services/miners/tier3_jurisdiction');
const tier4 = require('../services/miners/tier4_chain');
const tier5 = require('../services/miners/tier5_financial');
const tier6 = require('../services/miners/tier6_legal');

/**
 * POST /api/audits/mortgage
 * Run complete mortgage audit
 */
router.post('/mortgage', async (req, res) => {
  const { caseId, consumerData, loanData, documents } = req.body;
  
  try {
    console.log(`\n🔍 [MORTGAGE AUDIT] Starting case: ${caseId}`);
    
    // Phase 1: Extract
    const extractedData = await tier1.extractAllDocuments(documents);
    
    // Phase 2: Fee Compliance
    const feeViolations = await tier2.analyzeFeeCompliance(extractedData, loanData);
    
    // Phase 3: Jurisdiction
    const jurisdictionViolations = await tier3.analyzeJurisdiction(extractedData, consumerData.state, consumerData.zip);
    
    // Phase 4: Chain
    const chainViolations = await tier4.analyzeChainOfCommand(extractedData, loanData);
    
    // Phase 5: Financial
    const financialViolations = await tier5.reconcileFinancials(extractedData, loanData);
    
    // Phase 6: Legal
    const legalAnalysis = await tier6.analyzeLegalCompliance(extractedData, loanData, consumerData.state);
    
    // Combine all violations
    const allViolations = [
      ...feeViolations,
      ...jurisdictionViolations,
      ...chainViolations,
      ...financialViolations,
      ...legalAnalysis.violations
    ];
    
    const totalRecovery = allViolations.reduce((sum, v) => sum + v.recoveryAmount, 0);
    const ourFee = totalRecovery * 0.35;
    const consumerReceives = totalRecovery - ourFee;
    
    // Store in database
    const result = await pool.query(
      `INSERT INTO audit_results 
       (case_id, total_violations, total_recovery, our_fee, consumer_receives, audit_data, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id`,
      [caseId, allViolations.length, totalRecovery, ourFee, consumerReceives, 
       JSON.stringify({ violations: allViolations, extractedData, legalAnalysis })]
    );
    
    const auditId = result.rows[0].id;
    
    console.log(`✅ [MORTGAGE AUDIT] Complete! ${allViolations.length} violations, $${totalRecovery.toLocaleString()}`);
    
    res.json({
      success: true,
      auditId,
      caseId,
      totalViolations: allViolations.length,
      totalRecovery,
      ourFee,
      consumerReceives,
      violations: allViolations,
      breakdown: {
        fees: { count: feeViolations.length, total: feeViolations.reduce((s, v) => s + v.recoveryAmount, 0) },
        jurisdiction: { count: jurisdictionViolations.length, total: jurisdictionViolations.reduce((s, v) => s + v.recoveryAmount, 0) },
        chain: { count: chainViolations.length, total: chainViolations.reduce((s, v) => s + v.recoveryAmount, 0) },
        financial: { count: financialViolations.length, total: financialViolations.reduce((s, v) => s + v.recoveryAmount, 0) },
        legal: { count: legalAnalysis.violations.length, total: legalAnalysis.violations.reduce((s, v) => s + v.recoveryAmount, 0) }
      },
      legalDocuments: legalAnalysis.documents
    });
    
  } catch (error) {
    console.error('❌ [MORTGAGE AUDIT] Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/audits/:auditId
 */
router.get('/:auditId', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM audit_results WHERE id = $1', [req.params.auditId]);
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, audit: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/audits/:auditId/authorize
 */
router.post('/:auditId/authorize', async (req, res) => {
  const { signature, path } = req.body;
  try {
    await pool.query(`UPDATE audit_results SET status = 'authorized', authorized_at = NOW() WHERE id = $1`, [req.params.auditId]);
    await pool.query(`INSERT INTO consumer_authorizations (audit_id, signature_data, path_chosen, signed_at) VALUES ($1, $2, $3, NOW())`, [req.params.auditId, signature, path]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;