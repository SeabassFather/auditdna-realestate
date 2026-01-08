<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
﻿import React, { useEffect, useState } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 3000);
    const timer2 = setTimeout(() => onComplete(), 3500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a1929 0%, #1a2332 50%, #2d3e50 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.5s ease-out'
    }}>
      <div style={{
        position: 'relative',
        animation: 'pulse 2s ease-in-out infinite'
      }}>
        <img 
          src="/auditdna-logo.png" 
          alt="AuditDNA Logo" 
          style={{
            width: '400px',
            height: 'auto',
            filter: 'drop-shadow(0 0 40px rgba(66, 165, 245, 0.6)) drop-shadow(0 0 80px rgba(76, 175, 80, 0.4))',
            animation: 'rotate3d 4s ease-in-out infinite'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(66,165,245,0.2) 0%, transparent 70%)',
          animation: 'ripple 3s ease-out infinite'
        }}></div>
      </div>

      <div style={{
        marginTop: '40px',
        fontSize: '18px',
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
        letterSpacing: '3px',
        animation: 'fadeInOut 2s ease-in-out infinite'
      }}>
        LOADING COMPLIANCE PLATFORM
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes rotate3d {
          0%, 100% { transform: perspective(1000px) rotateY(0deg); }
          50% { transform: perspective(1000px) rotateY(15deg); }
        }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}} />
    </div>
  );
}


<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
