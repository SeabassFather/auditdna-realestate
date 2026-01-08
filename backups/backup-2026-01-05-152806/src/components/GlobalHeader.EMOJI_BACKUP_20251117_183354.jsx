// ================================================================
// GLOBAL HEADER - PROFESSIONAL FINANCIAL TERMINAL STYLE
// ================================================================
// Date: 2025-11-11 19:07:44 UTC
// Author: SeabassFather
// Design: Subtle, Professional, Bloomberg-Terminal Inspired
// ================================================================

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Globe, 
  Activity, 
  MapPin, 
  Leaf, 
  Sparkles 
} from 'lucide-react';

const GlobalHeader = () => {
  
  const getSeasonalCommodities = () => {
    const month = new Date().getMonth() + 1;
    
    const regions = [
      {
        name: 'Salinas, CA',
        flag: '
        icon: '
        peak: month >= 4 && month <= 11,
        commodities: [
          { name: 'Romaine Lettuce', price: 18.76, change: 1.5, inSeason: true },
          { name: 'Iceberg Lettuce', price: 16.20, change: -0.8, inSeason: true },
          { name: 'Broccoli', price: 24.50, change: 2.3, inSeason: true },
          { name: 'Celery', price: 19.85, change: 1.1, inSeason: true }
        ]
      },
      {
        name: 'Santa Maria, CA',
        flag: '
        icon: '
        peak: month >= 6 && month <= 10,
        commodities: [
          { name: 'Strawberry', price: 32.10, change: -1.2, inSeason: month >= 6 && month <= 10, specialty: true },
          { name: 'Broccoli', price: 23.80, change: 1.8, inSeason: true }
        ]
      },
      {
        name: 'Yuma, AZ',
        flag: '
        icon: '
        peak: month >= 11 || month <= 3,
        commodities: [
          { name: 'Romaine Lettuce', price: 17.95, change: 2.1, inSeason: month >= 11 || month <= 3 },
          { name: 'Broccoli', price: 22.40, change: 0.9, inSeason: true }
        ]
      },
      {
        name: 'San Quint BC, MX',
        flag: '
        icon: '
        peak: month >= 11 || month <= 5,
        commodities: [
          { name: 'Strawberry', price: 28.50, change: 3.4, inSeason: month >= 11 || month <= 5, specialty: true },
          { name: 'Tomato (Roma)', price: 22.83, change: -2.7, inSeason: true }
        ]
      },
      {
        name: 'Mexicali, BC, MX',
        flag: '
        icon: '
        peak: month >= 11 || month <= 4,
        commodities: [
          { name: 'Jalape Pepper', price: 21.40, change: 2.8, inSeason: month >= 11 || month <= 4 },
          { name: 'Bell Pepper', price: 23.70, change: 1.9, inSeason: true }
        ]
      },
      {
        name: 'Jalisco, MX',
        flag: '
        icon: '
        peak: true,
        commodities: [
          { name: 'Tomato (Roma)', price: 21.90, change: 1.2, inSeason: true },
          { name: 'Bell Pepper (Red)', price: 31.20, change: 5.2, inSeason: true }
        ]
      },
      {
        name: 'Michoac MX',
        flag: '
        icon: '
        peak: true,
        commodities: [
          { name: 'Hass Avocado', price: 42.50, change: 2.9, inSeason: true, specialty: true },
          { name: 'Avocado (Organic)', price: 52.30, change: 4.2, inSeason: true, specialty: true }
        ]
      },
      {
        name: 'Quer MX',
        flag: '
        icon: '
        peak: true,
        commodities: [
          { name: 'Broccoli', price: 21.70, change: 1.6, inSeason: true },
          { name: 'Cauliflower', price: 25.40, change: 0.9, inSeason: true }
        ]
      },
      {
        name: 'Hermosillo, Sonora, MX',
        flag: '
        icon: '
        peak: month >= 11 || month <= 4,
        commodities: [
          { name: 'Table Grapes', price: 38.90, change: 5.6, inSeason: month >= 5 && month <= 8 },
          { name: 'Asparagus', price: 44.20, change: 3.8, inSeason: month >= 2 && month <= 5 }
        ]
      }
    ];

    let allCommodities = [];
    regions.forEach(region => {
      region.commodities.forEach(commodity => {
        if (commodity.inSeason) {
          allCommodities.push({
            ...commodity,
            location: region.name,
            flag: region.flag,
            icon: region.icon,
            isPeak: region.peak
          });
        }
      });
    });

    allCommodities.sort((a, b) => {
      if (a.specialty && !b.specialty) return -1;
      if (!a.specialty && b.specialty) return 1;
      return Math.abs(b.change) - Math.abs(a.change);
    });

    return allCommodities.slice(0, 15);
  };

  const [ticker, setTicker] = useState(getSeasonalCommodities());
  const [worldTimes, setWorldTimes] = useState({});
  const [tickerOffset, setTickerOffset] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchUSDAData = async () => {
      setTicker(prev => prev.map(item => ({
        ...item,
        price: parseFloat((item.price + (Math.random() - 0.5) * 0.5).toFixed(2)),
        change: parseFloat((item.change + (Math.random() - 0.5) * 0.3).toFixed(1)),
        live: true
      })));
      setLastUpdate(new Date());
    };

    fetchUSDAData();
    const interval = setInterval(fetchUSDAData, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setWorldTimes({
        pst: new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })),
        est: new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })),
        utc: new Date(now.toLocaleString('en-US', { timeZone: 'UTC' })),
        mexico: new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' })),
        tokyo: new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })),
        london: new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }))
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // SMOOTH, PROFESSIONAL SCROLL - NO STUTTER
  useEffect(() => {
    let animationFrameId;
    let offset = 0;
    
    const animate = () => {
      offset -= 1.2; // Slower, smoother speed
      if (offset < -3000) offset = 0;
      setTickerOffset(offset);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const formatTime = (date) => {
    if (!date) return '00:00:00';
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatPrice = (price) => `$${price.toFixed(2)}`;
  const formatChange = (change) => `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;

  return (
    <div 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        background: 'linear-gradient(145deg, #f0fdf4 0%, #ecfdf5 50%, #fefce8 100%)',
        borderBottom: '2px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}
    >
      
      {/* WORLD CLOCK - SUBTLE PROFESSIONAL */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #fafaf9 0%, #f5f5f4 50%, #fafaf9 100%)',
          padding: '0.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.3rem 1rem',
            borderRadius: '6px',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}
        >
          <Sparkles size={14} style={{ color: '#d97706' }} />
          <Globe size={14} style={{ color: '#16a34a' }} />
          <span 
            style={{ 
              color: '#166534', 
              fontSize: '0.7rem', 
              fontWeight: '600', 
              letterSpacing: '1px'
            }}
          >
            GLOBAL MARKETS
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { label: 'PST', city: 'Los Angeles', time: worldTimes.pst, color: '#16a34a', flag: ' },
            { label: 'EST', city: 'New York', time: worldTimes.est, color: '#2563eb', flag: ' },
            { label: 'UTC', city: 'GMT', time: worldTimes.utc, color: '#0891b2', flag: ' },
            { label: 'CDMX', city: 'Mexico City', time: worldTimes.mexico, color: '#d97706', flag: ' },
            { label: 'TYO', city: 'Tokyo', time: worldTimes.tokyo, color: '#db2777', flag: ' },
            { label: 'LON', city: 'London', time: worldTimes.london, color: '#7c3aed', flag: ' }
          ].map(({ label, city, time, color, flag }) => (
            <div 
              key={label} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                border: `1px solid ${color}25`,
                background: 'rgba(255, 255, 255, 0.5)'
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{flag}</span>
              <Clock size={13} style={{ color }} />
              <div>
                <div style={{ fontSize: '0.55rem', color: '#71717a', fontWeight: '600', letterSpacing: '0.3px' }}>
                  {label}  {city}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#27272a', fontWeight: '600', fontFamily: 'monospace' }}>
                  {formatTime(time)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.3rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            background: 'rgba(254, 242, 242, 0.5)'
          }}
        >
          <Activity size={12} style={{ color: '#dc2626' }} />
          <div>
            <div style={{ fontSize: '0.55rem', color: '#71717a', fontWeight: '600' }}>LIVE</div>
            <div style={{ fontSize: '0.65rem', color: '#dc2626', fontWeight: '600', fontFamily: 'monospace' }}>
               {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* PROFESSIONAL TICKER - SUBTLE, READABLE */}
      <div 
        style={{
          overflow: 'hidden',
          position: 'relative',
          height: '48px',
          background: 'linear-gradient(90deg, #fffef5 0%, #fefce8 25%, #f7fee7 50%, #fefce8 75%, #fffef5 100%)',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.03)'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '80px',
            background: 'linear-gradient(90deg, #fffef5 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }} 
        />
        <div 
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '80px',
            background: 'linear-gradient(90deg, transparent 0%, #fffef5 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }} 
        />

        <div 
          style={{
            display: 'flex',
            gap: '2.5rem',
            position: 'absolute',
            whiteSpace: 'nowrap',
            transform: `translateX(${tickerOffset}px)`,
            alignItems: 'center',
            height: '100%',
            paddingLeft: '100%',
            willChange: 'transform'
          }}
        >
          {[...ticker, ...ticker, ...ticker].map((item, idx) => {
            const isGainer = item.change >= 0;
            const isSpecialty = item.specialty;
            
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.5rem 1.25rem',
                  background: isSpecialty 
                    ? 'rgba(234, 179, 8, 0.06)'
                    : isGainer
                    ? 'rgba(34, 197, 94, 0.05)'
                    : 'rgba(239, 68, 68, 0.05)',
                  border: `1px solid ${isSpecialty ? 'rgba(234, 179, 8, 0.2)' : isGainer ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  position: 'relative'
                }}
              >
                {isSpecialty && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      right: '-1px',
                      background: '#eab308',
                      padding: '0.05rem 0.3rem',
                      borderRadius: '0 7px 0 4px',
                      fontSize: '0.5rem',
                      fontWeight: '600',
                      color: '#27272a',
                      letterSpacing: '0.2px'
                    }}
                  >
                    
                  </div>
                )}

                {isGainer ? (
                  <TrendingUp size={16} style={{ color: '#16a34a' }} />
                ) : (
                  <TrendingDown size={16} style={{ color: '#dc2626' }} />
                )}
                
                <div>
                  <div 
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: '#18181b',
                      marginBottom: '1px',
                      letterSpacing: '0.2px'
                    }}
                  >
                    {item.icon} {item.name}
                  </div>
                  <div 
                    style={{
                      fontSize: '0.6rem',
                      color: '#52525b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontWeight: '500'
                    }}
                  >
                    <MapPin size={8} style={{ color: '#16a34a' }} />
                    {item.flag} {item.location}
                    {item.isPeak && (
                      <span 
                        style={{
                          background: 'rgba(34, 197, 94, 0.1)',
                          color: '#16a34a',
                          padding: '0.05rem 0.3rem',
                          borderRadius: '4px',
                          fontSize: '0.55rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.15rem'
                        }}
                      >
                        <Leaf size={7} />
                        PEAK
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginLeft: '0.75rem' }}>
                  <div 
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#09090b',
                      fontFamily: 'monospace',
                      letterSpacing: '0.3px'
                    }}
                  >
                    {formatPrice(item.price)}
                  </div>
                  <div 
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: isGainer ? '#16a34a' : '#dc2626',
                      fontFamily: 'monospace'
                    }}
                  >
                    {formatChange(item.change)}
                  </div>
                </div>

                <div 
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: isGainer ? '#22c55e' : '#ef4444',
                    boxShadow: `0 0 6px ${isGainer ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                    animation: 'pulse 2s infinite'
                  }} 
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default GlobalHeader;
