import React, { useState } from 'react';

export default function PropertyPhotoUploader({ photos, setPhotos, maxPhotos = 8 }) {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    const newPhotos = Array.from(files).slice(0, maxPhotos - photos.length);
    const photoUrls = newPhotos.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setPhotos([...photos, ...photoUrls].slice(0, maxPhotos));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removePhoto = (index) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>
        Upload Photos (8 Required)
      </h3>
      
      <div style={{ 
        padding: '12px 16px', 
        background: 'rgba(59, 130, 246, 0.1)', 
        border: '2px solid #3b82f6', 
        borderRadius: '8px', 
        marginBottom: '20px' 
      }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#60a5fa', marginBottom: '4px' }}>
          Photo Requirements
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
          Upload 8 high-quality photos minimum. Maximum file size: 5MB per photo.
        </div>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: dragActive ? '3px solid #cba658' : '3px dashed rgba(203, 166, 88, 0.3)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          background: dragActive ? 'rgba(203, 166, 88, 0.1)' : 'rgba(30, 41, 59, 0.4)',
          cursor: 'pointer',
          marginBottom: '24px',
          transition: 'all 0.3s'
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          style={{ display: 'none' }}
          id="photo-upload"
          disabled={photos.length >= maxPhotos}
        />
        <label htmlFor="photo-upload" style={{ cursor: photos.length >= maxPhotos ? 'not-allowed' : 'pointer' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>CAMERA</div>
          <div style={{ fontSize: '16px', color: '#f1f5f9', marginBottom: '8px' }}>
            Drag and drop photos here, or click to select
          </div>
          <div style={{ fontSize: '14px', color: '#94a3b8' }}>
            {photos.length} / {maxPhotos} photos uploaded
          </div>
        </label>
      </div>

      {photos.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {photos.map((photo, index) => (
            <div key={index} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src={photo.url} 
                alt={'Photo ' + (index + 1)} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
              />
              <button
                onClick={() => removePhoto(index)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  padding: '6px 12px',
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}