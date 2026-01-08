import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

function Accordion({ children, defaultOpen = -1 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      open: openIndex === i,
      onHeaderClick: () => setOpenIndex(openIndex === i ? -1 : i),
    })
  );
}

function AccordionItem({ title, open, onHeaderClick, children }) {
  return (
    <div style={{
      background: 'rgba(15, 10, 8, 0.75)',
      border: '1px solid rgba(203, 166, 88, 0.4)',
      borderRadius: '12px',
      marginBottom: '16px',
      overflow: 'hidden',
      backdropFilter: 'blur(8px)'
    }}>
      <button
        type="button"
        onClick={onHeaderClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
          background: open ? 'rgba(203, 166, 88, 0.2)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{
          fontSize: '18px',
          fontWeight: '400',
          color: '#f4e4bc',
          letterSpacing: '2px',
          fontFamily: 'Playfair Display, serif',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)'
        }}>{title}</span>
        {open ? <ChevronUp size={20} color="#cba658" /> : <ChevronDown size={20} color="#cba658" />}
      </button>
      {open && (
        <div style={{ padding: '24px 28px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function BajaLuxuryGuide() {
  const [language, setLanguage] = useState("english");
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    fetch('/lifestyle-data/baja-luxury-complete.json')
      .then(res => res.json())
      .then(data => setEstablishments(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const labels = {
    english: {
      header: "BAJA CALIFORNIA",
      sub: "LUXURY GUIDE",
      establishments: "Curated Establishments",
      toggle: "Español",
    },
    spanish: {
      header: "BAJA CALIFORNIA",
      sub: "GUÍA DE LUJO",
      establishments: "Establecimientos Selectos",
      toggle: "English",
    },
  };

  const t = labels[language];

  const groupByRegion = () => {
    const grouped = {};
    establishments.forEach(est => {
      const region = est.region || 'Unknown';
      if (!grouped[region]) grouped[region] = [];
      grouped[region].push(est);
    });
    return grouped;
  };

  const grouped = groupByRegion();
  const regions = Object.keys(grouped).sort();

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* VINEYARD PHOTO - CLEAN, NO OVERLAPPING GLASS */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />

      {/* LIGHTER OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(10,8,6,0.65) 0%, rgba(15,10,8,0.75) 100%)',
        zIndex: 0
      }} />

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '60px 40px',
        position: 'relative',
        zIndex: 2
      }}>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          borderTop: '2px solid #cba658',
          borderBottom: '2px solid #cba658',
          padding: '40px 0',
          background: 'rgba(10, 8, 6, 0.4)',
          backdropFilter: 'blur(5px)'
        }}>
          <h1 style={{
            fontSize: '72px',
            fontWeight: '400',
            background: 'linear-gradient(135deg, #cba658, #f4e4bc, #cba658)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
            letterSpacing: '12px',
            fontFamily: 'Playfair Display, serif',
            lineHeight: '1.2',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)'
          }}>{t.header}</h1>
          <p style={{
            fontSize: '24px',
            color: '#f4e4bc',
            letterSpacing: '8px',
            fontWeight: '300',
            marginBottom: '20px',
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)'
          }}>{t.sub}</p>
          <p style={{
            fontSize: '12px',
            color: '#cba658',
            letterSpacing: '3px',
            fontWeight: '400',
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)'
          }}>{establishments.length} {t.establishments}</p>
          
          <div style={{ marginTop: '30px' }}>
            <button
              onClick={() => setLanguage(language === "english" ? "spanish" : "english")}
              style={{
                padding: '12px 40px',
                background: 'linear-gradient(135deg, #cba658, #b8944d)',
                border: 'none',
                borderRadius: '30px',
                color: '#0a0a0a',
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '2px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(203, 166, 88, 0.6)',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.3s'
              }}
            >
              {t.toggle}
            </button>
          </div>
        </div>

        <Accordion defaultOpen={-1}>
          {regions.map((region) => (
            <AccordionItem key={region} title={`${region} (${grouped[region].length})`}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px'
              }}>
                {grouped[region].map(est => (
                  <div key={est.id} style={{
                    background: 'rgba(15, 10, 8, 0.85)',
                    border: '1px solid rgba(203, 166, 88, 0.4)',
                    borderRadius: '8px',
                    padding: '20px',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(203, 166, 88, 0.5)';
                    e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.7)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.4)';
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                      {est.type === 'winery' ? '🍷' :
                       est.type === 'restaurant' ? '🍽️' :
                       est.type === 'hotel' ? '🏨' :
                       est.type === 'golf' ? '⛳' :
                       est.type === 'spa' ? '💆' :
                       est.type === 'brewery' ? '🍺' :
                       est.type === 'yacht' ? '⛵' : '🏔️'}
                    </div>
                    <div style={{
                      fontSize: '9px',
                      color: '#cba658',
                      letterSpacing: '2px',
                      marginBottom: '8px',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>
                      {est.type}
                    </div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#f4e4bc',
                      marginBottom: '12px',
                      fontFamily: 'Playfair Display, serif',
                      lineHeight: '1.3'
                    }}>{est.name}</h3>
                    <p style={{
                      fontSize: '11px',
                      color: '#d4c5a0',
                      lineHeight: '1.5',
                      marginBottom: '14px',
                      fontWeight: '300'
                    }}>{est.description || est.city}</p>
                    {est.fee && (
                      <div style={{
                        fontSize: '16px',
                        color: '#cba658',
                        fontWeight: '700',
                        marginBottom: '16px',
                        letterSpacing: '1px'
                      }}>${est.fee}</div>
                    )}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px'
                    }}>
                      <button
                        onClick={() => est.website && window.open(est.website, '_blank')}
                        style={{
                          padding: '12px',
                          background: 'linear-gradient(135deg, #cba658, #b8944d)',
                          border: 'none',
                          borderRadius: '30px',
                          color: '#0a0a0a',
                          fontSize: '10px',
                          fontWeight: '800',
                          letterSpacing: '1.5px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(203, 166, 88, 0.5)',
                          transition: 'all 0.3s',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(203, 166, 88, 0.7)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(203, 166, 88, 0.5)';
                        }}
                      >
                        WEBSITE
                      </button>
                      <button
                        onClick={() => {
                          const msg = `Interested in ${est.name} in ${region}`;
                          window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        style={{
                          padding: '12px',
                          background: 'linear-gradient(135deg, #cbd5e1, #94a3b0)',
                          border: 'none',
                          borderRadius: '30px',
                          color: '#0a0a0a',
                          fontSize: '10px',
                          fontWeight: '800',
                          letterSpacing: '1.5px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(203, 213, 225, 0.5)',
                          transition: 'all 0.3s',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(203, 213, 225, 0.7)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(203, 213, 225, 0.5)';
                        }}
                      >
                        CONTACT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>

        <div style={{
          marginTop: '80px',
          padding: '40px',
          borderTop: '2px solid #cba658',
          textAlign: 'center',
          background: 'rgba(10, 8, 6, 0.6)',
          backdropFilter: 'blur(5px)'
        }}>
          <p style={{
            fontSize: '11px',
            color: '#cba658',
            letterSpacing: '3px',
            fontWeight: '400',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)'
          }}>SAUL GARCIA • NMLS #337526 • +52 646 340 2686</p>
        </div>
      </div>
    </div>
  );
}