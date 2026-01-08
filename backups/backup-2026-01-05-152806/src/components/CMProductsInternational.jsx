import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Package, BarChart3, FileText, Globe, Calendar } from 'lucide-react';

export default function CMProductsInternational() {
  const [activeTab, setActiveTab] = useState('produce');
  const [language, setLanguage] = useState('en');

  const tabs = [
    { id: 'produce', icon: Package, label: { en: 'Produce', es: 'Productos' }, color: '#22c55e' },
    { id: 'protein', icon: Package, label: { en: 'Protein/Meat', es: 'Proteína/Carne' }, color: '#ef4444' },
    { id: 'analytics', icon: BarChart3, label: { en: 'Market Analytics', es: 'Análisis Mercado' }, color: '#3b82f6' },
    { id: 'po-form', icon: FileText, label:  { en: 'PO Form', es: 'Formulario PO' }, color: '#8b5cf6' },
    { id: 'finance', icon: DollarSign, label: { en: 'Finance', es: 'Finanzas' }, color: '#f59e0b' },
    { id: 'logistics', icon: Globe, label: { en: 'Logistics', es: 'Logística' }, color: '#06b6d4' },
    { id: 'contacts', icon: Users, label: { en: 'Contacts', es: 'Contactos' }, color: '#ec4899' },
    { id: 'calendar', icon: Calendar, label: { en: 'Calendar', es:  'Calendario' }, color:  '#14b8a6' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '2rem'
    }}>
      {/* Language Toggle */}
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
        <button
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          style={{
            padding: '0.5rem 1rem',
            background: '#22c55e',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🌐 {language === 'en' ? 'Español' : 'English'}
        </button>
      </div>

      {/* Header */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '2px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <TrendingUp size={48} color="#22c55e" />
          <div>
            <h1 style={{
              fontSize: '2. 5rem',
              color: '#fff',
              margin: 0,
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
            }}>
              {language === 'en' ? '📊 CM Products International' : '📊 CM Products Internacional'}
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              margin: '0.5rem 0 0 0'
            }}>
              {language === 'en'
                ? 'USDA 5-Year Pricing • Market Intelligence • Grower Registry • AI Predictions'
                : 'Precios USDA 5 Años • Inteligencia Mercado • Registro Productores • Predicciones IA'}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginTop: '1.5rem'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: isActive
                    ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)`
                    : 'rgba(30, 41, 59, 0.6)',
                  border: isActive ? `2px solid ${tab.color}` : '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight:  isActive ? 'bold' : '600',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: isActive ? `0 6px 20px ${tab.color}40` : 'none'
                }}
                onMouseEnter={(e) => {
                  if (! isActive) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${tab.color}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (! isActive) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget. style.boxShadow = 'none';
                  }
                }}
              >
                <Icon size={18} />
                {tab.label[language]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '20px',
        padding: '2rem',
        border: '2px solid rgba(100, 116, 139, 0.3)'
      }}>
        {activeTab === 'produce' && <ProduceTab language={language} />}
        {activeTab === 'protein' && <ProteinTab language={language} />}
        {activeTab === 'analytics' && <AnalyticsTab language={language} />}
        {activeTab === 'po-form' && <POFormTab language={language} />}
        {activeTab === 'finance' && <FinanceTab language={language} />}
        {activeTab === 'logistics' && <LogisticsTab language={language} />}
        {activeTab === 'contacts' && <ContactsTab language={language} />}
        {activeTab === 'calendar' && <CalendarTab language={language} />}
      </div>
    </div>
  );
}

// ============================================================================
// PRODUCE TAB (Real-time USDA Pricing)
// ============================================================================
function ProduceTab({ language }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState(null);

  const commodities = [
    {
      name: 'Hass Avocado',
      category: 'Avocados',
      price: { current: 52.67, week: 51.20, month: 48.50, year: 45.30 },
      trend: 'up',
      volume: '8,500 tons',
      regions: ['Michoacán', 'Jalisco', 'Nayarit'],
      sizes: ['32s', '36s', '40s', '48s', '60s', '70s', '84s'],
      aiPrediction: { next7days: 54.20, next30days: 56.80, confidence: 92 }
    },
    {
      name: 'Strawberries',
      category: 'Berries',
      price: { current: 28.71, week: 29.50, month: 27.80, year: 26.40 },
      trend: 'down',
      volume: '2,400 tons',
      regions: ['Baja California', 'Michoacán'],
      sizes: ['8x1lb', '12x1lb'],
      aiPrediction: { next7days:  27.50, next30days: 26.90, confidence: 88 }
    },
    {
      name: 'Raspberries',
      category: 'Berries',
      price: { current: 52.90, week: 51.80, month: 50.20, year: 48.10 },
      trend: 'up',
      volume: '1,200 tons',
      regions: ['Jalisco', 'Michoacán'],
      sizes: ['6oz', '12x6oz'],
      aiPrediction: { next7days: 54.10, next30days: 55.40, confidence: 90 }
    },
    {
      name: 'Bell Peppers',
      category:  'Peppers',
      price: { current: 31.18, week: 30.50, month: 29.80, year: 28.20 },
      trend: 'up',
      volume: '5,600 tons',
      regions: ['Sinaloa', 'Sonora'],
      sizes: ['Green', 'Red', 'Yellow', 'Orange'],
      aiPrediction: { next7days:  32.00, next30days: 33.50, confidence: 85 }
    },
    {
      name: 'Roma Tomatoes',
      category:  'Tomatoes',
      price: { current: 22.50, week: 22.80, month: 21.90, year: 20.50 },
      trend: 'stable',
      volume: '12,000 tons',
      regions:  ['Sinaloa', 'Baja California'],
      sizes: ['XL', 'Large', 'Medium'],
      aiPrediction: { next7days: 22.70, next30days: 23.10, confidence: 87 }
    }
  ];

  const filteredCommodities = commodities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>
        {language === 'en' ? '🥑 Produce Intelligence' : '🥑 Inteligencia de Productos'}
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder={language === 'en' ? 'Search commodities...' : 'Buscar productos...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '1rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '2px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '12px',
          color: '#fff',
          fontSize:  '1rem',
          marginBottom: '1.5rem'
        }}
      />

      {/* Commodities Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1. 5rem' }}>
        {filteredCommodities.map((commodity, index) => (
          <div
            key={index}
            onClick={() => setSelectedCommodity(commodity)}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '2px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {commodity.name}
              </div>
              <div style={{ color:  '#94a3b8', fontSize: '0.85rem' }}>
                {commodity.category} • {commodity.volume}
              </div>
            </div>

            {/* Current Price */}
            <div style={{
              background: 'rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                {language === 'en' ? 'Current Price' : 'Precio Actual'}
              </div>
              <div style={{
                color: '#22c55e',
                fontSize:  '2rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ${commodity.price.current}
                <span style={{ fontSize: '1. 5rem' }}>
                  {commodity.trend === 'up' ? '📈' : commodity.trend === 'down' ? '📉' : '➡️'}
                </span>
              </div>
            </div>

            {/* Price History */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ color:  '#64748b', fontSize: '0.7rem' }}>
                  {language === 'en' ? 'Week Ago' : 'Semana'}
                </div>
                <div style={{ color: '#fff', fontWeight: 'bold' }}>${commodity.price.week}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.7rem' }}>
                  {language === 'en' ? 'Month Ago' : 'Mes'}
                </div>
                <div style={{ color: '#fff', fontWeight: 'bold' }}>${commodity.price.month}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.7rem' }}>
                  {language === 'en' ? 'Year Ago' : 'Año'}
                </div>
                <div style={{ color:  '#fff', fontWeight: 'bold' }}>${commodity.price. year}</div>
              </div>
            </div>

            {/* AI Prediction */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              borderRadius: '12px',
              padding: '0.75rem'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                🤖 {language === 'en' ? 'AI Price Prediction (30d)' : 'Predicción IA Precio (30d)'}
              </div>
              <div style={{ color: '#3b82f6', fontSize: '1. 2rem', fontWeight: 'bold' }}>
                ${commodity.aiPrediction.next30days} ({commodity.aiPrediction.confidence}% {language === 'en' ? 'confidence' : 'confianza'})
              </div>
            </div>

            {/* Regions */}
            <div style={{ marginTop: '1rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                📍 {language === 'en' ? 'Regions' :  'Regiones'}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {commodity.regions.map((region, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(34, 197, 94, 0.2)',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      color: '#22c55e'
                    }}
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedCommodity && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width:  '100%',
            height:  '100%',
            background:  'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedCommodity(null)}
        >
          <div
            style={{
              background: '#1e293b',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '2px solid rgba(34, 197, 94, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>
              {selectedCommodity.name}
            </h3>
            
            {/* 5-Year Price Chart Placeholder */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '1. 5rem'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '1rem' }}>
                📊 {language === 'en' ? '5-Year Price History Chart' : 'Gráfico 5 Años Historial Precios'}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                {language === 'en' ? 'Interactive chart showing weekly pricing trends' : 'Gráfico interactivo mostrando tendencias semanales'}
              </div>
            </div>

            {/* Sizes Available */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                📦 {language === 'en' ? 'Available Sizes' : 'Tamaños Disponibles'}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedCommodity.sizes.map((size, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '2px solid rgba(34, 197, 94, 0.4)',
                      borderRadius: '12px',
                      color: '#22c55e',
                      fontWeight: 'bold'
                    }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCommodity(null)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#ef4444',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {language === 'en' ? 'Close' : 'Cerrar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PROTEIN/MEAT TAB
// ============================================================================
function ProteinTab({ language }) {
  const meatCuts = [
    { name: 'Ribeye Steak', category: 'Beef', price: 18.50, origin: 'USA', grade: 'Prime' },
    { name: 'Chicken Breast', category: 'Poultry', price: 4.20, origin: 'USA', grade: 'Grade A' },
    { name:  'Pork Tenderloin', category: 'Pork', price: 6.80, origin: 'USA', grade: 'Premium' },
    { name: 'Salmon Fillet', category: 'Seafood', price: 12.50, origin: 'Norway', grade: 'Atlantic' },
    { name: 'Ground Beef', category: 'Beef', price: 8.90, origin: 'USA', grade: '80/20' },
    { name: 'Turkey Breast', category: 'Poultry', price: 5.50, origin: 'USA', grade: 'Grade A' }
  ];

  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold' }}>
        {language === 'en' ? '🥩 Protein & Meat Products' : '🥩 Productos de Proteína y Carne'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {meatCuts.map((cut, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {cut. name}
            </div>
            <div style={{ color: '#94a3b8', fontSize:  '0.85rem', marginBottom: '1rem' }}>
              {cut.category} • {cut.grade}
            </div>
            <div style={{
              background: 'rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{ color: '#ef4444', fontSize: '1.8rem', fontWeight: 'bold' }}>
                ${cut.price}/lb
              </div>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
              📍 {language === 'en' ? 'Origin' : 'Origen'}: {cut.origin}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// ANALYTICS TAB
// ============================================================================
function AnalyticsTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>
        {language === 'en' ? '📈 Market Analytics' : '📈 Análisis de Mercado'}
      </h2>
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '16px',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
        <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
          {language === 'en'
            ? 'Real-time market analytics dashboard with USDA data integration, price trends, and AI forecasting'
            : 'Dashboard de análisis de mercado en tiempo real con integración USDA, tendencias de precios y pronósticos IA'}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PO FORM TAB
// ============================================================================
function POFormTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize:  '2rem', color: '#fff', marginBottom: '1rem' }}>
        {language === 'en' ? '📄 Purchase Order Form' : '📄 Formulario Orden de Compra'}
      </h2>
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '16px',
        padding: '2rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom:  '0.5rem' }}>
            {language === 'en' ? 'Customer Name' : 'Nombre Cliente'}
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>
            {language === 'en' ? 'Commodity' : 'Producto'}
          </label>
          <select
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '8px',
              color: '#fff'
            }}
          >
            <option>{language === 'en' ? 'Select commodity' : 'Seleccionar producto'}</option>
            <option>Hass Avocado</option>
            <option>Strawberries</option>
            <option>Raspberries</option>
          </select>
        </div>
        <button style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%'
        }}>
          {language === 'en' ? 'Generate PO' : 'Generar PO'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// FINANCE TAB
// ============================================================================
function FinanceTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
        {language === 'en' ? '💰 Finance Tools' : '💰 Herramientas Financieras'}
      </h2>
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          {language === 'en'
            ?  'Factoring, PO financing, payment tracking, and credit management tools'
            : 'Factoraje, financiamiento PO, seguimiento pagos y herramientas gestión crédito'}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LOGISTICS TAB
// ============================================================================
function LogisticsTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom:  '1rem' }}>
        {language === 'en' ?  '🚚 Logistics Management' : '🚚 Gestión Logística'}
      </h2>
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌎</div>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          {language === 'en'
            ?  'Freight tracking, GPS monitoring, cold chain compliance, and delivery management'
            : 'Seguimiento flete, monitoreo GPS, cumplimiento cadena frío y gestión entregas'}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONTACTS TAB
// ============================================================================
function ContactsTab({ language }) {
  const contacts = [
    { name: 'Green Valley Farms', role: 'Grower', location: 'Michoacán, MX', commodity: 'Avocados' },
    { name: 'Sunrise Produce Co.', role: 'Buyer', location: 'Los Angeles, CA', commodity: 'Mixed' },
    { name: 'Pacific Logistics', role: 'Freight', location: 'San Diego, CA', commodity: 'Transport' },
    { name: 'Quality Labs Inc.', role: 'Testing', location: 'Phoenix, AZ', commodity: 'Analysis' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold' }}>
        {language === 'en' ? '👥 Contact Directory' : '👥 Directorio Contactos'}
      </h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {contacts.map((contact, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{contact.name}</div>
              <div style={{ color: '#94a3b8', fontSize:  '0.85rem' }}>
                {contact.role} • {contact.location}
              </div>
            </div>
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
              color: '#22c55e',
              fontWeight: 'bold',
              fontSize: '0.85rem'
            }}>
              {contact.commodity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// CALENDAR TAB
// ============================================================================
function CalendarTab({ language }) {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
        {language === 'en' ? '📅 52-Week Harvest Calendar' : '📅 Calendario Cosecha 52 Semanas'}
      </h2>
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📆</div>
        <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          {language === 'en'
            ?  'Interactive calendar showing harvest windows, peak seasons, and availability by commodity and region'
            : 'Calendario interactivo mostrando ventanas cosecha, temporadas pico y disponibilidad por producto y región'}
        </div>
      </div>
    </div>
  );
}