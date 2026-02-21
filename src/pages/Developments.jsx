import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleNavBar from '../components/ModuleNavBar';

export default function Developments() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [expandedRegion, setExpandedRegion] = useState(null);

  const regions = [
    { name: 'Tijuana & Border Region', projects: 3, value: '$171M+' },
    { name: 'Rosarito & Primo Tapia', projects: 3, value: '$120M+' },
    { name: 'Tecate & Wine Country', projects: 4, value: '$120M+' },
    { name: 'Ensenada', projects: 4, value: '$148M+' },
    { name: 'San Quintín & Vicente Guerrero', projects: 2, value: '$30M+' },
    { name: 'San Felipe & Gulf Coast', projects: 3, value: '$87M+' },
    { name: 'Bahía de los Ángeles', projects: 2, value: '$31M+' },
    { name: 'Guerrero Negro & Vizcaíno', projects: 2, value: '$22M+' },
    { name: 'Santa Rosalía & Mulegé', projects: 3, value: '$45M+' },
    { name: 'Loreto', projects: 4, value: '$180M+' },
    { name: 'La Paz', projects: 5, value: '$320M+' },
    { name: 'Todos Santos & El Pescadero', projects: 4, value: '$275M+' },
    { name: 'East Cape & Los Barriles', projects: 4, value: '$195M+' },
    { name: 'San José del Cabo', projects: 4, value: '$450M+' },
    { name: 'Cabo San Lucas', projects: 5, value: '$580M+' },
    { name: 'Inland - Mexicali & Valleys', projects: 3, value: '$65M+' },
    { name: 'Inland - Sierra & Desert', projects: 3, value: '$41M+' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* OCEANFRONT BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />

      {/* OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.55) 100%)',
        zIndex: 1
      }} />

      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* MODULE NAVIGATION BAR - CLICK ANY MODULE TO JUMP */}
        <ModuleNavBar />

        <div style={{ 
          maxWidth: '1100px', 
          margin: '0 auto', 
          padding: '40px 24px 80px'
        }}>
          
          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{
              fontSize: '9px',
              color: 'rgba(203, 166, 88, 0.8)',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontWeight: '300'
            }}>
              Baja California Peninsula
            </p>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '100', 
              color: 'rgba(226, 232, 240, 0.9)', 
              marginBottom: '16px', 
              letterSpacing: '14px',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Developments
            </h1>
            <p style={{ 
              fontSize: '11px', 
              color: 'rgba(148, 163, 184, 0.8)', 
              fontWeight: '300',
              letterSpacing: '4px'
            }}>
              64 Projects | 17 Regions | $2.8B+ Portfolio
            </p>
          </div>

          {/* REGIONS ACCORDION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '50px' }}>
            {regions.map(region => {
              const isExpanded = expandedRegion === region.name;
              
              return (
                <div key={region.name}>
                  <button
                    onClick={() => setExpandedRegion(isExpanded ? null : region.name)}
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      background: isExpanded ? 'rgba(71, 85, 105, 0.4)' : 'rgba(51, 65, 85, 0.3)',
                      border: 'none',
                      borderLeft: isExpanded ? '2px solid rgba(203, 166, 88, 0.6)' : '2px solid transparent',
                      color: '#e2e8f0',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ 
                        fontSize: '13px', 
                        fontWeight: '200', 
                        letterSpacing: '2px',
                        color: '#cbd5e1',
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: 'uppercase'
                      }}>
                        {region.name}
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        color: '#64748b',
                        fontWeight: '300',
                        letterSpacing: '1px'
                      }}>
                        {region.projects} projects | {region.value} total value
                      </span>
                    </div>
                    <span style={{ 
                      fontSize: '18px', 
                      color: '#94a3b8',
                      transition: 'transform 0.2s',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      ▼
                    </span>
                  </button>

                  {isExpanded && (
                    <div style={{
                      padding: '24px',
                      background: 'rgba(30, 41, 59, 0.5)',
                      borderLeft: '3px solid rgba(203, 166, 88, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <p style={{ 
                        color: '#cbd5e1', 
                        fontSize: '13px', 
                        marginBottom: '16px',
                        fontWeight: '300',
                        lineHeight: '1.6'
                      }}>
                        Explore {region.projects} development projects in {region.name}. 
                        Total portfolio value: {region.value}.
                      </p>
                      <button
                        onClick={() => window.open(`https://wa.me/526463402686?text=I'm interested in developments in ${region.name}`, '_blank')}
                        style={{
                          padding: '10px 24px',
                          background: '#cba658',
                          border: 'none',
                          color: '#0f172a',
                          fontSize: '11px',
                          fontWeight: '600',
                          letterSpacing: '1px',
                          cursor: 'pointer',
                          textTransform: 'uppercase'
                        }}
                      >
                        Inquire Now
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* DEVELOPER CTA */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            padding: '28px 32px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '300', 
              color: '#f1f5f9', 
              marginBottom: '8px',
              letterSpacing: '1px'
            }}>
              Are You a Developer?
            </h3>
            <p style={{ 
              fontSize: '12px', 
              color: '#94a3b8', 
              marginBottom: '16px',
              fontWeight: '300'
            }}>
              List your development project. Commission only on closed sales.
            </p>
            <button
              onClick={() => window.open('https://wa.me/526463402686?text=I am a developer interested in listing my project', '_blank')}
              style={{
                padding: '10px 28px',
                background: 'transparent',
                border: '1px solid #cba658',
                color: '#cba658',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '1px',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              List Your Project
            </button>
          </div>

          {/* FOOTER */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '50px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(148, 163, 184, 0.1)'
          }}>
            <p style={{ 
              fontSize: '11px', 
              color: '#94a3b8',
              letterSpacing: '1px'
            }}>
              SAUL GARCIA | NMLS #337526 | +52 646 340 2686
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
