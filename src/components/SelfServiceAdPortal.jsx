import React, { useState } from 'react';

const AD_PACKAGES = {
  freepromo: { id: 'freepromo', price: 0, showPrice: true, duration: 60, name: 'Launch Special', subtitle: 'FREE UNTIL MARCH 15, 2026', description: 'Celebrate our launch! List your business FREE from January 15th to March 15th, 2026.', features: ['60-day FREE listing', 'Up to 5 images (JPG recommended)', 'Full profile page', 'Lead routing', 'Social media mention'], maxImages: 5, videoAllowed: false, highlight: true },
  spotlight: { id: 'spotlight', price: 2500, showPrice: false, duration: 30, name: 'Baja Spotlight', subtitle: '30 DAY FEATURE', description: 'Featured in Magazine section with editorial write-up', features: ['Hero placement for 30 days', 'Editorial write-up', 'Social media feature', 'Email newsletter inclusion'], maxImages: 5, videoAllowed: false, highlight: false },
  elite: { id: 'elite', price: 5000, showPrice: false, duration: 30, name: 'Elite Placement', subtitle: 'PREMIUM VISIBILITY', description: 'Premium visibility with dedicated section and video support', features: ['Dedicated page section', 'Video support (30 sec MP4/MOV)', 'Lead capture form', 'Performance analytics', 'Social media campaign'], maxImages: 10, videoAllowed: true, highlight: false },
  icon: { id: 'icon', price: 15000, showPrice: false, duration: 30, name: 'Icon Sponsor', subtitle: 'CATEGORY EXCLUSIVE', description: 'Exclusive category sponsorship with maximum exposure', features: ['Category exclusivity', 'Homepage feature', 'All platform exposure', 'Concierge support', 'Priority lead routing'], maxImages: 20, videoAllowed: true, highlight: false },
  collection: { id: 'collection', price: 500, showPrice: false, duration: 90, name: 'Luxury Collection', subtitle: '90 DAY LISTING', description: 'List your luxury item - yacht, jet, car, watch, jewelry', features: ['90-day listing', 'Photo gallery (up to 10 JPG)', 'Inquiry routing to admin', 'Featured rotation'], maxImages: 10, videoAllowed: false, highlight: false },
  partner: { id: 'partner', price: 1500, showPrice: false, duration: 365, name: 'Partner Directory', subtitle: 'ANNUAL LISTING', description: 'Annual partner listing with logo and company profile', features: ['Logo on Partners page', 'Company profile', 'Contact routing', 'Annual renewal'], maxImages: 3, videoAllowed: false, highlight: false }
};

const CATEGORIES = ['Winery / Vineyard', 'Hotel / Resort', 'Restaurant', 'Real Estate Development', 'Luxury Automobile', 'Private Aviation', 'Yacht / Marine', 'Fine Jewelry', 'Timepieces', 'Art Gallery', 'Interior Design', 'Architecture', 'Concierge Services', 'Legal Services', 'Financial Services', 'Insurance', 'Property Management', 'Other'];

