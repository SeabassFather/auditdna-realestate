// PUBLIC PARTNER APPLICATION - /partner/register
// MLOs, Agents, Title Companies apply here (NO LOGIN REQUIRED)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PartnerRegister() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    partnerType: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    licenseNumber: '',
    licenseState: 'CA',
    yearsExperience: '',
    website: '',
    bio: '',
    referralSource: '',
    agreeToTerms: false
  });
  
  const [licenseFile, setLicenseFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const partnerTypes = [
    { value: 'mlo', label: 'Mortgage Loan Officer', prefix: 'MLO' },
    { value: 'agent', label: 'Real Estate Agent', prefix: 'AGENT' },
    { value: 'attorney', label: 'Attorney', prefix: 'ATTORNEY' },
    { value: 'insurance', label: 'Insurance Agent', prefix: 'INSURANCE' },
    { value: 'title', label: 'Title Company', prefix: 'TITLE' },
    { value: 'advisor', label: 'Financial Advisor', prefix: 'ADVISOR' },
    { value: 'industry', label: 'Industry Partner-Professional', prefix: 'INDUSTRY' },
    { value: 'affiliate', label: 'Affiliate/Other', prefix: 'AFFILIATE' }
  ];

  const states = ['CA', 'TX', 'FL', 'NY', 'AZ', 'NV', 'WA', 'OR', 'CO', 'UT'];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFile(file);
      if (errors.licenseFile) setErrors({ ...errors, licenseFile: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.partnerType) newErrors.partnerType = 'Partner type required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Name required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (formData.phone.length < 10) newErrors.phone = 'Valid phone required';
    if (!formData.company.trim()) newErrors.company = 'Company required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number required';
    if (!licenseFile) newErrors.licenseFile = 'License upload required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Must agree to terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      // In real app: POST /api/partners/apply with FormData
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`✅ Application submitted!\n\nThank you, ${formData.fullName}!\n\nWe'll review your application within 24-48 hours.\n\nYou'll receive an email at ${formData.email} with your referral code once approved.`);
      
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Application failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ ...glassText, fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '8px', letterSpacing: '2px' }}>
            Partner Application
          </h1>
          <p style={{ ...glassText, fontSize: '14px', color: '#94a3b8', letterSpacing: '1px' }}>
            Join the AuditDNA Partner Program
          </p>
          <p style={{ ...glassText, fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
            Earn 25% commission on every referral | Average: $1,200-$1,500 per client
          </p>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid rgba(148, 163, 184, 0.2)'
        }}>

          {/* PARTNER TYPE */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>
              PARTNER TYPE *
            </label>
            {partnerTypes.map(type => (
              <label key={type.value} style={{ display: 'flex', gap: '12px', marginBottom: '10px', cursor: 'pointer', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="partnerType"
                  value={type.value}
                  checked={formData.partnerType === type.value}
                  onChange={(e) => handleChange('partnerType', e.target.value)}
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{ ...glassText, fontSize: '13px' }}>{type.label}</span>
              </label>
            ))}
            {errors.partnerType && <p style={{ ...glassText, fontSize: '10px', color: '#ef4444', marginTop: '6px' }}>{errors.partnerType}</p>}
            {formData.partnerType === 'industry' && (
              <p style={{ ...glassText, fontSize: '10px', color: '#fbbf24', marginTop: '8px', padding: '8px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '4px' }}>
                ⚠️ Industry Partner-Professional requires valid professional license verification
              </p>
            )}
          </div>

          {/* NAME & EMAIL */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>FULL NAME *</label>
              <input type="text" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)}
                style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: errors.fullName ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              {errors.fullName && <p style={{ ...glassText, fontSize: '10px', color: '#ef4444', marginTop: '4px' }}>{errors.fullName}</p>}
            </div>
            <div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>EMAIL *</label>
              <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: errors.email ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              {errors.email && <p style={{ ...glassText, fontSize: '10px', color: '#ef4444', marginTop: '4px' }}>{errors.email}</p>}
            </div>
          </div>

          {/* PHONE & COMPANY */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>PHONE *</label>
              <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="(555) 123-4567"
                style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: errors.phone ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              {errors.phone && <p style={{ ...glassText, fontSize: '10px', color: '#ef4444', marginTop: '4px' }}>{errors.phone}</p>}
            </div>
            <div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>COMPANY *</label>
              <input type="text" value={formData.company} onChange={(e) => handleChange('company', e.target.value)} placeholder="ABC Mortgage Co."
                style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: errors.company ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              {errors.company && <p style={{ ...glassText, fontSize: '10px', color: '#ef4444', marginTop: '4px' }}>{errors.company}</p>}
            </div>
          </div>

          {/* LICENSE NUMBER & STATE */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>LICENSE NUMBER *</label>
              <input type="text" value={formData.licenseNumber} onChange={(e) => handleChange('licenseNumber', e.target.value)} placeholder="CA-DRE-01234567"
                style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: errors.licenseNumber ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              {errors.licenseNumber && <p style={{ ...glassText, fontSize: '10px', color: '#ef4444', marginTop: '4px' }}>{errors.licenseNumber}</p>}
            </div>
            <div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>STATE *</label>
              <select value={formData.licenseState} onChange={(e) => handleChange('licenseState', e.target.value)}
                style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}>
                {states.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>

          {/* LICENSE UPLOAD */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
              UPLOAD LICENSE/CREDENTIALS *
            </label>
            <p style={{ ...glassText, fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>
              Upload a copy of your professional license or credentials
            </p>
            <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload}
              style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: errors.licenseFile ? '1px solid #ef4444' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
            {licenseFile && <p style={{ ...glassText, fontSize: '10px', color: '#22c55e', marginTop: '6px' }}>✓ {licenseFile.name}</p>}
            {errors.licenseFile && <p style={{ ...glassText, fontSize: '10px', color: '#ef4444', marginTop: '4px' }}>{errors.licenseFile}</p>}
          </div>

          {/* YEARS EXPERIENCE & WEBSITE */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>YEARS EXPERIENCE</label>
              <input type="number" value={formData.yearsExperience} onChange={(e) => handleChange('yearsExperience', e.target.value)} placeholder="5"
                style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>WEBSITE (Optional)</label>
              <input type="url" value={formData.website} onChange={(e) => handleChange('website', e.target.value)} placeholder="https://yourcompany.com"
                style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* BIO */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ ...glassText, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
              BRIEF BIO (Optional)
            </label>
            <textarea value={formData.bio} onChange={(e) => handleChange('bio', e.target.value)} rows={4} placeholder="Tell us about your experience and why you'd like to join..."
              style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>

          {/* TERMS */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start' }}>
              <input type="checkbox" checked={formData.agreeToTerms} onChange={(e) => handleChange('agreeToTerms', e.target.checked)} style={{ marginTop: '3px', width: '16px', height: '16px' }} />
              <span style={{ ...glassText, fontSize: '11px', lineHeight: '1.6' }}>
                I agree to the Partner Terms of Service. I understand the commission structure (25% of collected fees) and payment terms (NET 30).
              </span>
            </label>
            {errors.agreeToTerms && <p style={{ ...glassText, fontSize: '10px', color: '#ef4444', marginTop: '6px' }}>{errors.agreeToTerms}</p>}
          </div>

          {/* SUBMIT */}
          {errors.submit && <p style={{ ...glassText, fontSize: '11px', color: '#ef4444', textAlign: 'center', marginBottom: '16px' }}>{errors.submit}</p>}

          <button onClick={handleSubmit} disabled={isSubmitting}
            style={{ width: '100%', padding: '16px', background: isSubmitting ? 'rgba(148, 163, 184, 0.2)' : 'linear-gradient(135deg, #cba658 0%, #b8944d 100%)', border: 'none', borderRadius: '6px', color: isSubmitting ? '#64748b' : '#0f172a', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginBottom: '16px' }}>
            {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION'}
          </button>

          <p style={{ ...glassText, fontSize: '11px', textAlign: 'center', color: '#64748b' }}>
            Already a partner? <span onClick={() => navigate('/partner/login')} style={{ color: '#cba658', cursor: 'pointer', textDecoration: 'underline' }}>Sign In</span>
          </p>
        </div>

        {/* BENEFITS */}
        <div style={{ marginTop: '40px', padding: '32px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px' }}>
          <h3 style={{ ...glassText, fontSize: '16px', color: '#cba658', marginBottom: '20px', letterSpacing: '2px' }}>
            PARTNER BENEFITS
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { icon: '💰', title: '25% Commission', desc: 'Earn on every referral' },
              { icon: '📊', title: 'Real-Time Dashboard', desc: 'Track your earnings' },
              { icon: '🎯', title: 'Marketing Materials', desc: 'Flyers, email templates' },
              { icon: '⚡', title: 'Fast Approval', desc: '24-48 hour review' }
            ].map((b, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{b.icon}</div>
                <p style={{ ...glassText, fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>{b.title}</p>
                <p style={{ ...glassText, fontSize: '11px', color: '#94a3b8' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PartnerRegister;