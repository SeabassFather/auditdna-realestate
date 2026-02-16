import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfessionalNetwork() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '40px 20px'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: '200',
            fontSize: '32px',
            letterSpacing: '3px',
            color: '#cba658'
          }}>
            AUDITDNA PROFESSIONAL
          </h1>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid rgba(203, 166, 88, 0.4)',
              color: '#cba658',
              fontSize: '11px',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            BACK TO HOME
          </button>
        </div>
        <p style={{
          fontFamily: '"Helvetica Neue", sans-serif',
          fontSize: '14px',
          color: 'rgba(226, 232, 240, 0.7)',
          letterSpacing: '1px'
        }}>
          Professional Network - FREE to Join
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(203, 166, 88, 0.3)',
          padding: '60px'
        }}>
          <h2 style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: '200',
            fontSize: '28px',
            letterSpacing: '2px',
            color: '#FFFFFF',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Join the Professional Network
          </h2>
          
          <p style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: '16px',
            color: 'rgba(203, 213, 225, 0.8)',
            lineHeight: '1.8',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px',
            textAlign: 'center'
          }}>
            For Attorneys, CPAs, NMLS Professionals, Insurance Agents<br/>
            Refer clients. Earn 15% commission on recoveries.
          </p>

          {/* Benefits Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{
              background: 'rgba(203, 166, 88, 0.1)',
              border: '1px solid rgba(203, 166, 88, 0.3)',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '200',
                color: '#cba658',
                marginBottom: '12px',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}>
                $0
              </div>
              <div style={{
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#FFFFFF',
                marginBottom: '8px',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}>
                TO JOIN
              </div>
              <div style={{
                fontSize: '10px',
                color: 'rgba(203, 213, 225, 0.7)',
                lineHeight: '1.6'
              }}>
                No monthly fees<br/>
                No upfront costs<br/>
                Commission only
              </div>
            </div>

            <div style={{
              background: 'rgba(203, 166, 88, 0.1)',
              border: '1px solid rgba(203, 166, 88, 0.3)',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '200',
                color: '#cba658',
                marginBottom: '12px',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}>
                15%
              </div>
              <div style={{
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#FFFFFF',
                marginBottom: '8px',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}>
                COMMISSION
              </div>
              <div style={{
                fontSize: '10px',
                color: 'rgba(203, 213, 225, 0.7)',
                lineHeight: '1.6'
              }}>
                $975-$1,350 per case<br/>
                Avg 6.5% overcharge<br/>
                35-39% recovery fee
              </div>
            </div>

            <div style={{
              background: 'rgba(203, 166, 88, 0.1)',
              border: '1px solid rgba(203, 166, 88, 0.3)',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '200',
                color: '#cba658',
                marginBottom: '12px',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}>
                24/7
              </div>
              <div style={{
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#FFFFFF',
                marginBottom: '8px',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}>
                DASHBOARD
              </div>
              <div style={{
                fontSize: '10px',
                color: 'rgba(203, 213, 225, 0.7)',
                lineHeight: '1.6'
              }}>
                Track all cases<br/>
                Real-time status<br/>
                Commission tracking
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div style={{
            background: 'rgba(148, 163, 184, 0.1)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            padding: '40px',
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '16px',
              letterSpacing: '2px',
              color: '#cba658',
              marginBottom: '24px',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}>
              HOW IT WORKS
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }}>
              <div>
                <div style={{
                  fontSize: '40px',
                  fontWeight: '100',
                  color: 'rgba(203, 166, 88, 0.5)',
                  marginBottom: '12px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}>
                  1
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(203, 213, 225, 0.8)',
                  lineHeight: '1.6'
                }}>
                  Sign up free<br/>
                  Get your unique<br/>
                  referral link
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '40px',
                  fontWeight: '100',
                  color: 'rgba(203, 166, 88, 0.5)',
                  marginBottom: '12px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}>
                  2
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(203, 213, 225, 0.8)',
                  lineHeight: '1.6'
                }}>
                  Share link with<br/>
                  your clients or<br/>
                  network
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '40px',
                  fontWeight: '100',
                  color: 'rgba(203, 166, 88, 0.5)',
                  marginBottom: '12px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}>
                  3
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(203, 213, 225, 0.8)',
                  lineHeight: '1.6'
                }}>
                  We audit and<br/>
                  recover funds<br/>
                  for them
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '40px',
                  fontWeight: '100',
                  color: 'rgba(203, 166, 88, 0.5)',
                  marginBottom: '12px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}>
                  4
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(203, 213, 225, 0.8)',
                  lineHeight: '1.6'
                }}>
                  You earn 15%<br/>
                  commission on<br/>
                  recovery
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <button
              style={{
                padding: '18px 48px',
                background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
                border: 'none',
                color: '#0f172a',
                fontSize: '12px',
                letterSpacing: '2px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: '"Helvetica Neue", sans-serif'
              }}
            >
              JOIN THE NETWORK
            </button>
            <div style={{
              marginTop: '20px',
              fontSize: '10px',
              color: 'rgba(148, 163, 184, 0.6)',
              letterSpacing: '1px'
            }}>
              For: Attorneys • CPAs • NMLS Pros • Insurance Agents • Financial Advisors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalNetwork;