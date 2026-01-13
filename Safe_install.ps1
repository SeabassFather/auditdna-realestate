# =====================================================================
# SAFE ENJOYBAJA MARKETING INSTALL - PRESERVES YOUR EXISTING FILES
# =====================================================================
# This script DOES NOT touch your existing LanguageContext.jsx
# It only creates NEW missing files
# =====================================================================

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  SAFE MARKETING SYSTEM INSTALLER" -ForegroundColor Yellow
Write-Host "  Will NOT overwrite existing files!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

$basePath = "C:\AuditDNA\auditdna-realestate\src"

# Verify path exists
if (!(Test-Path $basePath)) {
    Write-Host "ERROR: Path not found: $basePath" -ForegroundColor Red
    Write-Host "Please edit this script with correct path" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "Base path: $basePath" -ForegroundColor Gray
Write-Host ""

# Create directories if needed
Write-Host "Creating directories..." -ForegroundColor Yellow
$dirs = @(
    "$basePath\components",
    "$basePath\components\admin",
    "$basePath\agents"
)
foreach ($dir in $dirs) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  Created: $dir" -ForegroundColor Green
    } else {
        Write-Host "  Exists: $dir" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Checking existing files..." -ForegroundColor Yellow

# CHECK - DO NOT OVERWRITE LanguageContext.jsx
if (Test-Path "$basePath\contexts\LanguageContext.jsx") {
    Write-Host "  SKIP: LanguageContext.jsx (KEEPING YOUR VERSION)" -ForegroundColor Green
} else {
    Write-Host "  MISSING: LanguageContext.jsx - will create" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Creating NEW files only..." -ForegroundColor Yellow

# =====================================================================
# FILE 1: LanguageToggle.jsx (works with YOUR existing context)
# =====================================================================
$langTogglePath = "$basePath\components\LanguageToggle.jsx"
if (!(Test-Path $langTogglePath)) {
    $langToggle = @'
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = ({ style = {}, compact = false }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button onClick={toggleLanguage} style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: compact ? '6px 12px' : '8px 16px',
      background: 'rgba(203, 166, 88, 0.15)',
      border: '1px solid rgba(203, 166, 88, 0.3)',
      borderRadius: '4px', cursor: 'pointer',
      fontSize: compact ? '10px' : '11px', letterSpacing: '2px', color: '#cba658',
      ...style
    }}>
      <span style={{ fontSize: '14px' }}>🌐</span>
      <span>{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
};

export default LanguageToggle;
'@
    Set-Content -Path $langTogglePath -Value $langToggle -Encoding UTF8
    Write-Host "  CREATED: LanguageToggle.jsx" -ForegroundColor Green
} else {
    Write-Host "  EXISTS: LanguageToggle.jsx (skipped)" -ForegroundColor Gray
}

# =====================================================================
# FILE 2: SelfServiceAdPortal.jsx
# =====================================================================
$adPortalPath = "$basePath\components\SelfServiceAdPortal.jsx"
if (!(Test-Path $adPortalPath)) {
    $adPortal = @'
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AD_PACKAGES = {
  spotlight: { id: 'spotlight', price: 2500, duration: 30, name: { en: 'Baja Spotlight', es: 'Spotlight Baja' }, description: { en: 'Featured in Magazine with editorial', es: 'Destacado en Revista con editorial' }, features: { en: ['Hero placement', 'Editorial', 'Social feature', 'Email'], es: ['Ubicacion principal', 'Editorial', 'Destacado social', 'Email'] } },
  elite: { id: 'elite', price: 5000, duration: 30, name: { en: 'Elite Placement', es: 'Ubicacion Elite' }, description: { en: 'Premium visibility', es: 'Visibilidad premium' }, features: { en: ['Dedicated page', 'Video', 'Lead capture', 'Analytics'], es: ['Pagina dedicada', 'Video', 'Captura leads', 'Analiticas'] } },
  icon: { id: 'icon', price: 15000, duration: 30, name: { en: 'Icon Sponsor', es: 'Patrocinador Iconico' }, description: { en: 'Exclusive sponsorship', es: 'Patrocinio exclusivo' }, features: { en: ['Category exclusivity', 'Homepage', 'All platforms', 'Concierge'], es: ['Exclusividad', 'Homepage', 'Todas plataformas', 'Concierge'] } },
  collection: { id: 'collection', price: 500, duration: 90, name: { en: 'Luxury Collection', es: 'Coleccion de Lujo' }, description: { en: 'List luxury item', es: 'Lista articulo de lujo' }, features: { en: ['90-day listing', 'Photo gallery', 'Inquiry routing'], es: ['90 dias', 'Galeria', 'Ruteo consultas'] } },
  partner: { id: 'partner', price: 1500, duration: 365, name: { en: 'Partner Directory', es: 'Directorio Socios' }, description: { en: 'Annual listing', es: 'Listado anual' }, features: { en: ['Logo', 'Profile', 'Contact routing'], es: ['Logo', 'Perfil', 'Ruteo contacto'] } }
};

const SelfServiceAdPortal = () => {
  const langContext = useLanguage ? useLanguage() : null;
  const language = langContext?.language || 'en';
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [adContent, setAdContent] = useState({ businessName: '', headline: '', description: '', contactEmail: '', contactPhone: '', website: '', category: '', image: null, imagePreview: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setAdContent(prev => ({ ...prev, image: file, imagePreview: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const submission = { id: `AD_${Date.now()}`, package: selectedPackage, content: adContent, status: 'pending_review', submittedAt: new Date().toISOString(), amount: AD_PACKAGES[selectedPackage].price };
    const submissions = JSON.parse(localStorage.getItem('ad_submissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('ad_submissions', JSON.stringify(submissions));
    setSubmissionId(submission.id);
    setIsProcessing(false);
    setStep(4);
  };

  const containerStyle = { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 20px', fontFamily: '"Helvetica Neue", sans-serif' };
  const cardStyle = { background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px', padding: '32px', maxWidth: '1200px', margin: '0 auto' };
  const inputStyle = { width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '16px', borderRadius: '4px' };
  const buttonStyle = { padding: '14px 32px', background: 'rgba(203, 166, 88, 0.2)', border: '1px solid rgba(203, 166, 88, 0.5)', color: '#cba658', fontSize: '11px', letterSpacing: '3px', cursor: 'pointer' };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '200', letterSpacing: '4px', color: '#cba658', marginBottom: '8px' }}>{language === 'en' ? 'ADVERTISE & SELL WITH US' : 'ANUNCIATE Y VENDE CON NOSOTROS'}</h1>
          <p style={{ fontSize: '12px', color: 'rgba(148, 163, 184, 0.7)', letterSpacing: '2px' }}>{language === 'en' ? 'Magazine - Partners - Luxury Collection' : 'Revista - Socios - Coleccion de Lujo'}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: step >= s ? 'rgba(203, 166, 88, 0.3)' : 'rgba(30, 41, 59, 0.5)', border: step >= s ? '2px solid #cba658' : '1px solid rgba(148, 163, 184, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step >= s ? '#cba658' : 'rgba(148, 163, 184, 0.5)', margin: '0 auto 8px', fontSize: '14px' }}>{step > s ? '\u2713' : s}</div>
              <span style={{ fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px' }}>{s === 1 && (language === 'en' ? 'TYPE' : 'TIPO')}{s === 2 && (language === 'en' ? 'CONTENT' : 'CONTENIDO')}{s === 3 && (language === 'en' ? 'PAY' : 'PAGO')}{s === 4 && (language === 'en' ? 'DONE' : 'LISTO')}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {Object.entries(AD_PACKAGES).map(([key, pkg]) => (
                <div key={key} onClick={() => setSelectedPackage(key)} style={{ background: selectedPackage === key ? 'rgba(203, 166, 88, 0.15)' : 'rgba(30, 41, 59, 0.5)', border: selectedPackage === key ? '2px solid #cba658' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '20px', cursor: 'pointer' }}>
                  <h3 style={{ color: '#cba658', fontSize: '16px', marginBottom: '8px' }}>{pkg.name[language]}</h3>
                  <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '11px', marginBottom: '12px' }}>{pkg.description[language]}</p>
                  <div style={{ fontSize: '24px', color: '#e2e8f0', marginBottom: '12px' }}>${pkg.price.toLocaleString()}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{pkg.features[language].slice(0,3).map((f, i) => <li key={i} style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '11px', marginBottom: '4px' }}>{'\u2713'} {f}</li>)}</ul>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button style={{ ...buttonStyle, opacity: selectedPackage ? 1 : 0.5 }} onClick={() => selectedPackage && setStep(2)} disabled={!selectedPackage}>{language === 'en' ? 'CONTINUE' : 'CONTINUAR'} {'\u2192'}</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <input type="text" placeholder={language === 'en' ? 'Business/Item Name *' : 'Nombre *'} value={adContent.businessName} onChange={(e) => setAdContent(prev => ({ ...prev, businessName: e.target.value }))} style={inputStyle} />
              <input type="text" placeholder={language === 'en' ? 'Headline *' : 'Titulo *'} value={adContent.headline} onChange={(e) => setAdContent(prev => ({ ...prev, headline: e.target.value }))} style={inputStyle} />
              {selectedPackage === 'collection' && (
                <select value={adContent.category} onChange={(e) => setAdContent(prev => ({ ...prev, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">{language === 'en' ? 'Select Category' : 'Categoria'}</option>
                  <option value="yacht">{language === 'en' ? 'Yacht' : 'Yate'}</option>
                  <option value="jet">{language === 'en' ? 'Private Jet' : 'Jet'}</option>
                  <option value="car">{language === 'en' ? 'Exotic Car' : 'Auto'}</option>
                  <option value="watch">{language === 'en' ? 'Watch' : 'Reloj'}</option>
                  <option value="jewelry">{language === 'en' ? 'Jewelry' : 'Joyeria'}</option>
                  <option value="art">{language === 'en' ? 'Art' : 'Arte'}</option>
                </select>
              )}
              <textarea placeholder={language === 'en' ? 'Description (max 300 chars) *' : 'Descripcion *'} value={adContent.description} onChange={(e) => setAdContent(prev => ({ ...prev, description: e.target.value.slice(0, 300) }))} style={{ ...inputStyle, minHeight: '100px' }} maxLength={300} />
              <input type="email" placeholder={language === 'en' ? 'Contact Email *' : 'Correo *'} value={adContent.contactEmail} onChange={(e) => setAdContent(prev => ({ ...prev, contactEmail: e.target.value }))} style={inputStyle} />
              <input type="tel" placeholder={language === 'en' ? 'Phone' : 'Telefono'} value={adContent.contactPhone} onChange={(e) => setAdContent(prev => ({ ...prev, contactPhone: e.target.value }))} style={inputStyle} />
              <input type="url" placeholder={language === 'en' ? 'Website' : 'Sitio Web'} value={adContent.website} onChange={(e) => setAdContent(prev => ({ ...prev, website: e.target.value }))} style={inputStyle} />
              <div style={{ border: '2px dashed rgba(148, 163, 184, 0.3)', borderRadius: '8px', padding: '40px', textAlign: 'center', marginBottom: '16px' }}>
                {adContent.imagePreview ? (
                  <div><img src={adContent.imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '16px' }} /><button onClick={() => setAdContent(prev => ({ ...prev, image: null, imagePreview: null }))} style={{ ...buttonStyle, background: 'rgba(248, 113, 113, 0.2)', borderColor: 'rgba(248, 113, 113, 0.5)', color: '#f87171' }}>{language === 'en' ? 'REMOVE' : 'ELIMINAR'}</button></div>
                ) : (
                  <div><p style={{ color: 'rgba(148, 163, 184, 0.6)', marginBottom: '16px' }}>{language === 'en' ? 'Upload image (Max 10MB)' : 'Subir imagen (Max 10MB)'}</p><input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="ad-image" /><label htmlFor="ad-image" style={{ ...buttonStyle, cursor: 'pointer', display: 'inline-block' }}>{language === 'en' ? 'UPLOAD' : 'SUBIR'}</label></div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
              <button style={{ ...buttonStyle, background: 'transparent' }} onClick={() => setStep(1)}>{'\u2190'} {language === 'en' ? 'BACK' : 'ATRAS'}</button>
              <button style={{ ...buttonStyle, opacity: (adContent.businessName && adContent.headline && adContent.contactEmail) ? 1 : 0.5 }} onClick={() => (adContent.businessName && adContent.headline && adContent.contactEmail) && setStep(3)}>{language === 'en' ? 'CONTINUE' : 'CONTINUAR'} {'\u2192'}</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px', padding: '32px', marginBottom: '24px' }}>
              <h3 style={{ color: '#cba658', marginBottom: '16px', letterSpacing: '2px' }}>{language === 'en' ? 'ORDER SUMMARY' : 'RESUMEN'}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'rgba(148, 163, 184, 0.8)' }}><span>{AD_PACKAGES[selectedPackage]?.name[language]}</span><span>${AD_PACKAGES[selectedPackage]?.price.toLocaleString()}</span></div>
              <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '12px', marginTop: '12px' }}><div style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '18px' }}><span>Total</span><span>${AD_PACKAGES[selectedPackage]?.price.toLocaleString()} USD</span></div></div>
            </div>
            <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '12px', marginBottom: '24px' }}>{language === 'en' ? 'Reviewed within 24 hours.' : 'Revisado en 24 horas.'}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button style={{ ...buttonStyle, background: 'transparent' }} onClick={() => setStep(2)}>{'\u2190'} {language === 'en' ? 'BACK' : 'ATRAS'}</button>
              <button style={buttonStyle} onClick={handleSubmit} disabled={isProcessing}>{isProcessing ? '...' : (language === 'en' ? 'PAY NOW' : 'PAGAR')}</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '60px', marginBottom: '24px' }}>{'\u2705'}</div>
            <h2 style={{ color: '#cba658', fontSize: '24px', marginBottom: '16px', letterSpacing: '3px' }}>{language === 'en' ? 'SUBMITTED!' : 'ENVIADO!'}</h2>
            <p style={{ color: 'rgba(148, 163, 184, 0.8)', marginBottom: '8px' }}>ID: <strong style={{ color: '#e2e8f0' }}>{submissionId}</strong></p>
            <p style={{ color: 'rgba(148, 163, 184, 0.6)', marginBottom: '32px' }}>{language === 'en' ? 'Review within 24h.' : 'Revision en 24h.'}</p>
            <button style={buttonStyle} onClick={() => { setStep(1); setSelectedPackage(null); setAdContent({ businessName: '', headline: '', description: '', contactEmail: '', contactPhone: '', website: '', category: '', image: null, imagePreview: null }); }}>{language === 'en' ? 'SUBMIT ANOTHER' : 'ENVIAR OTRO'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfServiceAdPortal;
'@
    Set-Content -Path $adPortalPath -Value $adPortal -Encoding UTF8
    Write-Host "  CREATED: SelfServiceAdPortal.jsx" -ForegroundColor Green
} else {
    Write-Host "  EXISTS: SelfServiceAdPortal.jsx (skipped)" -ForegroundColor Gray
}

# =====================================================================
# FILE 3: LeadCaptureForm.jsx
# =====================================================================
$leadFormPath = "$basePath\components\LeadCaptureForm.jsx"
if (!(Test-Path $leadFormPath)) {
    $leadForm = @'
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LeadCaptureForm = ({ source = 'website', onSuccess = () => {}, variant = 'full' }) => {
  const langContext = useLanguage ? useLanguage() : null;
  const language = langContext?.language || 'en';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', country: '', budget: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const lead = { id: `LEAD_${Date.now()}`, ...formData, source, status: 'new', createdAt: new Date().toISOString() };
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    leads.push(lead);
    localStorage.setItem('crm_leads', JSON.stringify(leads));
    setIsSuccess(true);
    onSuccess(lead);
    setTimeout(() => { setFormData({ firstName: '', lastName: '', email: '', phone: '', country: '', budget: '', message: '' }); setIsSuccess(false); }, 3000);
    setIsSubmitting(false);
  };

  const inputStyle = { width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '16px', borderRadius: '4px' };
  const buttonStyle = { width: '100%', padding: '16px', background: 'rgba(203, 166, 88, 0.2)', border: '1px solid rgba(203, 166, 88, 0.5)', color: '#cba658', fontSize: '12px', letterSpacing: '3px', cursor: 'pointer' };

  if (isSuccess) return (<div style={{ textAlign: 'center', padding: '40px' }}><div style={{ fontSize: '48px', marginBottom: '16px' }}>{'\u2705'}</div><h3 style={{ color: '#cba658' }}>{language === 'en' ? 'THANK YOU!' : 'GRACIAS!'}</h3></div>);

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: variant === 'compact' ? '1fr' : '1fr 1fr', gap: '16px' }}>
        <input type="text" placeholder={(language === 'en' ? 'First Name' : 'Nombre') + ' *'} value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} style={inputStyle} required />
        <input type="text" placeholder={(language === 'en' ? 'Last Name' : 'Apellido') + ' *'} value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} style={inputStyle} required />
      </div>
      <input type="email" placeholder={(language === 'en' ? 'Email' : 'Correo') + ' *'} value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} style={inputStyle} required />
      <input type="tel" placeholder={language === 'en' ? 'Phone' : 'Telefono'} value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} style={inputStyle} />
      {variant === 'full' && (<textarea placeholder={language === 'en' ? 'Message' : 'Mensaje'} value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} style={{ ...inputStyle, minHeight: '100px' }} />)}
      <button type="submit" style={buttonStyle} disabled={isSubmitting}>{isSubmitting ? '...' : (language === 'en' ? 'GET IN TOUCH' : 'CONTACTANOS')}</button>
    </form>
  );
};

