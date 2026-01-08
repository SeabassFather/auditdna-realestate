import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MexicoRealEstate from './pages/MexicoRealEstate';
import Developments from './pages/Developments';
import USAMortgage from './pages/USAMortgage';
import Login from './pages/Login';
import AgentRegistration from './pages/AgentRegistration';
import ProtectedRoute from './components/auth/ProtectedRoute';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button onClick={() => navigate('/login')} style={{
          padding: '10px 20px', background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px',
          color: '#60a5fa', fontWeight: '600', cursor: 'pointer'
        }}>
          Agent Login
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px',
            background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '4px', marginBottom: '24px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#60a5fa', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Professional Real Estate Platform
            </span>
          </div>

          <h1 style={{ fontSize: '56px', fontWeight: '300', color: '#f1f5f9', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            AuditDNA Platform
          </h1>

          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', fontWeight: '300' }}>
            Premium real estate & financial services for Mexico and USA properties
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div onClick={() => navigate('/mexico-real-estate')} style={{
            background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b',
            borderRadius: '4px', padding: '48px 32px', cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)'; }}>
            <div style={{ width: '48px', height: '48px', background: '#1e293b', border: '1px solid #334155', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#60a5fa', letterSpacing: '0.5px' }}>MX</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#f1f5f9', marginBottom: '12px' }}>Mexico Real Estate</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '24px', fontWeight: '300' }}>
              Premium properties in Baja California, Valle de Guadalupe, Puerto Vallarta, and coastal Mexico
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#60a5fa' }}>
              Browse Properties <span>→</span>
            </div>
          </div>

          <div onClick={() => navigate('/developments')} style={{
            background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b',
            borderRadius: '4px', padding: '48px 32px', cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)'; }}>
            <div style={{ width: '48px', height: '48px', background: '#1e293b', border: '1px solid #334155', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.5px' }}>DEV</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#f1f5f9', marginBottom: '12px' }}>Developments</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '24px', fontWeight: '300' }}>
              Master-planned communities and new development projects
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#60a5fa' }}>
              View Communities <span>→</span>
            </div>
          </div>

          <div onClick={() => navigate('/usa-mortgage')} style={{
            background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b',
            borderRadius: '4px', padding: '48px 32px', cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)'; }}>
            <div style={{ width: '48px', height: '48px', background: '#1e293b', border: '1px solid #334155', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.5px' }}>US</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#f1f5f9', marginBottom: '12px' }}>USA Mortgage</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '24px', fontWeight: '300' }}>
              Mortgage financing for US properties
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#60a5fa' }}>
              Get Pre-Approved <span>→</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '120px', paddingTop: '40px', borderTop: '1px solid #1e293b', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>Saul Garcia</div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>NMLS #337526</div>
          <div style={{ fontSize: '12px', color: '#475569' }}>Everwise Home Loans and Realty | Company NMLS #1739012 | DRE #02067255</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agent-register" element={<AgentRegistration />} />
        <Route path="/mexico-real-estate" element={<ProtectedRoute><MexicoRealEstate /></ProtectedRoute>} />
        <Route path="/developments" element={<ProtectedRoute><Developments /></ProtectedRoute>} />
        <Route path="/usa-mortgage" element={<ProtectedRoute><USAMortgage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;