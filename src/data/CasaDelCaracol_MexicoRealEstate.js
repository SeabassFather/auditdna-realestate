// ============================================================================
// CASA DEL CARACOL - ADD TO MEXICOREALESTATE.JSX
// $15,000,000 USD Ultra-Luxury Oceanfront Estate
// ============================================================================

// ADD THIS TO YOUR PROPERTIES ARRAY IN MexicoRealEstate.jsx:

const casaDelCaracol = {
  id: "casa-del-caracol-ensenada-001",
  featured: true, // MARK AS FEATURED PROPERTY
  title: {
    en: "Casa del Caracol",
    es: "Casa del Caracol"
  },
  tagline: {
    en: "Ensenada's Crown Jewel - Oceanfront Masterpiece",
    es: "La Joya de la Corona de Ensenada - Obra Maestra Frente al Mar"
  },
  price: 15000000, // $15M USD
  priceLabel: "$15,000,000 USD",
  location: {
    city: "Ensenada",
    state: "Baja California",
    region: "Ensenada Coastline",
    coordinates: {
      lat: 31.8333,
      lng: -116.6167
    }
  },
  property: {
    type: "Single Family Residence",
    bedrooms: 8,
    bathrooms: 10,
    halfBaths: 0,
    sqft: 12000,
    lotSize: 2.5, // acres
    yearBuilt: 1995,
    yearRenovated: 2024,
    stories: 2,
    garage: 6
  },
  features: {
    interior: [
      "Hand-carved Carrara marble throughout",
      "Custom German millwork",
      "30-foot vaulted ceilings in great room",
      "La Cornue chef's kitchen",
      "Sub-Zero appliances",
      "500-bottle climate-controlled wine cellar",
      "Home theater with Dolby Atmos",
      "Professional spa with steam room & sauna",
      "Commercial-grade fitness center",
      "Smart home automation system",
      "Floor-to-ceiling ocean-view windows"
    ],
    exterior: [
      "2.5 acres of landscaped grounds",
      "Three infinity pools",
      "4,000 SF oceanfront terrace",
      "Built-in BBQ stations",
      "Multiple fire pits",
      "Professional tennis court",
      "Direct private beach access",
      "Stone staircase to beach",
      "Helipad-ready infrastructure",
      "Advanced security system",
      "Backup power generators"
    ],
    additional: [
      "Separate guest house",
      "6-car garage",
      "270-degree Pacific Ocean views",
      "Commercial zoning potential",
      "Resort conversion ready",
      "Turnkey furnished option",
      "Immediate occupancy available"
    ]
  },
  description: {
    en: `Perched on the dramatic cliffs of Ensenada's most exclusive coastline, Casa del Caracol represents the pinnacle of Baja California luxury living. This architectural masterpiece spans over 12,000 square feet of meticulously designed living space, featuring 8 bedrooms, 10 bathrooms, and unobstructed 270-degree Pacific Ocean views.

Originally commissioned in 1995 by one of Mexico's most influential families, this estate has been completely reimagined with cutting-edge technology, imported Italian finishes, and world-class amenities. The property sits on 2.5 acres of prime oceanfront land with direct beach access, infinity pools, wine cellar, home theater, and professional spa.

Every detail has been engineered for the most discerning buyer. From the hand-carved Carrara marble to the custom German millwork, from the La Cornue ranges to the 500-bottle wine cellar - this is a home that defines luxury.

One of only three oceanfront estates of this caliber in all of Ensenada. Ideal for luxury resort conversion, private compound, or multi-generational family estate.`,
    
    es: `Encaramada en los dramáticos acantilados de la costa más exclusiva de Ensenada, Casa del Caracol representa el pináculo de la vida de lujo en Baja California. Esta obra maestra arquitectónica abarca más de 12,000 pies cuadrados de espacio habitable meticulosamente diseñado, con 8 recámaras, 10 baños y vistas ininterrumpidas de 270 grados al Océano Pacífico.

Originalmente encargada en 1995 por una de las familias más influyentes de México, esta propiedad ha sido completamente reimaginada con tecnología de vanguardia, acabados italianos importados y comodidades de clase mundial. La propiedad se asienta en 2.5 acres de terreno frente al mar con acceso directo a la playa, piscinas infinitas, bodega, cine en casa y spa profesional.

Cada detalle ha sido diseñado para el comprador más exigente. Desde el mármol de Carrara tallado a mano hasta la carpintería alemana personalizada, desde las estufas La Cornue hasta la bodega de 500 botellas - este es un hogar que define el lujo.

Una de solo tres propiedades frente al mar de este calibre en todo Ensenada. Ideal para conversión a resort de lujo, complejo privado o propiedad familiar multigeneracional.`
  },
  images: [
    // REPLACE THESE WITH YOUR GOOGLE PHOTOS URLS
    {
      url: "YOUR_PHOTO_1_URL_HERE", // Front exterior aerial view
      caption: {
        en: "Oceanfront Estate - Aerial View",
        es: "Propiedad Frente al Mar - Vista Aérea"
      },
      type: "exterior"
    },
    {
      url: "YOUR_PHOTO_2_URL_HERE", // Ocean view terrace
      caption: {
        en: "270-Degree Pacific Ocean Views",
        es: "Vistas de 270 Grados al Océano Pacífico"
      },
      type: "view"
    },
    {
      url: "YOUR_PHOTO_3_URL_HERE", // Main living room
      caption: {
        en: "Great Room with 30-Foot Ceilings",
        es: "Sala Principal con Techos de 30 Pies"
      },
      type: "interior"
    },
    {
      url: "YOUR_PHOTO_4_URL_HERE", // Infinity pool sunset
      caption: {
        en: "Infinity Pool at Sunset",
        es: "Piscina Infinita al Atardecer"
      },
      type: "pool"
    },
    {
      url: "YOUR_PHOTO_5_URL_HERE", // Master bedroom
      caption: {
        en: "Master Suite with Ocean Views",
        es: "Suite Principal con Vistas al Mar"
      },
      type: "bedroom"
    },
    {
      url: "YOUR_PHOTO_6_URL_HERE", // Gourmet kitchen
      caption: {
        en: "Chef's Kitchen - La Cornue Ranges",
        es: "Cocina del Chef - Estufas La Cornue"
      },
      type: "kitchen"
    },
    {
      url: "YOUR_PHOTO_7_URL_HERE", // Wine cellar
      caption: {
        en: "500-Bottle Climate-Controlled Wine Cellar",
        es: "Bodega Climatizada de 500 Botellas"
      },
      type: "wine_cellar"
    },
    {
      url: "YOUR_PHOTO_8_URL_HERE", // Home theater
      caption: {
        en: "Private Home Theater",
        es: "Cine Privado en Casa"
      },
      type: "theater"
    },
    {
      url: "YOUR_PHOTO_9_URL_HERE", // Pool deck
      caption: {
        en: "Oceanfront Pool Deck - 4,000 SF",
        es: "Terraza de Piscina Frente al Mar - 4,000 SF"
      },
      type: "pool_deck"
    },
    {
      url: "YOUR_PHOTO_10_URL_HERE", // Outdoor dining
      caption: {
        en: "Al Fresco Dining Under the Stars",
        es: "Comedor al Aire Libre Bajo las Estrellas"
      },
      type: "outdoor_dining"
    },
    {
      url: "YOUR_PHOTO_11_URL_HERE", // Tennis court
      caption: {
        en: "Professional Tennis Court",
        es: "Cancha de Tenis Profesional"
      },
      type: "tennis"
    },
    {
      url: "YOUR_PHOTO_12_URL_HERE", // Beach access
      caption: {
        en: "Private Beach Access - Stone Staircase",
        es: "Acceso Privado a la Playa - Escalera de Piedra"
      },
      type: "beach"
    },
    {
      url: "YOUR_PHOTO_13_URL_HERE", // Spa bathroom
      caption: {
        en: "Spa Bathroom with Steam Room",
        es: "Baño Spa con Vapor"
      },
      type: "spa"
    },
    {
      url: "YOUR_PHOTO_14_URL_HERE", // Gym
      caption: {
        en: "Commercial-Grade Fitness Center",
        es: "Gimnasio de Grado Comercial"
      },
      type: "gym"
    },
    {
      url: "YOUR_PHOTO_15_URL_HERE", // Guest house
      caption: {
        en: "Separate Guest House",
        es: "Casa de Huéspedes Separada"
      },
      type: "guest_house"
    },
    {
      url: "YOUR_PHOTO_16_URL_HERE", // Garage
      caption: {
        en: "6-Car Garage with Climate Control",
        es: "Garaje para 6 Autos con Control de Clima"
      },
      type: "garage"
    },
    {
      url: "YOUR_PHOTO_17_URL_HERE", // Sunset aerial
      caption: {
        en: "Golden Hour Aerial View",
        es: "Vista Aérea en Hora Dorada"
      },
      type: "aerial_sunset"
    },
    {
      url: "YOUR_PHOTO_18_URL_HERE", // Night exterior
      caption: {
        en: "Estate Illuminated at Night",
        es: "Propiedad Iluminada de Noche"
      },
      type: "night"
    },
    {
      url: "YOUR_PHOTO_19_URL_HERE", // Entrance gate
      caption: {
        en: "Grand Entrance",
        es: "Entrada Principal"
      },
      type: "entrance"
    },
    {
      url: "YOUR_PHOTO_20_URL_HERE", // Ocean cliff view
      caption: {
        en: "Dramatic Cliffside Setting",
        es: "Ubicación Dramática en Acantilado"
      },
      type: "cliff_view"
    }
  ],
  contact: {
    agent: "Saul Garcia",
    title: "CEO",
    company: "CM Products International / MexaUSA Food Group",
    phone: "+52 646 340 2686",
    whatsapp: "+52 646 340 2686",
    email: "saul@enjoybaja.com",
    website: "enjoybaja.com",
    license: "NMLS #337526"
  },
  status: "Active",
  listingType: "Exclusive",
  showingType: "By Appointment Only",
  virtualTour: false, // Set to true if you add 360° tour
  videoTour: false,   // Set to true if you add video
  floorPlan: false,   // Set to true if you add floor plans
  tags: [
    "Oceanfront",
    "Luxury Estate",
    "Beach Access",
    "Infinity Pool",
    "Wine Cellar",
    "Home Theater",
    "Tennis Court",
    "Guest House",
    "Commercial Potential",
    "Resort Ready",
    "Smart Home",
    "Furnished Available"
  ],
  investmentHighlights: {
    en: [
      "One of only 3 estates of this caliber in Ensenada",
      "Commercial zoning - resort conversion potential",
      "2.5 acres prime oceanfront land",
      "Direct beach access via private staircase",
      "Turnkey furnished option available",
      "Immediate occupancy",
      "Helipad-ready infrastructure",
      "Strong rental income potential"
    ],
    es: [
      "Una de solo 3 propiedades de este calibre en Ensenada",
      "Zonificación comercial - potencial de conversión a resort",
      "2.5 acres de terreno premium frente al mar",
      "Acceso directo a la playa vía escalera privada",
      "Opción amueblada llave en mano disponible",
      "Ocupación inmediata",
      "Infraestructura lista para helipuerto",
      "Fuerte potencial de ingresos por renta"
    ]
  }
};

