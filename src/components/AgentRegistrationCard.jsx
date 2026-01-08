import React from "react";

export default function AgentRegistrationCard({ language }) {
  const labels = {
    english: {
      title: "Agent Registration",
      subtitle: "Join the AuditDNA Elite Real Estate Platform",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      agency: "Agency Name",
      nmls: "NMLS Number (if applicable)",
      terms: "By registering, you agree to comply with all platform terms and conditions, including the 50/50 commission split agreement on all transactions. You certify that all information provided is accurate and that you have the authority to list properties on behalf of owners.",
      submit: "Register as Agent"
    },
    spanish: {
      title: "Registro de Agente",
      subtitle: "Únase a la Plataforma Elite de Bienes Raíces AuditDNA",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Número de Teléfono",
      agency: "Nombre de la Agencia",
      nmls: "Número NMLS (si aplica)",
      terms: "Al registrarse, acepta cumplir con todos los términos y condiciones de la plataforma, incluido el acuerdo de división de comisión 50/50 en todas las transacciones. Certifica que toda la información proporcionada es precisa y que tiene la autoridad para listar propiedades en nombre de los propietarios.",
      submit: "Registrarse como Agente"
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
        <input type="text" placeholder={t.agency} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        <input type="text" placeholder={t.nmls} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569' }} />
        
        <div style={{ padding: '12px', background: 'rgba(203, 166, 88, 0.1)', borderRadius: '8px', fontSize: '12px', color: '#cbd5e1' }}>
          {t.terms}
        </div>
        
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