// =============================================================================
// MULTI-LINGUAL CONTACT CARD COMPONENT WITH ZADARMA INTEGRATION
// English/Spanish - Instant Call + WhatsApp + SMS + Lead Capture
// =============================================================================

import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, Calendar, Send, Globe, X } from 'lucide-react';

const ContactCard = ({ 
  language = 'en', 
  context = 'property', // 'property', 'team', 'lifestyle'
  data = {} // property/team/establishment data
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'whatsapp', // whatsapp, call, email
    preferredLanguage: language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Translations
  const translations = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our expert team',
      instantCall: 'Instant Call',
      whatsapp: 'WhatsApp',
      email: 'Email',
      schedule: 'Schedule Viewing',
      name: 'Full Name',
      emailLabel: 'Email Address',
      phone: 'Phone Number',
      message: 'Message',
      preferredContact: 'Preferred Contact Method',
      submit: 'Send Inquiry',
      submitting: 'Sending...',
      success: 'Message sent! We\'ll contact you shortly.',
      error: 'Failed to send. Please try WhatsApp.',
      callNow: 'Call Now',
      chatNow: 'Chat Now',
      emailNow: 'Email Now',
      property: 'Property Inquiry',
      team: 'Consultation Request',
      lifestyle: 'Information Request',
      close: 'Close'
    },
    es: {
      title: 'Contáctanos',
      subtitle: 'Ponte en contacto con nuestro equipo experto',
      instantCall: 'Llamada Instantánea',
      whatsapp: 'WhatsApp',
      email: 'Correo',
      schedule: 'Agendar Visita',
      name: 'Nombre Completo',
      emailLabel: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      message: 'Mensaje',
      preferredContact: 'Método de Contacto Preferido',
      submit: 'Enviar Consulta',
      submitting: 'Enviando...',
      success: '¡Mensaje enviado! Te contactaremos pronto.',
      error: 'Error al enviar. Por favor intenta WhatsApp.',
      callNow: 'Llamar Ahora',
      chatNow: 'Chatear Ahora',
      emailNow: 'Enviar Correo',
      property: 'Consulta de Propiedad',
      team: 'Solicitud de Consulta',
      lifestyle: 'Solicitud de Información',
      close: 'Cerrar'
    }
  };

  const t = translations[language];

  // Zadarma API Integration
  const zadarmaConfig = {
    apiKey: 'a2aaea04d645d80e739c',
    apiSecret: '424a974e04f67227b466',
    whatsappNumber: '+526463402686',
    baseURL: 'https://api.auditdna.com/api/zadarma' // Your backend proxy
  };

  // Generate message based on context
  const generateMessage = () => {
    const baseMsg = language === 'en' 
      ? `${formData.name} - ${t[context]}\n\n${formData.message}\n\nContact: ${formData.phone}\nEmail: ${formData.email}\nPreferred: ${formData.preferredContact}`
      : `${formData.name} - ${t[context]}\n\n${formData.message}\n\nContacto: ${formData.phone}\nCorreo: ${formData.email}\nPreferido: ${formData.preferredContact}`;

    if (context === 'property' && data.title) {
      return `${baseMsg}\n\nPropiedad: ${data.title} - ${data.price}`;
    } else if (context === 'team' && data.name) {
      return `${baseMsg}\n\nAgente: ${data.name}`;
    } else if (context === 'lifestyle' && data.name) {
      return `${baseMsg}\n\nEstablecimiento: ${data.name}`;
    }
    return baseMsg;
  };

  // Instant Call via Zadarma
  const handleInstantCall = async () => {
    try {
      if (!formData.phone) {
        alert(language === 'en' ? 'Please enter your phone number' : 'Por favor ingresa tu número de teléfono');
        return;
      }

      setIsSubmitting(true);
      
      const response = await fetch(`${zadarmaConfig.baseURL}/instant-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.phone,
          from: zadarmaConfig.whatsappNumber,
          leadData: {
            name: formData.name,
            email: formData.email,
            message: generateMessage(),
            context: context,
            data: data,
            language: language,
            timestamp: new Date().toISOString()
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        alert(language === 'en' 
          ? 'Call initiated! You will receive a call shortly.' 
          : '¡Llamada iniciada! Recibirás una llamada en breve.');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Call error:', error);
      setSubmitStatus('error');
      alert(language === 'en' 
        ? 'Call failed. Please try WhatsApp instead.' 
        : 'Llamada fallida. Por favor intenta WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp Message
  const handleWhatsApp = () => {
    const message = generateMessage();
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5216463402686?text=${encodedMessage}`, '_blank');
    
    // Log to CRM
    logToCRM('whatsapp', message);
  };

  // Email
  const handleEmail = () => {
    const subject = language === 'en' 
      ? `${t[context]} - ${formData.name}` 
      : `${t[context]} - ${formData.name}`;
    const body = generateMessage();
    window.location.href = `mailto:saul@auditdna.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Log to CRM
    logToCRM('email', body);
  };

  // Submit Form (SMS + Lead Capture)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = generateMessage();

      // Send via Zadarma SMS
      const response = await fetch(`${zadarmaConfig.baseURL}/send-sms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: zadarmaConfig.whatsappNumber,
          message: message,
          leadData: {
            ...formData,
            context: context,
            data: data,
            timestamp: new Date().toISOString()
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        
        // Auto-contact based on preference
        setTimeout(() => {
          if (formData.preferredContact === 'whatsapp') {
            handleWhatsApp();
          } else if (formData.preferredContact === 'call') {
            handleInstantCall();
          } else {
            handleEmail();
          }
        }, 1000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Log to CRM Backend
  const logToCRM = async (method, message) => {
    try {
      await fetch(`${zadarmaConfig.baseURL}/log-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          method: method,
          message: message,
          context: context,
          data: data,
          timestamp: new Date().toISOString(),
          source: 'contact-card',
          language: language
        })
      });
    } catch (error) {
      console.error('CRM log error:', error);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #cba658, #b8944d)',
          border: 'none',
          borderRadius: '8px',
          color: '#0f172a',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(203, 166, 88, 0.3)',
          transition: 'all 0.3s'
        }}
      >
        <MessageCircle size={18} />
        {t.title}
      </button>

      {/* Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: '#0f172a',
            border: '2px solid #cba658',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            {/* Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid rgba(203, 166, 88, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#cba658', marginBottom: '4px', fontWeight: '600' }}>
                  {t.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {t.subtitle}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Quick Actions */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid rgba(203, 166, 88, 0.2)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px'
            }}>
              <button
                onClick={handleInstantCall}
                style={{
                  padding: '16px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '8px',
                  color: '#22c55e',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Phone size={20} />
                {t.instantCall}
              </button>

              <button
                onClick={handleWhatsApp}
                style={{
                  padding: '16px',
                  background: 'rgba(37, 211, 102, 0.1)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  borderRadius: '8px',
                  color: '#25d366',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={20} />
                {t.whatsapp}
              </button>

              <button
                onClick={handleEmail}
                style={{
                  padding: '16px',
                  background: 'rgba(203, 166, 88, 0.1)',
                  border: '1px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#cba658',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Mail size={20} />
                {t.email}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                    {t.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+52 646 340 2686"
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                {/* Preferred Contact */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                    {t.preferredContact}
                  </label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '14px'
                    }}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="call">{t.instantCall}</option>
                    <option value="email">{t.email}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                    {t.message}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '8px',
                    color: '#22c55e',
                    fontSize: '13px',
                    textAlign: 'center'
                  }}>
                    {t.success}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    color: '#ef4444',
                    fontSize: '13px',
                    textAlign: 'center'
                  }}>
                    {t.error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: isSubmitting 
                      ? 'rgba(203, 166, 88, 0.5)' 
                      : 'linear-gradient(135deg, #cba658, #b8944d)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#0f172a',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(203, 166, 88, 0.4)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #0f172a',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite'
                      }} />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t.submit}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default ContactCard;