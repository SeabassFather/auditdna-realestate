import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MexicoRealEstate() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // 6 TEAM MEMBERS
  const teamMembers = [
    {
      name: "Saul Garcia",
      title: "Finance & Lending Specialist",
      subtitle: "NMLS #337526",
      specialties: ["Cross-Border Financing", "USDA 502 Rural", "Fideicomiso Expert"],
      description: "31+ years in finance and lending. Bilingual Spanish-English. Specialized in USA-Mexico cross-border real estate transactions.",
      photo: "/images/team/SG.png",
      phone: "+52 646 340 2686",
      email: "saul@auditdna.com"
    },
    {
      name: "Ariel Bolio",
      title: "Company Attorney",
      subtitle: "Licensed Attorney - Baja California",
      specialties: ["Real Estate Law", "Contract Negotiation", "Title Verification"],
      description: "Expert legal counsel for cross-border real estate transactions. Ensures all deals comply with Mexican property law.",
      photo: "/images/team/ariel-bolio.png",
      phone: "+52 646 340 2686",
      email: "ariel@auditdna.com"
    },
    {
      name: "Gibran Lyle",
      title: "Real Estate & Team Development",
      subtitle: "Licensed Agent - Ensenada, Baja California",
      specialties: ["Coastal Properties", "Team Leadership", "Agent Training"],
      description: "Baja California native. Leads team development and agent training programs across the region.",
      photo: "/images/team/gibran-lyle.png",
      phone: "+52 646 340 2686",
      email: "gibran@auditdna.com"
    },
    {
      name: "Brenda Bonilla",
      title: "Real Estate Specialist",
      subtitle: "Baja Mexico & Monterrey Mexico",
      specialties: ["Coastal Properties", "Metropolitan Markets", "Luxury Residences"],
      description: "Dual-market expertise spanning Baja California coastal properties and Monterrey metropolitan real estate.",
      photo: "/images/team/BrendaB.jpg",
      phone: "+52 646 340 2686",
      email: "brenda@auditdna.com"
    },
    {
      name: "Osvaldo Gutierrez",
      title: "Team Development & Real Estate",
      subtitle: "",
      specialties: ["Strategic Growth", "Agent Recruitment", "Market Expansion"],
      description: "Driving team growth and development across USA-Mexico markets. Expert in building high-performance teams.",
      photo: "/images/team/Ozzy.png",
      phone: "+52 646 340 2686",
      email: "osvaldo@auditdna.com"
    },
    {
      name: "Saul Castro",
      title: "Public Relations Specialist",
      subtitle: "",
      specialties: ["Media Relations", "Communications", "Public Outreach"],
      description: "Managing company communications and media relations. Building strong relationships with partners and clients.",
      photo: "/images/team/Saul-Tocayo.png",
      phone: "+52 646 340 2686",
      email: "scastro@auditdna.com"
    }
  ];

  const sections = [
    { id: 'search', title: 'SEARCH FOR PROPERTIES' },
    { id: 'buyer', title: 'BUYER INQUIRY' },
    { id: 'upload', title: 'LIST YOUR PROPERTY' },
    { id: 'refi', title: 'MEXICO HOME REFINANCE' },
    { id: 'partner', title: 'REFERRAL PARTNER' },
    { id: 'agent', title: 'AGENT REGISTRATION' },
    { id: 'appraisal', title: 'APPRAISAL SERVICES' },
    { id: 'legal', title: 'LEGAL / FIDEICOMISO' },
    { id: 'team', title: 'MEET THE TEAM' },
  ];

  // STYLES - SLEEK, SHARP, NO ROUND EDGES
  const inputStyle = {
    padding: '14px 16px',
    background: 'rgba(30, 41, 59, 0.9)',
    border: '1px solid rgba(203, 213, 225, 0.2)',
    borderRadius: '0',
    color: '#e2e8f0',
    fontSize: '13px',
    fontFamily: 'inherit',
    letterSpacing: '0.5px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #cba658, #b8944d)',
    border: 'none',
    borderRadius: '0',
    color: '#0f172a',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '2px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontFamily: 'inherit'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23cbd5e1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '16px',
    paddingRight: '40px'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* YACHT MARINA BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=90")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />
      
      {/* OVERLAY - SEE YACHTS */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.7))',
        zIndex: 1
      }} />

      {/* TOP RIGHT NAV - SMALL */}
      <div style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        display: 'flex',
        gap: '6px',
        zIndex: 10
      }}>
        <button
          onClick={() => navigate('/usa-mortgage')}
          style={{
            padding: '5px 10px',
            background: 'linear-gradient(135deg, #cba658, #b8944d)',
            border: 'none',
            borderRadius: '0',
            color: '#0f172a',
            fontSize: '8px',
            fontWeight: '600',
            letterSpacing: '1px',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}
        >
          USA Mortgage
        </button>
        <button
          onClick={() => navigate('/developments')}
          style={{
            padding: '5px 10px',
            background: 'transparent',
            border: '1px solid rgba(203, 213, 225, 0.4)',
            borderRadius: '0',
            color: '#cbd5e1',
            fontSize: '8px',
            fontWeight: '500',
            letterSpacing: '1px',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}
        >
          Developments
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* HEADER */}
        <div style={{ padding: '50px 20px 30px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '38px', 
            fontWeight: '300', 
            color: '#f8fafc',
            marginBottom: '8px',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            letterSpacing: '6px',
            textTransform: 'uppercase'
          }}>
            Mexico Real Estate
          </h1>
          <p style={{ 
            color: '#cba658', 
            fontSize: '12px', 
            marginBottom: '30px',
            textShadow: '0 1px 10px rgba(0,0,0,0.4)',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            Bienes Raíces en México
          </p>
          
          {/* LANGUAGE TOGGLE */}
          <button
            onClick={() => setLanguage(language === 'english' ? 'spanish' : 'english')}
            style={{
              padding: '10px 28px',
              background: 'transparent',
              border: '1px solid #cba658',
              borderRadius: '0',
              color: '#cba658',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '2px',
              cursor: 'pointer',
              marginBottom: '30px',
              textTransform: 'uppercase'
            }}
          >
            {language === 'english' ? 'Español' : 'English'}
          </button>

        </div>

        {/* ACCORDION */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 60px' }}>
          {sections.map((section) => (
            <div key={section.id} style={{ marginBottom: '8px' }}>
              {/* HEADER */}
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  background: expandedSection === section.id 
                    ? 'rgba(203, 166, 88, 0.1)' 
                    : 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(203, 166, 88, 0.25)',
                  borderRadius: '0',
                  color: expandedSection === section.id ? '#cba658' : '#cbd5e1',
                  fontSize: '11px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  letterSpacing: '2px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
              >
                <span>{section.title}</span>
                <span style={{ 
                  fontSize: '10px',
                  transform: expandedSection === section.id ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}>▶</span>
              </button>

              {/* CONTENT */}
              {expandedSection === section.id && (
                <div style={{
                  padding: '28px 24px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(203, 166, 88, 0.25)',
                  borderTop: 'none',
                  borderRadius: '0',
                  backdropFilter: 'blur(10px)'
                }}>
                  {/* SEARCH */}
                  {section.id === 'search' && (
                    <div>
                      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '13px', letterSpacing: '0.5px' }}>
                        Search properties across Mexico - Baja California to Cancun
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                        <select style={selectStyle}>
                          <option>All Regions</option>
                          <option>Baja California Norte</option>
                          <option>Baja California Sur</option>
                          <option>Quintana Roo</option>
                          <option>Jalisco</option>
                        </select>
                        <select style={selectStyle}>
                          <option>Property Type</option>
                          <option>House</option>
                          <option>Condo</option>
                          <option>Villa</option>
                          <option>Land</option>
                        </select>
                        <select style={selectStyle}>
                          <option>Price Range</option>
                          <option>Under $200K</option>
                          <option>$200K - $500K</option>
                          <option>$500K - $1M</option>
                          <option>$1M+</option>
                        </select>
                      </div>
                      <button style={{ ...buttonStyle, marginTop: '20px' }}>Search Properties</button>
                    </div>
                  )}

                  {/* BUYER */}
                  {section.id === 'buyer' && (
                    <div>
                      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '13px', letterSpacing: '0.5px' }}>
                        Express interest in Mexico properties. Our team contacts you within 24 hours.
                      </p>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <input placeholder="Full Name" style={inputStyle} />
                        <input placeholder="Email" type="email" style={inputStyle} />
                        <input placeholder="Phone" type="tel" style={inputStyle} />
                        <select style={selectStyle}>
                          <option>Interest Type</option>
                          <option>Buying</option>
                          <option>Investing</option>
                          <option>Relocating</option>
                        </select>
                        <textarea placeholder="Describe your ideal property..." rows="3" style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>
                      <button style={{ ...buttonStyle, marginTop: '20px' }}>Submit Inquiry</button>
                    </div>
                  )}

                  {/* UPLOAD */}
                  {section.id === 'upload' && (
                    <div>
                      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '13px', letterSpacing: '0.5px' }}>
                        List your Mexico property. Reach qualified international buyers.
                      </p>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <input placeholder="Property Title" style={inputStyle} />
                        <input placeholder="Location (City, State)" style={inputStyle} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <input placeholder="Price (USD)" style={inputStyle} />
                          <select style={selectStyle}>
                            <option>Property Type</option>
                            <option>House</option>
                            <option>Condo</option>
                            <option>Villa</option>
                            <option>Land</option>
                          </select>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                          <input placeholder="Bedrooms" type="number" style={inputStyle} />
                          <input placeholder="Bathrooms" type="number" style={inputStyle} />
                          <input placeholder="Sq Ft" type="number" style={inputStyle} />
                        </div>
                        <textarea placeholder="Property Description..." rows="3" style={{ ...inputStyle, resize: 'vertical' }} />
                        
                        {/* PHOTO UPLOAD */}
                        <div style={{ 
                          border: '1px dashed rgba(203, 166, 88, 0.4)', 
                          padding: '20px', 
                          textAlign: 'center',
                          background: 'rgba(15, 23, 42, 0.5)'
                        }}>
                          <p style={{ color: '#cba658', fontSize: '10px', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>
                            Property Photos (Max 10)
                          </p>
                          <input 
                            type="file" 
                            accept="image/*" 
                            multiple 
                            id="propertyPhotos"
                            style={{ display: 'none' }}
                          />
                          <label 
                            htmlFor="propertyPhotos"
                            style={{
                              display: 'inline-block',
                              padding: '10px 24px',
                              background: 'transparent',
                              border: '1px solid #cba658',
                              color: '#cba658',
                              fontSize: '9px',
                              fontWeight: '600',
                              letterSpacing: '1px',
                              cursor: 'pointer',
                              textTransform: 'uppercase'
                            }}
                          >
                            Select Photos
                          </label>
                          <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '10px' }}>
                            JPG, PNG up to 5MB each
                          </p>
                        </div>
                      </div>
                      <button style={{ ...buttonStyle, marginTop: '20px' }}>Submit Listing</button>
                    </div>
                  )}

                  {/* REFI */}
                  {section.id === 'refi' && (
                    <div>
                      <div style={{ background: 'rgba(203, 166, 88, 0.08)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '0', padding: '20px', marginBottom: '20px' }}>
                        <h4 style={{ color: '#cba658', marginBottom: '12px', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>US Citizens - Mexico Financing</h4>
                        <ul style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '2', paddingLeft: '18px', margin: 0 }}>
                          <li>Minimum: $385,000 USD</li>
                          <li>Down payment: 35-45%</li>
                          <li>Terms: 15-30 years</li>
                          <li>Fixed and adjustable rates</li>
                        </ul>
                      </div>
                      <button style={buttonStyle}>Get Pre-Qualified</button>
                    </div>
                  )}

                  {/* PARTNER */}
                  {section.id === 'partner' && (
                    <div>
                      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '13px', letterSpacing: '0.5px' }}>
                        Join our referral network. Earn commissions on successful transactions.
                      </p>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <input placeholder="Full Name" style={inputStyle} />
                        <input placeholder="Company (Optional)" style={inputStyle} />
                        <input placeholder="Email" type="email" style={inputStyle} />
                        <input placeholder="Phone" type="tel" style={inputStyle} />
                      </div>
                      <button style={{ ...buttonStyle, marginTop: '20px' }}>Apply as Partner</button>
                    </div>
                  )}

                  {/* AGENT */}
                  {section.id === 'agent' && (
                    <div>
                      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '13px', letterSpacing: '0.5px' }}>
                        Licensed agents - join our network and list properties on our platform.
                      </p>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <input placeholder="Full Name" style={inputStyle} />
                        <input placeholder="License Number" style={inputStyle} />
                        <input placeholder="Brokerage Name" style={inputStyle} />
                        <input placeholder="Email" type="email" style={inputStyle} />
                        <input placeholder="Phone" type="tel" style={inputStyle} />
                      </div>
                      <button style={{ ...buttonStyle, marginTop: '20px' }}>Register as Agent</button>
                    </div>
                  )}

                  {/* APPRAISAL */}
                  {section.id === 'appraisal' && (
                    <div>
                      <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '13px', letterSpacing: '0.5px' }}>
                        Request professional property appraisal for Mexico real estate.
                      </p>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <input placeholder="Property Address" style={inputStyle} />
                        <input placeholder="Your Name" style={inputStyle} />
                        <input placeholder="Email" type="email" style={inputStyle} />
                        <input placeholder="Phone" type="tel" style={inputStyle} />
                      </div>
                      <button style={{ ...buttonStyle, marginTop: '20px' }}>Request Appraisal</button>
                    </div>
                  )}

                  {/* LEGAL */}
                  {section.id === 'legal' && (
                    <div>
                      <div style={{ background: 'rgba(203, 166, 88, 0.08)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '0', padding: '20px', marginBottom: '20px' }}>
                        <h4 style={{ color: '#cba658', marginBottom: '12px', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>Fideicomiso</h4>
                        <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>
                          A Mexican bank trust required for foreign buyers purchasing property within the restricted zone (50km from coastline or 100km from borders).
                        </p>
                      </div>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <input placeholder="Your Name" style={inputStyle} />
                        <input placeholder="Email" type="email" style={inputStyle} />
                        <select style={selectStyle}>
                          <option>Citizenship Status</option>
                          <option>US Citizen</option>
                          <option>Canadian Citizen</option>
                          <option>Other Foreign National</option>
                          <option>Mexican National</option>
                        </select>
                        <textarea placeholder="Your legal questions..." rows="3" style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>
                      <button style={{ ...buttonStyle, marginTop: '20px' }}>Submit Questions</button>
                    </div>
                  )}

                  {/* TEAM */}
                  {section.id === 'team' && (
                    <div>
                      <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '13px', letterSpacing: '0.5px' }}>
                        Expert team specializing in USA-Mexico cross-border real estate.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                        {teamMembers.map((member, index) => (
                          <div key={index} style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            border: '1px solid rgba(203, 166, 88, 0.15)',
                            borderRadius: '0',
                            padding: '20px',
                            textAlign: 'center'
                          }}>
                            {/* Photo */}
                            <div style={{
                              width: '90px',
                              height: '90px',
                              margin: '0 auto 14px',
                              overflow: 'hidden',
                              border: '2px solid #cba658',
                              borderRadius: '0',
                              background: 'rgba(15, 23, 42, 0.8)'
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
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            </div>
                            {/* Name */}
                            <h4 style={{ color: '#f1f5f9', fontSize: '14px', marginBottom: '2px', fontWeight: '500', letterSpacing: '1px' }}>
                              {member.name}
                            </h4>
                            {/* Title */}
                            <p style={{ color: '#cba658', fontSize: '10px', marginBottom: '2px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase' }}>
                              {member.title}
                            </p>
                            {/* Subtitle */}
                            {member.subtitle && (
                              <p style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                {member.subtitle}
                              </p>
                            )}
                            {/* Specialties - SMALL, SQUARE */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', marginBottom: '10px' }}>
                              {member.specialties.map((spec, i) => (
                                <span key={i} style={{
                                  padding: '3px 8px',
                                  background: 'rgba(203, 166, 88, 0.1)',
                                  border: '1px solid rgba(203, 166, 88, 0.25)',
                                  borderRadius: '0',
                                  fontSize: '9px',
                                  color: '#cba658',
                                  letterSpacing: '0.5px',
                                  textTransform: 'uppercase'
                                }}>
                                  {spec}
                                </span>
                              ))}
                            </div>
                            {/* Description */}
                            <p style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.5', marginBottom: '14px' }}>
                              {member.description}
                            </p>
                            {/* Contact */}
                            <a 
                              href={`https://wa.me/526463402686?text=Hello ${member.name}, I'm interested in Mexico real estate`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-block',
                                padding: '8px 20px',
                                background: '#cba658',
                                color: '#0f172a',
                                borderRadius: '0',
                                textDecoration: 'none',
                                fontSize: '9px',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                              }}
                            >
                              Contact
                            </a>
                          </div>
                        ))}
                      </div>
                      {/* Message Center */}
                      <div style={{ 
                        marginTop: '24px', 
                        padding: '18px', 
                        background: 'rgba(203, 166, 88, 0.08)', 
                        border: '1px solid rgba(203, 166, 88, 0.2)', 
                        borderRadius: '0',
                        textAlign: 'center'
                      }}>
                        <p style={{ color: '#cba658', fontSize: '10px', marginBottom: '6px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase' }}>
                          Message Center
                        </p>
                        <p style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: '400', letterSpacing: '1px' }}>
                          +52-646-340-2686
                        </p>
                        <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '4px', letterSpacing: '1px' }}>
                          WHATSAPP AVAILABLE
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ 
          padding: '35px 20px', 
          background: 'rgba(15, 23, 42, 0.9)',
          borderTop: '1px solid rgba(203, 166, 88, 0.15)',
          textAlign: 'center'
        }}>
          <p style={{ color: '#cba658', fontSize: '11px', fontWeight: '500', marginBottom: '4px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Enjoy Baja Real Estate
          </p>
          <p style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '10px', letterSpacing: '1px' }}>
            Premium Mexico Real Estate & Cross-Border Financing
          </p>
          <p style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '500', letterSpacing: '1px' }}>Saul Garcia</p>
          <p style={{ color: '#cba658', fontSize: '11px', letterSpacing: '1px' }}>NMLS #337526</p>
          <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '10px', letterSpacing: '1px' }}>
            +52-646-340-2686 • info@enjoybaja.com
          </p>
        </div>
      </div>
    </div>
  );
}