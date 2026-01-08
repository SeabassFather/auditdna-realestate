import React, { useState } from 'react';
import { DollarSign, TrendingUp, Shield, Users, CheckCircle, AlertCircle, Clock, BarChart3 } from 'lucide-react';

export default function TradeFinanceModule() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('en');

  const tabs = [
    { id: 'dashboard', icon: BarChart3, label: { en: 'Dashboard', es:  'Panel' }, color: '#22c55e' },
    { id: 'invoice-factoring', icon: DollarSign, label: { en: 'Invoice Factoring', es: 'Factoraje' }, color: '#3b82f6' },
    { id: 'po-finance', icon: Shield, label: { en: 'PO Finance', es: 'Financiamiento PO' }, color:  '#8b5cf6' },
    { id: 'credit-scoring', icon: TrendingUp, label: { en: 'Credit Scoring', es: 'Puntuación Crédito' }, color: '#f59e0b' },
    { id: 'risk-analysis', icon: AlertCircle, label: { en:  'Risk Analysis', es: 'Análisis Riesgo' }, color: '#ef4444' },
    { id: 'applications', icon: Clock, label: { en: 'Applications', es: 'Solicitudes' }, color: '#06b6d4' },
    { id: 'clients', icon: Users, label: { en: 'Clients', es: 'Clientes' }, color: '#ec4899' }
  ];

  return (
    <div style={{ minHeight: '100vh', background:  'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem' }}>
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
        <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} style={{ padding: '0.5rem 1rem', background: '#22c55e', border: 'none', borderRadius: '8px', color:  '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          🌐 {language === 'en' ? 'Español' : 'English'}
        </button>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', border: '2px solid rgba(34, 197, 94, 0.3)', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <DollarSign size={48} color="#22c55e" />
          <div>
            <h1 style={{ fontSize: '2. 5rem', color: '#fff', margin: 0, fontWeight: 'bold', textShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}>
              {language === 'en' ? '💸 Trade Finance Module' : '💸 Módulo Financiamiento Comercial'}
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', margin: '0.5rem 0 0 0' }}>
              {language === 'en' ?  'AI-Powered Risk Scoring • Auto-Approval • Real-Time Analytics' : 'Puntuación Riesgo IA • Auto-Aprobación • Análisis Tiempo Real'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '0.75rem 1.25rem', background: isActive ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)` : 'rgba(30, 41, 59, 0.6)', border: isActive ? `2px solid ${tab.color}` : '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: isActive ? 'bold' : '600', transition: 'all 0.3s', display: 'flex', alignItems:  'center', gap: '0.5rem', boxShadow: isActive ? `0 6px 20px ${tab.color}40` : 'none' }}>
                <Icon size={18} />
                {tab.label[language]}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(100, 116, 139, 0.3)' }}>
        {activeTab === 'dashboard' && <DashboardTab language={language} />}
        {activeTab === 'invoice-factoring' && <InvoiceFactoringTab language={language} />}
        {activeTab === 'po-finance' && <POFinanceTab language={language} />}
        {activeTab === 'credit-scoring' && <CreditScoringTab language={language} />}
        {activeTab === 'risk-analysis' && <RiskAnalysisTab language={language} />}
        {activeTab === 'applications' && <ApplicationsTab language={language} />}
        {activeTab === 'clients' && <ClientsTab language={language} />}
      </div>
    </div>
  );
}

function DashboardTab({ language }) {
  const stats = [
    { label: { en: 'Total Financed', es: 'Total Financiado' }, value: '$2. 4M', change: '+18%', color: '#22c55e' },
    { label: { en: 'Active Deals', es: 'Acuerdos Activos' }, value: '47', change: '+12%', color: '#3b82f6' },
    { label: { en: 'Avg Risk Score', es: 'Puntuación Riesgo Prom' }, value: '18/100', change: '-5%', color: '#f59e0b' },
    { label: { en: 'Auto-Approved', es: 'Auto-Aprobados' }, value: '89%', change: '+3%', color: '#8b5cf6' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold' }}>
        {language === 'en' ? '📊 Finance Dashboard' : '📊 Panel Financiero'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: 'rgba(15, 23, 42, 0.6)', border: `2px solid ${stat.color}40`, borderRadius: '12px', padding:  '1. 5rem' }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{stat.label[language]}</div>
            <div style={{ fontSize: '2rem', color: stat.color, fontWeight: 'bold', marginBottom: '0.5rem' }}>{stat.value}</div>
            <div style={{ fontSize: '0.85rem', color: stat.change. startsWith('+') ? '#22c55e' : '#ef4444' }}>{stat.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvoiceFactoringTab({ language }) {
  const deals = [
    { client: 'Green Valley Farms', amount: 45000, advance: 90, fee: 2.5, riskScore: 12, status: 'approved' },
    { client: 'Sunrise Produce', amount: 32000, advance: 85, fee: 3.0, riskScore: 28, status: 'pending' },
    { client: 'Pacific Growers', amount: 58000, advance: 88, fee: 2.8, riskScore: 15, status: 'approved' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold' }}>
        {language === 'en' ? '⚡ Invoice Factoring' : '⚡ Factoraje de Facturas'}
      </h2>
      <div style={{ display:  'grid', gap: '1.5rem' }}>
        {deals.map((d, i) => (
          <div key={i} style={{ background: 'rgba(15, 23, 42, 0.6)', border: `2px solid ${d.status === 'approved' ? '#22c55e40' : '#f59e0b40'}`, borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{d.client}</div>
                <div style={{ color: '#94a3b8', fontSize:  '0.85rem' }}>${d.amount. toLocaleString()} • {d.advance}% advance</div>
              </div>
              <div style={{ padding: '0.5rem 1rem', borderRadius: '12px', background: d.status === 'approved' ?  '#22c55e40' : '#f59e0b40', color:  d.status === 'approved' ?  '#22c55e' : '#f59e0b', fontWeight: 'bold', fontSize: '0.85rem' }}>
                {d.status. toUpperCase()}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Risk Score</div>
                <div style={{ color: d.riskScore < 20 ? '#22c55e' : '#f59e0b', fontSize: '1. 5rem', fontWeight: 'bold' }}>{d.riskScore}/100</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Fee Rate</div>
                <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 'bold' }}>{d.fee}%</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Net Advance</div>
                <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 'bold' }}>${((d.amount * d.advance / 100) - (d.amount * d.fee / 100)).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function POFinanceTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ?  '📄 PO Financing' : '📄 Financiamiento PO'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding:  '3rem', textAlign: 'center', border: '2px dashed rgba(139, 92, 246, 0.5)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💰</div>
        <div style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 'bold' }}>{language === 'en' ?  'Upload Purchase Order' : 'Subir Orden de Compra'}</div>
        <button style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor:  'pointer', fontSize: '1rem' }}>
          {language === 'en' ? 'Select File' : 'Seleccionar Archivo'}
        </button>
      </div>
    </div>
  );
}

function CreditScoringTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ? '🎯 AI Credit Scoring' : '🎯 Puntuación Crédito IA'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding:  '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ?  'AI-powered credit analysis based on payment history, TraceCert score, financial health, and industry risk' : 'Análisis crédito IA basado en historial pagos, puntuación TraceCert, salud financiera y riesgo industria'}</div>
      </div>
    </div>
  );
}

function RiskAnalysisTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ? '⚠️ Risk Analysis' :  '⚠️ Análisis de Riesgo'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ? 'Real-time risk monitoring, fraud detection, payment prediction analytics' : 'Monitoreo riesgo tiempo real, detección fraude, análisis predicción pagos'}</div>
      </div>
    </div>
  );
}

function ApplicationsTab({ language }) {
  const apps = [
    { id: 'APP-001', client: 'ABC Foods', type: 'Factoring', amount: 25000, status: 'approved', date: '2025-12-17' },
    { id: 'APP-002', client: 'XYZ Logistics', type: 'PO Finance', amount: 50000, status: 'pending', date: '2025-12-16' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold' }}>{language === 'en' ?  '📋 Applications' : '📋 Solicitudes'}</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {apps. map((app, i) => (
          <div key={i} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold' }}>{app.id} - {app.client}</div>
              <div style={{ color:  '#94a3b8', fontSize: '0.85rem' }}>{app.type} • ${app.amount.toLocaleString()}</div>
            </div>
            <div style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', background: app.status === 'approved' ? '#22c55e40' : '#f59e0b40', color: app. status === 'approved' ? '#22c55e' : '#f59e0b', fontWeight:  'bold', fontSize: '0.75rem' }}>
              {app.status.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientsTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ? '👥 Client Portfolio' : '👥 Cartera Clientes'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize:  '1.1rem' }}>{language === 'en' ?  'Complete client management with credit limits, payment history, and risk profiles' : 'Gestión completa clientes con límites crédito, historial pagos y perfiles riesgo'}</div>
      </div>
    </div>
  );
}