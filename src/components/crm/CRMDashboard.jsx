import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import zadarmaService from '../../services/zadarmaService';

export default function CRMDashboard() {
  const { t } = useLanguage();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0 });
  const [callStats, setCallStats] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadLeads();
    loadCallStats();
  }, []);

  const loadLeads = () => {
    const stored = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    setLeads(stored);
    
    const stats = {
      total: stored.length,
      new: stored.filter(l => l.status === 'new').length,
      contacted: stored.filter(l => l.status === 'contacted').length,
      qualified: stored.filter(l => l.status === 'qualified').length
    };
    setStats(stats);
  };

  const loadCallStats = async () => {
    const today = new Date().toISOString().split('T')[0];
    const result = await zadarmaService.getCallStats(today, today);
    if (result.success !== false) {
      setCallStats(result);
    }
  };

  const updateLeadStatus = (index, newStatus) => {
    const updated = [...leads];
    updated[index].status = newStatus;
    updated[index].lastUpdated = new Date().toISOString();
    setLeads(updated);
    localStorage.setItem('crm_leads', JSON.stringify(updated));
    loadLeads();
  };

  const makeCall = async (phone) => {
    await zadarmaService.makeInstantCall(phone);
    alert('Calling ' + phone + ' now!');
  };

  const sendWhatsApp = async (phone, name) => {
    const message = `Hello ${name}! This is AuditDNA Real Estate. Thank you for your inquiry. How can we help you today?`;
    await zadarmaService.sendWhatsApp(phone, message);
    alert('WhatsApp message sent!');
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '40px 24px'
    },
    header: {
      maxWidth: '1400px',
      margin: '0 auto 40px',
      textAlign: 'center'
    },
    title: {
      fontSize: '42px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #cba658, #f5d372)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '16px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      maxWidth: '1400px',
      margin: '0 auto 40px'
    },
    statCard: (color) => ({
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      border: `2px solid ${color}40`,
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'center'
    }),
    statValue: (color) => ({
      fontSize: '48px',
      fontWeight: '700',
      color: color,
      marginBottom: '8px'
    }),
    statLabel: {
      fontSize: '14px',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    filterBar: {
      display: 'flex',
      gap: '12px',
      maxWidth: '1400px',
      margin: '0 auto 24px',
      flexWrap: 'wrap'
    },
    filterBtn: (active) => ({
      padding: '12px 24px',
      background: active ? 'linear-gradient(135deg, #cba658, #b8944d)' : 'rgba(203, 166, 88, 0.1)',
      color: active ? '#0f172a' : '#cba658',
      border: '2px solid rgba(203, 166, 88, 0.3)',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s'
    }),
    leadsGrid: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gap: '16px'
    },
    leadCard: {
      background: 'rgba(15, 23, 42, 0.8)',
      border: '2px solid rgba(203, 166, 88, 0.2)',
      borderRadius: '12px',
      padding: '24px',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '20px',
      alignItems: 'center',
      transition: 'all 0.3s'
    },
    leadInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    leadName: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#f1f5f9'
    },
    leadDetail: {
      fontSize: '13px',
      color: '#94a3b8'
    },
    statusBadge: (status) => {
      const colors = {
        new: '#3b82f6',
        contacted: '#f59e0b',
        qualified: '#10b981',
        closed: '#64748b'
      };
      return {
        padding: '8px 16px',
        background: `${colors[status]}20`,
        color: colors[status],
        border: `2px solid ${colors[status]}`,
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center'
      };
    },
    actionBtn: (color) => ({
      padding: '10px 20px',
      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyContent: 'center'
    }),
    actionGrid: {
      display: 'flex',
      gap: '8px',
      flexDirection: 'column'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}> Advanced CRM Dashboard</h1>
        <p style={{ fontSize: '16px', color: '#94a3b8' }}>
          Powered by Zadarma API + AI Lead Scoring
        </p>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard('#3b82f6')}>
          <div style={styles.statValue('#3b82f6')}>{stats.total}</div>
          <div style={styles.statLabel}>Total Leads</div>
        </div>
        <div style={styles.statCard('#10b981')}>
          <div style={styles.statValue('#10b981')}>{stats.new}</div>
          <div style={styles.statLabel}>New Leads</div>
        </div>
        <div style={styles.statCard('#f59e0b')}>
          <div style={styles.statValue('#f59e0b')}>{stats.contacted}</div>
          <div style={styles.statLabel}>Contacted</div>
        </div>
        <div style={styles.statCard('#8b5cf6')}>
          <div style={styles.statValue('#8b5cf6')}>{stats.qualified}</div>
          <div style={styles.statLabel}>Qualified</div>
        </div>
      </div>

      <div style={styles.filterBar}>
        {['all', 'new', 'contacted', 'qualified'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={styles.filterBtn(filter === f)}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={styles.leadsGrid}>
        {filteredLeads.map((lead, idx) => (
          <div key={idx} style={styles.leadCard}>
            <div style={styles.leadInfo}>
              <div style={styles.leadName}>{lead.name}</div>
              <div style={styles.leadDetail}> {lead.email}</div>
              <div style={styles.leadDetail}> {lead.phone || 'No phone'}</div>
              <div style={styles.leadDetail}> {lead.propertyInterest || 'General inquiry'}</div>
              <div style={styles.leadDetail}> {lead.budgetRange || 'Not specified'}</div>
              <div style={styles.leadDetail}> {lead.language === 'es' ? 'Spanish' : 'English'}</div>
            </div>

            <div style={styles.statusBadge(lead.status)}>
              {lead.status}
            </div>

            <select 
              value={lead.status} 
              onChange={(e) => updateLeadStatus(idx, e.target.value)}
              style={{
                padding: '10px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '2px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '6px',
                color: '#f1f5f9',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
            </select>

            <div style={styles.actionGrid}>
              {lead.phone && (
                <button onClick={() => makeCall(lead.phone)} style={styles.actionBtn('#3b82f6')}>
                   Call Now
                </button>
              )}
              {lead.phone && (
                <button onClick={() => sendWhatsApp(lead.phone, lead.name)} style={styles.actionBtn('#25D366')}>
                   WhatsApp
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}></div>
          <div style={{ fontSize: '18px' }}>No leads found</div>
        </div>
      )}
    </div>
  );
}