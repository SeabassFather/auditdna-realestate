import React from 'react';

export default function ProduceTicker() {
  const commodities = [
    { name: 'Avocado (Organic)', price: '$52.67', change: '+4.2%', origin: 'Michoacán, MX', icon: '🥑' },
    { name: 'Hass Avocado 32s', price: '$58.50', change: '+4.2%', origin: 'Michoacán, MX', icon:  '🥑' },
    { name: 'Hass Avocado 36s', price: '$55.00', change: '+3.8%', origin: 'Michoacán, MX', icon: '🥑' },
    { name: 'Hass Avocado 40s', price: '$52.00', change: '+3.5%', origin: 'Jalisco, MX', icon: '🥑' },
    { name: 'Hass Avocado 48s', price: '$48.50', change: '+3.2%', origin: 'Jalisco, MX', icon: '🥑' },
    { name: 'Hass Avocado 60s', price: '$42.00', change: '+2.8%', origin: 'Nayarit, MX', icon: '🥑' },
    { name: 'Hass Avocado 70s', price: '$38.50', change: '+2.5%', origin: 'Nayarit, MX', icon:  '🥑' },
    { name: 'Hass Avocado 84s', price: '$35.00', change: '+2.2%', origin: 'Nayarit, MX', icon:  '🥑' },
    { name: 'Strawberry', price: '$28.71', change: '+3.3%', origin: 'San Quintin, BC, MX', icon: '🍓' },
    { name: 'Strawberries 8x1lb', price: '$32.00', change: '+5.5%', origin: 'Baja CA, MX', icon: '🍓' },
    { name: 'Strawberries 12x1lb', price: '$45.00', change: '+5.8%', origin: 'Baja CA, MX', icon:  '🍓' },
    { name: 'Raspberries 6oz', price: '$52.90', change: '+7.2%', origin: 'Jalisco, MX', icon: '🫐' },
    { name:  'Blackberries 6oz', price: '$48.20', change: '+6.8%', origin: 'Michoacán, MX', icon:  '🫐' },
    { name:  'Blueberries 6oz', price: '$38.50', change: '+5.5%', origin: 'Jalisco, MX', icon: '🫐' },
    { name: 'Romaine Lettuce 24ct', price: '$19.80', change: '+2.8%', origin: 'Salinas, CA', icon: '🥬' },
    { name: 'Iceberg Lettuce 24ct', price: '$16.50', change: '+1.5%', origin: 'Yuma, AZ', icon: '🥬' },
    { name: 'Spring Mix 4x3lb', price: '$42.00', change: '+5.8%', origin: 'Salinas, CA', icon: '🥬' },
    { name: 'Arugula 3lb', price: '$38.50', change: '+6.2%', origin: 'Salinas, CA', icon: '🥬' },
    { name: 'Spinach Baby 4x3lb', price: '$36.00', change: '+4.8%', origin: 'Salinas, CA', icon:  '🥬' },
    { name: 'Roma Tomatoes XL', price: '$22.50', change: '+4.2%', origin: 'Sinaloa, MX', icon:  '🍅' },
    { name: 'Bell Pepper (Red)', price: '$31.18', change: '+3.8%', origin: 'Sinaloa, MX', icon:  '🫑' },
    { name: 'Jalapeño Pepper', price: '$21.21', change: '+3.2%', origin: 'Chihuahua, MX', icon: '🌶️' },
    { name: 'Limes 200ct', price: '$42.00', change: '+8.5%', origin: 'Veracruz, MX', icon: '🍋' },
    { name: 'Mangoes Ataulfo', price: '$24.50', change: '+4.8%', origin: 'Chiapas, MX', icon:  '🥭' }
  ];

  const tripled = [... commodities, ...commodities, ...commodities];

  return (
    <div style={{ background: 'linear-gradient(to right, #fef9c3, #fef08a, #fef9c3)', borderBottom: '2px solid #eab308', padding: '0.875rem 0', overflow: 'hidden' }}>
      <style>{`@keyframes scrollRightToLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
      <div style={{ display: 'inline-flex', animation: 'scrollRightToLeft 300s linear infinite', gap: '2rem' }}>
        {tripled.map((item, idx) => (
          <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', padding: '0.625rem 1.25rem', background: 'white', borderRadius: '10px', border: '1px solid #fbbf24', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
            <span style={{ fontWeight: '700', fontSize: '0.9375rem', color: '#111827' }}>{item.name}</span>
            <span style={{ fontSize: '0.8125rem', color: '#059669' }}>📍 {item.origin}</span>
            <span style={{ fontWeight: '700', fontSize: '1rem', color: '#ea580c' }}>{item.price}</span>
            <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#16a34a' }}>↗ {item.change}</span>
            <span style={{ fontSize: '0.6875rem', padding: '0.1875rem 0.5rem', background: '#dcfce7', borderRadius: '6px', color: '#166534', fontWeight: '700' }}>@ PEAK</span>
          </div>
        ))}
      </div>
    </div>
  );
}