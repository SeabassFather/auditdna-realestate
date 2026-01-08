import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FiveVerificationEngines() {
  const navigate = useNavigate();
  const [selectedEngine, setSelectedEngine] = useState('ai');

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)'
    },
    header: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    headerContent: {
      maxWidth: '1800px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#ffffff',
      margin: 0
    },
    backBtn: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    content: {
      maxWidth: '1800px',
      margin: '0 auto',
      padding: '40px'
    },
    engineGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    },
    engineCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '35px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      border: '3px solid #fef3c7',
      cursor: 'pointer',
      transition: 'all 0.4s',
      position: 'relative',
      overflow: 'hidden'
    }
  };

  const engines = [
    {
      id: 'ai',
      name: '🤖 AI Anomaly Detection',
      desc: 'Machine learning algorithms detect irregular patterns in real-time',
      stats: { alerts: '12', accuracy: '99.4%', processed: '847K' },
      color: '#8b5cf6',
      status: 'ACTIVE'
    },
    {
      id: 'blockchain',
      name: '⛓️ Blockchain Verification',
      desc: 'Immutable ledger verification with cryptographic signatures',
      stats: { blocks: '2.4M', transactions: '8.9M', nodes: '156' },
      color: '#3b82f6',
      status: 'ACTIVE'
    },
    {
      id: 'biometric',
      name: '👁️ Biometric Authentication',
      desc: 'Fingerprint, facial recognition, and iris scanning',
      stats: { scans: '45K', matches: '99.8%', users: '3,421' },
      color: '#10b981',
      status: 'ACTIVE'
    },
    {
      id: 'iot',
      name: '📡 IoT Sensor Network',
      desc: 'Real-time monitoring from distributed sensor arrays',
      stats: { sensors: '12,847', readings: '1.2M/day', uptime: '99.9%' },
      color: '#f59e0b',
      status: 'ACTIVE'
    },
    {
      id: 'quantum',
      name: '⚛️ Quantum Encryption',
      desc: 'Quantum-resistant cryptography for ultimate security',
      stats: { keys: '847', encrypted: '99.99%', speed: '2.4ms' },
      color: '#ec4899',
      status: 'BETA'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>🛡️ Five Verification Engines</h1>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '10px'}}>
              Multi-Layer Security & Verification System
            </p>
          </div>
          <button 
            style={styles.backBtn}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {/* System Overview Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          {[
            { icon: '🔒', label: 'Total Verifications', value: '14.2M', color: '#10b981' },
            { icon: '⚡', label: 'Avg Response Time', value: '1.8ms', color: '#3b82f6' },
            { icon: '✅', label: 'Success Rate', value: '99.94%', color: '#f59e0b' },
            { icon: '🚨', label: 'Threats Blocked', value: '8,456', color: '#ef4444' },
            { icon: '🌐', label: 'Active Nodes', value: '342', color: '#8b5cf6' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '36px', marginBottom: '10px'}}>{stat.icon}</div>
              <div style={{fontSize: '28px', fontWeight: 'bold', color: stat.color, marginBottom: '5px'}}>
                {stat.value}
              </div>
              <div style={{fontSize: '12px', color: '#6b7280', textTransform: 'uppercase'}}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Engine Cards */}
        <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#065f46', marginBottom: '25px'}}>
          Verification Engines
        </h2>
        <div style={styles.engineGrid}>
          {engines.map((engine, i) => (
            <div
              key={engine.id}
              style={{...styles.engineCard, borderColor: engine.color + '40'}}
              onClick={() => setSelectedEngine(engine.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.borderColor = engine.color;
                e.currentTarget.style.boxShadow = `0 15px 40px ${engine.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = engine.color + '40';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              }}
            >
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 'bold',
                background: engine.status === 'ACTIVE' ? '#dcfce7' : '#fef3c7',
                color: engine.status === 'ACTIVE' ? '#059669' : '#d97706'
              }}>
                {engine.status}
              </div>

              <div style={{fontSize: '48px', marginBottom: '15px'}}>
                {engine.name.split(' ')[0]}
              </div>
              <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#065f46', marginBottom: '15px'}}>
                {engine.name.substring(3)}
              </h3>
              <p style={{color: '#6b7280', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px'}}>
                {engine.desc}
              </p>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                paddingTop: '20px',
                borderTop: '2px solid #f3f4f6'
              }}>
                {Object.entries(engine.stats).map(([key, value]) => (
                  <div key={key} style={{textAlign: 'center'}}>
                    <div style={{fontSize: '20px', fontWeight: 'bold', color: engine.color}}>
                      {value}
                    </div>
                    <div style={{fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', marginTop: '4px'}}>
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Engine View */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          marginTop: '40px'
        }}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#065f46', marginBottom: '20px'}}>
            Real-Time Security Dashboard
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              { title: 'Threats Detected (24h)', value: '847', trend: '+12%', status: 'warning' },
              { title: 'False Positives', value: '0.06%', trend: '-3%', status: 'success' },
              { title: 'Processing Queue', value: '234', trend: 'stable', status: 'info' },
              { title: 'System Health', value: '99.9%', trend: 'optimal', status: 'success' }
            ].map((metric, i) => (
              <div key={i} style={{
                padding: '20px',
                borderRadius: '10px',
                background: '#f9fafb',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase'}}>
                  {metric.title}
                </div>
                <div style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px'}}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: metric.status === 'success' ? '#10b981' : metric.status === 'warning' ? '#f59e0b' : '#3b82f6'
                }}>
                  {metric.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

