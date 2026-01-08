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
    { id: 10, name: "El Porvenir Wine Country Villas", region: "Tecate & Wine Country", location: "El Porvenir", units: 28, value: 18000000, status: "Under Construction", type: "Boutique Wine Villas", amenities: ["Vineyard Views", "Tasting Room", "Chef's Kitchen"] },
    
    // ENSENADA
    { id: 11, name: "Valle Escondido Residencial", region: "Ensenada", location: "Ensenada", units: 145, value: 52000000, status: "Pre-Construction", type: "Luxury Villas", amenities: ["Golf Course", "Beach Club", "Wine Tasting Room"] },
    { id: 12, name: "Punta Banda Oceanfront", region: "Ensenada", location: "Punta Banda", units: 78, value: 42000000, status: "Under Construction", type: "Cliffside Condos", amenities: ["La Bufadora Access", "Whale Watching", "Kayak Launch"] },
    { id: 13, name: "Ensenada Marina Residences", region: "Ensenada", location: "Ensenada Centro", units: 112, value: 38000000, status: "Available Now", type: "Marina-View Condos", amenities: ["Boat Slips", "Fishing Charters", "Waterfront Dining"] },
    { id: 14, name: "El Sauzal Artist Colony", region: "Ensenada", location: "El Sauzal", units: 45, value: 16000000, status: "Phase 2", type: "Live/Work Lofts", amenities: ["Art Studios", "Gallery Space", "Ocean Views"] },
    
    // SAN QUINTIN & SOUTH
    { id: 15, name: "San Quintín Bay Retreat", region: "San Quintín & Vicente Guerrero", location: "San Quintín", units: 56, value: 18000000, status: "Pre-Construction", type: "Eco-Lodge Cabins", amenities: ["Bird Watching", "Fishing", "Organic Farm", "Kayaking"] },
    { id: 16, name: "Vicente Guerrero Agricultural Estates", region: "San Quintín & Vicente Guerrero", location: "Vicente Guerrero", units: 34, value: 12000000, status: "Available Now", type: "Farm Estate Lots", amenities: ["Agricultural Land", "Water Rights", "Equipment Storage"] },
    
    // SAN FELIPE (GULF SIDE)
    { id: 17, name: "San Felipe Beachfront Villas", region: "San Felipe & Gulf Coast", location: "San Felipe", units: 89, value: 32000000, status: "Under Construction", type: "Gulf-Front Villas", amenities: ["Sea of Cortez Views", "Fishing Pier", "ATV Trails", "RV Storage"] },
    { id: 18, name: "El Dorado Ranch Resort", region: "San Felipe & Gulf Coast", location: "San Felipe", units: 156, value: 45000000, status: "Phase 3", type: "Resort Community", amenities: ["Golf Course", "Private Airstrip", "Beach Club", "Tennis Courts"] },
    { id: 19, name: "Puertecitos Oceanfront Retreat", region: "San Felipe & Gulf Coast", location: "Puertecitos", units: 28, value: 9500000, status: "Available Now", type: "Remote Beach Homes", amenities: ["Hot Springs", "Pristine Beaches", "Off-Grid Solar"] },
    
    // BAHIA DE LOS ANGELES
    { id: 20, name: "Bahía de los Ángeles Eco-Resort", region: "Bahía de los Ángeles", location: "Bahía de los Ángeles", units: 42, value: 22000000, status: "Pre-Construction", type: "Eco-Luxury Casitas", amenities: ["Whale Shark Tours", "Island Excursions", "Kayaking", "Stargazing"] },
    { id: 21, name: "Isla Angel de la Guarda View Estates", region: "Bahía de los Ángeles", location: "Bahía de los Ángeles", units: 18, value: 8500000, status: "Available Now", type: "Remote Desert Homes", amenities: ["Unobstructed Views", "Private Beach Access", "Solar Power"] },
    
    // GUERRERO NEGRO & VIZCAINO
    { id: 22, name: "Guerrero Negro Whale Sanctuary Lodges", region: "Guerrero Negro & Vizcaíno", location: "Guerrero Negro", units: 36, value: 14000000, status: "Under Construction", type: "Eco-Tourism Lodges", amenities: ["Gray Whale Tours", "Bird Sanctuary", "Salt Flats Tours"] },
    { id: 23, name: "San Ignacio Oasis Retreat", region: "Guerrero Negro & Vizcaíno", location: "San Ignacio", units: 24, value: 8000000, status: "Pre-Construction", type: "Desert Oasis Cabins", amenities: ["Date Palm Groves", "Mission Tours", "Cave Paintings Access"] },
    
    // SANTA ROSALIA & MULEGE
    { id: 24, name: "Santa Rosalía Historic District Lofts", region: "Santa Rosalía & Mulegé", location: "Santa Rosalía", units: 32, value: 11000000, status: "Available Now", type: "Historic Renovation Lofts", amenities: ["French Architecture", "Sea Views", "Walking District"] },
    { id: 25, name: "Mulegé River Oasis Villas", region: "Santa Rosalía & Mulegé", location: "Mulegé", units: 48, value: 18000000, status: "Under Construction", type: "Riverside Villas", amenities: ["Date Palm Gardens", "Kayak Access", "Mission Views"] },
    { id: 26, name: "Bahía Concepción Beachfront", region: "Santa Rosalía & Mulegé", location: "Bahía Concepción", units: 67, value: 28000000, status: "Phase 2", type: "Crystal Water Beach Homes", amenities: ["Turquoise Waters", "Snorkeling", "Camping Sites", "Boat Launch"] },
    
    // LORETO
    { id: 27, name: "Loreto Bay Resort Community", region: "Loreto", location: "Loreto", units: 234, value: 95000000, status: "Phase 3", type: "Master-Planned Resort", amenities: ["TPC Golf Course", "Marina", "Islands National Park", "Spa Resort"] },
    { id: 28, name: "Nopoló Beach Residences", region: "Loreto", location: "Nopoló", units: 89, value: 42000000, status: "Under Construction", type: "Beachfront Condos", amenities: ["Tennis Center", "Beach Club", "Fishing Charters"] },
    { id: 29, name: "Puerto Escondido Marina Village", region: "Loreto", location: "Puerto Escondido", units: 56, value: 32000000, status: "Pre-Construction", type: "Marina Residences", amenities: ["Deep Water Marina", "Boat Storage", "Yacht Club"] },
    { id: 30, name: "San Javier Mission Estates", region: "Loreto", location: "San Javier", units: 22, value: 12000000, status: "Available Now", type: "Mountain Ranch Estates", amenities: ["Historic Mission", "Olive Groves", "Horseback Riding"] },
    
    // LA PAZ
    { id: 31, name: "La Paz Marina Village", region: "La Paz", location: "La Paz", units: 178, value: 72000000, status: "Pre-Construction", type: "Marina Residences", amenities: ["Boat Slips", "Malecón Access", "Waterfront Dining", "Infinity Pool"] },
    { id: 32, name: "Balandra Bay Eco-Villas", region: "La Paz", location: "Balandra", units: 34, value: 28000000, status: "Under Construction", type: "Eco-Luxury Villas", amenities: ["Famous Beach Access", "Kayaking", "Snorkeling", "Nature Preserve"] },
    { id: 33, name: "Espíritu Santo Island View Estates", region: "La Paz", location: "La Paz", units: 56, value: 38000000, status: "Phase 2", type: "Island View Condos", amenities: ["UNESCO Site Views", "Whale Watching", "Diving Tours"] },
    { id: 34, name: "El Mogote Peninsula Resort", region: "La Paz", location: "El Mogote", units: 145, value: 85000000, status: "Pre-Construction", type: "Peninsula Resort Condos", amenities: ["Private Beach", "Mangrove Tours", "Water Sports"] },
    { id: 35, name: "Pichilingue Harbor Residences", region: "La Paz", location: "Pichilingue", units: 67, value: 32000000, status: "Available Now", type: "Harbor View Homes", amenities: ["Ferry Terminal Access", "Fishing Fleet", "Seafood Markets"] },
    
    // TODOS SANTOS
    { id: 36, name: "Todos Santos Art District", region: "Todos Santos & El Pescadero", location: "Todos Santos", units: 78, value: 42000000, status: "Under Construction", type: "Gallery Lofts", amenities: ["Art Studios", "Rooftop Gardens", "Surf Access", "Pueblo Mágico"] },
    { id: 37, name: "Cerritos Beach Surf Resort", region: "Todos Santos & El Pescadero", location: "Cerritos", units: 56, value: 35000000, status: "Phase 2", type: "Surf Resort Condos", amenities: ["Surf Breaks", "Yoga Retreat", "Organic Restaurant"] },
    { id: 38, name: "El Pescadero Farm Estates", region: "Todos Santos & El Pescadero", location: "El Pescadero", units: 34, value: 18000000, status: "Available Now", type: "Organic Farm Lots", amenities: ["Agricultural Land", "Farm-to-Table", "Mountain Views"] },
    { id: 39, name: "Las Palmas Surf Community", region: "Todos Santos & El Pescadero", location: "Las Palmas", units: 45, value: 24000000, status: "Pre-Construction", type: "Surf Village Homes", amenities: ["Beach Access", "Surf School", "Community Garden"] },
    
    // LOS BARRILES & EAST CAPE
    { id: 40, name: "Los Barriles Kite Beach Resort", region: "East Cape & Los Barriles", location: "Los Barriles", units: 89, value: 48000000, status: "Under Construction", type: "Kitesurf Resort Condos", amenities: ["World-Class Kitesurfing", "Equipment Storage", "Beach Club"] },
    { id: 41, name: "Cabo Pulmo Eco-Preserve Villas", region: "East Cape & Los Barriles", location: "Cabo Pulmo", units: 24, value: 22000000, status: "Pre-Construction", type: "Marine Sanctuary Villas", amenities: ["UNESCO Reef Access", "Diving Center", "Eco-Tours"] },
    { id: 42, name: "Buena Vista Sportfishing Resort", region: "East Cape & Los Barriles", location: "Buena Vista", units: 56, value: 32000000, status: "Available Now", type: "Fishing Resort Homes", amenities: ["Fishing Fleet", "Tournament Hosting", "Beach Palapas"] },
    { id: 43, name: "La Ribera Ranch Estates", region: "East Cape & Los Barriles", location: "La Ribera", units: 38, value: 16000000, status: "Phase 2", type: "Desert Ranch Lots", amenities: ["Horse Stables", "ATV Trails", "Mountain Views"] },
    
    // SAN JOSE DEL CABO
    { id: 44, name: "San José del Cabo Historic Center", region: "San José del Cabo", location: "San José del Cabo", units: 67, value: 52000000, status: "Under Construction", type: "Colonial Luxury Condos", amenities: ["Art Walk District", "Gallery Row", "Fine Dining", "Mission Church"] },
    { id: 45, name: "Puerto Los Cabos Marina", region: "San José del Cabo", location: "Puerto Los Cabos", units: 145, value: 125000000, status: "Phase 3", type: "Ultra-Luxury Marina Homes", amenities: ["Mega-Yacht Slips", "Greg Norman Golf", "Jack Nicklaus Golf", "Beach Club"] },
    { id: 46, name: "Palmilla Estates", region: "San José del Cabo", location: "Palmilla", units: 34, value: 85000000, status: "Available Now", type: "Ultra-Luxury Villas", amenities: ["One&Only Resort Access", "Private Beach", "27-Hole Golf"] },
    { id: 47, name: "Querencia Golf Community", region: "San José del Cabo", location: "Querencia", units: 78, value: 95000000, status: "Phase 2", type: "Golf Estate Homes", amenities: ["Tom Fazio Golf", "Clubhouse", "Spa", "Tennis"] },
    
    // CABO SAN LUCAS
    { id: 48, name: "Cabo Pacifica Resort", region: "Cabo San Lucas", location: "Cabo San Lucas", units: 234, value: 185000000, status: "Phase 2", type: "Luxury Resort Condos", amenities: ["Marina", "Championship Golf", "Private Beach", "El Arco Views"] },
    { id: 49, name: "Pedregal Luxury Estates", region: "Cabo San Lucas", location: "Pedregal", units: 45, value: 125000000, status: "Available Now", type: "Cliffside Mega-Mansions", amenities: ["Ocean Views", "Private Tunnels", "Helipad Access", "Infinity Pools"] },
    { id: 50, name: "Diamante Ocean Course Residences", region: "Cabo San Lucas", location: "Diamante", units: 89, value: 145000000, status: "Under Construction", type: "Golf Resort Homes", amenities: ["Dunes Golf Course", "El Cardonal Golf", "Beach Club", "Crystal Lagoon"] },
    { id: 51, name: "Quivira Los Cabos", region: "Cabo San Lucas", location: "Quivira", units: 156, value: 175000000, status: "Phase 3", type: "Oceanfront Golf Villas", amenities: ["Jack Nicklaus Golf", "Pueblo Bonito Resort", "Sunset Beach"] },
    { id: 52, name: "Medano Beach Urban Condos", region: "Cabo San Lucas", location: "Medano Beach", units: 198, value: 92000000, status: "Under Construction", type: "Beach Party Condos", amenities: ["Famous Beach Access", "Nightlife District", "Water Sports"] },
    
    // INLAND - MEXICALI
    { id: 53, name: "Mexicali Business District Towers", region: "Inland - Mexicali & Valleys", location: "Mexicali", units: 234, value: 78000000, status: "Under Construction", type: "Urban Business Condos", amenities: ["Business Center", "Convention Access", "Border Proximity"] },
    { id: 54, name: "Valle de Mexicali Agri-Estates", region: "Inland - Mexicali & Valleys", location: "Valle de Mexicali", units: 45, value: 22000000, status: "Available Now", type: "Agricultural Estates", amenities: ["Irrigation Rights", "Cotton/Wheat Farms", "Equipment Barns"] },
    { id: 55, name: "San Luis Rio Colorado Gateway", region: "Inland - Mexicali & Valleys", location: "San Luis Río Colorado", units: 67, value: 24000000, status: "Pre-Construction", type: "Border Town Homes", amenities: ["Arizona Border Access", "Shopping Centers", "Medical Tourism"] },
    
    // INLAND - SIERRA & DESERT
    { id: 56, name: "Sierra San Pedro Mártir Eco-Lodge", region: "Inland - Sierra & Desert", location: "Sierra San Pedro Mártir", units: 18, value: 12000000, status: "Pre-Construction", type: "Mountain Eco-Cabins", amenities: ["Observatory Access", "National Park", "Condor Watching", "Hiking"] },
    { id: 57, name: "Cataviña Boulder Field Retreat", region: "Inland - Sierra & Desert", location: "Cataviña", units: 24, value: 8000000, status: "Under Construction", type: "Desert Retreat Lodges", amenities: ["Giant Boulders", "Cardón Cactus Forest", "Dark Sky Site"] },
    { id: 58, name: "Valle de los Cirios Preserve", region: "Inland - Sierra & Desert", location: "Valle de los Cirios", units: 12, value: 5500000, status: "Available Now", type: "Conservation Lots", amenities: ["Protected Desert", "Rare Boojum Trees", "Off-Grid Living"] },
    
    // CARIBBEAN COAST (BONUS - MAINLAND MEXICO)
    { id: 59, name: "Tulum Jungle Villas", region: "Caribbean Coast", location: "Tulum", units: 92, value: 58000000, status: "Available Now", type: "Eco-Luxury Villas", amenities: ["Cenote Access", "Yoga Pavilion", "Organic Farm", "Mayan Ruins"] },
    { id: 60, name: "Playa del Carmen Urban Living", region: "Caribbean Coast", location: "Playa del Carmen", units: 187, value: 78000000, status: "Phase 3", type: "Urban Condos", amenities: ["5th Avenue Access", "Rooftop Pool", "Co-Working Space"] },
    { id: 61, name: "Puerto Morelos Reef Residences", region: "Caribbean Coast", location: "Puerto Morelos", units: 56, value: 32000000, status: "Under Construction", type: "Reef-Front Condos", amenities: ["Marine Park", "Diving", "Fishing Village Charm"] },
    
    // PACIFIC COAST (BONUS - MAINLAND MEXICO)  
    { id: 62, name: "Puerto Vallarta Bayfront", region: "Pacific Coast", location: "Puerto Vallarta", units: 143, value: 92000000, status: "Pre-Construction", type: "Bayfront Towers", amenities: ["Marina Views", "Infinity Edge Pool", "Fine Dining"] },
    { id: 63, name: "Mazatlán Golden Zone Residences", region: "Pacific Coast", location: "Mazatlán", units: 112, value: 52000000, status: "Under Construction", type: "Beachfront Condos", amenities: ["Direct Beach Access", "Fitness Center", "Concierge"] },
    { id: 64, name: "Sayulita Surf Town Lofts", region: "Pacific Coast", location: "Sayulita", units: 45, value: 28000000, status: "Available Now", type: "Bohemian Surf Lofts", amenities: ["Surf Break Access", "Pueblo Mágico", "Art Scene"] }
  ];

  const regions = [...new Set(developments.map(d => d.region))];
  
  const stats = {
    projects: developments.length,
    totalUnits: developments.reduce((sum, d) => sum + d.units, 0),
    estValue: developments.reduce((sum, d) => sum + d.value, 0),
    regions: regions.length
  };

  const formatValue = (val) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(2)}B+`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(0)}M+`;
    return `$${(val / 1000).toFixed(0)}K`;
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
      
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
            Baja California Peninsula • Tijuana to Cabo San Lucas • Coastal & Inland Properties
          </p>
        </div>

        {/* STATS CARDS */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
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
              {stats.totalUnits.toLocaleString()}
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
            const regionValue = regionProjects.reduce((sum, d) => sum + d.value, 0);
            
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
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '16px', fontWeight: '500', color: '#f1f5f9', letterSpacing: '1px', display: 'block' }}>
                      {region}
                    </span>
                    <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                      {regionProjects.length} projects • {formatValue(regionValue)} total value
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp size={20} color="#cba658" /> : <ChevronDown size={20} color="#cba658" />}
                </button>
                
                {isExpanded && (
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
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
                                       dev.status.includes('Phase') ? 'rgba(168, 85, 247, 0.2)' :
                                       'rgba(251, 191, 36, 0.2)',
                            border: `1px solid ${dev.status === 'Available Now' ? '#22c55e' : 
                                                  dev.status === 'Under Construction' ? '#3b82f6' : 
                                                  dev.status.includes('Phase') ? '#a855f7' :
                                                  '#fbbf24'}`,
                            borderRadius: '20px',
                            fontSize: '9px',
                            fontWeight: '700',
                            color: dev.status === 'Available Now' ? '#22c55e' : 
                                   dev.status === 'Under Construction' ? '#3b82f6' : 
                                   dev.status.includes('Phase') ? '#a855f7' :
                                   '#fbbf24',
                            letterSpacing: '1px',
                            marginBottom: '12px',
                            textTransform: 'uppercase'
                          }}>
                            {dev.status}
                          </div>
                          
                          <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#f1f5f9', marginBottom: '8px' }}>
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
                            onClick={() => window.open(`https://wa.me/526463402686?text=Interested in ${dev.name} - ${dev.location}`, '_blank')}
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

        {/* DEVELOPER CTA */}
        <div style={{
          marginTop: '50px',
          background: 'rgba(203, 166, 88, 0.1)',
          border: '2px solid rgba(203, 166, 88, 0.4)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '400', color: '#cba658', marginBottom: '12px' }}>
            Are You a Developer?
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            List your development project on our platform. We connect you with qualified buyers and charge commission only on closed sales.
          </p>
          <button
            onClick={() => window.open('https://wa.me/526463402686?text=I am a developer interested in listing my project on EnjoyBaja.com', '_blank')}
            style={{
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #cba658, #b8944d)',
              border: 'none',
              borderRadius: '30px',
              color: '#0a0a0a',
              fontSize: '13px',
              fontWeight: '800',
              letterSpacing: '2px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(203, 166, 88, 0.5)'
            }}
          >
            LIST YOUR PROJECT
          </button>
        </div>
      </div>
    </div>
  );
}