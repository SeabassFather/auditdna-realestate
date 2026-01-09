import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Redirect based on role
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else if (result.user.role === 'agent') {
          navigate('/mexico-real-estate');
        } else {
          navigate('/');
        }
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      {/* Background Image */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15
      }} />

      {/* Login Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        background: '#1e293b',
        border: '1px solid #334155',
        padding: '48px 40px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '1px solid #cba658',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <span style={{ color: '#cba658', fontSize: '18px', fontWeight: '300', letterSpacing: '2px' }}>EB</span>
          </div>
          <h1 style={{ 
            color: '#e2e8f0', 
            fontSize: '24px', 
            fontWeight: '300', 
            letterSpacing: '4px',
            textTransform: 'uppercase',
            margin: '0 0 8px'
          }}>
            Enjoy Baja
          </h1>
          <p style={{ 
            color: '#64748b', 
            fontSize: '12px', 
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Agent Portal
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            padding: '12px 16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertCircle size={18} color="#ef4444" />
            <span style={{ color: '#fca5a5', fontSize: '13px' }}>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              color: '#94a3b8',
              letterSpacing: '1px',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              color: '#94a3b8',
              letterSpacing: '1px',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 44px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? '#334155' : '#cba658',
              border: 'none',
              color: loading ? '#64748b' : '#0f172a',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {loading ? 'Signing In...' : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '32px 0',
          gap: '16px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#334155' }} />
          <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#334155' }} />
        </div>

        {/* Register Link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>
            Want to become an agent?
          </p>
          <button
            onClick={() => navigate('/agent-register')}
            style={{
              width: '100%',
              padding: '14px',
              background: 'transparent',
              border: '1px solid #334155',
              color: '#94a3b8',
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Apply to Join
          </button>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}