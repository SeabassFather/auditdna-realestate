import React, { useState, useEffect } from 'react';

export default function AdminINEVerification() {
  const [pendingAgents, setPendingAgents] = useState([]);

  useEffect(() => {
    loadPendingAgents();
  }, []);

  const loadPendingAgents = () => {
    const pending = JSON.parse(localStorage.getItem('pending_mexico_agents') || '[]');
    setPendingAgents(pending);
  };

  const approveAgent = (agentId) => {
    const pending = JSON.parse(localStorage.getItem('pending_mexico_agents') || '[]');
    const agent = pending.find(a => a.id === agentId);
    
    if (agent) {
      const verified = JSON.parse(localStorage.getItem('verified_mexico_agents') || '[]');
      agent.status = 'verified';
      agent.verifiedAt = new Date().toISOString();
      agent.agentId = `MX-${Date.now()}`;
      verified.push(agent);
      localStorage.setItem('verified_mexico_agents', JSON.stringify(verified));
      
      const remaining = pending.filter(a => a.id !== agentId);
      localStorage.setItem('pending_mexico_agents', JSON.stringify(remaining));
      
      loadPendingAgents();
      alert(`Agent approved! Agent ID: ${agent.agentId}`);
    }
  };

  const rejectAgent = (agentId) => {
    if (window.confirm('Reject this agent registration?')) {
      const pending = JSON.parse(localStorage.getItem('pending_mexico_agents') || '[]');
      const remaining = pending.filter(a => a.id !== agentId);
      localStorage.setItem('pending_mexico_agents', JSON.stringify(remaining));
      loadPendingAgents();
      alert('Agent registration rejected');
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
        INE Verification Queue ({pendingAgents.length})
      </h2>

      {pendingAgents.length === 0 ? (
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(203, 166, 88, 0.3)',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}></div>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cbd5e1', marginBottom: '16px' }}>
            All Caught Up!
          </h3>
          <p style={{ fontSize: '16px', color: '#94a3b8' }}>
            No pending agent verifications
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '24px' }}>
          {pendingAgents.map((agent) => (
            <div
              key={agent.id}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '2px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '16px',
                padding: '32px'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>
                    {agent.fullName}
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#94a3b8' }}>Email: </span>
                    <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{agent.email}</span>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#94a3b8' }}>Phone: </span>
                    <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{agent.phone}</span>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#94a3b8' }}>INE: </span>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#fbbf24' }}>{agent.ineNumber}</span>
                  </div>
                </div>

                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Commission Rate
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>
                      {agent.commissionRate}%
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Territory
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {agent.territoryCovered.map((territory, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(203, 166, 88, 0.2)',
                            border: '1px solid #cba658',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: '#cba658'
                          }}
                        >
                          {territory}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => approveAgent(agent.id)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                   Approve Agent
                </button>
                <button
                  onClick={() => rejectAgent(agent.id)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                   Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}