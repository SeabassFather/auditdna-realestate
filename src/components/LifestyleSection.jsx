import React, { useState, useEffect } from 'react';

function LifestyleSection() {
  const [businesses, setBusinesses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      heroSubtitle: "Baja California's Premier Destination",
      heroQuote: "Mexico's Napa Valley – Where world-class wines, Michelin-starred cuisine, and craft breweries converge in an elegant tapestry of luxury and tradition.",
      wineries: "WINERIES",
      restaurants: "RESTAURANTS",
      breweries: "BREWERIES",
      michelinStars: "MICHELIN",
      scrollExplore: "SCROLL TO EXPLORE",
      allEstablishments: "ALL ESTABLISHMENTS",
      editorSelection: "EDITOR'S SELECTION",
      contact: "CONTACT",
      pricing: "PRICING",
      contactInfo: "CONTACT INFORMATION",
      reservationRequired: "RESERVATION REQUIRED",
      visitWebsite: "VISIT WEBSITE",
      viewMap: "VIEW MAP",
      viewOnMap: "VIEW ON MAP",
      loadingExcellence: "Loading Excellence"
    },
    es: {
      heroSubtitle: "El Destino Premier de Baja California",
      heroQuote: "El Napa Valley de México – Donde vinos de clase mundial, cocina con estrellas Michelin y cervecerías artesanales convergen en un elegante tapiz de lujo y tradición.",
      wineries: "VINÍCOLAS",
      restaurants: "RESTAURANTES",
      breweries: "CERVECERÍAS",
      michelinStars: "MICHELIN",
      scrollExplore: "DESPLÁZATE PARA EXPLORAR",
      allEstablishments: "TODOS LOS ESTABLECIMIENTOS",
      editorSelection: "SELECCIÓN DEL EDITOR",
      contact: "CONTACTO",
      pricing: "PRECIOS",
      contactInfo: "INFORMACIÓN DE CONTACTO",
      reservationRequired: "RESERVACIÓN REQUERIDA",
      visitWebsite: "VISITAR SITIO WEB",
      viewMap: "VER MAPA",
      viewOnMap: "VER EN MAPA",
      loadingExcellence: "Cargando Excelencia"
    }
  };

  const t = translations[language];

  useEffect(() => {
    fetch('/lifestyle-data/all-businesses.json')
      .then(res => res.json())
      .then(data => {
        setBusinesses(data);
        setLoading(false);
      })
      .catch(err => console.error('Error:', err));

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBusinessImage = (business) => {
    const images = {
      winery: [
        'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
        'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80'
      ],
      restaurant: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80'
      ],
      brewery: [
        'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80',
        'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80'
      ]
    };
    const typeImages = images[business.type] || images.winery;
    return typeImages[business.id % typeImages.length];
  };

  const filteredBusinesses = filter === 'all' ? businesses : businesses.filter(b => b.type === filter);

  if (loading) {
    return (
      <div style={{minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: '60px', height: '60px', border: '3px solid #cbd5e1', borderTop: '3px solid transparent', borderRadius: '50%', margin: '0 auto 20px'}}></div>
          <p style={{color: '#cbd5e1', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase'}}>{t.loadingExcellence}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: '#0f172a', position: 'relative', overflow: 'hidden'}}>
      
      {/* LANGUAGE TOGGLE */}
      <div style={{position: 'fixed', top: '30px', right: '30px', zIndex: 1000, display: 'flex', gap: '0', background: 'rgba(30,41,59,0.9)', backdropFilter: 'blur(10px)', borderRadius: '4px', padding: '4px', border: '1px solid rgba(203,213,225,0.2)'}}>
        <button onClick={() => setLanguage('en')} style={{padding: '12px 24px', background: language === 'en' ? 'linear-gradient(135deg, #cbd5e1, #94a3b0)' : 'transparent', color: language === 'en' ? '#0f172a' : '#cbd5e1', border: 'none', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', cursor: 'pointer', borderRadius: '2px', transition: 'all 0.3s'}}>EN</button>
        <button onClick={() => setLanguage('es')} style={{padding: '12px 24px', background: language === 'es' ? 'linear-gradient(135deg, #cba658, #b8944d)' : 'transparent', color: language === 'es' ? '#0f172a' : '#cba658', border: 'none', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', cursor: 'pointer', borderRadius: '2px', transition: 'all 0.3s'}}>ES</button>
      </div>

      {/* HERO SECTION */}
      <div style={{height: '100vh', position: 'relative', backgroundImage: 'url(https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.95)'}}></div>
        
        <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 24px'}}>
          <div style={{borderTop: '1px solid #cbd5e1', borderBottom: '1px solid #cba658', padding: '40px 60px', marginBottom: '40px'}}>
            <p style={{fontSize: '14px', letterSpacing: '8px', color: '#cbd5e1', textTransform: 'uppercase', fontWeight: '300', marginBottom: '20px'}}>{t.heroSubtitle}</p>
            <h1 style={{fontSize: '96px', fontWeight: '200', color: '#f1f5f9', margin: 0, lineHeight: '1', letterSpacing: '-2px'}}>VALLE DE</h1>
            <h1 style={{fontSize: '96px', fontWeight: '700', color: '#cba658', margin: 0, lineHeight: '1', letterSpacing: '4px'}}>GUADALUPE</h1>
          </div>

          <div style={{maxWidth: '700px', fontSize: '18px', lineHeight: '1.8', color: '#cbd5e1', fontWeight: '300', marginBottom: '60px', fontStyle: 'italic'}}>
            "{t.heroQuote}"
          </div>

          <div style={{display: 'flex', gap: '40px', fontSize: '14px', color: '#94a3b8', letterSpacing: '2px', flexWrap: 'wrap', justifyContent: 'center'}}>
            <div><span style={{color: '#cbd5e1', fontSize: '32px', fontWeight: '700', display: 'block'}}>50</span>{t.wineries}</div>
            <div style={{borderLeft: '1px solid #94a3b8', height: '50px'}}></div>
            <div><span style={{color: '#cba658', fontSize: '32px', fontWeight: '700', display: 'block'}}>25</span>{t.restaurants}</div>
            <div style={{borderLeft: '1px solid #94a3b8', height: '50px'}}></div>
            <div><span style={{color: '#cbd5e1', fontSize: '32px', fontWeight: '700', display: 'block'}}>15</span>{t.breweries}</div>
            <div style={{borderLeft: '1px solid #94a3b8', height: '50px'}}></div>
            <div><span style={{color: '#cba658', fontSize: '32px', fontWeight: '700', display: 'block'}}>5</span>{t.michelinStars} ⭐</div>
          </div>
        </div>

        <div style={{position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: '#cbd5e1', fontSize: '12px', letterSpacing: '3px', textAlign: 'center'}}>
          <div style={{marginBottom: '10px'}}>{t.scrollExplore}</div>
          <div style={{width: '1px', height: '40px', background: 'linear-gradient(to bottom, #cbd5e1, #cba658)', margin: '0 auto'}}></div>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(203,166,88,0.2)', padding: '30px 0'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '60px', padding: '0 24px', flexWrap: 'wrap'}}>
          {[
            {key: 'all', label: t.allEstablishments, count: businesses.length},
            {key: 'winery', label: t.wineries, count: businesses.filter(b => b.type === 'winery').length},
            {key: 'restaurant', label: t.restaurants, count: businesses.filter(b => b.type === 'restaurant').length},
            {key: 'brewery', label: t.breweries, count: businesses.filter(b => b.type === 'brewery').length}
          ].map(({key, label, count}) => (
            <button key={key} onClick={() => setFilter(key)} style={{background: 'none', border: 'none', color: filter === key ? '#cba658' : '#94a3b8', fontSize: '13px', letterSpacing: '3px', fontWeight: '700', cursor: 'pointer', padding: '10px 0', borderBottom: filter === key ? '2px solid #cba658' : '2px solid transparent', transition: 'all 0.3s'}}>
              {label} <span style={{fontSize: '11px', marginLeft: '8px', opacity: 0.6}}>({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{padding: '100px 24px', background: '#0f172a'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '40px'}}>
            {filteredBusinesses.map((business, index) => (
              <div key={business.id} onClick={() => setSelectedBusiness(business)} style={{background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '2px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'}}>
                
                <div style={{position: 'relative', height: '280px', overflow: 'hidden'}}>
                  <img src={getBusinessImage(business)} alt={business.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  {business.michelin > 0 && (
                    <div style={{position: 'absolute', top: '20px', right: '20px', background: 'rgba(15,23,42,0.9)', padding: '10px 20px', borderRadius: '2px', fontSize: '20px'}}>
                      {'⭐'.repeat(business.michelin)}
                    </div>
                  )}
                  <div style={{position: 'absolute', top: '20px', left: '20px', background: index % 2 === 0 ? 'rgba(203,213,225,0.95)' : 'rgba(203,166,88,0.95)', color: '#0f172a', padding: '8px 16px', fontSize: '11px', letterSpacing: '2px', fontWeight: '700', textTransform: 'uppercase'}}>
                    {business.type === 'winery' ? (language === 'en' ? 'WINERY' : 'VINÍCOLA') : business.type === 'restaurant' ? (language === 'en' ? 'RESTAURANT' : 'RESTAURANTE') : (language === 'en' ? 'BREWERY' : 'CERVECERÍA')}
                  </div>
                </div>

                <div style={{padding: '32px'}}>
                  <h3 style={{fontSize: '24px', fontWeight: '400', color: '#f1f5f9', margin: '0 0 10px 0'}}>{business.name}</h3>
                  <p style={{fontSize: '12px', color: index % 2 === 0 ? '#cbd5e1' : '#cba658', letterSpacing: '2px', marginBottom: '20px', textTransform: 'uppercase'}}>{business.category} • {business.city}</p>
                  <p style={{fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '24px', height: '84px', overflow: 'hidden'}}>{business.description}</p>

                  <div style={{borderTop: '1px solid rgba(148,163,184,0.2)', paddingTop: '20px', marginBottom: '20px'}}>
                    {business.phone && (
                      <div style={{fontSize: '13px', color: '#94a3b8', marginBottom: '8px'}}>
                        <span style={{color: '#cbd5e1'}}>{t.contact}: </span>{business.phone}
                      </div>
                    )}
                    <div style={{fontSize: '13px', color: '#94a3b8', marginBottom: '8px'}}>
                      <span style={{color: '#cbd5e1'}}>{t.pricing}: </span>{business.price} (${business.fee} USD)
                    </div>
                    {business.reservation && (
                      <div style={{fontSize: '12px', color: '#cba658', marginTop: '12px'}}>
                        ⚠ {t.reservationRequired}
                      </div>
                    )}
                  </div>

                  <div style={{display: 'flex', gap: '20px'}}>
                    {business.website && (
                      <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{color: '#cba658', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px', fontWeight: '700'}}>{t.visitWebsite} →</a>
                    )}
                    <a href={`https://www.google.com/maps?q=${business.lat},${business.lng}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{color: '#94a3b8', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px', fontWeight: '700'}}>{t.viewMap} →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedBusiness && (
        <div onClick={() => setSelectedBusiness(null)} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px'}}>
          <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '1200px', width: '100%', maxHeight: '90vh', background: '#1e293b', border: '1px solid rgba(203,166,88,0.3)', borderRadius: '2px', overflow: 'auto', position: 'relative'}}>
            <button onClick={() => setSelectedBusiness(null)} style={{position: 'absolute', top: '30px', right: '30px', background: 'rgba(203,213,225,0.2)', border: 'none', color: '#cbd5e1', fontSize: '24px', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>×</button>

            <div style={{position: 'relative', height: '500px'}}>
              <img src={getBusinessImage(selectedBusiness)} alt={selectedBusiness.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(30,41,59,1), transparent)', padding: '60px 60px 40px'}}>
                {selectedBusiness.michelin > 0 && (
                  <div style={{fontSize: '36px', marginBottom: '10px'}}>{'⭐'.repeat(selectedBusiness.michelin)}</div>
                )}
                <h2 style={{fontSize: '56px', fontWeight: '300', color: '#f1f5f9', margin: '0 0 10px 0'}}>{selectedBusiness.name}</h2>
                <p style={{fontSize: '14px', color: '#cba658', letterSpacing: '3px', textTransform: 'uppercase'}}>{selectedBusiness.category} • {selectedBusiness.city}</p>
              </div>
            </div>

            <div style={{padding: '60px'}}>
              <p style={{fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8', marginBottom: '40px'}}>{selectedBusiness.description}</p>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px'}}>
                <div>
                  <h4 style={{fontSize: '12px', color: '#cbd5e1', letterSpacing: '3px', marginBottom: '15px'}}>{t.contactInfo}</h4>
                  {selectedBusiness.phone && <p style={{fontSize: '16px', color: '#f1f5f9', marginBottom: '10px'}}>{selectedBusiness.phone}</p>}
                  {selectedBusiness.website && <a href={`https://${selectedBusiness.website}`} target="_blank" rel="noopener noreferrer" style={{color: '#cba658', fontSize: '14px'}}>{selectedBusiness.website}</a>}
                </div>
                <div>
                  <h4 style={{fontSize: '12px', color: '#cbd5e1', letterSpacing: '3px', marginBottom: '15px'}}>{t.pricing}</h4>
                  <p style={{fontSize: '24px', color: '#f1f5f9', fontWeight: '300'}}>${selectedBusiness.fee} USD</p>
                  <p style={{fontSize: '14px', color: '#94a3b8'}}>{selectedBusiness.price}</p>
                  {selectedBusiness.reservation && <p style={{fontSize: '13px', color: '#cba658', marginTop: '15px'}}>⚠ {t.reservationRequired}</p>}
                </div>
              </div>

              <div style={{display: 'flex', gap: '20px'}}>
                {selectedBusiness.website && (
                  <a href={`https://${selectedBusiness.website}`} target="_blank" rel="noopener noreferrer" style={{flex: 1, padding: '18px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', fontSize: '13px', letterSpacing: '2px', fontWeight: '700', textAlign: 'center', textDecoration: 'none', cursor: 'pointer'}}>{t.visitWebsite}</a>
                )}
                <a href={`https://www.google.com/maps?q=${selectedBusiness.lat},${selectedBusiness.lng}`} target="_blank" rel="noopener noreferrer" style={{flex: 1, padding: '18px', background: 'linear-gradient(135deg, #cbd5e1, #94a3b0)', color: '#0f172a', border: 'none', fontSize: '13px', letterSpacing: '2px', fontWeight: '700', textAlign: 'center', textDecoration: 'none', cursor: 'pointer'}}>{t.viewOnMap}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LifestyleSection;