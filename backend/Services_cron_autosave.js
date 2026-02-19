// ============================================================================
// AUTOSAVE DAILY CRON JOB
// Run this with node-cron or PM2
// Location: C:\AuditDNA\auditdna-realestate\backend\services\autosave\dailyScan.js
// ============================================================================

const cron = require('node-cron');
const { Pool } = require('pg');
const { runAutonomousOptimization } = require('./autonomousEngine');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Run every day at 2am PT
cron.schedule('0 2 * * *', async () => {
  
  console.log('============================================');
  console.log('🤖 AUTOSAVE DAILY SCAN STARTED');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('============================================');
  
  try {
    // Get all active Premium and Elite subscriptions
    const result = await pool.query(`
      SELECT id, consumer_id, tier
      FROM mortgage_monitoring_subscriptions
      WHERE status = 'active'
      AND tier IN ('premium', 'elite')
    `);
    
    const subscriptions = result.rows;
    
    console.log(`📊 Found ${subscriptions.length} active subscriptions to scan`);
    
    let totalOpportunities = 0;
    let successCount = 0;
    let errorCount = 0;
    
    for (const sub of subscriptions) {
      
      try {
        console.log(`🔍 Scanning subscription ${sub.id} (${sub.tier})...`);
        
        const opportunities = await runAutonomousOptimization(sub.id);
        
        if (opportunities.length > 0) {
          totalOpportunities += opportunities.length;
          const totalSavings = opportunities.reduce((sum, o) => sum + o.monthly_savings, 0);
          console.log(`  ✅ Found ${opportunities.length} opportunities ($${totalSavings.toFixed(2)}/month)`);
        } else {
          console.log(`  ℹ️ No new opportunities found`);
        }
        
        successCount++;
        
        // Rate limiting - don't hammer APIs
        await sleep(1000); // 1 second between scans
        
      } catch (error) {
        console.error(`  ❌ Error scanning ${sub.id}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('============================================');
    console.log('🤖 AUTOSAVE DAILY SCAN COMPLETED');
    console.log(`Total Subscriptions Scanned: ${subscriptions.length}`);
    console.log(`Successful: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Total Opportunities Found: ${totalOpportunities}`);
    console.log('============================================');
    
  } catch (error) {
    console.error('❌ CRITICAL ERROR in daily scan:', error);
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('🤖 AutoSave Daily Scan Cron Job Started');
console.log('⏰ Scheduled to run every day at 2:00 AM PT');