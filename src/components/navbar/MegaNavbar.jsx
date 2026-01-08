import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Globe,
  Search,
  Home,
  LayoutDashboard,
  Package,
  Leaf,
  DollarSign,
  Activity,
  Mail
} from 'lucide-react';

export default function MegaNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'CM Products', path: '/cm-products', icon: Package },
    { label: 'Grower Hub', path: '/grower-hub', icon: Leaf },
    { label: 'Finance', path: '/finance', icon:  DollarSign },
    { label: 'Traceability', path: '/traceability', icon: Activity },
    { label: 'Contact', path: '/contact', icon:  Mail }
  ];

  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderBottom: '2px solid #22c55e',
        padding: '1rem 2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      <div
        style={{
          maxWidth: '1800px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* LOGO */}
        <div
          onClick={() => navigate('/')}
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#22c55e',
            cursor: 'pointer',
            textShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Activity size={28} />
          AuditDNA
        </div>

        {/* DESKTOP MENU */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}
          className="desktop-menu"
        >
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap:  '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget. style.background = 'rgba(34, 197, 94, 0.2)';
                  e.currentTarget.style. color = '#22c55e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style. background = 'transparent';
                  e.currentTarget.style. color = '#fff';
                }}
              >
                <IconComponent size={18} />
                {item.label}
              </button>
            );
          })}

          {/* LANGUAGE TOGGLE */}
          <button
            onClick={() => setLanguage(language === 'en' ?  'es' : 'en')}
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '2px solid #22c55e',
              color: '#22c55e',
              padding: '0.5rem 1rem',
              borderRadius:  '8px',
              cursor:  'pointer',
              fontWeight: '600',
              display:  'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Globe size={18} />
            {language === 'en' ?  'EN' : 'ES'}
          </button>

          {/* SEARCH */}
          <button
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '2px solid #22c55e',
              color: '#22c55e',
              padding: '0.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Search size={20} />
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#22c55e',
            cursor: 'pointer'
          }}
          className="mobile-menu-button"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(30, 41, 59, 0.95)',
            borderRadius: '12px'
          }}
        >
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                style={{
                  display:  'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  textAlign:  'left',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  padding: '0.75rem',
                  cursor:  'pointer',
                  borderRadius: '8px'
                }}
              >
                <IconComponent size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none ! important;
          }
          . mobile-menu-button {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}