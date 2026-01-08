import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AlcoholAnalysisModule() {
  const { t } = useLanguage();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}></div>
          <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '0.5rem' }}>
            {t('AlcoholAnalysisModule', 'AlcoholAnalysisModule')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Alcohol Content Analysis & Traceability
          </p>
        </div>

        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>
            {t('Coming Soon', 'Próximamente')}
          </h2>
          <p style={{ color: '#666' }}>
            {t(
              'This module is under development. Full functionality will be available soon.',
              'Este módulo está en desarrollo. La funcionalidad completa estará� disponible pronto.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}




