import React, { useState, useEffect } from 'react';

export default function BajaLuxuryGuide() {
  const [establishments, setEstablishments] = useState([]);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState({});
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    fetch('/lifestyle-data/baja-luxury-complete.json')
      .then(res => res.json())
      .then(data => {
        setEstablishments(data);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  const regions = [...new Set(establishments.map(e => e.region))].sort();
  const categories = {
    winery: 'WINERIES',
    restaurant: 'FINE DINING',
    hotel: 'HOTELS',
    golf: 'GOLF',
    spa: 'SPAS',
    brewery: 'BREWERIES',
    yacht: 'YACHTS',
    'cigar-bar': 'CIGAR BARS',
    adventure: 'ADVENTURES'
  };

  const getEstablishmentsByRegion = (region) => {
    return establishments.filter(e => e.region === region);
  };

  const getEstablishmentsByCategory = (region, category) => {
    return establishments.filter(e => e.region === region && e.type === category);
  };

  const toggleCategory = (region, category) => {
    const key = `${region}-${category}`;
    setExpandedCategory(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const categoryIcons = {
    winery: '🍷',
    restaurant: '🍽️',
    hotel: '🏨',
    golf: '⛳',
    spa: '💆',
    brewery: '🍺',
    yacht: '⛵',
    'cigar-bar': '🎩',
    adventure: '🏔️'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#cbd5e1' }}>
      {/* HEADER */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(203, 213, 225, 0.1)', padding: '20px 32px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: '300', color: '#cbd5e1', margin: 0, letterSpacing: '1px' }}>Baja California Luxury Guide</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setLanguage('EN')} style={{
              padding: '6px 14px', background: language === 'EN' ? '#cbd5e1' : 'transparent',
              color: language === 'EN' ? '#0f172a' : '#cbd5e1', border: '1px solid #cbd5e1',
              borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: 'pointer',
              letterSpacing: '1px', transition: 'all 0.3s'
            }}>EN</button>
            <button onClick={() => setLanguage('ES')} style={{
              padding: '6px 14px', background: language === 'ES' ? '#cbd5e1' : 'transparent',
              color: language === 'ES' ? '#0f172a' : '#cbd5e1', border: '1px solid #cbd5e1',
              borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: 'pointer',
              letterSpacing: '1px', transition: 'all 0.3s'
            }}>ES</button>
          </div>
        </div>
      </div>

      {/* ACCORDION CONTENT */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '300', color: '#cbd5e1', marginBottom: '24px', letterSpacing: '1px' }}>
          {establishments.length} Establishments across {regions.length} Regions
        </h2>

        {/* REGION ACCORDIONS */}
        {regions.map(region => {
          const regionEstablishments = getEstablishmentsByRegion(region);
          const isExpanded = expandedRegion === region;
          
          return (
            <div key={region} style={{ marginBottom: '12px' }}>
              {/* REGION HEADER */}
              <button
                onClick={() => setExpandedRegion(isExpanded ? null : region)}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: isExpanded ? 'rgba(203, 166, 88, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid ' + (isExpanded ? '#cba658' : 'rgba(203, 213, 225, 0.2)'),
                  borderRadius: '8px',
                  color: isExpanded ? '#cba658' : '#cbd5e1',
                  fontSize: '14px',
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
                <span>{region} ({regionEstablishments.length})</span>
                <span style={{ fontSize: '12px' }}>{isExpanded ? '▼' : '▶'}</span>
              </button>

              {/* REGION CONTENT - CATEGORY ACCORDIONS */}
              {isExpanded && (
                <div style={{ marginTop: '8px', paddingLeft: '20px', background: 'rgba(203, 166, 88, 0.05)', padding: '16px', borderRadius: '6px' }}>
                  {(() => {
                    console.log('=== REGION EXPANDED ===');
                    console.log('Region:', region);
                    console.log('Total establishments in region:', getEstablishmentsByRegion(region).length);
                    return null;
                  })()}
                  {Object.keys(categories).map(catKey => {
                    const catEstablishments = getEstablishmentsByCategory(region, catKey);
                    console.log(`Category: ${catKey} (${categories[catKey]}) - Count: ${catEstablishments.length}`);
                    if (catEstablishments.length === 0) return null;
                    
                    const categoryKey = `${region}-${catKey}`;
                    const isCatExpanded = expandedCategory[categoryKey];
                    
                    return (
                      <div key={catKey} style={{ marginBottom: '8px' }}>
                        {/* CATEGORY HEADER */}
                        <button
                          onClick={() => toggleCategory(region, catKey)}
                          style={{
                            width: '100%',
                            padding: '12px 20px',
                            background: isCatExpanded ? 'rgba(203, 213, 225, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(203, 213, 225, 0.15)',
                            borderRadius: '6px',
                            color: '#cbd5e1',
                            fontSize: '12px',
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
                            e.currentTarget.style.background = 'rgba(203, 213, 225, 0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isCatExpanded ? 'rgba(203, 213, 225, 0.1)' : 'rgba(15, 23, 42, 0.6)';
                          }}
                        >
                          <span>{categoryIcons[catKey]} {categories[catKey]} ({catEstablishments.length})</span>
                          <span style={{ fontSize: '10px' }}>{isCatExpanded ? '▼' : '▶'}</span>
                        </button>

                        {/* ESTABLISHMENTS LIST */}
                        {isCatExpanded && (
                          <div style={{ marginTop: '8px', paddingLeft: '20px' }}>
                            {catEstablishments.map(est => (
                              <div key={est.id} style={{
                                padding: '12px 16px',
                                background: 'rgba(30, 41, 59, 0.4)',
                                border: '1px solid rgba(203, 213, 225, 0.1)',
                                borderRadius: '4px',
                                marginBottom: '6px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
                                e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
                                e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.1)';
                              }}>
                                <div>
                                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>
                                    {est.name}
                                  </div>
                                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                                    {est.description}
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#cba658' }}>
                                    ${est.fee}
                                  </div>
                                  <button style={{
                                    padding: '5px 14px',
                                    background: 'rgba(203, 166, 88, 0.1)',
                                    border: '1px solid #cba658',
                                    borderRadius: '15px',
                                    color: '#cba658',
                                    fontSize: '9px',
                                    fontWeight: '600',
                                    letterSpacing: '0.5px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#cba658';
                                    e.currentTarget.style.color = '#0f172a';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(203, 166, 88, 0.1)';
                                    e.currentTarget.style.color = '#cba658';
                                  }}>
                                    VIEW
                                  </button>
                                </div>
                              </div>
                            ))}
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