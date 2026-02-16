import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 50%, #1e3a5f 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
        zIndex: 0
      }} />

      {/* Top Navigation */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontFamily: 'Helvetica Neue, sans-serif',
          fontSize: '16px',
          letterSpacing: '4px',
          color: '#cba658',
          fontWeight: '300'
        }}>
          ENJOY BAJA
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => handleCardClick('/advertise')} style={{
            padding: '10px 24px',
            background: 'transparent',
            border: '1px solid rgba(203, 166, 88, 0.4)',
            color: '#cba658',
            fontSize: '11px',
            letterSpacing: '2px',
            cursor: 'pointer',
            fontFamily: 'Helvetica Neue, sans-serif'
          }}>
            ADVERTISE
          </button>
          <button onClick={() => handleCardClick('/login')} style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
            border: 'none',
            color: '#0f172a',
            fontSize: '11px',
            letterSpacing: '2px',
            cursor: 'pointer',
            fontWeight: '600',
            fontFamily: 'Helvetica Neue, sans-serif'
          }}>
            SIGN IN
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        padding: '80px 20px 60px'
      }}>
        <h1 style={{
          fontFamily: 'Helvetica Neue, sans-serif',
          fontWeight: '100',
          fontSize: '72px',
          letterSpacing: '12px',
          color: '#FFFFFF',
          marginBottom: '20px',
          margin: '0 0 20px 0'
        }}>
          ENJOY BAJA
        </h1>
        <p style={{
          fontFamily: 'Helvetica Neue, sans-serif',
          fontSize: '14px',
          letterSpacing: '4px',
          color: 'rgba(255, 255, 255, 0.8)',
          textTransform: 'uppercase',
          margin: 0
        }}>
          Premium Real Estate & Lifestyle
        </p>
      </div>

      {/* 5 Cards Grid */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px 100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px'
      }}>
        
        {/* CARD 1 - AUDITDNA */}
        <div onClick={() => handleCardClick('/audit-direct')} style={{
          position: 'relative',
          height: '360px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%), url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(203, 166, 88, 0.2)',
          transition: 'transform 0.3s',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px 30px',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 70%, transparent 100%)'
          }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#cba658', marginBottom: '8px', fontFamily: 'Helvetica Neue, sans-serif' }}>
              MORTGAGE AUDIT PLATFORM
            </div>
            <h2 style={{ fontSize: '24px', letterSpacing: '2px', color: '#FFFFFF', marginBottom: '12px', fontWeight: '300', margin: '0 0 12px 0', fontFamily: 'Helvetica Neue, sans-serif' }}>
              AuditDNA
            </h2>
            <p style={{ fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', lineHeight: '1.6', margin: 0, fontFamily: 'Helvetica Neue, sans-serif' }}>
              AI-powered audit finds overcharges in your mortgage closing
            </p>
          </div>
        </div>

        {/* CARD 2 - REAL ESTATE */}
        <div onClick={() => handleCardClick('/mexico-real-estate')} style={{
          position: 'relative',
          height: '360px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%), url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(203, 166, 88, 0.2)',
          transition: 'transform 0.3s',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px 30px',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 70%, transparent 100%)'
          }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#cba658', marginBottom: '8px', fontFamily: 'Helvetica Neue, sans-serif' }}>
              BAJA CALIFORNIA PROPERTIES
            </div>
            <h2 style={{ fontSize: '24px', letterSpacing: '2px', color: '#FFFFFF', marginBottom: '12px', fontWeight: '300', margin: '0 0 12px 0', fontFamily: 'Helvetica Neue, sans-serif' }}>
              Real Estate
            </h2>
            <p style={{ fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', lineHeight: '1.6', margin: 0, fontFamily: 'Helvetica Neue, sans-serif' }}>
              Exclusive waterfront properties and luxury developments
            </p>
          </div>
        </div>

        {/* CARD 3 - LIFESTYLE */}
        <div onClick={() => handleCardClick('/lifestyle')} style={{
          position: 'relative',
          height: '360px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(203, 166, 88, 0.2)',
          transition: 'transform 0.3s',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px 30px',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 70%, transparent 100%)'
          }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#cba658', marginBottom: '8px', fontFamily: 'Helvetica Neue, sans-serif' }}>
              WINE COUNTRY LUXURY
            </div>
            <h2 style={{ fontSize: '24px', letterSpacing: '2px', color: '#FFFFFF', marginBottom: '12px', fontWeight: '300', margin: '0 0 12px 0', fontFamily: 'Helvetica Neue, sans-serif' }}>
              Lifestyle Guide
            </h2>
            <p style={{ fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', lineHeight: '1.6', margin: 0, fontFamily: 'Helvetica Neue, sans-serif' }}>
              Discover Baja California wine country and coastal lifestyle
            </p>
          </div>
        </div>

        {/* CARD 4 - DEVELOPMENTS */}
        <div onClick={() => handleCardClick('/developments')} style={{
          position: 'relative',
          height: '360px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(203, 166, 88, 0.2)',
          transition: 'transform 0.3s',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px 30px',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 70%, transparent 100%)'
          }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#cba658', marginBottom: '8px', fontFamily: 'Helvetica Neue, sans-serif' }}>
              64 PROJECTS · $2.8B PORTFOLIO
            </div>
            <h2 style={{ fontSize: '24px', letterSpacing: '2px', color: '#FFFFFF', marginBottom: '12px', fontWeight: '300', margin: '0 0 12px 0', fontFamily: 'Helvetica Neue, sans-serif' }}>
              Developments
            </h2>
            <p style={{ fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', lineHeight: '1.6', margin: 0, fontFamily: 'Helvetica Neue, sans-serif' }}>
              Premium development opportunities across 17 regions
            </p>
          </div>
        </div>

        {/* CARD 5 - LOANS */}
        <div onClick={() => handleCardClick('/usa-mortgage')} style={{
          position: 'relative',
          height: '360px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(203, 166, 88, 0.2)',
          transition: 'transform 0.3s',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px 30px',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 70%, transparent 100%)'
          }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#cba658', marginBottom: '8px', fontFamily: 'Helvetica Neue, sans-serif' }}>
              CROSS-BORDER FINANCING
            </div>
            <h2 style={{ fontSize: '24px', letterSpacing: '2px', color: '#FFFFFF', marginBottom: '12px', fontWeight: '300', margin: '0 0 12px 0', fontFamily: 'Helvetica Neue, sans-serif' }}>
              US & Mexico Loans
            </h2>
            <p style={{ fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', lineHeight: '1.6', margin: 0, fontFamily: 'Helvetica Neue, sans-serif' }}>
              Real estate financing for USA and Mexico properties
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(203, 166, 88, 0.2)',
        padding: '40px',
        textAlign: 'center',
        background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{
          fontFamily: 'Helvetica Neue, sans-serif',
          fontSize: '10px',
          color: 'rgba(148, 163, 184, 0.6)',
          letterSpacing: '2px',
          marginBottom: '10px',
          margin: '0 0 10px 0'
        }}>
          info@enjoybaja.com • WhatsApp: +52.664.168.1808
        </p>
        <p style={{
          fontFamily: 'Helvetica Neue, sans-serif',
          fontSize: '8px',
          color: 'rgba(148, 163, 184, 0.4)',
          letterSpacing: '1px',
          margin: 0
        }}>
          © 2026 EnjoyBaja. All rights reserved.
        </p>
      </div>
    </div>
  );
}