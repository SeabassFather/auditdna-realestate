// =============================================
// AUDITDNA MEDIA INTELLIGENCE ENGINE (AMIE)
// AD SLOT CONFIGURATION
// =============================================
// DO NOT EDIT App.js - This is a standalone config
// Slots define WHERE ads CAN appear (not the ads themselves)
// =============================================

const AdSlotConfig = {
  
  // ========== SLOT TIERS ==========
  tiers: {
    ICON: {
      id: 'ICON',
      name: 'Icon Placement',
      description: 'Ultra-premium, one advertiser per category',
      priceMultiplier: 3.0,
      exclusivityRequired: true,
      conciergeOnboarding: true,
      editorialAlignment: true
    },
    ELITE: {
      id: 'ELITE', 
      name: 'Elite Placement',
      description: 'Limited competition, time-boxed exposure',
      priceMultiplier: 2.0,
      exclusivityRequired: false,
      geoTargeting: true,
      performanceOptimization: true
    },
    CURATED: {
      id: 'CURATED',
      name: 'Curated Display',
      description: 'Approval required, filtered advertisers',
      priceMultiplier: 1.0,
      exclusivityRequired: false,
      approvalRequired: true
    }
  },

  // ========== ADVERTISER TYPES ==========
  advertiserTypes: [
    'LUXURY_DEVELOPER',
    'REAL_ESTATE_BROKER',
    'MORTGAGE_LENDER',
    'TITLE_COMPANY',
    'ATTORNEY',
    'BANK',
    'INSURANCE',
    'INTERIOR_DESIGN',
    'ARCHITECTURE',
    'PROPERTY_MANAGEMENT',
    'CONCIERGE_SERVICE',
    'YACHT_BROKER',
    'WINE_VINEYARD',
    'LUXURY_AUTO',
    'PRIVATE_AVIATION'
  ],

  // ========== PAGE SLOTS ==========
  slots: {
    
    // ----- LANDING PAGE -----
    LANDING_HERO: {
      id: 'LANDING_HERO',
      page: 'Landing',
      section: 'Hero',
      tier: 'ICON',
      basePrice: 25000,
      allowedTypes: ['LUXURY_DEVELOPER', 'REAL_ESTATE_BROKER'],
      maxAdvertisers: 1,
      dimensions: { width: 1920, height: 600 },
      position: 'above-fold'
    },
    
    LANDING_CARD_SPONSOR: {
      id: 'LANDING_CARD_SPONSOR',
      page: 'Landing',
      section: 'CardGrid',
      tier: 'ELITE',
      basePrice: 7500,
      allowedTypes: ['LUXURY_DEVELOPER', 'MORTGAGE_LENDER', 'BANK'],
      maxAdvertisers: 4,
      dimensions: { width: 400, height: 280 },
      position: 'card-overlay'
    },
    
    LANDING_FOOTER: {
      id: 'LANDING_FOOTER',
      page: 'Landing',
      section: 'Footer',
      tier: 'CURATED',
      basePrice: 2500,
      allowedTypes: ['ATTORNEY', 'TITLE_COMPANY', 'INSURANCE'],
      maxAdvertisers: 3,
      dimensions: { width: 300, height: 100 },
      position: 'footer-banner'
    },

    // ----- MEXICO REAL ESTATE PAGE -----
    MX_HERO: {
      id: 'MX_HERO',
      page: 'MexicoRealEstate',
      section: 'Hero',
      tier: 'ICON',
      basePrice: 20000,
      allowedTypes: ['LUXURY_DEVELOPER', 'REAL_ESTATE_BROKER'],
      maxAdvertisers: 1,
      dimensions: { width: 1920, height: 500 },
      position: 'hero-overlay',
      geoLock: ['BAJA_CALIFORNIA', 'BAJA_SUR']
    },
    
    MX_PROPERTY_SEARCH: {
      id: 'MX_PROPERTY_SEARCH',
      page: 'MexicoRealEstate',
      section: 'PropertySearch',
      tier: 'ELITE',
      basePrice: 12000,
      allowedTypes: ['REAL_ESTATE_BROKER', 'LUXURY_DEVELOPER'],
      maxAdvertisers: 2,
      dimensions: { width: 728, height: 90 },
      position: 'search-header'
    },
    
    MX_ACCORDION_FINANCING: {
      id: 'MX_ACCORDION_FINANCING',
      page: 'MexicoRealEstate',
      section: 'CrossBorderFinancing',
      tier: 'ELITE',
      basePrice: 10000,
      allowedTypes: ['MORTGAGE_LENDER', 'BANK'],
      maxAdvertisers: 1,
      dimensions: { width: 600, height: 150 },
      position: 'accordion-content',
      exclusiveCategory: true
    },
    
    MX_ACCORDION_LEGAL: {
      id: 'MX_ACCORDION_LEGAL',
      page: 'MexicoRealEstate',
      section: 'LegalFideicomiso',
      tier: 'ELITE',
      basePrice: 8000,
      allowedTypes: ['ATTORNEY', 'TITLE_COMPANY'],
      maxAdvertisers: 1,
      dimensions: { width: 600, height: 150 },
      position: 'accordion-content',
      exclusiveCategory: true
    },
    
    MX_TEAM_FOOTER: {
      id: 'MX_TEAM_FOOTER',
      page: 'MexicoRealEstate',
      section: 'Team',
      tier: 'CURATED',
      basePrice: 3500,
      allowedTypes: ['INSURANCE', 'CONCIERGE_SERVICE', 'PROPERTY_MANAGEMENT'],
      maxAdvertisers: 2,
      dimensions: { width: 300, height: 250 },
      position: 'below-team'
    },

    // ----- DEVELOPMENTS PAGE -----
    DEV_HERO: {
      id: 'DEV_HERO',
      page: 'Developments',
      section: 'Hero',
      tier: 'ICON',
      basePrice: 30000,
      allowedTypes: ['LUXURY_DEVELOPER'],
      maxAdvertisers: 1,
      dimensions: { width: 1920, height: 600 },
      position: 'hero-takeover',
      exclusiveCategory: true
    },
    
    DEV_PROJECT_FEATURE: {
      id: 'DEV_PROJECT_FEATURE',
      page: 'Developments',
      section: 'ProjectGrid',
      tier: 'ICON',
      basePrice: 15000,
      allowedTypes: ['LUXURY_DEVELOPER'],
      maxAdvertisers: 3,
      dimensions: { width: 500, height: 400 },
      position: 'featured-project',
      editorialIntegration: true
    },
    
    DEV_SIDEBAR: {
      id: 'DEV_SIDEBAR',
      page: 'Developments',
      section: 'Sidebar',
      tier: 'CURATED',
      basePrice: 4000,
      allowedTypes: ['ARCHITECTURE', 'INTERIOR_DESIGN', 'BANK'],
      maxAdvertisers: 4,
      dimensions: { width: 300, height: 250 },
      position: 'sticky-sidebar'
    },

    // ----- USA MORTGAGE PAGE -----
    USA_HERO: {
      id: 'USA_HERO',
      page: 'USAMortgage',
      section: 'Hero',
      tier: 'ICON',
      basePrice: 18000,
      allowedTypes: ['MORTGAGE_LENDER', 'BANK'],
      maxAdvertisers: 1,
      dimensions: { width: 1920, height: 400 },
      position: 'hero-banner'
    },
    
    USA_CALCULATOR: {
      id: 'USA_CALCULATOR',
      page: 'USAMortgage',
      section: 'Calculator',
      tier: 'ELITE',
      basePrice: 12000,
      allowedTypes: ['MORTGAGE_LENDER', 'BANK', 'INSURANCE'],
      maxAdvertisers: 1,
      dimensions: { width: 728, height: 90 },
      position: 'calculator-sponsor',
      exclusiveCategory: true
    },
    
    USA_ACCORDION_SPONSOR: {
      id: 'USA_ACCORDION_SPONSOR',
      page: 'USAMortgage',
      section: 'Accordion',
      tier: 'ELITE',
      basePrice: 6000,
      allowedTypes: ['TITLE_COMPANY', 'ATTORNEY', 'INSURANCE'],
      maxAdvertisers: 3,
      dimensions: { width: 600, height: 100 },
      position: 'accordion-footer'
    },

    // ----- LIFESTYLE PAGE -----
    LIFE_HERO: {
      id: 'LIFE_HERO',
      page: 'Lifestyle',
      section: 'Hero',
      tier: 'ICON',
      basePrice: 22000,
      allowedTypes: ['WINE_VINEYARD', 'LUXURY_AUTO', 'PRIVATE_AVIATION', 'YACHT_BROKER'],
      maxAdvertisers: 1,
      dimensions: { width: 1920, height: 600 },
      position: 'hero-takeover'
    },
    
    LIFE_EDITORIAL: {
      id: 'LIFE_EDITORIAL',
      page: 'Lifestyle',
      section: 'Editorial',
      tier: 'ICON',
      basePrice: 15000,
      allowedTypes: ['WINE_VINEYARD', 'CONCIERGE_SERVICE', 'LUXURY_AUTO'],
      maxAdvertisers: 2,
      dimensions: { width: 800, height: 500 },
      position: 'native-content',
      editorialIntegration: true
    }
  },

  // ========== GEO REGIONS ==========
  geoRegions: {
    BAJA_CALIFORNIA: {
      id: 'BAJA_CALIFORNIA',
      name: 'Baja California',
      cities: ['Tijuana', 'Rosarito', 'Ensenada', 'Valle de Guadalupe', 'San Felipe'],
      surgeMultiplier: 1.2
    },
    BAJA_SUR: {
      id: 'BAJA_SUR',
      name: 'Baja California Sur',
      cities: ['La Paz', 'Cabo San Lucas', 'San Jose del Cabo', 'Loreto', 'Todos Santos'],
      surgeMultiplier: 1.5
    },
    USA_CALIFORNIA: {
      id: 'USA_CALIFORNIA',
      name: 'California',
      cities: ['San Diego', 'Los Angeles', 'San Francisco', 'Sacramento'],
      surgeMultiplier: 1.3
    },
    USA_TEXAS: {
      id: 'USA_TEXAS',
      name: 'Texas',
      cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
      surgeMultiplier: 1.1
    }
  },

  // ========== PRICING MULTIPLIERS ==========
  pricingMultipliers: {
    HIGH_NET_WORTH_AUDIENCE: 1.30,
    GEO_TARGETED: 1.20,
    TIME_SENSITIVE_LAUNCH: 1.25,
    EXCLUSIVITY: 1.50,
    AI_OPTIMIZED: 1.15,
    PEAK_SEASON: 1.35,
    MARKET_SURGE: 1.40
  },

  // ========== BLACKOUT DATES ==========
  blackoutDates: [
    // Add dates when NO ads should run
    // Format: 'YYYY-MM-DD'
  ]
};

// ========== HELPER FUNCTIONS ==========

export function getSlotById(slotId) {
  return AdSlotConfig.slots[slotId] || null;
}

export function getSlotsByPage(page) {
  return Object.values(AdSlotConfig.slots).filter(slot => slot.page === page);
}

export function getSlotsByTier(tier) {
  return Object.values(AdSlotConfig.slots).filter(slot => slot.tier === tier);
}

export function calculateSlotPrice(slotId, multipliers = []) {
  const slot = getSlotById(slotId);
  if (!slot) return null;
  
  let price = slot.basePrice;
  const tierMultiplier = AdSlotConfig.tiers[slot.tier]?.priceMultiplier || 1.0;
  price *= tierMultiplier;
  
  multipliers.forEach(mult => {
    if (AdSlotConfig.pricingMultipliers[mult]) {
      price *= AdSlotConfig.pricingMultipliers[mult];
    }
  });
  
  return Math.round(price);
}

export function isSlotAvailableForType(slotId, advertiserType) {
  const slot = getSlotById(slotId);
  if (!slot) return false;
  return slot.allowedTypes.includes(advertiserType);
}

export default AdSlotConfig;