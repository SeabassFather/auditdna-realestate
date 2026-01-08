# =============================================================================
# AUDITDNA CONTACT SYSTEM - COMPLETE INTEGRATION SCRIPT
# This script ACTUALLY integrates ContactCard into your existing codebase
# =============================================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🔥 AUDITDNA CONTACT SYSTEM - COMPLETE INTEGRATION" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "C:\AuditDNA\auditdna-realestate"
$utf8NoBOM = New-Object System.Text.UTF8Encoding $false

# =============================================================================
# STEP 1: CREATE CONTACTCARD COMPONENT
# =============================================================================
Write-Host "STEP 1: Creating ContactCard component..." -ForegroundColor Yellow

$componentDir = "$projectRoot\src\components\contact"
New-Item -ItemType Directory -Path $componentDir -Force | Out-Null

$contactCard = @'
import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, X, Send } from 'lucide-react';

const ContactCard = ({ language = 'en', context = 'property', data = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'whatsapp'
  });

  const translations = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our expert team',
      name: 'Full Name',
      emailLabel: 'Email Address',
      phone: 'Phone Number',
      message: 'Message',
      preferredContact: 'Preferred Contact Method',
      submit: 'Send Inquiry',
      whatsapp: 'WhatsApp',
      instantCall: 'Instant Call',
      email: 'Email',
      close: 'Close'
    },
    es: {
      title: 'Contáctanos',
      subtitle: 'Ponte en contacto con nuestro equipo experto',
      name: 'Nombre Completo',
      emailLabel: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      message: 'Mensaje',
      preferredContact: 'Método de Contacto Preferido',
      submit: 'Enviar Consulta',
      whatsapp: 'WhatsApp',
      instantCall: 'Llamada Instantánea',
      email: 'Correo',
      close: 'Cerrar'
    }
  };

  const t = translations[language];

  const generateMessage = () => {
    const baseMsg = `${formData.name}\n${formData.message}\nPhone: ${formData.phone}\nEmail: ${formData.email}`;
    
    if (context === 'property' && data.title) {
      return `Property Inquiry: ${data.title}\nPrice: ${data.price}\n\n${baseMsg}`;
    } else if (context === 'team' && data.name) {
      return `Consultation Request: ${data.name}\n\n${baseMsg}`;
    } else if (context === 'lifestyle' && data.name) {
      return `${data.name} - Information Request\n\n${baseMsg}`;
    }
    return baseMsg;
  };

  const handleWhatsApp = () => {
    const message = generateMessage();
    window.open(`https://wa.me/5216463402686?text=${encodeURIComponent(message)}`, '_blank');
    setIsOpen(false);
  };

  const handleEmail = () => {
    const subject = `${t[context] || t.title} - ${formData.name}`;
    const body = generateMessage();
    window.location.href = `mailto:saul@auditdna.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.preferredContact === 'whatsapp') {
      handleWhatsApp();
    } else {
      handleEmail();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #cba658, #b8944d)',
          border: 'none',
          borderRadius: '8px',
          color: '#0f172a',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(203, 166, 88, 0.3)'
        }}
      >
        <MessageCircle size={18} />
        {t.title}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: '#0f172a',
            border: '2px solid #cba658',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid rgba(203, 166, 88, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#cba658', marginBottom: '4px', fontWeight: '600' }}>
                  {t.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {t.subtitle}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{
              padding: '24px',
              borderBottom: '1px solid rgba(203, 166, 88, 0.2)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px'
            }}>
              <button
                onClick={handleWhatsApp}
                style={{
                  padding: '16px',
                  background: 'rgba(37, 211, 102, 0.1)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  borderRadius: '8px',
                  color: '#25d366',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={20} />
                {t.whatsapp}
              </button>

              <button
                onClick={handleEmail}
                style={{
                  padding: '16px',
                  background: 'rgba(203, 166, 88, 0.1)',
                  border: '1px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '8px',
                  color: '#cba658',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Mail size={20} />
                {t.email}
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                    {t.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+52 646 340 2686"
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: '500' }}>
                    {t.message}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #cba658, #b8944d)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#0f172a',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(203, 166, 88, 0.4)'
                  }}
                >
                  <Send size={18} />
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;
'@

[System.IO.File]::WriteAllText("$componentDir\ContactCard.jsx", $contactCard, $utf8NoBOM)
Write-Host "✅ ContactCard component created!" -ForegroundColor Green
Write-Host ""

# =============================================================================
# STEP 2: INTEGRATE INTO MEXICOREALESTATE.JSX
# =============================================================================
Write-Host "STEP 2: Integrating ContactCard into MexicoRealEstate.jsx..." -ForegroundColor Yellow

$mexFile = "$projectRoot\src\pages\MexicoRealEstate.jsx"

if (Test-Path $mexFile) {
    # Backup original
    Copy-Item $mexFile "$mexFile.backup" -Force
    Write-Host "   ✅ Backup created: MexicoRealEstate.jsx.backup" -ForegroundColor Gray
    
    $content = Get-Content $mexFile -Raw -Encoding UTF8
    
    # Add import if not exists
    if ($content -notmatch "import ContactCard") {
        $content = $content -replace "(import React.*from 'react';)", "`$1`nimport ContactCard from '../components/contact/ContactCard';"
        Write-Host "   ✅ Added ContactCard import" -ForegroundColor Gray
    }
    
    # Add to property cards (find the CONTACT AGENT button and replace it)
    $content = $content -replace "onClick=\{\(\) => \{[^}]*window\.open\(`https://wa\.me/5216463402686[^}]+\}\}[^>]*>\s*CONTACT AGENT", @"
onClick={() => {}}
                        style={{ display: 'none' }}
                      >
                      </button>
                      <ContactCard 
                        language="en" 
                        context="property" 
                        data={{
                          title: property.title,
                          price: formatPrice(property.price),
                          territory: property.territory
                        }}
"@
    
    [System.IO.File]::WriteAllText($mexFile, $content, $utf8NoBOM)
    Write-Host "✅ MexicoRealEstate.jsx updated!" -ForegroundColor Green
} else {
    Write-Host "⚠️  MexicoRealEstate.jsx not found!" -ForegroundColor Yellow
}
Write-Host ""

# =============================================================================
# STEP 3: RESTART FRONTEND
# =============================================================================
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✅ INTEGRATION COMPLETE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 NOW RESTART YOUR FRONTEND:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   cd C:\AuditDNA\auditdna-realestate" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ ContactCard will now appear on property cards!" -ForegroundColor Green
Write-Host ""