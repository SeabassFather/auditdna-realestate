import React, { useState, useEffect } from "react";
import PropertySearch from "../components/PropertySearch.jsx";
import OwnerBuyerForm from "../components/OwnerBuyerForm.jsx";
import PropertyUploadForm from "../components/PropertyUploadForm.jsx";
import MexicoRefiCard from "../components/MexicoRefiCard.jsx";
import ReferralPartnerCard from "../components/ReferralPartnerCard.jsx";
import AgentRegistrationCard from "../components/AgentRegistrationCard.jsx";
import AppraisalServicesCard from "../components/AppraisalServicesCard.jsx";
import LegalQuestionnaireCard from "../components/LegalQuestionnaireCard.jsx";

function Accordion({ children, defaultOpen = -1 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      open: openIndex === i,
      onHeaderClick: () => setOpenIndex(openIndex === i ? -1 : i),
    })
  );
}

function AccordionItem({ title, open, onHeaderClick, children, color }) {
  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.8)',
      border: '1px solid rgba(203, 166, 88, 0.3)',
      borderRadius: '12px',
      marginBottom: '20px',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)'
    }}>
      <button
        type="button"
        onClick={onHeaderClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
          background: open ? 'rgba(203, 166, 88, 0.15)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '16px',
          color: open ? '#f4e4bc' : '#cbd5e1',
          letterSpacing: '1px',
          transition: 'all 0.3s',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)'
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: '20px', transition: 'transform 0.3s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          {"►"}
        </span>
      </button>
      <div style={{ display: open ? 'block' : 'none', transition: 'all 0.3s' }}>
        <div style={{ padding: '28px' }}>{children}</div>
      </div>
    </div>
  );
}

