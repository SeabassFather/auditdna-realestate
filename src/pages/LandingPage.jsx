import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ================================================================
// ENJOYBAJA — LANDING PAGE v1.0
// Glass morphism login card. Sharp edges. Mirror finish.
// Full role-based routing. No round corners. Ever.
// ================================================================

const USERS = [
  { email: 'sg01@eb.com',    password: '060905Dsg#321',    pin: '10051974', role: 'owner', name: 'Saul Garcia'  },
  { email: 'gl@eb.com',      password: 'Admin2026!',        pin: '0505',     role: 'admin', name: 'Gibran Lyle'  },
  { email: 'ab-03@eb.com',   password: 'Admin2026!',        pin: '0505',     role: 'admin', name: 'Admin AB'     },
  { email: 'admin01@eb.com', password: 'Admin2026!',        pin: '0101',     role: 'admin', name: 'Admin 01'     },
  { email: 'admin02@eb.com', password: 'Admin2026!',        pin: '0202',     role: 'admin', name: 'Admin 02'     },
  { email: 'admin03@eb.com', password: 'Admin2026!',        pin: '0303',     role: 'admin', name: 'Admin 03'     },
  { email: 'admin04@eb.com', password: 'Admin2026!',        pin: '0404',     role: 'admin', name: 'Admin 04'     },
  { email: 'admin05@eb.com', password: 'Admin2026!',        pin: '0505',     role: 'admin', name: 'Admin 05'     },
  { email: 'sales01@eb.com', password: 'Sales2026!',        pin: '1001',     role: 'sales', name: 'Sales 01'     },
  { email: 'sales02@eb.com', password: 'Sales2026!',        pin: '1002',     role: 'sales', name: 'Sales 02'     },
  { email: 'sales03@eb.com', password: 'Sales2026!',        pin: '1003',     role: 'sales', name: 'Sales 03'     },
  { email: 'sales04@eb.com', password: 'Sales2026!',        pin: '1004',     role: 'sales', name: 'Sales 04'     },
  { email: 'sales05@eb.com', password: 'Sales2026!',        pin: '1005',     role: 'sales', name: 'Sales 05'     },
  { email: 'moi@eb.com',     password: 'IcanIamIwill2026!', pin: '7194',     role: 'sales', name: 'Moi'          },
  { email: 'ema@eb.com',     password: 'CasaCaracol321',    pin: '9229',     role: 'sales', name: 'Ema'          },
  { email: 'lucero@eb.com',  password: 'Caracola123',       pin: '6613',     role: 'sales', name: 'Lucero'       },
  { email: 'demo@eb.com',    password: 'Demo2026!',         pin: '0000',     role: 'demo',  name: 'Guest'        },
  ...Array.from({ length: 51 }, (_, i) => {
    const n = String(i).padStart(2, '0');
    return { email: `REagent-${n}@eb.com`, password: `Agent${n}#2026`, pin: String(1000 + i), role: 'agent', name: `RE Agent ${n}` };
  })
];

const findUser  = (email, pw)  => USERS.find(u => u.email === email && u.password === pw) || null;
const checkPin  = (email, pin) => { const u = USERS.find(u => u.email === email); return u?.pin === pin; };
const pinDigits = (role)       => role === 'owner' ? 8 : 4;

const destination = (role) => {
  if (['owner', 'admin', 'sales'].includes(role)) return '/admin';
  if (role === 'agent') return '/mexico-real-estate';
  return '/';
};

const G    = '#cba658';
const G2   = '#b8944d';
const SERIF = '"Cormorant Garamond", "Garamond", "Times New Roman", serif';
const SANS  = '"Helvetica Neue", "Helvetica", sans-serif';

