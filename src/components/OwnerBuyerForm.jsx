import React, { useState } from "react";

export default function OwnerBuyerForm({ language }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    purpose: "buy"
  });

  const labels = {
    english: {
      title: "List Property / Buyer Inquiry",
      subtitle: "Need help selling or buying a property? Fill out the form and our team will contact you.",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      address: "Property Address",
      purpose: "Purpose",
      buy: "Buy",
      sell: "Sell",
      submit: "Submit Inquiry"
    },
    spanish: {
      title: "Publicar Propiedad / Solicitar Ayuda para Comprar",
      subtitle: "Necesita ayuda para vender o comprar una propiedad? Complete el formulario y nuestro equipo lo contactará.",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono",
      address: "Dirección de la Propiedad",
      purpose: "Propósito",
      buy: "Comprar",
      sell: "Vender",
      submit: "Enviar Solicitud"
    }
  };

  const t = labels[language];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#cba658', marginBottom: '10px' }}>{t.title}</h3>
      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>{t.subtitle}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
        <input 
          type="text"
          placeholder={t.fullName}
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }}
        />
        
        <input 
          type="email"
          placeholder={t.email}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }}
        />
        
        <input 
          type="tel"
          placeholder={t.phone}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }}
        />
        
        <input 
          type="text"
          placeholder={t.address}
          value={formData.propertyAddress}
          onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }}
        />
        
        <select
          value={formData.purpose}
          onChange={(e) => setFormData({...formData, purpose: e.target.value})}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }}
        >
          <option value="buy">{t.buy}</option>
          <option value="sell">{t.sell}</option>
        </select>
        
        <button style={{
          padding: '14px 28px',
          background: 'linear-gradient(135deg, #cba658, #b8944d)',
          color: '#0a0a0a',
          border: 'none',
          borderRadius: '30px',
          fontWeight: '800',
          fontSize: '14px',
          cursor: 'pointer',
          letterSpacing: '1px'
        }}>
          {t.submit}
        </button>
      </div>
    </div>
  );
}