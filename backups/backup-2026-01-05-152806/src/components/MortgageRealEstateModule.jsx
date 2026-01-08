import React, { useState } from 'react';
import { Home, DollarSign, MapPin, Search, Calculator, FileText, Users, Globe } from 'lucide-react';

export default function MortgageRealEstateModule() {
  const [activeTab, setActiveTab] = useState('us-mortgage');
  const [language, setLanguage] = useState('en');

  const tabs = [
    { id: 'us-mortgage', icon: Home, label: { en: 'US Mortgage', es: 'Hipoteca USA' }, color: '#3b82f6' },
    { id: 'mexico-property', icon: Globe, label: { en: 'Mexico Property', es: 'Propiedad México' }, color: '#22c55e' },
    { id: 'lender-search', icon: Search, label: { en: 'Lender Search', es: 'Buscar Prestamista' }, color: '#f59e0b' },
    { id: 'calculator', icon: Calculator, label: { en: 'Calculator', es:  'Calculadora' }, color: '#8b5cf6' },
    { id: 'agents', icon: Users, label: { en: 'Agent Network', es: 'Red Agentes' }, color: '#ec4899' },
    { id: 'documents', icon: FileText, label: { en: 'Documents', es: 'Documentos' }, color: '#06b6d4' }
  ];

  return (
    <div style={{ minHeight: '100vh', background:  'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem' }}>
      <div style={{ position: 'fixed', top:  '1rem', right: '1rem', zIndex: 1000 }}>
        <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} style={{ padding: '0.5rem 1rem', background: '#22c55e', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          🌐 {language === 'en' ? 'Español' : 'English'}
        </button>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '2rem', marginBottom:  '2rem', border: '2px solid rgba(59, 130, 246, 0.3)', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap:  '1rem', marginBottom: '1rem' }}>
          <Home size={48} color="#3b82f6" />
          <div>
            <h1 style={{ fontSize: '2.5rem', color: '#fff', margin: 0, fontWeight:  'bold', textShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
              {language === 'en' ? '🏠 Mortgage & Real Estate' : '🏠 Hipotecas y Bienes Raíces'}
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', margin: '0.5rem 0 0 0' }}>
              {language === 'en' ? 'Saul Garcia NMLS #337526 • US Mortgage • Mexico Property • Agent Network' : 'Saul Garcia NMLS #337526 • Hipoteca USA • Propiedad México • Red Agentes'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab. id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '0.75rem 1.25rem', background: isActive ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)` : 'rgba(30, 41, 59, 0.6)', border: isActive ?  `2px solid ${tab.color}` : '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: isActive ? 'bold' : '600', transition:  'all 0.3s', display: 'flex', alignItems: 'center', gap:  '0.5rem', boxShadow: isActive ? `0 6px 20px ${tab.color}40` : 'none' }}>
                <Icon size={18} />
                {tab.label[language]}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(100, 116, 139, 0.3)' }}>
        {activeTab === 'us-mortgage' && <USMortgageTab language={language} />}
        {activeTab === 'mexico-property' && <MexicoPropertyTab language={language} />}
        {activeTab === 'lender-search' && <LenderSearchTab language={language} />}
        {activeTab === 'calculator' && <CalculatorTab language={language} />}
        {activeTab === 'agents' && <AgentsTab language={language} />}
        {activeTab === 'documents' && <DocumentsTab language={language} />}
      </div>
    </div>
  );
}

function USMortgageTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color:  '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>{language === 'en' ?  '🏡 US Mortgage Search' : '🏡 Búsqueda Hipoteca USA'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem', marginBottom: '1. 5rem' }}>
        <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>
          <strong style={{ color: '#fff' }}>Saul Garcia</strong><br />
          NMLS License #337526<br />
          Everwise Home Loans & Realty<br />
          Company NMLS #1739012 | DRE #02067255<br />
          15615 Alton Pkwy, Suite 450, Irvine, CA 92618<br />
          Phone: 1-844-853-9300
        </div>
      </div>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ?  'Lender matching, rate comparison, pre-approval, and mortgage calculators' : 'Emparejamiento prestamistas, comparación tasas, pre-aprobación y calculadoras hipoteca'}</div>
      </div>
    </div>
  );
}

function MexicoPropertyTab({ language }) {
  const regions = ['Cancún', 'Tulum', 'Playa del Carmen', 'Cabo San Lucas', 'Puerto Vallarta', 'Guadalajara', 'Mexico City', 'Mazatlán'];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color:  '#fff', marginBottom: '1. 5rem', fontWeight: 'bold' }}>{language === 'en' ? '🇲🇽 Mexico Property Search' : '🇲🇽 Búsqueda Propiedad México'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {regions.map((region, i) => (
          <div key={i} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏖️</div>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>{region}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LenderSearchTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color:  '#fff', marginBottom: '1rem' }}>{language === 'en' ? '🔍 Lender Search Engine' : '🔍 Motor Búsqueda Prestamistas'}</h2>
      <input type="text" placeholder={language === 'en' ? 'Search lenders...' : 'Buscar prestamistas...'} style={{ width: '100%', padding: '1rem', background:  'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '1rem' }} />
    </div>
  );
}

function CalculatorTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ? '🧮 Mortgage Calculator' : '🧮 Calculadora Hipoteca'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ? 'Calculate monthly payments for 30Y, 15Y, ARM, and custom loan terms' : 'Calcular pagos mensuales para 30A, 15A, ARM y términos préstamo personalizados'}</div>
      </div>
    </div>
  );
}

function AgentsTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color:  '#fff', marginBottom: '1rem' }}>{language === 'en' ? '🤝 Agent Referral Network' : '🤝 Red Referidos Agentes'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize:  '1.1rem' }}>{language === 'en' ? '50/50 commission split, agent registration, and verification system' : 'División comisión 50/50, registro agentes y sistema verificación'}</div>
      </div>
    </div>
  );
}

function DocumentsTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ?  '📄 Document Center' : '📄 Centro Documentos'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize:  '1.1rem' }}>{language === 'en' ? 'Upload pre-approval letters, escrow docs, title search, and fideicomiso paperwork' : 'Subir cartas pre-aprobación, documentos escrow, búsqueda título y papeleo fideicomiso'}</div>
      </div>
    </div>
  );
}