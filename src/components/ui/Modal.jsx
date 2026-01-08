import React from "react";

export default function Modal({ isOpen, onClose, title, children, size = "medium" }) {
  if (!isOpen) return null;

  const sizes = {
    small: '400px',
    medium: '600px',
    large: '900px',
    xlarge: '1200px'
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}
    onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: sizes[size],
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'modalSlideIn 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '25px 30px',
          borderBottom: '2px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#065f46', margin: 0}}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '32px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0',
              lineHeight: '1'
            }}
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div style={{padding: '30px'}}>
          {children}
        </div>
      </div>
    </div>
  );
}

