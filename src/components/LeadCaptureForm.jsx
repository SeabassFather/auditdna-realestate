import React, { useState } from 'react';

const LeadCaptureForm = ({ source = 'website', onSuccess = () => {}, variant = 'full' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const language = 'en';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const lead = { id: 'LEAD_' + Date.now(), ...formData, source: source, status: 'new', createdAt: new Date().toISOString() };
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    leads.push(lead);
    localStorage.setItem('crm_leads', JSON.stringify(leads));
    setIsSuccess(true);
    onSuccess(lead);
    setTimeout(() => { setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' }); setIsSuccess(false); }, 3000);
    setIsSubmitting(false);
  };

  const inputStyle = { width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '16px', borderRadius: '4px' };
  const buttonStyle = { width: '100%', padding: '16px', background: 'rgba(203, 166, 88, 0.2)', border: '1px solid rgba(203, 166, 88, 0.5)', color: '#cba658', fontSize: '12px', letterSpacing: '3px', cursor: 'pointer' };

  if (isSuccess) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h3 style={{ color: '#cba658' }}>{language === 'en' ? 'THANK YOU!' : 'GRACIAS!'}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: variant === 'compact' ? '1fr' : '1fr 1fr', gap: '16px' }}>
        <input type="text" placeholder={(language === 'en' ? 'First Name' : 'Nombre') + ' *'} value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} style={inputStyle} required />
        <input type="text" placeholder={(language === 'en' ? 'Last Name' : 'Apellido') + ' *'} value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} style={inputStyle} required />
      </div>
      <input type="email" placeholder={(language === 'en' ? 'Email' : 'Correo') + ' *'} value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} style={inputStyle} required />
      <input type="tel" placeholder={language === 'en' ? 'Phone' : 'Telefono'} value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} style={inputStyle} />
      {variant === 'full' && (
        <textarea placeholder={language === 'en' ? 'Message' : 'Mensaje'} value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} style={{ ...inputStyle, minHeight: '100px' }} />
      )}
      <button type="submit" style={buttonStyle} disabled={isSubmitting}>{isSubmitting ? '...' : (language === 'en' ? 'GET IN TOUCH' : 'CONTACTANOS')}</button>
    </form>
  );
};

export default LeadCaptureForm;