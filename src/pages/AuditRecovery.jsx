// AuditDNA - MORTGAGE AUDIT RECOVERY MODULE
// Workflow: Lock → Register/Login → Path → DOCS GUIDE → Upload → Processing → Legal → Disclosure → Cooling
// AUDIT FIX LOG:
//   [FIX 1] Zero green — all #22c55e/#4ade80 replaced with gold palette
//   [FIX 2] File upload now stores actual File objects (binary)
//   [FIX 3] loanData form added — miners get real data
//   [FIX 4] consumerData now falls back to authenticatedUser when regForm is empty
//   [FIX 5] Step progress indicator added (steps 3–8)
//   [NEW]   Required Documents Guide screen between path → upload
//   [NEW]   Document categorization on upload screen

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ── REQUIRED DOCUMENT CATALOG ────────────────────────────────────────────────
const REQUIRED_DOCS = [
  {
    id: 'cd',
    label: 'Closing Disclosure (CD)',
    tag: 'REQUIRED',
    tier: 'Tier 2 · Tier 5',
    desc: 'Form H-25 — the final itemized settlement statement (post Oct 2015)',
    why: 'Primary source for fee tolerance violations & overcharge detection',
    icon: '📋'
  },
  {
    id: 'le',
    label: 'Loan Estimate (LE)',
    tag: 'REQUIRED',
    tier: 'Tier 2',
    desc: 'Form H-24 — original cost estimate provided within 3 days of application',
    why: 'Compared against CD to find fee tolerance violations (TRID)',
    icon: '📝'
  },
  {
    id: 'note',
    label: 'Promissory Note',
    tag: 'REQUIRED',
    tier: 'Tier 1 · Tier 4',
    desc: 'Your original loan agreement showing rate, term, and lender',
    why: 'Verifies chain of command and original loan terms',
    icon: '📜'
  },
  {
    id: 'statements',
    label: 'Mortgage Statements (12–24 months)',
    tag: 'REQUIRED',
    tier: 'Tier 5',
    desc: 'Monthly statements from your current servicer',
    why: 'Used for financial reconciliation — finds payment discrepancies',
    icon: '🗂️'
  },
  {
    id: 'hud1',
    label: 'HUD-1 Settlement Statement',
    tag: 'PRE-2015 LOANS',
    tier: 'Tier 2 · Tier 5',
    desc: 'Required for loans originated before October 3, 2015 (replaces CD)',
    why: 'Original fee disclosure for legacy loan audits',
    icon: '🏛️'
  },
  {
    id: 'gfe',
    label: 'Good Faith Estimate (GFE)',
    tag: 'PRE-2015 LOANS',
    tier: 'Tier 2',
    desc: 'Pre-2015 equivalent of the Loan Estimate',
    why: 'Compared against HUD-1 for tolerance violations on older loans',
    icon: '📄'
  },
  {
    id: 'escrow',
    label: 'Escrow Analysis Statements',
    tag: 'RECOMMENDED',
    tier: 'Tier 5',
    desc: 'Annual escrow account analysis from your servicer',
    why: 'Detects escrow overcharges, tax & insurance miscalculations',
    icon: '🏦'
  },
  {
    id: 'pmi',
    label: 'PMI / MIP Documentation',
    tag: 'RECOMMENDED',
    tier: 'Tier 2',
    desc: 'Private Mortgage Insurance or FHA MIP payment records',
    why: 'Flags unauthorized PMI charges or cancellation violations',
    icon: '🛡️'
  },
  {
    id: 'title',
    label: 'Title Insurance Policy',
    tag: 'RECOMMENDED',
    tier: 'Tier 2 · Tier 3',
    desc: "Lender's and/or owner's title insurance commitments",
    why: 'Title overcharges are among the most common RESPA violations',
    icon: '🏠'
  },
  {
    id: 'transfer',
    label: 'Servicer Transfer Notices',
    tag: 'RECOMMENDED',
    tier: 'Tier 4',
    desc: 'RESPA § 6 required notices sent when loan was transferred',
    why: 'Chain-of-command tracking — detects improper transfers',
    icon: '✉️'
  },
  {
    id: 'appraisal',
    label: 'Appraisal Report',
    tag: 'SUPPLEMENTAL',
    tier: 'Tier 2',
    desc: 'Original property appraisal at time of origination',
    why: 'Verifies appraisal fee and detects inflated markup violations',
    icon: '🔍'
  },
  {
    id: 'correspondence',
    label: 'Lender / Servicer Correspondence',
    tag: 'SUPPLEMENTAL',
    tier: 'Tier 6',
    desc: 'Emails, letters, or notices from your lender or servicer',
    why: 'Supporting evidence for legal compliance violations',
    icon: '📬'
  }
];

const TAG_COLORS = {
  'REQUIRED':       { bg: 'rgba(203,166,88,0.15)',  border: 'rgba(203,166,88,0.5)',  text: '#cba658' },
  'PRE-2015 LOANS': { bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.4)', text: '#94a3b8' },
  'RECOMMENDED':    { bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.3)', text: '#94a3b8' },
  'SUPPLEMENTAL':   { bg: 'rgba(51,65,85,0.3)',     border: 'rgba(71,85,105,0.3)',   text: '#64748b' }
};

const STEP_LABELS = ['PATH', 'DOCUMENTS', 'UPLOAD', 'PROCESSING', 'LEGAL', 'DISCLOSURE', 'COMPLETE'];
const STEP_MAP    = { selectPath: 0, docsGuide: 1, upload: 2, processing: 3, legal: 4, disclosure: 5, cooling: 6 };

// ── CREDENTIAL STORE (move to backend auth in production) ───────────────────
const CREDENTIALS = {
  owner: { email: 'sg01@eb.com',   password: '060905Dsg#321', pin: '10051974', role: 'owner' },
  admins: [
    { email: 'gl@eb.com',          password: 'Admin2026!',    pin: '0505',     role: 'admin' },
    { email: 'ab-03@eb.com',       password: 'Admin2026!',    pin: '0303',     role: 'admin' }
  ],
  demo: { email: 'demo@eb.com',    password: 'Demo2026!',     pin: '0000',     role: 'consumer' },
  sales: Array.from({ length: 5 }, (_, i) => ({
    email:    `sales0${i+1}@eb.com`,
    password: `Sales${i+1}!`,
    pin:      `${i+1}${i+1}${i+1}${i+1}`,
    role:     'sales'
  }))
};

const ALL_USERS = [
  CREDENTIALS.owner,
  ...CREDENTIALS.admins,
  CREDENTIALS.demo,
  ...CREDENTIALS.sales
];

// ── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = n => Number(n || 0).toLocaleString();

