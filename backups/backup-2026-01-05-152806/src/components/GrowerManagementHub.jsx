import React, { useState } from 'react';
import { Users, Search, MapPin, Award, TrendingUp, Truck, Package, FileText } from 'lucide-react';

export default function GrowerManagementHub() {
  const [activeTab, setActiveTab] = useState('directory');
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'directory', icon: Users, label: { en: 'Grower Directory', es: 'Directorio Productores' }, color: '#22c55e' },
    { id: 'harvest', icon: Package, label: { en: 'Harvest Management', es: 'Gestión Cosecha' }, color: '#f59e0b' },
    { id: 'compliance', icon: Award, label: { en: 'Compliance', es: 'Cumplimiento' }, color: '#3b82f6' },
    { id: 'freight', icon: Truck, label:  { en: 'Freight Calculator', es: 'Calculadora Flete' }, color: '#8b5cf6' },
    { id: 'tracking', icon: MapPin, label:  { en: 'GPS Tracking', es: 'Rastreo GPS' }, color: '#ef4444' },
    { id: 'documents', icon: FileText, label:  { en: 'Documents', es: 'Documentos' }, color: '#06b6d4' }
  ];

  return (
    <div style={{ minHeight: '100vh', background:  'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem' }}>
      <div style={{ position: 'fixed', top:  '1rem', right: '1rem', zIndex: 1000 }}>
        <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} style={{ padding: '0.5rem 1rem', background: '#22c55e', border: 'none', borderRadius:  '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          🌐 {language === 'en' ? 'Español' : 'English'}
        </button>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', border: '2px solid rgba(34, 197, 94, 0.3)', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap:  '1rem', marginBottom: '1rem' }}>
          <Users size={48} color="#22c55e" />
          <div>
            <h1 style={{ fontSize:  '2.5rem', color: '#fff', margin: 0, fontWeight: 'bold', textShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}>
              {language === 'en' ?  '🌾 Grower Management Hub' : '🌾 Centro Gestión Productores'}
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', margin: '0.5rem 0 0 0' }}>
              {language === 'en' ? 'Grower Registry • TraceCert Compliance • Harvest Tracking • GPS Monitoring' : 'Registro Productores • Cumplimiento TraceCert • Seguimiento Cosecha • Monitoreo GPS'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop:  '1.5rem' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '0.75rem 1.25rem', background: isActive ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)` : 'rgba(30, 41, 59, 0.6)', border: isActive ? `2px solid ${tab.color}` : '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: isActive ? 'bold' : '600', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: isActive ? `0 6px 20px ${tab. color}40` : 'none' }}>
                <Icon size={18} />
                {tab.label[language]}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(100, 116, 139, 0.3)' }}>
        {activeTab === 'directory' && <DirectoryTab language={language} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        {activeTab === 'harvest' && <HarvestTab language={language} />}
        {activeTab === 'compliance' && <ComplianceTab language={language} />}
        {activeTab === 'freight' && <FreightTab language={language} />}
        {activeTab === 'tracking' && <TrackingTab language={language} />}
        {activeTab === 'documents' && <DocumentsTab language={language} />}
      </div>
    </div>
  );
}

function DirectoryTab({ language, searchQuery, setSearchQuery }) {
  const growers = [
    { id:  'GRW-001', name: 'Green Valley Farms', location: 'Michoacán, MX', commodity: 'Avocados', acreage: 850, aciScore: 97, badge: 'GREEN', certifications: ['Organic', 'GlobalGAP'] },
    { id: 'GRW-002', name: 'Sunrise Produce Co.', location: 'Salinas, CA', commodity: 'Lettuce', acreage: 1200, aciScore: 99, badge: 'GREEN', certifications: ['USDA Organic', 'GAP'] },
    { id: 'GRW-003', name:  'Pacific Berry Growers', location: 'Oxnard, CA', commodity: 'Strawberries', acreage: 450, aciScore: 95, badge: 'GREEN', certifications: ['GAP', 'Organic'] }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>{language === 'en' ?  '🌾 Grower Directory' : '🌾 Directorio Productores'}</h2>
      <input type="text" placeholder={language === 'en' ? 'Search growers.. .' : 'Buscar productores.. .'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '1rem', marginBottom: '1.5rem' }} />
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {growers.map((grower, i) => (
          <div key={i} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <div style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 'bold' }}>{grower.name}</div>
                <div style={{ color:  '#94a3b8', fontSize: '0.85rem' }}>{grower.id} • {grower.location}</div>
              </div>
              <div style={{ padding: '0.5rem 1rem', borderRadius: '12px', background:  '#22c55e40', color: '#22c55e', fontWeight: 'bold', fontSize: '0.85rem' }}>
                {grower.badge}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ color:  '#64748b', fontSize: '0.75rem' }}>Commodity</div>
                <div style={{ color: '#fff', fontWeight: 'bold' }}>{grower.commodity}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Acreage</div>
                <div style={{ color:  '#fff', fontWeight: 'bold' }}>{grower.acreage} acres</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>ACI Score</div>
                <div style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.2rem' }}>{grower.aciScore}/100</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {grower.certifications.map((cert, idx) => (
                <span key={idx} style={{ padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '12px', fontSize: '0.75rem', color: '#22c55e' }}>{cert}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HarvestTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ? '📦 Harvest Management' : '📦 Gestión Cosecha'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ?  'Track harvest windows, yields, volumes, and shipment schedules' : 'Seguimiento ventanas cosecha, rendimientos, volúmenes y programas envío'}</div>
      </div>
    </div>
  );
}

function ComplianceTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ? '✅ TraceCert Compliance' : '✅ Cumplimiento TraceCert'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding:  '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ? 'ACI Score tracking, lab test uploads, certification management' : 'Seguimiento puntuación ACI, subida pruebas laboratorio, gestión certificaciones'}</div>
      </div>
    </div>
  );
}

function FreightTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ?  '🚚 Freight Calculator' : '🚚 Calculadora Flete'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ? 'Calculate freight costs by commodity, weight, distance, and route' : 'Calcular costos flete por producto, peso, distancia y ruta'}</div>
      </div>
    </div>
  );
}

function TrackingTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ? '📍 Live GPS Tracking' : '📍 Rastreo GPS en Vivo'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding:  '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ? 'Real-time shipment tracking with GPS coordinates and ETA predictions' : 'Seguimiento envíos tiempo real con coordenadas GPS y predicciones ETA'}</div>
      </div>
    </div>
  );
}

function DocumentsTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>{language === 'en' ? '📁 Document Vault' : '📁 Bóveda Documentos'}</h2>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{language === 'en' ? 'Secure storage for certifications, lab tests, insurance, and compliance documents' : 'Almacenamiento seguro para certificaciones, pruebas laboratorio, seguros y documentos cumplimiento'}</div>
      </div>
    </div>
  );
}