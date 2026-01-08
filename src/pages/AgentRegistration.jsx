import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgentRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    ineNumber: ''
  });
  const [inePhoto, setInePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const handleIneUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setError('File size must be under 5MB');
        return;
      }
      setInePhoto({
        file,
        url: URL.createObjectURL(file)
      });
      setError('');
    }
  };

  const generateCredentials = (email) => {
    const password = 'Agent' + Math.floor(Math.random() * 10000) + '!';
    return { email, password };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inePhoto) {
      setError('INE (Mexican ID) photo is required');
      return;
    }

    if (formData.ineNumber.length !== 18) {
      setError('INE number must be exactly 18 characters');
      return;
    }

    setLoading(true);
    setError('');

    // Save agent registration
    const agents = JSON.parse(localStorage.getItem('registered_agents') || '[]');
    
    // Check if already registered
    if (agents.some(a => a.email === formData.email || a.ineNumber === formData.ineNumber)) {
      setError('Agent already registered with this email or INE number');
      setLoading(false);
      return;
    }

    const creds = generateCredentials(formData.email);
    
    const newAgent = {
      ...formData,
      inePhotoUrl: inePhoto.url,
      credentials: creds,
      registeredAt: new Date().toISOString(),
      status: 'pending',
      id: 'agent-' + Date.now()
    };

    agents.push(newAgent);
    localStorage.setItem('registered_agents', JSON.stringify(agents));

    setSuccess(true);
    setCredentials(creds);
    setLoading(false);
  };

  if (success && credentials) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '600px', width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>CHECK</div>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', marginBottom: '16px' }}>Registration Successful!</h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '32px' }}>
            Your agent account is pending approval. Save your credentials below.
          </p>
          
          <div style={{ background: 'rgba(203, 166, 88, 0.1)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cba658', marginBottom: '20px' }}>Your Login Credentials</h3>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>Email:</div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#f1f5f9', padding: '12px', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '8px' }}>{credentials.email}</div>
            </div>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>Password:</div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#f1f5f9', padding: '12px', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '8px' }}>{credentials.password}</div>
            </div>
          </div>

          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444', borderRadius: '12px', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#ef4444', marginBottom: '8px' }}>
              IMPORTANT - READ CAREFULLY
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', textAlign: 'left' }}>
              - Save these credentials immediately<br/>
              - Passwords CANNOT be reset<br/>
              - If you lose your password, you must re-register with your INE<br/>
              - Your account requires admin approval before you can upload properties
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            style={{ padding: '16px 48px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer' }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '300', color: '#cba658', marginBottom: '12px' }}>Agent Registration</h1>
          <p style={{ fontSize: '16px', color: '#94a3b8' }}>Register to list properties - INE verification required</p>
        </div>

        {error && (
          <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444', borderRadius: '12px', color: '#ef4444', marginBottom: '24px', fontSize: '14px', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '40px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cba658', marginBottom: '24px' }}>Contact Information</h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Real Estate License Number *
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                required
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
              />
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '40px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cba658', marginBottom: '24px' }}>INE Verification (Mexican ID)</h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                INE Number (18 characters) *
              </label>
              <input
                type="text"
                value={formData.ineNumber}
                onChange={(e) => setFormData({ ...formData, ineNumber: e.target.value.toUpperCase() })}
                required
                maxLength="18"
                style={{ width: '100%', padding: '14px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px', letterSpacing: '2px', fontFamily: 'monospace' }}
                placeholder="ABCD123456EFGH7890"
              />
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                {formData.ineNumber.length}/18 characters
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Upload INE Photo *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleIneUpload}
                required
                style={{ display: 'none' }}
                id="ine-upload"
              />
              <label
                htmlFor="ine-upload"
                style={{
                  display: 'block',
                  padding: '40px',
                  background: inePhoto ? 'rgba(203, 166, 88, 0.1)' : 'rgba(30, 41, 59, 0.4)',
                  border: '3px dashed rgba(203, 166, 88, 0.3)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                {inePhoto ? (
                  <div>
                    <img src={inePhoto.url} alt="INE" style={{ maxWidth: '400px', maxHeight: '250px', borderRadius: '8px', marginBottom: '16px' }} />
                    <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>INE Uploaded</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>ID</div>
                    <div style={{ fontSize: '16px', color: '#f1f5f9', marginBottom: '8px' }}>Click to upload INE photo</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>Max file size: 5MB</div>
                  </div>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '20px',
              background: loading ? '#64748b' : 'linear-gradient(135deg, #cba658, #b8944d)',
              color: '#0f172a',
              border: 'none',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(203, 166, 88, 0.4)'
            }}
          >
            {loading ? 'Registering...' : 'Register as Agent'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            style={{ padding: '12px 24px', background: 'transparent', color: '#cba658', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
          >
            Already registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}