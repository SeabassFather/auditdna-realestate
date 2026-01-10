// =============================================
// ENJOYBAJA ADMIN DASHBOARD - TIERED ACCESS
// OWNER: Full Access | SALES: CRM + Shared Calendar
// =============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ========== ZADARMA CONFIG ==========
const ZADARMA_CONFIG = {
  apiKey: '5765aborv0pw9ylc',
  apiSecret: '1fa016d4b2e7b173c188',
  baseUrl: 'https://api.zadarma.com',
  pbxNumber: '+526463402686'
};

// ========== CALENDAR CONFIG ==========
const CALENDAR_CONFIG = {
  ownerPrivate: 'sgarcia1911@gmail.com',
  teamShared: '982168e401754cc327337c323863b6c8de38ed85f70c04a620b6d593bd478d05@group.calendar.google.com'
};

// ========== STYLES ==========
const glassText = {
  fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: '100',
  color: 'rgba(203, 213, 225, 0.85)'
};

const styles = {
  accordion: {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    marginBottom: '12px',
    backdropFilter: 'blur(20px)'
  },
  accordionHeader: {
    padding: '16px 24px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    transition: 'all 0.2s'
  },
  accordionContent: {
    padding: '24px',
    borderTop: '1px solid rgba(148, 163, 184, 0.1)'
  },
  statCard: {
    background: 'rgba(30, 41, 59, 0.4)',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    padding: '16px',
    textAlign: 'center'
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
    fontFamily: '"Helvetica Neue", sans-serif'
  },
  buttonPrimary: {
    background: 'rgba(203, 166, 88, 0.15)',
    borderColor: 'rgba(203, 166, 88, 0.4)',
    color: '#cba658'
  },
  buttonSuccess: {
    background: 'rgba(74, 222, 128, 0.15)',
    borderColor: 'rgba(74, 222, 128, 0.4)',
    color: 'rgba(74, 222, 128, 0.9)'
  },
  buttonDanger: {
    background: 'rgba(248, 113, 113, 0.15)',
    borderColor: 'rgba(248, 113, 113, 0.4)',
    color: 'rgba(248, 113, 113, 0.9)'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    color: 'rgba(226, 232, 240, 0.9)',
    fontSize: '12px',
    outline: 'none',
    fontFamily: '"Helvetica Neue", sans-serif'
  },
  th: {
    textAlign: 'left',
    padding: '12px 14px',
    fontSize: '8px',
    color: 'rgba(148, 163, 184, 0.6)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
  },
  td: {
    padding: '12px 14px',
    fontSize: '11px',
    color: 'rgba(203, 213, 225, 0.8)',
    borderBottom: '1px solid rgba(148, 163, 184, 0.05)'
  },
  badge: {
    display: 'inline-block',
    padding: '3px 8px',
    fontSize: '8px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  lockedSection: {
    position: 'relative',
    opacity: 0.4,
    pointerEvents: 'none',
    filter: 'blur(2px)'
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(15, 23, 42, 0.7)',
    zIndex: 10
  }
};

