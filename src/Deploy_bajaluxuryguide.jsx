import React, { useState, useEffect } from 'react';

function BajaLuxuryGuide() {
  const [businesses, setBusinesses] = useState([]);
  const [regionFilter, setRegionFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [language, setLanguage] = useState('en');
  const [showMap, setShowMap] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);

  // SMART IMAGE SYSTEM - Category-based pools
  const getCategoryImage = (type, id) => {
    const imageLibrary = {
      winery: [
        'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb',
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
        'https://images.unsplash.com/photo-1547595628-c61a29f496f0',
        'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea',
        'https://images.unsplash.com/photo-1474932430478-367dbb6832c1',
        'https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
        'https://images.unsplash.com/photo-1513618827672-0d7c5ad591b1',
        'https://images.unsplash.com/photo-1596142332133-327e2a0c4a04'
      ],
      restaurant: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c',
        'https://images.unsplash.com/photo-1592861956120-e524fc739696',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f'
      ],
      golf: [
        'https://images.unsplash.com/photo-1535131749006-b7f58c99034b',
        'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
        'https://images.unsplash.com/photo-1592919505780-303950717480',
        'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb',
        'https://images.unsplash.com/photo-1587174524513-f376b6a98f10',
        'https://images.unsplash.com/photo-1535131749006-b7f58c99034b'
      ],
      spa: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
        'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea',
        'https://images.unsplash.com/photo-1610117457708-8c2a2f5d0c86'
      ],
      yacht: [
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
        'https://images.unsplash.com/photo-1605281317010-fe5ffe798166'
      ],
      'cigar-bar': [
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
        'https://images.unsplash.com/photo-1470337458703-46ad1756a187'
      ],
      brewery: [
        'https://images.unsplash.com/photo-1532634922-8fe0b757fb13',
        'https://images.unsplash.com/photo-1608270586620-248524c67de9',
        'https://images.unsplash.com/photo-1535958636474-b021ee887b13'
      ],
      adventure: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
        'https://images.unsplash.com/photo-1530053969-e4cce980d6e6'
      ]
    };
    
    const pool = imageLibrary[type] || imageLibrary.winery;
    return pool[id % pool.length] + '?w=800&q=85';
  };

  useEffect(() => {
    // Load from public directory
    fetch('/lifestyle-data/baja-luxury-complete.json')
      .then(res => res.json())
      .then(data => {
        // Sort alphabetically by name within each category
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setBusinesses(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const translations = {
    en: {
      hero: "BAJA CALIFORNIA LUXURY EMPIRE",
      subtitle: "19 Regions • 1000+ Establishments • From Tijuana to Cabo",
      viewMap: "VIEW MAP",
      events: "EVENTS",
      advertise: "LIST YOUR BUSINESS",
      allRegions: "ALL BAJA"
    },
    es: {
      hero: "IMPERIO DE LUJO BAJA CALIFORNIA",
      subtitle: "19 Regiones • 1000+ Establecimientos • De Tijuana a Cabo",
      viewMap: "VER MAPA",
      events: "EVENTOS",
      advertise: "ANUNCIE SU NEGOCIO",
      allRegions: "TODO BAJA"
    }
  };

  const t = translations[language];

  const regions = [
    {name: 'Tijuana', lat: 32.5149, lng: -117.0382},
    {name: 'Rosarito', lat: 32.3333, lng: -117.0333},
    {name: 'Ensenada', lat: 31.8667, lng: -116.6167},
    {name: 'Valle de Guadalupe', lat: 31.9167, lng: -116.6167},
    {name: 'San Felipe', lat: 31.0242, lng: -114.8369},
    {name: 'Mexicali', lat: 32.6519, lng: -115.4683},
    {name: 'Tecate', lat: 32.5700, lng: -116.6250},
    {name: 'San Quintín', lat: 30.4833, lng: -115.9500},
    {name: 'Bahía de los Ángeles', lat: 28.9500, lng: -113.5500},
    {name: 'Guerrero Negro', lat: 27.9500, lng: -114.0500},
    {name: 'Santa Rosalía', lat: 27.3333, lng: -112.2667},
    {name: 'Mulegé', lat: 26.8833, lng: -111.9833},
    {name: 'Loreto', lat: 26.0119, lng: -111.3484},
    {name: 'La Paz', lat: 24.1426, lng: -110.3128},
    {name: 'Todos Santos', lat: 23.4450, lng: -110.2250},
    {name: 'Cabo San Lucas', lat: 22.8900, lng: -109.9000},
    {name: 'San José del Cabo', lat: 23.0600, lng: -109.6700},
    {name: 'East Cape', lat: 23.5000, lng: -109.4500},
    {name: 'Cabo Pulmo', lat: 23.4330, lng: -109.4180}
  ];

  const filteredBusinesses = businesses.filter(b => {
    const regionMatch = regionFilter === 'all' || b.region === regionFilter;
    const categoryMatch = categoryFilter === 'all' || b.type === categoryFilter;
    return regionMatch && categoryMatch;
  });

  if (loading) {
    return (
      <div style={{minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: '60px', height: '60px', border: '3px solid #cbd5e1', borderTop: '3px solid #cba658', borderRadius: '50%'}}></div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: '#0f172a'}}>
      
      {/* HERO */}
      <div style={{height: '100vh', position: 'relative', backgroundImage: 'url(https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.9)'}}></div>
        
        <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 24px'}}>
          <h1 style={{fontSize: '72px', fontWeight: '200', background: 'linear-gradient(135deg, #cba658, #b8944d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, letterSpacing: '8px', textShadow: '0 2px 20px rgba(0,0,0,0.5)'}}>{t.hero}</h1>
          <p style={{fontSize: '18px', color: '#cbd5e1', marginTop: '20px', letterSpacing: '4px'}}>{t.subtitle}</p>
          
          <div style={{display: 'flex', gap: '20px', marginTop: '40px'}}>
            <button onClick={() => setShowMap(true)} style={{padding: '16px 32px', background: 'linear-gradient(135deg, #cbd5e1, #94a3b0)', color: '#0f172a', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', letterSpacing: '2px'}}>{t.viewMap}</button>
            <button onClick={() => setShowEvents(true)} style={{padding: '16px 32px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', letterSpacing: '2px'}}>{t.events}</button>
            <button onClick={() => setShowMarketing(true)} style={{padding: '16px 32px', background: 'rgba(203,166,88,0.2)', color: '#cba658', border: '1px solid #cba658', fontSize: '14px', fontWeight: '700', cursor: 'pointer', letterSpacing: '2px'}}>{t.advertise}</button>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div style={{padding: '100px 24px'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '40px'}}>
            {filteredBusinesses.map((business, index) => (
              <div key={business.id} onClick={() => setSelectedBusiness(business)} style={{background: index % 2 === 0 ? 'linear-gradient(135deg, rgba(203,213,225,0.05), rgba(148,163,176,0.05))' : 'linear-gradient(135deg, rgba(203,166,88,0.05), rgba(184,148,77,0.05))', border: `1px solid ${index % 2 === 0 ? 'rgba(203,213,225,0.2)' : 'rgba(203,166,88,0.2)'}', borderRadius: '2px', padding: '48px 32px', cursor: 'pointer', transition: 'all 0.3s'}}>
                <h3 style={{fontSize: '32px', fontWeight: '300', background: 'linear-gradient(135deg, #cba658, #b8944d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 16px 0'}}>{business.name}</h3>
                <div style={{fontSize: '11px', color: '#cbd5e1', letterSpacing: '2px', marginBottom: '12px'}}>{business.city}, {business.region}</div>
                <p style={{fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7'}}>{business.description}</p>
                <div style={{marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(148,163,184,0.2)'}}>
                  <span style={{color: '#cba658', fontSize: '18px', fontWeight: '600'}}>${business.fee} USD</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MARKETING MODAL */}
      {showMarketing && (
        <div onClick={() => setShowMarketing(false)} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '600px', background: '#1e293b', border: '1px solid rgba(203,166,88,0.3)', padding: '60px', textAlign: 'center'}}>
            <h2 style={{fontSize: '48px', fontWeight: '300', background: 'linear-gradient(135deg, #cba658, #b8944d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '30px'}}>LIST YOUR LUXURY BUSINESS</h2>
            <p style={{fontSize: '18px', color: '#cbd5e1', marginBottom: '40px'}}>Join 1000+ premium establishments across Baja California</p>
            <div style={{marginBottom: '40px'}}>
              <div style={{fontSize: '14px', color: '#94a3b8', marginBottom: '20px'}}>Contact us via WhatsApp:</div>
              <a href="https://wa.me/526463402686" target="_blank" rel="noopener noreferrer" style={{fontSize: '32px', color: '#cba658', fontWeight: '600', textDecoration: 'none', display: 'block', marginBottom: '10px'}}>+52-646-340-2686</a>
            </div>
            <div style={{textAlign: 'left', background: 'rgba(203,166,88,0.1)', padding: '30px', marginTop: '30px'}}>
              <h4 style={{color: '#cba658', marginBottom: '20px'}}>LISTING TIERS:</h4>
              <div style={{color: '#cbd5e1', fontSize: '14px', lineHeight: '2'}}>
                <div>• Standard: FREE basic listing</div>
                <div>• Premium: $149/month - Featured placement</div>
                <div>• Elite: $299/month - Top of category</div>
                <div>• Platinum: $599/month - Homepage + all regions</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{background: '#1e293b', borderTop: '1px solid rgba(203,166,88,0.2)', padding: '60px 24px', textAlign: 'center'}}>
        <h3 style={{fontSize: '24px', color: '#cba658', marginBottom: '20px'}}>BAJA CALIFORNIA LUXURY GUIDE</h3>
        <p style={{color: '#94a3b8', marginBottom: '30px'}}>19 Regions • 1000+ Establishments • Premium Directory</p>
        <a href="https://wa.me/526463402686" target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', padding: '18px 40px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', fontSize: '14px', fontWeight: '700', textDecoration: 'none', letterSpacing: '2px'}}>CONTACT: +52-646-340-2686</a>
      </div>
    </div>
  );
}

export default BajaLuxuryGuide;