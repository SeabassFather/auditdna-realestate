import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData.name, formData.email, formData.phone, formData.password);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  const s = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
    card: { maxWidth: '450px', width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '40px' },
    title: { fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '8px', textAlign: 'center' },
    subtitle: { fontSize: '14px', color: '#94a3b8', marginBottom: '32px', textAlign: 'center' },
    label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' },
    input: { width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px', marginBottom: '20px' },
    btn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' },
    link: { textAlign: 'center', fontSize: '14px', color: '#94a3b8' },
    linkBtn: { color: '#cba658', textDecoration: 'none', fontWeight: '600' },
    error: { padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px', color: '#ef4444', fontSize: '14px', marginBottom: '16px' }
  };

  return (
    <div style={s.container}>
      <div style={s.card}>
        <h1 style={s.title}>Create Account</h1>
        <p style={s.subtitle}>Join AuditDNA Real Estate</p>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label style={s.label}>Full Name</label>
            <input
              type="text"
              style={s.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="John Doe"
            />
          </div>

          <div>
            <label style={s.label}>Email Address</label>
            <input
              type="email"
              style={s.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label style={s.label}>Phone Number</label>
            <input
              type="tel"
              style={s.input}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="+52 646 340 2686"
            />
          </div>

          <div>
            <label style={s.label}>Password</label>
            <input
              type="password"
              style={s.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder=""
              minLength="6"
            />
          </div>

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? ' Creating Account...' : ' Create Account'}
          </button>
        </form>

        <div style={s.link}>
          Already have an account?{' '}
          <Link to="/login" style={s.linkBtn}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}