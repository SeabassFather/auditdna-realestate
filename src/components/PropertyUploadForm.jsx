import React, { useState } from "react";

export default function PropertyUploadForm({ language }) {
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    propertyType: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: ""
  });

  const labels = {
    english: {
      title: "List Your Property",
      subtitle: "Add your property to our premium listings",
      ownerName: "Owner Name",
      email: "Email",
      phone: "Phone",
      propertyType: "Property Type",
      address: "Property Address",
      price: "Asking Price (USD)",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      submit: "Submit Listing"
    },
    spanish: {
      title: "Publicar Su Propiedad",
      subtitle: "Agregue su propiedad a nuestros listados premium",
      ownerName: "Nombre del Propietario",
      email: "Correo Electrónico",
      phone: "Teléfono",
      propertyType: "Tipo de Propiedad",
      address: "Dirección de la Propiedad",
      price: "Precio Solicitado (USD)",
      bedrooms: "Recámaras",
      bathrooms: "Baños",
      submit: "Enviar Listado"
    }
  };

  const t = labels[language];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#cba658', marginBottom: '10px' }}>{t.title}</h3>
      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>{t.subtitle}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
        <input type="text" placeholder={t.ownerName} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="email" placeholder={t.email} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="tel" placeholder={t.phone} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }}>
          <option value="">{t.propertyType}</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>
        <input type="text" placeholder={t.address} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569', gridColumn: '1 / -1' }} />
        <input type="number" placeholder={t.price} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="number" placeholder={t.bedrooms} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="number" placeholder={t.bathrooms} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        
        <button style={{
          padding: '14px 28px',
          background: 'linear-gradient(135deg, #cba658, #b8944d)',
          color: '#0a0a0a',
          border: 'none',
          borderRadius: '30px',
          fontWeight: '800',
          fontSize: '14px',
          cursor: 'pointer',
          letterSpacing: '1px',
          gridColumn: '1 / -1'
        }}>
          {t.submit}
        </button>
      </div>
    </div>
  );
}