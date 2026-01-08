import React from 'react';
import QRCode from 'qrcode';

export default function QRGenerator({ data, size = 200 }) {
  const [qr, setQr] = React.useState('');

  React.useEffect(() => {
    if (data) {
      QRCode.toDataURL(data, { 
        width: size,
        color: {
          dark: '#1a202c',
          light: '#ffffff'
        }
      }).then(setQr);
    }
  }, [data, size]);

  return qr ? (
    <div style={{
      padding: '16px',
      background: '#fff',
      borderRadius: '12px',
      border: '2px solid #3b82f6',
      display: 'inline-block',
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
    }}>
      <img src={qr} alt="QR Code" style={{ borderRadius: '8px', display: 'block' }} />
    </div>
  ) : (
    <div style={{
      padding: '40px',
      background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
      color: '#fff',
      borderRadius: '12px',
      fontWeight: '600'
    }}>
      Generating QR...
    </div>
  );
}