import React from "react";

export default function AppraisalServicesCard({ language }) {
  const labels = {
    english: {
      title: "Request Appraisal Services",
      subtitle: "Request a certified appraisal for property in Mexico or USA.",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      propertyAddress: "Property Address",
      propertyType: "Property Type",
      submit: "Request Appraisal"
    },
    spanish: {
      title: "Solicitar Servicios de Avalúo",
      subtitle: "Solicite un avalúo certificado para propiedad en México o EE.UU.",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono",
      propertyAddress: "Dirección de la Propiedad",
      propertyType: "Tipo de Propiedad",
      submit: "Solicitar Avalúo"
    }
  };

  const t = labels[language];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#cba658', marginBottom: '10px' }}>{t.title}</h3>
      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>{t.subtitle}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
        <input type="text" placeholder={t.fullName} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="email" placeholder={t.email} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="tel" placeholder={t.phone} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="text" placeholder={t.propertyAddress} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }}>
          <option>{t.propertyType}</option>
          <option>House</option>
          <option>Condo</option>
          <option>Land</option>
        </select>
        
        <button style={{
          padding: '14px 28px',
          background: 'linear-gradient(135deg, #cba658, #b8944d)',
          color: '#0a0a0a',
          border: 'none',
          borderRadius: '30px',
          fontWeight: '800',
          cursor: 'pointer'
        }}>
          {t.submit}
        </button>
      </div>
    </div>
  );
}