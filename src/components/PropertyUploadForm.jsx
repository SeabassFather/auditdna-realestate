import React, { useState, useRef, useCallback } from "react";
import { Upload, X, Camera, Image } from 'lucide-react';

export default function PropertyUploadForm() {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyAddress: '',
    city: '',
    state: '',
    askingPrice: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    lotSize: '',
    yearBuilt: '',
    description: ''
  });

  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_PHOTOS = 8;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const processFiles = (files) => {
    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (photos.length + fileArray.length > MAX_PHOTOS) {
      setError(`Maximum ${MAX_PHOTOS} photos. You can add ${MAX_PHOTOS - photos.length} more.`);
      return;
    }

    const newPhotos = fileArray.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));

    setPhotos([...photos, ...newPhotos]);
    setError('');
  };

  const handlePhotoUpload = (e) => {
    processFiles(e.target.files);
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [photos]);

  const removePhoto = (index) => {
    const newPhotos = [...photos];
    URL.revokeObjectURL(newPhotos[index].preview);
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (photos.length === 0) {
      setError('Please upload at least 1 photo');
      return;
    }

    const message = `🏠 NEW LISTING\n\n${formData.ownerName}\n${formData.phone}\n${formData.email}\n\n${formData.propertyAddress}, ${formData.city}, ${formData.state}\n\nType: ${formData.propertyType}\nPrice: $${Number(formData.askingPrice).toLocaleString()}\nBeds/Baths: ${formData.bedrooms}/${formData.bathrooms}\nSq Ft: ${formData.squareFeet}\n\n${photos.length} photos`;
    
    window.open(`https://wa.me/526463402686?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    background: '#0f172a',
    border: '1px solid #334155',
    fontSize: '14px',
    color: '#f1f5f9',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    color: '#cba658',
    marginBottom: '6px',
    fontWeight: '500'
  };

  if (submitted) {
    return (
      <div style={{ background: '#0f172a', border: '1px solid #cba658', padding: '50px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px', color: '#cba658' }}>✓</div>
        <h3 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '10px' }}>Listing Submitted</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>We'll contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* DRAG & DROP PHOTO ZONE */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => photos.length < MAX_PHOTOS && fileInputRef.current?.click()}
        style={{
          border: isDragging ? '2px solid #cba658' : '2px dashed #475569',
          background: isDragging ? 'rgba(203,166,88,0.1)' : '#0f172a',
          padding: photos.length > 0 ? '16px' : '40px 20px',
          marginBottom: '20px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {photos.length === 0 ? (
          <div style={{ textAlign: 'center', position: 'relative' }}>
            {/* Background Property Image */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '-20px',
              right: '-20px',
              bottom: '-40px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              pointerEvents: 'none'
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Image size={40} color="#cba658" style={{ marginBottom: '12px' }} />
              <p style={{ color: '#f1f5f9', fontSize: '16px', marginBottom: '6px' }}>
                {isDragging ? 'Drop photos here' : 'Drag & Drop Property Photos'}
              </p>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>or click to browse</p>
              <div style={{ display: 'inline-block', padding: '8px 20px', border: '1px solid #cba658', color: '#cba658', fontSize: '12px' }}>
                SELECT FILES
              </div>
              <p style={{ color: '#475569', fontSize: '11px', marginTop: '12px' }}>Up to {MAX_PHOTOS} photos • JPG, PNG</p>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#cba658', fontSize: '13px', fontWeight: '600' }}>{photos.length} / {MAX_PHOTOS} PHOTOS</span>
              {photos.length < MAX_PHOTOS && <span style={{ color: '#64748b', fontSize: '12px' }}>Click to add more</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {photos.map((photo, index) => (
                <div key={index} style={{ position: 'relative', aspectRatio: '1', border: index === 0 ? '2px solid #cba658' : '1px solid #334155', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
                  <img src={photo.preview} alt={`Photo ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button type="button" onClick={(e) => { e.stopPropagation(); removePhoto(index); }} style={{ position: 'absolute', top: '4px', right: '4px', width: '22px', height: '22px', background: '#0f172a', border: '1px solid #475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={12} color="#f1f5f9" />
                  </button>
                  {index === 0 && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#cba658', padding: '3px', fontSize: '9px', color: '#0f172a', textAlign: 'center', fontWeight: '700' }}>MAIN</div>}
                </div>
              ))}
              {photos.length < MAX_PHOTOS && (
                <div style={{ aspectRatio: '1', border: '1px dashed #475569', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <Camera size={18} color="#64748b" />
                  <span style={{ fontSize: '10px', color: '#64748b' }}>ADD</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{ display: 'none' }} />

      {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', padding: '10px', marginBottom: '16px', color: '#f87171', fontSize: '13px' }}>{error}</div>}

      {/* CONTACT INFO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div><label style={labelStyle}>Owner Name *</label><input name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Full Name" required style={inputStyle} /></div>
        <div><label style={labelStyle}>Email *</label><input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required style={inputStyle} /></div>
        <div><label style={labelStyle}>Phone *</label><input name="phone" value={formData.phone} onChange={handleChange} placeholder="+52 646 123 4567" required style={inputStyle} /></div>
      </div>

      {/* PROPERTY ADDRESS */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div><label style={labelStyle}>Property Address *</label><input name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} placeholder="123 Ocean View Dr" required style={inputStyle} /></div>
        <div><label style={labelStyle}>City *</label><input name="city" value={formData.city} onChange={handleChange} placeholder="Ensenada" required style={inputStyle} /></div>
        <div><label style={labelStyle}>State *</label><input name="state" value={formData.state} onChange={handleChange} placeholder="Baja California" required style={inputStyle} /></div>
      </div>

      {/* PROPERTY DETAILS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>Property Type *</label>
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">Select...</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Villa">Villa</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
            <option value="Ranch">Ranch</option>
            <option value="Oceanfront">Oceanfront</option>
          </select>
        </div>
        <div><label style={labelStyle}>Price (USD) *</label><input name="askingPrice" type="number" value={formData.askingPrice} onChange={handleChange} placeholder="350000" required style={inputStyle} /></div>
        <div><label style={labelStyle}>Bedrooms</label><input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} placeholder="3" style={inputStyle} /></div>
        <div><label style={labelStyle}>Bathrooms</label><input name="bathrooms" type="number" step="0.5" value={formData.bathrooms} onChange={handleChange} placeholder="2.5" style={inputStyle} /></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div><label style={labelStyle}>Square Feet</label><input name="squareFeet" type="number" value={formData.squareFeet} onChange={handleChange} placeholder="2500" style={inputStyle} /></div>
        <div><label style={labelStyle}>Lot Size</label><input name="lotSize" value={formData.lotSize} onChange={handleChange} placeholder="0.25 acres" style={inputStyle} /></div>
        <div><label style={labelStyle}>Year Built</label><input name="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleChange} placeholder="2020" style={inputStyle} /></div>
      </div>

      {/* DESCRIPTION */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Property features, views, amenities..." rows={3} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} />
      </div>

      {/* SUBMIT */}
      <button type="submit" disabled={photos.length === 0} style={{
        width: '100%',
        padding: '16px',
        background: photos.length > 0 ? '#cba658' : '#334155',
        border: 'none',
        color: photos.length > 0 ? '#0f172a' : '#64748b',
        fontSize: '14px',
        fontWeight: '700',
        letterSpacing: '1px',
        cursor: photos.length > 0 ? 'pointer' : 'not-allowed'
      }}>
        <Upload size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
        {photos.length > 0 ? `SUBMIT LISTING (${photos.length} PHOTO${photos.length > 1 ? 'S' : ''})` : 'ADD PHOTOS TO SUBMIT'}
      </button>
    </form>
  );
}