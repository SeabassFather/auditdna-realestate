// =============================================
// AUDITDNA MEDIA INTELLIGENCE ENGINE (AMIE)
// AD MANAGEMENT PANEL - ADMIN DASHBOARD
// =============================================
// This component is ADDED to existing AdminDashboard
// Does NOT change App.js or routes
// =============================================

import React, { useState, useEffect } from 'react';

// ========== AD STATES ==========
const AdStates = {
  DRAFT: 'DRAFT',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  APPROVED: 'APPROVED',
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  EXPIRING: 'EXPIRING',
  EXPIRED: 'EXPIRED',
  ARCHIVED: 'ARCHIVED',
  REJECTED: 'REJECTED',
  PAUSED: 'PAUSED'
};

// ========== STYLES - MATCHES YOUR DESIGN ==========
const styles = {
  panel: {
    background: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    padding: '24px',
    marginBottom: '24px',
    backdropFilter: 'blur(20px)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    paddingBottom: '16px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '200',
    color: 'rgba(203, 213, 225, 0.85)',
    letterSpacing: '3px',
    margin: 0,
    fontFamily: 'Helvetica Neue, Arial, sans-serif'
  },
  subtitle: {
    fontSize: '10px',
    color: 'rgba(148, 163, 184, 0.6)',
    letterSpacing: '2px',
    marginTop: '4px'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    paddingBottom: '12px',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    color: 'rgba(148, 163, 184, 0.7)',
    fontSize: '9px',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'Helvetica Neue, Arial, sans-serif'
  },
  tabActive: {
    background: 'rgba(203, 166, 88, 0.15)',
    borderColor: 'rgba(203, 166, 88, 0.5)',
    color: '#cba658'
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '12px',
    marginBottom: '24px'
  },
  statCard: {
    background: 'rgba(30, 41, 59, 0.4)',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    padding: '16px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '100',
    color: 'rgba(226, 232, 240, 0.9)',
    marginBottom: '4px',
    fontFamily: 'Helvetica Neue, Arial, sans-serif'
  },
  statLabel: {
    fontSize: '8px',
    color: 'rgba(148, 163, 184, 0.6)',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '12px 14px',
    fontSize: '8px',
    color: 'rgba(148, 163, 184, 0.6)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    fontFamily: 'Helvetica Neue, Arial, sans-serif'
  },
  td: {
    padding: '12px 14px',
    fontSize: '11px',
    color: 'rgba(203, 213, 225, 0.8)',
    borderBottom: '1px solid rgba(148, 163, 184, 0.05)',
    fontFamily: 'Helvetica Neue, Arial, sans-serif'
  },
  badge: {
    display: 'inline-block',
    padding: '3px 8px',
    fontSize: '8px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  badgeLive: {
    background: 'rgba(74, 222, 128, 0.15)',
    color: 'rgba(74, 222, 128, 0.9)',
    border: '1px solid rgba(74, 222, 128, 0.3)'
  },
  badgeExpiring: {
    background: 'rgba(251, 191, 36, 0.15)',
    color: 'rgba(251, 191, 36, 0.9)',
    border: '1px solid rgba(251, 191, 36, 0.3)'
  },
  badgeDraft: {
    background: 'rgba(148, 163, 184, 0.15)',
    color: 'rgba(148, 163, 184, 0.8)',
    border: '1px solid rgba(148, 163, 184, 0.3)'
  },
  badgeExpired: {
    background: 'rgba(248, 113, 113, 0.15)',
    color: 'rgba(248, 113, 113, 0.9)',
    border: '1px solid rgba(248, 113, 113, 0.3)'
  },
  badgeScheduled: {
    background: 'rgba(96, 165, 250, 0.15)',
    color: 'rgba(96, 165, 250, 0.9)',
    border: '1px solid rgba(96, 165, 250, 0.3)'
  },
  button: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    color: 'rgba(148, 163, 184, 0.8)',
    fontSize: '9px',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'Helvetica Neue, Arial, sans-serif'
  },
  buttonPrimary: {
    background: 'rgba(203, 166, 88, 0.15)',
    borderColor: 'rgba(203, 166, 88, 0.4)',
    color: '#cba658'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    color: 'rgba(226, 232, 240, 0.9)',
    fontSize: '11px',
    outline: 'none',
    fontFamily: 'Helvetica Neue, Arial, sans-serif'
  },
  select: {
    padding: '10px 14px',
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    color: 'rgba(226, 232, 240, 0.9)',
    fontSize: '11px',
    outline: 'none',
    fontFamily: 'Helvetica Neue, Arial, sans-serif'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '9px',
    color: 'rgba(148, 163, 184, 0.7)',
    letterSpacing: '1px',
    marginBottom: '6px',
    textTransform: 'uppercase'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: 'rgba(15, 23, 42, 0.98)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    padding: '32px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    backdropFilter: 'blur(20px)'
  }
};

