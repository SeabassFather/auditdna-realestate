// =============================================
// LUXURY GOODS MARKETPLACE
// 4-SQUARE HERO - FERRARI/JET/YACHT/WATCH
// PIMPED OUT SILVER/PLATINUM SHINE
// HIGH END AS FUCK
// =============================================

import React, { useState } from 'react';

// ========== LUXURY GOODS DATA ==========
const LUXURY_ITEMS = [
  // AVIATION
  {
    id: 'jet-001',
    category: 'Aviation',
    title: '2019 Gulfstream G650ER',
    subtitle: 'Ultra Long Range Business Jet',
    price: '$62,500,000',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=85',
    specs: ['Range: 7,500 nm', 'Speed: Mach 0.925', 'Passengers: 19', 'Hours: 1,847 TTAF'],
    location: 'San Diego, CA',
    featured: true
  },
  {
    id: 'jet-002',
    category: 'Aviation',
    title: '2021 Bombardier Global 7500',
    subtitle: 'Largest Purpose-Built Business Jet',
    price: '$72,000,000',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=85',
    specs: ['Range: 7,700 nm', '4 Living Spaces', 'Full Kitchen', 'Hours: 423 TTAF'],
    location: 'Scottsdale, AZ',
    featured: false
  },
  {
    id: 'jet-003',
    category: 'Aviation',
    title: '2022 Cessna Citation X+',
    subtitle: 'Fastest Civilian Aircraft',
    price: '$23,000,000',
    image: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=85',
    specs: ['Speed: Mach 0.935', 'Range: 3,460 nm', 'Passengers: 12', 'Hours: 892 TTAF'],
    location: 'Van Nuys, CA',
    featured: false
  },
  {
    id: 'heli-001',
    category: 'Aviation',
    title: '2022 Airbus H160',
    subtitle: 'VIP Configured Helicopter',
    price: '$21,000,000',
    image: 'https://images.unsplash.com/photo-1608236415053-3691891f1ee3?w=800&q=85',
    specs: ['Range: 450 nm', 'Speed: 160 kts', 'VIP 6-Seat Interior', 'Hours: 127'],
    location: 'Los Angeles, CA',
    featured: false
  },
  // YACHTS
  {
    id: 'yacht-001',
    category: 'Yachts',
    title: '2020 Benetti Oasis 40M',
    subtitle: 'Italian Luxury Superyacht',
    price: '$18,500,000',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=85',
    specs: ['Length: 131 ft', 'Beam: 28 ft', 'Guests: 10', 'Crew: 7'],
    location: 'Cabo San Lucas, MX',
    featured: true
  },
  {
    id: 'yacht-002',
    category: 'Yachts',
    title: '2018 Azimut Grande 35M',
    subtitle: 'Tri-Deck Motor Yacht',
    price: '$9,200,000',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=85',
    specs: ['Length: 115 ft', 'Speed: 26 kts', 'Guests: 10', 'Crew: 5'],
    location: 'Ensenada, MX',
    featured: false
  },
  {
    id: 'yacht-003',
    category: 'Yachts',
    title: '2023 Riva 110 Dolcevita',
    subtitle: 'Italian Flybridge Masterpiece',
    price: '$14,800,000',
    image: 'https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=85',
    specs: ['Length: 110 ft', 'Speed: 28 kts', 'Mahogany Interior', 'Crew: 4'],
    location: 'La Paz, MX',
    featured: false
  },
  // AUTOMOBILES
  {
    id: 'car-001',
    category: 'Automobiles',
    title: '2024 Rolls-Royce Phantom EWB',
    subtitle: 'Extended Wheelbase - Bespoke',
    price: '$685,000',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=85',
    specs: ['V12 Twin-Turbo', 'Starlight Headliner', 'Bespoke Interior', '2,400 Miles'],
    location: 'Beverly Hills, CA',
    featured: true
  },
  {
    id: 'car-002',
    category: 'Automobiles',
    title: '2024 Ferrari SF90 XX Stradale',
    subtitle: 'Limited Edition Hypercar',
    price: '$892,000',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=85',
    specs: ['1,016 HP', '0-60: 2.3s', 'Assetto Fiorano Package', '124 Miles'],
    location: 'Newport Beach, CA',
    featured: true
  },
  {
    id: 'car-003',
    category: 'Automobiles',
    title: '1967 Ferrari 275 GTB/4',
    subtitle: 'Classiche Certified - Matching Numbers',
    price: '$3,200,000',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85',
    specs: ['V12 4-Cam', 'Matching Numbers', 'Full Documentation', 'Concours Winner'],
    location: 'Pebble Beach, CA',
    featured: true
  },
  {
    id: 'car-004',
    category: 'Automobiles',
    title: '2024 Lamborghini Revuelto',
    subtitle: 'First HPEV V12 Supercar',
    price: '$608,000',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=85',
    specs: ['1,001 HP', 'V12 Hybrid', '0-60: 2.5s', 'Delivery Miles'],
    location: 'Scottsdale, AZ',
    featured: false
  },
  // TIMEPIECES
  {
    id: 'watch-001',
    category: 'Timepieces',
    title: 'Patek Philippe Nautilus 5711/1A',
    subtitle: 'Final Production Year - Blue Dial',
    price: '$185,000',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=85',
    specs: ['40mm Steel', 'Blue Dial', 'Full Set 2021', 'Unworn'],
    location: 'Los Angeles, CA',
    featured: true
  },
  {
    id: 'watch-002',
    category: 'Timepieces',
    title: 'Rolex Daytona "Paul Newman" 6239',
    subtitle: 'Exotic Dial - Museum Quality',
    price: '$425,000',
    image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=85',
    specs: ['37mm Steel', 'Exotic Dial', 'Circa 1968', 'Full Provenance'],
    location: 'New York, NY',
    featured: false
  },
  {
    id: 'watch-003',
    category: 'Timepieces',
    title: 'Richard Mille RM 11-03',
    subtitle: 'Automatic Flyback Chronograph',
    price: '$285,000',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=85',
    specs: ['Titanium Case', 'Skeleton Dial', 'Full Set', 'Like New'],
    location: 'Miami, FL',
    featured: false
  },
  // JEWELRY
  {
    id: 'jewelry-001',
    category: 'Jewelry',
    title: 'Kashmir Sapphire Ring',
    subtitle: '18.92ct - No Heat - GIA Certified',
    price: '$2,800,000',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85',
    specs: ['18.92 Carats', 'Kashmir Origin', 'No Heat Treatment', 'Platinum Setting'],
    location: 'Geneva, CH',
    featured: true
  },
  {
    id: 'jewelry-002',
    category: 'Jewelry',
    title: 'Fancy Vivid Yellow Diamond',
    subtitle: '15.03ct Cushion Cut - GIA',
    price: '$1,450,000',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85',
    specs: ['15.03 Carats', 'Fancy Vivid', 'VVS1 Clarity', 'Excellent Cut'],
    location: 'New York, NY',
    featured: false
  },
  // FINE ART
  {
    id: 'art-001',
    category: 'Fine Art',
    title: 'Banksy - "Girl with Balloon"',
    subtitle: 'Signed Screen Print - AP Edition',
    price: '$950,000',
    image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=85',
    specs: ['Screen Print', 'Artist Proof', 'Pest Control COA', 'Museum Frame'],
    location: 'London, UK',
    featured: true
  },
  {
    id: 'art-002',
    category: 'Fine Art',
    title: 'Jean-Michel Basquiat - "Untitled"',
    subtitle: 'Acrylic and Oil Stick on Canvas',
    price: '$4,200,000',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=85',
    specs: ['1982', '72 x 60 inches', 'Full Provenance', 'Museum Exhibited'],
    location: 'New York, NY',
    featured: false
  },
  // ESTATES
  {
    id: 'estate-001',
    category: 'Estates',
    title: 'Valle de Guadalupe Vineyard',
    subtitle: '45 Acre Wine Estate with Villa',
    price: '$8,500,000',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=85',
    specs: ['45 Acres', '12,000 sf Villa', 'Producing Vineyard', 'Wine Cave'],
    location: 'Valle de Guadalupe, MX',
    featured: true
  }
];

