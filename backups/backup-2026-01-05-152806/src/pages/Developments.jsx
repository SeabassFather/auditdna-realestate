import React, { useState } from 'react';

export default function Developments() {
  const [regionFilter, setRegionFilter] = useState('All');

  const projects = [
    { id: 1, name: 'Valle Escondido', region: 'Baja California Norte', location: 'Valle de Guadalupe', units: 120, priceFrom: 350000, priceTo: 850000, status: 'Pre-Construction', delivery: 'Q4 2026', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', amenities: ['Wine Tasting Room', 'Vineyard Views', 'Spa & Wellness', 'Restaurant'] },
    { id: 2, name: 'Cabo Marina Residences', region: 'Baja California Sur', location: 'Cabo San Lucas', units: 85, priceFrom: 650000, priceTo: 2500000, status: 'Under Construction', delivery: 'Q2 2027', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', amenities: ['Private Marina', 'Ocean Views', 'Beach Club', 'Concierge'] },
    { id: 3, name: 'Tulum Jungle Estates', region: 'Caribbean Coast', location: 'Tulum', units: 60, priceFrom: 450000, priceTo: 1200000, status: 'Selling Now', delivery: 'Q1 2026', image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', amenities: ['Cenote Access', 'Jungle Views', 'Yoga Studio', 'Eco-Design'] },
    { id: 4, name: 'Puerto Vallarta Highlands', region: 'Pacific Coast', location: 'Puerto Vallarta', units: 95, priceFrom: 280000, priceTo: 750000, status: 'Phase 2', delivery: 'Q3 2026', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', amenities: ['Golf Course', 'Mountain Views', 'Club House', 'Pools'] },
    { id: 5, name: 'San Miguel Colonial Village', region: 'Central Mexico', location: 'San Miguel de Allende', units: 45, priceFrom: 520000, priceTo: 1800000, status: 'Pre-Construction', delivery: 'Q1 2027', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', amenities: ['Colonial Architecture', 'Art District', 'Rooftop Terraces', 'Gardens'] },
    { id: 6, name: 'La Paz Waterfront', region: 'Baja California Sur', location: 'La Paz', units: 72, priceFrom: 320000, priceTo: 950000, status: 'Under Construction', delivery: 'Q4 2026', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', amenities: ['Beach Access', 'Marina', 'Fitness Center', 'Restaurant'] }
  ];

  const regions = ['All', 'Baja California Norte', 'Baja California Sur', 'Pacific Coast', 'Caribbean Coast', 'Central Mexico'];
  const filteredProjects = regionFilter === 'All' ? projects : projects.filter(p => p.region === regionFilter);
  const totalUnits = filteredProjects.reduce((sum, p) => sum + p.units, 0);
  const totalValue = filteredProjects.reduce((sum, p) => sum + (p.priceFrom + p.priceTo) / 2 * p.units, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '300', color: '#f1f5f9', marginBottom: '16px', letterSpacing: '1px' }}>Developments & Master-Planned Communities</h1>
        <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '48px' }}>Explore new development projects across Mexico</p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {regions.map(r => (
            <button key={r} onClick={() => setRegionFilter(r)} style={{ padding: '12px 24px', background: regionFilter === r ? '#cba658' : 'rgba(203, 166, 88, 0.1)', color: regionFilter === r ? '#0f172a' : '#cba658', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', letterSpacing: '0.5px', transition: 'all 0.3s' }}>{r}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
          {[
            { label: 'Projects', value: filteredProjects.length },
            { label: 'Total Units', value: totalUnits },
            { label: 'Est. Value', value: `$${(totalValue / 1000000).toFixed(0)}M+` },
            { label: 'Regions', value: new Set(filteredProjects.map(p => p.region)).size }
          ].map((stat, idx) => (
            <div key={idx} style={{ background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#cba658', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' }}>
          {filteredProjects.map(project => (
            <div key={project.id} style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(203, 166, 88, 0.2)', transition: 'all 0.3s', cursor: 'pointer' }}>
              <div style={{ position: 'relative', height: '280px' }}>
                <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '8px 16px', background: project.status === 'Selling Now' ? 'rgba(34, 197, 94, 0.9)' : project.status === 'Under Construction' ? 'rgba(59, 130, 246, 0.9)' : 'rgba(251, 191, 36, 0.9)', color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{project.status}</div>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>{project.name}</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '16px' }}>{project.location}, {project.region}</p>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>${(project.priceFrom / 1000).toFixed(0)}K - ${(project.priceTo / 1000).toFixed(0)}K</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(203, 166, 88, 0.2)' }}>
                  <div><span style={{ fontSize: '12px', color: '#94a3b8' }}>Units:</span> <span style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>{project.units}</span></div>
                  <div><span style={{ fontSize: '12px', color: '#94a3b8' }}>Delivery:</span> <span style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>{project.delivery}</span></div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>AMENITIES:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.amenities.map((amenity, idx) => (
                      <span key={idx} style={{ padding: '6px 12px', background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '6px', fontSize: '11px', color: '#cba658' }}>{amenity}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <button style={{ padding: '12px', background: 'transparent', color: '#cba658', border: '2px solid #cba658', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>View Floor Plans</button>
                  <button style={{ padding: '12px', background: '#cba658', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Contact Agent</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}