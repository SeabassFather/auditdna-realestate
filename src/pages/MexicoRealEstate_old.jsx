import React, { useState, useEffect } from 'react';

export default function MexicoRealEstate() {
  const [properties, setProperties] = useState([]);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [expandedProperty, setExpandedProperty] = useState(null);
  const [selectedCity, setSelectedCity] = useState('All');

  // All the cities/regions
  const allCities = [
    'All', 'Valle de Guadalupe', 'Ensenada', 'Rosarito', 'Tijuana', 'San Felipe', 'La Paz', 'Cabo San Lucas',
    'San Jose del Cabo', 'Todos Santos', 'Los Barriles', 'Loreto', 'East Cape', 'Puerto Penasco', 'San Carlos',
    'Guaymas', 'Hermosillo', 'Mazatlan', 'Los Mochis', 'Sayulita', 'Punta Mita', 'Bucerias', 'San Blas',
    'Rincon de Guayabitos', 'Puerto Vallarta', 'Barra de Navidad', 'Costalegre', 'Ajijic', 'Chapala', 'Mazamitla',
    'Acapulco', 'Ixtapa', 'Zihuatanejo', 'Huatulco', 'Mazunte', 'Oaxaca', 'Lazaro Cardenas', 'Patzcuaro', 'Cancun',
    'Playa del Carmen', 'Tulum', 'Akumal', 'Cozumel', 'Isla Mujeres', 'Puerto Morelos', 'Bacalar', 'Merida',
    'Progreso', 'Celestun', 'Veracruz', 'Boca del Rio', 'San Miguel de Allende', 'Guanajuato', 'Queretaro', 'Mexico City'
  ];

  const sampleProperties = [
    { id: 1, region: 'Valle de Guadalupe', title: 'Vineyard Estate with Mountain Views', price: '$850,000 USD', bedrooms: 4, bathrooms: 3, sqft: '3,200', type: 'Estate', description: 'Stunning vineyard property with modern architecture' },
    { id: 2, region: 'Valle de Guadalupe', title: 'Modern Wine Country Villa', price: '$1,200,000 USD', bedrooms: 5, bathrooms: 4, sqft: '4,500', type: 'Villa', description: 'Luxury villa in the heart of wine country' },
    { id: 3, region: 'Ensenada', title: 'Oceanfront Luxury Home', price: '$2,500,000 USD', bedrooms: 6, bathrooms: 5, sqft: '5,800', type: 'Estate', description: 'Breathtaking ocean views with private beach access' },
    { id: 4, region: 'Ensenada', title: 'Coastal Modern Residence', price: '$950,000 USD', bedrooms: 3, bathrooms: 3, sqft: '2,800', type: 'House', description: 'Contemporary design with panoramic sea views' },
    { id: 5, region: 'La Paz', title: 'Beachfront Paradise', price: '$1,800,000 USD', bedrooms: 5, bathrooms: 4, sqft: '4,200', type: 'Villa', description: 'Direct beach access with resort-style amenities' },
    { id: 6, region: 'La Paz', title: 'Marina View Condo', price: '$425,000 USD', bedrooms: 2, bathrooms: 2, sqft: '1,400', type: 'Condo', description: 'Modern condo with marina and mountain views' },
    { id: 7, region: 'Cabo San Lucas', title: 'Luxury Pedregal Villa', price: '$3,200,000 USD', bedrooms: 6, bathrooms: 6, sqft: '6,500', type: 'Villa', description: 'Exclusive Pedregal community with ocean views' },
    { id: 8, region: 'Cabo San Lucas', title: 'Golf Course Estate', price: '$2,100,000 USD', bedrooms: 4, bathrooms: 4, sqft: '4,800', type: 'Estate', description: 'Overlooking championship golf course' },
    { id: 9, region: 'San Jose del Cabo', title: 'Puerto Los Cabos Residence', price: '$1,600,000 USD', bedrooms: 4, bathrooms: 3, sqft: '3,800', type: 'House', description: 'Gated community with golf and beach club' },
    { id: 10, region: 'Rosarito', title: 'Beachfront Bungalow', price: '$385,000 USD', bedrooms: 3, bathrooms: 2, sqft: '1,800', type: 'House', description: 'Charming beach house with sunset views' },
    { id: 11, region: 'Todos Santos', title: 'Historic Hacienda Restoration', price: '$1,100,000 USD', bedrooms: 5, bathrooms: 4, sqft: '4,000', type: 'Hacienda', description: 'Beautifully restored colonial property' },
    { id: 12, region: 'Loreto', title: 'Bay View Villa', price: '$780,000 USD', bedrooms: 3, bathrooms: 3, sqft: '2,600', type: 'Villa', description: 'Serene bay views in exclusive community' }
  ];

  useEffect(() => {
    setProperties(sampleProperties);
  }, []);

  const filteredProperties = selectedCity === 'All' 
    ? properties 
    : properties.filter(p => p.region === selectedCity);

  const regions = [...new Set(filteredProperties.map(p => p.region))].sort();

  const getPropertiesByRegion = (region) => {
    return filteredProperties.filter(p => p.region === region);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#cbd5e1' }}>
      {/* HEADER */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(203, 213, 225, 0.1)', padding: '20px 32px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '300', color: '#cba658', margin: '0 0 8px 0', letterSpacing: '2px' }}>
              AUDITDNA ESTATES
            </h1>
            <p style={{ fontSize: '13px', fontWeight: '300', color: '#94a3b8', margin: 0, letterSpacing: '0.5px' }}>
              Premium Mexico Real Estate & Cross-Border Financing
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              📞 +52-646-340-2686
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              ✉ estates@auditdna.com
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div style={{ background: '#1e293b', borderBottom: '1px solid rgba(203, 213, 225, 0.1)', padding: '16px 0' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', gap: '32px', padding: '0 32px' }}>
          {['Properties', 'Financing', 'Fideicomiso', 'Legal Process', 'Notario', 'Developments', 'Agent Tools'].map(tab => (
            <button key={tab} style={{
              padding: '8px 0', background: 'none', 
              color: tab === 'Properties' ? '#cba658' : '#94a3b8',
              border: 'none', 
              borderBottom: tab === 'Properties' ? '2px solid #cba658' : '2px solid transparent',
              fontSize: '11px', fontWeight: '600', cursor: 'pointer',
              letterSpacing: '0.5px', transition: 'all 0.3s'
            }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '40px 32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '300', color: '#cba658', marginBottom: '32px', letterSpacing: '1px' }}>
          Premium Properties
        </h2>

        {/* ALL CITY BUTTONS */}
        <div style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {allCities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              style={{
                padding: '12px 16px',
                background: selectedCity === city ? '#cba658' : 'rgba(30, 41, 59, 0.6)',
                border: '1px solid ' + (selectedCity === city ? '#cba658' : 'rgba(203, 213, 225, 0.2)'),
                borderRadius: '6px',
                color: selectedCity === city ? '#0f172a' : '#cbd5e1',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                if (selectedCity !== city) {
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCity !== city) {
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.2)';
                }
              }}
            >
              {city}
            </button>
          ))}
        </div>

        {/* PROPERTY COUNT */}
        <p style={{ fontSize: '13px', fontWeight: '300', color: '#94a3b8', marginBottom: '24px' }}>
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} {selectedCity !== 'All' ? `in ${selectedCity}` : 'across 8 regions'}
        </p>

        {/* REGION ACCORDIONS */}
        {regions.map(region => {
          const regionProperties = getPropertiesByRegion(region);
          const isExpanded = expandedRegion === region;
          
          return (
            <div key={region} style={{ marginBottom: '12px' }}>
              <button
                onClick={() => setExpandedRegion(isExpanded ? null : region)}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  background: isExpanded ? 'rgba(203, 166, 88, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid ' + (isExpanded ? '#cba658' : 'rgba(203, 213, 225, 0.2)'),
                  borderRadius: '8px',
                  color: isExpanded ? '#cba658' : '#cbd5e1',
                  fontSize: '15px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                    e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.2)';
                  }
                }}
              >
                <span>{region} ({regionProperties.length} {regionProperties.length === 1 ? 'property' : 'properties'})</span>
                <span style={{ fontSize: '14px' }}>{isExpanded ? '▼' : '▶'}</span>
              </button>

              {isExpanded && (
                <div style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {regionProperties.map(property => {
                    const isPropExpanded = expandedProperty === property.id;
                    
                    return (
                      <div key={property.id} style={{ marginBottom: '8px' }}>
                        <button
                          onClick={() => setExpandedProperty(isPropExpanded ? null : property.id)}
                          style={{
                            width: '100%',
                            padding: '16px 20px',
                            background: isPropExpanded ? 'rgba(203, 213, 225, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(203, 213, 225, 0.15)',
                            borderRadius: '6px',
                            color: '#cbd5e1',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            textAlign: 'left'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(203, 213, 225, 0.08)';
                            e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isPropExpanded ? 'rgba(203, 213, 225, 0.1)' : 'rgba(15, 23, 42, 0.6)';
                            e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.15)';
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0', marginBottom: '6px' }}>
                                {property.title}
                              </div>
                              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                                {property.bedrooms} bed • {property.bathrooms} bath • {property.sqft} sqft • {property.type}
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{ fontSize: '16px', fontWeight: '600', color: '#cba658', textAlign: 'right' }}>
                                {property.price}
                              </div>
                              <span style={{ fontSize: '12px' }}>{isPropExpanded ? '▼' : '▶'}</span>
                            </div>
                          </div>
                        </button>

                        {isPropExpanded && (
                          <div style={{
                            marginTop: '8px',
                            padding: '20px',
                            background: 'rgba(30, 41, 59, 0.4)',
                            border: '1px solid rgba(203, 213, 225, 0.1)',
                            borderRadius: '6px'
                          }}>
                            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '16px' }}>
                              {property.description}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                              <div>
                                <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bedrooms</div>
                                <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{property.bedrooms}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bathrooms</div>
                                <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{property.bathrooms}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Square Feet</div>
                                <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{property.sqft}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Type</div>
                                <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{property.type}</div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <button style={{
                                padding: '10px 24px',
                                background: '#cba658',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#0f172a',
                                fontSize: '11px',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                              }}>
                                SCHEDULE VIEWING
                              </button>
                              <button style={{
                                padding: '10px 24px',
                                background: 'rgba(203, 166, 88, 0.1)',
                                border: '1px solid #cba658',
                                borderRadius: '6px',
                                color: '#cba658',
                                fontSize: '11px',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                              }}>
                                REQUEST INFO
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}