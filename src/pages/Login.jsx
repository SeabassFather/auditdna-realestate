import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Credentials validation — kept server-side in production.
// autoComplete="off" + autoComplete="new-password" prevents browser from
// auto-filling or displaying saved credentials in the UI.
const USERS = [
  { email: 'sg01@eb.com',    password: '060905Dsg#321', pin: '10051974', role: 'owner', name: 'Saul Garcia' },
  { email: 'gl@eb.com',      password: 'Admin2026!',    pin: '0505',     role: 'admin', name: 'Gibran Lyle' },
  { email: 'ab-03@eb.com',   password: 'Admin2026!',    pin: '0505',     role: 'admin', name: 'Admin AB' },
  { email: 'admin01@eb.com', password: 'Admin2026!',    pin: '0101',     role: 'admin', name: 'Admin 01' },
  { email: 'admin02@eb.com', password: 'Admin2026!',    pin: '0202',     role: 'admin', name: 'Admin 02' },
  { email: 'admin03@eb.com', password: 'Admin2026!',    pin: '0303',     role: 'admin', name: 'Admin 03' },
  { email: 'admin04@eb.com', password: 'Admin2026!',    pin: '0404',     role: 'admin', name: 'Admin 04' },
  { email: 'admin05@eb.com', password: 'Admin2026!',    pin: '0505',     role: 'admin', name: 'Admin 05' },
  { email: 'sales01@eb.com', password: 'Sales2026!',    pin: '1001',     role: 'sales', name: 'Sales 01' },
  { email: 'sales02@eb.com', password: 'Sales2026!',    pin: '1002',     role: 'sales', name: 'Sales 02' },
  { email: 'sales03@eb.com', password: 'Sales2026!',    pin: '1003',     role: 'sales', name: 'Sales 03' },
  { email: 'sales04@eb.com', password: 'Sales2026!',    pin: '1004',     role: 'sales', name: 'Sales 04' },
  { email: 'sales05@eb.com', password: 'Sales2026!',    pin: '1005',     role: 'sales', name: 'Sales 05' },
  // ── NAMED SALES ACCOUNTS ──────────────────────────────────────
  { email: 'moi@eb.com',    password: 'IcanIamIwill2026!', pin: '7194', role: 'sales', name: 'Moi' },
  { email: 'ema@eb.com',    password: 'CasaCaracol321',    pin: '9229', role: 'sales', name: 'Ema' },
  { email: 'lucero@eb.com', password: 'Caracola123',       pin: '6613', role: 'sales', name: 'Lucero' },
  // ─────────────────────────────────────────────────────────────
  { email: 'demo@eb.com',    password: 'Demo2026!',     pin: '0000',     role: 'demo',  name: 'Demo User' },
  ...Array.from({ length: 51 }, (_, i) => {
    const n = String(i).padStart(2, '0');
    return { email: `REagent-${n}@eb.com`, password: `Agent${n}#2026`, pin: String(1000 + i), role: 'agent', name: `RE Agent ${n}` };
  })
];

