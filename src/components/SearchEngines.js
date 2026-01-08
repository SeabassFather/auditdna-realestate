<<<<<<< HEAD
ï»¿import React, { useState } from 'react';
=======
﻿ React, { useState } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import React, { useState } from 'react';
import { Upload, Search as SearchIcon, TrendingUp, DollarSign, Home, Briefcase, Scale, FileText } from 'lucide-react';

export default function SearchEngines({ activeSearchEngine, setActiveSearchEngine }) {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const engines = [
    { id: 'usda', en: 'USDA Pricing', es: 'Precios USDA', icon: TrendingUp, color: '#4caf50' },
<<<<<<< HEAD
    { id: 'watertech', en: 'WaterTech', es: 'An de Agua', icon: FileText, color: '#2196f3' },
    { id: 'mortgage', en: 'Mortgage', es: 'Hipotecas', icon: Home, color: '#ff9800' },
    { id: 'factoring', en: 'Ag Factoring', es: 'Factoraje Agr icon: DollarSign, color: '#9c27b0' },
    { id: 'mexico', en: 'Mexico RE', es: 'Bienes Ra MX', icon: Briefcase, color: '#f44336' },
=======
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    { id: 'watertech', en: 'WaterTech', es: 'An de Agua', icon: FileText, color: '#2196f3' },
    { id: 'mortgage', en: 'Mortgage', es: 'Hipotecas', icon: Home, color: '#ff9800' },
    { id: 'factoring', en: 'Ag Factoring', es: 'Factoraje Agr icon: DollarSign, color: '#9c27b0' },
    { id: 'mexico', en: 'Mexico RE', es: 'Bienes Ra MX', icon: Briefcase, color: '#f44336' },
<<<<<<< HEAD
=======
    { id: 'watertech', en: 'WaterTech', es: 'An de Agua', icon: FileText, color: '#2196f3' },
    { id: 'mortgage', en: 'Mortgage', es: 'Hipotecas', icon: Home, color: '#ff9800' },
    { id: 'factoring', en: 'Ag Factoring', es: 'Factoraje Agr icon: DollarSign, color: '#9c27b0' },
    { id: 'mexico', en: 'Mexico RE', es: 'Bienes Ra MX', icon: Briefcase, color: '#f44336' },
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    { id: 'compliance', en: 'Compliance', es: 'Cumplimiento', icon: Scale, color: '#00bcd4' },
    { id: 'upload', en: 'Upload', es: 'Carga', icon: Upload, color: '#607d8b' }
  ];

  const s = {
    engineCard: (isActive, color) => ({
      padding: '20px',
      background: isActive ? `linear-gradient(135deg, ${color}dd 0%, ${color} 100%)` : 'linear-gradient(135deg, #fff 0%, #f5f5f5 100%)',
      color: isActive ? '#fff' : '#2d3748',
      border: isActive ? `3px solid ${color}` : '2px solid #e0e0e0',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: isActive ? `0 6px 20px ${color}40` : '0 2px 8px rgba(0,0,0,0.08)',
      textAlign: 'center',
      transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }),
    card: { background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', borderRadius: '16px', padding: '32px', marginBottom: '20px', border: '2px solid #e3f2fd', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: '#2d3748' },
    input: { width: '100%', padding: '16px 20px', background: '#fff', border: '2px solid #bbdefb', borderRadius: '12px', color: '#2d3748', fontSize: '16px', fontWeight: '500', outline: 'none', transition: 'all 0.3s ease' },
    btn: (color) => ({ padding: '16px 40px', background: `linear-gradient(135deg, ${color}dd 0%, ${color} 100%)`, color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: `0 4px 12px ${color}40`, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }),
    h: { fontSize: '28px', fontWeight: '800', color: '#1a365d', marginBottom: '12px' },
    label: { display: 'block', marginBottom: '12px', color: '#2d3748', fontSize: '16px', fontWeight: '600' }
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setSearchResults({ message: 'Search complete! Results would appear here.' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {engines.map(({ id, en, es, icon: Icon, color }) => (
          <div
            key={id}
            onClick={() => { setActiveSearchEngine(id); setSearchResults(null); }}
            style={s.engineCard(activeSearchEngine === id, color)}
            onMouseEnter={(e) => {
              if (activeSearchEngine !== id) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${color}30`;
              }
            }}
            onMouseLeave={(e) => {
              if (activeSearchEngine !== id) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }
            }}
          >
            <Icon size={28} />
            <div>
              <div style={{ fontWeight: '700', fontSize: '16px' }}>{en}</div>
              <div style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '4px', opacity: activeSearchEngine === id ? 0.9 : 0.7 }}>{es}</div>
            </div>
          </div>
        ))}
      </div>

      {activeSearchEngine === 'usda' && (
        <div style={s.card}>
          <h2 style={s.h}>USDA Produce Pricing</h2>
          <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic', marginBottom: '24px' }}>Search commodity prices with 5-year historical data</p>
          <label style={s.label}>Commodity Name</label>
          <input type="text" placeholder="e.g., Avocado, Corn, Wheat, Tomatoes" style={s.input} onFocus={(e) => e.target.style.borderColor = '#4caf50'} onBlur={(e) => e.target.style.borderColor = '#bbdefb'} />
          <button onClick={handleSearch} style={{ ...s.btn('#4caf50'), marginTop: '20px' }} disabled={loading}>
<<<<<<< HEAD
            {loading ? ' Searching...' : <><SearchIcon size={20} />Search Prices</>}
            {loading ? ' Searching...' : <><SearchIcon size={20} />Search Prices</>}
=======
            {loading ? ' Searching...' : <><SearchIcon size={20} />Search Prices</>}
            {loading ? ' Searching...' : <><SearchIcon size={20} />Search Prices</>}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
          </button>
          {searchResults && <div style={{ marginTop: '24px', padding: '20px', background: '#e8f5e9', borderRadius: '12px', color: '#2e7d32', fontWeight: '600' }}>{searchResults.message}</div>}
        </div>
      )}

      {activeSearchEngine === 'watertech' && (
        <div style={s.card}>
          <h2 style={s.h}>WaterTech & Soil Analysis</h2>
          <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic', marginBottom: '24px' }}>Upload lab reports for pH, TDS, and water quality analysis</p>
          <label style={s.label}>Upload Lab Report (PDF, Excel, Images)</label>
          <input type="file" multiple accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png" style={{ ...s.input, padding: '12px' }} />
          <button style={{ ...s.btn('#2196f3'), marginTop: '20px' }}><Upload size={20} />Upload for Analysis</button>
        </div>
      )}

      {activeSearchEngine === 'mortgage' && (
        <div style={s.card}>
          <h2 style={s.h}>Mortgage & Real Estate Audit</h2>
          <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic', marginBottom: '24px' }}>Find lenders and compliance audit tools</p>
          <label style={s.label}>Loan Amount (USD)</label>
          <input type="number" placeholder="$350,000" style={s.input} onFocus={(e) => e.target.style.borderColor = '#ff9800'} onBlur={(e) => e.target.style.borderColor = '#bbdefb'} />
          <label style={{ ...s.label, marginTop: '20px' }}>Credit Score</label>
          <input type="number" placeholder="720" style={s.input} onFocus={(e) => e.target.style.borderColor = '#ff9800'} onBlur={(e) => e.target.style.borderColor = '#bbdefb'} />
          <button style={{ ...s.btn('#ff9800'), marginTop: '20px' }}><SearchIcon size={20} />Find Lenders</button>
        </div>
      )}

      {activeSearchEngine === 'factoring' && (
        <div style={s.card}>
          <h2 style={s.h}>Ag Factoring & Trade Finance</h2>
          <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic', marginBottom: '24px' }}>Invoice financing for agricultural producers</p>
          <label style={s.label}>Invoice Amount (USD)</label>
          <input type="number" placeholder="$50,000" style={s.input} onFocus={(e) => e.target.style.borderColor = '#9c27b0'} onBlur={(e) => e.target.style.borderColor = '#bbdefb'} />
          <button style={{ ...s.btn('#9c27b0'), marginTop: '20px' }}><SearchIcon size={20} />Find Factoring Companies</button>
        </div>
      )}

      {activeSearchEngine === 'mexico' && (
        <div style={s.card}>
          <h2 style={s.h}>Mexico Real Estate & Cross-Border</h2>
          <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic', marginBottom: '24px' }}>Property search and cross-border lending compliance</p>
          <label style={s.label}>Property Value (USD)</label>
          <input type="number" placeholder="$250,000" style={s.input} onFocus={(e) => e.target.style.borderColor = '#f44336'} onBlur={(e) => e.target.style.borderColor = '#bbdefb'} />
          <button style={{ ...s.btn('#f44336'), marginTop: '20px' }}><SearchIcon size={20} />Search Properties</button>
        </div>
      )}

      {activeSearchEngine === 'compliance' && (
        <div style={s.card}>
          <h2 style={s.h}>Global Compliance & Consumer Protection</h2>
          <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic', marginBottom: '24px' }}>Regulatory document search across jurisdictions</p>
          <label style={s.label}>Regulation Type</label>
          <select style={s.input}>
            <option value="">Select regulation framework...</option>
            <option value="gdpr">GDPR (European Union)</option>
            <option value="ccpa">CCPA (California)</option>
            <option value="mexico">Mexican Consumer Law</option>
            <option value="hipaa">HIPAA (Healthcare)</option>
            <option value="trid">TRID (Mortgage)</option>
          </select>
          <button style={{ ...s.btn('#00bcd4'), marginTop: '20px' }}><SearchIcon size={20} />Search Regulations</button>
        </div>
      )}

      {activeSearchEngine === 'upload' && (
        <div style={s.card}>
          <h2 style={s.h}>Document Upload Center</h2>
          <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic', marginBottom: '24px' }}>Secure encrypted document upload for audit processing</p>
          <label style={s.label}>Document Category</label>
          <select style={s.input}>
            <option value="">Select document type...</option>
            <option value="mortgage">Mortgage & Loan Documents</option>
            <option value="tax">Tax Returns & Financial Statements</option>
            <option value="legal">Legal Documents & Contracts</option>
            <option value="agricultural">Agricultural Reports & Certifications</option>
            <option value="water">Water & Soil Lab Results</option>
            <option value="insurance">Insurance Policies & Claims</option>
          </select>
          <label style={{ ...s.label, marginTop: '20px' }}>Select Files</label>
          <input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" style={{ ...s.input, padding: '12px' }} />
          <button style={{ ...s.btn('#607d8b'), marginTop: '20px' }}><Upload size={20} />Upload Documents</button>
        </div>
      )}
    </div>
  );
}


<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
