import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropertyPhotoUploader from '../components/upload/PropertyPhotoUploader';
import CitySearchEngine from '../components/properties/CitySearchEngine';

export default function AdminPropertyUpload() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [propertyType, setPropertyType] = useState('mexico');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    sqft: '',
    type: 'house'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', color: '#ef4444', marginBottom: '16px' }}>Access Denied</h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '24px' }}>Admin access required</p>
          <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: '#cba658', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (photos.length < 8) {
      alert('Please upload at least 8 photos');
      return;
    }

    setLoading(true);

    const storageKey = propertyType === 'mexico' ? 'mexico_properties' : propertyType === 'development' ? 'development_properties' : 'fsbo_properties';
    const properties = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    properties.push({
      ...formData,
      photos: photos.map(p => p.url),
      id: Date.now(),
      createdAt: new Date().toISOString(),
      uploadedBy: user.email,
      status: 'active'
    });
    
    localStorage.setItem(storageKey, JSON.stringify(properties));

    setSuccess(true);
    setLoading(false);
    
    setTimeout(() => {
      setSuccess(false);
      setFormData({ title: '', description: '', price: '', location: '', beds: '', baths: '', sqft: '', type: 'house' });
      setPhotos([]);
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#cba658', marginBottom: '8px' }}>Admin Property Upload</h1>
            <p style={{ fontSize: '16px', color: '#94a3b8' }}>Upload properties to any section</p>
          </div>
          <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: 'rgba(203, 166, 88, 0.1)', color: '#cba658', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>

        {success && (
          <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', borderRadius: '12px', color: '#10b981', marginBottom: '32px', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>
            Property uploaded successfully!
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
            Select Property Section
          </label>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { id: 'mexico', label: 'Mexico Real Estate' },
              { id: 'development', label: 'Developments' },
              { id: 'fsbo', label: 'FSBO USA' }
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setPropertyType(section.id)}
                style={{
                  padding: '16px 32px',
                  background: propertyType === section.id ? 'linear-gradient(135deg, #cba658, #b8944d)' : 'rgba(203, 166, 88, 0.1)',
                  color: propertyType === section.id ? '#0f172a' : '#cba658',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '40px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cba658', marginBottom: '24px' }}>
              Property Details
            </h3>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Property Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                placeholder="e.g., Luxury Oceanfront Villa - Cabo San Lucas"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows="5"
                style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                placeholder="Detailed property description..."
              />
            </div>

            {propertyType === 'mexico' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Location (Search for city) *
                </label>
                <CitySearchEngine onSearchResult={(location) => setFormData({ ...formData, location })} />
                {formData.location && (
                  <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(203, 166, 88, 0.1)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cba658', fontSize: '14px', fontWeight: '600' }}>
                    Selected: {formData.location}
                  </div>
                )}
              </div>
            )}

            {propertyType !== 'mexico' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Location (City, State) *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="e.g., San Diego, CA"
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Price (USD) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="450000"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Property Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                >
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Square Feet
                </label>
                <input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '40px', marginBottom: '32px' }}>
            <PropertyPhotoUploader photos={photos} setPhotos={setPhotos} />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '24px',
              background: loading ? '#64748b' : 'linear-gradient(135deg, #cba658, #b8944d)',
              color: '#0f172a',
              border: 'none',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 20px rgba(203, 166, 88, 0.4)'
            }}
          >
            {loading ? 'Uploading Property...' : 'Upload Property'}
          </button>
        </form>
      </div>
    </div>
  );
}