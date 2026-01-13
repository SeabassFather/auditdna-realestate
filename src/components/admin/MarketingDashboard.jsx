import React, { useState, useEffect } from 'react';

const MarketingDashboard = () => {
  const [stats, setStats] = useState({});
  const language = 'en';

  useEffect(() => {
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    const socialPosts = JSON.parse(localStorage.getItem('scheduled_social_posts') || '[]');
    const emailQueue = JSON.parse(localStorage.getItem('email_queue') || '[]');
    const adSubmissions = JSON.parse(localStorage.getItem('ad_submissions') || '[]');
    setStats({
      leads: { total: leads.length, new: leads.filter(l => l.status === 'new').length },
      socialPosts: { scheduled: socialPosts.filter(p => p.status === 'scheduled').length },
      emails: { queued: emailQueue.length, sent: emailQueue.filter(e => e.status === 'sent').length },
      ads: { pending: adSubmissions.filter(a => a.status === 'pending_review').length, approved: adSubmissions.filter(a => a.status === 'approved').length }
    });
  }, []);

  const cardStyle = { background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '24px' };
  const statStyle = { fontSize: '32px', fontWeight: '200', color: '#cba658', marginBottom: '8px' };
  const labelStyle = { fontSize: '10px', color: 'rgba(148, 163, 184, 0.7)', letterSpacing: '2px', textTransform: 'uppercase' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '24px' }}>
      <h2 style={{ color: '#cba658', fontSize: '20px', letterSpacing: '3px', marginBottom: '24px' }}>{language === 'en' ? 'MARKETING COMMAND CENTER' : 'CENTRO DE MARKETING'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={cardStyle}><div style={statStyle}>{stats.leads?.total || 0}</div><div style={labelStyle}>{language === 'en' ? 'Total Leads' : 'Prospectos'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.leads?.new || 0}</div><div style={labelStyle}>{language === 'en' ? 'New Leads' : 'Nuevos'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.socialPosts?.scheduled || 0}</div><div style={labelStyle}>{language === 'en' ? 'Scheduled Posts' : 'Posts'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.emails?.sent || 0}</div><div style={labelStyle}>{language === 'en' ? 'Emails Sent' : 'Correos'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.ads?.pending || 0}</div><div style={labelStyle}>{language === 'en' ? 'Pending Ads' : 'Pendientes'}</div></div>
        <div style={cardStyle}><div style={statStyle}>{stats.ads?.approved || 0}</div><div style={labelStyle}>{language === 'en' ? 'Active Ads' : 'Activos'}</div></div>
      </div>
    </div>
  );
};

export default MarketingDashboard;