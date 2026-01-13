import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AD_PACKAGES = {
  spotlight: { id: 'spotlight', price: 2500, name: { en: 'Baja Spotlight', es: 'Spotlight Baja' }, features: { en: ['Hero placement', 'Editorial', 'Social feature'], es: ['Ubicacion principal', 'Editorial', 'Destacado social'] } },
  elite: { id: 'elite', price: 5000, name: { en: 'Elite Placement', es: 'Ubicacion Elite' }, features: { en: ['Dedicated page', 'Video', 'Lead capture'], es: ['Pagina dedicada', 'Video', 'Captura leads'] } },
  icon: { id: 'icon', price: 15000, name: { en: 'Icon Sponsor', es: 'Patrocinador Iconico' }, features: { en: ['Category exclusivity', 'Homepage', 'Concierge'], es: ['Exclusividad', 'Homepage', 'Concierge'] } },
  collection: { id: 'collection', price: 500, name: { en: 'Luxury Collection', es: 'Coleccion de Lujo' }, features: { en: ['90-day listing', 'Photo gallery'], es: ['90 dias', 'Galeria'] } },
  partner: { id: 'partner', price: 1500, name: { en: 'Partner Directory', es: 'Directorio Socios' }, features: { en: ['Logo', 'Profile', 'Contact routing'], es: ['Logo', 'Perfil', 'Ruteo'] } }
};

const SelfServiceAdPortal = () => {
  const langContext = typeof useLanguage === 'function' ? useLanguage() : null;
  const language = langContext?.language || 'en';
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [adContent, setAdContent] = useState({ businessName: '', headline: '', description: '', contactEmail: '', contactPhone: '', website: '', category: '', imagePreview: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setAdContent(prev => ({ ...prev, imagePreview: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const submission = { id: 'AD_' + Date.now(), package: selectedPackage, content: adContent, status: 'pending_review', submittedAt: new Date().toISOString(), amount: AD_PACKAGES[selectedPackage].price };
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
          <h1 style={{ fontSize: '28px', fontWeight: '200', letterSpacing: '4px', color: '#cba658', marginBottom: '8px' }}>{language === 'en' ? 'ADVERTISE WITH US' : 'ANUNCIATE CON NOSOTROS'}</h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: step >= s ? 'rgba(203, 166, 88, 0.3)' : 'rgba(30, 41, 59, 0.5)', border: step >= s ? '2px solid #cba658' : '1px solid rgba(148, 163, 184, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step >= s ? '#cba658' : 'rgba(148, 163, 184, 0.5)', margin: '0 auto 8px', fontSize: '14px' }}>{step > s ? '✓' : s}</div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {Object.entries(AD_PACKAGES).map(([key, pkg]) => (
                <div key={key} onClick={() => setSelectedPackage(key)} style={{ background: selectedPackage === key ? 'rgba(203, 166, 88, 0.15)' : 'rgba(30, 41, 59, 0.5)', border: selectedPackage === key ? '2px solid #cba658' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '20px', cursor: 'pointer' }}>
                  <h3 style={{ color: '#cba658', fontSize: '16px', marginBottom: '8px' }}>{pkg.name[language]}</h3>
                  <div style={{ fontSize: '24px', color: '#e2e8f0', marginBottom: '12px' }}>${pkg.price.toLocaleString()}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{pkg.features[language].map((f, i) => <li key={i} style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '11px', marginBottom: '4px' }}>✓ {f}</li>)}</ul>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button style={{ ...buttonStyle, opacity: selectedPackage ? 1 : 0.5 }} onClick={() => selectedPackage && setStep(2)} disabled={!selectedPackage}>{language === 'en' ? 'CONTINUE' : 'CONTINUAR'} →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <input type="text" placeholder={language === 'en' ? 'Business Name *' : 'Nombre *'} value={adContent.businessName} onChange={(e) => setAdContent(prev => ({ ...prev, businessName: e.target.value }))} style={inputStyle} />
              <input type="text" placeholder={language === 'en' ? 'Headline *' : 'Titulo *'} value={adContent.headline} onChange={(e) => setAdContent(prev => ({ ...prev, headline: e.target.value }))} style={inputStyle} />
              <textarea placeholder={language === 'en' ? 'Description *' : 'Descripcion *'} value={adContent.description} onChange={(e) => setAdContent(prev => ({ ...prev, description: e.target.value.slice(0, 300) }))} style={{ ...inputStyle, minHeight: '100px' }} maxLength={300} />
              <input type="email" placeholder={language === 'en' ? 'Email *' : 'Correo *'} value={adContent.contactEmail} onChange={(e) => setAdContent(prev => ({ ...prev, contactEmail: e.target.value }))} style={inputStyle} />
              <input type="tel" placeholder={language === 'en' ? 'Phone' : 'Telefono'} value={adContent.contactPhone} onChange={(e) => setAdContent(prev => ({ ...prev, contactPhone: e.target.value }))} style={inputStyle} />
              <div style={{ border: '2px dashed rgba(148, 163, 184, 0.3)', borderRadius: '8px', padding: '40px', textAlign: 'center', marginBottom: '16px' }}>
                {adContent.imagePreview ? (
                  <div><img src={adContent.imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '16px' }} /><button onClick={() => setAdContent(prev => ({ ...prev, imagePreview: null }))} style={{ ...buttonStyle, background: 'rgba(248, 113, 113, 0.2)', borderColor: 'rgba(248, 113, 113, 0.5)', color: '#f87171' }}>REMOVE</button></div>
                ) : (
                  <div><p style={{ color: 'rgba(148, 163, 184, 0.6)', marginBottom: '16px' }}>{language === 'en' ? 'Upload image' : 'Subir imagen'}</p><input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="ad-image" /><label htmlFor="ad-image" style={{ ...buttonStyle, cursor: 'pointer', display: 'inline-block' }}>UPLOAD</label></div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
              <button style={{ ...buttonStyle, background: 'transparent' }} onClick={() => setStep(1)}>← BACK</button>
              <button style={{ ...buttonStyle, opacity: (adContent.businessName && adContent.headline && adContent.contactEmail) ? 1 : 0.5 }} onClick={() => (adContent.businessName && adContent.headline && adContent.contactEmail) && setStep(3)}>CONTINUE →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px', padding: '32px', marginBottom: '24px' }}>
              <h3 style={{ color: '#cba658', marginBottom: '16px' }}>ORDER SUMMARY</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '18px' }}><span>Total</span><span>${AD_PACKAGES[selectedPackage]?.price.toLocaleString()} USD</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button style={{ ...buttonStyle, background: 'transparent' }} onClick={() => setStep(2)}>← BACK</button>
              <button style={buttonStyle} onClick={handleSubmit} disabled={isProcessing}>{isProcessing ? 'PROCESSING...' : 'PAY NOW'}</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '60px', marginBottom: '24px' }}>✅</div>
            <h2 style={{ color: '#cba658', fontSize: '24px', marginBottom: '16px' }}>SUBMITTED!</h2>
            <p style={{ color: 'rgba(148, 163, 184, 0.8)', marginBottom: '8px' }}>ID: <strong style={{ color: '#e2e8f0' }}>{submissionId}</strong></p>
            <button style={buttonStyle} onClick={() => { setStep(1); setSelectedPackage(null); setAdContent({ businessName: '', headline: '', description: '', contactEmail: '', contactPhone: '', website: '', category: '', imagePreview: null }); }}>SUBMIT ANOTHER</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfServiceAdPortal;