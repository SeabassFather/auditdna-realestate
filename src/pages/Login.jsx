import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setIsSubmitting(false);
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed');
      setIsSubmitting(false);
    }
  };

  // GLASS TEXT STYLE
  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)',
    textShadow: '0 1px 15px rgba(0,0,0,0.2)'
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* MOUNTAIN BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />

      {/* OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.7) 100%)',
        zIndex: 1
      }} />

      {/* GLASS CARD */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        padding: '50px 45px',
        width: '100%',
        maxWidth: '420px'
      }}>
        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <span style={{ 
              ...glassText,
              fontSize: '16px', 
              letterSpacing: '2px',
              color: 'rgba(203, 213, 225, 0.8)'
            }}>EB</span>
          </div>
          <div style={{ 
            ...glassText,
            fontSize: '22px', 
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Enjoy Baja
          </div>
          <div style={{
            ...glassText,
            fontSize: '9px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(148, 163, 184, 0.6)'
          }}>
            Real Estate Portal
          </div>
        </div>

        {/* TITLE */}
        <h1 style={{ 
          ...glassText,
          fontSize: '24px',
          fontWeight: '200',
          textAlign: 'center',
          marginBottom: '8px',
          letterSpacing: '3px'
        }}>
          Welcome Back
        </h1>
        <p style={{
          ...glassText,
          fontSize: '11px',
          textAlign: 'center',
          marginBottom: '32px',
          color: 'rgba(148, 163, 184, 0.6)',
          letterSpacing: '2px'
        }}>
          Sign in to access your dashboard
        </p>

        {/* ERROR */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '12px 16px',
            marginBottom: '24px',
            color: '#ef4444',
            fontSize: '12px',
            textAlign: 'center',
            letterSpacing: '0.5px'
          }}>
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              ...glassText,
              display: 'block',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '10px',
              color: 'rgba(148, 163, 184, 0.7)'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isSubmitting}
              autoComplete="email"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                color: 'rgba(203, 213, 225, 0.9)',
                fontSize: '14px',
                fontFamily: '"Helvetica Neue", sans-serif',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{
              ...glassText,
              display: 'block',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '10px',
              color: 'rgba(148, 163, 184, 0.7)'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isSubmitting}
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                color: 'rgba(203, 213, 225, 0.9)',
                fontSize: '14px',
                fontFamily: '"Helvetica Neue", sans-serif',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: isSubmitting ? 'rgba(148, 163, 184, 0.3)' : 'rgba(203, 166, 88, 0.85)',
              border: 'none',
              color: isSubmitting ? 'rgba(148, 163, 184, 0.6)' : '#1e293b',
              fontSize: '10px',
              fontWeight: '400',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* DIVIDER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          margin: '28px 0',
          color: 'rgba(100, 116, 139, 0.5)',
          fontSize: '10px',
          letterSpacing: '2px'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(148, 163, 184, 0.15)' }} />
          <span>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(148, 163, 184, 0.15)' }} />
        </div>

        {/* REGISTER LINK */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{
            ...glassText,
            fontSize: '11px',
            color: 'rgba(148, 163, 184, 0.6)',
            letterSpacing: '1px'
          }}>
            New agent?
          </span>
          <Link 
            to="/register" 
            style={{
              ...glassText,
              fontSize: '11px',
              color: 'rgba(203, 166, 88, 0.9)',
              textDecoration: 'none',
              marginLeft: '6px',
              letterSpacing: '1px'
            }}
          >
            Register here
          </Link>
        </div>

        {/* BACK TO HOME */}
        <Link 
          to="/" 
          style={{
            ...glassText,
            display: 'block',
            textAlign: 'center',
            fontSize: '10px',
            color: 'rgba(100, 116, 139, 0.6)',
            textDecoration: 'none',
            letterSpacing: '2px'
          }}
        >
          Back to Home
        </Link>

        {/* DEMO CREDENTIALS */}
        <div style={{
          marginTop: '28px',
          padding: '16px',
          background: 'rgba(203, 166, 88, 0.08)',
          border: '1px solid rgba(203, 166, 88, 0.15)'
        }}>
          <div style={{
            ...glassText,
            fontSize: '9px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(203, 166, 88, 0.7)',
            marginBottom: '12px'
          }}>
            Demo Access
          </div>
          <div style={{
            ...glassText,
            fontSize: '11px',
            color: 'rgba(148, 163, 184, 0.7)',
            fontFamily: 'monospace',
            lineHeight: '2'
          }}>
            <div>Email: demo@enjoybaja.com</div>
            <div>Password: Demo2026!</div>
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(148, 163, 184, 0.1)', fontSize: '10px', color: 'rgba(148, 163, 184, 0.5)' }}>PIN: 0000</div>
          </div>
        </div>
      </div>
    </div>
  );
}