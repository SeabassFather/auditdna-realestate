import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FinancialServices() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDashboardData(getMockData());
      setLoading(false);
    }, 500);
  }, []);

  const getMockData = () => ({
    summary: { totalRevenue: 1250000, totalCosts: 850000, grossProfit: 400000, profitMargin: 32 },
    recentPurchases: [
      { id: 1, supplier: 'Aguacates SA', product: 'Avocados', quantity: 10000, cost: 18500, date: '2025-10-15' },
      { id: 2, supplier: 'Tomates del Valle', product: 'Tomatoes', quantity: 8500, cost: 12750, date: '2025-10-14' }
    ],
    recentSales: [
      { id: 1, buyer: 'Walmart', product: 'Avocados', quantity: 8000, revenue: 24000, date: '2025-10-16' },
      { id: 2, buyer: 'Costco', product: 'Tomatoes', quantity: 7000, revenue: 14000, date: '2025-10-15' }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 95000, costs: 65000 },
      { month: 'Feb', revenue: 105000, costs: 70000 },
      { month: 'Mar', revenue: 120000, costs: 80000 },
      { month: 'Apr', revenue: 110000, costs: 75000 },
      { month: 'May', revenue: 135000, costs: 90000 },
      { month: 'Jun', revenue: 125000, costs: 85000 }
    ]
  });

  if (loading) {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}><div style={{fontSize: '24px', fontWeight: 'bold'}}>Loading...</div></div>;
  }

  const data = dashboardData || getMockData();

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #fef3c7 100%)'}}>
      <div style={{background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)', padding: '30px 40px'}}>
        <div style={{maxWidth: '1800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 style={{fontSize: '36px', fontWeight: 'bold', color: 'white', margin: 0}}>💰 Financial Operations</h1>
          <button onClick={() => navigate('/')} style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'}}>← Back</button>
        </div>
      </div>

      <div style={{maxWidth: '1800px', margin: '0 auto', padding: '40px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px'}}>
          <div style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '12px', padding: '30px', color: 'white'}}>
            <p style={{fontSize: '14px', opacity: 0.9}}>Total Revenue</p>
            <p style={{fontSize: '36px', fontWeight: 'bold'}}>${data.summary.totalRevenue.toLocaleString()}</p>
            <p style={{fontSize: '13px', opacity: 0.8, marginTop: '8px'}}>+12% vs last month</p>
          </div>

          <div style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', borderRadius: '12px', padding: '30px', color: 'white'}}>
            <p style={{fontSize: '14px', opacity: 0.9}}>Total Costs</p>
            <p style={{fontSize: '36px', fontWeight: 'bold'}}>${data.summary.totalCosts.toLocaleString()}</p>
            <p style={{fontSize: '13px', opacity: 0.8, marginTop: '8px'}}>+8% vs last month</p>
          </div>

          <div style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '12px', padding: '30px', color: 'white'}}>
            <p style={{fontSize: '14px', opacity: 0.9}}>Gross Profit</p>
            <p style={{fontSize: '36px', fontWeight: 'bold'}}>${data.summary.grossProfit.toLocaleString()}</p>
            <p style={{fontSize: '13px', opacity: 0.8, marginTop: '8px'}}>+18% vs last month</p>
          </div>

          <div style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', borderRadius: '12px', padding: '30px', color: 'white'}}>
            <p style={{fontSize: '14px', opacity: 0.9}}>Profit Margin</p>
            <p style={{fontSize: '36px', fontWeight: 'bold'}}>{data.summary.profitMargin}%</p>
            <p style={{fontSize: '13px', opacity: 0.8, marginTop: '8px'}}>+2% vs last month</p>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '25px'}}>
          <div style={{background: 'white', borderRadius: '12px', padding: '30px'}}>
            <h3 style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '20px'}}>🛒 Recent Purchases</h3>
            {data.recentPurchases.map((p) => (
              <div key={p.id} style={{borderLeft: '4px solid #ef4444', background: '#fef2f2', padding: '20px', borderRadius: '8px', marginBottom: '15px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{fontWeight: 'bold'}}>{p.supplier}</span>
                  <span>${p.cost.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{background: 'white', borderRadius: '12px', padding: '30px'}}>
            <h3 style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '20px'}}>💰 Recent Sales</h3>
            {data.recentSales.map((s) => (
              <div key={s.id} style={{borderLeft: '4px solid #10b981', background: '#f0fdf4', padding: '20px', borderRadius: '8px', marginBottom: '15px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{fontWeight: 'bold'}}>{s.buyer}</span>
                  <span>${s.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

