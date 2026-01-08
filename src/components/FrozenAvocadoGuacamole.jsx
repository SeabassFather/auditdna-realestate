import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FrozenAvocadoGuacamole() {
  const navigate = useNavigate();
  const [view, setView] = useState('production');

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)'
    },
    header: {
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    headerContent: {
      maxWidth: '1600px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#ffffff',
      margin: 0
    },
    backBtn: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    content: {
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '40px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>🥑 Frozen Avocado & Guacamole</h1>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '8px'}}>
              Specialized Product Tracking System
            </p>
          </div>
          <button 
            style={styles.backBtn}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ← Back
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Production Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          {[
            { icon: '🏭', label: 'Production Facilities', value: '47', sublabel: 'Active Plants' },
            { icon: '📦', label: 'Monthly Output', value: '2.4M kg', sublabel: 'Frozen Products' },
            { icon: '🚚', label: 'Active Shipments', value: '847', sublabel: 'In Transit' },
            { icon: '❄️', label: 'Cold Chain', value: '99.7%', sublabel: 'Compliance' },
            { icon: '✅', label: 'Quality Score', value: '98.4%', sublabel: 'Avg Rating' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              textAlign: 'center',
              border: '2px solid #d1fae5'
            }}>
              <div style={{fontSize: '42px', marginBottom: '15px'}}>{stat.icon}</div>
              <div style={{fontSize: '32px', fontWeight: 'bold', color: '#059669', marginBottom: '8px'}}>
                {stat.value}
              </div>
              <div style={{fontSize: '14px', fontWeight: 'bold', color: '#065f46', marginBottom: '4px'}}>
                {stat.label}
              </div>
              <div style={{fontSize: '12px', color: '#6b7280'}}>
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Product Lines */}
        <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#065f46', marginBottom: '25px'}}>
          Product Lines & Processing
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '25px'
        }}>
          {[
            {
              name: 'Frozen Avocado Chunks',
              volume: '1.2M kg/month',
              temp: '-18°C',
              markets: ['USA', 'Canada', 'Japan'],
              quality: '99.2%'
            },
            {
              name: 'Frozen Guacamole',
              volume: '847K kg/month',
              temp: '-20°C',
              markets: ['USA', 'EU', 'UK'],
              quality: '98.8%'
            },
            {
              name: 'Avocado Puree (Frozen)',
              volume: '456K kg/month',
              temp: '-18°C',
              markets: ['USA', 'Mexico', 'Brazil'],
              quality: '99.5%'
            },
            {
              name: 'IQF Avocado Slices',
              volume: '234K kg/month',
              temp: '-35°C',
              markets: ['USA', 'Canada', 'Australia'],
              quality: '99.7%'
            }
          ].map((product, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              border: '2px solid #d1fae5',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = '#10b981';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#d1fae5';
            }}
            >
              <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#065f46', marginBottom: '15px'}}>
                🥑 {product.name}
              </h3>
              <div style={{marginBottom: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{color: '#6b7280', fontSize: '14px'}}>Monthly Volume:</span>
                  <span style={{fontWeight: 'bold', color: '#059669'}}>{product.volume}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{color: '#6b7280', fontSize: '14px'}}>Storage Temp:</span>
                  <span style={{fontWeight: 'bold', color: '#3b82f6'}}>{product.temp}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{color: '#6b7280', fontSize: '14px'}}>Quality Score:</span>
                  <span style={{fontWeight: 'bold', color: '#10b981'}}>{product.quality}</span>
                </div>
              </div>
              <div>
                <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '8px', fontWeight: 'bold'}}>
                  Export Markets:
                </div>
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                  {product.markets.map((market, j) => (
                    <span key={j} style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      background: '#dcfce7',
                      color: '#059669'
                    }}>
                      {market}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