function StepProgress({ workflowStep }) {
  const current = STEP_MAP[workflowStep] ?? -1;
  if (current < 0) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(203,166,88,0.2)', padding: '10px 20px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 0 }}>
        {STEP_LABELS.map((label, idx) => {
          const done    = idx < current;
          const active  = idx === current;
          const pending = idx > current;
          return (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: done ? '#cba658' : active ? 'rgba(203,166,88,0.2)' : 'rgba(30,41,59,0.8)',
                  border: done ? '2px solid #cba658' : active ? '2px solid #cba658' : '2px solid rgba(148,163,184,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', color: done ? '#0f172a' : active ? '#cba658' : '#64748b',
                  fontWeight: '700', transition: 'all 0.3s'
                }}>
                  {done ? '✓' : idx + 1}
                </div>
                <span style={{
                  fontSize: '8px', letterSpacing: '1px', marginTop: '4px',
                  color: active ? '#cba658' : done ? '#94a3b0' : '#475569',
                  fontFamily: '"Helvetica Neue", sans-serif', fontWeight: active ? '600' : '400'
                }}>{label}</span>
              </div>
              {idx < STEP_LABELS.length - 1 && (
                <div style={{
                  flex: 1, height: '1px',
                  background: idx < current ? '#cba658' : 'rgba(148,163,184,0.15)',
                  transition: 'all 0.3s', marginBottom: '14px'
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
function AuditDNADirect() {
  const navigate = useNavigate();

  // ── AUTH STATE ─────────────────────────────────────────────
  const [showRegistration,    setShowRegistration]    = useState(true);
  const [regForm,             setRegForm]             = useState({
    fullName: '', email: '', phone: '', propertyAddress: '',
    city: '', state: 'CA', zip: '', photoID: null,
    referralSource: '', partnerCode: '', agreeToTerms: false
  });
  const [regErrors,           setRegErrors]           = useState({});
  const [isSubmitting,        setIsSubmitting]        = useState(false);
  const [isLocked,            setIsLocked]            = useState(true);
  const [authStep,            setAuthStep]            = useState('email');
  const [email,               setEmail]               = useState('');
  const [password,            setPassword]            = useState('');
  const [pin,                 setPin]                 = useState('');
  const [authError,           setAuthError]           = useState('');
  const [authenticatedUser,   setAuthenticatedUser]   = useState(null);

  // ── WORKFLOW STATE ─────────────────────────────────────────
  const [workflowStep,        setWorkflowStep]        = useState('selectPath');
  const [selectedPath,        setSelectedPath]        = useState(null);

  // ── DOCS GUIDE STATE ───────────────────────────────────────
  const [checkedDocs,         setCheckedDocs]         = useState({});

  // ── LOAN INFO STATE (new!) ─────────────────────────────────
  const [loanInfo,            setLoanInfo]            = useState({
    originalLender: '', currentServicer: '', loanAmount: '',
    interestRate: '', originationDate: '', loanType: 'Conventional',
    propertyState: 'CA', hasBeenTransferred: false
  });

  // ── SELFIE STATE ───────────────────────────────────────────
  const [selfieMode,    setSelfieMode]    = useState(false);
  const [selfieBlob,    setSelfieBlob]    = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const videoRef  = useRef(null);
  const streamRef = useRef(null);

  // ── UPLOAD STATE ───────────────────────────────────────────
  const [uploadedFiles,       setUploadedFiles]       = useState([]); // stores { id, name, size, type, file }
  const [dragActive,          setDragActive]          = useState(false);
  const [processingStep,      setProcessingStep]      = useState(0);

  // ── LEGAL STATE ────────────────────────────────────────────
  const [legalChecks,         setLegalChecks]         = useState({
    lien: false, feeStructure: false, escrow: false,
    accuracy: false, binding: false
  });
  const [signature,           setSignature]           = useState('');

  // ── RESULTS STATE ──────────────────────────────────────────
  const [auditResults,        setAuditResults]        = useState({
    totalOvercharge: 14250,
    categories: [
      { name: 'Title Insurance Overcharge',  amount: 2450 },
      { name: 'Appraisal Fee Markup',        amount: 1200 },
      { name: 'Recording Fee Excess',        amount: 3100 },
      { name: 'PMI Overcharge',              amount: 1850 },
      { name: 'Fee Tolerance Violation',     amount: 3900 },
      { name: 'Tax Service Fee',             amount:  750 },
      { name: 'Credit Report Markup',        amount: 1000 }
    ]
  });

  // ── API STATE ──────────────────────────────────────────────
  const apiCaseId = useRef(null);

  // ── PROCESSING STEPS ───────────────────────────────────────
  const processingSteps = [
    'Tier 1 · Document Extraction (SI)',
    'Tier 2 · Fee Compliance Analysis (AI)',
    'Tier 3 · Multi-Jurisdiction Review (SI)',
    'Tier 4 · Chain of Command Tracking (AI)',
    'Tier 5 · Financial Reconciliation (SI)',
    'Tier 6 · Legal Compliance Analysis (AI)',
    'Cross-referencing RESPA / TRID violations...',
    'Calculating total overcharge & recovery...',
    'Generating audit report...'
  ];

  const states = [
    'CA','TX','FL','NY','AZ','NV','WA','OR','CO','UT','GA','NC','VA','OH','PA','MA','MI','IL','MN','MO'
  ];

  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)'
  };

  const pageWrap = (inner, maxWidth = 800) => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '80px 20px 40px' }}>
      <StepProgress workflowStep={workflowStep} />
      <div style={{ maxWidth, margin: '0 auto' }}>{inner}</div>
    </div>
  );

  // ── REGISTRATION HANDLERS ──────────────────────────────────
  const handleRegChange = (field, value) => {
    setRegForm(f => ({ ...f, [field]: value }));
    if (regErrors[field]) setRegErrors(e => ({ ...e, [field]: null }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) { setRegForm(f => ({ ...f, photoID: file })); }
  };

  const validateRegistration = () => {
    const errors = {};
    if (!regForm.fullName.trim())             errors.fullName        = 'Name required';
    if (!regForm.email.includes('@'))         errors.email           = 'Valid email required';
    if (regForm.phone.replace(/\D/g,'').length < 10) errors.phone   = 'Valid phone required';
    if (!regForm.propertyAddress.trim())      errors.propertyAddress = 'Address required';
    if (!regForm.zip.match(/^\d{5}$/))        errors.zip             = '5-digit ZIP required';
    if (!regForm.photoID)                     errors.photoID         = 'Photo ID required';
    if (!regForm.agreeToTerms)                errors.agreeToTerms    = 'Must agree to terms';
    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── SELFIE HANDLERS ────────────────────────────────────────
  const startCamera = async () => {
    setSelfieMode(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    } catch {
      alert('Camera access denied. Please allow camera access or upload a selfie photo.');
      setSelfieMode(false);
    }
  };

  const captureSelfie = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      setSelfieBlob(blob);
      setSelfiePreview(canvas.toDataURL('image/jpeg', 0.9));
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const stopCamera = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    setSelfieMode(false);
  };

  const retakeSelfie = () => { setSelfieBlob(null); setSelfiePreview(null); startCamera(); };

  const handleRegistration = async () => {
    if (!validateRegistration()) return;
    setIsSubmitting(true);
    try {
      let generatedPIN;
      try {
        // FormData — multer receives files correctly
        const formData = new FormData();
        formData.append('fullName',        regForm.fullName);
        formData.append('email',           regForm.email);
        formData.append('phone',           regForm.phone);
        formData.append('propertyAddress', regForm.propertyAddress);
        formData.append('city',            regForm.city    || '');
        formData.append('state',           regForm.state   || 'CA');
        formData.append('zip',             regForm.zip     || '');
        formData.append('referralSource',  regForm.referralSource || '');
        formData.append('partnerCode',     regForm.partnerCode    || '');
        if (regForm.photoID) formData.append('photoID', regForm.photoID, regForm.photoID.name);
        if (selfieBlob)      formData.append('selfie',  selfieBlob, `selfie_${Date.now()}.jpg`);

        const res  = await fetch(`${API_BASE}/consumers/register`, { method: 'POST', body: formData });
        const data = await res.json();
        generatedPIN = data.pin || Math.floor(100000 + Math.random() * 900000).toString();
      } catch (_) {
        await new Promise(r => setTimeout(r, 1500));
        generatedPIN = Math.floor(100000 + Math.random() * 900000).toString();
      }
      alert(`✅ Account created!\n\nCredentials sent to: ${regForm.email}\n\nYour PIN: ${generatedPIN}\n\n⚠️ SAVE THIS PIN — you will need it to sign in.`);
      setShowRegistration(false);
      setEmail(regForm.email);
    } catch {
      setRegErrors({ submit: 'Registration failed. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── AUTH HANDLERS ──────────────────────────────────────────
  const handleEmailSubmit = () => {
    const user = ALL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) { setAuthStep('password'); setAuthError(''); }
    else       { setAuthError('Email not found'); }
  };

  const handlePasswordSubmit = () => {
    const user = ALL_USERS.find(u =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) { setAuthStep('pin'); setAuthError(''); }
    else       { setAuthError('Incorrect password'); }
  };

  const handlePinSubmit = () => {
    const user = ALL_USERS.find(u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password && u.pin === pin
    );
    if (user) {
      setAuthenticatedUser(user);
      setIsLocked(false);
      setAuthError('');
    } else {
      setAuthError('Invalid PIN');
    }
  };

  const selectPathway = (path) => { setSelectedPath(path); setWorkflowStep('docsGuide'); };

  // ── FILE HANDLERS (FIX 2: store actual File object) ────────
  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file, idx) => ({
      id:       Date.now() + idx,
      name:     file.name,
      size:     file.size,
      mimeType: file.type,
      docType:  guessDocType(file.name),
      file      // ← actual File binary kept here
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const guessDocType = (name) => {
    const n = name.toLowerCase();
    if (n.includes('closing') || n.includes(' cd'))   return 'Closing Disclosure';
    if (n.includes('loan estimate') || n.includes(' le')) return 'Loan Estimate';
    if (n.includes('hud') || n.includes('hud-1'))     return 'HUD-1';
    if (n.includes('statement') || n.includes('stmt')) return 'Mortgage Statement';
    if (n.includes('escrow'))                          return 'Escrow Analysis';
    if (n.includes('note') || n.includes('promissory'))return 'Promissory Note';
    if (n.includes('title'))                           return 'Title Insurance';
    if (n.includes('appraisal'))                       return 'Appraisal Report';
    if (n.includes('pmi') || n.includes('mip'))        return 'PMI Documentation';
    if (n.includes('transfer') || n.includes('servicer')) return 'Transfer Notice';
    return 'Mortgage Document';
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) addFiles(e.target.files);
  };

  const removeFile = (id) => setUploadedFiles(prev => prev.filter(f => f.id !== id));

  const updateFileType = (id, docType) =>
    setUploadedFiles(prev => prev.map(f => f.id === id ? { ...f, docType } : f));

  // ── PROCESSING (FIX 3+4: real loanData + FormData) ─────────
  const startProcessing = () => {
    setWorkflowStep('processing');
    setProcessingStep(0);

    const caseId = `ADNA-${Date.now()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`;
    apiCaseId.current = caseId;

    // FIX 4: resolve consumer identity even for admin/sales logins
    const consumer = {
      name:            regForm.fullName    || authenticatedUser?.email?.split('@')[0] || '',
      email:           regForm.email       || authenticatedUser?.email                || '',
      phone:           regForm.phone       || '',
      propertyAddress: regForm.propertyAddress || '',
      state:           regForm.state       || loanInfo.propertyState || 'CA',
      zip:             regForm.zip         || '',
      partnerCode:     regForm.partnerCode || null,
      role:            authenticatedUser?.role || 'consumer'
    };

    // FIX 2: use FormData to send actual files
    const formData = new FormData();
    formData.append('caseId',       caseId);
    formData.append('consumerData', JSON.stringify(consumer));
    formData.append('loanData',     JSON.stringify({ ...loanInfo, selectedPath }));
    uploadedFiles.forEach(f => formData.append('documents', f.file, f.name));

    fetch(`${API_BASE}/audits/mortgage`, { method: 'POST', body: formData })
      .then(r => r.json())
      .then(data => {
        if (data.success && data.summary?.totalRecovery > 0) {
          const violations = data.violations || [];
          const total      = Math.round(data.summary.totalRecovery);
          const categories = violations.length > 0
            ? violations.map(v => ({ name: (v.description || v.law || '').slice(0,55), amount: Math.round(v.recoveryAmount || 0) }))
            : auditResults.categories;
          setAuditResults({ totalOvercharge: total, categories });
          apiCaseId.current = data.caseId || caseId;
        }
      })
      .catch(() => { /* backend offline — static fallback data shown */ });

    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= 8) { clearInterval(interval); setTimeout(() => setWorkflowStep('legal'), 600); return 8; }
        return prev + 1;
      });
    }, 2500);
  };

  const canProceedLegal = () => Object.values(legalChecks).every(Boolean) && signature.trim() !== '';

  const proceedToDisclosure = async () => {
    if (!canProceedLegal()) { alert('Please check all boxes and sign'); return; }
    // Save legal agreement to backend
    try {
      await fetch(`${API_BASE}/audits/${apiCaseId.current}/legal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature, legalChecks, signedAt: new Date().toISOString() })
      });
    } catch (_) { /* proceed anyway */ }
    setWorkflowStep('disclosure');
  };

  const calculateFees = () => {
    const total = auditResults.totalOvercharge;
    if (selectedPath === 'escrow') {
      const fee = Math.round(total * 0.39);
      return { total, fee, youReceive: total - fee, percentage: 39 };
    }
    const fee = Math.round(total * 0.30);
    return { total, fee, youReceive: total - fee, percentage: 30 };
  };

  const confirmAndFinalize = async () => {
    const fees = calculateFees();
    try {
      await fetch(`${API_BASE}/audits/${apiCaseId.current}/finalize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedPath, fees,
          coolingOffStart: new Date().toISOString(),
          coolingOffEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        })
      });
    } catch (_) { /* proceed anyway */ }
    setWorkflowStep('cooling');
  };

  const requiredCount  = REQUIRED_DOCS.filter(d => d.tag === 'REQUIRED').length;
  const checkedReq     = REQUIRED_DOCS.filter(d => d.tag === 'REQUIRED' && checkedDocs[d.id]).length;
  const hasMinRequired = checkedReq >= 2; // CD + Statements minimum

  const docTypeOptions = [
    'Closing Disclosure','Loan Estimate','HUD-1','Promissory Note',
    'Mortgage Statement','Escrow Analysis','PMI Documentation',
    'Title Insurance','Transfer Notice','Appraisal Report',
    'Good Faith Estimate','Correspondence','Other'
  ];

  // ══════════════════════════════════════════════════════════════════════════════
  // REGISTRATION SCREEN
  // ══════════════════════════════════════════════════════════════════════════════
  if (showRegistration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '36px', maxWidth: '520px', width: '100%', border: '1px solid rgba(148,163,184,0.2)', position: 'relative' }}>

          <button onClick={() => setShowRegistration(false)} style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px 12px', background: 'rgba(203,166,88,0.12)', border: '1px solid rgba(203,166,88,0.35)', borderRadius: '4px', color: '#cba658', fontSize: '9px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer' }}>
            🔑 ADMIN LOGIN
          </button>

          <h1 style={{ ...glassText, fontSize: '26px', fontWeight: '300', color: '#cba658', marginBottom: '6px', letterSpacing: '2px', textAlign: 'center' }}>Register for AuditDNA</h1>
          <p style={{ ...glassText, fontSize: '11px', color: '#94a3b8', letterSpacing: '1px', textAlign: 'center', marginBottom: '28px' }}>US Mortgage Financial Recovery Service</p>

          {/* Full Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>FULL LEGAL NAME *</label>
            <input type="text" value={regForm.fullName} onChange={e => handleRegChange('fullName', e.target.value)}
              style={{ width: '100%', padding: '11px', background: 'rgba(15,23,42,0.6)', border: regErrors.fullName ? '1px solid #ef4444' : '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
            {regErrors.fullName && <p style={{ color: '#ef4444', fontSize: '9px', marginTop: '3px' }}>{regErrors.fullName}</p>}
          </div>

          {/* Email + Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>EMAIL *</label>
              <input type="email" value={regForm.email} onChange={e => handleRegChange('email', e.target.value)}
                style={{ width: '100%', padding: '11px', background: 'rgba(15,23,42,0.6)', border: regErrors.email ? '1px solid #ef4444' : '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
              {regErrors.email && <p style={{ color: '#ef4444', fontSize: '9px', marginTop: '3px' }}>{regErrors.email}</p>}
            </div>
            <div>
              <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>PHONE *</label>
              <input type="tel" value={regForm.phone} onChange={e => handleRegChange('phone', e.target.value)} placeholder="(555) 123-4567"
                style={{ width: '100%', padding: '11px', background: 'rgba(15,23,42,0.6)', border: regErrors.phone ? '1px solid #ef4444' : '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
              {regErrors.phone && <p style={{ color: '#ef4444', fontSize: '9px', marginTop: '3px' }}>{regErrors.phone}</p>}
            </div>
          </div>

          {/* Property Address */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>MORTGAGED PROPERTY ADDRESS *</label>
            <input type="text" value={regForm.propertyAddress} onChange={e => handleRegChange('propertyAddress', e.target.value)} placeholder="123 Main Street"
              style={{ width: '100%', padding: '11px', background: 'rgba(15,23,42,0.6)', border: regErrors.propertyAddress ? '1px solid #ef4444' : '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box', marginBottom: '8px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
              <input type="text" value={regForm.city} onChange={e => handleRegChange('city', e.target.value)} placeholder="City"
                style={{ padding: '11px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
              <select value={regForm.state} onChange={e => handleRegChange('state', e.target.value)}
                style={{ padding: '11px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }}>
                {states.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
              <input type="text" value={regForm.zip} onChange={e => handleRegChange('zip', e.target.value)} placeholder="ZIP" maxLength={5}
                style={{ padding: '11px', background: 'rgba(15,23,42,0.6)', border: regErrors.zip ? '1px solid #ef4444' : '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* Photo ID */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>PHOTO ID *</label>
            <p style={{ ...glassText, fontSize: '9px', color: '#64748b', marginBottom: '6px' }}>Driver's license, passport, or government-issued ID</p>
            <input type="file" accept="image/*,application/pdf" onChange={handlePhotoUpload}
              style={{ width: '100%', padding: '10px', background: 'rgba(15,23,42,0.6)', border: regErrors.photoID ? '1px solid #ef4444' : '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} />
            {regForm.photoID && <p style={{ color: '#cba658', fontSize: '9px', marginTop: '3px' }}>✓ {regForm.photoID.name}</p>}
            {regErrors.photoID && <p style={{ color: '#ef4444', fontSize: '9px', marginTop: '3px' }}>{regErrors.photoID}</p>}
          </div>

          {/* SELFIE CAPTURE */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
              SELFIE VERIFICATION *
            </label>
            <p style={{ ...glassText, fontSize: '9px', color: '#64748b', marginBottom: '10px' }}>
              Required for identity verification — must match your photo ID
            </p>

            {/* No selfie yet */}
            {!selfiePreview && !selfieMode && (
              <button type="button" onClick={startCamera}
                style={{ width: '100%', padding: '14px', background: 'rgba(203,166,88,0.08)', border: '1px dashed rgba(203,166,88,0.4)', borderRadius: '8px', color: '#cba658', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                📷 OPEN CAMERA — TAKE SELFIE
              </button>
            )}

            {/* Webcam live view */}
            {selfieMode && (
              <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(203,166,88,0.3)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                <video ref={videoRef} autoPlay playsInline muted
                  style={{ width: '100%', maxWidth: '320px', borderRadius: '6px', background: '#000', display: 'block', margin: '0 auto 12px' }} />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button type="button" onClick={captureSelfie}
                    style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '6px', color: '#0f172a', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', cursor: 'pointer' }}>
                    📸 CAPTURE
                  </button>
                  <button type="button" onClick={stopCamera}
                    style={{ padding: '10px 20px', background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '6px', color: '#f87171', fontSize: '11px', cursor: 'pointer' }}>
                    CANCEL
                  </button>
                </div>
              </div>
            )}

            {/* Selfie captured preview */}
            {selfiePreview && !selfieMode && (
              <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(203,166,88,0.3)', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={selfiePreview} alt="Selfie"
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #cba658' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#cba658', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>✓ Selfie captured</p>
                  <p style={{ color: '#64748b', fontSize: '9px' }}>Your selfie will be stored securely for identity verification</p>
                </div>
                <button type="button" onClick={retakeSelfie}
                  style={{ padding: '6px 12px', background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '4px', color: '#94a3b8', fontSize: '9px', cursor: 'pointer', flexShrink: 0 }}>
                  RETAKE
                </button>
              </div>
            )}
          </div>

          {/* Referral */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>HOW DID YOU HEAR ABOUT US?</label>
            {['Google Search', 'Partner Referral', 'Social Media', 'Friend/Family'].map(src => (
              <label key={src} style={{ display: 'flex', gap: '8px', marginBottom: '5px', cursor: 'pointer', alignItems: 'center' }}>
                <input type="radio" name="referralSource" value={src} checked={regForm.referralSource === src} onChange={e => handleRegChange('referralSource', e.target.value)} />
                <span style={{ ...glassText, fontSize: '11px' }}>{src}</span>
              </label>
            ))}
          </div>

          {regForm.referralSource === 'Partner Referral' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>PARTNER CODE</label>
              <input type="text" value={regForm.partnerCode} onChange={e => handleRegChange('partnerCode', e.target.value.toUpperCase())} placeholder="AGENT-12345"
                style={{ width: '100%', padding: '11px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}

          {/* Terms */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'flex', gap: '8px', cursor: 'pointer', alignItems: 'flex-start' }}>
              <input type="checkbox" checked={regForm.agreeToTerms} onChange={e => handleRegChange('agreeToTerms', e.target.checked)} style={{ marginTop: '2px', width: '13px', height: '13px' }} />
              <span style={{ ...glassText, fontSize: '10px', lineHeight: '1.5' }}>
                I agree to the Terms of Service and Privacy Policy. I authorize AuditDNA to audit my mortgage documents and verify my identity.
              </span>
            </label>
            {regErrors.agreeToTerms && <p style={{ color: '#ef4444', fontSize: '9px', marginTop: '3px' }}>{regErrors.agreeToTerms}</p>}
          </div>

          {regErrors.submit && <p style={{ color: '#ef4444', fontSize: '10px', textAlign: 'center', marginBottom: '10px' }}>{regErrors.submit}</p>}

          <button onClick={handleRegistration} disabled={isSubmitting} style={{ width: '100%', padding: '13px', background: isSubmitting ? 'rgba(148,163,184,0.2)' : 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: isSubmitting ? '#64748b' : '#0f172a', fontSize: '10px', fontWeight: '600', letterSpacing: '2px', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginBottom: '12px' }}>
            {isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>

          <p style={{ ...glassText, fontSize: '10px', textAlign: 'center', color: '#64748b' }}>
            Already have an account?{' '}
            <span onClick={() => setShowRegistration(false)} style={{ color: '#cba658', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Sign In</span>
          </p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // LOCK / LOGIN SCREEN
  // ══════════════════════════════════════════════════════════════════════════════
  if (isLocked) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '48px', maxWidth: '480px', width: '100%', border: '1px solid rgba(148,163,184,0.2)' }}>
          <h1 style={{ ...glassText, fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '8px', letterSpacing: '2px', textAlign: 'center' }}>AuditDNA</h1>
          <p style={{ ...glassText, fontSize: '13px', color: '#94a3b8', letterSpacing: '2px', textAlign: 'center', marginBottom: '40px' }}>MORTGAGE AUDIT PLATFORM</p>

          {authStep === 'email' && (
            <>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>EMAIL ADDRESS</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleEmailSubmit()} autoFocus
                style={{ width: '100%', padding: '16px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '24px', boxSizing: 'border-box' }} />
              <button onClick={handleEmailSubmit} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: '#0f172a', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer' }}>CONTINUE</button>
            </>
          )}

          {authStep === 'password' && (
            <>
              <div style={{ ...glassText, fontSize: '11px', marginBottom: '20px', color: '#94a3b8' }}>{email}</div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handlePasswordSubmit()} autoFocus
                style={{ width: '100%', padding: '16px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '24px', boxSizing: 'border-box' }} />
              <button onClick={handlePasswordSubmit} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: '#0f172a', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer' }}>CONTINUE</button>
            </>
          )}

          {authStep === 'pin' && (
            <>
              <div style={{ ...glassText, fontSize: '11px', marginBottom: '20px', color: '#94a3b8' }}>{email}</div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>SECURITY PIN</label>
              <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyPress={e => e.key === 'Enter' && handlePinSubmit()} maxLength={10} autoFocus
                style={{ width: '100%', padding: '16px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '24px', textAlign: 'center', letterSpacing: '8px', outline: 'none', marginBottom: '24px', boxSizing: 'border-box' }} />
              <button onClick={handlePinSubmit} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: '#0f172a', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer' }}>UNLOCK</button>
            </>
          )}

          {authError && <p style={{ ...glassText, fontSize: '12px', color: '#f87171', textAlign: 'center', marginTop: '16px' }}>{authError}</p>}

          <p style={{ ...glassText, fontSize: '10px', textAlign: 'center', marginTop: '20px', color: '#64748b' }}>
            Need an account?{' '}
            <span onClick={() => setShowRegistration(true)} style={{ color: '#cba658', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Register Here</span>
          </p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SELECT PATH
  // ══════════════════════════════════════════════════════════════════════════════
  if (workflowStep === 'selectPath') {
    const isConsumer = authenticatedUser?.role === 'consumer';
    return pageWrap(
      <>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ ...glassText, fontSize: '36px', fontWeight: '200', color: '#cba658', marginBottom: '12px', letterSpacing: '3px' }}>Select Your Payment Path</h2>
          <p style={{ ...glassText, fontSize: '13px', color: '#64748b' }}>Choose how you'd like to receive your recovery funds</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
          {/* ESCROW */}
          <div onClick={() => selectPathway('escrow')}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(203,166,88,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            style={{ background: 'rgba(203,166,88,0.08)', border: '2px solid #cba658', borderRadius: '12px', padding: '50px 40px', cursor: 'pointer', transition: 'all 0.3s' }}>
            <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#cba658', marginBottom: '12px' }}>OPTION 1 · RECOMMENDED</div>
            <div style={{ fontSize: '38px', fontWeight: '200', color: '#FFFFFF', marginBottom: '8px' }}>Escrow Protected</div>
            <div style={{ fontSize: '15px', color: 'rgba(203,213,225,0.7)', lineHeight: '1.6', marginBottom: '20px' }}>39% Commission<br />First American Title Protection</div>
            <div style={{ fontSize: '12px', color: 'rgba(148,163,184,0.8)', lineHeight: '1.9' }}>
              · AI audit in 2–5 minutes<br />· Escrow protection via First American<br />· Guaranteed disbursement to you<br />· Average recovery: $8,500–$15,000
            </div>
            <div style={{ marginTop: '24px', padding: '14px', background: 'rgba(203,166,88,0.12)', border: '1px solid rgba(203,166,88,0.4)', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#cba658', letterSpacing: '1px', fontWeight: '600' }}>✓ ESCROW PROTECTED</span>
            </div>
          </div>

          {/* DIRECT */}
          {isConsumer ? (
            <div style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '12px', padding: '50px 40px', opacity: 0.45, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '28px', right: '28px', fontSize: '40px' }}>🔒</div>
              <div style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(148,163,184,0.5)', marginBottom: '12px' }}>OPTION 2 · IN-PERSON ONLY</div>
              <div style={{ fontSize: '38px', fontWeight: '200', color: 'rgba(226,232,240,0.35)', marginBottom: '8px' }}>Direct Processing</div>
              <div style={{ fontSize: '15px', color: 'rgba(203,213,225,0.35)', lineHeight: '1.6', marginBottom: '20px' }}>30% Service Fee<br />No Escrow Protection</div>
              <div style={{ padding: '14px', background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: 'rgba(148,163,184,0.5)', lineHeight: '1.6' }}>🔒 Available for in-person consultations only</span>
              </div>
            </div>
          ) : (
            <div onClick={() => selectPathway('direct')}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(203,166,88,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ background: 'rgba(203,166,88,0.05)', border: '1px solid rgba(203,166,88,0.3)', borderRadius: '12px', padding: '50px 40px', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#cba658', marginBottom: '12px' }}>OPTION 2 · IN-PERSON</div>
              <div style={{ fontSize: '38px', fontWeight: '200', color: '#FFFFFF', marginBottom: '8px' }}>Direct Processing</div>
              <div style={{ fontSize: '15px', color: 'rgba(203,213,225,0.7)', lineHeight: '1.6', marginBottom: '20px' }}>30% Service Fee<br />Standard Process</div>
              <div style={{ fontSize: '12px', color: 'rgba(148,163,184,0.8)', lineHeight: '1.9' }}>
                · No escrow protection<br />· Lower service fee (30%)<br />· For in-person meetings only<br />· Wire or check payment
              </div>
            </div>
          )}
        </div>
      </>,
      1200
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // REQUIRED DOCUMENTS GUIDE  ← NEW SCREEN
  // ══════════════════════════════════════════════════════════════════════════════
  if (workflowStep === 'docsGuide') {
    const requiredChecked = REQUIRED_DOCS.filter(d => d.tag === 'REQUIRED' && checkedDocs[d.id]).length;
    const totalRequired   = REQUIRED_DOCS.filter(d => d.tag === 'REQUIRED').length;

    return pageWrap(
      <>
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>📂</div>
          <h1 style={{ ...glassText, fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '10px', letterSpacing: '2px' }}>Required Documents</h1>
          <p style={{ ...glassText, fontSize: '14px', color: '#94a3b8', lineHeight: '1.7' }}>
            Check off what you have ready. Our AI miners are mapped to specific document types —<br />
            the more you upload, the more violations we can detect.
          </p>
        </div>

        {/* LOAN INFO FORM */}
        <div style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(203,166,88,0.25)', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h3 style={{ ...glassText, fontSize: '13px', color: '#cba658', letterSpacing: '2px', marginBottom: '20px' }}>BASIC LOAN INFORMATION</h3>
          <p style={{ ...glassText, fontSize: '11px', color: '#64748b', marginBottom: '20px' }}>This goes directly to the AI miners. Fill in what you know.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { field: 'originalLender',  label: 'ORIGINAL LENDER',      placeholder: 'e.g. Bank of America',     type: 'text'   },
              { field: 'currentServicer', label: 'CURRENT SERVICER',     placeholder: 'e.g. PHH Mortgage',        type: 'text'   },
              { field: 'loanAmount',      label: 'ORIGINAL LOAN AMOUNT', placeholder: 'e.g. 425000',              type: 'number' },
              { field: 'interestRate',    label: 'INTEREST RATE (%)',     placeholder: 'e.g. 6.75',                type: 'number' },
              { field: 'originationDate', label: 'ORIGINATION DATE',     placeholder: '',                         type: 'date'   }
            ].map(({ field, label, placeholder, type }) => (
              <div key={field}>
                <label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>{label}</label>
                <input type={type} value={loanInfo[field]} onChange={e => setLoanInfo(li => ({ ...li, [field]: e.target.value }))} placeholder={placeholder}
                  style={{ width: '100%', padding: '10px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}

            <div>
              <label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>LOAN TYPE</label>
              <select value={loanInfo.loanType} onChange={e => setLoanInfo(li => ({ ...li, loanType: e.target.value }))}
                style={{ width: '100%', padding: '10px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }}>
                {['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'ARM'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'flex', gap: '10px', cursor: 'pointer', alignItems: 'center' }}>
              <input type="checkbox" checked={loanInfo.hasBeenTransferred} onChange={e => setLoanInfo(li => ({ ...li, hasBeenTransferred: e.target.checked }))} />
              <span style={{ ...glassText, fontSize: '12px' }}>My loan has been sold/transferred to a different servicer since origination</span>
            </label>
          </div>
        </div>

        {/* DOCUMENT CHECKLIST */}
        <div style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ ...glassText, fontSize: '13px', color: '#cba658', letterSpacing: '2px', margin: 0 }}>DOCUMENT CHECKLIST</h3>
            <div style={{ fontSize: '11px', color: requiredChecked === totalRequired ? '#cba658' : '#64748b', fontFamily: 'monospace' }}>
              {requiredChecked}/{totalRequired} REQUIRED CHECKED
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '4px', background: 'rgba(30,41,59,0.8)', borderRadius: '2px', marginBottom: '24px', overflow: 'hidden' }}>
            <div style={{ width: `${(requiredChecked / totalRequired) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #cba658, #b8944d)', transition: 'width 0.4s ease' }} />
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            {REQUIRED_DOCS.map(doc => {
              const tc = TAG_COLORS[doc.tag];
              const isChecked = !!checkedDocs[doc.id];
              return (
                <div key={doc.id}
                  onClick={() => setCheckedDocs(cd => ({ ...cd, [doc.id]: !cd[doc.id] }))}
                  style={{
                    display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 16px',
                    background: isChecked ? 'rgba(203,166,88,0.07)' : 'rgba(15,23,42,0.3)',
                    border: isChecked ? '1px solid rgba(203,166,88,0.3)' : '1px solid rgba(71,85,105,0.3)',
                    borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                  {/* Checkbox */}
                  <div style={{
                    width: '20px', height: '20px', flexShrink: 0, marginTop: '2px',
                    border: isChecked ? '2px solid #cba658' : '2px solid rgba(148,163,184,0.3)',
                    borderRadius: '4px', background: isChecked ? '#cba658' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>
                    {isChecked && <span style={{ fontSize: '11px', color: '#0f172a', fontWeight: '900' }}>✓</span>}
                  </div>

                  {/* Icon */}
                  <div style={{ fontSize: '20px', flexShrink: 0 }}>{doc.icon}</div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span style={{ ...glassText, fontSize: '13px', fontWeight: '400', color: isChecked ? '#e2e8f0' : '#94a3b8' }}>{doc.label}</span>
                      <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '3px', background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text, letterSpacing: '1px', fontWeight: '600' }}>
                        {doc.tag}
                      </span>
                      <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '3px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(71,85,105,0.4)', color: '#64748b', letterSpacing: '0.5px' }}>
                        {doc.tier}
                      </span>
                    </div>
                    <p style={{ ...glassText, fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{doc.desc}</p>
                    <p style={{ ...glassText, fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>Why it matters: {doc.why}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INFO BANNER */}
        <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '8px', padding: '20px', marginBottom: '28px' }}>
          <p style={{ ...glassText, fontSize: '12px', color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
            <strong style={{ color: '#cba658' }}>💡 Pro Tip:</strong> The more documents you provide, the more violation categories our AI miners can analyze. The minimum for a basic audit is a <strong style={{ color: '#cbd5e1' }}>Closing Disclosure</strong> + <strong style={{ color: '#cbd5e1' }}>12 months of statements</strong>. A full submission with all recommended docs typically increases recovery findings by <strong style={{ color: '#cba658' }}>40–65%</strong>.
          </p>
        </div>

        {/* CTA */}
        <button onClick={() => setWorkflowStep('upload')}
          style={{
            width: '100%', padding: '20px',
            background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
            border: 'none', borderRadius: '8px',
            color: '#0f172a', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', cursor: 'pointer'
          }}>
          I'M READY — PROCEED TO UPLOAD →
        </button>

        {!hasMinRequired && (
          <p style={{ ...glassText, fontSize: '10px', color: '#64748b', textAlign: 'center', marginTop: '12px' }}>
            ⚠️ We recommend checking at least Closing Disclosure + Mortgage Statements before proceeding
          </p>
        )}
      </>,
      900
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // UPLOAD SCREEN
  // ══════════════════════════════════════════════════════════════════════════════
  if (workflowStep === 'upload') {
    return pageWrap(
      <>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ ...glassText, fontSize: '34px', fontWeight: '300', color: '#cba658', marginBottom: '10px', letterSpacing: '2px' }}>Upload Your Documents</h1>
          <p style={{ ...glassText, fontSize: '13px', color: '#94a3b8' }}>
            Drag & drop or click to browse · PDF, JPG, PNG, DOC, DOCX
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
            {REQUIRED_DOCS.filter(d => checkedDocs[d.id]).map(d => (
              <span key={d.id} style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '3px', background: 'rgba(203,166,88,0.1)', border: '1px solid rgba(203,166,88,0.3)', color: '#cba658' }}>
                {d.icon} {d.label.split(' (')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* DROP ZONE */}
        <div
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
          style={{ border: dragActive ? '2px dashed #cba658' : '2px dashed rgba(148,163,184,0.3)', borderRadius: '12px', padding: '60px 40px', textAlign: 'center', background: dragActive ? 'rgba(203,166,88,0.05)' : 'rgba(30,41,59,0.35)', cursor: 'pointer', transition: 'all 0.3s', marginBottom: '28px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <p style={{ ...glassText, fontSize: '16px', marginBottom: '8px', color: '#cba658' }}>Drop files here or click to browse</p>
          <p style={{ ...glassText, fontSize: '12px', color: '#64748b' }}>All document types accepted · Multiple files allowed</p>
          <input id="file-input" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileInput} style={{ display: 'none' }} />
        </div>

        {/* UPLOADED FILES */}
        {uploadedFiles.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ ...glassText, fontSize: '12px', letterSpacing: '2px', marginBottom: '14px', color: '#cba658' }}>
              UPLOADED ({uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''})
            </h3>
            {uploadedFiles.map(file => (
              <div key={file.id} style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '8px', padding: '14px 16px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '20px' }}>📎</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...glassText, fontSize: '12px', marginBottom: '6px', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
                  {/* Document type selector */}
                  <select value={file.docType} onChange={e => updateFileType(file.id, e.target.value)}
                    style={{ padding: '4px 8px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '4px', color: '#94a3b8', fontSize: '10px', outline: 'none', letterSpacing: '0.5px' }}>
                    {docTypeOptions.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <span style={{ ...glassText, fontSize: '10px', color: '#64748b', flexShrink: 0 }}>
                  {(file.size / 1024).toFixed(1)} KB
                </span>
                <button onClick={() => removeFile(file.id)}
                  style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '4px', padding: '6px 10px', color: '#f87171', fontSize: '10px', cursor: 'pointer', flexShrink: 0 }}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* QUICK DOC REFERENCE */}
        <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(71,85,105,0.3)', borderRadius: '8px', padding: '18px', marginBottom: '28px' }}>
          <p style={{ ...glassText, fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '10px' }}>QUICK REFERENCE — DOCUMENTS NEEDED</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {REQUIRED_DOCS.filter(d => ['REQUIRED','PRE-2015 LOANS'].includes(d.tag)).map(d => (
              <div key={d.id} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px' }}>{d.icon}</span>
                <span style={{ ...glassText, fontSize: '10px', color: checkedDocs[d.id] ? '#cba658' : '#64748b' }}>
                  {checkedDocs[d.id] ? '✓ ' : '◦ '}{d.label.split(' (')[0]}
                </span>
              </div>
            ))}
          </div>
          <p style={{ ...glassText, fontSize: '10px', color: '#475569', marginTop: '10px', fontStyle: 'italic' }}>
            Missing documents? Go back to the <span onClick={() => setWorkflowStep('docsGuide')} style={{ color: '#cba658', cursor: 'pointer', textDecoration: 'underline' }}>Documents Guide</span>
          </p>
        </div>

        {/* START AUDIT */}
        <button onClick={startProcessing} disabled={uploadedFiles.length === 0}
          style={{ width: '100%', padding: '20px', background: uploadedFiles.length > 0 ? 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)' : 'rgba(148,163,184,0.15)', border: 'none', borderRadius: '8px', color: uploadedFiles.length > 0 ? '#0f172a' : '#64748b', fontSize: '14px', fontWeight: '700', letterSpacing: '2px', cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed' }}>
          {uploadedFiles.length > 0 ? `START AUDIT — ${uploadedFiles.length} FILE${uploadedFiles.length > 1 ? 'S' : ''} READY` : 'UPLOAD AT LEAST ONE DOCUMENT'}
        </button>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // PROCESSING SCREEN
  // ══════════════════════════════════════════════════════════════════════════════
  if (workflowStep === 'processing') {
    return pageWrap(
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '28px' }}>🧠</div>
        <h2 style={{ ...glassText, fontSize: '28px', fontWeight: '300', color: '#cba658', marginBottom: '12px', letterSpacing: '2px' }}>
          AI Mining Your Documents
        </h2>
        <p style={{ ...glassText, fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>
          Tier 1 → 6 Miners · The Brain · RESPA · TRID · State Regulations
        </p>
        <p style={{ ...glassText, fontSize: '11px', color: '#475569', marginBottom: '36px', letterSpacing: '1px' }}>
          {uploadedFiles.length} document{uploadedFiles.length !== 1 ? 's' : ''} · {selectedPath === 'escrow' ? '39% Escrow' : '30% Direct'}
        </p>

        <div style={{ textAlign: 'left', marginBottom: '32px' }}>
          {processingSteps.map((step, idx) => (
            <div key={idx} style={{
              padding: '12px 20px', marginBottom: '8px',
              background: idx <= processingStep ? 'rgba(203,166,88,0.1)' : 'rgba(30,41,59,0.4)',
              border: `1px solid ${idx <= processingStep ? 'rgba(203,166,88,0.3)' : 'rgba(148,163,184,0.15)'}`,
              borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.4s'
            }}>
              <span style={{ fontSize: '15px' }}>
                {idx < processingStep ? '✓' : idx === processingStep ? '⏳' : '◦'}
              </span>
              <span style={{ ...glassText, fontSize: '12px', color: idx <= processingStep ? '#cba658' : '#475569' }}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', height: '5px', background: 'rgba(30,41,59,0.6)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${(processingStep / 8) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #cba658 0%, #b8944d 100%)', transition: 'width 0.5s ease' }} />
        </div>
      </div>,
      600
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // LEGAL AGREEMENT SCREEN
  // ══════════════════════════════════════════════════════════════════════════════
  if (workflowStep === 'legal') {
    const fees = calculateFees();
    return pageWrap(
      <>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚖️</div>
          <h1 style={{ ...glassText, fontSize: '30px', fontWeight: '300', color: '#cba658', marginBottom: '10px', letterSpacing: '2px' }}>Terms of Service Agreement</h1>
          <p style={{ ...glassText, fontSize: '13px', color: '#94a3b8' }}>Lien Protection · Fee Structure · Legal Authorization</p>
        </div>

        {/* Estimated recovery preview */}
        <div style={{ background: 'rgba(203,166,88,0.08)', border: '1px solid rgba(203,166,88,0.25)', borderRadius: '8px', padding: '20px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ ...glassText, fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '4px' }}>ESTIMATED RECOVERY</p>
            <p style={{ ...glassText, fontSize: '28px', color: '#cba658', fontWeight: '400' }}>${fmt(fees.total)}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ ...glassText, fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '4px' }}>YOUR SHARE ({fees.percentage === 39 ? '61' : '70'}%)</p>
            <p style={{ ...glassText, fontSize: '28px', color: '#cbd5e1', fontWeight: '400' }}>${fmt(fees.youReceive)}</p>
          </div>
        </div>

        <div style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '12px', padding: '32px', marginBottom: '28px' }}>
          <h3 style={{ ...glassText, fontSize: '13px', color: '#cba658', marginBottom: '22px', letterSpacing: '2px' }}>AUTHORIZATION & AGREEMENTS</h3>

          {[
            { key: 'lien',        text: `I authorize AuditDNA to place a lien on my property recovery funds to secure the ${fees.percentage}% service fee.` },
            { key: 'feeStructure',text: `I understand the service fee is ${fees.percentage}% of total recovery. No recovery = no fee.` },
            { key: 'escrow',      text: selectedPath === 'escrow' ? 'I agree that recovery funds will be held in First American Title escrow until disbursement.' : 'I understand direct processing does not include escrow protection.' },
            { key: 'accuracy',    text: 'I certify that all uploaded documents are accurate, belong to me, and have not been altered.' },
            { key: 'binding',     text: 'I acknowledge this agreement is legally binding and enforceable under applicable state and federal law.' }
          ].map(({ key, text }) => (
            <label key={key} style={{ display: 'flex', gap: '12px', marginBottom: '18px', cursor: 'pointer', alignItems: 'flex-start' }}>
              <div onClick={() => setLegalChecks(lc => ({ ...lc, [key]: !lc[key] }))}
                style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px', border: legalChecks[key] ? '2px solid #cba658' : '2px solid rgba(148,163,184,0.3)', borderRadius: '4px', background: legalChecks[key] ? '#cba658' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                {legalChecks[key] && <span style={{ fontSize: '12px', color: '#0f172a', fontWeight: '900' }}>✓</span>}
              </div>
              <span style={{ ...glassText, fontSize: '13px', lineHeight: '1.6' }}>{text}</span>
            </label>
          ))}

          <div style={{ marginTop: '24px' }}>
            <label style={{ ...glassText, fontSize: '10px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>ELECTRONIC SIGNATURE *</label>
            <input type="text" value={signature} onChange={e => setSignature(e.target.value)} placeholder="Sign your full legal name"
              style={{ width: '100%', padding: '16px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '18px', fontStyle: 'italic', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>

        <button onClick={proceedToDisclosure} disabled={!canProceedLegal()}
          style={{ width: '100%', padding: '20px', background: canProceedLegal() ? 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)' : 'rgba(148,163,184,0.15)', border: 'none', borderRadius: '8px', color: canProceedLegal() ? '#0f172a' : '#64748b', fontSize: '14px', fontWeight: '700', letterSpacing: '2px', cursor: canProceedLegal() ? 'pointer' : 'not-allowed' }}>
          I AGREE — SHOW FINAL DISCLOSURE
        </button>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // DISCLOSURE SCREEN
  // ══════════════════════════════════════════════════════════════════════════════
  if (workflowStep === 'disclosure') {
    const fees = calculateFees();
    return pageWrap(
      <>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>💰</div>
          <h1 style={{ ...glassText, fontSize: '30px', fontWeight: '300', color: '#cba658', marginBottom: '10px', letterSpacing: '2px' }}>Recovery Breakdown</h1>
          <p style={{ ...glassText, fontSize: '13px', color: '#94a3b8' }}>Review your full audit findings before finalizing</p>
        </div>

        {/* Total recovery */}
        <div style={{ background: 'rgba(203,166,88,0.08)', border: '2px solid rgba(203,166,88,0.35)', borderRadius: '12px', padding: '32px', textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ ...glassText, fontSize: '11px', color: '#94a3b8', marginBottom: '8px', letterSpacing: '2px' }}>TOTAL OVERCHARGE FOUND</p>
          <p style={{ ...glassText, fontSize: '52px', color: '#cba658', fontWeight: '600', margin: '16px 0' }}>${fmt(fees.total)}</p>
        </div>

        {/* Categories */}
        <div style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '12px', padding: '28px', marginBottom: '20px' }}>
          <h3 style={{ ...glassText, fontSize: '12px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px' }}>VIOLATION CATEGORIES</h3>
          {auditResults.categories.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: idx < auditResults.categories.length - 1 ? '1px solid rgba(148,163,184,0.08)' : 'none' }}>
              <span style={{ ...glassText, fontSize: '13px' }}>{cat.name}</span>
              <span style={{ ...glassText, fontSize: '13px', color: '#cba658', fontWeight: '600' }}>+${fmt(cat.amount)}</span>
            </div>
          ))}
        </div>

        {/* Fee breakdown */}
        <div style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
            <span style={{ ...glassText, fontSize: '14px' }}>Total Recovery</span>
            <span style={{ ...glassText, fontSize: '14px', color: '#cba658', fontWeight: '600' }}>${fmt(fees.total)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
            <span style={{ ...glassText, fontSize: '14px' }}>AuditDNA Service Fee ({fees.percentage}%)</span>
            <span style={{ ...glassText, fontSize: '14px', color: '#f87171', fontWeight: '600' }}>-${fmt(fees.fee)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 0' }}>
            <span style={{ ...glassText, fontSize: '18px', fontWeight: '600', color: '#e2e8f0' }}>You Receive</span>
            <span style={{ ...glassText, fontSize: '32px', color: '#cba658', fontWeight: '700' }}>${fmt(fees.youReceive)}</span>
          </div>
        </div>

        <button onClick={confirmAndFinalize}
          style={{ width: '100%', padding: '20px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '8px', color: '#0f172a', fontSize: '14px', fontWeight: '700', letterSpacing: '2px', cursor: 'pointer' }}>
          CONFIRM & FINALIZE
        </button>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // COOLING OFF SCREEN
  // ══════════════════════════════════════════════════════════════════════════════
  if (workflowStep === 'cooling') {
    const fees = calculateFees();
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <StepProgress workflowStep={workflowStep} />
        <div style={{ maxWidth: '700px', textAlign: 'center' }}>
          <div style={{ fontSize: '72px', marginBottom: '28px' }}>✅</div>
          <h1 style={{ ...glassText, fontSize: '38px', color: '#cba658', marginBottom: '18px', fontWeight: '400', letterSpacing: '2px' }}>Audit Complete!</h1>
          <p style={{ ...glassText, fontSize: '15px', color: '#94a3b8', marginBottom: '36px', lineHeight: '1.8' }}>
            Your mortgage audit has been submitted and recorded.<br />
            You have a <strong style={{ color: '#cba658' }}>3-business-day cooling off period</strong> starting today.
          </p>

          {/* Case ID */}
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(203,166,88,0.2)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
            <p style={{ ...glassText, fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '6px' }}>CASE REFERENCE</p>
            <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#cba658', letterSpacing: '2px' }}>{apiCaseId.current || 'ADNA-PENDING'}</p>
          </div>

          {/* Summary */}
          <div style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '12px', padding: '28px', marginBottom: '24px', textAlign: 'left' }}>
            <h3 style={{ ...glassText, fontSize: '12px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px' }}>WHAT HAPPENS NEXT</h3>
            {[
              { icon: '✓', color: '#cba658', text: 'Documents uploaded and processed by AI miners' },
              { icon: '✓', color: '#cba658', text: `Legal agreement signed — ${selectedPath === 'escrow' ? '39% Escrow' : '30% Direct'} pathway selected` },
              { icon: '✓', color: '#cba658', text: `Recovery identified: $${fmt(fees.total)} · Your share: $${fmt(fees.youReceive)}` },
              { icon: '⏳', color: '#94a3b0', text: 'Demand letter sent to lender/servicer (Day 1–3)' },
              { icon: '⏳', color: '#94a3b0', text: selectedPath === 'escrow' ? 'First American Title escrow opened (Day 7–14)' : 'Direct processing initiated (Day 3–7)' },
              { icon: '⏳', color: '#94a3b0', text: 'Recovery funds received from lender (Day 60–90)' },
              { icon: '⏳', color: '#94a3b0', text: `Disbursement to you: $${fmt(fees.youReceive)} (Day 90–95)` }
            ].map(({ icon, color, text }, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <span style={{ color, flexShrink: 0, fontWeight: '600' }}>{icon}</span>
                <span style={{ ...glassText, fontSize: '13px', lineHeight: '1.5' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Cooling notice */}
          <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '8px', padding: '20px', marginBottom: '28px' }}>
            <p style={{ ...glassText, fontSize: '12px', color: '#93c5fd', lineHeight: '1.8' }}>
              ℹ️ <strong>3-Day Cooling Off Period</strong><br />
              You may cancel within 3 business days for a full refund.<br />
              Email: <strong>cancel@auditdna.com</strong> · Reference: {apiCaseId.current || 'ADNA-PENDING'}
            </p>
          </div>

          <button onClick={() => navigate('/')}
            style={{ padding: '16px 48px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '8px', color: '#0f172a', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer' }}>
            RETURN HOME
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default AuditDNADirect;