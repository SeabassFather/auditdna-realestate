// AUDITDNA - CORRECT WORKFLOW
// 1. Lock → 2. SELECT PATH (2 boxes) → 3. Upload → 4. Process → 5. Legal → 6. Disclosure → 7. Cooling

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuditDNADirect() {
  const navigate = useNavigate();
  
  const CREDENTIALS = {
    owner: { email: 'saul@enjoybaja.com', password: 'Admin2026!', pin: '060905', role: 'owner' },
    demo: { email: 'demo@enjoybaja.com', password: 'Demo2026!', pin: '0000', role: 'consumer' },
    sales: [
      { email: 'sales1@enjoybaja.com', password: 'Sales1!', pin: '1111', role: 'sales' },
      { email: 'sales2@enjoybaja.com', password: 'Sales2!', pin: '2222', role: 'sales' },
      { email: 'sales3@enjoybaja.com', password: 'Sales3!', pin: '3333', role: 'sales' },
      { email: 'sales4@enjoybaja.com', password: 'Sales4!', pin: '4444', role: 'sales' },
      { email: 'sales5@enjoybaja.com', password: 'Sales5!', pin: '5555', role: 'sales' }
    ]
  };

  // REGISTRATION vs LOGIN STATE
  const [showRegistration, setShowRegistration] = useState(true); // SHOW REGISTRATION FIRST!
  const [regForm, setRegForm] = useState({
    fullName: '', email: '', phone: '', propertyAddress: '', city: '', state: 'CA', zip: '',
    photoID: null, referralSource: '', partnerCode: '', agreeToTerms: false
  });
  const [regErrors, setRegErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLocked, setIsLocked] = useState(true);
  const [authStep, setAuthStep] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  
  const [workflowStep, setWorkflowStep] = useState('selectPath'); // selectPath → upload → processing → legal → disclosure → cooling
  const [selectedPath, setSelectedPath] = useState(null); // 'escrow' or 'direct'
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  
  const [legalChecks, setLegalChecks] = useState({
    lien: false,
    feeStructure: false,
    escrow: false,
    accuracy: false,
    binding: false
  });
  const [signature, setSignature] = useState('');
  
  const [auditResults] = useState({
    totalOvercharge: 14250,
    categories: [
      { name: 'Title Insurance Overcharge', amount: 2450 },
      { name: 'Appraisal Fee Markup', amount: 1200 },
      { name: 'Recording Fee Excess', amount: 3100 },
      { name: 'PMI Overcharge', amount: 1850 },
      { name: 'Fee Tolerance Violation', amount: 3900 },
      { name: 'Tax Service Fee', amount: 750 },
      { name: 'Credit Report Markup', amount: 1000 }
    ]
  });

  const processingSteps = [
    'Analyzing closing disclosure...',
    'Checking fee tolerances...',
    'Verifying title charges...',
    'Examining escrow calculations...',
    'Detecting RESPA violations...',
    'Cross-referencing regulations...',
    'Calculating overcharges...',
    'Generating report...',
    'Finalizing audit...'
  ];

  const states = ['CA', 'TX', 'FL', 'NY', 'AZ', 'NV', 'WA', 'OR', 'CO', 'UT'];

  // === REGISTRATION HANDLERS ===
  const handleRegChange = (field, value) => {
    setRegForm({ ...regForm, [field]: value });
    if (regErrors[field]) setRegErrors({ ...regErrors, [field]: null });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegForm({ ...regForm, photoID: file });
      if (regErrors.photoID) setRegErrors({ ...regErrors, photoID: null });
    }
  };

  const validateRegistration = () => {
    const errors = {};
    if (!regForm.fullName.trim()) errors.fullName = 'Name required';
    if (!regForm.email.includes('@')) errors.email = 'Valid email required';
    if (regForm.phone.length < 10) errors.phone = 'Valid phone required';
    if (!regForm.propertyAddress.trim()) errors.propertyAddress = 'Address required';
    if (!regForm.zip.match(/^\d{5}$/)) errors.zip = '5-digit ZIP required';
    if (!regForm.photoID) errors.photoID = 'Photo ID required';
    if (!regForm.agreeToTerms) errors.agreeToTerms = 'Must agree to terms';
    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistration = async () => {
    if (!validateRegistration()) return;
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const generatedPIN = Math.floor(100000 + Math.random() * 900000).toString();
      alert(`✅ Account created!\n\nCredentials sent to: ${regForm.email}\n\nYour PIN: ${generatedPIN}\n\n⚠️ SAVE THIS PIN! You'll need it to sign in.`);
      setShowRegistration(false);
      setEmail(regForm.email);
    } catch (error) {
      setRegErrors({ submit: 'Registration failed. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // === AUTH HANDLERS ===
  const handleEmailSubmit = () => {
    const allUsers = [CREDENTIALS.owner, CREDENTIALS.demo, ...CREDENTIALS.sales];
    const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setAuthStep('password');
      setAuthError('');
    } else {
      setAuthError('Email not found');
    }
  };

  const handlePasswordSubmit = () => {
    const allUsers = [CREDENTIALS.owner, CREDENTIALS.demo, ...CREDENTIALS.sales];
    const user = allUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) {
      setAuthStep('pin');
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handlePinSubmit = () => {
    const allUsers = [CREDENTIALS.owner, CREDENTIALS.demo, ...CREDENTIALS.sales];
    const user = allUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password && 
      u.pin === pin
    );
    if (user) {
      setAuthenticatedUser(user);
      setIsLocked(false);
      setAuthError('');
    } else {
      setAuthError('Invalid PIN');
    }
  };

  const selectPathway = (path) => {
    setSelectedPath(path);
    setWorkflowStep('upload');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const newFiles = Array.from(e.dataTransfer.files).map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        size: file.size
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.[0]) {
      const newFiles = Array.from(e.target.files).map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        size: file.size
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  };

  const startProcessing = () => {
    setWorkflowStep('processing');
    setProcessingStep(0);
    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= 8) {
          clearInterval(interval);
          setTimeout(() => setWorkflowStep('legal'), 500);
          return 8;
        }
        return prev + 1;
      });
    }, 2500);
  };

  const canProceedLegal = () => {
    return Object.values(legalChecks).every(v => v === true) && signature.trim() !== '';
  };

  const proceedToDisclosure = () => {
    if (!canProceedLegal()) {
      alert('Please check all boxes and sign');
      return;
    }
    setWorkflowStep('disclosure');
  };

  const calculateFees = () => {
    const total = auditResults.totalOvercharge;
    if (selectedPath === 'escrow') {
      const fee = Math.round(total * 0.39);
      return { total, fee, youReceive: total - fee, percentage: 39 };
    } else {
      const fee = Math.round(total * 0.30);
      return { total, fee, youReceive: total - fee, percentage: 30 };
    }
  };

  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)'
  };

  // ==================== REGISTRATION CARD ====================
  if (showRegistration) {
    return (
      <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
        <div style={{background: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '36px', maxWidth: '520px', width: '100%', border: '1px solid rgba(148, 163, 184, 0.2)', position: 'relative'}}>
          
          {/* ADMIN BYPASS BUTTON */}
          <button 
            onClick={() => setShowRegistration(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              padding: '6px 12px',
              background: 'rgba(203, 166, 88, 0.15)',
              border: '1px solid rgba(203, 166, 88, 0.4)',
              borderRadius: '4px',
              color: '#cba658',
              fontSize: '9px',
              fontWeight: '600',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(203, 166, 88, 0.25)';
              e.currentTarget.style.borderColor = '#cba658';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(203, 166, 88, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.4)';
            }}
          >
            🔑 ADMIN LOGIN
          </button>

          <h1 style={{...glassText, fontSize: '26px', fontWeight: '300', color: '#cba658', marginBottom: '6px', letterSpacing: '2px', textAlign: 'center'}}>Register for AuditDNA</h1>
          <p style={{...glassText, fontSize: '11px', color: '#94a3b8', letterSpacing: '1px', textAlign: 'center', marginBottom: '28px'}}>US Mortgage Financial Recovery Service</p>

          <div style={{ marginBottom: '18px' }}>
            <label style={{...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '6px'}}>FULL NAME *</label>
            <input type="text" value={regForm.fullName} onChange={(e) => handleRegChange('fullName', e.target.value)}
              style={{width: '100%', padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: regErrors.fullName ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box'}} />
            {regErrors.fullName && <p style={{...glassText, fontSize: '9px', color: '#ef4444', marginTop: '4px'}}>{regErrors.fullName}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
            <div>
              <label style={{...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '6px'}}>EMAIL *</label>
              <input type="email" value={regForm.email} onChange={(e) => handleRegChange('email', e.target.value)}
                style={{width: '100%', padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: regErrors.email ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box'}} />
              {regErrors.email && <p style={{...glassText, fontSize: '9px', color: '#ef4444', marginTop: '4px'}}>{regErrors.email}</p>}
            </div>
            <div>
              <label style={{...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '6px'}}>PHONE *</label>
              <input type="tel" value={regForm.phone} onChange={(e) => handleRegChange('phone', e.target.value)} placeholder="(555) 123-4567"
                style={{width: '100%', padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: regErrors.phone ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box'}} />
              {regErrors.phone && <p style={{...glassText, fontSize: '9px', color: '#ef4444', marginTop: '4px'}}>{regErrors.phone}</p>}
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '6px'}}>PROPERTY ADDRESS *</label>
            <input type="text" value={regForm.propertyAddress} onChange={(e) => handleRegChange('propertyAddress', e.target.value)} placeholder="123 Main Street"
              style={{width: '100%', padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: regErrors.propertyAddress ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box', marginBottom: '8px'}} />

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
              <input type="text" value={regForm.city} onChange={(e) => handleRegChange('city', e.target.value)} placeholder="City"
                style={{padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box'}} />
              
              <select value={regForm.state} onChange={(e) => handleRegChange('state', e.target.value)}
                style={{padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box'}}>
                {states.map(st => <option key={st} value={st}>{st}</option>)}
              </select>

              <input type="text" value={regForm.zip} onChange={(e) => handleRegChange('zip', e.target.value)} placeholder="ZIP" maxLength={5}
                style={{padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: regErrors.zip ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box'}} />
            </div>
            {regErrors.propertyAddress && <p style={{...glassText, fontSize: '9px', color: '#ef4444', marginTop: '4px'}}>{regErrors.propertyAddress}</p>}
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '6px'}}>PHOTO ID (REQUIRED FOR VERIFICATION) *</label>
            <p style={{...glassText, fontSize: '9px', color: '#64748b', marginBottom: '8px'}}>Upload a clear photo of your driver's license or government ID</p>
            <input type="file" accept="image/*,application/pdf" capture="environment" onChange={handlePhotoUpload}
              style={{width: '100%', padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: regErrors.photoID ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '11px', outline: 'none', boxSizing: 'border-box'}} />
            {regForm.photoID && <p style={{...glassText, fontSize: '9px', color: '#22c55e', marginTop: '4px'}}>✓ {regForm.photoID.name}</p>}
            {regErrors.photoID && <p style={{...glassText, fontSize: '9px', color: '#ef4444', marginTop: '4px'}}>{regErrors.photoID}</p>}
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '8px'}}>HOW DID YOU HEAR ABOUT US?</label>
            {['Google Search', 'Partner Referral', 'Social Media', 'Friend/Family'].map(source => (
              <label key={source} style={{ display: 'flex', gap: '8px', marginBottom: '6px', cursor: 'pointer', alignItems: 'center' }}>
                <input type="radio" name="referralSource" value={source} checked={regForm.referralSource === source} onChange={(e) => handleRegChange('referralSource', e.target.value)} style={{ width: '13px', height: '13px' }} />
                <span style={{...glassText, fontSize: '11px'}}>{source}</span>
              </label>
            ))}
          </div>

          {regForm.referralSource === 'Partner Referral' && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '6px'}}>PARTNER REFERRAL CODE</label>
              <input type="text" value={regForm.partnerCode} onChange={(e) => handleRegChange('partnerCode', e.target.value.toUpperCase())} placeholder="AGENT-12345"
                style={{width: '100%', padding: '11px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box'}} />
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', gap: '8px', cursor: 'pointer', alignItems: 'flex-start' }}>
              <input type="checkbox" checked={regForm.agreeToTerms} onChange={(e) => handleRegChange('agreeToTerms', e.target.checked)} style={{ marginTop: '2px', width: '13px', height: '13px' }} />
              <span style={{...glassText, fontSize: '10px', lineHeight: '1.5'}}>
                I agree to the Terms of Service and Privacy Policy. I authorize AuditDNA to audit my mortgage documents and verify my identity.
              </span>
            </label>
            {regErrors.agreeToTerms && <p style={{...glassText, fontSize: '9px', color: '#ef4444', marginTop: '4px'}}>{regErrors.agreeToTerms}</p>}
          </div>

          {regErrors.submit && <p style={{...glassText, fontSize: '10px', color: '#ef4444', textAlign: 'center', marginBottom: '12px'}}>{regErrors.submit}</p>}

          <button onClick={handleRegistration} disabled={isSubmitting}
            style={{width: '100%', padding: '13px', background: isSubmitting ? 'rgba(148, 163, 184, 0.2)' : 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: isSubmitting ? '#64748b' : '#0f172a', fontSize: '10px', fontWeight: '600', letterSpacing: '2px', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginBottom: '14px'}}>
            {isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>

          <p style={{...glassText, fontSize: '10px', textAlign: 'center', color: '#64748b'}}>
            Already have an account? <span onClick={() => setShowRegistration(false)} style={{ color: '#cba658', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Sign In</span>
          </p>
        </div>
      </div>
    );
  }

  // ==================== LOCK SCREEN ====================
  if (isLocked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '48px',
          maxWidth: '480px',
          width: '100%',
          border: '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          <h1 style={{...glassText, fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '8px', letterSpacing: '2px', textAlign: 'center'}}>
            AuditDNA
          </h1>
          <p style={{...glassText, fontSize: '14px', color: '#94a3b8', letterSpacing: '1px', textAlign: 'center', marginBottom: '40px'}}>
            MORTGAGE AUDIT PLATFORM
          </p>

          {authStep === 'email' && (
            <>
              <label style={{...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px'}}>EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                style={{width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '24px', boxSizing: 'border-box'}}
                autoFocus
              />
              <button onClick={handleEmailSubmit} style={{width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: '#0f172a', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer'}}>
                CONTINUE
              </button>
            </>
          )}

          {authStep === 'password' && (
            <>
              <div style={{...glassText, fontSize: '11px', marginBottom: '20px', color: '#94a3b8'}}>{email}</div>
              <label style={{...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px'}}>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                style={{width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '24px', boxSizing: 'border-box'}}
                autoFocus
              />
              <button onClick={handlePasswordSubmit} style={{width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: '#0f172a', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer'}}>
                CONTINUE
              </button>
            </>
          )}

          {authStep === 'pin' && (
            <>
              <div style={{...glassText, fontSize: '11px', marginBottom: '20px', color: '#94a3b8'}}>{email}</div>
              <label style={{...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px'}}>SECURITY PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
                maxLength={6}
                style={{width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '24px', textAlign: 'center', letterSpacing: '8px', outline: 'none', marginBottom: '24px', boxSizing: 'border-box'}}
                autoFocus
              />
              <button onClick={handlePinSubmit} style={{width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: '#0f172a', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer'}}>
                UNLOCK
              </button>
            </>
          )}

          {authError && (
            <p style={{...glassText, fontSize: '12px', color: '#f87171', textAlign: 'center', marginTop: '16px'}}>
              {authError}
            </p>
          )}

          <p style={{...glassText, fontSize: '10px', textAlign: 'center', marginTop: '20px', color: '#64748b'}}>
            Need an account? <span onClick={() => setShowRegistration(true)} style={{ color: '#cba658', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Register Here</span>
          </p>
        </div>
      </div>
    );
  }

  // SELECT PATH (2 BOXES) - THIS IS STEP 2!
  if (workflowStep === 'selectPath') {
    const isConsumer = authenticatedUser?.role === 'consumer';
    
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '40px 20px'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{...glassText, fontSize: '36px', fontWeight: '200', color: '#cba658', marginBottom: '40px', textAlign: 'center', letterSpacing: '3px'}}>
            Select Your Payment Path
          </h2>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px'}}>
            
            {/* ESCROW OPTION (39%) */}
            <div
              onClick={() => selectPathway('escrow')}
              style={{
                background: 'rgba(203, 166, 88, 0.1)',
                border: '2px solid #cba658',
                borderRadius: '12px',
                padding: '50px 40px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(203, 166, 88, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{fontSize: '12px', letterSpacing: '2px', color: '#cba658', marginBottom: '12px'}}>
                OPTION 1 • RECOMMENDED
              </div>
              <div style={{fontSize: '42px', fontWeight: '200', color: '#FFFFFF', marginBottom: '8px'}}>
                Escrow Protected
              </div>
              <div style={{fontSize: '16px', color: 'rgba(203, 213, 225, 0.7)', lineHeight: '1.6', marginBottom: '20px'}}>
                39% Commission<br/>
                First American Title Protection
              </div>
              <div style={{fontSize: '12px', color: 'rgba(148, 163, 184, 0.8)', lineHeight: '1.9'}}>
                • AI audit in 2-5 minutes<br/>
                • Escrow protection<br/>
                • Guaranteed payment to you<br/>
                • Average recovery: $8,500-$15,000
              </div>
              <div style={{marginTop: '24px', padding: '14px', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.4)', borderRadius: '8px'}}>
                <div style={{fontSize: '12px', color: '#4ade80', letterSpacing: '1px', fontWeight: '600'}}>
                  ✓ ESCROW PROTECTED
                </div>
              </div>
            </div>

            {/* DIRECT OPTION (39%) - LOCKED FOR CONSUMERS */}
            {isConsumer ? (
              <div style={{
                background: 'rgba(148, 163, 184, 0.05)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                padding: '50px 40px',
                opacity: 0.5,
                position: 'relative'
              }}>
                <div style={{position: 'absolute', top: '30px', right: '30px', fontSize: '48px'}}>
                  🔒
                </div>
                <div style={{fontSize: '11px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.6)', marginBottom: '12px'}}>
                  OPTION 2 • IN-PERSON ONLY
                </div>
                <div style={{fontSize: '42px', fontWeight: '200', color: 'rgba(226, 232, 240, 0.4)', marginBottom: '8px'}}>
                  Direct Processing
                </div>
                <div style={{fontSize: '16px', color: 'rgba(203, 213, 225, 0.4)', lineHeight: '1.6', marginBottom: '20px'}}>
                  30% Service Fee<br/>
                  No Escrow Protection
                </div>
                <div style={{padding: '16px', background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', marginTop: '30px'}}>
                  <div style={{fontSize: '12px', color: 'rgba(148, 163, 184, 0.6)', textAlign: 'center', lineHeight: '1.6'}}>
                    🔒 This option is only available for in-person consultations with authorized staff
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => selectPathway('direct')}
                style={{
                  background: 'rgba(203, 166, 88, 0.1)',
                  border: '1px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '12px',
                  padding: '50px 40px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(203, 166, 88, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxSizing = 'none';
                }}
              >
                <div style={{fontSize: '11px', letterSpacing: '2px', color: '#cba658', marginBottom: '12px'}}>
                  OPTION 2 • IN-PERSON
                </div>
                <div style={{fontSize: '42px', fontWeight: '200', color: '#FFFFFF', marginBottom: '8px'}}>
                  Direct Processing
                </div>
                <div style={{fontSize: '16px', color: 'rgba(203, 213, 225, 0.7)', lineHeight: '1.6', marginBottom: '20px'}}>
                  30% Service Fee<br/>
                  Standard Process
                </div>
                <div style={{fontSize: '12px', color: 'rgba(148, 163, 184, 0.8)', lineHeight: '1.9'}}>
                  • No escrow protection<br/>
                  • Lower service fee (30%)<br/>
                  • For in-person meetings only<br/>
                  • Wire or check payment
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // UPLOAD SCREEN
  if (workflowStep === 'upload') {
    return (
      <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 20px'}}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '40px'}}>
            <h1 style={{...glassText, fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '12px', letterSpacing: '2px'}}>
              Upload Your Mortgage Documents
            </h1>
            <p style={{...glassText, fontSize: '14px', color: '#94a3b8'}}>
              Drag & drop or click to browse
            </p>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
            style={{
              border: dragActive ? '2px dashed #cba658' : '2px dashed rgba(148, 163, 184, 0.3)',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              background: dragActive ? 'rgba(203, 166, 88, 0.05)' : 'rgba(30, 41, 59, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              marginBottom: '32px'
            }}
          >
            <div style={{fontSize: '48px', marginBottom: '16px'}}>📄</div>
            <p style={{...glassText, fontSize: '16px', marginBottom: '8px', color: '#cba658'}}>
              Drop files here or click to browse
            </p>
            <p style={{...glassText, fontSize: '12px', color: '#94a3b8'}}>
              PDF, JPG, PNG, DOC, DOCX
            </p>
            <input
              id="file-input"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileInput}
              style={{display: 'none'}}
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div style={{marginBottom: '32px'}}>
              <h3 style={{...glassText, fontSize: '14px', letterSpacing: '2px', marginBottom: '16px', color: '#cba658'}}>
                UPLOADED FILES ({uploadedFiles.length})
              </h3>
              {uploadedFiles.map(file => (
                <div
                  key={file.id}
                  style={{
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p style={{...glassText, fontSize: '13px', marginBottom: '4px'}}>{file.name}</p>
                    <p style={{...glassText, fontSize: '11px', color: '#94a3b8'}}>
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    style={{
                      background: 'rgba(248, 113, 113, 0.15)',
                      border: '1px solid rgba(248, 113, 113, 0.3)',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: '#f87171',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={startProcessing}
            disabled={uploadedFiles.length === 0}
            style={{
              width: '100%',
              padding: '20px',
              background: uploadedFiles.length > 0
                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                : 'rgba(148, 163, 184, 0.2)',
              border: 'none',
              borderRadius: '8px',
              color: uploadedFiles.length > 0 ? 'white' : '#64748b',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            START AUDIT
          </button>
        </div>
      </div>
    );
  }

  // PROCESSING SCREEN
  if (workflowStep === 'processing') {
    return (
      <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
        <div style={{maxWidth: '600px', textAlign: 'center'}}>
          <div style={{fontSize: '64px', marginBottom: '32px'}}>🧠</div>
          <h2 style={{...glassText, fontSize: '28px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '2px'}}>
            AI Processing Your Documents
          </h2>
          <p style={{...glassText, fontSize: '14px', color: '#94a3b8', marginBottom: '40px'}}>
            9 AI Miner Niners + The Brain
          </p>

          <div style={{textAlign: 'left', marginBottom: '32px'}}>
            {processingSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 20px',
                  marginBottom: '8px',
                  background: idx <= processingStep ? 'rgba(34, 197, 94, 0.15)' : 'rgba(30, 41, 59, 0.4)',
                  border: `1px solid ${idx <= processingStep ? 'rgba(34, 197, 94, 0.3)' : 'rgba(148, 163, 184, 0.2)'}`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{fontSize: '16px'}}>
                  {idx < processingStep ? '✅' : idx === processingStep ? '⏳' : '⏸️'}
                </span>
                <span style={{...glassText, fontSize: '12px', color: idx <= processingStep ? '#22c55e' : '#94a3b8'}}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div style={{width: '100%', height: '6px', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '3px', overflow: 'hidden'}}>
            <div style={{width: `${(processingStep / 8) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)', transition: 'width 0.5s ease'}} />
          </div>
        </div>
      </div>
    );
  }

  // LEGAL AGREEMENT SCREEN
  if (workflowStep === 'legal') {
    return (
      <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 20px'}}>
        <div style={{maxWidth: '900px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '40px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>⚖️</div>
            <h1 style={{...glassText, fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '12px', letterSpacing: '2px'}}>
              Terms of Service Agreement
            </h1>
            <p style={{...glassText, fontSize: '14px', color: '#94a3b8'}}>
              Lien Protection & Fee Structure
            </p>
          </div>

          <div style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '32px'}}>
            <h3 style={{...glassText, fontSize: '16px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px'}}>
              LIEN AUTHORIZATION & PROTECTION
            </h3>

            <div style={{marginBottom: '32px'}}>
              <label style={{display: 'flex', gap: '12px', marginBottom: '16px', cursor: 'pointer', alignItems: 'flex-start'}}>
                <input
                  type="checkbox"
                  checked={legalChecks.lien}
                  onChange={(e) => setLegalChecks({...legalChecks, lien: e.target.checked})}
                  style={{marginTop: '4px', width: '16px', height: '16px'}}
                />
                <span style={{...glassText, fontSize: '13px', lineHeight: '1.6'}}>
                  I authorize AuditDNA to place a lien on my property recovery funds.
                </span>
              </label>

              <label style={{display: 'flex', gap: '12px', marginBottom: '16px', cursor: 'pointer', alignItems: 'flex-start'}}>
                <input
                  type="checkbox"
                  checked={legalChecks.feeStructure}
                  onChange={(e) => setLegalChecks({...legalChecks, feeStructure: e.target.checked})}
                  style={{marginTop: '4px', width: '16px', height: '16px'}}
                />
                <span style={{...glassText, fontSize: '13px', lineHeight: '1.6'}}>
                  I understand the fee: {selectedPath === 'escrow' ? '39%' : '30%'}.
                </span>
              </label>

              <label style={{display: 'flex', gap: '12px', marginBottom: '16px', cursor: 'pointer', alignItems: 'flex-start'}}>
                <input
                  type="checkbox"
                  checked={legalChecks.escrow}
                  onChange={(e) => setLegalChecks({...legalChecks, escrow: e.target.checked})}
                  style={{marginTop: '4px', width: '16px', height: '16px'}}
                />
                <span style={{...glassText, fontSize: '13px', lineHeight: '1.6'}}>
                  I agree funds held in First American Title escrow.
                </span>
              </label>

              <label style={{display: 'flex', gap: '12px', marginBottom: '16px', cursor: 'pointer', alignItems: 'flex-start'}}>
                <input
                  type="checkbox"
                  checked={legalChecks.accuracy}
                  onChange={(e) => setLegalChecks({...legalChecks, accuracy: e.target.checked})}
                  style={{marginTop: '4px', width: '16px', height: '16px'}}
                />
                <span style={{...glassText, fontSize: '13px', lineHeight: '1.6'}}>
                  I certify uploaded documents are accurate and mine.
                </span>
              </label>

              <label style={{display: 'flex', gap: '12px', marginBottom: '16px', cursor: 'pointer', alignItems: 'flex-start'}}>
                <input
                  type="checkbox"
                  checked={legalChecks.binding}
                  onChange={(e) => setLegalChecks({...legalChecks, binding: e.target.checked})}
                  style={{marginTop: '4px', width: '16px', height: '16px'}}
                />
                <span style={{...glassText, fontSize: '13px', lineHeight: '1.6'}}>
                  I acknowledge this is legally binding.
                </span>
              </label>
            </div>

            <div>
              <label style={{...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px'}}>
                ELECTRONIC SIGNATURE *
              </label>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Sign your full legal name"
                style={{width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '18px', fontStyle: 'italic', outline: 'none', boxSizing: 'border-box'}}
              />
            </div>
          </div>

          <button
            onClick={proceedToDisclosure}
            disabled={!canProceedLegal()}
            style={{
              width: '100%',
              padding: '20px',
              background: canProceedLegal() ? 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)' : 'rgba(148, 163, 184, 0.2)',
              border: 'none',
              borderRadius: '8px',
              color: canProceedLegal() ? '#0f172a' : '#64748b',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: canProceedLegal() ? 'pointer' : 'not-allowed'
            }}
          >
            I AGREE - SHOW ME FINAL DISCLOSURE
          </button>
        </div>
      </div>
    );
  }

  // DISCLOSURE SCREEN
  if (workflowStep === 'disclosure') {
    const fees = calculateFees();

    return (
      <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 20px'}}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '40px'}}>
            <div style={{fontSize: '64px', marginBottom: '16px'}}>💰</div>
            <h1 style={{...glassText, fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '12px', letterSpacing: '2px'}}>
              Recovery Breakdown
            </h1>
          </div>

          <div style={{background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.4)', borderRadius: '12px', padding: '32px', textAlign: 'center', marginBottom: '32px'}}>
            <p style={{...glassText, fontSize: '13px', color: '#94a3b8', marginBottom: '8px', letterSpacing: '2px'}}>
              TOTAL OVERCHARGE FOUND
            </p>
            <p style={{...glassText, fontSize: '56px', color: '#22c55e', fontWeight: '600', margin: '16px 0'}}>
              ${fees.total.toLocaleString()}
            </p>
          </div>

          <div style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '32px'}}>
            <h3 style={{...glassText, fontSize: '16px', color: '#cba658', marginBottom: '24px', letterSpacing: '2px'}}>
              OVERCHARGE CATEGORIES
            </h3>

            {auditResults.categories.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: idx < auditResults.categories.length - 1 ? '1px solid rgba(148, 163, 184, 0.1)' : 'none'
                }}
              >
                <span style={{...glassText, fontSize: '13px'}}>{cat.name}</span>
                <span style={{...glassText, fontSize: '13px', color: '#22c55e', fontWeight: '600'}}>
                  +${cat.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '32px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <span style={{...glassText, fontSize: '15px'}}>Total Recovery</span>
              <span style={{...glassText, fontSize: '15px', color: '#22c55e', fontWeight: '600'}}>
                ${fees.total.toLocaleString()}
              </span>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <span style={{...glassText, fontSize: '15px'}}>
                AuditDNA Fee ({fees.percentage}%)
              </span>
              <span style={{...glassText, fontSize: '15px', color: '#ef4444', fontWeight: '600'}}>
                -${fees.fee.toLocaleString()}
              </span>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px 0 0 0'}}>
              <span style={{...glassText, fontSize: '18px', fontWeight: '700'}}>You Receive</span>
              <span style={{...glassText, fontSize: '28px', color: '#22c55e', fontWeight: '700'}}>
                ${fees.youReceive.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => setWorkflowStep('cooling')}
            style={{
              width: '100%',
              padding: '20px',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer'
            }}
          >
            CONFIRM & PROCEED
          </button>
        </div>
      </div>
    );
  }

  // COOLING OFF PERIOD SCREEN
  if (workflowStep === 'cooling') {
    return (
      <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
        <div style={{maxWidth: '700px', textAlign: 'center'}}>
          <div style={{fontSize: '80px', marginBottom: '32px'}}>✅</div>

          <h1 style={{...glassText, fontSize: '40px', color: '#22c55e', marginBottom: '20px', fontWeight: '600', letterSpacing: '2px'}}>
            Audit Complete!
          </h1>

          <p style={{...glassText, fontSize: '16px', color: '#94a3b8', marginBottom: '40px', lineHeight: '1.8'}}>
            Your mortgage audit has been submitted successfully.<br/>
            You have a <strong style={{color: '#cba658'}}>3-day cooling off period</strong> starting today.
          </p>

          <div style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '32px', textAlign: 'left'}}>
            <h3 style={{...glassText, fontSize: '16px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px'}}>
              WHAT HAPPENS NEXT:
            </h3>

            <div style={{...glassText, fontSize: '14px', lineHeight: '2.2'}}>
              <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                <span style={{color: '#22c55e'}}>✓</span>
                <span>Documents uploaded and verified</span>
              </div>
              <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                <span style={{color: '#22c55e'}}>✓</span>
                <span>Legal agreement signed</span>
              </div>
              <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                <span style={{color: '#22c55e'}}>✓</span>
                <span>Payment method selected ({selectedPath === 'escrow' ? '39% Escrow' : '30% Direct'})</span>
              </div>
              <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                <span style={{color: '#60a5fa'}}>⏳</span>
                <span>Demand letter sent (Day 1-3)</span>
              </div>
              <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                <span style={{color: '#60a5fa'}}>⏳</span>
                <span>Escrow opened (Day 7-14)</span>
              </div>
              <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                <span style={{color: '#60a5fa'}}>⏳</span>
                <span>Recovery funds received (Day 60-90)</span>
              </div>
              <div style={{display: 'flex', gap: '12px'}}>
                <span style={{color: '#60a5fa'}}>⏳</span>
                <span>Disbursement to you (Day 90-95)</span>
              </div>
            </div>
          </div>

          <div style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '24px', marginBottom: '32px'}}>
            <p style={{...glassText, fontSize: '13px', color: '#60a5fa', lineHeight: '1.8'}}>
              ℹ️ <strong>3-Day Cooling Off Period:</strong><br/>
              You may cancel within 3 business days for a full refund.
              Email: <strong>cancel@auditdna.com</strong>
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#0f172a',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '2px',
              cursor: 'pointer'
            }}
          >
            RETURN HOME
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default AuditDNADirect;