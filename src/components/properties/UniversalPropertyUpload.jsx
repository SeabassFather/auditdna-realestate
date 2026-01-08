import React, { useState } from 'react';
import PropertyPhotoUploader from '../upload/PropertyPhotoUploader';
import CitySearchEngine from './CitySearchEngine';
import MexicoMap from '../maps/MexicoMap';

export default function UniversalPropertyUpload({ type = 'mexico' }) {
  const [photos, setPhotos] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    sqft: '',
    propertyType: 'house'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (photos.length < 8) {
      alert('Please upload at least 8 photos');
      return;
    }

    setLoading(true);

    const storageKey = type === 'mexico' ? 'mexico_properties' : type === 'development' ? 'development_properties' : 'fsbo_properties';
    const properties = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    properties.push({
      ...formData,
      photos: photos.map(p => p.url),
      id: Date.now(),
      createdAt: new Date().toISOString(),
      type: type
    });
    
    localStorage.setItem(storageKey, JSON.stringify(properties));

    setSuccess(true);
    setLoading(false);
    
    setTimeout(() => {
      setSuccess(false);
      setFormData({ title: '', description: '', price: '', location: '', beds: '', baths: '', sqft: '', propertyType: 'house' });
      setPhotos([]);
    }, 2000);
  };

  const handleLocationSelect = (location) => {
    const locationStr = location.city ? location.city + ', ' + location.region : location.name;
    setFormData({ ...formData, location: locationStr });
    setShowMap(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
        Upload Property - {type === 'mexico' ? 'Mexico' : type === 'development' ? 'Development' : 'FSBO USA'}
      </h2>

      {success && (
        <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', borderRadius: '8px', color: '#10b981', marginBottom: '24px', fontSize: '16px', fontWeight: '600' }}>
          Property added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>
            Property Details
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
              Property Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="4"
              style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}
            />
          </div>

          {type === 'mexico' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Location * (Search or use map)
              </label>
              <CitySearchEngine onSearchResult={handleLocationSelect} />
              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                style={{ padding: '12px 24px', background: 'rgba(203, 166, 88, 0.1)', color: '#cba658', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}
              >
                {showMap ? 'Hide Map' : 'Show Interactive Map'}
              </button>
              {showMap && <MexicoMap onLocationSelect={handleLocationSelect} />}
              {formData.location && (
                <div style={{ padding: '12px', background: 'rgba(203, 166, 88, 0.1)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cba658', fontSize: '14px', fontWeight: '600' }}>
                  Selected: {formData.location}
                </div>
              )}
            </div>
          )}

          {type !== 'mexico' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Location (City, State) *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Price (USD) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Property Type *
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}
              >
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
                <option value="villa">Villa</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Bedrooms
              </label>
              <input
                type="number"
                value={formData.beds}
                onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}
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
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}
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
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}
              />
            </div>
          </div>
        </div>

        <PropertyPhotoUploader photos={photos} setPhotos={setPhotos} />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '20px',
            background: loading ? '#64748b' : 'linear-gradient(135deg, #cba658, #b8944d)',
            color: '#0f172a',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(203, 166, 88, 0.4)'
          }}
        >
          {loading ? 'Uploading Property...' : 'Submit Property Listing'}
        </button>
      </form>
    </div>
  );
}