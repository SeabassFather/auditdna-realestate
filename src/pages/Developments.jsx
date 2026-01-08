import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, DollarSign, Home } from 'lucide-react';

export default function Developments() {
  const [expandedRegion, setExpandedRegion] = useState(null);

  const developments = [
    // BAJA CALIFORNIA NORTE - COASTAL
    { id: 1, name: "Tijuana Urban Towers", region: "Tijuana & Border Region", location: "Tijuana", units: 312, value: 85000000, status: "Phase 2", type: "Urban High-Rise Condos", amenities: ["City Views", "Rooftop Pool", "Business Center", "24/7 Security"] },
    { id: 2, name: "Playas de Tijuana Beachfront", region: "Tijuana & Border Region", location: "Playas de Tijuana", units: 124, value: 52000000, status: "Under Construction", type: "Beachfront Condos", amenities: ["Ocean Views", "Beach Access", "Fitness Center", "Concierge"] },
    { id: 3, name: "Otay Ranch Estates", region: "Tijuana & Border Region", location: "Otay", units: 89, value: 34000000, status: "Available Now", type: "Gated Community Homes", amenities: ["Private Security", "Parks", "Near Border Crossing"] },
    
    // ROSARITO
    { id: 4, name: "Rosarito Beach Resort & Residences", region: "Rosarito & Primo Tapia", location: "Rosarito", units: 178, value: 68000000, status: "Under Construction", type: "Beachfront Resort Condos", amenities: ["Ocean Views", "Spa", "Restaurant", "Beach Club"] },
    { id: 5, name: "Primo Tapia Oceanfront Villas", region: "Rosarito & Primo Tapia", location: "Primo Tapia", units: 45, value: 28000000, status: "Pre-Construction", type: "Luxury Oceanfront Villas", amenities: ["Private Beach", "Infinity Pool", "Smart Home Tech"] },
    { id: 6, name: "Puerto Nuevo Lobster Village Residences", region: "Rosarito & Primo Tapia", location: "Puerto Nuevo", units: 67, value: 24000000, status: "Available Now", type: "Coastal Townhomes", amenities: ["Walking Distance to Restaurants", "Ocean Views", "Gated Entry"] },
    
    // TECATE & VALLE DE GUADALUPE
    { id: 7, name: "Tecate Mountain Estates", region: "Tecate & Wine Country", location: "Tecate", units: 92, value: 32000000, status: "Available Now", type: "Mountain View Homes", amenities: ["Hiking Trails", "Equestrian Center", "Wellness Center", "Craft Brewery Tours"] },
    { id: 8, name: "Valle de Guadalupe Vineyard Estates", region: "Tecate & Wine Country", location: "Valle de Guadalupe", units: 56, value: 48000000, status: "Phase 2", type: "Vineyard Estate Lots", amenities: ["Private Vineyards", "Wine Cellar", "Farm-to-Table Dining", "Winery Access"] },
    { id: 9, name: "Rancho La Puerta Wellness Community", region: "Tecate & Wine Country", location: "Tecate", units: 34, value: 22000000, status: "Pre-Construction", type: "Wellness Retreat Homes", amenities: ["Spa Access", "Organic Gardens", "Yoga Studios", "Mountain Views"] },
    { id: 10, name: "El Porvenir Wine Country Villas", region: "Tecate & Wine Country", location: "El Porvenir", units: 28, value: 18000000, status: "Under Construction", type: "Boutique Wine Villas", amenities: ["Vineyard Views", "Tasting Room", "Chefs Kitchen"] },
    
    // ENSENADA
    { id: 11, name: "Valle Escondido Residencial", region: "Ensenada", location: "Ensenada", units: 145, value: 52000000, status: "Pre-Construction", type: "Luxury Villas", amenities: ["Golf Course", "Beach Club", "Wine Tasting Room"] },
    { id: 12, name: "Punta Banda Oceanfront", region: "Ensenada", location: "Punta Banda", units: 78, value: 42000000, status: "Under Construction", type: "Cliffside Condos", amenities: ["La Bufadora Access", "Whale Watching", "Kayak Launch"] },
    { id: 13, name: "Ensenada Marina Residences", region: "Ensenada", location: "Ensenada Centro", units: 112, value: 38000000, status: "Available Now", type: "Marina-View Condos", amenities: ["Boat Slips", "Fishing Charters", "Waterfront Dining"] },
    { id: 14, name: "El Sauzal Artist Colony", region: "Ensenada", location: "El Sauzal", units: 45, value: 16000000, status: "Phase 2", type: "Live/Work Lofts", amenities: ["Art Studios", "Gallery Space", "Ocean Views"] },
    
    // SAN QUINTIN & SOUTH
    { id: 15, name: "San Quintin Bay Retreat", region: "San Quintin & Vicente Guerrero", location: "San Quintin", units: 56, value: 18000000, status: "Pre-Construction", type: "Eco-Lodge Cabins", amenities: ["Bird Watching", "Fishing", "Organic Farm", "Kayaking"] },
    { id: 16, name: "Vicente Guerrero Agricultural Estates", region: "San Quintin & Vicente Guerrero", location: "Vicente Guerrero", units: 34, value: 12000000, status: "Available Now", type: "Farm Estate Lots", amenities: ["Agricultural Land", "Water Rights", "Equipment Storage"] },
    
    // SAN FELIPE (GULF SIDE)
    { id: 17, name: "San Felipe Beachfront Villas", region: "San Felipe & Gulf Coast", location: "San Felipe", units: 89, value: 32000000, status: "Under Construction", type: "Gulf-Front Villas", amenities: ["Sea of Cortez Views", "Fishing Pier", "ATV Trails", "RV Storage"] },
    { id: 18, name: "El Dorado Ranch Resort", region: "San Felipe & Gulf Coast", location: "San Felipe", units: 156, value: 45000000, status: "Phase 3", type: "Resort Community", amenities: ["Golf Course", "Private Airstrip", "Beach Club", "Tennis Courts"] },
    { id: 19, name: "Puertecitos Oceanfront Retreat", region: "San Felipe & Gulf Coast", location: "Puertecitos", units: 28, value: 9500000, status: "Available Now", type: "Remote Beach Homes", amenities: ["Hot Springs", "Pristine Beaches", "Off-Grid Solar"] },
    
    // BAHIA DE LOS ANGELES
    { id: 20, name: "Bahia de los Angeles Eco-Resort", region: "Bahia de los Angeles", location: "Bahia de los Angeles", units: 42, value: 22000000, status: "Pre-Construction", type: "Eco-Luxury Casitas", amenities: ["Whale Shark Tours", "Island Excursions", "Kayaking", "Stargazing"] },
    { id: 21, name: "Isla Angel de la Guarda View Estates", region: "Bahia de los Angeles", location: "Bahia de los Angeles", units: 18, value: 8500000, status: "Available Now", type: "Remote Desert Homes", amenities: ["Unobstructed Views", "Private Beach Access", "Solar Power"] },
    
    // GUERRERO NEGRO & VIZCAINO
    { id: 22, name: "Guerrero Negro Whale Sanctuary Lodges", region: "Guerrero Negro & Vizcaino", location: "Guerrero Negro", units: 36, value: 14000000, status: "Under Construction", type: "Eco-Tourism Lodges", amenities: ["Gray Whale Tours", "Bird Sanctuary", "Salt Flats Tours"] },
    { id: 23, name: "San Ignacio Oasis Retreat", region: "Guerrero Negro & Vizcaino", location: "San Ignacio", units: 24, value: 8000000, status: "Pre-Construction", type: "Desert Oasis Cabins", amenities: ["Date Palm Groves", "Mission Tours", "Cave Paintings Access"] },
    
    // SANTA ROSALIA & MULEGE
    { id: 24, name: "Santa Rosalia Historic District Lofts", region: "Santa Rosalia & Mulege", location: "Santa Rosalia", units: 32, value: 11000000, status: "Available Now", type: "Historic Renovation Lofts", amenities: ["French Architecture", "Sea Views", "Walking District"] },
    { id: 25, name: "Mulege River Oasis Villas", region: "Santa Rosalia & Mulege", location: "Mulege", units: 48, value: 18000000, status: "Under Construction", type: "Riverside Villas", amenities: ["Date Palm Gardens", "Kayak Access", "Mission Views"] },
    { id: 26, name: "Bahia Concepcion Beachfront", region: "Santa Rosalia & Mulege", location: "Bahia Concepcion", units: 67, value: 28000000, status: "Phase 2", type: "Crystal Water Beach Homes", amenities: ["Turquoise Waters", "Snorkeling", "Camping Sites", "Boat Launch"] },
    
    // LORETO
    { id: 27, name: "Loreto Bay Resort Community", region: "Loreto", location: "Loreto", units: 234, value: 95000000, status: "Phase 3", type: "Master-Planned Resort", amenities: ["TPC Golf Course", "Marina", "Islands National Park", "Spa Resort"] },
    { id: 28, name: "Nopolo Beach Residences", region: "Loreto", location: "Nopolo", units: 89, value: 42000000, status: "Under Construction", type: "Beachfront Condos", amenities: ["Tennis Center", "Beach Club", "Fishing Charters"] },
    { id: 29, name: "Puerto Escondido Marina Village", region: "Loreto", location: "Puerto Escondido", units: 56, value: 32000000, status: "Pre-Construction", type: "Marina Residences", amenities: ["Deep Water Marina", "Boat Storage", "Yacht Club"] },
    { id: 30, name: "San Javier Mission Estates", region: "Loreto", location: "San Javier", units: 22, value: 12000000, status: "Available Now", type: "Mountain Ranch Estates", amenities: ["Historic Mission", "Olive Groves", "Horseback Riding"] },
    
    // LA PAZ
    { id: 31, name: "La Paz Marina Village", region: "La Paz", location: "La Paz", units: 178, value: 72000000, status: "Pre-Construction", type: "Marina Residences", amenities: ["Boat Slips", "Malecon Access", "Waterfront Dining", "Infinity Pool"] },
    { id: 32, name: "Balandra Bay Eco-Villas", region: "La Paz", location: "Balandra", units: 34, value: 28000000, status: "Under Construction", type: "Eco-Luxury Villas", amenities: ["Famous Beach Access", "Kayaking", "Snorkeling", "Nature Preserve"] },
    { id: 33, name: "Espiritu Santo Island View Estates", region: "La Paz", location: "La Paz", units: 56, value: 38000000, status: "Phase 2", type: "Island View Condos", amenities: ["UNESCO Site Views", "Whale Watching", "Diving Tours"] },
    { id: 34, name: "El Mogote Peninsula Resort", region: "La Paz", location: "El Mogote", units: 145, value: 85000000, status: "Pre-Construction", type: "Peninsula Resort Condos", amenities: ["Private Beach", "Mangrove Tours", "Water Sports"] },
    { id: 35, name: "Pichilingue Harbor Residences", region: "La Paz", location: "Pichilingue", units: 67, value: 32000000, status: "Available Now", type: "Harbor View Homes", amenities: ["Ferry Terminal Access", "Fishing Fleet", "Seafood Markets"] },
    
    // TODOS SANTOS
    { id: 36, name: "Todos Santos Art District", region: "Todos Santos & El Pescadero", location: "Todos Santos", units: 78, value: 42000000, status: "Under Construction", type: "Gallery Lofts", amenities: ["Art Studios", "Rooftop Gardens", "Surf Access", "Pueblo Magico"] },
    { id: 37, name: "Cerritos Beach Surf Resort", region: "Todos Santos & El Pescadero", location: "Cerritos", units: 56, value: 35000000, status: "Phase 2", type: "Surf Resort Condos", amenities: ["Surf Breaks", "Yoga Retreat", "Organic Restaurant"] },
    { id: 38, name: "El Pescadero Farm Estates", region: "Todos Santos & El Pescadero", location: "El Pescadero", units: 34, value: 18000000, status: "Available Now", type: "Organic Farm Lots", amenities: ["Agricultural Land", "Farm-to-Table", "Mountain Views"] },
    { id: 39, name: "Las Palmas Surf Community", region: "Todos Santos & El Pescadero", location: "Las Palmas", units: 45, value: 24000000, status: "Pre-Construction", type: "Surf Village Homes", amenities: ["Beach Access", "Surf School", "Community Garden"] },
    
    // LOS BARRILES & EAST CAPE
    { id: 40, name: "Los Barriles Kite Beach Resort", region: "East Cape & Los Barriles", location: "Los Barriles", units: 89, value: 48000000, status: "Under Construction", type: "Kitesurf Resort Condos", amenities: ["World-Class Kitesurfing", "Equipment Storage", "Beach Club"] },
    { id: 41, name: "Cabo Pulmo Eco-Preserve Villas", region: "East Cape & Los Barriles", location: "Cabo Pulmo", units: 24, value: 22000000, status: "Pre-Construction", type: "Marine Sanctuary Villas", amenities: ["UNESCO Reef Access", "Diving Center", "Eco-Tours"] },
    { id: 42, name: "Buena Vista Sportfishing Resort", region: "East Cape & Los Barriles", location: "Buena Vista", units: 56, value: 32000000, status: "Available Now", type: "Fishing Resort Homes", amenities: ["Fishing Fleet", "Tournament Hosting", "Beach Palapas"] },
    { id: 43, name: "La Ribera Ranch Estates", region: "East Cape & Los Barriles", location: "La Ribera", units: 38, value: 16000000, status: "Phase 2", type: "Desert Ranch Lots", amenities: ["Horse Stables", "ATV Trails", "Mountain Views"] },
    
    // SAN JOSE DEL CABO
    { id: 44, name: "San Jose del Cabo Historic Center", region: "San Jose del Cabo", location: "San Jose del Cabo", units: 67, value: 52000000, status: "Under Construction", type: "Colonial Luxury Condos", amenities: ["Art Walk District", "Gallery Row", "Fine Dining", "Mission Church"] },
    { id: 45, name: "Puerto Los Cabos Marina", region: "San Jose del Cabo", location: "Puerto Los Cabos", units: 145, value: 125000000, status: "Phase 3", type: "Ultra-Luxury Marina Homes", amenities: ["Mega-Yacht Slips", "Greg Norman Golf", "Jack Nicklaus Golf", "Beach Club"] },
    { id: 46, name: "Palmilla Estates", region: "San Jose del Cabo", location: "Palmilla", units: 78, value: 95000000, status: "Available Now", type: "Ultra-Luxury Villas", amenities: ["One and Only Resort", "Jack Nicklaus Golf", "Private Beach"] },
    { id: 47, name: "Querencia Golf Community", region: "San Jose del Cabo", location: "Querencia", units: 112, value: 145000000, status: "Phase 2", type: "Private Golf Estates", amenities: ["Tom Fazio Golf", "Equestrian Center", "Organic Farm", "Spa"] },
    
    // CABO SAN LUCAS
    { id: 48, name: "Cabo Pacifica Resort", region: "Cabo San Lucas", location: "Cabo San Lucas", units: 234, value: 185000000, status: "Phase 2", type: "Luxury Resort Condos", amenities: ["Marina", "Championship Golf", "Private Beach", "World-Class Spa"] },
    { id: 49, name: "Pedregal Cliffside Mansions", region: "Cabo San Lucas", location: "Pedregal", units: 45, value: 125000000, status: "Available Now", type: "Ultra-Luxury Mansions", amenities: ["Private Gated", "El Arco Views", "Infinity Pools", "Staff Quarters"] },
    { id: 50, name: "Diamante Ocean Course Villas", region: "Cabo San Lucas", location: "Diamante", units: 89, value: 95000000, status: "Under Construction", type: "Golf Course Villas", amenities: ["Tiger Woods Course", "Davis Love III Course", "Beach Club"] },
    { id: 51, name: "Quivira Golf Villas", region: "Cabo San Lucas", location: "Quivira", units: 67, value: 78000000, status: "Phase 3", type: "Oceanfront Golf Villas", amenities: ["Jack Nicklaus Sunset", "Pueblo Bonito Resort", "Spa Access"] },
    { id: 52, name: "Medano Beach Urban Residences", region: "Cabo San Lucas", location: "Medano Beach", units: 156, value: 68000000, status: "Pre-Construction", type: "Urban Beach Condos", amenities: ["Walk to Marina", "Beach Clubs", "Nightlife Access"] },
    
    // INLAND - MEXICALI & VALLEYS
    { id: 53, name: "Mexicali Business District Towers", region: "Inland Mexicali & Valleys", location: "Mexicali", units: 178, value: 45000000, status: "Under Construction", type: "Urban Business Condos", amenities: ["Business Center", "Rooftop Pool", "Near Border"] },
    { id: 54, name: "Valle de Mexicali Agri-Estates", region: "Inland Mexicali & Valleys", location: "Valle de Mexicali", units: 45, value: 18000000, status: "Available Now", type: "Agricultural Estates", amenities: ["Farmland", "Water Rights", "Equipment Barns"] },
    { id: 55, name: "San Luis Rio Colorado Border Gateway", region: "Inland Mexicali & Valleys", location: "San Luis Rio Colorado", units: 89, value: 28000000, status: "Pre-Construction", type: "Border Town Condos", amenities: ["Near Crossing", "Shopping District", "Medical Tourism"] },
    
    // INLAND - SIERRA & DESERT
    { id: 56, name: "Sierra San Pedro Martir Eco-Lodge", region: "Inland Sierra & Desert", location: "Sierra San Pedro Martir", units: 24, value: 12000000, status: "Pre-Construction", type: "Mountain Eco-Lodges", amenities: ["Observatory Access", "Hiking", "Wildlife", "Dark Sky Reserve"] },
    { id: 57, name: "Catavina Boulder Retreat", region: "Inland Sierra & Desert", location: "Catavina", units: 18, value: 8000000, status: "Available Now", type: "Desert Retreat Cabins", amenities: ["Giant Boulders", "Cave Paintings", "Stargazing", "Off-Road Trails"] },
    { id: 58, name: "Valle de los Cirios Preserve Estates", region: "Inland Sierra & Desert", location: "Valle de los Cirios", units: 12, value: 6000000, status: "Phase 2", type: "Desert Conservation Lots", amenities: ["Cirio Cactus Forest", "Eco-Tourism", "Remote Wilderness"] },
    
    // CARIBBEAN COAST (BONUS)
    { id: 59, name: "Tulum Jungle Villas", region: "Caribbean Coast", location: "Tulum", units: 92, value: 68000000, status: "Available Now", type: "Eco-Luxury Villas", amenities: ["Cenote Access", "Yoga Pavilion", "Organic Farm", "Beach Club"] },
    { id: 60, name: "Playa del Carmen Urban Living", region: "Caribbean Coast", location: "Playa del Carmen", units: 187, value: 85000000, status: "Phase 3", type: "Urban Condos", amenities: ["5th Avenue Access", "Rooftop Pool", "Co-Working Space"] },
    { id: 61, name: "Puerto Morelos Reef Residences", region: "Caribbean Coast", location: "Puerto Morelos", units: 78, value: 42000000, status: "Under Construction", type: "Reef-Front Condos", amenities: ["Marine Park Access", "Diving", "Fishing Village Charm"] },
    
    // PACIFIC COAST (BONUS)
    { id: 62, name: "Puerto Vallarta Bayfront", region: "Pacific Coast", location: "Puerto Vallarta", units: 143, value: 95000000, status: "Pre-Construction", type: "Bayfront Towers", amenities: ["Marina Views", "Infinity Edge Pool", "Fine Dining", "Malecon Access"] },
    { id: 63, name: "Mazatlan Golden Zone Residences", region: "Pacific Coast", location: "Mazatlan", units: 112, value: 52000000, status: "Under Construction", type: "Beachfront Condos", amenities: ["Direct Beach Access", "Fitness Center", "Concierge", "Historic Center"] },
    { id: 64, name: "Sayulita Surf Village", region: "Pacific Coast", location: "Sayulita", units: 56, value: 38000000, status: "Available Now", type: "Surf Town Condos", amenities: ["Surf Breaks", "Pueblo Magico", "Yoga Studios", "Art Galleries"] }
  ];

  const regions = [...new Set(developments.map(d => d.region))];
  
  const getRegionStats = (region) => {
    const regionDevs = developments.filter(d => d.region === region);
    const totalValue = regionDevs.reduce((sum, d) => sum + d.value, 0);
    return {
      count: regionDevs.length,
      value: totalValue
    };
  };

  const formatValue = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(0)}M+`;
    return `$${(val / 1000).toFixed(0)}K`;
  };

  // SILVER/GOLD ONLY STATUS STYLES
  const getStatusStyle = (status) => {
    if (status === 'Available Now') {
      return { bg: 'rgba(203, 166, 88, 0.2)', border: '#cba658', color: '#cba658' };
    } else if (status === 'Under Construction') {
      return { bg: 'rgba(148, 163, 184, 0.15)', border: '#94a3b8', color: '#94a3b8' };
    } else if (status.includes('Phase')) {
      return { bg: 'rgba(203, 166, 88, 0.15)', border: '#b8944d', color: '#b8944d' };
    } else {
      return { bg: 'rgba(228, 228, 231, 0.1)', border: '#e4e4e7', color: '#e4e4e7' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* OCEANFRONT DEVELOPMENT BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80")',
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
        background: 'linear-gradient(180deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.92) 100%)',
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
          marginBottom: '50px'
        }}>
          <p style={{
            fontSize: '10px',
            color: '#cba658',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Baja California Peninsula
          </p>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '200', 
            color: '#e4e4e7', 
            marginBottom: '12px', 
            letterSpacing: '6px'
          }}>
            DEVELOPMENTS
          </h1>
          <p style={{ 
            fontSize: '13px', 
            color: '#94a3b8', 
            fontWeight: '300',
            letterSpacing: '2px'
          }}>
            64 Projects | 17 Regions | $2.8B+ Portfolio
          </p>
        </div>

        {/* REGIONS ACCORDION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {regions.map(region => {
            const regionProjects = developments.filter(d => d.region === region);
            const stats = getRegionStats(region);
            const isExpanded = expandedRegion === region;
            
            return (
              <div key={region} style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
              }}>
                <button
                  onClick={() => setExpandedRegion(isExpanded ? null : region)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    background: isExpanded ? 'rgba(203, 166, 88, 0.08)' : 'transparent',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '15px', fontWeight: '400', color: '#e4e4e7', letterSpacing: '1px' }}>
                      {region}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '16px' }}>
                      {stats.count} projects | {formatValue(stats.value)} total value
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp size={18} color="#cba658" /> : <ChevronDown size={18} color="#94a3b8" />}
                </button>
                
                {isExpanded && (
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                      {regionProjects.map(dev => {
                        const statusStyle = getStatusStyle(dev.status);
                        return (
                          <div key={dev.id} style={{
                            background: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(148, 163, 184, 0.15)',
                            padding: '20px',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.4)';
                            e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.4)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.15)';
                          }}>
                            {/* STATUS BADGE - SQUARE */}
                            <div style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              background: statusStyle.bg,
                              border: '1px solid ' + statusStyle.border,
                              fontSize: '9px',
                              fontWeight: '600',
                              color: statusStyle.color,
                              letterSpacing: '1px',
                              marginBottom: '12px',
                              textTransform: 'uppercase'
                            }}>
                              {dev.status}
                            </div>
                            
                            <h3 style={{ fontSize: '17px', fontWeight: '500', color: '#e4e4e7', marginBottom: '6px' }}>
                              {dev.name}
                            </h3>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                              <MapPin size={13} color="#94a3b8" />
                              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{dev.location}</span>
                            </div>
                            
                            <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '12px', fontWeight: '500' }}>
                              {dev.type}
                            </div>
                            
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '14px', paddingTop: '10px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Home size={13} color="#cba658" />
                                <span style={{ fontSize: '12px', color: '#cba658', fontWeight: '600' }}>{dev.units} units</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <DollarSign size={13} color="#cba658" />
                                <span style={{ fontSize: '12px', color: '#cba658', fontWeight: '600' }}>{formatValue(dev.value)}</span>
                              </div>
                            </div>
                            
                            <div style={{ marginBottom: '14px' }}>
                              <div style={{ fontSize: '9px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Amenities
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {dev.amenities.map((amenity, i) => (
                                  <span key={i} style={{
                                    padding: '3px 8px',
                                    background: 'rgba(148, 163, 184, 0.1)',
                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                    fontSize: '9px',
                                    color: '#94a3b8'
                                  }}>
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => window.open(`https://wa.me/526463402686?text=Interested in ${dev.name} - ${dev.location}`, '_blank')}
                              style={{
                                width: '100%',
                                padding: '12px',
                                background: '#cba658',
                                border: 'none',
                                color: '#0f172a',
                                fontSize: '10px',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                textTransform: 'uppercase'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#d4b366';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = '#cba658';
                              }}
                            >
                              Request Info
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DEVELOPER CTA */}
        <div style={{
          marginTop: '50px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '300', color: '#e4e4e7', marginBottom: '12px', letterSpacing: '2px' }}>
            Are You a Developer?
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            List your development project. Commission only on closed sales.
          </p>
          <button
            onClick={() => window.open('https://wa.me/526463402686?text=I am a developer interested in listing my project on EnjoyBaja.com', '_blank')}
            style={{
              padding: '14px 40px',
              background: 'transparent',
              border: '1px solid #cba658',
              color: '#cba658',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#cba658';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#cba658';
            }}
          >
            List Your Project
          </button>
        </div>

        {/* FOOTER */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          padding: '20px'
        }}>
          <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '2px' }}>
            SAUL GARCIA | NMLS #337526 | +52 646 340 2686
          </p>
        </div>
      </div>
    </div>
  );
}