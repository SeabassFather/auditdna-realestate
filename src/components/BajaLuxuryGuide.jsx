import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import LuxuryGoods from './LuxuryGoods';
import SelfServiceAdPortal from './SelfServiceAdPortal';

// ============================================================================
// ACCORDION COMPONENTS
// ============================================================================
function Accordion({ children, defaultOpen = -1 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return (
    <div>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          isOpen: openIndex === i,
          onToggle: () => setOpenIndex(openIndex === i ? -1 : i),
        })
      )}
    </div>
  );
}

function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(148,163,184,0.1)', marginBottom: '8px' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 0',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#e2e8f0'
        }}
      >
        <span style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#cba658' }}>
          {title}
        </span>
        {isOpen ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
      </button>
      {isOpen && (
        <div style={{ paddingBottom: '24px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function BajaLuxuryGuide() {
  const [language, setLanguage] = useState('english');
  const [activeTab, setActiveTab] = useState('guide');
  const [isMobile, setIsMobile] = useState(false);
  const [magazinePage, setMagazinePage] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Audio controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // ============================================================================
  // TRANSLATIONS
  // ============================================================================
  const labels = {
    english: {
      slogan: "Where the Stars Come to Shine",
      header: "BAJA CALIFORNIA",
      sub: "THE LUXURY GUIDE",
      establishments: "Select Establishments",
      toggle: "ES",
      tabs: { 
        guide: "Guide", 
        magazine: "Magazine", 
        journal: "Journal", 
        partners: "Partners", 
        collection: "Collection",
        advertise: "Advertise"
      },
      featured: {
        winery: "Winery",
        dish: "Cuisine",
        cocktail: "Mixology",
        hotel: "Residence",
        experience: "Adventure",
        chef: "Culinary"
      },
      newsletter: {
        title: "The Inner Circle",
        subtitle: "Receive exclusive access to Baja's most coveted experiences",
        placeholder: "Your email address",
        button: "Subscribe",
        success: "Welcome to the circle"
      },
      journal: {
        title: "The Journal",
        subtitle: "Perspectives on Baja California",
        readMore: "Continue Reading"
      },
      magazine: {
        title: "Digital Edition",
        subtitle: "Winter 2026",
        page: "Page"
      },
      partners: {
        title: "Partnership Inquiries",
        subtitle: "For distinguished brands seeking elevated exposure",
        cta: "Begin Conversation",
        benefits: ["Editorial Feature", "Magazine Placement", "Newsletter Inclusion", "Private Events"]
      },
      advertise: {
        title: "Advertise With Us",
        subtitle: "Reach high-net-worth individuals seeking Baja's finest experiences",
        cta: "View Packages"
      }
    },
    spanish: {
      slogan: "Donde las Estrellas Vienen a Brillar",
      header: "BAJA CALIFORNIA",
      sub: "LA GUÍA DE LUJO",
      establishments: "Establecimientos Selectos",
      toggle: "EN",
      tabs: { 
        guide: "Guía", 
        magazine: "Revista", 
        journal: "Diario", 
        partners: "Socios", 
        collection: "Colección",
        advertise: "Anunciar"
      },
      featured: {
        winery: "Viñedo",
        dish: "Gastronomía",
        cocktail: "Mixología",
        hotel: "Residencia",
        experience: "Aventura",
        chef: "Culinario"
      },
      newsletter: {
        title: "El Círculo Interno",
        subtitle: "Recibe acceso exclusivo a las experiencias más codiciadas de Baja",
        placeholder: "Tu correo electrónico",
        button: "Suscribirse",
        success: "Bienvenido al círculo"
      },
      journal: {
        title: "El Diario",
        subtitle: "Perspectivas sobre Baja California",
        readMore: "Continuar Leyendo"
      },
      magazine: {
        title: "Edición Digital",
        subtitle: "Invierno 2026",
        page: "Página"
      },
      partners: {
        title: "Consultas de Asociación",
        subtitle: "Para marcas distinguidas que buscan exposición elevada",
        cta: "Iniciar Conversación",
        benefits: ["Artículo Editorial", "Ubicación en Revista", "Inclusión en Newsletter", "Eventos Privados"]
      },
      advertise: {
        title: "Anúnciate Con Nosotros",
        subtitle: "Alcanza a individuos de alto patrimonio que buscan las mejores experiencias de Baja",
        cta: "Ver Paquetes"
      }
    },
  };

  const t = labels[language];

  // ============================================================================
  // FEATURED CONTENT DATA
  // ============================================================================
  const featuredContent = [
    {
      key: 'winery',
      name: "Monte Xanic",
      location: "Valle de Guadalupe",
      description: language === 'english' 
        ? "Pioneering excellence since 1988. The Gran Ricardo blend has defined Baja wine for three decades."
        : "Excelencia pionera desde 1988. La mezcla Gran Ricardo ha definido el vino de Baja por tres décadas.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80"
    },
    {
      key: 'dish',
      name: "Baja Med Cuisine",
      location: "Ensenada",
      description: language === 'english'
        ? "The fusion of Mediterranean techniques with Baja's bounty. Fresh seafood meets local wine."
        : "La fusión de técnicas mediterráneas con la abundancia de Baja. Mariscos frescos con vino local.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
    },
    {
      key: 'cocktail',
      name: "Craft Mixology",
      location: "Tijuana",
      description: language === 'english'
        ? "Artisanal cocktails featuring local spirits and fresh ingredients from Baja farms."
        : "Cócteles artesanales con licores locales e ingredientes frescos de granjas de Baja.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80"
    },
    {
      key: 'hotel',
      name: "Cuatro Cuatros",
      location: "Valle de Guadalupe",
      description: language === 'english'
        ? "Sustainable luxury overlooking the vineyards. Architecture that honors the land."
        : "Lujo sostenible con vista a los viñedos. Arquitectura que honra la tierra.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"
    }
  ];

  // ============================================================================
  // ESTABLISHMENTS DATA
  // ============================================================================
  const categories = [
    {
      name: language === 'english' ? 'Wineries' : 'Viñedos',
      establishments: [
        { name: 'Monte Xanic', region: 'Valle de Guadalupe', website: 'https://montexanic.com', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
        { name: 'Vena Cava', region: 'Valle de Guadalupe', website: 'https://venacava.com', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
        { name: 'Finca La Carrodilla', region: 'Valle de Guadalupe', website: '#', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80' }
      ]
    },
    {
      name: language === 'english' ? 'Fine Dining' : 'Alta Cocina',
      establishments: [
        { name: 'Fauna', region: 'Valle de Guadalupe', website: 'https://faunarestaurante.com', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
        { name: 'Corazón de Tierra', region: 'Valle de Guadalupe', website: 'https://corazondetierra.com', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' },
        { name: 'Manzanilla', region: 'Ensenada', website: 'https://manzanilla.mx', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' }
      ]
    },
    {
      name: language === 'english' ? 'Boutique Hotels' : 'Hoteles Boutique',
      establishments: [
        { name: 'Cuatro Cuatros', region: 'Valle de Guadalupe', website: 'https://cuatrocuatros.com', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80' },
        { name: 'Encuentro Guadalupe', region: 'Valle de Guadalupe', website: 'https://encuentroguadalupe.com', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80' },
        { name: 'Bruma', region: 'Valle de Guadalupe', website: 'https://bruma.mx', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' }
      ]
    }
  ];

  // ============================================================================
  // JOURNAL ARTICLES
  // ============================================================================
  const journalArticles = [
    {
      id: 1,
      title: language === 'english' ? "The New Wave of Baja Winemakers" : "La Nueva Ola de Vinicultores de Baja",
      excerpt: language === 'english' 
        ? "How a generation of young vintners is redefining Mexican wine culture in Valle de Guadalupe."
        : "Cómo una generación de jóvenes vinicultores está redefiniendo la cultura del vino mexicano.",
      date: "January 2026",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
    },
    {
      id: 2,
      title: language === 'english' ? "Architecture of the Valley" : "Arquitectura del Valle",
      excerpt: language === 'english'
        ? "The sustainable design philosophy shaping Baja's most distinctive hotels and restaurants."
        : "La filosofía de diseño sostenible que da forma a los hoteles y restaurantes más distintivos.",
      date: "December 2025",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80"
    },
    {
      id: 3,
      title: language === 'english' ? "Farm to Table: Baja Style" : "Del Campo a la Mesa: Estilo Baja",
      excerpt: language === 'english'
        ? "Meet the farmers and chefs building Baja's most celebrated culinary movement."
        : "Conoce a los agricultores y chefs que construyen el movimiento culinario más celebrado.",
      date: "November 2025",
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80"
    }
  ];

  // ============================================================================
  // MAGAZINE PAGES
  // ============================================================================
  const magazinePages = [
    { type: 'cover', title: 'ENJOY BAJA', subtitle: t.magazine.subtitle },
    { type: 'article', title: language === 'english' ? 'Valle de Guadalupe' : 'Valle de Guadalupe', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80' },
    { type: 'article', title: language === 'english' ? 'Culinary Excellence' : 'Excelencia Culinaria', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
    { type: 'article', title: language === 'english' ? 'Coastal Living' : 'Vida Costera', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' }
  ];

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      color: '#e2e8f0',
      fontFamily: '"Helvetica Neue", -apple-system, sans-serif',
      fontWeight: '100'
    }}>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* HEADER */}
      <header style={{
        padding: isMobile ? '40px 20px' : '60px 40px',
        borderBottom: '1px solid rgba(148,163,184,0.1)',
        position: 'relative'
      }}>
        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'english' ? 'spanish' : 'english')}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: '1px solid rgba(203,166,88,0.5)',
            color: '#cba658',
            padding: '8px 16px',
            fontSize: '10px',
            letterSpacing: '2px',
            cursor: 'pointer'
          }}
        >
          {t.toggle}
        </button>

        {/* Audio Controls */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          gap: '10px'
        }}>
          <button
            onClick={togglePlay}
            style={{
              background: 'transparent',
              border: '1px solid rgba(148,163,184,0.3)',
              color: '#94a3b8',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={toggleMute}
            style={{
              background: 'transparent',
              border: '1px solid rgba(148,163,184,0.3)',
              color: '#94a3b8',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{
            fontSize: '10px',
            color: '#94a3b8',
            letterSpacing: '6px',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            {t.header}
          </p>
          <h1 style={{
            fontSize: isMobile ? '28px' : '42px',
            fontWeight: '100',
            letterSpacing: '8px',
            marginBottom: '12px',
            color: '#cba658'
          }}>
            {t.sub}
          </h1>
          <p style={{
            fontSize: '12px',
            color: '#94a3b8',
            fontStyle: 'italic',
            letterSpacing: '2px'
          }}>
            "{t.slogan}"
          </p>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '12px' : '32px',
        padding: '24px 20px',
        borderBottom: '1px solid rgba(148,163,184,0.1)',
        flexWrap: 'wrap'
      }}>
        {Object.entries(t.tabs).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === key ? '#cba658' : '#94a3b8',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: '8px 0',
              borderBottom: activeTab === key ? '1px solid #cba658' : '1px solid transparent',
              transition: 'all 0.3s'
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ padding: isMobile ? '40px 20px 120px' : '60px 40px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ==================== GUIDE TAB ==================== */}
        {activeTab === 'guide' && (
          <>
            {/* Featured Grid */}
            <section style={{ marginBottom: '80px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '24px'
              }}>
                {featuredContent.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      height: isMobile ? '300px' : '400px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '32px',
                      background: 'linear-gradient(transparent, rgba(15,23,42,0.95))'
                    }}>
                      <p style={{ fontSize: '9px', color: '#cba658', letterSpacing: '3px', marginBottom: '8px', textTransform: 'uppercase' }}>
                        {t.featured[item.key]}
                      </p>
                      <h3 style={{ fontSize: '20px', fontWeight: '300', marginBottom: '4px', color: '#e2e8f0' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Establishments Accordion */}
            <section>
              <p style={{
                fontSize: '10px',
                color: '#94a3b8',
                letterSpacing: '4px',
                marginBottom: '32px',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}>
                {t.establishments}
              </p>
              <Accordion>
                {categories.map((category, catIndex) => (
                  <AccordionItem key={catIndex} title={category.name}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                      gap: '20px'
                    }}>
                      {category.establishments.map((est, estIndex) => (
                        <div
                          key={estIndex}
                          style={{
                            background: 'rgba(30,41,59,0.5)',
                            border: '1px solid rgba(148,163,184,0.1)',
                            overflow: 'hidden'
                          }}
                        >
                          <img
                            src={est.image}
                            alt={est.name}
                            style={{
                              width: '100%',
                              height: '160px',
                              objectFit: 'cover'
                            }}
                          />
                          <div style={{ padding: '20px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: '400', marginBottom: '4px', color: '#e2e8f0' }}>
                              {est.name}
                            </h4>
                            <p style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '16px' }}>
                              {est.region}
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <button
                                onClick={() => window.open(est.website, '_blank')}
                                style={{
                                  padding: '10px 20px',
                                  background: 'linear-gradient(135deg, #cba658, #b8944d)',
                                  border: 'none',
                                  color: '#0f172a',
                                  fontSize: '10px',
                                  letterSpacing: '2px',
                                  cursor: 'pointer',
                                  textTransform: 'uppercase'
                                }}
                              >
                                {language === 'english' ? 'Visit' : 'Visitar'}
                              </button>
                              <button
                                onClick={() => {
                                  const msg = language === 'english' ? `Inquiry about ${est.name}` : `Consulta sobre ${est.name}`;
                                  window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                                }}
                                style={{
                                  padding: '10px 20px',
                                  background: 'transparent',
                                  border: '1px solid rgba(148,163,184,0.3)',
                                  color: '#94a3b8',
                                  fontSize: '10px',
                                  letterSpacing: '2px',
                                  cursor: 'pointer',
                                  textTransform: 'uppercase'
                                }}
                              >
                                {language === 'english' ? 'Inquire' : 'Consultar'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </>
        )}

        {/* ==================== MAGAZINE TAB ==================== */}
        {activeTab === 'magazine' && (
          <section>
            <div style={{
              position: 'relative',
              minHeight: isMobile ? '500px' : '600px',
              border: '1px solid rgba(148,163,184,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isMobile ? '48px 24px' : '80px',
              textAlign: 'center',
              background: 'rgba(30,41,59,0.3)'
            }}>
              {magazinePages[magazinePage].type === 'cover' ? (
                <>
                  <p style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '4px', marginBottom: '40px' }}>
                    {t.magazine.subtitle}
                  </p>
                  <h2 style={{
                    fontSize: isMobile ? '48px' : '72px',
                    fontWeight: '100',
                    letterSpacing: '12px',
                    color: '#cba658',
                    marginBottom: '40px'
                  }}>
                    {magazinePages[magazinePage].title}
                  </h2>
                  <p style={{ fontSize: '12px', color: '#94a3b8', letterSpacing: '2px' }}>
                    {t.magazine.title}
                  </p>
                </>
              ) : (
                <div style={{ width: '100%', maxWidth: '800px' }}>
                  <img
                    src={magazinePages[magazinePage].image}
                    alt={magazinePages[magazinePage].title}
                    style={{
                      width: '100%',
                      height: isMobile ? '300px' : '400px',
                      objectFit: 'cover',
                      marginBottom: '24px'
                    }}
                  />
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '300',
                    color: '#e2e8f0',
                    letterSpacing: '4px'
                  }}>
                    {magazinePages[magazinePage].title}
                  </h3>
                </div>
              )}

              {/* Page Navigation */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '24px'
              }}>
                <button
                  onClick={() => setMagazinePage(Math.max(0, magazinePage - 1))}
                  disabled={magazinePage === 0}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: magazinePage === 0 ? '#475569' : '#94a3b8',
                    cursor: magazinePage === 0 ? 'default' : 'pointer',
                    padding: '8px'
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                <span style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '2px' }}>
                  {t.magazine.page} {magazinePage + 1} / {magazinePages.length}
                </span>
                <button
                  onClick={() => setMagazinePage(Math.min(magazinePages.length - 1, magazinePage + 1))}
                  disabled={magazinePage === magazinePages.length - 1}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: magazinePage === magazinePages.length - 1 ? '#475569' : '#94a3b8',
                    cursor: magazinePage === magazinePages.length - 1 ? 'default' : 'pointer',
                    padding: '8px'
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ==================== JOURNAL TAB ==================== */}
        {activeTab === 'journal' && (
          <section>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>
                {t.journal.title}
              </p>
              <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
                {t.journal.subtitle}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {journalArticles.map(article => (
                <article
                  key={article.id}
                  style={{
                    background: 'rgba(30,41,59,0.5)',
                    border: '1px solid rgba(148,163,184,0.1)',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '300',
                      color: '#e2e8f0',
                      marginBottom: '12px',
                      lineHeight: '1.4'
                    }}>
                      {article.title}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      lineHeight: '1.7',
                      marginBottom: '20px'
                    }}>
                      {article.excerpt}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{article.date}</span>
                      <span style={{
                        fontSize: '10px',
                        color: '#cba658',
                        letterSpacing: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        {t.journal.readMore} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ==================== PARTNERS TAB ==================== */}
        {activeTab === 'partners' && (
          <section style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '48px' }}>
              <p style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>
                {t.partners.title}
              </p>
              <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '500px', margin: '0 auto' }}>
                {t.partners.subtitle}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '64px'
            }}>
              {t.partners.benefits.map((benefit, i) => (
                <div key={i} style={{
                  padding: '32px 20px',
                  border: '1px solid rgba(148,163,184,0.1)',
                  background: 'rgba(30,41,59,0.3)'
                }}>
                  <p style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    letterSpacing: '1px'
                  }}>{benefit}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const msg = language === 'english'
                  ? 'Partnership inquiry for EnjoyBaja.com - I\'d like to become a Lifestyle Partner'
                  : 'Consulta de asociación para EnjoyBaja.com - Me gustaría ser Socio de Estilo';
                window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              style={{
                padding: '18px 48px',
                background: 'linear-gradient(135deg, #cba658, #b8944d)',
                border: 'none',
                color: '#0f172a',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '3px',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {t.partners.cta}
            </button>
          </section>
        )}

        {/* ==================== COLLECTION TAB - LUXURY GOODS ==================== */}
        {activeTab === 'collection' && (
          <section style={{ 
            margin: '-60px -40px -120px -40px',
            position: 'relative'
          }}>
            <LuxuryGoods />
          </section>
        )}

        {/* ==================== ADVERTISE TAB - SELF SERVICE AD PORTAL ==================== */}
        {activeTab === 'advertise' && (
          <section style={{ 
            margin: '-60px -40px -120px -40px',
            position: 'relative'
          }}>
            <SelfServiceAdPortal embedded={true} />
          </section>
        )}

        {/* ==================== NEWSLETTER (Guide tab only) ==================== */}
        {activeTab === 'guide' && (
          <section style={{
            marginTop: '80px',
            padding: '60px 40px',
            border: '1px solid rgba(148,163,184,0.1)',
            textAlign: 'center',
            background: 'rgba(30,41,59,0.3)'
          }}>
            <h3 style={{
              fontSize: '12px',
              letterSpacing: '4px',
              marginBottom: '16px',
              color: '#cba658',
              textTransform: 'uppercase'
            }}>
              {t.newsletter.title}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#94a3b8',
              marginBottom: '32px',
              maxWidth: '400px',
              margin: '0 auto 32px'
            }}>
              {t.newsletter.subtitle}
            </p>
            {subscribed ? (
              <p style={{ color: '#86efac', fontSize: '12px', letterSpacing: '2px' }}>
                {t.newsletter.success}
              </p>
            ) : (
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  style={{
                    padding: '14px 20px',
                    background: 'rgba(15,23,42,0.8)',
                    border: '1px solid rgba(148,163,184,0.2)',
                    color: '#e2e8f0',
                    fontSize: '12px',
                    width: isMobile ? '100%' : '280px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => {
                    if (email) setSubscribed(true);
                  }}
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #cba658, #b8944d)',
                    border: 'none',
                    color: '#0f172a',
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {t.newsletter.button}
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid rgba(148,163,184,0.1)',
        textAlign: 'center',
        background: 'rgba(15,23,42,0.8)'
      }}>
        <p style={{
          fontSize: '10px',
          color: '#cba658',
          letterSpacing: '3px',
          marginBottom: '12px',
          fontStyle: 'italic'
        }}>
          "{t.slogan}"
        </p>
        <p style={{
          fontSize: '10px',
          color: '#64748b',
          letterSpacing: '2px'
        }}>
          SAUL GARCIA • NMLS #337526 • +52 646 340 2686
        </p>
      </footer>
    </div>
  );
}