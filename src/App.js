import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MexicoRealEstate from './pages/MexicoRealEstate';
import Developments from './pages/Developments';
import USAMortgage from './pages/USAMortgage';
import URLA1003 from './pages/URLA1003';
import Login from './pages/Login';
import AgentRegistration from './pages/AgentRegistration';
import AdminDashboard from './pages/AdminDashboard';
import LuxuryGoods from './components/LuxuryGoods';
import BajaLuxuryGuide from './components/BajaLuxuryGuide';

// FLOATING ANIMATION - Subtle water-like effect
const floatStyles = `
  @keyframes float1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
  @keyframes float2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  @keyframes float3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
  @keyframes float4 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
`;

if (typeof document !== 'undefined' && !document.getElementById('float-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'float-styles';
  styleSheet.textContent = floatStyles;
  document.head.appendChild(styleSheet);
}

// =============================================
// LANDING PAGE - 4 PICTURE CARDS + OCEAN BG
// =============================================
function LandingPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // ADMIN PIN PROTECTION - TIERED ACCESS
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');
  
  // =============================================
  // PIN CONFIGURATION - CHANGE THESE AS NEEDED
  // =============================================
  const ACCESS_PINS = {
    owner: '0609',      // FULL ACCESS - You
    sales: [            // CRM/PBX + Shared Calendar ONLY
      '1111',           // Sales Rep 1
      '2222',           // Sales Rep 2
      '3333',           // Sales Rep 3
      '4444',           // Sales Rep 4
      '5555'            // Sales Rep 5
    ]
  };

  const handleAdminClick = () => {
    setShowAdminModal(true);
    setAdminPin('');
    setPinError('');
  };

  const handlePinSubmit = () => {
    if (adminPin === ACCESS_PINS.owner) {
      sessionStorage.setItem('admin_access_level', 'owner');
      setShowAdminModal(false);
      setAdminPin('');
      navigate('/admin');
    } else if (ACCESS_PINS.sales.includes(adminPin)) {
      sessionStorage.setItem('admin_access_level', 'sales');
      setShowAdminModal(false);
      setAdminPin('');
      navigate('/admin');
    } else {
      setPinError('Invalid PIN');
      setAdminPin('');
    }
  };

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
      route: '/mexico-real-estate',
      float: 'float1 4s ease-in-out infinite'
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle Guide',
      subtitle: 'Wine Country & Luxury Living',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80',
      route: '/lifestyle',
      float: 'float2 4.5s ease-in-out infinite 0.5s'
    },
    {
      id: 'developments',
      title: 'Developments',
      subtitle: '64 Projects Across 17 Regions',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
      route: '/developments',
      float: 'float3 3.5s ease-in-out infinite 1s'
    },
    {
      id: 'mortgage',
      title: 'US & Mexico Loans',
      subtitle: 'Mortgage & Financing Solutions',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80',
      route: '/usa-mortgage',
      float: 'float4 4.2s ease-in-out infinite 0.3s'
    }
  ];

  // GLASS TEXT STYLE
  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(148, 163, 184, 0.85)',
    textShadow: '0 1px 15px rgba(0,0,0,0.2)'
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* OCEAN BACKGROUND */}
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
        padding: isMobile ? '12px 16px' : '16px 48px',
        background: 'rgba(15, 23, 42, 0.3)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          ...glassText,
          fontSize: isMobile ? '10px' : '11px',
          letterSpacing: '4px',
          color: 'rgba(203, 166, 88, 0.9)'
        }}>
          ENJOY BAJA
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <button onClick={handleAdminClick} style={{
                ...glassText,
                padding: '8px 16px',
                background: 'rgba(203, 166, 88, 0.15)',
                border: '1px solid rgba(203, 166, 88, 0.3)',
                color: 'rgba(203, 166, 88, 0.9)',
                fontSize: '9px',
                letterSpacing: '2px',
                cursor: 'pointer'
              }}>
                ADMIN
              </button>
              <button onClick={logout} style={{
                ...glassText,
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(148, 163, 184, 0.8)',
                fontSize: '9px',
                letterSpacing: '2px',
                cursor: 'pointer'
              }}>
                LOGOUT
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} style={{
              ...glassText,
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'rgba(148, 163, 184, 0.8)',
              fontSize: '9px',
              letterSpacing: '2px',
              cursor: 'pointer'
            }}>
              AGENT LOGIN
            </button>
          )}
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
        padding: isMobile ? '100px 16px 80px' : '120px 48px 100px'
      }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
          <h1 style={{ 
            ...glassText,
            fontSize: isMobile ? '36px' : '68px',
            letterSpacing: isMobile ? '8px' : '16px',
            marginBottom: '16px',
            color: 'rgba(226, 232, 240, 0.9)'
          }}>
            ENJOY BAJA
          </h1>
          <p style={{
            ...glassText,
            fontSize: isMobile ? '10px' : '12px',
            letterSpacing: '4px',
            color: 'rgba(148, 163, 184, 0.7)'
          }}>
            PREMIUM REAL ESTATE & LIFESTYLE
          </p>
        </div>

        {/* 4 CARDS WITH FLOATING EFFECT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '16px' : '20px',
          maxWidth: '1400px',
          margin: '0 auto',
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
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                border: hoveredCard === card.id 
                  ? '1px solid rgba(203, 166, 88, 0.4)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                animation: card.float
              }}
            >
              {/* Card Image */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url("${card.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.6s ease',
                transform: hoveredCard === card.id ? 'scale(1.05)' : 'scale(1)'
              }} />

              {/* Card Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: hoveredCard === card.id
                  ? 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 100%)'
                  : 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.2) 100%)',
                transition: 'all 0.4s ease'
              }} />

              {/* Card Content */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: isMobile ? '20px' : '28px'
              }}>
                <p style={{
                  ...glassText,
                  fontSize: '8px',
                  letterSpacing: '3px',
                  color: 'rgba(203, 166, 88, 0.8)',
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  {card.subtitle}
                </p>
                <h3 style={{
                  ...glassText,
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: '200',
                  color: 'rgba(226, 232, 240, 0.9)',
                  letterSpacing: '2px'
                }}>
                  {card.title}
                </h3>

                {/* Arrow on Hover */}
                <div style={{
                  opacity: hoveredCard === card.id ? 1 : 0,
                  transform: hoveredCard === card.id ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 0.3s ease',
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    ...glassText,
                    fontSize: '8px',
                    color: 'rgba(203, 166, 88, 0.9)',
                    letterSpacing: '3px'
                  }}>
                    EXPLORE
                  </span>
                  <span style={{ color: 'rgba(203, 166, 88, 0.9)', fontSize: '12px' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '60px',
          paddingTop: '40px', 
          borderTop: '1px solid rgba(203, 213, 225, 0.1)' 
        }}>
          <p style={{ 
            ...glassText,
            fontSize: '10px', 
            color: 'rgba(148, 163, 184, 0.5)', 
            letterSpacing: '2px' 
          }}>
            Valle de Guadalupe • Ensenada • La Paz • San José del Cabo • Rosarito • Tijuana
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 48px',
        background: 'rgba(15, 23, 42, 0.3)',
        backdropFilter: 'blur(20px)',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <p style={{
          ...glassText,
          fontSize: '9px',
          color: 'rgba(148, 163, 184, 0.6)',
          letterSpacing: '3px'
        }}>
          info@enjoybaja.com | WhatsApp: +52 646 340 2686
        </p>
      </div>

      {/* ADMIN PIN MODAL */}
      {showAdminModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }} onClick={() => setShowAdminModal(false)}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.98)',
            border: '1px solid rgba(203, 166, 88, 0.3)',
            padding: '40px',
            maxWidth: '320px',
            width: '90%',
            textAlign: 'center'
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{
              ...glassText,
              fontSize: '14px',
              letterSpacing: '4px',
              color: '#cba658',
              marginBottom: '8px'
            }}>
              ADMIN ACCESS
            </h3>
            <p style={{
              ...glassText,
              fontSize: '10px',
              color: 'rgba(148, 163, 184, 0.6)',
              marginBottom: '24px',
              letterSpacing: '1px'
            }}>
              Enter security PIN to continue
            </p>
            
            <input
              type="password"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
              placeholder="• • • •"
              maxLength={4}
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: pinError ? '1px solid rgba(248, 113, 113, 0.5)' : '1px solid rgba(148, 163, 184, 0.2)',
                color: '#e2e8f0',
                fontSize: '24px',
                textAlign: 'center',
                letterSpacing: '12px',
                outline: 'none',
                marginBottom: '12px'
              }}
              autoFocus
            />
            
            {pinError && (
              <p style={{
                fontSize: '10px',
                color: '#f87171',
                marginBottom: '12px',
                letterSpacing: '1px'
              }}>
                {pinError}
              </p>
            )}
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button
                onClick={() => setShowAdminModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'transparent',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  color: 'rgba(148, 163, 184, 0.8)',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  cursor: 'pointer'
                }}
              >
                CANCEL
              </button>
              <button
                onClick={handlePinSubmit}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(203, 166, 88, 0.2)',
                  border: '1px solid rgba(203, 166, 88, 0.5)',
                  color: '#cba658',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  cursor: 'pointer'
                }}
              >
                ENTER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ADMIN ROUTE - Checks PIN from sessionStorage
function AdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div style={{ background: '#0f172a', minHeight: '100vh' }} />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  // Check sessionStorage for PIN access
  const accessLevel = sessionStorage.getItem('admin_access_level');
  if (accessLevel !== 'owner' && accessLevel !== 'sales') {
    return <Navigate to="/" />;
  }
  
  return children;
}

// PROTECTED ROUTE - REQUIRES LOGIN
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ background: '#0f172a', minHeight: '100vh' }} />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}

// AGENT PROTECTED ROUTE - REQUIRES LOGIN + AGENT PIN
function AgentProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const [showPinModal, setShowPinModal] = useState(true);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [authorized, setAuthorized] = useState(false);

  // Check if already authorized this session
  useEffect(() => {
    const auth = sessionStorage.getItem('agent_content_authorized');
    if (auth === 'true') {
      setAuthorized(true);
      setShowPinModal(false);
    }
  }, []);

  const AGENT_PINS = ['0609', '7777', '8888', '9999', '1234', '5678']; // Owner + Agent content PINs

  const handlePinSubmit = () => {
    if (AGENT_PINS.includes(pin)) {
      sessionStorage.setItem('agent_content_authorized', 'true');
      setAuthorized(true);
      setShowPinModal(false);
    } else {
      setPinError('Invalid PIN - Contact admin for access');
      setPin('');
    }
  };

  if (loading) return <div style={{ background: '#0f172a', minHeight: '100vh' }} />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  if (!authorized && showPinModal) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(203, 166, 88, 0.3)',
          padding: '48px',
          maxWidth: '360px',
          width: '90%',
          textAlign: 'center',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔐</div>
          <h3 style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: '100',
            fontSize: '16px',
            letterSpacing: '4px',
            color: '#cba658',
            marginBottom: '8px'
          }}>
            PROFESSIONAL ACCESS
          </h3>
          <p style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: '100',
            fontSize: '10px',
            color: 'rgba(148, 163, 184, 0.6)',
            marginBottom: '32px',
            letterSpacing: '1px'
          }}>
            Enter your agent PIN to access this content
          </p>
          
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
            placeholder="• • • •"
            maxLength={4}
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(30, 41, 59, 0.6)',
              border: pinError ? '1px solid rgba(248, 113, 113, 0.5)' : '1px solid rgba(148, 163, 184, 0.2)',
              color: '#e2e8f0',
              fontSize: '28px',
              textAlign: 'center',
              letterSpacing: '16px',
              outline: 'none',
              marginBottom: '12px',
              fontFamily: 'monospace'
            }}
            autoFocus
          />
          
          {pinError && (
            <p style={{
              fontSize: '10px',
              color: '#f87171',
              marginBottom: '12px',
              letterSpacing: '1px'
            }}>
              {pinError}
            </p>
          )}
          
          <button
            onClick={handlePinSubmit}
            style={{
              width: '100%',
              padding: '14px',
              background: 'rgba(203, 166, 88, 0.2)',
              border: '1px solid rgba(203, 166, 88, 0.5)',
              color: '#cba658',
              fontSize: '11px',
              letterSpacing: '3px',
              cursor: 'pointer',
              marginTop: '8px',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            ENTER
          </button>
          
          <p style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: '9px',
            color: 'rgba(148, 163, 184, 0.4)',
            marginTop: '24px',
            letterSpacing: '1px'
          }}>
            Contact admin@enjoybaja.com for access
          </p>
        </div>
      </div>
    );
  }

  return children;
}

