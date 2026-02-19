import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ================================================================
// CREDENTIALS — Updated Feb 2026 — New eb.com email format
// UI/UX UNCHANGED. Only credentials + multi-role login updated.
// ================================================================

// Build full user list: owner, admins, sales, agents, demo
const ALL_USERS = [
  // OWNER
  { email: 'sg01@eb.com',      password: '060905Dsg#321', pin: '10051974', role: 'owner', name: 'Saul Garcia' },
  // ADMINS
  { email: 'jl-02@eb.com',     password: 'Admin2026!',    pin: '0505',     role: 'admin', name: 'Admin JL' },
  { email: 'ab-03@eb.com',     password: 'Admin2026!',    pin: '0505',     role: 'admin', name: 'Admin AB' },
  { email: 'admin01@eb.com',   password: 'Admin2026!',    pin: '0101',     role: 'admin', name: 'Admin 01' },
  { email: 'admin02@eb.com',   password: 'Admin2026!',    pin: '0202',     role: 'admin', name: 'Admin 02' },
  { email: 'admin03@eb.com',   password: 'Admin2026!',    pin: '0303',     role: 'admin', name: 'Admin 03' },
  { email: 'admin04@eb.com',   password: 'Admin2026!',    pin: '0404',     role: 'admin', name: 'Admin 04' },
  { email: 'admin05@eb.com',   password: 'Admin2026!',    pin: '0505',     role: 'admin', name: 'Admin 05' },
  // SALES (no PIN modal — direct login)
  { email: 'sales01@eb.com',   password: 'Sales2026!',    pin: '1001',     role: 'sales', name: 'Sales 01' },
  { email: 'sales02@eb.com',   password: 'Sales2026!',    pin: '1002',     role: 'sales', name: 'Sales 02' },
  { email: 'sales03@eb.com',   password: 'Sales2026!',    pin: '1003',     role: 'sales', name: 'Sales 03' },
  { email: 'sales04@eb.com',   password: 'Sales2026!',    pin: '1004',     role: 'sales', name: 'Sales 04' },
  { email: 'sales05@eb.com',   password: 'Sales2026!',    pin: '1005',     role: 'sales', name: 'Sales 05' },
  // DEMO (no PIN modal)
  { email: 'demo@eb.com',      password: 'Demo2026!',     pin: '0000',     role: 'demo',  name: 'Demo User' },
  // RE AGENTS 00-50 (no PIN modal — direct to agent area)
  ...Array.from({ length: 51 }, (_, i) => {
    const num = String(i).padStart(2, '0');
    return { email: `REagent-${num}@eb.com`, password: `Agent${num}#2026`, pin: String(1000 + i), role: 'agent', name: `RE Agent ${num}` };
  })
];

// Roles that require PIN modal after password: owner + admin
const NEEDS_PIN = ['owner', 'admin'];

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const found = ALL_USERS.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );

    if (!found) {
      setError('Invalid credentials. Contact sg01@eb.com for access.');
      return;
    }

    // Owner & Admin — show PIN modal (your original UX preserved)
    if (NEEDS_PIN.includes(found.role)) {
      setUser(found);
      setShowPin(true);
      return;
    }

    // All other roles — direct login, no PIN needed
    login(found);
    const from = location.state?.from?.pathname || sessionStorage.getItem('redirect_after_login');
    sessionStorage.removeItem('redirect_after_login');
    if (found.role === 'sales') {
      navigate(from && from !== '/login' ? from : '/admin');
    } else if (found.role === 'agent') {
      navigate(from && from !== '/login' ? from : '/mexico-real-estate');
    } else {
      navigate(from && from !== '/login' ? from : '/');
    }
  };

  const handlePin = (e) => {
    e.preventDefault();
    setPinError('');

    if (pin === user.pin) {
      login(user);
      sessionStorage.setItem('admin_pin', pin);
      
      // FIXED: Check where user was trying to go before login
      const from = location.state?.from?.pathname || sessionStorage.getItem('redirect_after_login');
      
      // OWNER/ADMIN logic:
      if (user.role === 'owner' || user.role === 'admin') {
        // If they were trying to access a specific page, send them there
        if (from && from !== '/login') {
          sessionStorage.removeItem('redirect_after_login');
          navigate(from);
        } else {
          // Default to admin dashboard
          navigate('/admin');
        }
      } else {
        // Other users - go where they were trying to go OR home
        const destination = from && from !== '/login' ? from : '/';
        sessionStorage.removeItem('redirect_after_login');
        navigate(destination);
      }
    } else {
      setPinError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      {!showPin ? (
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(203, 166, 88, 0.3)', padding: '60px', maxWidth: '500px', width: '100%' }}>
          <h1 style={{ fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '200', fontSize: '32px', letterSpacing: '3px', color: '#cba658', marginBottom: '40px', textAlign: 'center' }}>ENJOY BAJA</h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', color: 'rgba(203, 213, 225, 0.7)', marginBottom: '8px' }}>EMAIL</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '14px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(203, 166, 88, 0.3)', color: '#FFFFFF', fontSize: '14px', fontFamily: '"Helvetica Neue", sans-serif' }} required />
            </div>
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', color: 'rgba(203, 213, 225, 0.7)', marginBottom: '8px' }}>PASSWORD</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '14px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(203, 166, 88, 0.3)', color: '#FFFFFF', fontSize: '14px', fontFamily: '"Helvetica Neue", sans-serif' }} required />
            </div>
            {error && <div style={{ padding: '12px', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', fontSize: '12px', marginBottom: '24px', textAlign: 'center' }}>{error}</div>}
            <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', color: '#0f172a', fontSize: '12px', letterSpacing: '2px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif' }}>LOGIN</button>
          </form>
        </div>
      ) : (
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '2px solid rgba(203, 166, 88, 0.4)', padding: '60px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '200', fontSize: '24px', letterSpacing: '2px', color: '#cba658', marginBottom: '32px' }}>ENTER PIN</h2>
          <form onSubmit={handlePin}>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} maxLength={user?.role === 'owner' ? 8 : 4} style={{ width: '100%', padding: '20px', background: 'rgba(15, 23, 42, 0.5)', border: '2px solid rgba(203, 166, 88, 0.3)', color: '#FFFFFF', fontSize: '24px', textAlign: 'center', letterSpacing: '8px', fontFamily: 'monospace', marginBottom: '24px' }} placeholder="••••••" required autoFocus />
            {pinError && <div style={{ padding: '12px', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', fontSize: '12px', marginBottom: '24px' }}>{pinError}</div>}
            <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', color: '#0f172a', fontSize: '12px', letterSpacing: '2px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif' }}>VERIFY</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;