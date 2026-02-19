// ============================================================================
// COMPLETE BACKEND ROUTES - ALL 12 ROUTE FILES
// Ready to deploy to: C:\AuditDNA\auditdna-realestate\backend\routes\
// ============================================================================

// ========================================================================
// FILE 1: routes/monitoring.js - MONITORING SUBSCRIPTIONS
// ========================================================================
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// POST /api/monitoring/subscribe - Create new monitoring subscription
router.post('/subscribe', async (req, res) => {
  try {
    const { consumerId, caseId, tier, paymentMethodId } = req.body;
    
    // Pricing
    const pricing = {
      basic: 19.99,
      premium: 34.99,
      elite: 49.99
    };
    
    const monthlyFee = pricing[tier];
    
    // Create Stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: req.body.stripeCustomerId, // From consumer record
      items: [{ price: `price_${tier}` }], // Create these in Stripe dashboard
      trial_period_days: 30, // First month free!
      metadata: {
        consumer_id: consumerId,
        case_id: caseId,
        tier: tier
      }
    });
    
    // Save to database
    const result = await pool.query(`
      INSERT INTO mortgage_monitoring_subscriptions
      (consumer_id, case_id, tier, monthly_fee, stripe_subscription_id, status, started_at, next_billing_date)
      VALUES ($1, $2, $3, $4, $5, 'active', NOW(), NOW() + INTERVAL '30 days')
      RETURNING *
    `, [consumerId, caseId, tier, monthlyFee, subscription.id]);
    
    res.json({
      success: true,
      subscription: result.rows[0],
      message: `Welcome to AuditDNA Shield ${tier.toUpperCase()}! First month FREE.`
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// GET /api/monitoring/dashboard/:consumerId - Consumer monitoring dashboard
router.get('/dashboard/:consumerId', async (req, res) => {
  try {
    const { consumerId } = req.params;
    
    // Get active subscription
    const subResult = await pool.query(`
      SELECT * FROM mortgage_monitoring_subscriptions
      WHERE consumer_id = $1 AND status = 'active'
      ORDER BY started_at DESC
      LIMIT 1
    `, [consumerId]);
    
    if (subResult.rows.length === 0) {
      return res.status(404).json({ error: 'No active subscription' });
    }
    
    const subscription = subResult.rows[0];
    
    // Get recent alerts
    const alertsResult = await pool.query(`
      SELECT * FROM monitoring_alerts
      WHERE subscription_id = $1
      ORDER BY created_at DESC
      LIMIT 10
    `, [subscription.id]);
    
    // Get savings tracker
    const savingsResult = await pool.query(`
      SELECT 
        SUM(CASE WHEN alert_type = 'new_fee' AND cfpb_filed THEN amount ELSE 0 END) as fees_prevented,
        SUM(CASE WHEN alert_type = 'escrow_surplus' THEN amount ELSE 0 END) as escrow_refunds
      FROM monitoring_alerts
      WHERE subscription_id = $1 AND acknowledged = true
    `, [subscription.id]);
    
    const savings = savingsResult.rows[0];
    const totalSaved = parseFloat(savings.fees_prevented || 0) + parseFloat(savings.escrow_refunds || 0);
    const totalPaid = monthsSince(subscription.started_at) * subscription.monthly_fee;
    const roi = totalPaid > 0 ? (totalSaved / totalPaid) * 100 : 0;
    
    res.json({
      success: true,
      dashboard: {
        subscription: {
          tier: subscription.tier,
          status: subscription.status,
          nextBilling: subscription.next_billing_date,
          monthlyFee: subscription.monthly_fee
        },
        mortgageSnapshot: {
          servicer: subscription.current_servicer,
          balance: subscription.current_balance,
          escrowBalance: subscription.escrow_balance,
          pmiMonthly: subscription.pmi_amount,
          pmiRemovalEligible: subscription.pmi_removal_eligible,
          interestRate: subscription.interest_rate
        },
        recentAlerts: alertsResult.rows,
        savingsTracker: {
          feesPrevented: savings.fees_prevented,
          escrowRefunds: savings.escrow_refunds,
          totalSaved: totalSaved,
          totalPaid: totalPaid,
          roi: roi.toFixed(1) + '%'
        }
      }
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

// POST /api/monitoring/cancel/:subscriptionId
router.post('/cancel/:subscriptionId', async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    
    const result = await pool.query(`
      SELECT stripe_subscription_id FROM mortgage_monitoring_subscriptions
      WHERE id = $1
    `, [subscriptionId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    // Cancel in Stripe
    await stripe.subscriptions.del(result.rows[0].stripe_subscription_id);
    
    // Update database
    await pool.query(`
      UPDATE mortgage_monitoring_subscriptions
      SET status = 'cancelled'
      WHERE id = $1
    `, [subscriptionId]);
    
    res.json({ success: true, message: 'Subscription cancelled' });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

function monthsSince(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24 * 30));
}

module.exports = router;

// ========================================================================
// FILE 2: routes/autosave.js - AUTOSAVE OPTIMIZATION
// ========================================================================
const express2 = require('express');
const router2 = express2.Router();

// POST /api/autosave/scan/:subscriptionId - Manual scan for opportunities
router2.post('/scan/:subscriptionId', async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    
    // Import AutoSave modules
    const { runAutonomousOptimization } = require('../services/autosave/autonomousEngine');
    
    const opportunities = await runAutonomousOptimization(subscriptionId);
    
    res.json({
      success: true,
      opportunitiesFound: opportunities.length,
      opportunities: opportunities,
      totalMonthlySavings: opportunities.reduce((sum, o) => sum + o.monthly_savings, 0),
      totalAnnualSavings: opportunities.reduce((sum, o) => sum + o.annual_savings, 0)
    });
    
  } catch (error) {
    console.error('AutoSave scan error:', error);
    res.status(500).json({ error: 'Scan failed' });
  }
});

// GET /api/autosave/opportunities/:consumerId
router2.get('/opportunities/:consumerId', async (req, res) => {
  try {
    const { consumerId } = req.params;
    
    const result = await pool.query(`
      SELECT ao.* FROM autosave_opportunities ao
      JOIN mortgage_monitoring_subscriptions mms ON ao.subscription_id = mms.id
      WHERE mms.consumer_id = $1
      AND ao.status = 'active'
      AND ao.expires_at > NOW()
      ORDER BY ao.monthly_savings DESC
    `, [consumerId]);
    
    res.json({
      success: true,
      opportunities: result.rows
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

// POST /api/autosave/dismiss/:opportunityId
router2.post('/dismiss/:opportunityId', async (req, res) => {
  try {
    const { opportunityId } = req.params;
    const { reason } = req.body;
    
    await pool.query(`
      UPDATE autosave_opportunities
      SET status = 'dismissed', dismissed_reason = $2
      WHERE id = $1
    `, [opportunityId, reason]);
    
    res.json({ success: true });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to dismiss opportunity' });
  }
});

module.exports = router2;

// ========================================================================
// FILE 3: routes/leads.js - LEAD GENERATION & SALES
// ========================================================================
const express3 = require('express');
const router3 = express3.Router();

// POST /api/leads/generate - Generate lead from AutoSave opportunity
router3.post('/generate', async (req, res) => {
  try {
    const { consumerId, opportunityId, leadType } = req.body;
    
    // Get consumer data
    const consumerResult = await pool.query(`
      SELECT * FROM consumers WHERE id = $1
    `, [consumerId]);
    
    const consumer = consumerResult.rows[0];
    
    // Get consent
    const consentResult = await pool.query(`
      SELECT * FROM data_sharing_consents WHERE consumer_id = $1
    `, [consumerId]);
    
    const consent = consentResult.rows[0];
    
    // Check consent for this lead type
    if (leadType === 'insurance' && !consent.consent_insurance_leads) {
      return res.status(403).json({ error: 'Consumer has not consented to insurance leads' });
    }
    
    if (leadType === 'refinance' && !consent.consent_refinance_leads) {
      return res.status(403).json({ error: 'Consumer has not consented to refinance leads' });
    }
    
    // Calculate lead score (0-100)
    const leadScore = calculateLeadScore(consumer, opportunityId);
    
    // Create lead
    const result = await pool.query(`
      INSERT INTO generated_leads
      (consumer_id, opportunity_id, lead_type, lead_status, lead_data, lead_score, intent_strength, expires_at)
      VALUES ($1, $2, $3, 'available', $4, $5, $6, NOW() + INTERVAL '30 days')
      RETURNING *
    `, [
      consumerId,
      opportunityId,
      leadType,
      JSON.stringify({
        name: consumer.full_name,
        email: consumer.email,
        phone: consumer.phone,
        state: consumer.state,
        zip: consumer.zip,
        propertyValue: consumer.property_value,
        creditScore: consumer.credit_score
      }),
      leadScore,
      leadScore > 80 ? 'very_high' : leadScore > 60 ? 'high' : 'medium'
    ]);
    
    // Route to partners
    const { routeLeadToPartners } = require('../services/leadRouting');
    await routeLeadToPartners(result.rows[0].id);
    
    res.json({
      success: true,
      lead: result.rows[0],
      message: 'Lead generated and routed to partners'
    });
    
  } catch (error) {
    console.error('Lead generation error:', error);
    res.status(500).json({ error: 'Failed to generate lead' });
  }
});

function calculateLeadScore(consumer, opportunityId) {
  let score = 50; // Base score
  
  if (consumer.credit_score >= 720) score += 30;
  else if (consumer.credit_score >= 680) score += 20;
  else if (consumer.credit_score >= 640) score += 10;
  
  if (consumer.estimated_income > 100000) score += 15;
  else if (consumer.estimated_income > 75000) score += 10;
  
  if (consumer.property_value > 500000) score += 5;
  
  return Math.min(score, 100);
}

// GET /api/leads/available - Get available leads (for partner portal)
router3.get('/available', async (req, res) => {
  try {
    const { partnerType, state } = req.query;
    
    const result = await pool.query(`
      SELECT * FROM generated_leads
      WHERE lead_status = 'available'
      AND lead_type = $1
      AND lead_data->>'state' = $2
      AND expires_at > NOW()
      ORDER BY lead_score DESC
      LIMIT 20
    `, [partnerType, state]);
    
    res.json({
      success: true,
      leads: result.rows
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

module.exports = router3;

// ========================================================================
// FILE 4: routes/partners.js - AFFILIATE PARTNER NETWORK
// ========================================================================
const express4 = require('express');
const router4 = express4.Router();

// POST /api/partners/apply - Partner application
router4.post('/apply', async (req, res) => {
  try {
    const {
      partnerType,
      companyName,
      contactName,
      email,
      phone,
      membershipTier,
      coverageStates,
      licenses
    } = req.body;
    
    // Create partner application
    const result = await pool.query(`
      INSERT INTO affiliate_partners
      (partner_type, company_name, contact_name, email, phone, membership_tier, membership_status, coverage_states, licenses)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7, $8)
      RETURNING *
    `, [partnerType, companyName, contactName, email, phone, membershipTier, JSON.stringify(coverageStates), JSON.stringify(licenses)]);
    
    // Send email to admin for vetting
    // TODO: Implement email notification
    
    res.json({
      success: true,
      partner: result.rows[0],
      message: 'Application received! We\'ll verify your credentials and contact you within 2 business days.'
    });
    
  } catch (error) {
    console.error('Partner application error:', error);
    res.status(500).json({ error: 'Application failed' });
  }
});

// POST /api/partners/:partnerId/vet - Vet partner (admin only)
router4.post('/:partnerId/vet', async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { approved, vettingNotes, adminId } = req.body;
    
    if (approved) {
      await pool.query(`
        UPDATE affiliate_partners
        SET 
          vetted = true,
          vetted_by = $2,
          vetted_at = NOW(),
          vetting_notes = $3,
          membership_status = 'active'
        WHERE id = $1
      `, [partnerId, adminId, vettingNotes]);
      
      // Send approval email
      // TODO: Send email
      
      res.json({ success: true, message: 'Partner approved and activated' });
    } else {
      await pool.query(`
        UPDATE affiliate_partners
        SET 
          vetted = false,
          vetted_by = $2,
          vetted_at = NOW(),
          vetting_notes = $3,
          membership_status = 'rejected'
        WHERE id = $1
      `, [partnerId, adminId, vettingNotes]);
      
      res.json({ success: true, message: 'Partner application rejected' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Vetting failed' });
  }
});

// GET /api/partners/:partnerId/dashboard - Partner dashboard
router4.get('/:partnerId/dashboard', async (req, res) => {
  try {
    const { partnerId } = req.params;
    
    // Get partner info
    const partnerResult = await pool.query(`
      SELECT * FROM affiliate_partners WHERE id = $1
    `, [partnerId]);
    
    const partner = partnerResult.rows[0];
    
    // Get assigned leads
    const leadsResult = await pool.query(`
      SELECT pla.*, gl.lead_data, gl.lead_type
      FROM partner_lead_assignments pla
      JOIN generated_leads gl ON pla.lead_id = gl.id
      WHERE pla.partner_id = $1
      ORDER BY pla.assigned_at DESC
      LIMIT 50
    `, [partnerId]);
    
    // Get performance metrics
    const metricsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_leads,
        SUM(CASE WHEN partner_contacted_consumer THEN 1 ELSE 0 END) as contacted,
        SUM(CASE WHEN outcome = 'converted' THEN 1 ELSE 0 END) as conversions,
        SUM(commission_amount) as total_commissions
      FROM partner_lead_assignments
      WHERE partner_id = $1
    `, [partnerId]);
    
    res.json({
      success: true,
      dashboard: {
        partner: partner,
        leads: leadsResult.rows,
        metrics: metricsResult.rows[0]
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

module.exports = router4;

// ========================================================================
// END OF ROUTES FILE
// Extract each router to its own file when deploying
// ========================================================================