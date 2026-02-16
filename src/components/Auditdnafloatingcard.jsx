// ============================================================
// AUDITDNA FLOATING CARD - ADD TO APP.JS LANDING PAGE
// Floating card with 2 tabs: Homeowner Direct | Professional Network
// ============================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuditDNAFloatingCard() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('homeowner'); // 'homeowner' or 'professional'
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: isOpen ? '600px' : '280px',
    height: isOpen ? '450px' : '180px',
    background: isOpen 
      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)'
      : 'url("https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80")', // Family + professional handshake
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '16px',
    border: '2px solid rgba(203, 166, 88, 0.4)',
    cursor: isOpen ? 'default' : 'pointer',
    zIndex: 9997,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(20px)',
    boxShadow: isOpen 
      ? '0 25px 50px -12px rgba(203, 166, 88, 0.25)'
      : isHovered 
        ? '0 20px 40px -10px rgba(0, 0, 0, 0.5)'
        : '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
    transform: isOpen ? 'scale(1)' : isHovered ? 'translateY(-5px)' : 'translateY(0)',
    overflow: 'hidden'
  };

  const closedCardOverlay = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(203, 166, 88, 0.3) 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  return (
    <>
      <div 
        style={cardStyle}
        onClick={() => !isOpen && setIsOpen(true)}
        onMouseEnter={() => !isOpen && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isOpen ? (
          // CLOSED STATE - Show teaser
          <div style={closedCardOverlay}>
            <div style={{
              fontSize: '24px',
              fontWeight: '200',
              color: '#cba658',
              letterSpacing: '4px',
              marginBottom: '12px',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}>
              AUDITDNA
            </div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(226, 232, 240, 0.9)',
              letterSpacing: '2px',
              marginBottom: '8px',
              textAlign: 'center',
              fontWeight: '300'
            }}>
              FINANCIAL RECOVERY
            </div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(203, 213, 225, 0.7)',
              textAlign: 'center',
              lineHeight: '1.6',
              maxWidth: '220px'
            }}>
              Recovered $47M+ in overcharges
            </div>
            <div style={{
              marginTop: '16px',
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
              color: '#0f172a',
              fontSize: '10px',
              letterSpacing: '2px',
              fontWeight: '600',
              borderRadius: '4px'
            }}>
              CLICK TO OPEN
            </div>
          </div>
        ) : (
          // OPEN STATE - Show tabs
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Close button */}
            <div 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(248, 113, 113, 0.2)',
                border: '1px solid rgba(248, 113, 113, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(248, 113, 113, 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(248, 113, 113, 0.2)'}
            >
              <span style={{ color: '#f87171', fontSize: '16px' }}>×</span>
            </div>

            {/* Header */}
            <div style={{
              padding: '24px 24px 16px',
              borderBottom: '1px solid rgba(203, 166, 88, 0.2)'
            }}>
              <div style={{
                fontSize: '20px',
                fontWeight: '200',
                color: '#cba658',
                letterSpacing: '3px',
                marginBottom: '8px',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}>
                AUDITDNA RECOVERY
              </div>
              <div style={{
                fontSize: '10px',
                color: 'rgba(203, 213, 225, 0.7)',
                letterSpacing: '1px'
              }}>
                AI-Powered Financial Overcharge Detection
              </div>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid rgba(203, 166, 88, 0.2)'
            }}>
              <div
                onClick={() => setActiveTab('homeowner')}
                style={{
                  flex: 1,
                  padding: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: activeTab === 'homeowner' ? 'rgba(203, 166, 88, 0.15)' : 'transparent',
                  borderBottom: activeTab === 'homeowner' ? '2px solid #cba658' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  fontSize: '12px',
                  letterSpacing: '2px',
                  color: activeTab === 'homeowner' ? '#cba658' : 'rgba(203, 213, 225, 0.6)',
                  fontWeight: '300',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}>
                  HOMEOWNER DIRECT
                </div>
                <div style={{
                  fontSize: '9px',
                  color: 'rgba(148, 163, 184, 0.6)',
                  marginTop: '4px',
                  letterSpacing: '1px'
                }}>
                  35-39% Fee
                </div>
              </div>

              <div
                onClick={() => setActiveTab('professional')}
                style={{
                  flex: 1,
                  padding: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: activeTab === 'professional' ? 'rgba(203, 166, 88, 0.15)' : 'transparent',
                  borderBottom: activeTab === 'professional' ? '2px solid #cba658' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  fontSize: '12px',
                  letterSpacing: '2px',
                  color: activeTab === 'professional' ? '#cba658' : 'rgba(203, 213, 225, 0.6)',
                  fontWeight: '300',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}>
                  PROFESSIONAL
                </div>
                <div style={{
                  fontSize: '9px',
                  color: 'rgba(148, 163, 184, 0.6)',
                  marginTop: '4px',
                  letterSpacing: '1px'
                }}>
                  FREE + Commission
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div style={{
              flex: 1,
              padding: '24px',
              backgroundImage: activeTab === 'homeowner' 
                ? 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80")' // Family at beach
                : 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80")', // Professional team
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              overflow: 'auto'
            }}>
              {/* Overlay for readability */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.92) 100%)',
                zIndex: 0
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {activeTab === 'homeowner' ? (
                  // HOMEOWNER DIRECT CONTENT
                  <>
                    <div style={{
                      fontSize: '14px',
                      color: 'rgba(226, 232, 240, 0.9)',
                      letterSpacing: '1px',
                      marginBottom: '12px',
                      fontWeight: '300'
                    }}>
                      Direct Audit & Recovery
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(203, 213, 225, 0.7)',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                      Upload your financial documents. Our AI finds overcharges in 2-5 minutes. 
                      Avg recovery: $8,500-$15,000.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: '#4ade80',
                          borderRadius: '50%',
                          marginRight: '8px'
                        }} />
                        <span style={{
                          fontSize: '10px',
                          color: 'rgba(203, 213, 225, 0.8)',
                          letterSpacing: '0.5px'
                        }}>
                          Option 1: 35% fee (escrow protection)
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: '#4ade80',
                          borderRadius: '50%',
                          marginRight: '8px'
                        }} />
                        <span style={{
                          fontSize: '10px',
                          color: 'rgba(203, 213, 225, 0.8)',
                          letterSpacing: '0.5px'
                        }}>
                          Option 2: 39% fee (direct, faster)
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: '#4ade80',
                          borderRadius: '50%',
                          marginRight: '8px'
                        }} />
                        <span style={{
                          fontSize: '10px',
                          color: 'rgba(203, 213, 225, 0.8)',
                          letterSpacing: '0.5px'
                        }}>
                          + Monitoring: $24.99/mo (8 categories)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/audit-direct')}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
                        border: 'none',
                        color: '#0f172a',
                        fontSize: '11px',
                        letterSpacing: '2px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '20px',
                        borderRadius: '4px',
                        fontFamily: '"Helvetica Neue", sans-serif'
                      }}
                    >
                      START YOUR AUDIT
                    </button>
                  </>
                ) : (
                  // PROFESSIONAL NETWORK CONTENT
                  <>
                    <div style={{
                      fontSize: '14px',
                      color: 'rgba(226, 232, 240, 0.9)',
                      letterSpacing: '1px',
                      marginBottom: '12px',
                      fontWeight: '300'
                    }}>
                      Refer Clients, Earn Commission
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(203, 213, 225, 0.7)',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                      For Attorneys, CPAs, NMLS Pros, Insurance Agents. 
                      FREE to join, 15% commission on recoveries.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: 'rgba(148, 163, 184, 0.7)',
                          borderRadius: '50%',
                          marginRight: '8px'
                        }} />
                        <span style={{
                          fontSize: '10px',
                          color: 'rgba(203, 213, 225, 0.8)',
                          letterSpacing: '0.5px'
                        }}>
                          FREE to join (no monthly fees)
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: 'rgba(148, 163, 184, 0.7)',
                          borderRadius: '50%',
                          marginRight: '8px'
                        }} />
                        <span style={{
                          fontSize: '10px',
                          color: 'rgba(203, 213, 225, 0.8)',
                          letterSpacing: '0.5px'
                        }}>
                          Earn $975-$1,350 per case
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: 'rgba(148, 163, 184, 0.7)',
                          borderRadius: '50%',
                          marginRight: '8px'
                        }} />
                        <span style={{
                          fontSize: '10px',
                          color: 'rgba(203, 213, 225, 0.8)',
                          letterSpacing: '0.5px'
                        }}>
                          Dashboard tracks all your cases
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/professional-network')}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.3) 0%, rgba(148, 163, 184, 0.2) 100%)',
                        border: '1px solid rgba(148, 163, 184, 0.4)',
                        color: 'rgba(226, 232, 240, 0.9)',
                        fontSize: '11px',
                        letterSpacing: '2px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '20px',
                        borderRadius: '4px',
                        fontFamily: '"Helvetica Neue", sans-serif'
                      }}
                    >
                      JOIN THE NETWORK
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AuditDNAFloatingCard;

// ============================================================
// INSTALLATION INSTRUCTIONS
// ============================================================
// 1. Copy this file to: src/components/AuditDNAFloatingCard.jsx
// 2. In App.js, add import:
//    import AuditDNAFloatingCard from './components/AuditDNAFloatingCard';
// 3. In LandingPage component (after the 4 picture cards), add:
//    <AuditDNAFloatingCard />
// 4. Done! Card appears bottom-right, always floating