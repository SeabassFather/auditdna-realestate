import React, { useState, useEffect } from 'react';

export default function GlobalMarkets() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const markets = [
    { code: 'US', tz: 'America/Los_Angeles' },
    { code: 'US', tz: 'America/New_York' },
    { code: 'MX', tz: 'America/Mexico_City' },
    { code: 'BR', tz: 'America/Sao_Paulo' },
    { code: 'AR', tz: 'America/Argentina/Buenos_Aires' },
    { code: 'GB', tz: 'Europe/London' },
    { code:  'ES', tz: 'Europe/Madrid' },
    { code:  'FR', tz: 'Europe/Paris' },
    { code: 'DE', tz: 'Europe/Berlin' },
    { code: 'CH', tz: 'Europe/Zurich' },
    { code: 'AE', tz: 'Asia/Dubai' },
    { code:  'SG', tz: 'Asia/Singapore' },
    { code: 'HK', tz: 'Asia/Hong_Kong' },
    { code: 'JP', tz: 'Asia/Tokyo' },
    { code:  'AU', tz: 'Australia/Sydney' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(to right, #f0fdf4, #dcfce7)',
      padding: '0. 75rem 1rem',
      borderBottom: '1px solid #d1d5db',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap:  '1rem', flexWrap: 'wrap', flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          color: '#059669',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ fontSize: '1.25rem' }}>🌍</span>
          <span>GLOBAL MARKETS</span>
        </div>
        
        {markets.map((market, idx) => {
          const localTime = new Date(time. toLocaleString('en-US', { timeZone: market.tz }));
          const timeString = localTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });

          return (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.75rem',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}>
              <span style={{ fontWeight: '600', color: '#374151' }}>{market.code}</span>
              <span style={{ color: '#6b7280' }}>⏰</span>
              <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#111827', fontSize: '0.8125rem' }}>
                {timeString}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: '#fee2e2',
        border: '1px solid #fca5a5',
        borderRadius: '20px',
        whiteSpace: 'nowrap'
      }}>
        <style>
          {`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }`}
        </style>
        <div style={{ width: '10px', height: '10px', background: '#dc2626', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
        <span style={{ fontWeight: '700', fontSize: '0.875rem', color: '#dc2626' }}>LIVE</span>
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#991b1b' }}>
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute:  '2-digit', hour12: true })}
        </span>
      </div>
    </div>
  );
}