# =====================================================================
# ENJOYBAJA COMPLETE MARKETING AUTOMATION SYSTEM - PART 1 OF 3
# Core Systems: Language, CRM Integration, Lead Management
# =====================================================================
# RUN ALL 3 PARTS IN ORDER!
# =====================================================================

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   ENJOYBAJA MARKETING AUTOMATION - PART 1/3" -ForegroundColor Yellow
Write-Host "   Language System + CRM + Lead Management" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# =====================================================================
# CONFIGURATION
# =====================================================================
$basePath = "C:\AuditDNA\auditdna-frontend\src"
$contextsPath = "$basePath\contexts"
$servicesPath = "$basePath\services"
$agentsPath = "$basePath\agents"
$componentsPath = "$basePath\components"
$adminPath = "$componentsPath\admin"
$marketingPath = "$basePath\marketing"

# Create directories
$directories = @($contextsPath, $servicesPath, $agentsPath, $componentsPath, $adminPath, $marketingPath)
foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}
Write-Host "✅ Directories created" -ForegroundColor Green

# =====================================================================
# FILE 1: LANGUAGE CONTEXT - BILINGUAL EN/ES
# =====================================================================
Write-Host "🌐 Creating LanguageContext.jsx..." -ForegroundColor Yellow

$languageContext = @'
// ============================================================================
// LANGUAGE CONTEXT - BILINGUAL EN/ES FOR ALL MODULES
// ============================================================================
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

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
    
    // AUTH
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
    
    // LOCATIONS
    bajaCaliforniaPremium: 'Baja California Premium Properties',
    valleDeGuadalupe: 'Valle de Guadalupe', ensenada: 'Ensenada',
    rosarito: 'Rosarito', tijuana: 'Tijuana', sanJoseDelCabo: 'San José del Cabo',
    laPaz: 'La Paz', losCabos: 'Los Cabos', sanFelipe: 'San Felipe',
    
    // MORTGAGE
    mortgage: 'Mortgage', loanApplication: 'Loan Application',
    mortgageCalculator: 'Mortgage Calculator', preApproval: 'Pre-Approval',
    interestRate: 'Interest Rate', loanAmount: 'Loan Amount',
    downPayment: 'Down Payment', monthlyPayment: 'Monthly Payment',
    
    // MAGAZINE & ADS
    magazine: 'Magazine', featuredSpotlight: 'Featured Spotlight',
    editorsChoice: "Editor's Choice", bajaSpotlight: 'Baja Spotlight',
    advertiseWithUs: 'Advertise With Us', placeAd: 'Place an Ad',
    adPricing: 'Ad Pricing', uploadYourAd: 'Upload Your Ad',
    selectPackage: 'Select Package', payNow: 'Pay Now',
    adSubmitted: 'Ad Submitted Successfully', pendingApproval: 'Pending Approval',
    
    // PARTNERS & COLLECTION
    partners: 'Partners', partnerWithUs: 'Partner With Us',
    collection: 'Collection', luxuryCollection: 'Luxury Collection',
    sellWithUs: 'Sell With Us', listYourItem: 'List Your Item',
    yachts: 'Yachts', jets: 'Private Jets', exoticCars: 'Exotic Cars',
    watches: 'Watches', jewelry: 'Jewelry', art: 'Art',
    
    // MARKETING
    marketing: 'Marketing', campaigns: 'Campaigns', leads: 'Leads',
    subscribers: 'Subscribers', analytics: 'Analytics',
    emailCampaign: 'Email Campaign', socialMedia: 'Social Media',
    facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube',
    schedulePosts: 'Schedule Posts', automatedPosts: 'Automated Posts',
    leadCapture: 'Lead Capture', leadScoring: 'Lead Scoring',
    
    // AGENTS & TEAM
    agents: 'Agents', agent: 'Agent', ourTeam: 'Our Team',
    contactAgent: 'Contact Agent', scheduleViewing: 'Schedule Viewing',
    
    // CONTACT
    contact: 'Contact', contactUs: 'Contact Us', sendMessage: 'Send Message',
    firstName: 'First Name', lastName: 'Last Name', phone: 'Phone',
    message: 'Message', company: 'Company', website: 'Website',
    
    // CRM
    crm: 'CRM', pipeline: 'Pipeline', tasks: 'Tasks',
    calendar: 'Calendar', calls: 'Calls', emails: 'Emails',
    hotLead: 'Hot Lead', warmLead: 'Warm Lead', coldLead: 'Cold Lead',
    
    // FOOTER
    premiumRealEstateLifestyle: 'Premium Real Estate & Lifestyle',
    allRightsReserved: 'All Rights Reserved'
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
    
    // AUTH
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
    
    // LOCATIONS
    bajaCaliforniaPremium: 'Propiedades Premium en Baja California',
    valleDeGuadalupe: 'Valle de Guadalupe', ensenada: 'Ensenada',
    rosarito: 'Rosarito', tijuana: 'Tijuana', sanJoseDelCabo: 'San José del Cabo',
    laPaz: 'La Paz', losCabos: 'Los Cabos', sanFelipe: 'San Felipe',
    
    // MORTGAGE
    mortgage: 'Hipoteca', loanApplication: 'Solicitud de Préstamo',
    mortgageCalculator: 'Calculadora de Hipoteca', preApproval: 'Pre-Aprobación',
    interestRate: 'Tasa de Interés', loanAmount: 'Monto del Préstamo',
    downPayment: 'Enganche', monthlyPayment: 'Pago Mensual',
    
    // MAGAZINE & ADS
    magazine: 'Revista', featuredSpotlight: 'Destacado',
    editorsChoice: 'Selección del Editor', bajaSpotlight: 'Spotlight Baja',
    advertiseWithUs: 'Anúnciate con Nosotros', placeAd: 'Colocar Anuncio',
    adPricing: 'Precios de Publicidad', uploadYourAd: 'Sube tu Anuncio',
    selectPackage: 'Selecciona Paquete', payNow: 'Pagar Ahora',
    adSubmitted: 'Anuncio Enviado Exitosamente', pendingApproval: 'Pendiente de Aprobación',
    
    // PARTNERS & COLLECTION
    partners: 'Socios', partnerWithUs: 'Asóciate con Nosotros',
    collection: 'Colección', luxuryCollection: 'Colección de Lujo',
    sellWithUs: 'Vende con Nosotros', listYourItem: 'Lista tu Artículo',
    yachts: 'Yates', jets: 'Jets Privados', exoticCars: 'Autos Exóticos',
    watches: 'Relojes', jewelry: 'Joyería', art: 'Arte',
    
    // MARKETING
    marketing: 'Marketing', campaigns: 'Campañas', leads: 'Prospectos',
    subscribers: 'Suscriptores', analytics: 'Analíticas',
    emailCampaign: 'Campaña de Email', socialMedia: 'Redes Sociales',
    facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube',
    schedulePosts: 'Programar Publicaciones', automatedPosts: 'Publicaciones Automáticas',
    leadCapture: 'Captura de Prospectos', leadScoring: 'Puntuación de Prospectos',
    
    // AGENTS & TEAM
    agents: 'Agentes', agent: 'Agente', ourTeam: 'Nuestro Equipo',
    contactAgent: 'Contactar Agente', scheduleViewing: 'Agendar Visita',
    
    // CONTACT
    contact: 'Contacto', contactUs: 'Contáctanos', sendMessage: 'Enviar Mensaje',
    firstName: 'Nombre', lastName: 'Apellido', phone: 'Teléfono',
    message: 'Mensaje', company: 'Empresa', website: 'Sitio Web',
    
    // CRM
    crm: 'CRM', pipeline: 'Pipeline', tasks: 'Tareas',
    calendar: 'Calendario', calls: 'Llamadas', emails: 'Correos',
    hotLead: 'Prospecto Caliente', warmLead: 'Prospecto Tibio', coldLead: 'Prospecto Frío',
    
    // FOOTER
    premiumRealEstateLifestyle: 'Bienes Raíces y Estilo de Vida Premium',
    allRightsReserved: 'Todos los Derechos Reservados'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('enjoybaja_language') || 'en');

  useEffect(() => {
    localStorage.setItem('enjoybaja_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'es' : 'en');
  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export default LanguageContext;
'@

Set-Content -Path "$contextsPath\LanguageContext.jsx" -Value $languageContext -Encoding UTF8
Write-Host "  ✅ LanguageContext.jsx" -ForegroundColor Green

# =====================================================================
# FILE 2: CRM INTEGRATION SERVICE
# =====================================================================
Write-Host "📊 Creating CRMService.js..." -ForegroundColor Yellow

$crmService = @'
// ============================================================================
// CRM INTEGRATION SERVICE
// Connects to HubSpot, ActiveCampaign, or Pipedrive
// ============================================================================

class CRMService {
  constructor() {
    this.provider = 'internal'; // 'hubspot', 'activecampaign', 'pipedrive', 'internal'
    this.apiKeys = {
      hubspot: process.env.REACT_APP_HUBSPOT_API_KEY || '',
      activecampaign: process.env.REACT_APP_ACTIVECAMPAIGN_API_KEY || '',
      pipedrive: process.env.REACT_APP_PIPEDRIVE_API_KEY || ''
    };
  }

  // ===== LEAD MANAGEMENT =====
  
  async createLead(leadData) {
    const lead = {
      id: `LEAD_${Date.now()}`,
      ...leadData,
      source: leadData.source || 'website',
      score: this.calculateLeadScore(leadData),
      status: 'new',
      segment: this.determineSegment(leadData),
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      activities: [],
      tags: this.autoAssignTags(leadData)
    };

    // Store locally
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    leads.push(lead);
    localStorage.setItem('crm_leads', JSON.stringify(leads));

    // Trigger automation
    this.triggerLeadAutomation(lead);

    return lead;
  }

  calculateLeadScore(leadData) {
    let score = 0;
    
    // Source scoring
    if (leadData.source === 'referral') score += 30;
    else if (leadData.source === 'organic') score += 20;
    else if (leadData.source === 'paid_ad') score += 15;
    else if (leadData.source === 'social') score += 10;
    
    // Engagement scoring
    if (leadData.viewedListings > 5) score += 25;
    else if (leadData.viewedListings > 2) score += 15;
    else if (leadData.viewedListings > 0) score += 5;
    
    // Interest indicators
    if (leadData.requestedTour) score += 30;
    if (leadData.downloadedBrochure) score += 15;
    if (leadData.savedProperties) score += 20;
    if (leadData.preApprovalInterest) score += 25;
    
    // Budget scoring
    if (leadData.budget > 1000000) score += 20;
    else if (leadData.budget > 500000) score += 15;
    else if (leadData.budget > 250000) score += 10;
    
    return Math.min(score, 100);
  }

  determineSegment(leadData) {
    const segments = [];
    
    // Country segment
    if (leadData.country === 'USA' || leadData.country === 'US') {
      segments.push('usa_buyer');
      if (leadData.interests?.includes('retirement')) segments.push('usa_retiree');
      if (leadData.interests?.includes('investment')) segments.push('usa_investor');
      if (leadData.interests?.includes('vacation')) segments.push('usa_vacation');
    } else if (leadData.country === 'Mexico' || leadData.country === 'MX') {
      segments.push('mx_buyer');
      if (leadData.interests?.includes('first_home')) segments.push('mx_first_time');
      if (leadData.interests?.includes('investment')) segments.push('mx_investor');
    }
    
    // Property type segment
    if (leadData.propertyType === 'luxury') segments.push('luxury_buyer');
    if (leadData.propertyType === 'development') segments.push('development_interested');
    if (leadData.propertyType === 'land') segments.push('land_buyer');
    
    return segments;
  }

  autoAssignTags(leadData) {
    const tags = [];
    
    if (leadData.language === 'es') tags.push('spanish_speaker');
    if (leadData.language === 'en') tags.push('english_speaker');
    if (leadData.budget > 500000) tags.push('high_value');
    if (leadData.timeline === 'immediate') tags.push('urgent');
    if (leadData.isAgent) tags.push('agent_prospect');
    
    return tags;
  }

  async triggerLeadAutomation(lead) {
    console.log('[CRM] Triggering automation for lead:', lead.id);
    
    // Queue welcome email
    const emailQueue = JSON.parse(localStorage.getItem('email_queue') || '[]');
    emailQueue.push({
      type: 'welcome',
      leadId: lead.id,
      email: lead.email,
      language: lead.language || 'en',
      scheduledFor: new Date().toISOString()
    });
    localStorage.setItem('email_queue', JSON.stringify(emailQueue));
    
    // If high score, notify sales team
    if (lead.score >= 70) {
      this.notifySalesTeam(lead);
    }
    
    return true;
  }

  notifySalesTeam(lead) {
    const notifications = JSON.parse(localStorage.getItem('sales_notifications') || '[]');
    notifications.push({
      id: `NOTIF_${Date.now()}`,
      type: 'hot_lead',
      leadId: lead.id,
      message: `Hot lead: ${lead.firstName} ${lead.lastName} (Score: ${lead.score})`,
      createdAt: new Date().toISOString(),
      read: false
    });
    localStorage.setItem('sales_notifications', JSON.stringify(notifications));
  }

  // ===== PIPELINE MANAGEMENT =====
  
  getLeads(filters = {}) {
    let leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    
    if (filters.status) leads = leads.filter(l => l.status === filters.status);
    if (filters.segment) leads = leads.filter(l => l.segment?.includes(filters.segment));
    if (filters.minScore) leads = leads.filter(l => l.score >= filters.minScore);
    
    return leads.sort((a, b) => b.score - a.score);
  }

  updateLeadStatus(leadId, status) {
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    const index = leads.findIndex(l => l.id === leadId);
    if (index !== -1) {
      leads[index].status = status;
      leads[index].lastActivity = new Date().toISOString();
      localStorage.setItem('crm_leads', JSON.stringify(leads));
    }
    return leads[index];
  }

  addLeadActivity(leadId, activity) {
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    const index = leads.findIndex(l => l.id === leadId);
    if (index !== -1) {
      leads[index].activities.push({
        ...activity,
        timestamp: new Date().toISOString()
      });
      leads[index].lastActivity = new Date().toISOString();
      // Recalculate score based on activity
      leads[index].score = Math.min(leads[index].score + 5, 100);
      localStorage.setItem('crm_leads', JSON.stringify(leads));
    }
    return leads[index];
  }

  // ===== ANALYTICS =====
  
  getLeadAnalytics() {
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    
    return {
      total: leads.length,
      byStatus: {
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        negotiating: leads.filter(l => l.status === 'negotiating').length,
        won: leads.filter(l => l.status === 'won').length,
        lost: leads.filter(l => l.status === 'lost').length
      },
      bySegment: {
        usa: leads.filter(l => l.segment?.some(s => s.startsWith('usa_'))).length,
        mexico: leads.filter(l => l.segment?.some(s => s.startsWith('mx_'))).length
      },
      avgScore: leads.length ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length) : 0,
      hotLeads: leads.filter(l => l.score >= 70).length,
      conversionRate: leads.length ? Math.round((leads.filter(l => l.status === 'won').length / leads.length) * 100) : 0
    };
  }
}

export const crmService = new CRMService();
export default crmService;
'@

Set-Content -Path "$servicesPath\CRMService.js" -Value $crmService -Encoding UTF8
Write-Host "  ✅ CRMService.js" -ForegroundColor Green

# =====================================================================
# FILE 3: LEAD CAPTURE COMPONENT
# =====================================================================
Write-Host "📝 Creating LeadCaptureForm.jsx..." -ForegroundColor Yellow

$leadCaptureForm = @'
// ============================================================================
// LEAD CAPTURE FORM - Multi-language, Auto-scoring, CRM Integration
// ============================================================================

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { crmService } from '../services/CRMService';

const LeadCaptureForm = ({ 
  source = 'website',
  propertyId = null,
  onSuccess = () => {},
  variant = 'full' // 'full', 'compact', 'inline'
}) => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    budget: '',
    timeline: '',
    interests: [],
    message: '',
    language: language
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const lead = await crmService.createLead({
        ...formData,
        source,
        propertyId,
        viewedListings: parseInt(localStorage.getItem('viewed_listings') || '0')
      });

      setIsSuccess(true);
      onSuccess(lead);
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          country: '', budget: '', timeline: '', interests: [], message: '', language
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Lead capture error:', error);
    }

    setIsSubmitting(false);
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
    borderRadius: '4px',
    fontFamily: '"Helvetica Neue", sans-serif'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    background: 'rgba(203, 166, 88, 0.2)',
    border: '1px solid rgba(203, 166, 88, 0.5)',
    color: '#cba658',
    fontSize: '12px',
    letterSpacing: '3px',
    cursor: 'pointer',
    fontFamily: '"Helvetica Neue", sans-serif',
    transition: 'all 0.3s ease'
  };

  if (isSuccess) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h3 style={{ color: '#cba658', letterSpacing: '2px', marginBottom: '8px' }}>
          {language === 'en' ? 'THANK YOU!' : '¡GRACIAS!'}
        </h3>
        <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '14px' }}>
          {language === 'en' 
            ? 'We will contact you shortly.'
            : 'Nos pondremos en contacto pronto.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: variant === 'compact' ? '1fr' : '1fr 1fr', gap: '16px' }}>
        <input
          type="text"
          placeholder={t('firstName') + ' *'}
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder={t('lastName') + ' *'}
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          style={inputStyle}
          required
        />
      </div>
      
      <input
        type="email"
        placeholder={t('email') + ' *'}
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        style={inputStyle}
        required
      />
      
      <input
        type="tel"
        placeholder={t('phone')}
        value={formData.phone}
        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        style={inputStyle}
      />

      {variant === 'full' && (
        <>
          <select
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">{language === 'en' ? 'Select Country' : 'Seleccionar País'}</option>
            <option value="USA">USA</option>
            <option value="Mexico">México</option>
            <option value="Canada">Canada</option>
            <option value="Other">{language === 'en' ? 'Other' : 'Otro'}</option>
          </select>

          <select
            value={formData.budget}
            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">{language === 'en' ? 'Budget Range' : 'Rango de Presupuesto'}</option>
            <option value="250000">$100K - $250K</option>
            <option value="500000">$250K - $500K</option>
            <option value="1000000">$500K - $1M</option>
            <option value="2000000">$1M - $2M</option>
            <option value="5000000">$2M+</option>
          </select>

          <select
            value={formData.timeline}
            onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">{language === 'en' ? 'Purchase Timeline' : 'Tiempo de Compra'}</option>
            <option value="immediate">{language === 'en' ? 'Immediately' : 'Inmediatamente'}</option>
            <option value="3months">{language === 'en' ? 'Within 3 months' : 'En 3 meses'}</option>
            <option value="6months">{language === 'en' ? 'Within 6 months' : 'En 6 meses'}</option>
            <option value="12months">{language === 'en' ? 'Within 1 year' : 'En 1 año'}</option>
            <option value="exploring">{language === 'en' ? 'Just exploring' : 'Solo explorando'}</option>
          </select>

          <textarea
            placeholder={t('message')}
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
          />
        </>
      )}

      <button type="submit" style={buttonStyle} disabled={isSubmitting}>
        {isSubmitting 
          ? (language === 'en' ? 'SENDING...' : 'ENVIANDO...')
          : (language === 'en' ? 'GET IN TOUCH' : 'CONTÁCTANOS')}
      </button>
    </form>
  );
};

export default LeadCaptureForm;
'@

Set-Content -Path "$componentsPath\LeadCaptureForm.jsx" -Value $leadCaptureForm -Encoding UTF8
Write-Host "  ✅ LeadCaptureForm.jsx" -ForegroundColor Green

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   ✅ PART 1/3 COMPLETE - NOW RUN PART 2" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan