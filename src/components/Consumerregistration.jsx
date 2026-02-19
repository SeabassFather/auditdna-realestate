// CONSUMER REGISTRATION CARD - STEP 0 (BEFORE Lock Screen!)
// Bilingual: EN/ES | Updated: 2026
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConsumerRegistration({ onRegistrationComplete }) {
  const [lang, setLang] = useState('en');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    state: 'CA',
    zip: '',
    referralSource: '',
    partnerCode: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const states = ['CA', 'TX', 'FL', 'NY', 'AZ', 'NV', 'WA', 'OR', 'CO', 'UT'];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Name required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (formData.phone.length < 10) newErrors.phone = 'Valid phone required';
    if (!formData.propertyAddress.trim()) newErrors.propertyAddress = 'Address required';
    if (!formData.zip.match(/^\d{5}$/)) newErrors.zip = '5-digit ZIP required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Must agree to terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // API call to register consumer
      const response = await fetch('/api/consumers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Registration successful
        alert(`Account created! Check ${formData.email} for your login credentials.`);
        onRegistrationComplete(data.credentials);
      } else {
        setErrors({ submit: data.error });
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)'
  };

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
        maxWidth: '600px',
        width: '100%',
        border: '1px solid rgba(148, 163, 184, 0.2)'
      }}>
        <div style={{textAlign: 'right', marginBottom: '16px'}}>
          <button type="button" onClick={() => setLang(lang === 'en' ? 'es' : 'en')} style={{padding: '8px 20px', background: 'rgba(203,166,88,0.15)', border: '1px solid rgba(203,166,88,0.4)', color: '#cba658', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', letterSpacing: '1px'}}>
            {lang === 'en' ? '🌐 Español' : '🌐 English'}
          </button>
        </div>
        <h1 style={{
          ...glassText,
          fontSize: '32px',
          fontWeight: '300',
          color: '#cba658',
          marginBottom: '8px',
          letterSpacing: '2px',
          textAlign: 'center'
        }}>
          {lang === 'es' ? 'Regístrate en AuditDNA' : 'Register for AuditDNA'}
        </h1>
        <p style={{
          ...glassText,
          fontSize: '14px',
          color: '#94a3b8',
          letterSpacing: '1px',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          {lang === 'es' ? 'Servicio de Recuperación Financiera Hipotecaria USA' : 'US Mortgage Financial Recovery Service'}
        </p>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
            {lang === 'es' ? 'NOMBRE COMPLETO *' : 'FULL NAME *'}
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: errors.fullName ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '6px',
              color: '#e2e8f0',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.fullName && <p style={{ ...glassText, fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.fullName}</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
              {lang === 'es' ? 'CORREO ELECTRÓNICO *' : 'EMAIL *'}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: errors.email ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && <p style={{ ...glassText, fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.email}</p>}
          </div>

          <div>
            <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
              {lang === 'es' ? 'TELÉFONO *' : 'PHONE *'}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: errors.phone ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.phone && <p style={{ ...glassText, fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.phone}</p>}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
            {lang === 'es' ? 'DOMICILIO DE LA PROPIEDAD *' : 'PROPERTY ADDRESS *'}
          </label>
          <input
            type="text"
            value={formData.propertyAddress}
            onChange={(e) => handleChange('propertyAddress', e.target.value)}
            placeholder={lang === 'es' ? 'Ej: 123 Calle Principal' : '123 Main Street'}
            style={{
              width: '100%',
              padding: '14px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: errors.propertyAddress ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '6px',
              color: '#e2e8f0',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: '12px'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder={lang === 'es' ? 'Ciudad' : 'City'}
              style={{
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            
            <select
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              style={{
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              {states.map(st => <option key={st} value={st}>{st}</option>)}
            </select>

            <input
              type="text"
              value={formData.zip}
              onChange={(e) => handleChange('zip', e.target.value)}
              placeholder={lang === 'es' ? 'ZIP / CP' : 'ZIP'}
              maxLength={5}
              style={{
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: errors.zip ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          {errors.propertyAddress && <p style={{ ...glassText, fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.propertyAddress}</p>}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>
            {lang === 'es' ? '¿CÓMO NOS CONOCISTE?' : 'HOW DID YOU HEAR ABOUT US?'}
          </label>
          {(lang === 'es'
            ? ['Búsqueda Google', 'Referido de Socio', 'Redes Sociales', 'Amigo/Familiar']
            : ['Google Search', 'Partner Referral', 'Social Media', 'Friend/Family']
          ).map(source => (
            <label key={source} style={{ display: 'flex', gap: '12px', marginBottom: '10px', cursor: 'pointer', alignItems: 'center' }}>
              <input
                type="radio"
                name="referralSource"
                value={source}
                checked={formData.referralSource === source}
                onChange={(e) => handleChange('referralSource', e.target.value)}
                style={{ width: '16px', height: '16px' }}
              />
              <span style={{ ...glassText, fontSize: '13px' }}>{source}</span>
            </label>
          ))}
        </div>

        {formData.referralSource === 'Partner Referral' && (
          <div style={{ marginBottom: '24px' }}>
            <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
              {lang === 'es' ? 'CÓDIGO DE REFERIDO' : 'PARTNER REFERRAL CODE'}
            </label>
            <input
              type="text"
              value={formData.partnerCode}
              onChange={(e) => handleChange('partnerCode', e.target.value.toUpperCase())}
              placeholder="AGENT-12345"
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start' }}>
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
              style={{ marginTop: '4px', width: '16px', height: '16px' }}
            />
            <span style={{ ...glassText, fontSize: '12px', lineHeight: '1.6' }}>
              {lang === 'es' ? 'Acepto los Términos de Servicio y la Política de Privacidad. Autorizo a AuditDNA a auditar mis documentos hipotecarios.' : 'I agree to the Terms of Service and Privacy Policy. I authorize AuditDNA to audit my mortgage documents.'}
            </span>
          </label>
          {errors.agreeToTerms && <p style={{ ...glassText, fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.agreeToTerms}</p>}
        </div>

        {errors.submit && (
          <p style={{ ...glassText, fontSize: '12px', color: '#ef4444', textAlign: 'center', marginBottom: '16px' }}>
            {errors.submit}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '16px',
            background: isSubmitting ? 'rgba(148, 163, 184, 0.2)' : 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
            border: 'none',
            borderRadius: '6px',
            color: isSubmitting ? '#64748b' : '#0f172a',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '2px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'CREATING ACCOUNT...' : lang === 'es' ? 'CREAR CUENTA' : 'CREATE ACCOUNT'}
        </button>

        <p style={{ ...glassText, fontSize: '12px', textAlign: 'center', marginTop: '24px', color: '#64748b' }}>
          {lang === 'es' ? '¿Ya tienes cuenta?' : 'Already have an account?'} <span style={{ color: '#cba658', cursor: 'pointer' }}>{lang === 'es' ? 'Iniciar Sesión' : 'Sign In'}</span>
        </p>
      </div>
    </div>
  );
}

export default ConsumerRegistration;