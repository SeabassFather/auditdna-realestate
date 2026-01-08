import { propertyAPI } from '../services/api';
import React, { useState } from 'react';
import PhotoUploader from '../components/upload/PhotoUploader';
import { useNavigate } from 'react-router-dom';

export default function AgentPropertyUpload() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [generatingDesc, setGeneratingDesc] = useState(false);
  const [analyzingPrice, setAnalyzingPrice] = useState(false);
  const [pricePrediction, setPricePrediction] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
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

  const generateAIDescription = async () => {
    if (!formData.title || !formData.city || !formData.beds || !formData.baths) {
      alert('Please fill in Title, City, Beds, and Baths first');
      return;
    }
    setGeneratingDesc(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: `Create a compelling luxury real estate listing for: ${formData.title} in ${formData.city}, ${formData.region}. ${formData.beds}BR/${formData.baths}BA, ${formData.sqft} sqft. Write 150 words highlighting luxury, location, and investment appeal for high-net-worth buyers.` }]
        })
      });
      const data = await response.json();
      setFormData({...formData, description: data.content[0].text});
      alert(' AI Description Generated!');
    } catch (err) {
      alert('Error. Try again.');
    }
    setGeneratingDesc(false);
  };

  const analyzePricing = async () => {
    if (!formData.region || !formData.city || !formData.beds || !formData.sqft) {
      alert('Fill in Region, City, Beds, Sqft first');
      return;
    }
    setAnalyzingPrice(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          messages: [{ role: 'user', content: `Analyze ${formData.city}, ${formData.region} property: ${formData.beds}BR/${formData.baths}BA, ${formData.sqft}sqft. Respond ONLY with JSON: {"estimatedPrice": 450000, "priceRange": {"low": 400000, "high": 500000}, "pricePerSqft": 130, "marketTrend": "rising", "confidence": 87, "recommendation": "Price competitively"}` }]
        })
      });
      const data = await response.json();
      const text = data.content[0].text.replace(/```json|```/g, '').trim();
      const prediction = JSON.parse(text);
      setPricePrediction(prediction);
      if (prediction.estimatedPrice > 0) setFormData({...formData, price: prediction.estimatedPrice.toString()});
    } catch (err) {
      alert('Error analyzing price');
    }
    setAnalyzingPrice(false);
  };

  const analyzeProperty = async () => {
    if (!formData.city || !formData.beds || !formData.sqft || !formData.price) {
      alert('Fill in City, Beds, Sqft, Price first');
      return;
    }
    setAnalyzing(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          messages: [{ role: 'user', content: `Investment analysis for ${formData.city} property: ${formData.beds}BR, ${formData.sqft}sqft, $${formData.price}. Respond ONLY with JSON: {"investmentGrade": "A+", "roiEstimate": "8-12%", "rentalYield": "6-8%", "strengths": ["Prime location", "Strong demand", "Tourism"], "risks": ["Market volatility", "Currency"], "targetBuyer": "Foreign investors seeking rental income"}` }]
        })
      });
      const data = await response.json();
      const text = data.content[0].text.replace(/```json|```/g, '').trim();
      setAnalysis(JSON.parse(text));
    } catch (err) {
      alert('Error analyzing');
    }
    setAnalyzing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 8) { alert('Upload 8 photos'); return; }
    console.log('Data:', formData, 'Images:', images);
    alert('Property submitted!');
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
    submitBtn: { width: '100%', padding: '18px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', marginTop: '20px' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h1 style={s.title}>List New Property</h1>
        <p style={s.subtitle}>AI-Powered Listing Creation</p>
      </div>
      <form style={s.form} onSubmit={handleSubmit}>
        <div style={s.section}>
          <h3 style={s.sectionTitle}>Property Details</h3>
          <div style={s.grid}>
            <div style={s.inputGroup}><label style={s.label}>Title*</label><input style={s.input} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /></div>
            <div style={s.inputGroup}><label style={s.label}>Type*</label><select style={s.input} value={formData.propertyType} onChange={(e) => setFormData({...formData, propertyType: e.target.value})} required><option value="">Select</option><option>Villa</option><option>Estate</option><option>Condo</option><option>Beach House</option></select></div>
            <div style={s.inputGroup}><label style={s.label}>Region*</label><select style={s.input} value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value, city: ''})} required><option value="">Select</option>{regions.map(r => <option key={r}>{r}</option>)}</select></div>
            <div style={s.inputGroup}><label style={s.label}>City*</label><select style={s.input} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required disabled={!formData.region}><option value="">Select</option>{formData.region && cities[formData.region]?.map(c => <option key={c}>{c}</option>)}</select></div>
            <div style={s.inputGroup}>
              <label style={s.label}>Price (USD)*</label>
              <button type="button" onClick={analyzePricing} disabled={analyzingPrice} style={{ marginBottom: '12px', padding: '12px', width: '100%', background: analyzingPrice ? '#64748b' : 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: analyzingPrice ? 'not-allowed' : 'pointer' }}>
                {analyzingPrice ? ' Analyzing...' : ' AI Price Analysis'}
              </button>
              {pricePrediction && (
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '6px', marginBottom: '8px', fontSize: '12px', color: '#10b981' }}>
                   ${pricePrediction.estimatedPrice?.toLocaleString()} | Range: ${pricePrediction.priceRange?.low?.toLocaleString()}-${pricePrediction.priceRange?.high?.toLocaleString()} | {pricePrediction.marketTrend}
                </div>
              )}
              <input type="number" style={s.input} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div style={s.inputGroup}><label style={s.label}>Beds*</label><input type="number" style={s.input} value={formData.beds} onChange={(e) => setFormData({...formData, beds: e.target.value})} required /></div>
            <div style={s.inputGroup}><label style={s.label}>Baths*</label><input type="number" step="0.5" style={s.input} value={formData.baths} onChange={(e) => setFormData({...formData, baths: e.target.value})} required /></div>
            <div style={s.inputGroup}><label style={s.label}>Sqft*</label><input type="number" style={s.input} value={formData.sqft} onChange={(e) => setFormData({...formData, sqft: e.target.value})} required /></div>
          </div>
          <div style={s.inputGroup}>
            <label style={s.label}>Description*</label>
            <button type="button" onClick={generateAIDescription} disabled={generatingDesc} style={{ marginBottom: '12px', padding: '12px 24px', background: generatingDesc ? '#64748b' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: generatingDesc ? 'not-allowed' : 'pointer' }}>
              {generatingDesc ? ' Generating...' : ' Generate AI Description'}
            </button>
            <textarea style={s.textarea} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          </div>
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
        {analysis && (
          <div style={{ padding: '24px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '12px', marginBottom: '24px' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#60a5fa', marginBottom: '12px' }}> Investment Analysis</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
              <div><strong>Grade:</strong> {analysis.investmentGrade}</div>
              <div><strong>ROI:</strong> {analysis.roiEstimate}</div>
              <div style={{ gridColumn: '1 / -1' }}><strong>Target:</strong> {analysis.targetBuyer}</div>
            </div>
          </div>
        )}
        <button type="button" onClick={analyzeProperty} disabled={analyzing} style={{ width: '100%', padding: '16px', background: analyzing ? '#64748b' : 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: analyzing ? 'not-allowed' : 'pointer', marginBottom: '16px' }}>
          {analyzing ? ' Analyzing...' : ' Analyze Investment'}
        </button>
        <button type="submit" style={s.submitBtn}>Submit Property</button>
      </form>
    </div>
  );
}