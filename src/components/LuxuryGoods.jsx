// =============================================
// LUXURY GOODS MARKETPLACE - ENTERPRISE EDITION
// - KYC SELLER VERIFICATION (INE/Passport/License + Selfie)
// - CATEGORY-BASED COMMISSION STRUCTURE
// - BRAIN INTEGRATION & CROSS-MODULE COMMUNICATION
// - FRAUD PREVENTION & LEGAL COMPLIANCE
// =============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleNavBar from '../components/ModuleNavBar';

// ========== COMMISSION STRUCTURE BY CATEGORY ==========
const COMMISSION_SCHEDULE = {
  'Aviation': { rate: 3.0, description: 'Private Jets, Helicopters, Aircraft' },
  'Yachts': { rate: 5.0, description: 'Superyachts, Motor Yachts, Sailing Yachts' },
  'Automobiles': { rate: 4.0, description: 'Exotic Cars, Classic Cars, Hypercars' },
  'Watches': { rate: 8.0, description: 'Luxury Timepieces, Vintage Watches' },
  'Jewelry': { rate: 10.0, description: 'Fine Jewelry, Precious Stones, Custom Pieces' },
  'Art': { rate: 12.0, description: 'Fine Art, Sculptures, Limited Editions' },
  'Wine Collections': { rate: 15.0, description: 'Rare Wines, Vintage Collections, Cellars' },
  'Real Estate': { rate: 2.5, description: 'Luxury Properties, Estates, Villas' },
  'Other Luxury': { rate: 7.5, description: 'Designer Items, Collectibles, Memorabilia' }
};

// ========== LUXURY GOODS DATA ==========
const LUXURY_ITEMS = [
  // AVIATION
  {
    id: 'jet-001', category: 'Aviation', title: '2019 Gulfstream G650ER',
    subtitle: 'Ultra Long Range Business Jet', price: '$62,500,000',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=85',
    specs: ['Range: 7,500 nm', 'Speed: Mach 0.925', 'Passengers: 19', 'Hours: 1,847 TTAF'],
    location: 'San Diego, CA', featured: true, seller: 'Verified Dealer', verified: true
  },
  {
    id: 'yacht-001', category: 'Yachts', title: '2020 Benetti Oasis 40M',
    subtitle: 'Italian Luxury Superyacht', price: '$18,500,000',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=85',
    specs: ['Length: 131 ft', 'Beam: 28 ft', 'Guests: 10', 'Crew: 7'],
    location: 'Cabo San Lucas, MX', featured: true, seller: 'Private Owner', verified: true
  },
  {
    id: 'car-001', category: 'Automobiles', title: '2024 Rolls-Royce Phantom EWB',
    subtitle: 'Extended Wheelbase - Bespoke', price: '$685,000',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=85',
    specs: ['V12 Twin-Turbo', 'Starlight Headliner', 'Bespoke Interior', '2,400 Miles'],
    location: 'Beverly Hills, CA', featured: true, seller: 'Authorized Dealer', verified: true
  },
  {
    id: 'watch-001', category: 'Watches', title: 'Patek Philippe Nautilus 5711/1A',
    subtitle: 'Tiffany Blue Dial - Final Edition', price: '$850,000',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=85',
    specs: ['Ref: 5711/1A-018', 'Steel Case', 'Box & Papers', 'Unworn 2023'],
    location: 'Geneva, Switzerland', featured: true, seller: 'Certified Dealer', verified: true
  }
];

