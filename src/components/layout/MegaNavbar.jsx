// ================================================================
// MEGANAVBAR - UPDATED WITH LATAM MODULE
// ================================================================
// Date Updated: 2025-11-19 21:36:01 UTC
// Author: SeabassFather (Saul Garcia)
// Changes: Added Latin America Trade Module
// ================================================================

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function MegaNavbar({ 
  currentModule, 
  setCurrentModule, 
  navigate, 
  language,
  hasLatamAccess,
  onLatamLogout 
}) {
  const { toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  // ============================================================
  // DESKTOP MENU GROUPS (MEGA MENUS) - WITH LATAM
  // ============================================================
  const menus = [
    {
      title: '  Home & Public',
      items: [
        { id: 'public', label: 'Public Dashboard', icon: ' ' },
        { id: 'verify', label: 'Verify Products', icon: ' },
        { id: 'grower', label: 'Grower Hub', icon: ' }
      ]
    },
    {
      title: ' Latin America Trade',
      items: [
        { id: 'latam', label: ' LATAM Portal', icon: ' requiresAuth: true },
        { id: 'finance', label: 'Mexico Finance', icon: ' },
        { id: 'internal', label: 'Export/Import Ops', icon: ' },
        { id: 'produce', label: 'Market Pricing', icon: ' },
        { id: 'verify', label: 'Traceability', icon: ' }
      ]
    },
    {
      title: ' Finance Suite',
      items: [
        { id: 'finance', label: 'Finance Master', icon: ' },
        { id: 'finance', label: 'Factoring', icon: ' },
        { id: 'finance', label: 'PO Finance', icon: ' },
        { id: 'finance', label: 'Invoice Calendar', icon: ' },
        { id: 'finance', label: 'Credit Insurance', icon: ' },
        { id: 'internal', label: 'Liquid Capital Bridge', icon: ' }
      ]
    },
    {
      title: ' Produce Intelligence',
      items: [
        { id: 'produce', label: 'USDA Pricing', icon: ' },
        { id: 'produce', label: 'Price Forecasts', icon: ' },
        { id: 'produce', label: 'Packaging & Sizes', icon: ' },
        { id: 'produce', label: 'Regional Reports', icon: ' }
      ]
    },
    {
      title: ' Protein Intelligence',
      items: [
        { id: 'protein', label: 'USDA Meat Markets', icon: ' },
        { id: 'protein', label: 'Price Charts', icon: ' },
        { id: 'protein', label: 'Cut/Grade Reports', icon: ' }
      ]
    },
    {
      title: ' CM Products',
      items: [
        { id: 'internal', label: 'CM Intelligence', icon: ' },
        { id: 'internal', label: 'Analytics', icon: ' },
        { id: 'internal', label: 'Documents', icon: ' },
        { id: 'internal', label: 'Logistics', icon: ' }
      ]
    },
    {
      title: ' AI & Admin',
      items: [
        { id: 'agents', label: 'AI Agents', icon: ' },
        { id: 'admin', label: 'Admin Settings', icon: ' },
        { id: 'customer-portal', label: 'Customer Portal', icon: ' }
      ]
    }
  ];

  // ============================================================
  // SEARCH ENGINE HANDLER
  // ============================================================
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    alert("Global Search Coming Soon: " + searchQuery);
    setSearchQuery('');
    setSearchOpen(false);
  };

  // ============================================================
  // RENDER MENU GROUP (DROPDOWN)
  // ============================================================
  const renderMenuGroup = (group, index) => (
    <div 
      key={group.title}
      style={{ position: 'relative' }}
      onMouseEnter={() => setActiveMenu(index)}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <button
        style={{
          padding: '0.75rem 1rem',
          color: group.title.includes('Latin America') && hasLatamAccess ? '#22c55e' : 'white',
          fontWeight: '600',
          background: group.title.includes('Latin America') && hasLatamAccess ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
          border: group.title.includes('Latin America') && hasLatamAccess ? '1px solid #22c55e' : 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#22c55e';
          if (group.title.includes('Latin America')) {
            e.target.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.color = group.title.includes('Latin America') && hasLatamAccess ? '#22c55e' : 'white';
          e.target.style.transform = 'scale(1)';
        }}
      >
        {group.title}
        {group.title.includes('Latin America') && hasLatamAccess && ' 
      </button>

      {/* Dropdown */}
      {activeMenu === index && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            marginTop: '0.5rem',
            background: '#1f2937',
            border: '2px solid #22c55e',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            zIndex: 1000,
            padding: '1rem',
            width: '16rem',
            minWidth: '250px'
          }}
        >
          {group.items.map(item => (
            <div
              key={item.label}
              onClick={() => {
                setCurrentModule(item.id);
                setActiveMenu(null);
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                color: item.requiresAuth && !hasLatamAccess ? '#9ca3af' : '#d1d5db',
                transition: 'all 0.2s',
                marginBottom: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: item.requiresAuth && !hasLatamAccess ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!item.requiresAuth || hasLatamAccess) {
                  e.target.style.background = '#22c55e';
                  e.target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = item.requiresAuth && !hasLatamAccess ? '#9ca3af' : '#d1d5db';
              }}
            >
              <span>{item.icon} {item.label}</span>
              {item.requiresAuth && !hasLatamAccess && <span style={{ fontSize: '0.8rem' }}>
              {item.requiresAuth && hasLatamAccess && <span style={{ fontSize: '0.8rem', color: '#22c55e' }}>
            </div>
          ))}
          
          {/* LATAM Logout Button (if logged in) */}
          {group.title.includes('Latin America') && hasLatamAccess && onLatamLogout && (
            <>
              <div style={{
                borderTop: '1px solid #374151',
                margin: '0.5rem 0',
                paddingTop: '0.5rem'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLatamLogout();
                    setActiveMenu(null);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#ef4444';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                    e.target.style.color = '#ef4444';
                  }}
                >
                   Logout LATAM
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

  // ============================================================
  // MAIN COMPONENT RETURN
  // ============================================================
  return (
    <nav
      style={{
        width: '100%',
        background: '#030712',
        borderBottom: '2px solid #22c55e',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* ======================================================== */}
      {/* TOP BAR (LOGO + SEARCH + LANGUAGE + MOBILE TOGGLE)       */}
      {/* ======================================================== */}
      <div style={{
        maxWidth: '1800px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem'
      }}>

        {/* LOGO */}
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#22c55e',
            cursor: 'pointer',
            textShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onClick={() => setCurrentModule('public')}
        >
           AuditDNA
          {hasLatamAccess && (
            <span style={{
              fontSize: '0.7rem',
              background: 'rgba(34, 197, 94, 0.2)',
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              border: '1px solid #22c55e'
            }}>
               LATAM
            </span>
          )}
        </div>

        {/* DESKTOP SEARCH */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            style={{
              color: '#d1d5db',
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: 'color 0.3s'
            }}
            onClick={() => setSearchOpen(!searchOpen)}
            onMouseEnter={(e) => e.target.style.color = '#22c55e'}
            onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
          >
            
          </button>

          {searchOpen && (
            <form onSubmit={handleSearch}>
              <input
                style={{
                  background: '#1f2937',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid #22c55e',
                  outline: 'none',
                  width: '250px'
                }}
                placeholder="Search anything..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}
        </div>

        {/* LANGUAGE TOGGLE - DESKTOP */}
        <button
          onClick={toggleLanguage}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            display: window.innerWidth >= 768 ? 'block' : 'none'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {language === "en" ? " ES" : " EN"}
        </button>

        {/* MOBILE MENU TOGGLE */}
        <button
          style={{
            color: 'white',
            fontSize: '2rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: window.innerWidth < 768 ? 'block' : 'none'
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          
        </button>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP MEGA MENUS                                      */}
      {/* ======================================================== */}
      <div style={{
        display: window.innerWidth >= 768 ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0.75rem',
        background: '#1f2937',
        borderTop: '1px solid #22c55e',
        flexWrap: 'wrap'
      }}>
        {menus.map((menu, index) => renderMenuGroup(menu, index))}
      </div>

      {/* ======================================================== */}
      {/* MOBILE DROPDOWN MENU                                     */}
      {/* ======================================================== */}
      {mobileOpen && (
        <div style={{
          display: window.innerWidth < 768 ? 'block' : 'none',
          background: '#1f2937',
          borderTop: '1px solid #22c55e',
          padding: '1rem'
        }}>

          {/* SEARCH MOBILE */}
          <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
            <input
              style={{
                width: '100%',
                background: '#374151',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #22c55e',
                outline: 'none'
              }}
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* LATAM STATUS BADGE */}
          {hasLatamAccess && (
            <div style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid #22c55e',
              borderRadius: '8px',
              padding: '0.75rem',
              marginBottom: '1rem',
              textAlign: 'center',
              color: '#22c55e',
              fontWeight: 'bold'
            }}>
               LATAM Portal Active 
            </div>
          )}

          {/* MENU GROUPS */}
          {menus.map(group => (
            <div key={group.title} style={{ marginBottom: '1rem' }}>
              <h3 style={{ 
                color: group.title.includes('Latin America') && hasLatamAccess ? '#22c55e' : '#9ca3af', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem', 
                fontSize: '1.1rem' 
              }}>
                {group.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {group.items.map(item => (
                  <div
                    key={item.label}
                    onClick={() => {
                      setCurrentModule(item.id);
                      setMobileOpen(false);
                    }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: item.requiresAuth && !hasLatamAccess ? '#6b7280' : '#d1d5db',
                      transition: 'all 0.2s',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      opacity: item.requiresAuth && !hasLatamAccess ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!item.requiresAuth || hasLatamAccess) {
                        e.target.style.background = '#22c55e';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = item.requiresAuth && !hasLatamAccess ? '#6b7280' : '#d1d5db';
                    }}
                  >
                    <span>{item.icon} {item.label}</span>
                    {item.requiresAuth && !hasLatamAccess && <span>
                    {item.requiresAuth && hasLatamAccess && <span style={{ color: '#22c55e' }}>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* LATAM LOGOUT - MOBILE */}
          {hasLatamAccess && onLatamLogout && (
            <button
              onClick={onLatamLogout}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                color: '#ef4444',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
               Logout LATAM Portal
            </button>
          )}

          {/* LANGUAGE - MOBILE */}
          <button
            onClick={toggleLanguage}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '1rem'
            }}
          >
            {language === "en" ? " Switch to Spanish" : " Cambiar a Ingl
          </button>
        </div>
      )}
    </nav>
  );
}
