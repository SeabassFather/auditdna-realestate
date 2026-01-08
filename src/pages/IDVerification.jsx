import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IDVerification() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idType: 'INE',
    idNumber: '',
    userType: 'agent'
  });
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!idFront || !idBack) {
      alert('Please upload both sides of your ID');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/verification/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Submission failed');
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '600px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}></div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>Verification Submitted!</h2>
          <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '24px' }}>
            Please check your email to verify your address. Once verified, our team will review your ID within 24-48 hours.
          </p>
          <button onClick={() => navigate('/')} style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const s = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 24px' },
    card: { maxWidth: '800px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '40px' },
    title: { fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '12px', textAlign: 'center' },
    subtitle: { fontSize: '14px', color: '#94a3b8', marginBottom: '32px', textAlign: 'center' },
    label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' },
    input: { width: '100%', padding: '12px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px', marginBottom: '20px' },
    uploadBox: { padding: '32px', background: 'rgba(203, 166, 88, 0.1)', border: '2px dashed rgba(203, 166, 88, 0.5)', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', marginBottom: '16px' },
    btn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', marginTop: '24px' }
  };

  return (
    <div style={s.container}>
      <div style={s.card}>
        <h1 style={s.title}>ID Verification Required</h1>
        <p style={s.subtitle}>You must verify your identity before uploading properties</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={s.label}>I am a:</label>
            <select style={s.input} value={formData.userType} onChange={(e) => setFormData({...formData, userType: e.target.value})} required>
              <option value="agent">Real Estate Agent</option>
              <option value="fsbo">For Sale By Owner (FSBO)</option>
              <option value="developer">Developer</option>
            </select>
          </div>

          <div>
            <label style={s.label}>Full Name</label>
            <input type="text" style={s.input} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div>
            <label style={s.label}>Email</label>
            <input type="email" style={s.input} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>

          <div>
            <label style={s.label}>Phone</label>
            <input type="tel" style={s.input} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
          </div>

          <div>
            <label style={s.label}>ID Type</label>
            <select style={s.input} value={formData.idType} onChange={(e) => setFormData({...formData, idType: e.target.value})} required>
              <option value="INE">INE (Mexican ID)</option>
              <option value="Passport">Passport</option>
              <option value="Drivers License">Driver's License</option>
            </select>
          </div>

          <div>
            <label style={s.label}>ID Number</label>
            <input type="text" style={s.input} value={formData.idNumber} onChange={(e) => setFormData({...formData, idNumber: e.target.value})} required />
          </div>

          <div>
            <label style={s.label}>Upload ID (Front)</label>
            <label style={s.uploadBox} htmlFor="idFront">
              {idFront ? (
                <div>
                  <img src={URL.createObjectURL(idFront)} alt="ID Front" style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '12px' }} />
                  <div style={{ color: '#10b981', fontSize: '14px' }}>Front uploaded</div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '8px' }}></div>
                  <div style={{ fontSize: '14px', color: '#cbd5e1' }}>Click to upload ID front</div>
                </>
              )}
              <input id="idFront" type="file" accept="image/*" onChange={(e) => setIdFront(e.target.files[0])} style={{ display: 'none' }} />
            </label>
          </div>

          <div>
            <label style={s.label}>Upload ID (Back)</label>
            <label style={s.uploadBox} htmlFor="idBack">
              {idBack ? (
                <div>
                  <img src={URL.createObjectURL(idBack)} alt="ID Back" style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '12px' }} />
                  <div style={{ color: '#10b981', fontSize: '14px' }}>Back uploaded</div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '8px' }}></div>
                  <div style={{ fontSize: '14px', color: '#cbd5e1' }}>Click to upload ID back</div>
                </>
              )}
              <input id="idBack" type="file" accept="image/*" onChange={(e) => setIdBack(e.target.files[0])} style={{ display: 'none' }} />
            </label>
          </div>

          <button type="submit" style={s.btn}>Submit for Verification</button>
        </form>
      </div>
    </div>
  );
}