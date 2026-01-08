import React, { useState } from 'react';

export default function MexicoAgentRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    ineNumber: '',
    licenseNumber: '',
    commissionRate: '3',
    territoryCovered: []
  });

  const [ineFile, setIneFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);

  const territories = [
    'Baja California', 'Baja California Sur', 'Quintana Roo',
    'Jalisco', 'Nayarit', 'Guanajuato', 'Sonora', 'Chihuahua'
  ];

  const handleINEUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setIneFile(file);
    } else {
      alert('File must be under 10MB');
    }
  };

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setLicenseFile(file);
    } else {
      alert('File must be under 10MB');
    }
  };

  const handleTerritoryToggle = (territory) => {
    if (formData.territoryCovered.includes(territory)) {
      setFormData({
        ...formData,
        territoryCovered: formData.territoryCovered.filter(t => t !== territory)
      });
    } else {
      setFormData({
        ...formData,
        territoryCovered: [...formData.territoryCovered, territory]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ineFile) {
      alert('INE/IFE upload is required');
      return;
    }

    if (formData.territoryCovered.length === 0) {
      alert('Please select at least one territory');
      return;
    }

    const agent = {
      ...formData,
      id: Date.now(),
      ineFile: ineFile.name,
      licenseFile: licenseFile?.name || null,
      status: 'pending_verification',
      submittedAt: new Date().toISOString()
    };

    // Save to pending agents
    const pending = JSON.parse(localStorage.getItem('pending_mexico_agents') || '[]');
    pending.push(agent);
    localStorage.setItem('pending_mexico_agents', JSON.stringify(pending));

    alert('Registration submitted! You will be notified once your INE is verified.');

    // Reset form
    setFormData({
      fullName: '', email: '', phone: '', company: '',
      ineNumber: '', licenseNumber: '', commissionRate: '3',
      territoryCovered: []
    });
    setIneFile(null);
    setLicenseFile(null);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>
        Mexico Real Estate Agent Registration
      </h2>
      <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '32px' }}>
        INE verification required to list properties
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(203, 166, 88, 0.3)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
            Personal Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Full Name (as on INE) *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
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
                placeholder="+52 xxx xxx xxxx"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Company/Agency *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(203, 166, 88, 0.3)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
            Verification Documents
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#cba658', marginBottom: '12px' }}>
              INE/IFE (Mexican ID) * - REQUIRED
            </label>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px' }}>
              Upload clear photo of both sides of your INE
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleINEUpload}
              required
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '2px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '14px'
              }}
            />
            {ineFile && (
              <div style={{ marginTop: '12px', fontSize: '14px', color: '#10b981' }}>
                ✓ {ineFile.name} uploaded
              </div>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#cbd5e1', marginBottom: '12px' }}>
              INE Number *
            </label>
            <input
              type="text"
              value={formData.ineNumber}
              onChange={(e) => setFormData({ ...formData, ineNumber: e.target.value })}
              required
              placeholder="13-digit INE number"
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '2px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#cbd5e1', marginBottom: '12px' }}>
              Real Estate License (Optional)
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleLicenseUpload}
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '2px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '14px'
              }}
            />
            {licenseFile && (
              <div style={{ marginTop: '12px', fontSize: '14px', color: '#10b981' }}>
                ✓ {licenseFile.name} uploaded
              </div>
            )}
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(203, 166, 88, 0.3)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
            Commission & Territory
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#cbd5e1', marginBottom: '12px' }}>
              Standard Commission Rate * (%)
            </label>
            <select
              value={formData.commissionRate}
              onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '2px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '16px'
              }}
            >
              <option value="2">2%</option>
              <option value="2.5">2.5%</option>
              <option value="3">3%</option>
              <option value="3.5">3.5%</option>
              <option value="4">4%</option>
              <option value="5">5%</option>
              <option value="6">6%</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#cbd5e1', marginBottom: '12px' }}>
              Territory Covered * (Select all that apply)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {territories.map((territory, idx) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.territoryCovered.includes(territory)}
                    onChange={() => handleTerritoryToggle(territory)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontSize: '15px', color: '#cbd5e1' }}>{territory}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(251, 191, 36, 0.1)',
          border: '2px solid #fbbf24',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px'
        }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#fbbf24', marginBottom: '8px' }}>
            ⚠️ Verification Process
          </div>
          <ul style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '20px', margin: '0' }}>
            <li>Admin will verify your INE within 24-48 hours</li>
            <li>You will receive email confirmation once approved</li>
            <li>Approved agents can list unlimited properties</li>
            <li>All listings subject to admin review</li>
            <li>Commission shown to potential buyers on all listings</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={!ineFile}
          style={{
            width: '100%',
            padding: '18px',
            background: ineFile ? 'linear-gradient(135deg, #cba658, #b8944d)' : '#334155',
            color: ineFile ? '#0f172a' : '#64748b',
            border: 'none',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: '700',
            cursor: ineFile ? 'pointer' : 'not-allowed',
            boxShadow: ineFile ? '0 8px 20px rgba(203, 166, 88, 0.5)' : 'none'
          }}
        >
          {!ineFile ? 'Upload INE to Continue' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );
}