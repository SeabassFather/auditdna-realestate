import React, { useState } from 'react';
import { matchLenders } from '../../data/everwiseLenders';
import { getRequiredDocs } from '../../data/loanDocuments';
import DocumentUploader from './DocumentUploader';

export default function LoanApplication() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Borrower Info
    loanAmount: '',
    creditScore: '',
    propertyValue: '',
    downPayment: '',
    loanType: 'Conventional',
    propertyType: 'Single Family',
    occupancy: 'Primary Residence',
    
    // Financial Info
    annualIncome: '',
    monthlyDebts: '',
    employmentType: 'W-2 Employee',
    employmentYears: '',
    
    // Additional
    docType: 'Full Documentation',
    cashOut: false,
    firstTimeHomeBuyer: false,
    hasGift: false
  });
  
  const [matchedLenders, setMatchedLenders] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [selectedLender, setSelectedLender] = useState(null);

  const calculateLTV = () => {
    const ltv = ((formData.loanAmount / formData.propertyValue) * 100).toFixed(2);
    return ltv;
  };

  const calculateDTI = () => {
    const monthlyIncome = formData.annualIncome / 12;
    const proposedPayment = (formData.loanAmount * 0.007) + (formData.monthlyDebts || 0);
    const dti = ((proposedPayment / monthlyIncome) * 100).toFixed(2);
    return dti;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ltv = parseFloat(calculateLTV());
    const dti = parseFloat(calculateDTI());
    const creditScore = parseInt(formData.creditScore);
    
    // Match lenders based on criteria
    const matched = matchLenders(formData.loanType, creditScore).map(lender => {
      let matchScore = 100;
      
      // Adjust based on LTV
      if (ltv > 95) matchScore -= 20;
      else if (ltv > 90) matchScore -= 10;
      else if (ltv > 80) matchScore -= 5;
      
      // Adjust based on DTI
      if (dti > 50) matchScore -= 30;
      else if (dti > 45) matchScore -= 20;
      else if (dti > 43) matchScore -= 10;
      
      // Adjust based on credit
      if (creditScore < 640) matchScore -= 15;
      else if (creditScore < 680) matchScore -= 10;
      
      return {
        ...lender,
        matchScore: Math.max(matchScore, 0),
        ltv,
        dti,
        monthlyPayment: ((formData.loanAmount * (parseFloat(lender.rate) / 100) / 12) / (1 - Math.pow(1 + (parseFloat(lender.rate) / 100 / 12), -360))).toFixed(2)
      };
    }).filter(l => l.matchScore > 50).sort((a, b) => b.matchScore - a.matchScore);
    
    setMatchedLenders(matched);
    setStep(2);
  };

  const handleDocumentUpload = (docType, files) => {
    setUploadedDocs({
      ...uploadedDocs,
      [docType]: files
    });
  };

  const proceedToDocuments = (lender) => {
    setSelectedLender(lender);
    setStep(3);
  };

  const requiredDocs = getRequiredDocs(
    formData.loanType,
    formData.employmentType,
    formData.hasGift,
    formData.occupancy === 'Investment Property'
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          {['Application', 'Lender Match', 'Documents'].map((label, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: step > idx ? '#10b981' : step === idx + 1 ? '#cba658' : '#334155',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                {step > idx ? '' : idx + 1}
              </div>
              <div style={{ fontSize: '14px', color: step >= idx + 1 ? '#cbd5e1' : '#64748b', fontWeight: '600' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: '4px', background: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${(step / 3) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #cba658, #b8944d)', transition: 'width 0.3s' }}></div>
        </div>
      </div>

      {/* STEP 1: APPLICATION FORM */}
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
            Loan Application
          </h2>

          {/* Loan Details */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>Loan Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Loan Amount *
                </label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                  required
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="400000"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Property Value *
                </label>
                <input
                  type="number"
                  value={formData.propertyValue}
                  onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                  required
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="500000"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Credit Score *
                </label>
                <select
                  value={formData.creditScore}
                  onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
                  required
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                >
                  <option value="">Select Credit Score</option>
                  <option value="780">780+ (Excellent)</option>
                  <option value="740">740-779 (Very Good)</option>
                  <option value="700">700-739 (Good)</option>
                  <option value="660">660-699 (Fair)</option>
                  <option value="620">620-659 (Below Average)</option>
                  <option value="580">580-619 (Poor)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Loan Type *
                </label>
                <select
                  value={formData.loanType}
                  onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                >
                  <option value="Conventional">Conventional</option>
                  <option value="FHA">FHA</option>
                  <option value="VA">VA</option>
                  <option value="USDA">USDA</option>
                  <option value="Jumbo">Jumbo</option>
                  <option value="NonQM">Non-QM</option>
                  <option value="DSCR">DSCR (Investment)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Property Type *
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                >
                  <option value="Single Family">Single Family</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Multi-Family">Multi-Family (2-4 units)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Occupancy *
                </label>
                <select
                  value={formData.occupancy}
                  onChange={(e) => setFormData({ ...formData, occupancy: e.target.value })}
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                >
                  <option value="Primary Residence">Primary Residence</option>
                  <option value="Second Home">Second Home</option>
                  <option value="Investment Property">Investment Property</option>
                </select>
              </div>
            </div>

            {formData.loanAmount && formData.propertyValue && (
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(203, 166, 88, 0.1)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#cba658', marginBottom: '8px' }}>Calculated LTV (Loan-to-Value)</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#f1f5f9' }}>{calculateLTV()}%</div>
              </div>
            )}
          </div>

          {/* Financial Information */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>Financial Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Annual Income *
                </label>
                <input
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                  required
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="120000"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Monthly Debts (Total) *
                </label>
                <input
                  type="number"
                  value={formData.monthlyDebts}
                  onChange={(e) => setFormData({ ...formData, monthlyDebts: e.target.value })}
                  required
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="2000"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Employment Type *
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                >
                  <option value="W-2 Employee">W-2 Employee</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="1099 Contractor">1099 Contractor</option>
                  <option value="Retired">Retired</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Years in Current Employment *
                </label>
                <input
                  type="number"
                  value={formData.employmentYears}
                  onChange={(e) => setFormData({ ...formData, employmentYears: e.target.value })}
                  required
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="5"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Documentation Type *
                </label>
                <select
                  value={formData.docType}
                  onChange={(e) => setFormData({ ...formData, docType: e.target.value })}
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                >
                  <option value="Full Documentation">Full Documentation</option>
                  <option value="Bank Statement">Bank Statement (12-24 months)</option>
                  <option value="Stated Income">Stated Income</option>
                  <option value="Asset Based">Asset Based</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.firstTimeHomeBuyer}
                    onChange={(e) => setFormData({ ...formData, firstTimeHomeBuyer: e.target.checked })}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#cbd5e1' }}>First Time Home Buyer</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.hasGift}
                    onChange={(e) => setFormData({ ...formData, hasGift: e.target.checked })}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Using Gift Funds</span>
                </label>
              </div>
            </div>

            {formData.annualIncome && formData.monthlyDebts && formData.loanAmount && (
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(203, 166, 88, 0.1)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#cba658', marginBottom: '8px' }}>Calculated DTI (Debt-to-Income)</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#f1f5f9' }}>{calculateDTI()}%</div>
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '20px',
              background: 'linear-gradient(135deg, #cba658, #b8944d)',
              color: '#0f172a',
              border: 'none',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(203, 166, 88, 0.4)'
            }}
          >
            Find Matching Lenders
          </button>
        </form>
      )}

      {/* STEP 2: MATCHED LENDERS */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
            {matchedLenders.length} Lenders Match Your Criteria
          </h2>

          {matchedLenders.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444', borderRadius: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#ef4444', marginBottom: '16px' }}>
                No Matching Lenders Found
              </div>
              <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px' }}>
                Your criteria may need adjustment. Please contact us for manual review.
              </div>
              <button
                onClick={() => setStep(1)}
                style={{ padding: '12px 24px', background: '#cba658', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
              >
                Back to Application
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '24px' }}>
              {matchedLenders.map((lender, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '2px solid rgba(203, 166, 88, 0.3)',
                    borderRadius: '16px',
                    padding: '32px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                    <div>
                      <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#f1f5f9', marginBottom: '8px' }}>
                        {lender.name}
                      </h3>
                      <div style={{ fontSize: '16px', color: '#94a3b8' }}>
                        Match Score: <span style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{lender.matchScore}%</span>
                      </div>
                    </div>
                    <div style={{
                      padding: '12px 24px',
                      background: lender.matchScore >= 90 ? '#10b981' : lender.matchScore >= 75 ? '#cba658' : '#64748b',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#fff'
                    }}>
                      {lender.matchScore >= 90 ? 'EXCELLENT' : lender.matchScore >= 75 ? 'GOOD' : 'FAIR'} MATCH
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Interest Rate</div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{lender.rate}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>APR</div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{lender.apr}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Monthly Payment</div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#cba658' }}>${parseFloat(lender.monthlyPayment).toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>LTV</div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{lender.ltv}%</div>
                    </div>
                  </div>

                  <button
                    onClick={() => proceedToDocuments(lender)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #cba658, #b8944d)',
                      color: '#0f172a',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Select This Lender & Upload Documents
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 3: DOCUMENT UPLOAD */}
      {step === 3 && selectedLender && (
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>
            Upload Required Documents
          </h2>
          <div style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '32px' }}>
            Selected Lender: <span style={{ fontWeight: '700', color: '#10b981' }}>{selectedLender.name}</span>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
              Required Documents ({requiredDocs.length})
            </h3>

            {requiredDocs.map((doc, idx) => (
              <div key={doc.id} style={{ marginBottom: '32px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#f1f5f9', marginBottom: '4px' }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                    {doc.desc}
                  </div>
                </div>
                <DocumentUploader
                  documentType={doc.id}
                  onUpload={handleDocumentUpload}
                  existingFiles={uploadedDocs[doc.id] || []}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setStep(2)}
              style={{
                flex: 1,
                padding: '16px',
                background: 'rgba(100, 116, 139, 0.3)',
                color: '#cbd5e1',
                border: '2px solid #64748b',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Back to Lenders
            </button>
            <button
              onClick={() => alert('Application submitted successfully!')}
              style={{
                flex: 2,
                padding: '16px',
                background: 'linear-gradient(135deg, #cba658, #b8944d)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(203, 166, 88, 0.5)'
              }}
            >
              Submit Complete Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}