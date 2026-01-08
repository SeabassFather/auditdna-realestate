import React from "react";

export default function LegalQuestionnaireCard({ language }) {
  const labels = {
    english: {
      title: "Legal/Fideicomiso Questionnaire",
      subtitle: "Legal questions, trusts, fideicomisos, and property contracts.",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      question: "Legal Question or Issue",
      submit: "Submit Question"
    },
    spanish: {
      title: "Cuestionario Legal/Fideicomiso",
      subtitle: "Preguntas legales, fideicomisos, trusts y contratos de propiedad.",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Número de Teléfono",
      question: "Pregunta o Asunto Legal",
      submit: "Enviar Pregunta"
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
        <textarea placeholder={t.question} rows="5" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #475569', fontFamily: 'inherit' }}></textarea>
        
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