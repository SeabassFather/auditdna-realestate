import React, { useState } from "react";

export default function MexicoRefiCard({ language }) {
  const labels = {
    english: {
      refiTitle: "Mexico Home Refinance",
      refiSubtitle: "Exclusive for US citizens looking to refinance or purchase property in Mexico. Loans from $385,000 USD. Down payment required: 35-45%. Other restrictions apply.",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      propertyType: "Property Type",
      address: "Property Address in Mexico",
      estimatedValue: "Estimated Property Value",
      loanAmount: "Desired Loan Amount",
      submit: "Request Information"
    },
    spanish: {
      refiTitle: "Refinanciamiento de Casa en México",
      refiSubtitle: "Exclusivo para ciudadanos estadounidenses que buscan refinanciar o comprar casa en México. Préstamos desde $385,000 USD. Anticipo requerido: 35-45%. Aplican otras restricciones.",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Número de Teléfono",
      propertyType: "Tipo de Propiedad",
      address: "Dirección de la Propiedad en México",
      estimatedValue: "Valor Estimado de la Propiedad",
      loanAmount: "Monto del Préstamo Deseado",
      submit: "Solicitar Información"
    }
  };

  const t = labels[language];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#cba658', marginBottom: '10px' }}>{t.refiTitle}</h3>
      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>{t.refiSubtitle}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
        <input type="text" placeholder={t.fullName} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="email" placeholder={t.email} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="tel" placeholder={t.phone} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }}>
          <option>{t.propertyType}</option>
          <option>House</option>
          <option>Condo</option>
        </select>
        <input type="text" placeholder={t.address} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569', gridColumn: '1 / -1' }} />
        <input type="number" placeholder={t.estimatedValue} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="number" placeholder={t.loanAmount} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        
        <button style={{
          padding: '14px 28px',
          background: 'linear-gradient(135deg, #cba658, #b8944d)',
          color: '#0a0a0a',
          border: 'none',
          borderRadius: '30px',
          fontWeight: '800',
          cursor: 'pointer',
          gridColumn: '1 / -1'
        }}>
          {t.submit}
        </button>
      </div>
    </div>
  );
}