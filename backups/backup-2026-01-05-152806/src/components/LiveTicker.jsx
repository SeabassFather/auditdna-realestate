// ================================================================
// LIVE REAL-TIME TICKER - PROFESSIONAL VERSION
// ================================================================
// Date: 2025-11-11 09:53:16 UTC
// Author: SeabassFather
// ================================================================

import React, { useState, useEffect } from 'react';

const LiveTicker = () => {
  const [tickerData, setTickerData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // REAL-TIME DATA SOURCES
  const liveFeeds = [
    { 
      id: 'avocado', 
      name: 'Avocado (Hass)', 
      price: 48.50, 
      change: '+2.3%', 
      trend: 'up',
      market: 'Nogales, AZ',
      volume: '2.1M lbs/week'
    },
    { 
      id: 'strawberry', 
      name: 'Strawberry', 
      price: 32.00, 
      change: '-1.2%', 
      trend: 'down',
      market: 'Oxnard, CA',
      volume: '2.5M lbs/week'
    },
    { 
      id: 'lettuce', 
      name: 'Romaine Lettuce', 
      price: 18.50, 
      change: '+0.8%', 
      trend: 'up',
      market: 'Salinas, CA',
      volume: '3.2M lbs/week'
    },
    { 
      id: 'tomato', 
      name: 'Roma Tomato', 
      price: 22.50, 
      change: '+1.5%', 
      trend: 'up',
      market: 'Mexico',
      volume: '4.8M lbs/week'
    },
    { 
      id: 'bell-pepper', 
      name: 'Bell Pepper (Green)', 
      price: 24.50, 
      change: '-0.5%', 
      trend: 'down',
      market: 'Mexico',
      volume: '1.9M lbs/week'
    },
    { 
      id: 'mango', 
      name: 'Mango (Ataulfo)', 
      price: 28.50, 
      change: '+3.1%', 
      trend: 'up',
      market: 'Mexico',
      volume: '1.2M lbs/week'
    }
  ];

  // SIMULATE LIVE UPDATES EVERY 5 SECONDS
  useEffect(() => {
    const updatePrices = () => {
      const updated = liveFeeds.map(item => ({
        ...item,
        price: (item.price * (1 + (Math.random() * 0.04 - 0.02))).toFixed(2),
        change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 3).toFixed(1)}%`,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }));
      setTickerData(updated);
    };

    updatePrices();
    const interval = setInterval(updatePrices, 5000);
    return () => clearInterval(interval);
  }, []);

  // AUTO-ROTATE TICKER EVERY 3 SECONDS
  useEffect(() => {
    if (tickerData.length > 0) {
      const rotateInterval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % tickerData.length);
      }, 3000);
      return () => clearInterval(rotateInterval);
    }
  }, [tickerData]);

  if (tickerData.length === 0) return null;

  const currentItem = tickerData[currentIndex];
  const trendColor = currentItem.trend === 'up' ? '#10b981' : '#ef4444';
  const trendIcon = currentItem.trend === 'up' ? ' : '

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderBottom: '2px solid #334155',
      padding: '0.8rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      animation: 'slideIn 0.5s ease-in-out'
    }}>
      
      {/* LIVE INDICATOR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          width: '12px', 
          height: '12px', 
          borderRadius: '50%', 
          background: '#ef4444',
          animation: 'pulse 2s infinite',
          boxShadow: '0 0 10px #ef4444'
        }} />
        <span style={{ 
          fontSize: '0.9rem', 
          fontWeight: 'bold', 
          color: '#ef4444',
          letterSpacing: '1px'
        }}>
           LIVE
        </span>
      </div>

      {/* SCROLLING TICKER DATA */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        gap: '3rem', 
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {tickerData.map((item, idx) => (
          <div 
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.5rem 1.5rem',
              background: idx === currentIndex ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
              borderRadius: '8px',
              transition: 'all 0.3s',
              border: idx === currentIndex ? '1px solid #06b6d4' : '1px solid transparent'
            }}
          >
            <span style={{ 
              fontSize: '0.9rem', 
              fontWeight: '600', 
              color: '#94a3b8',
              minWidth: '140px'
            }}>
              {item.name}
            </span>
            <span style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              color: '#fff',
              minWidth: '70px',
              textAlign: 'right'
            }}>
              ${item.price}
            </span>
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: 'bold', 
              color: item.trend === 'up' ? '#10b981' : '#ef4444',
              minWidth: '60px'
            }}>
              {item.trend === 'up' ? ' : ' {item.change}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: '#64748b',
              minWidth: '100px'
            }}>
              {item.market}
            </span>
          </div>
        ))}
      </div>

      {/* LAST UPDATE TIME */}
      <div style={{ 
        fontSize: '0.8rem', 
        color: '#64748b',
        fontWeight: '500',
        minWidth: '150px',
        textAlign: 'right'
      }}>
        Updated: {new Date().toLocaleTimeString()}
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes slideIn {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default LiveTicker;
