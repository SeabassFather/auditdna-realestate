import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MexicoRealEstate from './pages/MexicoRealEstate';
import Developments from './pages/Developments';
import USAMortgage from './pages/USAMortgage';
import URLA1003 from './pages/URLA1003';
import AgentRegistration from './pages/AgentRegistration';
import AdminDashboard from './pages/AdminDashboard';
import LuxuryGoods from './components/LuxuryGoods';
import BajaLuxuryGuide from './components/BajaLuxuryGuide';
import AdminPropertyUpload from './pages/AdminPropertyUpload';
import AgentPropertyUpload from './pages/AgentPropertyUpload';

// =============================================
// MARKETING AUTOMATION SYSTEM IMPORTS
// =============================================
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import SelfServiceAdPortal from './components/SelfServiceAdPortal';
import MarketingDashboard from './components/admin/MarketingDashboard';
import AdManagementPanel from './components/admin/AdManagementPanel';
import AgentRegistrationWizard from './components/registration/AgentRegistrationWizard';
import AgentVettingPanel from './components/admin/AgentVettingPanel';

// =============================================
// AUDITDNA IMPORTS
// =============================================
import AuditDNADirect from './pages/AuditDNADirect';
import AuditRecovery from './pages/AuditRecovery';
import ProfessionalNetwork from './pages/ProfessionalNetwork';
import MonitoringService from './pages/MonitoringService';
import SecurityVerification from './pages/SecurityVerification';

// FLOATING ANIMATION - Subtle water-like effect
const floatStyles = `
  @keyframes float1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
  @keyframes float2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  @keyframes float3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
  @keyframes float4 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
  @keyframes float5 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }
`;

