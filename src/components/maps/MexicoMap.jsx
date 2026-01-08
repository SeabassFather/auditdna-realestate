import React, { useState } from 'react';

export default function MexicoMap({ onLocationSelect }) {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { id: 1, name: 'Baja California Norte', cities: ['Tijuana', 'Ensenada', 'Rosarito', 'Valle de Guadalupe', 'San Felipe'], x: 50, y: 100 },
    { id: 2, name: 'Baja California Sur', cities: ['La Paz', 'Cabo San Lucas', 'San Jose del Cabo', 'Todos Santos', 'Loreto'], x: 80, y: 250 },
    { id: 3, name: 'Sonora', cities: ['Puerto Penasco', 'San Carlos', 'Guaymas', 'Hermosillo'], x: 150, y: 150 },
    { id: 4, name: 'Sinaloa', cities: ['Mazatlan', 'Los Mochis'], x: 200, y: 220 },
    { id: 5, name: 'Nayarit', cities: ['Sayulita', 'Punta Mita', 'San Blas'], x: 220, y: 270 },
    { id: 6, name: 'Jalisco', cities: ['Puerto Vallarta', 'Ajijic', 'Chapala'], x: 240, y: 290 },
    { id: 7, name: 'Colima', cities: ['Manzanillo'], x: 250, y: 310 },
    { id: 8, name: 'Guerrero', cities: ['Acapulco', 'Ixtapa', 'Zihuatanejo'], x: 280, y: 350 },
    { id: 9, name: 'Oaxaca', cities: ['Puerto Escondido', 'Huatulco', 'Mazunte'], x: 320, y: 370 },
    { id: 10, name: 'Quintana Roo', cities: ['Cancun', 'Playa del Carmen', 'Tulum', 'Cozumel', 'Bacalar'], x: 450, y: 290 },
    { id: 11, name: 'Yucatan', cities: ['Merida', 'Progreso', 'Celestun'], x: 430, y: 270 },
    { id: 12, name: 'Guanajuato', cities: ['San Miguel de Allende', 'Guanajuato'], x: 260, y: 280 }
  ];

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    if (onLocationSelect) {
      onLocationSelect(region);
    }
  };

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '40px' }}>
      <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cba658', marginBottom: '24px', textAlign: 'center' }}>Interactive Mexico Map</h3>
      
      <div style={{ position: 'relative', width: '100%', height: '500px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '12px', marginBottom: '24px' }}>
        <svg width="100%" height="100%" viewBox="0 0 600 500">
          {regions.map(region => (
            <g key={region.id} onClick={() => handleRegionClick(region)} style={{ cursor: 'pointer' }}>
              <circle 
                cx={region.x} 
                cy={region.y} 
                r="20" 
                fill={selectedRegion?.id === region.id ? '#cba658' : 'rgba(203, 166, 88, 0.3)'} 
                stroke="#cba658" 
                strokeWidth="2"
              />
              <text 
                x={region.x} 
                y={region.y + 35} 
                textAnchor="middle" 
                fill="#cbd5e1" 
                fontSize="11" 
                fontWeight="600"
              >
                {region.name.split(' ')[0]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {selectedRegion && (
        <div style={{ padding: '24px', background: 'rgba(203, 166, 88, 0.1)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '12px' }}>
          <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>{selectedRegion.name}</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedRegion.cities.map((city, idx) => (
              <button
                key={idx}
                onClick={() => onLocationSelect && onLocationSelect({ region: selectedRegion.name, city })}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #cba658, #b8944d)',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}