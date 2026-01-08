import React, { useState } from 'react';
import PropertyPhotoUploader from '../upload/PropertyPhotoUploader';
import DocumentUploader from '../loan/DocumentUploader';

export default function AgentPropertyUpload() {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    country: 'Mexico',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    lotSize: '',
    propertyType: 'Single Family',
    description: '',
    features: [],
    yearBuilt: ''
  });

  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState({});

  const handlePhotoUpload = (files) => {
    setPhotos(files);
  };

  const handleDocumentUpload = (docType, files) => {
    setDocuments({ ...documents, [docType]: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (photos.length < 5) {
      alert('Please upload at least 5 photos');
      return;
    }

    const property = {
      ...formData,
      id: Date.now(),
      photos,
      documents,
      status: 'pending',
      agentEmail: localStorage.getItem('agentEmail') || 'agent@example.com',
      submittedAt: new Date().toISOString()
    };

    // Save to pending properties
    const pending = JSON.parse(localStorage.getItem('pending_properties') || '[]');
    pending.push(property);
    localStorage.setItem('pending_properties', JSON.stringify(pending));

    alert('Property submitted for admin review!');

    // Reset form
    setFormData({
      title: '', address: '', city: '', state: '', country: 'Mexico',
      price: '', beds: '', baths: '', sqft: '', lotSize: '',
      propertyType: 'Single Family', description: '', features: [], yearBuilt: ''
    });
    setPhotos([]);
    setDocuments({});
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
        Upload Mexico Property Listing
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(203, 166, 88, 0.3)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
            Property Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Property Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g. Ocean View Villa - Valle de Guadalupe"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Address *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                placeholder="Cabo San Lucas"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              >
                <option value="">Select State</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Guanajuato">Guanajuato</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Price (USD) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="850000"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Bedrooms *
              </label>
              <input
                type="number"
                value={formData.beds}
                onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Bathrooms *
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.baths}
                onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Square Feet *
              </label>
              <input
                type="number"
                value={formData.sqft}
                onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows="4"
                placeholder="Describe the property, location, amenities..."
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(203, 166, 88, 0.3)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '16px' }}>
            Property Photos (Minimum 5 required) *
          </h3>
          <PropertyPhotoUploader onUpload={handlePhotoUpload} existingFiles={photos} />
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(203, 166, 88, 0.3)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
            Property Documents
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
              Title/Deed
            </div>
            <DocumentUploader documentType="title" onUpload={handleDocumentUpload} existingFiles={documents.title || []} />
          </div>

          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
              Property Disclosures
            </div>
            <DocumentUploader documentType="disclosures" onUpload={handleDocumentUpload} existingFiles={documents.disclosures || []} />
          </div>
        </div>

        <button
          type="submit"
          disabled={photos.length < 5}
          style={{
            width: '100%',
            padding: '18px',
            background: photos.length >= 5 ? 'linear-gradient(135deg, #cba658, #b8944d)' : '#334155',
            color: photos.length >= 5 ? '#0f172a' : '#64748b',
            border: 'none',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: '700',
            cursor: photos.length >= 5 ? 'pointer' : 'not-allowed',
            boxShadow: photos.length >= 5 ? '0 8px 20px rgba(203, 166, 88, 0.5)' : 'none'
          }}
        >
          {photos.length < 5 ? `Upload ${5 - photos.length} More Photos` : 'Submit for Admin Review'}
        </button>
      </form>
    </div>
  );
}