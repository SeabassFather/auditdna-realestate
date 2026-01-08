import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, DollarSign, Home } from 'lucide-react';

export default function Developments() {
  const [expandedRegion, setExpandedRegion] = useState(null);

  const developments = [
    // BAJA CALIFORNIA NORTE
    { id: 1, name: "Valle Escondido Residencial", region: "Baja California Norte", location: "Ensenada", units: 145, value: 42000000, status: "Pre-Construction", type: "Luxury Villas", amenities: ["Golf Course", "Beach Club", "Wine Tasting Room"] },
    { id: 2, name: "Rosarito Beach Resort & Residences", region: "Baja California Norte", location: "Rosarito", units: 89, value: 28000000, status: "Under Construction", type: "Beachfront Condos", amenities: ["Ocean Views", "Spa", "Restaurant"] },
    { id: 3, name: "Tecate Mountain Estates", region: "Baja California Norte", location: "Tecate", units: 67, value: 18500000, status: "Available Now", type: "Mountain Homes", amenities: ["Hiking Trails", "Equestrian Center", "Wellness Center"] },
    
    // BAJA CALIFORNIA SUR
    { id: 4, name: "Cabo Pacifica Resort", region: "Baja California Sur", location: "Cabo San Lucas", units: 234, value: 125000000, status: "Phase 2", type: "Luxury Resort Condos", amenities: ["Marina", "Championship Golf", "Private Beach"] },
    { id: 5, name: "La Paz Marina Village", region: "Baja California Sur", location: "La Paz", units: 156, value: 58000000, status: "Pre-Construction", type: "Marina Residences", amenities: ["Boat Slips", "Waterfront Dining", "Infinity Pool"] },
    { id: 6, name: "Todos Santos Art District", region: "Baja California Sur", location: "Todos Santos", units: 78, value: 32000000, status: "Under Construction", type: "Gallery Lofts", amenities: ["Art Studios", "Rooftop Gardens", "Surf Access"] },
    
    // CARIBBEAN COAST
    { id: 7, name: "Tulum Jungle Villas", region: "Caribbean Coast", location: "Tulum", units: 92, value: 48000000, status: "Available Now", type: "Eco-Luxury Villas", amenities: ["Cenote Access", "Yoga Pavilion", "Organic Farm"] },
    { id: 8, name: "Playa del Carmen Urban Living", region: "Caribbean Coast", location: "Playa del Carmen", units: 187, value: 67000000, status: "Phase 3", type: "Urban Condos", amenities: ["5th Avenue Access", "Rooftop Pool", "Co-Working Space"] },
    
    // PACIFIC COAST
    { id: 9, name: "Puerto Vallarta Bayfront", region: "Pacific Coast", location: "Puerto Vallarta", units: 143, value: 82000000, status: "Pre-Construction", type: "Bayfront Towers", amenities: ["Marina Views", "Infinity Edge Pool", "Fine Dining"] },
    { id: 10, name: "Mazatlán Golden Zone Residences", region: "Pacific Coast", location: "Mazatlán", units: 112, value: 45000000, status: "Under Construction", type: "Beachfront Condos", amenities: ["Direct Beach Access", "Fitness Center", "Concierge"] }
  ];

  const regions = [...new Set(developments.map(d => d.region))];
  
  const stats = {
    projects: developments.length,
    totalUnits: developments.reduce((sum, d) => sum + d.units, 0),
    estValue: developments.reduce((sum, d) => sum + d.value, 0),
    regions: regions.length
  };

  const formatValue = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(0)}M+`;
    return `$${(val / 1000).toFixed(0)}K`;
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
      
      {/* GOLF COURSE BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />

      {/* DARK OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.9) 100%)',
        zIndex: 0
      }} />

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* HEADER */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(10px)',
          padding: '30px',
          borderRadius: '12px',
          border: '1px solid rgba(203, 166, 88, 0.2)'
        }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '300', 
            color: '#f1f5f9', 
            marginBottom: '12px', 
            letterSpacing: '2px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>
            Developments & Master-Planned Communities
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: '#cbd5e1', 
            fontWeight: '300',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
          }}>
            Explore new development projects across Mexico
          </p>
        </div>

        {/* STATS CARDS */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '20px', 
          marginBottom: '50px' 
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(203, 166, 88, 0.3)',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '48px', fontWeight: '300', color: '#cba658', marginBottom: '8px' }}>
              {stats.projects}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Projects
            </div>
          </div>
          
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(203, 166, 88, 0.3)',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '48px', fontWeight: '300', color: '#cba658', marginBottom: '8px' }}>
              {stats.totalUnits}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Total Units
            </div>
          </div>
          
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(203, 166, 88, 0.3)',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '48px', fontWeight: '300', color: '#cba658', marginBottom: '8px' }}>
              {formatValue(stats.estValue)}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Est. Value
            </div>
          </div>
          
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(203, 166, 88, 0.3)',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '48px', fontWeight: '300', color: '#cba658', marginBottom: '8px' }}>
              {stats.regions}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Regions
            </div>
          </div>
        </div>

        {/* REGIONS ACCORDION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {regions.map(region => {
            const regionProjects = developments.filter(d => d.region === region);
            const isExpanded = expandedRegion === region;
            
            return (
              <div key={region} style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '12px',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
              }}>
                <button
                  onClick={() => setExpandedRegion(isExpanded ? null : region)}
                  style={{
                    width: '100%',
                    padding: '20px 28px',
                    background: isExpanded ? 'rgba(203, 166, 88, 0.15)' : 'transparent',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: '400', color: '#f1f5f9', letterSpacing: '1px' }}>
                    {region} ({regionProjects.length} projects)
                  </span>
                  {isExpanded ? <ChevronUp size={20} color="#cba658" /> : <ChevronDown size={20} color="#cba658" />}
                </button>
                
                {isExpanded && (
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                      {regionProjects.map(dev => (
                        <div key={dev.id} style={{
                          background: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(203, 166, 88, 0.3)',
                          borderRadius: '8px',
                          padding: '24px',
                          backdropFilter: 'blur(8px)',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(203, 166, 88, 0.4)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}>
                          <div style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            background: dev.status === 'Available Now' ? 'rgba(34, 197, 94, 0.2)' : 
                                       dev.status === 'Under Construction' ? 'rgba(59, 130, 246, 0.2)' : 
                                       'rgba(168, 85, 247, 0.2)',
                            border: `1px solid ${dev.status === 'Available Now' ? '#22c55e' : 
                                                  dev.status === 'Under Construction' ? '#3b82f6' : 
                                                  '#a855f7'}`,
                            borderRadius: '20px',
                            fontSize: '9px',
                            fontWeight: '700',
                            color: dev.status === 'Available Now' ? '#22c55e' : 
                                   dev.status === 'Under Construction' ? '#3b82f6' : 
                                   '#a855f7',
                            letterSpacing: '1px',
                            marginBottom: '12px',
                            textTransform: 'uppercase'
                          }}>
                            {dev.status}
                          </div>
                          
                          <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#f1f5f9', marginBottom: '8px' }}>
                            {dev.name}
                          </h3>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                            <MapPin size={14} color="#94a3b8" />
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{dev.location}</span>
                          </div>
                          
                          <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '600' }}>
                            {dev.type}
                          </div>
                          
                          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingTop: '12px', borderTop: '1px solid rgba(203, 166, 88, 0.15)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Home size={14} color="#cba658" />
                              <span style={{ fontSize: '12px', color: '#cba658', fontWeight: '600' }}>{dev.units} units</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <DollarSign size={14} color="#cba658" />
                              <span style={{ fontSize: '12px', color: '#cba658', fontWeight: '600' }}>{formatValue(dev.value)}</span>
                            </div>
                          </div>
                          
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                              Amenities
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {dev.amenities.map((amenity, i) => (
                                <span key={i} style={{
                                  padding: '4px 10px',
                                  background: 'rgba(203, 166, 88, 0.15)',
                                  border: '1px solid rgba(203, 166, 88, 0.3)',
                                  borderRadius: '12px',
                                  fontSize: '10px',
                                  color: '#cbd5e1'
                                }}>
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => window.open(`https://wa.me/526463402686?text=Interested in ${dev.name}`, '_blank')}
                            style={{
                              width: '100%',
                              padding: '12px',
                              background: 'linear-gradient(135deg, #cba658, #b8944d)',
                              border: 'none',
                              borderRadius: '30px',
                              color: '#0a0a0a',
                              fontSize: '11px',
                              fontWeight: '800',
                              letterSpacing: '1.5px',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(203, 166, 88, 0.4)',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 6px 16px rgba(203, 166, 88, 0.6)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(203, 166, 88, 0.4)';
                            }}
                          >
                            REQUEST INFO
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}