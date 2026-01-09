import React, { useState } from 'react';

export default function PropertySearch({ language = 'english' }) {
  const [propertyType, setPropertyType] = useState('');
  const [region, setRegion] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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
    // Simulate search - in production this would call your API
    setTimeout(() => {
      setIsSearching(false);
      // Show message for now
      const searchCriteria = [];
      if (region) searchCriteria.push(region);
      if (propertyType) searchCriteria.push(propertyType);
      if (priceRange) searchCriteria.push(priceRange);
      
      alert(language === 'english' 
        ? `Searching for properties in: ${searchCriteria.join(', ') || 'All Baja California'}\n\nContact us for available listings!\nWhatsApp: +52 646 340 2686`
        : `Buscando propiedades en: ${searchCriteria.join(', ') || 'Toda Baja California'}\n\n¡Contáctenos para listados disponibles!\nWhatsApp: +52 646 340 2686`
      );
    }, 1000);
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
    </div>
  );
}