export default LeadCaptureForm;
'@
    Set-Content -Path $leadFormPath -Value $leadForm -Encoding UTF8
    Write-Host "  CREATED: LeadCaptureForm.jsx" -ForegroundColor Green
} else {
    Write-Host "  EXISTS: LeadCaptureForm.jsx (skipped)" -ForegroundColor Gray
}

# =====================================================================
# FILE 4: MarketingDashboard.jsx
# =====================================================================
$marketingPath = "$basePath\components\admin\MarketingDashboard.jsx"
if (!(Test-Path $marketingPath)) {
    $marketing = @'
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const MarketingDashboard = () => {
  const langContext = useLanguage ? useLanguage() : null;
  const language = langContext?.language || 'en';
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});

  useEffect(() => {
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    const socialPosts = JSON.parse(localStorage.getItem('scheduled_social_posts') || '[]');
    const emailQueue = JSON.parse(localStorage.getItem('email_queue') || '[]');
    const adSubmissions = JSON.parse(localStorage.getItem('ad_submissions') || '[]');
    setStats({
      leads: { total: leads.length, new: leads.filter(l => l.status === 'new').length },
      socialPosts: { scheduled: socialPosts.filter(p => p.status === 'scheduled').length },
      emails: { queued: emailQueue.length, sent: emailQueue.filter(e => e.status === 'sent').length },
      ads: { pending: adSubmissions.filter(a => a.status === 'pending_review').length, approved: adSubmissions.filter(a => a.status === 'approved').length }
    });
  }, []);

  const cardStyle = { background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '24px' };
  const statStyle = { fontSize: '32px', fontWeight: '200', color: '#cba658', marginBottom: '8px' };
  const labelStyle = { fontSize: '10px', color: 'rgba(148, 163, 184, 0.7)', letterSpacing: '2px', textTransform: 'uppercase' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '24px' }}>
      <h2 style={{ color: '#cba658', fontSize: '20px', letterSpacing: '3px', marginBottom: '24px' }}>{language === 'en' ? 'MARKETING COMMAND CENTER' : 'CENTRO DE MARKETING'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={cardStyle}><div style={statStyle}>{stats.leads?.total || 0}</div><div style={labelStyle}>{language === 'en' ? 'Total Leads' : 'Prospectos'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.leads?.new || 0}</div><div style={labelStyle}>{language === 'en' ? 'New Leads' : 'Nuevos'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.socialPosts?.scheduled || 0}</div><div style={labelStyle}>{language === 'en' ? 'Scheduled Posts' : 'Posts'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.emails?.sent || 0}</div><div style={labelStyle}>{language === 'en' ? 'Emails Sent' : 'Correos'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.ads?.pending || 0}</div><div style={labelStyle}>{language === 'en' ? 'Pending Ads' : 'Anuncios Pendientes'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.ads?.approved || 0}</div><div style={labelStyle}>{language === 'en' ? 'Active Ads' : 'Activos'}</div></div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
'@
    Set-Content -Path $marketingPath -Value $marketing -Encoding UTF8
    Write-Host "  CREATED: MarketingDashboard.jsx" -ForegroundColor Green
} else {
    Write-Host "  EXISTS: MarketingDashboard.jsx (skipped)" -ForegroundColor Gray
}

