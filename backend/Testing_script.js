// ============================================================================
// TESTING SCRIPT FOR 20+ FAMILY/FRIEND LOANS
// Run with: node testingScript.js
// Location: C:\AuditDNA\auditdna-realestate\backend\testing\
// ============================================================================

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Your 20+ test loans
const testLoans = [
  {
    name: 'Uncle Bob',
    consumer: {
      fullName: 'Robert Johnson',
      email: 'bob@example.com',
      phone: '831-555-0101',
      state: 'CA',
      propertyAddress: '123 Main St, Salinas, CA 93901',
      zip: '93901',
      propertyValue: 350000,
      creditScore: 720
    },
    loan: {
      lenderName: 'Big Bank Inc.',
      lenderState: 'NY',
      servicerName: 'Current Servicer LLC',
      servicerState: 'TX',
      loanNumber: 'LOAN001',
      originalLoanAmount: 350000,
      currentLoanBalance: 285000,
      interestRate: 4.5,
      pmiMonthly: 150
    }
  },
  {
    name: 'Aunt Maria',
    consumer: {
      fullName: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '831-555-0102',
      state: 'CA',
      propertyAddress: '456 Oak Ave, Monterey, CA 93940',
      zip: '93940',
      propertyValue: 450000,
      creditScore: 750
    },
    loan: {
      lenderName: 'Wells Fargo',
      lenderState: 'CA',
      servicerName: 'Nationstar Mortgage',
      servicerState: 'TX',
      loanNumber: 'LOAN002',
      originalLoanAmount: 400000,
      currentLoanBalance: 350000,
      interestRate: 5.0,
      pmiMonthly: 0
    }
  },
  // Add your other 18+ loans here following the same format
];

async function runTestSuite() {
  
  console.log('🧪 AUDITDNA TESTING SUITE');
  console.log('Testing with', testLoans.length, 'loans');
  console.log('========================================\n');
  
  let passCount = 0;
  let failCount = 0;
  const results = [];
  
  for (let i = 0; i < testLoans.length; i++) {
    const testCase = testLoans[i];
    
    console.log(`\n📋 TEST CASE #${i + 1}: ${testCase.name}`);
    console.log('----------------------------------------');
    
    try {
      // Step 1: Create consumer
      console.log('  Step 1: Creating consumer...');
      const consumerResponse = await axios.post(`${API_URL}/consumers`, testCase.consumer);
      const consumerId = consumerResponse.data.consumer.id;
      console.log('  ✅ Consumer created:', consumerId);
      
      // Step 2: Create case
      console.log('  Step 2: Creating case...');
      const caseData = {
        consumerId: consumerId,
        caseNumber: `TEST-${i + 1}-${testCase.name.replace(' ', '-')}`,
        ...testCase.loan,
        ...testCase.consumer
      };
      
      const caseResponse = await axios.post(`${API_URL}/cases`, caseData);
      const caseId = caseResponse.data.case.id;
      console.log('  ✅ Case created:', caseId);
      
      // Step 3: Process audit (60 MINERS!)
      console.log('  Step 3: Running 60 Miner Niners...');
      const auditResponse = await axios.post(`${API_URL}/audits/process`, {
        caseId: caseId,
        consumerData: testCase.consumer,
        loanData: testCase.loan,
        documents: {} // Would upload real docs in production
      });
      
      const audit = auditResponse.data;
      console.log('  ✅ Audit complete!');
      console.log('    💰 Total Recovery:', `$${audit.totalRecovery.toLocaleString()}`);
      console.log('    ⚠️  Violations Found:', audit.violationsCount);
      console.log('    ⏱️  Processing Time:', `${audit.processingTime}s`);
      
      // Record results
      results.push({
        testCase: i + 1,
        name: testCase.name,
        status: 'PASS',
        recovery: audit.totalRecovery,
        violations: audit.violationsCount,
        time: audit.processingTime
      });
      
      passCount++;
      
    } catch (error) {
      console.log('  ❌ FAILED:', error.response?.data?.error || error.message);
      results.push({
        testCase: i + 1,
        name: testCase.name,
        status: 'FAIL',
        error: error.message
      });
      failCount++;
    }
    
    // Rate limiting
    await sleep(2000); // 2 seconds between tests
  }
  
  // Print summary
  console.log('\n\n========================================');
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('========================================');
  console.log(`Total Tests: ${testLoans.length}`);
  console.log(`Passed: ${passCount} ✅`);
  console.log(`Failed: ${failCount} ❌`);
  console.log(`Success Rate: ${((passCount / testLoans.length) * 100).toFixed(1)}%`);
  
  const totalRecovery = results
    .filter(r => r.status === 'PASS')
    .reduce((sum, r) => sum + r.recovery, 0);
  
  const avgRecovery = passCount > 0 ? totalRecovery / passCount : 0;
  
  console.log(`\n💰 REVENUE PROJECTION:`);
  console.log(`Total Recovery: $${totalRecovery.toLocaleString()}`);
  console.log(`Average Recovery: $${avgRecovery.toLocaleString()}`);
  console.log(`Your Commission (35%): $${(totalRecovery * 0.35).toLocaleString()}`);
  
  console.log('\n📋 DETAILED RESULTS:');
  console.table(results);
  
  // Save to file
  const fs = require('fs');
  fs.writeFileSync('test_results.json', JSON.stringify(results, null, 2));
  console.log('\n💾 Results saved to test_results.json');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the test suite
runTestSuite().then(() => {
  console.log('\n✅ Testing complete!');
  process.exit(0);
}).catch(error => {
  console.error('\n❌ Testing failed:', error);
  process.exit(1);
});