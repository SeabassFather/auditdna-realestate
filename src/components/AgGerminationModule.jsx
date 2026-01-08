import React, { useState } from 'react';
import { agGerminationCatalog, getAgCategories } from './agGerminationCatalog';

function AgGerminationModule() {
  const [selectedTests, setSelectedTests] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(['Vegetables - Fruiting']);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = getAgCategories();

  const toggleCategory = (category) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTest = (testId) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const totalCost = selectedTests.reduce((sum, testId) => {
    const test = agGerminationCatalog.find(t => t.id === testId);
    return sum + (test ? test.price : 0);
  }, 0);

  const getCategoryTests = (category) => {
    return agGerminationCatalog.filter(t => 
      t.category === category && 
      (searchTerm === '' || 
       t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       t.crop.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const categoryIcons = {
    'Vegetables - Fruiting': '🍅',
    'Vegetables - Leafy': '🥬',
    'Vegetables - Root': '🥕',
    'Legumes': '🫘',
    'Grains': '🌾',
    'Fruits': '🍓'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a2332', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Header */}
        <h1 style={{ 
          fontSize: '56px', 
          fontWeight: 'bold', 
          color: '#4ade80', 
          marginBottom: '40px', 
          textAlign: 'center',
          textShadow: '0 0 20px rgba(74,222,128,0.5)'
        }}>
          Agricultural Germination Testing - 55 Tests
        </h1>

        {/* Main Container */}
        <div style={{ 
          background: '#0f1923', 
          borderRadius: '24px', 
          padding: '50px',
          border: '1px solid rgba(74,222,128,0.3)',
          marginBottom: '40px'
        }}>
          
          {/* Top Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <div style={{ fontSize: '100px' }}>🌱</div>
              <div>
                <h2 style={{ fontSize: '36px', color: '#4ade80', marginBottom: '12px', fontWeight: '700' }}>
                  Select Germination Tests
                </h2>
                <p style={{ color: '#64748b', fontSize: '18px' }}>
                  Vegetables, Fruits, Grains, Legumes - Pinpoint by Crop
                </p>
              </div>
            </div>

            {/* Cost Display */}
            <div style={{ 
              background: 'rgba(74,222,128,0.1)', 
              border: '2px solid rgba(74,222,128,0.4)', 
              borderRadius: '20px', 
              padding: '30px 50px',
              textAlign: 'center',
              minWidth: '250px'
            }}>
              <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '8px' }}>Total Cost</div>
              <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#4ade80', lineHeight: '1' }}>
                ${totalCost}
              </div>
              <div style={{ fontSize: '16px', color: '#64748b', marginTop: '8px' }}>
                {selectedTests.length} tests selected
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '40px' }}>
            <input
              type="text"
              placeholder="🔍 Search by crop name or test name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '18px 24px',
                fontSize: '18px',
                background: 'rgba(15,25,35,0.6)',
                border: '2px solid rgba(74,222,128,0.4)',
                borderRadius: '12px',
                color: 'white',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Sections */}
          {categories.map(category => {
            const categoryTests = getCategoryTests(category);
            const isExpanded = expandedCategories.includes(category);

            if (searchTerm && categoryTests.length === 0) return null;

            return (
              <div key={category} style={{ marginBottom: '40px' }}>
                
                {/* Category Header */}
                <div 
                  onClick={() => toggleCategory(category)}
                  style={{ 
                    background: 'rgba(74,222,128,0.1)',
                    border: '1px solid rgba(74,222,128,0.3)',
                    borderRadius: '12px',
                    padding: '20px 30px',
                    marginBottom: isExpanded ? '24px' : '0',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '36px' }}>{categoryIcons[category]}</span>
                    <h3 style={{ fontSize: '28px', color: '#4ade80', margin: 0, fontWeight: '700' }}>
                      {category}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: '#64748b', fontSize: '16px' }}>
                      {categoryTests.length} tests
                    </span>
                    <span style={{ fontSize: '24px', color: '#4ade80', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* Category Tests Grid */}
                {isExpanded && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '20px'
                  }}>
                    {categoryTests.map(test => (
                      <div
                        key={test.id}
                        onClick={() => toggleTest(test.id)}
                        style={{
                          background: selectedTests.includes(test.id) 
                            ? 'rgba(74,222,128,0.2)' 
                            : 'rgba(15,25,35,0.6)',
                          border: selectedTests.includes(test.id)
                            ? '2px solid rgba(74,222,128,0.6)'
                            : '1px solid rgba(100,116,139,0.3)',
                          borderRadius: '16px',
                          padding: '24px',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(74,222,128,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: selectedTests.includes(test.id) ? '#4ade80' : 'transparent',
                          border: '2px solid #4ade80',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}>
                          {selectedTests.includes(test.id) && '✓'}
                        </div>

                        {/* Test Content */}
                        <div style={{ paddingRight: '40px' }}>
                          <div style={{ fontSize: '14px', color: '#4ade80', marginBottom: '6px', fontWeight: '600' }}>
                            {test.crop}
                          </div>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
                            {test.name}
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4ade80', marginBottom: '4px' }}>
                            ${test.price}
                          </div>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {test.turnaround} days • {test.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Action Buttons */}
          {selectedTests.length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              marginTop: '50px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(100,116,139,0.3)'
            }}>
              <button
                onClick={() => setSelectedTests([])}
                style={{
                  background: 'rgba(100,116,139,0.2)',
                  color: '#94a3b8',
                  border: '1px solid rgba(100,116,139,0.4)',
                  borderRadius: '12px',
                  padding: '18px 40px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  flex: 1
                }}
              >
                Clear Selection
              </button>
              <button
                style={{
                  background: 'linear-gradient(135deg, #4ade80, #16a34a)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '18px 40px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(74,222,128,0.4)',
                  transition: 'all 0.3s',
                  flex: 2
                }}
              >
                Submit Order - ${totalCost}
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ 
          background: 'rgba(74,222,128,0.1)', 
          border: '1px solid rgba(74,222,128,0.3)', 
          borderRadius: '16px', 
          padding: '30px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '8px' }}>
            Agricultural Testing Backend
          </p>
          <p style={{ fontSize: '16px', color: '#4ade80', fontFamily: 'monospace' }}>
            http://localhost:8001/api/tests/?category=agriculture
          </p>
        </div>
      </div>
    </div>
  );
}

export default AgGerminationModule;


