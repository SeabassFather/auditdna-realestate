import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AgentVettingPanel = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = () => {
    const data = JSON.parse(localStorage.getItem('registered_agents') || '[]');
    setAgents(data.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)));
  };

  const updateAgentStatus = (agentId, newStatus, reason = null) => {
    const updated = agents.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          status: newStatus,
          verifiedAt: newStatus === 'verified' ? new Date().toISOString() : null,
          verifiedBy: newStatus === 'verified' ? 'admin@enjoybaja.com' : null,
          rejectedAt: newStatus === 'rejected' ? new Date().toISOString() : null,
          rejectedReason: reason
        };
      }
      return agent;
    });

    setAgents(updated);
    localStorage.setItem('registered_agents', JSON.stringify(updated));
    setSelectedAgent(null);
    setRejectionReason('');
  };

  const filteredAgents = agents.filter(a => filter === 'all' || a.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return '#4ade80';
      case 'rejected': return '#f87171';
      case 'suspended': return '#fbbf24';
      default: return '#cba658';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cardStyle = {
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '16px'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
      padding: '24px',
      fontFamily: '"Helvetica Neue", sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/admin')}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'rgba(148, 163, 184, 0.6)', 
            cursor: 'pointer',
            fontSize: '12px',
            marginBottom: '16px'
          }}
        >
          ← Back to Admin
        </button>
        <h1 style={{ fontSize: '24px', fontWeight: '200', letterSpacing: '4px', color: '#cba658', marginBottom: '8px' }}>
          AGENT VETTING
        </h1>
        <p style={{ fontSize: '12px', color: 'rgba(148, 163, 184, 0.6)' }}>
          Review and approve agent registrations
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {['pending', 'verified', 'rejected', 'all'].map(status => {
          const count = status === 'all' ? agents.length : agents.filter(a => a.status === status).length;
          return (
            <div 
              key={status}
              onClick={() => setFilter(status)}
              style={{ 
                ...cardStyle, 
                cursor: 'pointer',
                border: filter === status ? '1px solid #cba658' : '1px solid rgba(148, 163, 184, 0.2)',
                background: filter === status ? 'rgba(203, 166, 88, 0.1)' : 'rgba(30, 41, 59, 0.5)'
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: '200', color: getStatusColor(status), marginBottom: '4px' }}>
                {count}
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.6)', textTransform: 'uppercase' }}>
                {status}
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent List */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedAgent ? '1fr 400px' : '1fr', gap: '24px' }}>
        <div>
          {filteredAgents.length === 0 ? (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '60px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>📋</div>
              <p style={{ color: 'rgba(148, 163, 184, 0.5)' }}>No {filter} registrations</p>
            </div>
          ) : (
            filteredAgents.map(agent => (
              <div 
                key={agent.id} 
                style={{ 
                  ...cardStyle, 
                  cursor: 'pointer',
                  border: selectedAgent?.id === agent.id ? '1px solid #cba658' : '1px solid rgba(148, 163, 184, 0.2)'
                }}
                onClick={() => setSelectedAgent(agent)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ color: '#e2e8f0', fontSize: '16px', margin: 0 }}>{agent.fullName}</h3>
                      <span style={{ 
                        fontSize: '9px', 
                        padding: '4px 8px', 
                        background: getStatusColor(agent.status) + '20', 
                        color: getStatusColor(agent.status), 
                        borderRadius: '4px', 
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {agent.status}
                      </span>
                      {agent.isRealEstateAgent && (
                        <span style={{ 
                          fontSize: '9px', 
                          padding: '4px 8px', 
                          background: 'rgba(148, 163, 184, 0.2)', 
                          color: 'rgba(148, 163, 184, 0.8)', 
                          borderRadius: '4px'
                        }}>
                          AGENT
                        </span>
                      )}
                    </div>
                    <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '12px', marginBottom: '4px' }}>
                      {agent.email} • {agent.phone}
                    </p>
                    <p style={{ color: 'rgba(148, 163, 184, 0.4)', fontSize: '11px' }}>
                      Registered: {formatDate(agent.registeredAt)}
                    </p>
                  </div>
                  <div style={{ fontSize: '20px' }}>
                    {agent.idDocumentUrl ? '🪪' : '⚠️'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        {selectedAgent && (
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.95)', 
            border: '1px solid rgba(203, 166, 88, 0.3)', 
            borderRadius: '8px',
            padding: '24px',
            position: 'sticky',
            top: '24px',
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: '#cba658', fontSize: '14px', letterSpacing: '2px', margin: 0 }}>
                REGISTRATION DETAILS
              </h3>
              <button 
                onClick={() => setSelectedAgent(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(148, 163, 184, 0.5)', cursor: 'pointer', fontSize: '18px' }}
              >
                ×
              </button>
            </div>

            {/* Contact Info */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.5)', marginBottom: '12px' }}>
                CONTACT INFORMATION
              </p>
              <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: '2' }}>
                <div><strong>Name:</strong> {selectedAgent.fullName}</div>
                <div><strong>Email:</strong> {selectedAgent.email}</div>
                <div><strong>Phone:</strong> {selectedAgent.phone}</div>
                <div><strong>Country:</strong> {selectedAgent.country}</div>
              </div>
            </div>

            {/* ID Document */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.5)', marginBottom: '12px' }}>
                ID DOCUMENT ({selectedAgent.idType})
              </p>
              {selectedAgent.idDocumentUrl ? (
                <div style={{ 
                  background: 'rgba(30, 41, 59, 0.5)', 
                  borderRadius: '8px', 
                  padding: '8px',
                  textAlign: 'center'
                }}>
                  {selectedAgent.idDocumentType?.includes('pdf') ? (
                    <div style={{ padding: '20px', color: 'rgba(148, 163, 184, 0.6)' }}>
                      📑 PDF Document<br />
                      <span style={{ fontSize: '11px' }}>{selectedAgent.idDocumentName}</span>
                    </div>
                  ) : (
                    <img 
                      src={selectedAgent.idDocumentUrl} 
                      alt="ID Document" 
                      style={{ maxWidth: '100%', borderRadius: '4px' }}
                    />
                  )}
                </div>
              ) : (
                <p style={{ color: '#f87171', fontSize: '12px' }}>⚠️ No document uploaded</p>
              )}
            </div>

            {/* Professional Info */}
            {selectedAgent.isRealEstateAgent && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.5)', marginBottom: '12px' }}>
                  PROFESSIONAL DETAILS
                </p>
                <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: '2' }}>
                  <div><strong>RFC:</strong> {selectedAgent.rfc || 'Not provided'}</div>
                  <div><strong>License:</strong> {selectedAgent.licenseNumber || 'Not provided'}</div>
                  <div><strong>Brokerage:</strong> {selectedAgent.brokerageName || 'Not provided'}</div>
                  <div><strong>Experience:</strong> {selectedAgent.yearsExperience || 'Not provided'}</div>
                </div>
              </div>
            )}

            {/* Metadata */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.5)', marginBottom: '12px' }}>
                METADATA
              </p>
              <div style={{ fontSize: '11px', color: 'rgba(148, 163, 184, 0.6)', lineHeight: '2' }}>
                <div><strong>ID:</strong> {selectedAgent.id}</div>
                <div><strong>IP:</strong> {selectedAgent.ipAddress}</div>
                <div><strong>Registered:</strong> {formatDate(selectedAgent.registeredAt)}</div>
                <div><strong>Newsletter:</strong> {selectedAgent.newsletterConsent ? '✅ Yes' : '❌ No'}</div>
              </div>
            </div>

            {/* Actions */}
            {selectedAgent.status === 'pending' && (
              <div>
                <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.5)', marginBottom: '12px' }}>
                  ACTIONS
                </p>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <button
                    onClick={() => updateAgentStatus(selectedAgent.id, 'verified')}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'rgba(74, 222, 128, 0.2)',
                      border: '1px solid rgba(74, 222, 128, 0.5)',
                      color: '#4ade80',
                      fontSize: '11px',
                      letterSpacing: '2px',
                      cursor: 'pointer'
                    }}
                  >
                    ✓ APPROVE
                  </button>
                  <button
                    onClick={() => {
                      if (rejectionReason.trim()) {
                        updateAgentStatus(selectedAgent.id, 'rejected', rejectionReason);
                      } else {
                        alert('Please provide a rejection reason');
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'rgba(248, 113, 113, 0.2)',
                      border: '1px solid rgba(248, 113, 113, 0.5)',
                      color: '#f87171',
                      fontSize: '11px',
                      letterSpacing: '2px',
                      cursor: 'pointer'
                    }}
                  >
                    ✗ REJECT
                  </button>
                </div>
                <textarea
                  placeholder="Rejection reason (required for rejection)"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '4px',
                    color: '#e2e8f0',
                    fontSize: '12px',
                    minHeight: '80px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}

            {selectedAgent.status === 'verified' && (
              <div style={{ 
                background: 'rgba(74, 222, 128, 0.1)', 
                border: '1px solid rgba(74, 222, 128, 0.3)', 
                borderRadius: '8px', 
                padding: '16px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '24px' }}>✅</span>
                <p style={{ color: '#4ade80', fontSize: '12px', marginTop: '8px' }}>
                  Verified on {formatDate(selectedAgent.verifiedAt)}
                </p>
              </div>
            )}

            {selectedAgent.status === 'rejected' && (
              <div style={{ 
                background: 'rgba(248, 113, 113, 0.1)', 
                border: '1px solid rgba(248, 113, 113, 0.3)', 
                borderRadius: '8px', 
                padding: '16px'
              }}>
                <span style={{ fontSize: '24px' }}>❌</span>
                <p style={{ color: '#f87171', fontSize: '12px', marginTop: '8px' }}>
                  Rejected: {selectedAgent.rejectedReason}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentVettingPanel;