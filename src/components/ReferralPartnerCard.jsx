import React from "react";

export default function ReferralPartnerCard({ language }) {
  const labels = {
    english: {
      title: "Referral Partner Registration",
      subtitle: "Partner with AuditDNA for Mortgages and Real Estate in Mexico",
      org: "Organization Name",
      contact: "Contact Name",
      email: "Email",
      phone: "Phone",
      website: "Website",
      submit: "Register as Partner"
    },
    spanish: {
      title: "Registro de Socio de Referencia",
      subtitle: "Asóciese con AuditDNA para Préstamos y Bienes Raíces en México",
      org: "Nombre de la Organización",
      contact: "Nombre del Contacto",
      email: "Correo Electrónico",
      phone: "Teléfono",
      website: "Sitio Web",
      submit: "Registrarse como Socio"
    }
  };

  const t = labels[language];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#cba658', marginBottom: '10px' }}>{t.title}</h3>
      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>{t.subtitle}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
        <input type="text" placeholder={t.org} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="text" placeholder={t.contact} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="email" placeholder={t.email} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="tel" placeholder={t.phone} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="url" placeholder={t.website} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        
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