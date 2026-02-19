// routes/audits.js - COMPLETE MORTGAGE AUDIT IMPLEMENTATION

const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const { authenticateToken } = require('../middleware/auth');

// Import all miner tiers
const tier1Miners = require('../services/miners/tier1_extraction');
const tier2Miners = require('../services/miners/tier2_compliance');
const tier3Miners = require('../services/miners/tier3_jurisdiction');
const tier4Miners = require('../services/miners/tier4_chain');
const tier5Miners = require('../services/miners/tier5_financial');
const tier6Miners = require('../services/miners/tier6_legal');

/**
 * POST /api/audits/mortgage
 * 
 * Run complete mortgage audit with all 60 Miners
 * 
 * Request body:
 * {
 *   caseId: string,
 *   consumerData: { fullName, email, phone, propertyAddress, ... },
 *   loanData: { originalLender, currentServicer, loanAmount, ... },
 *   documents: { mortgage, statement, paymentHistory, ... }
 * }
 */
router.post('/mortgage', authenticateToken, async (req, res) => {
  const { caseId, consumerData, loanData, documents } = req.body;
  
  try {
    console.log(`\n🔍 Starting mortgage audit for case: ${caseId}`);
    
    // PHASE 1: Tier 1 - Document Extraction (10 SI Miners)
    console.log('⚙️ Phase 1: Document Extraction...');
    const extractedData = await tier1Miners.extractAllDocuments(documents);
    
    // PHASE 2: Tier 2 - Fee Compliance (15 AI Miners)
    console.log('⚙️ Phase 2: Fee Compliance Analysis...');
    const feeViolations = await tier2Miners.analyzeFeeCompliance(extractedData, loanData);
    
    // PHASE 3: Tier 3 - Multi-Jurisdiction (10 SI Miners)
    console.log('⚙️ Phase 3: Jurisdiction Analysis...');
    const jurisdictionViolations = await tier3Miners.analyzeJurisdiction(
      extractedData, 
      consumerData.state,
      consumerData.zip
    );
    
    // PHASE 4: Tier 4 - Chain of Command (10 AI Miners)
    console.log('⚙️ Phase 4: Chain of Command...');
    const chainViolations = await tier4Miners.analyzeChainOfCommand(
      extractedData,
      loanData
    );
    
    // PHASE 5: Tier 5 - Financial Reconciliation (7 SI Miners)
    console.log('⚙️ Phase 5: Financial Reconciliation...');
    const financialViolations = await tier5Miners.reconcileFinancials(
      extractedData,
      loanData
    );
    
    // PHASE 6: Tier 6 - Legal Document Generation (8 SI Miners)
    console.log('⚙️ Phase 6: Legal Analysis...');
    const legalAnalysis = await tier6Miners.analyzeLegalCompliance(
      extractedData,
      loanData,
      consumerData.state
    );
    
    // AGGREGATE ALL VIOLATIONS
    const allViolations = [
      ...feeViolations,
      ...jurisdictionViolations,
      ...chainViolations,
      ...financialViolations,
      ...legalAnalysis.violations
    ];
    
    // Calculate total recovery
    const totalRecovery = allViolations.reduce((sum, v) => sum + v.recoveryAmount, 0);
    
    // Calculate fees
    const ourFee = totalRecovery * 0.35; // 35% commission
    const consumerReceives = totalRecovery - ourFee;
    
    // Store results in database
    const auditResult = await db.query(
      `INSERT INTO audit_results 
       (case_id, total_violations, total_recovery, our_fee, consumer_receives, audit_data, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'completed', NOW())
       RETURNING audit_id`,
      [
        caseId,
        allViolations.length,
        totalRecovery,
        ourFee,
        consumerReceives,
        JSON.stringify({
          violations: allViolations,
          extractedData: extractedData,
          legalAnalysis: legalAnalysis
        })
      ]
    );
    
    const auditId = auditResult.rows[0].audit_id;
    
    console.log(`✅ Audit complete! Found ${allViolations.length} violations worth $${totalRecovery.toLocaleString()}`);
    
    // Return complete results
    res.json({
      success: true,
      auditId: auditId,
      caseId: caseId,
      results: {
        totalViolations: allViolations.length,
        totalRecovery: totalRecovery,
        ourFee: ourFee,
        consumerReceives: consumerReceives,
        violations: allViolations.map(v => ({
          category: v.category,
          type: v.type,
          description: v.description,
          law: v.law,
          recoveryAmount: v.recoveryAmount,
          severity: v.severity,
          evidence: v.evidence
        })),
        breakdown: {
          feeViolations: {
            count: feeViolations.length,
            total: feeViolations.reduce((sum, v) => sum + v.recoveryAmount, 0)
          },
          jurisdictionViolations: {
            count: jurisdictionViolations.length,
            total: jurisdictionViolations.reduce((sum, v) => sum + v.recoveryAmount, 0)
          },
          chainViolations: {
            count: chainViolations.length,
            total: chainViolations.reduce((sum, v) => sum + v.recoveryAmount, 0)
          },
          financialViolations: {
            count: financialViolations.length,
            total: financialViolations.reduce((sum, v) => sum + v.recoveryAmount, 0)
          },
          legalViolations: {
            count: legalAnalysis.violations.length,
            total: legalAnalysis.violations.reduce((sum, v) => sum + v.recoveryAmount, 0)
          }
        },
        legalDocuments: legalAnalysis.documents,
        nextSteps: [
          'Review violation details',
          'Choose Escrow Path (35%) or Direct Path (39%)',
          'Sign authorization',
          'We file CFPB complaint and demand letters',
          'Recovery deposited to escrow',
          'You receive payment'
        ]
      }
    });
    
  } catch (error) {
    console.error('❌ Mortgage audit error:', error);
    res.status(500).json({
      success: false,
      error: 'Audit failed',
      message: error.message
    });
  }
});

