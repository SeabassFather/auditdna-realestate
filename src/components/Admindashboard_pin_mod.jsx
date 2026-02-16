// ADD THIS AT THE TOP OF AdminDashboard() function - RIGHT AFTER LINE 777

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [accessLevel, setAccessLevel] = useState('sales');
  const [openSections, setOpenSections] = useState({ command: true, crm: false, properties: false, calendar: false, marketing: false, agents: false, analytics: false });

  // ============================================================
  // PIN VERIFICATION FOR COMMAND CENTER ACCESS
  // ============================================================
  const [showPinGate, setShowPinGate] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const storedPin = sessionStorage.getItem('admin_pin');

  useEffect(() => {
    const level = sessionStorage.getItem('admin_access_level') || 'sales';
    setAccessLevel(level);
    
    // If user is owner but no PIN stored, show PIN gate
    if (level === 'owner' && !storedPin) {
      setShowPinGate(true);
    }
    
    if (level === 'sales') setOpenSections({ command: false, crm: true, properties: false, calendar: false, marketing: false, agents: false, analytics: false });
  }, [storedPin]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setPinError('');
    
    if (pin === '060905') {
      sessionStorage.setItem('admin_pin', pin);
      setShowPinGate(false);
      setPin('');
    } else {
      setPinError('Invalid PIN');
      setPin('');
    }
  };

  // ============================================================
  // PIN GATE UI - SHOW THIS BEFORE DASHBOARD
  // ============================================================
  if (showPinGate) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '2px solid rgba(203, 166, 88, 0.4)', padding: '60px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '200', fontSize: '24px', letterSpacing: '2px', color: '#cba658', marginBottom: '12px' }}>COMMAND CENTER ACCESS</h2>
          <p style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '11px', color: 'rgba(203, 213, 225, 0.6)', marginBottom: '32px', letterSpacing: '1px' }}>Enter your PIN to unlock full admin features</p>
          <form onSubmit={handlePinSubmit}>
            <input 
              type="password" 
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
              maxLength="6" 
              style={{ 
                width: '100%', 
                padding: '20px', 
                background: 'rgba(15, 23, 42, 0.5)', 
                border: '2px solid rgba(203, 166, 88, 0.3)', 
                color: '#FFFFFF', 
                fontSize: '24px', 
                textAlign: 'center', 
                letterSpacing: '8px', 
                fontFamily: 'monospace', 
                marginBottom: '24px' 
              }} 
              placeholder="••••••" 
              required 
              autoFocus 
            />
            {pinError && <div style={{ padding: '12px', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', fontSize: '12px', marginBottom: '24px' }}>{pinError}</div>}
            <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', color: '#0f172a', fontSize: '12px', letterSpacing: '2px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif' }}>VERIFY PIN</button>
          </form>
          <button onClick={() => { handleLogout(); }} style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', fontFamily: '"Helvetica Neue", sans-serif', marginTop: '16px' }}>LOGOUT</button>
        </div>
      </div>
    );
  }

  // ============================================================
  // REST OF ADMINDASHBOARD (EXISTING CODE CONTINUES FROM LINE 790)
  // ============================================================

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const toggle = (s) => {
    if (accessLevel === 'sales' && !['crm', 'calendar'].includes(s)) return;
    setOpenSections(p => ({ ...p, [s]: !p[s] }));
  };

  const handleLogout = () => { 
    sessionStorage.removeItem('admin_access_level'); 
    sessionStorage.removeItem('admin_pin');
    logout(); 
    navigate('/'); 
  };
  
  const isOwner = accessLevel === 'owner';
  const pendingAgents = JSON.parse(localStorage.getItem('pending_agents') || '[]');
  const totalProps = (JSON.parse(localStorage.getItem('mexico_properties') || '[]')).length + (JSON.parse(localStorage.getItem('development_properties') || '[]')).length + (JSON.parse(localStorage.getItem('fsbo_properties') || '[]')).length;
  const liveCampaigns = (JSON.parse(localStorage.getItem('ad_campaigns') || '[]')).filter(c => c.status === 'active').length;

  // ... REST OF EXISTING ADMINDASHBOARD CODE ...
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', position: 'relative' }}>
      {/* ALL YOUR EXISTING UI */}
    </div>
  );
}