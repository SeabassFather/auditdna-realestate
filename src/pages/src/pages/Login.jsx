import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/mexico-real-estate');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#f1f5f9', marginBottom: '8px' }}>Agent Login</h1>
          <p style={{ fontSize: '16px', color: '#94a3b8' }}>Access AuditDNA Platform</p>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '12px', padding: '32px' }}>
          {error && (
            <div style={{
              padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px', color: '#fca5a5', marginBottom: '20px', fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>
                Email
              </label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155',
                  borderRadius: '6px', color: '#f1f5f9', fontSize: '14px'
                }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>
                Password
              </label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155',
                  borderRadius: '6px', color: '#f1f5f9', fontSize: '14px'
                }} />
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
              color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1
            }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#94a3b8' }}>
              Not registered? <span onClick={() => navigate('/agent-register')} style={{ color: '#60a5fa', cursor: 'pointer', fontWeight: '600' }}>Register here</span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px' }}>
              <span onClick={() => navigate('/')} style={{ color: '#94a3b8', cursor: 'pointer' }}>Back to Home</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}