if (typeof document !== 'undefined' && !document.getElementById('float-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'float-styles';
  styleSheet.textContent = floatStyles;
  document.head.appendChild(styleSheet);
}

// =============================================
// MASTER CREDENTIALS CONFIGURATION
// =============================================
const CREDENTIALS = {
  admin: {
    email: 'saul@enjoybaja.com',
    password: 'Admin2026!',
    pin: '060905',
    role: 'owner',
    name: 'Saul Garcia'
  },
  gl: {
    email: 'gl@enjoybaja.com',
    password: 'gladmin2026',
    pin: '0505',
    role: 'owner',
    name: 'GL Administrator'
  },
  sf: {
    email: 'sf@enjoybaja.com',
    password: 'sfadmin2026',
    pin: '0505',
    role: 'owner',
    name: 'SF Administrator'
  },
  demo: {
    email: 'demo@enjoybaja.com',
    password: 'Demo2026!',
    pin: '0000',
    role: 'demo',
    name: 'Demo User'
  },
  agents: [
    { email: 'agent1@enjoybaja.com', password: 'Agent1!', pin: '7701', name: 'Agent 1' },
    { email: 'agent2@enjoybaja.com', password: 'Agent2!', pin: '7702', name: 'Agent 2' },
    { email: 'agent3@enjoybaja.com', password: 'Agent3!', pin: '7703', name: 'Agent 3' },
    { email: 'agent4@enjoybaja.com', password: 'Agent4!', pin: '7704', name: 'Agent 4' },
    { email: 'agent5@enjoybaja.com', password: 'Agent5!', pin: '7705', name: 'Agent 5' }
  ],
  sales: [
    { email: 'sales1@enjoybaja.com', password: 'Sales1!', pin: '1111', name: 'Sales Rep 1' },
    { email: 'sales2@enjoybaja.com', password: 'Sales2!', pin: '2222', name: 'Sales Rep 2' },
    { email: 'sales3@enjoybaja.com', password: 'Sales3!', pin: '3333', name: 'Sales Rep 3' },
    { email: 'sales4@enjoybaja.com', password: 'Sales4!', pin: '4444', name: 'Sales Rep 4' },
    { email: 'sales5@enjoybaja.com', password: 'Sales5!', pin: '5555', name: 'Sales Rep 5' }
  ]
};

const getPinsByRole = () => ({
  admin: [CREDENTIALS.admin.pin],
  owner: [CREDENTIALS.admin.pin, CREDENTIALS.gl.pin, CREDENTIALS.sf.pin],
  demo: [CREDENTIALS.demo.pin],
  agent: CREDENTIALS.agents.map(a => a.pin),
  sales: CREDENTIALS.sales.map(s => s.pin),
  allAgentContent: [CREDENTIALS.admin.pin, CREDENTIALS.gl.pin, CREDENTIALS.sf.pin, CREDENTIALS.demo.pin, ...CREDENTIALS.agents.map(a => a.pin)]
});

// =============================================
// ADMIN FLOATING NAVIGATION - NO EMOJIS
// =============================================
function AdminFloatingNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const accessLevel = sessionStorage.getItem('admin_access_level');
  
  if (accessLevel !== 'admin') return null;

  const menuItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Real Estate', path: '/mexico-real-estate' },
    { label: 'Upload Property', path: '/admin/property-upload' },
    { label: 'Agent Upload', path: '/agent/property-upload' },
    { label: 'Developments', path: '/developments' },
    { label: 'Mortgage', path: '/usa-mortgage' },
    { label: 'URLA 1003', path: '/1003-urla' },
    { label: 'Lifestyle', path: '/lifestyle' },
    { label: 'Luxury Goods', path: '/luxury-goods' },
    { divider: true },
    { label: 'Ad Portal', path: '/advertise' },
    { label: 'Ad Management', path: '/admin/ads' },
    { label: 'Marketing', path: '/admin/marketing' },
    { label: 'Magazine', path: '/admin/magazine' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Vetting', path: '/admin/vetting' },
    { label: 'Content', path: '/admin/content' },
    { label: 'CRM/PBX', path: '/admin/crm' },
    { label: 'Calendar', path: '/admin/calendar' },
    { label: 'AI Agents', path: '/admin/agents' },
    { label: 'Settings', path: '/admin/settings' },
    { divider: true },
    { label: 'Home', path: '/' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          top: '50%',
          left: isExpanded ? '200px' : '0',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '80px',
          background: isHovered ? 'rgba(203, 166, 88, 0.3)' : 'rgba(15, 23, 42, 0.95)',
          borderRadius: '0 8px 8px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          border: '1px solid rgba(203, 166, 88, 0.3)',
          borderLeft: 'none',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
      >
        <span style={{ 
          color: '#cba658', 
          fontSize: '16px',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>
          {isExpanded ? '<' : '>'}
        </span>
      </div>

      <div style={{
        position: 'fixed',
        top: 0,
        left: isExpanded ? '0' : '-220px',
        width: '200px',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.98)',
        borderRight: '1px solid rgba(203, 166, 88, 0.2)',
        zIndex: 9998,
        transition: 'left 0.3s ease',
        backdropFilter: 'blur(20px)',
        overflowY: 'auto',
        paddingTop: '20px'
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(203, 166, 88, 0.2)',
          marginBottom: '16px'
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#cba658',
            fontWeight: '300',
            fontFamily: '"Helvetica Neue", sans-serif'
          }}>
            ADMIN CONTROL
          </div>
          <div style={{
            fontSize: '9px',
            color: 'rgba(148, 163, 184, 0.6)',
            marginTop: '4px',
            letterSpacing: '1px'
          }}>
            saul@enjoybaja.com
          </div>
        </div>

        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} style={{ height: '1px', background: 'rgba(148, 163, 184, 0.1)', margin: '12px 20px' }} />;
          }
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                background: isActive(item.path) ? 'rgba(203, 166, 88, 0.15)' : 'transparent',
                borderLeft: isActive(item.path) ? '2px solid #cba658' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)'; }}
              onMouseLeave={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{
                fontSize: '11px',
                color: isActive(item.path) ? '#cba658' : 'rgba(148, 163, 184, 0.8)',
                letterSpacing: '1px',
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: '300'
              }}>
                {item.label}
              </span>
            </div>
          );
        })}

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 20px',
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
          background: 'rgba(15, 23, 42, 0.5)'
        }}>
          <div style={{
            fontSize: '8px',
            color: 'rgba(148, 163, 184, 0.4)',
            letterSpacing: '1px',
            textAlign: 'center'
          }}>
            EnjoyBaja Admin v2.0
          </div>
        </div>
      </div>
    </>
  );
}

