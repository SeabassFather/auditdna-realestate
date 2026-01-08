import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ModuleCards() {
  const navigate = useNavigate();

  const heavyModules = [
    {
      id: 'accounting',
      icon: '💰',
      title: 'Finance Master Module',
      description: 'Complete P&L, COGS, Expenses, Factoring, PO Finance, Profit Calculator',
      route: '/accounting',
      stats: ['$487K Revenue', '29. 2% Margin', '47 Active Deals']
    },
    {
      id: 'cm-products',
      icon: '📊',
      title: 'CM Products International',
      description: 'USDA 5-Year Pricing, Market Intelligence, Grower Registry, AI Predictions',
      route: '/cm-products',
      stats: ['250+ Commodities', '99.2% Accuracy', '1,200 Growers']
    },
    {
      id: 'trade-finance',
      icon: '💸',
      title: 'Trade Finance',
      description: 'AI-Powered Risk Scoring, Auto-Approval, Invoice Factoring, Credit Analysis',
      route: '/trade-finance',
      stats: ['$2.4M Financed', '89% Auto-Approved', '18/100 Avg Risk']
    },
    {
      id: 'growers',
      icon: '🌾',
      title: 'Grower Management Hub',
      description: 'Grower Directory, TraceCert Compliance, Harvest Tracking, GPS Monitoring',
      route: '/growers',
      stats: ['850 Growers', '97% Certified', '12K Acres']
    },
    {
      id: 'mortgage',
      icon: '🏠',
      title: 'Mortgage & Real Estate',
      description: 'US Mortgage (NMLS #337526), Mexico Property, Lender Search, Agent Network',
      route: '/mortgage',
      stats: ['340 Properties', '120 Agents', '6.2% Avg Rate']
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', padding: '0' }}>
      {/* HEADER */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '3rem 2rem 2rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#111827',
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.025em'
          }}>
            AuditDNA Platform
          </h1>
          <p style={{
            fontSize:   '1.125rem',
            color: '#6b7280',
            margin: 0,
            fontWeight: '400'
          }}>
            Advanced agricultural intelligence, compliance auditing, and traceability platform powered by AI
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding:   '3rem 2rem' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid #111827'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin:  0 }}>
              Core Financial & Intelligence Modules
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {heavyModules.map((module, idx) => (
              <div
                key={idx}
                onClick={() => navigate(module.route)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition:  'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e. currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {/* Icon & Title */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2. 5rem', lineHeight: 1 }}>{module.icon}</div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#10b981',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    ACTIVE
                  </div>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#111827',
                  margin: '0 0 0.75rem 0'
                }}>
                  {module.title}
                </h3>

                <p style={{
                  fontSize: '0.9375rem',
                  color:  '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {module.description}
                </p>

                {/* Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  {module.stats.map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#111827',
                        whiteSpace: 'nowrap'
                      }}>
                        {stat}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Arrow - FIXED */}
                <div style={{
                  marginTop: '1.5rem',
                  color: '#10b981',
                  fontWeight: '600',
                  fontSize: '0.9375rem'
                }}>
                  Open Module →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Modules Section */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid #111827'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6b7280' }} />
            <h2 style={{ fontSize:  '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
              Additional Modules
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { icon: '🔗', title: 'Traceability AI Hub', desc: 'QR codes, blockchain tracing, supply chain tracking' },
              { icon: '🏢', title: 'Supplier Intelligence', desc: 'Supplier vetting, risk assessment, compliance' },
              { icon: '🌎', title: 'Latin America Trade', desc: 'Brazil, Testing Routes, Growers, Equipment, Maps' },
              { icon: '📋', title: 'Audit Management', desc: 'GLOBALG.A.P., USDA Organic, Fair Trade audits' },
              { icon:  '📦', title: 'Logistics & Shipping', desc: 'Container tracking, customs docs, freight forwarding' },
              { icon: '💼', title: 'Compliance & Regulatory', desc: 'FDA FSMA, PACA, customs compliance' }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding:  '1.5rem',
                  transition: 'all 0.2s ease',
                  cursor:  'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget. style.borderColor = '#d1d5db';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e. currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: '0 0 0.5rem 0' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}