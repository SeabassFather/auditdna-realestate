import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Upload, X } from 'lucide-react';

export default function AgentDashboard() {
  const navigate = useNavigate();
  const agent = authService.getCurrentUser();
  const [formData, setFormData] = useState({
    title: '', territory: 'Valle de Guadalupe', price: '', beds: '', baths: '',
    sqft: '', type: 'House', description: '', images: []
  });
  const [previewImages, setPreviewImages] = useState([]);

  const territories = [
    'Valle de Guadalupe', 'Ensenada', 'Rosarito', 'Tijuana', 'Tecate', 'San Felipe',
    'La Paz', 'Cabo San Lucas', 'San José del Cabo', 'Todos Santos', 'Loreto',
    'Puerto Vallarta', 'Sayulita', 'Punta Mita', 'Tulum', 'Playa del Carmen', 'Cancún', 'Mérida'
  ];

  const propertyTypes = ['House', 'Villa', 'Condo', 'Estate', 'Hacienda', 'Land', 'Commercial'];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];
    
    files.forEach(file => {
      if (file.size > 5000000) {
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviews.push({ file: file, preview: event.target.result });
        if (newPreviews.length === files.length) {
          setPreviewImages(prev => [...prev, ...newPreviews]);
          setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const properties = JSON.parse(localStorage.getItem('agent_properties') || '[]');
    const newProperty = {
      ...formData,
      id: Date.now().toString(),
      agentId: agent.id,
      agentName: `${agent.firstName} ${agent.lastName}`,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    properties.push(newProperty);
    localStorage.setItem('agent_properties', JSON.stringify(properties));
    alert('Property uploaded successfully!');
    setFormData({ title: '', territory: 'Valle de Guadalupe', price: '', beds: '', baths: '', sqft: '', type: 'House', description: '', images: [] });
    setPreviewImages([]);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <header style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(203, 166, 88, 0.2)', padding: '20px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#cba658' }}>Agent Dashboard</h1>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Welcome, {agent?.firstName} {agent?.lastName}</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => navigate('/mexico-real-estate')} style={{ padding: '10px 20px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#60a5fa', fontWeight: '600', cursor: 'pointer' }}>View Properties</button>
            <button onClick={handleLogout} style={{ padding: '10px 20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#fca5a5', fontWeight: '600', cursor: 'pointer' }}>Logout</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '12px', padding: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#f1f5f9', marginBottom: '24px' }}>Upload New Property</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Property Title*</label>
              <input required value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g., Luxury Ocean View Villa" style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Territory*</label>
                <select required value={formData.territory} onChange={(e) => setFormData(prev => ({ ...prev, territory: e.target.value }))} style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }}>
                  {territories.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Type*</label>
                <select required value={formData.type} onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))} style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }}>
                  {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Price (USD)*</label>
                <input type="number" required value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Beds*</label>
                <input type="number" required value={formData.beds} onChange={(e) => setFormData(prev => ({ ...prev, beds: e.target.value }))} style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Baths*</label>
                <input type="number" step="0.5" required value={formData.baths} onChange={(e) => setFormData(prev => ({ ...prev, baths: e.target.value }))} style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Sq Ft*</label>
                <input type="number" required value={formData.sqft} onChange={(e) => setFormData(prev => ({ ...prev, sqft: e.target.value }))} style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Description*</label>
              <textarea required value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={4} style={{ width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px', resize: 'vertical' }} />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Photos* (Max 5MB each)</label>
              <div style={{ border: '2px dashed #334155', borderRadius: '8px', padding: '32px', textAlign: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('imageUpload').click()}>
                <Upload size={48} style={{ color: '#60a5fa', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '16px', color: '#f1f5f9', marginBottom: '8px' }}>Click to upload photos</p>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>PNG, JPG up to 5MB each</p>
              </div>
              <input id="imageUpload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              
              {previewImages.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '20px' }}>
                  {previewImages.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={img.preview} alt={`Preview ${idx + 1}`} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                      <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" disabled={previewImages.length === 0} style={{ width: '100%', padding: '16px', background: previewImages.length === 0 ? '#334155' : 'linear-gradient(135deg, #3b82f6, #22d3ee)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: previewImages.length === 0 ? 'not-allowed' : 'pointer', opacity: previewImages.length === 0 ? 0.5 : 1 }}>
              {previewImages.length === 0 ? 'Add at least 1 photo' : 'Upload Property'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}