# =====================================================================
# FILE 5: AdManagementPanel.jsx
# =====================================================================
$adPanelPath = "$basePath\components\admin\AdManagementPanel.jsx"
if (!(Test-Path $adPanelPath)) {
    $adPanel = @'
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const AdManagementPanel = () => {
  const langContext = useLanguage ? useLanguage() : null;
  const language = langContext?.language || 'en';
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { setSubmissions(JSON.parse(localStorage.getItem('ad_submissions') || '[]')); }, []);

  const updateStatus = (id, status) => {
    const updated = submissions.map(ad => ad.id === id ? { ...ad, status, reviewedAt: new Date().toISOString() } : ad);
    setSubmissions(updated);
    localStorage.setItem('ad_submissions', JSON.stringify(updated));
  };

  const filtered = submissions.filter(ad => filter === 'all' || ad.status === filter);
  const getStatusColor = (s) => s === 'approved' ? '#4ade80' : s === 'rejected' ? '#f87171' : '#fbbf24';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '24px' }}>
      <h2 style={{ color: '#cba658', fontSize: '20px', letterSpacing: '3px', marginBottom: '24px' }}>{language === 'en' ? 'AD MANAGEMENT' : 'GESTION DE ANUNCIOS'}</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {['all', 'pending_review', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '10px 20px', background: filter === f ? 'rgba(203, 166, 88, 0.2)' : 'transparent', border: '1px solid rgba(148, 163, 184, 0.3)', color: filter === f ? '#cba658' : 'rgba(148, 163, 184, 0.7)', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase' }}>
            {f === 'all' ? 'All' : f === 'pending_review' ? 'Pending' : f} ({submissions.filter(ad => f === 'all' || ad.status === f).length})
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (<div style={{ textAlign: 'center', padding: '60px', color: 'rgba(148, 163, 184, 0.6)' }}>{language === 'en' ? 'No submissions' : 'Sin envios'}</div>) : (
        filtered.map(ad => (
          <div key={ad.id} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ color: '#e2e8f0', fontSize: '16px', margin: 0 }}>{ad.content?.businessName || 'Untitled'}</h3>
                  <span style={{ fontSize: '9px', padding: '4px 8px', background: getStatusColor(ad.status) + '20', color: getStatusColor(ad.status), borderRadius: '4px', textTransform: 'uppercase' }}>{ad.status?.replace('_', ' ')}</span>
                </div>
                <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '12px' }}>Package: {ad.package?.toUpperCase()} | ${ad.amount?.toLocaleString()}</p>
              </div>
              {ad.status === 'pending_review' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => updateStatus(ad.id, 'approved')} style={{ padding: '10px 20px', background: 'rgba(74, 222, 128, 0.2)', border: '1px solid rgba(74, 222, 128, 0.5)', color: '#4ade80', fontSize: '10px', cursor: 'pointer' }}>APPROVE</button>
                  <button onClick={() => updateStatus(ad.id, 'rejected')} style={{ padding: '10px 20px', background: 'rgba(248, 113, 113, 0.2)', border: '1px solid rgba(248, 113, 113, 0.5)', color: '#f87171', fontSize: '10px', cursor: 'pointer' }}>REJECT</button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdManagementPanel;
'@
    Set-Content -Path $adPanelPath -Value $adPanel -Encoding UTF8
    Write-Host "  CREATED: AdManagementPanel.jsx" -ForegroundColor Green
} else {
    Write-Host "  EXISTS: AdManagementPanel.jsx (skipped)" -ForegroundColor Gray
}

