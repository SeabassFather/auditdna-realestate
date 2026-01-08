<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
﻿import React, { useState, useEffect } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { Activity, Database, Server, Users, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import ContactCard from '../components/ContactCard'; // Added for module access gating

// --- AdminPanel.js ---
// Last updated: 2025-10-14 22:40 UTC
// AdminPanel now requires approval to access via ContactCard (per-module approval).
// Only approved users can view the admin dashboard. Others see the request form or pending approval info.

export default function AdminPanel() {
  // Track module approval status (replace with real API check in production)
  const [approved, setApproved] = useState(false);
  const [pending, setPending] = useState(false);

  // Simulate: On mount, check if user is approved for the AdminPanel module
  useEffect(() => {
    async function checkApproval() {
      // TODO: Replace this with a real API call to your backend
      // Should return { approved: true } or { pending: true }
      try {
        const res = await fetch('/api/module-approval-status?module=AdminPanel');
        if (res.ok) {
          const data = await res.json();
          setApproved(!!data.approved);
          setPending(!!data.pending && !data.approved);
        } else {
          setApproved(false);
          setPending(false);
        }
      } catch (err) {
        setApproved(false);
        setPending(false);
      }
    }
    checkApproval();
  }, []);

  // If not approved, show the ContactCard for access request
  if (!approved) {
    // If request is pending, show pending info (ContactCard handles this UI state)
    return (
      <ContactCard moduleName="AdminPanel" language="english" />
    );
  }

  // --- APPROVED ADMIN VIEW ---
  const [systemStats, setSystemStats] = useState({
    uptime: '99.8%',
    apiCalls: '1,247',
    activeUsers: '89',
    casesPending: '23',
    casesCompleted: '1,224',
    avgResponseTime: '1.2s',
    storageUsed: '45.3 GB',
    bandwidth: '89.2 GB'
  });

  const engines = [
    { name: 'USDA Pricing', status: 'active', uptime: '99.9%', calls: 342 },
    { name: 'WaterTech', status: 'active', uptime: '98.7%', calls: 156 },
    { name: 'Mortgage', status: 'active', uptime: '99.5%', calls: 289 },
    { name: 'Factoring', status: 'active', uptime: '97.2%', calls: 123 },
    { name: 'Mexico RE', status: 'active', uptime: '98.9%', calls: 98 },
    { name: 'Compliance', status: 'active', uptime: '99.1%', calls: 201 },
    { name: 'Upload', status: 'active', uptime: '99.6%', calls: 412 }
  ];

  const s = {
    card: { background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', borderRadius: '16px', padding: '24px', border: '2px solid #e3f2fd', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: '#2d3748' },
    statCard: (color) => ({ padding: '20px', background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderRadius: '12px', border: `2px solid ${color}30` }),
    h: { fontSize: '26px', fontWeight: '700', color: '#1a365d', marginBottom: '24px' }
  };

  return (
    <div>
      <h2 style={s.h}>System Administration</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={s.statCard('#4caf50')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <CheckCircle size={24} color="#4caf50" />
            <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>System Uptime</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{systemStats.uptime}</div>
        </div>
        <div style={s.statCard('#2196f3')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Activity size={24} color="#2196f3" />
            <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>API Calls Today</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{systemStats.apiCalls}</div>
        </div>
        <div style={s.statCard('#ff9800')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Users size={24} color="#ff9800" />
            <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>Active Users</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{systemStats.activeUsers}</div>
        </div>
        <div style={s.statCard('#9c27b0')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Clock size={24} color="#9c27b0" />
            <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>Avg Response</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{systemStats.avgResponseTime}</div>
        </div>
        <div style={s.statCard('#f44336')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <AlertCircle size={24} color="#f44336" />
            <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>Pending Cases</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{systemStats.casesPending}</div>
        </div>
        <div style={s.statCard('#4caf50')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <TrendingUp size={24} color="#4caf50" />
            <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>Completed</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{systemStats.casesCompleted}</div>
        </div>
        <div style={s.statCard('#00bcd4')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Database size={24} color="#00bcd4" />
            <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>Storage Used</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{systemStats.storageUsed}</div>
        </div>
        <div style={s.statCard('#607d8b')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Server size={24} color="#607d8b" />
            <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>Bandwidth</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{systemStats.bandwidth}</div>
        </div>
      </div>
      <div style={s.card}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a365d', marginBottom: '20px' }}>Search Engine Status</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {engines.map((engine, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4caf50', boxShadow: '0 0 8px #4caf50' }}></div>
                <span style={{ fontWeight: '600', color: '#2d3748' }}>{engine.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#718096' }}>Uptime: </span>
                  <span style={{ fontWeight: '600', color: '#1a365d' }}>{engine.uptime}</span>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#718096' }}>Calls: </span>
                  <span style={{ fontWeight: '600', color: '#1a365d' }}>{engine.calls}</span>
                </div>
                <span style={{ padding: '4px 12px', background: '#4caf50', color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
