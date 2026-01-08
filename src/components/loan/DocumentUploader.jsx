import React, { useState } from 'react';

export default function DocumentUploader({ documentType, onUpload, existingFiles = [] }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState(existingFiles);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
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

  const handleFiles = async (fileList) => {
    setUploading(true);
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadedAt: new Date().toISOString()
    }));
    
    const updated = [...files, ...newFiles];
    setFiles(updated);
    
    if (onUpload) {
      onUpload(documentType, updated);
    }
    
    setUploading(false);
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onUpload) {
      onUpload(documentType, updated);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: dragActive ? '3px solid #cba658' : '2px dashed rgba(203, 166, 88, 0.4)',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
          background: dragActive ? 'rgba(203, 166, 88, 0.1)' : 'rgba(30, 41, 59, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s',
          marginBottom: '16px'
        }}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleChange}
          style={{ display: 'none' }}
          id={`file-upload-${documentType}`}
        />
        <label htmlFor={`file-upload-${documentType}`} style={{ cursor: 'pointer', display: 'block' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
          <div style={{ fontSize: '16px', color: '#f1f5f9', marginBottom: '8px', fontWeight: '600' }}>
            {uploading ? 'Uploading...' : 'Drag & drop files here or click to browse'}
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>
            Accepted: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
            Uploaded Files ({files.length})
          </div>
          <div style={{ display: 'grid', gap: '8px' }}>
            {files.map((file, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div style={{ fontSize: '24px' }}>
                    {file.type.includes('pdf') ? '' : file.type.includes('image') ? '' : ''}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {formatFileSize(file.size)}  {new Date(file.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    padding: '8px 16px',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}