const SelfServiceAdPortal = ({ embedded = false, onClose = null }) => {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({ businessName: '', contactName: '', contactEmail: '', contactPhone: '', website: '', category: '', headline: '', description: '', images: [], video: null, agreeTerms: false, agreeNewsletter: false });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  const glassText = { fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '100' };

  const validateStep = (s) => {
    const e = {};
    if (s === 2) { if (!formData.businessName.trim()) e.businessName = 'Required'; if (!formData.contactName.trim()) e.contactName = 'Required'; if (!formData.contactEmail.trim()) e.contactEmail = 'Required'; if (!formData.contactPhone.trim()) e.contactPhone = 'Required'; if (!formData.category) e.category = 'Required'; }
    if (s === 3) { if (!formData.headline.trim()) e.headline = 'Required'; if (!formData.description.trim()) e.description = 'Required'; if (formData.images.length === 0) e.images = 'At least one image required'; }
    if (s === 4) { if (!formData.agreeTerms) e.agreeTerms = 'Required'; }
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep(step)) setStep(step + 1); };
  const handleBack = () => setStep(step - 1);

  const handleImageUpload = (ev) => {
    const files = Array.from(ev.target.files);
    const max = selectedPackage ? AD_PACKAGES[selectedPackage].maxImages : 5;
    if (formData.images.length + files.length > max) { alert('Maximum ' + max + ' images'); return; }
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (files.some(f => !validTypes.includes(f.type))) { alert('Only JPG and PNG accepted. JPG recommended.'); return; }
    const newImgs = files.map(f => ({ file: f, preview: URL.createObjectURL(f), name: f.name }));
    setFormData(p => ({ ...p, images: [...p.images, ...newImgs] }));
  };

  const handleRemoveImage = (i) => setFormData(p => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }));

  const handleVideoUpload = (ev) => {
    const f = ev.target.files[0];
    if (f && !['video/mp4', 'video/quicktime'].includes(f.type)) { alert('Only MP4/MOV accepted. MP4 recommended.'); return; }
    if (f && f.size <= 50 * 1024 * 1024) setFormData(p => ({ ...p, video: f }));
    else alert('Video must be under 50MB');
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    const pkg = AD_PACKAGES[selectedPackage];
    const sub = { id: 'AD-' + Date.now(), package: selectedPackage, ...formData, status: pkg.showPrice ? 'pending_review' : 'quote_requested', submittedAt: new Date().toISOString(), price: pkg.showPrice ? pkg.price : 'QUOTE_REQUESTED', requiresQuote: !pkg.showPrice };
    const existing = JSON.parse(localStorage.getItem('ad_submissions') || '[]');
    existing.push(sub);
    localStorage.setItem('ad_submissions', JSON.stringify(existing));
    setSubmissionId(sub.id);
    setSubmissionComplete(true);
    setIsSubmitting(false);
  };

  const bgStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=85")', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 };
  const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(30,41,59,0.85) 100%)', backdropFilter: 'blur(8px)', zIndex: 1 };
  const inputStyle = { width: '100%', padding: '14px 16px', background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(148,163,184,0.15)', color: 'rgba(226,232,240,0.9)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Helvetica Neue", sans-serif' };
  const btnPrimary = { padding: '14px 24px', background: 'rgba(226,232,240,0.1)', border: '1px solid rgba(148,163,184,0.2)', color: 'rgba(226,232,240,0.9)', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif' };
  const btnSecondary = { padding: '14px 24px', background: 'transparent', border: '1px solid rgba(148,163,184,0.2)', color: 'rgba(148,163,184,0.7)', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif' };

  // STEP 1: Packages - NO PRICES on paid
  const renderPackages = () => (
    <div style={{ minHeight: '100vh', position: 'relative', padding: '60px 20px' }}>
      <div style={bgStyle} /><div style={overlayStyle} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ ...glassText, fontSize: '11px', letterSpacing: '6px', color: 'rgba(226,232,240,0.5)', marginBottom: '16px', textTransform: 'uppercase' }}>Baja California Magazine</div>
          <h1 style={{ ...glassText, fontSize: '42px', fontWeight: '100', letterSpacing: '12px', color: 'rgba(226,232,240,0.95)', marginBottom: '16px', textTransform: 'uppercase' }}>Advertise</h1>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(226,232,240,0.4), transparent)', margin: '0 auto 20px' }} />
          <p style={{ ...glassText, fontSize: '13px', color: 'rgba(148,163,184,0.7)', letterSpacing: '2px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.8' }}>Reach affluent buyers across Baja California and beyond</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {Object.values(AD_PACKAGES).map((pkg) => (
            <div key={pkg.id} onClick={() => { setSelectedPackage(pkg.id); setStep(2); }} style={{ background: pkg.highlight ? 'linear-gradient(135deg, rgba(226,232,240,0.12) 0%, rgba(226,232,240,0.05) 100%)' : 'rgba(15,23,42,0.4)', backdropFilter: 'blur(20px)', border: pkg.highlight ? '1px solid rgba(226,232,240,0.3)' : '1px solid rgba(148,163,184,0.1)', padding: '36px 32px', cursor: 'pointer', transition: 'all 0.4s ease', position: 'relative', overflow: 'hidden' }}>
              {pkg.highlight && <div style={{ position: 'absolute', top: '20px', right: '-35px', background: 'rgba(226,232,240,0.9)', color: '#0f172a', fontSize: '8px', fontWeight: '600', letterSpacing: '1px', padding: '6px 40px', transform: 'rotate(45deg)', textTransform: 'uppercase' }}>Limited Time</div>}
              <div style={{ ...glassText, fontSize: '9px', letterSpacing: '3px', color: pkg.highlight ? 'rgba(226,232,240,0.8)' : 'rgba(148,163,184,0.5)', marginBottom: '8px', textTransform: 'uppercase' }}>{pkg.subtitle}</div>
              <h3 style={{ ...glassText, fontSize: '22px', fontWeight: '100', color: 'rgba(226,232,240,0.95)', marginBottom: '8px', letterSpacing: '3px' }}>{pkg.name}</h3>
              <div style={{ marginBottom: '20px' }}>
                {pkg.showPrice ? (
                  <div style={{ ...glassText, fontSize: '36px', fontWeight: '100', color: 'rgba(134,239,172,0.9)', letterSpacing: '2px' }}>FREE</div>
                ) : (
                  <div style={{ ...glassText, fontSize: '14px', fontWeight: '100', color: 'rgba(203,166,88,0.9)', letterSpacing: '2px', padding: '12px 0', borderTop: '1px solid rgba(148,163,184,0.1)', borderBottom: '1px solid rgba(148,163,184,0.1)' }}>REQUEST QUOTE</div>
                )}
              </div>
              <p style={{ ...glassText, fontSize: '12px', color: 'rgba(148,163,184,0.6)', marginBottom: '24px', lineHeight: '1.7', minHeight: '40px' }}>{pkg.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>{pkg.features.map((f, i) => <li key={i} style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.7)', marginBottom: '10px', paddingLeft: '20px', position: 'relative', letterSpacing: '0.5px' }}><span style={{ position: 'absolute', left: 0, color: pkg.highlight ? 'rgba(134,239,172,0.7)' : 'rgba(148,163,184,0.4)', fontSize: '8px' }}>*</span>{f}</li>)}</ul>
              <button style={{ width: '100%', padding: '14px', background: pkg.highlight ? 'rgba(226,232,240,0.1)' : 'transparent', border: '1px solid rgba(148,163,184,0.2)', color: 'rgba(226,232,240,0.8)', fontSize: '10px', letterSpacing: '3px', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif', textTransform: 'uppercase' }}>{pkg.showPrice ? 'Get Started Free' : 'Request Quote'}</button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', background: 'rgba(203,166,88,0.1)', border: '1px solid rgba(203,166,88,0.2)' }}>
          <p style={{ ...glassText, fontSize: '11px', color: 'rgba(203,166,88,0.9)', letterSpacing: '1px', margin: '0 0 8px 0', fontWeight: '400' }}>FILE FORMAT REQUIREMENTS</p>
          <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.6)', letterSpacing: '1px', margin: 0, lineHeight: '1.8' }}>Images: JPG recommended (PNG accepted) - Max 10MB | Video: MP4 recommended (MOV accepted) - Max 50MB, 30 sec<br /><span style={{ color: 'rgba(248,113,113,0.7)' }}>We are not responsible for quality issues with incorrectly formatted uploads.</span></p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px', padding: '24px', background: 'rgba(15,23,42,0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148,163,184,0.1)' }}>
          <p style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.5)', letterSpacing: '1px', margin: 0 }}>Submissions reviewed within 24 hours - Quote via email/phone - WhatsApp +52 646 340 2686</p>
        </div>
      </div>
    </div>
  );

  // STEP 2: Contact
  const renderContact = () => {
    const pkg = AD_PACKAGES[selectedPackage];
    return (
      <div style={{ minHeight: '100vh', position: 'relative', padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={bgStyle} /><div style={overlayStyle} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '550px', width: '100%', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(148,163,184,0.1)', padding: '48px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ ...glassText, fontSize: '9px', letterSpacing: '3px', color: 'rgba(148,163,184,0.5)', marginBottom: '8px' }}>STEP 2 OF 4</div>
            <h2 style={{ ...glassText, fontSize: '24px', fontWeight: '100', letterSpacing: '6px', color: 'rgba(226,232,240,0.95)', marginBottom: '12px' }}>CONTACT</h2>
            <p style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)' }}>{pkg?.name} - {pkg?.showPrice ? 'FREE' : 'Quote Requested'}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>BUSINESS NAME *</label><input type="text" value={formData.businessName} onChange={e => setFormData(p => ({ ...p, businessName: e.target.value }))} style={{ ...inputStyle, borderColor: errors.businessName ? 'rgba(248,113,113,0.5)' : 'rgba(148,163,184,0.15)' }} />{errors.businessName && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.businessName}</span>}</div>
            <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>CONTACT NAME *</label><input type="text" value={formData.contactName} onChange={e => setFormData(p => ({ ...p, contactName: e.target.value }))} style={{ ...inputStyle, borderColor: errors.contactName ? 'rgba(248,113,113,0.5)' : 'rgba(148,163,184,0.15)' }} />{errors.contactName && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.contactName}</span>}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>EMAIL *</label><input type="email" value={formData.contactEmail} onChange={e => setFormData(p => ({ ...p, contactEmail: e.target.value }))} style={{ ...inputStyle, borderColor: errors.contactEmail ? 'rgba(248,113,113,0.5)' : 'rgba(148,163,184,0.15)' }} />{errors.contactEmail && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.contactEmail}</span>}</div>
              <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>PHONE *</label><input type="tel" value={formData.contactPhone} onChange={e => setFormData(p => ({ ...p, contactPhone: e.target.value }))} style={{ ...inputStyle, borderColor: errors.contactPhone ? 'rgba(248,113,113,0.5)' : 'rgba(148,163,184,0.15)' }} />{errors.contactPhone && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.contactPhone}</span>}</div>
            </div>
            <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>WEBSITE</label><input type="url" value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} placeholder="https://" style={inputStyle} /></div>
            <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>CATEGORY *</label><select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} style={{ ...inputStyle, borderColor: errors.category ? 'rgba(248,113,113,0.5)' : 'rgba(148,163,184,0.15)' }}><option value="">Select a category</option>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select>{errors.category && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.category}</span>}</div>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}><button onClick={handleBack} style={{ ...btnSecondary, flex: 1 }}>BACK</button><button onClick={handleNext} style={{ ...btnPrimary, flex: 1 }}>CONTINUE</button></div>
        </div>
      </div>
    );
  };

  // STEP 3: Content
  const renderContent = () => {
    const pkg = AD_PACKAGES[selectedPackage];
    return (
      <div style={{ minHeight: '100vh', position: 'relative', padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={bgStyle} /><div style={overlayStyle} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px', width: '100%', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(148,163,184,0.1)', padding: '48px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ ...glassText, fontSize: '9px', letterSpacing: '3px', color: 'rgba(148,163,184,0.5)', marginBottom: '8px' }}>STEP 3 OF 4</div>
            <h2 style={{ ...glassText, fontSize: '24px', fontWeight: '100', letterSpacing: '6px', color: 'rgba(226,232,240,0.95)', marginBottom: '12px' }}>CONTENT</h2>
            <p style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)' }}>Up to {pkg?.maxImages} images{pkg?.videoAllowed ? ' + Video' : ''}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>HEADLINE *</label><input type="text" value={formData.headline} onChange={e => setFormData(p => ({ ...p, headline: e.target.value }))} placeholder="Your headline" maxLength={100} style={{ ...inputStyle, borderColor: errors.headline ? 'rgba(248,113,113,0.5)' : 'rgba(148,163,184,0.15)' }} />{errors.headline && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.headline}</span>}</div>
            <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>DESCRIPTION *</label><textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} placeholder="Describe your business..." rows={5} maxLength={1000} style={{ ...inputStyle, resize: 'vertical', borderColor: errors.description ? 'rgba(248,113,113,0.5)' : 'rgba(148,163,184,0.15)' }} /><div style={{ textAlign: 'right', fontSize: '10px', color: 'rgba(148,163,184,0.4)', marginTop: '4px' }}>{formData.description.length}/1000</div>{errors.description && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.description}</span>}</div>
            <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>IMAGES * <span style={{ color: 'rgba(203,166,88,0.8)' }}>(JPG RECOMMENDED)</span></label><div style={{ border: '1px dashed rgba(148,163,184,0.2)', padding: '32px', textAlign: 'center', cursor: 'pointer', background: 'rgba(30,41,59,0.3)' }} onClick={() => document.getElementById('img-up').click()}><input id="img-up" type="file" accept=".jpg,.jpeg,.png" multiple onChange={handleImageUpload} style={{ display: 'none' }} /><div style={{ ...glassText, fontSize: '12px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>Click to upload</div><div style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.4)' }}>JPG recommended - PNG accepted - Max 10MB</div></div>{errors.images && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.images}</span>}{formData.images.length > 0 && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px', marginTop: '16px' }}>{formData.images.map((img, i) => <div key={i} style={{ position: 'relative' }}><img src={img.preview} alt="" style={{ width: '100%', height: '70px', objectFit: 'cover', border: '1px solid rgba(148,163,184,0.2)' }} /><button onClick={() => handleRemoveImage(i)} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', background: 'rgba(248,113,113,0.9)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: '10px', cursor: 'pointer' }}>x</button></div>)}</div>}</div>
            {pkg?.videoAllowed && <div><label style={{ ...glassText, display: 'block', fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>VIDEO (30 sec) <span style={{ color: 'rgba(203,166,88,0.8)' }}>(MP4 RECOMMENDED)</span></label><div style={{ border: '1px dashed rgba(148,163,184,0.2)', padding: '24px', textAlign: 'center', cursor: 'pointer', background: 'rgba(30,41,59,0.3)' }} onClick={() => document.getElementById('vid-up').click()}><input id="vid-up" type="file" accept=".mp4,.mov" onChange={handleVideoUpload} style={{ display: 'none' }} />{formData.video ? <div style={{ ...glassText, fontSize: '12px', color: 'rgba(134,239,172,0.8)' }}>{formData.video.name}</div> : <div style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.5)' }}>MP4 recommended - MOV accepted - Max 50MB</div>}</div></div>}
            <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', padding: '12px' }}><p style={{ ...glassText, fontSize: '9px', color: 'rgba(248,113,113,0.8)', margin: 0, lineHeight: '1.6' }}>IMPORTANT: We are not responsible for quality issues with incorrectly formatted uploads. Use JPG for images and MP4 for video.</p></div>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}><button onClick={handleBack} style={{ ...btnSecondary, flex: 1 }}>BACK</button><button onClick={handleNext} style={{ ...btnPrimary, flex: 1 }}>CONTINUE</button></div>
        </div>
      </div>
    );
  };

  // STEP 4: Review
  const renderReview = () => {
    const pkg = AD_PACKAGES[selectedPackage];
    return (
      <div style={{ minHeight: '100vh', position: 'relative', padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={bgStyle} /><div style={overlayStyle} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '550px', width: '100%', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(148,163,184,0.1)', padding: '48px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}><div style={{ ...glassText, fontSize: '9px', letterSpacing: '3px', color: 'rgba(148,163,184,0.5)', marginBottom: '8px' }}>STEP 4 OF 4</div><h2 style={{ ...glassText, fontSize: '24px', fontWeight: '100', letterSpacing: '6px', color: 'rgba(226,232,240,0.95)' }}>REVIEW</h2></div>
          <div style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(148,163,184,0.1)', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)' }}>Package</span><span style={{ ...glassText, fontSize: '11px', color: 'rgba(226,232,240,0.9)' }}>{pkg?.name}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)' }}>Duration</span><span style={{ ...glassText, fontSize: '11px', color: 'rgba(226,232,240,0.9)' }}>{pkg?.duration} days</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)' }}>Business</span><span style={{ ...glassText, fontSize: '11px', color: 'rgba(226,232,240,0.9)' }}>{formData.businessName}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)' }}>Category</span><span style={{ ...glassText, fontSize: '11px', color: 'rgba(226,232,240,0.9)' }}>{formData.category}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)' }}>Images</span><span style={{ ...glassText, fontSize: '11px', color: 'rgba(226,232,240,0.9)' }}>{formData.images.length} uploaded</span></div>
            <div style={{ borderTop: '1px solid rgba(148,163,184,0.1)', marginTop: '16px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ ...glassText, fontSize: '13px', color: 'rgba(226,232,240,0.9)' }}>{pkg?.showPrice ? 'Total' : 'Pricing'}</span><span style={{ ...glassText, fontSize: pkg?.showPrice ? '28px' : '16px', fontWeight: '100', color: pkg?.showPrice ? 'rgba(134,239,172,0.9)' : 'rgba(203,166,88,0.9)' }}>{pkg?.showPrice ? 'FREE' : 'QUOTE REQUESTED'}</span></div>
          </div>
          {!pkg?.showPrice && <div style={{ background: 'rgba(203,166,88,0.1)', border: '1px solid rgba(203,166,88,0.2)', padding: '14px', marginBottom: '24px', textAlign: 'center' }}><div style={{ ...glassText, fontSize: '10px', color: 'rgba(203,166,88,0.9)', letterSpacing: '1px' }}>Our team will contact you within 24 hours with pricing via email or phone.</div></div>}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', marginBottom: '16px' }}><input type="checkbox" checked={formData.agreeTerms} onChange={e => setFormData(p => ({ ...p, agreeTerms: e.target.checked }))} style={{ marginTop: '2px' }} /><span style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)', lineHeight: '1.6' }}>I agree to Terms of Service. Reviewed within 24 hours. *</span></label>{errors.agreeTerms && <span style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)' }}>{errors.agreeTerms}</span>}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}><input type="checkbox" checked={formData.agreeNewsletter} onChange={e => setFormData(p => ({ ...p, agreeNewsletter: e.target.checked }))} style={{ marginTop: '2px' }} /><span style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)', lineHeight: '1.6' }}>Receive marketing updates from EnjoyBaja.</span></label>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}><button onClick={handleBack} style={{ ...btnSecondary, flex: 1 }}>BACK</button><button onClick={handleSubmit} disabled={isSubmitting} style={{ ...btnPrimary, flex: 1, opacity: isSubmitting ? 0.6 : 1 }}>{isSubmitting ? 'SUBMITTING...' : (pkg?.showPrice ? 'SUBMIT' : 'REQUEST QUOTE')}</button></div>
        </div>
      </div>
    );
  };

  // Complete
  const renderComplete = () => {
    const pkg = AD_PACKAGES[selectedPackage];
    return (
      <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={bgStyle} /><div style={overlayStyle} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '450px', textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ width: '80px', height: '80px', border: '1px solid rgba(134,239,172,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', background: 'rgba(134,239,172,0.05)' }}><span style={{ fontSize: '24px', color: 'rgba(134,239,172,0.8)', fontFamily: 'monospace' }}>OK</span></div>
          <h2 style={{ ...glassText, fontSize: '24px', fontWeight: '100', letterSpacing: '6px', color: 'rgba(226,232,240,0.95)', marginBottom: '16px' }}>{pkg?.showPrice ? 'RECEIVED' : 'QUOTE REQUESTED'}</h2>
          <p style={{ ...glassText, fontSize: '12px', color: 'rgba(148,163,184,0.6)', marginBottom: '32px', lineHeight: '1.8' }}>{pkg?.showPrice ? 'Your submission is pending review. Confirmation email sent.' : 'Our team will contact you within 24 hours with pricing.'}</p>
          <div style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(148,163,184,0.1)', padding: '20px', marginBottom: '32px' }}><div style={{ ...glassText, fontSize: '9px', color: 'rgba(148,163,184,0.5)', marginBottom: '8px', letterSpacing: '2px' }}>{pkg?.showPrice ? 'SUBMISSION ID' : 'QUOTE REQUEST ID'}</div><div style={{ ...glassText, fontSize: '16px', color: 'rgba(226,232,240,0.9)', letterSpacing: '2px' }}>{submissionId}</div></div>
          <button onClick={() => { setStep(1); setSelectedPackage(null); setSubmissionComplete(false); setFormData({ businessName: '', contactName: '', contactEmail: '', contactPhone: '', website: '', category: '', headline: '', description: '', images: [], video: null, agreeTerms: false, agreeNewsletter: false }); }} style={btnPrimary}>SUBMIT ANOTHER</button>
          {onClose && <button onClick={onClose} style={{ ...btnSecondary, marginLeft: '16px' }}>CLOSE</button>}
        </div>
      </div>
    );
  };

  return <div>{submissionComplete ? renderComplete() : step === 1 ? renderPackages() : step === 2 ? renderContact() : step === 3 ? renderContent() : renderReview()}</div>;
};

export default SelfServiceAdPortal;