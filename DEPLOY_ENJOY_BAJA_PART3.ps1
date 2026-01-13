# =====================================================================
# ENJOYBAJA MARKETING AUTOMATION - PART 3/3
# Self-Service Ads, Orchestrator, Marketing Dashboard
# =====================================================================

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   ENJOYBAJA MARKETING AUTOMATION - PART 3/3" -ForegroundColor Yellow
Write-Host "   Self-Service Ads + Orchestrator + Admin Dashboard" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan

$basePath = "C:\AuditDNA\auditdna-frontend\src"
$agentsPath = "$basePath\agents"
$componentsPath = "$basePath\components"
$adminPath = "$componentsPath\admin"

# =====================================================================
# FILE 7: AGENT ORCHESTRATOR
# =====================================================================
Write-Host "🎛️ Creating AgentOrchestrator.js..." -ForegroundColor Yellow

$orchestrator = @'
import { socialMediaAgent } from './SocialMediaAgent';
import { emailMarketingAgent } from './EmailMarketingAgent';
import { notificationAgent } from './NotificationAgent';

class AgentOrchestrator {
  constructor() {
    this.agents = { social: socialMediaAgent, email: emailMarketingAgent, notification: notificationAgent };
    this.isRunning = false;
  }

  initialize() {
    this.isRunning = true;
    setInterval(() => this.agents.email.processScheduledEmails(), 5 * 60 * 1000);
    return this.getStatus();
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      agents: Object.fromEntries(Object.entries(this.agents).map(([n, a]) => [n, a.getStatus()]))
    };
  }

  async onUserRegistration(user, lang = 'en') {
    await this.agents.email.sendEmail(user.email, 'welcome', { firstName: user.firstName }, lang);
    this.agents.email.startDripSequence(user, 'newLead');
    this.agents.notification.createNotification('welcome', { en: 'Welcome!', es: '¡Bienvenido!' }, {}, lang);
    return { success: true };
  }

  async onNewListing(property, lang = 'en') {
    const postEN = this.agents.social.generatePost('newListing', property, 'en', 'facebook');
    const postES = this.agents.social.generatePost('newListing', property, 'es', 'facebook');
    await this.agents.social.schedulePost(postEN, new Date(Date.now() + 3600000), ['facebook', 'instagram'], ['usa']);
    await this.agents.social.schedulePost(postES, new Date(Date.now() + 7200000), ['facebook', 'instagram'], ['mexico']);
    return { success: true };
  }

  async onPriceReduction(property, oldPrice, newPrice, lang = 'en') {
    const data = { ...property, oldPrice: `$${oldPrice.toLocaleString()}`, newPrice: `$${newPrice.toLocaleString()}` };
    const post = this.agents.social.generatePost('priceReduction', data, lang, 'facebook');
    await this.agents.social.schedulePost(post, new Date());
    return { success: true };
  }

  async onAdSubmission(ad, lang = 'en') {
    this.agents.notification.createNotification('ad_submission', { en: `New ad: ${ad.content.businessName}`, es: `Nuevo anuncio: ${ad.content.businessName}` }, {}, lang);
    return { success: true };
  }

  async onMagazineFeature(feature, lang = 'en') {
    const post = this.agents.social.generatePost('magazineFeature', feature, lang, 'facebook');
    await this.agents.social.schedulePost(post, new Date(Date.now() + 3600000));
    return { success: true };
  }

  async onCollectionListing(item, lang = 'en') {
    const post = this.agents.social.generatePost('luxuryCollection', item, lang, 'instagram');
    await this.agents.social.schedulePost(post, new Date(Date.now() + 3600000));
    return { success: true };
  }
}

export const orchestrator = new AgentOrchestrator();
export default orchestrator;
'@

Set-Content -Path "$agentsPath\AgentOrchestrator.js" -Value $orchestrator -Encoding UTF8
Write-Host "  ✅ AgentOrchestrator.js" -ForegroundColor Green

# =====================================================================
# FILE 8: AGENTS INDEX
# =====================================================================
Write-Host "📦 Creating agents/index.js..." -ForegroundColor Yellow

$agentsIndex = @'
export { socialMediaAgent } from './SocialMediaAgent';
export { emailMarketingAgent } from './EmailMarketingAgent';
export { notificationAgent } from './NotificationAgent';
export { orchestrator } from './AgentOrchestrator';
'@

Set-Content -Path "$agentsPath\index.js" -Value $agentsIndex -Encoding UTF8
Write-Host "  ✅ agents/index.js" -ForegroundColor Green