// ============================================================================
// INTEGRATION INSTRUCTIONS:
// ============================================================================

/* 
1. ADD TO PROPERTIES ARRAY:
   - Add casaDelCaracol object to your properties array in MexicoRealEstate.jsx

2. MARK AS FEATURED:
   - Set featured: true (already done above)
   - Display on landing page in "Featured Properties" section

3. REPLACE IMAGE URLS:
   - Download images from: https://photos.app.goo.gl/jv25yhquzts1RZHp9
   - Upload to your image host
   - Replace all "YOUR_PHOTO_X_URL_HERE" with actual URLs
   - Total: 20 images needed

4. SEARCH INTEGRATION:
   - Property will appear in:
     ✓ Ensenada region filter
     ✓ Price range: $10M-$20M+
     ✓ 8+ bedroom filter
     ✓ "Oceanfront" tag filter
     ✓ Featured properties carousel

5. WHATSAPP INTEGRATION:
   - Contact button should open: 
     https://wa.me/526463402686?text=I'm interested in Casa del Caracol - $15M Ensenada Estate

6. CALENDAR SCHEDULING:
   - "Schedule Showing" should integrate with your Google Calendar API
   - Contact: saul@enjoybaja.com

7. BILINGUAL TOGGLE:
   - Use language === 'english' ? data.en : data.es pattern
   - All text fields have both English and Spanish versions
*/

export default casaDelCaracol;