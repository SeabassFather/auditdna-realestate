import React, { useState } from 'react';

export default function PhotoUploader({ onPhotosChange, maxPhotos = 10, minPhotos = 8 }) {
  const [photos, setPhotos] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [];
    
    files.forEach(file => {
      if (file.size > 5000000) {
        alert(`${file.name} is too large. Max 5MB per photo.`);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        newPhotos.push({
          file: file,
          preview: event.target.result,
          name: file.name
        });
        
        if (newPhotos.length === files.length) {
          const updated = [...photos, ...newPhotos].slice(0, maxPhotos);
          setPhotos(updated);
          onPhotosChange(updated);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    onPhotosChange(updated);
  };

  const isValid = photos.length >= minPhotos;

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Status Banner */}
      <div style={{
        marginBottom: '20px',
        padding: '16px',
        background: isValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        border: `1px solid ${isValid ? '#22c55e' : '#ef4444'}`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ fontSize: '24px' }}>{isValid ? '✓' : '⚠'}</div>
        <div style={{ fontSize: '14px', color: isValid ? '#22c55e' : '#ef4444', fontWeight: '600' }}>
          {photos.length} of {minPhotos} minimum photos uploaded
          {!isValid && ` - Need ${minPhotos - photos.length} more`}
        </div>
      </div>

      {/* Upload Button */}
      <label style={{
        display: 'block',
        padding: '40px',
        background: 'rgba(203, 166, 88, 0.1)',
        border: '2px dashed rgba(203, 166, 88, 0.5)',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        marginBottom: '24px',
        transition: 'all 0.3s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cba658'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.5)'}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📷</div>
        <div style={{ fontSize: '18px', fontWeight: '600', color: '#cba658', marginBottom: '8px' }}>
          Click to Upload Photos
        </div>
        <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
          Required: Front, Back, Kitchen, Living Room, Bedrooms, Bathrooms
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          PNG, JPG up to 5MB each | Max {maxPhotos} photos
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </label>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {photos.map((photo, idx) => (
            <div key={idx} style={{
              position: 'relative',
              aspectRatio: '1',
              background: '#1e293b',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid rgba(203, 166, 88, 0.3)'
            }}>
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img
                src={photo.preview}
                alt={`Photo ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#cba658',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                #{idx + 1}
              </div>
              <button
                type="button"
                onClick={() => removePhoto(idx)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(239, 68, 68, 0.9)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: '700',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