# =====================================================================
# FILE 9: LANGUAGE TOGGLE COMPONENT
# =====================================================================
Write-Host "🌐 Creating LanguageToggle.jsx..." -ForegroundColor Yellow

$langToggle = @'
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = ({ style = {}, compact = false }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage} style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: compact ? '6px 12px' : '8px 16px',
      background: 'rgba(203, 166, 88, 0.15)',
      border: '1px solid rgba(203, 166, 88, 0.3)',
      borderRadius: '4px', cursor: 'pointer',
      fontSize: compact ? '10px' : '11px', letterSpacing: '2px', color: '#cba658',
      ...style
    }}>
      <span style={{ fontSize: '14px' }}>🌐</span>
      <span>{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
};

export default LanguageToggle;
'@

Set-Content -Path "$componentsPath\LanguageToggle.jsx" -Value $langToggle -Encoding UTF8
Write-Host "  ✅ LanguageToggle.jsx" -ForegroundColor Green

# =====================================================================
# FILE 10: MARKETING DASHBOARD (ADMIN)
# =====================================================================
Write-Host "📊 Creating MarketingDashboard.jsx..." -ForegroundColor Yellow

$marketingDashboard = @'
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { orchestrator } from '../../agents';
import { crmService } from '../../services/CRMService';

