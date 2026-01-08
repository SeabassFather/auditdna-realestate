import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import zadarmaService from '../../services/zadarmaService';

export default function PremiumContactCard({ variant = 'default' }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '',
    preferredContact: 'whatsapp', preferredTime: 'morning',
    propertyInterest: '', budgetRange: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to Zadarma CRM
      await zadarmaService.notifyNewLead(formData);

      // Save to localStorage CRM
      const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
      leads.push({ ...formData, timestamp: new Date().toISOString(), status: 'new', language });
      localStorage.setItem('crm_leads', JSON.stringify(leads));

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', preferredContact: 'whatsapp', preferredTime: 'morning', propertyInterest: '', budgetRange: '' });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert(t('error'));
    }

    setLoading(false);
  };

  const handleInstantCall = async () => {
    if (!formData.phone) {
      alert(language === 'en' ? 'Please enter your phone number' : 'Por favor ingresa tu número de teléfono');
      return;
    }
    setLoading(true);
    await zadarmaService.makeInstantCall(formData.phone);
    alert(language === 'en' ? 'We are calling you now!' : '¡Te estamos llamando ahora!');
    setLoading(false);
  };

  const styles = {
    card: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      border: '2px solid rgba(203, 166, 88, 0.3)',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #cba658, #f5d372)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '14px',
      color: '#94a3b8',
      textAlign: 'center',
      marginBottom: '24px'
    },
    input: {
      width: '100%',
      padding: '14px',
      background: 'rgba(30, 41, 59, 0.8)',
      border: '2px solid rgba(203, 166, 88, 0.2)',
      borderRadius: '8px',
      color: '#f1f5f9',
      fontSize: '14px',
      marginBottom: '16px',
      transition: 'all 0.3s'
    },
    select: {
      width: '100%',
      padding: '14px',
      background: 'rgba(30, 41, 59, 0.8)',
      border: '2px solid rgba(203, 166, 88, 0.2)',
      borderRadius: '8px',
      color: '#f1f5f9',
      fontSize: '14px',
      marginBottom: '16px'
    },
    textarea: {
      width: '100%',
      padding: '14px',
      background: 'rgba(30, 41, 59, 0.8)',
      border: '2px solid rgba(203, 166, 88, 0.2)',
      borderRadius: '8px',
      color: '#f1f5f9',
      fontSize: '14px',
      marginBottom: '16px',
      minHeight: '100px',
      resize: 'vertical'
    },
    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginTop: '24px'
    },
    primaryBtn: {
      padding: '16px',
      background: 'linear-gradient(135deg, #cba658, #b8944d)',
      color: '#0f172a',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s',
      gridColumn: '1 / -1'
    },
    secondaryBtn: {
      padding: '14px',
      background: 'linear-gradient(135deg, #25D366, #128C7E)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    callBtn: {
      padding: '14px',
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    successMsg: {
      padding: '16px',
      background: 'rgba(16, 185, 129, 0.1)',
      border: '2px solid #10b981',
      borderRadius: '8px',
      color: '#10b981',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '16px'
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{t('contactTitle')}</h2>
      <p style={styles.subtitle}>{t('contactSubtitle')}</p>

      {success && <div style={styles.successMsg}>✓ {t('success')}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('fullName')}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={styles.input}
          required
          onFocus={(e) => e.target.style.borderColor = '#cba658'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(203, 166, 88, 0.2)'}
        />

        <input
          type="email"
          placeholder={t('email')}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={styles.input}
          required
          onFocus={(e) => e.target.style.borderColor = '#cba658'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(203, 166, 88, 0.2)'}
        />

        <input
          type="tel"
          placeholder={t('phone')}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#cba658'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(203, 166, 88, 0.2)'}
        />

        <select
          value={formData.preferredContact}
          onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
          style={styles.select}
        >
          <option value="whatsapp">{t('whatsappContact')}</option>
          <option value="phone">{t('phoneContact')}</option>
          <option value="email">{t('emailContact')}</option>
          <option value="video">{t('videoCall')}</option>
        </select>

        <select
          value={formData.preferredTime}
          onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
          style={styles.select}
        >
          <option value="morning">{t('morning')}</option>
          <option value="afternoon">{t('afternoon')}</option>
          <option value="evening">{t('evening')}</option>
        </select>

        <input
          type="text"
          placeholder={t('propertyInterest')}
          value={formData.propertyInterest}
          onChange={(e) => setFormData({...formData, propertyInterest: e.target.value})}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#cba658'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(203, 166, 88, 0.2)'}
        />

        <input
          type="text"
          placeholder={t('budgetRange')}
          value={formData.budgetRange}
          onChange={(e) => setFormData({...formData, budgetRange: e.target.value})}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#cba658'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(203, 166, 88, 0.2)'}
        />

        <textarea
          placeholder={t('message')}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          style={styles.textarea}
          required
          onFocus={(e) => e.target.style.borderColor = '#cba658'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(203, 166, 88, 0.2)'}
        />

        <div style={styles.buttonGrid}>
          <button type="button" onClick={handleInstantCall} style={styles.callBtn} disabled={loading}>
            📞 {t('callMe')}
          </button>
          <button type="button" onClick={() => window.open(`https://wa.me/526463402686`, '_blank')} style={styles.secondaryBtn}>
            💬 {t('whatsapp')}
          </button>
        </div>

        <button type="submit" style={styles.primaryBtn} disabled={loading}>
          {loading ? t('submitting') : t('submit')}
        </button>
      </form>
    </div>
  );
}