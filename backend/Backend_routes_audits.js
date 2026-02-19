// ============================================================================
// AUDIT PROCESSING ROUTES
// Triggers 60 Miner Niners and generates audit results
// ============================================================================

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Import all 60 miners
const tier1Miners = require('../services/miners/tier1_extraction');
const tier2Miners = require('../services/miners/tier2_compliance');
const tier3Miners = require('../services/miners/tier3_jurisdiction');
const tier4Miners = require('../services/miners/tier4_chain');
const tier5Miners = require('../services/miners/tier5_financial');
const tier6Miners = require('../services/miners/tier6_legal');

// ============================================================================
// POST /api/audits/process - TRIGGER 60 MINER NINERS
// ============================================================================

router.post('/process', async (req, res) => {
  try {
    const { caseId, consumerData, documents } = req.body;
    
    console.log(`🔥 STARTING AUDIT PROCESS - Case ID: ${caseId}`);
    console.log(`📊 60 MINER NINERS ACTIVATED`);
    
    // Initialize results storage
    const auditResults = {
      caseId,
      startTime: new Date(),
      minerResults: {},
      violations: [],
      totalRecovery: 0,
      chainOfCommand: [],
      stateAnalysis: {}
    };
    
    // ========================================================================
    // TIER 1: DOCUMENT EXTRACTION (10 MINERS - SI)
    // ========================================================================
    console.log('⚙️  TIER 1: Document Extraction (SI)');
    auditResults.minerResults.tier1 = await tier1Miners.processAll(documents);
    
    // ========================================================================
    // TIER 2: FEE COMPLIANCE ANALYSIS (15 MINERS - AI)
    // ========================================================================
    console.log('⚙️  TIER 2: Fee Compliance Analysis (AI)');
    const extractedData = auditResults.minerResults.tier1;
    auditResults.minerResults.tier2 = await tier2Miners.processAll(extractedData, consumerData);
    
    // ========================================================================
    // TIER 3: MULTI-JURISDICTION ANALYSIS (10 MINERS - SI)
    // ========================================================================
    console.log('⚙️  TIER 3: Multi-Jurisdiction Analysis (SI)');
    auditResults.minerResults.tier3 = await tier3Miners.processAll(
      consumerData.state,
      consumerData.lenderState,
      consumerData.servicerState
    );
    
    // ========================================================================
    // TIER 4: CHAIN OF COMMAND TRACKING (10 MINERS - AI)
    // ========================================================================
    console.log('⚙️  TIER 4: Chain of Command Tracking (AI)');
    auditResults.minerResults.tier4 = await tier4Miners.processAll(documents.servicerTransferDocs);
    auditResults.chainOfCommand = auditResults.minerResults.tier4.transferHistory;
    
    // ========================================================================
    // TIER 5: FINANCIAL RECONCILIATION (7 MINERS - SI)
    // ========================================================================
    console.log('⚙️  TIER 5: Financial Reconciliation (SI)');
    auditResults.minerResults.tier5 = await tier5Miners.processAll(
      extractedData,
      documents.escrowAnalysis,
      documents.taxBills,
      documents.insurancePolicies
    );
    
    // ========================================================================
    // TIER 6: LEGAL DOCUMENT GENERATION (8 MINERS - SI)
    // ========================================================================
    console.log('⚙️  TIER 6: Legal Document Generation (SI)');
    auditResults.minerResults.tier6 = await tier6Miners.processAll(
      caseId,
      consumerData,
      auditResults
    );
    
    // ========================================================================
    // AGGREGATE VIOLATIONS
    // ========================================================================
    console.log('📋 Aggregating violations...');
    
    // Combine all violations from all tiers
    const allViolations = [
      ...(auditResults.minerResults.tier2.violations || []),
      ...(auditResults.minerResults.tier3.violations || []),
      ...(auditResults.minerResults.tier4.violations || []),
      ...(auditResults.minerResults.tier5.violations || [])
    ];
    
    // Calculate total recovery
    auditResults.totalRecovery = allViolations.reduce((sum, v) => sum + v.amount, 0);
    auditResults.violations = allViolations;
    
    // ========================================================================
    // SAVE TO DATABASE
    // ========================================================================
    console.log('💾 Saving audit results to database...');
    
    const result = await pool.query(`
      INSERT INTO audit_results 
      (case_id, total_recovery, violations, chain_of_command, state_analysis, miner_data, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id
    `, [
      caseId,
      auditResults.totalRecovery,
      JSON.stringify(auditResults.violations),
      JSON.stringify(auditResults.chainOfCommand),
      JSON.stringify(auditResults.stateAnalysis),
      JSON.stringify(auditResults.minerResults)
    ]);
    
    auditResults.auditId = result.rows[0].id;
    auditResults.endTime = new Date();
    auditResults.processingTime = (auditResults.endTime - auditResults.startTime) / 1000;
    
    console.log(`✅ AUDIT COMPLETE - ${auditResults.processingTime}s`);
    console.log(`💰 Total Recovery: $${auditResults.totalRecovery.toLocaleString()}`);
    console.log(`⚠️  Violations Found: ${auditResults.violations.length}`);
    
    res.json({
      success: true,
      auditId: auditResults.auditId,
      totalRecovery: auditResults.totalRecovery,
      violationsCount: auditResults.violations.length,
      processingTime: auditResults.processingTime,
      summary: {
        tier1: `${Object.keys(auditResults.minerResults.tier1).length} documents extracted`,
        tier2: `${auditResults.minerResults.tier2.violations.length} fee violations found`,
        tier3: `${Object.keys(auditResults.minerResults.tier3).length} jurisdictions analyzed`,
        tier4: `${auditResults.chainOfCommand.length} servicer transfers tracked`,
        tier5: `${auditResults.minerResults.tier5.overpayments.length} overpayments detected`,
        tier6: `${Object.keys(auditResults.minerResults.tier6.documents).length} legal documents generated`
      }
    });
    
  } catch (error) {
    console.error('❌ AUDIT PROCESSING ERROR:', error);
    res.status(500).json({
      success: false,
      error: 'Audit processing failed',
      message: error.message
    });
  }
});

