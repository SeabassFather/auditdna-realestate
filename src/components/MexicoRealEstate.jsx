import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertySearch from '../components/PropertySearch';

export default function MexicoRealEstate() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // NEW TEAM - 3 Members
  const teamMembers = [
    {
      name: "Saul Garcia",
      title: "CEO & Lead Mortgage Specialist",
      subtitle: "NMLS #337526",
      specialties: ["Cross-Border Financing", "USDA 502 Rural", "Fideicomiso Expert"],
      description: "31+ years in finance and lending. Bilingual Spanish-English. Specialized in USA-Mexico cross-border real estate transactions.",
      photo: "/images/team/SG.png"
    },
    {
      name: "Osvaldo Gutierrez",
      title: "Marketing & Business Development (VP)",
      subtitle: "",
      specialties: ["Strategic Growth", "Brand Development", "Market Expansion"],
      description: "Driving business growth and brand presence across USA-Mexico markets. Expert in cross-border marketing strategies.",
      photo: "/images/team/Ozzy.png"
    },
    {
      name: "Saul Castro",
      title: "Public Relations Specialist",
      subtitle: "",
      specialties: ["Media Relations", "Communications", "Public Outreach"],
      description: "Managing company communications and media relations. Building strong relationships with partners and clients.",
      photo: "/images/team/Saul-Tocayo.png"
    }
  ];

  const sections = [
    { id: 'search', title: 'Search for Properties', icon: '🔍' },
    { id: 'buyer', title: 'Buyer Inquiry / Express Interest', icon: '📝' },
    { id: 'upload', title: 'List Your Property', icon: '📤' },
    { id: 'refi', title: 'Mexico Home Refinance / Buy in Mexico', icon: '🏦' },
    { id: 'partner', title: 'Referral Partner Registration', icon: '🤝' },
    { id: 'agent', title: 'Agent Registration', icon: '💼' },
    { id: 'appraisal', title: 'Appraisal Services', icon: '📋' },
    { id: 'legal', title: 'Legal/Fideicomiso Questionnaire', icon: '⚖️' },
    { id: 'team', title: 'Meet the Team', icon: '👥' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      {/* Header */}
      <div style={{ padding: '40px 20px 20px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: '800', 
          color: '#fff',
          marginBottom: '8px'
        }}>
          🏠 Mexico Real Estate
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '24px' }}>
          Bienes Raíces en México • Full Service Platform
        </p>
        
        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'english' ? 'spanish' : 'english')}
          style={{
            padding: '10px 24px',
            background: 'rgba(203, 166, 88, 0.2)',
            border: '1px solid #cba658',
            borderRadius: '8px',
            color: '#cba658',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '32px'
          }}
        >
          🌐 {language === 'english' ? 'Español' : 'English'}
        </button>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button
            onClick={() => navigate('/usa-mortgage')}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #cba658, #b8944d)',
              border: 'none',
              borderRadius: '8px',
              color: '#0f172a',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🇺🇸 USA Mortgage Loans
          </button>
          <button
            onClick={() => navigate('/developments')}
            style={{
              padding: '14px 28px',
              background: 'rgba(203, 166, 88, 0.2)',
              border: '1px solid #cba658',
              borderRadius: '8px',
              color: '#cba658',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🏗️ Developments
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '14px 28px',
              background: 'rgba(100, 116, 139, 0.3)',
              border: '1px solid #64748b',
              borderRadius: '8px',
              color: '#cbd5e1',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔐 Agent Login
          </button>
        </div>
      </div>

      {/* Accordion Sections */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 40px' }}>
        {sections.map((section) => (
          <div 
            key={section.id}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(203, 166, 88, 0.2)',
              borderRadius: '12px',
              marginBottom: '12px',
              overflow: 'hidden'
            }}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                width: '100%',
                padding: '20px 24px',
                background: expandedSection === section.id ? 'rgba(203, 166, 88, 0.1)' : 'transparent',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#cbd5e1'
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: '600' }}>
                {section.icon} {section.title}
              </span>
              <span style={{ 
                fontSize: '20px',
                transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
                color: '#cba658'
              }}>
                ▼
              </span>
            </button>

            {/* Accordion Content */}
            {expandedSection === section.id && (
              <div style={{ padding: '24px', borderTop: '1px solid rgba(203, 166, 88, 0.2)' }}>
                
                {/* Search Section */}
                {section.id === 'search' && (
                  <PropertySearch language={language} />
                )}

                {/* Buyer Inquiry */}
                {section.id === 'buyer' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english' 
                        ? 'Express your interest in Mexico properties. Our team will contact you within 24 hours.'
                        : 'Exprese su interés en propiedades en México. Nuestro equipo le contactará en 24 horas.'}
                    </p>
                    <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Full Name' : 'Nombre Completo'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder="Email" type="email" style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <select style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                        <option>{language === 'english' ? 'Budget Range' : 'Rango de Presupuesto'}</option>
                        <option>$100K - $250K</option>
                        <option>$250K - $500K</option>
                        <option>$500K - $1M</option>
                        <option>$1M+</option>
                      </select>
                      <textarea placeholder={language === 'english' ? 'Tell us about your ideal property...' : 'Cuéntenos sobre su propiedad ideal...'} rows={4} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px', resize: 'vertical' }} />
                      <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                        {language === 'english' ? 'Submit Inquiry' : 'Enviar Solicitud'}
                      </button>
                    </div>
                  </div>
                )}

                {/* List Your Property */}
                {section.id === 'upload' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english'
                        ? 'List your Mexico property with us. Reach qualified USA buyers.'
                        : 'Liste su propiedad en México con nosotros. Llegue a compradores calificados de USA.'}
                    </p>
                    <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Property Address' : 'Dirección de la Propiedad'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Asking Price (USD)' : 'Precio (USD)'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <select style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                        <option>{language === 'english' ? 'Property Type' : 'Tipo de Propiedad'}</option>
                        <option>House / Casa</option>
                        <option>Condo / Condominio</option>
                        <option>Land / Terreno</option>
                        <option>Commercial / Comercial</option>
                      </select>
                      <input placeholder={language === 'english' ? 'Your Name' : 'Su Nombre'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Your Email' : 'Su Email'} type="email" style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Your Phone' : 'Su Teléfono'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                        {language === 'english' ? 'Submit Listing' : 'Enviar Listado'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Mexico Refinance */}
                {section.id === 'refi' && (
                  <div>
                    <div style={{ background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#cba658', marginBottom: '12px', fontSize: '18px' }}>🇺🇸 US Citizens Only - Mexico Property Financing</h4>
                      <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '20px' }}>
                        <li>Minimum Property Value: <strong style={{ color: '#cba658' }}>$385,000 USD</strong></li>
                        <li>Down Payment: <strong style={{ color: '#cba658' }}>35-45%</strong></li>
                        <li>Loan Terms: 15-30 years</li>
                        <li>Competitive rates for qualified buyers</li>
                        <li>Fideicomiso (Bank Trust) structure</li>
                      </ul>
                    </div>
                    <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                      {language === 'english' ? 'Get Pre-Qualified' : 'Pre-Calificar'}
                    </button>
                  </div>
                )}

                {/* Referral Partner */}
                {section.id === 'partner' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english'
                        ? 'Join our referral network. Earn commissions on successful transactions.'
                        : 'Únase a nuestra red de referidos. Gane comisiones en transacciones exitosas.'}
                    </p>
                    <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Full Name' : 'Nombre Completo'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder="Email" type="email" style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Company (Optional)' : 'Empresa (Opcional)'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                        {language === 'english' ? 'Register as Partner' : 'Registrarse como Socio'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Agent Registration */}
                {section.id === 'agent' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english'
                        ? 'Licensed agents - join our network to list properties and earn commissions.'
                        : 'Agentes con licencia - únase a nuestra red para listar propiedades y ganar comisiones.'}
                    </p>
                    <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Full Name' : 'Nombre Completo'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder="Email" type="email" style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'License Number' : 'Número de Licencia'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Brokerage' : 'Corredora'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                        {language === 'english' ? 'Register as Agent' : 'Registrarse como Agente'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Appraisal Services */}
                {section.id === 'appraisal' && (
                  <div>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                      {language === 'english'
                        ? 'Professional property appraisal services for Mexico real estate.'
                        : 'Servicios profesionales de avalúo para bienes raíces en México.'}
                    </p>
                    <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                      <input placeholder={language === 'english' ? 'Property Address' : 'Dirección de la Propiedad'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Your Name' : 'Su Nombre'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder="Email" type="email" style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <input placeholder={language === 'english' ? 'Phone' : 'Teléfono'} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#cbd5e1', fontSize: '14px' }} />
                      <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                        {language === 'english' ? 'Request Appraisal' : 'Solicitar Avalúo'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Legal / Fideicomiso */}
                {section.id === 'legal' && (
                  <div>
                    <div style={{ background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#cba658', marginBottom: '12px', fontSize: '18px' }}>⚖️ Fideicomiso (Bank Trust) Information</h4>
                      <p style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                        {language === 'english'
                          ? 'Foreign nationals can own property in Mexico\'s restricted zone (within 50km of coast or 100km of border) through a Fideicomiso - a bank trust that grants full ownership rights for 50 years, renewable indefinitely.'
                          : 'Los extranjeros pueden ser propietarios en la zona restringida de México (dentro de 50km de la costa o 100km de la frontera) a través de un Fideicomiso - un fideicomiso bancario que otorga derechos de propiedad completos por 50 años, renovable indefinidamente.'}
                      </p>
                    </div>
                    <button style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', cursor: 'pointer' }}>
                      {language === 'english' ? 'Start Legal Questionnaire' : 'Iniciar Cuestionario Legal'}
                    </button>
                  </div>
                )}

                {/* TEAM SECTION */}
                {section.id === 'team' && (
                  <div>
                    <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '32px', fontSize: '16px' }}>
                      {language === 'english'
                        ? 'Our expert team specializes in USA-Mexico cross-border real estate transactions'
                        : 'Nuestro equipo experto se especializa en transacciones inmobiliarias transfronterizas USA-México'}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                      {teamMembers.map((member, index) => (
                        <div 
                          key={index}
                          style={{
                            background: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid rgba(203, 166, 88, 0.3)',
                            borderRadius: '16px',
                            padding: '32px 24px',
                            textAlign: 'center'
                          }}
                        >
                          {/* Photo */}
                          <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            margin: '0 auto 20px',
                            border: '4px solid #cba658',
                            boxShadow: '0 8px 24px rgba(203, 166, 88, 0.3)'
                          }}>
                            <img 
                              src={member.photo} 
                              alt={member.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center'
                              }}
                            />
                          </div>

                          {/* Name */}
                          <h4 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                            {member.name}
                          </h4>

                          {/* Title */}
                          <p style={{ color: '#cba658', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                            {member.title}
                          </p>

                          {/* Subtitle (NMLS etc) */}
                          {member.subtitle && (
                            <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '16px' }}>
                              {member.subtitle}
                            </p>
                          )}

                          {/* Specialties */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px', marginTop: member.subtitle ? '0' : '16px' }}>
                            {member.specialties.map((spec, i) => (
                              <span 
                                key={i}
                                style={{
                                  padding: '4px 12px',
                                  background: 'rgba(203, 166, 88, 0.2)',
                                  border: '1px solid rgba(203, 166, 88, 0.3)',
                                  borderRadius: '20px',
                                  color: '#cba658',
                                  fontSize: '11px',
                                  fontWeight: '500'
                                }}
                              >
                                {spec}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                            {member.description}
                          </p>

                          {/* Contact Button */}
                          <a
                            href="https://wa.me/526463402686"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              padding: '12px 28px',
                              background: 'linear-gradient(135deg, #cba658, #b8944d)',
                              borderRadius: '8px',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: '700',
                              textDecoration: 'none'
                            }}
                          >
                            Contact {member.name.split(' ')[0]}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.9)',
        borderTop: '1px solid rgba(203, 166, 88, 0.2)',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#cba658', fontSize: '20px', marginBottom: '16px' }}>Contact Info</h3>
        <p style={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>Saul Garcia</p>
        <p style={{ color: '#cba658', fontSize: '16px', fontWeight: '700' }}>NMLS #337526</p>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Everwise Home Loans & Realty</p>
        <p style={{ color: '#64748b', fontSize: '13px' }}>Company NMLS #1739012 | DRE #02067255</p>
        <p style={{ color: '#64748b', fontSize: '13px' }}>15615 Alton Pkwy, Suite 450, Irvine, CA 92618</p>
        <p style={{ color: '#64748b', fontSize: '13px' }}>Phone: 1-844-853-9300</p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
          <a 
            href="https://wa.me/526463402686"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 32px',
              background: '#25D366',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            📱 WhatsApp
          </a>
          <a 
            href="mailto:info@enjoybaja.com"
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #cba658, #b8944d)',
              borderRadius: '8px',
              color: '#0f172a',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ✉️ Email
          </a>
        </div>
      </div>
    </div>
  );
}