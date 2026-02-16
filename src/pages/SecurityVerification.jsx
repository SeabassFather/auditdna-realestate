// ============================================================
// FRAUD PREVENTION & SECURITY VERIFICATION SYSTEM
// 7-Layer Security Architecture
// ============================================================

import React, { useState, useEffect } from 'react';

const glassText = {
  fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: '100',
  color: 'rgba(203, 213, 225, 0.85)'
};

const styles = {
  container: {
    background: 'rgba(15, 23, 42, 0.95)',
    border: '2px solid #cba658',
    padding: '30px',
    marginTop: '30px'
  },
  layer: {
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    padding: '20px',
    marginBottom: '20px'
  },
  check: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  checkIcon: (status) => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    background: status === 'pass' ? 'rgba(74, 222, 128, 0.2)' : 
                status === 'fail' ? 'rgba(248, 113, 113, 0.2)' :
                'rgba(251, 191, 36, 0.2)',
    color: status === 'pass' ? '#4ade80' : 
           status === 'fail' ? '#f87171' : 
           '#fbbf24',
    border: `1px solid ${status === 'pass' ? '#4ade80' : status === 'fail' ? '#f87171' : '#fbbf24'}`
  }),
  warningBox: {
    background: 'rgba(248, 113, 113, 0.1)',
    border: '2px solid #f87171',
    padding: '20px',
    marginTop: '20px'
  },
  successBox: {
    background: 'rgba(74, 222, 128, 0.1)',
    border: '2px solid #4ade80',
    padding: '20px',
    marginTop: '20px'
  }
};

