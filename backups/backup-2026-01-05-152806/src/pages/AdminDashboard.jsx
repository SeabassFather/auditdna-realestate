import React, { useState, useEffect } from 'react';
import { propertyAPI, leadAPI, healthCheck } from '../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalProperties: 0, totalLeads: 0, newLeads: 0, totalValue: 0 });
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Check backend health
      const health = await healthCheck();
      setBackendStatus(health.status === 'OK' ? 'online' : 'offline');

      // Load properties
      const propResult = await propertyAPI.getAll();
      if (propResult.success) {
        setProperties(propResult.properties);
      }

      // Load leads
      const leadResult = await leadAPI.getAll();
      if (leadResult.success) {
        setLeads(leadResult.leads);
      }

      // Calculate stats
      const totalValue = propResult.properties?.reduce((sum, p) => sum + (p.price || 0), 0) || 0;
      const newLeads = leadResult.leads?.filter(l => l.status === 'new').length || 0;

      setStats({
        totalProperties: propResult.properties?.length || 0,
        totalLeads: leadResult.leads?.length || 0,
        newLeads,
        totalValue
      });
    } catch (err) {
      console.error('Failed to load data:', err);
      setBackendStatus('offline');
    }
    setLoading(false);
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      loadData();
    } catch (err) {
      alert('Failed to update lead');
    }
  };

  const s = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 24px' },
    header: { maxWidth: '1400px', margin: '0 auto 40px' },
    title: { fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '12px' },
    statusBar: { display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', color: '#94a3b8' },
    statusDot: { width: '8px', height: '8px', borderRadius: '50%', background: backendStatus === 'online' ? '#10b981' : '#ef4444' },
    content: { maxWidth: '1400px', margin: '0 auto' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' },
    statCard: { padding: '24px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px' },
    statLabel: { fontSize: '14px', color: '#94a3b8', marginBottom: '8px' },
    statValue: { fontSize: '32px', fontWeight: '700', color: '#cba658' },
    tabs: { display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '2px solid rgba(203, 166, 88, 0.2)', paddingBottom: '12px' },
    tab: { padding: '12px 24px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px', fontWeight: '600', borderBottom: '3px solid transparent' },
    tabActive: { color: '#cba658', borderBottomColor: '#cba658' },
    table: { width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', overflow: 'hidden' },
    th: { padding: '16px', background: 'rgba(203, 166, 88, 0.1)', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#cba658', textTransform: 'uppercase' },
    td: { padding: '16px', borderTop: '1px solid rgba(203, 166, 88, 0.1)', fontSize: '14px', color: '#cbd5e1' },
    badge: { padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'inline-block' },
    btnSmall: { padding: '6px 12px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid #3b82f6', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }
  };

  const getBadgeStyle = (status) => {
    const colors = {
      new: { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981' },
      contacted: { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' },
      qualified: { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' },
      approved: { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981' },
      pending: { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }
    };
    return { ...s.badge, background: colors[status]?.bg || colors.pending.bg, color: colors[status]?.color || colors.pending.color };
  };

  if (loading) {
    return (
      <div style={s.container}>
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}></div>
          <div style={{ fontSize: '20px', color: '#cba658' }}>Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h1 style={s.title}>Admin Dashboard</h1>
        <div style={s.statusBar}>
          <div style={s.statusDot}></div>
          Backend: {backendStatus}  Last updated: {new Date().toLocaleTimeString()}
          <button onClick={loadData} style={{ marginLeft: 'auto', ...s.btnSmall }}> Refresh</button>
        </div>
      </div>

      <div style={s.content}>
        <div style={s.statsGrid}>
          <div style={s.statCard}>
            <div style={s.statLabel}>Total Properties</div>
            <div style={s.statValue}>{stats.totalProperties}</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statLabel}>Total Leads</div>
            <div style={s.statValue}>{stats.totalLeads}</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statLabel}>New Leads</div>
            <div style={s.statValue}>{stats.newLeads}</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statLabel}>Total Value</div>
            <div style={s.statValue}>${(stats.totalValue / 1000000).toFixed(1)}M</div>
          </div>
        </div>

        <div style={s.tabs}>
          <button style={{...s.tab, ...(activeTab === 'overview' ? s.tabActive : {})}} onClick={() => setActiveTab('overview')}>
            Overview
          </button>
          <button style={{...s.tab, ...(activeTab === 'properties' ? s.tabActive : {})}} onClick={() => setActiveTab('properties')}>
            Properties ({stats.totalProperties})
          </button>
          <button style={{...s.tab, ...(activeTab === 'leads' ? s.tabActive : {})}} onClick={() => setActiveTab('leads')}>
            Leads ({stats.totalLeads})
          </button>
        </div>

        {activeTab === 'properties' && (
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Property</th>
                <th style={s.th}>Location</th>
                <th style={s.th}>Price</th>
                <th style={s.th}>Details</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(prop => (
                <tr key={prop.id}>
                  <td style={s.td}>{prop.title}</td>
                  <td style={s.td}>{prop.city}, {prop.region}</td>
                  <td style={s.td}>${prop.price?.toLocaleString()}</td>
                  <td style={s.td}>{prop.beds}BR / {prop.baths}BA / {prop.sqft} sqft</td>
                  <td style={s.td}><span style={getBadgeStyle(prop.status)}>{prop.status}</span></td>
                  <td style={s.td}>
                    <button style={s.btnSmall}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'leads' && (
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Name</th>
                <th style={s.th}>Contact</th>
                <th style={s.th}>Property Interest</th>
                <th style={s.th}>Source</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td style={s.td}>{lead.name || 'Anonymous'}</td>
                  <td style={s.td}>
                    {lead.email && <div> {lead.email}</div>}
                    {lead.phone && <div> {lead.phone}</div>}
                  </td>
                  <td style={s.td}>{lead.propertyTitle || 'General Inquiry'}</td>
                  <td style={s.td}>{lead.capturedFrom || 'website'}</td>
                  <td style={s.td}><span style={getBadgeStyle(lead.status)}>{lead.status}</span></td>
                  <td style={s.td}>
                    <select 
                      value={lead.status} 
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      style={{ padding: '6px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '4px', color: '#fff', fontSize: '12px' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'overview' && (
          <div>
            <div style={{ ...s.statCard, marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', color: '#cba658', marginBottom: '16px' }}> Quick Actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <button style={{ padding: '16px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                   Upload Property
                </button>
                <button style={{ padding: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                   Email All Leads
                </button>
                <button style={{ padding: '16px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                   Export Report
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={s.statCard}>
                <h3 style={{ fontSize: '18px', color: '#cba658', marginBottom: '12px' }}>Recent Leads</h3>
                {leads.slice(0, 5).map(lead => (
                  <div key={lead.id} style={{ padding: '12px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '6px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', color: '#fff', fontWeight: '600' }}>{lead.name || 'Anonymous'}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{lead.email}  {new Date(lead.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>

              <div style={s.statCard}>
                <h3 style={{ fontSize: '18px', color: '#cba658', marginBottom: '12px' }}>Top Properties</h3>
                {properties.slice(0, 5).map(prop => (
                  <div key={prop.id} style={{ padding: '12px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '6px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', color: '#fff', fontWeight: '600' }}>{prop.title}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>${prop.price?.toLocaleString()}  {prop.city}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}