// ========== ACCORDION COMPONENT ==========
function AccordionSection({ title, subtitle, icon, isOpen, onToggle, badge, locked, children }) {
  return (
    <div style={{
      ...styles.accordion,
      ...(locked ? { opacity: 0.5, pointerEvents: 'none' } : {})
    }}>
      <div 
        style={{
          ...styles.accordionHeader,
          background: isOpen ? 'rgba(203, 166, 88, 0.05)' : 'transparent'
        }}
        onClick={locked ? undefined : onToggle}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '20px' }}>{icon}</span>
          <div>
            <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '2px', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              {title}
              {locked && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  background: 'rgba(248, 113, 113, 0.15)',
                  border: '1px solid rgba(248, 113, 113, 0.3)',
                  color: '#f87171',
                  letterSpacing: '1px'
                }}>
                  🔒 OWNER ONLY
                </span>
              )}
            </h3>
            {subtitle && (
              <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '4px 0 0' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {badge && (
            <span style={{
              ...styles.badge,
              background: 'rgba(203, 166, 88, 0.15)',
              color: '#cba658',
              border: '1px solid rgba(203, 166, 88, 0.3)'
            }}>
              {badge}
            </span>
          )}
          {!locked && (
            <span style={{
              ...glassText,
              fontSize: '18px',
              color: 'rgba(203, 166, 88, 0.7)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s'
            }}>
              ▼
            </span>
          )}
        </div>
      </div>
      {isOpen && !locked && (
        <div style={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  );
}

// ========== ZADARMA CRM COMPONENT ==========
function ZadarmaCRM() {
  const [calls, setCalls] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [pbxStatus, setPbxStatus] = useState('checking');
  const [activeSubTab, setActiveSubTab] = useState('calls');
  const [dialNumber, setDialNumber] = useState('');

  useEffect(() => {
    setCalls([
      { id: 1, direction: 'inbound', number: '+1-555-123-4567', contact: 'John Smith', duration: '4:32', time: '2026-01-10 09:15', status: 'answered' },
      { id: 2, direction: 'outbound', number: '+52-646-987-6543', contact: 'Maria Garcia', duration: '2:18', time: '2026-01-10 08:45', status: 'answered' },
      { id: 3, direction: 'inbound', number: '+1-555-789-0123', contact: 'Unknown', duration: '0:00', time: '2026-01-10 08:30', status: 'missed' },
      { id: 4, direction: 'outbound', number: '+52-646-555-1234', contact: 'Carlos Rivera', duration: '6:45', time: '2026-01-09 16:20', status: 'answered' }
    ]);
    
    setContacts([
      { id: 1, name: 'John Smith', phone: '+1-555-123-4567', email: 'john@email.com', company: 'Smith Investments', lastContact: '2026-01-10' },
      { id: 2, name: 'Maria Garcia', phone: '+52-646-987-6543', email: 'maria@email.com', company: 'Valle Properties', lastContact: '2026-01-10' },
      { id: 3, name: 'Carlos Rivera', phone: '+52-646-555-1234', email: 'carlos@realty.mx', company: 'Baja Realty', lastContact: '2026-01-09' }
    ]);
    
    setTimeout(() => setPbxStatus('online'), 1000);
  }, []);

  const handleDial = () => {
    if (dialNumber) {
      alert(`Initiating call to ${dialNumber} via Zadarma PBX`);
      setDialNumber('');
    }
  };

  const subTabs = [
    { id: 'calls', label: 'CALL LOG' },
    { id: 'contacts', label: 'CONTACTS' },
    { id: 'dialer', label: 'DIALER' },
    { id: 'settings', label: 'PBX SETTINGS' }
  ];

  return (
    <div>
      {/* Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '12px 16px',
        background: 'rgba(30, 41, 59, 0.4)',
        border: '1px solid rgba(148, 163, 184, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: pbxStatus === 'online' ? '#4ade80' : pbxStatus === 'checking' ? '#fbbf24' : '#f87171'
          }} />
          <span style={{ ...glassText, fontSize: '10px', letterSpacing: '1px' }}>
            PBX STATUS: {pbxStatus.toUpperCase()}
          </span>
        </div>
        <span style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)' }}>
          {ZADARMA_CONFIG.pbxNumber}
        </span>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {subTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              ...styles.button,
              ...(activeSubTab === tab.id ? styles.buttonPrimary : {})
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CALL LOG */}
      {activeSubTab === 'calls' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>Direction</th>
                <th style={styles.th}>Number</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Duration</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {calls.map(call => (
                <tr key={call.id}>
                  <td style={styles.td}>
                    <span style={{ color: call.direction === 'inbound' ? '#4ade80' : '#60a5fa' }}>
                      {call.direction === 'inbound' ? '↓ IN' : '↑ OUT'}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontFamily: 'monospace' }}>{call.number}</td>
                  <td style={styles.td}>{call.contact}</td>
                  <td style={styles.td}>{call.duration}</td>
                  <td style={{ ...styles.td, fontSize: '10px' }}>{call.time}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: call.status === 'answered' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                      color: call.status === 'answered' ? '#4ade80' : '#f87171',
                      border: `1px solid ${call.status === 'answered' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`
                    }}>
                      {call.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, padding: '4px 8px', fontSize: '8px' }}>
                      CALLBACK
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONTACTS */}
      {activeSubTab === 'contacts' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <input type="text" placeholder="Search contacts..." style={{ ...styles.input, maxWidth: '300px' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>Last Contact</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact.id}>
                    <td style={styles.td}>{contact.name}</td>
                    <td style={{ ...styles.td, fontFamily: 'monospace' }}>{contact.phone}</td>
                    <td style={styles.td}>{contact.email}</td>
                    <td style={styles.td}>{contact.company}</td>
                    <td style={styles.td}>{contact.lastContact}</td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button style={{ ...styles.button, ...styles.buttonSuccess, padding: '4px 8px', fontSize: '8px' }}>CALL</button>
                        <button style={{ ...styles.button, padding: '4px 8px', fontSize: '8px' }}>EDIT</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DIALER */}
      {activeSubTab === 'dialer' && (
        <div style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'center' }}>
          <input
            type="tel"
            value={dialNumber}
            onChange={(e) => setDialNumber(e.target.value)}
            placeholder="+1 555 123 4567"
            style={{ ...styles.input, fontSize: '24px', textAlign: 'center', padding: '16px', marginBottom: '16px', letterSpacing: '2px' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(digit => (
              <button key={digit} onClick={() => setDialNumber(prev => prev + digit)} style={{ ...styles.button, padding: '16px', fontSize: '18px' }}>
                {digit}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setDialNumber('')} style={{ ...styles.button, ...styles.buttonDanger, flex: 1, padding: '12px' }}>CLEAR</button>
            <button onClick={handleDial} style={{ ...styles.button, ...styles.buttonSuccess, flex: 2, padding: '12px' }}>📞 DIAL</button>
          </div>
        </div>
      )}

      {/* PBX SETTINGS */}
      {activeSubTab === 'settings' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={styles.statCard}>
              <div style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', marginBottom: '8px' }}>API KEY</div>
              <div style={{ ...glassText, fontSize: '11px', fontFamily: 'monospace' }}>{ZADARMA_CONFIG.apiKey.slice(0, 8)}...</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', marginBottom: '8px' }}>PBX NUMBER</div>
              <div style={{ ...glassText, fontSize: '11px', fontFamily: 'monospace' }}>{ZADARMA_CONFIG.pbxNumber}</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', marginBottom: '8px' }}>STATUS</div>
              <div style={{ ...glassText, fontSize: '11px', color: '#4ade80' }}>CONNECTED</div>
            </div>
          </div>
          
          <h4 style={{ ...glassText, fontSize: '12px', letterSpacing: '1px', marginBottom: '16px' }}>CALL ROUTING</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Forward to WhatsApp', enabled: true },
              { label: 'Voicemail', enabled: true },
              { label: 'Call Recording', enabled: false },
              { label: 'SMS Notifications', enabled: true }
            ].map((setting, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
                <span style={{ ...glassText, fontSize: '11px' }}>{setting.label}</span>
                <span style={{
                  ...styles.badge,
                  background: setting.enabled ? 'rgba(74, 222, 128, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                  color: setting.enabled ? '#4ade80' : 'rgba(148, 163, 184, 0.6)',
                  border: `1px solid ${setting.enabled ? 'rgba(74, 222, 128, 0.3)' : 'rgba(148, 163, 184, 0.2)'}`
                }}>
                  {setting.enabled ? 'ON' : 'OFF'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ========== DUAL CALENDAR COMPONENT ==========
function DualCalendar({ accessLevel }) {
  const [activeCalendar, setActiveCalendar] = useState(accessLevel === 'owner' ? 'private' : 'team');
  
  const privateCalendarSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_CONFIG.ownerPrivate)}&ctz=America/Los_Angeles&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0`;
  const teamCalendarSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_CONFIG.teamShared)}&ctz=America/Los_Angeles&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0`;

  return (
    <div>
      {/* Calendar Toggle - Only for Owner */}
      {accessLevel === 'owner' && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setActiveCalendar('private')}
            style={{
              ...styles.button,
              ...(activeCalendar === 'private' ? {
                background: 'rgba(203, 166, 88, 0.2)',
                borderColor: 'rgba(203, 166, 88, 0.5)',
                color: '#cba658'
              } : {})
            }}
          >
            🔒 PRIVATE CALENDAR
          </button>
          <button
            onClick={() => setActiveCalendar('team')}
            style={{
              ...styles.button,
              ...(activeCalendar === 'team' ? {
                background: 'rgba(96, 165, 250, 0.2)',
                borderColor: 'rgba(96, 165, 250, 0.5)',
                color: '#60a5fa'
              } : {})
            }}
          >
            👥 TEAM CALENDAR
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button
          onClick={() => window.open(`https://calendar.google.com/calendar/u/0/r/eventedit`, '_blank')}
          style={{ ...styles.button, ...styles.buttonPrimary }}
        >
          + NEW EVENT
        </button>
        <button
          onClick={() => window.open(`https://calendar.google.com/calendar/u/0/r/day`, '_blank')}
          style={styles.button}
        >
          TODAY
        </button>
        <button
          onClick={() => window.open(`https://calendar.google.com/calendar/u/0/r/month`, '_blank')}
          style={styles.button}
        >
          MONTH VIEW
        </button>
      </div>

      {/* Calendar Label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        padding: '8px 12px',
        background: activeCalendar === 'private' ? 'rgba(203, 166, 88, 0.1)' : 'rgba(96, 165, 250, 0.1)',
        border: `1px solid ${activeCalendar === 'private' ? 'rgba(203, 166, 88, 0.2)' : 'rgba(96, 165, 250, 0.2)'}`
      }}>
        <span style={{ fontSize: '14px' }}>{activeCalendar === 'private' ? '🔒' : '👥'}</span>
        <span style={{
          ...glassText,
          fontSize: '10px',
          letterSpacing: '2px',
          color: activeCalendar === 'private' ? '#cba658' : '#60a5fa'
        }}>
          {activeCalendar === 'private' ? 'OWNER PRIVATE CALENDAR' : 'TEAM SHARED CALENDAR'}
        </span>
      </div>

      {/* Calendar Embed */}
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <iframe
          src={activeCalendar === 'private' ? privateCalendarSrc : teamCalendarSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
            filter: 'invert(0.88) hue-rotate(180deg)'
          }}
          title={activeCalendar === 'private' ? 'Private Calendar' : 'Team Calendar'}
        />
      </div>

      <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', marginTop: '12px', textAlign: 'center' }}>
        {activeCalendar === 'private' 
          ? `Private: ${CALENDAR_CONFIG.ownerPrivate}` 
          : `Team: ${CALENDAR_CONFIG.teamShared}`
        }
      </p>
    </div>
  );
}

// ========== AGENT APPROVALS COMPONENT ==========
function AgentApprovals() {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Carlos Rivera', email: 'carlos@realty.mx', phone: '+52 646 123 4567', company: 'Baja Realty', license: 'BRE-2024-1234', submittedAt: '2026-01-08', status: 'pending' },
    { id: 2, name: 'Ana Martinez', email: 'ana@valleproperties.com', phone: '+52 646 987 6543', company: 'Valle Properties', license: 'BRE-2024-5678', submittedAt: '2026-01-09', status: 'pending' },
    { id: 3, name: 'Roberto Sanchez', email: 'roberto@coastalrealty.mx', phone: '+52 664 555 1234', company: 'Coastal Realty', license: 'BRE-2023-9012', submittedAt: '2026-01-07', status: 'approved' }
  ]);

  const handleApprove = (id) => setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a));
  const handleReject = (id) => setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));

  const stats = {
    pending: agents.filter(a => a.status === 'pending').length,
    approved: agents.filter(a => a.status === 'approved').length,
    rejected: agents.filter(a => a.status === 'rejected').length
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <div style={styles.statCard}>
          <div style={{ ...glassText, fontSize: '24px', color: 'rgba(251, 191, 36, 0.9)' }}>{stats.pending}</div>
          <div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148, 163, 184, 0.6)' }}>PENDING</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...glassText, fontSize: '24px', color: 'rgba(74, 222, 128, 0.9)' }}>{stats.approved}</div>
          <div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148, 163, 184, 0.6)' }}>APPROVED</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...glassText, fontSize: '24px', color: 'rgba(248, 113, 113, 0.9)' }}>{stats.rejected}</div>
          <div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148, 163, 184, 0.6)' }}>REJECTED</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Company</th>
              <th style={styles.th}>License</th>
              <th style={styles.th}>Submitted</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id}>
                <td style={styles.td}>{agent.name}</td>
                <td style={{ ...styles.td, fontSize: '10px' }}>{agent.email}</td>
                <td style={{ ...styles.td, fontSize: '10px' }}>{agent.phone}</td>
                <td style={styles.td}>{agent.company}</td>
                <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '9px' }}>{agent.license}</td>
                <td style={styles.td}>{agent.submittedAt}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    background: agent.status === 'approved' ? 'rgba(74, 222, 128, 0.15)' : agent.status === 'rejected' ? 'rgba(248, 113, 113, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                    color: agent.status === 'approved' ? '#4ade80' : agent.status === 'rejected' ? '#f87171' : '#fbbf24',
                    border: `1px solid ${agent.status === 'approved' ? 'rgba(74, 222, 128, 0.3)' : agent.status === 'rejected' ? 'rgba(248, 113, 113, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`
                  }}>
                    {agent.status.toUpperCase()}
                  </span>
                </td>
                <td style={styles.td}>
                  {agent.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => handleApprove(agent.id)} style={{ ...styles.button, ...styles.buttonSuccess, padding: '4px 8px', fontSize: '8px' }}>APPROVE</button>
                      <button onClick={() => handleReject(agent.id)} style={{ ...styles.button, ...styles.buttonDanger, padding: '4px 8px', fontSize: '8px' }}>REJECT</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ========== ANALYTICS COMPONENT ==========
function AnalyticsDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$141,000', change: '+12%', color: '#cba658' },
    { label: 'Active Campaigns', value: '3', change: '+1', color: '#4ade80' },
    { label: 'Total Impressions', value: '73,680', change: '+8%', color: '#60a5fa' },
    { label: 'Total Clicks', value: '1,348', change: '+15%', color: '#a78bfa' },
    { label: 'CTR', value: '1.83%', change: '+0.2%', color: '#f472b6' },
    { label: 'Inquiries', value: '47', change: '+23%', color: '#fb923c' }
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.statCard}>
            <div style={{ ...glassText, fontSize: '24px', color: stat.color }}>{stat.value}</div>
            <div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148, 163, 184, 0.6)', marginBottom: '4px' }}>{stat.label.toUpperCase()}</div>
            <div style={{ ...glassText, fontSize: '10px', color: '#4ade80' }}>{stat.change}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', padding: '60px 40px', textAlign: 'center' }}>
        <p style={{ ...glassText, fontSize: '11px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', margin: 0 }}>ADVANCED ANALYTICS DASHBOARD</p>
        <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.4)', marginTop: '8px' }}>Coming Soon: Revenue Charts, Geo Heatmaps, ROI Tracking</p>
      </div>
    </div>
  );
}

// ========== AD MANAGEMENT PLACEHOLDER ==========
function AdManagementPanel() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
      <p style={{ ...glassText, fontSize: '14px', color: '#cba658', letterSpacing: '2px', marginBottom: '8px' }}>AMIE - AD MANAGEMENT</p>
      <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)' }}>Full ad management system loaded separately</p>
    </div>
  );
}

