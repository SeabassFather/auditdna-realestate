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

  // GLASS TEXT STYLE
  const glassText = {
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '100',
    color: 'rgba(203, 213, 225, 0.85)',
    textShadow: '0 1px 15px rgba(0,0,0,0.2)'
  };

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

    const agents = JSON.parse(localStorage.getItem('registered_agents') || '[]');
    
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

  // SUCCESS SCREEN
  if (success && credentials) {
    return (
      <div style={{ 
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        {/* VINEYARD BACKGROUND */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }} />

        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.8) 100%)',
          zIndex: 1
        }} />

        <div style={{ 
          position: 'relative',
          zIndex: 2,
          maxWidth: '550px', 
          width: '100%', 
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(148, 163, 184, 0.15)',
          padding: '50px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '2px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: 'rgba(16, 185, 129, 0.8)',
            fontSize: '24px'
          }}>
            ✓
          </div>
          
          <h2 style={{ 
            ...glassText,
            fontSize: '26px',
            fontWeight: '200',
            color: 'rgba(16, 185, 129, 0.9)',
            marginBottom: '12px',
            letterSpacing: '3px'
          }}>
            Registration Successful
          </h2>
          <p style={{ 
            ...glassText,
            fontSize: '12px',
            color: 'rgba(148, 163, 184, 0.7)',
            marginBottom: '32px',
            letterSpacing: '1px'
          }}>
            Your account is pending approval. Save your credentials below.
          </p>
          
          <div style={{ 
            background: 'rgba(203, 166, 88, 0.08)',
            border: '1px solid rgba(203, 166, 88, 0.2)',
            padding: '28px',
            marginBottom: '28px'
          }}>
            <h3 style={{ 
              ...glassText,
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(203, 166, 88, 0.8)',
              marginBottom: '20px'
            }}>
              Your Login Credentials
            </h3>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <div style={{ 
                ...glassText,
                fontSize: '10px',
                color: 'rgba(148, 163, 184, 0.6)',
                marginBottom: '6px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>Email</div>
              <div style={{ 
                ...glassText,
                fontSize: '14px',
                color: 'rgba(203, 213, 225, 0.9)',
                padding: '12px',
                background: 'rgba(30, 41, 59, 0.5)'
              }}>{credentials.email}</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ 
                ...glassText,
                fontSize: '10px',
                color: 'rgba(148, 163, 184, 0.6)',
                marginBottom: '6px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>Password</div>
              <div style={{ 
                ...glassText,
                fontSize: '14px',
                color: 'rgba(203, 213, 225, 0.9)',
                padding: '12px',
                background: 'rgba(30, 41, 59, 0.5)'
              }}>{credentials.password}</div>
            </div>
          </div>

          <div style={{ 
            padding: '16px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            marginBottom: '28px',
            textAlign: 'left'
          }}>
            <div style={{ 
              ...glassText,
              fontSize: '10px',
              letterSpacing: '2px',
              color: 'rgba(239, 68, 68, 0.8)',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              Important
            </div>
            <div style={{ 
              ...glassText,
              fontSize: '11px',
              color: 'rgba(203, 213, 225, 0.7)',
              lineHeight: '1.8'
            }}>
              Save these credentials immediately. Passwords cannot be reset. If you lose your password, you must re-register with your INE.
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            style={{ 
              padding: '14px 40px',
              background: 'rgba(203, 166, 88, 0.85)',
              color: '#1e293b',
              border: 'none',
              fontSize: '10px',
              fontWeight: '400',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // REGISTRATION FORM
  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
      padding: '40px 20px'
    }}>
      {/* VINEYARD BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.8) 100%)',
        zIndex: 1
      }} />

      <div style={{ 
        position: 'relative',
        zIndex: 2,
        maxWidth: '700px', 
        margin: '0 auto'
      }}>
        {/* HEADER */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            ...glassText,
            fontSize: '32px',
            fontWeight: '100',
            color: 'rgba(203, 166, 88, 0.9)',
            marginBottom: '12px',
            letterSpacing: '6px',
            textTransform: 'uppercase'
          }}>
            Agent Registration
          </h1>
          <p style={{ 
            ...glassText,
            fontSize: '12px',
            color: 'rgba(148, 163, 184, 0.7)',
            letterSpacing: '2px'
          }}>
            Register to list properties - INE verification required
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div style={{ 
            padding: '14px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            marginBottom: '24px',
            fontSize: '12px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* CONTACT INFO CARD */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            padding: '36px',
            marginBottom: '24px'
          }}>
            <h3 style={{ 
              ...glassText,
              fontSize: '14px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(203, 166, 88, 0.8)',
              marginBottom: '28px'
            }}>
              Contact Information
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                ...glassText,
                display: 'block',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'rgba(148, 163, 184, 0.7)'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: 'rgba(203, 213, 225, 0.9)',
                  fontSize: '14px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  ...glassText,
                  display: 'block',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  color: 'rgba(148, 163, 184, 0.7)'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    color: 'rgba(203, 213, 225, 0.9)',
                    fontSize: '14px',
                    fontFamily: '"Helvetica Neue", sans-serif'
                  }}
                />
              </div>

              <div>
                <label style={{
                  ...glassText,
                  display: 'block',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  color: 'rgba(148, 163, 184, 0.7)'
                }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    color: 'rgba(203, 213, 225, 0.9)',
                    fontSize: '14px',
                    fontFamily: '"Helvetica Neue", sans-serif'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                ...glassText,
                display: 'block',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'rgba(148, 163, 184, 0.7)'
              }}>
                Real Estate License Number *
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: 'rgba(203, 213, 225, 0.9)',
                  fontSize: '14px',
                  fontFamily: '"Helvetica Neue", sans-serif'
                }}
              />
            </div>
          </div>

          {/* INE VERIFICATION CARD */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            padding: '36px',
            marginBottom: '24px'
          }}>
            <h3 style={{ 
              ...glassText,
              fontSize: '14px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(203, 166, 88, 0.8)',
              marginBottom: '28px'
            }}>
              INE Verification (Mexican ID)
            </h3>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                ...glassText,
                display: 'block',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'rgba(148, 163, 184, 0.7)'
              }}>
                INE Number (18 characters) *
              </label>
              <input
                type="text"
                value={formData.ineNumber}
                onChange={(e) => setFormData({ ...formData, ineNumber: e.target.value.toUpperCase() })}
                required
                maxLength="18"
                placeholder="ABCD123456EFGH7890"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: 'rgba(203, 213, 225, 0.9)',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  letterSpacing: '3px'
                }}
              />
              <div style={{ 
                ...glassText,
                fontSize: '10px',
                color: 'rgba(100, 116, 139, 0.6)',
                marginTop: '8px'
              }}>
                {formData.ineNumber.length}/18 characters
              </div>
            </div>

            <div>
              <label style={{
                ...glassText,
                display: 'block',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'rgba(148, 163, 184, 0.7)'
              }}>
                Upload INE Photo *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleIneUpload}
                style={{ display: 'none' }}
                id="ine-upload"
              />
              <label
                htmlFor="ine-upload"
                style={{
                  display: 'block',
                  padding: '40px',
                  background: inePhoto ? 'rgba(203, 166, 88, 0.08)' : 'rgba(30, 41, 59, 0.3)',
                  border: '1px dashed rgba(148, 163, 184, 0.3)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {inePhoto ? (
                  <div>
                    <img src={inePhoto.url} alt="INE" style={{ maxWidth: '350px', maxHeight: '220px', marginBottom: '16px' }} />
                    <div style={{ 
                      ...glassText,
                      fontSize: '11px',
                      color: 'rgba(16, 185, 129, 0.8)',
                      letterSpacing: '2px'
                    }}>
                      INE Uploaded Successfully
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: 'rgba(148, 163, 184, 0.5)',
                      fontSize: '20px'
                    }}>
                      ID
                    </div>
                    <div style={{ 
                      ...glassText,
                      fontSize: '13px',
                      color: 'rgba(203, 213, 225, 0.8)',
                      marginBottom: '8px'
                    }}>
                      Click to upload INE photo
                    </div>
                    <div style={{ 
                      ...glassText,
                      fontSize: '10px',
                      color: 'rgba(100, 116, 139, 0.6)'
                    }}>
                      Max file size: 5MB
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? 'rgba(148, 163, 184, 0.3)' : 'rgba(203, 166, 88, 0.85)',
              color: loading ? 'rgba(148, 163, 184, 0.6)' : '#1e293b',
              border: 'none',
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif',
              transition: 'all 0.3s'
            }}
          >
            {loading ? 'Registering...' : 'Register as Agent'}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            style={{ 
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(203, 166, 88, 0.8)',
              fontSize: '11px',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            Already registered? Login
          </button>
        </div>

        {/* BACK TO HOME */}
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{ 
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(100, 116, 139, 0.6)',
              fontSize: '10px',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue", sans-serif'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}