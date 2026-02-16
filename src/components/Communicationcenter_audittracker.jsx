// COMMUNICATION CENTER + AUDIT ACTIVITY TRACKER
// Add these sections to AdminDashboard.jsx

import React, { useState } from 'react';

// ========== STYLES ==========
const glassText = {
  fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: '100',
  color: 'rgba(203, 213, 225, 0.85)'
};

const styles = {
  tableContainer: { background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', overflow: 'hidden' },
  th: { textAlign: 'left', padding: '12px 14px', fontSize: '8px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', background: 'rgba(15, 23, 42, 0.6)' },
  td: { padding: '12px 14px', fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', borderBottom: '1px solid rgba(148, 163, 184, 0.05)' },
  tab: { padding: '10px 20px', cursor: 'pointer', fontSize: '10px', letterSpacing: '1px', transition: 'all 0.2s', borderBottom: '2px solid transparent' },
  button: { padding: '6px 12px', background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.25)', color: 'rgba(148, 163, 184, 0.8)', fontSize: '9px', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: '"Helvetica Neue", sans-serif', borderRadius: '4px' },
  buttonPrimary: { background: 'rgba(203, 166, 88, 0.15)', borderColor: 'rgba(203, 166, 88, 0.4)', color: '#cba658' },
  badge: { display: 'inline-block', padding: '3px 8px', fontSize: '8px', letterSpacing: '0.5px', textTransform: 'uppercase', borderRadius: '10px' }
};

// ========== COMMUNICATION CENTER COMPONENT ==========
function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState('creditor');

  // MOCK DATA - Replace with API calls
  const creditorMessages = [
    { id: 1, auditId: 'AUD-00127', consumer: 'John Smith', sender: 'Wells Fargo Mortgage', email: 'servicing@wellsfargo.com', subject: 'RE: Qualified Written Request - Loan #123456', dateReceived: '2026-02-14 10:23 AM', status: 'unread', hasAttachment: true },
    { id: 2, auditId: 'AUD-00089', consumer: 'Mary Wilson', sender: 'Chase Home Lending', email: 'qwr@chase.com', subject: 'Response to QWR - Account Review', dateReceived: '2026-02-13 2:15 PM', status: 'read', hasAttachment: false },
    { id: 3, auditId: 'AUD-00112', consumer: 'Bob Johnson', sender: 'Rocket Mortgage', email: 'compliance@rocketmortgage.com', subject: 'RE: Closing Disclosure Request', dateReceived: '2026-02-12 9:45 AM', status: 'unread', hasAttachment: true }
  ];

  const cfpbMessages = [
    { id: 1, auditId: 'AUD-00127', consumer: 'John Smith', agency: 'CFPB', caseNumber: 'CFPB-2026-0234', subject: 'Complaint Received - Under Review', dateReceived: '2026-02-13 11:30 AM', status: 'unread' },
    { id: 2, auditId: 'AUD-00089', consumer: 'Mary Wilson', agency: 'CA Attorney General', caseNumber: 'CA-AG-2026-1128', subject: 'Investigation Opened', dateReceived: '2026-02-10 3:22 PM', status: 'read' }
  ];

  const titleMessages = [
    { id: 1, auditId: 'AUD-00127', consumer: 'John Smith', company: 'First American Title', email: 'escrow@firstam.com', subject: 'RE: Closing File Request #FA-2023-8472', dateReceived: '2026-02-14 1:45 PM', status: 'unread', hasAttachment: true },
    { id: 2, auditId: 'AUD-00112', consumer: 'Bob Johnson', company: 'Stewart Title', email: 'support@stewart.com', subject: 'Escrow Documents Attached', dateReceived: '2026-02-11 10:12 AM', status: 'read', hasAttachment: true }
  ];

  const partnerMessages = [
    { id: 1, partnerId: 'MLO-4782', name: 'John Smith - ABC Mortgage', email: 'john@abcmortgage.com', subject: 'Question about commission payment', dateReceived: '2026-02-15 9:15 AM', status: 'unread' },
    { id: 2, partnerId: 'AGENT-1234', name: 'Sarah Jones - Realty Plus', email: 'sarah@realtyplus.com', subject: 'Marketing materials request', dateReceived: '2026-02-14 4:30 PM', status: 'read' }
  ];

  const consumerMessages = [
    { id: 1, auditId: 'AUD-00127', consumer: 'John Smith', email: 'john@example.com', subject: 'Question about my audit status', dateReceived: '2026-02-15 8:45 AM', status: 'unread' },
    { id: 2, auditId: 'AUD-00089', consumer: 'Mary Wilson', email: 'mary@example.com', subject: 'Need help uploading documents', dateReceived: '2026-02-14 11:20 AM', status: 'read' }
  ];

  const getStatusBadge = (status) => ({
    ...styles.badge,
    background: status === 'unread' ? 'rgba(96, 165, 250, 0.15)' : 'rgba(148, 163, 184, 0.15)',
    color: status === 'unread' ? '#60a5fa' : '#94a3b8',
    border: `1px solid ${status === 'unread' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(148, 163, 184, 0.3)'}`
  });

  const handleExportXLSX = (tabName) => {
    alert(`Exporting ${tabName} to XLSX...`);
    // TODO: Implement XLSX export using library like xlsx or exceljs
  };

  return (
    <div>
      {/* TABS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(148, 163, 184, 0.2)', flexWrap: 'wrap' }}>
        {[
          { id: 'creditor', label: 'Creditor/Lender', count: creditorMessages.filter(m => m.status === 'unread').length },
          { id: 'cfpb', label: 'CFPB/Agency', count: cfpbMessages.filter(m => m.status === 'unread').length },
          { id: 'title', label: 'Title/Escrow', count: titleMessages.filter(m => m.status === 'unread').length },
          { id: 'partner', label: 'Partner Inquiries', count: partnerMessages.filter(m => m.status === 'unread').length },
          { id: 'consumer', label: 'Consumer Support', count: consumerMessages.filter(m => m.status === 'unread').length },
          { id: 'all', label: 'All Messages', count: 0 }
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
            {tab.label} {tab.count > 0 && <span style={{ color: '#60a5fa', marginLeft: '6px' }}>({tab.count})</span>}
          </div>
        ))}
      </div>

      {/* EXPORT BUTTON */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => handleExportXLSX(activeTab)} style={{ ...styles.button, ...styles.buttonPrimary }}>
          📊 EXPORT TO XLSX
        </button>
      </div>

      {/* CREDITOR/LENDER TAB */}
      {activeTab === 'creditor' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>AUDIT ID</th>
                <th style={styles.th}>CONSUMER</th>
                <th style={styles.th}>CREDITOR/LENDER</th>
                <th style={styles.th}>SUBJECT</th>
                <th style={styles.th}>DATE RECEIVED</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {creditorMessages.map(msg => (
                <tr key={msg.id} style={{ background: msg.status === 'unread' ? 'rgba(96, 165, 250, 0.05)' : 'transparent' }}>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{msg.auditId}</td>
                  <td style={styles.td}>{msg.consumer}</td>
                  <td style={styles.td}>
                    {msg.sender}<br/>
                    <span style={{ fontSize: '9px', color: '#64748b' }}>{msg.email}</span>
                  </td>
                  <td style={styles.td}>
                    {msg.hasAttachment && <span style={{ marginRight: '6px' }}>📎</span>}
                    {msg.subject}
                  </td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{msg.dateReceived}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadge(msg.status)}>
                      {msg.status === 'unread' ? 'NEW' : 'READ'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, marginRight: '6px' }}>VIEW</button>
                    <button style={{ ...styles.button }}>REPLY</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CFPB/AGENCY TAB */}
      {activeTab === 'cfpb' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>AUDIT ID</th>
                <th style={styles.th}>CONSUMER</th>
                <th style={styles.th}>AGENCY</th>
                <th style={styles.th}>CASE NUMBER</th>
                <th style={styles.th}>SUBJECT</th>
                <th style={styles.th}>DATE RECEIVED</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {cfpbMessages.map(msg => (
                <tr key={msg.id} style={{ background: msg.status === 'unread' ? 'rgba(96, 165, 250, 0.05)' : 'transparent' }}>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{msg.auditId}</td>
                  <td style={styles.td}>{msg.consumer}</td>
                  <td style={{ ...styles.td, color: '#60a5fa' }}>{msg.agency}</td>
                  <td style={{ ...styles.td, fontWeight: '600' }}>{msg.caseNumber}</td>
                  <td style={styles.td}>{msg.subject}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{msg.dateReceived}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadge(msg.status)}>
                      {msg.status === 'unread' ? 'NEW' : 'READ'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, marginRight: '6px' }}>VIEW</button>
                    <button style={{ ...styles.button }}>REPLY</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TITLE/ESCROW TAB */}
      {activeTab === 'title' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>AUDIT ID</th>
                <th style={styles.th}>CONSUMER</th>
                <th style={styles.th}>TITLE/ESCROW COMPANY</th>
                <th style={styles.th}>SUBJECT</th>
                <th style={styles.th}>DATE RECEIVED</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {titleMessages.map(msg => (
                <tr key={msg.id} style={{ background: msg.status === 'unread' ? 'rgba(96, 165, 250, 0.05)' : 'transparent' }}>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{msg.auditId}</td>
                  <td style={styles.td}>{msg.consumer}</td>
                  <td style={styles.td}>
                    {msg.company}<br/>
                    <span style={{ fontSize: '9px', color: '#64748b' }}>{msg.email}</span>
                  </td>
                  <td style={styles.td}>
                    {msg.hasAttachment && <span style={{ marginRight: '6px' }}>📎</span>}
                    {msg.subject}
                  </td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{msg.dateReceived}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadge(msg.status)}>
                      {msg.status === 'unread' ? 'NEW' : 'READ'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, marginRight: '6px' }}>VIEW</button>
                    <button style={{ ...styles.button }}>REPLY</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PARTNER INQUIRIES TAB */}
      {activeTab === 'partner' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>PARTNER ID</th>
                <th style={styles.th}>PARTNER NAME</th>
                <th style={styles.th}>EMAIL</th>
                <th style={styles.th}>SUBJECT</th>
                <th style={styles.th}>DATE RECEIVED</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {partnerMessages.map(msg => (
                <tr key={msg.id} style={{ background: msg.status === 'unread' ? 'rgba(96, 165, 250, 0.05)' : 'transparent' }}>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{msg.partnerId}</td>
                  <td style={styles.td}>{msg.name}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#64748b' }}>{msg.email}</td>
                  <td style={styles.td}>{msg.subject}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{msg.dateReceived}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadge(msg.status)}>
                      {msg.status === 'unread' ? 'NEW' : 'READ'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, marginRight: '6px' }}>VIEW</button>
                    <button style={{ ...styles.button }}>REPLY</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONSUMER SUPPORT TAB */}
      {activeTab === 'consumer' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>AUDIT ID</th>
                <th style={styles.th}>CONSUMER NAME</th>
                <th style={styles.th}>EMAIL</th>
                <th style={styles.th}>SUBJECT</th>
                <th style={styles.th}>DATE RECEIVED</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {consumerMessages.map(msg => (
                <tr key={msg.id} style={{ background: msg.status === 'unread' ? 'rgba(96, 165, 250, 0.05)' : 'transparent' }}>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{msg.auditId}</td>
                  <td style={styles.td}>{msg.consumer}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#64748b' }}>{msg.email}</td>
                  <td style={styles.td}>{msg.subject}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{msg.dateReceived}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadge(msg.status)}>
                      {msg.status === 'unread' ? 'NEW' : 'READ'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, marginRight: '6px' }}>VIEW</button>
                    <button style={{ ...styles.button }}>REPLY</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ALL MESSAGES TAB */}
      {activeTab === 'all' && (
        <div style={styles.tableContainer}>
          <p style={{ ...glassText, fontSize: '11px', padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
            Unified view of all messages across all categories (creditor, CFPB, title, partner, consumer) sorted by date.
          </p>
        </div>
      )}
    </div>
  );
}

// ========== AUDIT ACTIVITY TRACKER COMPONENT ==========
function AuditActivityTracker() {
  const [activeTab, setActiveTab] = useState('active');

  // MOCK DATA
  const activeAudits = [
    { id: 'AUD-00127', consumer: 'John Smith', email: 'john@example.com', property: '123 Main St, San Diego, CA', dateRegistered: '2026-02-10', status: 'Processing', lastActivity: '2026-02-14', awaitingFrom: 'Wells Fargo' },
    { id: 'AUD-00112', consumer: 'Bob Johnson', email: 'bob@example.com', property: '456 Oak Ave, Los Angeles, CA', dateRegistered: '2026-02-08', status: 'Pending Upload', lastActivity: '2026-02-08', awaitingFrom: 'Consumer' },
    { id: 'AUD-00134', consumer: 'Alice Davis', email: 'alice@example.com', property: '789 Pine Rd, San Francisco, CA', dateRegistered: '2026-02-12', status: 'Awaiting Response', lastActivity: '2026-02-13', awaitingFrom: 'Chase Bank' }
  ];

  const pendingResponses = [
    { id: 'AUD-00127', consumer: 'John Smith', sentTo: 'Wells Fargo Mortgage', type: 'QWR', dateSent: '2026-02-11', dueDate: '2026-03-11', daysRemaining: 25, status: 'Pending' },
    { id: 'AUD-00134', consumer: 'Alice Davis', sentTo: 'Chase Home Lending', type: 'QWR', dateSent: '2026-02-13', dueDate: '2026-03-13', daysRemaining: 26, status: 'Pending' },
    { id: 'AUD-00089', consumer: 'Mary Wilson', sentTo: 'CFPB', type: 'Complaint', dateSent: '2026-02-05', dueDate: '2026-03-05', daysRemaining: 18, status: 'Under Review' }
  ];

  const completedAudits = [
    { id: 'AUD-00089', consumer: 'Mary Wilson', email: 'mary@example.com', recovery: 14250, path: 'Escrow', fee: 5558, dateCompleted: '2026-02-10', status: 'Complete' },
    { id: 'AUD-00078', consumer: 'Tom Garcia', email: 'tom@example.com', recovery: 18900, path: 'Escrow', fee: 7371, dateCompleted: '2026-02-05', status: 'Complete' }
  ];

  const responseLog = [
    { id: 1, auditId: 'AUD-00127', type: 'Creditor Response', from: 'Wells Fargo', subject: 'RE: QWR - Loan #123456', dateReceived: '2026-02-14 10:23 AM', action: 'Reviewed' },
    { id: 2, auditId: 'AUD-00089', type: 'CFPB Update', from: 'CFPB', subject: 'Complaint Under Review', dateReceived: '2026-02-13 11:30 AM', action: 'Logged' },
    { id: 3, auditId: 'AUD-00127', type: 'Title Response', from: 'First American Title', subject: 'Escrow Documents', dateReceived: '2026-02-14 1:45 PM', action: 'Processed' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Complete': return { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' };
      case 'Processing': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' };
      case 'Pending Upload': return { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', border: 'rgba(251, 191, 36, 0.3)' };
      case 'Awaiting Response': return { bg: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' };
      default: return { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', border: 'rgba(148, 163, 184, 0.3)' };
    }
  };

  return (
    <div>
      {/* TABS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
        {[
          { id: 'active', label: 'Active Audits', count: activeAudits.length },
          { id: 'pending', label: 'Pending Responses', count: pendingResponses.length },
          { id: 'completed', label: 'Completed Audits', count: completedAudits.length },
          { id: 'log', label: 'Response Log', count: responseLog.length }
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
            {tab.label} <span style={{ color: '#60a5fa', marginLeft: '6px' }}>({tab.count})</span>
          </div>
        ))}
      </div>

      {/* EXPORT BUTTON */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => alert(`Exporting ${activeTab} to XLSX...`)} style={{ ...styles.button, ...styles.buttonPrimary }}>
          📊 EXPORT TO XLSX
        </button>
      </div>

      {/* ACTIVE AUDITS TAB */}
      {activeTab === 'active' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>AUDIT ID</th>
                <th style={styles.th}>CONSUMER</th>
                <th style={styles.th}>EMAIL</th>
                <th style={styles.th}>PROPERTY</th>
                <th style={styles.th}>REGISTERED</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>AWAITING FROM</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {activeAudits.map(audit => {
                const statusStyle = getStatusColor(audit.status);
                return (
                  <tr key={audit.id}>
                    <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{audit.id}</td>
                    <td style={styles.td}>{audit.consumer}</td>
                    <td style={{ ...styles.td, fontSize: '10px', color: '#64748b' }}>{audit.email}</td>
                    <td style={{ ...styles.td, fontSize: '10px' }}>{audit.property}</td>
                    <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{audit.dateRegistered}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}` }}>
                        {audit.status}
                      </span>
                    </td>
                    <td style={styles.td}>{audit.awaitingFrom}</td>
                    <td style={styles.td}>
                      <button style={{ ...styles.button, marginRight: '6px' }}>VIEW</button>
                      <button style={{ ...styles.button }}>UPDATE</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* PENDING RESPONSES TAB */}
      {activeTab === 'pending' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>AUDIT ID</th>
                <th style={styles.th}>CONSUMER</th>
                <th style={styles.th}>SENT TO</th>
                <th style={styles.th}>TYPE</th>
                <th style={styles.th}>DATE SENT</th>
                <th style={styles.th}>DUE DATE</th>
                <th style={styles.th}>DAYS REMAINING</th>
                <th style={styles.th}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {pendingResponses.map(resp => (
                <tr key={resp.id}>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{resp.id}</td>
                  <td style={styles.td}>{resp.consumer}</td>
                  <td style={styles.td}>{resp.sentTo}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, background: resp.type === 'QWR' ? 'rgba(203, 166, 88, 0.15)' : 'rgba(96, 165, 250, 0.15)', color: resp.type === 'QWR' ? '#cba658' : '#60a5fa', border: `1px solid ${resp.type === 'QWR' ? 'rgba(203, 166, 88, 0.3)' : 'rgba(96, 165, 250, 0.3)'}` }}>
                      {resp.type}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{resp.dateSent}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{resp.dueDate}</td>
                  <td style={{ ...styles.td, color: resp.daysRemaining < 10 ? '#f87171' : '#22c55e', fontWeight: '600' }}>{resp.daysRemaining} days</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                      {resp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* COMPLETED AUDITS TAB */}
      {activeTab === 'completed' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>AUDIT ID</th>
                <th style={styles.th}>CONSUMER</th>
                <th style={styles.th}>EMAIL</th>
                <th style={styles.th}>RECOVERY</th>
                <th style={styles.th}>PATH</th>
                <th style={styles.th}>FEE COLLECTED</th>
                <th style={styles.th}>DATE COMPLETED</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {completedAudits.map(audit => (
                <tr key={audit.id}>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{audit.id}</td>
                  <td style={styles.td}>{audit.consumer}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#64748b' }}>{audit.email}</td>
                  <td style={{ ...styles.td, color: '#22c55e', fontWeight: '600' }}>${audit.recovery.toLocaleString()}</td>
                  <td style={styles.td}>{audit.path}</td>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>${audit.fee.toLocaleString()}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{audit.dateCompleted}</td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button }}>VIEW DETAILS</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* RESPONSE LOG TAB */}
      {activeTab === 'log' && (
        <div style={styles.tableContainer}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>AUDIT ID</th>
                <th style={styles.th}>TYPE</th>
                <th style={styles.th}>FROM</th>
                <th style={styles.th}>SUBJECT</th>
                <th style={styles.th}>DATE RECEIVED</th>
                <th style={styles.th}>ACTION TAKEN</th>
              </tr>
            </thead>
            <tbody>
              {responseLog.map(log => (
                <tr key={log.id}>
                  <td style={{ ...styles.td, color: '#cba658', fontWeight: '600' }}>{log.auditId}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa', border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                      {log.type}
                    </span>
                  </td>
                  <td style={styles.td}>{log.from}</td>
                  <td style={styles.td}>{log.subject}</td>
                  <td style={{ ...styles.td, fontSize: '10px', color: '#94a3b8' }}>{log.dateReceived}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                      {log.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export { CommunicationCenter, AuditActivityTracker };