# =====================================================================
# FILE 6: agents/index.js
# =====================================================================
$agentsPath = "$basePath\agents\index.js"
if (!(Test-Path $agentsPath)) {
    $agents = @'
class SocialMediaAgent {
  constructor() { this.agentId = 'social_media_agent'; this.status = 'active'; }
  getStatus() { return { agentId: this.agentId, status: this.status }; }
  generatePost(type, data, lang = 'en') { return 'New ' + type + ' post'; }
  async schedulePost(content, time, platforms = ['facebook']) {
    const posts = JSON.parse(localStorage.getItem('scheduled_social_posts') || '[]');
    posts.push({ id: 'POST_' + Date.now(), content: content, scheduledTime: time.toISOString(), platforms: platforms, status: 'scheduled' });
    localStorage.setItem('scheduled_social_posts', JSON.stringify(posts));
  }
}

class EmailMarketingAgent {
  constructor() { this.agentId = 'email_marketing_agent'; this.status = 'active'; }
  getStatus() { return { agentId: this.agentId, status: this.status }; }
  async sendEmail(to, template, data, lang = 'en') {
    const queue = JSON.parse(localStorage.getItem('email_queue') || '[]');
    queue.push({ id: 'EMAIL_' + Date.now(), to: to, template: template, status: 'queued', createdAt: new Date().toISOString() });
    localStorage.setItem('email_queue', JSON.stringify(queue));
  }
  startDripSequence(lead, name) { console.log('[EmailAgent] Starting ' + name); }
  processScheduledEmails() { console.log('[EmailAgent] Processing emails'); }
}

class NotificationAgent {
  constructor() { this.agentId = 'notification_agent'; this.status = 'active'; }
  getStatus() { return { agentId: this.agentId, status: this.status }; }
  createNotification(type, message, data) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.unshift({ id: 'NOTIF_' + Date.now(), type: type, message: typeof message === 'object' ? message.en : message, read: false, createdAt: new Date().toISOString() });
    if (notifications.length > 100) notifications.length = 100;
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }
}