// =============================================
// LANDING PAGE - 4 PICTURE CARDS + OCEAN BG
// =============================================
function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');
  const PINS = getPinsByRole();

  const handleAdminClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowAdminModal(true);
    setAdminPin('');
    setPinError('');
  };

  const handlePinSubmit = () => {
    if (adminPin === CREDENTIALS.admin.pin) {
      sessionStorage.setItem('admin_access_level', 'owner');
      sessionStorage.setItem('admin_user_name', CREDENTIALS.admin.name);
      setShowAdminModal(false);
      setAdminPin('');
      navigate('/admin');
    } else if (PINS.sales.includes(adminPin)) {
      sessionStorage.setItem('admin_access_level', 'sales');
      const salesUser = CREDENTIALS.sales.find(s => s.pin === adminPin);
      sessionStorage.setItem('admin_user_name', salesUser?.name || 'Sales');
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
    { id: 'auditdna', title: 'AUDITDNA', subtitle: 'US Mortgage Financial Recovery Service', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', route: '/audit-direct', float: 'float5 4s ease-in-out infinite 0.2s' },
    { id: 'realestate', title: 'Real Estate', subtitle: 'Baja California Premium Properties', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', route: '/mexico-real-estate', float: 'float1 4s ease-in-out infinite' },
    { id: 'lifestyle', title: 'Lifestyle Guide', subtitle: 'Wine Country & Luxury Living', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', route: '/lifestyle', float: 'float2 4.5s ease-in-out infinite 0.5s' },
    { id: 'developments', title: 'Developments', subtitle: '64 Projects Across 17 Regions', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', route: '/developments', float: 'float3 3.5s ease-in-out infinite 1s' },
    { id: 'mortgage', title: 'US & Mexico Loans', subtitle: 'Mortgage & Financing Solutions', image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80', route: '/usa-mortgage', float: 'float4 4.2s ease-in-out infinite 0.3s' }
  ];

  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(148, 163, 184, 0.85)',
    textShadow: '0 1px 15px rgba(0,0,0,0.2)'
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* OCEAN BACKGROUND */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed', zIndex: 0
      }} />

      {/* DARK OVERLAY */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.35) 100%)', zIndex: 1
      }} />

      {/* TOP NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? '12px 16px' : '16px 48px',
        background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ ...glassText, fontSize: isMobile ? '10px' : '11px', letterSpacing: '4px', color: 'rgba(203, 166, 88, 0.9)' }}>
          ENJOY BAJA
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <LanguageToggle compact />
          <button onClick={() => navigate('/advertise')} style={{
            ...glassText, padding: '8px 16px',
            background: 'rgba(184, 148, 77, 0.1)', border: '1px solid rgba(184, 148, 77, 0.3)',
            color: 'rgba(184, 148, 77, 0.9)', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer'
          }}>ADVERTISE</button>
          {isAuthenticated ? (
            <>
              <button onClick={handleAdminClick} style={{
                ...glassText, padding: '8px 16px',
                background: 'rgba(203, 166, 88, 0.15)', border: '1px solid rgba(203, 166, 88, 0.3)',
                color: 'rgba(203, 166, 88, 0.9)', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer'
              }}>ADMIN</button>
              <button onClick={logout} style={{
                ...glassText, padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(148, 163, 184, 0.8)', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer'
              }}>LOGOUT</button>
            </>
          ) : (
            <>
              <button onClick={handleAdminClick} style={{
                ...glassText, padding: '8px 16px',
                background: 'rgba(203, 166, 88, 0.15)', border: '1px solid rgba(203, 166, 88, 0.3)',
                color: 'rgba(203, 166, 88, 0.9)', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer'
              }}>ADMIN</button>
              <button onClick={() => navigate('/login')} style={{
                ...glassText, padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(148, 163, 184, 0.8)', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer'
              }}>AGENT LOGIN</button>
            </>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{
        position: 'relative', zIndex: 2, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: isMobile ? '100px 16px 80px' : '120px 48px 100px'
      }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
          <h1 style={{ ...glassText, fontSize: isMobile ? '36px' : '68px', letterSpacing: isMobile ? '8px' : '16px', marginBottom: '16px', color: 'rgba(226, 232, 240, 0.9)' }}>
            ENJOY BAJA
          </h1>
          <p style={{ ...glassText, fontSize: isMobile ? '10px' : '12px', letterSpacing: '4px', color: '#FFFFFF' }}>
            PREMIUM REAL ESTATE & LIFESTYLE
          </p>
        </div>

        {/* 4 CARDS */}
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
          gap: isMobile ? '16px' : '20px', maxWidth: '1600px', margin: '0 auto', width: '100%'
        }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate(card.route)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: 'relative', height: isMobile ? '200px' : '260px',
                overflow: 'hidden', cursor: 'pointer', transition: 'all 0.4s ease',
                border: hoveredCard === card.id ? '1px solid rgba(203, 166, 88, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                animation: card.float
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url("${card.image}")`, backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 0.6s ease', transform: hoveredCard === card.id ? 'scale(1.05)' : 'scale(1)'
              }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: hoveredCard === card.id
                  ? 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 100%)'
                  : 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.2) 100%)',
                transition: 'all 0.4s ease'
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '20px' : '28px' }}>
                <p style={{ ...glassText, fontSize: '8px', letterSpacing: '3px', color: 'rgba(203, 166, 88, 0.8)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {card.subtitle}
                </p>
                <h3 style={{ ...glassText, fontSize: isMobile ? '18px' : '22px', fontWeight: '200', color: 'rgba(226, 232, 240, 0.9)', letterSpacing: '2px' }}>
                  {card.title}
                </h3>
                <div style={{
                  opacity: hoveredCard === card.id ? 1 : 0,
                  transform: hoveredCard === card.id ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 0.3s ease', marginTop: '12px',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <span style={{ ...glassText, fontSize: '8px', color: 'rgba(203, 166, 88, 0.9)', letterSpacing: '3px' }}>EXPLORE</span>
                  <span style={{ color: 'rgba(203, 166, 88, 0.9)', fontSize: '12px' }}>-></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CITIES */}
        <div style={{ textAlign: 'center', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(203, 213, 225, 0.1)' }}>
          <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.5)', letterSpacing: '2px' }}>
            Valle de Guadalupe - Ensenada - La Paz - San Jose del Cabo - Rosarito - Tijuana
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 48px',
        background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(20px)', zIndex: 10,
        display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '3px' }}>
          info@enjoybaja.com | WhatsApp: +52 646 340 2686
        </p>
      </div>

      {/* ADMIN PIN MODAL */}
      {showAdminModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(10px)'
        }} onClick={() => setShowAdminModal(false)}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.98)', border: '1px solid rgba(203, 166, 88, 0.3)',
            padding: '40px', maxWidth: '360px', width: '90%', textAlign: 'center'
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '4px', color: '#cba658', marginBottom: '8px' }}>
              ADMIN ACCESS
            </h3>
            <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', marginBottom: '24px', letterSpacing: '1px' }}>
              Enter your security PIN
            </p>
            <input
              type="password"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
              placeholder="------"
              maxLength={6}
              style={{
                width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.6)',
                border: pinError ? '1px solid rgba(248, 113, 113, 0.5)' : '1px solid rgba(148, 163, 184, 0.2)',
                color: '#e2e8f0', fontSize: '24px', textAlign: 'center', letterSpacing: '10px',
                outline: 'none', marginBottom: '12px', boxSizing: 'border-box'
              }}
              autoFocus
            />
            {pinError && <p style={{ fontSize: '10px', color: '#f87171', marginBottom: '12px', letterSpacing: '1px' }}>{pinError}</p>}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button onClick={() => setShowAdminModal(false)} style={{
                flex: 1, padding: '12px', background: 'transparent',
                border: '1px solid rgba(148, 163, 184, 0.3)', color: 'rgba(148, 163, 184, 0.8)',
                fontSize: '10px', letterSpacing: '2px', cursor: 'pointer'
              }}>CANCEL</button>
              <button onClick={handlePinSubmit} style={{
                flex: 1, padding: '12px', background: 'rgba(203, 166, 88, 0.2)',
                border: '1px solid rgba(203, 166, 88, 0.5)', color: '#cba658',
                fontSize: '10px', letterSpacing: '2px', cursor: 'pointer'
              }}>ENTER</button>
            </div>
            <p style={{ ...glassText, fontSize: '8px', color: 'rgba(148, 163, 184, 0.4)', marginTop: '20px', letterSpacing: '1px' }}>
              Admin: 6 digits | Sales: 4 digits
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

// =============================================
// ROUTE GUARDS
// =============================================
function AdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ background: '#0f172a', minHeight: '100vh' }} />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  const accessLevel = sessionStorage.getItem('admin_access_level');
  if (!accessLevel || !['owner', 'sales'].includes(accessLevel)) return <Navigate to="/" />;
  return children;
}

function AgentProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const [showPinModal, setShowPinModal] = useState(true);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const PINS = getPinsByRole();

  useEffect(() => {
    const auth = sessionStorage.getItem('agent_content_authorized');
    const accessLevel = sessionStorage.getItem('admin_access_level');
    if (auth === 'true' || accessLevel === 'owner') {
      setAuthorized(true);
      setShowPinModal(false);
    }
  }, []);

  const handlePinSubmit = () => {
    if (pin === CREDENTIALS.admin.pin || PINS.agent.includes(pin) || pin === CREDENTIALS.demo.pin || PINS.sales.includes(pin)) {
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(203, 166, 88, 0.3)', padding: '48px', maxWidth: '360px', width: '90%', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
          <div style={{ fontSize: '14px', marginBottom: '16px', color: '#cba658', letterSpacing: '4px', fontFamily: '"Helvetica Neue", sans-serif' }}>SECURE ACCESS</div>
          <h3 style={{ fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '100', fontSize: '16px', letterSpacing: '4px', color: '#cba658', marginBottom: '8px' }}>PROFESSIONAL ACCESS</h3>
          <p style={{ fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '100', fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', marginBottom: '32px', letterSpacing: '1px' }}>Enter your agent PIN to access this content</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
            placeholder="----"
            maxLength={6}
            style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.6)', border: pinError ? '1px solid rgba(248, 113, 113, 0.5)' : '1px solid rgba(148, 163, 184, 0.2)', color: '#e2e8f0', fontSize: '28px', textAlign: 'center', letterSpacing: '16px', outline: 'none', marginBottom: '12px', fontFamily: 'monospace', boxSizing: 'border-box' }}
            autoFocus
          />
          {pinError && <p style={{ fontSize: '10px', color: '#f87171', marginBottom: '12px', letterSpacing: '1px' }}>{pinError}</p>}
          <button onClick={handlePinSubmit} style={{ width: '100%', padding: '14px', background: 'rgba(203, 166, 88, 0.2)', border: '1px solid rgba(203, 166, 88, 0.5)', color: '#cba658', fontSize: '11px', letterSpacing: '3px', cursor: 'pointer', marginTop: '8px', fontFamily: '"Helvetica Neue", sans-serif' }}>ENTER</button>
          <p style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '9px', color: 'rgba(148, 163, 184, 0.4)', marginTop: '24px', letterSpacing: '1px' }}>Contact admin@enjoybaja.com for access</p>
        </div>
      </div>
    );
  }

  return children;
}

function DemoWrapper({ children }) {
  const accessLevel = sessionStorage.getItem('admin_access_level');
  const isDemo = accessLevel === 'demo';
  return (
    <div style={{ position: 'relative' }}>
      {children}
      {isDemo && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: '80px', fontWeight: '100', color: 'rgba(203, 166, 88, 0.1)',
          pointerEvents: 'none', zIndex: 9999, letterSpacing: '20px',
          fontFamily: '"Helvetica Neue", sans-serif'
        }}>DEMO</div>
      )}
    </div>
  );
}

// =============================================
// ADMIN PLACEHOLDER
// =============================================
function AdminPlaceholder({ title }) {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(203, 166, 88, 0.3)', padding: '60px', textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ fontSize: '14px', marginBottom: '24px', color: '#cba658', letterSpacing: '4px' }}>UNDER DEVELOPMENT</div>
        <h2 style={{ fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '100', fontSize: '24px', letterSpacing: '4px', color: '#cba658', marginBottom: '16px' }}>{title}</h2>
        <p style={{ fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '100', fontSize: '12px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', marginBottom: '32px' }}>This module is under development.<br />Use the floating admin nav to switch modules.</p>
        <button onClick={() => navigate('/admin')} style={{ padding: '14px 32px', background: 'rgba(203, 166, 88, 0.2)', border: '1px solid rgba(203, 166, 88, 0.5)', color: '#cba658', fontSize: '11px', letterSpacing: '3px', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif' }}>BACK TO DASHBOARD</button>
      </div>
    </div>
  );
}

// =============================================
// MAIN APP CONTENT WITH ROUTES
// =============================================
function AppContent() {
  const location = useLocation();
  const accessLevel = sessionStorage.getItem('admin_access_level');
  const showAdminNav = accessLevel === 'owner' && location.pathname !== '/login';

  return (
    <>
      {showAdminNav && <AdminFloatingNav />}
      <Routes>
        {/* PUBLIC */}
        <Route path="/agent-register" element={<AgentRegistration />} />
        <Route path="/register" element={<AgentRegistrationWizard />} />
        <Route path="/advertise" element={<SelfServiceAdPortal />} />
        
        {/* LANDING - PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        
        {/* LIFESTYLE - PUBLIC */}
        <Route path="/lifestyle" element={<BajaLuxuryGuide />} />
        
        {/* AUDITDNA - AUTHENTICATION HANDLED IN COMPONENT */}
        <Route path="/audit-direct" element={<AuditDNADirect />} />
        <Route path="/recovery" element={<AuditRecovery />} />
        <Route path="/professional-network" element={<ProfessionalNetwork />} />
        <Route path="/monitoring" element={<MonitoringService />} />
        <Route path="/security-verification" element={<SecurityVerification />} />
        
        {/* PROTECTED - AUTHENTICATION IN COMPONENT */}
        <Route path="/luxury-goods" element={<DemoWrapper><LuxuryGoods /></DemoWrapper>} />
        
        {/* AGENT PROTECTED - LOGIN + PIN */}
        <Route path="/mexico-real-estate" element={<AgentProtectedRoute><DemoWrapper><MexicoRealEstate /></DemoWrapper></AgentProtectedRoute>} />
        <Route path="/developments" element={<AgentProtectedRoute><DemoWrapper><Developments /></DemoWrapper></AgentProtectedRoute>} />
        <Route path="/usa-mortgage" element={<AgentProtectedRoute><DemoWrapper><USAMortgage /></DemoWrapper></AgentProtectedRoute>} />
        <Route path="/1003-urla" element={<AgentProtectedRoute><URLA1003 /></AgentProtectedRoute>} />
        <Route path="/agent/property-upload" element={<AgentProtectedRoute><AgentPropertyUpload /></AgentProtectedRoute>} />
        
        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/property-upload" element={<AdminRoute><AdminPropertyUpload /></AdminRoute>} />
        <Route path="/admin/marketing" element={<AdminRoute><MarketingDashboard /></AdminRoute>} />
        <Route path="/admin/ads" element={<AdminRoute><AdManagementPanel /></AdminRoute>} />
        <Route path="/admin/vetting" element={<AdminRoute><AgentVettingPanel /></AdminRoute>} />
        <Route path="/admin/magazine" element={<AdminRoute><AdminPlaceholder title="Magazine Editor" /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminPlaceholder title="User Management" /></AdminRoute>} />
        <Route path="/admin/content" element={<AdminRoute><AdminPlaceholder title="Content Manager" /></AdminRoute>} />
        <Route path="/admin/crm" element={<AdminRoute><AdminPlaceholder title="CRM / PBX System" /></AdminRoute>} />
        <Route path="/admin/calendar" element={<AdminRoute><AdminPlaceholder title="Ad Calendar" /></AdminRoute>} />
        <Route path="/admin/agents" element={<AdminRoute><AdminPlaceholder title="AI Agents" /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><AdminPlaceholder title="Platform Settings" /></AdminRoute>} />
        
        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

// =============================================
// APP ROOT
// =============================================
function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;