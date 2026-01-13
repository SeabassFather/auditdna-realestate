import React, { useState } from 'react';

const ProfessionalStep = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  // RFC validation (Mexico Tax ID)
  const validateRFC = (rfc) => {
    if (!rfc) return { valid: false, error: 'RFC is required for real estate professionals' };
    const cleanRFC = rfc.replace(/\s/g, '').toUpperCase();
    const individualPattern = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
    const companyPattern = /^[A-Z]{3}\d{6}[A-Z0-9]{3}$/;
    
    if (individualPattern.test(cleanRFC) || companyPattern.test(cleanRFC)) {
      return { valid: true, formatted: cleanRFC };
    }
    return { valid: false, error: 'Invalid RFC format (12-13 characters)' };
  };

  const handleChange = (field, value) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = () => {
    // If not a real estate agent, skip validation
    if (!data.isRealEstateAgent) {
      onNext();
      return;
    }

    const newErrors = {};

    // Validate RFC
    const rfcResult = validateRFC(data.rfc);
    if (!rfcResult.valid) {
      newErrors.rfc = rfcResult.error;
    } else {
      // Update with formatted RFC
      onUpdate({ ...data, rfc: rfcResult.formatted });
    }

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

  const optionButtonStyle = (selected) => ({
    flex: 1,
    padding: '20px',
    background: selected ? 'rgba(203, 166, 88, 0.2)' : 'rgba(30, 41, 59, 0.5)',
    border: selected ? '2px solid #cba658' : '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  });

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏢</div>
        <h2 style={{ fontSize: '18px', fontWeight: '200', letterSpacing: '4px', color: '#cba658', marginBottom: '8px' }}>
          PROFESSIONAL INFORMATION
        </h2>
        <p style={{ fontSize: '12px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px' }}>
          Are you a real estate professional?
        </p>
      </div>

      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        {/* Professional Type Selection */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <div
            style={optionButtonStyle(data.isRealEstateAgent === true)}
            onClick={() => handleChange('isRealEstateAgent', true)}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏠</div>
            <div style={{ color: data.isRealEstateAgent === true ? '#cba658' : '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>
              Yes, I'm an Agent
            </div>
            <div style={{ color: 'rgba(148, 163, 184, 0.5)', fontSize: '11px', marginTop: '4px' }}>
              Licensed professional
            </div>
          </div>
          <div
            style={optionButtonStyle(data.isRealEstateAgent === false)}
            onClick={() => handleChange('isRealEstateAgent', false)}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>👤</div>
            <div style={{ color: data.isRealEstateAgent === false ? '#cba658' : '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>
              No, I'm a Consumer
            </div>
            <div style={{ color: 'rgba(148, 163, 184, 0.5)', fontSize: '11px', marginTop: '4px' }}>
              Looking to buy/sell
            </div>
          </div>
        </div>

        {/* Professional Fields (only if agent) */}
        {data.isRealEstateAgent && (
          <div style={{ 
            background: 'rgba(30, 41, 59, 0.3)', 
            border: '1px solid rgba(203, 166, 88, 0.2)', 
            borderRadius: '8px', 
            padding: '24px',
            marginBottom: '24px'
          }}>
            <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#cba658', marginBottom: '20px' }}>
              PROFESSIONAL DETAILS
            </p>

            {/* RFC */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>RFC (Mexico Tax ID) *</label>
              <input
                type="text"
                value={data.rfc || ''}
                onChange={(e) => handleChange('rfc', e.target.value.toUpperCase())}
                placeholder="GAJM850101ABC"
                maxLength={13}
                style={errors.rfc ? errorInputStyle : inputStyle}
              />
              {errors.rfc && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>{errors.rfc}</div>}
              <p style={{ fontSize: '10px', color: 'rgba(148, 163, 184, 0.4)', marginTop: '4px' }}>
                12-13 alphanumeric characters
              </p>
            </div>

            {/* License Number */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Real Estate License Number</label>
              <input
                type="text"
                value={data.licenseNumber || ''}
                onChange={(e) => handleChange('licenseNumber', e.target.value)}
                placeholder="RE-BC-12345"
                style={inputStyle}
              />
            </div>

            {/* Brokerage Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Brokerage / Company Name</label>
              <input
                type="text"
                value={data.brokerageName || ''}
                onChange={(e) => handleChange('brokerageName', e.target.value)}
                placeholder="Baja Premium Realty"
                style={inputStyle}
              />
            </div>

            {/* Years Experience */}
            <div>
              <label style={labelStyle}>Years of Experience</label>
              <select
                value={data.yearsExperience || ''}
                onChange={(e) => handleChange('yearsExperience', e.target.value)}
                style={inputStyle}
              >
                <option value="">Select experience</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
          </div>
        )}

        {/* Consumer Message */}
        {data.isRealEstateAgent === false && (
          <div style={{ 
            background: 'rgba(30, 41, 59, 0.3)', 
            border: '1px solid rgba(148, 163, 184, 0.1)', 
            borderRadius: '8px', 
            padding: '24px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>✨</div>
            <p style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '8px' }}>
              Welcome to EnjoyBaja!
            </p>
            <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '12px' }}>
              As a registered user, you'll have access to browse properties and connect with verified agents.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '16px',
              background: 'transparent',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              color: 'rgba(148, 163, 184, 0.7)',
              fontSize: '12px',
              letterSpacing: '3px',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            ← BACK
          </button>
          <button
            onClick={handleSubmit}
            disabled={data.isRealEstateAgent === undefined}
            style={{
              flex: 1,
              padding: '16px',
              background: data.isRealEstateAgent !== undefined ? 'rgba(203, 166, 88, 0.2)' : 'rgba(30, 41, 59, 0.5)',
              border: data.isRealEstateAgent !== undefined ? '1px solid rgba(203, 166, 88, 0.5)' : '1px solid rgba(148, 163, 184, 0.2)',
              color: data.isRealEstateAgent !== undefined ? '#cba658' : 'rgba(148, 163, 184, 0.4)',
              fontSize: '12px',
              letterSpacing: '3px',
              cursor: data.isRealEstateAgent !== undefined ? 'pointer' : 'not-allowed',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            SUBMIT →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalStep;