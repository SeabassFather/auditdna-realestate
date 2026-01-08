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
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audio] = useState(new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_2c87ba9f3c.mp3'));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;
    return () => audio.pause();
  }, [audio]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAudio = () => {
    if (audioEnabled) {
      audio.pause();
      setAudioEnabled(false);
    } else {
      audio.play().catch(e => console.log('Audio:', e));
      setAudioEnabled(true);
    }
  };

  const buttonBaseStyle = {
    padding: isMobile ? '6px 12px' : '8px 20px',
    background: 'rgba(203, 213, 225, 0.15)',
    backdropFilter: 'blur(8px)',
    color: '#e2e8f0',
    border: '1px solid rgba(203, 213, 225, 0.4)',
    borderRadius: '25px',
    fontSize: isMobile ? '8px' : '10px',
    fontWeight: '600',
    letterSpacing: '1.2px',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(203, 213, 225, 0.2)',
    transition: 'all 0.25s',
    textTransform: 'uppercase',
    width: isMobile ? '60px' : '80px',
    textAlign: 'center'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative', 
      backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: isMobile ? 'scroll' : 'fixed',
      filter: 'brightness(1.3) contrast(0.9)'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.15), rgba(15,23,42,0.45))'
      }}></div>

      {/* BUTTONS TOP RIGHT - ALPHABETICAL */}
      <div style={{
        position: 'fixed',
        top: isMobile ? '12px' : '24px',
        right: isMobile ? '12px' : '24px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row',
        gap: isMobile ? '6px' : '12px',
        alignItems: 'center'
      }}>
        {/* ADMIN */}
        <button onClick={() => navigate('/admin')} style={buttonBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
            e.currentTarget.style.color = '#0f172a';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(226, 232, 240, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(203, 213, 225, 0.15)';
            e.currentTarget.style.color = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(203, 213, 225, 0.2)';
          }}>
          Admin
        </button>

        {/* AGENT */}
        <button onClick={() => navigate('/login')} style={buttonBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
            e.currentTarget.style.color = '#0f172a';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(226, 232, 240, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(203, 213, 225, 0.15)';
            e.currentTarget.style.color = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(203, 213, 225, 0.2)';
          }}>
          Agent
        </button>

        {/* OCEAN */}
        <button onClick={toggleAudio} style={{
          ...buttonBaseStyle,
          background: audioEnabled ? 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' : 'rgba(203, 213, 225, 0.15)',
          color: audioEnabled ? '#0f172a' : '#e2e8f0',
          border: audioEnabled ? 'none' : '1px solid rgba(203, 213, 225, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px'
        }}
        onMouseEnter={(e) => {
          if (!audioEnabled) {
            e.currentTarget.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
            e.currentTarget.style.color = '#0f172a';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(226, 232, 240, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!audioEnabled) {
            e.currentTarget.style.background = 'rgba(203, 213, 225, 0.15)';
            e.currentTarget.style.color = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(203, 213, 225, 0.2)';
          }
        }}>
          <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{audioEnabled ? '🔊' : '🔇'}</span>
        </button>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '60px 16px' : '100px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '50px' : '100px' }}>
          {/* TITLE - RESPONSIVE */}
          <h1 style={{ 
            fontSize: isMobile ? '32px' : '64px', 
            fontWeight: isMobile ? '400' : '200', 
            color: '#e2e8f0', 
            textShadow: '0 0 30px rgba(226, 232, 240, 0.7), 0 0 60px rgba(226, 232, 240, 0.5), 0 4px 30px rgba(0,0,0,0.5)', 
            marginBottom: '20px',
            letterSpacing: isMobile ? '1px' : '2px',
            lineHeight: isMobile ? '1.3' : '1.2'
          }}>
            AuditDNA Mexico Real Estate
          </h1>
          {/* SUBTITLE - RESPONSIVE */}
          <p style={{ 
            fontSize: isMobile ? '14px' : '20px', 
            color: '#e2e8f0',
            textShadow: '0 0 20px rgba(226, 232, 240, 0.6), 0 0 40px rgba(226, 232, 240, 0.4), 0 2px 15px rgba(0,0,0,0.3)',
            fontWeight: '400',
            letterSpacing: '1px',
            padding: isMobile ? '0 10px' : '0'
          }}>
            Premium Mexico Real Estate & Cross-Border Financing
          </p>
        </div>
        
        {/* CARDS - RESPONSIVE GRID */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: isMobile ? '20px' : '32px' 
        }}>
          <div onClick={() => navigate('/mexico-real-estate')} style={{ 
            background: 'rgba(30, 41, 59, 0.4)', 
            backdropFilter: 'blur(20px)',
            border: '2px solid #e2e8f0',
            boxShadow: '0 8px 32px rgba(226, 232, 240, 0.2), 0 0 20px rgba(226, 232, 240, 0.1)', 
            borderRadius: '12px', 
            padding: isMobile ? '32px 24px' : '56px 40px', 
            cursor: 'pointer',
            transition: 'all 0.4s',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(226, 232, 240, 0.4), 0 0 40px rgba(226, 232, 240, 0.2)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(226, 232, 240, 0.2), 0 0 20px rgba(226, 232, 240, 0.1)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
          }}>
            <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: '300', color: '#f1f5f9', marginBottom: '16px', letterSpacing: '1px', textShadow: '0 0 15px rgba(241, 245, 249, 0.3)' }}>Mexico Real Estate</h2>
            <p style={{ fontSize: isMobile ? '13px' : '15px', color: '#e2e8f0', lineHeight: '1.7', fontWeight: '300' }}>Valle de Guadalupe • Ensenada • La Paz • Cabo San Lucas • San José del Cabo • Bahía de los Ángeles • Rosarito • Tijuana • Loreto • Todos Santos</p>
          </div>

          <div onClick={() => navigate('/lifestyle')} style={{ 
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '2px solid #e2e8f0',
            boxShadow: '0 8px 32px rgba(226, 232, 240, 0.2), 0 0 20px rgba(226, 232, 240, 0.1)', 
            borderRadius: '12px', 
            padding: isMobile ? '32px 24px' : '56px 40px', 
            cursor: 'pointer', 
            transition: 'all 0.4s',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(203, 166, 88, 0.4), 0 0 40px rgba(203, 166, 88, 0.2)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(226, 232, 240, 0.2), 0 0 20px rgba(226, 232, 240, 0.1)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
          }}>
            <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '1px', textShadow: '0 0 15px rgba(203, 166, 88, 0.4)' }}>Baja California Luxury Guide</h2>
            <p style={{ fontSize: isMobile ? '13px' : '15px', color: '#e2e8f0', lineHeight: '1.7', fontWeight: '300' }}>1000+ Establishments • 19 Regions • Wineries • Golf • Hotels • Spas • Adventure</p>
          </div>

          <div onClick={() => navigate('/developments')} style={{ 
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '2px solid #e2e8f0',
            boxShadow: '0 8px 32px rgba(226, 232, 240, 0.2), 0 0 20px rgba(226, 232, 240, 0.1)', 
            borderRadius: '12px', 
            padding: isMobile ? '32px 24px' : '56px 40px', 
            cursor: 'pointer',
            transition: 'all 0.4s',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(226, 232, 240, 0.4), 0 0 40px rgba(226, 232, 240, 0.2)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(226, 232, 240, 0.2), 0 0 20px rgba(226, 232, 240, 0.1)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
          }}>
            <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: '300', color: '#f1f5f9', marginBottom: '16px', letterSpacing: '1px', textShadow: '0 0 15px rgba(241, 245, 249, 0.3)' }}>Developments</h2>
            <p style={{ fontSize: isMobile ? '13px' : '15px', color: '#e2e8f0', lineHeight: '1.7', fontWeight: '300' }}>Explore new development projects across Mexico</p>
          </div>

          <div onClick={() => navigate('/usa-mortgage')} style={{ 
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '2px solid #e2e8f0',
            boxShadow: '0 8px 32px rgba(226, 232, 240, 0.2), 0 0 20px rgba(226, 232, 240, 0.1)', 
            borderRadius: '12px', 
            padding: isMobile ? '32px 24px' : '56px 40px', 
            cursor: 'pointer',
            transition: 'all 0.4s',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(226, 232, 240, 0.4), 0 0 40px rgba(226, 232, 240, 0.2)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(226, 232, 240, 0.2), 0 0 20px rgba(226, 232, 240, 0.1)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
          }}>
            <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: '300', color: '#f1f5f9', marginBottom: '16px', letterSpacing: '1px', textShadow: '0 0 15px rgba(241, 245, 249, 0.3)' }}>US & Mexico Mortgage</h2>
            <p style={{ fontSize: isMobile ? '13px' : '15px', color: '#e2e8f0', lineHeight: '1.7', fontWeight: '300' }}>Mortgage financing for US & Mexico properties</p>
          </div>
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