// ========== MAIN COMPONENT ==========
export default function AdManagementPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [campaigns, setCampaigns] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    advertiser: '',
    slotId: '',
    startDate: '',
    endDate: '',
    price: ''
  });

  // Load mock data
  useEffect(() => {
    setCampaigns([
      {
        id: 'CAMP_LX8K_A1B2C3',
        name: 'Luxury Villa Campaign',
        advertiser: 'Baja Premium Realty',
        slotId: 'MX_HERO',
        state: AdStates.LIVE,
        startDate: '2026-01-01',
        endDate: '2026-03-31',
        price: 60000,
        impressions: 45230,
        clicks: 892
      },
      {
        id: 'CAMP_FN2M_D4E5F6',
        name: 'Cross-Border Financing',
        advertiser: 'Pacific Coast Lending',
        slotId: 'USA_CALCULATOR',
        state: AdStates.EXPIRING,
        startDate: '2025-11-01',
        endDate: '2026-01-15',
        price: 36000,
        impressions: 28450,
        clicks: 456
      },
      {
        id: 'CAMP_WC3P_G7H8I9',
        name: 'Wine Country Homes',
        advertiser: 'Valle Properties',
        slotId: 'DEV_PROJECT_FEATURE',
        state: AdStates.SCHEDULED,
        startDate: '2026-02-01',
        endDate: '2026-04-30',
        price: 45000,
        impressions: 0,
        clicks: 0
      },
      {
        id: 'CAMP_YT4R_J0K1L2',
        name: 'Yacht Club Marina',
        advertiser: 'Ensenada Marina Group',
        slotId: 'LIFE_HERO',
        state: AdStates.DRAFT,
        startDate: '',
        endDate: '',
        price: 22000,
        impressions: 0,
        clicks: 0
      }
    ]);

    setInquiries([
      {
        id: 'INQ_A1B2C3D4',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-123-4567',
        campaign: 'Luxury Villa Campaign',
        score: 92,
        state: 'ROUTED',
        createdAt: '2026-01-08T14:30:00Z'
      },
      {
        id: 'INQ_E5F6G7H8',
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+52-646-555-1234',
        campaign: 'Cross-Border Financing',
        score: 88,
        state: 'RESPONDED',
        createdAt: '2026-01-08T11:15:00Z'
      },
      {
        id: 'INQ_I9J0K1L2',
        name: 'Robert Chen',
        email: 'r.chen@company.com',
        phone: '+1-555-987-6543',
        campaign: 'Wine Country Homes',
        score: 95,
        state: 'NEW',
        createdAt: '2026-01-09T09:45:00Z'
      }
    ]);
  }, []);

  // Calculate stats
  const stats = {
    liveCampaigns: campaigns.filter(c => c.state === AdStates.LIVE).length,
    expiringCampaigns: campaigns.filter(c => c.state === AdStates.EXPIRING).length,
    scheduledCampaigns: campaigns.filter(c => c.state === AdStates.SCHEDULED).length,
    totalRevenue: campaigns.filter(c => [AdStates.LIVE, AdStates.EXPIRING].includes(c.state))
                          .reduce((sum, c) => sum + c.price, 0),
    pendingInquiries: inquiries.filter(i => ['NEW', 'ROUTED'].includes(i.state)).length,
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    avgScore: inquiries.length > 0 
      ? Math.round(inquiries.reduce((sum, i) => sum + i.score, 0) / inquiries.length) 
      : 0
  };

  const getStateBadge = (state) => {
    let badgeStyle = { ...styles.badge };
    switch (state) {
      case AdStates.LIVE:
        badgeStyle = { ...badgeStyle, ...styles.badgeLive };
        break;
      case AdStates.EXPIRING:
        badgeStyle = { ...badgeStyle, ...styles.badgeExpiring };
        break;
      case AdStates.SCHEDULED:
        badgeStyle = { ...badgeStyle, ...styles.badgeScheduled };
        break;
      case AdStates.EXPIRED:
      case AdStates.REJECTED:
        badgeStyle = { ...badgeStyle, ...styles.badgeExpired };
        break;
      default:
        badgeStyle = { ...badgeStyle, ...styles.badgeDraft };
    }
    return <span style={badgeStyle}>{state}</span>;
  };

  const handleCreateCampaign = () => {
    const campaign = {
      id: `CAMP_${Date.now().toString(36).toUpperCase()}`,
      ...newCampaign,
      state: AdStates.DRAFT,
      impressions: 0,
      clicks: 0
    };
    setCampaigns([campaign, ...campaigns]);
    setShowNewCampaign(false);
    setNewCampaign({ name: '', advertiser: '', slotId: '', startDate: '', endDate: '', price: '' });
  };

  // Available slots for dropdown
  const availableSlots = [
    { id: 'MX_HERO', name: 'Mexico Real Estate - Hero', price: 20000 },
    { id: 'MX_PROPERTY_SEARCH', name: 'Mexico Real Estate - Property Search', price: 12000 },
    { id: 'MX_ACCORDION_FINANCING', name: 'Mexico Real Estate - Financing Section', price: 10000 },
    { id: 'USA_HERO', name: 'USA Mortgage - Hero', price: 18000 },
    { id: 'USA_CALCULATOR', name: 'USA Mortgage - Calculator', price: 12000 },
    { id: 'DEV_HERO', name: 'Developments - Hero', price: 30000 },
    { id: 'DEV_PROJECT_FEATURE', name: 'Developments - Featured Project', price: 15000 },
    { id: 'LIFE_HERO', name: 'Lifestyle - Hero', price: 22000 },
    { id: 'LIFE_EDITORIAL', name: 'Lifestyle - Editorial', price: 15000 }
  ];

  return (
    <div style={styles.panel}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>AD MANAGEMENT</h2>
          <p style={styles.subtitle}>AUDITDNA MEDIA INTELLIGENCE ENGINE</p>
        </div>
        <button 
          style={{ ...styles.button, ...styles.buttonPrimary }}
          onClick={() => setShowNewCampaign(true)}
        >
          + NEW CAMPAIGN
        </button>
      </div>

      {/* TABS */}
      <div style={styles.tabs}>
        {['overview', 'campaigns', 'inquiries', 'slots', 'analytics'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
          <div style={styles.statGrid}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statValue, color: 'rgba(74, 222, 128, 0.9)' }}>{stats.liveCampaigns}</div>
              <div style={styles.statLabel}>Live</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statValue, color: 'rgba(251, 191, 36, 0.9)' }}>{stats.expiringCampaigns}</div>
              <div style={styles.statLabel}>Expiring</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statValue, color: 'rgba(96, 165, 250, 0.9)' }}>{stats.scheduledCampaigns}</div>
              <div style={styles.statLabel}>Scheduled</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>${stats.totalRevenue.toLocaleString()}</div>
              <div style={styles.statLabel}>Active Revenue</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statValue, color: '#cba658' }}>{stats.pendingInquiries}</div>
              <div style={styles.statLabel}>Pending Inquiries</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.totalImpressions.toLocaleString()}</div>
              <div style={styles.statLabel}>Impressions</div>
            </div>
          </div>

          <h3 style={{ ...styles.title, fontSize: '12px', marginBottom: '16px' }}>ACTIVE CAMPAIGNS</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Campaign</th>
                <th style={styles.th}>Advertiser</th>
                <th style={styles.th}>Slot</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>End Date</th>
                <th style={styles.th}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.filter(c => [AdStates.LIVE, AdStates.EXPIRING, AdStates.SCHEDULED].includes(c.state)).map(campaign => (
                <tr key={campaign.id}>
                  <td style={styles.td}>{campaign.name}</td>
                  <td style={styles.td}>{campaign.advertiser}</td>
                  <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '9px' }}>{campaign.slotId}</td>
                  <td style={styles.td}>{getStateBadge(campaign.state)}</td>
                  <td style={styles.td}>{campaign.endDate || '-'}</td>
                  <td style={{ ...styles.td, color: '#cba658' }}>${campaign.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* CAMPAIGNS TAB */}
      {activeTab === 'campaigns' && (
        <>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <select style={{ ...styles.select, width: '140px' }}>
              <option value="">All States</option>
              {Object.values(AdStates).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              style={{ ...styles.input, flex: 1, minWidth: '200px' }}
            />
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Campaign</th>
                  <th style={styles.th}>Advertiser</th>
                  <th style={styles.th}>Slot</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Performance</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '9px' }}>{campaign.id}</td>
                    <td style={styles.td}>{campaign.name}</td>
                    <td style={styles.td}>{campaign.advertiser}</td>
                    <td style={{ ...styles.td, fontSize: '9px' }}>{campaign.slotId}</td>
                    <td style={{ ...styles.td, color: '#cba658' }}>${campaign.price.toLocaleString()}</td>
                    <td style={styles.td}>{getStateBadge(campaign.state)}</td>
                    <td style={{ ...styles.td, fontSize: '10px' }}>
                      {campaign.impressions.toLocaleString()} imp / {campaign.clicks} clicks
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button style={{ ...styles.button, padding: '4px 8px', fontSize: '8px' }}>VIEW</button>
                        <button style={{ ...styles.button, padding: '4px 8px', fontSize: '8px' }}>EDIT</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* INQUIRIES TAB */}
      {activeTab === 'inquiries' && (
        <>
          <div style={styles.statGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{inquiries.length}</div>
              <div style={styles.statLabel}>Total Inquiries</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statValue, color: '#cba658' }}>{stats.pendingInquiries}</div>
              <div style={styles.statLabel}>Pending Response</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statValue, color: 'rgba(74, 222, 128, 0.9)' }}>{stats.avgScore}%</div>
              <div style={styles.statLabel}>Avg Confidence</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>98%</div>
              <div style={styles.statLabel}>SLA Compliance</div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Campaign</th>
                  <th style={styles.th}>Score</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Time</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map(inquiry => (
                  <tr key={inquiry.id}>
                    <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '9px' }}>{inquiry.id}</td>
                    <td style={styles.td}>{inquiry.name}</td>
                    <td style={{ ...styles.td, fontSize: '10px' }}>{inquiry.email}</td>
                    <td style={{ ...styles.td, fontSize: '10px' }}>{inquiry.phone}</td>
                    <td style={{ ...styles.td, fontSize: '10px' }}>{inquiry.campaign}</td>
                    <td style={styles.td}>
                      <span style={{
                        color: inquiry.score >= 80 ? 'rgba(74, 222, 128, 0.9)' : 
                               inquiry.score >= 50 ? 'rgba(251, 191, 36, 0.9)' : 
                               'rgba(248, 113, 113, 0.9)'
                      }}>
                        {inquiry.score}%
                      </span>
                    </td>
                    <td style={styles.td}>{getStateBadge(inquiry.state)}</td>
                    <td style={{ ...styles.td, fontSize: '9px' }}>
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* SLOTS TAB */}
      {activeTab === 'slots' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {availableSlots.map(slot => {
            const occupant = campaigns.find(c => c.slotId === slot.id && [AdStates.LIVE, AdStates.EXPIRING].includes(c.state));
            const scheduled = campaigns.find(c => c.slotId === slot.id && c.state === AdStates.SCHEDULED);
            const status = occupant ? 'OCCUPIED' : scheduled ? 'SCHEDULED' : 'AVAILABLE';
            
            return (
              <div key={slot.id} style={{
                ...styles.statCard,
                borderLeft: `3px solid ${
                  status === 'OCCUPIED' ? 'rgba(74, 222, 128, 0.7)' : 
                  status === 'SCHEDULED' ? 'rgba(96, 165, 250, 0.7)' : 
                  'rgba(148, 163, 184, 0.3)'
                }`,
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)', fontFamily: 'monospace' }}>{slot.id}</span>
                  <span style={{
                    fontSize: '8px',
                    color: status === 'OCCUPIED' ? 'rgba(74, 222, 128, 0.9)' : 
                           status === 'SCHEDULED' ? 'rgba(96, 165, 250, 0.9)' : 
                           'rgba(148, 163, 184, 0.6)',
                    letterSpacing: '0.5px'
                  }}>
                    {status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(226, 232, 240, 0.85)', marginBottom: '4px' }}>{slot.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#cba658' }}>${slot.price.toLocaleString()}/mo</span>
                  {status === 'AVAILABLE' && (
                    <button style={{ ...styles.button, padding: '4px 10px', fontSize: '8px' }}>BOOK</button>
                  )}
                </div>
                {occupant && (
                  <div style={{ marginTop: '8px', fontSize: '9px', color: 'rgba(148, 163, 184, 0.6)' }}>
                    {occupant.advertiser}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <>
          <div style={styles.statGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.totalImpressions.toLocaleString()}</div>
              <div style={styles.statLabel}>Total Impressions</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.totalClicks.toLocaleString()}</div>
              <div style={styles.statLabel}>Total Clicks</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>
                {stats.totalImpressions > 0 ? ((stats.totalClicks / stats.totalImpressions) * 100).toFixed(2) : 0}%
              </div>
              <div style={styles.statLabel}>CTR</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>
                ${stats.totalClicks > 0 ? (stats.totalRevenue / stats.totalClicks).toFixed(2) : 0}
              </div>
              <div style={styles.statLabel}>Cost Per Click</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>
                ${stats.totalImpressions > 0 ? ((stats.totalRevenue / stats.totalImpressions) * 1000).toFixed(2) : 0}
              </div>
              <div style={styles.statLabel}>CPM</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.avgScore}%</div>
              <div style={styles.statLabel}>Lead Quality</div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(30, 41, 59, 0.4)', 
            border: '1px solid rgba(148, 163, 184, 0.1)',
            padding: '40px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px' }}>
              ADVANCED ANALYTICS COMING SOON
            </p>
            <p style={{ margin: '8px 0 0', fontSize: '10px', color: 'rgba(148, 163, 184, 0.4)' }}>
              Geo heatmaps, Scroll depth, Attention time, ROI tracking, Fraud detection
            </p>
          </div>
        </>
      )}

      {/* NEW CAMPAIGN MODAL */}
      {showNewCampaign && (
        <div style={styles.modal} onClick={() => setShowNewCampaign(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3 style={{ ...styles.title, marginBottom: '24px' }}>NEW CAMPAIGN</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Campaign Name</label>
              <input 
                type="text" 
                style={styles.input}
                value={newCampaign.name}
                onChange={e => setNewCampaign({...newCampaign, name: e.target.value})}
                placeholder="Enter campaign name"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Advertiser</label>
              <input 
                type="text" 
                style={styles.input}
                value={newCampaign.advertiser}
                onChange={e => setNewCampaign({...newCampaign, advertiser: e.target.value})}
                placeholder="Enter advertiser name"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Ad Slot</label>
              <select 
                style={{ ...styles.select, width: '100%' }}
                value={newCampaign.slotId}
                onChange={e => {
                  const slot = availableSlots.find(s => s.id === e.target.value);
                  setNewCampaign({
                    ...newCampaign, 
                    slotId: e.target.value,
                    price: slot ? slot.price : ''
                  });
                }}
              >
                <option value="">Select a slot</option>
                {availableSlots.map(slot => (
                  <option key={slot.id} value={slot.id}>{slot.name} - ${slot.price.toLocaleString()}/mo</option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Start Date</label>
                <input 
                  type="date" 
                  style={styles.input}
                  value={newCampaign.startDate}
                  onChange={e => setNewCampaign({...newCampaign, startDate: e.target.value})}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>End Date</label>
                <input 
                  type="date" 
                  style={styles.input}
                  value={newCampaign.endDate}
                  onChange={e => setNewCampaign({...newCampaign, endDate: e.target.value})}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Price (USD)</label>
              <input 
                type="number" 
                style={styles.input}
                value={newCampaign.price}
                onChange={e => setNewCampaign({...newCampaign, price: parseInt(e.target.value) || ''})}
                placeholder="Campaign price"
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button 
                style={styles.button}
                onClick={() => setShowNewCampaign(false)}
              >
                CANCEL
              </button>
              <button 
                style={{ ...styles.button, ...styles.buttonPrimary }}
                onClick={handleCreateCampaign}
              >
                CREATE CAMPAIGN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}