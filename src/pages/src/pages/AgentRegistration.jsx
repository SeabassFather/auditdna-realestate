import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function AgentRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', whatsapp: '',
    ine: '', password: '', confirmPassword: '', licenseNumber: '',
    ineFile: null, photoFile: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (field, file) => {
    if (file && file.size > 5000000) {
      setError('File size must be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, [field]: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.ineFile) {
      setError('INE document is required');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.register({
        ...formData,
        password: btoa(formData.password)
      });
      alert(result.message);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#f1f5f9', marginBottom: '8px' }}>Agent Registration</h1>
          <p style={{ fontSize: '16px', color: '#94a3b8' }}>Join AuditDNA Real Estate Platform</p>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '12px', padding: '32px' }}>
          {error && (
            <div style={{
              padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px', color: '#fca5a5', marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>First Name*</label>
                <input required value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>Last Name*</label>
                <input required value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>Email*</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>Phone*</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>INE Number* (18 characters)</label>
              <input required value={formData.ine} onChange={(e) => setFormData(prev => ({ ...prev, ine: e.target.value }))}
                maxLength={18} placeholder="ABCD123456HEFGHI01"
                style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{formData.ine.length}/18 characters</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>Upload INE*</label>
              <input type="file" required accept="image/*,.pdf" onChange={(e) => handleFileChange('ineFile', e.target.files[0])}
                style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>Password*</label>
                <input type="password" required value={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  minLength={8} style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>Confirm Password*</label>
                <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
              color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1
            }}>
              {loading ? 'Submitting...' : 'Register as Agent'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#94a3b8' }}>
              Already registered? <span onClick={() => navigate('/login')} style={{ color: '#60a5fa', cursor: 'pointer', fontWeight: '600' }}>Login here</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}