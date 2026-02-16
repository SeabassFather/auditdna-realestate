// ============================================================
// CORRECT LANDINGPAGE.JSX - AUDITDNA CARD
// The card should NAVIGATE to /audit-direct
// It should NOT render the component directly
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* ... other content ... */}
      
      {/* 5 CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        
        {/* AUDITDNA CARD - CORRECT WAY */}
        <div
          onClick={() => navigate('/audit-direct')}  {/* ✅ CORRECT - Navigate to route */}
          style={{
            cursor: 'pointer',
            background: 'url(...)',
            // ... card styles ...
          }}
        >
          <h3>AUDITDNA</h3>
          <p>Mortgage Recovery</p>
        </div>

        {/* Real Estate Card */}
        <div onClick={() => navigate('/mexico-real-estate')}>
          <h3>Real Estate</h3>
        </div>

        {/* Lifestyle Guide Card */}
        <div onClick={() => navigate('/lifestyle')}>
          <h3>Lifestyle Guide</h3>
        </div>

        {/* Developments Card */}
        <div onClick={() => navigate('/developments')}>
          <h3>Developments</h3>
        </div>

        {/* US & Mexico Loans Card */}
        <div onClick={() => navigate('/loans')}>
          <h3>US & Mexico Loans</h3>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

// ============================================================
// CRITICAL: WRONG WAY (DO NOT DO THIS)
// ============================================================
// ❌ WRONG - Do NOT render component directly:
// <div onClick={() => <AuditDNADirect />}>  // THIS IS WRONG!
//
// ❌ WRONG - Do NOT import and render:
// import AuditDNADirect from './Auditdnadirect';
// return <AuditDNADirect />  // THIS IS WRONG!
//
// ✅ CORRECT - Use navigate:
// onClick={() => navigate('/audit-direct')}
// ============================================================