import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertySearch from '../components/PropertySearch';

// ================================================================
// FSBO LISTING FLOW - For Sale By Owner
// Commission: 2% under $250K, 3% over $250K
// ================================================================
function FSBOListingFlow({ language, navigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ address: '', city: '', state: 'Baja California', price: '', type: 'house', beds: '', baths: '', sqft: '', description: '', sellerName: '', sellerEmail: '', sellerPhone: '', sellerID: '' });
  const [photos, setPhotos] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const price = parseFloat(form.price) || 0;
  const platformRate = price > 250000 ? 3 : 2;
  const platformFee = price * (platformRate / 100);

  const inputStyle = { padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px', width: '100%', boxSizing: 'border-box', outline: 'none' };
  const labelStyle = { color: '#94a3b8', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotos(prev => [...prev, ev.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (!accepted) { alert('You must accept the commission terms'); return; }
    if (!form.address || !form.price || !form.sellerName || !form.sellerEmail) { alert('Fill all required fields'); return; }
    if (photos.length < 3) { alert('Minimum 3 photos required'); return; }

    const listing = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price),
      photos,
      type: 'fsbo',
      status: 'pending_review',
      platformRate,
      platformFee,
      commissionAccepted: true,
      commissionAcceptedAt: new Date().toISOString(),
      commissionIP: 'client',
      uploadedBy: 'fsbo-seller',
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('fsbo_properties') || '[]');
    existing.push(listing);
    localStorage.setItem('fsbo_properties', JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
        <h3 style={{ color: '#4ade80', fontSize: '20px', marginBottom: '12px' }}>
          {language === 'english' ? 'Listing Submitted for Review!' : '¡Listado Enviado para Revisión!'}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '400px', margin: '0 auto', lineHeight: '1.8' }}>
          {language === 'english'
            ? 'Our team will review your property within 24-48 hours. You will receive an email confirmation at ' + form.sellerEmail
            : 'Nuestro equipo revisará su propiedad en 24-48 horas. Recibirá una confirmación por correo a ' + form.sellerEmail}
        </p>
        <p style={{ color: '#cba658', fontSize: '12px', marginTop: '16px' }}>
          {language === 'english' ? 'Reference #: FSBO-' + Date.now() : 'Referencia #: FSBO-' + Date.now()}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', background: s <= step ? '#cba658' : '#1e293b', transition: 'all 0.3s' }} />
        ))}
      </div>

      {/* STEP 1: Property Details */}
      {step === 1 && (
        <div>
          <h4 style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '16px' }}>
            {language === 'english' ? 'Step 1: Property Details' : 'Paso 1: Detalles de la Propiedad'}
          </h4>
          <div style={{ display: 'grid', gap: '16px', maxWidth: '600px' }}>
            <div><label style={labelStyle}>{language === 'english' ? 'Property Address *' : 'Dirección *'}</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} style={inputStyle} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><label style={labelStyle}>{language === 'english' ? 'City *' : 'Ciudad *'}</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={inputStyle} /></div>
              <div><label style={labelStyle}>{language === 'english' ? 'State' : 'Estado'}</label><select value={form.state} onChange={e => setForm({...form, state: e.target.value})} style={inputStyle}><option>Baja California</option><option>Baja California Sur</option><option>Sonora</option><option>Jalisco</option><option>Quintana Roo</option><option>Nayarit</option><option>Other</option></select></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><label style={labelStyle}>{language === 'english' ? 'Asking Price USD *' : 'Precio USD *'}</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} style={inputStyle} /></div>
              <div><label style={labelStyle}>{language === 'english' ? 'Property Type' : 'Tipo'}</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={inputStyle}><option value="house">House / Casa</option><option value="condo">Condo</option><option value="villa">Villa</option><option value="land">Land / Terreno</option><option value="commercial">Commercial</option></select></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div><label style={labelStyle}>Beds</label><input type="number" value={form.beds} onChange={e => setForm({...form, beds: e.target.value})} style={inputStyle} /></div>
              <div><label style={labelStyle}>Baths</label><input type="number" value={form.baths} onChange={e => setForm({...form, baths: e.target.value})} style={inputStyle} /></div>
              <div><label style={labelStyle}>Sqft / m²</label><input type="number" value={form.sqft} onChange={e => setForm({...form, sqft: e.target.value})} style={inputStyle} /></div>
            </div>
            <div><label style={labelStyle}>{language === 'english' ? 'Description' : 'Descripción'}</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></div>
            <button onClick={() => { if (!form.address || !form.price) { alert('Address and Price required'); return; } setStep(2); }} style={{ padding: '14px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
              {language === 'english' ? 'Next: Upload Photos →' : 'Siguiente: Subir Fotos →'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Photos */}
      {step === 2 && (
        <div>
          <h4 style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '16px' }}>
            {language === 'english' ? 'Step 2: Property Photos (min 3, max 20)' : 'Paso 2: Fotos de la Propiedad (mín 3, máx 20)'}
          </h4>
          <div style={{ border: '2px dashed #8b7332', borderRadius: '12px', padding: '40px', textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}>
            <label style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📷</div>
              <p style={{ color: '#cba658', fontSize: '14px', fontWeight: '600' }}>{language === 'english' ? 'Click to upload photos' : 'Clic para subir fotos'}</p>
              <p style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>JPG, PNG — Max 10MB each</p>
              <input type="file" multiple accept="image/*" onChange={handlePhotos} style={{ display: 'none' }} />
            </label>
          </div>
          {photos.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {photos.map((p, i) => (
                <div key={i} style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #334155' }} />
                  <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', fontSize: '12px', cursor: 'pointer' }}>×</button>
                </div>
              ))}
            </div>
          )}
          <p style={{ color: photos.length >= 3 ? '#4ade80' : '#f87171', fontSize: '12px', marginBottom: '16px' }}>{photos.length}/20 photos uploaded {photos.length < 3 ? '(minimum 3 required)' : '✓'}</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(1)} style={{ padding: '14px 24px', background: '#000000', border: '1px solid #475569', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer' }}>← Back</button>
            <button onClick={() => { if (photos.length < 3) { alert('Minimum 3 photos'); return; } setStep(3); }} style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer', flex: 1 }}>
              {language === 'english' ? 'Next: Your Info →' : 'Siguiente: Su Información →'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Seller Info */}
      {step === 3 && (
        <div>
          <h4 style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '16px' }}>
            {language === 'english' ? 'Step 3: Seller Information' : 'Paso 3: Información del Vendedor'}
          </h4>
          <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
            <div><label style={labelStyle}>{language === 'english' ? 'Full Name *' : 'Nombre Completo *'}</label><input value={form.sellerName} onChange={e => setForm({...form, sellerName: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>Email *</label><input type="email" value={form.sellerEmail} onChange={e => setForm({...form, sellerEmail: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>{language === 'english' ? 'Phone *' : 'Teléfono *'}</label><input value={form.sellerPhone} onChange={e => setForm({...form, sellerPhone: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>{language === 'english' ? 'Government ID # (INE / Passport)' : '# Identificación (INE / Pasaporte)'}</label><input value={form.sellerID} onChange={e => setForm({...form, sellerID: e.target.value})} style={inputStyle} /></div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setStep(2)} style={{ padding: '14px 24px', background: '#000000', border: '1px solid #475569', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer' }}>← Back</button>
              <button onClick={() => { if (!form.sellerName || !form.sellerEmail) { alert('Name and email required'); return; } setStep(4); }} style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer', flex: 1 }}>
                {language === 'english' ? 'Next: Review & Accept Terms →' : 'Siguiente: Revisar y Aceptar Términos →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Commission Disclosure + Accept */}
      {step === 4 && (
        <div>
          <h4 style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '16px' }}>
            {language === 'english' ? 'Step 4: Commission Terms & Submission' : 'Paso 4: Términos de Comisión y Envío'}
          </h4>

          {/* Property Summary */}
          <div style={{ background: '#000000', border: '1px solid #334155', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <h5 style={{ color: '#cba658', fontSize: '12px', letterSpacing: '2px', marginBottom: '12px' }}>PROPERTY SUMMARY</h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
              <div>Address: <strong style={{ color: '#e2e8f0' }}>{form.address}, {form.city}</strong></div>
              <div>Price: <strong style={{ color: '#4ade80' }}>${price.toLocaleString()} USD</strong></div>
              <div>Type: <strong style={{ color: '#e2e8f0' }}>{form.type}</strong></div>
              <div>Photos: <strong style={{ color: '#e2e8f0' }}>{photos.length}</strong></div>
              <div>Seller: <strong style={{ color: '#e2e8f0' }}>{form.sellerName}</strong></div>
              <div>Email: <strong style={{ color: '#e2e8f0' }}>{form.sellerEmail}</strong></div>
            </div>
          </div>

          {/* COMMISSION DISCLOSURE */}
          <div style={{ background: '#000000', border: '2px solid #8b7332', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
            <h5 style={{ color: '#cba658', fontSize: '14px', letterSpacing: '1px', marginBottom: '16px' }}>
              {language === 'english' ? 'COMMISSION DISCLOSURE / DIVULGACIÓN DE COMISIÓN' : 'DIVULGACIÓN DE COMISIÓN / COMMISSION DISCLOSURE'}
            </h5>
            <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '2' }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>EnjoyBaja Platform Fee / Tarifa de Plataforma:</strong>
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li>Sales under $250,000 USD: <strong style={{ color: '#4ade80' }}>2%</strong> platform commission</li>
                <li>Sales over $250,000 USD: <strong style={{ color: '#cba658' }}>3%</strong> platform commission</li>
              </ul>
              <div style={{ background: '#000000', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #334155' }}>
                <p style={{ color: '#94a3b8', fontSize: '11px', letterSpacing: '1px', marginBottom: '8px' }}>YOUR PROPERTY</p>
                <p style={{ fontSize: '16px' }}>
                  Asking Price: <strong style={{ color: '#4ade80' }}>${price.toLocaleString()} USD</strong>
                </p>
                <p style={{ fontSize: '16px' }}>
                  Platform Rate: <strong style={{ color: '#cba658' }}>{platformRate}%</strong>
                </p>
                <p style={{ fontSize: '16px' }}>
                  Platform Fee at Closing: <strong style={{ color: '#f87171' }}>${platformFee.toLocaleString()} USD</strong>
                </p>
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.8' }}>
                {language === 'english'
                  ? 'By accepting these terms, you acknowledge that EnjoyBaja will charge the above commission upon successful closing of the sale. This fee is separate from any agent commission. Commission is earned when the property closes escrow. This agreement is governed by the laws of Mexico and the State of Baja California.'
                  : 'Al aceptar estos términos, usted reconoce que EnjoyBaja cobrará la comisión indicada al cierre exitoso de la venta. Esta tarifa es separada de cualquier comisión de agente. La comisión se devenga cuando la propiedad cierra el fideicomiso. Este acuerdo se rige por las leyes de México y el Estado de Baja California.'}
              </p>
              <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.8', marginTop: '8px' }}>
                Contact: info@enjoybaja.com | WhatsApp: +52-646-340-2686
              </p>
            </div>

            {/* ACCEPTANCE CHECKBOX */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', marginTop: '16px' }}>
              <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} style={{ accentColor: '#cba658', marginTop: '3px', width: '18px', height: '18px' }} />
              <span style={{ color: '#e2e8f0', fontSize: '13px', lineHeight: '1.6' }}>
                {language === 'english'
                  ? `I, ${form.sellerName || '[Seller Name]'}, accept the EnjoyBaja platform commission of ${platformRate}% ($${platformFee.toLocaleString()} USD) on the sale of my property at ${form.address || '[Address]'}. I understand this fee is due at closing and is separate from any agent commission.`
                  : `Yo, ${form.sellerName || '[Nombre]'}, acepto la comisión de plataforma EnjoyBaja del ${platformRate}% ($${platformFee.toLocaleString()} USD) en la venta de mi propiedad en ${form.address || '[Dirección]'}. Entiendo que esta tarifa se paga al cierre y es separada de cualquier comisión de agente.`}
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(3)} style={{ padding: '14px 24px', background: '#000000', border: '1px solid #475569', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer' }}>← Back</button>
            <button onClick={handleSubmit} disabled={!accepted} style={{ padding: '14px 24px', background: accepted ? '#22c55e' : '#000000', border: 'none', borderRadius: '8px', color: accepted ? '#0f172a' : '#64748b', fontWeight: '700', cursor: accepted ? 'pointer' : 'not-allowed', flex: 1, fontSize: '15px' }}>
              {language === 'english' ? 'Accept Terms & Submit Listing' : 'Aceptar Términos y Enviar Listado'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MexicoRealEstate() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // NEW TEAM - 3 Members
  const teamMembers = [
    {
      name: "Saul Garcia",
      title: "CEO & Lead Mortgage Specialist",
      subtitle: "NMLS #337526",
      specialties: ["Cross-Border Financing", "USDA 502 Rural", "Fideicomiso Expert"],
      description: "31+ years in finance and lending. Bilingual Spanish-English. Specialized in USA-Mexico cross-border real estate transactions.",
      photo: "/images/team/SG.png"
    },
    {
      name: "Osvaldo Gutierrez",
      title: "Marketing & Business Development (VP)",
      subtitle: "",
      specialties: ["Strategic Growth", "Brand Development", "Market Expansion"],
      description: "Driving business growth and brand presence across USA-Mexico markets. Expert in cross-border marketing strategies.",
      photo: "/images/team/Ozzy.png"
    },
    {
      name: "Saul Castro",
      title: "Public Relations Specialist",
      subtitle: "",
      specialties: ["Media Relations", "Communications", "Public Outreach"],
      description: "Managing company communications and media relations. Building strong relationships with partners and clients.",
      photo: "/images/team/Saul-Tocayo.png"
    }
  ];

  const sections = [
    { id: 'search', title: 'Search for Properties', icon: '🔍' },
    { id: 'buyer', title: 'Buyer Inquiry / Express Interest', icon: '📝' },
    { id: 'upload', title: 'List Your Property', icon: '📤' },
    { id: 'refi', title: 'Mexico Home Refinance / Buy in Mexico', icon: '🏦' },
    { id: 'partner', title: 'Referral Partner Registration', icon: '🤝' },
    { id: 'agent', title: 'Agent Registration', icon: '💼' },
    { id: 'appraisal', title: 'Appraisal Services', icon: '📋' },
    { id: 'legal', title: 'Legal/Fideicomiso Questionnaire', icon: '⚖️' },
    { id: 'team', title: 'Meet the Team', icon: '👥' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      {/* Header */}
      <div style={{ padding: '40px 20px 20px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: '800', 
          color: '#fff',
          marginBottom: '8px'
        }}>
          🏠 Mexico Real Estate
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '24px' }}>
          Bienes Raíces en México • Full Service Platform
        </p>
        
        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'english' ? 'spanish' : 'english')}
          style={{
            padding: '10px 24px',
            background: '#000000',
            border: '1px solid #cba658',
            borderRadius: '8px',
            color: '#cba658',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '32px'
          }}
        >
          🌐 {language === 'english' ? 'Español' : 'English'}
        </button>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button
            onClick={() => navigate('/usa-mortgage')}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #cba658, #b8944d)',
              border: 'none',
              borderRadius: '8px',
              color: '#0f172a',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🇺🇸 USA Mortgage Loans
          </button>
          <button
            onClick={() => navigate('/developments')}
            style={{
              padding: '14px 28px',
              background: '#000000',
              border: '1px solid #cba658',
              borderRadius: '8px',
              color: '#cba658',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🏗️ Developments
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '14px 28px',
              background: '#000000',
              border: '1px solid #64748b',
              borderRadius: '8px',
              color: '#94a3b8',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔐 Agent Login
          </button>
        </div>
      </div>

      {/* Accordion Sections */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 40px' }}>
        {sections.map((section) => (
          <div 
            key={section.id}
            style={{
              background: '#000000',
              border: '1px solid rgba(203, 166, 88, 0.2)',
              borderRadius: '12px',
              marginBottom: '12px',
              overflow: 'hidden'
            }}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                width: '100%',
                padding: '20px 24px',
                background: expandedSection === section.id ? '#0a0800' : '#000000',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#94a3b8'
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: '600' }}>
                {section.icon} {section.title}
              </span>
              <span style={{ 
                fontSize: '20px',
                transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
                color: '#cba658'
              }}>
                ▼
              </span>
            </button>

            {/* Accordion Content */}
            {expandedSection === section.id && (
              <div style={{ padding: '24px', borderTop: '1px solid rgba(203, 166, 88, 0.2)' }}>
                
                {/* Search Section */}
                {section.id === 'search' && (
                  <PropertySearch language={language} />
                )}

                {/* Buyer Inquiry */}
                {section.id === 'buyer' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english' 
                        ? 'Express your interest in Mexico properties. Our team will contact you within 24 hours.'
                        : 'Exprese su interés en propiedades en México. Nuestro equipo le contactará en 24 horas.'}
                    </p>
                    <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Full Name' : 'Nombre Completo'} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <input placeholder="Email" type="email" style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <select style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }}>
                        <option>{language === 'english' ? 'Budget Range' : 'Rango de Presupuesto'}</option>
                        <option>$100K - $250K</option>
                        <option>$250K - $500K</option>
                        <option>$500K - $1M</option>
                        <option>$1M+</option>
                      </select>
                      <textarea placeholder={language === 'english' ? 'Tell us about your ideal property...' : 'Cuéntenos sobre su propiedad ideal...'} rows={4} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px', resize: 'vertical' }} />
                      <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                        {language === 'english' ? 'Submit Inquiry' : 'Enviar Solicitud'}
                      </button>
                    </div>
                  </div>
                )}

                {/* List Your Property - FSBO */}
                {section.id === 'upload' && (
                  <FSBOListingFlow language={language} navigate={navigate} />
                )}

                {/* Mexico Refinance */}
                {section.id === 'refi' && (
                  <div>
                    <div style={{ background: '#000000', border: '1px solid #8b7332', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#cba658', marginBottom: '12px', fontSize: '18px' }}>🇺🇸 US Citizens Only - Mexico Property Financing</h4>
                      <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '20px' }}>
                        <li>Minimum Property Value: <strong style={{ color: '#cba658' }}>$385,000 USD</strong></li>
                        <li>Down Payment: <strong style={{ color: '#cba658' }}>35-45%</strong></li>
                        <li>Loan Terms: 15-30 years</li>
                        <li>Competitive rates for qualified buyers</li>
                        <li>Fideicomiso (Bank Trust) structure</li>
                      </ul>
                    </div>
                    <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                      {language === 'english' ? 'Get Pre-Qualified' : 'Pre-Calificar'}
                    </button>
                  </div>
                )}

                {/* Referral Partner */}
                {section.id === 'partner' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english'
                        ? 'Join our referral network. Earn commissions on successful transactions.'
                        : 'Únase a nuestra red de referidos. Gane comisiones en transacciones exitosas.'}
                    </p>
                    <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Full Name' : 'Nombre Completo'} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <input placeholder="Email" type="email" style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Company (Optional)' : 'Empresa (Opcional)'} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                        {language === 'english' ? 'Register as Partner' : 'Registrarse como Socio'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Agent Registration */}
                {section.id === 'agent' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english'
                        ? 'Licensed agents - join our network to list properties and earn commissions.'
                        : 'Agentes con licencia - únase a nuestra red para listar propiedades y ganar comisiones.'}
                    </p>
                    <div style={{ background: '#000000', border: '1px solid #8b7332', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#cba658', marginBottom: '16px', fontSize: '16px' }}>
                        {language === 'english' ? 'Agent Requirements' : 'Requisitos para Agentes'}
                      </h4>
                      <ul style={{ color: '#94a3b8', lineHeight: '2', paddingLeft: '20px', fontSize: '14px' }}>
                        <li>{language === 'english' ? 'Valid government-issued ID (INE, Passport, or License)' : 'Identificación oficial vigente (INE, Pasaporte o Licencia)'}</li>
                        <li>{language === 'english' ? 'Live selfie holding your ID for verification' : 'Selfie en vivo sosteniendo su ID para verificación'}</li>
                        <li>{language === 'english' ? 'Real estate license number (if applicable)' : 'Número de licencia inmobiliaria (si aplica)'}</li>
                        <li>{language === 'english' ? 'RFC / Tax ID (Mexico agents)' : 'RFC (agentes en México)'}</li>
                      </ul>
                    </div>
                    <div style={{ background: '#000000', border: '1px solid #334155', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '12px' }}>
                        {language === 'english' ? 'Commission Structure' : 'Estructura de Comisiones'}
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.8' }}>
                        {language === 'english'
                          ? 'EnjoyBaja platform fee: 2% on sales under $250,000 USD, 3% on sales above $250,000 USD. Agents set their own commission on top of the platform fee. Full commission details provided during the approval process.'
                          : 'Comisión de plataforma EnjoyBaja: 2% en ventas menores a $250,000 USD, 3% en ventas mayores a $250,000 USD. Los agentes establecen su propia comisión además de la tarifa de plataforma.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => navigate('/register')}
                      style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
                      {language === 'english' ? 'Start Agent Registration →' : 'Iniciar Registro de Agente →'}
                    </button>
                  </div>
                )}

                {/* Appraisal Services */}
                {section.id === 'appraisal' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english'
                        ? 'Professional property appraisal services for Mexico real estate.'
                        : 'Servicios profesionales de avalúo para bienes raíces en México.'}
                    </p>
                    <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Property Address' : 'Dirección de la Propiedad'} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Your Name' : 'Su Nombre'} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <input placeholder="Email" type="email" style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={{ padding: '14px', background: '#000000', border: '1px solid #8b7332', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }} />
                      <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                        {language === 'english' ? 'Request Appraisal' : 'Solicitar Avalúo'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Legal / Fideicomiso */}
                {section.id === 'legal' && (
                  <div>
                    <div style={{ background: '#000000', border: '1px solid #8b7332', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#cba658', marginBottom: '12px', fontSize: '18px' }}>⚖️ Fideicomiso (Bank Trust) Information</h4>
                      <p style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                        {language === 'english'
                          ? 'Foreign nationals can own property in Mexico\'s restricted zone (within 50km of coast or 100km of border) through a Fideicomiso - a bank trust that grants full ownership rights for 50 years, renewable indefinitely.'
                          : 'Los extranjeros pueden ser propietarios en la zona restringida de México (dentro de 50km de la costa o 100km de la frontera) a través de un Fideicomiso - un fideicomiso bancario que otorga derechos de propiedad completos por 50 años, renovable indefinidamente.'}
                      </p>
                    </div>
                    <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                      {language === 'english' ? 'Start Legal Questionnaire' : 'Iniciar Cuestionario Legal'}
                    </button>
                  </div>
                )}

                {/* TEAM SECTION */}
                {section.id === 'team' && (
                  <div>
                    <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '32px', fontSize: '16px' }}>
                      {language === 'english'
                        ? 'Our expert team specializes in USA-Mexico cross-border real estate transactions'
                        : 'Nuestro equipo experto se especializa en transacciones inmobiliarias transfronterizas USA-México'}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                      {teamMembers.map((member, index) => (
                        <div 
                          key={index}
                          style={{
                            background: '#000000',
                            border: '1px solid #8b7332',
                            borderRadius: '16px',
                            padding: '32px 24px',
                            textAlign: 'center'
                          }}
                        >
                          {/* Photo */}
                          <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            margin: '0 auto 20px',
                            border: '4px solid #cba658',
                            boxShadow: '0 8px 24px rgba(203, 166, 88, 0.3)'
                          }}>
                            <img 
                              src={member.photo} 
                              alt={member.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center'
                              }}
                            />
                          </div>

                          {/* Name */}
                          <h4 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                            {member.name}
                          </h4>

                          {/* Title */}
                          <p style={{ color: '#cba658', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                            {member.title}
                          </p>

                          {/* Subtitle (NMLS etc) */}
                          {member.subtitle && (
                            <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '16px' }}>
                              {member.subtitle}
                            </p>
                          )}

                          {/* Specialties */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px', marginTop: member.subtitle ? '0' : '16px' }}>
                            {member.specialties.map((spec, i) => (
                              <span 
                                key={i}
                                style={{
                                  padding: '4px 12px',
                                  background: '#000000',
                                  border: '1px solid #8b7332',
                                  borderRadius: '20px',
                                  color: '#cba658',
                                  fontSize: '11px',
                                  fontWeight: '500'
                                }}
                              >
                                {spec}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                            {member.description}
                          </p>

                          {/* Contact Button */}
                          <a
                            href="https://wa.me/526463402686"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              padding: '12px 28px',
                              background: 'linear-gradient(135deg, #cba658, #b8944d)',
                              borderRadius: '8px',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: '700',
                              textDecoration: 'none'
                            }}
                          >
                            Contact {member.name.split(' ')[0]}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        background: '#000000',
        borderTop: '1px solid rgba(203, 166, 88, 0.2)',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#cba658', fontSize: '20px', marginBottom: '16px' }}>Contact Info</h3>
        <p style={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>Saul Garcia</p>
        <p style={{ color: '#cba658', fontSize: '16px', fontWeight: '700' }}>NMLS #337526</p>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Everwise Home Loans & Realty</p>
        <p style={{ color: '#64748b', fontSize: '13px' }}>Company NMLS #1739012 | DRE #02067255</p>
        <p style={{ color: '#64748b', fontSize: '13px' }}>15615 Alton Pkwy, Suite 450, Irvine, CA 92618</p>
        <p style={{ color: '#64748b', fontSize: '13px' }}>Phone: 1-844-853-9300</p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
          <a 
            href="https://wa.me/526463402686"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 32px',
              background: '#25D366',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            📱 WhatsApp
          </a>
          <a 
            href="mailto:info@enjoybaja.com"
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #cba658, #b8944d)',
              borderRadius: '8px',
              color: '#0f172a',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ✉️ Email
          </a>
        </div>
      </div>
    </div>
  );
}