import React, { useState, useRef } from "react";
import { Upload, X, User, Building, FileText, Camera, Check, ChevronRight, ChevronLeft } from 'lucide-react';

export default function AgentRegistrationForm({ onSubmitSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', whatsapp: '',
    companyName: '', companyAddress: '', companyCity: '', companyState: '', companyCountry: 'Mexico',
    position: '', managerName: '', managerPhone: '', managerEmail: '',
    yearsExperience: '', specialization: '', licenseNumber: '', website: '',
    agreeTerms: false, agreeBackground: false
  });

  const [documents, setDocuments] = useState({
    ineFront: null, ineBack: null, businessLicense: null, proofAddress: null, profilePhoto: null
  });
  const [previews, setPreviews] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const fileRefs = {
    ineFront: useRef(null), ineBack: useRef(null), businessLicense: useRef(null),
    proofAddress: useRef(null), profilePhoto: useRef(null)
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => ({ ...prev, [docType]: file }));
      setPreviews(prev => ({ ...prev, [docType]: URL.createObjectURL(file) }));
    }
  };

  const removeDocument = (docType) => {
    if (previews[docType]) URL.revokeObjectURL(previews[docType]);
    setDocuments(prev => ({ ...prev, [docType]: null }));
    setPreviews(prev => ({ ...prev, [docType]: null }));
  };

  const validateStep = (stepNum) => {
    setError('');
    if (stepNum === 1 && (!formData.fullName || !formData.email || !formData.phone)) {
      setError('Please complete all required fields'); return false;
    }
    if (stepNum === 2 && (!formData.companyName || !formData.position)) {
      setError('Company name and position are required'); return false;
    }
    if (stepNum === 3 && (!documents.ineFront || !documents.ineBack)) {
      setError('Please upload both sides of your INE/ID'); return false;
    }
    if (stepNum === 4 && (!formData.agreeTerms || !formData.agreeBackground)) {
      setError('Please agree to all terms'); return false;
    }
    return true;
  };

  const nextStep = () => { if (validateStep(step)) setStep(step + 1); };
  const prevStep = () => { setStep(step - 1); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    const message = `🏢 NEW AGENT REGISTRATION\n\n👤 ${formData.fullName}\n📧 ${formData.email}\n📞 ${formData.phone}\n\n🏛️ ${formData.companyName}\n💼 ${formData.position}\n📍 ${formData.companyCity}, ${formData.companyState}\n\n👔 Manager: ${formData.managerName}\n📞 ${formData.managerPhone}\n\n📎 Documents: INE ✓ | License ${documents.businessLicense ? '✓' : '—'} | Photo ${documents.profilePhoto ? '✓' : '—'}\n\n⏳ STATUS: PENDING REVIEW`;
    window.open(`https://wa.me/526463402686?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#0f172a',
    border: '1px solid #334155',
    fontSize: '14px',
    color: '#e2e8f0',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    color: '#cba658',
    marginBottom: '8px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  };

  // SUCCESS STATE
  if (submitted) {
    return (
      <div style={{ background: '#0f172a', padding: '60px 40px', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', height: '80px', 
          background: '#cba658',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <Check size={36} color="#0f172a" strokeWidth={3} />
        </div>
        <h3 style={{ color: '#e2e8f0', fontSize: '28px', marginBottom: '12px', fontWeight: '300' }}>
          Application Submitted
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '380px', margin: '0 auto 32px', lineHeight: '1.6' }}>
          Your registration is pending review. We'll verify your documents and send login credentials within 24-48 hours.
        </p>
        <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '20px 32px', display: 'inline-block' }}>
          <p style={{ color: '#64748b', fontSize: '10px', letterSpacing: '2px', margin: '0 0 6px' }}>APPLICATION ID</p>
          <p style={{ color: '#cba658', fontSize: '20px', fontWeight: '600', margin: 0, letterSpacing: '2px' }}>
            AGT-{Date.now().toString().slice(-8)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0f172a', minHeight: '100%', padding: '24px' }}>
      <form onSubmit={handleSubmit}>
        {/* STEP INDICATOR */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '40px',
          paddingBottom: '24px',
          borderBottom: '1px solid #1e293b'
        }}>
          {[
            { num: 1, label: 'Personal' },
            { num: 2, label: 'Company' },
            { num: 3, label: 'Documents' },
            { num: 4, label: 'Submit' }
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: step >= s.num ? 1 : 0.4 }}>
                <div style={{
                  width: '40px', height: '40px',
                  background: step > s.num ? '#cba658' : step === s.num ? 'rgba(203,166,88,0.2)' : 'transparent',
                  border: step >= s.num ? '2px solid #cba658' : '2px solid #334155',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step > s.num ? '#0f172a' : step === s.num ? '#cba658' : '#475569',
                  fontWeight: '600', fontSize: '14px'
                }}>
                  {step > s.num ? <Check size={18} strokeWidth={3} /> : s.num}
                </div>
                <span style={{ fontSize: '11px', color: step >= s.num ? '#94a3b8' : '#475569', marginTop: '10px' }}>{s.label}</span>
              </div>
              {i < 3 && <div style={{ width: '50px', height: '2px', background: step > s.num ? '#cba658' : '#1e293b', margin: '0 8px', marginBottom: '24px' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', padding: '14px 18px', marginBottom: '24px' }}>
            <span style={{ color: '#fca5a5', fontSize: '13px' }}>{error}</span>
          </div>
        )}

        {/* STEP 1: PERSONAL */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#e2e8f0', fontSize: '22px', fontWeight: '400', marginBottom: '8px' }}>Personal Information</h3>
              <p style={{ color: '#64748b', fontSize: '13px' }}>Enter your contact details as they appear on your official ID.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Full Legal Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As shown on INE" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+52 646 123 4567" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>WhatsApp <span style={{ color: '#475569' }}>(if different)</span></label>
                <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+52 646 123 4567" style={inputStyle} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: COMPANY */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#e2e8f0', fontSize: '22px', fontWeight: '400', marginBottom: '8px' }}>Company Information</h3>
              <p style={{ color: '#64748b', fontSize: '13px' }}>Tell us about your real estate company or agency.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Company / Agency Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Real Estate Company S.A. de C.V." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Your Position <span style={{ color: '#ef4444' }}>*</span></label>
                <input name="position" value={formData.position} onChange={handleChange} placeholder="Agent, Broker, etc." style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Company Address</label>
              <input name="companyAddress" value={formData.companyAddress} onChange={handleChange} placeholder="Street Address" style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '32px' }}>
              <div>
                <label style={labelStyle}>City</label>
                <input name="companyCity" value={formData.companyCity} onChange={handleChange} placeholder="Ensenada" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <input name="companyState" value={formData.companyState} onChange={handleChange} placeholder="Baja California" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Country</label>
                <select name="companyCountry" value={formData.companyCountry} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="Mexico">Mexico</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px' }}>
              <p style={{ color: '#64748b', fontSize: '11px', letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
                Manager / Supervisor <span style={{ color: '#475569' }}>(for verification)</span>
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Manager Name</label>
                  <input name="managerName" value={formData.managerName} onChange={handleChange} placeholder="Full Name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Manager Phone</label>
                  <input name="managerPhone" value={formData.managerPhone} onChange={handleChange} placeholder="+52 646 123 4567" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Manager Email</label>
                  <input name="managerEmail" type="email" value={formData.managerEmail} onChange={handleChange} placeholder="manager@company.com" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DOCUMENTS */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#e2e8f0', fontSize: '22px', fontWeight: '400', marginBottom: '8px' }}>Identity Verification</h3>
              <p style={{ color: '#64748b', fontSize: '13px' }}>Upload clear photos of your identification documents.</p>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <p style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '16px', fontWeight: '500' }}>
                INE / Official ID <span style={{ color: '#ef4444' }}>*</span>
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {['ineFront', 'ineBack'].map((docType, idx) => (
                  <div
                    key={docType}
                    onClick={() => fileRefs[docType].current?.click()}
                    style={{
                      height: '160px',
                      border: documents[docType] ? '2px solid #cba658' : '2px dashed #334155',
                      background: '#1e293b',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', position: 'relative', overflow: 'hidden'
                    }}
                  >
                    {previews[docType] ? (
                      <>
                        <img src={previews[docType]} alt={idx === 0 ? 'INE Front' : 'INE Back'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeDocument(docType); }} 
                          style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', background: '#0f172a', border: '1px solid #475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={14} color="#e2e8f0" />
                        </button>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#cba658', padding: '6px', textAlign: 'center' }}>
                          <span style={{ fontSize: '10px', color: '#0f172a', fontWeight: '600', letterSpacing: '1px' }}>
                            {idx === 0 ? 'FRONT SIDE' : 'BACK SIDE'}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload size={28} color="#64748b" />
                        <span style={{ fontSize: '13px', color: '#94a3b8', marginTop: '12px' }}>{idx === 0 ? 'Front Side' : 'Back Side'}</span>
                        <span style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>Click to upload</span>
                      </>
                    )}
                    <input ref={fileRefs[docType]} type="file" accept="image/*" onChange={(e) => handleFileUpload(e, docType)} style={{ display: 'none' }} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ color: '#64748b', fontSize: '11px', letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
                Additional Documents <span style={{ color: '#475569' }}>(Optional)</span>
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                {[
                  { key: 'businessLicense', label: 'Business License' },
                  { key: 'proofAddress', label: 'Proof of Address' },
                  { key: 'profilePhoto', label: 'Profile Photo' }
                ].map(doc => (
                  <div
                    key={doc.key}
                    onClick={() => fileRefs[doc.key].current?.click()}
                    style={{
                      height: '100px',
                      border: documents[doc.key] ? '2px solid #cba658' : '1px dashed #334155',
                      background: '#1e293b',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', position: 'relative'
                    }}
                  >
                    {documents[doc.key] ? (
                      <>
                        <Check size={22} color="#cba658" />
                        <span style={{ fontSize: '10px', color: '#cba658', marginTop: '6px' }}>Uploaded</span>
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeDocument(doc.key); }}
                          style={{ position: 'absolute', top: '6px', right: '6px', width: '22px', height: '22px', background: '#0f172a', border: '1px solid #475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={10} color="#e2e8f0" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload size={18} color="#475569" />
                        <span style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', textAlign: 'center', padding: '0 8px' }}>{doc.label}</span>
                      </>
                    )}
                    <input ref={fileRefs[doc.key]} type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload(e, doc.key)} style={{ display: 'none' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#e2e8f0', fontSize: '22px', fontWeight: '400', marginBottom: '8px' }}>Review & Submit</h3>
              <p style={{ color: '#64748b', fontSize: '13px' }}>Please review your information before submitting.</p>
            </div>

            <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '24px' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '10px', letterSpacing: '1px', marginBottom: '12px' }}>PERSONAL</p>
                  <p style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '6px', fontWeight: '500' }}>{formData.fullName || '—'}</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>{formData.email || '—'}</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>{formData.phone || '—'}</p>
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '10px', letterSpacing: '1px', marginBottom: '12px' }}>COMPANY</p>
                  <p style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '6px', fontWeight: '500' }}>{formData.companyName || '—'}</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>{formData.position || '—'}</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>{formData.companyCity}{formData.companyCity && formData.companyState ? ', ' : ''}{formData.companyState}</p>
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid #334155', paddingTop: '20px' }}>
                <p style={{ color: '#64748b', fontSize: '10px', letterSpacing: '1px', marginBottom: '12px' }}>DOCUMENTS</p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {[
                    { key: 'ineFront', label: 'INE Front', required: true },
                    { key: 'ineBack', label: 'INE Back', required: true },
                    { key: 'businessLicense', label: 'License' },
                    { key: 'profilePhoto', label: 'Photo' }
                  ].map(doc => (
                    <div key={doc.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {documents[doc.key] ? <Check size={14} color="#cba658" /> : <X size={14} color={doc.required ? '#ef4444' : '#475569'} />}
                      <span style={{ fontSize: '12px', color: documents[doc.key] ? '#e2e8f0' : '#64748b' }}>{doc.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agreements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', cursor: 'pointer', padding: '16px', background: formData.agreeTerms ? 'rgba(203,166,88,0.1)' : '#1e293b', border: formData.agreeTerms ? '1px solid rgba(203,166,88,0.3)' : '1px solid #334155' }}>
                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} style={{ marginTop: '2px', accentColor: '#cba658' }} />
                <span style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6' }}>
                  I agree to the <span style={{ color: '#cba658' }}>Terms of Service</span> and <span style={{ color: '#cba658' }}>Privacy Policy</span>. All information provided is accurate and complete.
                </span>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', cursor: 'pointer', padding: '16px', background: formData.agreeBackground ? 'rgba(203,166,88,0.1)' : '#1e293b', border: formData.agreeBackground ? '1px solid rgba(203,166,88,0.3)' : '1px solid #334155' }}>
                <input type="checkbox" name="agreeBackground" checked={formData.agreeBackground} onChange={handleChange} style={{ marginTop: '2px', accentColor: '#cba658' }} />
                <span style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6' }}>
                  I authorize EnjoyBaja to verify my identity and credentials, including contacting my employer for reference.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #1e293b' }}>
          {step > 1 ? (
            <button type="button" onClick={prevStep} style={{
              padding: '14px 28px', background: 'transparent', border: '1px solid #334155',
              color: '#94a3b8', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <ChevronLeft size={16} /> Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button type="button" onClick={nextStep} style={{
              padding: '14px 32px', background: '#cba658', border: 'none',
              color: '#0f172a', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button type="submit" disabled={!formData.agreeTerms || !formData.agreeBackground} style={{
              padding: '14px 40px',
              background: (formData.agreeTerms && formData.agreeBackground) ? '#cba658' : '#334155',
              border: 'none',
              color: (formData.agreeTerms && formData.agreeBackground) ? '#0f172a' : '#64748b',
              fontSize: '13px', fontWeight: '600',
              cursor: (formData.agreeTerms && formData.agreeBackground) ? 'pointer' : 'not-allowed',
              letterSpacing: '1px'
            }}>
              SUBMIT APPLICATION
            </button>
          )}
        </div>

        {/* LEGAL DISCLOSURE */}
        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #1e293b' }}>
          <p style={{ fontSize: '8px', color: '#475569', lineHeight: '1.8', textAlign: 'justify' }}>
            <strong style={{ color: '#64748b' }}>LEGAL DISCLOSURE:</strong> By submitting this registration and uploading identification documents (INE, Passport, Government-issued ID), you consent to the following: Your personal information and identity documents are collected solely for verifying your identity, preventing fraudulent transactions, ensuring AML compliance, and establishing eligibility to operate as a registered agent. All documents are encrypted and stored securely per Mexican LFPDPPP law. Documents retained for active registration plus 7 years per Mexican financial regulations. Information may be shared with regulatory authorities or law enforcement when required by law. You have ARCO rights (access, rectify, cancel, oppose) - contact legal@enjoybaja.com. By clicking Submit, you certify all information is true and accurate. Submission of false documents is a criminal offense under Mexican law.
          </p>
        </div>
      </form>
    </div>
  );
}