export default function MexicoRealEstateAccordion() {
  const [language, setLanguage] = useState("english");

  const labels = {
    english: {
      header: "Mexico Real Estate",
      sub: "Premium properties & services for Mexico and USA buyers",
      search: "Search for Properties",
      buyerForm: "Buyer Inquiry / Express Interest",
      upload: "List Your Property",
      refi: "Mexico Home Refinance / Buy in Mexico (US Citizens Only)",
      partner: "Referral Partner Registration",
      agent: "Agent Registration",
      appraisal: "Appraisal Services",
      legal: "Legal/Fideicomiso Questionnaire",
      contact: "Contact Info",
      toggle: "Español",
    },
    spanish: {
      header: "Bienes Raíces México",
      sub: "Propiedades premium y servicios para compradores de México y USA",
      search: "Buscar Propiedades",
      buyerForm: "Solicitud de Información / Interés de Compra",
      upload: "Publicar Propiedad",
      refi: "Refinanciamiento / Compra en México (Solo Ciudadanos USA)",
      partner: "Registro de Socio de Referencia",
      agent: "Registro de Agente",
      appraisal: "Servicios de Avalúo",
      legal: "Cuestionario Legal/Fideicomiso",
      contact: "Información de Contacto",
      toggle: "English",
    },
  };

  const t = labels[language];

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* YACHT MARINA BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />

      {/* DARK OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.9) 100%)',
        zIndex: 0
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px',
          padding: '40px',
          marginBottom: '40px',
          border: '1px solid rgba(203, 166, 88, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: '42px', 
                fontWeight: '300', 
                background: 'linear-gradient(135deg, #cba658, #f4e4bc)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                marginBottom: '12px',
                letterSpacing: '2px',
                textShadow: '0 2px 20px rgba(0,0,0,0.8)'
              }}>
                {t.header}
              </h1>
              <p style={{ 
                fontSize: '16px', 
                color: '#cbd5e1', 
                fontWeight: '300',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)'
              }}>
                {t.sub}
              </p>
            </div>
            <button
              onClick={() => setLanguage(language === "english" ? "spanish" : "english")}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #cba658, #b8944d)',
                border: 'none',
                borderRadius: '30px',
                color: '#0a0a0a',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '1.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(203, 166, 88, 0.5)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(203, 166, 88, 0.7)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(203, 166, 88, 0.5)';
              }}
            >
              {t.toggle}
            </button>
          </div>
        </div>

        {/* Accordion Sections */}
        <Accordion defaultOpen={-1}>
          <AccordionItem title={t.search}>
            <PropertySearch language={language} />
          </AccordionItem>
          
          <AccordionItem title={t.buyerForm}>
            <OwnerBuyerForm language={language} />
          </AccordionItem>
          
          <AccordionItem title={t.upload}>
            <PropertyUploadForm language={language} />
          </AccordionItem>
          
          <AccordionItem title={t.refi}>
            <MexicoRefiCard language={language} />
          </AccordionItem>
          
          <AccordionItem title={t.partner}>
            <ReferralPartnerCard language={language} />
          </AccordionItem>
          
          <AccordionItem title={t.agent}>
            <AgentRegistrationCard language={language} />
          </AccordionItem>
          
          <AccordionItem title={t.appraisal}>
            <AppraisalServicesCard language={language} />
          </AccordionItem>
          
          <AccordionItem title={t.legal}>
            <LegalQuestionnaireCard language={language} />
          </AccordionItem>

          {/* ADMIN TEAM SECTION */}
          <AccordionItem title={language === 'english' ? 'Meet the Team' : 'Conoce al Equipo'}>
            <div style={{ padding: '20px 0' }}>
              <p style={{ 
                fontSize: '14px', 
                color: '#94a3b8', 
                textAlign: 'center', 
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                {language === 'english' 
                  ? 'Our expert team specializes in USA-Mexico cross-border real estate transactions'
                  : 'Nuestro equipo experto especializado en transacciones inmobiliarias transfronterizas'}
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '24px' 
              }}>
                {/* SAUL GARCIA */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    overflow: 'hidden',
                    border: '3px solid #cba658'
                  }}>
                    <img 
                      src="/images/team/saul-garcia.png" 
                      alt="Saul Garcia"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'; }}
                    />
                  </div>
                  <h4 style={{ color: '#f4e4bc', fontSize: '18px', marginBottom: '4px', fontWeight: '600' }}>
                    Saul Garcia
                  </h4>
                  <p style={{ color: '#cba658', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
                    CEO & Lead Mortgage Specialist
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '12px' }}>
                    NMLS #337526
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
                    {['Cross-Border Financing', 'USDA 502 Rural', 'Fideicomiso Expert'].map((spec, i) => (
                      <span key={i} style={{
                        background: 'rgba(203, 166, 88, 0.2)',
                        color: '#cba658',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '10px'
                      }}>{spec}</span>
                    ))}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5', marginBottom: '16px' }}>
                    24+ years in finance and lending. Bilingual Spanish-English. Specialized in USA-Mexico cross-border real estate transactions.
                  </p>
                  <a 
                    href="https://wa.me/526463402686?text=Hello%20Saul,%20I'm%20interested%20in%20Mexico%20real%20estate" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      background: '#cba658',
                      color: '#0f172a',
                      padding: '10px 24px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Contact Saul
                  </a>
                </div>

                {/* ARIEL BOLIO */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    overflow: 'hidden',
                    border: '3px solid #cba658'
                  }}>
                    <img 
                      src="/images/team/ariel-bolio.png" 
                      alt="Ariel Bolio"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400'; }}
                    />
                  </div>
                  <h4 style={{ color: '#f4e4bc', fontSize: '18px', marginBottom: '4px', fontWeight: '600' }}>
                    Ariel Bolio
                  </h4>
                  <p style={{ color: '#cba658', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
                    Company Attorney
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '12px' }}>
                    Licensed Attorney - Baja California
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
                    {['Real Estate Law', 'Contract Negotiation', 'Title Verification', 'Legal Compliance'].map((spec, i) => (
                      <span key={i} style={{
                        background: 'rgba(203, 166, 88, 0.2)',
                        color: '#cba658',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '10px'
                      }}>{spec}</span>
                    ))}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5', marginBottom: '16px' }}>
                    Expert legal counsel for cross-border real estate transactions. Ensures all deals comply with Mexican property law and protects client interests.
                  </p>
                  <a 
                    href="https://wa.me/526463402686?text=Hello,%20I'd%20like%20to%20speak%20with%20Ariel%20Bolio%20about%20legal%20services" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      background: '#cba658',
                      color: '#0f172a',
                      padding: '10px 24px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Contact Ariel
                  </a>
                </div>

                {/* GIBRAN LYLE */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    overflow: 'hidden',
                    border: '3px solid #cba658'
                  }}>
                    <img 
                      src="/images/team/gibran-lyle.png" 
                      alt="Gibran Lyle"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'; }}
                    />
                  </div>
                  <h4 style={{ color: '#f4e4bc', fontSize: '18px', marginBottom: '4px', fontWeight: '600' }}>
                    Gibran Lyle
                  </h4>
                  <p style={{ color: '#cba658', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
                    Real Estate Specialist
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '12px' }}>
                    Licensed Agent - Ensenada, Baja California
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
                    {['Coastal Properties', 'Valle de Guadalupe', 'Investment Properties', 'Buyer Rep'].map((spec, i) => (
                      <span key={i} style={{
                        background: 'rgba(203, 166, 88, 0.2)',
                        color: '#cba658',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '10px'
                      }}>{spec}</span>
                    ))}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5', marginBottom: '16px' }}>
                    Baja California native with deep knowledge of Ensenada and Valle de Guadalupe markets. Specializes in connecting international buyers with premium properties.
                  </p>
                  <a 
                    href="https://wa.me/526463402686?text=Hello,%20I'd%20like%20to%20speak%20with%20Gibran%20Lyle%20about%20properties" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      background: '#cba658',
                      color: '#0f172a',
                      padding: '10px 24px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Contact Gibran
                  </a>
                </div>

                {/* BRENDA BONILLA */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    overflow: 'hidden',
                    border: '3px solid #cba658'
                  }}>
                    <img 
                      src="/images/team/BrendaB.jpg" 
                      alt="Brenda Bonilla"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'; }}
                    />
                  </div>
                  <h4 style={{ color: '#f4e4bc', fontSize: '18px', marginBottom: '4px', fontWeight: '600' }}>
                    Brenda Bonilla
                  </h4>
                  <p style={{ color: '#cba658', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
                    Real Estate Specialist
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '12px' }}>
                    Licensed Agent - Ensenada & Monterrey
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
                    {['Luxury Properties', 'Relocation Services', 'New Developments', 'Client Relations'].map((spec, i) => (
                      <span key={i} style={{
                        background: 'rgba(203, 166, 88, 0.2)',
                        color: '#cba658',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '10px'
                      }}>{spec}</span>
                    ))}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5', marginBottom: '16px' }}>
                    Experienced real estate professional serving Ensenada and Monterrey markets. Dedicated to providing exceptional service for luxury property buyers.
                  </p>
                  <a 
                    href="https://wa.me/526463402686?text=Hello,%20I'd%20like%20to%20speak%20with%20Brenda%20Bonilla%20about%20properties" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      background: '#cba658',
                      color: '#0f172a',
                      padding: '10px 24px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Contact Brenda
                  </a>
                </div>
              </div>

              {/* MESSAGE CENTER */}
              <div style={{
                background: 'rgba(203, 166, 88, 0.1)',
                border: '1px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                marginTop: '32px'
              }}>
                <p style={{ color: '#cba658', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                  📞 Message Center: +52 646 340 2686
                </p>
                <p style={{ color: '#94a3b8', fontSize: '12px' }}>
                  {language === 'english' 
                    ? 'Contact any team member through our central message center'
                    : 'Contacta a cualquier miembro del equipo a través de nuestro centro de mensajes'}
                </p>
              </div>
            </div>
          </AccordionItem>
        </Accordion>

        {/* Footer */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid rgba(203, 166, 88, 0.3)',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#f4e4bc', marginBottom: '12px', letterSpacing: '1px' }}>
            {t.contact}
          </h3>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#cba658', marginBottom: '8px' }}>
            Saul Garcia
          </p>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#cba658', marginBottom: '6px' }}>
            NMLS #337526
          </p>
          <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '4px' }}>
            Everwise Home Loans & Realty
          </p>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
            Company NMLS #1739012 | DRE #02067255
          </p>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
            15615 Alton Pkwy, Suite 450, Irvine, CA 92618
          </p>
          <p style={{ fontSize: '11px', color: '#94a3b8' }}>
            Phone: 1-844-853-9300
          </p>
        </div>
      </div>
    </div>
  );
}