export default function LandingPage() {
  const navigate  = useNavigate();
  const { login } = useAuth();
  const cardRef   = useRef(null);

  const [step,     setStep]     = useState(1);
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [authUser, setAuthUser] = useState(null);
  const [pin,      setPin]      = useState('');
  const [pinError, setPinError] = useState('');
  const [visible,  setVisible]  = useState(false);
  const [tilt,     setTilt]     = useState({ x: 0, y: 0 });
  const [glint,    setGlint]    = useState({ x: 50, y: 30 });

  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const dx = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2));
      const dy = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2));
      setTilt({ x: dy * -3.5, y: dx * 3.5 });
      setGlint({
        x: ((e.clientX - rect.left) / rect.width)  * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const user = findUser(email.trim().toLowerCase(), password);
    if (!user) { setError('Invalid credentials.'); return; }

    if (['owner', 'admin'].includes(user.role)) {
      // Full platform — PIN required, elevated session flags
      sessionStorage.setItem('admin_access_level',       user.role);
      sessionStorage.setItem('admin_user_name',          user.name);
      sessionStorage.setItem('admin_user_email',         user.email);
      sessionStorage.setItem('agent_content_authorized', 'true');
      setAuthUser(user);
      setStep(2);
    } else if (user.role === 'sales') {
      // Sales — restricted access: Upload, Email Marketing, CRM only
      // AdminDashboard reads this flag to gate visible modules
      sessionStorage.setItem('sales_access_level', 'restricted');
      sessionStorage.setItem('sales_user_name',    user.name);
      sessionStorage.setItem('sales_user_email',   user.email);
      login(user);
      navigate(destination(user.role));
    } else {
      login(user);
      navigate(destination(user.role));
    }
  };

  const handlePin = (e) => {
    e.preventDefault();
    setPinError('');
    if (checkPin(authUser.email, pin)) {
      login(authUser);
      sessionStorage.setItem('admin_pin', pin);
      navigate(destination(authUser.role));
    } else {
      setPinError('Incorrect PIN. Try again.');
      setPin('');
    }
  };

  const handleGuest = () => {
    const guest = USERS.find(u => u.role === 'demo');
    if (guest) login(guest);
    navigate('/');
  };

  const inp = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(203,166,88,0.22)',
    borderRadius: 0, color: '#e2d9c5',
    fontSize: '13px', letterSpacing: '0.4px',
    outline: 'none', boxSizing: 'border-box',
    fontFamily: SANS,
    transition: 'border-color 0.2s, background 0.2s',
  };

  const lbl = {
    display: 'block', fontSize: '7px', letterSpacing: '2.8px',
    color: 'rgba(203,166,88,0.5)', marginBottom: '7px',
    fontFamily: SANS, textTransform: 'uppercase',
  };

  const primaryBtn = {
    width: '100%', padding: '13px 0',
    background: `linear-gradient(135deg, ${G} 0%, ${G2} 100%)`,
    border: 'none', borderRadius: 0,
    color: '#080e1a', fontSize: '8px', letterSpacing: '3.5px',
    fontWeight: '700', cursor: 'pointer', fontFamily: SANS,
    textTransform: 'uppercase', transition: 'opacity 0.2s',
  };

  const ghostBtn = {
    ...primaryBtn,
    background: 'transparent',
    border: '1px solid rgba(203,166,88,0.2)',
    color: 'rgba(203,166,88,0.48)',
    fontWeight: '400', letterSpacing: '2.5px',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; }

        @keyframes bgDrift {
          0%   { transform: scale(1.08) translate(0px, 0px);    }
          33%  { transform: scale(1.10) translate(-12px, -7px); }
          66%  { transform: scale(1.09) translate(9px, 6px);    }
          100% { transform: scale(1.08) translate(0px, 0px);    }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0px);  }
        }
        @keyframes scanLine {
          0%,100% { top: -1px; opacity: 0; }
          5%       { opacity: 0.5; }
          95%      { opacity: 0.5; }
          50%      { top: 100%; }
        }
        @keyframes cornerFade {
          from { opacity: 0; } to { opacity: 1; }
        }

        .eb-card     { animation: fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .eb-inp:focus {
          border-color: rgba(203,166,88,0.65) !important;
          background:   rgba(255,255,255,0.075) !important;
        }
        .eb-primary:hover { opacity: 0.83 !important; }
        .eb-ghost:hover {
          background:   rgba(203,166,88,0.07) !important;
          border-color: rgba(203,166,88,0.42) !important;
          color:        rgba(203,166,88,0.82) !important;
        }
        .eb-toggle:hover { color: rgba(203,166,88,0.7) !important; }
        .eb-scan {
          position: absolute; left: 0; right: 0; height: 1px; top: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(203,166,88,0.18) 35%,
            rgba(255,255,255,0.14) 50%,
            rgba(203,166,88,0.18) 65%,
            transparent 100%
          );
          animation: scanLine 7s ease-in-out infinite;
          pointer-events: none; z-index: 9;
        }
      `}</style>

      {/* Root */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SANS, overflow: 'hidden',
      }}>

        {/* Drifting BG photo */}
        <div style={{
          position: 'absolute', inset: '-6%', zIndex: 0,
          backgroundImage: 'url(/seabass5.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 42%',
          animation: 'bgDrift 26s ease-in-out infinite',
          willChange: 'transform',
        }} />

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(155deg, rgba(4,9,20,0.55) 0%, rgba(8,16,34,0.78) 60%, rgba(3,7,16,0.92) 100%)',
        }} />

        {/* Radial vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 20%, rgba(3,7,16,0.62) 100%)',
        }} />

        {/* Page edge rules */}
        <div style={{ position:'absolute', top:'30px',    left:'34px', right:'34px', height:'1px', background:'rgba(203,166,88,0.09)', zIndex:3 }} />
        <div style={{ position:'absolute', bottom:'30px', left:'34px', right:'34px', height:'1px', background:'rgba(203,166,88,0.09)', zIndex:3 }} />

        {/* Page corner marks */}
        {[
          { top:'20px',    left:'20px',    borderTop:`1px solid rgba(203,166,88,0.25)`,    borderLeft:`1px solid rgba(203,166,88,0.25)` },
          { top:'20px',    right:'20px',   borderTop:`1px solid rgba(203,166,88,0.25)`,    borderRight:`1px solid rgba(203,166,88,0.25)` },
          { bottom:'20px', left:'20px',    borderBottom:`1px solid rgba(203,166,88,0.25)`, borderLeft:`1px solid rgba(203,166,88,0.25)` },
          { bottom:'20px', right:'20px',   borderBottom:`1px solid rgba(203,166,88,0.25)`, borderRight:`1px solid rgba(203,166,88,0.25)` },
        ].map((s, i) => (
          <div key={i} style={{
            position:'absolute', width:'16px', height:'16px', zIndex:3,
            animation:`cornerFade 1.4s ${0.5 + i * 0.1}s ease both`,
            ...s,
          }} />
        ))}

        {/* Wordmark — top left */}
        <div style={{
          position:'absolute', top:'38px', left:'54px', zIndex:4,
          fontFamily: SERIF, fontWeight:'200', fontSize:'9.5px',
          letterSpacing:'6px', color:'rgba(203,166,88,0.28)',
        }}>ENJOY BAJA</div>

        {/* Year — bottom right */}
        <div style={{
          position:'absolute', bottom:'38px', right:'54px', zIndex:4,
          fontFamily: SANS, fontSize:'6.5px',
          letterSpacing:'3px', color:'rgba(148,163,184,0.18)',
        }}>© 2026 ENJOYBAJA.COM</div>

        {/* ═══════════════ GLASS LOGIN CARD ═══════════════ */}
        <div
          ref={cardRef}
          className="eb-card"
          style={{
            position: 'relative', zIndex: 10,
            width: '100%', maxWidth: '358px',
            margin: '0 20px',
            // Glass — layered transparency
            background: `linear-gradient(
              140deg,
              rgba(255,255,255,0.10) 0%,
              rgba(255,255,255,0.04) 35%,
              rgba(203,166,88,0.04) 70%,
              rgba(255,255,255,0.07) 100%
            )`,
            backdropFilter: 'blur(28px) saturate(1.6) brightness(1.05)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.6) brightness(1.05)',
            border: '1px solid rgba(203,166,88,0.17)',
            borderTop: '1px solid rgba(255,255,255,0.18)',   // mirror top lip
            borderRadius: 0,
            boxShadow: `
              inset 0  1px 0 rgba(255,255,255,0.12),
              inset 0 -1px 0 rgba(0,0,0,0.18),
              inset 1px 0  0 rgba(255,255,255,0.04),
              0 2px 0 rgba(203,166,88,0.12),
              0 28px 70px rgba(0,0,0,0.58),
              0 8px  22px rgba(0,0,0,0.32)
            `,
            transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.1s ease-out',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            padding: '46px 38px 38px',
          }}
        >
          {/* Scan line */}
          <div className="eb-scan" />

          {/* Mouse glint */}
          <div style={{
            position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
            background:`radial-gradient(circle at ${glint.x}% ${glint.y}%, rgba(255,255,255,0.08) 0%, transparent 52%)`,
          }} />

          {/* Card corner marks */}
          {[
            { top:'11px',    left:'11px',    borderTop:`1px solid rgba(203,166,88,0.55)`,    borderLeft:`1px solid rgba(203,166,88,0.55)` },
            { top:'11px',    right:'11px',   borderTop:`1px solid rgba(203,166,88,0.55)`,    borderRight:`1px solid rgba(203,166,88,0.55)` },
            { bottom:'11px', left:'11px',    borderBottom:`1px solid rgba(203,166,88,0.55)`, borderLeft:`1px solid rgba(203,166,88,0.55)` },
            { bottom:'11px', right:'11px',   borderBottom:`1px solid rgba(203,166,88,0.55)`, borderRight:`1px solid rgba(203,166,88,0.55)` },
          ].map((s, i) => (
            <div key={i} style={{ position:'absolute', width:'11px', height:'11px', zIndex:3, ...s }} />
          ))}

          {/* ── Content ── */}
          <div style={{ position:'relative', zIndex:5 }}>

            {/* Header */}
            <div style={{ textAlign:'center', marginBottom:'34px' }}>
              <div style={{
                fontFamily: SERIF, fontWeight:'200',
                fontSize: '28px', letterSpacing:'9px',
                color: '#f0e8d8', lineHeight: 1, marginBottom:'10px',
              }}>ENJOY BAJA</div>
              <div style={{
                width:'36px', height:'1px',
                background:`linear-gradient(90deg, transparent, ${G}, transparent)`,
                margin:'0 auto 11px',
              }} />
              <div style={{
                fontFamily: SANS, fontSize:'6.5px',
                letterSpacing:'3.5px', color:'rgba(148,163,184,0.4)',
                textTransform:'uppercase',
              }}>
                {step === 2
                  ? (authUser?.role === 'owner' ? '8-Digit Security PIN' : '4-Digit Security PIN')
                  : 'Member Access'}
              </div>
            </div>

            {/* ── STEP 1: Email + Password ── */}
            {step === 1 && (
              <form onSubmit={handleLogin} autoComplete="off">

                <div style={{ marginBottom:'15px' }}>
                  <label style={lbl}>Email</label>
                  <input
                    type="email" required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="off"
                    className="eb-inp"
                    style={inp}
                    onFocus={e => { e.target.style.borderColor='rgba(203,166,88,0.65)'; e.target.style.background='rgba(255,255,255,0.075)'; }}
                    onBlur={e  => { e.target.style.borderColor='rgba(203,166,88,0.22)'; e.target.style.background='rgba(255,255,255,0.04)';  }}
                  />
                </div>

                <div style={{ marginBottom:'24px' }}>
                  <label style={lbl}>Password</label>
                  <div style={{ position:'relative' }}>
                    <input
                      type={showPass ? 'text' : 'password'} required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="new-password"
                      className="eb-inp"
                      style={{ ...inp, paddingRight:'50px' }}
                      onFocus={e => { e.target.style.borderColor='rgba(203,166,88,0.65)'; e.target.style.background='rgba(255,255,255,0.075)'; }}
                      onBlur={e  => { e.target.style.borderColor='rgba(203,166,88,0.22)'; e.target.style.background='rgba(255,255,255,0.04)';  }}
                    />
                    <button
                      type="button"
                      className="eb-toggle"
                      onClick={() => setShowPass(v => !v)}
                      style={{
                        position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
                        background:'none', border:'none', padding:0,
                        color:'rgba(148,163,184,0.28)', fontSize:'7px',
                        letterSpacing:'1.5px', cursor:'pointer', fontFamily:SANS,
                        transition:'color 0.2s',
                      }}
                    >{showPass ? 'HIDE' : 'SHOW'}</button>
                  </div>
                </div>

                {error && (
                  <div style={{
                    padding:'9px 12px', marginBottom:'16px',
                    background:'rgba(248,113,113,0.06)',
                    border:'1px solid rgba(248,113,113,0.18)',
                    color:'#fca5a5', fontSize:'9px',
                    letterSpacing:'1px', textAlign:'center',
                  }}>{error}</div>
                )}

                <button type="submit" className="eb-primary" style={primaryBtn}>
                  ACCESS PLATFORM
                </button>

                {/* Divider */}
                <div style={{
                  width:'100%', height:'1px',
                  background:'linear-gradient(90deg, transparent, rgba(203,166,88,0.2), transparent)',
                  margin:'22px 0',
                }} />

                <button type="button" className="eb-ghost" onClick={handleGuest} style={ghostBtn}>
                  EXPLORE AS GUEST
                </button>

              </form>
            )}

            {/* ── STEP 2: PIN ── */}
            {step === 2 && (
              <form onSubmit={handlePin} autoComplete="off">

                <div style={{
                  textAlign:'center', marginBottom:'18px',
                  fontFamily: SANS, fontSize:'8.5px',
                  letterSpacing:'2px', color:'rgba(148,163,184,0.38)',
                  textTransform:'uppercase',
                }}>
                  {authUser?.name}
                </div>

                <input
                  type="password" required autoFocus
                  value={pin}
                  maxLength={pinDigits(authUser?.role)}
                  onChange={e => setPin(e.target.value)}
                  autoComplete="off"
                  className="eb-inp"
                  placeholder="· · · ·"
                  style={{
                    ...inp,
                    fontSize:'30px', textAlign:'center',
                    letterSpacing:'14px', paddingTop:'14px', paddingBottom:'14px',
                    border:'1px solid rgba(203,166,88,0.28)',
                    marginBottom:'20px',
                  }}
                  onFocus={e => { e.target.style.borderColor='rgba(203,166,88,0.7)'; }}
                  onBlur={e  => { e.target.style.borderColor='rgba(203,166,88,0.28)'; }}
                />

                {pinError && (
                  <div style={{
                    padding:'9px 12px', marginBottom:'16px',
                    background:'rgba(248,113,113,0.06)',
                    border:'1px solid rgba(248,113,113,0.18)',
                    color:'#fca5a5', fontSize:'9px',
                    letterSpacing:'1px', textAlign:'center',
                  }}>{pinError}</div>
                )}

                <div style={{ display:'flex', gap:'10px' }}>
                  <button
                    type="button"
                    className="eb-ghost"
                    onClick={() => { setStep(1); setPin(''); setPinError(''); setPassword(''); }}
                    style={{ ...ghostBtn, width:'80px', flex:'0 0 auto' }}
                  >← BACK</button>
                  <button type="submit" className="eb-primary" style={{ ...primaryBtn, flex:1 }}>
                    VERIFY
                  </button>
                </div>

              </form>
            )}

          </div>{/* /content */}
        </div>{/* /card */}

      </div>
    </>
  );
}