export default function SecurityVerification({ documentData, idData, onVerificationComplete }) {
  const [verificationStatus, setVerificationStatus] = useState({
    layer1: 'pending', // Document-to-ID
    layer2: 'pending', // Title search
    layer3: 'pending', // Servicer verification
    layer4: 'pending', // Multi-party detection
    layer5: 'pending', // Payment history
    layer6: 'pending', // Red flags
    layer7: 'pending'  // Escrow requirement
  });
  
  const [findings, setFindings] = useState({
    nameMatch: null,
    faceMatch: null,
    titleOwner: null,
    coSigner: [],
    redFlags: [],
    recommendation: null
  });
  
  useEffect(() => {
    runSecurityVerification();
  }, [documentData, idData]);
  
  const runSecurityVerification = async () => {
    // LAYER 1: Document-to-ID Verification
    await verifyLayer1();
    
    // LAYER 2: Title Search
    await verifyLayer2();
    
    // LAYER 3: Servicer Verification
    await verifyLayer3();
    
    // LAYER 4: Multi-Party Detection
    await verifyLayer4();
    
    // LAYER 5: Payment History
    await verifyLayer5();
    
    // LAYER 6: Red Flags
    await verifyLayer6();
    
    // LAYER 7: Final Recommendation
    await verifyLayer7();
  };
  
  const verifyLayer1 = async () => {
    // OCR extract names from documents
    const docNames = extractNamesFromDocuments(documentData);
    
    // OCR extract name from ID
    const idName = extractNameFromID(idData);
    
    // Facial recognition
    const faceMatch = await verifyFace(idData.selfie, idData.idPhoto);
    
    // Name matching algorithm
    const nameMatch = compareNames(docNames, idName);
    
    setFindings(prev => ({ ...prev, nameMatch, faceMatch }));
    
    if (nameMatch.exact && faceMatch > 0.95) {
      setVerificationStatus(prev => ({ ...prev, layer1: 'pass' }));
    } else if (!nameMatch.exact && nameMatch.fuzzy > 0.8) {
      setVerificationStatus(prev => ({ ...prev, layer1: 'warning' }));
    } else {
      setVerificationStatus(prev => ({ ...prev, layer1: 'fail' }));
    }
  };
  
  const verifyLayer2 = async () => {
    // Query county records
    const titleSearch = await fetchTitleRecords(documentData.propertyAddress);
    
    setFindings(prev => ({ ...prev, titleOwner: titleSearch }));
    
    if (titleSearch.currentOwner.includes(idData.name)) {
      setVerificationStatus(prev => ({ ...prev, layer2: 'pass' }));
    } else if (titleSearch.recentTransfer) {
      setVerificationStatus(prev => ({ ...prev, layer2: 'warning' }));
    } else {
      setVerificationStatus(prev => ({ ...prev, layer2: 'fail' }));
    }
  };
  
  const verifyLayer3 = async () => {
    // Verify with mortgage servicer
    const servicerVerification = await verifyWithServicer(documentData.loanNumber);
    
    if (servicerVerification.currentBorrower === idData.name) {
      setVerificationStatus(prev => ({ ...prev, layer3: 'pass' }));
    } else {
      setVerificationStatus(prev => ({ ...prev, layer3: 'fail' }));
    }
  };
  
  const verifyLayer4 = async () => {
    // Detect co-borrowers, co-signers
    const parties = detectMultipleParties(documentData);
    
    setFindings(prev => ({ ...prev, coSigner: parties }));
    
    if (parties.length === 1) {
      setVerificationStatus(prev => ({ ...prev, layer4: 'pass' }));
    } else if (parties.length > 1) {
      setVerificationStatus(prev => ({ ...prev, layer4: 'warning' }));
    }
  };
  
  const verifyLayer5 = async () => {
    // Analyze payment history from bank statements
    const paymentAnalysis = analyzePaymentHistory(documentData.bankStatements);
    
    if (paymentAnalysis.accountOwner === idData.name) {
      setVerificationStatus(prev => ({ ...prev, layer5: 'pass' }));
    } else {
      setVerificationStatus(prev => ({ ...prev, layer5: 'warning' }));
    }
  };
  
  const verifyLayer6 = async () => {
    // AI red flag detection
    const flags = detectRedFlags({
      nameMatch: findings.nameMatch,
      titleSearch: findings.titleOwner,
      coSigners: findings.coSigner,
      ipAddress: documentData.ipAddress,
      propertyAddress: documentData.propertyAddress
    });
    
    setFindings(prev => ({ ...prev, redFlags: flags }));
    
    if (flags.length === 0) {
      setVerificationStatus(prev => ({ ...prev, layer6: 'pass' }));
    } else if (flags.length <= 2) {
      setVerificationStatus(prev => ({ ...prev, layer6: 'warning' }));
    } else {
      setVerificationStatus(prev => ({ ...prev, layer6: 'fail' }));
    }
  };
  
  const verifyLayer7 = async () => {
    // Final recommendation
    const hasFailures = Object.values(verificationStatus).includes('fail');
    const hasWarnings = Object.values(verificationStatus).filter(s => s === 'warning').length >= 2;
    
    let recommendation;
    
    if (hasFailures) {
      recommendation = 'BLOCKED - Verification failed';
    } else if (hasWarnings || findings.coSigner.length > 1) {
      recommendation = 'REQUIRE_OPTION_1 - Must use escrow/title for protection';
    } else {
      recommendation = 'APPROVED - Can choose either option';
    }
    
    setFindings(prev => ({ ...prev, recommendation }));
    setVerificationStatus(prev => ({ ...prev, layer7: recommendation.includes('APPROVED') ? 'pass' : recommendation.includes('REQUIRE') ? 'warning' : 'fail' }));
    
    onVerificationComplete(recommendation, findings);
  };
  
  // Helper functions (would call actual APIs in production)
  const extractNamesFromDocuments = (docs) => {
    // OCR extraction logic
    return ['John Smith', 'Jane Smith']; // Example
  };
  
  const extractNameFromID = (id) => {
    // OCR extraction logic
    return 'John Smith'; // Example
  };
  
  const verifyFace = async (selfie, idPhoto) => {
    // Facial recognition API call
    return 0.98; // Example: 98% match
  };
  
  const compareNames = (docNames, idName) => {
    // Name matching algorithm
    const exact = docNames.includes(idName);
    const fuzzy = 0.95; // Example
    return { exact, fuzzy };
  };
  
  const fetchTitleRecords = async (address) => {
    // County records API
    return {
      currentOwner: ['John Smith'],
      dateAcquired: '2018-03-15',
      recentTransfer: false
    };
  };
  
  const verifyWithServicer = async (loanNumber) => {
    // Servicer API
    return {
      currentBorrower: 'John Smith',
      status: 'active'
    };
  };
  
  const detectMultipleParties = (docs) => {
    // Multi-party detection
    return [
      { name: 'John Smith', role: 'primary' },
      { name: 'Jane Smith', role: 'co-borrower' }
    ];
  };
  
  const analyzePaymentHistory = (statements) => {
    // Payment analysis
    return {
      accountOwner: 'John Smith',
      consistentPayments: true
    };
  };
  
  const detectRedFlags = (data) => {
    // Red flag detection
    const flags = [];
    if (!data.nameMatch?.exact) flags.push('Name mismatch between ID and documents');
    if (data.titleSearch?.recentTransfer) flags.push('Recent property transfer detected');
    if (data.coSigners?.length > 2) flags.push('Multiple parties on mortgage');
    return flags;
  };
  
  return (
    <div style={styles.container}>
      <h2 style={{ ...glassText, fontSize: '20px', letterSpacing: '2px', marginBottom: '30px', color: '#cba658' }}>
        SECURITY VERIFICATION IN PROGRESS
      </h2>
      
      {/* LAYER 1 */}
      <div style={styles.layer}>
        <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '1px', marginBottom: '16px', color: 'rgba(226, 232, 240, 0.9)' }}>
          LAYER 1: Document-to-ID Verification
        </h3>
        <div style={styles.check}>
          <div style={styles.checkIcon(verificationStatus.layer1)}>
            {verificationStatus.layer1 === 'pass' ? '✓' : verificationStatus.layer1 === 'fail' ? '✗' : '...'}
          </div>
          <span style={{ ...glassText, fontSize: '11px' }}>
            OCR name extraction and comparison
          </span>
        </div>
        <div style={styles.check}>
          <div style={styles.checkIcon(verificationStatus.layer1)}>
            {verificationStatus.layer1 === 'pass' ? '✓' : verificationStatus.layer1 === 'fail' ? '✗' : '...'}
          </div>
          <span style={{ ...glassText, fontSize: '11px' }}>
            Facial recognition match: {findings.faceMatch ? `${(findings.faceMatch * 100).toFixed(1)}%` : 'Processing...'}
          </span>
        </div>
      </div>
      
      {/* LAYER 2 */}
      <div style={styles.layer}>
        <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '1px', marginBottom: '16px', color: 'rgba(226, 232, 240, 0.9)' }}>
          LAYER 2: Title Search Verification
        </h3>
        <div style={styles.check}>
          <div style={styles.checkIcon(verificationStatus.layer2)}>
            {verificationStatus.layer2 === 'pass' ? '✓' : verificationStatus.layer2 === 'fail' ? '✗' : '...'}
          </div>
          <span style={{ ...glassText, fontSize: '11px' }}>
            County records verification
          </span>
        </div>
        {findings.titleOwner && (
          <div style={{ marginLeft: '36px', marginTop: '8px' }}>
            <p style={{ ...glassText, fontSize: '10px', color: 'rgba(203, 213, 225, 0.6)' }}>
              Current owner: {findings.titleOwner.currentOwner.join(', ')}
            </p>
            <p style={{ ...glassText, fontSize: '10px', color: 'rgba(203, 213, 225, 0.6)' }}>
              Acquired: {findings.titleOwner.dateAcquired}
            </p>
          </div>
        )}
      </div>
      
      {/* LAYER 3 */}
      <div style={styles.layer}>
        <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '1px', marginBottom: '16px', color: 'rgba(226, 232, 240, 0.9)' }}>
          LAYER 3: Mortgage Servicer Verification
        </h3>
        <div style={styles.check}>
          <div style={styles.checkIcon(verificationStatus.layer3)}>
            {verificationStatus.layer3 === 'pass' ? '✓' : verificationStatus.layer3 === 'fail' ? '✗' : '...'}
          </div>
          <span style={{ ...glassText, fontSize: '11px' }}>
            Current borrower verification
          </span>
        </div>
      </div>
      
      {/* LAYER 4 */}
      <div style={styles.layer}>
        <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '1px', marginBottom: '16px', color: 'rgba(226, 232, 240, 0.9)' }}>
          LAYER 4: Multi-Party Detection
        </h3>
        <div style={styles.check}>
          <div style={styles.checkIcon(verificationStatus.layer4)}>
            {verificationStatus.layer4 === 'pass' ? '✓' : verificationStatus.layer4 === 'warning' ? '!' : '...'}
          </div>
          <span style={{ ...glassText, fontSize: '11px' }}>
            Co-borrower/co-signer detection
          </span>
        </div>
        {findings.coSigner.length > 0 && (
          <div style={{ marginLeft: '36px', marginTop: '8px' }}>
            {findings.coSigner.map((party, idx) => (
              <p key={idx} style={{ ...glassText, fontSize: '10px', color: 'rgba(203, 213, 225, 0.6)', marginBottom: '4px' }}>
                {party.name} ({party.role})
              </p>
            ))}
          </div>
        )}
      </div>
      
      {/* LAYER 5 */}
      <div style={styles.layer}>
        <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '1px', marginBottom: '16px', color: 'rgba(226, 232, 240, 0.9)' }}>
          LAYER 5: Payment History Analysis
        </h3>
        <div style={styles.check}>
          <div style={styles.checkIcon(verificationStatus.layer5)}>
            {verificationStatus.layer5 === 'pass' ? '✓' : verificationStatus.layer5 === 'warning' ? '!' : '...'}
          </div>
          <span style={{ ...glassText, fontSize: '11px' }}>
            Bank account ownership verification
          </span>
        </div>
      </div>
      
      {/* LAYER 6 */}
      <div style={styles.layer}>
        <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '1px', marginBottom: '16px', color: 'rgba(226, 232, 240, 0.9)' }}>
          LAYER 6: Red Flag Detection (AI)
        </h3>
        <div style={styles.check}>
          <div style={styles.checkIcon(verificationStatus.layer6)}>
            {verificationStatus.layer6 === 'pass' ? '✓' : verificationStatus.layer6 === 'warning' ? '!' : verificationStatus.layer6 === 'fail' ? '✗' : '...'}
          </div>
          <span style={{ ...glassText, fontSize: '11px' }}>
            {findings.redFlags.length} red flags detected
          </span>
        </div>
        {findings.redFlags.length > 0 && (
          <div style={{ marginLeft: '36px', marginTop: '8px' }}>
            {findings.redFlags.map((flag, idx) => (
              <p key={idx} style={{ ...glassText, fontSize: '10px', color: '#f87171', marginBottom: '4px' }}>
                ⚠ {flag}
              </p>
            ))}
          </div>
        )}
      </div>
      
      {/* LAYER 7: FINAL RECOMMENDATION */}
      {findings.recommendation && (
        <div style={findings.recommendation.includes('BLOCKED') ? styles.warningBox : findings.recommendation.includes('REQUIRE') ? styles.warningBox : styles.successBox}>
          <h3 style={{ ...glassText, fontSize: '16px', letterSpacing: '2px', marginBottom: '16px', color: findings.recommendation.includes('BLOCKED') ? '#f87171' : findings.recommendation.includes('REQUIRE') ? '#fbbf24' : '#4ade80' }}>
            VERIFICATION {findings.recommendation.includes('APPROVED') ? 'COMPLETE' : findings.recommendation.includes('REQUIRE') ? 'COMPLETE WITH CONDITIONS' : 'FAILED'}
          </h3>
          
          <p style={{ ...glassText, fontSize: '12px', lineHeight: '1.8', marginBottom: '16px' }}>
            {findings.recommendation === 'BLOCKED - Verification failed' && 
              'We were unable to verify your identity and ownership. This claim has been blocked for your protection. Please contact support if you believe this is an error.'}
            
            {findings.recommendation === 'REQUIRE_OPTION_1 - Must use escrow/title for protection' && 
              'Verification complete with conditions. Due to multiple parties on the mortgage or recent ownership changes, you MUST select Option 1 (35% with escrow/title protection) for additional verification and legal protection.'}
            
            {findings.recommendation === 'APPROVED - Can choose either option' && 
              'Verification successful! You may proceed with either Option 1 (35% with escrow/title) or Option 2 (39% direct check). We recommend Option 1 for maximum protection.'}
          </p>
          
          {findings.coSigner.length > 1 && (
            <div style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid #fbbf24',
              padding: '16px',
              marginTop: '16px'
            }}>
              <p style={{ ...glassText, fontSize: '11px', fontWeight: '600', marginBottom: '8px', color: '#fbbf24' }}>
                MULTI-PARTY CONSENT REQUIRED
              </p>
              <p style={{ ...glassText, fontSize: '10px', lineHeight: '1.6', color: 'rgba(203, 213, 225, 0.8)' }}>
                We detected {findings.coSigner.length} parties on this mortgage. All parties must provide ID verification
                and consent before refund can be processed. Refund will be split proportionally based on ownership percentage.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}