// =============================================
// MAIN APP
// =============================================
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC - LOGIN & REGISTER */}
          <Route path="/login" element={<Login />} />
          <Route path="/agent-register" element={<AgentRegistration />} />
          
          {/* PROTECTED - REQUIRES LOGIN */}
          <Route path="/" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
          
          {/* OPEN TO ALL LOGGED IN USERS - NO EXTRA PIN */}
          <Route path="/lifestyle" element={<ProtectedRoute><BajaLuxuryGuide /></ProtectedRoute>} />
          <Route path="/luxury-goods" element={<ProtectedRoute><LuxuryGoods /></ProtectedRoute>} />
          
          {/* AGENT PROTECTED - REQUIRES LOGIN + AGENT PIN */}
          <Route path="/mexico-real-estate" element={<AgentProtectedRoute><MexicoRealEstate /></AgentProtectedRoute>} />
          <Route path="/developments" element={<AgentProtectedRoute><Developments /></AgentProtectedRoute>} />
          <Route path="/usa-mortgage" element={<AgentProtectedRoute><USAMortgage /></AgentProtectedRoute>} />
          <Route path="/1003-urla" element={<AgentProtectedRoute><URLA1003 /></AgentProtectedRoute>} />
          
          {/* ADMIN ONLY */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          
          {/* CATCH ALL */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;