import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import LuxuryGoods from './LuxuryGoods';
import SelfServiceAdPortal from './SelfServiceAdPortal';

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
  
  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);
  
  // SLOW MELLOW JAZZ - Ambient background music
  // These are slower, more subtle tracks
  const musicUrls = [
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",  // Slow jazz piano
    "https://cdn.pixabay.com/download/audio/2021/11/25/audio_cb5c4e5442.mp3",  // Mellow acoustic
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3"   // Soft background
  ];
  const musicUrl = musicUrls[currentTrackIndex];

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

  // Music Player Controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.25; // Keep it subtle - 25% volume
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

  const labels = {
    english: {
      slogan: "Where the Stars Come to Shine",
      header: "BAJA CALIFORNIA",
      sub: "THE LUXURY GUIDE",
      establishments: "Curated Establishments",
      toggle: "ES",
      tabs: { guide: "Guide", magazine: "Magazine", journal: "Journal", foodjournal: "Food Journal", winecellar: "Wine Cellar", partners: "Partners", collection: "Collection", advertise: "Advertise" },
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
      },
      foodjournal: {
        title: "Food Journal",
        subtitle: "A Culinary Alliance — USA & Mexico",
        description: "A collaborative space for food writers, chefs, and culinary enthusiasts to share stories about cuisine, restaurants, and food experiences across the border.",
        contribute: "Share Your Story",
        guidelines: "Submission Guidelines",
        categories: ["Restaurant Reviews", "Chef Profiles", "Street Food", "Wine & Spirits", "Recipes", "Food Travel"],
        cta: "Submit Contribution",
        featured: "Featured Contributors",
        recent: "Recent Stories",
        placeholder: {
          name: "Your Name",
          email: "Your Email",
          title: "Story Title",
          category: "Select Category",
          content: "Share your culinary story... (minimum 300 words)",
          image: "Drag & drop images or click to upload"
        },
        success: "Thank you! Your contribution has been submitted for review.",
        note: "All submissions are reviewed by our editorial team. Selected stories will be featured in our Food Journal and may be included in our quarterly magazine."
      },
      winecellar: {
        title: "The Wine Cellar",
        subtitle: "Valle de Guadalupe & Beyond",
        description: "Discover Mexico's finest wines from the prestigious Valle de Guadalupe wine region",
        explore: "Explore Collection",
        featured: "Featured Wineries",
        wines: "Notable Wines",
        reserve: "Reserve a Tasting",
        visit: "Plan Your Visit",
        varieties: ["Tempranillo", "Nebbiolo", "Cabernet Sauvignon", "Grenache", "Chardonnay", "Sauvignon Blanc"],
        regions: ["Valle de Guadalupe", "Valle de Santo Tomás", "San Antonio de las Minas", "Ojos Negros"]
      }
    },
      slogan: "Donde las Estrellas Vienen a Brillar",
      header: "BAJA CALIFORNIA",
      sub: "LA GUIA DE LUJO",
      establishments: "Establecimientos Selectos",
      toggle: "EN",
      tabs: { guide: "Guia", magazine: "Revista", journal: "Diario", foodjournal: "Diario Culinario", winecellar: "Cava de Vinos", partners: "Socios", collection: "Colección", advertise: "Anunciar" },
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
      },
      foodjournal: {
        title: "Diario Culinario",
        subtitle: "Una Alianza Culinaria — USA y México",
        description: "Un espacio colaborativo para escritores gastronómicos, chefs y entusiastas culinarios para compartir historias sobre cocina, restaurantes y experiencias gastronómicas a través de la frontera.",
        contribute: "Comparte Tu Historia",
        guidelines: "Guías de Envío",
        categories: ["Reseñas de Restaurantes", "Perfiles de Chefs", "Comida Callejera", "Vino y Licores", "Recetas", "Viajes Gastronómicos"],
        cta: "Enviar Contribución",
        featured: "Colaboradores Destacados",
        recent: "Historias Recientes",
        placeholder: {
          name: "Tu Nombre",
          email: "Tu Correo",
          title: "Título de la Historia",
          category: "Selecciona Categoría",
          content: "Comparte tu historia culinaria... (mínimo 300 palabras)",
          image: "Arrastra y suelta imágenes o haz clic para subir"
        },
        success: "¡Gracias! Tu contribución ha sido enviada para revisión.",
        note: "Todas las contribuciones son revisadas por nuestro equipo editorial. Las historias seleccionadas aparecerán en nuestro Diario Culinario y podrían incluirse en nuestra revista trimestral."
      },
      winecellar: {
        title: "La Cava de Vinos",
        subtitle: "Valle de Guadalupe y Más Allá",
        description: "Descubre los mejores vinos de México de la prestigiosa región vinícola del Valle de Guadalupe",
        explore: "Explorar Colección",
        featured: "Bodegas Destacadas",
        wines: "Vinos Notables",
        reserve: "Reservar Cata",
        visit: "Planea Tu Visita",
        varieties: ["Tempranillo", "Nebbiolo", "Cabernet Sauvignon", "Grenache", "Chardonnay", "Sauvignon Blanc"],
        regions: ["Valle de Guadalupe", "Valle de Santo Tomás", "San Antonio de las Minas", "Ojos Negros"]
      }
    },
  };

  const t = labels[language];

  // REAL IMAGES FROM ACTUAL ESTABLISHMENTS - 12 items for 4x3 grid
  const featuredContent = [
    // Row 1 - Hotels
    {
      key: 'boutique',
      name: "Hotel Boutique",
      location: "Valle de Guadalupe",
      category: "HOTEL",
      description: language === 'english' 
        ? "Contemporary hacienda style retreat with Fuego restaurant and full spa."
        : "Retiro estilo hacienda contemporanea con restaurante Fuego y spa completo.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      website: "https://hotelboutiquevalledeguadalupe.com"
    },
    {
      key: 'bottega',
      name: "Hotel Bottega",
      location: "Valle de Guadalupe",
      category: "HOTEL",
      description: language === 'english'
        ? "Small boutique hotel steps from Finca Altozano and Laja restaurant."
        : "Pequeno hotel boutique a pasos de Finca Altozano y restaurante Laja.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
      website: "https://hotelbottegaboutique.com"
    },
    {
      key: 'entrevinedos',
      name: "Entre Viñedos",
      location: "Valle de Guadalupe",
      category: "HOTEL",
      description: language === 'english'
        ? "Mediterranean-style family rooms with vineyard and mountain views."
        : "Habitaciones familiares estilo mediterraneo con vistas a vinedos y montanas.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
      website: "https://hotelentrevinedos.com"
    },
    {
      key: 'cuatro',
      name: "Cuatro Cuatros",
      location: "Valle de Guadalupe",
      category: "HOTEL",
      description: language === 'english'
        ? "Cliffside luxury where vineyard meets Pacific with infinity ocean views."
        : "Lujo en acantilados donde el vinedo se encuentra con el Pacifico.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      website: "https://cuatrocuatros.com"
    },
    // Row 2 - Restaurants
    {
      key: 'fuego',
      name: "Fuego Restaurant",
      location: "Valle de Guadalupe",
      category: "RESTAURANT",
      description: language === 'english'
        ? "Rooftop dining with live music, local wines and Baja Med cuisine."
        : "Comedor en azotea con musica en vivo, vinos locales y cocina Baja Med.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
      website: "https://fuegococinadelvalle.com"
    },
    {
      key: 'fauna',
      name: "Fauna",
      location: "Valle de Guadalupe",
      category: "RESTAURANT",
      description: language === 'english'
        ? "Chef David Castro Hussong's acclaimed cuisine at Bruma winery estate."
        : "La aclamada cocina del Chef David Castro Hussong en la bodega Bruma.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      website: "https://brumawine.com/fauna"
    },
    {
      key: 'finca',
      name: "Finca Altozano",
      location: "Valle de Guadalupe",
      category: "RESTAURANT",
      description: language === 'english'
        ? "Open-air wood-fired cooking with valley views by Chef Javier Plascencia."
        : "Cocina a lena al aire libre con vistas al valle del Chef Javier Plascencia.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
      website: "https://fincaaltozano.com"
    },
    {
      key: 'animalon',
      name: "Animalon",
      location: "Valle de Guadalupe",
      category: "MIXOLOGY",
      description: language === 'english'
        ? "Wood-fired cuisine with Baja's finest local ingredients and craft cocktails."
        : "Cocina a lena con los mejores ingredientes locales y cocteles artesanales.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
      website: "https://animalon.mx"
    },
    // Row 3 - Wineries & Experiences
    {
      key: 'monte',
      name: "Monte Xanic",
      location: "Valle de Guadalupe",
      category: "WINERY",
      description: language === 'english' 
        ? "Mexico's first boutique winery since 1988. The Gran Ricardo defines Baja wine."
        : "La primera bodega boutique de Mexico desde 1988. Gran Ricardo define el vino de Baja.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
      website: "https://montexanic.com.mx"
    },
    {
      key: 'venacava',
      name: "Vena Cava",
      location: "Valle de Guadalupe",
      category: "WINERY",
      description: language === 'english'
        ? "Iconic boat-hull architecture winery with exceptional wines and views."
        : "Bodega con arquitectura iconica de casco de barco, vinos excepcionales y vistas.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80",
      website: "https://venacavawine.com"
    },
    {
      key: 'whale',
      name: "Kuyima Whale Watching",
      location: "San Ignacio Lagoon",
      category: "ADVENTURE",
      description: language === 'english'
        ? "Touch gray whales in their UNESCO World Heritage winter sanctuary."
        : "Toca ballenas grises en su santuario UNESCO de invierno.",
      image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80",
      website: "https://kuyima.com"
    },
    {
      key: 'mision',
      name: "Mision 19",
      location: "Tijuana",
      category: "CULINARY",
      description: language === 'english'
        ? "Chef Javier Plascencia's flagship. The birthplace of Baja Med cuisine."
        : "El restaurante insignia del Chef Plascencia. La cuna de la cocina Baja Med.",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80",
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
      
      {/* VINEYARD BACKGROUND - Beautiful Valle de Guadalupe Style */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.35,
        zIndex: 0
      }} />

      {/* LIGHTER OVERLAY - SEE THE VINEYARD */}
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

      {/* SCROLLING PARTNER IMAGES - Valle de Guadalupe Hotels & Restaurants */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: 0,
        right: 0,
        height: '120px',
        overflow: 'hidden',
        zIndex: 2,
        background: 'linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 10%, rgba(15,23,42,0.7) 90%, rgba(15,23,42,0.95) 100%)'
      }}>
        <p style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '9px',
          color: '#cba658',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          zIndex: 3
        }}>
          Featured Partners
        </p>
        <div style={{
          display: 'flex',
          gap: '20px',
          animation: 'scrollPartners 90s linear infinite',
          paddingTop: '32px',
          width: 'max-content'
        }}>
          {/* Partner Images - 24 UNIQUE images for variety */}
          {[
            // Hotels
            { name: 'Hotel Boutique', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
            { name: 'El Cielo Resort', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
            { name: 'Contemplación', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
            { name: 'Hacienda Guadalupe', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
            // Wine & Vineyards
            { name: 'Entre Viñedos', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
            { name: 'Monte Xanic', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
            { name: 'Adobe Guadalupe', img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
            { name: 'Vena Cava Winery', img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80' },
            // Restaurants  
            { name: 'Fuego Restaurant', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
            { name: 'Finca Altozano', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
            { name: 'Corazón de Tierra', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
            { name: 'Fauna Valle', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80' },
            // Luxury Experiences
            { name: 'Wine Tasting', img: 'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=400&q=80' },
            { name: 'Sunset Terrace', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
            { name: 'Pool & Spa', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80' },
            { name: 'Fine Dining', img: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&q=80' },
            // More Hotels & Resorts
            { name: 'Bruma Casa 8', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80' },
            { name: 'Cuatro Cuatros', img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80' },
            { name: 'Encuentro Guadalupe', img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80' },
            { name: 'Villa del Valle', img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80' },
            // More Wine & Dining
            { name: "Deckman's", img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
            { name: 'Laja Restaurant', img: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=400&q=80' },
            { name: 'Malva Kitchen', img: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=400&q=80' },
            { name: 'Baron Balché', img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80' },
            // Duplicate set for seamless loop
            { name: 'Hotel Boutique', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
            { name: 'El Cielo Resort', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
            { name: 'Contemplación', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
            { name: 'Hacienda Guadalupe', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
            { name: 'Entre Viñedos', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
            { name: 'Monte Xanic', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
            { name: 'Adobe Guadalupe', img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
            { name: 'Vena Cava Winery', img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80' },
            { name: 'Fuego Restaurant', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
            { name: 'Finca Altozano', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
            { name: 'Corazón de Tierra', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
            { name: 'Fauna Valle', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80' },
            { name: 'Wine Tasting', img: 'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=400&q=80' },
            { name: 'Sunset Terrace', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
            { name: 'Pool & Spa', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80' },
            { name: 'Fine Dining', img: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&q=80' },
            { name: 'Bruma Casa 8', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80' },
            { name: 'Cuatro Cuatros', img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80' },
            { name: 'Encuentro Guadalupe', img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80' },
            { name: 'Villa del Valle', img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80' },
            { name: "Deckman's", img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
            { name: 'Laja Restaurant', img: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=400&q=80' },
            { name: 'Malva Kitchen', img: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=400&q=80' },
            { name: 'Baron Balché', img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80' }
          ].map((partner, i) => (
            <div key={i} style={{ 
              width: '140px', 
              height: '80px', 
              position: 'relative',
              flexShrink: 0
            }}>
              <img 
                src={partner.img} 
                alt={partner.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid rgba(203,166,88,0.3)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.85)',
                padding: '6px 10px'
              }}>
                <p style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  fontWeight: '500',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}>{partner.name}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scrollPartners {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* AUDIO ELEMENT - Subtle Jazz */}
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        onError={() => {
          if (currentTrackIndex < musicUrls.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
          }
        }}
      />

      {/* MUSIC PLAYER - FLOATING BOTTOM LEFT */}
      <div style={{
        position: 'fixed',
        bottom: 100,
        left: 20,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(51,65,85,0.9)',
        backdropFilter: 'blur(10px)',
        padding: '12px 16px',
        border: '1px solid rgba(203,166,88,0.3)'
      }}>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4
          }}
        >
          {isPlaying ? (
            <Pause size={20} color="#cba658" />
          ) : (
            <Play size={20} color="#cba658" />
          )}
        </button>

        {/* Track Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <span style={{
            fontSize: '10px',
            color: '#cba658',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {isPlaying ? 'NOW PLAYING' : 'LATIN JAZZ'}
          </span>
          <span style={{
            fontSize: '11px',
            color: '#94a3b8'
          }}>
            Baja Vibes
          </span>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            marginLeft: 8
          }}
        >
          {isMuted ? (
            <VolumeX size={18} color="#64748b" />
          ) : (
            <Volume2 size={18} color="#94a3b8" />
          )}
        </button>
      </div>

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
            {/* FEATURED GRID - 4 COLUMNS, SMALLER CARDS */}
            <section style={{ marginBottom: '80px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                gap: '16px'
              }}>
                {featuredContent.map((item, index) => (
                  <article
                    key={item.key}
                    onClick={() => window.open(item.website, '_blank')}
                    onMouseEnter={() => setHoveredCard(item.key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      position: 'relative',
                      height: isMobile ? '280px' : '260px',
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
                      padding: '20px',
                      background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, transparent 100%)'
                    }}>
                      <p style={{
                        fontSize: '8px',
                        color: '#cba658',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        marginBottom: '8px'
                      }}>
                        {item.category}
                      </p>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '400',
                        color: '#e2e8f0',
                        marginBottom: '4px',
                        letterSpacing: '0.5px'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        fontSize: '10px',
                        color: '#94a3b8',
                        marginBottom: '0'
                      }}>
                        {item.location}
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

        {/* ==================== FOOD JOURNAL TAB - CULINARY ALLIANCE ==================== */}
        {activeTab === "foodjournal" && (
          <section style={{ position: 'relative' }}>
            {/* FOOD BACKGROUND */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '-40px',
              right: '-40px',
              bottom: '-60px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* HEADER */}
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <p style={{ 
                  fontSize: '9px', 
                  color: '#cba658', 
                  letterSpacing: '6px', 
                  marginBottom: '12px', 
                  textTransform: 'uppercase' 
                }}>
                  {language === 'english' ? 'CULINARY ALLIANCE' : 'ALIANZA CULINARIA'}
                </p>
                <h2 style={{ 
                  fontSize: isMobile ? '28px' : '36px', 
                  fontWeight: '200', 
                  color: '#e2e8f0', 
                  letterSpacing: '4px',
                  marginBottom: '16px'
                }}>
                  {t.foodjournal.title}
                </h2>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#cba658', 
                  fontStyle: 'italic',
                  marginBottom: '12px'
                }}>
                  {t.foodjournal.subtitle}
                </p>
                <p style={{ 
                  fontSize: '13px', 
                  color: '#94a3b8', 
                  maxWidth: '600px', 
                  margin: '0 auto', 
                  lineHeight: '1.8' 
                }}>
                  {t.foodjournal.description}
                </p>
              </div>

              {/* CATEGORIES */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '48px'
              }}>
                {t.foodjournal.categories.map((cat, i) => (
                  <span key={i} style={{
                    padding: '10px 20px',
                    border: '1px solid rgba(203,166,88,0.3)',
                    background: 'rgba(15,23,42,0.6)',
                    color: '#cba658',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                  }}>
                    {cat}
                  </span>
                ))}
              </div>

              {/* CONTRIBUTION FORM */}
              <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '40px',
                border: '1px solid rgba(203,166,88,0.3)',
                background: 'rgba(15,23,42,0.8)',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  color: '#cba658',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  {t.foodjournal.contribute}
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  textAlign: 'center',
                  marginBottom: '32px'
                }}>
                  {t.foodjournal.note}
                </p>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert(t.foodjournal.success);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Name & Email Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '16px'
                  }}>
                    <input
                      type="text"
                      placeholder={t.foodjournal.placeholder.name}
                      required
                      style={{
                        padding: '14px 18px',
                        background: 'rgba(30,41,59,0.8)',
                        border: '1px solid rgba(148,163,184,0.2)',
                        color: '#e2e8f0',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="email"
                      placeholder={t.foodjournal.placeholder.email}
                      required
                      style={{
                        padding: '14px 18px',
                        background: 'rgba(30,41,59,0.8)',
                        border: '1px solid rgba(148,163,184,0.2)',
                        color: '#e2e8f0',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Title */}
                  <input
                    type="text"
                    placeholder={t.foodjournal.placeholder.title}
                    required
                    style={{
                      padding: '14px 18px',
                      background: 'rgba(30,41,59,0.8)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      color: '#e2e8f0',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />

                  {/* Category Select */}
                  <select
                    required
                    style={{
                      padding: '14px 18px',
                      background: 'rgba(30,41,59,0.8)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      color: '#94a3b8',
                      fontSize: '13px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">{t.foodjournal.placeholder.category}</option>
                    {t.foodjournal.categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>

                  {/* Content Textarea */}
                  <textarea
                    placeholder={t.foodjournal.placeholder.content}
                    required
                    rows={8}
                    style={{
                      padding: '14px 18px',
                      background: 'rgba(30,41,59,0.8)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      color: '#e2e8f0',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: '1.7'
                    }}
                  />

                  {/* Image Upload Area */}
                  <div style={{
                    padding: '32px',
                    border: '2px dashed rgba(148,163,184,0.3)',
                    background: 'rgba(30,41,59,0.5)',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('foodjournal-upload').click()}
                  >
                    <input
                      type="file"
                      id="foodjournal-upload"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                    />
                    <p style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      letterSpacing: '1px'
                    }}>
                      {t.foodjournal.placeholder.image}
                    </p>
                    <p style={{
                      fontSize: '10px',
                      color: '#64748b',
                      marginTop: '8px'
                    }}>
                      JPG, PNG (max 5MB each)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
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
                      transition: 'all 0.3s',
                      alignSelf: 'center'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#d4b366'}
                    onMouseLeave={e => e.currentTarget.style.background = '#cba658'}
                  >
                    {t.foodjournal.cta}
                  </button>
                </form>
              </div>

              {/* FEATURED FOOD STORIES */}
              <div style={{ marginTop: '64px' }}>
                <h3 style={{
                  fontSize: '12px',
                  color: '#cba658',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  marginBottom: '32px',
                  textAlign: 'center'
                }}>
                  {t.foodjournal.recent}
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '24px'
                }}>
                  {/* Sample Food Stories */}
                  {[
                    {
                      title: language === 'english' ? "The Taco Trail: From Tijuana to Ensenada" : "La Ruta del Taco: De Tijuana a Ensenada",
                      author: "Maria Santos",
                      category: language === 'english' ? "Street Food" : "Comida Callejera",
                      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80"
                    },
                    {
                      title: language === 'english' ? "Wine & Dine: Valle de Guadalupe's New Guard" : "Vino y Cena: La Nueva Guardia del Valle",
                      author: "Carlos Mendez",
                      category: language === 'english' ? "Wine & Spirits" : "Vino y Licores",
                      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80"
                    },
                    {
                      title: language === 'english' ? "Chef Javier Plascencia: A Portrait" : "Chef Javier Plascencia: Un Retrato",
                      author: "Elena Ramirez",
                      category: language === 'english' ? "Chef Profiles" : "Perfiles de Chefs",
                      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80"
                    }
                  ].map((story, i) => (
                    <div key={i} style={{
                      border: '1px solid rgba(148,163,184,0.2)',
                      background: 'rgba(15,23,42,0.6)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(203,166,88,0.4)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(148,163,184,0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <div style={{
                        height: '180px',
                        backgroundImage: `url(${story.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }} />
                      <div style={{ padding: '20px' }}>
                        <p style={{
                          fontSize: '9px',
                          color: '#cba658',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}>
                          {story.category}
                        </p>
                        <h4 style={{
                          fontSize: '15px',
                          fontWeight: '400',
                          color: '#e2e8f0',
                          marginBottom: '12px',
                          lineHeight: '1.4'
                        }}>
                          {story.title}
                        </h4>
                        <p style={{
                          fontSize: '11px',
                          color: '#94a3b8'
                        }}>
                          {language === 'english' ? 'By' : 'Por'} {story.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================== WINE CELLAR TAB - ULTRA SOPHISTICATED ==================== */}
        {activeTab === "winecellar" && (
          <section style={{ position: 'relative', overflow: 'hidden' }}>
            {/* PARALLAX VINEYARD BACKGROUND */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '-60px',
              right: '-60px',
              bottom: '-100px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: isMobile ? 'scroll' : 'fixed',
              opacity: 0.25,
              zIndex: 0
            }} />

            {/* WINE GRADIENT OVERLAY */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(45,15,15,0.4) 50%, rgba(15,23,42,0.8) 100%)',
              zIndex: 1
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* ELEGANT HEADER */}
              <div style={{ textAlign: 'center', marginBottom: '64px', paddingTop: '20px' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 24px',
                  border: '1px solid rgba(139,69,69,0.4)',
                  marginBottom: '24px'
                }}>
                  <p style={{ 
                    fontSize: '8px', 
                    color: '#b8860b', 
                    letterSpacing: '8px', 
                    textTransform: 'uppercase',
                    margin: 0
                  }}>
                    {language === 'english' ? 'ESTABLISHED MMIII' : 'ESTABLECIDO MMIII'}
                  </p>
                </div>
                
                <h2 style={{ 
                  fontSize: isMobile ? '32px' : '48px', 
                  fontWeight: '100', 
                  color: '#e2e8f0', 
                  letterSpacing: '12px',
                  marginBottom: '16px',
                  fontFamily: 'Georgia, serif'
                }}>
                  {t.winecellar.title.toUpperCase()}
                </h2>
                
                <div style={{
                  width: '60px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #b8860b, transparent)',
                  margin: '24px auto'
                }} />
                
                <p style={{ 
                  fontSize: '14px', 
                  color: '#cba658', 
                  fontStyle: 'italic',
                  letterSpacing: '3px',
                  marginBottom: '16px'
                }}>
                  {t.winecellar.subtitle}
                </p>
                <p style={{ 
                  fontSize: '13px', 
                  color: '#94a3b8', 
                  maxWidth: '500px', 
                  margin: '0 auto', 
                  lineHeight: '1.9',
                  fontStyle: 'italic'
                }}>
                  {t.winecellar.description}
                </p>
              </div>

              {/* WINE REGIONS */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '32px',
                marginBottom: '64px',
                flexWrap: 'wrap'
              }}>
                {t.winecellar.regions.map((region, i) => (
                  <div key={i} style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}>
                    <p style={{
                      fontSize: '10px',
                      color: '#b8860b',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(184,134,11,0.3)',
                      paddingBottom: '8px'
                    }}>
                      {region}
                    </p>
                  </div>
                ))}
              </div>

              {/* FEATURED WINERIES - LUXURY CARDS */}
              <div style={{ marginBottom: '80px' }}>
                <h3 style={{
                  fontSize: '11px',
                  color: '#b8860b',
                  letterSpacing: '6px',
                  textTransform: 'uppercase',
                  marginBottom: '40px',
                  textAlign: 'center'
                }}>
                  {t.winecellar.featured}
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '0'
                }}>
                  {[
                    {
                      name: "Monte Xanic",
                      est: "1988",
                      signature: "Gran Ricardo",
                      description: language === 'english' 
                        ? "Mexico's pioneering boutique winery. The Gran Ricardo blend defines Baja wine excellence."
                        : "La bodega boutique pionera de México. Gran Ricardo define la excelencia del vino de Baja.",
                      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
                      website: "https://montexanic.com.mx"
                    },
                    {
                      name: "Vena Cava",
                      est: "2005",
                      signature: "Big Blend",
                      description: language === 'english'
                        ? "Iconic boat-hull architecture housing exceptional wines. A must-visit destination."
                        : "Arquitectura icónica de casco de barco con vinos excepcionales. Un destino obligado.",
                      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80",
                      website: "https://venacavawine.com"
                    },
                    {
                      name: "Adobe Guadalupe",
                      est: "2000",
                      signature: "Gabriel",
                      description: language === 'english'
                        ? "Rustic elegance meets organic viticulture. Home to the acclaimed Gabriel blend."
                        : "Elegancia rústica con viticultura orgánica. Hogar del aclamado blend Gabriel.",
                      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
                      website: "https://adobeguadalupe.com"
                    }
                  ].map((winery, i) => (
                    <div key={i} style={{
                      position: 'relative',
                      height: isMobile ? '400px' : '500px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      borderRight: i < 2 && !isMobile ? '1px solid rgba(184,134,11,0.2)' : 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.querySelector('.winery-overlay').style.opacity = '1';
                      e.currentTarget.querySelector('.winery-img').style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.querySelector('.winery-overlay').style.opacity = '0';
                      e.currentTarget.querySelector('.winery-img').style.transform = 'scale(1)';
                    }}>
                      {/* Background Image */}
                      <div 
                        className="winery-img"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `url(${winery.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.8s ease'
                        }} 
                      />
                      
                      {/* Dark Gradient */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.7) 60%, rgba(15,23,42,0.95) 100%)'
                      }} />

                      {/* Content */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '40px 32px'
                      }}>
                        <p style={{
                          fontSize: '9px',
                          color: '#b8860b',
                          letterSpacing: '4px',
                          marginBottom: '8px'
                        }}>
                          EST. {winery.est}
                        </p>
                        <h4 style={{
                          fontSize: '24px',
                          fontWeight: '300',
                          color: '#e2e8f0',
                          letterSpacing: '4px',
                          marginBottom: '8px',
                          fontFamily: 'Georgia, serif'
                        }}>
                          {winery.name}
                        </h4>
                        <p style={{
                          fontSize: '11px',
                          color: '#cba658',
                          letterSpacing: '2px',
                          marginBottom: '16px',
                          fontStyle: 'italic'
                        }}>
                          {language === 'english' ? 'Signature' : 'Firma'}: {winery.signature}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: '#94a3b8',
                          lineHeight: '1.7',
                          marginBottom: '20px'
                        }}>
                          {winery.description}
                        </p>

                        {/* Hover Overlay with Buttons */}
                        <div 
                          className="winery-overlay"
                          style={{
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                            display: 'flex',
                            gap: '12px'
                          }}
                        >
                          <button
                            onClick={() => window.open(winery.website, '_blank')}
                            style={{
                              padding: '12px 24px',
                              background: 'transparent',
                              border: '1px solid #b8860b',
                              color: '#b8860b',
                              fontSize: '9px',
                              letterSpacing: '2px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = '#b8860b';
                              e.currentTarget.style.color = '#0f172a';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#b8860b';
                            }}
                          >
                            {t.winecellar.visit}
                          </button>
                          <button
                            onClick={() => {
                              const msg = language === 'english' 
                                ? `Wine tasting reservation inquiry for ${winery.name}` 
                                : `Consulta de reservación para cata en ${winery.name}`;
                              window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                            style={{
                              padding: '12px 24px',
                              background: '#b8860b',
                              border: '1px solid #b8860b',
                              color: '#0f172a',
                              fontSize: '9px',
                              letterSpacing: '2px',
                              cursor: 'pointer',
                              textTransform: 'uppercase'
                            }}
                          >
                            {t.winecellar.reserve}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WINE VARIETIES - ELEGANT HORIZONTAL SCROLL */}
              <div style={{ marginBottom: '64px' }}>
                <h3 style={{
                  fontSize: '11px',
                  color: '#b8860b',
                  letterSpacing: '6px',
                  textTransform: 'uppercase',
                  marginBottom: '32px',
                  textAlign: 'center'
                }}>
                  {language === 'english' ? 'Grape Varieties' : 'Variedades de Uva'}
                </h3>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '48px',
                  flexWrap: 'wrap'
                }}>
                  {t.winecellar.varieties.map((variety, i) => (
                    <div key={i} style={{
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '1px solid rgba(184,134,11,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                        background: 'rgba(15,23,42,0.6)',
                        transition: 'all 0.3s'
                      }}>
                        <span style={{
                          fontSize: '18px',
                          color: '#b8860b',
                          fontFamily: 'Georgia, serif',
                          fontStyle: 'italic'
                        }}>
                          {variety.charAt(0)}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '10px',
                        color: '#e2e8f0',
                        letterSpacing: '2px'
                      }}>
                        {variety}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RESERVE TASTING CTA */}
              <div style={{
                textAlign: 'center',
                padding: '60px 40px',
                border: '1px solid rgba(184,134,11,0.3)',
                background: 'rgba(15,23,42,0.8)',
                backdropFilter: 'blur(20px)'
              }}>
                <p style={{
                  fontSize: '9px',
                  color: '#b8860b',
                  letterSpacing: '6px',
                  marginBottom: '16px',
                  textTransform: 'uppercase'
                }}>
                  {language === 'english' ? 'PRIVATE TASTINGS AVAILABLE' : 'CATAS PRIVADAS DISPONIBLES'}
                </p>
                <h3 style={{
                  fontSize: isMobile ? '20px' : '28px',
                  fontWeight: '200',
                  color: '#e2e8f0',
                  letterSpacing: '4px',
                  marginBottom: '24px',
                  fontFamily: 'Georgia, serif'
                }}>
                  {language === 'english' 
                    ? 'Experience Baja\'s Finest Wines' 
                    : 'Experimenta los Mejores Vinos de Baja'}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  maxWidth: '500px',
                  margin: '0 auto 32px',
                  lineHeight: '1.8'
                }}>
                  {language === 'english'
                    ? 'Let us curate a personalized wine journey through Valle de Guadalupe\'s most prestigious estates.'
                    : 'Permítenos curar un viaje vinícola personalizado por las fincas más prestigiosas del Valle de Guadalupe.'}
                </p>
                <button
                  onClick={() => {
                    const msg = language === 'english' 
                      ? 'I would like to arrange a private wine tasting experience in Valle de Guadalupe' 
                      : 'Me gustaría organizar una experiencia de cata privada en Valle de Guadalupe';
                    window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  style={{
                    padding: '18px 48px',
                    background: 'transparent',
                    border: '1px solid #b8860b',
                    color: '#b8860b',
                    fontSize: '11px',
                    fontWeight: '500',
                    letterSpacing: '4px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#b8860b';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#b8860b';
                  }}
                >
                  {t.winecellar.reserve}
                </button>
              </div>
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

        {/* ==================== COLLECTION TAB - LUXURY GOODS ==================== */}
        {activeTab === "collection" && (
          <section style={{ 
            margin: '-60px -40px -120px -40px',
            position: 'relative'
          }}>
            <LuxuryGoods />
          </section>
        )}

        {/* ==================== ADVERTISE TAB - SELF SERVICE AD PORTAL ==================== */}
        {activeTab === "advertise" && (
          <section style={{ 
            margin: '-60px -40px -120px -40px',
            position: 'relative'
          }}>
            <SelfServiceAdPortal embedded={true} />
          </section>
        )}

        {/* FOOTER */}
        <footer style={{
          marginTop: '120px',
          padding: '48px 20px',
          borderTop: '1px solid rgba(203,166,88,0.3)',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.5)'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#cba658',
            letterSpacing: '3px',
            marginBottom: '16px',
            fontStyle: 'italic'
          }}>
            "{t.slogan}"
          </p>
          <p style={{
            fontSize: '13px',
            color: '#ffffff',
            letterSpacing: '2px',
            fontWeight: '500'
          }}>
            info@enjoybaja.com | WhatsApp: +52 646 340 2686
          </p>
        </footer>
      </div>
    </div>
  );
}