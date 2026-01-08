import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MexicoRealEstate from './pages/MexicoRealEstate';
import Developments from './pages/Developments';
import USAMortgage from './pages/USAMortgage';
import URLA1003 from './pages/URLA1003';
import Login from './pages/Login';
import AgentRegistration from './pages/AgentRegistration';
import Register from './pages/Register';
import AdminPropertyUpload from './pages/AdminPropertyUpload';
import UniversalPropertyUpload from './components/properties/UniversalPropertyUpload';
import ProtectedRoute from './components/auth/ProtectedRoute';
import WhatsAppWidget from './components/contact/WhatsAppWidget';
import AIChatWidget from './components/chat/AIChatWidget';
import BajaLuxuryGuide from './components/BajaLuxuryGuide';

function LandingPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const luxuryCards = [
    {
      id: 'real-estate',
      title: 'OCEANFRONT ESTATES',
      subtitle: 'Baja California Luxury Properties',
      description: 'Cliffside villas • Beachfront mansions • Private peninsulas',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90',
      route: '/mexico-real-estate',
      accent: '#e2e8f0'
    },
    {
      id: 'lifestyle',
      title: 'WINE & LIFESTYLE',
      subtitle: 'Valle de Guadalupe',
      description: '200+ wineries • Michelin dining • Exclusive tastings',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=90',
      route: '/lifestyle',
      accent: '#cba658'
    },
    {
      id: 'developments',
      title: 'GOLF & RESORT',
      subtitle: 'Master-Planned Communities',
      description: 'Championship courses • Private clubs • Resort living',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=90',
      route: '/developments',
      accent: '#e2e8f0'
    },
    {
      id: 'mortgage',
      title: 'YACHT & MARINA',
      subtitle: 'Cross-Border Financing',
      description: 'Marina residences • Boat slips • Waterfront luxury',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=90',
      route: '/usa-mortgage',
      accent: '#e2e8f0'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* ANIMATED GRADIENT BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at 20% 20%, rgba(203, 166, 88, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(203, 166, 88, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(15, 23, 42, 1) 0%, #0a0a0a 100%)',
        zIndex: 0
      }} />

      {/* LUXURY GOLD LINE ACCENTS */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '5%',
        width: '1px',
        height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(203, 166, 88, 0.3), transparent)',
        zIndex: 1
      }} />
      <div style={{
        position: 'fixed',
        top: 0,
        right: '5%',
        width: '1px',
        height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(203, 166, 88, 0.3), transparent)',
        zIndex: 1
      }} />

      {/* TOP NAV BAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isMobile ? '16px 20px' : '24px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.95), transparent)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* LOGO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: isMobile ? '36px' : '44px',
            height: isMobile ? '36px' : '44px',
            border: '2px solid #cba658',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#cba658', fontSize: isMobile ? '14px' : '18px', fontWeight: '300' }}>EB</span>
          </div>
          <div>
            <div style={{ 
              color: '#f1f5f9', 
              fontSize: isMobile ? '14px' : '18px', 
              fontWeight: '300', 
              letterSpacing: '4px',
              textTransform: 'uppercase'
            }}>
              Enjoy Baja
            </div>
            <div style={{ 
              color: '#cba658', 
              fontSize: isMobile ? '8px' : '9px', 
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginTop: '2px'
            }}>
              Luxury Real Estate
            </div>
          </div>
        </div>

        {/* NAV BUTTONS */}
        <div style={{ display: 'flex', gap: isMobile ? '8px' : '16px' }}>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: isMobile ? '8px 16px' : '12px 28px',
              background: 'transparent',
              border: '1px solid rgba(203, 166, 88, 0.5)',
              borderRadius: '0',
              color: '#cba658',
              fontSize: isMobile ? '9px' : '11px',
              fontWeight: '500',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              textTransform: 'uppercase'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#cba658';
              e.currentTarget.style.color = '#0a0a0a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#cba658';
            }}
          >
            Agent Login
          </button>
          <button 
            onClick={() => navigate('/agent-register')}
            style={{
              padding: isMobile ? '8px 16px' : '12px 28px',
              background: 'linear-gradient(135deg, #cba658, #a38642)',
              border: 'none',
              borderRadius: '0',
              color: '#0a0a0a',
              fontSize: isMobile ? '9px' : '11px',
              fontWeight: '600',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              textTransform: 'uppercase'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(203, 166, 88, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Join Us
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '100px 16px 40px' : '120px 60px 60px'
      }}>
        
        {/* HERO SECTION */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: isMobile ? '40px' : '60px'
        }}>
          {/* TAGLINE */}
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            border: '1px solid rgba(203, 166, 88, 0.4)',
            marginBottom: '24px'
          }}>
            <span style={{
              color: '#cba658',
              fontSize: isMobile ? '10px' : '12px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: '400'
            }}>
              Baja California Peninsula • Mexico
            </span>
          </div>

          {/* MAIN TITLE */}
          <h1 style={{ 
            fontSize: isMobile ? '36px' : '72px',
            fontWeight: '200',
            color: '#f1f5f9',
            letterSpacing: isMobile ? '4px' : '12px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            lineHeight: '1.1',
            textShadow: '0 4px 60px rgba(0,0,0,0.8)'
          }}>
            Extraordinary
          </h1>
          <h1 style={{ 
            fontSize: isMobile ? '42px' : '86px',
            fontWeight: '300',
            color: '#cba658',
            letterSpacing: isMobile ? '2px' : '8px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            lineHeight: '1.1',
            textShadow: '0 4px 60px rgba(203, 166, 88, 0.3)'
          }}>
            Living
          </h1>

          {/* SUBTITLE */}
          <p style={{
            fontSize: isMobile ? '13px' : '16px',
            color: '#94a3b8',
            fontWeight: '300',
            letterSpacing: '3px',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Where the Pacific meets prestige. Discover the most coveted addresses from Tijuana to Cabo San Lucas.
          </p>

          {/* DECORATIVE LINE */}
          <div style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #cba658, transparent)',
            margin: '32px auto 0'
          }} />
        </div>

        {/* LUXURY CARDS GRID */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '16px' : '20px',
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%'
        }}>
          {luxuryCards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => navigate(card.route)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: 'relative',
                height: isMobile ? '280px' : '420px',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === card.id ? 'translateY(-12px)' : 'translateY(0)',
                boxShadow: hoveredCard === card.id 
                  ? '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(203, 166, 88, 0.2)' 
                  : '0 20px 40px rgba(0,0,0,0.4)'
              }}
            >
              {/* BACKGROUND IMAGE */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === card.id ? 'scale(1.1)' : 'scale(1)'
              }} />

              {/* GRADIENT OVERLAY */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: hoveredCard === card.id
                  ? 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 40%, rgba(10, 10, 10, 0.3) 100%)'
                  : 'linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.5) 50%, rgba(10, 10, 10, 0.2) 100%)',
                transition: 'all 0.6s ease'
              }} />

              {/* GOLD BORDER ACCENT */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: hoveredCard === card.id ? '2px solid #cba658' : '1px solid rgba(203, 166, 88, 0.3)',
                transition: 'all 0.4s ease',
                pointerEvents: 'none'
              }} />

              {/* CORNER ACCENTS */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                width: '30px',
                height: '30px',
                borderTop: '2px solid #cba658',
                borderLeft: '2px solid #cba658',
                opacity: hoveredCard === card.id ? 1 : 0.5,
                transition: 'opacity 0.4s ease'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                width: '30px',
                height: '30px',
                borderBottom: '2px solid #cba658',
                borderRight: '2px solid #cba658',
                opacity: hoveredCard === card.id ? 1 : 0.5,
                transition: 'opacity 0.4s ease'
              }} />

              {/* CONTENT */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: isMobile ? '24px' : '32px',
                transform: hoveredCard === card.id ? 'translateY(0)' : 'translateY(10px)',
                transition: 'transform 0.4s ease'
              }}>
                {/* NUMBER */}
                <div style={{
                  position: 'absolute',
                  top: isMobile ? '-60px' : '-80px',
                  right: '20px',
                  fontSize: isMobile ? '60px' : '80px',
                  fontWeight: '200',
                  color: 'rgba(203, 166, 88, 0.15)',
                  lineHeight: '1'
                }}>
                  0{index + 1}
                </div>

                {/* SUBTITLE */}
                <div style={{
                  color: '#cba658',
                  fontSize: isMobile ? '9px' : '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  {card.subtitle}
                </div>

                {/* TITLE */}
                <h2 style={{
                  color: '#f1f5f9',
                  fontSize: isMobile ? '20px' : '24px',
                  fontWeight: '400',
                  letterSpacing: '2px',
                  marginBottom: '12px',
                  textTransform: 'uppercase'
                }}>
                  {card.title}
                </h2>

                {/* DESCRIPTION */}
                <p style={{
                  color: '#94a3b8',
                  fontSize: isMobile ? '11px' : '12px',
                  fontWeight: '300',
                  letterSpacing: '1px',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  opacity: hoveredCard === card.id ? 1 : 0.8,
                  transition: 'opacity 0.4s ease'
                }}>
                  {card.description}
                </p>

                {/* CTA BUTTON */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  opacity: hoveredCard === card.id ? 1 : 0,
                  transform: hoveredCard === card.id ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.4s ease'
                }}>
                  <span style={{
                    color: '#cba658',
                    fontSize: '11px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontWeight: '500'
                  }}>
                    Explore
                  </span>
                  <div style={{
                    width: '40px',
                    height: '1px',
                    background: '#cba658'
                  }} />
                  <span style={{ color: '#cba658', fontSize: '18px' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM STATS BAR */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '24px' : '80px',
          marginTop: isMobile ? '40px' : '60px',
          flexWrap: 'wrap'
        }}>
          {[
            { value: '500+', label: 'Luxury Properties' },
            { value: '17', label: 'Regions' },
            { value: '$2.8B', label: 'Portfolio Value' },
            { value: '200+', label: 'Wineries' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: isMobile ? '28px' : '42px',
                fontWeight: '200',
                color: '#cba658',
                letterSpacing: '2px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: isMobile ? '9px' : '10px',
                color: '#64748b',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginTop: '8px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* LUXURY TAGLINE */}
        <div style={{
          textAlign: 'center',
          marginTop: isMobile ? '40px' : '60px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(203, 166, 88, 0.2)'
        }}>
          <p style={{
            color: '#64748b',
            fontSize: isMobile ? '10px' : '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: '300'
          }}>
            "The art of living well, where every sunset is yours"
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agent-register" element={<AgentRegistration />} />
          <Route path="/mexico-real-estate" element={<ProtectedRoute><MexicoRealEstate /></ProtectedRoute>} />
          <Route path="/lifestyle" element={<BajaLuxuryGuide />} />
          <Route path="/developments" element={<ProtectedRoute><Developments /></ProtectedRoute>} />
          <Route path="/usa-mortgage" element={<ProtectedRoute><USAMortgage /></ProtectedRoute>} />
          <Route path="/1003-urla" element={<ProtectedRoute><URLA1003 /></ProtectedRoute>} />
        </Routes>
        <WhatsAppWidget />
        <AIChatWidget />
      </Router>
    </AuthProvider>
  );
}

export default App;