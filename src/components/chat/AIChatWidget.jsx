import React, { useState } from 'react';
export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  if (!isOpen) {
    return (
      <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 9999 }}>
        <button onClick={() => setIsOpen(true)} style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #cbd5e1, #94a3af)', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      </div>
    );
  }
  return (
    <div style={{ position: 'fixed', bottom: '24px', left: '24px', width: '380px', height: '500px', background: '#fff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 9999 }}>
      <div style={{ background: 'linear-gradient(135deg, #cbd5e1, #94a3af)', padding: '20px', color: '#0f172a', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
        <div><h3 style={{ fontSize: '18px', margin: 0 }}>AI Assistant</h3><p style={{ fontSize: '12px', margin: 0 }}>Demo Mode</p></div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '24px', cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>AI Chat Demo - Full integration requires Claude API</div>
    </div>
  );
}