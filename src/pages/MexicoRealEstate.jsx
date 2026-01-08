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
      borderRadius: '0px',
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
      
      {/* YACHT MARINA BACKGROUND - BRIGHT AND ALIVE */}
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

      {/* LIGHTER OVERLAY - SEE THE SAILBOAT */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.65) 100%)',
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
          borderRadius: '0px',
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
        </Accordion>

        {/* Footer */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0px',
          padding: '40px',
          border: '1px solid rgba(203, 166, 88, 0.3)',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#f4e4bc', marginBottom: '16px', letterSpacing: '1px' }}>
            {t.contact}
          </h3>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px' }}>
            info@enjoybaja.com
          </p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#cba658' }}>
            WhatsApp: +52 646 340 2686
          </p>
        </div>
      </div>
    </div>
  );
}