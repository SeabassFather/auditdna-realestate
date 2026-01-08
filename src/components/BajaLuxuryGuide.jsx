import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

function Accordion({ children, defaultOpen = -1 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      open: openIndex === i,
      onHeaderClick: () => setOpenIndex(openIndex === i ? -1 : i),
    })
  );
}

function AccordionItem({ title, open, onHeaderClick, children }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '12px',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)'
    }}>
      <button
        type="button"
        onClick={onHeaderClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px',
          background: open ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{
          fontSize: '13px',
          fontWeight: '400',
          color: '#e2e8f0',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>{title}</span>
        {open ? <ChevronUp size={18} color="#a1a1aa" /> : <ChevronDown size={18} color="#a1a1aa" />}
      </button>
      {open && (
        <div style={{ padding: '32px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function BajaLuxuryGuide() {
  const [language, setLanguage] = useState("english");
  const [establishments, setEstablishments] = useState([]);
  const [activeTab, setActiveTab] = useState("guide");
  const [magazinePage, setMagazinePage] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('/lifestyle-data/baja-luxury-complete.json')
      .then(res => res.json())
      .then(data => setEstablishments(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const labels = {
    english: {
      slogan: "Where the Stars Come to Shine",
      header: "BAJA CALIFORNIA",
      sub: "THE LUXURY GUIDE",
      establishments: "Curated Establishments",
      toggle: "ES",
      tabs: { guide: "Guide", magazine: "Magazine", journal: "Journal", partners: "Partners" },
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
        subtitle: "For distinguished brands seeking elevated exposure in Baja California's premier luxury market",
        cta: "Begin Conversation",
        benefits: ["Editorial Feature", "Magazine Placement", "Newsletter Inclusion", "Private Events"]
      }
    },
    spanish: {
      slogan: "Donde las Estrellas Vienen a Brillar",
      header: "BAJA CALIFORNIA",
      sub: "LA GUIA DE LUJO",
      establishments: "Establecimientos Selectos",
      toggle: "EN",
      tabs: { guide: "Guia", magazine: "Revista", journal: "Diario", partners: "Socios" },
      featured: {
        winery: "Vinedo",
        dish: "Gastronomia",
        cocktail: "Mixologia",
        hotel: "Residencia",
        experience: "Aventura",
        chef: "Culinario"
      },
      newsletter: {
        title: "El Circulo Interno",
        subtitle: "Recibe acceso exclusivo a las experiencias mas codiciadas de Baja",
        placeholder: "Tu correo electronico",
        button: "Suscribirse",
        success: "Bienvenido al circulo"
      },
      journal: {
        title: "El Diario",
        subtitle: "Perspectivas sobre Baja California",
        readMore: "Continuar Leyendo"
      },
      magazine: {
        title: "Edicion Digital",
        subtitle: "Invierno 2026",
        page: "Pagina"
      },
      partners: {
        title: "Consultas de Asociacion",
        subtitle: "Para marcas distinguidas que buscan exposicion elevada en el mercado de lujo de Baja California",
        cta: "Iniciar Conversacion",
        benefits: ["Articulo Editorial", "Ubicacion en Revista", "Inclusion en Newsletter", "Eventos Privados"]
      }
    },
  };

  const t = labels[language];

  // REAL IMAGES FROM ACTUAL ESTABLISHMENTS
  const featuredContent = [
    {
      key: 'winery',
      name: "Monte Xanic",
      location: "Valle de Guadalupe",
      description: language === 'english' 
        ? "Mexico's first boutique winery since 1988. The Gran Ricardo blend defines Baja wine excellence."
        : "La primera bodega boutique de Mexico desde 1988. La mezcla Gran Ricardo define la excelencia del vino de Baja.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
      website: "https://montexanic.com.mx"
    },
    {
      key: 'dish',
      name: "Fauna Restaurant",
      location: "Valle de Guadalupe",
      description: language === 'english'
        ? "Chef David Castro Hussong's acclaimed Baja Med cuisine at Bruma winery estate."
        : "La aclamada cocina Baja Med del Chef David Castro Hussong en la bodega Bruma.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      website: "https://brumawine.com/fauna"
    },
    {
      key: 'cocktail',
      name: "Animalon",
      location: "Valle de Guadalupe",
      description: language === 'english'
        ? "Chef Javier Plascencia's wood-fired cuisine with Baja's finest local ingredients."
        : "La cocina a lena del Chef Javier Plascencia con los mejores ingredientes locales de Baja.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      website: "https://animalon.mx"
    },
    {
      key: 'hotel',
      name: "Cuatro Cuatros",
      location: "Valle de Guadalupe",
      description: language === 'english'
        ? "Cliffside luxury where vineyard meets Pacific. Private suites with infinity ocean views."
        : "Lujo en acantilados donde el vinedo se encuentra con el Pacifico. Suites privadas con vistas infinitas.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      website: "https://cuatrocuatros.com"
    },
    {
      key: 'experience',
      name: "Kuyima Whale Watching",
      location: "San Ignacio Lagoon",
      description: language === 'english'
        ? "Touch gray whales in their UNESCO World Heritage winter sanctuary. Life-changing encounters."
        : "Toca ballenas grises en su santuario de invierno Patrimonio Mundial UNESCO. Encuentros que cambian la vida.",
      image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
      website: "https://kuyima.com"
    },
    {
      key: 'chef',
      name: "Mision 19",
      location: "Tijuana",
      description: language === 'english'
        ? "Chef Javier Plascencia's flagship restaurant. The birthplace of modern Baja Med cuisine."
        : "El restaurante insignia del Chef Javier Plascencia. La cuna de la cocina moderna Baja Med.",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
      website: "https://mision19.com"
    }
  ];

  const journalArticles = [
    {
      title: language === 'english' ? "The New Geography of Desire" : "La Nueva Geografia del Deseo",
      excerpt: language === 'english' 
        ? "How Valle de Guadalupe became the destination for those who've seen everything else."
        : "Como Valle de Guadalupe se convirtio en el destino para quienes ya lo han visto todo.",
      date: language === 'english' ? "January 2026" : "Enero 2026",
      category: language === 'english' ? "Wine & Culture" : "Vino y Cultura",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80"
    },
    {
      title: language === 'english' ? "Architecture of Escape" : "Arquitectura del Escape",
      excerpt: language === 'english'
        ? "Inside the private compounds reshaping Baja's coastline. Where minimalism meets the infinite horizon."
        : "Dentro de los complejos privados que remodelan la costa de Baja. Donde el minimalismo se encuentra con el horizonte infinito.",
      date: language === 'english' ? "January 2026" : "Enero 2026",
      category: language === 'english' ? "Design" : "Diseno",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
    },
    {
      title: language === 'english' ? "The Investment Thesis" : "La Tesis de Inversion",
      excerpt: language === 'english'
        ? "Why institutional capital is flowing into Baja California's luxury corridor."
        : "Por que el capital institucional fluye hacia el corredor de lujo de Baja California.",
      date: language === 'english' ? "December 2025" : "Diciembre 2025",
      category: language === 'english' ? "Markets" : "Mercados",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    }
  ];

  // MAGAZINE PAGES WITH REAL IMAGES
  const magazinePages = [
    {
      type: "cover",
      title: "BAJA",
      subtitle: language === 'english' ? "THE PENINSULA ISSUE" : "LA EDICION DE LA PENINSULA",
      content: language === 'english' ? "Winter 2026" : "Invierno 2026",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
    },
    {
      type: "editorial",
      title: language === 'english' ? "EDITOR'S NOTE" : "NOTA DEL EDITOR",
      content: language === 'english' 
        ? "Baja California exists in that rare space between discovery and preservation. Those who find it understand immediately why it must be protected. This edition explores the peninsula through the lens of those who've chosen to call it home."
        : "Baja California existe en ese raro espacio entre el descubrimiento y la preservacion. Quienes la encuentran comprenden de inmediato por que debe ser protegida. Esta edicion explora la peninsula a traves de quienes han elegido llamarla hogar.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80"
    },
    {
      type: "feature",
      title: language === 'english' ? "TERROIR" : "TERROIR",
      content: language === 'english' 
        ? "The unique combination of Pacific marine influence, Mediterranean climate, and volcanic soil creates wines found nowhere else on earth. Valle de Guadalupe's 200+ wineries represent the vanguard of Mexican viticulture."
        : "La combinacion unica de influencia marina del Pacifico, clima mediterraneo y suelo volcanico crea vinos que no se encuentran en ningun otro lugar del mundo. Las mas de 200 bodegas de Valle de Guadalupe representan la vanguardia de la viticultura mexicana.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80"
    },
    {
      type: "feature",
      title: language === 'english' ? "THE SHORE" : "LA COSTA",
      content: language === 'english' 
        ? "One thousand miles of coastline. From the sophisticated beach culture of Rosarito to the untouched wilderness of Bahia de los Angeles, the Baja coast offers solitude impossible to find elsewhere."
        : "Mil millas de costa. Desde la sofisticada cultura de playa de Rosarito hasta la naturaleza virgen de Bahia de los Angeles, la costa de Baja ofrece una soledad imposible de encontrar en otro lugar.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80"
    },
    {
      type: "feature",
      title: language === 'english' ? "GOLF PARADISE" : "PARAISO DEL GOLF",
      content: language === 'english' 
        ? "Championship courses designed by legends. Tiger Woods, Jack Nicklaus, and Greg Norman have all left their mark on Baja's fairways. Where every round comes with ocean views."
        : "Campos de campeonato disenados por leyendas. Tiger Woods, Jack Nicklaus y Greg Norman han dejado su huella en los fairways de Baja. Donde cada ronda viene con vistas al oceano.",
      image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80"
    },
    {
      type: "close",
      title: language === 'english' ? "CONTACT" : "CONTACTO",
      content: "+52 646 340 2686\ninfo@enjoybaja.com",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
    }
  ];

  const groupByRegion = () => {
    const grouped = {};
    establishments.forEach(est => {
      const region = est.region || 'Unknown';
      if (!grouped[region]) grouped[region] = [];
      grouped[region].push(est);
    });
    return grouped;
  };

  const grouped = groupByRegion();
  const regions = Object.keys(grouped).sort();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const tabStyle = (isActive) => ({
    padding: isMobile ? '12px 16px' : '16px 32px',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '1px solid #cba658' : '1px solid transparent',
    color: isActive ? '#e4e4e7' : '#71717a',
    fontSize: '11px',
    fontWeight: '400',
    letterSpacing: '3px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textTransform: 'uppercase'
  });

  const typeLabels = {
    winery: language === 'english' ? 'Winery' : 'Vinedo',
    restaurant: language === 'english' ? 'Restaurant' : 'Restaurante',
    hotel: language === 'english' ? 'Hotel' : 'Hotel',
    golf: language === 'english' ? 'Golf' : 'Golf',
    spa: language === 'english' ? 'Spa' : 'Spa',
    brewery: language === 'english' ? 'Brewery' : 'Cerveceria',
    yacht: language === 'english' ? 'Marina' : 'Marina'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#334155',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* GOLFER BACKGROUND - VISIBLE AND CLEAR */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.4,
        zIndex: 0
      }} />

      {/* LIGHTER OVERLAY - SEE THE GOLFER */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(51,65,85,0.5) 0%, rgba(51,65,85,0.6) 50%, rgba(51,65,85,0.7) 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{ 
        maxWidth: '1100px', 
        margin: '0 auto', 
        padding: isMobile ? '40px 20px' : '80px 40px',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* HEADER */}
        <header style={{
          textAlign: 'center',
          marginBottom: isMobile ? '60px' : '100px',
          position: 'relative'
        }}>
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "english" ? "spanish" : "english")}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(203,166,88,0.4)',
              color: '#cba658',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#cba658';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#cba658';
            }}
          >
            {t.toggle}
          </button>

          {/* Slogan */}
          <p style={{
            fontSize: '10px',
            color: '#cba658',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '32px'
          }}>
            {t.slogan}
          </p>

          {/* Main Title */}
          <h1 style={{
            fontSize: isMobile ? '36px' : '72px',
            fontWeight: '200',
            color: '#e2e8f0',
            letterSpacing: isMobile ? '8px' : '16px',
            marginBottom: '16px',
            lineHeight: '1'
          }}>
            {t.header}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#94a3b8',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            {t.sub}
          </p>

          {/* Divider */}
          <div style={{
            width: '60px',
            height: '1px',
            background: '#cba658',
            margin: '0 auto 24px'
          }} />

          {/* Count */}
          <p style={{
            fontSize: '11px',
            color: '#94a3b8',
            letterSpacing: '2px'
          }}>
            {establishments.length} {t.establishments}
          </p>
        </header>

        {/* NAVIGATION */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          marginBottom: '60px',
          borderBottom: '1px solid rgba(148,163,184,0.2)'
        }}>
          {Object.entries(t.tabs).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={tabStyle(activeTab === key)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ==================== GUIDE TAB ==================== */}
        {activeTab === "guide" && (
          <>
            {/* FEATURED GRID */}
            <section style={{ marginBottom: '80px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '24px'
              }}>
                {featuredContent.map((item, index) => (
                  <article
                    key={item.key}
                    onClick={() => window.open(item.website, '_blank')}
                    onMouseEnter={() => setHoveredCard(item.key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      position: 'relative',
                      height: isMobile ? '320px' : '400px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: '#ffffff'
                    }}
                  >
                    {/* Image - FULL COLOR VIBRANT */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredCard === item.key ? 'scale(1.05)' : 'scale(1)'
                    }} />

                    {/* Content */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '32px',
                      background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, transparent 100%)'
                    }}>
                      <p style={{
                        fontSize: '9px',
                        color: '#cba658',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        marginBottom: '12px'
                      }}>
                        {t.featured[item.key]}
                      </p>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '300',
                        color: '#e2e8f0',
                        marginBottom: '8px',
                        letterSpacing: '1px'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        marginBottom: '16px'
                      }}>
                        {item.location}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#cbd5e1',
                        lineHeight: '1.7',
                        opacity: hoveredCard === item.key ? 1 : 0,
                        transform: hoveredCard === item.key ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'all 0.4s ease'
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* NEWSLETTER */}
            <section style={{
              padding: isMobile ? '48px 24px' : '64px',
              border: '1px solid rgba(203,166,88,0.3)',
              background: 'rgba(203,166,88,0.05)',
              marginBottom: '80px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '10px',
                color: '#cba658',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>
                {t.newsletter.title}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#94a3b8',
                marginBottom: '32px',
                maxWidth: '500px',
                margin: '0 auto 32px',
                lineHeight: '1.7'
              }}>
                {t.newsletter.subtitle}
              </p>
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '12px',
                maxWidth: '480px',
                margin: '0 auto',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    background: 'rgba(15,23,42,0.8)',
                    border: '1px solid rgba(148,163,184,0.3)',
                    color: '#e2e8f0',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#cba658'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(148,163,184,0.3)'}
                />
                <button type="submit" style={{
                  padding: '16px 32px',
                  background: subscribed ? '#22c55e' : '#cba658',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s'
                }}>
                  {subscribed ? '✓' : t.newsletter.button}
                </button>
              </form>
            </section>

            {/* ESTABLISHMENTS */}
            <section>
              <Accordion defaultOpen={-1}>
                {regions.map((region) => (
                  <AccordionItem key={region} title={`${region} — ${grouped[region].length}`}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                      gap: '20px'
                    }}>
                      {grouped[region].map(est => (
                        <div key={est.id} style={{
                          padding: '24px',
                          border: '1px solid rgba(148,163,184,0.15)',
                          background: 'rgba(15,23,42,0.6)',
                          transition: 'all 0.3s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'rgba(203,166,88,0.4)';
                          e.currentTarget.style.background = 'rgba(15,23,42,0.8)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)';
                          e.currentTarget.style.background = 'rgba(15,23,42,0.6)';
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <p style={{
                              fontSize: '9px',
                              color: '#cba658',
                              letterSpacing: '2px',
                              textTransform: 'uppercase'
                            }}>{typeLabels[est.type] || est.type}</p>
                          </div>
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#e2e8f0',
                            marginBottom: '8px',
                            letterSpacing: '0.5px'
                          }}>{est.name}</h3>
                          <p style={{
                            fontSize: '12px',
                            color: '#94a3b8',
                            lineHeight: '1.6',
                            marginBottom: '20px'
                          }}>{est.description || est.city}</p>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                              onClick={() => est.website && window.open(est.website, '_blank')}
                              style={{
                                padding: '10px 20px',
                                background: 'transparent',
                                border: '1px solid rgba(148,163,184,0.3)',
                                color: '#94a3b8',
                                fontSize: '10px',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#cba658';
                                e.currentTarget.style.color = '#0f172a';
                                e.currentTarget.style.borderColor = '#cba658';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#94a3b8';
                                e.currentTarget.style.borderColor = 'rgba(148,163,184,0.3)';
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
                                textTransform: 'uppercase',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#cba658';
                                e.currentTarget.style.color = '#0f172a';
                                e.currentTarget.style.borderColor = '#cba658';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#94a3b8';
                                e.currentTarget.style.borderColor = 'rgba(148,163,184,0.3)';
                              }}
                            >
                              {language === 'english' ? 'Inquire' : 'Consultar'}
                            </button>
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

        {/* ==================== MAGAZINE TAB - WITH REAL IMAGES ==================== */}
        {activeTab === "magazine" && (
          <section>
            <div style={{
              position: 'relative',
              minHeight: isMobile ? '500px' : '600px',
              overflow: 'hidden'
            }}>
              {/* BACKGROUND IMAGE */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${magazinePages[magazinePage].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4
              }} />

              {/* OVERLAY */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.9) 100%)'
              }} />

              {/* CONTENT */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: isMobile ? '500px' : '600px',
                padding: isMobile ? '48px 24px' : '80px',
                textAlign: 'center'
              }}>
                {magazinePages[magazinePage].type === 'cover' ? (
                  <>
                    <p style={{ fontSize: '10px', color: '#cba658', letterSpacing: '4px', marginBottom: '40px' }}>
                      {t.magazine.subtitle}
                    </p>
                    <h2 style={{
                      fontSize: isMobile ? '64px' : '120px',
                      fontWeight: '100',
                      color: '#e2e8f0',
                      letterSpacing: '20px',
                      marginBottom: '24px'
                    }}>
                      {magazinePages[magazinePage].title}
                    </h2>
                    <p style={{ fontSize: '12px', color: '#94a3b8', letterSpacing: '4px' }}>
                      {magazinePages[magazinePage].subtitle}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 style={{
                      fontSize: isMobile ? '24px' : '36px',
                      fontWeight: '200',
                      color: '#e2e8f0',
                      letterSpacing: '6px',
                      marginBottom: '40px'
                    }}>
                      {magazinePages[magazinePage].title}
                    </h2>
                    <p style={{
                      fontSize: '15px',
                      color: '#cbd5e1',
                      lineHeight: '2',
                      maxWidth: '600px',
                      whiteSpace: 'pre-line'
                    }}>
                      {magazinePages[magazinePage].content}
                    </p>
                  </>
                )}

                {/* Page indicator */}
                <p style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '32px',
                  fontSize: '10px',
                  color: '#94a3b8',
                  letterSpacing: '2px'
                }}>
                  {magazinePage + 1} / {magazinePages.length}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '32px'
            }}>
              <button
                onClick={() => magazinePage > 0 && setMagazinePage(magazinePage - 1)}
                disabled={magazinePage === 0}
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  border: '1px solid rgba(148,163,184,0.3)',
                  color: magazinePage === 0 ? '#475569' : '#94a3b8',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  cursor: magazinePage === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textTransform: 'uppercase'
                }}
              >
                <ChevronLeft size={14} /> {language === 'english' ? 'Previous' : 'Anterior'}
              </button>
              <button
                onClick={() => magazinePage < magazinePages.length - 1 && setMagazinePage(magazinePage + 1)}
                disabled={magazinePage === magazinePages.length - 1}
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  border: '1px solid rgba(148,163,184,0.3)',
                  color: magazinePage === magazinePages.length - 1 ? '#475569' : '#94a3b8',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  cursor: magazinePage === magazinePages.length - 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textTransform: 'uppercase'
                }}
              >
                {language === 'english' ? 'Next' : 'Siguiente'} <ChevronRight size={14} />
              </button>
            </div>
          </section>
        )}

        {/* ==================== JOURNAL TAB - WITH IMAGES ==================== */}
        {activeTab === "journal" && (
          <section>
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
              <p style={{ fontSize: '10px', color: '#cba658', letterSpacing: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
                {t.journal.title}
              </p>
              <p style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                {t.journal.subtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {journalArticles.map((article, i) => (
                <article key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
                  gap: '24px',
                  padding: '24px',
                  border: '1px solid rgba(148,163,184,0.15)',
                  background: 'rgba(30,41,59,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(30,41,59,0.8)';
                  e.currentTarget.style.borderColor = 'rgba(203,166,88,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(30,41,59,0.5)';
                  e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)';
                }}>
                  {/* IMAGE */}
                  <div style={{
                    height: isMobile ? '200px' : '180px',
                    backgroundImage: `url(${article.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />

                  {/* CONTENT */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <p style={{
                        fontSize: '9px',
                        color: '#cba658',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                      }}>{article.category}</p>
                      <p style={{ fontSize: '10px', color: '#94a3b8' }}>{article.readTime}</p>
                    </div>
                    <h3 style={{
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: '300',
                      color: '#e2e8f0',
                      marginBottom: '12px',
                      letterSpacing: '0.5px',
                      lineHeight: '1.3'
                    }}>{article.title}</h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      lineHeight: '1.7',
                      marginBottom: '16px'
                    }}>{article.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '10px', color: '#94a3b8' }}>{article.date}</p>
                      <span style={{
                        fontSize: '10px',
                        color: '#cba658',
                        letterSpacing: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
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

        {/* ==================== PARTNERS TAB - WITH GOLF BACKGROUND ==================== */}
        {activeTab === "partners" && (
          <section style={{ position: 'relative' }}>
            {/* GOLF BACKGROUND */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '-40px',
              right: '-40px',
              bottom: '-60px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ marginBottom: '48px' }}>
                <p style={{ fontSize: '10px', color: '#cba658', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>
                  {t.partners.title}
                </p>
                <p style={{ fontSize: '15px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
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
                    border: '1px solid rgba(203,166,88,0.3)',
                    background: 'rgba(15,23,42,0.8)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <p style={{
                      fontSize: '12px',
                      color: '#e2e8f0',
                      letterSpacing: '1px',
                      fontWeight: '500'
                    }}>{benefit}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const msg = language === 'english' ? 'Partnership inquiry for EnjoyBaja.com' : 'Consulta de asociacion para EnjoyBaja.com';
                  window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                style={{
                  padding: '18px 48px',
                  background: '#cba658',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '3px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#d4b366';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#cba658';
                }}
              >
                {t.partners.cta}
              </button>
            </div>
          </section>
        )}

        {/* FOOTER - JUST WHATSAPP */}
        <footer style={{
          marginTop: '120px',
          paddingTop: '48px',
          borderTop: '1px solid rgba(148,163,184,0.2)',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '10px',
            color: '#94a3b8',
            letterSpacing: '3px',
            marginBottom: '16px',
            fontStyle: 'italic'
          }}>
            "{t.slogan}"
          </p>
          <p style={{
            fontSize: '11px',
            color: '#94a3b8',
            letterSpacing: '2px'
          }}>
            +52 646 340 2686
          </p>
        </footer>
      </div>
    </div>
  );
}