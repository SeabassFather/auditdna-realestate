import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const AuditDNAHeader = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { language } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: '🌾', label: 'Produce', labelEs: 'Producir', color: '#10b981', route: '/ag' },
    { icon: '🌱', label: 'Soil', labelEs: 'Suelo', color: '#059669', route: '/soil' },
    { icon: '🥩', label: 'Meat', labelEs: 'Carne', color: '#dc2626', route: '/testing' },
    { icon: '🐟', label: 'Seafood', labelEs: 'Mariscos', color: '#06b6d4', route: '/testing' },
    { icon: '💧', label: 'Water', labelEs: 'Agua', color: '#0ea5e9', route: '/water' }
  ];

  const handleFeatureClick = (route) => {
    audioSystem.playClick();
    navigate(route);
  };

  return (
    <div
      ref={headerRef}
      style={{
        position: 'relative',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        perspective: '1000px'
      }}
    >
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: ['#ef4444', '#ffffff', '#10b981'][i % 3],
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
            opacity: 0.6,
            boxShadow: `0 0 ${Math.random() * 20 + 10}px ${['#ef4444', '#ffffff', '#10b981'][i % 3]}`
          }}
        />
      ))}

      <div
        style={{
          position: 'relative',
          transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: 'transform 0.2s ease-out',
          transformStyle: 'preserve-3d',
          zIndex: 10
        }}
      >
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '30px',
            padding: '3rem 4rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(16, 185, 129, 0.1)',
            textAlign: 'center'
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ef4444 0%, #ffffff 50%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              textShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
              letterSpacing: '2px'
            }}
          >
            AuditDNA Complete
          </h1>
          <p
            style={{
              fontSize: '1.3rem',
              color: '#94a3b8',
              marginBottom: '2rem',
              letterSpacing: '1px'
            }}
          >
            {language === 'es'
              ? '220+ Pruebas Premium | Análisis en Tiempo Real | Impulsado por IA'
              : '220+ Premium Tests | Real-Time Analysis | AI-Powered'}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                onClick={() => handleFeatureClick(feature.route)}
                onMouseEnter={() => audioSystem.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  background: `${feature.color}20`,
                  border: `2px solid ${feature.color}`,
                  borderRadius: '25px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 0 20px ${feature.color}40`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) translateZ(20px)';
                  e.currentTarget.style.boxShadow = `0 0 30px ${feature.color}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                  e.currentTarget.style.boxShadow = `0 0 20px ${feature.color}40`;
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{feature.icon}</span>
                <span
                  style={{
                    color: feature.color,
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                >
                  {language === 'es' ? feature.labelEs : feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(5px); }
          }
        `}
      </style>
    </div>
  );
};

export default AuditDNAHeader;


