import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #334155',
            borderTopColor: '#cba658',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#64748b', fontSize: '14px' }}>Verifying access...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but NOT admin - redirect to home with message
  if (user.role !== 'admin') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#1e293b',
          border: '1px solid #ef4444',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
          <h2 style={{ color: '#ef4444', fontSize: '20px', marginBottom: '12px' }}>Access Denied</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
            This area is restricted to administrators only.
          </p>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#cba658',
              color: '#0f172a',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  // User is admin - allow access
  return children;
}