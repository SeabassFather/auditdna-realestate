import React, { useState, useEffect } from 'react';

const BajaLuxuryGuide = () => {
  const [establishments, setEstablishments] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);
  const [language, setLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('/lifestyle-data/baja-luxury-complete.json')
      .then(res => res.json())
      .then(data => setEstablishments(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const events = [
    {name: 'Vend

imia Valle de Guadalupe', date: 'August 15, 2026', icon: '🍷', location: 'Valle de Guadalupe'},
    {name: 'Baja 1000 Off-Road Race', date: 'November 15, 2026', icon: '🏁', location: 'Ensenada'},
    {name: 'Gray Whale Season', date: 'January 15, 2026', icon: '🐋', location: 'Guerrero Negro'},
    {name: 'Los Cabos Open of Surf', date: 'March 1, 2026', icon: '🏄', location: 'Cabo San Lucas'},
    {name: "Bisbee's Fishing Tournament", date: 'June 15, 2026', icon: '🎣', location: 'Cabo San Lucas'},
    {name: 'Todos Santos Art Festival', date: 'February 1, 2026', icon: '🎨', location: 'Todos Santos'},
    {name: 'Fiestas de la Vendimia', date: 'August 20, 2026', icon: '🍇', location: 'Ensenada'},
    {name: 'Ensenada Wine Harvest', date: 'October 12, 2026', icon: '🍷', location: 'Ensenada'}
  ];

  const filtered = selectedCategory === 'all' ? establishments : establishments.filter(e => e.type === selectedCategory);

  return (
    <div style={{minHeight:'100vh', background:'#f5f1e8', fontFamily:'Playfair Display, serif'}}>
      {/* HERO SECTION - PEBBLE BEACH STYLE */}
      <div style={{
        height:'70vh',
        background:'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1580155456596-cd3caf6d0d0f?w=1920") center/cover',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        position:'relative'
      }}>
        <h1 style={{
          fontSize:'80px',
          fontWeight:'400',
          color:'#f4e4bc',
          letterSpacing:'12px',
          marginBottom:'20px',
          textShadow:'0 4px 20px rgba(0,0,0,0.7)',
          fontFamily:'Cormorant Garamond, serif'
        }}>BAJA CALIFORNIA</h1>
        <p style={{
          fontSize:'20px',
          color:'#e2d5b8',
          letterSpacing:'6px',
          fontWeight:'300',
          fontFamily:'Inter, sans-serif'
        }}>THE ULTIMATE LUXURY GUIDE</p>
        
        {/* ACTION BUTTONS */}
        <div style={{display:'flex', gap:'20px', marginTop:'50px'}}>
          <button onClick={() => setShowMap(true)} style={{
            padding:'18px 40px',
            background:'linear-gradient(135deg, #cba658, #b8944d)',
            border:'none',
            borderRadius:'50px',
            color:'#0a0a0a',
            fontSize:'13px',
            fontWeight:'800',
            letterSpacing:'2px',
            cursor:'pointer',
            boxShadow:'0 8px 24px rgba(203,166,88,0.4)',
            transition:'all 0.3s',
            fontFamily:'Inter, sans-serif'
          }}>🗺️ VIEW MAP</button>
          
          <button onClick={() => setShowEvents(true)} style={{
            padding:'18px 40px',
            background:'rgba(255,255,255,0.95)',
            border:'2px solid #cba658',
            borderRadius:'50px',
            color:'#0a0a0a',
            fontSize:'13px',
            fontWeight:'800',
            letterSpacing:'2px',
            cursor:'pointer',
            boxShadow:'0 8px 24px rgba(0,0,0,0.2)',
            transition:'all 0.3s',
            fontFamily:'Inter, sans-serif'
          }}>📅 2026 EVENTS</button>
          
          <button onClick={() => setShowMarketing(true)} style={{
            padding:'18px 40px',
            background:'rgba(255,255,255,0.95)',
            border:'2px solid #cba658',
            borderRadius:'50px',
            color:'#0a0a0a',
            fontSize:'13px',
            fontWeight:'800',
            letterSpacing:'2px',
            cursor:'pointer',
            boxShadow:'0 8px 24px rgba(0,0,0,0.2)',
            transition:'all 0.3s',
            fontFamily:'Inter, sans-serif'
          }}>💎 LIST YOUR BUSINESS</button>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div style={{maxWidth:'1400px', margin:'-40px auto 0', padding:'0 40px', position:'relative', zIndex:10}}>
        <div style={{
          background:'white',
          border:'2px solid #cba658',
          borderRadius:'16px',
          padding:'30px',
          boxShadow:'0 20px 60px rgba(0,0,0,0.15)'
        }}>
          <div style={{display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center'}}>
            {['all','winery','restaurant','hotel','golf','spa','brewery','yacht','adventure'].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding:'12px 24px',
                  background:selectedCategory === cat ? 'linear-gradient(135deg, #cba658, #b8944d)' : '#f5f1e8',
                  border:selectedCategory === cat ? 'none' : '1px solid #d4c5a0',
                  borderRadius:'30px',
                  color:selectedCategory === cat ? '#0a0a0a' : '#5a5040',
                  fontSize:'11px',
                  fontWeight:'700',
                  letterSpacing:'1.5px',
                  cursor:'pointer',
                  transition:'all 0.3s',
                  fontFamily:'Inter, sans-serif',
                  textTransform:'uppercase'
                }}
              >{cat === 'all' ? 'ALL' : cat.replace('-',' ')}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ESTABLISHMENTS GRID */}
      <div style={{maxWidth:'1400px', margin:'60px auto', padding:'0 40px'}}>
        <p style={{
          textAlign:'center',
          fontSize:'14px',
          color:'#8a7a60',
          letterSpacing:'2px',
          marginBottom:'40px',
          fontFamily:'Inter, sans-serif',
          fontWeight:'300'
        }}>{filtered.length} CURATED ESTABLISHMENTS</p>
        
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(350px, 1fr))', gap:'30px'}}>
          {filtered.slice(0, 50).map(est => (
            <div key={est.id} style={{
              background:'white',
              border:'1px solid #e8dcc8',
              borderRadius:'12px',
              overflow:'hidden',
              boxShadow:'0 4px 20px rgba(0,0,0,0.08)',
              transition:'all 0.3s',
              cursor:'pointer'
            }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(203,166,88,0.3)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}>
              {/* Image Placeholder */}
              <div style={{
                height:'220px',
                background:'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                fontSize:'60px'
              }}>
                {est.type === 'winery' ? '🍷' : 
                 est.type === 'restaurant' ? '🍽️' :
                 est.type === 'hotel' ? '🏨' :
                 est.type === 'golf' ? '⛳' :
                 est.type === 'spa' ? '💆' :
                 est.type === 'brewery' ? '🍺' :
                 est.type === 'yacht' ? '⛵' : '🏔️'}
              </div>
              
              {/* Content */}
              <div style={{padding:'24px'}}>
                <div style={{fontSize:'11px', color:'#cba658', letterSpacing:'2px', marginBottom:'8px', fontWeight:'600', fontFamily:'Inter, sans-serif', textTransform:'uppercase'}}>{est.type.replace('-',' ')}</div>
                <h3 style={{fontSize:'22px', fontWeight:'500', color:'#2a2418', marginBottom:'8px', fontFamily:'Playfair Display, serif'}}>{est.name}</h3>
                <p style={{fontSize:'13px', color:'#8a7a60', marginBottom:'12px', lineHeight:'1.6', fontFamily:'Inter, sans-serif', fontWeight:'300'}}>{est.region}</p>
                {est.fee && <div style={{fontSize:'18px', color:'#cba658', fontWeight:'600', marginBottom:'16px', fontFamily:'Inter, sans-serif'}}>${est.fee}</div>}
                
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                  <button onClick={() => est.website && window.open(est.website, '_blank')} style={{
                    padding:'12px',
                    background:'linear-gradient(135deg, #cba658, #b8944d)',
                    border:'none',
                    borderRadius:'30px',
                    color:'#0a0a0a',
                    fontSize:'10px',
                    fontWeight:'800',
                    letterSpacing:'1.5px',
                    cursor:'pointer',
                    fontFamily:'Inter, sans-serif'
                  }}>VISIT</button>
                  
                  <button onClick={() => window.open(`https://wa.me/526463402686?text=Interested in ${est.name}`, '_blank')} style={{
                    padding:'12px',
                    background:'white',
                    border:'2px solid #cba658',
                    borderRadius:'30px',
                    color:'#cba658',
                    fontSize:'10px',
                    fontWeight:'800',
                    letterSpacing:'1.5px',
                    cursor:'pointer',
                    fontFamily:'Inter, sans-serif'
                  }}>INQUIRE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP MODAL */}
      {showMap && (
        <div onClick={() => setShowMap(false)} style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.95)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px'}}>
          <div onClick={e => e.stopPropagation()} style={{maxWidth:'1200px', width:'100%', height:'80vh', background:'white', borderRadius:'12px', overflow:'hidden', position:'relative'}}>
            <button onClick={() => setShowMap(false)} style={{position:'absolute', top:'20px', right:'20px', zIndex:10, background:'#cba658', border:'none', color:'white', fontSize:'28px', width:'50px', height:'50px', borderRadius:'50%', cursor:'pointer', fontWeight:'700'}}>×</button>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3775615!2d-115.0!3d28.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d934c350ec4e7b%3A0x4a1b8e6a07f4a8a!2sBaja%20California%2C%20Mexico!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}

      {/* EVENTS MODAL */}
      {showEvents && (
        <div onClick={() => setShowEvents(false)} style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.95)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px'}}>
          <div onClick={e => e.stopPropagation()} style={{maxWidth:'900px', width:'100%', maxHeight:'90vh', overflow:'auto', background:'white', borderRadius:'12px', padding:'60px', position:'relative'}}>
            <button onClick={() => setShowEvents(false)} style={{position:'absolute', top:'20px', right:'20px', background:'#cba658', border:'none', color:'white', fontSize:'28px', width:'50px', height:'50px', borderRadius:'50%', cursor:'pointer', fontWeight:'700'}}>×</button>
            <h2 style={{fontSize:'48px', fontWeight:'400', color:'#2a2418', marginBottom:'40px', fontFamily:'Cormorant Garamond, serif'}}>2026 EVENTS</h2>
            <div style={{display:'grid', gap:'24px'}}>
              {events.map((evt, i) => (
                <div key={i} style={{background:'#f5f1e8', border:'2px solid #e8dcc8', borderRadius:'12px', padding:'24px', display:'flex', gap:'20px', alignItems:'center'}}>
                  <div style={{fontSize:'40px'}}>{evt.icon}</div>
                  <div style={{flex:1}}>
                    <h3 style={{fontSize:'20px', fontWeight:'500', color:'#2a2418', marginBottom:'6px', fontFamily:'Playfair Display, serif'}}>{evt.name}</h3>
                    <p style={{fontSize:'13px', color:'#8a7a60', fontFamily:'Inter, sans-serif'}}>{evt.date} • {evt.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MARKETING MODAL */}
      {showMarketing && (
        <div onClick={() => setShowMarketing(false)} style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.95)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px'}}>
          <div onClick={e => e.stopPropagation()} style={{maxWidth:'700px', width:'100%', background:'white', borderRadius:'12px', padding:'60px', position:'relative'}}>
            <button onClick={() => setShowMarketing(false)} style={{position:'absolute', top:'20px', right:'20px', background:'#cba658', border:'none', color:'white', fontSize:'28px', width:'50px', height:'50px', borderRadius:'50%', cursor:'pointer', fontWeight:'700'}}>×</button>
            <h2 style={{fontSize:'48px', fontWeight:'400', color:'#2a2418', marginBottom:'20px', fontFamily:'Cormorant Garamond, serif'}}>LIST YOUR BUSINESS</h2>
            <p style={{fontSize:'16px', color:'#8a7a60', marginBottom:'40px', lineHeight:'1.6', fontFamily:'Inter, sans-serif'}}>Join Baja California's premier luxury guide and reach discerning travelers worldwide.</p>
            
            <div style={{display:'grid', gap:'20px', marginBottom:'40px'}}>
              {[
                {name:'Standard', price:'FREE', features:['Basic listing','Business hours','Contact info']},
                {name:'Premium', price:'$149/mo', features:['Featured placement','Photo gallery','Priority support']},
                {name:'Elite', price:'$299/mo', features:['Top placement','Video content','Analytics dashboard']},
                {name:'Platinum', price:'$599/mo', features:['Homepage feature','Custom branding','Dedicated account manager']}
              ].map(tier => (
                <div key={tier.name} style={{background:'#f5f1e8', border:'2px solid #e8dcc8', borderRadius:'12px', padding:'24px'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
                    <h3 style={{fontSize:'20px', fontWeight:'500', color:'#2a2418', fontFamily:'Playfair Display, serif'}}>{tier.name}</h3>
                    <div style={{fontSize:'24px', fontWeight:'700', color:'#cba658', fontFamily:'Inter, sans-serif'}}>{tier.price}</div>
                  </div>
                  <ul style={{listStyle:'none', padding:0, margin:0}}>
                    {tier.features.map(f => (
                      <li key={f} style={{fontSize:'13px', color:'#8a7a60', marginBottom:'8px', fontFamily:'Inter, sans-serif'}}>✓ {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <button onClick={() => window.open('https://wa.me/526463402686?text=I want to list my business', '_blank')} style={{
              width:'100%',
              padding:'18px',
              background:'linear-gradient(135deg, #cba658, #b8944d)',
              border:'none',
              borderRadius:'50px',
              color:'#0a0a0a',
              fontSize:'14px',
              fontWeight:'800',
              letterSpacing:'2px',
              cursor:'pointer',
              fontFamily:'Inter, sans-serif'
            }}>CONTACT US ON WHATSAPP</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BajaLuxuryGuide;