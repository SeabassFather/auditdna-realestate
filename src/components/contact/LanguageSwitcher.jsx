import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageSwitcher({ position = 'top-right' }) {
  const { language, setLanguage } = useLanguage();

  const positions = {
    'top-right': { position: 'fixed', top: '24px', right: '24px', zIndex: 1000 },
    'top-left': { position: 'fixed', top: '24px', left: '24px', zIndex: 1000 },
    'inline': { display: 'inline-flex' }
  };

  const styles = {
    container: {
      ...positions[position],
      display: 'flex',
      gap: '8px',
      background: 'rgba(15, 23, 42, 0.95)',
      border: '2px solid rgba(203, 166, 88, 0.3)',
      borderRadius: '12px',
      padding: '8px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    },
    button: (active) => ({
      padding: '10px 20px',
      background: active ? 'linear-gradient(135deg, #cba658, #b8944d)' : 'transparent',
      color: active ? '#0f172a' : '#cba658',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }),
    flag: {
      fontSize: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => setLanguage('en')} style={styles.button(language === 'en')}>
        <span style={styles.flag}></span>
        <span>EN</span>
      </button>
      <button onClick={() => setLanguage('es')} style={styles.button(language === 'es')}>
        <span style={styles.flag}></span>
        <span>ES</span>
      </button>
    </div>
  );
}