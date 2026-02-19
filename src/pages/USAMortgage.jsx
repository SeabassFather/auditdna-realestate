import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleNavBar from '../components/ModuleNavBar';

// FAQ Component to handle accordion state properly
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What credit score do I need to qualify for a mortgage?',
      a: 'Credit score requirements vary by loan type. Conventional loans typically require 620+, FHA loans 580+, VA loans 580+, and Jumbo loans 700+. Higher credit scores qualify for better rates.'
    },
    {
      q: 'How much do I need for a down payment?',
      a: 'Down payment requirements range from 0% (VA, USDA) to 20% (Conventional without PMI). FHA requires 3.5%, and conventional loans can go as low as 3% for first-time buyers. Higher down payments result in lower monthly payments and better rates.'
    },
    {
      q: 'What is the difference between pre-qualification and pre-approval?',
      a: 'Pre-qualification is an informal estimate based on self-reported information. Pre-approval is a formal process requiring documentation verification and credit check, resulting in a conditional commitment letter that strengthens your offer.'
    },
    {
      q: 'How long does the mortgage process take?',
      a: 'From application to closing typically takes 30-45 days. Pre-approval takes 1-3 days. FHA Streamline and VA IRRRL refinances can close in 15-20 days. Timeline varies based on loan type, property type, and documentation completeness.'
    },
    {
      q: 'What is PMI and when is it required?',
      a: 'Private Mortgage Insurance (PMI) protects the lender if you default. It\'s required on conventional loans with less than 20% down payment. Cost ranges from 0.3% to 1.5% of loan amount annually. PMI can be removed once you reach 20% equity.'
    },
    {
      q: 'Can I get a mortgage if I\'m self-employed?',
      a: 'Yes! Self-employed borrowers need 2 years of tax returns, profit & loss statements, and business bank statements. We also offer bank statement programs that use 12-24 months of bank statements instead of tax returns.'
    },
    {
      q: 'What are closing costs and how much should I expect?',
      a: 'Closing costs typically range from 2-5% of loan amount and include origination fees, appraisal, title insurance, escrow, recording fees, and prepaid items. On a $400,000 loan, expect $8,000-$20,000 in closing costs.'
    },
    {
      q: 'Should I pay points to lower my interest rate?',
      a: 'Paying points (1 point = 1% of loan amount) can lower your rate by ~0.25%. This makes sense if you plan to keep the loan long enough to recoup the upfront cost through monthly savings. Calculate your break-even point before deciding.'
    },
    {
      q: 'Can I finance a property in Mexico?',
      a: 'Yes! We offer cross-border financing for USA citizens purchasing property in Mexico. Requirements: 35-45% down payment, 680+ credit score, valid Fideicomiso (bank trust), and property appraisal. Minimum loan amount is $100,000.'
    },
    {
      q: 'What is debt-to-income ratio and why does it matter?',
      a: 'DTI is your monthly debt payments divided by gross monthly income. Most lenders require DTI below 43% for conventional loans, 50% for FHA. Example: $6,000 income with $2,400 debt payments = 40% DTI.'
    },
    {
      q: 'Can I buy a home with a bankruptcy or foreclosure?',
      a: 'Yes, but waiting periods apply. Conventional: 4 years after foreclosure, 2-4 years after bankruptcy. FHA: 3 years after foreclosure, 2 years after bankruptcy. VA: 2 years after both. Stronger credit during waiting period helps.'
    },
    {
      q: 'What documents do I need to provide?',
      a: 'Required documents include: 2 years W-2s and tax returns, 30 days pay stubs, 2-3 months bank statements, photo ID, proof of assets, employment verification, and property-specific documents. See our Documentation Checklist for complete list.'
    }
  ];

  return (
    <div style={{ display: 'grid', gap: '8px' }}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} style={{ 
            background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.3) 0%, rgba(30, 41, 59, 0.2) 100%)', 
            borderLeft: isOpen ? '2px solid rgba(203, 166, 88, 0.4)' : '2px solid transparent',
            borderBottom: '1px solid rgba(226, 232, 240, 0.05)',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)'
          }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: 'none',
                border: 'none',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left'
              }}
            >
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '300',
                letterSpacing: '0.5px',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
              }}>{faq.q}</span>
              <span style={{ 
                fontSize: '14px', 
                color: '#64748b',
                transition: 'transform 0.3s',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>âŒ„</span>
            </button>
            {isOpen && (
              <div style={{ 
                padding: '0 24px 20px 24px', 
                fontSize: '12px', 
                color: '#94a3b8', 
                lineHeight: '1.7',
                fontWeight: '300'
              }}>
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function USAMortgage() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [formData, setFormData] = useState({
    // Lender matching form
    loanAmount: '',
    creditScore: '',
    loanType: 'Conventional',
    propertyType: 'Single Family',
    occupancy: 'Primary Residence',
    downPayment: '',
    propertyValue: '',
    dti: '',
    employmentType: 'W-2 Employee',
    employmentYears: '',
    docType: 'Full Documentation',
    selfEmployed: false,
    cashReserves: '',
    
    // Pre-approval form
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    income: '',
    employment: '',
    
    // Mexico application
    mexicoPropertyType: 'House',
    mexicoLocation: '',
    mexicoDownPayment: '35',
    mexicoLoanAmount: '',
    citizenship: 'USA',
    
    // FSBO
    fsboAddress: '',
    fsboPrice: '',
    fsboDescription: '',
    fsboBedrooms: '',
    fsboBathrooms: '',
    fsboSqft: '',
    
    // Agent
    agentName: '',
    agentLicense: '',
    agentBrokerage: '',
    agentEmail: '',
    agentPhone: '',
    
    // Buyer Inquiry
    inquiryProperty: '',
    inquiryMessage: ''
  });

  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [matchedLenders, setMatchedLenders] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    setUploadedDocs([...uploadedDocs, ...files.map(f => ({
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
      type: f.type,
      uploaded: new Date().toLocaleString()
    }))]);
  };

  const sections = [
    { id: 'full-application', title: 'Full Application', subtitle: 'Complete 1003 URLA Form' },
    { id: 'overview', title: 'Overview', subtitle: 'Loan Programs & Services' },
    { id: 'usa-purchase', title: 'USA Purchase Search', subtitle: 'Find & Finance US Properties' },
    { id: 'purchase-process', title: 'Purchase Process', subtitle: 'Step-by-Step Guide' },
    { id: 'usa-refinance', title: 'USA Refinance Search', subtitle: 'Lower Your Rate' },
    { id: 'refinance-options', title: 'Refinance Options', subtitle: 'Rate & Term, Cash-Out, FHA' },
    { id: 'mexico-application', title: 'Mexico Application', subtitle: 'Finance Mexico Properties' },
    { id: 'mexico-properties', title: 'Mexico Properties', subtitle: 'Featured Listings' },
    { id: 'title-escrow', title: 'Title / Escrow', subtitle: 'Closing Services' },
    { id: '1003-urla', title: '1003 URLA', subtitle: 'Uniform Residential Loan Application' },
    { id: 'fsbo', title: 'FSBO Services', subtitle: 'For Sale By Owner Support' },
    { id: 'agent-tools', title: 'Agent Tools', subtitle: 'Upload Listings & Manage Clients' },
    { id: 'buyer-inquiry', title: 'Buyer Inquiry', subtitle: 'Property Information Request' },
    { id: 'pre-approval', title: 'Pre-Approval Letter', subtitle: 'Get Pre-Approved Fast' },
    { id: 'rate-quote', title: 'Rate Quote', subtitle: 'Current Market Rates' },
    { id: 'loan-calculator', title: 'Loan Calculator', subtitle: 'Estimate Payments' },
    { id: 'documentation', title: 'Documentation Checklist', subtitle: 'Required Documents' },
    { id: 'faq', title: 'FAQ', subtitle: 'Frequently Asked Questions' }
  ];

  // Lender database
  const lenders = [
    { id: 1, name: 'Lender Option 1', minCredit: 780, maxLTV: 97, minLoan: 50000, maxLoan: 3000000, rate: 6.500, types: ['Conventional', 'Jumbo'], fullDoc: true, statedIncome: false },
    { id: 2, name: 'Lender Option 2', minCredit: 740, maxLTV: 96.5, minLoan: 50000, maxLoan: 2500000, rate: 6.750, types: ['Conventional', 'FHA', 'VA'], fullDoc: true, statedIncome: false },
    { id: 3, name: 'Lender Option 3', minCredit: 700, maxLTV: 95, minLoan: 50000, maxLoan: 2000000, rate: 6.875, types: ['Conventional', 'FHA'], fullDoc: true, statedIncome: true },
    { id: 4, name: 'Lender Option 4', minCredit: 660, maxLTV: 96.5, minLoan: 50000, maxLoan: 1000000, rate: 7.125, types: ['FHA', 'VA', 'USDA'], fullDoc: true, statedIncome: false },
    { id: 5, name: 'Lender Option 5', minCredit: 620, maxLTV: 95, minLoan: 50000, maxLoan: 800000, rate: 7.375, types: ['Conventional', 'NonQM'], fullDoc: true, statedIncome: true },
    { id: 6, name: 'Lender Option 6', minCredit: 580, maxLTV: 96.5, minLoan: 50000, maxLoan: 600000, rate: 7.625, types: ['FHA'], fullDoc: true, statedIncome: false },
    { id: 7, name: 'Lender Option 7', minCredit: 700, maxLTV: 80, minLoan: 100000, maxLoan: 5000000, rate: 7.250, types: ['Jumbo', 'NonQM', 'DSCR'], fullDoc: false, statedIncome: true },
    { id: 8, name: 'Lender Option 8', minCredit: 680, maxLTV: 75, minLoan: 75000, maxLoan: 1500000, rate: 7.500, types: ['NonQM', 'DSCR'], fullDoc: false, statedIncome: true }
  ];

  const handleLenderSearch = () => {
    const credit = parseInt(formData.creditScore);
    const amount = parseInt(formData.loanAmount);
    const value = parseInt(formData.propertyValue);
    const ltv = (amount / value) * 100;

    const qualified = lenders.filter(lender => {
      if (credit < lender.minCredit) return false;
      if (ltv > lender.maxLTV) return false;
      if (amount < lender.minLoan || amount > lender.maxLoan) return false;
      if (!lender.types.includes(formData.loanType)) return false;
      if (formData.docType === 'Stated Income' && !lender.statedIncome) return false;
      return true;
    });

    setMatchedLenders(qualified.map(l => ({
      ...l,
      matchScore: Math.round((1 - (l.rate - 6.5) / 2) * 100),
      payment: calculatePayment(amount, l.rate, 30)
    })).sort((a, b) => b.matchScore - a.matchScore));
  };

  const calculatePayment = (principal, rate, years) => {
    const r = rate / 100 / 12;
    const n = years * 12;
    return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedDocs([...uploadedDocs, ...files.map(f => ({
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
      type: f.type,
      uploaded: new Date().toLocaleString()
    }))]);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (uploadedPhotos.length + files.length > 10) {
      alert('Maximum 10 photos allowed');
      return;
    }
    setUploadedPhotos([...uploadedPhotos, ...files.map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      url: URL.createObjectURL(f)
    }))]);
  };

  const renderSectionContent = (sectionId) => {
    switch(sectionId) {
      
      // ==================== FULL APPLICATION ====================
      case 'full-application':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Complete 1003 URLA Application
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px', lineHeight: '1.6' }}>
              The Uniform Residential Loan Application (Form 1003) is required for all conventional, FHA, VA, and USDA loans.
              Complete all sections and upload required documentation.
            </p>

            <button
              onClick={() => navigate('/1003-urla')}
              style={{
                padding: '16px 32px',
                background: '#e2e8f0',
                border: 'none',
                borderRadius: '0',
                color: '#334155',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '32px'
              }}
            >
              START 1003 APPLICATION â†’
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              <div style={{ background: 'rgba(71, 85, 105, 0.4)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0', padding: '24px' }}>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Application Sections</h4>
                <ul style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px' }}>
                  <li>Section 1: Borrower Information</li>
                  <li>Section 2: Financial Information - Assets</li>
                  <li>Section 3: Financial Information - Liabilities</li>
                  <li>Section 4: Real Estate Owned</li>
                  <li>Section 5: Loan and Property Information</li>
                  <li>Section 6: Declarations</li>
                  <li>Section 7: Acknowledgments and Agreements</li>
                  <li>Section 8: Military Service</li>
                  <li>Section 9: Demographic Information</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(71, 85, 105, 0.4)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0', padding: '24px' }}>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Required Documents</h4>
                <ul style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px' }}>
                  <li>2 years federal tax returns</li>
                  <li>2 years W-2 forms</li>
                  <li>Recent pay stubs (30 days)</li>
                  <li>Bank statements (2 months)</li>
                  <li>Investment statements</li>
                  <li>Retirement account statements</li>
                  <li>Photo ID (driver's license)</li>
                  <li>Social Security card</li>
                </ul>
              </div>
            </div>
          </div>
        );

      // ==================== OVERVIEW ====================
      case 'overview':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Loan Programs Overview
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              We offer a comprehensive range of mortgage products to meet your financing needs. Compare rates, terms, and requirements below.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
              {[
                { 
                  title: 'Conventional', 
                  rate: '6.5% - 7.5%', 
                  down: '3% - 20%',
                  term: '15-30 years',
                  features: ['Best rates for qualified buyers', '620+ credit score', 'Lower PMI costs', 'Conforming loan limits']
                },
                { 
                  title: 'FHA', 
                  rate: '6.0% - 7.0%', 
                  down: '3.5%',
                  term: '15-30 years',
                  features: ['Lower credit requirements', '580+ credit score', 'Higher debt-to-income ratio', 'Gift funds allowed']
                },
                { 
                  title: 'VA', 
                  rate: '6.0% - 7.0%', 
                  down: '0%',
                  term: '15-30 years',
                  features: ['No down payment', 'No PMI required', 'Military service required', 'Competitive rates']
                }
              ].map((loan, idx) => (
                <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '24px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#cbd5e1', marginBottom: '16px' }}>{loan.title}</h4>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}>
                    <strong style={{ color: '#cbd5e1' }}>Rate:</strong> {loan.rate}
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}>
                    <strong style={{ color: '#cbd5e1' }}>Down Payment:</strong> {loan.down}
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px' }}>
                    <strong style={{ color: '#cbd5e1' }}>Term:</strong> {loan.term}
                  </div>
                  <ul style={{ fontSize: '12px', color: '#cbd5e1', paddingLeft: '18px', lineHeight: '1.8' }}>
                    {loan.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '40px' }}>
              {[
                { 
                  title: 'USDA', 
                  rate: '6.0% - 7.0%', 
                  down: '0%',
                  features: ['Rural property financing', 'No down payment', '640+ credit score', 'Income restrictions apply']
                },
                { 
                  title: 'Jumbo', 
                  rate: '7.0% - 8.0%', 
                  down: '10% - 20%',
                  features: ['Loans above conforming limits', '700+ credit score', 'Larger loan amounts', 'Strict underwriting']
                },
                { 
                  title: 'Non-QM', 
                  rate: '7.5% - 9.0%', 
                  down: '20% - 25%',
                  features: ['Alternative documentation', 'Bank statement programs', 'Self-employed borrowers', 'Credit flexibility']
                },
                { 
                  title: 'DSCR', 
                  rate: '7.5% - 9.0%', 
                  down: '20% - 25%',
                  features: ['Investment property loans', 'No income verification', 'Based on rental income', 'Quick closing']
                }
              ].map((loan, idx) => (
                <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>{loan.title}</h4>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>
                    <strong>Rate:</strong> {loan.rate}
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px' }}>
                    <strong>Down Payment:</strong> {loan.down}
                  </div>
                  <ul style={{ fontSize: '12px', color: '#cbd5e1', paddingLeft: '18px', lineHeight: '1.6' }}>
                    {loan.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Pre-Qualification Requirements</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[
                  'Credit score 620+',
                  'Debt-to-income ratio <43%',
                  '2 years employment history',
                  '2 years tax returns',
                  'Bank statements (2-3 months)',
                  'Proof of down payment',
                  'Valid government ID',
                  'Proof of income'
                ].map((req, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                    <span style={{ color: '#22c55e', fontSize: '16px' }}>âœ“</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ==================== USA PURCHASE SEARCH ====================
      case 'usa-purchase':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              USA Purchase Loan Search
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Enter your information below to find lenders that match your criteria. Our system will search 8+ lending partners
              and show you qualified matches with competitive rates.
            </p>

            <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '32px', marginBottom: '32px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '24px', fontWeight: '500' }}>Loan Criteria</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Loan Amount *
                  </label>
                  <input
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                    placeholder="500000"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Value *
                  </label>
                  <input
                    type="number"
                    value={formData.propertyValue}
                    onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                    placeholder="625000"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Credit Score *
                  </label>
                  <select
                    value={formData.creditScore}
                    onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
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
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Loan Type *
                  </label>
                  <select
                    value={formData.loanType}
                    onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
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
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  >
                    <option value="Single Family">Single Family</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Multi-Family">Multi-Family (2-4 units)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Occupancy *
                  </label>
                  <select
                    value={formData.occupancy}
                    onChange={(e) => setFormData({ ...formData, occupancy: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  >
                    <option value="Primary Residence">Primary Residence</option>
                    <option value="Second Home">Second Home</option>
                    <option value="Investment">Investment Property</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    DTI Ratio (%) *
                  </label>
                  <input
                    type="number"
                    value={formData.dti}
                    onChange={(e) => setFormData({ ...formData, dti: e.target.value })}
                    placeholder="36"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Employment Type *
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  >
                    <option value="W-2 Employee">W-2 Employee</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="1099 Contractor">1099 Contractor</option>
                    <option value="Retired">Retired</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Documentation Type *
                  </label>
                  <select
                    value={formData.docType}
                    onChange={(e) => setFormData({ ...formData, docType: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  >
                    <option value="Full Documentation">Full Documentation</option>
                    <option value="Bank Statement">Bank Statement (12-24 months)</option>
                    <option value="Stated Income">Stated Income</option>
                    <option value="Asset Based">Asset Based</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleLenderSearch}
                style={{
                  padding: '14px 40px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                SEARCH LENDERS
              </button>
            </div>

            {/* Matched Lenders Results */}
            {matchedLenders.length > 0 && (
              <div>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '20px', fontWeight: '500' }}>
                  Found {matchedLenders.length} Qualifying Lender{matchedLenders.length !== 1 ? 's' : ''}
                </h4>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {matchedLenders.map((lender, idx) => (
                    <div key={lender.id} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0', padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                        <div>
                          <h5 style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '4px', fontWeight: '500' }}>{lender.name}</h5>
                          <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Match Score: {lender.matchScore}%</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '24px', color: '#cbd5e1', fontWeight: '600' }}>{lender.rate}%</div>
                          <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Interest Rate</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px', padding: '16px', background: 'rgba(71, 85, 105, 0.4)', borderRadius: '0' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Est. Payment</div>
                          <div style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: '500' }}>${lender.payment.toLocaleString()}/mo</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Max LTV</div>
                          <div style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: '500' }}>{lender.maxLTV}%</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Min Credit</div>
                          <div style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: '500' }}>{lender.minCredit}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Loan Range</div>
                          <div style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: '500' }}>
                            ${(lender.minLoan/1000)}K-${(lender.maxLoan/1000000)}M
                          </div>
                        </div>
                      </div>

                      <button
                        style={{
                          padding: '10px 24px',
                          background: '#e2e8f0',
                          border: 'none',
                          borderRadius: '0',
                          color: '#334155',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        APPLY WITH THIS LENDER
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      // ==================== PURCHASE PROCESS ====================
      case 'purchase-process':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Home Purchase Process Timeline
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Understanding the home buying process helps you prepare for each step. From pre-approval to closing,
              here's what to expect during your home purchase journey.
            </p>

            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { 
                  step: 1, 
                  title: 'Pre-Qualification', 
                  desc: 'Initial assessment of your financial situation and buying power', 
                  time: '1-2 hours',
                  details: ['Credit check', 'Income verification', 'Debt analysis', 'Budget determination']
                },
                { 
                  step: 2, 
                  title: 'Pre-Approval Letter', 
                  desc: 'Official letter from lender confirming loan amount and terms', 
                  time: '1-4 weeks',
                  details: ['Full application', 'Document submission', 'Underwriter review', 'Conditional approval']
                },
                { 
                  step: 3, 
                  title: 'Home Search & Offer', 
                  desc: 'Find your property and submit purchase offer with pre-approval', 
                  time: 'Varies',
                  details: ['Property tours', 'Comparative analysis', 'Offer preparation', 'Negotiation']
                },
                { 
                  step: 4, 
                  title: 'Full Application (1003 URLA)', 
                  desc: 'Complete detailed application with all documentation', 
                  time: '1 hour',
                  details: ['Borrower information', 'Employment details', 'Asset documentation', 'Property information']
                },
                { 
                  step: 5, 
                  title: 'Processing & Underwriting', 
                  desc: 'Lender verification, appraisal, title work, and final approval', 
                  time: '7-21 days',
                  details: ['Document verification', 'Appraisal ordered', 'Title search', 'Final underwriting']
                },
                { 
                  step: 6, 
                  title: 'Clear to Close', 
                  desc: 'Final approval issued and closing date scheduled', 
                  time: '3-5 days',
                  details: ['Final conditions cleared', 'Closing disclosure review', 'Wire instructions', 'Final walkthrough']
                },
                { 
                  step: 7, 
                  title: 'Closing & Funding', 
                  desc: 'Sign documents, transfer funds, and receive keys', 
                  time: '1 day',
                  details: ['Sign closing documents', 'Pay closing costs', 'Lender funding', 'Deed recording']
                }
              ].map(item => (
                <div key={item.step} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '24px', display: 'flex', gap: '20px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#e2e8f0', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#334155', 
                    fontWeight: '700', 
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    {item.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <h4 style={{ fontSize: '16px', color: '#e2e8f0', fontWeight: '500', marginBottom: '6px' }}>{item.title}</h4>
                        <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>{item.desc}</p>
                      </div>
                      <div style={{ fontSize: '12px', color: '#22c55e', textAlign: 'right', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                        â±ï¸ {item.time}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '12px' }}>
                      {item.details.map((detail, idx) => (
                        <div key={idx} style={{ fontSize: '12px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#cbd5e1' }}>â€¢</span>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '32px', background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Total Timeline</h4>
              <div style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#e2e8f0' }}>Average Timeline:</strong> 30-45 days from offer acceptance to closing
                </p>
                <p style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#e2e8f0' }}>Cash Buyers:</strong> Can close in as little as 7-14 days
                </p>
                <p>
                  <strong style={{ color: '#e2e8f0' }}>Note:</strong> Timeline varies based on loan type, property type, and market conditions
                </p>
              </div>
            </div>
          </div>
        );

      // ==================== USA REFINANCE SEARCH ====================
      case 'usa-refinance':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              USA Refinance Search
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Calculate your potential savings with a refinance. Lower your rate, reduce your term, or access cash from your home's equity.
            </p>

            <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '32px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '24px', fontWeight: '500' }}>Refinance Calculator</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Current Loan Balance
                  </label>
                  <input
                    type="number"
                    placeholder="400000"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Current Interest Rate
                  </label>
                  <input
                    type="number"
                    step="0.125"
                    placeholder="7.5"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Value
                  </label>
                  <input
                    type="number"
                    placeholder="500000"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Refinance Type
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option>Rate & Term</option>
                    <option>Cash-Out</option>
                    <option>FHA Streamline</option>
                    <option>VA IRRRL</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Credit Score
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option value="780">780+ (Excellent)</option>
                    <option value="740">740-779 (Very Good)</option>
                    <option value="700">700-739 (Good)</option>
                    <option value="660">660-699 (Fair)</option>
                    <option value="620">620-659 (Below Average)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    New Loan Term
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option>30 Years</option>
                    <option>20 Years</option>
                    <option>15 Years</option>
                    <option>10 Years</option>
                  </select>
                </div>
              </div>

              <button
                style={{
                  padding: '14px 40px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                CALCULATE REFINANCE SAVINGS
              </button>
            </div>
          </div>
        );

      // ==================== REFINANCE OPTIONS ====================
      case 'refinance-options':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Refinance Options
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Choose the refinance option that best fits your financial goals. Compare programs below.
            </p>

            <div style={{ display: 'grid', gap: '24px' }}>
              {[
                {
                  title: 'Rate & Term Refinance',
                  description: 'Lower your interest rate or change your loan term without taking cash out',
                  benefits: [
                    'Reduce monthly payment',
                    'Pay off mortgage faster',
                    'Switch from ARM to fixed rate',
                    'Eliminate PMI (if 80% LTV)'
                  ],
                  requirements: [
                    '620+ credit score',
                    'Max 97% LTV',
                    'No cash-out',
                    'Full income documentation'
                  ],
                  bestFor: 'Homeowners wanting lower payments or shorter terms'
                },
                {
                  title: 'Cash-Out Refinance',
                  description: 'Refinance for more than you owe and receive the difference in cash',
                  benefits: [
                    'Access home equity',
                    'Consolidate debt',
                    'Home improvements',
                    'Investment opportunities'
                  ],
                  requirements: [
                    '640+ credit score',
                    'Max 80% LTV',
                    'At least 20% equity',
                    'DTI under 45%'
                  ],
                  bestFor: 'Homeowners with equity wanting cash for large expenses'
                },
                {
                  title: 'FHA Streamline Refinance',
                  description: 'Fast, low-cost refinance for existing FHA loans with minimal documentation',
                  benefits: [
                    'No appraisal required',
                    'Minimal documentation',
                    'Lower interest rate',
                    'Quick processing'
                  ],
                  requirements: [
                    'Current FHA loan',
                    '6 months of payments made',
                    'No cash-out',
                    'Net tangible benefit'
                  ],
                  bestFor: 'Current FHA borrowers wanting easier refinance process'
                },
                {
                  title: 'VA IRRRL',
                  description: 'Interest Rate Reduction Refinance Loan for VA borrowers',
                  benefits: [
                    'No appraisal needed',
                    'No income verification',
                    'No credit check',
                    'Can skip 2 payments'
                  ],
                  requirements: [
                    'Current VA loan',
                    'Certificate of Eligibility',
                    'Occupancy certification',
                    'Lower payment required'
                  ],
                  bestFor: 'Veterans with existing VA loans'
                }
              ].map((option, idx) => (
                <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '28px' }}>
                  <h4 style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '12px', fontWeight: '500' }}>{option.title}</h4>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px', lineHeight: '1.6' }}>{option.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px', fontWeight: '600' }}>Key Benefits</div>
                      <ul style={{ fontSize: '13px', color: '#cbd5e1', paddingLeft: '18px', lineHeight: '1.8' }}>
                        {option.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px', fontWeight: '600' }}>Requirements</div>
                      <ul style={{ fontSize: '13px', color: '#cbd5e1', paddingLeft: '18px', lineHeight: '1.8' }}>
                        {option.requirements.map((req, i) => <li key={i}>{req}</li>)}
                      </ul>
                    </div>
                  </div>
                  
                  <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '0', padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' }}>Best For</div>
                    <div style={{ fontSize: '13px', color: '#e2e8f0' }}>{option.bestFor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ==================== MEXICO APPLICATION ====================
      case 'mexico-application':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Mexico Property Financing Application
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Finance your Mexico property purchase. We work with specialized cross-border lenders offering competitive programs
              for USA citizens purchasing property in Mexico.
            </p>

            <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '32px', marginBottom: '32px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '24px', fontWeight: '500' }}>Application Form</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Type *
                  </label>
                  <select
                    value={formData.mexicoPropertyType}
                    onChange={(e) => setFormData({ ...formData, mexicoPropertyType: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  >
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value="Land">Land</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Location *
                  </label>
                  <input
                    type="text"
                    value={formData.mexicoLocation}
                    onChange={(e) => setFormData({ ...formData, mexicoLocation: e.target.value })}
                    placeholder="e.g., Cabo San Lucas, BCS"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Down Payment (%) *
                  </label>
                  <select
                    value={formData.mexicoDownPayment}
                    onChange={(e) => setFormData({ ...formData, mexicoDownPayment: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  >
                    <option value="35">35% (Minimum)</option>
                    <option value="40">40%</option>
                    <option value="45">45%</option>
                    <option value="50">50%</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Loan Amount Needed *
                  </label>
                  <input
                    type="number"
                    value={formData.mexicoLoanAmount}
                    onChange={(e) => setFormData({ ...formData, mexicoLoanAmount: e.target.value })}
                    placeholder="Minimum $100,000"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Citizenship *
                  </label>
                  <select
                    value={formData.citizenship}
                    onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  >
                    <option value="USA">USA Citizen</option>
                    <option value="Canadian">Canadian Citizen</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Credit Score *
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option value="740+">740+ (Excellent)</option>
                    <option value="700-739">700-739 (Good)</option>
                    <option value="680-699">680-699 (Fair)</option>
                    <option value="Below 680">Below 680</option>
                  </select>
                </div>
              </div>

              <button
                style={{
                  padding: '14px 40px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                SUBMIT APPLICATION
              </button>
            </div>

            <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Program Requirements</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  'USA or Canadian citizenship',
                  '35-50% down payment',
                  'Minimum loan amount: $100,000',
                  '680+ credit score',
                  'Valid Fideicomiso (bank trust)',
                  'Property appraisal required',
                  'Title insurance required',
                  'Proof of income/assets'
                ].map((req, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                    <span style={{ color: '#22c55e', fontSize: '16px' }}>âœ“</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ==================== MEXICO PROPERTIES ====================
      case 'mexico-properties':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Featured Mexico Properties
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Browse our curated selection of Mexico properties available for USA buyers. Financing available with 35-45% down.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {[
                {
                  title: 'Cabo Oceanfront Villa',
                  location: 'Cabo San Lucas, BCS',
                  price: '$1,250,000',
                  beds: 4,
                  baths: 4.5,
                  sqft: '3,800',
                  features: ['Ocean view', 'Pool', 'Gated community', 'Turnkey furnished']
                },
                {
                  title: 'Valle de Guadalupe Estate',
                  location: 'Ensenada, BC',
                  price: '$875,000',
                  beds: 5,
                  baths: 4,
                  sqft: '4,200',
                  features: ['Wine country', '2 acres', 'Guest house', 'Mountain views']
                },
                {
                  title: 'Puerto Vallarta Condo',
                  location: 'Puerto Vallarta, JAL',
                  price: '$425,000',
                  beds: 2,
                  baths: 2,
                  sqft: '1,600',
                  features: ['Beachfront', 'Rental income', 'Resort amenities', 'Fully furnished']
                },
                {
                  title: 'Tulum Beach House',
                  location: 'Tulum, Q.ROO',
                  price: '$950,000',
                  beds: 3,
                  baths: 3,
                  sqft: '2,400',
                  features: ['Beach access', 'Rooftop terrace', 'Modern design', 'Investment property']
                },
                {
                  title: 'San Miguel Colonial',
                  location: 'San Miguel de Allende, GTO',
                  price: '$680,000',
                  beds: 4,
                  baths: 3,
                  sqft: '3,200',
                  features: ['Historic center', 'Courtyard', 'Original architecture', 'Walk to plaza']
                },
                {
                  title: 'Rosarito Beach Condo',
                  location: 'Rosarito, BC',
                  price: '$295,000',
                  beds: 2,
                  baths: 2,
                  sqft: '1,400',
                  features: ['Ocean view', 'New construction', 'HOA amenities', '30min to San Diego']
                }
              ].map((property, idx) => (
                <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', overflow: 'hidden' }}>
                  <div style={{ height: '200px', background: 'linear-gradient(135deg, #1e293b 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '14px' }}>
                    Property Image
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '16px', color: '#e2e8f0', fontWeight: '500', marginBottom: '6px' }}>{property.title}</h4>
                      <div style={{ fontSize: '12px', color: '#cbd5e1' }}>{property.location}</div>
                    </div>
                    
                    <div style={{ fontSize: '24px', color: '#cbd5e1', fontWeight: '600', marginBottom: '16px' }}>{property.price}</div>
                    
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '13px', color: '#cbd5e1' }}>
                      <div><strong>{property.beds}</strong> Beds</div>
                      <div><strong>{property.baths}</strong> Baths</div>
                      <div><strong>{property.sqft}</strong> sqft</div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
                      {property.features.map((feature, i) => (
                        <div key={i} style={{ fontSize: '12px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#cbd5e1' }}>â€¢</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: '#e2e8f0',
                        border: 'none',
                        borderRadius: '0',
                        color: '#334155',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      REQUEST INFO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ==================== TITLE/ESCROW ====================
      case 'title-escrow':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Title & Escrow Services
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              We partner with First American Title Insurance Company to provide comprehensive title and escrow services
              for your real estate transaction.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
              <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '28px' }}>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '20px', fontWeight: '500' }}>Owner's Title Insurance</h4>
                <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px', lineHeight: '1.6' }}>
                  Protects your ownership rights against title defects, liens, and encumbrances that existed before you purchased the property.
                </p>
                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.8' }}>
                  <div style={{ marginBottom: '8px' }}><strong style={{ color: '#cbd5e1' }}>Coverage:</strong> Property value</div>
                  <div style={{ marginBottom: '8px' }}><strong style={{ color: '#cbd5e1' }}>Premium:</strong> One-time fee at closing</div>
                  <div style={{ marginBottom: '8px' }}><strong style={{ color: '#cbd5e1' }}>Duration:</strong> As long as you own the property</div>
                  <div><strong style={{ color: '#cbd5e1' }}>Cost:</strong> $500-$3,500 (based on property value)</div>
                </div>
              </div>

              <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '28px' }}>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '20px', fontWeight: '500' }}>Lender's Title Insurance</h4>
                <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px', lineHeight: '1.6' }}>
                  Protects the lender's interest in the property. Required by most mortgage lenders as a condition of the loan.
                </p>
                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.8' }}>
                  <div style={{ marginBottom: '8px' }}><strong style={{ color: '#cbd5e1' }}>Coverage:</strong> Loan amount</div>
                  <div style={{ marginBottom: '8px' }}><strong style={{ color: '#cbd5e1' }}>Premium:</strong> One-time fee at closing</div>
                  <div style={{ marginBottom: '8px' }}><strong style={{ color: '#cbd5e1' }}>Duration:</strong> Until loan is paid off</div>
                  <div><strong style={{ color: '#cbd5e1' }}>Cost:</strong> $300-$2,000 (based on loan amount)</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '28px', marginBottom: '32px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '20px', fontWeight: '500' }}>Typical Closing Costs Breakdown</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  { item: "Lender's Title Insurance", cost: '$800 - $2,000' },
                  { item: "Owner's Title Insurance", cost: '$500 - $3,500' },
                  { item: 'Escrow Fee', cost: '$500 - $2,000' },
                  { item: 'Recording Fees', cost: '$100 - $300' },
                  { item: 'Title Search', cost: '$200 - $400' },
                  { item: 'Notary Fees', cost: '$100 - $200' },
                  { item: 'Courier Fees', cost: '$50 - $150' },
                  { item: 'Wire Transfer Fee', cost: '$25 - $50' }
                ].map((fee, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#cbd5e1', padding: '10px', background: 'rgba(71, 85, 105, 0.4)', borderRadius: '0' }}>
                    <span>{fee.item}</span>
                    <span style={{ color: '#cbd5e1', fontWeight: '500' }}>{fee.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Escrow Process Timeline</h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  { day: 'Day 0', event: 'Purchase agreement signed, earnest money deposited' },
                  { day: 'Day 3-7', event: 'Title search and examination completed' },
                  { day: 'Day 7-10', event: 'Preliminary title report issued' },
                  { day: 'Day 14-21', event: 'Property appraisal and inspections completed' },
                  { day: 'Day 21-30', event: 'Final walk-through and closing disclosure review' },
                  { day: 'Day 30-45', event: 'Closing: Sign documents, transfer funds, receive keys' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '13px', color: '#cbd5e1' }}>
                    <div style={{ minWidth: '80px', color: '#cbd5e1', fontWeight: '500' }}>{item.day}</div>
                    <div>{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ==================== 1003 URLA ====================
      case '1003-urla':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              1003 URLA - Uniform Residential Loan Application
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Complete the official Freddie Mac Form 65 / Fannie Mae Form 1003. This application is required for all
              conventional, FHA, VA, and USDA mortgage loans.
            </p>

            <button
              onClick={() => navigate('/1003-urla')}
              style={{
                padding: '16px 48px',
                background: '#e2e8f0',
                border: 'none',
                borderRadius: '0',
                color: '#334155',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '32px'
              }}
            >
              START 1003 APPLICATION â†’
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
              <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '24px' }}>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Application Sections</h4>
                <ul style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px' }}>
                  <li>Section 1a: Personal Information</li>
                  <li>Section 1b: Current Employment & Income</li>
                  <li>Section 1c: Additional Employment</li>
                  <li>Section 1d: Previous Employment</li>
                  <li>Section 1e: Income from Other Sources</li>
                  <li>Section 2: Financial Information - Assets & Liabilities</li>
                  <li>Section 3: Financial Information - Real Estate</li>
                  <li>Section 4: Loan and Property Information</li>
                  <li>Section 5: Declarations</li>
                  <li>Section 6: Acknowledgements and Agreements</li>
                  <li>Section 7: Military Service</li>
                  <li>Section 8: Demographic Information</li>
                  <li>Section 9: Loan Originator Information</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '24px' }}>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Required Documents</h4>
                <ul style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px' }}>
                  <li>2 years federal tax returns (1040)</li>
                  <li>2 years W-2 forms (all pages)</li>
                  <li>Recent pay stubs (last 30 days)</li>
                  <li>Bank statements (2-3 months, all pages)</li>
                  <li>Investment account statements</li>
                  <li>Retirement account statements (401k, IRA)</li>
                  <li>Photo ID (driver's license or passport)</li>
                  <li>Social Security card or verification</li>
                  <li>Divorce decree (if applicable)</li>
                  <li>Bankruptcy discharge papers (if applicable)</li>
                </ul>
              </div>
            </div>

            <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Before You Start</h4>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.8', marginBottom: '16px' }}>
                <strong style={{ color: '#cbd5e1' }}>Gather Your Information:</strong> Have your employment history (2 years),
                income details, current debts, asset information, and property details ready.
              </p>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.8', marginBottom: '16px' }}>
                <strong style={{ color: '#cbd5e1' }}>Time Required:</strong> Plan for 15-30 minutes to complete the full application.
                You can save your progress and return later.
              </p>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.8' }}>
                <strong style={{ color: '#cbd5e1' }}>Accuracy Matters:</strong> Provide accurate information. False statements
                on a loan application are a federal crime (18 U.S.C. Â§ 1001).
              </p>
            </div>
          </div>
        );

      // ==================== FSBO SERVICES ====================
      case 'fsbo':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              For Sale By Owner (FSBO) Services
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              List your property for sale or browse FSBO listings. We provide financing support for qualified buyers.
            </p>

            <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '32px', marginBottom: '32px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '24px', fontWeight: '500' }}>List Your Property</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Address *
                  </label>
                  <input
                    type="text"
                    value={formData.fsboAddress}
                    onChange={(e) => setFormData({ ...formData, fsboAddress: e.target.value })}
                    placeholder="123 Main St, City, State ZIP"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Asking Price *
                  </label>
                  <input
                    type="number"
                    value={formData.fsboPrice}
                    onChange={(e) => setFormData({ ...formData, fsboPrice: e.target.value })}
                    placeholder="500000"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Square Feet
                  </label>
                  <input
                    type="number"
                    value={formData.fsboSqft}
                    onChange={(e) => setFormData({ ...formData, fsboSqft: e.target.value })}
                    placeholder="2500"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.fsboBedrooms}
                    onChange={(e) => setFormData({ ...formData, fsboBedrooms: e.target.value })}
                    placeholder="3"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.fsboBathrooms}
                    onChange={(e) => setFormData({ ...formData, fsboBathrooms: e.target.value })}
                    placeholder="2.5"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Description *
                  </label>
                  <textarea
                    value={formData.fsboDescription}
                    onChange={(e) => setFormData({ ...formData, fsboDescription: e.target.value })}
                    placeholder="Describe your property features, upgrades, location highlights..."
                    style={{ width: '100%', minHeight: '120px', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Photos (Max 10)
                  </label>
                  <div style={{ 
                    border: '2px dashed rgba(148, 163, 184, 0.3)', 
                    borderRadius: '0', 
                    padding: '32px', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(71, 85, 105, 0.4)'
                  }}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
                      <div style={{ fontSize: '48px', marginBottom: '12px' }}>ðŸ“¸</div>
                      <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '8px' }}>
                        Click to upload photos or drag and drop
                      </div>
                      <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                        PNG, JPG up to 10MB each
                      </div>
                    </label>
                  </div>
                  {uploadedPhotos.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginTop: '16px' }}>
                      {uploadedPhotos.map(photo => (
                        <div key={photo.id} style={{ position: 'relative', aspectRatio: '1', background: '#1e293b', borderRadius: '0', overflow: 'hidden' }}>
                          <img src={photo.url} alt={photo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            onClick={() => setUploadedPhotos(uploadedPhotos.filter(p => p.id !== photo.id))}
                            style={{ position: 'absolute', top: '4px', right: '4px', background: '#ef4444', border: 'none', borderRadius: '4px', color: 'white', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px' }}
                          >
                            Ã—
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                style={{
                  padding: '14px 40px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                LIST PROPERTY
              </button>
            </div>

            <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>FSBO Benefits</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { title: 'Save on Commission', desc: 'No 5-6% realtor commission fees' },
                  { title: 'Direct Communication', desc: 'Deal directly with buyers' },
                  { title: 'Financing Support', desc: 'We help buyers get pre-approved' },
                  { title: 'Marketing Exposure', desc: 'Listed on our platform' },
                  { title: 'Document Assistance', desc: 'Help with purchase agreements' },
                  { title: 'Closing Coordination', desc: 'Title and escrow support' }
                ].map((benefit, idx) => (
                  <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.4)', padding: '16px', borderRadius: '0' }}>
                    <h5 style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>{benefit.title}</h5>
                    <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ==================== AGENT TOOLS ====================
      case 'agent-tools':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Agent Tools & Services
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Register as a real estate agent to upload listings, manage clients, and access our lender network.
            </p>

            <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '32px', marginBottom: '32px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '24px', fontWeight: '500' }}>Agent Registration</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Agent Name *
                  </label>
                  <input
                    type="text"
                    value={formData.agentName}
                    onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    License Number *
                  </label>
                  <input
                    type="text"
                    value={formData.agentLicense}
                    onChange={(e) => setFormData({ ...formData, agentLicense: e.target.value })}
                    placeholder="DRE#"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Brokerage *
                  </label>
                  <input
                    type="text"
                    value={formData.agentBrokerage}
                    onChange={(e) => setFormData({ ...formData, agentBrokerage: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.agentEmail}
                    onChange={(e) => setFormData({ ...formData, agentEmail: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.agentPhone}
                    onChange={(e) => setFormData({ ...formData, agentPhone: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <button
                style={{
                  padding: '14px 40px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                REGISTER AS AGENT
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[
                { title: 'Upload Listings', desc: 'Add your properties to our platform', icon: 'ðŸ“¤' },
                { title: 'Client Management', desc: 'Track client applications and status', icon: 'ðŸ‘¥' },
                { title: 'Lender Network', desc: 'Access to 8+ preferred lenders', icon: 'ðŸ¦' },
                { title: 'Marketing Support', desc: 'Co-branded marketing materials', icon: 'ðŸ“Š' },
                { title: 'Commission Tracking', desc: 'Monitor your pipeline and earnings', icon: 'ðŸ’°' },
                { title: 'Training Resources', desc: 'Loan product training and updates', icon: 'ðŸ“š' }
              ].map((tool, idx) => (
                <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>{tool.icon}</div>
                  <h5 style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>{tool.title}</h5>
                  <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      // ==================== BUYER INQUIRY ====================
      case 'buyer-inquiry':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Buyer Inquiry Form
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Interested in a property? Submit your inquiry and we'll connect you with the listing agent and provide
              financing information.
            </p>

            <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Best Time to Call
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option>Morning (9AM-12PM)</option>
                    <option>Afternoon (12PM-5PM)</option>
                    <option>Evening (5PM-8PM)</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Address *
                  </label>
                  <input
                    type="text"
                    value={formData.inquiryProperty}
                    onChange={(e) => setFormData({ ...formData, inquiryProperty: e.target.value })}
                    placeholder="Enter the property address you're interested in"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Message
                  </label>
                  <textarea
                    value={formData.inquiryMessage}
                    onChange={(e) => setFormData({ ...formData, inquiryMessage: e.target.value })}
                    placeholder="Questions about the property, preferred showing times, financing needs..."
                    style={{ width: '100%', minHeight: '120px', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                    I'm pre-approved for a mortgage
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                    I need financing assistance
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                    I'd like to schedule a property showing
                  </label>
                </div>
              </div>

              <button
                style={{
                  padding: '14px 40px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                SUBMIT INQUIRY
              </button>
            </div>
          </div>
        );

      // ==================== PRE-APPROVAL LETTER ====================
      case 'pre-approval':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Pre-Approval Letter
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Get pre-approved in as little as 24-48 hours. A pre-approval letter strengthens your offer and shows sellers
              you're a serious, qualified buyer.
            </p>

            <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '32px', marginBottom: '32px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '24px', fontWeight: '500' }}>Quick Pre-Approval Application</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Price Range *
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option>$200,000 - $300,000</option>
                    <option>$300,000 - $400,000</option>
                    <option>$400,000 - $500,000</option>
                    <option>$500,000 - $750,000</option>
                    <option>$750,000 - $1,000,000</option>
                    <option>$1,000,000+</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Down Payment *
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option>3% - 5%</option>
                    <option>5% - 10%</option>
                    <option>10% - 20%</option>
                    <option>20%+</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Credit Score *
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option>780+ (Excellent)</option>
                    <option>740-779 (Very Good)</option>
                    <option>700-739 (Good)</option>
                    <option>660-699 (Fair)</option>
                    <option>620-659 (Below Average)</option>
                    <option>580-619 (Poor)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Annual Income *
                  </label>
                  <input
                    type="number"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                    placeholder="100000"
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Employment Status *
                  </label>
                  <select 
                    value={formData.employment}
                    onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                    style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                  >
                    <option>W-2 Employee</option>
                    <option>Self-Employed</option>
                    <option>Retired</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Loan Type *
                  </label>
                  <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                    <option>Conventional</option>
                    <option>FHA</option>
                    <option>VA</option>
                    <option>USDA</option>
                    <option>Jumbo</option>
                  </select>
                </div>
              </div>

              <button
                style={{
                  padding: '14px 40px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                GET PRE-APPROVED
              </button>
            </div>

            <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Why Get Pre-Approved?</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { title: 'Stronger Offers', desc: "Shows sellers you're financially qualified" },
                  { title: 'Know Your Budget', desc: 'Understand exactly what you can afford' },
                  { title: 'Faster Closing', desc: 'Pre-approval speeds up the final process' },
                  { title: 'Better Negotiation', desc: 'Negotiate from a position of strength' }
                ].map((reason, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ color: '#22c55e', fontSize: '20px', flexShrink: 0 }}>âœ“</div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500', marginBottom: '4px' }}>{reason.title}</div>
                      <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5' }}>{reason.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ==================== RATE QUOTE ====================
      case 'rate-quote':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Current Mortgage Rates
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              View today's mortgage rates. Rates are updated daily and vary based on credit score, loan amount, and property type.
            </p>

            <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' }}>Last Updated</div>
              <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>

            <div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
              {[
                { loan: 'Conventional 30-Year Fixed', rate: '6.875', apr: '7.125', points: '0.500', payment: '2,639' },
                { loan: 'Conventional 20-Year Fixed', rate: '6.625', apr: '6.875', points: '0.375', payment: '2,926' },
                { loan: 'Conventional 15-Year Fixed', rate: '6.250', apr: '6.500', points: '0.250', payment: '3,419' },
                { loan: 'FHA 30-Year Fixed', rate: '6.375', apr: '7.625', points: '0.000', payment: '2,497' },
                { loan: 'VA 30-Year Fixed', rate: '6.250', apr: '6.625', points: '0.000', payment: '2,463' },
                { loan: 'USDA 30-Year Fixed', rate: '6.375', apr: '6.750', points: '0.000', payment: '2,497' },
                { loan: 'Jumbo 30-Year Fixed', rate: '7.125', apr: '7.250', points: '0.750', payment: '2,716' },
                { loan: '5/1 ARM', rate: '6.125', apr: '7.375', points: '0.375', payment: '2,432' }
              ].map((product, idx) => (
                <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '4px', fontWeight: '500' }}>{product.loan}</h4>
                      <div style={{ fontSize: '11px', color: '#cbd5e1' }}>Based on $400K loan, 20% down, 740 credit</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '28px', color: '#cbd5e1', fontWeight: '600', lineHeight: '1' }}>{product.rate}%</div>
                      <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>Rate</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '16px', background: 'rgba(71, 85, 105, 0.4)', borderRadius: '0' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>APR</div>
                      <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{product.apr}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Points</div>
                      <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{product.points}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Est. Payment</div>
                      <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>${product.payment}/mo</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', fontWeight: '500' }}>Important Notes</h4>
              <ul style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Rates shown are for informational purposes and subject to change without notice</li>
                <li>Actual rates depend on credit score, loan amount, LTV, occupancy, and property type</li>
                <li>APR includes interest rate plus fees and costs over the life of the loan</li>
                <li>Payment estimates include principal and interest only (no taxes, insurance, or HOA)</li>
                <li>Points represent upfront fees paid to reduce interest rate (1 point = 1% of loan amount)</li>
              </ul>
            </div>
          </div>
        );

      // ==================== LOAN CALCULATOR ====================
      case 'loan-calculator':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Mortgage Payment Calculator
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Calculate your estimated monthly mortgage payment including principal, interest, taxes, insurance, and PMI.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
              <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '32px' }}>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '24px', fontWeight: '500' }}>Loan Details</h4>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Home Price
                    </label>
                    <input
                      type="number"
                      placeholder="500000"
                      style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Down Payment ($)
                    </label>
                    <input
                      type="number"
                      placeholder="100000"
                      style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.125"
                      placeholder="6.875"
                      style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Loan Term
                    </label>
                    <select style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}>
                      <option value="30">30 Years</option>
                      <option value="20">20 Years</option>
                      <option value="15">15 Years</option>
                      <option value="10">10 Years</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Property Tax (Annual)
                    </label>
                    <input
                      type="number"
                      placeholder="6000"
                      style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Homeowners Insurance (Annual)
                    </label>
                    <input
                      type="number"
                      placeholder="1200"
                      style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      HOA Fees (Monthly)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      style={{ width: '100%', padding: '12px', background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '0', color: '#cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <button
                    style={{
                      padding: '14px 40px',
                      background: '#e2e8f0',
                      border: 'none',
                      borderRadius: '0',
                      color: '#334155',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    CALCULATE PAYMENT
                  </button>
                </div>
              </div>

              <div>
                <div style={{ background: 'rgba(148, 163, 184, 0.15)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '400' }}>Estimated Monthly Payment</h4>
                  <div style={{ fontSize: '36px', color: '#cbd5e1', fontWeight: '700', marginBottom: '16px' }}>$2,639</div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Principal & Interest Only</div>
                </div>

                <div style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '20px' }}>
                  <h5 style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Payment Breakdown</h5>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {[
                      { label: 'Principal & Interest', amount: '$2,639' },
                      { label: 'Property Taxes', amount: '$500' },
                      { label: 'Homeowners Insurance', amount: '$100' },
                      { label: 'PMI', amount: '$200' },
                      { label: 'HOA Fees', amount: '$0' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingBottom: '12px', borderBottom: idx < 4 ? '1px solid rgba(203, 213, 225, 0.1)' : 'none' }}>
                        <span style={{ color: '#cbd5e1' }}>{item.label}</span>
                        <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{item.amount}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', paddingTop: '12px', borderTop: '2px solid rgba(148, 163, 184, 0.3)' }}>
                      <span style={{ color: '#cbd5e1' }}>Total Monthly</span>
                      <span style={{ color: '#cbd5e1' }}>$3,439</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // ==================== DOCUMENTATION CHECKLIST ====================
      case 'documentation':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Required Documentation Checklist
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Complete checklist of documents required for mortgage approval. Upload all documents once you have a loan application in progress.
            </p>

            <div style={{ marginBottom: '32px' }}>
              <input
                type="file"
                multiple
                onChange={handleDocUpload}
                style={{ display: 'none' }}
                id="doc-upload"
              />
              <label htmlFor="doc-upload">
                <div 
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  style={{ 
                    border: isDragging ? '2px solid rgba(203, 166, 88, 0.6)' : '1px dashed rgba(148, 163, 184, 0.3)', 
                    padding: '50px 40px', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: isDragging 
                      ? 'linear-gradient(135deg, rgba(203, 166, 88, 0.1) 0%, rgba(148, 163, 184, 0.05) 100%)' 
                      : 'linear-gradient(135deg, rgba(51, 65, 85, 0.3) 0%, rgba(30, 41, 59, 0.2) 100%)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease'
                  }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    margin: '0 auto 20px', 
                    background: 'rgba(148, 163, 184, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(148, 163, 184, 0.2)'
                  }}>
                    <span style={{ fontSize: '24px', color: '#94a3b8' }}>â†‘</span>
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#cbd5e1', 
                    marginBottom: '8px', 
                    fontWeight: '300',
                    letterSpacing: '1px'
                  }}>
                    {isDragging ? 'Drop files here...' : 'Drag & drop files here'}
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#64748b',
                    letterSpacing: '0.5px'
                  }}>
                    or click to browse â€¢ PDF, DOC, JPG, PNG up to 25MB
                  </div>
                </div>
              </label>
            </div>

            {uploadedDocs.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>Uploaded Documents</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {uploadedDocs.map((doc, idx) => (
                    <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ fontSize: '24px' }}>ðŸ“„</div>
                        <div>
                          <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>{doc.name}</div>
                          <div style={{ fontSize: '11px', color: '#cbd5e1' }}>{doc.size} â€¢ {doc.uploaded}</div>
                        </div>
                      </div>
                      <button style={{ background: '#ef4444', border: 'none', borderRadius: '4px', color: 'white', padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gap: '24px' }}>
              {[
                {
                  category: 'Income Verification',
                  docs: [
                    { name: 'W-2 forms (last 2 years)', required: true },
                    { name: '1099 forms (last 2 years)', required: false },
                    { name: 'Pay stubs (last 30 days)', required: true },
                    { name: 'Tax returns (last 2 years, all pages)', required: true },
                    { name: 'Profit & Loss statements (if self-employed)', required: false },
                    { name: 'Business tax returns (if self-employed, 2 years)', required: false }
                  ]
                },
                {
                  category: 'Assets & Accounts',
                  docs: [
                    { name: 'Bank statements (2-3 months, all pages)', required: true },
                    { name: 'Investment account statements', required: true },
                    { name: '401k/IRA/Retirement account statements', required: true },
                    { name: 'Gift letter (if using gift funds)', required: false },
                    { name: 'Stock certificates', required: false }
                  ]
                },
                {
                  category: 'Identification',
                  docs: [
                    { name: 'Driver\'s license or state ID (front & back)', required: true },
                    { name: 'Social Security card', required: true },
                    { name: 'Proof of residency', required: true },
                    { name: 'Work visa (if applicable)', required: false }
                  ]
                },
                {
                  category: 'Property Documents',
                  docs: [
                    { name: 'Purchase contract (if buying)', required: false },
                    { name: 'Property tax bills', required: false },
                    { name: 'Homeowners insurance declaration', required: false },
                    { name: 'HOA documents (if applicable)', required: false },
                    { name: 'Current mortgage statement (if refinancing)', required: false }
                  ]
                },
                {
                  category: 'Additional Documents',
                  docs: [
                    { name: 'Divorce decree (if applicable)', required: false },
                    { name: 'Bankruptcy discharge papers (if applicable)', required: false },
                    { name: 'Child support/alimony documentation', required: false },
                    { name: 'Employment authorization (if applicable)', required: false },
                    { name: 'Rental income documentation (if applicable)', required: false }
                  ]
                }
              ].map((section, idx) => (
                <div key={idx} style={{ background: 'rgba(71, 85, 105, 0.5)', border: '1px solid rgba(203, 213, 225, 0.1)', borderRadius: '0', padding: '24px' }}>
                  <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '16px', fontWeight: '500' }}>{section.category}</h4>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {section.docs.map((doc, docIdx) => (
                      <label key={docIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'rgba(71, 85, 105, 0.4)', borderRadius: '0', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                        <span style={{ flex: 1, fontSize: '13px', color: '#cbd5e1' }}>{doc.name}</span>
                        {doc.required && (
                          <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '500' }}>REQUIRED</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ==================== FAQ ====================
      case 'faq':
        return (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#e2e8f0', marginBottom: '16px', fontWeight: '500' }}>
              Frequently Asked Questions
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
              Common questions about our mortgage services, application process, and lending requirements.
            </p>

            <FAQSection />

            <div style={{ marginTop: '32px', background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0', padding: '24px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '12px', fontWeight: '500' }}>Still Have Questions?</h4>
              <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '20px', lineHeight: '1.6' }}>
                Our loan officers are here to help. Contact us directly for personalized guidance.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button style={{
                  padding: '12px 32px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0',
                  color: '#334155',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  CONTACT US
                </button>
                <button style={{
                  padding: '12px 32px',
                  background: 'transparent',
                  border: '1px solid rgba(148, 163, 184, 0.5)',
                  borderRadius: '0',
                  color: '#cbd5e1',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  SCHEDULE CALL
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div style={{ padding: '32px', textAlign: 'center', color: '#cbd5e1' }}>
            Select a section to view details
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', color: '#f1f5f9' }}>
      {/* GOLF COURSE BACKGROUND - MULTIPLE GOLFERS */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1920&q=90")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />
      
      {/* OVERLAY - LIGHTER TO SEE GOLFERS */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.5), rgba(30, 41, 59, 0.6))',
        zIndex: 1
      }} />

      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 2 }}>
      
      {/* MODULE NAVIGATION BAR - ALL 5 MODULES */}
      <ModuleNavBar />

      {/* PAGE TITLE */}
      <div style={{ 
        padding: '24px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: '100', 
          color: 'rgba(255, 255, 255, 0.95)', 
          margin: '0 0 6px 0', 
          letterSpacing: '6px', 
          textTransform: 'uppercase',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          US & Mexico Mortgage Loans
        </h1>
        <p style={{ 
          fontSize: '9px', 
          fontWeight: '300', 
          color: 'rgba(203, 213, 225, 0.7)', 
          margin: 0, 
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          NMLS #337526 | Everwise Home Loans & Realty
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 32px' }}>
        {/* SECTION ACCORDIONS */}
        <div style={{ display: 'grid', gap: '12px' }}>
          {sections.map(section => {
            const isExpanded = expandedSection === section.id;
            
            return (
              <div key={section.id}>
                {/* SECTION HEADER - GLASS EFFECT */}
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  style={{
                    width: '100%',
                    padding: '16px 28px',
                    background: isExpanded 
                      ? 'linear-gradient(135deg, rgba(148, 163, 184, 0.15) 0%, rgba(100, 116, 139, 0.1) 100%)' 
                      : 'linear-gradient(135deg, rgba(71, 85, 105, 0.3) 0%, rgba(51, 65, 85, 0.2) 100%)',
                    border: 'none',
                    borderLeft: isExpanded ? '2px solid rgba(203, 166, 88, 0.5)' : '2px solid transparent',
                    borderBottom: '1px solid rgba(226, 232, 240, 0.08)',
                    color: '#e2e8f0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '300', 
                      marginBottom: '3px', 
                      letterSpacing: '2px', 
                      textTransform: 'uppercase',
                      color: isExpanded ? '#f1f5f9' : '#cbd5e1',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }}>
                      {section.title}
                    </div>
                    <div style={{ 
                      fontSize: '10px', 
                      color: '#64748b', 
                      letterSpacing: '1px',
                      fontWeight: '300'
                    }}>
                      {section.subtitle}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#64748b',
                    transition: 'transform 0.3s ease',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    âŒ„
                  </div>
                </button>

                {/* SECTION CONTENT - GLASS PANEL */}
                {isExpanded && (
                  <div style={{
                    background: 'linear-gradient(180deg, rgba(51, 65, 85, 0.4) 0%, rgba(30, 41, 59, 0.3) 100%)',
                    borderLeft: '2px solid rgba(203, 166, 88, 0.2)',
                    borderBottom: '1px solid rgba(226, 232, 240, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                  }}>
                    {renderSectionContent(section.id)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
