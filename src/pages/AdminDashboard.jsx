import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { Check, X, Eye, User, Building, FileText, Phone, Mail, Clock, Shield, ChevronDown, ChevronUp, Search, Filter, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { getAllAgents, approveAgent, rejectAgent, logout, user } = useAuth();
  const navigate = useNavigate();
  
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [newCredentials, setNewCredentials] = useState({ email: '', password: '' });

  // Load agents on mount
  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = () => {
    const agents = getAllAgents();
    setApplications(agents.all);
  };

  const filteredApps = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const name = app.personal?.fullName || app.fullName || '';
    const company = app.company?.name || app.companyName || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  const handleApprove = (appId) => {
    const app = applications.find(a => a.id === appId);
    setNewCredentials({
      email: app.personal?.email || app.email,
      password: generatePassword()
    });
    setShowCredentialsModal(true);
    setSelectedApp(app);
  };

  const confirmApproval = async () => {
    const result = await approveAgent(selectedApp.id, newCredentials);
    
    if (result.success) {
      // Send WhatsApp with credentials
      const name = selectedApp.personal?.fullName || selectedApp.fullName;
      const phone = selectedApp.personal?.phone || selectedApp.phone;
      const message = `✅ AGENT APPROVED!\n\nHello ${name},\n\nYour agent registration has been approved!\n\n🔐 LOGIN CREDENTIALS:\nEmail: ${newCredentials.email}\nPassword: ${newCredentials.password}\n\nLogin at: https://enjoybaja.com/login\n\nPlease change your password after first login.\n\nWelcome to EnjoyBaja!`;
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
      
      loadAgents(); // Reload data
    }
    
    setShowCredentialsModal(false);
    setSelectedApp(null);
  };

  const handleReject = async (appId, reason = '') => {
    const app = applications.find(a => a.id === appId);
    const result = await rejectAgent(appId, reason || 'Documents incomplete or could not be verified.');
    
    if (result.success) {
      const name = app.personal?.fullName || app.fullName;
      const phone = app.personal?.phone || app.phone;
      const message = `❌ REGISTRATION UPDATE\n\nHello ${name},\n\nWe were unable to approve your agent registration at this time.\n\n${reason ? `Reason: ${reason}\n\n` : ''}Please contact us if you have questions:\ninfo@enjoybaja.com\n+52 646 340 2686`;
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
      
      loadAgents(); // Reload data
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: 'rgba(234,179,8,0.2)', color: '#fbbf24', text: 'PENDING' },
      approved: { bg: 'rgba(34,197,94,0.2)', color: '#22c55e', text: 'APPROVED' },
      rejected: { bg: 'rgba(239,68,68,0.2)', color: '#ef4444', text: 'REJECTED' }
    };
    const s = styles[status];
    return (
      <span style={{ 
        background: s.bg, 
        color: s.color, 
        padding: '4px 10px', 
        fontSize: '10px', 
        fontWeight: '600',
        letterSpacing: '1px'
      }}>
        {s.text}
      </span>
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f172a', 
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* HEADER */}
      <div style={{ 
        background: '#1e293b', 
        borderBottom: '1px solid #334155',
        padding: '20px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '400', margin: 0, letterSpacing: '1px' }}>
            <Shield size={24} style={{ verticalAlign: 'middle', marginRight: '12px', color: '#cba658' }} />
            Admin Dashboard
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 0' }}>
            Logged in as <span style={{ color: '#cba658' }}>{user?.email}</span>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '28px', fontWeight: '600', color: '#fbbf24', margin: 0 }}>{pendingCount}</p>
              <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px' }}>PENDING</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '28px', fontWeight: '600', color: '#22c55e', margin: 0 }}>{approvedCount}</p>
              <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px' }}>APPROVED</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '28px', fontWeight: '600', color: '#ef4444', margin: 0 }}>{rejectedCount}</p>
              <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px' }}>REJECTED</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '1px solid #334155',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ 
        padding: '20px 32px', 
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by name, company, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#e2e8f0',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                background: filter === f ? '#cba658' : 'transparent',
                border: filter === f ? 'none' : '1px solid #334155',
                color: filter === f ? '#0f172a' : '#94a3b8',
                fontSize: '12px',
                fontWeight: filter === f ? '600' : '400',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* APPLICATIONS LIST */}
      <div style={{ padding: '24px 32px' }}>
        {filteredApps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            <User size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>No applications found</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredApps.map(app => (
              <div 
                key={app.id}
                style={{
                  background: '#1e293b',
                  border: selectedApp?.id === app.id ? '1px solid #cba658' : '1px solid #334155',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
              >
                {/* Application Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: selectedApp?.id === app.id ? '24px' : '0' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      background: '#334155', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#cba658'
                    }}>
                      {app.personal.fullName.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '500' }}>{app.personal.fullName}</h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
                        {app.company.position} at {app.company.name}
                      </p>
                      <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>
                        <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        {formatDate(app.submittedAt)} • {app.id}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {getStatusBadge(app.status)}
                    {selectedApp?.id === app.id ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedApp?.id === app.id && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                      {/* Personal Info */}
                      <div style={{ background: '#0f172a', padding: '16px', border: '1px solid #334155' }}>
                        <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '12px' }}>
                          <User size={12} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                          PERSONAL INFO
                        </p>
                        <p style={{ fontSize: '13px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail size={14} color="#64748b" /> {app.personal.email}
                        </p>
                        <p style={{ fontSize: '13px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Phone size={14} color="#64748b" /> {app.personal.phone}
                        </p>
                        {app.personal.whatsapp && app.personal.whatsapp !== app.personal.phone && (
                          <p style={{ fontSize: '13px', margin: 0, color: '#94a3b8' }}>
                            WhatsApp: {app.personal.whatsapp}
                          </p>
                        )}
                      </div>

                      {/* Company Info */}
                      <div style={{ background: '#0f172a', padding: '16px', border: '1px solid #334155' }}>
                        <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '12px' }}>
                          <Building size={12} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                          COMPANY INFO
                        </p>
                        <p style={{ fontSize: '14px', margin: '0 0 4px', fontWeight: '500' }}>{app.company.name}</p>
                        <p style={{ fontSize: '12px', margin: '0 0 4px', color: '#94a3b8' }}>{app.company.position}</p>
                        <p style={{ fontSize: '12px', margin: 0, color: '#64748b' }}>
                          {app.company.city}, {app.company.state}
                        </p>
                      </div>

                      {/* Manager Info */}
                      <div style={{ background: '#0f172a', padding: '16px', border: '1px solid #334155' }}>
                        <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '12px' }}>
                          <User size={12} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                          MANAGER/SUPERVISOR
                        </p>
                        <p style={{ fontSize: '14px', margin: '0 0 4px', fontWeight: '500' }}>{app.manager.name || '—'}</p>
                        <p style={{ fontSize: '12px', margin: '0 0 4px', color: '#94a3b8' }}>{app.manager.phone || '—'}</p>
                        <p style={{ fontSize: '12px', margin: 0, color: '#64748b' }}>{app.manager.email || '—'}</p>
                      </div>
                    </div>

                    {/* Documents */}
                    <div style={{ background: '#0f172a', padding: '16px', border: '1px solid #334155', marginBottom: '24px' }}>
                      <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '12px' }}>
                        <FileText size={12} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        UPLOADED DOCUMENTS
                      </p>
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {[
                          { key: 'ineFront', label: 'INE Front', required: true },
                          { key: 'ineBack', label: 'INE Back', required: true },
                          { key: 'businessLicense', label: 'Business License' },
                          { key: 'proofAddress', label: 'Proof of Address' },
                          { key: 'profilePhoto', label: 'Profile Photo' }
                        ].map(doc => (
                          <div key={doc.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {app.documents[doc.key] ? (
                              <Check size={16} color="#22c55e" />
                            ) : (
                              <X size={16} color={doc.required ? '#ef4444' : '#475569'} />
                            )}
                            <span style={{ 
                              fontSize: '13px', 
                              color: app.documents[doc.key] ? '#e2e8f0' : '#64748b' 
                            }}>
                              {doc.label}
                            </span>
                            {app.documents[doc.key] && (
                              <button style={{
                                background: 'transparent',
                                border: '1px solid #334155',
                                padding: '2px 8px',
                                fontSize: '10px',
                                color: '#94a3b8',
                                cursor: 'pointer'
                              }}>
                                <Eye size={12} style={{ verticalAlign: 'middle' }} /> View
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {app.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleReject(app.id, 'Documents incomplete or could not be verified.'); }}
                          style={{
                            padding: '12px 24px',
                            background: 'transparent',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <X size={16} /> Reject
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleApprove(app.id); }}
                          style={{
                            padding: '12px 24px',
                            background: '#22c55e',
                            border: 'none',
                            color: '#0f172a',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Check size={16} /> Approve & Send Credentials
                        </button>
                      </div>
                    )}

                    {app.status === 'approved' && app.credentials && (
                      <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', padding: '16px' }}>
                        <p style={{ fontSize: '12px', color: '#22c55e', margin: '0 0 8px' }}>✓ Approved on {formatDate(app.approvedAt)}</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                          Credentials sent to {app.personal.email}
                        </p>
                      </div>
                    )}

                    {app.status === 'rejected' && (
                      <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: '16px' }}>
                        <p style={{ fontSize: '12px', color: '#ef4444', margin: '0 0 8px' }}>✗ Rejected on {formatDate(app.rejectedAt)}</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                          {app.rejectionReason || 'No reason provided'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREDENTIALS MODAL */}
      {showCredentialsModal && selectedApp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            padding: '32px',
            width: '100%',
            maxWidth: '450px'
          }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#e2e8f0' }}>Approve Agent</h3>
            <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#64748b' }}>
              Generate login credentials for {selectedApp.personal.fullName}
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', letterSpacing: '1px' }}>
                LOGIN EMAIL
              </label>
              <input
                value={newCredentials.email}
                onChange={(e) => setNewCredentials({ ...newCredentials, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#e2e8f0',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', letterSpacing: '1px' }}>
                TEMPORARY PASSWORD
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  value={newCredentials.password}
                  onChange={(e) => setNewCredentials({ ...newCredentials, password: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    color: '#e2e8f0',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                  }}
                />
                <button
                  onClick={() => setNewCredentials({ ...newCredentials, password: generatePassword() })}
                  style={{
                    padding: '12px 16px',
                    background: '#334155',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Generate
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowCredentialsModal(false); setSelectedApp(null); }}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1px solid #334155',
                  color: '#94a3b8',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmApproval}
                style={{
                  padding: '12px 24px',
                  background: '#cba658',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Approve & Send via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}