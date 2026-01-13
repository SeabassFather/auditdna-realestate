import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationStatus = ({ data, registrationId }) => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {/* Success Animation */}
      <div style={{ 
        width: '100px', 
        height: '100px', 
        margin: '0 auto 24px',
        background: 'rgba(203, 166, 88, 0.2)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid rgba(203, 166, 88, 0.5)'
      }}>
        <span style={{ fontSize: '48px' }}>⏳</span>
      </div>

      <h2 style={{ 
        fontSize: '22px', 
        fontWeight: '200', 
        letterSpacing: '4px', 
        color: '#cba658', 
        marginBottom: '12px' 
      }}>
        REGISTRATION SUBMITTED
      </h2>

      <p style={{ 
        fontSize: '14px', 
        color: 'rgba(148, 163, 184, 0.8)', 
        marginBottom: '32px',
        maxWidth: '400px',
        margin: '0 auto 32px'
      }}>
        Your application is being reviewed by our team.<br />
        You will receive an email within 24-48 hours.
      </p>

      {/* Reference ID */}
      <div style={{ 
        background: 'rgba(30, 41, 59, 0.5)', 
        border: '1px solid rgba(148, 163, 184, 0.2)', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '32px',
        maxWidth: '350px',
        margin: '0 auto 32px'
      }}>
        <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(148, 163, 184, 0.5)', marginBottom: '8px' }}>
          REFERENCE ID
        </p>
        <p style={{ fontSize: '18px', color: '#e2e8f0', fontFamily: 'monospace', letterSpacing: '2px' }}>
          {registrationId}
        </p>
      </div>

      {/* Status Card */}
      <div style={{ 
        background: 'rgba(30, 41, 59, 0.3)', 
        border: '1px solid rgba(203, 166, 88, 0.2)', 
        borderRadius: '8px', 
        padding: '24px',
        maxWidth: '400px',
        margin: '0 auto 32px',
        textAlign: 'left'
      }}>
        <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#cba658', marginBottom: '16px' }}>
          WHAT HAPPENS NEXT
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              background: 'rgba(203, 166, 88, 0.3)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '12px',
              color: '#cba658',
              flexShrink: 0
            }}>1</div>
            <div>
              <p style={{ color: '#e2e8f0', fontSize: '13px', marginBottom: '2px' }}>Document Review</p>
              <p style={{ color: 'rgba(148, 163, 184, 0.5)', fontSize: '11px' }}>Our team verifies your ID</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              background: 'rgba(148, 163, 184, 0.2)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '12px',
              color: 'rgba(148, 163, 184, 0.6)',
              flexShrink: 0
            }}>2</div>
            <div>
              <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '13px', marginBottom: '2px' }}>Approval Email</p>
              <p style={{ color: 'rgba(148, 163, 184, 0.4)', fontSize: '11px' }}>Sent to {data.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              background: 'rgba(148, 163, 184, 0.2)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '12px',
              color: 'rgba(148, 163, 184, 0.6)',
              flexShrink: 0
            }}>3</div>
            <div>
              <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '13px', marginBottom: '2px' }}>Full Access</p>
              <p style={{ color: 'rgba(148, 163, 184, 0.4)', fontSize: '11px' }}>Browse & list properties</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Confirmation */}
      <div style={{ 
        background: 'rgba(74, 222, 128, 0.1)', 
        border: '1px solid rgba(74, 222, 128, 0.3)', 
        borderRadius: '8px', 
        padding: '16px',
        maxWidth: '400px',
        margin: '0 auto 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <span style={{ fontSize: '20px' }}>📧</span>
        <p style={{ color: 'rgba(74, 222, 128, 0.9)', fontSize: '12px', textAlign: 'left' }}>
          You're subscribed to our monthly newsletter! Watch for updates about events, restaurants, and more in Baja.
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/lifestyle')}
          style={{
            padding: '16px 32px',
            background: 'rgba(203, 166, 88, 0.2)',
            border: '1px solid rgba(203, 166, 88, 0.5)',
            color: '#cba658',
            fontSize: '11px',
            letterSpacing: '3px',
            cursor: 'pointer',
            fontFamily: '"Helvetica Neue", sans-serif'
          }}
        >
          🍷 EXPLORE LIFESTYLE
        </button>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '16px 32px',
            background: 'transparent',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            color: 'rgba(148, 163, 184, 0.7)',
            fontSize: '11px',
            letterSpacing: '3px',
            cursor: 'pointer',
            fontFamily: '"Helvetica Neue", sans-serif'
          }}
        >
          🏠 GO TO HOME
        </button>
      </div>

      {/* Support Contact */}
      <p style={{ 
        fontSize: '11px', 
        color: 'rgba(148, 163, 184, 0.4)', 
        marginTop: '40px',
        letterSpacing: '1px'
      }}>
        Questions? Contact us at <span style={{ color: '#cba658' }}>support@enjoybaja.com</span>
      </p>
    </div>
  );
};

export default VerificationStatus;