const CATEGORIES = ['All', 'Aviation', 'Yachts', 'Automobiles', 'Timepieces', 'Jewelry', 'Fine Art', 'Estates'];

// 4-SQUARE HERO IMAGES
const HERO_IMAGES = [
  { 
    url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=90',
    label: 'AUTOMOBILES'
  },
  { 
    url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=90',
    label: 'AVIATION'
  },
  { 
    url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=90',
    label: 'YACHTS'
  },
  { 
    url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=90',
    label: 'TIMEPIECES'
  }
];

// ========== TYPOGRAPHY ==========
const serifText = {
  fontFamily: '"Playfair Display", "Times New Roman", Georgia, serif',
  fontWeight: '400'
};

const sansText = {
  fontFamily: '"Helvetica Neue", -apple-system, sans-serif',
  fontWeight: '300'
};

export default function LuxuryGoods() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [inquirySent, setInquirySent] = useState(false);

  const filteredItems = selectedCategory === 'All' 
    ? LUXURY_ITEMS 
    : LUXURY_ITEMS.filter(item => item.category === selectedCategory);

  const featuredItems = LUXURY_ITEMS.filter(item => item.featured);

  const handleInquiry = (item) => {
    setSelectedItem(item);
    setShowInquiryModal(true);
    setInquirySent(false);
    setInquiryForm({ name: '', email: '', phone: '', message: '' });
  };

  const submitInquiry = () => {
    console.log('INQUIRY SUBMITTED TO ADMIN:', {
      item: selectedItem,
      buyer: inquiryForm,
      timestamp: new Date().toISOString()
    });
    setInquirySent(true);
    setTimeout(() => {
      setShowInquiryModal(false);
    }, 3000);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
      background: '#050505'
    }}>
      
      {/* ============================================= */}
      {/* 4-SQUARE HERO SECTION - PIMPED OUT */}
      {/* ============================================= */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '4px',
        background: '#0a0a0a'
      }}>
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            {/* IMAGE */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${img.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.8s ease, filter 0.5s ease',
              filter: 'brightness(0.6) saturate(0.9)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.filter = 'brightness(0.8) saturate(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'brightness(0.6) saturate(0.9)';
            }}
            />
            
            {/* SILVER SHINE OVERLAY */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(
                ${idx === 0 ? '135deg' : idx === 1 ? '225deg' : idx === 2 ? '45deg' : '315deg'},
                rgba(203,213,225,0.15) 0%,
                transparent 50%,
                rgba(148,163,176,0.1) 100%
              )`,
              pointerEvents: 'none'
            }} />

            {/* DIAMOND SPARKLE */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '30%',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'sparkle 3s ease-in-out infinite',
              animationDelay: `${idx * 0.5}s`
            }} />

            {/* CATEGORY LABEL */}
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '30px',
              zIndex: 10
            }}>
              <p style={{
                ...sansText,
                fontSize: '10px',
                letterSpacing: '4px',
                color: '#b8944d',
                marginBottom: '8px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                {img.label}
              </p>
              <div style={{
                width: '40px',
                height: '2px',
                background: 'linear-gradient(90deg, #cbd5e1, transparent)',
                boxShadow: '0 0 10px rgba(203,213,225,0.5)'
              }} />
            </div>

            {/* CORNER ACCENTS */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '30px',
              height: '30px',
              borderTop: '1px solid rgba(203,213,225,0.4)',
              borderRight: '1px solid rgba(203,213,225,0.4)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '30px',
              height: '30px',
              borderBottom: '1px solid rgba(203,213,225,0.4)',
              borderLeft: '1px solid rgba(203,213,225,0.4)'
            }} />
          </div>
        ))}

        {/* CENTER OVERLAY - LOGO & TITLE */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          textAlign: 'center',
          padding: '60px 80px',
          background: 'rgba(5,5,5,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(203,213,225,0.2)',
          boxShadow: '0 0 100px rgba(0,0,0,0.8), 0 0 60px rgba(203,213,225,0.1)'
        }}>
          {/* DIAMOND ICON */}
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 24px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              width: '40px',
              height: '40px',
              border: '1px solid rgba(203,213,225,0.5)',
              background: 'linear-gradient(135deg, rgba(203,213,225,0.15) 0%, rgba(148,163,176,0.05) 100%)',
              boxShadow: '0 0 40px rgba(203,213,225,0.3), inset 0 0 20px rgba(255,255,255,0.1)'
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#cbd5e1',
              fontSize: '20px',
              textShadow: '0 0 20px rgba(203,213,225,0.8)'
            }}>
              ◇
            </div>
          </div>

          <h1 style={{
            ...serifText,
            fontSize: '42px',
            fontWeight: '400',
            letterSpacing: '12px',
            color: '#cbd5e1',
            margin: '0 0 8px',
            textShadow: '0 0 60px rgba(203,213,225,0.4)'
          }}>
            ENJOY BAJA
          </h1>
          <p style={{
            ...sansText,
            fontSize: '11px',
            letterSpacing: '8px',
            color: '#94a3b8',
            margin: '0 0 20px'
          }}>
            LUXURY COLLECTION
          </p>
          <div style={{
            width: '100px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #b8944d, transparent)',
            margin: '0 auto 20px',
            boxShadow: '0 0 15px rgba(184,148,77,0.4)'
          }} />
          <p style={{
            ...sansText,
            fontSize: '9px',
            letterSpacing: '4px',
            color: '#64748b'
          }}>
            PRIVATE BROKERAGE
          </p>
        </div>

        {/* SCROLL INDICATOR */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          textAlign: 'center'
        }}>
          <p style={{
            ...sansText,
            fontSize: '8px',
            letterSpacing: '4px',
            color: '#64748b',
            marginBottom: '10px'
          }}>
            SCROLL TO EXPLORE
          </p>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(180deg, #cbd5e1, transparent)',
            margin: '0 auto',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
        </div>

        {/* PLATINUM CORNER BADGES */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 20,
          padding: '12px 20px',
          background: 'linear-gradient(135deg, rgba(203,213,225,0.15) 0%, rgba(148,163,176,0.08) 100%)',
          border: '1px solid rgba(203,213,225,0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{
            ...sansText,
            fontSize: '8px',
            letterSpacing: '3px',
            color: '#cbd5e1'
          }}>
            EST. 2024
          </span>
        </div>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 20,
          padding: '12px 20px',
          background: 'linear-gradient(135deg, rgba(203,213,225,0.15) 0%, rgba(148,163,176,0.08) 100%)',
          border: '1px solid rgba(203,213,225,0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{
            ...sansText,
            fontSize: '8px',
            letterSpacing: '3px',
            color: '#cbd5e1'
          }}>
            BAJA CALIFORNIA
          </span>
        </div>
      </section>

      {/* SPARKLE ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>

      {/* FEATURED SECTION */}
      <section style={{
        position: 'relative',
        zIndex: 5,
        padding: '100px 48px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{
            ...sansText,
            fontSize: '10px',
            letterSpacing: '6px',
            color: '#b8944d',
            marginBottom: '16px'
          }}>
            CURATED SELECTIONS
          </p>
          <h2 style={{
            ...serifText,
            fontSize: '48px',
            fontWeight: '400',
            letterSpacing: '10px',
            color: '#cbd5e1',
            margin: 0,
            textShadow: '0 0 60px rgba(203,213,225,0.2)'
          }}>
            FEATURED
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '28px'
        }}>
          {featuredItems.slice(0, 4).map(item => (
            <div
              key={item.id}
              onClick={() => handleInquiry(item)}
              style={{
                background: 'linear-gradient(145deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.8) 100%)',
                border: '1px solid rgba(148,163,176,0.15)',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 30px 80px rgba(203,213,225,0.12), 0 0 40px rgba(148,163,176,0.08)';
                e.currentTarget.style.borderColor = 'rgba(203,213,225,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(148,163,176,0.15)';
              }}
            >
              <div style={{
                height: '280px',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
                  padding: '8px 16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                  <span style={{
                    ...sansText,
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: '#0f172a',
                    fontWeight: '500'
                  }}>
                    FEATURED
                  </span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '120px',
                  background: 'linear-gradient(transparent, rgba(15,23,42,0.95))'
                }} />
              </div>
              <div style={{ padding: '28px' }}>
                <p style={{
                  ...sansText,
                  fontSize: '9px',
                  letterSpacing: '3px',
                  color: '#b8944d',
                  marginBottom: '10px'
                }}>
                  {item.category.toUpperCase()}
                </p>
                <h3 style={{
                  ...serifText,
                  fontSize: '22px',
                  fontWeight: '500',
                  color: '#e2e8f0',
                  margin: '0 0 8px'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  ...sansText,
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '20px'
                }}>
                  {item.subtitle}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(148,163,176,0.12)'
                }}>
                  <span style={{
                    ...serifText,
                    fontSize: '22px',
                    fontWeight: '500',
                    color: '#cbd5e1',
                    textShadow: '0 0 20px rgba(203,213,225,0.3)'
                  }}>
                    {item.price}
                  </span>
                  <span style={{
                    ...sansText,
                    fontSize: '10px',
                    letterSpacing: '3px',
                    color: '#b8944d',
                    padding: '10px 20px',
                    border: '1px solid rgba(184,148,77,0.3)'
                  }}>
                    INQUIRE →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section style={{
        position: 'relative',
        zIndex: 5,
        padding: '50px 48px',
        borderTop: '1px solid rgba(148,163,176,0.1)',
        borderBottom: '1px solid rgba(148,163,176,0.1)',
        background: 'rgba(15,23,42,0.6)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...sansText,
                fontSize: '10px',
                letterSpacing: '3px',
                padding: '14px 28px',
                background: selectedCategory === cat 
                  ? 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)' 
                  : 'transparent',
                color: selectedCategory === cat ? '#0f172a' : '#94a3b8',
                border: selectedCategory === cat ? 'none' : '1px solid rgba(148,163,176,0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: selectedCategory === cat ? '500' : '300'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* FULL CATALOG */}
      <section style={{
        position: 'relative',
        zIndex: 5,
        padding: '70px 48px',
        background: '#0a0a0a'
      }}>
        <p style={{
          ...sansText,
          fontSize: '10px',
          letterSpacing: '5px',
          color: '#64748b',
          marginBottom: '50px',
          textAlign: 'center'
        }}>
          {selectedCategory === 'All' ? 'COMPLETE CATALOG' : selectedCategory.toUpperCase()}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleInquiry(item)}
              style={{
                background: 'linear-gradient(145deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.7) 100%)',
                border: '1px solid rgba(148,163,176,0.12)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(203,213,225,0.08)';
                e.currentTarget.style.borderColor = 'rgba(203,213,225,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(148,163,176,0.12)';
              }}
            >
              <div style={{
                height: '220px',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <div style={{ padding: '24px' }}>
                <p style={{
                  ...sansText,
                  fontSize: '8px',
                  letterSpacing: '3px',
                  color: '#b8944d',
                  marginBottom: '8px'
                }}>
                  {item.category.toUpperCase()} · {item.location}
                </p>
                <h3 style={{
                  ...serifText,
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#e2e8f0',
                  margin: '0 0 6px'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  ...sansText,
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginBottom: '14px'
                }}>
                  {item.subtitle}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '18px'
                }}>
                  {item.specs.slice(0, 2).map((spec, idx) => (
                    <span key={idx} style={{
                      ...sansText,
                      fontSize: '9px',
                      color: '#64748b',
                      padding: '5px 12px',
                      background: 'rgba(30,41,59,0.5)',
                      border: '1px solid rgba(148,163,176,0.1)'
                    }}>
                      {spec}
                    </span>
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(148,163,176,0.08)'
                }}>
                  <span style={{
                    ...serifText,
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#cbd5e1'
                  }}>
                    {item.price}
                  </span>
                  <span style={{
                    ...sansText,
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: '#b8944d'
                  }}>
                    INQUIRE →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCRETION NOTICE */}
      <section style={{
        position: 'relative',
        zIndex: 5,
        padding: '80px 48px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, rgba(15,23,42,0.9) 100%)',
        textAlign: 'center',
        borderTop: '1px solid rgba(148,163,176,0.08)'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          margin: '0 auto 28px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            width: '50px',
            height: '50px',
            border: '1px solid rgba(203,213,225,0.25)',
            background: 'linear-gradient(135deg, rgba(203,213,225,0.08) 0%, transparent 100%)',
            boxShadow: '0 0 40px rgba(203,213,225,0.12)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#cbd5e1',
            fontSize: '24px'
          }}>
            ◇
          </div>
        </div>
        <h3 style={{
          ...serifText,
          fontSize: '26px',
          fontWeight: '400',
          letterSpacing: '8px',
          color: '#cbd5e1',
          marginBottom: '18px',
          textShadow: '0 0 40px rgba(203,213,225,0.15)'
        }}>
          ABSOLUTE DISCRETION
        </h3>
        <p style={{
          ...sansText,
          fontSize: '13px',
          lineHeight: '2.2',
          color: '#94a3b8',
          maxWidth: '650px',
          margin: '0 auto',
          letterSpacing: '1px'
        }}>
          All inquiries are handled with the utmost confidentiality. Buyer and seller information 
          remains private until mutual consent is established. Our brokerage ensures secure, 
          discreet transactions for discerning clientele.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{
        position: 'relative',
        zIndex: 5,
        padding: '40px 48px',
        borderTop: '1px solid rgba(148,163,176,0.08)',
        textAlign: 'center',
        background: 'rgba(15,23,42,0.8)'
      }}>
        <p style={{
          ...sansText,
          fontSize: '9px',
          letterSpacing: '4px',
          color: '#64748b'
        }}>
          ENJOY BAJA LUXURY COLLECTION · PRIVATE BROKERAGE · ALL INQUIRIES CONFIDENTIAL
        </p>
      </footer>

      {/* INQUIRY MODAL */}
      {showInquiryModal && selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 5, 5, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(20px)',
          padding: '20px'
        }} onClick={() => setShowInquiryModal(false)}>
          <div style={{
            background: 'linear-gradient(145deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%)',
            border: '1px solid rgba(203,213,225,0.2)',
            maxWidth: '520px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(203,213,225,0.08)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              height: '220px',
              backgroundImage: `url(${selectedItem.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '28px',
                background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.98))'
              }}>
                <p style={{
                  ...sansText,
                  fontSize: '9px',
                  letterSpacing: '3px',
                  color: '#b8944d',
                  marginBottom: '6px'
                }}>
                  {selectedItem.category.toUpperCase()}
                </p>
                <h3 style={{
                  ...serifText,
                  fontSize: '24px',
                  fontWeight: '500',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setShowInquiryModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '44px',
                  height: '44px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(148,163,176,0.3)',
                  color: '#94a3b8',
                  fontSize: '22px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: '36px' }}>
              {!inquirySent ? (
                <>
                  <p style={{
                    ...sansText,
                    fontSize: '10px',
                    letterSpacing: '3px',
                    color: '#64748b',
                    marginBottom: '28px',
                    textAlign: 'center'
                  }}>
                    PRIVATE INQUIRY · {selectedItem.price}
                  </p>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      ...sansText,
                      fontSize: '9px',
                      letterSpacing: '2px',
                      color: '#64748b',
                      display: 'block',
                      marginBottom: '10px'
                    }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '16px 18px',
                        background: 'rgba(30,41,59,0.6)',
                        border: '1px solid rgba(148,163,176,0.2)',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: '"Helvetica Neue", sans-serif',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      ...sansText,
                      fontSize: '9px',
                      letterSpacing: '2px',
                      color: '#64748b',
                      display: 'block',
                      marginBottom: '10px'
                    }}>
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '16px 18px',
                        background: 'rgba(30,41,59,0.6)',
                        border: '1px solid rgba(148,163,176,0.2)',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: '"Helvetica Neue", sans-serif',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      ...sansText,
                      fontSize: '9px',
                      letterSpacing: '2px',
                      color: '#64748b',
                      display: 'block',
                      marginBottom: '10px'
                    }}>
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '16px 18px',
                        background: 'rgba(30,41,59,0.6)',
                        border: '1px solid rgba(148,163,176,0.2)',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: '"Helvetica Neue", sans-serif',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '28px' }}>
                    <label style={{
                      ...sansText,
                      fontSize: '9px',
                      letterSpacing: '2px',
                      color: '#64748b',
                      display: 'block',
                      marginBottom: '10px'
                    }}>
                      MESSAGE
                    </label>
                    <textarea
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '16px 18px',
                        background: 'rgba(30,41,59,0.6)',
                        border: '1px solid rgba(148,163,176,0.2)',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: '"Helvetica Neue", sans-serif',
                        resize: 'vertical',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <button
                    onClick={submitInquiry}
                    disabled={!inquiryForm.name || !inquiryForm.email}
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: inquiryForm.name && inquiryForm.email 
                        ? 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)' 
                        : 'rgba(100,116,139,0.3)',
                      border: 'none',
                      color: inquiryForm.name && inquiryForm.email ? '#0f172a' : '#64748b',
                      fontSize: '11px',
                      letterSpacing: '4px',
                      cursor: inquiryForm.name && inquiryForm.email ? 'pointer' : 'not-allowed',
                      fontFamily: '"Helvetica Neue", sans-serif',
                      fontWeight: '500',
                      boxShadow: inquiryForm.name && inquiryForm.email 
                        ? '0 4px 20px rgba(203,213,225,0.2)' 
                        : 'none'
                    }}
                  >
                    SUBMIT PRIVATE INQUIRY
                  </button>
                  <p style={{
                    ...sansText,
                    fontSize: '9px',
                    color: '#64748b',
                    textAlign: 'center',
                    marginTop: '20px',
                    lineHeight: '1.8'
                  }}>
                    Your inquiry will be reviewed by our brokerage team.<br />
                    All communications remain strictly confidential.
                  </p>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto 28px',
                    border: '2px solid #cbd5e1',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(203,213,225,0.3)'
                  }}>
                    <span style={{ fontSize: '32px', color: '#cbd5e1' }}>✓</span>
                  </div>
                  <h3 style={{
                    ...serifText,
                    fontSize: '22px',
                    fontWeight: '500',
                    color: '#e2e8f0',
                    marginBottom: '12px',
                    letterSpacing: '3px'
                  }}>
                    INQUIRY RECEIVED
                  </h3>
                  <p style={{
                    ...sansText,
                    fontSize: '12px',
                    color: '#94a3b8',
                    letterSpacing: '1px'
                  }}>
                    Our team will contact you within 24 hours
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}