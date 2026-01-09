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

// =============================================
// LANDING PAGE - 4 PICTURE CARDS + OCEAN BG
// =============================================
function LandingPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
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
      route: '/developments'
    },
    {
      id: 'developments',
      title: 'Developments',
      subtitle: 'New Construction Projects',
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
        padding: isMobile ? '12px 16px' : '16px 32px',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(203, 213, 225, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ 
          fontSize: isMobile ? '14px' : '16px', 
          fontWeight: '300', 
          color: '#f1f5f9', 
          letterSpacing: '2px' 
        }}>
          ENJOY BAJA
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  style={{
                    padding: '6px 14px',
                    background: 'rgba(203, 166, 88, 0.2)',
                    border: '1px solid rgba(203, 166, 88, 0.4)',
                    color: '#cba658',
                    fontSize: '10px',
                    cursor: 'pointer',
                    letterSpacing: '1px'
                  }}
                >
                  ADMIN
                </button>
              )}
              <button
                onClick={logout}
                style={{
                  padding: '6px 14px',
                  background: 'transparent',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  color: '#94a3b8',
                  fontSize: '10px',
                  cursor: 'pointer',
                  letterSpacing: '1px'
                }}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '6px 14px',
                background: 'transparent',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                color: '#94a3b8',
                fontSize: '10px',
                cursor: 'pointer',
                letterSpacing: '1px'
              }}
            >
              AGENT LOGIN
            </button>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: isMobile ? '100px 16px 60px' : '120px 32px 80px' 
      }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
          <h1 style={{ 
            fontSize: isMobile ? '32px' : '48px', 
            fontWeight: '300', 
            color: '#f1f5f9', 
            marginBottom: '12px',
            letterSpacing: '4px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)'
          }}>
            MEXICO REAL ESTATE
          </h1>
          <p style={{ 
            fontSize: isMobile ? '12px' : '14px', 
            color: '#cba658', 
            letterSpacing: '3px',
            marginBottom: '8px'
          }}>
            PREMIUM PROPERTIES & CROSS-BORDER FINANCING
          </p>
          <p style={{ 
            fontSize: '11px', 
            color: '#94a3b8', 
            letterSpacing: '1px' 
          }}>
            Saul Garcia | NMLS #337526 | Everwise Home Loans & Realty
          </p>
        </div>

        {/* 4 PICTURE CARDS */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
          gap: isMobile ? '16px' : '24px',
          marginBottom: '40px'
        }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate(card.route)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: 'relative',
                height: isMobile ? '200px' : '280px',
                borderRadius: '0',
                overflow: 'hidden',
                cursor: 'pointer',
                border: hoveredCard === card.id ? '2px solid #cba658' : '2px solid rgba(203, 213, 225, 0.2)',
                transition: 'all 0.3s ease',
                transform: hoveredCard === card.id ? 'translateY(-4px)' : 'translateY(0)'
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
                transition: 'transform 0.5s ease',
                transform: hoveredCard === card.id ? 'scale(1.1)' : 'scale(1)'
              }} />
              
              {/* Card Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 100%)'
              }} />
              
              {/* Card Content */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: isMobile ? '20px' : '28px'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: '500',
                  color: '#f1f5f9',
                  marginBottom: '6px',
                  letterSpacing: '1px'
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: isMobile ? '11px' : '13px',
                  color: '#cbd5e1',
                  letterSpacing: '0.5px'
                }}>
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ 
          textAlign: 'center', 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(203, 213, 225, 0.1)' 
        }}>
          <p style={{ fontSize: '12px', color: '#64748b', letterSpacing: '1px' }}>
            Valle de Guadalupe • Ensenada • La Paz • San José del Cabo • Rosarito • Tijuana • Loreto • Todos Santos
          </p>
        </div>
      </div>
    </div>
  );
}

// =============================================
// ADMIN ROUTE - ONLY ADMIN
// =============================================
function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) return <div style={{ background: '#0f172a', minHeight: '100vh', color: '#fff', padding: '40px' }}>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  
  return children;
}

// =============================================
// APP ROUTES - ALL PUBLIC EXCEPT /admin
// =============================================
function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC - NO LOGIN */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/agent-register" element={<AgentRegistration />} />
      <Route path="/mexico-real-estate" element={<MexicoRealEstate />} />
      <Route path="/developments" element={<Developments />} />
      <Route path="/usa-mortgage" element={<USAMortgage />} />
      <Route path="/1003-urla" element={<URLA1003 />} />
      
      {/* ADMIN ONLY */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      
      {/* CATCH ALL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// =============================================
// MAIN APP
// =============================================
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}