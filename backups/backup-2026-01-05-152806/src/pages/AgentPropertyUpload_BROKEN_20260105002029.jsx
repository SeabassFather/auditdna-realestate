import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyDocument, analyzeDocumentAI } from '../utils/documentVerifier';
import { predictPropertyPrice } from '../utils/pricingAI';

export default function AgentPropertyUpload() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [docVerification, setDocVerification] = useState({});
  const [pricePrediction, setPricePrediction] = useState(null);
  const [analyzingPrice, setAnalyzingPrice] = useState(false);
  const [documents, setDocuments] = useState({
    appraisal: null,
    escritura: null,
    contract: null,
    other: []
  });
  const [formData, setFormData] = useState({
    title: '', region: '', city: '', price: '', beds: '', baths: '', sqft: '',
    propertyType: '', description: '', amenities: '', yearBuilt: '', lotSize: ''
  });

  const regions = ['Baja California Norte', 'Baja California Sur', 'Jalisco', 'Nayarit', 'Quintana Roo', 'Guanajuato', 'Yucatan', 'Sinaloa', 'Oaxaca', 'CDMX', 'Queretaro'];
  const cities = {
    'Baja California Norte': ['Ensenada', 'Rosarito', 'Tijuana', 'Valle de Guadalupe', 'San Felipe'],
    'Baja California Sur': ['Cabo San Lucas', 'San Jose del Cabo', 'La Paz', 'Todos Santos', 'Los Barriles'],
    'Jalisco': ['Puerto Vallarta'], 'Nayarit': ['Sayulita'], 'Quintana Roo': ['Playa del Carmen', 'Tulum', 'Cancun', 'Akumal'],
    'Guanajuato': ['San Miguel de Allende'], 'Yucatan': ['Merida'], 'Sinaloa': ['Mazatlan'],
    'Oaxaca': ['Oaxaca'], 'CDMX': ['Mexico City'], 'Queretaro': ['Queretaro']
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 8) { alert('Maximum 8 photos'); return; }
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => setImages(prev => [...prev, { file, preview: e.target.result }]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));

  const handleDocumentUpload = async (type, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Verify document with AI
    setDocVerification(prev => ({...prev, [type]: { status: 'verifying', message: 'AI Verification in progress...' }}));
    
    const verification = await verifyDocument(file);
    
    if (verification.authenticity === 'FLAGGED') {
      setDocVerification(prev => ({...prev, [type]: { status: 'failed', message: ' Document verification failed' }}));
      alert('Document verification failed. Please upload a clear, authentic document.');
      return;
    }
    
    setDocVerification(prev => ({...prev, [type]: { status: 'verified', message: ' Verified', confidence: verification.confidence }}));
    
    if (type === 'other') {
      setDocuments(prev => ({...prev, other: [...prev.other, file]}));
    } else {
      setDocuments(prev => ({...prev, [type]: file}));
    }
  }));
    } else {
      setDocuments(prev => ({...prev, [type]: file}));
    }
  };

  const handleDocumentUpload = async (type, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Verify document with AI
    setDocVerification(prev => ({...prev, [type]: { status: 'verifying', message: 'AI Verification in progress...' }}));
    
    const verification = await verifyDocument(file);
    
    if (verification.authenticity === 'FLAGGED') {
      setDocVerification(prev => ({...prev, [type]: { status: 'failed', message: ' Document verification failed' }}));
      alert('Document verification failed. Please upload a clear, authentic document.');
      return;
    }
    
    setDocVerification(prev => ({...prev, [type]: { status: 'verified', message: ' Verified', confidence: verification.confidence }}));
    
    if (type === 'other') {
      setDocuments(prev => ({...prev, other: [...prev.other, file]}));
    } else {
      setDocuments(prev => ({...prev, [type]: file}));
    }
  };

  const removeDocument = (type, index = null) => {
    if (type === 'other' && index !== null) {
      setDocuments(prev => ({...prev, other: prev.other.filter((_, i) => i !== index)}));
    } else {
      setDocuments(prev => ({...prev, [type]: null}));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 8) { alert('Please upload at least 8 professional photos'); return; }
    console.log('Property Data:', formData, 'Images:', images, 'Documents:', documents);
    alert('Property submitted for review!');
    navigate('/agent-dashboard');
  };

  const s = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 24px' },
    header: { maxWidth: '1200px', margin: '0 auto 40px', textAlign: 'center' },
    title: { fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '12px' },
    subtitle: { fontSize: '16px', color: '#94a3b8' },
    form: { maxWidth: '1200px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '40px' },
    section: { marginBottom: '40px' },
    sectionTitle: { fontSize: '20px', fontWeight: '600', color: '#cba658', marginBottom: '20px', borderBottom: '2px solid rgba(203, 166, 88, 0.2)', paddingBottom: '8px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' },
    input: { width: '100%', padding: '12px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' },
    textarea: { width: '100%', padding: '12px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px', minHeight: '120px' },
    imageGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '20px' },
    imageBox: { position: 'relative', aspectRatio: '1', background: 'rgba(30, 41, 59, 0.8)', border: '2px dashed rgba(203, 166, 88, 0.3)', borderRadius: '8px', overflow: 'hidden' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
    removeBtn: { position: 'absolute', top: '8px', right: '8px', background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px' },
    uploadBox: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', cursor: 'pointer' },
    submitBtn: { width: '100%', padding: '18px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', marginTop: '40px' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h1 style={s.title}>List New Property</h1>
        <p style={s.subtitle}>Complete the form below to add a new listing</p>
      </div>
      <form style={s.form} onSubmit={handleSubmit}>
        <div style={s.section}>
          <h3 style={s.sectionTitle}>Property Details</h3>
          <div style={s.grid}>
            <div style={s.inputGroup}><label style={s.label}>Title*</label><input style={s.input} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /></div>
            <div style={s.inputGroup}><label style={s.label}>Type*</label><select style={s.input} value={formData.propertyType} onChange={(e) => setFormData({...formData, propertyType: e.target.value})} required><option value="">Select</option><option>Villa</option><option>Estate</option><option>Condo</option><option>Beach</option></select></div>
            <div style={s.inputGroup}><label style={s.label}>Region*</label><select style={s.input} value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value, city: ''})} required><option value="">Select</option>{regions.map(r => <option key={r}>{r}</option>)}</select></div>
            <div style={s.inputGroup}><label style={s.label}>City*</label><select style={s.input} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required disabled={!formData.region}><option value="">Select</option>{formData.region && cities[formData.region]?.map(c => <option key={c}>{c}</option>)}</select></div>
            <div style={s.inputGroup}><label style={s.label}>Price (USD)*</label>
            <button type="button" onClick={analyzePricing} disabled={analyzingPrice} style={{ marginBottom: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              {analyzingPrice ? 'Analyzing...' : ' AI Price Analysis'}
            </button>
            {pricePrediction && pricePrediction.estimatedPrice > 0 && (
              <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px', marginBottom: '12px', fontSize: '13px', color: '#10b981' }}>
                <div style={{ fontWeight: '700', marginBottom: '8px' }}>AI Pricing Analysis:</div>
                <div> Estimated: </div>
                <div> Range:  - </div>
                <div> Confidence: {pricePrediction.confidence}%</div>
                <div> Market: {pricePrediction.marketTrend}</div>
              </div>
            )}<input type="number" style={s.input} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required /></div>
            <div style={s.inputGroup}><label style={s.label}>Bedrooms*</label><input type="number" style={s.input} value={formData.beds} onChange={(e) => setFormData({...formData, beds: e.target.value})} required /></div>
            <div style={s.inputGroup}><label style={s.label}>Bathrooms*</label><input type="number" step="0.5" style={s.input} value={formData.baths} onChange={(e) => setFormData({...formData, baths: e.target.value})} required /></div>
            <div style={s.inputGroup}><label style={s.label}>Square Feet*</label><input type="number" style={s.input} value={formData.sqft} onChange={(e) => setFormData({...formData, sqft: e.target.value})} required /></div>
          </div>
          <div style={s.inputGroup}><label style={s.label}>Description*</label><textarea style={s.textarea} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required /></div>
        </div>
        <div style={s.section}>
          <h3 style={s.sectionTitle}>Photos (Min 8)*</h3>
          <input type="file" id="img" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          <div style={s.imageGrid}>
            {images.map((img, idx) => (
              <div key={idx} style={s.imageBox}>
                <img src={img.preview} alt="" style={s.image} />
                <button type="button" onClick={() => removeImage(idx)} style={s.removeBtn}></button>
              </div>
            ))}
            {images.length < 8 && <div style={s.imageBox}><label htmlFor="img" style={s.uploadBox}><div style={{ fontSize: '48px', color: '#cba658' }}>+</div><div style={{ fontSize: '12px', color: '#94a3b8' }}>Upload ({images.length}/8)</div></label></div>}
          </div>
        </div>
        <div style={s.section}>
          <h3 style={s.sectionTitle}>Property Documents</h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>Upload appraisals, escrituras, contracts, and other legal documents (PDF only)</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {/* Appraisal */}
            <div style={{ padding: '20px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>📊 Appraisal</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Property valuation report</div>
                </div>
                {documents.appraisal && <button type="button" onClick={() => removeDocument('appraisal')} style={{ background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>}
              </div>
              {documents.appraisal ? (
                <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#60a5fa', fontSize: '13px' }}>✓ {documents.appraisal.name}</div>
              ) : (
                <label style={{ display: 'block', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px dashed rgba(203, 166, 88, 0.3)', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', color: '#94a3b8', fontSize: '14px' }}>
                  <input type="file" accept=".pdf" onChange={(e) => handleDocumentUpload('appraisal', e)} style={{ display: 'none' }} />
                  Click to upload PDF
                </label>
              )}
            </div>

            {/* Escritura */}
            <div style={{ padding: '20px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>📜 Escritura</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Property deed / title</div>
                </div>
                {documents.escritura && <button type="button" onClick={() => removeDocument('escritura')} style={{ background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>}
              </div>
              {documents.escritura ? (
                <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#60a5fa', fontSize: '13px' }}>✓ {documents.escritura.name}</div>
              ) : (
                <label style={{ display: 'block', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px dashed rgba(203, 166, 88, 0.3)', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', color: '#94a3b8', fontSize: '14px' }}>
                  <input type="file" accept=".pdf" onChange={(e) => handleDocumentUpload('escritura', e)} style={{ display: 'none' }} />
                  Click to upload PDF
                </label>
              )}
            </div>

            {/* Contract */}
            <div style={{ padding: '20px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>📋 Contract</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Purchase agreement</div>
                </div>
                {documents.contract && <button type="button" onClick={() => removeDocument('contract')} style={{ background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>}
              </div>
              {documents.contract ? (
                <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#60a5fa', fontSize: '13px' }}>✓ {documents.contract.name}</div>
              ) : (
                <label style={{ display: 'block', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px dashed rgba(203, 166, 88, 0.3)', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', color: '#94a3b8', fontSize: '14px' }}>
                  <input type="file" accept=".pdf" onChange={(e) => handleDocumentUpload('contract', e)} style={{ display: 'none' }} />
                  Click to upload PDF
                </label>
              )}
            </div>

            {/* Other Documents */}
            <div style={{ padding: '20px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>📁 Other Documents</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Additional files (max 5)</div>
              </div>
              {documents.other.map((doc, idx) => (
                <div key={idx} style={{ padding: '8px 12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#60a5fa', fontSize: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>✓ {doc.name}</span>
                  <button type="button" onClick={() => removeDocument('other', idx)} style={{ background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer', fontSize: '14px' }}>×</button>
                </div>
              ))}
              {documents.other.length < 5 && (
                <label style={{ display: 'block', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px dashed rgba(203, 166, 88, 0.3)', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>
                  <input type="file" accept=".pdf" onChange={(e) => handleDocumentUpload('other', e)} style={{ display: 'none' }} />
                  Click to upload PDF ({documents.other.length}/5)
                </label>
              )}
            </div>
          </div>
        </div>

        <button type="submit" style={s.submitBtn}>Submit Property for Review</button>
      </form>
    </div>
  );
}