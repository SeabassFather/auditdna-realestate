import React, { useRef } from 'react';

export default function CameraUpload({ onCapture, maxPhotos = 6 }) {
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  const handleCamera = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => onCapture({ file, data: ev.target.result, type: 'photo' });
      reader.readAsDataURL(file);
    });
  };

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button 
        onClick={() => cameraRef.current.click()} 
        style={{
          padding: '14px 24px',
          background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        📸 Camera
      </button>

      <button 
        onClick={() => galleryRef.current.click()} 
        style={{
          padding: '14px 24px',
          background: 'linear-gradient(135deg, #22d3ee, #ec4899)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        🖼️ Gallery
      </button>

      <input 
        ref={cameraRef} 
        type="file" 
        accept="image/*" 
        capture="environment" 
        onChange={handleCamera} 
        style={{ display: 'none' }} 
        multiple={maxPhotos > 1} 
      />
      <input 
        ref={galleryRef} 
        type="file" 
        accept="image/*" 
        onChange={handleCamera} 
        style={{ display: 'none' }} 
        multiple 
      />
    </div>
  );
}