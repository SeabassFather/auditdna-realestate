import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// YOUR CREDENTIALS
const OWNER = {
  email: 'saul@enjoybaja.com',
  password: 'Admin2026!',
  pin: '060905',
  role: 'owner',
  name: 'Saul Garcia'
};

const DEMO = {
  email: 'demo@enjoybaja.com',
  password: 'Demo2026!',
  pin: '0000',
  role: 'demo',
  name: 'Demo User'
};

function Login() {
  const navigate = useNavigate();
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

    if (email === OWNER.email && password === OWNER.password) {
      setUser(OWNER);
      setShowPin(true);
      return;
    }

    if (email === DEMO.email && password === DEMO.password) {
      login(DEMO);
      navigate('/');
      return;
    }

    setError('Invalid credentials');
  };

  const handlePin = (e) => {
    e.preventDefault();
    setPinError('');

    if (pin === user.pin) {
      login(user);
      sessionStorage.setItem('admin_pin', pin);
      navigate('/admin');
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
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} maxLength="6" style={{ width: '100%', padding: '20px', background: 'rgba(15, 23, 42, 0.5)', border: '2px solid rgba(203, 166, 88, 0.3)', color: '#FFFFFF', fontSize: '24px', textAlign: 'center', letterSpacing: '8px', fontFamily: 'monospace', marginBottom: '24px' }} placeholder="••••••" required autoFocus />
            {pinError && <div style={{ padding: '12px', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', fontSize: '12px', marginBottom: '24px' }}>{pinError}</div>}
            <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', color: '#0f172a', fontSize: '12px', letterSpacing: '2px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif' }}>VERIFY</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;