const MarketingDashboard = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});

  useEffect(() => {
    const agentStats = orchestrator.getStatus();
    const leadStats = crmService.getLeadAnalytics();
    const socialPosts = JSON.parse(localStorage.getItem('scheduled_social_posts') || '[]');
    const emailQueue = JSON.parse(localStorage.getItem('email_queue') || '[]');
    const adSubmissions = JSON.parse(localStorage.getItem('ad_submissions') || '[]');
    
    setStats({
      agents: agentStats,
      leads: leadStats,
      socialPosts: { scheduled: socialPosts.filter(p => p.status === 'scheduled').length, published: socialPosts.filter(p => p.status === 'published').length },
      emails: { queued: emailQueue.filter(e => e.status === 'queued').length, sent: emailQueue.filter(e => e.status !== 'queued').length },
      ads: { pending: adSubmissions.filter(a => a.status === 'pending_review').length, approved: adSubmissions.filter(a => a.status === 'approved').length }
    });
  }, []);

  const cardStyle = { background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '24px' };
  const statStyle = { fontSize: '32px', fontWeight: '200', color: '#cba658', marginBottom: '8px' };
  const labelStyle = { fontSize: '10px', color: 'rgba(148, 163, 184, 0.7)', letterSpacing: '2px', textTransform: 'uppercase' };

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Resumen' },
    { id: 'leads', label: language === 'en' ? 'Leads' : 'Prospectos' },
    { id: 'social', label: language === 'en' ? 'Social Media' : 'Redes Sociales' },
    { id: 'email', label: language === 'en' ? 'Email' : 'Correo' },
    { id: 'ads', label: language === 'en' ? 'Ads/Magazine' : 'Anuncios/Revista' }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ color: '#cba658', fontSize: '20px', letterSpacing: '3px', marginBottom: '24px' }}>
        {language === 'en' ? 'MARKETING COMMAND CENTER' : 'CENTRO DE COMANDO DE MARKETING'}
      </h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(148, 163, 184, 0.2)', paddingBottom: '12px' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '10px 20px', background: activeTab === tab.id ? 'rgba(203, 166, 88, 0.2)' : 'transparent',
            border: activeTab === tab.id ? '1px solid rgba(203, 166, 88, 0.5)' : '1px solid transparent',
            color: activeTab === tab.id ? '#cba658' : 'rgba(148, 163, 184, 0.7)',
            fontSize: '11px', letterSpacing: '2px', cursor: 'pointer'
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={cardStyle}>
            <div style={statStyle}>{stats.leads?.total || 0}</div>
            <div style={labelStyle}>{language === 'en' ? 'Total Leads' : 'Total Prospectos'}</div>
          </div>
          <div style={cardStyle}>
            <div style={statStyle}>{stats.leads?.hotLeads || 0}</div>
            <div style={labelStyle}>{language === 'en' ? 'Hot Leads' : 'Prospectos Calientes'}</div>
          </div>
          <div style={cardStyle}>
            <div style={statStyle}>{stats.socialPosts?.scheduled || 0}</div>
            <div style={labelStyle}>{language === 'en' ? 'Scheduled Posts' : 'Posts Programados'}</div>
          </div>
          <div style={cardStyle}>
            <div style={statStyle}>{stats.emails?.sent || 0}</div>
            <div style={labelStyle}>{language === 'en' ? 'Emails Sent' : 'Correos Enviados'}</div>
          </div>
          <div style={cardStyle}>
            <div style={statStyle}>{stats.ads?.pending || 0}</div>
            <div style={labelStyle}>{language === 'en' ? 'Pending Ads' : 'Anuncios Pendientes'}</div>
          </div>
          <div style={cardStyle}>
            <div style={statStyle}>{stats.leads?.conversionRate || 0}%</div>
            <div style={labelStyle}>{language === 'en' ? 'Conversion Rate' : 'Tasa de Conversión'}</div>
          </div>
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={cardStyle}><div style={statStyle}>{stats.leads?.byStatus?.new || 0}</div><div style={labelStyle}>New</div></div>
            <div style={cardStyle}><div style={statStyle}>{stats.leads?.byStatus?.contacted || 0}</div><div style={labelStyle}>Contacted</div></div>
            <div style={cardStyle}><div style={statStyle}>{stats.leads?.byStatus?.qualified || 0}</div><div style={labelStyle}>Qualified</div></div>
            <div style={cardStyle}><div style={statStyle}>{stats.leads?.byStatus?.won || 0}</div><div style={labelStyle}>Won</div></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={cardStyle}>
              <h3 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{language === 'en' ? 'USA Leads' : 'Prospectos USA'}</h3>
              <div style={statStyle}>{stats.leads?.bySegment?.usa || 0}</div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{language === 'en' ? 'Mexico Leads' : 'Prospectos México'}</h3>
              <div style={statStyle}>{stats.leads?.bySegment?.mexico || 0}</div>
            </div>
          </div>
        </div>
      )}

      {/* Social Tab */}
      {activeTab === 'social' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>📘</div>
            <div style={labelStyle}>Facebook</div>
            <div style={{ color: '#e2e8f0', marginTop: '8px' }}>{language === 'en' ? 'Connected' : 'Conectado'}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>📸</div>
            <div style={labelStyle}>Instagram</div>
            <div style={{ color: '#e2e8f0', marginTop: '8px' }}>{language === 'en' ? 'Connected' : 'Conectado'}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>📺</div>
            <div style={labelStyle}>YouTube</div>
            <div style={{ color: '#e2e8f0', marginTop: '8px' }}>{language === 'en' ? 'Connected' : 'Conectado'}</div>
          </div>
        </div>
      )}

      {/* Email Tab */}
      {activeTab === 'email' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={cardStyle}>
            <h3 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{language === 'en' ? 'Email Queue' : 'Cola de Correos'}</h3>
            <div style={statStyle}>{stats.emails?.queued || 0}</div>
            <div style={labelStyle}>{language === 'en' ? 'Pending' : 'Pendientes'}</div>
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{language === 'en' ? 'Active Campaigns' : 'Campañas Activas'}</h3>
            <div style={statStyle}>{stats.agents?.agents?.email?.campaignsActive || 0}</div>
            <div style={labelStyle}>{language === 'en' ? 'Drip Sequences' : 'Secuencias'}</div>
          </div>
        </div>
      )}

      {/* Ads Tab */}
      {activeTab === 'ads' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={cardStyle}>
            <h3 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{language === 'en' ? 'Pending Review' : 'Pendientes de Revisión'}</h3>
            <div style={statStyle}>{stats.ads?.pending || 0}</div>
            <button style={{ marginTop: '16px', padding: '10px 20px', background: 'rgba(203, 166, 88, 0.2)', border: '1px solid rgba(203, 166, 88, 0.5)', color: '#cba658', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer' }}>
              {language === 'en' ? 'REVIEW NOW' : 'REVISAR'}
            </button>
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{language === 'en' ? 'Active Ads' : 'Anuncios Activos'}</h3>
            <div style={statStyle}>{stats.ads?.approved || 0}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingDashboard;
'@

Set-Content -Path "$adminPath\MarketingDashboard.jsx" -Value $marketingDashboard -Encoding UTF8
Write-Host "  ✅ MarketingDashboard.jsx" -ForegroundColor Green

# =====================================================================
# FILE 11: AD MANAGEMENT PANEL
# =====================================================================
Write-Host "📰 Creating AdManagementPanel.jsx..." -ForegroundColor Yellow

$adManagement = @'
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const AdManagementPanel = () => {
  const { language } = useLanguage();
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setSubmissions(JSON.parse(localStorage.getItem('ad_submissions') || '[]'));
  }, []);

  const updateStatus = (id, status) => {
    const updated = submissions.map(ad => ad.id === id ? { ...ad, status, reviewedAt: new Date().toISOString() } : ad);
    setSubmissions(updated);
    localStorage.setItem('ad_submissions', JSON.stringify(updated));
  };

  const filtered = submissions.filter(ad => filter === 'all' || ad.status === filter);
  const getStatusColor = (s) => s === 'approved' ? '#4ade80' : s === 'rejected' ? '#f87171' : '#fbbf24';

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ color: '#cba658', fontSize: '20px', letterSpacing: '3px', marginBottom: '24px' }}>
        {language === 'en' ? 'AD MANAGEMENT' : 'GESTIÓN DE ANUNCIOS'}
      </h2>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {['all', 'pending_review', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '10px 20px', background: filter === f ? 'rgba(203, 166, 88, 0.2)' : 'transparent',
            border: `1px solid ${filter === f ? 'rgba(203, 166, 88, 0.5)' : 'rgba(148, 163, 184, 0.3)'}`,
            color: filter === f ? '#cba658' : 'rgba(148, 163, 184, 0.7)', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase'
          }}>
            {f === 'all' ? 'All' : f === 'pending_review' ? 'Pending' : f.charAt(0).toUpperCase() + f.slice(1)}
            ({submissions.filter(ad => f === 'all' || ad.status === f).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(148, 163, 184, 0.6)' }}>
          {language === 'en' ? 'No submissions' : 'Sin envíos'}
        </div>
      ) : (
        filtered.map(ad => (
          <div key={ad.id} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ color: '#e2e8f0', fontSize: '16px', margin: 0 }}>{ad.content.businessName}</h3>
                  <span style={{ fontSize: '9px', padding: '4px 8px', background: `${getStatusColor(ad.status)}20`, color: getStatusColor(ad.status), borderRadius: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {ad.status.replace('_', ' ')}
                  </span>
                </div>
                <p style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '14px', margin: '0 0 8px 0' }}>{ad.content.headline}</p>
                <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '12px', margin: 0 }}>
                  Package: <strong>{ad.package?.toUpperCase()}</strong> | ${ad.amount?.toLocaleString()} | {new Date(ad.submittedAt).toLocaleDateString()}
                </p>
              </div>
              {ad.status === 'pending_review' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => updateStatus(ad.id, 'approved')} style={{ padding: '10px 20px', background: 'rgba(74, 222, 128, 0.2)', border: '1px solid rgba(74, 222, 128, 0.5)', color: '#4ade80', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer' }}>✓ APPROVE</button>
                  <button onClick={() => updateStatus(ad.id, 'rejected')} style={{ padding: '10px 20px', background: 'rgba(248, 113, 113, 0.2)', border: '1px solid rgba(248, 113, 113, 0.5)', color: '#f87171', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer' }}>✗ REJECT</button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdManagementPanel;
'@

Set-Content -Path "$adminPath\AdManagementPanel.jsx" -Value $adManagement -Encoding UTF8
Write-Host "  ✅ AdManagementPanel.jsx" -ForegroundColor Green

# =====================================================================
# COMPLETION
# =====================================================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "   ✅ ALL 3 PARTS COMPLETE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "FILES CREATED:" -ForegroundColor Yellow
Write-Host "  contexts/LanguageContext.jsx" -ForegroundColor Cyan
Write-Host "  services/CRMService.js" -ForegroundColor Cyan
Write-Host "  agents/SocialMediaAgent.js" -ForegroundColor Cyan
Write-Host "  agents/EmailMarketingAgent.js" -ForegroundColor Cyan
Write-Host "  agents/NotificationAgent.js" -ForegroundColor Cyan
Write-Host "  agents/AgentOrchestrator.js" -ForegroundColor Cyan
Write-Host "  agents/index.js" -ForegroundColor Cyan
Write-Host "  components/LanguageToggle.jsx" -ForegroundColor Cyan
Write-Host "  components/LeadCaptureForm.jsx" -ForegroundColor Cyan
Write-Host "  components/SelfServiceAdPortal.jsx" -ForegroundColor Cyan
Write-Host "  components/admin/MarketingDashboard.jsx" -ForegroundColor Cyan
Write-Host "  components/admin/AdManagementPanel.jsx" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT: Update App.js with routes and wrap with LanguageProvider" -ForegroundColor Yellow
Write-Host ""

Start-Process explorer.exe $basePath