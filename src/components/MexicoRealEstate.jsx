import React, { useState, useEffect } from 'react';
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

  const inputStyle = { padding: '12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', color: '#cbd5e1', fontSize: '13px', width: '100%', boxSizing: 'border-box', outline: 'none', letterSpacing: '0.5px' };
  const labelStyle = { color: '#94a3b8', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: '300' };

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
      id: Date.now(), ...form, price: parseFloat(form.price), photos, type: 'fsbo',
      status: 'pending_review', platformRate, platformFee, commissionAccepted: true,
      commissionAcceptedAt: new Date().toISOString(), commissionIP: 'client',
      uploadedBy: 'fsbo-seller', createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('enjoybaja_listings') || '[]');
    existing.push(listing);
    localStorage.setItem('enjoybaja_listings', JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px', color: '#cba658' }}>✓</div>
        <h3 style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '300', letterSpacing: '2px', marginBottom: '8px' }}>PROPERTY SUBMITTED FOR REVIEW</h3>
        <p style={{ color: '#94a3b8', fontSize: '13px', letterSpacing: '0.5px' }}>Our team will review your listing within 24-48 hours.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {[1,2,3,4].map(s => (
          <div key={s} style={{ flex: 1, height: '2px', background: s <= step ? '#cba658' : 'rgba(148, 163, 184, 0.2)', transition: 'all 0.3s' }} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h4 style={{ color: '#e2e8f0', fontSize: '13px', marginBottom: '16px', letterSpacing: '2px', fontWeight: '300' }}>STEP 1: PROPERTY DETAILS</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>ADDRESS *</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} style={inputStyle} placeholder="123 Ocean Blvd" /></div>
            <div><label style={labelStyle}>CITY *</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={inputStyle} placeholder="Ensenada" /></div>
            <div><label style={labelStyle}>STATE</label><input value={form.state} onChange={e => setForm({...form, state: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>ASKING PRICE (USD) *</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} style={inputStyle} placeholder="500000" /></div>
            <div><label style={labelStyle}>BEDROOMS</label><input type="number" value={form.beds} onChange={e => setForm({...form, beds: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>BATHROOMS</label><input type="number" value={form.baths} onChange={e => setForm({...form, baths: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>SQUARE FEET</label><input type="number" value={form.sqft} onChange={e => setForm({...form, sqft: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>PROPERTY TYPE</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={{...inputStyle, cursor: 'pointer'}}>
                <option value="house">House</option><option value="condo">Condo</option><option value="land">Land</option><option value="commercial">Commercial</option><option value="villa">Villa</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}><label style={labelStyle}>DESCRIPTION</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{...inputStyle, height: '80px', resize: 'vertical'}} placeholder="Describe the property..." /></div>
          <button onClick={() => { if (!form.address || !form.price) { alert('Address and Price required'); return; } setStep(2); }} style={{ padding: '12px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer', fontSize: '12px', width: '100%', letterSpacing: '2px' }}>
            CONTINUE TO PHOTOS
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h4 style={{ color: '#e2e8f0', fontSize: '13px', marginBottom: '16px', letterSpacing: '2px', fontWeight: '300' }}>STEP 2: PROPERTY PHOTOS (MIN 3, MAX 20)</h4>
          <label style={{ display: 'block', padding: '30px', border: '1px dashed rgba(203, 166, 88, 0.4)', textAlign: 'center', cursor: 'pointer', marginBottom: '16px' }}>
            <input type="file" multiple accept="image/*" onChange={handlePhotos} style={{ display: 'none' }} />
            <p style={{ color: '#cba658', fontSize: '12px', letterSpacing: '1px' }}>CLICK TO UPLOAD PHOTOS ({photos.length}/20)</p>
          </label>
          {photos.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {photos.map((p, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', cursor: 'pointer', lineHeight: '18px', textAlign: 'center' }}>×</button>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(1)} style={{ padding: '12px 20px', background: 'rgba(148, 163, 184, 0.15)', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#94a3b8', cursor: 'pointer', fontSize: '11px', letterSpacing: '1px' }}>BACK</button>
            <button onClick={() => { if (photos.length < 3) { alert('Minimum 3 photos'); return; } setStep(3); }} style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer', flex: 1, fontSize: '12px', letterSpacing: '2px' }}>
              CONTINUE TO SELLER INFO
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h4 style={{ color: '#e2e8f0', fontSize: '13px', marginBottom: '16px', letterSpacing: '2px', fontWeight: '300' }}>STEP 3: SELLER INFORMATION</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>FULL NAME *</label><input value={form.sellerName} onChange={e => setForm({...form, sellerName: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>EMAIL *</label><input type="email" value={form.sellerEmail} onChange={e => setForm({...form, sellerEmail: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>PHONE</label><input value={form.sellerPhone} onChange={e => setForm({...form, sellerPhone: e.target.value})} style={inputStyle} /></div>
            <div><label style={labelStyle}>GOVERNMENT ID</label><input value={form.sellerID} onChange={e => setForm({...form, sellerID: e.target.value})} style={inputStyle} placeholder="INE / Passport" /></div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(2)} style={{ padding: '12px 20px', background: 'rgba(148, 163, 184, 0.15)', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#94a3b8', cursor: 'pointer', fontSize: '11px', letterSpacing: '1px' }}>BACK</button>
            <button onClick={() => { if (!form.sellerName || !form.sellerEmail) { alert('Name and email required'); return; } setStep(4); }} style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer', flex: 1, fontSize: '12px', letterSpacing: '2px' }}>
              REVIEW & ACCEPT TERMS
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h4 style={{ color: '#e2e8f0', fontSize: '13px', marginBottom: '16px', letterSpacing: '2px', fontWeight: '300' }}>STEP 4: COMMISSION AGREEMENT & SUBMIT</h4>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.15)', padding: '20px', marginBottom: '20px' }}>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', letterSpacing: '0.5px' }}>Property: {form.address}, {form.city}</p>
            <p style={{ color: '#e2e8f0', fontSize: '18px', fontWeight: '300', letterSpacing: '1px' }}>Asking Price: ${price.toLocaleString()} USD</p>
            <p style={{ color: '#cba658', fontSize: '13px', marginTop: '8px', letterSpacing: '0.5px' }}>Platform Commission: {platformRate}% = ${platformFee.toLocaleString()} USD</p>
          </div>
          <div style={{ background: 'rgba(203, 166, 88, 0.06)', border: '1px solid rgba(203, 166, 88, 0.3)', padding: '24px', marginBottom: '20px' }}>
            <h5 style={{ color: '#cba658', fontSize: '11px', letterSpacing: '2px', marginBottom: '12px', fontWeight: '400' }}>COMMISSION DISCLOSURE</h5>
            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '16px', marginBottom: '16px', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.8', letterSpacing: '0.3px' }}>
                By listing this property on EnjoyBaja.com, I agree to pay a platform commission of <strong style={{ color: '#cba658' }}>{platformRate}%</strong> of the final sale price upon closing.
                Commission rates: 2% for properties under $250,000 USD | 3% for properties $250,000 USD and above.
                Commission is due at closing and will be deducted from proceeds. EnjoyBaja.com will market the property, coordinate showings, and facilitate the transaction.
                This agreement is binding upon submission. Cancellation requires 30-day written notice. Properties under active offer cannot be withdrawn.
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#cba658' }} />
              <span style={{ color: '#e2e8f0', fontSize: '13px', letterSpacing: '0.5px' }}>I accept the commission terms and conditions</span>
            </label>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(3)} style={{ padding: '12px 20px', background: 'rgba(148, 163, 184, 0.15)', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#94a3b8', cursor: 'pointer', fontSize: '11px', letterSpacing: '1px' }}>BACK</button>
            <button onClick={handleSubmit} disabled={!accepted} style={{ padding: '12px 20px', background: accepted ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'rgba(148, 163, 184, 0.2)', border: 'none', color: accepted ? '#0f172a' : '#64748b', fontWeight: '600', cursor: accepted ? 'pointer' : 'not-allowed', flex: 1, fontSize: '12px', letterSpacing: '2px' }}>
              SUBMIT LISTING FOR REVIEW
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// MAIN COMPONENT - SLEEK LUXURY DESIGN (JAN 10 ORIGINAL)
// ================================================================
export default function MexicoRealEstate() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  const [expandedSection, setExpandedSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // ════════════════════════════════════════
  // 5 TEAM MEMBERS - BRENDA REMOVED
  // ════════════════════════════════════════
  const teamMembers = [
    {
      name: "Saul Garcia",
      title: "FINANCE & LENDING SPECIALIST",
      subtitle: "NMLS #337526",
      specialties: ["Cross-Border Financing", "USDA 502 Rural", "Fideicomiso Expert"],
      description: "31+ years in finance and lending. Bilingual Spanish-English. Specialized in USA-Mexico cross-border real estate transactions.",
      photo: "/images/team/SG.png",
      phone: "+52 646 340 2686",
      email: "saul@auditdna.com"
    },
    {
      name: "Ariel Bolio",
      title: "COMPANY ATTORNEY",
      subtitle: "Licensed Attorney - Baja California",
      specialties: ["Real Estate Law", "Contract Negotiation", "Title Verification"],
      description: "Expert legal counsel for cross-border real estate transactions. Ensures all deals comply with Mexican property law and protects client interests.",
      photo: "/images/team/ariel-bolio.png",
      phone: "+52 646 340 2686",
      email: "legal@auditdna.com"
    },
    {
      name: "Gibran Lyle",
      title: "REAL ESTATE & TEAM DEVELOPMENT",
      subtitle: "Licensed Agent - Ensenada, Baja California",
      specialties: ["Coastal Properties", "Valle de Guadalupe", "Team Leadership"],
      description: "Expert in Baja California coastal and wine country real estate. Leading team development and agent training across the region.",
      photo: "/images/team/gibran-lyle.png",
      phone: "+52 646 340 2686",
      email: "gibran@auditdna.com"
    },
    {
      name: "Osvaldo Gutierrez",
      title: "TEAM DEVELOPMENT & REAL ESTATE",
      subtitle: "VP Marketing & Business Development",
      specialties: ["Strategic Growth", "Brand Development", "Market Expansion"],
      description: "Driving business growth and brand presence across USA-Mexico markets. Expert in cross-border marketing strategies.",
      photo: "/images/team/Ozzy.png",
      phone: "+52 646 340 2686",
      email: "osvaldo@auditdna.com"
    },
    {
      name: "Saul Castro",
      title: "PUBLIC RELATIONS SPECIALIST",
      subtitle: "Communications & Media",
      specialties: ["Media Relations", "Communications", "Public Outreach"],
      description: "Managing company communications and media relations. Building strong relationships with partners and clients.",
      photo: "/images/team/Saul-Tocayo.png",
      phone: "+52 646 340 2686",
      email: "scastro@auditdna.com"
    }
  ];

  // ════════════════════════════════════════
  // 9 ACCORDION SECTIONS - NO EMOJIS
  // ════════════════════════════════════════
  const sections = [
    { id: 'search', title: 'Search for Properties' },
    { id: 'buyer', title: 'Buyer Inquiry / Express Interest' },
    { id: 'upload', title: 'List Your Property' },
    { id: 'refi', title: 'Mexico Home Refinance / Buy in Mexico' },
    { id: 'partner', title: 'Referral Partner Registration' },
    { id: 'agent', title: 'Agent Registration' },
    { id: 'appraisal', title: 'Appraisal Services' },
    { id: 'legal', title: 'Legal / Fideicomiso Questionnaire' },
    { id: 'team', title: 'Meet the Team' }
  ];

  // ════════════════════════════════════════
  // SHARED INPUT STYLE - NO ROUND EDGES
  // ════════════════════════════════════════
  const fieldStyle = { padding: '12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.25)', color: '#cbd5e1', fontSize: '13px', letterSpacing: '0.5px', outline: 'none', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      {/* ═══════════════════════════════════════
          DIVER IN YELLOW BACKGROUND - ORIGINAL FROM GIT
          ═══════════════════════════════════════ */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=90")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed', zIndex: 0
      }} />
      {/* LIGHTER OVERLAY - BACKGROUND VISIBLE */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.7) 100%)', zIndex: 1
      }} />

      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: isMobile ? '30px 16px 40px' : '40px 20px 40px' }}>

        {/* HEADER - SLEEK THIN TYPOGRAPHY */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: '200', color: '#f1f5f9', letterSpacing: '4px', marginBottom: '6px', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            MEXICO REAL ESTATE
          </h1>
          <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '11px', letterSpacing: '3px', marginBottom: '20px', fontWeight: '300' }}>
            BIENES RAÍCES EN MÉXICO • FULL SERVICE PLATFORM
          </p>

          {/* Language Toggle - SMALL */}
          <button onClick={() => setLanguage(language === 'english' ? 'spanish' : 'english')} style={{
            padding: '6px 16px', background: 'rgba(203, 166, 88, 0.12)', border: '1px solid rgba(203, 166, 88, 0.25)',
            color: '#cba658', fontWeight: '400', cursor: 'pointer', fontSize: '10px', letterSpacing: '2px', marginBottom: '16px'
          }}>
            {language === 'english' ? 'ESPAÑOL' : 'ENGLISH'}
          </button>

          {/* Nav Buttons - SMALL, TOP RIGHT FEEL, NO ROUND */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/usa-mortgage')} style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer', fontSize: '10px', letterSpacing: '1.5px' }}>
              USA MORTGAGE LOANS
            </button>
            <button onClick={() => navigate('/developments')} style={{ padding: '8px 18px', background: 'rgba(203, 166, 88, 0.12)', border: '1px solid rgba(203, 166, 88, 0.25)', color: '#cba658', fontWeight: '500', cursor: 'pointer', fontSize: '10px', letterSpacing: '1.5px' }}>
              DEVELOPMENTS
            </button>
            <button onClick={() => navigate('/login')} style={{ padding: '8px 18px', background: 'rgba(100, 116, 139, 0.15)', border: '1px solid rgba(100, 116, 139, 0.25)', color: '#cbd5e1', fontWeight: '500', cursor: 'pointer', fontSize: '10px', letterSpacing: '1.5px' }}>
              AGENT LOGIN
            </button>
          </div>
        </div>

        {/* ═══ ACCORDION SECTIONS - SHARP EDGES ═══ */}
        {sections.map((section) => (
          <div key={section.id} style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(203, 166, 88, 0.15)', marginBottom: '8px', overflow: 'hidden', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            {/* Accordion Header */}
            <button onClick={() => toggleSection(section.id)} style={{
              width: '100%', padding: '16px 20px', background: expandedSection === section.id ? 'rgba(203, 166, 88, 0.08)' : 'transparent',
              border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: '#cbd5e1'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '300', letterSpacing: '1.5px', color: expandedSection === section.id ? '#cba658' : '#cbd5e1' }}>
                {section.title}
              </span>
              <span style={{ fontSize: '10px', transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: '#cba658' }}>
                ▼
              </span>
            </button>

            {/* Accordion Content */}
            {expandedSection === section.id && (
              <div style={{ padding: '20px', borderTop: '1px solid rgba(203, 166, 88, 0.1)' }}>

                {/* SEARCH */}
                {section.id === 'search' && <PropertySearch language={language} />}

                {/* BUYER INQUIRY */}
                {section.id === 'buyer' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '12px', letterSpacing: '0.5px', fontWeight: '300' }}>
                      {language === 'english' ? 'Express your interest in Mexico properties. Our team will contact you within 24 hours.' : 'Exprese su interés en propiedades en México. Nuestro equipo le contactará en 24 horas.'}
                    </p>
                    <div style={{ display: 'grid', gap: '12px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Full Name' : 'Nombre Completo'} style={fieldStyle} />
                      <input placeholder="Email" type="email" style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={fieldStyle} />
                      <select style={{...fieldStyle, cursor: 'pointer'}}>
                        <option>{language === 'english' ? 'Budget Range' : 'Rango de Presupuesto'}</option>
                        <option>$100K - $250K</option><option>$250K - $500K</option><option>$500K - $1M</option><option>$1M+</option>
                      </select>
                      <textarea placeholder={language === 'english' ? 'Tell us about your ideal property...' : 'Cuéntenos sobre su propiedad ideal...'} rows={4} style={{...fieldStyle, resize: 'vertical'}} />
                      <button style={{ padding: '12px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px' }}>
                        {language === 'english' ? 'SUBMIT INQUIRY' : 'ENVIAR SOLICITUD'}
                      </button>
                    </div>
                  </div>
                )}

                {/* LIST PROPERTY - FSBO */}
                {section.id === 'upload' && <FSBOListingFlow language={language} navigate={navigate} />}

                {/* MEXICO REFINANCE */}
                {section.id === 'refi' && (
                  <div>
                    <div style={{ background: 'rgba(203, 166, 88, 0.06)', border: '1px solid rgba(203, 166, 88, 0.2)', padding: '20px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#cba658', marginBottom: '12px', fontSize: '13px', letterSpacing: '2px', fontWeight: '400' }}>US CITIZENS ONLY - MEXICO PROPERTY FINANCING</h4>
                      <div style={{ color: '#94a3b8', lineHeight: '2', fontSize: '12px', letterSpacing: '0.5px' }}>
                        <p>Minimum Property Value: <strong style={{ color: '#cba658' }}>$385,000 USD</strong></p>
                        <p>Down Payment: <strong style={{ color: '#cba658' }}>35-45%</strong></p>
                        <p>Loan Terms: 15-30 years</p>
                        <p>Credit Score Minimum: 680</p>
                        <p>Property must be in Mexico's restricted zone (requires Fideicomiso)</p>
                        <p>Valid passport and US tax returns (2 years) required</p>
                      </div>
                    </div>
                    <button onClick={() => window.open('https://wa.me/526463402686?text=I am interested in Mexico property financing', '_blank')} style={{ padding: '10px 24px', background: 'transparent', border: '1px solid rgba(203, 166, 88, 0.4)', color: '#cba658', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', fontWeight: '400' }}>
                      CONTACT US ABOUT FINANCING
                    </button>
                  </div>
                )}

                {/* REFERRAL PARTNER */}
                {section.id === 'partner' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '16px', fontSize: '12px', letterSpacing: '0.5px', fontWeight: '300' }}>
                      {language === 'english' ? 'Join our referral network and earn commissions on successful transactions.' : 'Únase a nuestra red de referidos y gane comisiones en transacciones exitosas.'}
                    </p>
                    <div style={{ display: 'grid', gap: '12px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Full Name' : 'Nombre Completo'} style={fieldStyle} />
                      <input placeholder="Email" type="email" style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'Company / Brokerage' : 'Empresa / Correduria'} style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'License Number (if applicable)' : 'Número de Licencia (si aplica)'} style={fieldStyle} />
                      <button style={{ padding: '12px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px' }}>
                        {language === 'english' ? 'APPLY AS REFERRAL PARTNER' : 'SOLICITAR COMO SOCIO'}
                      </button>
                    </div>
                  </div>
                )}

                {/* AGENT REGISTRATION */}
                {section.id === 'agent' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '16px', fontSize: '12px', letterSpacing: '0.5px', fontWeight: '300' }}>
                      {language === 'english' ? 'Register as a licensed agent to list properties and access agent tools.' : 'Regístrese como agente licenciado para publicar propiedades y acceder a herramientas de agente.'}
                    </p>
                    <div style={{ display: 'grid', gap: '12px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Full Name' : 'Nombre Completo'} style={fieldStyle} />
                      <input placeholder="Email" type="email" style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'Real Estate License #' : 'Licencia Inmobiliaria #'} style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'Brokerage / Company' : 'Correduria / Empresa'} style={fieldStyle} />
                      <select style={{...fieldStyle, cursor: 'pointer'}}>
                        <option>{language === 'english' ? 'Primary Market' : 'Mercado Principal'}</option>
                        <option>Baja California Norte</option><option>Baja California Sur</option><option>Monterrey</option><option>Other Mexico</option><option>USA</option>
                      </select>
                      <button onClick={() => navigate('/agent-registration')} style={{ padding: '12px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px' }}>
                        {language === 'english' ? 'SUBMIT AGENT APPLICATION' : 'ENVIAR SOLICITUD DE AGENTE'}
                      </button>
                    </div>
                  </div>
                )}

                {/* APPRAISAL */}
                {section.id === 'appraisal' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '16px', fontSize: '12px', letterSpacing: '0.5px', fontWeight: '300' }}>
                      {language === 'english' ? 'Request a professional property appraisal for Mexico real estate.' : 'Solicite un avalúo profesional para bienes raíces en México.'}
                    </p>
                    <div style={{ display: 'grid', gap: '12px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Property Address' : 'Dirección de Propiedad'} style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'City' : 'Ciudad'} style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'Your Name' : 'Su Nombre'} style={fieldStyle} />
                      <input placeholder="Email" type="email" style={fieldStyle} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={fieldStyle} />
                      <textarea placeholder={language === 'english' ? 'Additional notes...' : 'Notas adicionales...'} rows={3} style={{...fieldStyle, resize: 'vertical'}} />
                      <button style={{ padding: '12px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px' }}>
                        {language === 'english' ? 'REQUEST APPRAISAL' : 'SOLICITAR AVALÚO'}
                      </button>
                    </div>
                  </div>
                )}

                {/* LEGAL / FIDEICOMISO */}
                {section.id === 'legal' && (
                  <div>
                    <div style={{ background: 'rgba(203, 166, 88, 0.06)', border: '1px solid rgba(203, 166, 88, 0.2)', padding: '20px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#cba658', marginBottom: '12px', fontSize: '13px', letterSpacing: '2px', fontWeight: '400' }}>WHAT IS A FIDEICOMISO?</h4>
                      <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.8', letterSpacing: '0.3px' }}>
                        A Fideicomiso is a bank trust that allows foreigners to own property in Mexico's restricted zones (within 50km of coastline or 100km of international borders). A Mexican bank holds the title as trustee, while you retain all ownership rights — including the right to sell, lease, improve, or bequeath the property. Duration: 50-year renewable trust. Annual cost: $500-$800 USD.
                      </p>
                    </div>
                    <button onClick={() => window.open('https://wa.me/526463402686?text=I have questions about Fideicomiso and legal process', '_blank')} style={{ padding: '10px 24px', background: 'transparent', border: '1px solid rgba(203, 166, 88, 0.4)', color: '#cba658', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', fontWeight: '400' }}>
                      {language === 'english' ? 'START LEGAL QUESTIONNAIRE' : 'INICIAR CUESTIONARIO LEGAL'}
                    </button>
                  </div>
                )}

                {/* TEAM SECTION - SHARP SQUARE PHOTOS - 5 MEMBERS */}
                {section.id === 'team' && (
                  <div>
                    <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '24px', fontSize: '11px', letterSpacing: '1.5px', fontWeight: '300' }}>
                      {language === 'english' ? 'DEDICATED PROFESSIONALS SERVING BAJA CALIFORNIA & BEYOND' : 'PROFESIONALES DEDICADOS SIRVIENDO BAJA CALIFORNIA Y MÁS ALLÁ'}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '12px' }}>
                      {teamMembers.map((member, index) => (
                        <div key={index} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', padding: '20px', textAlign: 'center' }}>
                          {/* SHARP SQUARE PHOTO */}
                          <div style={{ width: '70px', height: '70px', overflow: 'hidden', margin: '0 auto 12px', border: '1px solid rgba(203, 166, 88, 0.3)' }}>
                            <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} onError={(e) => { e.target.style.display='none'; }} />
                          </div>
                          <h4 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '400', letterSpacing: '1px', marginBottom: '4px' }}>{member.name}</h4>
                          <p style={{ color: '#cba658', fontSize: '9px', letterSpacing: '1.5px', marginBottom: '4px', fontWeight: '400' }}>{member.title}</p>
                          {member.subtitle && <p style={{ color: '#94a3b8', fontSize: '9px', letterSpacing: '0.5px', marginBottom: '10px' }}>{member.subtitle}</p>}
                          {/* SMALL PILL BOXES */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'center', marginBottom: '10px' }}>
                            {member.specialties.map((spec, i) => (
                              <span key={i} style={{ padding: '3px 8px', background: 'rgba(203, 166, 88, 0.08)', border: '1px solid rgba(203, 166, 88, 0.15)', color: '#cba658', fontSize: '8px', letterSpacing: '0.5px' }}>{spec}</span>
                            ))}
                          </div>
                          <p style={{ color: '#94a3b8', fontSize: '10px', lineHeight: '1.5', marginBottom: '12px' }}>{member.description}</p>
                          <button onClick={() => window.open(`https://wa.me/526463402686?text=I'd like to speak with ${member.name}`, '_blank')} style={{ padding: '6px 16px', background: 'transparent', border: '1px solid rgba(203, 166, 88, 0.3)', color: '#cba658', fontSize: '9px', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: '400' }}>
                            CONTACT
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        ))}

        {/* FOOTER - SLEEK */}
        <div style={{ padding: '30px 20px', background: 'rgba(15, 23, 42, 0.8)', borderTop: '1px solid rgba(203, 166, 88, 0.1)', textAlign: 'center', marginTop: '16px' }}>
          <p style={{ color: '#cba658', fontSize: '10px', fontWeight: '400', marginBottom: '4px', letterSpacing: '3px' }}>ENJOY BAJA REAL ESTATE</p>
          <p style={{ color: '#94a3b8', fontSize: '9px', marginBottom: '10px', letterSpacing: '1.5px' }}>Premium Mexico Real Estate & Cross-Border Financing</p>
          <p style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '400', letterSpacing: '1px' }}>Saul Garcia</p>
          <p style={{ color: '#cba658', fontSize: '10px', letterSpacing: '1.5px' }}>NMLS #337526</p>
          <p style={{ color: '#94a3b8', fontSize: '9px', marginTop: '8px', letterSpacing: '1px' }}>Everwise Home Loans & Realty</p>
          <p style={{ color: '#94a3b8', fontSize: '9px', letterSpacing: '1px' }}>+52-646-340-2686 • info@enjoybaja.com</p>
        </div>
      </div>
    </div>
  );
}