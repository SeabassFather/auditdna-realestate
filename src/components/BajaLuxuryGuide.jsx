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
          color: '#e4e4e7',
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
        subtitle: "For distinguished brands seeking elevated exposure",
        cta: "Begin Conversation",
        benefits: ["Editorial Feature", "Magazine Placement", "Newsletter Inclusion", "Private Events"]
      }
    },
    spanish: {
      slogan: "Donde las Estrellas Vienen a Brillar",
      header: "BAJA CALIFORNIA",
      sub: "LA GUÍA DE LUJO",
      establishments: "Establecimientos Selectos",
      toggle: "EN",
      tabs: { guide: "Guía", magazine: "Revista", journal: "Diario", partners: "Socios" },
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
      }
    },
  };

  const t = labels[language];

  const featuredContent = [
    {
      key: 'winery',
      name: "Monte Xanic",
      location: "Valle de Guadalupe",
      description: language === 'english' 
        ? "Pioneering excellence since 1988. The Gran Ricardo blend has defined Baja wine for three decades."
        : "Excelencia pionera desde 1988. La mezcla Gran Ricardo ha definido el vino de Baja por tres décadas.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80"
    },
    {
      key: 'dish',
      name: "Langosta Puerto Nuevo",
      location: "Puerto Nuevo",
      description: language === 'english'
        ? "Pacific lobster, split and grilled, served with drawn butter, beans, rice, and handmade tortillas."
        : "Langosta del Pacífico, partida y asada, servida con mantequilla, frijoles, arroz y tortillas hechas a mano.",
      image: "https://images.unsplash.com/photo-1553247407-23251ce81f59?w=800&q=80"
    },
    {
      key: 'cocktail',
      name: "Baja Sunset",
      location: "Fauna Restaurant",
      description: language === 'english'
        ? "Artisanal mezcal, blood orange, fresh lime, organic agave. Rimmed with volcanic salt."
        : "Mezcal artesanal, naranja roja, limón fresco, agave orgánico. Con borde de sal volcánica.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80"
    },
    {
      key: 'hotel',
      name: "Cuatro Cuatros",
      location: "Valle de Guadalupe",
      description: language === 'english'
        ? "Cliffside luxury where the vineyard meets the Pacific. Twelve private suites with infinity views."
        : "Lujo en acantilados donde el viñedo se encuentra con el Pacífico. Doce suites privadas con vistas infinitas.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
    },
    {
      key: 'experience',
      name: "Gray Whale Sanctuary",
      location: "Laguna San Ignacio",
      description: language === 'english'
        ? "Touch a gray whale in their winter breeding grounds. An encounter that transforms perspective."
        : "Toca una ballena gris en sus terrenos de reproducción invernal. Un encuentro que transforma la perspectiva.",
      image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80"
    },
    {
      key: 'chef',
      name: "Javier Plascencia",
      location: "Misión 19, Tijuana",
      description: language === 'english'
        ? "The architect of Baja Med cuisine. His tasting menu is a journey through the peninsula's terroir."
        : "El arquitecto de la cocina Baja Med. Su menú degustación es un viaje por el terroir de la península.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
    }
  ];

  const journalArticles = [
    {
      title: language === 'english' ? "The New Geography of Desire" : "La Nueva Geografía del Deseo",
      excerpt: language === 'english' 
        ? "How Valle de Guadalupe became the destination for those who've seen everything else."
        : "Cómo Valle de Guadalupe se convirtió en el destino para quienes ya lo han visto todo.",
      date: "January 2026",
      category: language === 'english' ? "Wine & Culture" : "Vino y Cultura",
      readTime: "8 min"
    },
    {
      title: language === 'english' ? "Architecture of Escape" : "Arquitectura del Escape",
      excerpt: language === 'english'
        ? "Inside the private compounds reshaping Baja's coastline. Where minimalism meets the infinite horizon."
        : "Dentro de los complejos privados que remodelan la costa de Baja. Donde el minimalismo se encuentra con el horizonte infinito.",
      date: "January 2026",
      category: language === 'english' ? "Design" : "Diseño",
      readTime: "12 min"
    },
    {
      title: language === 'english' ? "The Investment Thesis" : "La Tesis de Inversión",
      excerpt: language === 'english'
        ? "Why institutional capital is flowing into Baja California's luxury corridor."
        : "Por qué el capital institucional fluye hacia el corredor de lujo de Baja California.",
      date: "December 2025",
      category: language === 'english' ? "Markets" : "Mercados",
      readTime: "10 min"
    }
  ];

  const magazinePages = [
    {
      type: "cover",
      title: "BAJA",
      subtitle: language === 'english' ? "THE PENINSULA ISSUE" : "LA EDICIÓN DE LA PENÍNSULA",
      content: language === 'english' ? "Winter 2026" : "Invierno 2026"
    },
    {
      type: "editorial",
      title: language === 'english' ? "EDITOR'S NOTE" : "NOTA DEL EDITOR",
      content: language === 'english' 
        ? "Baja California exists in that rare space between discovery and preservation. Those who find it understand immediately why it must be protected. This edition explores the peninsula through the lens of those who've chosen to call it home."
        : "Baja California existe en ese raro espacio entre el descubrimiento y la preservación. Quienes la encuentran comprenden de inmediato por qué debe ser protegida. Esta edición explora la península a través de quienes han elegido llamarla hogar."
    },
    {
      type: "feature",
      title: language === 'english' ? "TERROIR" : "TERROIR",
      content: language === 'english' 
        ? "The unique combination of Pacific marine influence, Mediterranean climate, and volcanic soil creates wines found nowhere else on earth. Valle de Guadalupe's 200+ wineries represent the vanguard of Mexican viticulture."
        : "La combinación única de influencia marina del Pacífico, clima mediterráneo y suelo volcánico crea vinos que no se encuentran en ningún otro lugar del mundo. Las más de 200 bodegas de Valle de Guadalupe representan la vanguardia de la viticultura mexicana."
    },
    {
      type: "feature",
      title: language === 'english' ? "THE SHORE" : "LA COSTA",
      content: language === 'english' 
        ? "One thousand miles of coastline. From the sophisticated beach culture of Rosarito to the untouched wilderness of Bahía de los Ángeles, the Baja coast offers solitude impossible to find elsewhere."
        : "Mil millas de costa. Desde la sofisticada cultura de playa de Rosarito hasta la naturaleza virgen de Bahía de los Ángeles, la costa de Baja ofrece una soledad imposible de encontrar en otro lugar."
    },
    {
      type: "close",
      title: language === 'english' ? "CONTACT" : "CONTACTO",
      content: "Saul Garcia\n+52 646 340 2686\ninfo@enjoybaja.com\n\nNMLS #337526"
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
    borderBottom: isActive ? '1px solid #e4e4e7' : '1px solid transparent',
    color: isActive ? '#e4e4e7' : '#71717a',
    fontSize: '11px',
    fontWeight: '400',
    letterSpacing: '3px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textTransform: 'uppercase'
  });

  const typeLabels = {
    winery: language === 'english' ? 'Winery' : 'Viñedo',
    restaurant: language === 'english' ? 'Restaurant' : 'Restaurante',
    hotel: language === 'english' ? 'Hotel' : 'Hotel',
    golf: language === 'english' ? 'Golf' : 'Golf',
    spa: language === 'english' ? 'Spa' : 'Spa',
    brewery: language === 'english' ? 'Brewery' : 'Cervecería',
    yacht: language === 'english' ? 'Marina' : 'Marina'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#09090b',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* SUBTLE GRADIENT OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)',
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
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#a1a1aa',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#e4e4e7';
              e.currentTarget.style.color = '#e4e4e7';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = '#a1a1aa';
            }}
          >
            {t.toggle}
          </button>

          {/* Slogan */}
          <p style={{
            fontSize: '10px',
            color: '#71717a',
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
            color: '#e4e4e7',
            letterSpacing: isMobile ? '8px' : '16px',
            marginBottom: '16px',
            lineHeight: '1'
          }}>
            {t.header}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#a1a1aa',
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
            background: 'linear-gradient(90deg, transparent, #52525b, transparent)',
            margin: '0 auto 24px'
          }} />

          {/* Count */}
          <p style={{
            fontSize: '11px',
            color: '#52525b',
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
          borderBottom: '1px solid rgba(255,255,255,0.1)'
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
                    onMouseEnter={() => setHoveredCard(item.key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      position: 'relative',
                      height: isMobile ? '320px' : '400px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: '#18181b'
                    }}
                  >
                    {/* Image */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s',
                      transform: hoveredCard === item.key ? 'scale(1.05)' : 'scale(1)',
                      opacity: hoveredCard === item.key ? 0.6 : 0.4
                    }} />

                    {/* Content */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '32px',
                      background: 'linear-gradient(to top, rgba(9,9,11,0.95) 0%, transparent 100%)'
                    }}>
                      <p style={{
                        fontSize: '9px',
                        color: '#a1a1aa',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        marginBottom: '12px'
                      }}>
                        {t.featured[item.key]}
                      </p>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '300',
                        color: '#e4e4e7',
                        marginBottom: '8px',
                        letterSpacing: '1px'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        fontSize: '11px',
                        color: '#71717a',
                        marginBottom: '16px'
                      }}>
                        {item.location}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#a1a1aa',
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
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '80px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '10px',
                color: '#71717a',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>
                {t.newsletter.title}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#a1a1aa',
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
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#e4e4e7',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button type="submit" style={{
                  padding: '16px 32px',
                  background: subscribed ? '#22c55e' : '#e4e4e7',
                  border: 'none',
                  color: '#09090b',
                  fontSize: '11px',
                  fontWeight: '500',
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
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.02)',
                          transition: 'all 0.3s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <p style={{
                              fontSize: '9px',
                              color: '#71717a',
                              letterSpacing: '2px',
                              textTransform: 'uppercase'
                            }}>{typeLabels[est.type] || est.type}</p>
                          </div>
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#e4e4e7',
                            marginBottom: '8px',
                            letterSpacing: '0.5px'
                          }}>{est.name}</h3>
                          <p style={{
                            fontSize: '12px',
                            color: '#71717a',
                            lineHeight: '1.6',
                            marginBottom: '20px'
                          }}>{est.description || est.city}</p>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                              onClick={() => est.website && window.open(est.website, '_blank')}
                              style={{
                                padding: '10px 20px',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#a1a1aa',
                                fontSize: '10px',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#e4e4e7';
                                e.currentTarget.style.color = '#09090b';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#a1a1aa';
                              }}
                            >
                              {language === 'english' ? 'Visit' : 'Visitar'}
                            </button>
                            <button
                              onClick={() => {
                                const msg = `Inquiry about ${est.name}`;
                                window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                              }}
                              style={{
                                padding: '10px 20px',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#a1a1aa',
                                fontSize: '10px',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#e4e4e7';
                                e.currentTarget.style.color = '#09090b';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#a1a1aa';
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

        {/* ==================== MAGAZINE TAB ==================== */}
        {activeTab === "magazine" && (
          <section>
            <div style={{
              border: '1px solid rgba(255,255,255,0.1)',
              minHeight: isMobile ? '500px' : '600px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isMobile ? '48px 24px' : '80px',
              textAlign: 'center',
              position: 'relative',
              background: 'rgba(255,255,255,0.02)'
            }}>
              {magazinePages[magazinePage].type === 'cover' ? (
                <>
                  <p style={{ fontSize: '10px', color: '#52525b', letterSpacing: '4px', marginBottom: '40px' }}>
                    {t.magazine.subtitle}
                  </p>
                  <h2 style={{
                    fontSize: isMobile ? '64px' : '120px',
                    fontWeight: '100',
                    color: '#e4e4e7',
                    letterSpacing: '20px',
                    marginBottom: '24px'
                  }}>
                    {magazinePages[magazinePage].title}
                  </h2>
                  <p style={{ fontSize: '12px', color: '#71717a', letterSpacing: '4px' }}>
                    {magazinePages[magazinePage].subtitle}
                  </p>
                </>
              ) : (
                <>
                  <h2 style={{
                    fontSize: isMobile ? '24px' : '32px',
                    fontWeight: '200',
                    color: '#e4e4e7',
                    letterSpacing: '6px',
                    marginBottom: '40px'
                  }}>
                    {magazinePages[magazinePage].title}
                  </h2>
                  <p style={{
                    fontSize: '14px',
                    color: '#a1a1aa',
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
                color: '#52525b',
                letterSpacing: '2px'
              }}>
                {magazinePage + 1} / {magazinePages.length}
              </p>
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
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: magazinePage === 0 ? '#3f3f46' : '#a1a1aa',
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
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: magazinePage === magazinePages.length - 1 ? '#3f3f46' : '#a1a1aa',
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

        {/* ==================== JOURNAL TAB ==================== */}
        {activeTab === "journal" && (
          <section>
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
              <p style={{ fontSize: '10px', color: '#52525b', letterSpacing: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
                {t.journal.title}
              </p>
              <p style={{ fontSize: '13px', color: '#71717a', fontStyle: 'italic' }}>
                {t.journal.subtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {journalArticles.map((article, i) => (
                <article key={i} style={{
                  padding: isMobile ? '32px 24px' : '48px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <p style={{
                      fontSize: '9px',
                      color: '#71717a',
                      letterSpacing: '2px',
                      textTransform: 'uppercase'
                    }}>{article.category}</p>
                    <p style={{ fontSize: '10px', color: '#52525b' }}>{article.readTime}</p>
                  </div>
                  <h3 style={{
                    fontSize: isMobile ? '20px' : '26px',
                    fontWeight: '300',
                    color: '#e4e4e7',
                    marginBottom: '16px',
                    letterSpacing: '0.5px',
                    lineHeight: '1.3'
                  }}>{article.title}</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#71717a',
                    lineHeight: '1.7',
                    marginBottom: '24px'
                  }}>{article.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '10px', color: '#52525b' }}>{article.date}</p>
                    <span style={{
                      fontSize: '10px',
                      color: '#a1a1aa',
                      letterSpacing: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {t.journal.readMore} <ArrowRight size={12} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ==================== PARTNERS TAB ==================== */}
        {activeTab === "partners" && (
          <section style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '48px' }}>
              <p style={{ fontSize: '10px', color: '#52525b', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>
                {t.partners.title}
              </p>
              <p style={{ fontSize: '14px', color: '#71717a', maxWidth: '500px', margin: '0 auto' }}>
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
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)'
                }}>
                  <p style={{
                    fontSize: '11px',
                    color: '#a1a1aa',
                    letterSpacing: '1px'
                  }}>{benefit}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.open('https://wa.me/526463402686?text=Partnership inquiry for EnjoyBaja.com', '_blank')}
              style={{
                padding: '18px 48px',
                background: '#e4e4e7',
                border: 'none',
                color: '#09090b',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '3px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#e4e4e7';
              }}
            >
              {t.partners.cta}
            </button>
          </section>
        )}

        {/* FOOTER */}
        <footer style={{
          marginTop: '120px',
          paddingTop: '48px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '10px',
            color: '#52525b',
            letterSpacing: '3px',
            marginBottom: '16px',
            fontStyle: 'italic'
          }}>
            "{t.slogan}"
          </p>
          <p style={{
            fontSize: '10px',
            color: '#3f3f46',
            letterSpacing: '2px'
          }}>
            SAUL GARCIA — NMLS #337526 — +52 646 340 2686
          </p>
        </footer>
      </div>
    </div>
  );
}