// ============================================================================
// GET /api/audits/:id/results - GET AUDIT RESULTS
// ============================================================================

router.get('/:id/results', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT * FROM audit_results WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Audit not found' });
    }
    
    const audit = result.rows[0];
    
    res.json({
      success: true,
      audit: {
        id: audit.id,
        caseId: audit.case_id,
        totalRecovery: audit.total_recovery,
        violations: JSON.parse(audit.violations),
        chainOfCommand: JSON.parse(audit.chain_of_command),
        stateAnalysis: JSON.parse(audit.state_analysis),
        createdAt: audit.created_at
      }
    });
    
  } catch (error) {
    console.error('Error fetching audit results:', error);
    res.status(500).json({ error: 'Failed to fetch audit results' });
  }
});

// ============================================================================
// GET /api/audits/:id/status - GET PROCESSING STATUS
// ============================================================================

router.get('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        ar.id,
        ar.created_at,
        ar.total_recovery,
        c.status as case_status,
        c.consumer_id
      FROM audit_results ar
      JOIN cases c ON ar.case_id = c.id
      WHERE ar.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Audit not found' });
    }
    
    const audit = result.rows[0];
    
    res.json({
      success: true,
      status: {
        auditId: audit.id,
        caseStatus: audit.case_status,
        totalRecovery: audit.total_recovery,
        completedAt: audit.created_at,
        timeSinceCompletion: Math.floor((Date.now() - new Date(audit.created_at)) / 1000 / 60) + ' minutes ago'
      }
    });
    
  } catch (error) {
    console.error('Error fetching audit status:', error);
    res.status(500).json({ error: 'Failed to fetch audit status' });
  }
});

module.exports = router;