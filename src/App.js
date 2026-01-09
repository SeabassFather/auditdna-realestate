import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import AgentRegistration from './pages/AgentRegistration';
import MexicoRealEstate from './pages/MexicoRealEstate';
import Developments from './pages/Developments';
import USAMortgage from './pages/USAMortgage';
import URLA1003 from './pages/URLA1003';
import AdminDashboard from './pages/AdminDashboard';

// =============================================
// LANDING PAGE WITH NAV TO ALL SECTIONS
// =============================================
function LandingPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f172a',
      position: 'relative'
    }}>
      {/* TOP NAV BAR */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '14px', color: '#f1f5f9', letterSpacing: '2px', fontWeight: '300' }}>
          AUDITDNA REAL ESTATE
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                {user?.email} {isAdmin && '(Admin)'}
              </span>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  style={{
                    padding: '6px 14px',
                    background: 'rgba(148, 163, 184, 0.2)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    color: '#e2e8f0',
                    fontSize: '10px',
                    cursor: 'pointer',
                    letterSpacing: '1px'
                  }}
                >
                  ADMIN
                </button>
              )}
              <button
                onClick={logout}
                style={{
                  padding: '6px 14px',
                  background: 'transparent',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  color: '#94a3b8',
                  fontSize: '10px',
                  cursor: 'pointer',
                  letterSpacing: '1px'
                }}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '6px 14px',
                background: 'transparent',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                color: '#94a3b8',
                fontSize: '10px',
                cursor: 'pointer',
                letterSpacing: '1px'
              }}
            >
              AGENT LOGIN
            </button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 80px' }}>
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: '300', 
            color: '#f1f5f9', 
            marginBottom: '12px',
            letterSpacing: '4px'
          }}>
            MEXICO REAL ESTATE
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', letterSpacing: '2px' }}>
            PREMIUM PROPERTIES & CROSS-BORDER FINANCING
          </p>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
            Saul Garcia | NMLS #337526 | Everwise Home Loans & Realty
          </p>
        </div>

        {/* 3 MAIN CARDS */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          {/* MEXICO REAL ESTATE */}
          <div 
            onClick={() => navigate('/mexico-real-estate')}
            style={{ 
              background: 'rgba(30, 41, 59, 0.6)', 
              border: '1px solid rgba(148, 163, 184, 0.2)', 
              padding: '40px 28px', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.5)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
          >
            <div style={{ 
              fontSize: '11px', 
              color: '#64748b', 
              letterSpacing: '2px', 
              marginBottom: '12px' 
            }}>
              BIENES RAÍCES
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#f1f5f9', marginBottom: '10px' }}>
              Mexico Real Estate
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
              Baja California, Valle de Guadalupe, Ensenada, La Paz, Cabo
            </p>
          </div>

          {/* DEVELOPMENTS */}
          <div 
            onClick={() => navigate('/developments')}
            style={{ 
              background: 'rgba(30, 41, 59, 0.6)', 
              border: '1px solid rgba(148, 163, 184, 0.2)', 
              padding: '40px 28px', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.5)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
          >
            <div style={{ 
              fontSize: '11px', 
              color: '#64748b', 
              letterSpacing: '2px', 
              marginBottom: '12px' 
            }}>
              NEW CONSTRUCTION
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#f1f5f9', marginBottom: '10px' }}>
              Developments
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
              Pre-construction projects, master-planned communities
            </p>
          </div>

          {/* USA MORTGAGE */}
          <div 
            onClick={() => navigate('/usa-mortgage')}
            style={{ 
              background: 'rgba(30, 41, 59, 0.6)', 
              border: '1px solid rgba(148, 163, 184, 0.2)', 
              padding: '40px 28px', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.5)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
          >
            <div style={{ 
              fontSize: '11px', 
              color: '#64748b', 
              letterSpacing: '2px', 
              marginBottom: '12px' 
            }}>
              FINANCING
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#f1f5f9', marginBottom: '10px' }}>
              USA Mortgage Loans
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
              Purchase, refinance, cross-border financing
            </p>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '20px'
        }}>
          <button
            onClick={() => navigate('/1003-urla')}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              color: '#94a3b8',
              fontSize: '10px',
              cursor: 'pointer',
              letterSpacing: '1px'
            }}
          >
            1003 URLA FORM
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================
// ADMIN ROUTE - ONLY ADMIN CAN ACCESS
// =============================================
function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) return <div style={{ background: '#0f172a', minHeight: '100vh', color: '#fff', padding: '40px' }}>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  
  return children;
}

// =============================================
// APP ROUTES - ALL PUBLIC EXCEPT /admin
// =============================================
function AppRoutes() {
  return (
    <Routes>
      {/* ====== PUBLIC ROUTES - NO LOGIN NEEDED ====== */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/agent-register" element={<AgentRegistration />} />
      <Route path="/mexico-real-estate" element={<MexicoRealEstate />} />
      <Route path="/developments" element={<Developments />} />
      <Route path="/usa-mortgage" element={<USAMortgage />} />
      <Route path="/1003-urla" element={<URLA1003 />} />
      
      {/* ====== ADMIN ONLY ====== */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      
      {/* ====== CATCH ALL ====== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// =============================================
// MAIN APP EXPORT
// =============================================
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}