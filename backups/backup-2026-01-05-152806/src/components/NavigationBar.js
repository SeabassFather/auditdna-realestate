import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState(null);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      route: '/',
      type: 'link'
    },
    {
      id: 'produce',
      label: 'Produce & Analytics',
      type: 'accordion',
      subItems: [
        { label: 'CM Products', route: '/cm-products' },
        { label:  'Analytics', route: '/analytics' }
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      type: 'accordion',
      subItems: [
        { label: 'Finance Dashboard', route: '/accounting' },
        { label: 'PO Form', route: '/po-form' }
      ]
    },
    {
      id: 'traceability',
      label: 'Traceability',
      route: '/traceability',
      type: 'link'
    },
    {
      id: 'growers',
      label: 'Growers',
      type: 'accordion',
      subItems:  [
        { label: 'Growers', route: '/growers' },
        { label: 'Buyers', route: '/buyers' },
        { label: 'Suppliers', route: '/suppliers' }
      ]
    },
    {
      id: 'latin-america',
      label: 'Latin America',
      route: '/latin-america',
      type: 'link'
    },
    {
      id: 'cart',
      label: 'Cart',
      route: '/cart',
      type:  'link'
    }
  ];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null :  id);
  };

  const handleNavigation = (route) => {
    navigate(route);
    setOpenAccordion(null);
  };

  return (
    <div style={{
      background: '#ffffff',
      borderBottom: '2px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Main Navigation Bar */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#10b981',
            cursor: 'pointer',
            padding: '1rem 0'
          }}
        >
          AuditDNA
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', gap:  '0.5rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <div key={item.id} style={{ position: 'relative' }}>
              {item.type === 'link' ?  (
                <button
                  onClick={() => handleNavigation(item.route)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: 'pointer',
                    transition:  'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.color = '#10b981';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style. background = 'transparent';
                    e. currentTarget.style.color = '#374151';
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    style={{
                      padding: '0.75rem 1.25rem',
                      background: openAccordion === item.id ?  '#f3f4f6' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.9375rem',
                      fontWeight: '600',
                      color: openAccordion === item.id ?  '#10b981' : '#374151',
                      cursor: 'pointer',
                      transition:  'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      if (openAccordion !== item.id) {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.color = '#10b981';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (openAccordion !== item.id) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }
                    }}
                  >
                    {item.label}
                    <span style={{ fontSize: '0.75rem' }}>
                      {openAccordion === item.id ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {openAccordion === item.id && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '0.5rem',
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      minWidth: '200px',
                      zIndex:  1000,
                      overflow: 'hidden'
                    }}>
                      {item.subItems.map((subItem, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavigation(subItem.route)}
                          style={{
                            width: '100%',
                            padding: '0.875rem 1.25rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: idx < item.subItems.length - 1 ? '1px solid #f3f4f6' : 'none',
                            textAlign: 'left',
                            fontSize: '0.9375rem',
                            fontWeight: '500',
                            color: '#374151',
                            cursor: 'pointer',
                            transition:  'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget. style.background = '#f0fdf4';
                            e. currentTarget.style.color = '#10b981';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#374151';
                          }}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}