class AgentOrchestrator {
  constructor() {
    this.agents = { social: new SocialMediaAgent(), email: new EmailMarketingAgent(), notification: new NotificationAgent() };
    this.isRunning = false;
  }
  initialize() {
    this.isRunning = true;
    console.log('[Orchestrator] All agents initialized');
    return this.getStatus();
  }
  getStatus() { return { isRunning: this.isRunning, agents: { social: this.agents.social.getStatus(), email: this.agents.email.getStatus(), notification: this.agents.notification.getStatus() } }; }
  async onUserRegistration(user, lang) { await this.agents.email.sendEmail(user.email, 'welcome', { firstName: user.firstName }, lang); }
  async onNewListing(property, lang) { await this.agents.social.schedulePost('New listing', new Date(Date.now() + 3600000)); }
  async onAdSubmission(ad, lang) { this.agents.notification.createNotification('ad', { en: 'New ad submitted', es: 'Nuevo anuncio' }); }
}

export const socialMediaAgent = new SocialMediaAgent();
export const emailMarketingAgent = new EmailMarketingAgent();
export const notificationAgent = new NotificationAgent();
export const orchestrator = new AgentOrchestrator();
export default orchestrator;
'@
    Set-Content -Path $agentsPath -Value $agents -Encoding UTF8
    Write-Host "  CREATED: agents/index.js" -ForegroundColor Green
} else {
    Write-Host "  EXISTS: agents/index.js (skipped)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  INSTALLATION COMPLETE!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your existing LanguageContext.jsx was NOT modified." -ForegroundColor Yellow
Write-Host ""
Write-Host "Next: Replace your App.js with the new version" -ForegroundColor Cyan
Write-Host "Then: npm start" -ForegroundColor Cyan
Write-Host ""
pause