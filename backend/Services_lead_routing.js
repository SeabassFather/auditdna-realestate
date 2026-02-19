// ============================================================================
// LEAD ROUTING SERVICE
// Location: C:\AuditDNA\auditdna-realestate\backend\services\leadRouting.js
// ============================================================================

const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function routeLeadToPartners(leadId) {
  
  // Get lead data
  const leadResult = await pool.query(`
    SELECT * FROM generated_leads WHERE id = $1
  `, [leadId]);
  
  const lead = leadResult.rows[0];
  const leadData = JSON.parse(lead.lead_data);
  
  // Find eligible partners
  const partnersResult = await pool.query(`
    SELECT * FROM affiliate_partners
    WHERE partner_type = $1
    AND membership_status = 'active'
    AND (
      coverage_states @> $2::jsonb OR
      coverage_zip_codes @> $3::jsonb
    )
    ORDER BY 
      exclusive_territories IS NOT NULL DESC,
      membership_tier DESC,
      conversion_rate DESC
    LIMIT 5
  `, [
    getPartnerType(lead.lead_type),
    JSON.stringify([leadData.state]),
    JSON.stringify([leadData.zip])
  ]);
  
  const partners = partnersResult.rows;
  
  if (partners.length === 0) {
    console.log(`⚠️ No partners available for lead ${leadId}`);
    return;
  }
  
  // Check for exclusive partner
  const exclusivePartner = partners.find(p => 
    p.exclusive_territories && 
    p.exclusive_territories.includes(leadData.zip)
  );
  
  if (exclusivePartner) {
    // Assign to exclusive partner
    await assignLeadToPartner(leadId, exclusivePartner.id, 'exclusive');
    console.log(`✅ Lead ${leadId} assigned to exclusive partner ${exclusivePartner.company_name}`);
    return;
  }
  
  // Round-robin to top 3 partners
  for (let i = 0; i < Math.min(3, partners.length); i++) {
    await assignLeadToPartner(leadId, partners[i].id, 'round_robin');
    console.log(`✅ Lead ${leadId} offered to ${partners[i].company_name}`);
  }
}

async function assignLeadToPartner(leadId, partnerId, method) {
  
  // Get partner pricing
  const partnerResult = await pool.query(`
    SELECT * FROM affiliate_partners WHERE id = $1
  `, [partnerId]);
  
  const partner = partnerResult.rows[0];
  
  // Calculate commission
  const leadResult = await pool.query(`
    SELECT lead_type FROM generated_leads WHERE id = $1
  `, [leadId]);
  
  const leadType = leadResult.rows[0].lead_type;
  const commission = getCommissionAmount(leadType, partner.membership_tier);
  
  // Create assignment
  await pool.query(`
    INSERT INTO partner_lead_assignments
    (lead_id, partner_id, assignment_method, commission_amount)
    VALUES ($1, $2, $3, $4)
  `, [leadId, partnerId, method, commission]);
  
  // Update partner stats
  await pool.query(`
    UPDATE affiliate_partners
    SET leads_received = leads_received + 1
    WHERE id = $1
  `, [partnerId]);
  
  // Send email to partner
  await sendLeadNotification(partner.email, leadId);
}

function getPartnerType(leadType) {
  const mapping = {
    'insurance': 'insurance_agent',
    'refinance': 'mlo',
    'heloc': 'heloc_lender',
    'tax_appeal': 'tax_professional'
  };
  return mapping[leadType] || 'insurance_agent';
}

function getCommissionAmount(leadType, tier) {
  const baseCommissions = {
    'refinance': 1000,
    'insurance': 100,
    'heloc': 500,
    'tax_appeal': 0.30 // 30% of savings
  };
  
  const tierMultipliers = {
    'basic': 1.0,
    'premium': 0.8, // 20% discount
    'enterprise': 0.7 // 30% discount
  };
  
  return baseCommissions[leadType] * tierMultipliers[tier];
}

async function sendLeadNotification(email, leadId) {
  // TODO: Send email notification to partner
  console.log(`📧 Sending lead notification to ${email} for lead ${leadId}`);
}

module.exports = {
  routeLeadToPartners,
  assignLeadToPartner
};