// ========== MAIN ADMIN DASHBOARD ==========
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [accessLevel, setAccessLevel] = useState('sales'); // Default to restricted
  
  const [openSections, setOpenSections] = useState({
    crm: true,
    calendar: false,
    amie: false,
    agents: false,
    analytics: false
  });

  useEffect(() => {
    // Get access level from session storage
    const level = sessionStorage.getItem('admin_access_level') || 'sales';
    setAccessLevel(level);
    
    // If sales, only CRM and calendar should be openable
    if (level === 'sales') {
      setOpenSections({ crm: true, calendar: false, amie: false, agents: false, analytics: false });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    // Sales can only toggle CRM and calendar
    if (accessLevel === 'sales' && !['crm', 'calendar'].includes(section)) return;
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_access_level');
    logout();
    navigate('/');
  };

  const isOwner = accessLevel === 'owner';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', position: 'relative' }}>
      {/* BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, zIndex: 0 }} />

      {/* TOP NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? '12px 16px' : '16px 48px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(203, 166, 88, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div onClick={() => navigate('/')} style={{ ...glassText, fontSize: '11px', letterSpacing: '4px', color: 'rgba(203, 166, 88, 0.9)', cursor: 'pointer' }}>ENJOY BAJA</div>
          <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.6)', padding: '4px 12px', background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.2)' }}>
            {isOwner ? '👑 OWNER ACCESS' : '👤 SALES ACCESS'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ ...glassText, fontSize: '10px', color: 'rgba(148, 163, 184, 0.7)' }}>{user?.name || user?.email}</span>
          <button onClick={handleLogout} style={{ ...styles.button, ...styles.buttonDanger }}>LOGOUT</button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '80px 16px 40px' : '100px 48px 60px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ ...glassText, fontSize: isMobile ? '24px' : '32px', letterSpacing: '6px', marginBottom: '8px', color: 'rgba(226, 232, 240, 0.9)' }}>
            {isOwner ? 'ADMIN DASHBOARD' : 'SALES DASHBOARD'}
          </h1>
          <p style={{ ...glassText, fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.6)' }}>
            {isOwner 
              ? 'FULL ACCESS • AMIE • ZADARMA • CALENDAR • AGENTS • ANALYTICS'
              : 'ZADARMA CRM/PBX • TEAM CALENDAR'
            }
          </p>
        </div>

        {/* ACCESS LEVEL INDICATOR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          padding: '12px 20px',
          background: isOwner ? 'rgba(203, 166, 88, 0.1)' : 'rgba(96, 165, 250, 0.1)',
          border: `1px solid ${isOwner ? 'rgba(203, 166, 88, 0.3)' : 'rgba(96, 165, 250, 0.3)'}`
        }}>
          <span style={{ fontSize: '20px' }}>{isOwner ? '👑' : '👤'}</span>
          <div>
            <p style={{ ...glassText, fontSize: '11px', color: isOwner ? '#cba658' : '#60a5fa', margin: 0, letterSpacing: '1px' }}>
              {isOwner ? 'OWNER MODE - FULL ACCESS' : 'SALES MODE - LIMITED ACCESS'}
            </p>
            <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '2px 0 0' }}>
              {isOwner 
                ? 'You have access to all admin features'
                : 'You can access CRM/PBX and Team Calendar only'
              }
            </p>
          </div>
        </div>

        {/* ACCORDION SECTIONS */}
        
        {/* ZADARMA CRM - Available to ALL */}
        <AccordionSection 
          title="ZADARMA CRM / PBX" 
          subtitle="Call Management, Contacts, VoIP Dialer" 
          icon="📞" 
          isOpen={openSections.crm} 
          onToggle={() => toggleSection('crm')}
        >
          <ZadarmaCRM />
        </AccordionSection>

        {/* CALENDAR - Available to ALL but different views */}
        <AccordionSection 
          title={isOwner ? "CALENDARS" : "TEAM CALENDAR"}
          subtitle={isOwner ? "Private + Shared Team Calendar" : "View team activities and appointments"}
          icon="📅" 
          isOpen={openSections.calendar} 
          onToggle={() => toggleSection('calendar')}
        >
          <DualCalendar accessLevel={accessLevel} />
        </AccordionSection>

        {/* AMIE AD MANAGEMENT - OWNER ONLY */}
        <AccordionSection 
          title="AD MANAGEMENT" 
          subtitle="AMIE - AuditDNA Media Intelligence Engine" 
          icon="📊" 
          isOpen={openSections.amie} 
          onToggle={() => toggleSection('amie')}
          badge={isOwner ? "3 LIVE" : null}
          locked={!isOwner}
        >
          <AdManagementPanel />
        </AccordionSection>

        {/* AGENT APPROVALS - OWNER ONLY */}
        <AccordionSection 
          title="AGENT APPROVALS" 
          subtitle="Pending Applications & Agent Management" 
          icon="👥" 
          isOpen={openSections.agents} 
          onToggle={() => toggleSection('agents')}
          badge={isOwner ? "2 PENDING" : null}
          locked={!isOwner}
        >
          <AgentApprovals />
        </AccordionSection>

        {/* ANALYTICS - OWNER ONLY */}
        <AccordionSection 
          title="ANALYTICS" 
          subtitle="Revenue, Performance & ROI Metrics" 
          icon="📈" 
          isOpen={openSections.analytics} 
          onToggle={() => toggleSection('analytics')}
          locked={!isOwner}
        >
          <AnalyticsDashboard />
        </AccordionSection>

      </div>

      {/* FOOTER */}
      <div style={{ position: 'relative', zIndex: 1, padding: '24px 48px', borderTop: '1px solid rgba(148, 163, 184, 0.1)', textAlign: 'center' }}>
        <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.4)', letterSpacing: '1px' }}>
          ENJOYBAJA {isOwner ? 'ADMIN' : 'SALES'} DASHBOARD v2.0 • {isOwner ? 'FULL ACCESS' : 'LIMITED ACCESS'}
        </p>
      </div>
    </div>
  );
}