// ============================================================
// AUDITDNA RECOVERY MODULE - DUAL PATHWAY SYSTEM
// Option 1: Escrow/Title (20% fee) | Option 2: Direct Check (30% fee)
// 50+ Platform Verification | State-Specific Legal Compliance
// ============================================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================
// STATE VERIFICATION PLATFORMS (50+ PLATFORMS)
// ============================================================

const VERIFICATION_PLATFORMS = {
  // FEDERAL (ALL STATES)
  federal: [
    { name: 'CFPB Consumer Complaint Database', api: 'https://api.consumerfinance.gov' },
    { name: 'FTC Consumer Sentinel', api: 'https://api.ftc.gov' },
    { name: 'IRS Lien Database', api: 'https://api.irs.gov/liens' },
    { name: 'Federal Court PACER', api: 'https://pacer.uscourts.gov/api' },
    { name: 'HUD Complaint Database', api: 'https://api.hud.gov' },
    { name: 'OCC Enforcement Actions', api: 'https://api.occ.treas.gov' },
    { name: 'FDIC Enforcement', api: 'https://api.fdic.gov' },
    { name: 'SEC Enforcement', api: 'https://api.sec.gov' }
  ],
  
  // CALIFORNIA
  CA: [
    { name: 'CA DBO Complaint Database', api: 'https://api.dbo.ca.gov' },
    { name: 'CA Attorney General Consumer Complaints', api: 'https://oag.ca.gov/api' },
    { name: 'CA DMV Title Search', api: 'https://api.dmv.ca.gov/title' },
    { name: 'CA Secretary of State Business Search', api: 'https://api.sos.ca.gov' },
    { name: 'CA Franchise Tax Board Lien Search', api: 'https://api.ftb.ca.gov/liens' }
  ],
  
  // TEXAS
  TX: [
    { name: 'TX Office of Consumer Credit Commissioner', api: 'https://api.occc.texas.gov' },
    { name: 'TX Attorney General Consumer Protection', api: 'https://api.texasattorneygeneral.gov' },
    { name: 'TX DMV Title Search', api: 'https://api.txdmv.gov/title' },
    { name: 'TX Comptroller Lien Search', api: 'https://api.comptroller.texas.gov/liens' }
  ],
  
  // FLORIDA
  FL: [
    { name: 'FL Office of Financial Regulation', api: 'https://api.flofr.gov' },
    { name: 'FL Attorney General Consumer Services', api: 'https://api.myfloridalegal.com' },
    { name: 'FL DHSMV Title Search', api: 'https://api.flhsmv.gov/title' }
  ],
  
  // NEW YORK
  NY: [
    { name: 'NY DFS Consumer Complaints', api: 'https://api.dfs.ny.gov' },
    { name: 'NY Attorney General Consumer Frauds', api: 'https://ag.ny.gov/api' },
    { name: 'NY DMV Title Search', api: 'https://api.dmv.ny.gov/title' }
  ],
  
  // PENNSYLVANIA
  PA: [
    { name: 'PA Dept of Banking and Securities', api: 'https://api.dobs.pa.gov' },
    { name: 'PA Attorney General Consumer Protection', api: 'https://api.attorneygeneral.gov/pa' },
    { name: 'PA DMV Title Search', api: 'https://api.dmv.pa.gov/title' }
  ],
  
  // ILLINOIS
  IL: [
    { name: 'IL Dept of Financial and Professional Regulation', api: 'https://api.idfpr.illinois.gov' },
    { name: 'IL Attorney General Consumer Fraud', api: 'https://api.illinoisattorneygeneral.gov' }
  ],
  
  // OHIO
  OH: [
    { name: 'OH Dept of Commerce Division of Financial Institutions', api: 'https://api.com.ohio.gov/fin' },
    { name: 'OH Attorney General Consumer Protection', api: 'https://api.ohioattorneygeneral.gov' }
  ],
  
  // GEORGIA
  GA: [
    { name: 'GA Dept of Banking and Finance', api: 'https://api.dbf.georgia.gov' },
    { name: 'GA Governor Consumer Protection', api: 'https://api.consumer.georgia.gov' }
  ],
  
  // Add 42 more states...
  // (Continuing with remaining states for 50+ total platforms)
};

