import React, { useState } from 'react';

export default function AgentVetting({ onVerified }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ineNumber: '',
    entity: '',
    whatsapp: '',
    email: '',
    role: 'agent',
    region: '',
    state: ''
  });

  const [uploads, setUploads] = useState({
    ineFront: null,
    ineBack: null,
    businessCard: null
  });

  const [status, setStatus] = useState('pending');
  const [errors, setErrors] = useState([]);

  const handleFileUpload = (field, file) => {
    if (file.size > 5000000) {
      setErrors([...errors, `${field} file too large (max 5MB)`]);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setErrors([...errors, `${field} must be JPG, PNG, or PDF`]);
      return;
    }

    setUploads({ ...uploads, [field]: file });
    setErrors(errors.filter(e => !e.includes(field)));
  };

  const validateINE = (ineNumber) => {
    // Real INE validation pattern
    const inePattern = /^[A-Z]{6}[0-9]{8}[HM][A-Z]{5}[0-9]{2}$/;
    return inePattern.test(ineNumber.toUpperCase().replace(/\s/g, ''));
  };

  const validateWhatsApp = (number) => {
    // Mexico phone number validation
    const phonePattern = /^(\+52|52)?[0-9]{10}$/;
    return phonePattern.test(number.replace(/[\s\-\(\)]/g, ''));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Validation
    const newErrors = [];

    if (!formData.firstName || !formData.lastName) {
      newErrors.push('Full name required');
    }

    if (!validateINE(formData.ineNumber)) {
      newErrors.push('Invalid INE number format');
    }

    if (!validateWhatsApp(formData.whatsapp)) {
      newErrors.push('Invalid WhatsApp number (Mexico format required)');
    }

    if (!validateEmail(formData.email)) {
      newErrors.push('Invalid email address');
    }

    if (!uploads.ineFront || !uploads.ineBack) {
      newErrors.push('INE front and back required');
    }

    if (!uploads.businessCard) {
      newErrors.push('Business card required');
    }

    if (!formData.entity) {
      newErrors.push('Real estate entity name required');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('submitting');

    // Submit for verification
    try {
      const vettingData = {
        ...formData,
        uploads: {
          ineFront: await fileToBase64(uploads.ineFront),
          ineBack: await fileToBase64(uploads.ineBack),
          businessCard: await fileToBase64(uploads.businessCard)
        },
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ipAddress: await fetch('https://api.ipify.org?format=json').then(r => r.json()).then(d => d.ip).catch(() => 'unknown')
      };

      // Hash for integrity
      vettingData.hash = await generateHash(JSON.stringify(vettingData));

      // Store locally (real implementation would POST to backend)
      localStorage.setItem('auditdna_vetting_submission', JSON.stringify(vettingData));
      
      setStatus('submitted');
      
      // Simulate verification delay
      setTimeout(() => {
        setStatus('verified');
        const credentials = {
          username: formData.email,
          userID: generateUserID(),
          role: formData.role,
          verified: true,
          verificationDate: new Date().toISOString()
        };
        onVerified(credentials);
      }, 2000);

    } catch (error) {
      setErrors(['Submission failed. Please try again.']);
      setStatus('pending');
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const generateHash = async (data) => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateUserID = () => {
    return 'USR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  if (status === 'verified') {
    return (
      <div style={styles.successCard}>
        <div style={styles.successIcon}>âœ“</div>
        <h2 style={styles.successTitle}>Verification Complete</h2>
        <p>Your account has been approved. Redirecting...</p>
      </div>
    );
  }

  if (status === 'submitted') {
    return (
      <div style={styles.pendingCard}>
        <div style={styles.spinner}></div>
        <h2>Verifying Credentials</h2>
        <p>Please wait while we verify your information...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Agent Verification Required</h1>
          <p style={styles.subtitle}>Complete verification to access the platform</p>
        </div>

        {errors.length > 0 && (
          <div style={styles.errors}>
            {errors.map((error, i) => (
              <div key={i} style={styles.error}>âš ï¸ {error}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <div style={styles.row}>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
                style={styles.input}
                required
              />
            </div>
            <input
              type="text"
              placeholder="INE Number (18 characters)"
              value={formData.ineNumber}
              onChange={e => setFormData({...formData, ineNumber: e.target.value})}
              style={styles.input}
              maxLength="18"
              required
            />
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Information</h3>
            <input
              type="tel"
              placeholder="WhatsApp Number (+52 ...)"
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Professional Information</h3>
            <select
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
              style={styles.select}
              required
            >
              <option value="agent">Real Estate Agent</option>
              <option value="broker">Broker</option>
              <option value="developer">Developer</option>
              <option value="appraiser">Appraiser</option>
            </select>
            <input
              type="text"
              placeholder="Real Estate Entity/Company Name"
              value={formData.entity}
              onChange={e => setFormData({...formData, entity: e.target.value})}
              style={styles.input}
              required
            />
            <div style={styles.row}>
              <select
                value={formData.state}
                onChange={e => setFormData({...formData, state: e.target.value})}
                style={styles.select}
                required
              >
                <option value="">Select State</option>
                <option value="BCS">Baja California Sur</option>
                <option value="JAL">Jalisco</option>
                <option value="QRO">Quintana Roo</option>
                <option value="NAY">Nayarit</option>
                <option value="SIN">Sinaloa</option>
              </select>
              <input
                type="text"
                placeholder="Primary Region/City"
                value={formData.region}
                onChange={e => setFormData({...formData, region: e.target.value})}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Required Documents</h3>
            <div style={styles.fileUpload}>
              <label style={styles.fileLabel}>
                INE Front {uploads.ineFront && 'âœ“'}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={e => handleFileUpload('ineFront', e.target.files[0])}
                  style={styles.fileInput}
                  required
                />
              </label>
            </div>
            <div style={styles.fileUpload}>
              <label style={styles.fileLabel}>
                INE Back {uploads.ineBack && 'âœ“'}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={e => handleFileUpload('ineBack', e.target.files[0])}
                  style={styles.fileInput}
                  required
                />
              </label>
            </div>
            <div style={styles.fileUpload}>
              <label style={styles.fileLabel}>
                Business Card {uploads.businessCard && 'âœ“'}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={e => handleFileUpload('businessCard', e.target.files[0])}
                  style={styles.fileInput}
                  required
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            style={styles.submitBtn}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit for Verification'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0f172a', padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: '#1e293b', maxWidth: '700px', width: '100%', borderRadius: '12px', padding: '40px', border: '1px solid #334155' },
  header: { marginBottom: '32px' },
  title: { fontSize: '28px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 8px' },
  subtitle: { fontSize: '15px', color: '#94a3b8', margin: 0 },
  errors: { background: '#7f1d1d', border: '1px solid #991b1b', borderRadius: '8px', padding: '16px', marginBottom: '24px' },
  error: { color: '#fca5a5', fontSize: '14px', marginBottom: '4px' },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },
  section: { display: 'flex', flexDirection: 'column', gap: '12px' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', color: '#e2e8f0', margin: '0 0 8px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  input: { padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' },
  select: { padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px' },
  fileUpload: { marginBottom: '8px' },
  fileLabel: { display: 'block', padding: '16px', background: '#0f172a', border: '2px dashed #334155', borderRadius: '8px', color: '#94a3b8', textAlign: 'center', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
  fileInput: { display: 'none' },
  submitBtn: { padding: '16px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  pendingCard: { background: '#1e293b', maxWidth: '500px', margin: '100px auto', padding: '60px 40px', borderRadius: '12px', textAlign: 'center', color: '#f1f5f9', border: '1px solid #334155' },
  spinner: { width: '50px', height: '50px', border: '4px solid #334155', borderTop: '4px solid #059669', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 1s linear infinite' },
  successCard: { background: '#1e293b', maxWidth: '500px', margin: '100px auto', padding: '60px 40px', borderRadius: '12px', textAlign: 'center', color: '#f1f5f9', border: '1px solid #334155' },
  successIcon: { width: '80px', height: '80px', background: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '48px', color: '#fff' },
  successTitle: { fontSize: '24px', fontWeight: '700', marginBottom: '12px' }
};
