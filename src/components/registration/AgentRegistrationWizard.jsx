import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactCardStep from './ContactCardStep';
import IdentityUploadStep from './IdentityUploadStep';
import ProfessionalStep from './ProfessionalStep';
import VerificationStatus from './VerificationStatus';

const AgentRegistrationWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationId, setRegistrationId] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockMessage, setBlockMessage] = useState('');
  
  const [formData, setFormData] = useState({
    // Step 1: Contact
    fullName: '',
    email: '',
    phone: '',
    country: '',
    newsletterConsent: false,
    termsAccepted: false,
    
    // Step 2: Identity
    idType: '',
    idDocumentUrl: null,
    idDocumentName: null,
    
    // Step 3: Professional
    isRealEstateAgent: undefined,
    rfc: '',
    licenseNumber: '',
    brokerageName: '',
    yearsExperience: ''
  });

  // Check for IP blocking on mount
  useEffect(() => {
    checkIPStatus();
  }, []);

  const getClientIP = () => {
    let sessionIP = sessionStorage.getItem('client_session_id');
    if (!sessionIP) {
      sessionIP = 'IP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('client_session_id', sessionIP);
    }
    return sessionIP;
  };

  const checkIPStatus = () => {
    const blockedIPs = JSON.parse(localStorage.getItem('blocked_ips') || '[]');
    const clientIP = getClientIP();
    const blocked = blockedIPs.find(b => b.ip === clientIP);
    
    if (blocked) {
      if (blocked.permanent || new Date(blocked.expiresAt) > new Date()) {
        setIsBlocked(true);
        setBlockMessage(blocked.permanent 
          ? 'Your access has been permanently restricted. Contact support@enjoybaja.com'
          : `Access temporarily restricted. Try again after ${new Date(blocked.expiresAt).toLocaleString()}`
        );
      }
    }
  };

  const checkRateLimit = () => {
    const attempts = JSON.parse(localStorage.getItem('registration_attempts') || '[]');
    const clientIP = getClientIP();
    const today = new Date().toDateString();
    
    const todayAttempts = attempts.filter(a => 
      a.ip === clientIP && 
      new Date(a.timestamp).toDateString() === today
    );
    
    return todayAttempts.length < 5;
  };

  const logRegistrationAttempt = () => {
    const attempts = JSON.parse(localStorage.getItem('registration_attempts') || '[]');
    attempts.push({
      ip: getClientIP(),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('registration_attempts', JSON.stringify(attempts));
  };

  const handleUpdateData = (newData) => {
    setFormData(newData);
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Check rate limit
    if (!checkRateLimit()) {
      alert('Maximum registration attempts reached for today. Please try again tomorrow.');
      return;
    }

    // Log attempt
    logRegistrationAttempt();

    // Generate registration ID
    const newRegistrationId = 'AGENT_' + Date.now();
    
    // Create registration record
    const registration = {
      id: newRegistrationId,
      status: 'pending',
      ...formData,
      registeredAt: new Date().toISOString(),
      ipAddress: getClientIP(),
      userAgent: navigator.userAgent
    };

    // Save to localStorage
    const agents = JSON.parse(localStorage.getItem('registered_agents') || '[]');
    agents.push(registration);
    localStorage.setItem('registered_agents', JSON.stringify(agents));

    // Add to newsletter subscribers
    if (formData.newsletterConsent) {
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      subscribers.push({
        email: formData.email,
        fullName: formData.fullName,
        subscribedAt: new Date().toISOString(),
        source: 'agent_registration',
        status: 'active',
        country: formData.country
      });
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }

    setRegistrationId(newRegistrationId);
    setCurrentStep(4);
  };

  // Blocked IP screen
  if (isBlocked) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.95)', 
          border: '1px solid rgba(248, 113, 113, 0.3)', 
          borderRadius: '8px',
          padding: '48px', 
          maxWidth: '400px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>🚫</div>
          <h2 style={{ color: '#f87171', fontSize: '18px', letterSpacing: '3px', marginBottom: '16px' }}>
            ACCESS RESTRICTED
          </h2>
          <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '13px', marginBottom: '24px' }}>
            {blockMessage}
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '14px 32px',
              background: 'transparent',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              color: 'rgba(148, 163, 184, 0.7)',
              fontSize: '11px',
              letterSpacing: '3px',
              cursor: 'pointer'
            }}
          >
            GO BACK
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, label: 'Contact' },
    { number: 2, label: 'Identity' },
    { number: 3, label: 'Details' },
    { number: 4, label: 'Complete' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
      padding: '40px 20px',
      fontFamily: '"Helvetica Neue", sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 
          style={{ 
            fontSize: '14px', 
            fontWeight: '200', 
            letterSpacing: '8px', 
            color: '#cba658', 
            marginBottom: '8px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          E N J O Y B A J A
        </h1>
        <p style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(148, 163, 184, 0.5)' }}>
          PROFESSIONAL REGISTRATION
        </p>
      </div>

      {/* Progress Steps */}
      {currentStep < 4 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px', 
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {steps.map((step) => (
            <div key={step.number} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: currentStep >= step.number ? 'rgba(203, 166, 88, 0.3)' : 'rgba(30, 41, 59, 0.5)',
                border: currentStep >= step.number ? '2px solid #cba658' : '1px solid rgba(148, 163, 184, 0.3)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: currentStep >= step.number ? '#cba658' : 'rgba(148, 163, 184, 0.5)',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <span style={{ 
                marginLeft: '8px', 
                marginRight: '16px',
                fontSize: '11px', 
                letterSpacing: '1px',
                color: currentStep >= step.number ? '#cba658' : 'rgba(148, 163, 184, 0.4)',
                display: window.innerWidth > 500 ? 'inline' : 'none'
              }}>
                {step.label}
              </span>
              {step.number < 4 && (
                <div style={{ 
                  width: '24px', 
                  height: '1px', 
                  background: currentStep > step.number ? '#cba658' : 'rgba(148, 163, 184, 0.2)'
                }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form Container */}
      <div style={{ 
        background: 'rgba(15, 23, 42, 0.95)', 
        border: '1px solid rgba(203, 166, 88, 0.2)', 
        borderRadius: '8px',
        padding: '40px', 
        maxWidth: '600px', 
        margin: '0 auto'
      }}>
        {currentStep === 1 && (
          <ContactCardStep 
            data={formData} 
            onUpdate={handleUpdateData} 
            onNext={handleNext} 
          />
        )}
        
        {currentStep === 2 && (
          <IdentityUploadStep 
            data={formData} 
            onUpdate={handleUpdateData} 
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 3 && (
          <ProfessionalStep 
            data={formData} 
            onUpdate={handleUpdateData} 
            onNext={handleSubmit}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 4 && (
          <VerificationStatus 
            data={formData}
            registrationId={registrationId}
          />
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '10px', color: 'rgba(148, 163, 184, 0.4)', letterSpacing: '1px' }}>
          Your information is protected under our Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AgentRegistrationWizard;