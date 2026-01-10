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
import AdminDashboard from './pages/AdminDashboard';
import UniversalPropertyUpload from './components/properties/UniversalPropertyUpload';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
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

  const cards = [
    {
      id: 'realestate',
      title: 'Mexico Real Estate',
      subtitle: 'Baja California Premium Properties',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
      route: '/mexico-real-estate'
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle Guide',
      subtitle: 'Wine Country & Luxury Living',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80',
      route: '/lifestyle'
    },
    {
      id: 'developments',
      title: 'Developments',
      subtitle: '64 Projects Across 17 Regions',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
      route: '/developments'
    },
    {
      id: 'mortgage',
      title: 'US & Mexico Loans',
      subtitle: 'Mortgage & Financing Solutions',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80',
      route: '/usa-mortgage'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* OCEAN BACKGROUND - FULL SCREEN */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        zIndex: 0
      }} />

      {/* DARK OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.7) 100%)',
        zIndex: 1
      }} />

      {/* TOP NAV */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isMobile ? '16px 20px' : '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.9), transparent)'
      }}>
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            border: '1px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '300', letterSpacing: '1px' }}>EB</span>
          </div>
          <div>
            <div style={{ 
              color: '#e4e4e7', 
              fontSize: '18px', 
              fontWeight: '300', 
              letterSpacing: '4px',
              textTransform: 'uppercase'
            }}>
              Enjoy Baja
            </div>
            <div style={{
              color: '#94a3b8',
              fontSize: '9px',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Luxury Real Estate
            </div>
          </div>
        </div>

        {/* NAV BUTTONS */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '12px 28px',
              background: 'transparent',
              border: '1px solid #94a3b8',
              color: '#cbd5e1',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#e4e4e7';
              e.currentTarget.style.color = '#0f172a';
              e.currentTarget.style.borderColor = '#e4e4e7';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#cbd5e1';
              e.currentTarget.style.borderColor = '#94a3b8';
            }}
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/agent-register')}
            style={{
              padding: '12px 28px',
              background: '#cba658',
              border: 'none',
              color: '#0f172a',
              fontSize: '10px',
              fontWeight: '600',
              letterSpacing: '2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#d4b366';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#cba658';
            }}
          >
            Join
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
        alignItems: 'center',
        padding: isMobile ? '100px 20px 60px' : '120px 48px 80px'
      }}>
        
        {/* HERO TEXT */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: isMobile ? '40px' : '60px'
        }}>
          <p style={{
            fontSize: '10px',
            color: '#cba658',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Where the Stars Come to Shine
          </p>

          <h1 style={{ 
            fontSize: isMobile ? '38px' : '72px',
            fontWeight: '200',
            color: '#e4e4e7',
            letterSpacing: isMobile ? '6px' : '12px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            lineHeight: '1.1'
          }}>
            Baja California
          </h1>

          <p style={{
            fontSize: isMobile ? '13px' : '16px',
            color: '#94a3b8',
            fontWeight: '300',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            Premium Properties & Services
          </p>

          {/* THIN LINE */}
          <div style={{
            width: '60px',
            height: '1px',
            background: '#cba658',
            margin: '30px auto 0'
          }} />
        </div>

        {/* 4 CARDS GRID */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '12px' : '20px',
          maxWidth: '1200px',
          width: '100%'
        }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate(card.route)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: 'relative',
                height: isMobile ? '200px' : '320px',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === card.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === card.id 
                  ? '0 24px 50px rgba(0,0,0,0.5)' 
                  : '0 8px 30px rgba(0,0,0,0.3)'
              }}
            >
              {/* CARD IMAGE */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.6s ease',
                transform: hoveredCard === card.id ? 'scale(1.08)' : 'scale(1)'
              }} />

              {/* CARD OVERLAY */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: hoveredCard === card.id
                  ? 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.3) 100%)'
                  : 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.2) 100%)',
                transition: 'all 0.4s ease'
              }} />

              {/* CARD BORDER */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: hoveredCard === card.id 
                  ? '1px solid rgba(203, 166, 88, 0.6)' 
                  : '1px solid rgba(148, 163, 184, 0.3)',
                transition: 'all 0.3s ease',
                pointerEvents: 'none'
              }} />

              {/* CARD CONTENT */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: isMobile ? '16px' : '24px'
              }}>
                <p style={{
                  fontSize: '9px',
                  color: '#94a3b8',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  {card.subtitle}
                </p>
                <h3 style={{
                  fontSize: isMobile ? '16px' : '20px',
                  fontWeight: '400',
                  color: '#e4e4e7',
                  letterSpacing: '1px',
                  marginBottom: '12px'
                }}>
                  {card.title}
                </h3>

                {/* ARROW ON HOVER */}
                <div style={{
                  opacity: hoveredCard === card.id ? 1 : 0,
                  transform: hoveredCard === card.id ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    fontSize: '10px',
                    color: '#cba658',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                  }}>
                    Enter
                  </span>
                  <span style={{ color: '#cba658', fontSize: '14px' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 48px',
        background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <p style={{
          fontSize: '10px',
          color: '#64748b',
          letterSpacing: '2px'
        }}>
          info@enjoybaja.com | WhatsApp: +52 646 340 2686
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agent-register" element={<AgentRegistration />} />
          <Route path="/lifestyle" element={<BajaLuxuryGuide />} />
          
          {/* PROTECTED ROUTES - Logged in users */}
          <Route path="/mexico-real-estate" element={<ProtectedRoute><MexicoRealEstate /></ProtectedRoute>} />
          <Route path="/developments" element={<ProtectedRoute><Developments /></ProtectedRoute>} />
          <Route path="/usa-mortgage" element={<ProtectedRoute><USAMortgage /></ProtectedRoute>} />
          <Route path="/1003-urla" element={<ProtectedRoute><URLA1003 /></ProtectedRoute>} />
          
          {/* ADMIN ONLY ROUTES */}
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/properties" element={<AdminProtectedRoute><AdminPropertyUpload /></AdminProtectedRoute>} />
        </Routes>
        <WhatsAppWidget />
        <AIChatWidget />
      </Router>
    </AuthProvider>
  );
}

export default App;