// ========== HERO IMAGES (4-SQUARE) ==========
const HERO_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=90', label: 'EXOTIC AUTOMOBILES' },
  { url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=90', label: 'PRIVATE AVIATION' },
  { url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=90', label: 'SUPERYACHTS' },
  { url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=90', label: 'FINE TIMEPIECES' }
];

export default function LuxuryGoods() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  // Seller registration state
  const [sellerForm, setSellerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    idType: '',
    idDocument: null,
    selfiePhoto: null,
    termsAccepted: false,
    commissionAcknowledged: false
  });

  const [dragActive, setDragActive] = useState({ id: false, selfie: false });

  // Typography styles
  const sansText = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    textTransform: 'uppercase'
  };

  const serifText = {
    fontFamily: 'Georgia, "Times New Roman", serif'
  };

  // Handle file drag & drop
  const handleDrag = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive({ ...dragActive, [field]: true });
    } else if (e.type === "dragleave") {
      setDragActive({ ...dragActive, [field]: false });
    }
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive({ ...dragActive, [field]: false });
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSellerForm({ ...sellerForm, [field]: file });
        
        // SEND TO BRAIN - Document uploaded
        sendToBrain({
          action: 'DOCUMENT_UPLOAD',
          module: 'LuxuryGoods',
          timestamp: new Date().toISOString(),
          user: sellerForm.email || 'Unknown',
          documentType: field === 'idDocument' ? sellerForm.idType : 'Selfie Photo',
          fileName: file.name,
          fileSize: file.size,
          status: 'Pending Verification'
        });
      } else {
        alert('Please upload an image file (JPG, PNG, or PDF)');
      }
    }
  };

  const handleFileSelect = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSellerForm({ ...sellerForm, [field]: file });
      
      // SEND TO BRAIN
      sendToBrain({
        action: 'DOCUMENT_UPLOAD',
        module: 'LuxuryGoods',
        timestamp: new Date().toISOString(),
        user: sellerForm.email || 'Unknown',
        documentType: field === 'idDocument' ? sellerForm.idType : 'Selfie Photo',
        fileName: file.name,
        fileSize: file.size,
        status: 'Pending Verification'
      });
    }
  };

  // Submit seller registration
  const handleSellerSubmit = () => {
    // Validation
    if (!sellerForm.fullName || !sellerForm.email || !sellerForm.phone) {
      alert('Please fill all required fields');
      return;
    }
    if (!sellerForm.category) {
      alert('Please select a selling category');
      return;
    }
    if (!sellerForm.idType || !sellerForm.idDocument) {
      alert('Please upload a government-issued ID');
      return;
    }
    if (!sellerForm.selfiePhoto) {
      alert('Please upload a selfie with your phone visible');
      return;
    }
    if (!sellerForm.termsAccepted || !sellerForm.commissionAcknowledged) {
      alert('Please accept Terms & Conditions and Commission Agreement');
      return;
    }

    // Generate seller application
    const sellerApplication = {
      id: `SELLER-${Date.now()}`,
      ...sellerForm,
      status: 'Pending Verification',
      submittedAt: new Date().toISOString(),
      commission: COMMISSION_SCHEDULE[sellerForm.category],
      verificationSteps: {
        idVerification: 'Pending',
        selfieVerification: 'Pending',
        backgroundCheck: 'Pending',
        approvalStatus: 'Pending Review'
      }
    };

    // Store in localStorage (simulating backend)
    const existing = JSON.parse(localStorage.getItem('luxury_seller_applications') || '[]');
    existing.push(sellerApplication);
    localStorage.setItem('luxury_seller_applications', JSON.stringify(existing));

    // SEND TO BRAIN - Complete registration
    sendToBrain({
      action: 'SELLER_REGISTRATION',
      module: 'LuxuryGoods',
      timestamp: new Date().toISOString(),
      sellerId: sellerApplication.id,
      sellerData: {
        name: sellerForm.fullName,
        email: sellerForm.email,
        phone: sellerForm.phone,
        category: sellerForm.category,
        commission: COMMISSION_SCHEDULE[sellerForm.category].rate + '%'
      },
      verificationRequired: true,
      status: 'Submitted for Review'
    });

    alert('Seller application submitted! You will receive verification results within 24-48 hours.');
    setShowSellerModal(false);
    resetSellerForm();
  };

  const resetSellerForm = () => {
    setSellerForm({
      fullName: '', email: '', phone: '', company: '', category: '',
      idType: '', idDocument: null, selfiePhoto: null,
      termsAccepted: false, commissionAcknowledged: false
    });
  };

  // BRAIN INTEGRATION - Send data to admin dashboard & monitoring system
  const sendToBrain = (data) => {
    // Store in luxury_brain_log
    const brainLog = JSON.parse(localStorage.getItem('luxury_brain_log') || '[]');
    brainLog.push({
      ...data,
      recordedAt: new Date().toISOString(),
      source: 'LuxuryGoods Module'
    });
    localStorage.setItem('luxury_brain_log', JSON.stringify(brainLog));

    // Also store in master brain log (cross-module)
    const masterBrainLog = JSON.parse(localStorage.getItem('master_brain_log') || '[]');
    masterBrainLog.push({
      ...data,
      recordedAt: new Date().toISOString(),
      module: 'LuxuryGoods'
    });
    localStorage.setItem('master_brain_log', JSON.stringify(masterBrainLog));

    // Log to console for monitoring
    console.log('🧠 BRAIN LOG:', data);
  };

  // Handle inquiry submission
  const handleInquiry = (item) => {
    const inquiry = {
      id: `INQ-${Date.now()}`,
      itemId: item.id,
      itemTitle: item.title,
      itemPrice: item.price,
      category: item.category,
      timestamp: new Date().toISOString(),
      status: 'New'
    };

    // Store inquiry
    const inquiries = JSON.parse(localStorage.getItem('luxury_inquiries') || '[]');
    inquiries.push(inquiry);
    localStorage.setItem('luxury_inquiries', JSON.stringify(inquiries));

    // SEND TO BRAIN
    sendToBrain({
      action: 'BUYER_INQUIRY',
      module: 'LuxuryGoods',
      timestamp: new Date().toISOString(),
      inquiryId: inquiry.id,
      item: {
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category
      },
      status: 'New Inquiry'
    });

    setSelectedItem(null);
    setShowInquiryModal(true);
    setTimeout(() => setShowInquiryModal(false), 3000);
  };

  const filteredItems = selectedCategory === 'All' 
    ? LUXURY_ITEMS 
    : LUXURY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#050505' }}>
      
      {/* MODULE NAVIGATION BAR - ALL 5 MODULES */}
      <ModuleNavBar />
      
      {/* 4-SQUARE HERO SECTION */}
      <section style={{
        position: 'relative', height: '100vh', display: 'grid',
        gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr',
        gap: '4px', background: '#0a0a0a'
      }}>
        {HERO_IMAGES.map((img, idx) => (
          <div key={idx} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'transform 0.8s ease, filter 0.5s ease',
              filter: 'brightness(0.6) saturate(0.9)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.filter = 'brightness(0.8) saturate(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'brightness(0.6) saturate(0.9)';
            }}
            />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: `linear-gradient(${idx === 0 ? '135deg' : idx === 1 ? '225deg' : idx === 2 ? '45deg' : '315deg'},
                rgba(203,213,225,0.15) 0%, transparent 50%, rgba(148,163,176,0.1) 100%)`,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute', bottom: '30px', left: '30px', zIndex: 10
            }}>
              <p style={{
                ...sansText, fontSize: '10px', letterSpacing: '4px', color: '#b8944d',
                marginBottom: '8px', textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                {img.label}
              </p>
              <div style={{
                width: '40px', height: '2px',
                background: 'linear-gradient(90deg, #cbd5e1, transparent)',
                boxShadow: '0 0 10px rgba(203,213,225,0.5)'
              }} />
            </div>
          </div>
        ))}

        {/* CENTER OVERLAY - TITLE & CTA */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 20
        }}>
          <h1 style={{
            ...serifText, fontSize: '64px', fontWeight: '300',
            color: '#cbd5e1', margin: '0 0 20px 0', letterSpacing: '8px',
            textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 0 60px rgba(203,213,225,0.3)'
          }}>
            LUXURY GOODS
          </h1>
          <p style={{
            ...sansText, fontSize: '12px', letterSpacing: '6px',
            color: '#b8944d', marginBottom: '40px',
            textShadow: '0 2px 15px rgba(0,0,0,0.6)'
          }}>
            CURATED MARKETPLACE FOR DISCERNING COLLECTORS
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={() => setShowSellerModal(true)}
              style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #cbd5e1, #94a3b0)',
                border: 'none', color: '#0a0a0a',
                ...sansText, fontSize: '11px', letterSpacing: '3px', fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(203,213,225,0.4), 0 0 60px rgba(203,213,225,0.2)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              BECOME A SELLER
            </button>
            <button
              onClick={() => document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '16px 40px',
                background: 'transparent',
                border: '2px solid #b8944d', color: '#b8944d',
                ...sansText, fontSize: '11px', letterSpacing: '3px', fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(184,148,77,0.3)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(184,148,77,0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              BROWSE COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* COMMISSION SCHEDULE BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))',
        padding: '40px 60px', borderTop: '1px solid rgba(203,166,88,0.2)',
        borderBottom: '1px solid rgba(203,166,88,0.2)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{
            ...sansText, fontSize: '12px', letterSpacing: '4px',
            color: '#b8944d', marginBottom: '30px'
          }}>
            TRANSPARENT COMMISSION STRUCTURE
          </h3>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {Object.entries(COMMISSION_SCHEDULE).map(([category, info]) => (
              <div key={category} style={{
                padding: '20px', background: 'rgba(203,213,225,0.05)',
                border: '1px solid rgba(203,213,225,0.1)'
              }}>
                <p style={{
                  ...sansText, fontSize: '10px', letterSpacing: '2px',
                  color: '#cbd5e1', marginBottom: '8px'
                }}>
                  {category}
                </p>
                <p style={{
                  fontSize: '32px', fontWeight: '700',
                  color: '#b8944d', marginBottom: '8px'
                }}>
                  {info.rate}%
                </p>
                <p style={{
                  fontSize: '9px', color: '#94a3b8', lineHeight: '1.4'
                }}>
                  {info.description}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowTermsModal(true)}
            style={{
              marginTop: '30px', padding: '12px 30px',
              background: 'transparent', border: '1px solid rgba(203,166,88,0.3)',
              color: '#cbd5e1', ...sansText, fontSize: '10px', letterSpacing: '2px',
              cursor: 'pointer', transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#cba658';
              e.currentTarget.style.color = '#cba658';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(203,166,88,0.3)';
              e.currentTarget.style.color = '#cbd5e1';
            }}
          >
            VIEW FULL TERMS & CONDITIONS
          </button>
        </div>
      </section>

      {/* MARKETPLACE SECTION */}
      <section id="marketplace" style={{
        padding: '100px 60px', background: '#0f172a'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Category Filter */}
          <div style={{
            display: 'flex', gap: '15px', justifyContent: 'center',
            marginBottom: '60px', flexWrap: 'wrap'
          }}>
            {['All', ...Object.keys(COMMISSION_SCHEDULE)].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '12px 24px',
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #cbd5e1, #94a3b0)' : 'rgba(203,213,225,0.05)',
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(203,213,225,0.2)',
                  color: selectedCategory === cat ? '#0a0a0a' : '#cbd5e1',
                  ...sansText, fontSize: '10px', letterSpacing: '2px', fontWeight: '600',
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  if (selectedCategory !== cat) {
                    e.currentTarget.style.background = 'rgba(203,213,225,0.1)';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedCategory !== cat) {
                    e.currentTarget.style.background = 'rgba(203,213,225,0.05)';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  background: 'rgba(30,41,59,0.6)',
                  border: '1px solid rgba(203,213,225,0.1)',
                  overflow: 'hidden', cursor: 'pointer',
                  transition: 'all 0.4s',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(203,213,225,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                }}
              >
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s'
                  }} />
                  {item.verified && (
                    <div style={{
                      position: 'absolute', top: '20px', right: '20px',
                      background: 'rgba(184,148,77,0.95)', padding: '8px 16px',
                      ...sansText, fontSize: '9px', letterSpacing: '2px',
                      color: '#0a0a0a', fontWeight: '700'
                    }}>
                      ✓ VERIFIED
                    </div>
                  )}
                  <div style={{
                    position: 'absolute', bottom: '20px', left: '20px',
                    background: 'rgba(203,213,225,0.95)', padding: '8px 16px',
                    ...sansText, fontSize: '9px', letterSpacing: '2px',
                    color: '#0a0a0a', fontWeight: '700'
                  }}>
                    {item.category.toUpperCase()}
                  </div>
                </div>

                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    ...serifText, fontSize: '24px', color: '#f1f5f9',
                    marginBottom: '8px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '13px', color: '#94a3b8',
                    marginBottom: '20px', lineHeight: '1.6'
                  }}>
                    {item.subtitle}
                  </p>
                  
                  <div style={{
                    borderTop: '1px solid rgba(203,213,225,0.1)',
                    paddingTop: '20px', marginBottom: '20px'
                  }}>
                    {item.specs.map((spec, idx) => (
                      <p key={idx} style={{
                        fontSize: '11px', color: '#cbd5e1',
                        marginBottom: '6px', ...sansText
                      }}>
                        • {spec}
                      </p>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <p style={{
                      fontSize: '28px', fontWeight: '700',
                      color: '#b8944d'
                    }}>
                      {item.price}
                    </p>
                    <p style={{
                      fontSize: '10px', color: '#94a3b8',
                      ...sansText
                    }}>
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELLER REGISTRATION MODAL */}
      {showSellerModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.9)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px', backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            maxWidth: '700px', width: '100%', maxHeight: '90vh',
            overflow: 'auto', border: '2px solid #cba658',
            boxShadow: '0 20px 80px rgba(203,166,88,0.3)'
          }}>
            <div style={{
              padding: '40px', borderBottom: '1px solid rgba(203,166,88,0.2)'
            }}>
              <h2 style={{
                ...sansText, fontSize: '24px', letterSpacing: '4px',
                color: '#cba658', marginBottom: '10px'
              }}>
                SELLER REGISTRATION
              </h2>
              <p style={{
                fontSize: '13px', color: '#94a3b8', lineHeight: '1.6'
              }}>
                Complete KYC verification to list luxury items. All sellers must provide valid identification and undergo verification to prevent fraud.
              </p>
            </div>

            <div style={{ padding: '40px' }}>
              
              {/* Personal Information */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block', ...sansText, fontSize: '10px',
                  letterSpacing: '2px', color: '#cbd5e1', marginBottom: '10px'
                }}>
                  FULL NAME *
                </label>
                <input
                  type="text"
                  value={sellerForm.fullName}
                  onChange={e => setSellerForm({...sellerForm, fullName: e.target.value})}
                  style={{
                    width: '100%', padding: '14px',
                    background: 'rgba(15,23,42,0.5)',
                    border: '1px solid rgba(203,166,88,0.3)',
                    color: '#f1f5f9', fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '20px', marginBottom: '30px'
              }}>
                <div>
                  <label style={{
                    display: 'block', ...sansText, fontSize: '10px',
                    letterSpacing: '2px', color: '#cbd5e1', marginBottom: '10px'
                  }}>
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    value={sellerForm.email}
                    onChange={e => setSellerForm({...sellerForm, email: e.target.value})}
                    style={{
                      width: '100%', padding: '14px',
                      background: 'rgba(15,23,42,0.5)',
                      border: '1px solid rgba(203,166,88,0.3)',
                      color: '#f1f5f9', fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block', ...sansText, fontSize: '10px',
                    letterSpacing: '2px', color: '#cbd5e1', marginBottom: '10px'
                  }}>
                    PHONE *
                  </label>
                  <input
                    type="tel"
                    value={sellerForm.phone}
                    onChange={e => setSellerForm({...sellerForm, phone: e.target.value})}
                    style={{
                      width: '100%', padding: '14px',
                      background: 'rgba(15,23,42,0.5)',
                      border: '1px solid rgba(203,166,88,0.3)',
                      color: '#f1f5f9', fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block', ...sansText, fontSize: '10px',
                  letterSpacing: '2px', color: '#cbd5e1', marginBottom: '10px'
                }}>
                  COMPANY (Optional)
                </label>
                <input
                  type="text"
                  value={sellerForm.company}
                  onChange={e => setSellerForm({...sellerForm, company: e.target.value})}
                  style={{
                    width: '100%', padding: '14px',
                    background: 'rgba(15,23,42,0.5)',
                    border: '1px solid rgba(203,166,88,0.3)',
                    color: '#f1f5f9', fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Category Selection */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block', ...sansText, fontSize: '10px',
                  letterSpacing: '2px', color: '#cbd5e1', marginBottom: '10px'
                }}>
                  SELLING CATEGORY * (Commission: {sellerForm.category ? COMMISSION_SCHEDULE[sellerForm.category].rate + '%' : 'Select category'})
                </label>
                <select
                  value={sellerForm.category}
                  onChange={e => setSellerForm({...sellerForm, category: e.target.value})}
                  style={{
                    width: '100%', padding: '14px',
                    background: 'rgba(15,23,42,0.5)',
                    border: '1px solid rgba(203,166,88,0.3)',
                    color: '#f1f5f9', fontSize: '14px',
                    outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="">Select Category</option>
                  {Object.keys(COMMISSION_SCHEDULE).map(cat => (
                    <option key={cat} value={cat}>
                      {cat} - {COMMISSION_SCHEDULE[cat].rate}% Commission
                    </option>
                  ))}
                </select>
              </div>

              {/* ID Verification */}
              <div style={{
                marginBottom: '30px',
                padding: '20px',
                background: 'rgba(248,113,113,0.05)',
                border: '1px solid rgba(248,113,113,0.2)'
              }}>
                <p style={{
                  ...sansText, fontSize: '10px', letterSpacing: '2px',
                  color: '#f87171', marginBottom: '15px'
                }}>
                  ⚠️ GOVERNMENT-ISSUED ID REQUIRED (NO EXCEPTIONS)
                </p>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block', ...sansText, fontSize: '10px',
                    letterSpacing: '2px', color: '#cbd5e1', marginBottom: '10px'
                  }}>
                    ID TYPE *
                  </label>
                  <select
                    value={sellerForm.idType}
                    onChange={e => setSellerForm({...sellerForm, idType: e.target.value})}
                    style={{
                      width: '100%', padding: '14px',
                      background: 'rgba(15,23,42,0.5)',
                      border: '1px solid rgba(203,166,88,0.3)',
                      color: '#f1f5f9', fontSize: '14px',
                      outline: 'none', cursor: 'pointer'
                    }}
                  >
                    <option value="">Select ID Type</option>
                    <option value="INE">INE (Mexico)</option>
                    <option value="Passport">Passport</option>
                    <option value="Driver License">Driver's License (USA/Canada)</option>
                    <option value="National ID">National ID Card</option>
                  </select>
                </div>

                {/* ID Document Upload - Drag & Drop */}
                <div
                  onDragEnter={(e) => handleDrag(e, 'idDocument')}
                  onDragLeave={(e) => handleDrag(e, 'idDocument')}
                  onDragOver={(e) => handleDrag(e, 'idDocument')}
                  onDrop={(e) => handleDrop(e, 'idDocument')}
                  style={{
                    padding: '40px',
                    border: `2px dashed ${dragActive.id ? '#cba658' : 'rgba(203,166,88,0.3)'}`,
                    background: dragActive.id ? 'rgba(203,166,88,0.1)' : 'rgba(15,23,42,0.3)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => document.getElementById('idUpload').click()}
                >
                  <input
                    id="idUpload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileSelect(e, 'idDocument')}
                    style={{ display: 'none' }}
                  />
                  {sellerForm.idDocument ? (
                    <div>
                      <p style={{ color: '#22c55e', fontSize: '14px', marginBottom: '8px' }}>
                        ✓ {sellerForm.idDocument.name}
                      </p>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ ...sansText, fontSize: '12px', letterSpacing: '2px', color: '#cbd5e1', marginBottom: '10px' }}>
                        📄 DRAG & DROP ID DOCUMENT
                      </p>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Or click to browse (JPG, PNG, or PDF)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Selfie Verification */}
              <div style={{
                marginBottom: '30px',
                padding: '20px',
                background: 'rgba(248,113,113,0.05)',
                border: '1px solid rgba(248,113,113,0.2)'
              }}>
                <p style={{
                  ...sansText, fontSize: '10px', letterSpacing: '2px',
                  color: '#f87171', marginBottom: '15px'
                }}>
                  📸 SELFIE WITH PHONE REQUIRED (FRAUD PREVENTION)
                </p>
                
                {/* Selfie Upload - Drag & Drop */}
                <div
                  onDragEnter={(e) => handleDrag(e, 'selfiePhoto')}
                  onDragLeave={(e) => handleDrag(e, 'selfiePhoto')}
                  onDragOver={(e) => handleDrag(e, 'selfiePhoto')}
                  onDrop={(e) => handleDrop(e, 'selfiePhoto')}
                  style={{
                    padding: '40px',
                    border: `2px dashed ${dragActive.selfie ? '#cba658' : 'rgba(203,166,88,0.3)'}`,
                    background: dragActive.selfie ? 'rgba(203,166,88,0.1)' : 'rgba(15,23,42,0.3)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => document.getElementById('selfieUpload').click()}
                >
                  <input
                    id="selfieUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 'selfiePhoto')}
                    style={{ display: 'none' }}
                  />
                  {sellerForm.selfiePhoto ? (
                    <div>
                      <p style={{ color: '#22c55e', fontSize: '14px', marginBottom: '8px' }}>
                        ✓ {sellerForm.selfiePhoto.name}
                      </p>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ ...sansText, fontSize: '12px', letterSpacing: '2px', color: '#cbd5e1', marginBottom: '10px' }}>
                        🤳 DRAG & DROP SELFIE WITH PHONE
                      </p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.6' }}>
                        Take a selfie holding your phone with the screen visible<br/>
                        (JPG or PNG)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex', alignItems: 'center', cursor: 'pointer',
                  padding: '15px', background: 'rgba(203,166,88,0.05)',
                  border: '1px solid rgba(203,166,88,0.2)'
                }}>
                  <input
                    type="checkbox"
                    checked={sellerForm.termsAccepted}
                    onChange={e => setSellerForm({...sellerForm, termsAccepted: e.target.checked})}
                    style={{ marginRight: '12px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6' }}>
                    I accept the <span style={{ color: '#cba658', textDecoration: 'underline', cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>Terms & Conditions</span> and agree to platform policies
                  </span>
                </label>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'flex', alignItems: 'center', cursor: 'pointer',
                  padding: '15px', background: 'rgba(203,166,88,0.05)',
                  border: '1px solid rgba(203,166,88,0.2)'
                }}>
                  <input
                    type="checkbox"
                    checked={sellerForm.commissionAcknowledged}
                    onChange={e => setSellerForm({...sellerForm, commissionAcknowledged: e.target.checked})}
                    style={{ marginRight: '12px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6' }}>
                    I acknowledge the {sellerForm.category ? COMMISSION_SCHEDULE[sellerForm.category].rate + '%' : 'category-based'} commission fee and payment terms
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  onClick={handleSellerSubmit}
                  style={{
                    flex: 1, padding: '18px',
                    background: 'linear-gradient(135deg, #cba658, #b8944d)',
                    border: 'none', color: '#0a0a0a',
                    ...sansText, fontSize: '12px', letterSpacing: '2px', fontWeight: '700',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  SUBMIT APPLICATION
                </button>
                <button
                  onClick={() => { setShowSellerModal(false); resetSellerForm(); }}
                  style={{
                    flex: 1, padding: '18px',
                    background: 'rgba(148,163,184,0.1)',
                    border: '1px solid rgba(148,163,184,0.3)', color: '#cbd5e1',
                    ...sansText, fontSize: '12px', letterSpacing: '2px', fontWeight: '700',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(148,163,184,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(148,163,184,0.1)'}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS MODAL */}
      {showTermsModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.9)', zIndex: 10001,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px', backdropFilter: 'blur(10px)'
        }} onClick={() => setShowTermsModal(false)}>
          <div style={{
            background: '#0f172a', maxWidth: '800px', width: '100%',
            maxHeight: '80vh', overflow: 'auto',
            padding: '40px', border: '2px solid #cba658'
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{
              ...sansText, fontSize: '20px', letterSpacing: '3px',
              color: '#cba658', marginBottom: '30px'
            }}>
              LUXURY GOODS MARKETPLACE - TERMS & CONDITIONS
            </h2>
            
            <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.8', marginBottom: '20px' }}>
              <h3 style={{ color: '#cba658', marginBottom: '15px', fontSize: '14px', ...sansText, letterSpacing: '2px' }}>
                1. SELLER VERIFICATION & KYC REQUIREMENTS
              </h3>
              <p style={{ marginBottom: '15px' }}>
                All sellers must complete Know Your Customer (KYC) verification including:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                <li>Government-issued photo ID (INE, Passport, or Driver's License)</li>
                <li>Live selfie photograph with phone visible for identity confirmation</li>
                <li>Verification of contact information (email and phone)</li>
                <li>Background check for fraud prevention</li>
              </ul>
              
              <h3 style={{ color: '#cba658', marginBottom: '15px', fontSize: '14px', ...sansText, letterSpacing: '2px' }}>
                2. COMMISSION STRUCTURE
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Commission fees are category-based and calculated on the final sale price:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                {Object.entries(COMMISSION_SCHEDULE).map(([cat, info]) => (
                  <li key={cat}>{cat}: {info.rate}% - {info.description}</li>
                ))}
              </ul>
              
              <h3 style={{ color: '#cba658', marginBottom: '15px', fontSize: '14px', ...sansText, letterSpacing: '2px' }}>
                3. FRAUD PREVENTION & ZERO TOLERANCE POLICY
              </h3>
              <p style={{ marginBottom: '15px' }}>
                We maintain a ZERO TOLERANCE policy for fraudulent transactions. All listings are verified. Sellers found engaging in fraudulent activities will be permanently banned and reported to authorities.
              </p>
              
              <h3 style={{ color: '#cba658', marginBottom: '15px', fontSize: '14px', ...sansText, letterSpacing: '2px' }}>
                4. PAYMENT & ESCROW
              </h3>
              <p style={{ marginBottom: '15px' }}>
                All transactions are processed through secure escrow. Seller receives payment after buyer confirms receipt and satisfactory condition of item.
              </p>
              
              <h3 style={{ color: '#cba658', marginBottom: '15px', fontSize: '14px', ...sansText, letterSpacing: '2px' }}>
                5. LISTING REQUIREMENTS
              </h3>
              <p style={{ marginBottom: '15px' }}>
                All listings must include accurate descriptions, current photos, and complete specifications. Misrepresentation results in immediate listing removal.
              </p>
              
              <h3 style={{ color: '#cba658', marginBottom: '15px', fontSize: '14px', ...sansText, letterSpacing: '2px' }}>
                6. PLATFORM MONITORING & RECORDING
              </h3>
              <p style={{ marginBottom: '20px' }}>
                All platform activities, communications, and transactions are monitored, recorded, and stored in our admin dashboard and brain system for security, compliance, and quality assurance purposes.
              </p>
            </div>
            
            <button
              onClick={() => setShowTermsModal(false)}
              style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg, #cba658, #b8944d)',
                border: 'none', color: '#0a0a0a',
                ...sansText, fontSize: '12px', letterSpacing: '2px', fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* INQUIRY SUCCESS MODAL */}
      {showInquiryModal && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          padding: '30px 50px', zIndex: 10002,
          boxShadow: '0 20px 60px rgba(34,197,94,0.4)',
          textAlign: 'center'
        }}>
          <p style={{
            ...sansText, fontSize: '14px', letterSpacing: '3px',
            color: '#fff', fontWeight: '700'
          }}>
            ✓ INQUIRY SUBMITTED
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', marginTop: '10px' }}>
            We will contact you within 24 hours
          </p>
        </div>
      )}

      {/* ITEM DETAIL MODAL */}
      {selectedItem && !showInquiryModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.95)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px', backdropFilter: 'blur(10px)'
        }} onClick={() => setSelectedItem(null)}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            maxWidth: '900px', width: '100%',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            overflow: 'hidden', border: '2px solid #cba658'
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{ position: 'relative', height: '600px' }}>
              <img src={selectedItem.image} alt={selectedItem.title} style={{
                width: '100%', height: '100%', objectFit: 'cover'
              }} />
            </div>

            <div style={{ padding: '50px' }}>
              <p style={{
                ...sansText, fontSize: '10px', letterSpacing: '3px',
                color: '#b8944d', marginBottom: '15px'
              }}>
                {selectedItem.category.toUpperCase()}
              </p>
              
              <h2 style={{
                ...serifText, fontSize: '32px', color: '#f1f5f9',
                marginBottom: '10px'
              }}>
                {selectedItem.title}
              </h2>
              
              <p style={{
                fontSize: '14px', color: '#94a3b8',
                marginBottom: '30px', lineHeight: '1.6'
              }}>
                {selectedItem.subtitle}
              </p>

              <div style={{
                borderTop: '1px solid rgba(203,166,88,0.2)',
                borderBottom: '1px solid rgba(203,166,88,0.2)',
                padding: '20px 0', marginBottom: '30px'
              }}>
                {selectedItem.specs.map((spec, idx) => (
                  <p key={idx} style={{
                    fontSize: '12px', color: '#cbd5e1',
                    marginBottom: '10px', ...sansText
                  }}>
                    • {spec}
                  </p>
                ))}
              </div>

              <p style={{
                fontSize: '36px', fontWeight: '700',
                color: '#cba658', marginBottom: '10px'
              }}>
                {selectedItem.price}
              </p>

              <p style={{
                fontSize: '11px', color: '#94a3b8',
                marginBottom: '30px', ...sansText
              }}>
                📍 {selectedItem.location}
              </p>

              <button
                onClick={() => handleInquiry(selectedItem)}
                style={{
                  width: '100%', padding: '18px',
                  background: 'linear-gradient(135deg, #cba658, #b8944d)',
                  border: 'none', color: '#0a0a0a',
                  ...sansText, fontSize: '12px', letterSpacing: '2px', fontWeight: '700',
                  cursor: 'pointer', marginBottom: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                REQUEST INFORMATION
              </button>

              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  width: '100%', padding: '14px',
                  background: 'rgba(148,163,184,0.1)',
                  border: '1px solid rgba(148,163,184,0.3)',
                  color: '#cbd5e1',
                  ...sansText, fontSize: '11px', letterSpacing: '2px',
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(148,163,184,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(148,163,184,0.1)'}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
