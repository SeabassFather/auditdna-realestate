// ADD THIS TO YOUR EXISTING AuditDNADirect.jsx
// This is JUST the mortgage audit form component
// Drop it into your existing file structure

import React, { useState } from 'react';

export function MortgageAuditForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    consumerData: {
      fullName: '',
      email: '',
      phone: '',
      propertyAddress: '',
      state: 'CA',
      zip: ''
    },
    loanData: {
      originalLender: '',
      currentServicer: '',
      originalAmount: '',
      currentBalance: '',
      interestRate: '',
      originalPropertyValue: '',
      propertyType: 'single_family'
    }
  });
  const [auditResults, setAuditResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/audits/mortgage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: `CASE-${Date.now()}`,
          consumerData: formData.consumerData,
          loanData: formData.loanData,
          documents: {
            fees: [], // Add your document extraction here
            escrowStatements: [],
            paymentHistory: []
          }
        })
      });
      const data = await response.json();
      setAuditResults(data);
      setStep(3);
    } catch (error) {
      console.error('Audit error:', error);
      alert('Audit failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '40px'
    }}>
      
      {/* Header */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(203, 166, 88, 0.3)',
        padding: '40px',
        marginBottom: '32px'
      }}>
        <h1 style={{ 
          fontFamily: '"Helvetica Neue", sans-serif',
          fontWeight: '100',
          fontSize: '32px',
          letterSpacing: '4px',
          color: '#cba658',
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          MORTGAGE AUDIT
        </h1>
        <p style={{ 
          textAlign: 'center',
          color: 'rgba(148, 163, 184, 0.8)',
          fontSize: '14px',
          letterSpacing: '2px'
        }}>
          Find $8,000-$15,000 in Hidden Violations
        </p>
      </div>

      {/* Step 1: Consumer Info */}
      {step === 1 && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(203, 166, 88, 0.3)',
            padding: '40px'
          }}>
            <h2 style={{ color: '#cba658', marginBottom: '32px', fontSize: '18px', letterSpacing: '3px' }}>
              STEP 1: YOUR INFORMATION
            </h2>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.consumerData.fullName}
                onChange={(e) => setFormData({
                  ...formData,
                  consumerData: { ...formData.consumerData, fullName: e.target.value }
                })}
                style={{
                  padding: '16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#e2e8f0',
                  fontSize: '14px'
                }}
              />
              
              <input
                type="email"
                placeholder="Email"
                value={formData.consumerData.email}
                onChange={(e) => setFormData({
                  ...formData,
                  consumerData: { ...formData.consumerData, email: e.target.value }
                })}
                style={{
                  padding: '16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#e2e8f0',
                  fontSize: '14px'
                }}
              />
              
              <input
                type="text"
                placeholder="Property Address"
                value={formData.consumerData.propertyAddress}
                onChange={(e) => setFormData({
                  ...formData,
                  consumerData: { ...formData.consumerData, propertyAddress: e.target.value }
                })}
                style={{
                  padding: '16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#e2e8f0',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <button
              onClick={() => setStep(2)}
              style={{
                width: '100%',
                marginTop: '32px',
                padding: '16px',
                background: 'rgba(203, 166, 88, 0.2)',
                border: '1px solid rgba(203, 166, 88, 0.5)',
                color: '#cba658',
                fontSize: '12px',
                letterSpacing: '3px',
                cursor: 'pointer',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}
            >
              CONTINUE TO LOAN INFO →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Loan Info */}
      {step === 2 && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(203, 166, 88, 0.3)',
            padding: '40px'
          }}>
            <h2 style={{ color: '#cba658', marginBottom: '32px', fontSize: '18px', letterSpacing: '3px' }}>
              STEP 2: LOAN INFORMATION
            </h2>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <input
                type="text"
                placeholder="Current Servicer (e.g., Wells Fargo)"
                value={formData.loanData.currentServicer}
                onChange={(e) => setFormData({
                  ...formData,
                  loanData: { ...formData.loanData, currentServicer: e.target.value }
                })}
                style={{
                  padding: '16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#e2e8f0',
                  fontSize: '14px'
                }}
              />
              
              <input
                type="number"
                placeholder="Current Balance"
                value={formData.loanData.currentBalance}
                onChange={(e) => setFormData({
                  ...formData,
                  loanData: { ...formData.loanData, currentBalance: e.target.value }
                })}
                style={{
                  padding: '16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#e2e8f0',
                  fontSize: '14px'
                }}
              />
              
              <input
                type="number"
                step="0.01"
                placeholder="Interest Rate (e.g., 4.5)"
                value={formData.loanData.interestRate}
                onChange={(e) => setFormData({
                  ...formData,
                  loanData: { ...formData.loanData, interestRate: e.target.value }
                })}
                style={{
                  padding: '16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#e2e8f0',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#94a3b8',
                  fontSize: '12px',
                  letterSpacing: '3px',
                  cursor: 'pointer'
                }}
              >
                ← BACK
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  flex: 2,
                  padding: '16px',
                  background: 'rgba(203, 166, 88, 0.2)',
                  border: '1px solid rgba(203, 166, 88, 0.5)',
                  color: '#cba658',
                  fontSize: '12px',
                  letterSpacing: '3px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}
              >
                {loading ? 'ANALYZING...' : 'RUN AUDIT →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && auditResults && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(203, 166, 88, 0.3)',
            padding: '40px'
          }}>
            <h2 style={{ color: '#cba658', marginBottom: '32px', fontSize: '24px', letterSpacing: '3px', textAlign: 'center' }}>
              AUDIT RESULTS
            </h2>
            
            {/* Recovery Summary */}
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              padding: '32px',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#22c55e', marginBottom: '8px' }}>
                ${auditResults.totalRecovery?.toLocaleString() || '0'}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '14px', letterSpacing: '2px' }}>
                TOTAL RECOVERY
              </div>
            </div>
            
            {/* Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '24px', color: '#cba658', marginBottom: '8px' }}>
                  {auditResults.totalViolations || 0}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Violations Found</div>
              </div>
              
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '24px', color: '#cba658', marginBottom: '8px' }}>
                  ${auditResults.ourFee?.toLocaleString() || '0'}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Our Fee (35%)</div>
              </div>
              
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '24px', color: '#22c55e', marginBottom: '8px' }}>
                  ${auditResults.consumerReceives?.toLocaleString() || '0'}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>You Receive</div>
              </div>
            </div>
            
            {/* Violations List */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ color: '#cba658', marginBottom: '16px', fontSize: '14px', letterSpacing: '2px' }}>
                VIOLATIONS FOUND:
              </h3>
              
              {auditResults.violations?.slice(0, 5).map((v, i) => (
                <div key={i} style={{ 
                  background: 'rgba(30, 41, 59, 0.6)',
                  padding: '16px',
                  marginBottom: '12px',
                  border: '1px solid rgba(148, 163, 184, 0.2)'
                }}>
                  <div style={{ color: '#e2e8f0', marginBottom: '8px', fontWeight: '600' }}>
                    {v.type}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>
                    {v.description}
                  </div>
                  <div style={{ color: '#22c55e', fontSize: '14px' }}>
                    Recovery: ${v.recoveryAmount?.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              style={{
                width: '100%',
                marginTop: '32px',
                padding: '18px',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                color: '#22c55e',
                fontSize: '14px',
                letterSpacing: '3px',
                cursor: 'pointer',
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: '600'
              }}
              onClick={() => alert('Authorization flow coming next!')}
            >
              AUTHORIZE RECOVERY →
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}