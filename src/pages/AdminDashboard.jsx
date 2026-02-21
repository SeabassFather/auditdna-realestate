// =============================================
// ENJOYBAJA ADMIN DASHBOARD - ENHANCED v4.0
// SIDEBAR + TRAINING CENTER + NOTIFICATION CENTER + EMAIL PINGS
// =============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Brain from '../services/Brain';
import EmailMarketing from '../modules/EmailMarketing';

// ========== CONFIG ==========
// ZADARMA: config lives in .env — ZADARMA_API_KEY, ZADARMA_API_SECRET

// CALENDAR: config lives in .env — GOOGLE_CALENDAR_OWNER, GOOGLE_CALENDAR_TEAM

// ========== STYLES ==========
const glassText = {
  fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: '100',
  color: 'rgba(203, 213, 225, 0.85)'
};

const styles = {
  accordion: { background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', marginBottom: '12px', backdropFilter: 'blur(20px)' },
  accordionHeader: { padding: '16px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', transition: 'all 0.2s' },
  accordionContent: { padding: '24px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' },
  statCard: { background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', padding: '16px', textAlign: 'center' },
  button: { padding: '8px 16px', background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.25)', color: 'rgba(148, 163, 184, 0.8)', fontSize: '9px', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: '"Helvetica Neue", sans-serif' },
  buttonPrimary: { background: 'rgba(203, 166, 88, 0.15)', borderColor: 'rgba(203, 166, 88, 0.4)', color: '#cba658' },
  input: { width: '100%', padding: '10px 14px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', color: 'rgba(226, 232, 240, 0.9)', fontSize: '12px', outline: 'none', fontFamily: '"Helvetica Neue", sans-serif', boxSizing: 'border-box' }
};

// ========== SIDEBAR COMPONENT ==========
function Sidebar({ isOpen, toggle, navigate, accessLevel, unreadCount, brainMetrics }) {
  const modules = [
    { icon: '⚡', label: 'Command Center', section: 'command', owner: true },
    { icon: '🧠', label: 'AuditDNA Brain', section: 'auditdna', owner: true, badge: brainMetrics ? `${brainMetrics.completedTasks || 0} AUDITS` : '…' },
    { icon: '🏠', label: 'Properties', section: 'properties', owner: true },
    { icon: '📞', label: 'CRM / PBX', section: 'crm', owner: false },
    { icon: '📅', label: 'Calendar', section: 'calendar', owner: false },
    { icon: '📊', label: 'Marketing', section: 'marketing', owner: true },
    { icon: '📧', label: 'Email Marketing', section: 'email', owner: false },
    { icon: '👥', label: 'Agents', section: 'agents', owner: true },
    { icon: '📈', label: 'Analytics', section: 'analytics', owner: true },
    { icon: '🎓', label: 'Training Center', section: 'training', owner: true },
    { icon: '🔔', label: 'Notifications', section: 'notifications', owner: true, badge: unreadCount > 0 ? `${unreadCount}` : null }
  ];

  const isAdminOrOwner = accessLevel === 'owner' || accessLevel === 'admin';

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: '60px',
      bottom: 0,
      width: isOpen ? '240px' : '0',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(148, 163, 184, 0.2)',
      transition: 'width 0.3s',
      overflow: 'hidden',
      zIndex: 99
    }}>
      <div style={{ padding: '20px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
        <h3 style={{ ...glassText, fontSize: '10px', letterSpacing: '2px', color: '#cba658', marginBottom: '16px' }}>QUICK ACCESS</h3>
        
        {modules.map((m, i) => {
          if (m.owner && !isAdminOrOwner) return null;
          
          return (
            <div
              key={i}
              onClick={() => toggle(m.section)}
              style={{
                padding: '12px 16px',
                marginBottom: '6px',
                background: 'rgba(30, 41, 59, 0.4)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(203, 166, 88, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '16px' }}>{m.icon}</span>
                <span style={{ ...glassText, fontSize: '11px' }}>{m.label}</span>
              </div>
              {m.badge && (
                <span style={{
                  padding: '2px 6px',
                  background: 'rgba(203, 166, 88, 0.2)',
                  border: '1px solid rgba(203, 166, 88, 0.4)',
                  borderRadius: '8px',
                  fontSize: '8px',
                  color: '#cba658'
                }}>
                  {m.badge}
                </span>
              )}
            </div>
          );
        })}

        <div style={{ marginTop: '24px', padding: '12px', background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '6px' }}>
          <p style={{ ...glassText, fontSize: '9px', color: '#cba658', marginBottom: '4px' }}>EMAIL NOTIFICATIONS</p>
          <p style={{ ...glassText, fontSize: '8px', color: '#94a3b8' }}>Pings sent to: sg01@eb.com</p>
        </div>
      </div>
    </div>
  );
}

// ========== NOTIFICATION CENTER ==========
function NotificationCenter({ notifications, setNotifications }) {
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'consumer': return '#60a5fa';
      case 'partner': return '#a78bfa';
      case 'property': return '#4ade80';
      case 'agent': return '#fbbf24';
      case 'audit': return '#cba658';
      case 'complaint': return '#f87171';
      default: return '#94a3b8';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'consumer': return '👤';
      case 'partner': return '🤝';
      case 'property': return '🏠';
      case 'agent': return '👥';
      case 'audit': return '📊';
      case 'complaint': return '⚠️';
      default: return '🔔';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ ...glassText, fontSize: '12px', color: '#cba658', letterSpacing: '2px' }}>REAL-TIME NOTIFICATIONS</h3>
        <button onClick={markAllRead} style={{ ...styles.button, ...styles.buttonPrimary }}>
          MARK ALL READ
        </button>
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            style={{
              padding: '14px',
              marginBottom: '10px',
              background: n.read ? 'rgba(30, 41, 59, 0.3)' : 'rgba(30, 41, 59, 0.6)',
              border: `1px solid ${n.read ? 'rgba(148, 163, 184, 0.1)' : getTypeColor(n.type)}`,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderLeft: `4px solid ${getTypeColor(n.type)}`
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)'}
            onMouseLeave={(e) => e.currentTarget.style.background = n.read ? 'rgba(30, 41, 59, 0.3)' : 'rgba(30, 41, 59, 0.6)'}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px' }}>{getTypeIcon(n.type)}</span>
              <div style={{ flex: 1 }}>
                <p style={{ ...glassText, fontSize: '11px', marginBottom: '4px', fontWeight: n.read ? '100' : '600' }}>
                  {n.message}
                </p>
                <p style={{ ...glassText, fontSize: '9px', color: '#64748b' }}>{n.time}</p>
                {n.email && <p style={{ ...glassText, fontSize: '9px', color: '#94a3b8', marginTop: '4px' }}>📧 {n.email}</p>}
              </div>
              {!n.read && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: getTypeColor(n.type)
                }} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '6px' }}>
        <h4 style={{ ...glassText, fontSize: '10px', color: '#cba658', marginBottom: '8px', letterSpacing: '1px' }}>EMAIL PING SETTINGS</h4>
        <p style={{ ...glassText, fontSize: '9px', color: '#94a3b8', marginBottom: '12px' }}>
          Instant email alerts sent to: <span style={{ color: '#cba658' }}>sg01@eb.com</span>
        </p>
        {[
          'Consumer Signup',
          'Partner Application',
          'Property Upload',
          'Agent Request',
          'Audit Complete',
          'Complaint Filed',
          'Sales Activity',
          'Data Modified'
        ].map((item, i) => (
          <label key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', cursor: 'pointer', alignItems: 'center' }}>
            <input type="checkbox" defaultChecked style={{ width: '14px', height: '14px' }} />
            <span style={{ ...glassText, fontSize: '10px' }}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ========== TRAINING CENTER ==========
function TrainingCenter() {
  const tutorials = [
    {
      title: 'How to Upload Property Photos',
      steps: [
        '1. Go to Property Manager section',
        '2. Click on property or create new one',
        '3. Scroll to PHOTOS section',
        '4. Click "UPLOAD PHOTOS" button',
        '5. Select multiple photos (JPG, PNG)',
        '6. Images auto-upload and appear in grid',
        '7. Drag to reorder, click X to delete',
        '8. First photo becomes main listing photo'
      ],
      tips: [
        '✓ Use high-resolution photos (1920x1080 minimum)',
        '✓ Take photos in good lighting',
        '✓ Show multiple angles of property',
        '✓ Include exterior, interior, amenities',
        '✓ Max 20 photos per property'
      ]
    },
    {
      title: 'Development Property Upload',
      steps: [
        '1. Navigate to Property Manager',
        '2. Switch to "Development" tab',
        '3. Click "+ ADD NEW PROPERTY"',
        '4. Fill required fields: Title, Location, Price',
        '5. Add construction details (beds, baths, sqft)',
        '6. Set completion date',
        '7. Upload floor plans and renderings',
        '8. Add developer contact info',
        '9. Click "ADD PROPERTY"'
      ],
      tips: [
        '✓ Include project timeline',
        '✓ Upload architectural renderings',
        '✓ Specify payment plans available',
        '✓ Add builder/developer credentials'
      ]
    },
    {
      title: 'Agent Management System',
      steps: [
        '1. New agents submit via /agent/register',
        '2. Application appears in "Agents" section',
        '3. Owner reviews credentials',
        '4. Set commission rate (typically 3-6%)',
        '5. Generate unique PIN for agent',
        '6. Click "APPROVE" to grant access',
        '7. Agent receives email with PIN',
        '8. Agent can now upload properties'
      ],
      tips: [
        '✓ Verify real estate license',
        '✓ Check references before approval',
        '✓ Set commission tiers based on performance',
        '✓ Monitor agent activity in Analytics'
      ]
    },
    {
      title: 'Using Zadarma CRM/PBX',
      steps: [
        '1. Click "Call" button next to any contact',
        '2. VoIP dials via Zadarma (+526463402686)',
        '3. Call records save automatically',
        '4. AI transcription processes call',
        '5. SI flags compliance issues',
        '6. Notes auto-sync to CRM',
        '7. View call history in CRM section',
        '8. Analytics track conversion rates'
      ],
      tips: [
        '✓ Use headset for better audio quality',
        '✓ Review AI summaries after calls',
        '✓ Follow up on SI compliance alerts',
        '✓ Tag calls by purpose (inquiry, follow-up, closing)'
      ]
    }
  ];

  const [activeTutorial, setActiveTutorial] = useState(0);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {tutorials.map((t, i) => (
          <div
            key={i}
            onClick={() => setActiveTutorial(i)}
            style={{
              padding: '16px',
              background: activeTutorial === i ? 'rgba(203, 166, 88, 0.15)' : 'rgba(30, 41, 59, 0.4)',
              border: activeTutorial === i ? '1px solid rgba(203, 166, 88, 0.4)' : '1px solid rgba(148, 163, 184, 0.1)',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (activeTutorial !== i) e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
            }}
            onMouseLeave={(e) => {
              if (activeTutorial !== i) e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
            }}
          >
            <p style={{ ...glassText, fontSize: '11px', fontWeight: activeTutorial === i ? '600' : '100', color: activeTutorial === i ? '#cba658' : '#e2e8f0' }}>
              {t.title}
            </p>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', padding: '24px' }}>
        <h3 style={{ ...glassText, fontSize: '14px', color: '#cba658', marginBottom: '16px' }}>
          {tutorials[activeTutorial].title}
        </h3>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ ...glassText, fontSize: '11px', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>STEP-BY-STEP GUIDE</h4>
          {tutorials[activeTutorial].steps.map((step, i) => (
            <p key={i} style={{ ...glassText, fontSize: '11px', marginBottom: '8px', lineHeight: '1.6' }}>
              {step}
            </p>
          ))}
        </div>

        <div>
          <h4 style={{ ...glassText, fontSize: '11px', color: '#94a3b8', marginBottom: '12px', letterSpacing: '1px' }}>PRO TIPS</h4>
          {tutorials[activeTutorial].tips.map((tip, i) => (
            <p key={i} style={{ ...glassText, fontSize: '11px', marginBottom: '8px', color: '#22c55e', lineHeight: '1.6' }}>
              {tip}
            </p>
          ))}
        </div>

        <div style={{ marginTop: '24px', padding: '14px', background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '6px' }}>
          <p style={{ ...glassText, fontSize: '10px', color: '#cba658', marginBottom: '6px' }}>📹 VIDEO TUTORIAL COMING SOON</p>
          <p style={{ ...glassText, fontSize: '9px', color: '#94a3b8' }}>We're recording screen-capture tutorials for each workflow. Check back soon!</p>
        </div>
      </div>
    </div>
  );
}

// ========== ACCORDION COMPONENT ==========
function AccordionSection({ title, subtitle, icon, isOpen, onToggle, badge, locked, children }) {
  return (
    <div style={{ ...styles.accordion, ...(locked ? { opacity: 0.5, pointerEvents: 'none' } : {}) }}>
      <div style={{ ...styles.accordionHeader, background: isOpen ? 'rgba(203, 166, 88, 0.05)' : 'transparent' }} onClick={locked ? undefined : onToggle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '20px' }}>{icon}</span>
          <div>
            <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '2px', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              {title}
              {locked && <span style={{ fontSize: '10px', padding: '2px 8px', background: 'rgba(248, 113, 113, 0.15)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', letterSpacing: '1px' }}>OWNER ONLY</span>}
            </h3>
            {subtitle && <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '4px 0 0' }}>{subtitle}</p>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {badge && <span style={{ ...styles.badge, background: 'rgba(203, 166, 88, 0.15)', color: '#cba658', border: '1px solid rgba(203, 166, 88, 0.3)' }}>{badge}</span>}
          {!locked && <span style={{ ...glassText, fontSize: '18px', color: 'rgba(203, 166, 88, 0.7)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>}
        </div>
      </div>
      {isOpen && !locked && <div style={styles.accordionContent}>{children}</div>}
    </div>
  );
}

// ========== MAIN ADMIN DASHBOARD ==========
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // ── LIVE BRAIN METRICS (81 Niner Miners) ──────────────────
  const [brainMetrics, setBrainMetrics] = useState(null);
  const [brainMiners,  setBrainMiners]  = useState(null);
  const [brainOnline,  setBrainOnline]  = useState(false);

  // ── LIVE DATA FROM ALL BACKEND ROUTES ─────────────────────────────────────
  const [propStats,    setPropStats]    = useState(null);
  const [leadStats,    setLeadStats]    = useState(null);
  const [agentStats,   setAgentStats]   = useState(null);
  const [auditStats,   setAuditStats]   = useState(null);

  useEffect(() => {
    const fetchBrainData = async () => {
      const [status, metrics, miners] = await Promise.all([
        Brain.getStatus(), Brain.getMetrics(), Brain.getMiners()
      ]);
      if (status)  setBrainOnline(true);
      if (metrics) setBrainMetrics(metrics);
      if (miners)  setBrainMiners(miners);

      // Wire all backend routes
      const [props, leads, agents, audits] = await Promise.all([
        Brain.getPropertyStats(),
        Brain.getLeadStats(),
        Brain.getAgentStats(),
        Brain.getAuditStats(),
      ]);
      if (props)  setPropStats(props);
      if (leads)  setLeadStats(leads);
      if (agents) setAgentStats(agents);
      if (audits) setAuditStats(audits);
    };
    fetchBrainData();
    const interval = setInterval(fetchBrainData, 30000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ────────────────────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [accessLevel, setAccessLevel] = useState('sales');
  const [openSections, setOpenSections] = useState({ command: true, auditdna: false, crm: false, properties: false, calendar: false, marketing: false, email: false, agents: false, analytics: false, training: false, notifications: false });
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // NOTIFICATION SYSTEM
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'consumer', message: 'New consumer registered: John Smith', time: '2 min ago', read: false, email: 'john@example.com' },
    { id: 2, type: 'partner', message: 'Partner application: AGENT-4782', time: '15 min ago', read: false, email: 'agent@realestate.com' },
    { id: 3, type: 'property', message: 'New property uploaded: Beachfront Condo Ensenada', time: '1 hr ago', read: true, user: 'sales1' },
    { id: 4, type: 'agent', message: 'Agent pending approval: Maria Garcia', time: '2 hr ago', read: false, email: 'maria@agents.com' },
    { id: 5, type: 'audit', message: 'Audit completed: AUD-00127 ($14,250 recovery)', time: '3 hr ago', read: true },
    { id: 6, type: 'complaint', message: 'CFPB complaint filed: CFPB-2026-0234', time: '5 hr ago', read: false }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const level = sessionStorage.getItem('admin_access_level') || (sessionStorage.getItem('sales_access_level') ? 'sales' : 'sales');
    setAccessLevel(level);
    // Sales: Upload (properties) + Email Marketing + CRM — nothing else
    if (level === 'sales' || user?.role === 'sales') setOpenSections({ command: false, auditdna: false, crm: true, properties: true, calendar: false, marketing: false, email: true, agents: false, analytics: false, training: false, notifications: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const h = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (s) => {
    if ((accessLevel === 'sales' || isSales) && !['crm', 'email', 'properties'].includes(s)) return;
    setOpenSections(p => ({ ...p, [s]: !p[s] }));
    
    // Auto-scroll to section
    setTimeout(() => {
      const el = document.getElementById(`section-${s}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleLogout = () => { sessionStorage.removeItem('admin_access_level'); sessionStorage.removeItem('sales_access_level'); logout(); navigate('/'); };
  const isAdminOrOwner = accessLevel === 'owner' || accessLevel === 'admin';
  const isSales = user?.role === 'sales';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', position: 'relative' }}>
      {/* SIDEBAR — visible to owner AND admin */}
      {isAdminOrOwner && <Sidebar isOpen={sidebarOpen} toggle={toggle} navigate={navigate} accessLevel={accessLevel} unreadCount={unreadCount} brainMetrics={brainMetrics} />}

      {/* TOP NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '16px 48px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(203,166,88,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {isAdminOrOwner && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ ...styles.button, ...styles.buttonPrimary }}>
              {sidebarOpen ? '◀' : '▶'} MENU
            </button>
          )}
          <div onClick={() => navigate('/')} style={{ ...glassText, fontSize: '11px', letterSpacing: '4px', color: 'rgba(203,166,88,0.9)', cursor: 'pointer' }}>ENJOY BAJA</div>
          <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', padding: '4px 12px', background: 'rgba(203,166,88,0.1)', border: '1px solid rgba(203,166,88,0.2)' }}>{accessLevel === 'owner' ? 'OWNER ACCESS' : isAdminOrOwner ? 'ADMIN ACCESS' : 'SALES ACCESS'}</div>
          {isAdminOrOwner && unreadCount > 0 && (
            <div onClick={() => toggle('notifications')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(96, 165, 250, 0.15)', border: '1px solid rgba(96, 165, 250, 0.3)', borderRadius: '12px', cursor: 'pointer' }}>
              <span>🔔</span>
              <span style={{ ...glassText, fontSize: '9px', color: '#60a5fa' }}>{unreadCount} NEW</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.7)' }}>{user?.name||user?.email}</span>
          <button onClick={handleLogout} style={{ ...styles.button, background: 'rgba(248, 113, 113, 0.15)', borderColor: 'rgba(248, 113, 113, 0.4)', color: 'rgba(248, 113, 113, 0.9)' }}>LOGOUT</button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, padding: '100px 48px 60px', paddingLeft: isAdminOrOwner && sidebarOpen ? '288px' : '48px', maxWidth: '1600px', margin: '0 auto', transition: 'padding-left 0.3s' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ ...glassText, fontSize: '32px', letterSpacing: '6px', marginBottom: '8px', color: 'rgba(226,232,240,0.9)' }}>{accessLevel === 'owner' ? 'ADMIN COMMAND CENTER' : isAdminOrOwner ? 'ADMIN DASHBOARD' : 'SALES DASHBOARD'}</h1>
          <p style={{ ...glassText, fontSize: '10px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)' }}>{accessLevel === 'owner' ? 'FULL ACCESS • SIDEBAR NAVIGATION • TRAINING CENTER • NOTIFICATIONS' : isAdminOrOwner ? 'ADMIN ACCESS • ALL MODULES EXCEPT OWNER-ONLY' : 'PROPERTY UPLOAD • EMAIL MARKETING • CRM'}</p>
        </div>

        {/* ACCORDION SECTIONS */}
        <div id="section-command">
          {accessLevel === 'owner' && (
            <AccordionSection title="COMMAND CENTER" subtitle="All Modules • Quick Actions" icon="⚡" isOpen={openSections.command} onToggle={() => toggle('command')}>
              <p style={{ ...glassText, fontSize: '11px' }}>Command Center content here...</p>
            </AccordionSection>
          )}
        </div>

        <div id="section-auditdna">
          {accessLevel === 'owner' && (
            <AccordionSection title="AUDITDNA BRAIN" subtitle="Live Audits • Consumers • Partners • Complaints • AI/SI" icon="🧠" isOpen={openSections.auditdna} onToggle={() => toggle('auditdna')} badge={brainMetrics ? `${brainMetrics.completedTasks || 0} AUDITS` : 'LIVE'}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'BRAIN STATUS',    value: brainOnline ? '🟢 ONLINE' : '🔴 OFFLINE' },
                  { label: 'TOTAL TASKS',      value: brainMetrics?.totalTasks     ?? '—' },
                  { label: 'COMPLETED',        value: brainMetrics?.completedTasks ?? '—' },
                  { label: 'ACTIVE NOW',       value: brainMetrics?.activeTasks    ?? '—' },
                  { label: 'AVG RESPONSE',     value: brainMetrics?.avgResponseTime ? `${brainMetrics.avgResponseTime}ms` : '—' },
                  { label: 'NINER MINERS',     value: '81 ACTIVE' }
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(148,163,184,0.15)', padding: '14px', textAlign: 'center' }}>
                    <div style={{ ...glassText, fontSize: '8px', letterSpacing: '2px', color: 'rgba(148,163,184,0.5)', marginBottom: '6px' }}>{stat.label}</div>
                    <div style={{ ...glassText, fontSize: '18px', color: '#cba658', fontWeight: '200' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              {brainMiners && (
                <div>
                  <p style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: 'rgba(203,166,88,0.7)', marginBottom: '12px' }}>MINER TEAMS</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                    {Object.entries(brainMiners).map(([team, miners]) => (
                      <div key={team} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.1)', padding: '10px' }}>
                        <div style={{ ...glassText, fontSize: '8px', color: '#cba658', letterSpacing: '1px', marginBottom: '6px', textTransform: 'uppercase' }}>
                          {team.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        {Array.isArray(miners) && miners.map((m, i) => (
                          <div key={i} style={{ ...glassText, fontSize: '9px', color: 'rgba(148,163,184,0.6)', padding: '2px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{m.name}</span>
                            <span style={{ color: m.status === 'ACTIVE' ? '#86efac' : '#fca5a5' }}>{m.status}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AccordionSection>
          )}
        </div>

        <div id="section-training">
          {accessLevel === 'owner' && (
            <AccordionSection title="TRAINING CENTER" subtitle="Photo Upload Tutorials • System Guides • Best Practices" icon="🎓" isOpen={openSections.training} onToggle={() => toggle('training')}>
              <TrainingCenter />
            </AccordionSection>
          )}
        </div>

        <div id="section-notifications">
          {accessLevel === 'owner' && (
            <AccordionSection title="NOTIFICATION CENTER" subtitle="Real-Time Alerts • Email Pings • Activity Feed" icon="🔔" isOpen={openSections.notifications} onToggle={() => toggle('notifications')} badge={unreadCount > 0 ? `${unreadCount} NEW` : null}>
              <NotificationCenter notifications={notifications} setNotifications={setNotifications} />
            </AccordionSection>
          )}
        </div>

        {/* PROPERTIES */}
        <div id="section-properties">
          {(isAdminOrOwner || isSales) && (
            <AccordionSection title="PROPERTIES" subtitle="Listings • FSBO • Agent Uploads • Admin Uploads" icon="🏠" isOpen={openSections.properties} onToggle={() => toggle('properties')}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'TOTAL LISTINGS', value: propStats?.total ?? '—' },
                  { label: 'FSBO', value: propStats?.fsbo ?? '—' },
                  { label: 'AGENT UPLOADS', value: propStats?.agentUploads ?? '—' },
                  { label: 'PENDING REVIEW', value: propStats?.pending ?? '—' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(203,166,88,0.05)', border: '1px solid rgba(203,166,88,0.2)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(203,166,88,0.7)', marginBottom: '8px' }}>{stat.label}</div>
                    <div style={{ fontSize: '24px', color: '#f8f6f1', fontWeight: '300' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/admin/property-upload')} style={{ ...styles.button, ...styles.buttonPrimary }}>MANAGE LISTINGS</button>
            </AccordionSection>
          )}
        </div>

        {/* CRM / PBX */}
        <div id="section-crm">
          <AccordionSection title="CRM / PBX" subtitle="Leads • Calls • Pipeline • Zadarma" icon="📞" isOpen={openSections.crm} onToggle={() => toggle('crm')}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              {[
                { label: 'TOTAL LEADS', value: leadStats?.total ?? '—' },
                { label: 'HOT', value: leadStats?.hot ?? '—' },
                { label: 'CALLS TODAY', value: leadStats?.callsToday ?? '—' },
                { label: 'PIPELINE', value: leadStats?.pipeline ?? '—' },
              ].map((stat, i) => (
                <div key={i} style={{ background: 'rgba(203,166,88,0.05)', border: '1px solid rgba(203,166,88,0.2)', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(203,166,88,0.7)', marginBottom: '8px' }}>{stat.label}</div>
                  <div style={{ fontSize: '24px', color: '#f8f6f1', fontWeight: '300' }}>{stat.value}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/admin/crm')} style={{ ...styles.button, ...styles.buttonPrimary }}>OPEN CRM SYSTEM</button>
          </AccordionSection>
        </div>

        {/* CALENDAR */}
        <div id="section-calendar">
          <AccordionSection title="CALENDAR" subtitle="Ad Schedule • Bookings • Events" icon="📅" isOpen={openSections.calendar} onToggle={() => toggle('calendar')}>
            <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(248,246,241,0.5)', fontSize: '13px' }}>
              Ad calendar and scheduling system
            </div>
            <button onClick={() => navigate('/admin/calendar')} style={{ ...styles.button, ...styles.buttonPrimary }}>OPEN AD CALENDAR</button>
          </AccordionSection>
        </div>

        {/* MARKETING */}
        <div id="section-marketing">
          {isAdminOrOwner && (
            <AccordionSection title="MARKETING" subtitle="Campaigns • Ads • Magazine • Analytics" icon="📊" isOpen={openSections.marketing} onToggle={() => toggle('marketing')}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <button onClick={() => navigate('/admin/marketing')} style={{ ...styles.button, ...styles.buttonPrimary }}>MARKETING DASHBOARD</button>
                <button onClick={() => navigate('/admin/ads')} style={{ ...styles.button }}>AD MANAGEMENT</button>
                <button onClick={() => navigate('/admin/magazine')} style={{ ...styles.button }}>MAGAZINE EDITOR</button>
                <button onClick={() => navigate('/admin/calendar')} style={{ ...styles.button }}>AD CALENDAR</button>
              </div>
            </AccordionSection>
          )}
        </div>

        {/* EMAIL MARKETING COMMAND CENTER */}
        <div id="section-email">
          <AccordionSection
            title="EMAIL MARKETING"
            subtitle="Bulk Email • CSV Upload • Video/Voice • AI Miners • Scheduler • Multi-Channel"
            icon="📧"
            isOpen={openSections.email}
            onToggle={() => toggle('email')}
          >
            <div style={{ margin: '-24px', overflow: 'hidden' }}>
              <EmailMarketing />
            </div>
          </AccordionSection>
        </div>

        {/* AGENTS */}
        <div id="section-agents">
          {isAdminOrOwner && (
            <AccordionSection title="AGENTS" subtitle="Roster • Vetting • Commission • Performance" icon="👥" isOpen={openSections.agents} onToggle={() => toggle('agents')}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'TOTAL AGENTS', value: agentStats?.total ?? '—' },
                  { label: 'ACTIVE', value: agentStats?.active ?? '—' },
                  { label: 'PENDING VETTING', value: agentStats?.pending ?? '—' },
                  { label: 'IN-HOUSE', value: agentStats?.inHouse ?? '—' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(203,166,88,0.05)', border: '1px solid rgba(203,166,88,0.2)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(203,166,88,0.7)', marginBottom: '8px' }}>{stat.label}</div>
                    <div style={{ fontSize: '24px', color: '#f8f6f1', fontWeight: '300' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/admin/vetting')} style={{ ...styles.button, ...styles.buttonPrimary }}>VETTING PANEL</button>
                <button onClick={() => navigate('/admin/users')} style={{ ...styles.button }}>USER MANAGEMENT</button>
              </div>
            </AccordionSection>
          )}
        </div>

        {/* ANALYTICS */}
        <div id="section-analytics">
          {isAdminOrOwner && (
            <AccordionSection title="ANALYTICS" subtitle="Traffic • Leads • Revenue • Brain Performance" icon="📈" isOpen={openSections.analytics} onToggle={() => toggle('analytics')}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'PAGE VIEWS', value: propStats?.views ?? '—' },
                  { label: 'LEAD CONV.', value: leadStats?.convRate ?? '—' },
                  { label: 'BRAIN OPS', value: brainMetrics?.completedTasks ?? '—' },
                  { label: 'AUDITS', value: auditStats?.total ?? '—' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(203,166,88,0.05)', border: '1px solid rgba(203,166,88,0.2)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(203,166,88,0.7)', marginBottom: '8px' }}>{stat.label}</div>
                    <div style={{ fontSize: '24px', color: '#f8f6f1', fontWeight: '300' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/admin/marketing')} style={{ ...styles.button, ...styles.buttonPrimary }}>FULL ANALYTICS</button>
            </AccordionSection>
          )}
        </div>

      </div>
    </div>
  );
}
