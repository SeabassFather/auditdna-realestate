// PARTNER LOGIN - /partner/login
// Partners log in here to access their dashboard

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PartnerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/partners/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        sessionStorage.setItem('partner_token', data.token);
        sessionStorage.setItem('partner_data', JSON.stringify(data.partner));
        navigate('/partner/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '48px',
        maxWidth: '480px',
        width: '100%',
        border: '1px solid rgba(148, 163, 184, 0.2)'
      }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ ...glassText, fontSize: '28px', fontWeight: '300', color: '#cba658', marginBottom: '8px', letterSpacing: '2px' }}>
            Partner Login
          </h1>
          <p style={{ ...glassText, fontSize: '12px', color: '#94a3b8', letterSpacing: '1px' }}>
            AuditDNA Partner Program
          </p>
        </div>

        {/* EMAIL */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="partner@company.com"
            style={{
              width: '100%',
              padding: '14px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '6px',
              color: '#e2e8f0',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            autoFocus
          />
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '14px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '6px',
              color: '#e2e8f0',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p style={{
            ...glassText,
            fontSize: '11px',
            color: '#f87171',
            textAlign: 'center',
            marginBottom: '16px',
            padding: '10px',
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            borderRadius: '6px'
          }}>
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '14px',
            background: isLoading ? 'rgba(148, 163, 184, 0.2)' : 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)',
            border: 'none',
            borderRadius: '6px',
            color: isLoading ? '#64748b' : '#0f172a',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '2px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginBottom: '16px'
          }}
        >
          {isLoading ? 'LOGGING IN...' : 'LOGIN'}
        </button>

        {/* LINKS */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ ...glassText, fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
            Need an account?{' '}
            <span
              onClick={() => navigate('/partner/register')}
              style={{ color: '#cba658', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Apply Here
            </span>
          </p>
          <p style={{ ...glassText, fontSize: '10px', color: '#64748b' }}>
            <span
              onClick={() => navigate('/')}
              style={{ color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
            >
              ← Back to Home
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default PartnerLogin;