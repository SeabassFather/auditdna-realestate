import React, { useState } from 'react';
import Brain from '../services/Brain';
import { useNavigate } from 'react-router-dom';

export default function AgentRegistration() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('es');
  const [agentType, setAgentType] = useState('external'); // 'inhouse' | 'external'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    company: '',
    licenseNumber: '',
    yearsExperience: '',
    languages: 'both',
    ineNumber: '',
    rfc: '',
    // Banking (encrypted, internal use only)
    bankName: '',
    clabe: '',
    accountHolder: '',
    // Mexico address
    domicilio: '',
    colonia: '',
    municipio: '',
    estado: 'Baja California',
    cp: '',
    // Coverage
    territories: [],
    propertyTypes: []
  });
  const [ineFront, setIneFront] = useState(null);
  const [ineBack, setIneBack]   = useState(null);
  const [selfieIne, setSelfieIne] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState(null);

  // GLASS TEXT STYLE
  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)',
    textShadow: '0 1px 15px rgba(0,0,0,0.2)'
  };

  const handleFileUpload = (setter, e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000000) { setError(lang === 'es' ? 'El archivo debe ser menor a 5MB' : 'File must be under 5MB'); return; }
    setter({ file, url: URL.createObjectURL(file) });
    setError('');
  };

  const generateCredentials = (email) => {
    const password = 'Agent' + Math.floor(Math.random() * 10000) + '!';
    return { email, password };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ineFront || !ineBack) {
      setError(lang === 'es' ? 'Se requieren fotos del INE (frente y reverso)' : 'INE photos (front and back) are required');
      return;
    }
    if (!selfieIne) {
      setError(lang === 'es' ? 'Se requiere selfie con INE para verificación de identidad' : 'Selfie with INE required for identity verification');
      return;
    }
    if (formData.ineNumber.length < 13) {
      setError(lang === 'es' ? 'El número de INE debe tener al menos 13 caracteres' : 'INE number must be at least 13 characters');
      return;
    }

    setLoading(true);
    setError('');

    const agents = JSON.parse(localStorage.getItem('registered_agents') || '[]');
    
    if (agents.some(a => a.email === formData.email)) {
      setError('Agent already registered with this email or INE number');
      setLoading(false);
      return;
    }

    const creds = generateCredentials(formData.email);
    
    const newAgent = {
      ...formData,
      agentType,  // 'inhouse' | 'external'  — used for commission calculation (not shown to public)
      // Commission logic (backend only):
      // External: 2% platform fee
      // In-House 5-10% total: platform gets 5%, agent gets rest
      // In-House <5%: platform gets 2%
      ineFrontUrl:  ineFront.url,
      ineBackUrl:   ineBack.url,
      selfieIneUrl: selfieIne.url,
      credentials: creds,
      registeredAt: new Date().toISOString(),
      status: 'pending',
      activityLog: { loginCount: 0, lastLogin: null, propertiesUploaded: 0, membershipFeeOwed: false },
      id: 'agent-' + Date.now()
    };

    // ── POST to Brain backend (POST /api/agents/register) ──────
    const brainPayload = {
      ...newAgent,
      // Don't send base64 blobs to backend — send metadata only
      ineFrontUrl:  '[FILE_PENDING_UPLOAD]',
      ineBackUrl:   '[FILE_PENDING_UPLOAD]',
      selfieIneUrl: '[FILE_PENDING_UPLOAD]'
    };

    const brainResult = await Brain.registerAgent(brainPayload);

    // Also submit ID docs to verification route
    await Brain.submitVerification({
      agentEmail: formData.email,
      agentName: `${formData.firstName} ${formData.lastName}`,
      agentType,
      ineNumber: formData.ineNumber,
      submittedAt: new Date().toISOString(),
      status: 'pending_review'
    });

    // Always save locally too (works offline)
    agents.push(newAgent);
    localStorage.setItem('registered_agents', JSON.stringify(agents));

    if (brainResult) {
      console.log('[BRAIN] Agent registered in backend:', brainResult);
    }

    setSuccess(true);
    setCredentials(creds);
    setLoading(false);
  };

  // SUCCESS SCREEN
  if (success && credentials) {
    return (
      <div style={{ 
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        {/* VINEYARD BACKGROUND */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }} />

        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.8) 100%)',
          zIndex: 1
        }} />

        <div style={{ 
          position: 'relative',
          zIndex: 2,
          maxWidth: '550px', 
          width: '100%', 
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(148, 163, 184, 0.15)',
          padding: '50px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '2px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: 'rgba(16, 185, 129, 0.8)',
            fontSize: '24px'
          }}>
            ✓
          </div>
          
          <h2 style={{ 
            ...glassText,
            fontSize: '26px',
            fontWeight: '200',
            color: 'rgba(16, 185, 129, 0.9)',
            marginBottom: '12px',
            letterSpacing: '3px'
          }}>
            Registration Successful
          </h2>
          <p style={{ 
            ...glassText,
            fontSize: '12px',
            color: 'rgba(148, 163, 184, 0.7)',
            marginBottom: '32px',
            letterSpacing: '1px'
          }}>
            Your account is pending approval. Save your credentials below.
          </p>
          
          <div style={{ 
            background: 'rgba(203, 166, 88, 0.08)',
            border: '1px solid rgba(203, 166, 88, 0.2)',
            padding: '28px',
            marginBottom: '28px'
          }}>
            <h3 style={{ 
              ...glassText,
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(203, 166, 88, 0.8)',
              marginBottom: '20px'
            }}>
              Your Login Credentials
            </h3>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <div style={{ 
                ...glassText,
                fontSize: '10px',
                color: 'rgba(148, 163, 184, 0.6)',
                marginBottom: '6px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>Email</div>
              <div style={{ 
                ...glassText,
                fontSize: '14px',
                color: 'rgba(203, 213, 225, 0.9)',
                padding: '12px',
                background: 'rgba(30, 41, 59, 0.5)'
              }}>{credentials.email}</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ 
                ...glassText,
                fontSize: '10px',
                color: 'rgba(148, 163, 184, 0.6)',
                marginBottom: '6px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>Password</div>
              <div style={{ 
                ...glassText,
                fontSize: '14px',
                color: 'rgba(203, 213, 225, 0.9)',
                padding: '12px',
                background: 'rgba(30, 41, 59, 0.5)'
              }}>{credentials.password}</div>
            </div>
          </div>

          <div style={{ 
            padding: '16px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            marginBottom: '28px',
            textAlign: 'left'
          }}>
            <div style={{ 
              ...glassText,
              fontSize: '10px',
              letterSpacing: '2px',
              color: 'rgba(239, 68, 68, 0.8)',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              Important
            </div>
            <div style={{ 
              ...glassText,
              fontSize: '11px',
              color: 'rgba(203, 213, 225, 0.7)',
              lineHeight: '1.8'
            }}>
              Save these credentials immediately. Passwords cannot be reset. If you lose your password, you must re-register with your INE.
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            style={{ 
              padding: '14px 40px',
              background: 'rgba(203, 166, 88, 0.85)',
              color: '#1e293b',
              border: 'none',
              fontSize: '10px',
              fontWeight: '400',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // REGISTRATION FORM
  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
      padding: '40px 20px'
    }}>
      {/* VINEYARD BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.8) 100%)',
        zIndex: 1
      }} />

      <div style={{ 
        position: 'relative',
        zIndex: 2,
        maxWidth: '700px', 
        margin: '0 auto'
      }}>
        {/* HEADER */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '16px'}}>
            <button type="button" onClick={() => setLang(lang === 'en' ? 'es' : 'en')} style={{padding: '8px 20px', background: 'rgba(203,166,88,0.15)', border: '1px solid rgba(203,166,88,0.4)', color: '#cba658', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', letterSpacing: '1px'}}>
              {lang === 'en' ? '🌐 Español' : '🌐 English'}
            </button>
          </div>

          <h1 style={{ 
            ...glassText,
            fontSize: '32px',
            fontWeight: '100',
            color: 'rgba(203, 166, 88, 0.9)',
            marginBottom: '12px',
            letterSpacing: '6px',
            textTransform: 'uppercase'
          }}>
            {lang === 'es' ? 'Registro de Agente' : 'Agent Registration'}
          </h1>
          <p style={{ 
            ...glassText,
            fontSize: '12px',
            color: 'rgba(148, 163, 184, 0.7)',
            letterSpacing: '2px'
          }}>
            {lang === 'es' ? 'Regístrate para publicar propiedades — Se requiere verificación INE' : 'Register to list properties — INE verification required'}
          </p>

          {/* AGENT TYPE TOGGLE — Critical for commission calculation */}
          <div style={{marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center'}}>
            <button type="button" onClick={() => setAgentType('external')} style={{
              padding: '12px 28px', cursor: 'pointer', fontSize: '13px', letterSpacing: '2px',
              background: agentType === 'external' ? 'rgba(203,166,88,0.2)' : 'transparent',
              border: agentType === 'external' ? '1px solid rgba(203,166,88,0.6)' : '1px solid rgba(148,163,184,0.3)',
              color: agentType === 'external' ? '#cba658' : 'rgba(148,163,184,0.7)',
              fontFamily: '"Helvetica Neue", sans-serif', transition: 'all 0.2s'
            }}>
              {lang === 'es' ? 'Agente Externo' : 'External Agent'}
            </button>
            <button type="button" onClick={() => setAgentType('inhouse')} style={{
              padding: '12px 28px', cursor: 'pointer', fontSize: '13px', letterSpacing: '2px',
              background: agentType === 'inhouse' ? 'rgba(184,148,77,0.3)' : 'transparent',
              border: agentType === 'inhouse' ? '1px solid rgba(184,148,77,0.7)' : '1px solid rgba(148,163,184,0.3)',
              color: agentType === 'inhouse' ? '#b8944d' : 'rgba(148,163,184,0.7)',
              fontFamily: '"Helvetica Neue", sans-serif', transition: 'all 0.2s'
            }}>
              {lang === 'es' ? 'Agente In-House' : 'In-House Agent'}
            </button>
          </div>
          <p style={{...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.5)', marginTop: '8px', letterSpacing: '1px'}}>
            {lang === 'es'
              ? agentType === 'external' ? '2% tarifa de plataforma por marketing' : 'Comisión total In-House: 5-10% (plataforma: 5%)'
              : agentType === 'external' ? '2% platform marketing fee' : 'In-House total commission: 5-10% (platform: 5%)'}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div style={{ 
            padding: '14px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            marginBottom: '24px',
            fontSize: '12px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* CONTACT INFO CARD */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            padding: '36px',
            marginBottom: '24px'
          }}>
            <h3 style={{ 
              ...glassText,
              fontSize: '14px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(203, 166, 88, 0.8)',
              marginBottom: '28px'
            }}>
              {lang === 'es' ? 'Información de Contacto' : 'Contact Information'}
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                ...glassText,
                display: 'block',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'rgba(148, 163, 184, 0.7)'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: 'rgba(203, 213, 225, 0.9)',
                  fontSize: '14px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  ...glassText,
                  display: 'block',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  color: 'rgba(148, 163, 184, 0.7)'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    color: 'rgba(203, 213, 225, 0.9)',
                    fontSize: '14px',
                    fontFamily: '"Helvetica Neue", sans-serif'
                  }}
                />
              </div>

              <div>
                <label style={{
                  ...glassText,
                  display: 'block',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  color: 'rgba(148, 163, 184, 0.7)'
                }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    color: 'rgba(203, 213, 225, 0.9)',
                    fontSize: '14px',
                    fontFamily: '"Helvetica Neue", sans-serif'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                ...glassText,
                display: 'block',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'rgba(148, 163, 184, 0.7)'
              }}>
                Real Estate License Number *
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: 'rgba(203, 213, 225, 0.9)',
                  fontSize: '14px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}
              />
            </div>
          </div>

          {/* INE VERIFICATION CARD */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            padding: '36px',
            marginBottom: '24px'
          }}>
            <h3 style={{ 
              ...glassText,
              fontSize: '14px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(203, 166, 88, 0.8)',
              marginBottom: '28px'
            }}>
              INE Verification (Mexican ID)
            </h3>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                ...glassText,
                display: 'block',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'rgba(148, 163, 184, 0.7)'
              }}>
                INE Number (18 characters) *
              </label>
              <input
                type="text"
                value={formData.ineNumber}
                onChange={(e) => setFormData({ ...formData, ineNumber: e.target.value.toUpperCase() })}
                required
                maxLength="18"
                placeholder="ABCD123456EFGH7890"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: 'rgba(203, 213, 225, 0.9)',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  letterSpacing: '3px'
                }}
              />
              <div style={{ 
                ...glassText,
                fontSize: '10px',
                color: 'rgba(100, 116, 139, 0.6)',
                marginTop: '8px'
              }}>
                {formData.ineNumber.length}/18 characters
              </div>
            </div>

            <div>
              <label style={{
                ...glassText,
                display: 'block',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'rgba(148, 163, 184, 0.7)'
              }}>
                {lang === 'es' ? 'Verificación INE / Identificación Oficial *' : 'INE Verification / Official ID *'}
              </label>
              {/* INE FRONT */}
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(setIneFront, e)} style={{ display: 'none' }} id="ine-front" />
              <label htmlFor="ine-front" style={{ display: 'block', padding: '20px', background: ineFront ? 'rgba(203,166,88,0.08)' : 'rgba(30,41,59,0.3)', border: '1px dashed rgba(148,163,184,0.3)', textAlign: 'center', cursor: 'pointer', marginBottom: '8px' }}>
                {ineFront
                  ? <div><img src={ineFront.url} alt="INE Front" style={{ maxWidth: '100%', maxHeight: '120px', marginBottom: '6px' }} /><div style={{ ...glassText, fontSize: '10px', color: 'rgba(16,185,129,0.8)', letterSpacing: '1px' }}>{lang === 'es' ? '✓ FRENTE SUBIDO' : '✓ FRONT UPLOADED'}</div></div>
                  : <div style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.7)', letterSpacing: '1px' }}>{lang === 'es' ? 'INE — FRENTE *' : 'INE — FRONT *'}<br/><span style={{ fontSize: '9px', color: 'rgba(100,116,139,0.6)' }}>{lang === 'es' ? 'Haz clic para subir' : 'Click to upload'}</span></div>
                }
              </label>

              {/* INE BACK */}
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(setIneBack, e)} style={{ display: 'none' }} id="ine-back" />
              <label htmlFor="ine-back" style={{ display: 'block', padding: '20px', background: ineBack ? 'rgba(203,166,88,0.08)' : 'rgba(30,41,59,0.3)', border: '1px dashed rgba(148,163,184,0.3)', textAlign: 'center', cursor: 'pointer', marginBottom: '8px' }}>
                {ineBack
                  ? <div><img src={ineBack.url} alt="INE Back" style={{ maxWidth: '100%', maxHeight: '120px', marginBottom: '6px' }} /><div style={{ ...glassText, fontSize: '10px', color: 'rgba(16,185,129,0.8)', letterSpacing: '1px' }}>{lang === 'es' ? '✓ REVERSO SUBIDO' : '✓ BACK UPLOADED'}</div></div>
                  : <div style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.7)', letterSpacing: '1px' }}>{lang === 'es' ? 'INE — REVERSO *' : 'INE — BACK *'}<br/><span style={{ fontSize: '9px', color: 'rgba(100,116,139,0.6)' }}>{lang === 'es' ? 'Haz clic para subir' : 'Click to upload'}</span></div>
                }
              </label>

              {/* SELFIE WITH INE */}
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(setSelfieIne, e)} style={{ display: 'none' }} id="ine-selfie" />
              <label htmlFor="ine-selfie" style={{ display: 'block', padding: '20px', background: selfieIne ? 'rgba(203,166,88,0.08)' : 'rgba(30,41,59,0.3)', border: '1px dashed rgba(148,163,184,0.3)', textAlign: 'center', cursor: 'pointer' }}>
                {selfieIne
                  ? <div><img src={selfieIne.url} alt="Selfie INE" style={{ maxWidth: '100%', maxHeight: '120px', marginBottom: '6px' }} /><div style={{ ...glassText, fontSize: '10px', color: 'rgba(16,185,129,0.8)', letterSpacing: '1px' }}>{lang === 'es' ? '✓ SELFIE SUBIDA' : '✓ SELFIE UPLOADED'}</div></div>
                  : <div style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.7)', letterSpacing: '1px' }}>{lang === 'es' ? 'SELFIE CON INE *' : 'SELFIE WITH INE *'}<br/><span style={{ fontSize: '9px', color: 'rgba(100,116,139,0.6)' }}>{lang === 'es' ? 'Para verificación de identidad' : 'For identity verification'}</span></div>
                }
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? 'rgba(148, 163, 184, 0.3)' : 'rgba(203, 166, 88, 0.85)',
              color: loading ? 'rgba(148, 163, 184, 0.6)' : '#1e293b',
              border: 'none',
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif',
              transition: 'all 0.3s'
            }}
          >
            {loading ? (lang === 'es' ? 'Registrando...' : 'Registering...') : (lang === 'es' ? 'Registrarme como Agente' : 'Register as Agent')}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            style={{ 
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(203, 166, 88, 0.8)',
              fontSize: '11px',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            {lang === 'es' ? '¿Ya estás registrado? Iniciar sesión' : 'Already registered? Login'}
          </button>
        </div>

        {/* BACK TO HOME */}
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{ 
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(100, 116, 139, 0.6)',
              fontSize: '10px',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}