/**
 * GET /api/audits/:auditId
 * 
 * Get audit results by audit ID
 */
router.get('/:auditId', authenticateToken, async (req, res) => {
  const { auditId } = req.params;
  
  try {
    const result = await db.query(
      'SELECT * FROM audit_results WHERE audit_id = $1',
      [auditId]
    );
    
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Audit not found' });
    }
    
    const audit = result.rows[0];
    
    res.json({
      success: true,
      audit: {
        auditId: audit.audit_id,
        caseId: audit.case_id,
        totalViolations: audit.total_violations,
        totalRecovery: parseFloat(audit.total_recovery),
        ourFee: parseFloat(audit.our_fee),
        consumerReceives: parseFloat(audit.consumer_receives),
        status: audit.status,
        createdAt: audit.created_at,
        data: audit.audit_data
      }
    });
    
  } catch (error) {
    console.error('Error fetching audit:', error);
    res.status(500).json({ error: 'Failed to fetch audit' });
  }
});

/**
 * POST /api/audits/:auditId/authorize
 * 
 * Consumer authorizes pursuit of recovery
 */
router.post('/:auditId/authorize', authenticateToken, async (req, res) => {
  const { auditId } = req.params;
  const { signature, path } = req.body; // path: 'escrow' or 'direct'
  
  try {
    // Update audit status
    await db.query(
      `UPDATE audit_results 
       SET status = 'authorized', authorized_at = NOW()
       WHERE audit_id = $1`,
      [auditId]
    );
    
    // Store authorization
    await db.query(
      `INSERT INTO consumer_authorizations 
       (audit_id, signature_data, path_chosen, signed_at)
       VALUES ($1, $2, $3, NOW())`,
      [auditId, signature, path]
    );
    
    // Get audit details for next steps
    const audit = await db.query(
      'SELECT * FROM audit_results WHERE audit_id = $1',
      [auditId]
    );
    
    res.json({
      success: true,
      message: 'Authorization received',
      nextSteps: {
        step1: 'CFPB complaint filed (auto-generated)',
        step2: 'Demand letter sent to servicer',
        step3: 'Legal documents prepared',
        step4: 'Escrow account opened',
        step5: 'Recovery process initiated',
        estimatedTimeline: '30-90 days'
      }
    });
    
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ error: 'Authorization failed' });
  }
});

/**
 * GET /api/audits/case/:caseId
 * 
 * Get all audits for a specific case
 */
router.get('/case/:caseId', authenticateToken, async (req, res) => {
  const { caseId } = req.params;
  
  try {
    const results = await db.query(
      `SELECT * FROM audit_results 
       WHERE case_id = $1 
       ORDER BY created_at DESC`,
      [caseId]
    );
    
    res.json({
      success: true,
      audits: results.rows.map(audit => ({
        auditId: audit.audit_id,
        totalViolations: audit.total_violations,
        totalRecovery: parseFloat(audit.total_recovery),
        status: audit.status,
        createdAt: audit.created_at
      }))
    });
    
  } catch (error) {
    console.error('Error fetching case audits:', error);
    res.status(500).json({ error: 'Failed to fetch audits' });
  }
});

module.exports = router;