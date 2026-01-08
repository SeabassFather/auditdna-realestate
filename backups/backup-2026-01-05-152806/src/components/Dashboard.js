<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
﻿import React, { useState, useEffect } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import ContactCard from '../components/ContactCard'; // Enhanced module access request form

// --- Dashboard.js ---
// Last updated: 2025-10-14 22:44 UTC
// Dashboard now requires per-module access approval via ContactCard.
// Only approved users can view dashboard data; others will see request/pending screen.

export default function Dashboard({ dashboardData }) {
  // Track module approval status (replace with real API check in production)
  const [approved, setApproved] = useState(false);

  // On mount, check if user is approved for Dashboard
  useEffect(() => {
    async function checkApproval() {
      // Replace with real API call to your backend for production
      try {
        const res = await fetch('/api/module-approval-status?module=Dashboard');
        if (res.ok) {
          const data = await res.json();
          setApproved(!!data.approved);
        } else {
          setApproved(false);
        }
      } catch (err) {
        setApproved(false);
      }
    }
    checkApproval();
  }, []);

  // If not approved, show ContactCard to request access
  if (!approved) {
    return <ContactCard moduleName="Dashboard" language="english" />;
  }

  // --- APPROVED DASHBOARD VIEW ---
  const s = {
    card: { background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '2px solid #e3f2fd', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: '#2d3748' }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '10px' }}>
        {dashboardData.tickers.mortgage?.length > 0 && (
          <div style={{ minWidth: '300px', background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', borderRadius: '12px', padding: '16px', border: '2px solid #e3f2fd', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
<<<<<<< HEAD
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}>  Mortgage</div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}>  Mortgage</div>
=======
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}>  Mortgage</div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}>  Mortgage</div>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
            {dashboardData.tickers.mortgage.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#4a5568', fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#1a365d', fontWeight: '700', fontSize: '15px' }}>{item.value}</span>
<<<<<<< HEAD
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
=======
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                </div>
              </div>
            ))}
          </div>
        )}
        {dashboardData.tickers.commodities?.length > 0 && (
          <div style={{ minWidth: '300px', background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', borderRadius: '12px', padding: '16px', border: '2px solid #e3f2fd', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
<<<<<<< HEAD
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}> Commodities</div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}> Commodities</div>
=======
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}> Commodities</div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}> Commodities</div>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
            {dashboardData.tickers.commodities.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#4a5568', fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#1a365d', fontWeight: '700', fontSize: '15px' }}>{item.value}</span>
<<<<<<< HEAD
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
=======
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                </div>
              </div>
            ))}
          </div>
        )}
        {dashboardData.tickers.markets?.length > 0 && (
          <div style={{ minWidth: '300px', background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', borderRadius: '12px', padding: '16px', border: '2px solid #e3f2fd', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
<<<<<<< HEAD
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}> Markets</div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}>  Markets</div>
=======
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}> Markets</div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}>  Markets</div>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
            {dashboardData.tickers.markets.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#4a5568', fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#1a365d', fontWeight: '700', fontSize: '15px' }}>{item.value}</span>
<<<<<<< HEAD
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
=======
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
                  <span style={{ color: item.isPositive ? '#4caf50' : '#f44336', fontSize: '13px', fontWeight: '600' }}>{item.isPositive ? ' : ' {item.change}</span>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {dashboardData.stats?.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {dashboardData.stats.map((stat, idx) => (
            <div key={idx} style={s.card}>
              <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px', fontWeight: '500' }}>{stat.label}</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a365d' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
