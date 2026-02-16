import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MonitoringService() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Mortgage', icon: '🏠', savings: '$2,400-$8,500' },
    { name: 'Auto Loans', icon: '🚗', savings: '$800-$3,200' },
    { name: 'Cell Phone', icon: '📱', savings: '$240-$960' },
    { name: 'Credit Cards', icon: '💳', savings: '$180-$720' },
    { name: 'Personal Loans', icon: '💰', savings: '$600-$2,400' },
    { name: 'HELOC', icon: '🏡', savings: '$1,200-$4,800' },
    { name: 'Utilities', icon: '⚡', savings: '$120-$480' },
    { name: 'Insurance', icon: '🛡️', savings: '$360-$1,440' }
  ];

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
            MONITORING SERVICE
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
          Continuous Overcharge Detection - $24.99/month
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Pricing Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '2px solid rgba(203, 166, 88, 0.4)',
          padding: '60px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '3px',
            color: '#cba658',
            marginBottom: '12px',
            fontFamily: '"Helvetica Neue", sans-serif'
          }}>
            CONTINUOUS PROTECTION
          </div>
          <div style={{
            fontSize: '48px',
            fontWeight: '200',
            color: '#FFFFFF',
            marginBottom: '8px',
            fontFamily: '"Helvetica Neue", sans-serif'
          }}>
            $24.99<span style={{ fontSize: '24px', color: 'rgba(226, 232, 240, 0.6)' }}>/month</span>
          </div>
          <div style={{
            fontSize: '14px',
            color: 'rgba(203, 213, 225, 0.7)',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Monitor 8 financial categories 24/7<br/>
            Automatic overcharge detection • Instant alerts
          </div>

          <div style={{
            display: 'inline-block',
            background: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            padding: '20px 40px',
            marginBottom: '40px'
          }}>
            <div style={{
              fontSize: '11px',
              color: '#4ade80',
              letterSpacing: '2px',
              marginBottom: '8px',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}>
              ONGOING COMMISSION
            </div>
            <div style={{
              fontSize: '16px',
              color: '#FFFFFF',
              fontWeight: '300'
            }}>
              You still earn 35-39% on any new overcharges found
            </div>
          </div>

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
            START MONITORING
          </button>
        </div>

        {/* 8 Categories Grid */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(203, 166, 88, 0.3)',
          padding: '60px'
        }}>
          <h2 style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: '200',
            fontSize: '24px',
            letterSpacing: '2px',
            color: '#FFFFFF',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            8 Categories Monitored
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}>
            {categories.map((cat, idx) => (
              <div key={idx} style={{
                background: 'rgba(203, 166, 88, 0.05)',
                border: '1px solid rgba(203, 166, 88, 0.2)',
                padding: '24px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: '40px',
                  marginBottom: '12px'
                }}>
                  {cat.icon}
                </div>
                <div style={{
                  fontSize: '12px',
                  letterSpacing: '1px',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}>
                  {cat.name}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(203, 213, 225, 0.6)',
                  letterSpacing: '0.5px'
                }}>
                  Avg Savings:<br/>
                  <span style={{ color: '#4ade80' }}>{cat.savings}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{
            marginTop: '60px',
            padding: '40px',
            background: 'rgba(148, 163, 184, 0.05)',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <h3 style={{
              fontSize: '16px',
              letterSpacing: '2px',
              color: '#cba658',
              marginBottom: '24px',
              fontFamily: '"Helvetica Neue", sans-serif',
              textAlign: 'center'
            }}>
              WHAT'S INCLUDED
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px'
            }}>
              <div style={{
                fontSize: '11px',
                color: 'rgba(203, 213, 225, 0.8)',
                lineHeight: '1.6'
              }}>
                ✓ 24/7 automated monitoring<br/>
                ✓ Instant overcharge alerts<br/>
                ✓ Monthly detailed reports<br/>
                ✓ Historical trend analysis
              </div>
              <div style={{
                fontSize: '11px',
                color: 'rgba(203, 213, 225, 0.8)',
                lineHeight: '1.6'
              }}>
                ✓ Priority recovery processing<br/>
                ✓ Multi-category tracking<br/>
                ✓ Secure document storage<br/>
                ✓ Cancel anytime
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div style={{
            marginTop: '40px',
            padding: '40px',
            background: 'rgba(74, 222, 128, 0.05)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '12px',
              letterSpacing: '2px',
              color: '#4ade80',
              marginBottom: '16px',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}>
              AVERAGE ANNUAL VALUE
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: '200',
              color: '#FFFFFF',
              marginBottom: '12px',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}>
              $5,900 - $22,500
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(203, 213, 225, 0.7)',
              lineHeight: '1.6'
            }}>
              Total potential savings across all 8 categories<br/>
              <span style={{ color: '#4ade80' }}>Your investment: $299.88/year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonitoringService;