# =====================================================================
# ENJOYBAJA COMPLETE PLATFORM DEPLOYMENT
# AI AGENTS + LANGUAGE SYSTEM + MAGAZINE ADS + MARKETING AUTOMATION
# =====================================================================
# RUN: Right-click → Run with PowerShell
# OR: cd Desktop; .\DEPLOY_ENJOYBAJA_COMPLETE.ps1
# =====================================================================

Write-Host "`n" -NoNewline
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   ENJOYBAJA COMPLETE PLATFORM DEPLOYMENT" -ForegroundColor Yellow
Write-Host "   AI Agents • Language System • Magazine Ads • Marketing" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# =====================================================================
# CONFIGURATION - ADJUST PATHS IF NEEDED
# =====================================================================
$basePath = "C:\AuditDNA\auditdna-frontend\src"
$contextsPath = "$basePath\contexts"
$servicesPath = "$basePath\services"
$agentsPath = "$basePath\agents"
$componentsPath = "$basePath\components"
$adminPath = "$componentsPath\admin"

Write-Host "📁 Base Path: $basePath" -ForegroundColor Green
Write-Host ""

# Create directories
Write-Host "📁 Creating directory structure..." -ForegroundColor Cyan
$directories = @($contextsPath, $servicesPath, $agentsPath, $componentsPath, $adminPath)
foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Write-Host "  ✅ $dir" -ForegroundColor Gray
}
Write-Host ""

# =====================================================================
# FILE 1: LANGUAGE CONTEXT - BILINGUAL EN/ES FOR ALL MODULES
# =====================================================================
Write-Host "🌐 Creating LanguageContext.jsx..." -ForegroundColor Yellow

$languageContext = @'
// ============================================================================
// LANGUAGE CONTEXT - BILINGUAL EN/ES SUPPORT FOR ALL MODULES
// ============================================================================
// Usage: Wrap app with <LanguageProvider>
// In components: const { t, language, toggleLanguage } = useLanguage()
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// ============================================================================
// COMPREHENSIVE TRANSLATIONS
// ============================================================================
const translations = {
  en: {
    // GLOBAL
    language: 'Language', english: 'English', spanish: 'Español',
    loading: 'Loading...', error: 'Error', success: 'Success',
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit',
    view: 'View', export: 'Export', print: 'Print', download: 'Download',
    upload: 'Upload', submit: 'Submit', search: 'Search', filter: 'Filter',
    all: 'All', back: 'Back', next: 'Next', close: 'Close', add: 'Add',
    
    // NAVIGATION
    home: 'Home', dashboard: 'Dashboard', admin: 'Admin', settings: 'Settings',
    profile: 'Profile', logout: 'Logout', login: 'Login', register: 'Register',
    
    // AUTHENTICATION
    email: 'Email', password: 'Password', confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?', rememberMe: 'Remember Me',
    signIn: 'Sign In', signOut: 'Sign Out', createAccount: 'Create Account',
    agentLogin: 'Agent Login', adminAccess: 'Admin Access', enterPin: 'Enter PIN',
    invalidPin: 'Invalid PIN', accessDenied: 'Access Denied',
    
    // REAL ESTATE
    properties: 'Properties', property: 'Property', realEstate: 'Real Estate',
    mexicoRealEstate: 'Mexico Real Estate', usaMortgage: 'USA Mortgage',
    developments: 'Developments', lifestyle: 'Lifestyle', luxuryGoods: 'Luxury Goods',
    browseProperties: 'Browse Properties', viewCommunities: 'View Communities',
    getPreApproved: 'Get Pre-Approved', propertySearch: 'Property Search',
    bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', sqft: 'Sq Ft',
    price: 'Price', location: 'Location', type: 'Type', status: 'Status',
    available: 'Available', sold: 'Sold', pending: 'Pending',
    forSale: 'For Sale', forRent: 'For Rent',
    oceanView: 'Ocean View', poolIncluded: 'Pool Included',
    gatedCommunity: 'Gated Community', newConstruction: 'New Construction',
    
    // LOCATIONS - BAJA
    bajaCaliforniaPremium: 'Baja California Premium Properties',
    valleDeGuadalupe: 'Valle de Guadalupe', ensenada: 'Ensenada',
    rosarito: 'Rosarito', tijuana: 'Tijuana', sanJoseDelCabo: 'San José del Cabo',
    laPaz: 'La Paz', losCabos: 'Los Cabos', sanFelipe: 'San Felipe',
    
    // MORTGAGE
    mortgage: 'Mortgage', loanApplication: 'Loan Application',
    mortgageCalculator: 'Mortgage Calculator', preApproval: 'Pre-Approval',
    interestRate: 'Interest Rate', loanAmount: 'Loan Amount',
    downPayment: 'Down Payment', monthlyPayment: 'Monthly Payment',
    loanTerm: 'Loan Term', years: 'Years', months: 'Months',
    
    // MAGAZINE & ADS
    magazine: 'Magazine', featuredSpotlight: 'Featured Spotlight',
    editorsChoice: 'Editor\'s Choice', bajaSpotlight: 'Baja Spotlight',
    advertiseWithUs: 'Advertise With Us', placeAd: 'Place an Ad',
    adPricing: 'Ad Pricing', adDuration: 'Ad Duration',
    uploadYourAd: 'Upload Your Ad', selectPackage: 'Select Package',
    iconPlacement: 'Icon Placement', elitePlacement: 'Elite Placement',
    curatedDisplay: 'Curated Display', payNow: 'Pay Now',
    adSubmitted: 'Ad Submitted Successfully', pendingApproval: 'Pending Approval',
    
    // AGENTS & TEAM
    agents: 'Agents', agent: 'Agent', ourTeam: 'Our Team',
    contactAgent: 'Contact Agent', scheduleViewing: 'Schedule Viewing',
    requestInfo: 'Request Information', agentRegistration: 'Agent Registration',
    
    // CONTACT
    contact: 'Contact', contactUs: 'Contact Us', sendMessage: 'Send Message',
    firstName: 'First Name', lastName: 'Last Name', phone: 'Phone',
    message: 'Message', company: 'Company', website: 'Website',
    
    // NOTIFICATIONS
    notifications: 'Notifications', newMessage: 'New Message',
    propertyAlert: 'Property Alert', priceReduction: 'Price Reduction',
    newListing: 'New Listing', welcomeEmail: 'Welcome Email',
    
    // FOOTER
    premiumRealEstateLifestyle: 'Premium Real Estate & Lifestyle',
    allRightsReserved: 'All Rights Reserved',
    privacyPolicy: 'Privacy Policy', termsOfService: 'Terms of Service',
    
    // CRM
    crm: 'CRM', leads: 'Leads', pipeline: 'Pipeline', tasks: 'Tasks',
    calendar: 'Calendar', calls: 'Calls', emails: 'Emails',
    
    // ADMIN
    contentManager: 'Content Manager', userManagement: 'User Management',
    analytics: 'Analytics', platformSettings: 'Platform Settings'
  },
  
  es: {
    // GLOBAL
    language: 'Idioma', english: 'English', spanish: 'Español',
    loading: 'Cargando...', error: 'Error', success: 'Éxito',
    save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar',
    view: 'Ver', export: 'Exportar', print: 'Imprimir', download: 'Descargar',
    upload: 'Subir', submit: 'Enviar', search: 'Buscar', filter: 'Filtrar',
    all: 'Todos', back: 'Atrás', next: 'Siguiente', close: 'Cerrar', add: 'Agregar',
    
    // NAVIGATION
    home: 'Inicio', dashboard: 'Panel', admin: 'Administrador', settings: 'Configuración',
    profile: 'Perfil', logout: 'Cerrar Sesión', login: 'Iniciar Sesión', register: 'Registrarse',
    
    // AUTHENTICATION
    email: 'Correo Electrónico', password: 'Contraseña', confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidó su Contraseña?', rememberMe: 'Recuérdame',
    signIn: 'Entrar', signOut: 'Salir', createAccount: 'Crear Cuenta',
    agentLogin: 'Acceso de Agente', adminAccess: 'Acceso de Administrador', enterPin: 'Ingrese PIN',
    invalidPin: 'PIN Inválido', accessDenied: 'Acceso Denegado',
    
    // REAL ESTATE
    properties: 'Propiedades', property: 'Propiedad', realEstate: 'Bienes Raíces',
    mexicoRealEstate: 'Bienes Raíces México', usaMortgage: 'Hipotecas USA',
    developments: 'Desarrollos', lifestyle: 'Estilo de Vida', luxuryGoods: 'Artículos de Lujo',
    browseProperties: 'Ver Propiedades', viewCommunities: 'Ver Comunidades',
    getPreApproved: 'Obtener Pre-Aprobación', propertySearch: 'Buscar Propiedades',
    bedrooms: 'Recámaras', bathrooms: 'Baños', sqft: 'Pies Cuadrados',
    price: 'Precio', location: 'Ubicación', type: 'Tipo', status: 'Estado',
    available: 'Disponible', sold: 'Vendido', pending: 'Pendiente',
    forSale: 'En Venta', forRent: 'En Renta',
    oceanView: 'Vista al Mar', poolIncluded: 'Alberca Incluida',
    gatedCommunity: 'Fraccionamiento Privado', newConstruction: 'Nueva Construcción',
    
    // LOCATIONS - BAJA
    bajaCaliforniaPremium: 'Propiedades Premium en Baja California',
    valleDeGuadalupe: 'Valle de Guadalupe', ensenada: 'Ensenada',
    rosarito: 'Rosarito', tijuana: 'Tijuana', sanJoseDelCabo: 'San José del Cabo',
    laPaz: 'La Paz', losCabos: 'Los Cabos', sanFelipe: 'San Felipe',
    
    // MORTGAGE
    mortgage: 'Hipoteca', loanApplication: 'Solicitud de Préstamo',
    mortgageCalculator: 'Calculadora de Hipoteca', preApproval: 'Pre-Aprobación',
    interestRate: 'Tasa de Interés', loanAmount: 'Monto del Préstamo',
    downPayment: 'Enganche', monthlyPayment: 'Pago Mensual',
    loanTerm: 'Plazo del Préstamo', years: 'Años', months: 'Meses',
    
    // MAGAZINE & ADS
    magazine: 'Revista', featuredSpotlight: 'Destacado',
    editorsChoice: 'Selección del Editor', bajaSpotlight: 'Spotlight Baja',
    advertiseWithUs: 'Anúnciate con Nosotros', placeAd: 'Colocar Anuncio',
    adPricing: 'Precios de Publicidad', adDuration: 'Duración del Anuncio',
    uploadYourAd: 'Sube tu Anuncio', selectPackage: 'Selecciona Paquete',
    iconPlacement: 'Ubicación Icónica', elitePlacement: 'Ubicación Elite',
    curatedDisplay: 'Exhibición Curada', payNow: 'Pagar Ahora',
    adSubmitted: 'Anuncio Enviado Exitosamente', pendingApproval: 'Pendiente de Aprobación',
    
    // AGENTS & TEAM
    agents: 'Agentes', agent: 'Agente', ourTeam: 'Nuestro Equipo',
    contactAgent: 'Contactar Agente', scheduleViewing: 'Agendar Visita',
    requestInfo: 'Solicitar Información', agentRegistration: 'Registro de Agente',
    
    // CONTACT
    contact: 'Contacto', contactUs: 'Contáctanos', sendMessage: 'Enviar Mensaje',
    firstName: 'Nombre', lastName: 'Apellido', phone: 'Teléfono',
    message: 'Mensaje', company: 'Empresa', website: 'Sitio Web',
    
    // NOTIFICATIONS
    notifications: 'Notificaciones', newMessage: 'Nuevo Mensaje',
    propertyAlert: 'Alerta de Propiedad', priceReduction: 'Reducción de Precio',
    newListing: 'Nueva Propiedad', welcomeEmail: 'Correo de Bienvenida',
    
    // FOOTER
    premiumRealEstateLifestyle: 'Bienes Raíces y Estilo de Vida Premium',
    allRightsReserved: 'Todos los Derechos Reservados',
    privacyPolicy: 'Política de Privacidad', termsOfService: 'Términos de Servicio',
    
    // CRM
    crm: 'CRM', leads: 'Prospectos', pipeline: 'Pipeline', tasks: 'Tareas',
    calendar: 'Calendario', calls: 'Llamadas', emails: 'Correos',
    
    // ADMIN
    contentManager: 'Gestor de Contenido', userManagement: 'Gestión de Usuarios',
    analytics: 'Analíticas', platformSettings: 'Configuración de Plataforma'
  }
};

// ============================================================================
// LANGUAGE PROVIDER
// ============================================================================
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('enjoybaja_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('enjoybaja_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
'@

Set-Content -Path "$contextsPath\LanguageContext.jsx" -Value $languageContext -Encoding UTF8
Write-Host "  ✅ LanguageContext.jsx created" -ForegroundColor Green

# =====================================================================
# FILE 2: LANGUAGE TOGGLE COMPONENT
# =====================================================================
Write-Host "🌐 Creating LanguageToggle.jsx..." -ForegroundColor Yellow

$languageToggle = @'
// ============================================================================
// LANGUAGE TOGGLE COMPONENT
// ============================================================================
// Usage: <LanguageToggle /> - Place anywhere in your UI
// ============================================================================

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = ({ style = {}, compact = false }) => {
  const { language, toggleLanguage } = useLanguage();

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: compact ? '6px 12px' : '8px 16px',
    background: 'rgba(203, 166, 88, 0.15)',
    border: '1px solid rgba(203, 166, 88, 0.3)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: compact ? '10px' : '11px',
    letterSpacing: '2px',
    color: '#cba658',
    ...style
  };

  return (
    <button onClick={toggleLanguage} style={baseStyle}>
      <span style={{ fontSize: '14px' }}>🌐</span>
      <span>{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
};

export default LanguageToggle;
'@

Set-Content -Path "$componentsPath\LanguageToggle.jsx" -Value $languageToggle -Encoding UTF8
Write-Host "  ✅ LanguageToggle.jsx created" -ForegroundColor Green

# =====================================================================
# FILE 3: AI AGENTS - MARKETING AUTOMATION ENGINE
# =====================================================================
Write-Host "🤖 Creating MarketingAgent.js..." -ForegroundColor Yellow

$marketingAgent = @'
// ============================================================================
// MARKETING AUTOMATION AGENT
// ============================================================================
// Handles: Welcome emails, Follow-ups, Social media, Campaigns
// ============================================================================

class MarketingAgent {
  constructor() {
    this.agentId = 'marketing_agent_001';
    this.status = 'active';
    this.emailsSent = 0;
    this.campaignsRun = 0;
    
    // Email templates
    this.templates = {
      welcome: {
        subject: {
          en: 'Welcome to EnjoyBaja - Your Luxury Real Estate Journey Begins',
          es: 'Bienvenido a EnjoyBaja - Tu Viaje de Bienes Raíces de Lujo Comienza'
        },
        body: {
          en: `Dear {{name}},

Welcome to EnjoyBaja! We're thrilled to have you join our exclusive community of luxury property enthusiasts.

As a member, you now have access to:
• Premium listings across Baja California
• Exclusive pre-launch development opportunities
• Expert mortgage consultation services
• VIP vineyard and lifestyle experiences

Our team is ready to assist you in finding your perfect property in Mexico's most coveted destinations.

Warm regards,
The EnjoyBaja Team
+52 646 340 2686 | info@enjoybaja.com`,
          es: `Estimado/a {{name}},

¡Bienvenido/a a EnjoyBaja! Estamos encantados de que te unas a nuestra exclusiva comunidad de entusiastas de propiedades de lujo.

Como miembro, ahora tienes acceso a:
• Listados premium en toda Baja California
• Oportunidades exclusivas de desarrollos en pre-venta
• Servicios de consultoría hipotecaria experta
• Experiencias VIP en viñedos y estilo de vida

Nuestro equipo está listo para ayudarte a encontrar tu propiedad perfecta en los destinos más codiciados de México.

Saludos cordiales,
El Equipo de EnjoyBaja
+52 646 340 2686 | info@enjoybaja.com`
        }
      },
      propertyAlert: {
        subject: {
          en: 'New Property Alert: {{propertyName}} - {{location}}',
          es: 'Nueva Propiedad: {{propertyName}} - {{location}}'
        }
      },
      followUp: {
        subject: {
          en: 'Following Up on Your Property Interest',
          es: 'Seguimiento a tu Interés en Propiedades'
        }
      },
      priceReduction: {
        subject: {
          en: 'Price Reduced! {{propertyName}} Now Available at {{newPrice}}',
          es: '¡Precio Reducido! {{propertyName}} Ahora Disponible en {{newPrice}}'
        }
      }
    };
  }

  // Send welcome email
  async sendWelcomeEmail(user, language = 'en') {
    const template = this.templates.welcome;
    const email = {
      to: user.email,
      subject: template.subject[language],
      body: template.body[language].replace('{{name}}', user.name),
      type: 'welcome',
      timestamp: new Date().toISOString()
    };
    
    this.emailsSent++;
    console.log('[MarketingAgent] Welcome email queued:', user.email);
    
    // In production: integrate with SendGrid/Mailchimp
    return this.queueEmail(email);
  }

  // Send property alert
  async sendPropertyAlert(user, property, language = 'en') {
    const template = this.templates.propertyAlert;
    const email = {
      to: user.email,
      subject: template.subject[language]
        .replace('{{propertyName}}', property.name)
        .replace('{{location}}', property.location),
      type: 'property_alert',
      propertyId: property.id,
      timestamp: new Date().toISOString()
    };
    
    this.emailsSent++;
    return this.queueEmail(email);
  }

  // Queue email for sending
  queueEmail(email) {
    // Store in localStorage for demo (production: use backend queue)
    const queue = JSON.parse(localStorage.getItem('email_queue') || '[]');
    queue.push(email);
    localStorage.setItem('email_queue', JSON.stringify(queue));
    return { success: true, queued: true, email };
  }

  // Get agent status
  getStatus() {
    return {
      agentId: this.agentId,
      status: this.status,
      emailsSent: this.emailsSent,
      campaignsRun: this.campaignsRun,
      lastActive: new Date().toISOString()
    };
  }
}

// Social Media Agent
class SocialMediaAgent {
  constructor() {
    this.agentId = 'social_media_agent_001';
    this.status = 'active';
    this.postsScheduled = 0;
    
    this.platforms = ['instagram', 'facebook', 'linkedin', 'twitter'];
    
    this.postTemplates = {
      newListing: {
        en: '🏡 NEW LISTING: {{propertyName}} in {{location}}\n\n✨ {{bedrooms}} beds | {{bathrooms}} baths | {{sqft}} sq ft\n💰 {{price}}\n\n📍 {{address}}\n\n#EnjoyBaja #BajaRealEstate #LuxuryHomes #{{locationTag}}',
        es: '🏡 NUEVA PROPIEDAD: {{propertyName}} en {{location}}\n\n✨ {{bedrooms}} recámaras | {{bathrooms}} baños | {{sqft}} pies cuadrados\n💰 {{price}}\n\n📍 {{address}}\n\n#EnjoyBaja #BienesRaicesBaja #CasasDeLujo #{{locationTag}}'
      },
      priceReduction: {
        en: '🔥 PRICE REDUCED! {{propertyName}}\n\nNow: {{newPrice}} (Was: {{oldPrice}})\n\n📍 {{location}}\n\nDon\'t miss this opportunity!\n\n#PriceReduced #EnjoyBaja #BajaDeal',
        es: '🔥 ¡PRECIO REDUCIDO! {{propertyName}}\n\nAhora: {{newPrice}} (Antes: {{oldPrice}})\n\n📍 {{location}}\n\n¡No pierdas esta oportunidad!\n\n#PrecioReducido #EnjoyBaja #OfertaBaja'
      },
      soldProperty: {
        en: '🎉 JUST SOLD! Congratulations to our clients!\n\n{{propertyName}} - {{location}}\n\nAnother happy family found their dream home with EnjoyBaja.\n\n#JustSold #EnjoyBaja #DreamHome',
        es: '🎉 ¡VENDIDO! ¡Felicidades a nuestros clientes!\n\n{{propertyName}} - {{location}}\n\nOtra familia feliz encontró su hogar soñado con EnjoyBaja.\n\n#Vendido #EnjoyBaja #HogarSoñado'
      }
    };
  }

  // Generate social post
  generatePost(type, data, language = 'en') {
    let template = this.postTemplates[type]?.[language] || '';
    
    Object.keys(data).forEach(key => {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
    });
    
    return template;
  }

  // Schedule post
  schedulePost(post, scheduledTime, platforms = this.platforms) {
    this.postsScheduled++;
    const scheduled = {
      id: `post_${Date.now()}`,
      content: post,
      scheduledTime,
      platforms,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    
    // Store scheduled posts
    const posts = JSON.parse(localStorage.getItem('scheduled_posts') || '[]');
    posts.push(scheduled);
    localStorage.setItem('scheduled_posts', JSON.stringify(posts));
    
    return scheduled;
  }

  getStatus() {
    return {
      agentId: this.agentId,
      status: this.status,
      postsScheduled: this.postsScheduled,
      platforms: this.platforms
    };
  }
}

// Export agents
export const marketingAgent = new MarketingAgent();
export const socialMediaAgent = new SocialMediaAgent();

export default { marketingAgent, socialMediaAgent };
'@

Set-Content -Path "$agentsPath\MarketingAgent.js" -Value $marketingAgent -Encoding UTF8
Write-Host "  ✅ MarketingAgent.js created" -ForegroundColor Green

# =====================================================================
# FILE 4: NOTIFICATION AGENT
# =====================================================================
Write-Host "🔔 Creating NotificationAgent.js..." -ForegroundColor Yellow

$notificationAgent = @'
// ============================================================================
// NOTIFICATION AGENT
// ============================================================================
// Handles: Push notifications, In-app alerts, SMS (via Zadarma)
// ============================================================================

class NotificationAgent {
  constructor() {
    this.agentId = 'notification_agent_001';
    this.status = 'active';
    this.notificationsSent = 0;
    
    this.channels = {
      inApp: true,
      email: true,
      sms: false, // Requires Zadarma integration
      push: false // Requires service worker
    };
  }

  // Create in-app notification
  createNotification(type, message, data = {}, language = 'en') {
    const notification = {
      id: `notif_${Date.now()}`,
      type,
      message: typeof message === 'object' ? message[language] : message,
      data,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    // Store notification
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.unshift(notification);
    // Keep only last 100
    if (notifications.length > 100) notifications.length = 100;
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    this.notificationsSent++;
    
    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('newNotification', { detail: notification }));
    
    return notification;
  }

  // Get all notifications
  getNotifications(unreadOnly = false) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    return unreadOnly ? notifications.filter(n => !n.read) : notifications;
  }

  // Mark as read
  markAsRead(notificationId) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }

  // Mark all as read
  markAllAsRead() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.forEach(n => n.read = true);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  // Clear all
  clearAll() {
    localStorage.setItem('notifications', '[]');
  }

  getStatus() {
    return {
      agentId: this.agentId,
      status: this.status,
      notificationsSent: this.notificationsSent,
      channels: this.channels
    };
  }
}

export const notificationAgent = new NotificationAgent();
export default notificationAgent;
'@

Set-Content -Path "$agentsPath\NotificationAgent.js" -Value $notificationAgent -Encoding UTF8
Write-Host "  ✅ NotificationAgent.js created" -ForegroundColor Green

# =====================================================================
# FILE 5: SELF-SERVICE MAGAZINE AD SYSTEM
# =====================================================================
Write-Host "📰 Creating MagazineAdSystem.jsx..." -ForegroundColor Yellow

$magazineAdSystem = @'
// ============================================================================
// SELF-SERVICE MAGAZINE AD SYSTEM
// ============================================================================
// Allows customers to upload, pay, and run ads without admin intervention
// ============================================================================

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// ============================================================================
// AD PACKAGES CONFIGURATION
// ============================================================================
const AD_PACKAGES = {
  spotlight: {
    id: 'spotlight',
    name: { en: 'Baja Spotlight', es: 'Spotlight Baja' },
    description: { 
      en: 'Featured placement in magazine section with editorial write-up',
      es: 'Ubicación destacada en la revista con reseña editorial'
    },
    price: 2500, // USD per month
    duration: 30, // days
    features: {
      en: ['Hero placement', 'Editorial write-up', 'Social media feature', 'Email blast inclusion'],
      es: ['Ubicación principal', 'Reseña editorial', 'Destacado en redes sociales', 'Inclusión en correo masivo']
    },
    maxImageSize: 5, // MB
    dimensions: '1200x800'
  },
  elite: {
    id: 'elite',
    name: { en: 'Elite Placement', es: 'Ubicación Elite' },
    description: {
      en: 'Premium visibility with dedicated feature section',
      es: 'Visibilidad premium con sección dedicada'
    },
    price: 5000,
    duration: 30,
    features: {
      en: ['Dedicated page', 'Video support', 'Lead capture', 'Analytics dashboard', 'Social campaign'],
      es: ['Página dedicada', 'Soporte de video', 'Captura de prospectos', 'Panel de analíticas', 'Campaña social']
    },
    maxImageSize: 10,
    dimensions: '1920x1080'
  },
  icon: {
    id: 'icon',
    name: { en: 'Icon Sponsor', es: 'Patrocinador Icónico' },
    description: {
      en: 'Exclusive category sponsorship with maximum visibility',
      es: 'Patrocinio exclusivo de categoría con máxima visibilidad'
    },
    price: 15000,
    duration: 30,
    features: {
      en: ['Category exclusivity', 'Homepage feature', 'All platform exposure', 'Concierge support', 'Custom content', 'Lead priority'],
      es: ['Exclusividad de categoría', 'Destacado en inicio', 'Exposición en toda la plataforma', 'Soporte concierge', 'Contenido personalizado', 'Prioridad de prospectos']
    },
    maxImageSize: 20,
    dimensions: '2560x1440'
  }
};

// ============================================================================
// SELF-SERVICE AD PORTAL COMPONENT
// ============================================================================
const SelfServiceAdPortal = () => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1); // 1: Select Package, 2: Upload Content, 3: Payment, 4: Confirmation
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [adContent, setAdContent] = useState({
    businessName: '',
    headline: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    image: null,
    imagePreview: null
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = selectedPackage ? AD_PACKAGES[selectedPackage].maxImageSize * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(language === 'en' 
          ? `File too large. Maximum size: ${AD_PACKAGES[selectedPackage]?.maxImageSize || 5}MB`
          : `Archivo muy grande. Tamaño máximo: ${AD_PACKAGES[selectedPackage]?.maxImageSize || 5}MB`
        );
        return;
      }
      
      setAdContent(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  // Submit ad for review
  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const submission = {
      id: `AD_${Date.now()}`,
      package: selectedPackage,
      content: adContent,
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
      amount: AD_PACKAGES[selectedPackage].price
    };
    
    // Store submission
    const submissions = JSON.parse(localStorage.getItem('ad_submissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('ad_submissions', JSON.stringify(submissions));
    
    setSubmissionId(submission.id);
    setIsProcessing(false);
    setStep(4);
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '40px 20px',
    fontFamily: '"Helvetica Neue", sans-serif'
  };

  const cardStyle = {
    background: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid rgba(203, 166, 88, 0.2)',
    borderRadius: '8px',
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '200',
    letterSpacing: '4px',
    color: '#cba658',
    marginBottom: '8px'
  };

  const subtitleStyle = {
    fontSize: '12px',
    color: 'rgba(148, 163, 184, 0.7)',
    letterSpacing: '2px'
  };

  const packageCardStyle = (isSelected) => ({
    background: isSelected ? 'rgba(203, 166, 88, 0.15)' : 'rgba(30, 41, 59, 0.5)',
    border: isSelected ? '2px solid #cba658' : '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  const buttonStyle = {
    padding: '14px 32px',
    background: 'rgba(203, 166, 88, 0.2)',
    border: '1px solid rgba(203, 166, 88, 0.5)',
    color: '#cba658',
    fontSize: '11px',
    letterSpacing: '3px',
    cursor: 'pointer',
    fontFamily: '"Helvetica Neue", sans-serif'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    color: '#e2e8f0',
    fontSize: '14px',
    outline: 'none',
    marginBottom: '16px',
    borderRadius: '4px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            {language === 'en' ? 'ADVERTISE WITH US' : 'ANÚNCIATE CON NOSOTROS'}
          </h1>
          <p style={subtitleStyle}>
            {language === 'en' 
              ? 'Self-service ad placement in our luxury magazine'
              : 'Colocación de anuncios autoservicio en nuestra revista de lujo'}
          </p>
        </div>

        {/* Progress Steps */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: step >= s ? 'rgba(203, 166, 88, 0.3)' : 'rgba(30, 41, 59, 0.5)',
                border: step >= s ? '2px solid #cba658' : '1px solid rgba(148, 163, 184, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: step >= s ? '#cba658' : 'rgba(148, 163, 184, 0.5)',
                margin: '0 auto 8px',
                fontSize: '14px'
              }}>
                {step > s ? '✓' : s}
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px' }}>
                {s === 1 && (language === 'en' ? 'PACKAGE' : 'PAQUETE')}
                {s === 2 && (language === 'en' ? 'CONTENT' : 'CONTENIDO')}
                {s === 3 && (language === 'en' ? 'PAYMENT' : 'PAGO')}
                {s === 4 && (language === 'en' ? 'CONFIRM' : 'CONFIRMAR')}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Select Package */}
        {step === 1 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {Object.entries(AD_PACKAGES).map(([key, pkg]) => (
                <div 
                  key={key}
                  style={packageCardStyle(selectedPackage === key)}
                  onClick={() => setSelectedPackage(key)}
                >
                  <h3 style={{ color: '#cba658', fontSize: '18px', marginBottom: '8px', letterSpacing: '2px' }}>
                    {pkg.name[language]}
                  </h3>
                  <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '12px', marginBottom: '16px' }}>
                    {pkg.description[language]}
                  </p>
                  <div style={{ fontSize: '28px', color: '#e2e8f0', marginBottom: '16px' }}>
                    ${pkg.price.toLocaleString()}<span style={{ fontSize: '12px', color: 'rgba(148, 163, 184, 0.6)' }}>/month</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {pkg.features[language].map((feature, i) => (
                      <li key={i} style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '12px', marginBottom: '6px' }}>
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button 
                style={{ ...buttonStyle, opacity: selectedPackage ? 1 : 0.5 }}
                onClick={() => selectedPackage && setStep(2)}
                disabled={!selectedPackage}
              >
                {language === 'en' ? 'CONTINUE' : 'CONTINUAR'} →
              </button>
            </div>
          </>
        )}

        {/* Step 2: Upload Content */}
        {step === 2 && (
          <>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder={language === 'en' ? 'Business Name *' : 'Nombre del Negocio *'}
                value={adContent.businessName}
                onChange={(e) => setAdContent(prev => ({ ...prev, businessName: e.target.value }))}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder={language === 'en' ? 'Ad Headline *' : 'Título del Anuncio *'}
                value={adContent.headline}
                onChange={(e) => setAdContent(prev => ({ ...prev, headline: e.target.value }))}
                style={inputStyle}
              />
              <textarea
                placeholder={language === 'en' ? 'Description (max 200 chars) *' : 'Descripción (máx 200 caracteres) *'}
                value={adContent.description}
                onChange={(e) => setAdContent(prev => ({ ...prev, description: e.target.value.slice(0, 200) }))}
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                maxLength={200}
              />
              <input
                type="email"
                placeholder={language === 'en' ? 'Contact Email *' : 'Correo de Contacto *'}
                value={adContent.contactEmail}
                onChange={(e) => setAdContent(prev => ({ ...prev, contactEmail: e.target.value }))}
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder={language === 'en' ? 'Contact Phone' : 'Teléfono de Contacto'}
                value={adContent.contactPhone}
                onChange={(e) => setAdContent(prev => ({ ...prev, contactPhone: e.target.value }))}
                style={inputStyle}
              />
              <input
                type="url"
                placeholder={language === 'en' ? 'Website URL' : 'URL del Sitio Web'}
                value={adContent.website}
                onChange={(e) => setAdContent(prev => ({ ...prev, website: e.target.value }))}
                style={inputStyle}
              />
              
              {/* Image Upload */}
              <div style={{ 
                border: '2px dashed rgba(148, 163, 184, 0.3)', 
                borderRadius: '8px', 
                padding: '40px',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                {adContent.imagePreview ? (
                  <div>
                    <img src={adContent.imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '16px' }} />
                    <button 
                      onClick={() => setAdContent(prev => ({ ...prev, image: null, imagePreview: null }))}
                      style={{ ...buttonStyle, background: 'rgba(248, 113, 113, 0.2)', borderColor: 'rgba(248, 113, 113, 0.5)', color: '#f87171' }}
                    >
                      {language === 'en' ? 'REMOVE' : 'ELIMINAR'}
                    </button>
                  </div>
                ) : (
                  <>
                    <p style={{ color: 'rgba(148, 163, 184, 0.6)', marginBottom: '16px' }}>
                      {language === 'en' 
                        ? `Drag & drop or click to upload (Max: ${AD_PACKAGES[selectedPackage]?.maxImageSize || 5}MB)`
                        : `Arrastra o haz clic para subir (Máx: ${AD_PACKAGES[selectedPackage]?.maxImageSize || 5}MB)`}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="ad-image-upload"
                    />
                    <label htmlFor="ad-image-upload" style={{ ...buttonStyle, cursor: 'pointer', display: 'inline-block' }}>
                      {language === 'en' ? 'UPLOAD IMAGE' : 'SUBIR IMAGEN'}
                    </label>
                  </>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
              <button style={{ ...buttonStyle, background: 'transparent' }} onClick={() => setStep(1)}>
                ← {language === 'en' ? 'BACK' : 'ATRÁS'}
              </button>
              <button 
                style={{ ...buttonStyle, opacity: (adContent.businessName && adContent.headline && adContent.contactEmail) ? 1 : 0.5 }}
                onClick={() => (adContent.businessName && adContent.headline && adContent.contactEmail) && setStep(3)}
              >
                {language === 'en' ? 'CONTINUE' : 'CONTINUAR'} →
              </button>
            </div>
          </>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ 
              background: 'rgba(30, 41, 59, 0.5)', 
              border: '1px solid rgba(203, 166, 88, 0.2)',
              borderRadius: '8px',
              padding: '32px',
              marginBottom: '24px'
            }}>
              <h3 style={{ color: '#cba658', marginBottom: '16px', letterSpacing: '2px' }}>
                {language === 'en' ? 'ORDER SUMMARY' : 'RESUMEN DEL PEDIDO'}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'rgba(148, 163, 184, 0.8)' }}>
                <span>{AD_PACKAGES[selectedPackage]?.name[language]}</span>
                <span>${AD_PACKAGES[selectedPackage]?.price.toLocaleString()}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '12px', marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '18px' }}>
                  <span>{language === 'en' ? 'Total' : 'Total'}</span>
                  <span>${AD_PACKAGES[selectedPackage]?.price.toLocaleString()} USD</span>
                </div>
              </div>
            </div>
            
            <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '12px', marginBottom: '24px' }}>
              {language === 'en' 
                ? 'Your ad will be reviewed within 24 hours. Once approved, it will go live immediately.'
                : 'Tu anuncio será revisado en 24 horas. Una vez aprobado, se publicará inmediatamente.'}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button style={{ ...buttonStyle, background: 'transparent' }} onClick={() => setStep(2)}>
                ← {language === 'en' ? 'BACK' : 'ATRÁS'}
              </button>
              <button 
                style={buttonStyle}
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing 
                  ? (language === 'en' ? 'PROCESSING...' : 'PROCESANDO...')
                  : (language === 'en' ? 'PAY NOW' : 'PAGAR AHORA')}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '60px', marginBottom: '24px' }}>✅</div>
            <h2 style={{ color: '#cba658', fontSize: '24px', marginBottom: '16px', letterSpacing: '3px' }}>
              {language === 'en' ? 'AD SUBMITTED!' : '¡ANUNCIO ENVIADO!'}
            </h2>
            <p style={{ color: 'rgba(148, 163, 184, 0.8)', marginBottom: '8px' }}>
              {language === 'en' ? 'Submission ID:' : 'ID de Envío:'} <strong style={{ color: '#e2e8f0' }}>{submissionId}</strong>
            </p>
            <p style={{ color: 'rgba(148, 163, 184, 0.6)', marginBottom: '32px' }}>
              {language === 'en' 
                ? 'You will receive an email confirmation shortly. Our team will review your ad within 24 hours.'
                : 'Recibirás un correo de confirmación pronto. Nuestro equipo revisará tu anuncio en 24 horas.'}
            </p>
            <button 
              style={buttonStyle}
              onClick={() => { setStep(1); setSelectedPackage(null); setAdContent({ businessName: '', headline: '', description: '', contactEmail: '', contactPhone: '', website: '', image: null, imagePreview: null }); }}
            >
              {language === 'en' ? 'SUBMIT ANOTHER AD' : 'ENVIAR OTRO ANUNCIO'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfServiceAdPortal;
'@

Set-Content -Path "$componentsPath\SelfServiceAdPortal.jsx" -Value $magazineAdSystem -Encoding UTF8
Write-Host "  ✅ SelfServiceAdPortal.jsx created" -ForegroundColor Green

# =====================================================================
# FILE 6: ADMIN AD MANAGEMENT PANEL
# =====================================================================
Write-Host "🛠️ Creating AdManagementPanel.jsx..." -ForegroundColor Yellow

$adManagementPanel = @'
// ============================================================================
// ADMIN AD MANAGEMENT PANEL
// ============================================================================
// Review, approve, reject, and manage submitted ads
// ============================================================================

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const AdManagementPanel = () => {
  const { language } = useLanguage();
  const [submissions, setSubmissions] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const stored = JSON.parse(localStorage.getItem('ad_submissions') || '[]');
    setSubmissions(stored);
  };

  const updateAdStatus = (id, status) => {
    const updated = submissions.map(ad => 
      ad.id === id ? { ...ad, status, reviewedAt: new Date().toISOString() } : ad
    );
    setSubmissions(updated);
    localStorage.setItem('ad_submissions', JSON.stringify(updated));
  };

  const filteredSubmissions = submissions.filter(ad => 
    filter === 'all' || ad.status === filter
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#4ade80';
      case 'rejected': return '#f87171';
      case 'pending_review': return '#fbbf24';
      default: return '#94a3b8';
    }
  };

  const cardStyle = {
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '16px'
  };

  const buttonStyle = (variant = 'primary') => ({
    padding: '10px 20px',
    background: variant === 'primary' ? 'rgba(203, 166, 88, 0.2)' : 
               variant === 'success' ? 'rgba(74, 222, 128, 0.2)' :
               variant === 'danger' ? 'rgba(248, 113, 113, 0.2)' : 'transparent',
    border: `1px solid ${variant === 'primary' ? 'rgba(203, 166, 88, 0.5)' : 
             variant === 'success' ? 'rgba(74, 222, 128, 0.5)' :
             variant === 'danger' ? 'rgba(248, 113, 113, 0.5)' : 'rgba(148, 163, 184, 0.3)'}`,
    color: variant === 'primary' ? '#cba658' : 
           variant === 'success' ? '#4ade80' :
           variant === 'danger' ? '#f87171' : '#94a3b8',
    fontSize: '10px',
    letterSpacing: '2px',
    cursor: 'pointer',
    fontFamily: '"Helvetica Neue", sans-serif'
  });

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ color: '#cba658', fontSize: '20px', letterSpacing: '3px', marginBottom: '24px' }}>
        {language === 'en' ? 'AD MANAGEMENT' : 'GESTIÓN DE ANUNCIOS'}
      </h2>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {['all', 'pending_review', 'approved', 'rejected'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...buttonStyle(filter === f ? 'primary' : 'default'),
              textTransform: 'uppercase'
            }}
          >
            {f === 'all' ? (language === 'en' ? 'All' : 'Todos') :
             f === 'pending_review' ? (language === 'en' ? 'Pending' : 'Pendientes') :
             f === 'approved' ? (language === 'en' ? 'Approved' : 'Aprobados') :
             (language === 'en' ? 'Rejected' : 'Rechazados')}
            <span style={{ marginLeft: '8px', opacity: 0.7 }}>
              ({submissions.filter(ad => f === 'all' || ad.status === f).length})
            </span>
          </button>
        ))}
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(148, 163, 184, 0.6)' }}>
          {language === 'en' ? 'No ad submissions found' : 'No se encontraron anuncios'}
        </div>
      ) : (
        filteredSubmissions.map(ad => (
          <div key={ad.id} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ color: '#e2e8f0', fontSize: '16px', margin: 0 }}>
                    {ad.content.businessName}
                  </h3>
                  <span style={{
                    fontSize: '9px',
                    padding: '4px 8px',
                    background: `${getStatusColor(ad.status)}20`,
                    color: getStatusColor(ad.status),
                    borderRadius: '4px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    {ad.status.replace('_', ' ')}
                  </span>
                </div>
                <p style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '14px', margin: '0 0 8px 0' }}>
                  {ad.content.headline}
                </p>
                <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '12px', margin: 0 }}>
                  {language === 'en' ? 'Package:' : 'Paquete:'} <strong>{ad.package?.toUpperCase()}</strong> | 
                  {language === 'en' ? ' Amount:' : ' Monto:'} <strong>${ad.amount?.toLocaleString()}</strong> |
                  {language === 'en' ? ' Submitted:' : ' Enviado:'} {new Date(ad.submittedAt).toLocaleDateString()}
                </p>
              </div>
              
              {ad.status === 'pending_review' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={buttonStyle('success')} onClick={() => updateAdStatus(ad.id, 'approved')}>
                    ✓ {language === 'en' ? 'APPROVE' : 'APROBAR'}
                  </button>
                  <button style={buttonStyle('danger')} onClick={() => updateAdStatus(ad.id, 'rejected')}>
                    ✗ {language === 'en' ? 'REJECT' : 'RECHAZAR'}
                  </button>
                </div>
              )}
            </div>
            
            {/* Expanded Details */}
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: 'rgba(148, 163, 184, 0.5)' }}>{language === 'en' ? 'Email:' : 'Correo:'}</span>
                  <br /><span style={{ color: '#e2e8f0' }}>{ad.content.contactEmail}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(148, 163, 184, 0.5)' }}>{language === 'en' ? 'Phone:' : 'Teléfono:'}</span>
                  <br /><span style={{ color: '#e2e8f0' }}>{ad.content.contactPhone || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(148, 163, 184, 0.5)' }}>{language === 'en' ? 'Website:' : 'Sitio Web:'}</span>
                  <br /><span style={{ color: '#e2e8f0' }}>{ad.content.website || 'N/A'}</span>
                </div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <span style={{ color: 'rgba(148, 163, 184, 0.5)', fontSize: '12px' }}>{language === 'en' ? 'Description:' : 'Descripción:'}</span>
                <p style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '13px', margin: '4px 0 0 0' }}>
                  {ad.content.description}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdManagementPanel;
'@

Set-Content -Path "$adminPath\AdManagementPanel.jsx" -Value $adManagementPanel -Encoding UTF8
Write-Host "  ✅ AdManagementPanel.jsx created" -ForegroundColor Green

# =====================================================================
# FILE 7: AGENT ORCHESTRATOR
# =====================================================================
Write-Host "🎛️ Creating AgentOrchestrator.js..." -ForegroundColor Yellow

$agentOrchestrator = @'
// ============================================================================
// AGENT ORCHESTRATOR
// ============================================================================
// Central hub that coordinates all AI agents
// ============================================================================

import { marketingAgent, socialMediaAgent } from './MarketingAgent';
import { notificationAgent } from './NotificationAgent';

class AgentOrchestrator {
  constructor() {
    this.agents = {
      marketing: marketingAgent,
      socialMedia: socialMediaAgent,
      notification: notificationAgent
    };
    this.isRunning = false;
    this.taskQueue = [];
  }

  // Initialize all agents
  initialize() {
    console.log('[Orchestrator] Initializing all agents...');
    this.isRunning = true;
    Object.keys(this.agents).forEach(name => {
      console.log(`[Orchestrator] Agent ${name} status: ${this.agents[name].status}`);
    });
    return this.getStatus();
  }

  // Get status of all agents
  getStatus() {
    return {
      orchestrator: {
        isRunning: this.isRunning,
        queueLength: this.taskQueue.length
      },
      agents: Object.fromEntries(
        Object.entries(this.agents).map(([name, agent]) => [name, agent.getStatus()])
      )
    };
  }

  // Handle new user registration
  async onUserRegistration(user, language = 'en') {
    console.log('[Orchestrator] Processing new user registration:', user.email);
    
    // Send welcome email
    await this.agents.marketing.sendWelcomeEmail(user, language);
    
    // Create welcome notification
    this.agents.notification.createNotification(
      'welcome',
      { en: 'Welcome to EnjoyBaja! Explore our premium properties.', es: '¡Bienvenido a EnjoyBaja! Explora nuestras propiedades premium.' },
      { userId: user.id },
      language
    );
    
    return { success: true, actions: ['welcome_email', 'welcome_notification'] };
  }

  // Handle new property listing
  async onNewListing(property, language = 'en') {
    console.log('[Orchestrator] Processing new listing:', property.name);
    
    // Generate social media post
    const post = this.agents.socialMedia.generatePost('newListing', {
      propertyName: property.name,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      price: `$${property.price?.toLocaleString()}`,
      address: property.address,
      locationTag: property.location?.replace(/\s+/g, '')
    }, language);
    
    // Schedule post for all platforms
    this.agents.socialMedia.schedulePost(post, new Date(Date.now() + 3600000)); // 1 hour from now
    
    // Create notification
    this.agents.notification.createNotification(
      'new_listing',
      { en: `New property listed: ${property.name}`, es: `Nueva propiedad: ${property.name}` },
      { propertyId: property.id },
      language
    );
    
    return { success: true, actions: ['social_post_scheduled', 'notification_created'] };
  }

  // Handle price reduction
  async onPriceReduction(property, oldPrice, newPrice, language = 'en') {
    console.log('[Orchestrator] Processing price reduction:', property.name);
    
    // Generate social post
    const post = this.agents.socialMedia.generatePost('priceReduction', {
      propertyName: property.name,
      location: property.location,
      oldPrice: `$${oldPrice?.toLocaleString()}`,
      newPrice: `$${newPrice?.toLocaleString()}`
    }, language);
    
    this.agents.socialMedia.schedulePost(post, new Date());
    
    // Notify interested users
    this.agents.notification.createNotification(
      'price_reduction',
      { en: `Price reduced! ${property.name} now $${newPrice?.toLocaleString()}`, es: `¡Precio reducido! ${property.name} ahora $${newPrice?.toLocaleString()}` },
      { propertyId: property.id, oldPrice, newPrice },
      language
    );
    
    return { success: true };
  }

  // Handle ad submission
  async onAdSubmission(ad, language = 'en') {
    console.log('[Orchestrator] Processing ad submission:', ad.id);
    
    // Notify admin
    this.agents.notification.createNotification(
      'ad_submission',
      { en: `New ad submission: ${ad.content.businessName}`, es: `Nuevo anuncio: ${ad.content.businessName}` },
      { adId: ad.id },
      language
    );
    
    return { success: true };
  }
}

export const orchestrator = new AgentOrchestrator();
export default orchestrator;
'@

Set-Content -Path "$agentsPath\AgentOrchestrator.js" -Value $agentOrchestrator -Encoding UTF8
Write-Host "  ✅ AgentOrchestrator.js created" -ForegroundColor Green

# =====================================================================
# FILE 8: AGENT INIT FILE
# =====================================================================
Write-Host "📦 Creating agents/index.js..." -ForegroundColor Yellow

$agentsIndex = @'
// ============================================================================
// AGENTS INDEX - Export all agents
// ============================================================================

export { marketingAgent, socialMediaAgent } from './MarketingAgent';
export { notificationAgent } from './NotificationAgent';
export { orchestrator } from './AgentOrchestrator';
'@

Set-Content -Path "$agentsPath\index.js" -Value $agentsIndex -Encoding UTF8
Write-Host "  ✅ agents/index.js created" -ForegroundColor Green

# =====================================================================
# COMPLETION SUMMARY
# =====================================================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   ✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "FILES CREATED:" -ForegroundColor Yellow
Write-Host "  contexts/" -ForegroundColor Cyan
Write-Host "    ✅ LanguageContext.jsx      (Bilingual EN/ES system)" -ForegroundColor Green
Write-Host "  components/" -ForegroundColor Cyan
Write-Host "    ✅ LanguageToggle.jsx       (Language switcher button)" -ForegroundColor Green
Write-Host "    ✅ SelfServiceAdPortal.jsx  (Self-service magazine ads)" -ForegroundColor Green
Write-Host "  components/admin/" -ForegroundColor Cyan
Write-Host "    ✅ AdManagementPanel.jsx    (Admin ad review system)" -ForegroundColor Green
Write-Host "  agents/" -ForegroundColor Cyan
Write-Host "    ✅ MarketingAgent.js        (Email & social media automation)" -ForegroundColor Green
Write-Host "    ✅ NotificationAgent.js     (Push & in-app notifications)" -ForegroundColor Green
Write-Host "    ✅ AgentOrchestrator.js     (Central agent coordinator)" -ForegroundColor Green
Write-Host "    ✅ index.js                 (Agent exports)" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   NEXT STEPS:" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. UPDATE App.js to wrap with LanguageProvider:" -ForegroundColor White
Write-Host "   import { LanguageProvider } from './contexts/LanguageContext';" -ForegroundColor Gray
Write-Host "   <LanguageProvider><Router>...</Router></LanguageProvider>" -ForegroundColor Gray
Write-Host ""
Write-Host "2. ADD Language Toggle to your nav bar:" -ForegroundColor White
Write-Host "   import LanguageToggle from './components/LanguageToggle';" -ForegroundColor Gray
Write-Host "   <LanguageToggle />" -ForegroundColor Gray
Write-Host ""
Write-Host "3. ADD route for Self-Service Ad Portal:" -ForegroundColor White
Write-Host "   import SelfServiceAdPortal from './components/SelfServiceAdPortal';" -ForegroundColor Gray
Write-Host "   <Route path='/advertise' element={<SelfServiceAdPortal />} />" -ForegroundColor Gray
Write-Host ""
Write-Host "4. INTEGRATE Ad Management into Admin Dashboard" -ForegroundColor White
Write-Host ""
Write-Host "5. RUN: npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Open the folder
Start-Process explorer.exe $basePath