import React, { useState } from 'react';

export default function PropertySearch({ language = 'english' }) {
  const [propertyType, setPropertyType] = useState('');
  const [region, setRegion] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // SAMPLE PROPERTIES - REPLACE WITH REAL API/DATABASE LATER
  const sampleProperties = [
    {
      id: 1,
      name: 'Casa del Caracol',
      type: 'house',
      region: 'Ensenada',
      price: 15000000,
      beds: 8,
      baths: 10,
      sqft: 12000,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85',
      description: 'Oceanfront masterpiece on 2.5 acres with private beach access, infinity pools, wine cellar'
    },
    {
      id: 2,
      name: 'Valle Vineyard Estate',
      type: 'vineyard',
      region: 'Valle de Guadalupe',
      price: 2500000,
      beds: 5,
      baths: 4,
      sqft: 4500,
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=85',
      description: 'Boutique winery with producing vineyard, tasting room, luxury residence'
    },
    {
      id: 3,
      name: 'Rosarito Beach Residence',
      type: 'condo',
      region: 'Rosarito',
      price: 350000,
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85',
      description: 'Contemporary oceanfront with private terrace, underground parking'
    },
    {
      id: 4,
      name: 'Cabo Marina Penthouse',
      type: 'penthouse',
      region: 'Cabo San Lucas',
      price: 1800000,
      beds: 3,
      baths: 3,
      sqft: 2800,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
      description: 'Panoramic marina and ocean views, rooftop terrace, boat slip included'
    },
    {
      id: 5,
      name: 'Todos Santos Villa',
      type: 'villa',
      region: 'Todos Santos',
      price: 890000,
      beds: 4,
      baths: 3,
      sqft: 3200,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85',
      description: 'Architectural villa near world-class surf breaks and art galleries'
    },
    {
      id: 6,
      name: 'La Paz Beachfront',
      type: 'house',
      region: 'La Paz',
      price: 675000,
      beds: 3,
      baths: 2,
      sqft: 2200,
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=85',
      description: 'Direct beach access on Sea of Cortez, perfect for fishing and sailing'
    },
    {
      id: 7,
      name: 'Tijuana Contemporary',
      type: 'townhouse',
      region: 'Tijuana',
      price: 425000,
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85',
      description: 'Modern residence in gated community near border crossing'
    },
    {
      id: 8,
      name: 'San Felipe Gulf View',
      type: 'condo',
      region: 'San Felipe',
      price: 185000,
      beds: 2,
      baths: 1,
      sqft: 950,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85',
      description: 'Beachfront residence with Sea of Cortez views'
    }
  ];

  // COMPLETE LIST OF ALL BAJA CALIFORNIA REGIONS - TIJUANA TO CABO
  const regions = [
    // BAJA CALIFORNIA NORTE - BORDER REGION
    { group: 'Border Region', locations: [
      'Tijuana',
      'Tijuana - Playas de Tijuana',
      'Tijuana - Zona Rio',
      'Tijuana - Chapultepec',
      'Tecate',
      'Mexicali',
      'Mexicali - Valle de Mexicali',
      'San Luis Rio Colorado'
    ]},
    // BAJA CALIFORNIA NORTE - COASTAL
    { group: 'Rosarito & Surrounding', locations: [
      'Rosarito',
      'Rosarito - Popotla',
      'Rosarito - Puerto Nuevo',
      'Rosarito - Calafia',
      'Rosarito - Las Gaviotas',
      'Primo Tapia',
      'La Mision',
      'La Fonda',
      'Alisitos'
    ]},
    // ENSENADA REGION
    { group: 'Ensenada Region', locations: [
      'Ensenada',
      'Ensenada - Centro',
      'Ensenada - Chapultepec',
      'Ensenada - El Sauzal',
      'Ensenada - Maneadero',
      'Ensenada - Punta Banda',
      'La Bufadora',
      'Estero Beach',
      'San Miguel',
      'El Cipres'
    ]},
    // WINE COUNTRY
    { group: 'Valle de Guadalupe & Wine Country', locations: [
      'Valle de Guadalupe',
      'San Antonio de las Minas',
      'El Porvenir',
      'Francisco Zarco',
      'San Marcos',
      'Ojos Negros',
      'Real del Castillo',
      'Valle de las Palmas',
      'Valle de la Trinidad'
    ]},
    // PACIFIC COAST - SOUTH OF ENSENADA
    { group: 'Pacific Coast South', locations: [
      'San Quintin',
      'San Quintin - Bahia San Quintin',
      'Vicente Guerrero',
      'Colonet',
      'Camalu',
      'San Vicente',
      'Santo Tomas',
      'Erendira',
      'Punta Colonet'
    ]},
    // CENTRAL DESERT
    { group: 'Central Desert', locations: [
      'El Rosario',
      'Catavina',
      'Bahia de los Angeles',
      'Guerrero Negro',
      'Vizcaino',
      'San Ignacio',
      'Santa Rosalia',
      'Mulege'
    ]},
    // SEA OF CORTEZ - NORTH
    { group: 'Sea of Cortez North', locations: [
      'San Felipe',
      'San Felipe - El Dorado Ranch',
      'San Felipe - Playas del Sol',
      'Puertecitos',
      'Gonzaga Bay',
      'Bahia San Luis Gonzaga',
      'Laguna Percebu',
      'Punta Estrella'
    ]},
    // LORETO REGION
    { group: 'Loreto Region', locations: [
      'Loreto',
      'Loreto - Centro Historico',
      'Loreto - Nopolo',
      'Loreto Bay',
      'Puerto Escondido',
      'Ensenada Blanca',
      'Agua Verde',
      'Ligui',
      'Juncalito'
    ]},
    // LA PAZ REGION
    { group: 'La Paz Region', locations: [
      'La Paz',
      'La Paz - Centro',
      'La Paz - El Centenario',
      'La Paz - El Comitan',
      'La Paz - Chametla',
      'Balandra',
      'Tecolote',
      'Pichilingue',
      'El Sargento',
      'La Ventana',
      'Los Barriles',
      'Buena Vista',
      'Punta Pescadero',
      'Los Planes',
      'San Juan de los Planes'
    ]},
    // EAST CAPE
    { group: 'East Cape', locations: [
      'East Cape',
      'Cabo Pulmo',
      'Los Frailes',
      'Punta Colorada',
      'Rancho Leonero',
      'Punta Arena',
      'Santiago',
      'Miraflores',
      'Santa Anita'
    ]},
    // TODOS SANTOS & PACIFIC
    { group: 'Todos Santos & Pacific', locations: [
      'Todos Santos',
      'Todos Santos - Centro',
      'Todos Santos - Las Tunas',
      'El Pescadero',
      'Cerritos Beach',
      'Los Cerritos',
      'Elias Calles',
      'El Carrizal',
      'La Ribera',
      'Punta Lobos'
    ]},
    // LOS CABOS CORRIDOR
    { group: 'Los Cabos Corridor', locations: [
      'San Jose del Cabo',
      'San Jose del Cabo - Centro',
      'San Jose del Cabo - Zona Hotelera',
      'San Jose del Cabo - Puerto Los Cabos',
      'San Jose del Cabo - La Playita',
      'San Jose del Cabo - Palmilla',
      'Cabo San Lucas',
      'Cabo San Lucas - Centro',
      'Cabo San Lucas - Marina',
      'Cabo San Lucas - Pedregal',
      'Cabo San Lucas - El Medano',
      'Cabo San Lucas - Pacific Side',
      'Tourist Corridor',
      'Corridor - Palmilla',
      'Corridor - Querencia',
      'Corridor - Chileno Bay',
      'Corridor - Santa Carmela',
      'Corridor - Twin Dolphin',
      'Corridor - Costa Azul',
      'Corridor - El Encanto',
      'Cabo del Sol',
      'Punta Ballena',
      'El Tezal',
      'Rancho San Lucas'
    ]},
    // ISLANDS
    { group: 'Islands', locations: [
      'Isla Cedros',
      'Isla Guadalupe',
      'Isla Angel de la Guarda',
      'Isla Espiritu Santo',
      'Isla Partida',
      'Isla Cerralvo',
      'Isla San Jose',
      'Isla Carmen'
    ]}
  ];

  const propertyTypes = [
    { value: '', label: language === 'english' ? 'All Property Types' : 'Todos los Tipos' },
    { value: 'house', label: language === 'english' ? 'House' : 'Casa' },
    { value: 'condo', label: language === 'english' ? 'Condo / Apartment' : 'Condominio / Departamento' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'townhouse', label: language === 'english' ? 'Townhouse' : 'Casa Adosada' },
    { value: 'land', label: language === 'english' ? 'Land / Lot' : 'Terreno' },
    { value: 'commercial', label: language === 'english' ? 'Commercial' : 'Comercial' },
    { value: 'ranch', label: language === 'english' ? 'Ranch / Farm' : 'Rancho / Finca' },
    { value: 'beachfront', label: language === 'english' ? 'Beachfront' : 'Frente al Mar' },
    { value: 'oceanview', label: language === 'english' ? 'Ocean View' : 'Vista al Mar' },
    { value: 'vineyard', label: language === 'english' ? 'Vineyard Estate' : 'Viñedo' },
    { value: 'hotel', label: language === 'english' ? 'Hotel / B&B' : 'Hotel / B&B' },
    { value: 'development', label: language === 'english' ? 'Development Land' : 'Terreno para Desarrollo' }
  ];

  const priceRanges = [
    { value: '', label: language === 'english' ? 'Any Price' : 'Cualquier Precio' },
    { value: '0-100000', label: '$0 - $100,000 USD' },
    { value: '100000-250000', label: '$100,000 - $250,000 USD' },
    { value: '250000-500000', label: '$250,000 - $500,000 USD' },
    { value: '500000-750000', label: '$500,000 - $750,000 USD' },
    { value: '750000-1000000', label: '$750,000 - $1,000,000 USD' },
    { value: '1000000-2000000', label: '$1,000,000 - $2,000,000 USD' },
    { value: '2000000-5000000', label: '$2,000,000 - $5,000,000 USD' },
    { value: '5000000+', label: '$5,000,000+ USD' }
  ];

  const bedroomOptions = [
    { value: '', label: language === 'english' ? 'Any Bedrooms' : 'Cualquier Recámaras' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
    { value: '6', label: '6+' }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(true);
    
    setTimeout(() => {
      // Filter properties based on search criteria
      let filtered = [...sampleProperties];
      
      if (propertyType) {
        filtered = filtered.filter(p => p.type === propertyType);
      }
      
      if (region) {
        filtered = filtered.filter(p => p.region === region);
      }
      
      if (priceRange && priceRange !== '') {
        const [min, max] = priceRange.split('-').map(n => n === '' ? Infinity : parseInt(n.replace('+', '')));
        filtered = filtered.filter(p => {
          if (max === Infinity) return p.price >= min;
          return p.price >= min && p.price <= max;
        });
      }
      
      if (bedrooms) {
        const minBeds = parseInt(bedrooms);
        filtered = filtered.filter(p => p.beds >= minBeds);
      }
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 800);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toLocaleString()}K`;
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1e293b',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    color: '#94a3b8',
    marginBottom: '6px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  };

  return (
    <div>
      <h3 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        color: '#cba658', 
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        {language === 'english' ? 'Property Search' : 'Búsqueda de Propiedades'}
      </h3>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* PROPERTY TYPE */}
        <div>
          <label style={labelStyle}>
            {language === 'english' ? 'Property Type' : 'Tipo de Propiedad'}
          </label>
          <select 
            value={propertyType} 
            onChange={(e) => setPropertyType(e.target.value)}
            style={inputStyle}
          >
            {propertyTypes.map((type, i) => (
              <option key={i} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* REGION - WITH GROUPED OPTIONS */}
        <div>
          <label style={labelStyle}>
            {language === 'english' ? 'Region' : 'Región'}
          </label>
          <select 
            value={region} 
            onChange={(e) => setRegion(e.target.value)}
            style={inputStyle}
          >
            <option value="">{language === 'english' ? 'All Baja California' : 'Toda Baja California'}</option>
            {regions.map((group, gi) => (
              <optgroup key={gi} label={group.group}>
                {group.locations.map((loc, li) => (
                  <option key={li} value={loc}>{loc}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* PRICE RANGE */}
        <div>
          <label style={labelStyle}>
            {language === 'english' ? 'Price Range (USD)' : 'Rango de Precio (USD)'}
          </label>
          <select 
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value)}
            style={inputStyle}
          >
            {priceRanges.map((range, i) => (
              <option key={i} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* BEDROOMS */}
        <div>
          <label style={labelStyle}>
            {language === 'english' ? 'Bedrooms' : 'Recámaras'}
          </label>
          <select 
            value={bedrooms} 
            onChange={(e) => setBedrooms(e.target.value)}
            style={inputStyle}
          >
            {bedroomOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          style={{
            padding: '16px 48px',
            background: isSearching ? '#94a3b8' : '#cba658',
            border: 'none',
            borderRadius: '8px',
            color: '#0f172a',
            fontSize: '14px',
            fontWeight: '600',
            cursor: isSearching ? 'wait' : 'pointer',
            letterSpacing: '1px',
            transition: 'all 0.3s'
          }}
        >
          {isSearching 
            ? (language === 'english' ? 'Searching...' : 'Buscando...') 
            : (language === 'english' ? 'Search Properties' : 'Buscar Propiedades')
          }
        </button>
      </div>

      {/* REGION COUNT INFO */}
      <p style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        fontSize: '12px', 
        color: '#64748b' 
      }}>
        {language === 'english' 
          ? `Searching across 150+ locations from Tijuana to Cabo San Lucas`
          : `Buscando en más de 150 ubicaciones desde Tijuana hasta Cabo San Lucas`
        }
      </p>

      {/* QUICK LINKS */}
      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        background: 'rgba(203, 166, 88, 0.1)', 
        borderRadius: '8px',
        border: '1px solid rgba(203, 166, 88, 0.2)'
      }}>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px', textAlign: 'center' }}>
          {language === 'english' ? 'Popular Regions:' : 'Regiones Populares:'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {['Tijuana', 'Rosarito', 'Ensenada', 'Valle de Guadalupe', 'San Felipe', 'La Paz', 'Los Barriles', 'East Cape', 'Todos Santos', 'San Jose del Cabo', 'Cabo San Lucas'].map((loc, i) => (
            <button
              key={i}
              onClick={() => setRegion(loc)}
              style={{
                padding: '6px 12px',
                background: region === loc ? '#cba658' : 'transparent',
                border: '1px solid rgba(203, 166, 88, 0.5)',
                borderRadius: '20px',
                color: region === loc ? '#0f172a' : '#cba658',
                fontSize: '11px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* PROPERTY RESULTS - ONLY SHOWS AFTER SEARCH */}
      {hasSearched && (
        <div style={{ marginTop: '40px' }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#64748b', 
            marginBottom: '24px',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            {searchResults.length} {language === 'english' ? 'Properties Found' : 'Propiedades Encontradas'}
          </p>

          {searchResults.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px dashed #cbd5e1'
            }}>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>
                {language === 'english' ? 'No properties match your criteria' : 'No hay propiedades que coincidan'}
              </p>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
                {language === 'english' ? 'Try adjusting your filters or contact us for assistance' : 'Intente ajustar los filtros o contáctenos'}
              </p>
              <button
                onClick={() => window.open('https://wa.me/526463402686?text=I need help finding properties', '_blank')}
                style={{
                  padding: '12px 32px',
                  background: '#cba658',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#0f172a',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {language === 'english' ? 'Contact Us' : 'Contáctenos'}
              </button>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '24px' 
            }}>
              {searchResults.map((property) => (
                <div 
                  key={property.id} 
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  {/* Property Image */}
                  <div style={{
                    width: '100%',
                    height: '240px',
                    backgroundImage: `url(${property.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: '#cba658',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: '700'
                    }}>
                      {formatPrice(property.price)}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div style={{ padding: '20px' }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '6px'
                    }}>
                      {property.name}
                    </h4>
                    <p style={{
                      fontSize: '13px',
                      color: '#cba658',
                      marginBottom: '12px',
                      fontWeight: '500'
                    }}>
                      {property.region}
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: '#475569',
                      marginBottom: '16px',
                      lineHeight: '1.6'
                    }}>
                      {property.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '13px',
                      color: '#64748b',
                      marginBottom: '20px',
                      paddingTop: '12px',
                      borderTop: '1px solid #e2e8f0'
                    }}>
                      <span>{property.beds} {language === 'english' ? 'beds' : 'rec'}</span>
                      <span>•</span>
                      <span>{property.baths} {language === 'english' ? 'baths' : 'baños'}</span>
                      <span>•</span>
                      <span>{property.sqft.toLocaleString()} SF</span>
                    </div>
                    <button
                      onClick={() => window.open(`https://wa.me/526463402686?text=Property Inquiry: ${property.name} - ${formatPrice(property.price)}`, '_blank')}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#cba658',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#b8944d'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#cba658'}
                    >
                      {language === 'english' ? 'Contact About This Property' : 'Consultar Esta Propiedad'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}