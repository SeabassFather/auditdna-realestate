import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageToggle({ compact = false, style = {} }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage} 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: compact ? '6px 12px' : '8px 16px',
        background: 'rgba(203, 166, 88, 0.15)',
        border: '1px solid rgba(203, 166, 88, 0.3)',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: compact ? '10px' : '11px',
        letterSpacing: '2px',
        color: '#cba658',
        fontFamily: '"Helvetica Neue", sans-serif',
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      <span style={{ fontSize: '14px' }}>🌐</span>
      <span>{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
}