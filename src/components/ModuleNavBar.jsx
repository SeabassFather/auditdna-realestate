// ================================================================
// MODULE NAVIGATION BAR
// Shows on ALL module pages - Click any module to jump directly
// NO additional logins after first login
// ================================================================

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ModuleNavBar({ compact = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const modules = [
    { id: 'auditdna', label: 'AuditDNA', route: '/audit-direct' },
    { id: 'realestate', label: 'Real Estate', route: '/mexico-real-estate' },
    { id: 'lifestyle', label: 'Lifestyle', route: '/lifestyle' },
    { id: 'developments', label: 'Developments', route: '/developments' },
    { id: 'mortgage', label: 'USA Mortgage', route: '/usa-mortgage' }
  ];

  const isActive = (route) => location.pathname === route;

  // COMPACT VERSION (for inside modules)
  if (compact) {
    return (
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '16px'
      }}>
        {modules.map(module => (
          <button
            key={module.id}
            onClick={() => navigate(module.route)}
            style={{
              padding: '8px 16px',
              background: isActive(module.route) 
                ? 'linear-gradient(135deg, #cba658, #b8944d)' 
                : 'rgba(203, 166, 88, 0.12)',
              border: isActive(module.route) 
                ? 'none' 
                : '1px solid rgba(203, 166, 88, 0.25)',
              color: isActive(module.route) ? '#0f172a' : '#cba658',
              fontWeight: isActive(module.route) ? '600' : '500',
              cursor: 'pointer',
              fontSize: '10px',
              letterSpacing: '1.5px',
              fontFamily: '"Helvetica Neue", sans-serif',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              if (!isActive(module.route)) {
                e.currentTarget.style.background = 'rgba(203, 166, 88, 0.2)';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive(module.route)) {
                e.currentTarget.style.background = 'rgba(203, 166, 88, 0.12)';
              }
            }}
          >
            {module.label.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  // FULL VERSION (for top of page)
  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.3)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '16px 40px',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          {/* HOME BUTTON */}
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '9px',
              fontWeight: '300',
              cursor: 'pointer',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            ← HOME
          </button>

          {/* MODULE BUTTONS */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '800px'
          }}>
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => navigate(module.route)}
                style={{
                  padding: '10px 20px',
                  background: isActive(module.route)
                    ? 'linear-gradient(135deg, #cba658, #b8944d)'
                    : 'rgba(203, 166, 88, 0.12)',
                  border: isActive(module.route)
                    ? 'none'
                    : '1px solid rgba(203, 166, 88, 0.25)',
                  color: isActive(module.route) ? '#0f172a' : '#cba658',
                  fontWeight: isActive(module.route) ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s',
                  fontFamily: '"Helvetica Neue", sans-serif',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => {
                  if (!isActive(module.route)) {
                    e.currentTarget.style.background = 'rgba(203, 166, 88, 0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive(module.route)) {
                    e.currentTarget.style.background = 'rgba(203, 166, 88, 0.12)';
                  }
                }}
              >
                {module.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