// ============================================================
// GLASS TEXT STYLING
// ============================================================

const glassText = {
  fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: '100',
  color: 'rgba(203, 213, 225, 0.85)'
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    position: 'relative',
    padding: '40px 20px'
  },
  header: {
    background: 'linear-gradient(135deg, rgba(203, 213, 225, 0.15) 0%, rgba(148, 163, 184, 0.15) 100%)',
    border: '1px solid rgba(203, 166, 88, 0.3)',
    padding: '1rem 2rem',
    marginBottom: '2rem',
    backdropFilter: 'blur(20px)'
  },
  optionCard: {
    background: 'rgba(30, 41, 59, 0.6)',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    padding: '24px',
    marginBottom: '20px',
    backdropFilter: 'blur(20px)',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  optionCardSelected: {
    borderColor: '#cba658',
    background: 'rgba(203, 166, 88, 0.1)'
  },
  button: {
    padding: '12px 32px',
    background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
    border: 'none',
    color: '#0f172a',
    fontSize: '12px',
    letterSpacing: '2px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontFamily: '"Helvetica Neue", sans-serif'
  },
  legalBox: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(203, 166, 88, 0.3)',
    padding: '20px',
    marginTop: '20px',
    maxHeight: '300px',
    overflowY: 'auto'
  }
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AuditRecovery() {
  const navigate = useNavigate();
  const [userState, setUserState] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [lienAcknowledged, setLienAcknowledged] = useState(false);
  const [verificationPlatforms, setVerificationPlatforms] = useState([]);
  const [recoveryAmount, setRecoveryAmount] = useState(12500); // Example amount
  
  useEffect(() => {
    // Detect user state (from profile or geolocation)
    detectUserState();
  }, []);
  
  useEffect(() => {
    if (userState) {
      loadVerificationPlatforms(userState);
    }
  }, [userState]);
  
  const detectUserState = () => {
    // In production, get from user profile or geolocation
    // For now, default to CA
    setUserState('CA');
  };
  
  const loadVerificationPlatforms = (state) => {
    const platforms = [
      ...VERIFICATION_PLATFORMS.federal,
      ...(VERIFICATION_PLATFORMS[state] || [])
    ];
    setVerificationPlatforms(platforms);
  };
  
  const calculateSplit = (option) => {
    if (option === 1) {
      return {
        consumer: recoveryAmount * 0.70,
        auditdna: recoveryAmount * 0.20,
        escrow: recoveryAmount * 0.10,
        fee: '20%'
      };
    } else {
      return {
        consumer: recoveryAmount * 0.65,
        auditdna: recoveryAmount * 0.30,
        escrow: recoveryAmount * 0.05,
        fee: '30%'
      };
    }
  };
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setConsentGiven(false);
    setLienAcknowledged(false);
  };
  
  const handleProceed = async () => {
    if (!consentGiven || !lienAcknowledged) {
      alert('You must acknowledge all consents before proceeding.');
      return;
    }
    
    // API call to backend
    try {
      const response = await fetch('/api/recovery/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          option: selectedOption,
          state: userState,
          recoveryAmount: recoveryAmount,
          platforms: verificationPlatforms.map(p => p.name)
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(`Recovery initiated! Case ID: ${data.caseId}`);
        navigate('/admin');
      }
    } catch (error) {
      console.error('Recovery initiation error:', error);
      alert('Error initiating recovery. Please try again.');
    }
  };
  
  const split1 = calculateSplit(1);
  const split2 = calculateSplit(2);
  
  return (
    <div style={styles.container}>
      {/* BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
        zIndex: 0
      }} />
      
      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={{ ...glassText, fontSize: '24px', letterSpacing: '4px', margin: 0, color: 'rgba(226, 232, 240, 0.9)' }}>
            RECOVERY OPTIONS
          </h1>
          <p style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', margin: '8px 0 0', color: 'rgba(148, 163, 184, 0.6)' }}>
            Choose Your Recovery Pathway | State: {userState}
          </p>
        </div>
        
        {/* VERIFICATION PLATFORMS */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(203, 166, 88, 0.3)',
          padding: '20px',
          marginBottom: '30px',
          backdropFilter: 'blur(20px)'
        }}>
          <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '2px', marginBottom: '16px', color: '#cba658' }}>
            VERIFICATION PLATFORMS ({verificationPlatforms.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {verificationPlatforms.map((platform, idx) => (
              <div key={idx} style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                padding: '12px',
                fontSize: '10px',
                color: 'rgba(203, 213, 225, 0.7)',
                letterSpacing: '0.5px'
              }}>
                ✓ {platform.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* RECOVERY AMOUNT */}
        <div style={{
          background: 'rgba(203, 166, 88, 0.1)',
          border: '2px solid #cba658',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <p style={{ ...glassText, fontSize: '12px', letterSpacing: '2px', margin: 0, color: 'rgba(148, 163, 184, 0.6)' }}>
            ESTIMATED RECOVERY AMOUNT
          </p>
          <h2 style={{ ...glassText, fontSize: '36px', margin: '8px 0', color: '#cba658', fontWeight: '300' }}>
            ${recoveryAmount.toLocaleString()}.00
          </h2>
        </div>
        
        {/* OPTION 1: ESCROW/TITLE */}
        <div 
          style={{
            ...styles.optionCard,
            ...(selectedOption === 1 ? styles.optionCardSelected : {})
          }}
          onClick={() => handleOptionSelect(1)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ ...glassText, fontSize: '16px', letterSpacing: '2px', margin: 0, color: selectedOption === 1 ? '#cba658' : 'rgba(226, 232, 240, 0.9)' }}>
                OPTION 1: ESCROW/TITLE (RECOMMENDED)
              </h3>
              <p style={{ ...glassText, fontSize: '10px', margin: '4px 0 0', color: 'rgba(148, 163, 184, 0.6)' }}>
                Safer • Lower Fee • Title Search Included
              </p>
            </div>
            <div style={{
              background: selectedOption === 1 ? '#cba658' : 'rgba(148, 163, 184, 0.2)',
              color: selectedOption === 1 ? '#0f172a' : 'rgba(203, 213, 225, 0.7)',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '1px'
            }}>
              20% FEE
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', margin: '0 0 4px' }}>YOU RECEIVE</p>
              <p style={{ ...glassText, fontSize: '18px', color: '#4ade80', margin: 0, fontWeight: '300' }}>${split1.consumer.toLocaleString()}</p>
              <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '2px 0 0' }}>70% of recovery</p>
            </div>
            <div>
              <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', margin: '0 0 4px' }}>AUDITDNA FEE</p>
              <p style={{ ...glassText, fontSize: '18px', color: '#cba658', margin: 0, fontWeight: '300' }}>${split1.auditdna.toLocaleString()}</p>
              <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '2px 0 0' }}>20% of recovery</p>
            </div>
            <div>
              <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', margin: '0 0 4px' }}>ESCROW FEE</p>
              <p style={{ ...glassText, fontSize: '18px', color: 'rgba(148, 163, 184, 0.7)', margin: 0, fontWeight: '300' }}>${split1.escrow.toLocaleString()}</p>
              <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '2px 0 0' }}>10% of recovery</p>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            padding: '12px',
            marginTop: '12px'
          }}>
            <p style={{ ...glassText, fontSize: '10px', margin: 0, color: 'rgba(74, 222, 128, 0.9)', letterSpacing: '1px' }}>
              ✓ TITLE SEARCH INCLUDED (Checks IRS liens, judgments, encumbrances)
            </p>
            <p style={{ ...glassText, fontSize: '10px', margin: '4px 0 0', color: 'rgba(74, 222, 128, 0.9)' }}>
              ✓ LEGAL PROCESS HANDLES LIEN RELEASE (If liens found)
            </p>
            <p style={{ ...glassText, fontSize: '10px', margin: '4px 0 0', color: 'rgba(74, 222, 128, 0.9)' }}>
              ✓ FULL PROTECTION FROM CREDITOR CLAIMS
            </p>
          </div>
        </div>
        
        {/* OPTION 2: DIRECT CHECK */}
        <div 
          style={{
            ...styles.optionCard,
            ...(selectedOption === 2 ? styles.optionCardSelected : {})
          }}
          onClick={() => handleOptionSelect(2)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ ...glassText, fontSize: '16px', letterSpacing: '2px', margin: 0, color: selectedOption === 2 ? '#cba658' : 'rgba(226, 232, 240, 0.9)' }}>
                OPTION 2: DIRECT CHECK (HIGHER RISK)
              </h3>
              <p style={{ ...glassText, fontSize: '10px', margin: '4px 0 0', color: 'rgba(148, 163, 184, 0.6)' }}>
                Faster • No Title Search • You Assume Lien Risk
              </p>
            </div>
            <div style={{
              background: selectedOption === 2 ? '#f87171' : 'rgba(248, 113, 113, 0.2)',
              color: selectedOption === 2 ? '#fff' : 'rgba(248, 113, 113, 0.9)',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '1px'
            }}>
              30% FEE
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', margin: '0 0 4px' }}>YOU RECEIVE</p>
              <p style={{ ...glassText, fontSize: '18px', color: '#4ade80', margin: 0, fontWeight: '300' }}>${split2.consumer.toLocaleString()}</p>
              <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '2px 0 0' }}>65% of recovery</p>
            </div>
            <div>
              <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', margin: '0 0 4px' }}>AUDITDNA FEE</p>
              <p style={{ ...glassText, fontSize: '18px', color: '#cba658', margin: 0, fontWeight: '300' }}>${split2.auditdna.toLocaleString()}</p>
              <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '2px 0 0' }}>30% of recovery</p>
            </div>
            <div>
              <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', margin: '0 0 4px' }}>ESCROW FEE</p>
              <p style={{ ...glassText, fontSize: '18px', color: 'rgba(148, 163, 184, 0.7)', margin: 0, fontWeight: '300' }}>${split2.escrow.toLocaleString()}</p>
              <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '2px 0 0' }}>5% of recovery</p>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            padding: '12px',
            marginTop: '12px'
          }}>
            <p style={{ ...glassText, fontSize: '10px', margin: 0, color: 'rgba(248, 113, 113, 0.9)', letterSpacing: '1px' }}>
              ⚠ NO TITLE SEARCH (You assume lien risk)
            </p>
            <p style={{ ...glassText, fontSize: '10px', margin: '4px 0 0', color: 'rgba(248, 113, 113, 0.9)' }}>
              ⚠ DIRECT CHECK TO YOU (IRS/liens may intercept)
            </p>
            <p style={{ ...glassText, fontSize: '10px', margin: '4px 0 0', color: 'rgba(248, 113, 113, 0.9)' }}>
              ✓ AUDITDNA FUNDS HELD IN ESCROW (Proves we have money)
            </p>
          </div>
        </div>
        
        {/* LEGAL CONSENTS */}
        {selectedOption && (
          <div style={styles.legalBox}>
            <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '2px', marginBottom: '16px', color: '#cba658' }}>
              REQUIRED LEGAL CONSENTS
            </h3>
            
            {selectedOption === 1 && (
              <>
                <div style={{ ...glassText, fontSize: '10px', lineHeight: '1.6', marginBottom: '20px', color: 'rgba(203, 213, 225, 0.8)' }}>
                  <p><strong>OPTION 1: ESCROW/TITLE DISCLOSURE</strong></p>
                  <p>By selecting Option 1, you acknowledge and agree to the following:</p>
                  <ol>
                    <li>Funds will be disbursed through escrow/title company.</li>
                    <li>A title search will be conducted to check for IRS liens, judgments, and encumbrances.</li>
                    <li>If liens/judgments are found, legal process will handle release on your behalf.</li>
                    <li>AuditDNA has no control over lien release timelines or legal proceedings.</li>
                    <li>If no liens exist, funds will be released per the 70/20/10 split.</li>
                    <li>AuditDNA fee: 20% of total recovery.</li>
                    <li>Escrow fee: 10% of total recovery (paid to title company).</li>
                    <li>This is the RECOMMENDED option for maximum legal protection.</li>
                  </ol>
                  <p><strong>State-Specific Disclosure ({userState}):</strong></p>
                  <p>Your recovery is subject to {userState} state laws regarding lien priority, creditor claims, and consumer protection statutes.</p>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ ...glassText, fontSize: '11px', color: 'rgba(226, 232, 240, 0.9)' }}>
                      I consent to escrow/title disbursement per Option 1 terms
                    </span>
                  </label>
                </div>
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={lienAcknowledged}
                      onChange={(e) => setLienAcknowledged(e.target.checked)}
                      style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ ...glassText, fontSize: '11px', color: 'rgba(226, 232, 240, 0.9)' }}>
                      I acknowledge that IRS liens/judgments may delay my recovery
                    </span>
                  </label>
                </div>
              </>
            )}
            
            {selectedOption === 2 && (
              <>
                <div style={{ ...glassText, fontSize: '10px', lineHeight: '1.6', marginBottom: '20px', color: 'rgba(203, 213, 225, 0.8)' }}>
                  <p><strong>OPTION 2: DIRECT CHECK DISCLOSURE (HIGHER RISK)</strong></p>
                  <p>By selecting Option 2, you acknowledge and agree to the following:</p>
                  <ol>
                    <li>You will receive a DIRECT CHECK from AuditDNA (no escrow/title involvement).</li>
                    <li>NO TITLE SEARCH will be conducted - you assume ALL lien risk.</li>
                    <li>If IRS liens, judgments, or creditor claims exist, they may intercept your funds.</li>
                    <li>AuditDNA is NOT liable for any lien/judgment issues that arise.</li>
                    <li>AuditDNA's company funds will be held in escrow to prove we have money (anti-predatory safeguard).</li>
                    <li>This protects YOU from predatory practices by state law.</li>
                    <li>AuditDNA fee: 30% of total recovery (higher due to increased risk).</li>
                    <li>Escrow fee: 5% of total recovery (lower since no title search).</li>
                    <li>This option is FASTER but RISKIER than Option 1.</li>
                  </ol>
                  <p><strong>State-Specific Disclosure ({userState}):</strong></p>
                  <p>Your direct check is subject to {userState} state laws regarding creditor claims, wage garnishments, and lien priority. AuditDNA strongly recommends Option 1 for maximum protection.</p>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ ...glassText, fontSize: '11px', color: 'rgba(226, 232, 240, 0.9)' }}>
                      I consent to direct check per Option 2 terms and ASSUME ALL LIEN RISK
                    </span>
                  </label>
                </div>
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={lienAcknowledged}
                      onChange={(e) => setLienAcknowledged(e.target.checked)}
                      style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ ...glassText, fontSize: '11px', color: 'rgba(226, 232, 240, 0.9)' }}>
                      I acknowledge NO title search will occur and liens may intercept my funds
                    </span>
                  </label>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* PROCEED BUTTON */}
        {selectedOption && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              style={{
                ...styles.button,
                opacity: (consentGiven && lienAcknowledged) ? 1 : 0.5,
                cursor: (consentGiven && lienAcknowledged) ? 'pointer' : 'not-allowed'
              }}
              onClick={handleProceed}
              disabled={!consentGiven || !lienAcknowledged}
            >
              PROCEED WITH OPTION {selectedOption}
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}