const auth   = (email, pw)   => USERS.find(u => u.email === email && u.password === pw) || null;
const pinOk  = (email, pin)  => { const u = USERS.find(u => u.email === email); return u?.pin === pin; };
const pinLen = (role)        => role === 'owner' ? 8 : 4;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [mode,     setMode]     = useState('agent');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [step,     setStep]     = useState(1);
  const [authUser, setAuthUser] = useState(null);
  const [pin,      setPin]      = useState('');
  const [pinError, setPinError] = useState('');

  const from = location.state?.from?.pathname || sessionStorage.getItem('redirect_after_login') || null;

  const goAfterLogin = (role) => {
    sessionStorage.removeItem('redirect_after_login');
    if (from && from !== '/login') { navigate(from); return; }
    if (['owner','admin','sales'].includes(role)) navigate('/admin');
    else if (role === 'agent') navigate('/mexico-real-estate');
    else navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const user = auth(email.trim().toLowerCase(), password);
    if (!user) { setError('Invalid credentials.'); return; }
    if (mode === 'admin' && !['owner','admin'].includes(user.role)) { setError('Not an admin account.'); return; }

    if (['owner','admin'].includes(user.role)) {
      sessionStorage.setItem('admin_access_level', user.role);
      sessionStorage.setItem('admin_user_name', user.name);
      sessionStorage.setItem('admin_user_email', user.email);
      sessionStorage.setItem('agent_content_authorized', 'true');
      setAuthUser(user);
      setStep(2);
    } else {
      login(user);
      goAfterLogin(user.role);
    }
  };

  const handlePin = (e) => {
    e.preventDefault();
    setPinError('');
    if (pinOk(authUser.email, pin)) {
      login(authUser);
      sessionStorage.setItem('admin_pin', pin);
      goAfterLogin(authUser.role);
    } else {
      setPinError('Invalid PIN.');
      setPin('');
    }
  };

  // ── Styles ─────────────────────────────────────────────────────
  const F = '"Helvetica Neue", sans-serif';
  const inp = { width: '100%', padding: '11px 13px', background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(203,166,88,0.2)', borderRadius: '2px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: F, transition: 'border-color 0.2s' };
  const lbl = { display: 'block', fontSize: '8px', letterSpacing: '2px', color: 'rgba(148,163,184,0.55)', marginBottom: '6px', fontFamily: F };
  const goldBtn = { width: '100%', padding: '13px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '2px', color: '#0f172a', fontSize: '10px', letterSpacing: '3px', fontWeight: '700', cursor: 'pointer', fontFamily: F };

  return (
    <div style={{ minHeight: '100vh', backgroundImage: 'url(/seabass5.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: F }}>
      
      {/* OVERLAY */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 0 }} />

      {/* CARD */}
      <div style={{ width: '100%', maxWidth: '340px', background: '#0c1a2e', border: '1px solid rgba(203,166,88,0.18)', borderRadius: '3px', position: 'relative', zIndex: 1, padding: '40px 32px 32px' }}>

        {/* ADMIN TOGGLE */}
        {step === 1 && (
          <button type="button" onClick={() => { setMode(m => m === 'admin' ? 'agent' : 'admin'); setError(''); }} style={{ position: 'absolute', top: '14px', right: '14px', background: mode === 'admin' ? 'rgba(203,166,88,0.15)' : 'transparent', border: `1px solid ${mode === 'admin' ? 'rgba(203,166,88,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '2px', color: mode === 'admin' ? '#cba658' : 'rgba(148,163,184,0.35)', fontSize: '8px', letterSpacing: '2px', padding: '5px 10px', cursor: 'pointer', fontFamily: F }}>
            ADMIN
          </button>
        )}

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '5px', color: '#cba658', fontWeight: '300', marginBottom: '8px' }}>ENJOY BAJA</div>
          <div style={{ width: '28px', height: '1px', background: 'rgba(203,166,88,0.3)', margin: '0 auto 8px' }} />
          <div style={{ fontSize: '8px', letterSpacing: '3px', color: 'rgba(148,163,184,0.35)' }}>
            {step === 2 ? 'ENTER PIN' : mode === 'admin' ? 'ADMIN ACCESS' : 'AGENT PORTAL'}
          </div>
        </div>

        {/* STEP 1: EMAIL + PASSWORD */}
        {step === 1 && (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={{ marginBottom: '16px' }}>
              <label style={lbl}>EMAIL</label>
              <input type="email" value={email} required onChange={e => setEmail(e.target.value)} autoComplete="off" style={inp}
                onFocus={e => e.target.style.borderColor = 'rgba(203,166,88,0.55)'}
                onBlur={e  => e.target.style.borderColor = 'rgba(203,166,88,0.2)'} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={lbl}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} required onChange={e => setPassword(e.target.value)} autoComplete="new-password" style={{ ...inp, paddingRight: '50px' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(203,166,88,0.55)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(203,166,88,0.2)'} />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: '11px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(148,163,184,0.3)', cursor: 'pointer', fontSize: '8px', letterSpacing: '1px', padding: 0, fontFamily: F }}>
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>
            {error && <div style={{ padding: '9px 12px', marginBottom: '16px', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '2px', color: '#fca5a5', fontSize: '9px', textAlign: 'center' }}>{error}</div>}
            <button type="submit" style={goldBtn}>{mode === 'admin' ? 'ADMIN LOGIN' : 'LOGIN'}</button>
          </form>
        )}

        {/* STEP 2: PIN */}
        {step === 2 && (
          <form onSubmit={handlePin} autoComplete="off">
            <p style={{ fontSize: '9px', color: 'rgba(148,163,184,0.4)', textAlign: 'center', letterSpacing: '1px', marginBottom: '20px' }}>
              {authUser?.role === 'owner' ? '8-DIGIT PIN' : '4-DIGIT PIN'}
            </p>
            <input type="password" value={pin} required autoFocus maxLength={pinLen(authUser?.role)} onChange={e => setPin(e.target.value)} autoComplete="off"
              style={{ ...inp, fontSize: '24px', textAlign: 'center', letterSpacing: '10px', marginBottom: '16px', border: '1px solid rgba(203,166,88,0.3)' }}
              onFocus={e => e.target.style.borderColor = 'rgba(203,166,88,0.7)'}
              onBlur={e  => e.target.style.borderColor = 'rgba(203,166,88,0.3)'} />
            {pinError && <div style={{ padding: '9px', marginBottom: '16px', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '2px', color: '#fca5a5', fontSize: '9px', textAlign: 'center' }}>{pinError}</div>}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => { setStep(1); setPin(''); setPinError(''); setPassword(''); }} style={{ ...goldBtn, background: 'rgba(255,255,255,0.05)', color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>BACK</button>
              <button type="submit" style={goldBtn}>VERIFY</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}