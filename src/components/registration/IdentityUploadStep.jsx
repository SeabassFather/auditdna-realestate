import React, { useState, useRef } from 'react';

const IdentityUploadStep = ({ data, onUpdate, onNext, onBack }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors({ file: 'Invalid file type. Please upload JPG, PNG, or PDF.' });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setErrors({ file: 'File too large. Maximum size is 10MB.' });
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpdate({
        ...data,
        idDocumentUrl: e.target.result,
        idDocumentName: file.name,
        idDocumentSize: file.size,
        idDocumentType: file.type
      });
      setErrors({});
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    onUpdate({
      ...data,
      idDocumentUrl: null,
      idDocumentName: null,
      idDocumentSize: null,
      idDocumentType: null
    });
  };

  const handleSubmit = () => {
    const newErrors = {};
    
    if (!data.idType) newErrors.idType = 'Please select document type';
    if (!data.idDocumentUrl) newErrors.file = 'Please upload your ID document';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const selectStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(30, 41, 59, 0.6)',
    border: errors.idType ? '1px solid rgba(248, 113, 113, 0.5)' : '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '4px',
    color: '#e2e8f0',
    fontSize: '14px',
    outline: 'none',
    marginBottom: '4px',
    boxSizing: 'border-box'
  };

  const dropZoneStyle = {
    border: isDragging ? '2px dashed #cba658' : '2px dashed rgba(148, 163, 184, 0.3)',
    borderRadius: '8px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: isDragging ? 'rgba(203, 166, 88, 0.1)' : 'rgba(30, 41, 59, 0.3)'
  };

  const uploadedFileStyle = {
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid rgba(203, 166, 88, 0.3)',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🪪</div>
        <h2 style={{ fontSize: '18px', fontWeight: '200', letterSpacing: '4px', color: '#cba658', marginBottom: '8px' }}>
          IDENTITY VERIFICATION
        </h2>
        <p style={{ fontSize: '12px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px' }}>
          Upload a valid government-issued ID
        </p>
      </div>

      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        {/* Document Type Selection */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.7)', marginBottom: '8px', textTransform: 'uppercase' }}>
            Document Type *
          </label>
          <select
            value={data.idType || ''}
            onChange={(e) => {
              onUpdate({ ...data, idType: e.target.value });
              if (errors.idType) setErrors(prev => ({ ...prev, idType: null }));
            }}
            style={selectStyle}
          >
            <option value="">Select document type</option>
            <option value="INE">INE (Mexico Voter ID)</option>
            <option value="Passport">Passport</option>
            <option value="DriverLicense">Driver's License</option>
          </select>
          {errors.idType && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>{errors.idType}</div>}
        </div>

        {/* File Upload Area */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.7)', marginBottom: '8px', textTransform: 'uppercase' }}>
            Upload Document *
          </label>

          {!data.idDocumentUrl ? (
            <div
              style={dropZoneStyle}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📄</div>
              <p style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '8px' }}>
                {isDragging ? 'Drop your file here' : 'Drag & drop your ID here'}
              </p>
              <p style={{ color: 'rgba(148, 163, 184, 0.5)', fontSize: '12px', marginBottom: '16px' }}>
                or click to browse files
              </p>
              <div style={{ 
                display: 'inline-block',
                padding: '10px 24px',
                background: 'rgba(203, 166, 88, 0.2)',
                border: '1px solid rgba(203, 166, 88, 0.5)',
                color: '#cba658',
                fontSize: '11px',
                letterSpacing: '2px'
              }}>
                SELECT FILE
              </div>
              <p style={{ color: 'rgba(148, 163, 184, 0.4)', fontSize: '10px', marginTop: '16px' }}>
                Accepted: JPG, PNG, PDF • Max 10MB
              </p>
            </div>
          ) : (
            <div style={uploadedFileStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '32px' }}>
                  {data.idDocumentType?.includes('pdf') ? '📑' : '🖼️'}
                </div>
                <div>
                  <p style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '4px' }}>
                    {data.idDocumentName}
                  </p>
                  <p style={{ color: 'rgba(148, 163, 184, 0.5)', fontSize: '11px' }}>
                    {formatFileSize(data.idDocumentSize)}
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(248, 113, 113, 0.2)',
                  border: '1px solid rgba(248, 113, 113, 0.5)',
                  color: '#f87171',
                  fontSize: '10px',
                  letterSpacing: '1px',
                  cursor: 'pointer'
                }}
              >
                REMOVE
              </button>
            </div>
          )}
          {errors.file && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '8px' }}>{errors.file}</div>}
        </div>

        {/* Requirements */}
        <div style={{ 
          background: 'rgba(30, 41, 59, 0.3)', 
          border: '1px solid rgba(148, 163, 184, 0.1)', 
          borderRadius: '8px', 
          padding: '16px',
          marginBottom: '24px'
        }}>
          <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#cba658', marginBottom: '12px' }}>
            REQUIREMENTS
          </p>
          <ul style={{ margin: 0, padding: '0 0 0 16px', color: 'rgba(148, 163, 184, 0.7)', fontSize: '12px', lineHeight: '1.8' }}>
            <li>Document must be clearly readable</li>
            <li>All four corners must be visible</li>
            <li>No glare, blur, or obstruction</li>
            <li>Must be valid (not expired)</li>
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '16px',
              background: 'transparent',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              color: 'rgba(148, 163, 184, 0.7)',
              fontSize: '12px',
              letterSpacing: '3px',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            ← BACK
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '16px',
              background: 'rgba(203, 166, 88, 0.2)',
              border: '1px solid rgba(203, 166, 88, 0.5)',
              color: '#cba658',
              fontSize: '12px',
              letterSpacing: '3px',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            CONTINUE →
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityUploadStep;