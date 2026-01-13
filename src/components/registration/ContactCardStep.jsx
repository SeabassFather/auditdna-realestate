import React, { useState } from 'react';

const ContactCardStep = ({ data, onUpdate, onNext }) => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => phone.replace(/\D/g, '').length >= 10;

  const handleChange = (field, value) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    
    if (!data.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!data.email?.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(data.email)) newErrors.email = 'Invalid email format';
    if (!data.phone?.trim()) newErrors.phone = 'Phone is required';
    else if (!validatePhone(data.phone)) newErrors.phone = 'Invalid phone number';
    if (!data.country) newErrors.country = 'Please select your country';
    if (!data.newsletterConsent) newErrors.newsletterConsent = 'Newsletter consent is required';
    if (!data.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '4px',
    color: '#e2e8f0',
    fontSize: '14px',
    outline: 'none',
    marginBottom: '4px',
    boxSizing: 'border-box'
  };

  const errorInputStyle = {
    ...inputStyle,
    border: '1px solid rgba(248, 113, 113, 0.5)'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '2px',
    color: 'rgba(148, 163, 184, 0.7)',
    marginBottom: '8px',
    textTransform: 'uppercase'
  };

  const errorStyle = {
    fontSize: '11px',
    color: '#f87171',
    marginBottom: '12px',
    marginTop: '4px'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '16px',
    cursor: 'pointer'
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    minWidth: '20px',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.3)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: '2px'
  };

  const checkboxCheckedStyle = {
    ...checkboxStyle,
    background: 'rgba(203, 166, 88, 0.3)',
    border: '1px solid #cba658'
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>📋</div>
        <h2 style={{ fontSize: '18px', fontWeight: '200', letterSpacing: '4px', color: '#cba658', marginBottom: '8px' }}>
          CONTACT INFORMATION
        </h2>
        <p style={{ fontSize: '12px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px' }}>
          Please provide your contact details
        </p>
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Full Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Full Name *</label>
          <input
            type="text"
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Juan Garcia Martinez"
            style={errors.fullName ? errorInputStyle : inputStyle}
          />
          {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Email Address *</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="juan@email.com"
            style={errors.email ? errorInputStyle : inputStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Phone Number *</label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+52 664 123 4567"
            style={errors.phone ? errorInputStyle : inputStyle}
          />
          {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
        </div>

        {/* Country */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Country *</label>
          <select
            value={data.country || ''}
            onChange={(e) => handleChange('country', e.target.value)}
            style={errors.country ? errorInputStyle : inputStyle}
          >
            <option value="">Select your country</option>
            <option value="Mexico">Mexico</option>
            <option value="USA">United States</option>
            <option value="Canada">Canada</option>
            <option value="Other">Other</option>
          </select>
          {errors.country && <div style={errorStyle}>{errors.country}</div>}
        </div>

        {/* Newsletter Consent */}
        <div 
          style={checkboxContainerStyle}
          onClick={() => handleChange('newsletterConsent', !data.newsletterConsent)}
        >
          <div style={data.newsletterConsent ? checkboxCheckedStyle : checkboxStyle}>
            {data.newsletterConsent && <span style={{ color: '#cba658', fontSize: '14px' }}>✓</span>}
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#e2e8f0' }}>
              I agree to receive the monthly newsletter and important platform updates *
            </span>
            <p style={{ fontSize: '11px', color: 'rgba(148, 163, 184, 0.5)', marginTop: '4px' }}>
              Includes: Events, restaurants, hotels, activities, and exclusive offers in Baja California
            </p>
          </div>
        </div>
        {errors.newsletterConsent && <div style={{ ...errorStyle, marginTop: '-8px' }}>{errors.newsletterConsent}</div>}

        {/* Terms Acceptance */}
        <div 
          style={checkboxContainerStyle}
          onClick={() => handleChange('termsAccepted', !data.termsAccepted)}
        >
          <div style={data.termsAccepted ? checkboxCheckedStyle : checkboxStyle}>
            {data.termsAccepted && <span style={{ color: '#cba658', fontSize: '14px' }}>✓</span>}
          </div>
          <span style={{ fontSize: '13px', color: '#e2e8f0' }}>
            I agree to the <span style={{ color: '#cba658', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: '#cba658', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span> *
          </span>
        </div>
        {errors.termsAccepted && <div style={{ ...errorStyle, marginTop: '-8px' }}>{errors.termsAccepted}</div>}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '16px',
            background: 'rgba(203, 166, 88, 0.2)',
            border: '1px solid rgba(203, 166, 88, 0.5)',
            color: '#cba658',
            fontSize: '12px',
            letterSpacing: '3px',
            cursor: 'pointer',
            marginTop: '24px',
            fontFamily: '"Helvetica Neue", sans-serif'
          }}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
};

export default ContactCardStep;