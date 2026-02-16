// PARTNER DASHBOARD - /partner/dashboard
// Partners log in and see ONLY their own data (NO access to Admin or other partners)
// FUTURE: Can share sales data, commission schedules, training materials

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PartnerDashboard() {
  const navigate = useNavigate();
  
  // Mock partner data (in real app, fetch from API based on logged-in partner)
  const [partnerData] = useState({
    code: 'MLO-4782',
    name: 'John Smith',
    type: 'Mortgage Loan Officer',
    company: 'ABC Mortgage Co.',
    email: 'john@mortgagecompany.com',
    commissionRate: 25,
    status: 'Active',
    approvedDate: '2026-01-15'
  });

  const [stats] = useState({
    totalReferrals: 12,
    activeAudits: 4,
    completedAudits: 8,
    totalCommission: 11112,
    pendingCommission: 3278,
    paidCommission: 7834
  });

  const [referrals] = useState([
    { id: 1, name: 'Jane Smith', email: 'jane@example.com', status: 'Processing', submitted: '2026-02-10', recovery: 0, commission: 0 },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'Complete', submitted: '2026-01-28', recovery: 14250, commission: 1389 },
    { id: 3, name: 'Mary Wilson', email: 'mary@example.com', status: 'Pending Upload', submitted: '2026-02-12', recovery: 0, commission: 0 },
    { id: 4, name: 'Tom Davis', email: 'tom@example.com', status: 'Complete', submitted: '2026-01-15', recovery: 18900, commission: 1842 }
  ]);

  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    // Clear partner session
    sessionStorage.removeItem('partner_token');
    navigate('/partner/login');
  };

  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)'
  };

  const styles = {
    statCard: { background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', padding: '20px', textAlign: 'center', borderRadius: '8px' },
    button: { padding: '8px 16px', background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.25)', color: 'rgba(148, 163, 184, 0.8)', fontSize: '10px', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: '"Helvetica Neue", sans-serif', borderRadius: '4px' },
    buttonPrimary: { background: 'rgba(203, 166, 88, 0.15)', borderColor: 'rgba(203, 166, 88, 0.4)', color: '#cba658' },
    tab: { padding: '12px 24px', cursor: 'pointer', fontSize: '11px', letterSpacing: '1px', transition: 'all 0.2s' }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', position: 'relative' }}>
      
      {/* TOP NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '16px 48px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(203,166,88,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div onClick={() => navigate('/')} style={{ ...glassText, fontSize: '11px', letterSpacing: '4px', color: 'rgba(203,166,88,0.9)', cursor: 'pointer' }}>
            AUDITDNA PARTNERS
          </div>
          <div style={{ ...glassText, fontSize: '10px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', padding: '4px 12px', background: 'rgba(203,166,88,0.1)', border: '1px solid rgba(203,166,88,0.2)', borderRadius: '12px' }}>
            {partnerData.code}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.7)' }}>{partnerData.name}</span>
          <button onClick={handleLogout} style={{ ...styles.button, background: 'rgba(248, 113, 113, 0.15)', borderColor: 'rgba(248, 113, 113, 0.4)', color: 'rgba(248, 113, 113, 0.9)' }}>
            LOGOUT
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, padding: '100px 48px 60px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ ...glassText, fontSize: '32px', letterSpacing: '6px', marginBottom: '8px', color: 'rgba(226,232,240,0.9)' }}>
            PARTNER DASHBOARD
          </h1>
          <p style={{ ...glassText, fontSize: '11px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)' }}>
            {partnerData.company} • {partnerData.type}
          </p>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'referrals', label: 'My Referrals' },
            { id: 'commissions', label: 'Commission Schedule' },
            { id: 'marketing', label: 'Marketing Materials' },
            { id: 'sales', label: 'Sales Data' },
            { id: 'resources', label: 'Resources' }
          ].map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tab,
                borderBottom: activeTab === tab.id ? '2px solid #cba658' : '2px solid transparent',
                color: activeTab === tab.id ? '#cba658' : '#94a3b8'
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <div style={styles.statCard}>
                <p style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>TOTAL REFERRALS</p>
                <p style={{ ...glassText, fontSize: '32px', fontWeight: '600', color: '#cba658', marginBottom: '4px' }}>{stats.totalReferrals}</p>
                <p style={{ ...glassText, fontSize: '9px', color: '#64748b' }}>Active: {stats.activeAudits} | Complete: {stats.completedAudits}</p>
              </div>

              <div style={styles.statCard}>
                <p style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>TOTAL COMMISSION</p>
                <p style={{ ...glassText, fontSize: '32px', fontWeight: '600', color: '#22c55e', marginBottom: '4px' }}>${stats.totalCommission.toLocaleString()}</p>
                <p style={{ ...glassText, fontSize: '9px', color: '#64748b' }}>Lifetime earnings</p>
              </div>

              <div style={styles.statCard}>
                <p style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>PENDING PAYMENT</p>
                <p style={{ ...glassText, fontSize: '32px', fontWeight: '600', color: '#fbbf24', marginBottom: '4px' }}>${stats.pendingCommission.toLocaleString()}</p>
                <p style={{ ...glassText, fontSize: '9px', color: '#64748b' }}>NET 30 terms</p>
              </div>

              <div style={styles.statCard}>
                <p style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>PAID TO DATE</p>
                <p style={{ ...glassText, fontSize: '32px', fontWeight: '600', color: '#60a5fa', marginBottom: '4px' }}>${stats.paidCommission.toLocaleString()}</p>
                <p style={{ ...glassText, fontSize: '9px', color: '#64748b' }}>Via ACH/Check</p>
              </div>
            </div>

            {/* RECENT REFERRALS */}
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ ...glassText, fontSize: '14px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px' }}>RECENT REFERRALS</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>CONSUMER</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>STATUS</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>SUBMITTED</th>
                    <th style={{ textAlign: 'right', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>RECOVERY</th>
                    <th style={{ textAlign: 'right', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>YOUR COMMISSION</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.slice(0, 4).map(r => (
                    <tr key={r.id}>
                      <td style={{ padding: '14px 12px', fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', borderBottom: '1px solid rgba(148, 163, 184, 0.05)' }}>
                        {r.name}<br/>
                        <span style={{ fontSize: '10px', color: '#64748b' }}>{r.email}</span>
                      </td>
                      <td style={{ padding: '14px 12px', fontSize: '11px', borderBottom: '1px solid rgba(148, 163, 184, 0.05)' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '9px',
                          background: r.status === 'Complete' ? 'rgba(34, 197, 94, 0.15)' : r.status === 'Processing' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                          color: r.status === 'Complete' ? '#22c55e' : r.status === 'Processing' ? '#60a5fa' : '#fbbf24'
                        }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 12px', fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', borderBottom: '1px solid rgba(148, 163, 184, 0.05)' }}>
                        {r.submitted}
                      </td>
                      <td style={{ padding: '14px 12px', fontSize: '11px', color: '#22c55e', borderBottom: '1px solid rgba(148, 163, 184, 0.05)', textAlign: 'right' }}>
                        {r.recovery > 0 ? `$${r.recovery.toLocaleString()}` : '-'}
                      </td>
                      <td style={{ padding: '14px 12px', fontSize: '11px', color: '#cba658', borderBottom: '1px solid rgba(148, 163, 184, 0.05)', textAlign: 'right', fontWeight: '600' }}>
                        {r.commission > 0 ? `$${r.commission.toLocaleString()}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* REFERRALS TAB */}
        {activeTab === 'referrals' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ ...glassText, fontSize: '14px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px' }}>ALL REFERRALS</h3>
            <p style={{ ...glassText, fontSize: '12px', marginBottom: '20px' }}>Complete list of all consumers you've referred using code: <span style={{ color: '#cba658', fontWeight: '600' }}>{partnerData.code}</span></p>
            {/* Same table as overview but with all referrals */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>CONSUMER</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>STATUS</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>SUBMITTED</th>
                  <th style={{ textAlign: 'right', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>RECOVERY</th>
                  <th style={{ textAlign: 'right', padding: '12px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>YOUR COMMISSION</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map(r => (
                  <tr key={r.id}>
                    <td style={{ padding: '14px 12px', fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', borderBottom: '1px solid rgba(148, 163, 184, 0.05)' }}>
                      {r.name}<br/>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{r.email}</span>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '11px', borderBottom: '1px solid rgba(148, 163, 184, 0.05)' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '9px',
                        background: r.status === 'Complete' ? 'rgba(34, 197, 94, 0.15)' : r.status === 'Processing' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                        color: r.status === 'Complete' ? '#22c55e' : r.status === 'Processing' ? '#60a5fa' : '#fbbf24'
                      }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', borderBottom: '1px solid rgba(148, 163, 184, 0.05)' }}>
                      {r.submitted}
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '11px', color: '#22c55e', borderBottom: '1px solid rgba(148, 163, 184, 0.05)', textAlign: 'right' }}>
                      {r.recovery > 0 ? `$${r.recovery.toLocaleString()}` : '-'}
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '11px', color: '#cba658', borderBottom: '1px solid rgba(148, 163, 184, 0.05)', textAlign: 'right', fontWeight: '600' }}>
                      {r.commission > 0 ? `$${r.commission.toLocaleString()}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* COMMISSIONS TAB - FUTURE EXPANSION */}
        {activeTab === 'commissions' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '32px' }}>
            <h3 style={{ ...glassText, fontSize: '14px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px' }}>COMMISSION SCHEDULE</h3>
            
            <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px' }}>
              <p style={{ ...glassText, fontSize: '12px', marginBottom: '8px' }}>
                <span style={{ color: '#cba658', fontWeight: '600' }}>Your Current Rate:</span> {partnerData.commissionRate}% of collected fees
              </p>
              <p style={{ ...glassText, fontSize: '11px', color: '#94a3b8' }}>
                This means you earn 25% of what AuditDNA collects from your referred consumers
              </p>
            </div>

            <h4 style={{ ...glassText, fontSize: '12px', color: '#94a3b8', marginBottom: '16px', letterSpacing: '1px' }}>HOW IT WORKS</h4>
            
            {[
              { recovery: '$10,000', fee39: '$3,900', fee30: '$3,000', commission39: '$975', commission30: '$750' },
              { recovery: '$15,000', fee39: '$5,850', fee30: '$4,500', commission39: '$1,462', commission30: '$1,125' },
              { recovery: '$20,000', fee39: '$7,800', fee30: '$6,000', commission39: '$1,950', commission30: '$1,500' }
            ].map((row, i) => (
              <div key={i} style={{ padding: '16px', marginBottom: '12px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '6px' }}>
                <p style={{ ...glassText, fontSize: '11px', marginBottom: '8px' }}>
                  <span style={{ color: '#22c55e' }}>Recovery:</span> {row.recovery}
                </p>
                <p style={{ ...glassText, fontSize: '10px', marginBottom: '4px', color: '#94a3b8' }}>
                  • Escrow Path (39%): Fee = {row.fee39} → Your Commission = <span style={{ color: '#cba658', fontWeight: '600' }}>{row.commission39}</span>
                </p>
                <p style={{ ...glassText, fontSize: '10px', color: '#94a3b8' }}>
                  • Direct Path (30%): Fee = {row.fee30} → Your Commission = <span style={{ color: '#cba658', fontWeight: '600' }}>{row.commission30}</span>
                </p>
              </div>
            ))}

            <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.3)', borderRadius: '8px' }}>
              <p style={{ ...glassText, fontSize: '11px', color: '#60a5fa', marginBottom: '8px', fontWeight: '600' }}>
                🎯 PERFORMANCE BONUSES (COMING SOON)
              </p>
              <p style={{ ...glassText, fontSize: '10px', color: '#94a3b8' }}>
                Refer 25+ clients per quarter → Earn 30% commission<br/>
                Refer 50+ clients per quarter → Earn 35% commission
              </p>
            </div>
          </div>
        )}

        {/* MARKETING TAB */}
        {activeTab === 'marketing' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '32px' }}>
            <h3 style={{ ...glassText, fontSize: '14px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px' }}>MARKETING MATERIALS</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {[
                { title: 'Email Template', desc: 'Pre-written email to send clients', icon: '📧' },
                { title: 'Flyer PDF', desc: 'Print and hand out to homeowners', icon: '📄' },
                { title: 'Social Media Posts', desc: 'Ready-to-share graphics', icon: '📱' },
                { title: 'Business Cards', desc: 'Order custom cards with your code', icon: '💳' }
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)'}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                  <p style={{ ...glassText, fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ ...glassText, fontSize: '10px', color: '#94a3b8', marginBottom: '12px' }}>{item.desc}</p>
                  <button style={{ ...styles.button, ...styles.buttonPrimary, width: '100%' }}>DOWNLOAD</button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px' }}>
              <p style={{ ...glassText, fontSize: '11px', color: '#cba658', marginBottom: '8px', fontWeight: '600' }}>
                Your Unique Referral Link:
              </p>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={`https://auditdna.com/register?ref=${partnerData.code}`}
                  readOnly
                  style={{ flex: 1, padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '11px', outline: 'none' }}
                />
                <button style={{ ...styles.button, ...styles.buttonPrimary }}>COPY</button>
              </div>
            </div>
          </div>
        )}

        {/* SALES DATA TAB - FUTURE EXPANSION */}
        {activeTab === 'sales' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ ...glassText, fontSize: '16px', color: '#cba658', marginBottom: '12px', letterSpacing: '2px' }}>
              SALES DATA ACCESS
            </h3>
            <p style={{ ...glassText, fontSize: '12px', color: '#94a3b8', marginBottom: '20px', maxWidth: '500px', margin: '0 auto 20px' }}>
              This section will show aggregated industry data, conversion rates, and performance benchmarks to help you succeed.
            </p>
            <div style={{ padding: '20px', background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.3)', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
              <p style={{ ...glassText, fontSize: '11px', color: '#60a5fa', fontWeight: '600', marginBottom: '8px' }}>COMING SOON</p>
              <p style={{ ...glassText, fontSize: '10px', color: '#94a3b8' }}>
                • Industry average recovery amounts<br/>
                • Conversion rate by referral source<br/>
                • Best performing states/regions<br/>
                • Seasonal trends and insights
              </p>
            </div>
          </div>
        )}

        {/* RESOURCES TAB - FUTURE EXPANSION */}
        {activeTab === 'resources' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '32px' }}>
            <h3 style={{ ...glassText, fontSize: '14px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px' }}>PARTNER RESOURCES</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '24px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px' }}>
                <h4 style={{ ...glassText, fontSize: '12px', color: '#cba658', marginBottom: '12px' }}>📚 Training Materials</h4>
                <p style={{ ...glassText, fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>
                  Learn how to effectively refer clients and maximize your commissions
                </p>
                <button style={{ ...styles.button, ...styles.buttonPrimary, width: '100%' }}>VIEW TRAINING</button>
              </div>

              <div style={{ padding: '24px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px' }}>
                <h4 style={{ ...glassText, fontSize: '12px', color: '#cba658', marginBottom: '12px' }}>❓ FAQs</h4>
                <p style={{ ...glassText, fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>
                  Common questions about the partner program and commission structure
                </p>
                <button style={{ ...styles.button, ...styles.buttonPrimary, width: '100%' }}>READ FAQs</button>
              </div>

              <div style={{ padding: '24px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px' }}>
                <h4 style={{ ...glassText, fontSize: '12px', color: '#cba658', marginBottom: '12px' }}>📞 Support</h4>
                <p style={{ ...glassText, fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>
                  Need help? Contact our partner support team
                </p>
                <button style={{ ...styles.button, ...styles.buttonPrimary, width: '100%' }}>CONTACT SUPPORT</button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default PartnerDashboard;