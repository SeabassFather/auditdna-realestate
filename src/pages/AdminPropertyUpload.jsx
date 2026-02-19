import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropertyPhotoUploader from '../components/upload/PropertyPhotoUploader';
import CitySearchEngine from '../components/properties/CitySearchEngine';

export default function AdminPropertyUpload() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [lang, setLang] = useState('es');
  const [photos, setPhotos] = useState([]);
  const [propertyType, setPropertyType] = useState('mexico');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    caracteristicas: '',
    price: '',
    currency: 'MXN',
    location: '',
    // Mexico address fields
    domicilio: '',
    colonia: '',
    municipio: '',
    estado: '',
    cp: '',
    carretera: '',
    referencia: '',
    beds: '',
    baths: '',
    metrosCuadrados: '',
    metrosTerreno: '',
    sqft: '',
    type: 'house'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', color: '#ef4444', marginBottom: '16px' }}>Access Denied</h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '24px' }}>Admin access required</p>
          <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: '#cba658', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (photos.length < 8) {
      alert('Please upload at least 8 photos');
      return;
    }

    setLoading(true);

    const storageKey = propertyType === 'mexico' ? 'mexico_properties' : propertyType === 'development' ? 'development_properties' : 'fsbo_properties';
    const properties = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    properties.push({
      ...formData,
      photos: photos.map(p => p.url),
      id: Date.now(),
      createdAt: new Date().toISOString(),
      uploadedBy: user.email,
      status: 'active'
    });
    
    localStorage.setItem(storageKey, JSON.stringify(properties));

    setSuccess(true);
    setLoading(false);
    
    setTimeout(() => {
      setSuccess(false);
      setFormData({ title: '', description: '', price: '', location: '', beds: '', baths: '', sqft: '', type: 'house' });
      setPhotos([]);
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#cba658', marginBottom: '8px' }}>Admin Property Upload</h1>
            <p style={{ fontSize: '16px', color: '#94a3b8' }}>Upload properties to any section</p>
          </div>
          <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: 'rgba(203, 166, 88, 0.1)', color: '#cba658', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>

        {success && (
          <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', borderRadius: '12px', color: '#10b981', marginBottom: '32px', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>
            Property uploaded successfully!
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
            Select Property Section
          </label>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { id: 'mexico', label: 'Mexico Real Estate' },
              { id: 'development', label: 'Developments' },
              { id: 'fsbo', label: 'FSBO USA' }
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setPropertyType(section.id)}
                style={{
                  padding: '16px 32px',
                  background: propertyType === section.id ? 'linear-gradient(135deg, #cba658, #b8944d)' : 'rgba(203, 166, 88, 0.1)',
                  color: propertyType === section.id ? '#0f172a' : '#cba658',
                  border: '2px solid rgba(203, 166, 88, 0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '40px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cba658', marginBottom: '24px' }}>
              {lang === 'es' ? 'Detalles de la Propiedad' : 'Property Details'}
            </h3>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                {lang === 'es' ? 'Título de la Propiedad *' : 'Property Title *'}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                placeholder="e.g., Luxury Oceanfront Villa - Cabo San Lucas"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                {lang === 'es' ? 'Descripción General *' : 'General Description *'}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows="4"
                style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                placeholder={lang === 'es' ? 'Descripción general de la propiedad...' : 'General property description...'}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                {lang === 'es' ? 'Características y Ubicación *' : 'Property Characteristics & Location Details *'}
              </label>
              <p style={{fontSize:'12px', color:'#64748b', marginBottom:'8px'}}>{lang === 'es' ? 'Detalla: acceso, servicios, vista, estilo de construcción, ubicación exacta de propiedades remotas...' : 'Detail: access, utilities, view, construction style, exact location for remote properties...'}</p>
              <textarea
                value={formData.caracteristicas}
                onChange={(e) => setFormData({ ...formData, caracteristicas: e.target.value })}
                rows="5"
                style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                placeholder={lang === 'es' ? 'Ej: Ubicada sobre Carretera Transpeninsular Km 103, a 5 min de playa. Cisterna 10,000 lts, fosa séptica, paneles solares. Vista panorámica al Pacífico...' : 'e.g. Located on Transpeninsular Hwy Km 103, 5min from beach. 10,000L cistern, septic, solar panels. Panoramic Pacific views...'}
              />
            </div>

            {propertyType === 'mexico' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
                  {lang === 'es' ? 'DOMICILIO — Formato México' : 'ADDRESS — Mexico Format'}
                </label>
                <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'16px', marginBottom:'16px'}}>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'Domicilio / Calle *' : 'Street / Domicilio *'}</label><input value={formData.domicilio} onChange={(e) => setFormData({...formData, domicilio: e.target.value})} placeholder={lang === 'es' ? 'Ej: Blvd. Costero' : 'e.g. Blvd. Costero'} style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }} /></div>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'No. Exterior' : 'Ext. No.'}</label><input value={formData.noExterior} onChange={(e) => setFormData({...formData, noExterior: e.target.value})} placeholder="123" style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }} /></div>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'No. Interior' : 'Int. No.'}</label><input value={formData.noInterior} onChange={(e) => setFormData({...formData, noInterior: e.target.value})} placeholder="A" style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }} /></div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'16px', marginBottom:'16px'}}>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'Colonia / Fracc.' : 'Colonia / Subdivision'}</label><input value={formData.colonia} onChange={(e) => setFormData({...formData, colonia: e.target.value})} placeholder={lang === 'es' ? 'Ej: Fracc. Marina' : 'e.g. Fracc. Marina'} style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }} /></div>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'Municipio *' : 'Municipality *'}</label><input value={formData.municipio} onChange={(e) => setFormData({...formData, municipio: e.target.value})} placeholder={lang === 'es' ? 'Ej: Ensenada' : 'e.g. Ensenada'} style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }} /></div>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'Estado *' : 'State *'}</label><select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})} style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }}><option value="">—</option>{['Baja California','Baja California Sur','Jalisco','Nayarit','Quintana Roo','Guanajuato','Yucatán','Sinaloa','Oaxaca','CDMX','Querétaro'].map(st => <option key={st}>{st}</option>)}</select></div>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'Código Postal' : 'Postal Code'}</label><input maxLength={5} value={formData.cp} onChange={(e) => setFormData({...formData, cp: e.target.value})} placeholder="22800" style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }} /></div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'Carretera / Km' : 'Highway / Km'}</label><input value={formData.carretera} onChange={(e) => setFormData({...formData, carretera: e.target.value})} placeholder={lang === 'es' ? 'Ej: Carretera Tijuana-Ensenada Km 103' : 'e.g. Hwy Tijuana-Ensenada Km 103'} style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }} /></div>
                  <div><label style={{display:'block',fontSize:'12px',color:'#94a3b8',marginBottom:'6px'}}>{lang === 'es' ? 'Referencias / Cómo llegar' : 'Location Reference / Directions'}</label><input value={formData.referencia} onChange={(e) => setFormData({...formData, referencia: e.target.value})} placeholder={lang === 'es' ? 'Ej: A 2km del mar, camino de terracería' : 'e.g. 2km from beach, dirt road access'} style={{ width:'100%',padding:'12px',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(203,166,88,0.3)',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px' }} /></div>
                </div>
                <CitySearchEngine onSearchResult={(location) => setFormData({ ...formData, location })} />
              </div>
            )}

            {propertyType !== 'mexico' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Location (City, State) *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="e.g., San Diego, CA"
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  {lang === 'es' ? 'Precio *' : 'Price *'} <span style={{color:'#94a3b8', fontWeight:'400', marginLeft:'8px'}}>{formData.currency}</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                  placeholder="450000"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  Property Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                >
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  {lang === 'es' ? 'Recámaras' : 'Bedrooms'}
                </label>
                <input
                  type="number"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  {lang === 'es' ? 'Baños' : 'Bathrooms'}
                </label>
                <input
                  type="number"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                  {lang === 'es' ? 'Metros Cuadrados (Construcción)' : 'Sq. Meters (Built)'}
                </label>
                <input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                  style={{ width: '100%', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px', color: '#f1f5f9', fontSize: '16px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '16px', padding: '40px', marginBottom: '32px' }}>
            <PropertyPhotoUploader photos={photos} setPhotos={setPhotos} />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '24px',
              background: loading ? '#64748b' : 'linear-gradient(135deg, #cba658, #b8944d)',
              color: '#0f172a',
              border: 'none',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 20px rgba(203, 166, 88, 0.4)'
            }}
          >
            {loading ? (lang === 'es' ? 'Subiendo Propiedad...' : 'Uploading Property...') : (lang === 'es' ? 'Subir Propiedad' : 'Upload Property')}
          </button>
        </form>
      </div>
    </div>
  );
}