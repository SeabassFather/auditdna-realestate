import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AIChatWidget from '../components/chat/AIChatWidget';

export default function MexicoRealEstate() {
  const navigate = useNavigate();
  // Language support available
  const [selectedTerritory, setSelectedTerritory] = useState('All');
  const [activeTab, setActiveTab] = useState('properties');

  const territories = [
    'All',
    'Valle de Guadalupe', 'Ensenada', 'Rosarito', 'Tijuana', 'San Felipe',
    'La Paz', 'Cabo San Lucas', 'San Jose del Cabo', 'Todos Santos', 'Los Barriles', 'Loreto', 'East Cape',
    'Puerto Penasco', 'San Carlos', 'Guaymas', 'Hermosillo',
    'Mazatlan', 'Los Mochis',
    'Sayulita', 'Punta Mita', 'Bucerias', 'San Blas', 'Rincon de Guayabitos',
    'Puerto Vallarta', 'Barra de Navidad', 'Costalegre', 'Ajijic', 'Chapala', 'Mazamitla',
    'Acapulco', 'Ixtapa', 'Zihuatanejo',
    'Puerto Escondido', 'Huatulco', 'Mazunte', 'Oaxaca',
    'Lazaro Cardenas', 'Patzcuaro',
    'Cancun', 'Playa del Carmen', 'Tulum', 'Akumal', 'Cozumel', 'Isla Mujeres', 'Puerto Morelos', 'Bacalar',
    'Merida', 'Progreso', 'Celestun',
    'Veracruz', 'Boca del Rio',
    'San Miguel de Allende', 'Guanajuato', 'Queretaro', 'Mexico City'
  ];

  const tabs = [
    { id: 'properties', name: 'Properties' },
    { id: 'financing', name: 'Financing' },
    { id: 'fideicomiso', name: 'Fideicomiso' },
    { id: 'legal', name: 'Legal Process' },
    { id: 'notario', name: 'Notario' },
    { id: 'developments', name: 'Developments' },
    { id: 'agents', name: 'Agent Tools' }
  ];

  const properties = [
    {
      id: 1,
      title: 'Valle de Guadalupe Wine Country Estate',
      territory: 'Valle de Guadalupe',
      price: 1250000,
      beds: 4,
      baths: 3.5,
      sqft: 3800,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      type: 'Estate',
      description: 'Luxury vineyard estate with wine production facilities'
    },
    {
      id: 2,
      title: 'Oceanfront Villa - Ensenada',
      territory: 'Ensenada',
      price: 890000,
      beds: 5,
      baths: 4,
      sqft: 4200,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      type: 'Villa',
      description: 'Stunning Pacific Ocean views with private beach access'
    },
    {
      id: 3,
      title: 'Modern Beachfront Condo - Rosarito',
      territory: 'Rosarito',
      price: 425000,
      beds: 3,
      baths: 2,
      sqft: 2100,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
      type: 'Condo',
      description: 'Contemporary design with panoramic ocean views'
    },
    {
      id: 4,
      title: 'Cabo Luxury Resort Residence',
      territory: 'Cabo San Lucas',
      price: 1850000,
      beds: 4,
      baths: 4.5,
      sqft: 3500,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      type: 'Resort',
      description: 'World-class resort amenities and golf course access'
    },
    {
      id: 5,
      title: 'Colonial Hacienda - Merida',
      territory: 'Merida',
      price: 675000,
      beds: 6,
      baths: 5,
      sqft: 5200,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      type: 'Hacienda',
      description: 'Restored colonial architecture with modern amenities'
    },
    {
      id: 6,
      title: 'Tulum Jungle Retreat',
      territory: 'Tulum',
      price: 950000,
      beds: 3,
      baths: 3,
      sqft: 2800,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      type: 'Villa',
      description: 'Eco-luxury in the heart of the Mayan jungle'
    }
  ];

  const filteredProperties = selectedTerritory === 'All' 
    ? properties 
    : properties.filter(p => p.territory === selectedTerritory);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderFideicomiso = () => (
    <div style={{ padding: '60px 40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
        Fideicomiso Compliance
      </h2>
      <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '800px' }}>
        Foreign Buyer Trust Requirements for Restricted Zone Properties
      </p>

      <div style={{ background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '400', color: '#cba658', marginBottom: '16px' }}>
          What is Fideicomiso?
        </h3>
        <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.8' }}>
          A fideicomiso is a Mexican bank trust required for foreign buyers purchasing property within the "restricted zone" 
          (50km from coastline or 100km from borders). The bank holds legal title while you maintain all beneficial rights - 
          you can sell, rent, improve, or pass the property to heirs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h4 style={{ fontSize: '20px', fontWeight: '400', color: '#cba658', marginBottom: '20px' }}>Setup Process</h4>
          <ul style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px' }}>
            <li>Choose authorized Mexican bank</li>
            <li>Submit required documentation</li>
            <li>Pay establishment fee ($1,500-$3,000 USD)</li>
            <li>Sign trust agreement</li>
            <li>Property title transferred to bank trust</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h4 style={{ fontSize: '20px', fontWeight: '400', color: '#cba658', marginBottom: '20px' }}>Required Documents</h4>
          <ul style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px' }}>
            <li>Valid passport</li>
            <li>Proof of address (utility bill)</li>
            <li>Birth certificate (apostilled)</li>
            <li>Marriage certificate (if applicable)</li>
            <li>Tax ID (RFC for Mexico, SSN for US)</li>
          </ul>
        </div>
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
        <h4 style={{ fontSize: '20px', fontWeight: '400', color: '#cba658', marginBottom: '20px' }}>Annual Fees & Renewal</h4>
        <div style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#cba658' }}>Annual Trust Fee:</strong> $500-$700 USD (varies by bank and property value)
          </p>
          <p style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#cba658' }}>Trust Duration:</strong> Initial 50 years, renewable for additional 50 years
          </p>
          <p>
            <strong style={{ color: '#cba658' }}>Renewal Process:</strong> Submit request 1 year before expiration, pay renewal fee, updated trust documents
          </p>
        </div>
      <AIChatWidget />
      </div>
    </div>
  );

  const renderFinancing = () => (
    <div style={{ padding: '60px 40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
        Cross-Border Financing
      </h2>
      <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '800px' }}>
        Financing Solutions for US Citizens Purchasing Mexico Real Estate
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {[
          { title: 'Traditional Mortgage', rate: '6.5% - 8.5%', down: '30-40%', term: '10-20 years' },
          { title: 'Developer Financing', rate: '8% - 12%', down: '20-30%', term: '5-10 years' },
          { title: 'Home Equity (USA)', rate: '5% - 7%', down: 'N/A', term: '15-30 years' }
        ].map((option, idx) => (
          <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '400', color: '#cba658', marginBottom: '20px' }}>{option.title}</h4>
            <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '12px' }}>
              <strong>Rate:</strong> {option.rate}
            </div>
            <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '12px' }}>
              <strong>Down Payment:</strong> {option.down}
            </div>
            <div style={{ fontSize: '15px', color: '#cbd5e1' }}>
              <strong>Term:</strong> {option.term}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
        <h4 style={{ fontSize: '24px', fontWeight: '400', color: '#cba658', marginBottom: '24px' }}>Pre-Qualification Checklist</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[
            'Credit score 680+ (USA)',
            'Debt-to-income ratio <43%',
            'Proof of income (2 years tax returns)',
            'Bank statements (3 months)',
            'Down payment verification',
            'Valid passport',
            'Proof of USA residency',
            'Employment verification letter'
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#cbd5e1' }}>
              <span style={{ color: '#cba658', fontSize: '18px' }}>Ã¢</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      <AIChatWidget />
      </div>
    </div>
  );

  const renderProperties = () => (
    <div style={{ padding: '60px 40px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '24px', letterSpacing: '1px' }}>
          Premium Properties
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {territories.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTerritory(t)}
              style={{
                padding: '12px 24px',
                background: selectedTerritory === t ? '#cba658' : 'rgba(203, 166, 88, 0.1)',
                color: selectedTerritory === t ? '#0f172a' : '#cba658',
                border: '1px solid rgba(203, 166, 88, 0.3)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'all 0.3s'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' }}>
        {filteredProperties.map(property => (
          <div
            key={property.id}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(203, 166, 88, 0.2)',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#cba658';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(203, 166, 88, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(203, 166, 88, 0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
              <img
                src={property.image}
                alt={property.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '8px 16px',
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#cba658',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>
                {property.type}
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: '28px', fontWeight: '300', color: '#cba658', marginBottom: '12px' }}>
                {formatPrice(property.price)}
              </div>
              
              <h3 style={{ fontSize: '20px', fontWeight: '400', color: '#f1f5f9', marginBottom: '8px' }}>
                {property.title}
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
                <MapPin size={16} />
                <span>{property.territory}</span>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                {property.description}
              </p>

              <div style={{ display: 'flex', gap: '20px', paddingTop: '16px', borderTop: '1px solid rgba(203, 166, 88, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                  <Bed size={18} />
                  <span style={{ fontSize: '14px' }}>{property.beds} beds</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                  <Bath size={18} />
                  <span style={{ fontSize: '14px' }}>{property.baths} baths</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                  <Maximize size={18} />
                  <span style={{ fontSize: '14px' }}>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button style={{
                  flex: 1,
                  padding: '12px',
                  background: '#cba658',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}>
                  View Details
                </button>
                <button style={{
                  flex: 1,
                  padding: '12px',
                  background: 'transparent',
                  color: '#cba658',
                  border: '2px solid #cba658',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}>
                  Schedule Tour
                </button>
              </div>
            </div>
          </div>
        ))}
      <AIChatWidget />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
      
      <header style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(203, 166, 88, 0.2)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '300', color: '#cba658', letterSpacing: '2px', marginBottom: '4px' }}>
                AUDITDNA ESTATES
              </h1>
              <p style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '1px' }}>
                Premium Mexico Real Estate & Cross-Border Financing
              </p>
            </div>
            <div style={{ display: 'flex', gap: '20px', color: '#94a3b8', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={16} />
                <span>+52-646-340-2686</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={16} />
                <span>estates@auditdna.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section style={{
        padding: '80px 40px',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.9) 100%)',
        borderBottom: '1px solid rgba(203, 166, 88, 0.2)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '52px', fontWeight: '300', color: '#f1f5f9', marginBottom: '20px', letterSpacing: '1px' }}>
            Discover Extraordinary Properties in Mexico
          </h2>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto 40px', lineHeight: '1.8' }}>
            From Valle de Guadalupe wine estates to Cabo oceanfront villas. 
            Full cross-border financing and fideicomiso services for US buyers.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginTop: '50px' }}>
            {[
              { value: '245', label: 'Premium Listings' },
              { value: '89', label: 'Properties Sold' },
              { value: '$42M', label: 'Total Volume' },
              { value: '11', label: 'Territories' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '8px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderBottom: '1px solid rgba(203, 166, 88, 0.2)', background: 'rgba(15, 23, 42, 0.6)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4px', padding: '0 40px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '20px 32px',
                background: activeTab === tab.id ? 'rgba(15, 23, 42, 0.8)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #cba658' : '2px solid transparent',
                color: activeTab === tab.id ? '#cba658' : '#94a3b8',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'all 0.3s'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {activeTab === 'properties' && renderProperties()}
        {activeTab === 'financing' && renderFinancing()}
        {activeTab === 'fideicomiso' && renderFideicomiso()}
        {activeTab === 'legal' && (
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '40px' }}>Mexico Property Purchase Timeline</h3>
            <div style={{ display: 'grid', gap: '24px', marginBottom: '60px' }}>
              {[
                { step: '1', days: '1-7 days', title: 'Property Selection & Offer', tasks: ['View properties with agent', 'Submit letter of intent', 'Negotiate price and terms'], docs: ['Passport copy', 'Proof of funds', 'Offer letter'] },
                { step: '2', days: '15-30 days', title: 'Due Diligence Period', tasks: ['Property inspection', 'Title search review', 'Survey verification', 'HOA/condo review'], docs: ['Inspection report', 'Title certificate', 'Survey documents', 'HOA financials'] },
                { step: '3', days: '20-30 days', title: 'Fideicomiso Setup', tasks: ['Bank trust application', 'Foreign Affairs permit', 'Trust agreement draft'], docs: ['Permit application', 'Bank forms', 'ID documents'] },
                { step: '4', days: '30-45 days', title: 'Financing (if applicable)', tasks: ['Submit loan application', 'Property appraisal', 'Underwriting review', 'Loan approval'], docs: ['Tax returns', 'Bank statements', 'Employment verification', 'Appraisal report'] },
                { step: '5', days: '7-14 days', title: 'Notario Review & Preparation', tasks: ['Draft purchase agreement', 'Calculate transfer taxes', 'Prepare closing documents'], docs: ['Purchase agreement', 'Tax calculations', 'Payment receipts'] },
                { step: '6', days: '1 day', title: 'Closing Day', tasks: ['Sign final documents', 'Transfer funds to escrow', 'Notario registers deed', 'Receive keys'], docs: ['Escritura Publica', 'Payment proof', 'Registration receipt'] },
                { step: '7', days: '30-60 days', title: 'Post-Closing', tasks: ['Deed registration complete', 'Receive certified copies', 'Update utilities/services', 'Register with municipality'], docs: ['Registered deed', 'Utility transfers', 'Tax registration'] }
              ].map((phase, idx) => (
                <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
                    <div style={{ width: '60px', height: '60px', background: '#cba658', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: '#0f172a', flexShrink: 0 }}>{phase.step}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>TIMELINE: {phase.days.toUpperCase()}</div>
                      <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#f1f5f9', marginBottom: '16px' }}>{phase.title}</h4>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>Key Tasks:</div>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          {phase.tasks.map((task, i) => (
                            <li key={i} style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>{task}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>Required Documents:</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {phase.docs.map((doc, i) => (
                            <span key={i} style={{ padding: '6px 12px', background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '6px', fontSize: '12px', color: '#cba658' }}>{doc}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#cba658', marginBottom: '24px' }}>Estimated Closing Costs</h4>
            <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { item: 'Acquisition Tax (ISAI)', cost: '2-3% of purchase price' },
                  { item: 'Notario Fees', cost: '1-2% of purchase price' },
                  { item: 'Public Registry Fee', cost: '0.5-1% of purchase price' },
                  { item: 'Fideicomiso Setup (if applicable)', cost: '$1,500 - $3,000 USD' },
                  { item: 'Fideicomiso Annual Fee', cost: '$500 - $700 USD/year' },
                  { item: 'Title Insurance (optional)', cost: '0.5-1% of purchase price' },
                  { item: 'Appraisal Fee', cost: '$300 - $800 USD' },
                  { item: 'Home Inspection', cost: '$400 - $600 USD' }
                ].map((cost, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#f1f5f9' }}>{cost.item}</span>
                    <span style={{ fontSize: '14px', color: '#cba658', fontWeight: '600' }}>{cost.cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px' }}>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}><strong>Total Estimated Closing Costs:</strong> 5-8% of purchase price (varies by property value and location)</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'notario' && (
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '40px' }}>Understanding the Notario Publico</h3>
            
            <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
              <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#f1f5f9', marginBottom: '20px' }}>What is a Notario Publico?</h4>
              <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.8', marginBottom: '16px' }}>In Mexico, a Notario Publico is NOT just a notary public. They are licensed attorneys appointed by the state government who serve as public officials. Think of them as a combination of an attorney, title company, and notary all in one.</p>
              <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.8' }}>The Notario is impartial and works for both buyer and seller to ensure a legal, proper transaction. They have extensive legal training and are personally liable for their work, which is why transactions in Mexico are extremely secure.</p>
            </div>

            <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#cba658', marginBottom: '24px' }}>Notario Responsibilities</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {['Verify legal capacity of buyer and seller','Conduct thorough title search','Confirm property has no liens','Calculate all transfer taxes','Draft the Escritura Publica (deed)','Witness signing of documents','Register deed with Public Registry','Provide certified copies','Archive documents 100+ years'].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '8px' }}>
                  <span style={{ color: '#cba658', fontSize: '20px' }}>Ã¢</span>
                  <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{item}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#cba658', marginBottom: '24px' }}>8-Step Closing Process</h4>
            <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
              {[
                { step: '1', title: 'Pre-Closing Review', desc: 'Notario reviews documents, verifies clear title' },
                { step: '2', title: 'Closing Disclosure', desc: 'Buyer receives final costs 3 days before' },
                { step: '3', title: 'Closing Appointment', desc: 'All parties meet at Notario office' },
                { step: '4', title: 'Document Review', desc: 'Notario reads deed aloud' },
                { step: '5', title: 'Payment Collection', desc: 'Buyer provides wire transfer proof' },
                { step: '6', title: 'Deed Execution', desc: 'All parties sign Escritura Publica' },
                { step: '7', title: 'Registry Filing', desc: 'Filed with Public Registry (30-60 days)' },
                { step: '8', title: 'Final Deed', desc: 'Buyer receives certified copy' }
              ].map((phase, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', padding: '20px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '8px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#cba658', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#0f172a', flexShrink: 0 }}>{phase.step}</div>
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>{phase.title}</h5>
                    <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#cba658', marginBottom: '24px' }}>Notario Fees</h4>
            <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { service: 'Title Search', cost: '$300-$600 USD' },
                  { service: 'Deed Preparation', cost: '0.5-1% of price' },
                  { service: 'Closing Services', cost: '0.5-1% of price' },
                  { service: 'Registry Filing', cost: '$200-$400 USD' }
                ].map((fee, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{fee.service}</span>
                    <span style={{ fontSize: '14px', color: '#cba658', fontWeight: '600' }}>{fee.cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px' }}>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}><strong>Total:</strong> Typically 1-2% of purchase price</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'developments' && (
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '16px' }}>Master-Planned Communities</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px' }}>Explore new development projects across Mexico with full financing available</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
              {[
                { name: 'Valle Escondido', location: 'Valle de Guadalupe, BC', units: 120, priceFrom: 350000, priceTo: 850000, status: 'Pre-Construction', delivery: 'Q4 2026', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', amenities: ['Wine Tasting', 'Vineyard Views', 'Spa', 'Restaurant'] },
                { name: 'Cabo Marina Residences', location: 'Cabo San Lucas, BCS', units: 85, priceFrom: 650000, priceTo: 2500000, status: 'Under Construction', delivery: 'Q2 2027', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', amenities: ['Marina', 'Ocean Views', 'Beach Club', 'Concierge'] },
                { name: 'Tulum Jungle Estates', location: 'Tulum, Q. Roo', units: 60, priceFrom: 450000, priceTo: 1200000, status: 'Selling Now', delivery: 'Q1 2026', image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', amenities: ['Cenote', 'Jungle Views', 'Yoga Studio', 'Eco-Design'] },
                { name: 'Puerto Vallarta Highlands', location: 'Puerto Vallarta', units: 95, priceFrom: 280000, priceTo: 750000, status: 'Phase 2', delivery: 'Q3 2026', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', amenities: ['Golf Course', 'Mountain Views', 'Club House', 'Pools'] },
                { name: 'San Miguel Colonial', location: 'San Miguel de Allende', units: 45, priceFrom: 520000, priceTo: 1800000, status: 'Pre-Construction', delivery: 'Q1 2027', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', amenities: ['Colonial', 'Art District', 'Terraces', 'Gardens'] },
                { name: 'La Paz Waterfront', location: 'La Paz, BCS', units: 72, priceFrom: 320000, priceTo: 950000, status: 'Under Construction', delivery: 'Q4 2026', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', amenities: ['Beach', 'Marina', 'Fitness', 'Restaurant'] }
              ].map((project, idx) => (
                <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(203, 166, 88, 0.2)' }}>
                  <div style={{ position: 'relative', height: '260px' }}>
                    <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '8px 16px', background: project.status === 'Selling Now' ? 'rgba(34, 197, 94, 0.9)' : project.status === 'Under Construction' ? 'rgba(59, 130, 246, 0.9)' : 'rgba(251, 191, 36, 0.9)', color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{project.status}</div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#f1f5f9', marginBottom: '8px' }}>{project.name}</h4>
                    <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '16px' }}>{project.location}</p>
                    <div style={{ fontSize: '26px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>${(project.priceFrom / 1000).toFixed(0)}K - ${(project.priceTo / 1000).toFixed(0)}K</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(203, 166, 88, 0.2)' }}>
                      <div><span style={{ fontSize: '12px', color: '#94a3b8' }}>Units:</span> <span style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>{project.units}</span></div>
                      <div><span style={{ fontSize: '12px', color: '#94a3b8' }}>Delivery:</span> <span style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>{project.delivery}</span></div>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>AMENITIES</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.amenities.map((amenity, i) => (
                          <span key={i} style={{ padding: '6px 12px', background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '6px', fontSize: '11px', color: '#cba658' }}>{amenity}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <button style={{ padding: '12px', background: 'transparent', color: '#cba658', border: '2px solid #cba658', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>View Plans</button>
                      <button style={{ padding: '12px', background: '#cba658', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Contact</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'agents' && (
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: '300', color: '#cba658', marginBottom: '16px' }}>Agent Registration & Tools</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px' }}>Register to list properties - INE verification required</p>

            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={() => navigate('/agent-upload')} style={{ padding: '20px 60px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }}>
                Â¤ Upload New Property
              </button>
              <button onClick={() => navigate('/agent-login')} style={{ padding: '20px 60px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(203, 166, 88, 0.3)' }}>
                Agent Login / Register Ã¢
              </button>
            </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginBottom: '40px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
                <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#cba658', marginBottom: '20px' }}> Listing Requirements</h4>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {['Valid INE (Mexican ID) - verified','Minimum 8 professional photos','Complete property docs','Seller authorization letter','Title verification pre-listing','Liability insurance proof','Real estate license','Bank account for commissions'].map((req, idx) => (
                    <li key={idx} style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', lineHeight: '1.6' }}>{req}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
                <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#cba658', marginBottom: '20px' }}>Â° Commission Structure</h4>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '42px', fontWeight: '700', color: '#cba658', marginBottom: '8px' }}>5-6%</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Standard commission rate</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}><strong>Split:</strong> 50/50 with listing broker</div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}><strong>Payment:</strong> At closing via escrow</div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1' }}><strong>Currency:</strong> USD or MXN</div>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.6' }}>
                  * Negotiable on properties over $2M<br/>
                  * Exclusive listings get priority<br/>
                  * Co-listing agreements available
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
              <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#cba658', marginBottom: '20px' }}> Agent Dashboard Features</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[
                  { icon: '', title: 'Analytics', desc: 'Track views, leads, showings' },
                  { icon: 'Â¬', title: 'Lead Management', desc: 'Buyer inquiries & follow-ups' },
                  { icon: 'Â¸', title: 'Photo Manager', desc: 'Upload & organize images' },
                  { icon: 'Â', title: 'Listing Editor', desc: 'Update prices & details' },
                  { icon: '', title: 'Scheduling', desc: 'Showing appointments' },
                  { icon: 'Âµ', title: 'Commission Tracker', desc: 'Earnings & payments' }
                ].map((feature, idx) => (
                  <div key={idx} style={{ textAlign: 'center', padding: '20px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '36px', marginBottom: '12px' }}>{feature.icon}</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '6px' }}>{feature.title}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{feature.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '32px' }}>
              <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#86efac', marginBottom: '16px' }}>Ã¢Â¨ Premium Agent Benefits</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {['Featured listing placement','Social media marketing support','Professional photography discounts','Virtual tour services','Buyer pre-qualification assistance','Cross-border financing coordination','Fideicomiso support','Monthly agent training webinars'].map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#86efac', fontSize: '18px' }}>Ã¢</span>
                    <span style={{ fontSize: '14px', color: '#d1fae5' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderTop: '1px solid rgba(203, 166, 88, 0.2)',
        padding: '40px',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>
            NMLS #337526 | Everwise Home Loans and Realty | DRE #02067255
          </p>
          <p style={{ color: '#64748b', fontSize: '12px' }}>
            Ã‚Â© 2026 AuditDNA Estates. Premium Mexico Real Estate & Cross-Border Financing.
          </p>
        </div>
      </footer>
    </div>
  );
}

