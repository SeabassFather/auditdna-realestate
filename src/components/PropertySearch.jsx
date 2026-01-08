import React, { useState } from "react";

export default function PropertySearch({ language }) {
  const [filters, setFilters] = useState({
    type: "",
    region: "",
    priceRange: "",
    bedrooms: ""
  });

  const labels = {
    english: {
      title: "Property Search",
      propertyType: "Property Type",
      region: "Region",
      priceRange: "Price Range (USD)",
      bedrooms: "Bedrooms",
      search: "Search Properties"
    },
    spanish: {
      title: "Búsqueda de Propiedades",
      propertyType: "Tipo de Propiedad",
      region: "Región",
      priceRange: "Rango de Precio (USD)",
      bedrooms: "Recámaras",
      search: "Buscar Propiedades"
    }
  };

  const t = labels[language];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#cba658', marginBottom: '20px' }}>{t.title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <select 
          value={filters.type}
          onChange={(e) => setFilters({...filters, type: e.target.value})}
          style={{ padding: '10px', borderRadius: '5px' }}
        >
          <option value="">{t.propertyType}</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>
        
        <select 
          value={filters.region}
          onChange={(e) => setFilters({...filters, region: e.target.value})}
          style={{ padding: '10px', borderRadius: '5px' }}
        >
          <option value="">{t.region}</option>
          <option value="ensenada">Ensenada</option>
          <option value="rosarito">Rosarito</option>
          <option value="cabo">Cabo</option>
        </select>
        
        <select 
          value={filters.priceRange}
          onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
          style={{ padding: '10px', borderRadius: '5px' }}
        >
          <option value="">{t.priceRange}</option>
          <option value="0-100k">$0-$100k</option>
          <option value="100k-300k">$100k-$300k</option>
          <option value="300k+">$300k+</option>
        </select>
        
        <button style={{ 
          padding: '10px 20px', 
          background: 'linear-gradient(135deg, #cba658, #b8944d)', 
          color: '#0a0a0a',
          border: 'none',
          borderRadius: '25px',
          fontWeight: '700',
          cursor: 'pointer'
        }}>
          {t.search}
        </button>
      </div>
    </div>
  );
}