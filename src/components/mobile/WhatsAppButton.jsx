import React from 'react';

export default function WhatsAppButton({ phone, propertyId, message }) {
  const handleClick = () => {
    const msg = encodeURIComponent(message || `Interested in property ${propertyId}`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <button onClick={handleClick} style={{
      padding: '12px 24px',
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
      💬 WhatsApp
    </button>
  );
}