import React, { useState } from 'react';

export default function CitySearchEngine({ onSearchResult }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const allLocations = [
    'Valle de Guadalupe', 'Ensenada', 'Rosarito', 'Tijuana', 'San Felipe',
    'La Paz', 'Cabo San Lucas', 'San Jose del Cabo', 'Todos Santos', 'Los Barriles', 'Loreto', 'East Cape',
    'Puerto Penasco', 'San Carlos', 'Guaymas', 'Hermosillo',
    'Mazatlan', 'Los Mochis',
    'Sayulita', 'Punta Mita', 'Bucerias', 'San Blas', 'Rincon de Guayabitos',
    'Puerto Vallarta', 'Barra de Navidad', 'Costalegre', 'Ajijic', 'Chapala', 'Mazamitla',
    'Acapulco', 'Ixtapa', 'Zihuatanejo',
    'Puerto Escondido', 'Huatulco', 'Mazunte', 'Oaxaca',
    'Cancun', 'Playa del Carmen', 'Tulum', 'Akumal', 'Cozumel', 'Isla Mujeres', 'Puerto Morelos', 'Bacalar',
    'Merida', 'Progreso', 'Celestun',
    'San Miguel de Allende', 'Guanajuato', 'Queretaro', 'Mexico City'
  ];

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery.length > 0) {
      const filtered = allLocations.filter(loc => 
        loc.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const selectLocation = (location) => {
    setQuery(location);
    setResults([]);
    if (onSearchResult) {
      onSearchResult(location);
    }
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search any city or coastal town in Mexico..."
          style={{
            width: '100%',
            padding: '20px 24px',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '2px solid rgba(203, 166, 88, 0.3)',
            borderRadius: '12px',
            color: '#f1f5f9',
            fontSize: '16px',
            fontWeight: '500'
          }}
        />
        
        {results.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            background: '#1e293b',
            border: '2px solid rgba(203, 166, 88, 0.3)',
            borderRadius: '12px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000
          }}>
            {results.map((location, idx) => (
              <div
                key={idx}
                onClick={() => selectLocation(location)}
                style={{
                  padding: '16px 24px',
                  cursor: 'pointer',
                  borderBottom: idx < results.length - 1 ? '1px solid rgba(203, 166, 88, 0.2)' : 'none',
                  color: '#cbd5e1',
                  fontSize: '15px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(203, 166, 88, 0.1)';
                  e.currentTarget.style.color = '#cba658';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}