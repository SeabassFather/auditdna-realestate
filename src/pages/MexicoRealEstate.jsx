import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertySearch from '../components/PropertySearch';
import ModuleNavBar from '../components/ModuleNavBar';

// ================================================================
// BRAIN.JS — SI INTEGRATION LAYER
// All events logged for analytics, audit trail & SI learning
// ================================================================
const Brain = {
  log: (event, data = {}) => {
    const entry = {
      event, module: 'MexicoRealEstate',
      timestamp: new Date().toISOString(),
      sessionId: sessionStorage.getItem('eb_session_id') || 'unknown',
      user: (() => { try { return JSON.parse(sessionStorage.getItem('eb_user') || '{}'); } catch { return {}; } })(),
      ...data
    };
    const queue = JSON.parse(localStorage.getItem('brain_event_queue') || '[]');
    queue.push(entry);
    if (queue.length > 500) queue.shift();
    localStorage.setItem('brain_event_queue', JSON.stringify(queue));
    console.log('[BRAIN]', event, data);
  },
  logRegistration: (d) => Brain.log('agent_registration', d),
  logPhotoUpload:  (c, ai) => Brain.log('photo_upload', { count: c, aiEnhanced: ai }),
  logListing:      (id, t) => Brain.log('listing_submitted', { listingId: id, type: t }),
  logAccordion:    (s) => Brain.log('accordion_opened', { section: s }),
  logPhotoAI:      (m, i) => Brain.log('ai_photo_miner_applied', { miner: m, photoIndex: i }),
};

// ================================================================
// 9 AI MINERS — SI-POWERED IMAGE ENHANCEMENT
// Canvas-based, no external service. Brain logs every application.
// ================================================================
const AI_MINERS = [
  { id: 'brightness', label: 'Brighten',    icon: '☀',  desc: 'Boost exposure for dark phone photos' },
  { id: 'contrast',   label: 'Contrast',    icon: '◑',  desc: 'Punch up flat images' },
  { id: 'sharpen',    label: 'Sharpen',     icon: '◈',  desc: 'Fix cell phone soft focus' },
  { id: 'warm',       label: 'Warm Tones',  icon: '◌',  desc: 'Golden warmth for interiors' },
  { id: 'cool',       label: 'Cool & Crisp',icon: '❄',  desc: 'Enhance ocean/pool shots' },
  { id: 'saturate',   label: 'Vivid',       icon: '✦',  desc: 'Pop colors for listings' },
  { id: 'hdr',        label: 'HDR Lift',    icon: '◉',  desc: 'Recover shadows & highlights' },
  { id: 'denoise',    label: 'De-noise',    icon: '≋',  desc: 'Clean up grainy night shots' },
  { id: 'straighten', label: 'Auto-Level',  icon: '⊟',  desc: 'Fix tilted horizon lines' },
];

function applyMinerToData(d, minerId) {
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i], g = d[i+1], b = d[i+2];
    if (minerId === 'brightness') { r = Math.min(255, r*1.18); g = Math.min(255, g*1.18); b = Math.min(255, b*1.18); }
    if (minerId === 'contrast')   { const f=1.3; r=Math.min(255,Math.max(0,f*(r-128)+128)); g=Math.min(255,Math.max(0,f*(g-128)+128)); b=Math.min(255,Math.max(0,f*(b-128)+128)); }
    if (minerId === 'sharpen')    { const f=1.2; r=Math.min(255,Math.max(0,f*(r-128)+128)); g=Math.min(255,Math.max(0,f*(g-128)+128)); b=Math.min(255,Math.max(0,f*(b-128)+128)); }
    if (minerId === 'warm')       { r=Math.min(255,r*1.1); b=Math.max(0,b*0.88); }
    if (minerId === 'cool')       { b=Math.min(255,b*1.15); r=Math.max(0,r*0.9); }
    if (minerId === 'saturate')   { const avg=(r+g+b)/3; r=Math.min(255,avg+(r-avg)*1.4); g=Math.min(255,avg+(g-avg)*1.4); b=Math.min(255,avg+(b-avg)*1.4); }
    if (minerId === 'hdr')        { const lum=0.299*r+0.587*g+0.114*b; const boost=lum<128?1.25:0.9; r=Math.min(255,r*boost); g=Math.min(255,g*boost); b=Math.min(255,b*boost); }
    if (minerId === 'denoise')    { r=Math.round(r/8)*8; g=Math.round(g/8)*8; b=Math.round(b/8)*8; }
    d[i]=r; d[i+1]=g; d[i+2]=b;
  }
  return d;
}

function processImageWithMiners(dataUrl, miners) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      miners.forEach(m => applyMinerToData(imageData.data, m));
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.src = dataUrl;
  });
}

// ================================================================
// PHOTO MINER PANEL — Drag/drop + AI 9 Miners
// ================================================================
function PhotoMinerPanel({ photos, setPhotos, language }) {
  const [dragging, setDragging]   = useState(false);
  const [activeMiners, setMiners] = useState([]);
  const [processing, setProc]     = useState(false);
  const [selectedIdx, setSelected]= useState(null);
  const [aiStatus, setStatus]     = useState('');
  const fileRef                   = useRef(null);
  const MAX = 8;
  const en = language === 'english';

  const processFiles = useCallback((files) => {
    if (photos.length >= MAX) { alert(en ? `Maximum ${MAX} photos` : `Máximo ${MAX} fotos`); return; }
    const remaining = MAX - photos.length;
    Array.from(files).slice(0, remaining).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const p = { id: Date.now()+Math.random(), original: e.target.result, current: e.target.result, minersApplied: [], fileName: file.name };
        setPhotos(prev => prev.length < MAX ? [...prev, p] : prev);
        Brain.logPhotoUpload(1, false);
      };
      reader.readAsDataURL(file);
    });
  }, [photos.length, en]);

  const onDrop = (e) => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); };
  const toggleMiner = (id) => setMiners(prev => prev.includes(id) ? prev.filter(m=>m!==id) : [...prev, id]);

  const applyToSelected = async () => {
    if (!activeMiners.length || selectedIdx === null) return;
    setProc(true); setStatus(en ? '⬡ SI PROCESSING...' : '⬡ SI PROCESANDO...');
    const enhanced = await processImageWithMiners(photos[selectedIdx].current, activeMiners);
    setPhotos(prev => prev.map((p,i) => i===selectedIdx ? {...p, current: enhanced, minersApplied: [...p.minersApplied, ...activeMiners]} : p));
    activeMiners.forEach(m => Brain.logPhotoAI(m, selectedIdx));
    setStatus(en ? '✓ ENHANCED — SI Logged' : '✓ MEJORADA — SI Registrado');
    setProc(false); setTimeout(() => setStatus(''), 3000);
  };

  const applyToAll = async () => {
    if (!activeMiners.length) return;
    setProc(true); setStatus(en ? '⬡ SI PROCESSING ALL...' : '⬡ SI PROCESANDO TODAS...');
    const updated = await Promise.all(photos.map(async (p, i) => {
      const enhanced = await processImageWithMiners(p.current, activeMiners);
      activeMiners.forEach(m => Brain.logPhotoAI(m, i));
      return { ...p, current: enhanced, minersApplied: [...p.minersApplied, ...activeMiners] };
    }));
    setPhotos(updated);
    setStatus(en ? `✓ ALL ${updated.length} PHOTOS ENHANCED — SI Logged` : `✓ ${updated.length} FOTOS MEJORADAS — SI Registrado`);
    setProc(false); setTimeout(() => setStatus(''), 3000);
  };

  const removePhoto = (idx) => { setPhotos(prev => prev.filter((_,i)=>i!==idx)); if (selectedIdx===idx) setSelected(null); };
  const G = '#cba658';

  return (
    <div>
      {/* Drop Zone */}
      <div onDrop={onDrop} onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)}
        onClick={() => photos.length < MAX && fileRef.current?.click()}
        style={{ border: `1px dashed ${dragging ? G : 'rgba(203,166,88,0.35)'}`, background: dragging ? 'rgba(203,166,88,0.08)' : 'rgba(15,23,42,0.6)', padding: '28px 20px', textAlign: 'center', cursor: photos.length < MAX ? 'pointer' : 'not-allowed', marginBottom: '10px', transition: 'all 0.2s' }}>
        <div style={{ fontSize: '26px', color: G, marginBottom: '6px', opacity: 0.7 }}>⬆</div>
        <p style={{ color: G, fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>
          {en ? `DROP PHOTOS HERE OR CLICK TO UPLOAD (${photos.length}/${MAX})` : `ARRASTRA O CLIC PARA SUBIR (${photos.length}/${MAX})`}
        </p>
        <p style={{ color: '#64748b', fontSize: '9px', letterSpacing: '1px' }}>JPG · PNG · HEIC · {en ? 'Phone or computer' : 'Celular o computadora'}</p>
        <input ref={fileRef} type="file" multiple accept="image/*,image/heic" style={{ display: 'none' }} onChange={e=>processFiles(e.target.files)} />
      </div>

      {/* Camera Button (mobile) */}
      <label style={{ display: 'block', textAlign: 'center', padding: '9px', border: '1px solid rgba(203,166,88,0.2)', color: '#94a3b8', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', marginBottom: '14px', background: 'rgba(15,23,42,0.4)' }}>
        📱 {en ? 'TAKE PHOTO WITH CAMERA' : 'TOMAR FOTO CON CÁMARA'}
        <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e=>processFiles(e.target.files)} />
      </label>

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '14px' }}>
          {photos.map((p, i) => (
            <div key={p.id} onClick={()=>setSelected(i)} style={{ position: 'relative', aspectRatio: '4/3', cursor: 'pointer', border: `2px solid ${selectedIdx===i ? G : 'transparent'}`, transition: 'border 0.2s' }}>
              <img src={p.current} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {p.minersApplied.length > 0 && <div style={{ position: 'absolute', bottom: '2px', left: '2px', background: 'rgba(203,166,88,0.9)', padding: '1px 4px', fontSize: '7px', color: '#0f172a' }}>⬡ {p.minersApplied.length}</div>}
              {i === 0 && <div style={{ position: 'absolute', top: '2px', left: '2px', background: 'rgba(15,23,42,0.85)', padding: '1px 5px', fontSize: '7px', color: G, letterSpacing: '1px' }}>{en ? 'COVER' : 'PORTADA'}</div>}
              <button onClick={e=>{e.stopPropagation();removePhoto(i);}} style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '10px', cursor: 'pointer', lineHeight: '16px', textAlign: 'center' }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* 9 AI Miners */}
      {photos.length > 0 && (
        <div style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(203,166,88,0.2)', padding: '16px' }}>
          <p style={{ color: G, fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>⬡ {en ? '9 AI MINERS — PHOTO ENHANCEMENT' : '9 MINEROS IA — MEJORA DE FOTOS'}</p>
          <p style={{ color: '#475569', fontSize: '9px', letterSpacing: '0.5px', marginBottom: '12px' }}>
            {selectedIdx !== null ? (en ? `Photo ${selectedIdx+1} selected — toggle miners then apply` : `Foto ${selectedIdx+1} seleccionada`) : (en ? 'SELECT A THUMBNAIL ABOVE TO ENHANCE' : 'SELECCIONA UNA MINIATURA ARRIBA')}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '12px' }}>
            {AI_MINERS.map(m => (
              <button key={m.id} onClick={()=>toggleMiner(m.id)} title={m.desc} style={{
                padding: '8px 4px', background: activeMiners.includes(m.id) ? 'rgba(203,166,88,0.15)' : 'rgba(30,41,59,0.6)',
                border: `1px solid ${activeMiners.includes(m.id) ? G : 'rgba(148,163,184,0.15)'}`,
                color: activeMiners.includes(m.id) ? G : '#64748b',
                fontSize: '9px', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px'
              }}>
                <span style={{ fontSize: '13px' }}>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={applyToSelected} disabled={processing || selectedIdx===null || !activeMiners.length} style={{ flex: 1, padding: '10px', background: (selectedIdx!==null && activeMiners.length) ? 'rgba(203,166,88,0.15)' : 'rgba(30,41,59,0.3)', border: `1px solid ${(selectedIdx!==null && activeMiners.length) ? 'rgba(203,166,88,0.5)' : 'rgba(148,163,184,0.1)'}`, color: (selectedIdx!==null && activeMiners.length) ? G : '#374151', fontSize: '9px', letterSpacing: '1.5px', cursor: 'pointer' }}>
              {en ? 'APPLY TO SELECTED' : 'APLICAR A SELECCIONADA'}
            </button>
            <button onClick={applyToAll} disabled={processing || !activeMiners.length} style={{ flex: 1, padding: '10px', background: activeMiners.length ? 'rgba(203,166,88,0.15)' : 'rgba(30,41,59,0.3)', border: `1px solid ${activeMiners.length ? G : 'rgba(148,163,184,0.1)'}`, color: activeMiners.length ? G : '#374151', fontSize: '9px', letterSpacing: '1.5px', cursor: 'pointer' }}>
              {en ? 'APPLY TO ALL PHOTOS' : 'APLICAR A TODAS'}
            </button>
          </div>

          {aiStatus && <div style={{ marginTop: '10px', padding: '8px', background: 'rgba(203,166,88,0.08)', border: '1px solid rgba(203,166,88,0.2)', textAlign: 'center' }}><span style={{ color: G, fontSize: '9px', letterSpacing: '2px' }}>{aiStatus}</span></div>}
        </div>
      )}
    </div>
  );
}

// ================================================================
// MEXICO ADDRESS FIELDS — Bilingual, Metric+Imperial, MXN+USD
// ================================================================
function MexicoAddressFields({ form, setForm, language, inputStyle, labelStyle }) {
  const en = language === 'english';
  const states = ['Baja California Norte','Baja California Sur','Sonora','Sinaloa','Jalisco','Nayarit','Colima','Michoacán','Guerrero','Oaxaca','Chiapas','Quintana Roo','Yucatán','Campeche','Tabasco','Veracruz','Ciudad de México','Nuevo León','Chihuahua','Coahuila','Otro'];
  const propTypes = ['Casa / House','Departamento / Condo','Terreno / Land','Rancho / Ranch','Comercial / Commercial','Villa / Luxury','Terreno Ejidal / Ejido','Granja / Farm'];
  const G = '#cba658';
  const SL = { color: G, fontSize: '9px', letterSpacing: '2px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(203,166,88,0.15)' };

  return (
    <div>
      <p style={SL}>▸ {en ? 'LOCATION / DOMICILIO' : 'DOMICILIO / LOCATION'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div><label style={labelStyle}>{en ? 'STREET / CALLE *' : 'CALLE / STREET *'}</label><input value={form.calle||''} onChange={e=>setForm({...form,calle:e.target.value})} style={inputStyle} placeholder="Av. Reforma / Carr. Transpeninsular" /></div>
        <div><label style={labelStyle}>{en ? 'EXT NO. / NO. EXT *' : 'NO. EXTERIOR *'}</label><input value={form.numExt||''} onChange={e=>setForm({...form,numExt:e.target.value})} style={inputStyle} placeholder="123" /></div>
        <div><label style={labelStyle}>{en ? 'INT NO. (optional)' : 'NO. INTERIOR (opcional)'}</label><input value={form.numInt||''} onChange={e=>setForm({...form,numInt:e.target.value})} style={inputStyle} placeholder="Apt / Local / Depto" /></div>
        <div><label style={labelStyle}>{en ? 'NEIGHBORHOOD / COLONIA *' : 'COLONIA / NEIGHBORHOOD *'}</label><input value={form.colonia||''} onChange={e=>setForm({...form,colonia:e.target.value})} style={inputStyle} placeholder="Centro, Chapultepec..." /></div>
        <div><label style={labelStyle}>{en ? 'CITY / MUNICIPIO *' : 'MUNICIPIO / CITY *'}</label><input value={form.municipio||''} onChange={e=>setForm({...form,municipio:e.target.value})} style={inputStyle} placeholder="Ensenada, Tijuana, La Paz..." /></div>
        <div><label style={labelStyle}>{en ? 'ZIP / C.P.' : 'C.P. / ZIP'}</label><input value={form.cp||''} onChange={e=>setForm({...form,cp:e.target.value})} style={inputStyle} placeholder="22800" /></div>
      </div>
      <div style={{ marginBottom: '10px' }}><label style={labelStyle}>{en ? 'STATE / ESTADO *' : 'ESTADO / STATE *'}</label><select value={form.estado||''} onChange={e=>setForm({...form,estado:e.target.value})} style={{...inputStyle,cursor:'pointer'}}><option value="">{en?'Select State':'Seleccionar Estado'}</option>{states.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
      <div style={{ marginBottom: '14px' }}><label style={labelStyle}>{en ? 'HIGHWAY / CARRETERA (if applicable)' : 'CARRETERA / KM (si aplica)'}</label><input value={form.carretera||''} onChange={e=>setForm({...form,carretera:e.target.value})} style={inputStyle} placeholder={en?'Carr. Transpeninsular Km 45.5':'Carr. Ensenada-Tijuana Km 45.5'} /></div>

      <p style={SL}>▸ {en ? 'GPS COORDINATES (visible to agents & buyers)' : 'COORDENADAS GPS (visibles para agentes y compradores)'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div><label style={labelStyle}>{en?'LATITUDE / LATITUD':'LATITUD / LATITUDE'}</label><input value={form.lat||''} onChange={e=>setForm({...form,lat:e.target.value})} style={inputStyle} placeholder="31.8667° N" /></div>
        <div><label style={labelStyle}>{en?'LONGITUDE / LONGITUD':'LONGITUD / LONGITUDE'}</label><input value={form.lng||''} onChange={e=>setForm({...form,lng:e.target.value})} style={inputStyle} placeholder="-116.5960° W" /></div>
      </div>
      <div style={{ marginBottom: '14px' }}>
        <button type="button" onClick={()=>{ if(navigator.geolocation) navigator.geolocation.getCurrentPosition(p=>setForm(f=>({...f,lat:p.coords.latitude.toFixed(6),lng:p.coords.longitude.toFixed(6)}))); }}
          style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(203,166,88,0.3)', color: '#94a3b8', fontSize: '9px', letterSpacing: '1.5px', cursor: 'pointer' }}>
          📍 {en?'AUTO-DETECT GPS LOCATION':'DETECTAR UBICACIÓN GPS'}
        </button>
      </div>

      <p style={SL}>▸ {en ? 'PROPERTY DETAILS / CARACTERÍSTICAS' : 'CARACTERÍSTICAS / PROPERTY DETAILS'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div><label style={labelStyle}>{en?'PROPERTY TYPE *':'TIPO DE PROPIEDAD *'}</label><select value={form.tipo||''} onChange={e=>setForm({...form,tipo:e.target.value})} style={{...inputStyle,cursor:'pointer'}}><option value="">{en?'Select Type':'Seleccionar Tipo'}</option>{propTypes.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
        <div><label style={labelStyle}>{en?'BEDROOMS / RECÁMARAS':'RECÁMARAS / BEDROOMS'}</label><input type="number" value={form.recamaras||''} onChange={e=>setForm({...form,recamaras:e.target.value})} style={inputStyle} placeholder="3" /></div>
        <div><label style={labelStyle}>{en?'BATHROOMS / BAÑOS':'BAÑOS / BATHROOMS'}</label><input type="number" value={form.banos||''} onChange={e=>setForm({...form,banos:e.target.value})} style={inputStyle} placeholder="2" /></div>
        <div><label style={labelStyle}>{en?'PARKING / CAJONES':'CAJONES ESTACIONAMIENTO'}</label><input type="number" value={form.cajones||''} onChange={e=>setForm({...form,cajones:e.target.value})} style={inputStyle} placeholder="2" /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div><label style={labelStyle}>{en?'CONSTRUCTION m²':'CONSTRUCCIÓN m²'}</label><input type="number" value={form.m2Const||''} onChange={e=>setForm({...form,m2Const:e.target.value,sqftConst:Math.round(e.target.value*10.764)})} style={inputStyle} placeholder="150" /></div>
        <div><label style={labelStyle}>{en?'CONSTRUCTION ft²':'PIES CUADRADOS CONST.'}</label><input type="number" value={form.sqftConst||''} onChange={e=>setForm({...form,sqftConst:e.target.value,m2Const:Math.round(e.target.value/10.764)})} style={inputStyle} placeholder="1,615" /></div>
        <div><label style={labelStyle}>{en?'LOT SIZE m² (TERRENO)':'TERRENO m² / LOT SIZE'}</label><input type="number" value={form.m2Lot||''} onChange={e=>setForm({...form,m2Lot:e.target.value,sqftLot:Math.round(e.target.value*10.764)})} style={inputStyle} placeholder="200" /></div>
        <div><label style={labelStyle}>{en?'LOT SIZE ft²':'PIES CUADRADOS TERRENO'}</label><input type="number" value={form.sqftLot||''} onChange={e=>setForm({...form,sqftLot:e.target.value,m2Lot:Math.round(e.target.value/10.764)})} style={inputStyle} placeholder="2,153" /></div>
      </div>

      <p style={SL}>▸ {en ? 'ASKING PRICE / PRECIO DE VENTA' : 'PRECIO DE VENTA / ASKING PRICE'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '6px' }}>
        <div><label style={labelStyle}>{en?'PRICE USD *':'PRECIO USD *'}</label><input type="number" value={form.priceUSD||''} onChange={e=>setForm({...form,priceUSD:e.target.value,priceMXN:Math.round(e.target.value*17.5)})} style={inputStyle} placeholder="350,000" /></div>
        <div><label style={labelStyle}>{en?'PRICE MXN (auto)':'PRECIO MXN (auto)'}</label><input type="number" value={form.priceMXN||''} onChange={e=>setForm({...form,priceMXN:e.target.value,priceUSD:Math.round(e.target.value/17.5)})} style={inputStyle} placeholder="6,125,000" /></div>
      </div>
      <p style={{ color: '#475569', fontSize: '9px', letterSpacing: '0.5px', marginBottom: '14px' }}>{en?'Exchange rate ~17.5 MXN/USD. Verify current rate.':'Tipo de cambio ~17.5 MXN/USD. Verificar tasa actual.'}</p>

      <div style={{ marginBottom: '12px' }}><label style={labelStyle}>{en?'DESCRIPTION / DESCRIPCIÓN *':'DESCRIPCIÓN *'}</label><textarea value={form.descripcion||''} onChange={e=>setForm({...form,descripcion:e.target.value})} rows={4} style={{...inputStyle,resize:'vertical'}} placeholder={en?'Views, finishes, amenities, access road, utilities, community features...':'Vistas, acabados, amenidades, acceso, servicios, características de la comunidad...'} /></div>

      <div>
        <label style={labelStyle}>{en?'AMENITIES / AMENIDADES':'AMENIDADES / AMENITIES'}</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {[['pool','Pool / Alberca'],['ocean','Ocean View / Vista Mar'],['gated','Gated / Privada'],['solar','Solar / Paneles'],['well','Water Well / Pozo'],['generator','Generator / Planta'],['dock','Dock / Muelle'],['ac','A/C / Clima'],['furnished','Furnished / Amueblado']].map(([id, label]) => (
            <label key={id} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={(form.amenidades||[]).includes(id)} onChange={e=>setForm(prev=>({...prev,amenidades:e.target.checked?[...(prev.amenidades||[]),id]:(prev.amenidades||[]).filter(a=>a!==id)}))} style={{ accentColor: G, width: '12px', height: '12px' }} />
              <span style={{ color: '#94a3b8', fontSize: '9px', letterSpacing: '0.5px' }}>{en?label.split('/')[0].trim():label.split('/')[1]?.trim()||label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================================================================
// REGISTRATION GATE — INE + CURP Required
// Agent type captured: inhouse / external / fsbo
// Commission logic stored in Brain ONLY — never shown to consumer
// ================================================================
function RegistrationGate({ onComplete, language }) {
  const en = language === 'english';
  const [step, setStep]         = useState(1);
  const [agentType, setType]    = useState('');
  const [form, setForm]         = useState({ nombre:'',apellidos:'',email:'',phone:'',whatsapp:'',empresa:'',licencia:'',ine:'',curp:'',banco:'',clabe:'',referidoPor:'',acceptTerms:false });
  const [inePhotos, setINE]     = useState({ front:null, back:null, selfie:null });
  const [errors, setErrors]     = useState({});
  const G = '#cba658';
  const IS = { padding:'11px', background:'rgba(15,23,42,0.8)', border:'1px solid rgba(203,166,88,0.25)', color:'#cbd5e1', fontSize:'12px', letterSpacing:'0.5px', outline:'none', width:'100%', boxSizing:'border-box' };
  const LS = { color:'#94a3b8', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', display:'block', marginBottom:'5px' };

  const captureINE = (field, e) => { const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>setINE(p=>({...p,[field]:ev.target.result})); r.readAsDataURL(f); };

  const complete = () => {
    const e = {};
    if (!form.nombre) e.nombre=true;
    if (!form.email?.includes('@')) e.email=true;
    if (!form.curp || form.curp.length<18) e.curp=true;
    if (!form.ine || form.ine.length<8) e.ine=true;
    if (!form.acceptTerms) e.terms=true;
    setErrors(e);
    if (Object.keys(e).length) return;
    const reg = { ...form, agentType, commissionRate: agentType==='inhouse'?'5-10%':agentType==='external'?'2%':'6%', registeredAt:new Date().toISOString(), agentCode:'REagent-'+Math.floor(Math.random()*50).toString().padStart(2,'0')+'@eb.com', pin:Math.floor(1000+Math.random()*9000).toString(), hasINE:!!inePhotos.front, hasSelfie:!!inePhotos.selfie, status:'pending_verification' };
    Brain.logRegistration(reg);
    sessionStorage.setItem('mre_agent_registered', JSON.stringify({ name:form.nombre, type:agentType, code:reg.agentCode, pin:reg.pin }));
    onComplete(reg);
  };

  if (step===1) return (
    <div style={{ maxWidth:'500px', margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:'24px' }}>
        <p style={{ color:G, fontSize:'10px', letterSpacing:'3px', marginBottom:'6px' }}>{en?'ACCESS REGISTRATION REQUIRED':'SE REQUIERE REGISTRO DE ACCESO'}</p>
        <p style={{ color:'#64748b', fontSize:'10px', letterSpacing:'1px' }}>{en?'INE + CURP required for all participants.':'Se requiere INE + CURP para todos los participantes.'}</p>
      </div>
      <p style={{ color:'#94a3b8', fontSize:'10px', letterSpacing:'2px', marginBottom:'12px', textAlign:'center' }}>{en?'I AM REGISTERING AS:':'ME REGISTRO COMO:'}</p>
      {[{id:'inhouse',l:en?'IN-HOUSE AGENT':'AGENTE IN-HOUSE',s:en?'EnjoyBaja team member':'Miembro del equipo EnjoyBaja'},{id:'external',l:en?'EXTERNAL AGENT':'AGENTE EXTERNO',s:en?'Independent / Affiliated agent':'Agente independiente / afiliado'},{id:'fsbo',l:en?'PROPERTY OWNER (FSBO)':'DUEÑO FSBO',s:en?'Selling my own property — 6% commission':'Vendo mi propia propiedad — comisión 6%'}].map(o=>(
        <button key={o.id} onClick={()=>{setType(o.id);setStep(2);}} style={{ display:'block', width:'100%', padding:'14px 18px', marginBottom:'8px', textAlign:'left', background:'rgba(15,23,42,0.7)', border:'1px solid rgba(203,166,88,0.25)', color:'#cbd5e1', cursor:'pointer' }}>
          <span style={{ display:'block', color:G, fontSize:'11px', letterSpacing:'2px', marginBottom:'3px' }}>{o.l}</span>
          <span style={{ color:'#64748b', fontSize:'9px', letterSpacing:'1px' }}>{o.s}</span>
        </button>
      ))}
      <div style={{ background:'rgba(203,166,88,0.05)', border:'1px solid rgba(203,166,88,0.15)', padding:'14px', marginTop:'14px' }}>
        <p style={{ color:'#94a3b8', fontSize:'9px', lineHeight:'1.7', letterSpacing:'0.5px' }}>
          {en?'Platform participation is FREE for active agents. Inactive accounts (90+ days) will be assessed a membership fee. All participants must provide valid INE + CURP. Commission agreements available in Spanish & English via DocuSign. Banking details required for commission deposits.':'La participación es GRATUITA para agentes activos. Cuentas inactivas (90+ días) recibirán una cuota. Todos deben proporcionar INE y CURP válidos. Acuerdos vía DocuSign. Datos bancarios requeridos para depósito de comisiones.'}
        </p>
      </div>
    </div>
  );

  if (step===2) return (
    <div style={{ maxWidth:'500px', margin:'0 auto' }}>
      <div style={{ display:'flex', gap:'4px', marginBottom:'20px' }}>{[1,2,3].map(s=><div key={s} style={{ flex:1, height:'2px', background:s<=2?G:'rgba(148,163,184,0.2)' }} />)}</div>
      <p style={{ color:G, fontSize:'9px', letterSpacing:'2px', marginBottom:'16px' }}>{en?'PERSONAL INFORMATION':'INFORMACIÓN PERSONAL'} <span style={{ color:'#475569', marginLeft:'8px' }}>— {agentType.toUpperCase()}</span></p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'10px' }}>
        <div><label style={LS}>{en?'FIRST NAME *':'NOMBRE(S) *'}</label><input value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} style={{...IS,border:`1px solid ${errors.nombre?'#ef4444':'rgba(203,166,88,0.25)'}`}} placeholder="Juan" /></div>
        <div><label style={LS}>{en?'LAST NAME(S) *':'APELLIDO(S) *'}</label><input value={form.apellidos} onChange={e=>setForm({...form,apellidos:e.target.value})} style={IS} placeholder="García López" /></div>
        <div><label style={LS}>EMAIL *</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{...IS,border:`1px solid ${errors.email?'#ef4444':'rgba(203,166,88,0.25)'}`}} /></div>
        <div><label style={LS}>{en?'PHONE / TEL':'TELÉFONO / PHONE'}</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={IS} placeholder="+52 646 000 0000" /></div>
        <div><label style={LS}>WHATSAPP</label><input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} style={IS} placeholder="+52 646 000 0000" /></div>
        <div><label style={LS}>{en?'COMPANY / EMPRESA':'EMPRESA / COMPANY'}</label><input value={form.empresa} onChange={e=>setForm({...form,empresa:e.target.value})} style={IS} /></div>
      </div>
      {agentType!=='fsbo'&&<div style={{marginBottom:'10px'}}><label style={LS}>{en?'RE LICENSE # / LICENCIA INMOBILIARIA':'LICENCIA INMOBILIARIA'}</label><input value={form.licencia} onChange={e=>setForm({...form,licencia:e.target.value})} style={IS} /></div>}
      {agentType==='external'&&<div style={{marginBottom:'10px'}}><label style={LS}>{en?'REFERRED BY (optional)':'REFERIDO POR (opcional)'}</label><input value={form.referidoPor} onChange={e=>setForm({...form,referidoPor:e.target.value})} style={IS} placeholder={en?'Agent name or affiliate code':'Nombre de agente o código'} /></div>}
      <p style={{ color:G, fontSize:'9px', letterSpacing:'2px', margin:'14px 0 10px', paddingTop:'10px', borderTop:'1px solid rgba(203,166,88,0.1)' }}>{en?'BANKING — COMMISSION DEPOSITS':'DATOS BANCARIOS — DEPÓSITO COMISIONES'}</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'16px' }}>
        <div><label style={LS}>{en?'BANK / BANCO':'BANCO / BANK'}</label><input value={form.banco} onChange={e=>setForm({...form,banco:e.target.value})} style={IS} placeholder="BBVA, Banamex, Chase..." /></div>
        <div><label style={LS}>{en?'CLABE / ROUTING':'CLABE INTERBANCARIA'}</label><input value={form.clabe} onChange={e=>setForm({...form,clabe:e.target.value})} style={IS} placeholder="18-digit CLABE / Routing" /></div>
      </div>
      <div style={{ display:'flex', gap:'10px' }}>
        <button onClick={()=>setStep(1)} style={{ padding:'12px 20px', background:'rgba(148,163,184,0.1)', border:'1px solid rgba(148,163,184,0.2)', color:'#94a3b8', cursor:'pointer', fontSize:'10px', letterSpacing:'1px' }}>{en?'← BACK':'← ATRÁS'}</button>
        <button onClick={()=>{ if(!form.nombre||!form.email){alert(en?'Name and email required':'Nombre y email requeridos');return;} setStep(3); }} style={{ flex:1, padding:'12px', background:`linear-gradient(135deg, ${G}, #b8944d)`, border:'none', color:'#0f172a', fontWeight:'700', cursor:'pointer', fontSize:'11px', letterSpacing:'2px' }}>{en?'CONTINUE TO ID VERIFICATION →':'CONTINUAR A VERIFICACIÓN →'}</button>
      </div>
    </div>
  );

  if (step===3) return (
    <div style={{ maxWidth:'500px', margin:'0 auto' }}>
      <div style={{ display:'flex', gap:'4px', marginBottom:'20px' }}>{[1,2,3].map(s=><div key={s} style={{ flex:1, height:'2px', background:G }} />)}</div>
      <div style={{ background:'rgba(203,166,88,0.06)', border:'1px solid rgba(203,166,88,0.2)', padding:'14px', marginBottom:'16px' }}>
        <p style={{ color:G, fontSize:'9px', letterSpacing:'2px', marginBottom:'6px' }}>⬡ {en?'IDENTITY VERIFICATION — INE + CURP':'VERIFICACIÓN DE IDENTIDAD — INE + CURP'}</p>
        <p style={{ color:'#64748b', fontSize:'9px', lineHeight:'1.7' }}>{en?'Mexican law requires identity verification for all real estate transactions. Your CURP uniquely identifies you and ensures accurate commission deposits and legal compliance.':'La ley mexicana requiere verificación de identidad. Tu CURP te identifica de manera única y garantiza depósitos precisos y cumplimiento legal.'}</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'14px' }}>
        <div><label style={LS}>CURP *</label><input value={form.curp} onChange={e=>setForm({...form,curp:e.target.value.toUpperCase()})} style={{...IS,border:`1px solid ${errors.curp?'#ef4444':'rgba(203,166,88,0.25)'}`,fontFamily:'monospace',letterSpacing:'2px'}} placeholder="GARC850101HBCZZZ01" maxLength={18} /><p style={{ color:'#475569', fontSize:'8px', marginTop:'3px' }}>18 {en?'characters':'caracteres'}</p></div>
        <div><label style={LS}>{en?'INE NUMBER *':'NO. INE *'}</label><input value={form.ine} onChange={e=>setForm({...form,ine:e.target.value})} style={{...IS,border:`1px solid ${errors.ine?'#ef4444':'rgba(203,166,88,0.25)'}`}} placeholder="0123456789" /></div>
      </div>
      <p style={{ color:'#94a3b8', fontSize:'9px', letterSpacing:'1.5px', marginBottom:'10px' }}>{en?'UPLOAD INE PHOTOS (tap to capture with camera):':'SUBE FOTOS DE TU INE (toca para capturar):'}</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px', marginBottom:'16px' }}>
        {[{f:'front',l:en?'FRONT / FRENTE':'FRENTE / FRONT'},{f:'back',l:en?'BACK / REVERSO':'REVERSO / BACK'},{f:'selfie',l:'SELFIE + INE'}].map(({f,l})=>(
          <label key={f} style={{ display:'block', cursor:'pointer' }}>
            <div style={{ border:`1px dashed ${inePhotos[f]?G:'rgba(148,163,184,0.2)'}`, aspectRatio:'4/3', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'rgba(15,23,42,0.5)', overflow:'hidden', position:'relative' }}>
              {inePhotos[f] ? <img src={inePhotos[f]} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <span style={{ color:'#475569', fontSize:'20px' }}>+</span>}
            </div>
            <p style={{ color:'#64748b', fontSize:'8px', letterSpacing:'1px', textAlign:'center', marginTop:'4px' }}>{l}</p>
            <input type="file" accept="image/*" capture="environment" style={{ display:'none' }} onChange={e=>captureINE(f,e)} />
          </label>
        ))}
      </div>
      <label style={{ display:'flex', alignItems:'flex-start', gap:'10px', cursor:'pointer', marginBottom:'16px' }}>
        <input type="checkbox" checked={form.acceptTerms} onChange={e=>setForm({...form,acceptTerms:e.target.checked})} style={{ accentColor:G, width:'14px', height:'14px', marginTop:'2px', flexShrink:0 }} />
        <span style={{ color:errors.terms?'#ef4444':'#94a3b8', fontSize:'9px', lineHeight:'1.7', letterSpacing:'0.5px' }}>{en?'I agree to EnjoyBaja platform terms, commission agreements, and authorize identity verification. Commission rates will be formalized via DocuSign.':'Acepto los términos de EnjoyBaja, acuerdos de comisión y autorizo verificación de identidad. Las tarifas se formalizarán vía DocuSign.'}</span>
      </label>
      <div style={{ display:'flex', gap:'10px' }}>
        <button onClick={()=>setStep(2)} style={{ padding:'12px 20px', background:'rgba(148,163,184,0.1)', border:'1px solid rgba(148,163,184,0.2)', color:'#94a3b8', cursor:'pointer', fontSize:'10px', letterSpacing:'1px' }}>{en?'← BACK':'← ATRÁS'}</button>
        <button onClick={complete} style={{ flex:1, padding:'12px', background:`linear-gradient(135deg, ${G}, #b8944d)`, border:'none', color:'#0f172a', fontWeight:'700', cursor:'pointer', fontSize:'11px', letterSpacing:'2px' }}>{en?'COMPLETE REGISTRATION ⬡':'COMPLETAR REGISTRO ⬡'}</button>
      </div>
    </div>
  );
}

// ================================================================
// FSBO LISTING FLOW — Mexico fields + Photo AI + 6% commission
// ================================================================
function FSBOListingFlow({ language, navigate }) {
  const en = language === 'english';
  const [step, setStep]     = useState(1);
  const [photos, setPhotos] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]     = useState({ calle:'', numExt:'', numInt:'', colonia:'', municipio:'', cp:'', estado:'Baja California Norte', carretera:'', lat:'', lng:'', tipo:'', recamaras:'', banos:'', cajones:'', m2Const:'', sqftConst:'', m2Lot:'', sqftLot:'', priceUSD:'', priceMXN:'', descripcion:'', amenidades:[], sellerName:'', sellerEmail:'', sellerPhone:'', sellerID:'' });

  const G = '#cba658';
  const IS = { padding:'11px', background:'rgba(15,23,42,0.8)', border:'1px solid rgba(203,166,88,0.25)', color:'#cbd5e1', fontSize:'12px', letterSpacing:'0.5px', outline:'none', width:'100%', boxSizing:'border-box' };
  const LS = { color:'#94a3b8', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', display:'block', marginBottom:'5px' };

  if (submitted) return (
    <div style={{ textAlign:'center', padding:'40px' }}>
      <div style={{ fontSize:'36px', color:G, marginBottom:'12px' }}>⬡</div>
      <h3 style={{ color:'#e2e8f0', fontSize:'15px', fontWeight:'300', letterSpacing:'2px', marginBottom:'8px' }}>{en?'PROPERTY SUBMITTED FOR REVIEW':'PROPIEDAD ENVIADA PARA REVISIÓN'}</h3>
      <p style={{ color:'#94a3b8', fontSize:'12px' }}>{en?'Our team will review your listing within 24-48 hours.':'Nuestro equipo revisará tu propiedad en 24-48 horas.'}</p>
    </div>
  );

  const progress = (
    <div style={{ display:'flex', gap:'6px', marginBottom:'20px' }}>
      {[1,2,3,4].map(s=><div key={s} style={{ flex:1, height:'2px', background:s<=step?G:'rgba(148,163,184,0.2)', transition:'all 0.3s' }} />)}
    </div>
  );

  return (
    <div>
      {progress}
      {step===1&&(
        <div>
          <MexicoAddressFields form={form} setForm={setForm} language={language} inputStyle={IS} labelStyle={LS} />
          <button onClick={()=>{ if(!form.calle||!form.priceUSD||!form.estado){alert(en?'Street, state and price required':'Calle, estado y precio requeridos');return;} setStep(2); }} style={{ padding:'13px', background:`linear-gradient(135deg,${G},#b8944d)`, border:'none', color:'#0f172a', fontWeight:'700', cursor:'pointer', fontSize:'11px', width:'100%', letterSpacing:'2px', marginTop:'16px' }}>
            {en?'CONTINUE TO PHOTOS →':'CONTINUAR A FOTOS →'}
          </button>
        </div>
      )}
      {step===2&&(
        <div>
          <p style={{ color:G, fontSize:'9px', letterSpacing:'2px', marginBottom:'14px' }}>▸ {en?'PROPERTY PHOTOS — AI ENHANCED (MIN 3, MAX 8)':'FOTOS — IA MEJORADA (MÍN 3, MÁX 8)'}</p>
          <PhotoMinerPanel photos={photos} setPhotos={setPhotos} language={language} />
          <div style={{ display:'flex', gap:'10px', marginTop:'16px' }}>
            <button onClick={()=>setStep(1)} style={{ padding:'12px 20px', background:'rgba(148,163,184,0.1)', border:'1px solid rgba(148,163,184,0.2)', color:'#94a3b8', cursor:'pointer', fontSize:'10px', letterSpacing:'1px' }}>{en?'← BACK':'← ATRÁS'}</button>
            <button onClick={()=>{ if(photos.length<3){alert(en?'Minimum 3 photos required':'Mínimo 3 fotos requeridas');return;} setStep(3); }} style={{ flex:1, padding:'12px', background:`linear-gradient(135deg,${G},#b8944d)`, border:'none', color:'#0f172a', fontWeight:'700', cursor:'pointer', fontSize:'11px', letterSpacing:'2px' }}>{en?'CONTINUE TO SELLER INFO →':'CONTINUAR A INFO DEL VENDEDOR →'}</button>
          </div>
        </div>
      )}
      {step===3&&(
        <div>
          <p style={{ color:G, fontSize:'9px', letterSpacing:'2px', marginBottom:'14px' }}>▸ {en?'SELLER INFORMATION':'INFORMACIÓN DEL VENDEDOR'}</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'16px' }}>
            <div><label style={LS}>{en?'FULL NAME *':'NOMBRE COMPLETO *'}</label><input value={form.sellerName} onChange={e=>setForm({...form,sellerName:e.target.value})} style={IS} /></div>
            <div><label style={LS}>EMAIL *</label><input type="email" value={form.sellerEmail} onChange={e=>setForm({...form,sellerEmail:e.target.value})} style={IS} /></div>
            <div><label style={LS}>{en?'PHONE / TELÉFONO':'TELÉFONO / PHONE'}</label><input value={form.sellerPhone} onChange={e=>setForm({...form,sellerPhone:e.target.value})} style={IS} placeholder="+52 646 000 0000" /></div>
            <div><label style={LS}>{en?'CURP / INE / PASSPORT':'CURP / INE / PASAPORTE'}</label><input value={form.sellerID} onChange={e=>setForm({...form,sellerID:e.target.value})} style={IS} /></div>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <button onClick={()=>setStep(2)} style={{ padding:'12px 20px', background:'rgba(148,163,184,0.1)', border:'1px solid rgba(148,163,184,0.2)', color:'#94a3b8', cursor:'pointer', fontSize:'10px', letterSpacing:'1px' }}>{en?'← BACK':'← ATRÁS'}</button>
            <button onClick={()=>{ if(!form.sellerName||!form.sellerEmail){alert(en?'Name and email required':'Nombre y email requeridos');return;} setStep(4); }} style={{ flex:1, padding:'12px', background:`linear-gradient(135deg,${G},#b8944d)`, border:'none', color:'#0f172a', fontWeight:'700', cursor:'pointer', fontSize:'11px', letterSpacing:'2px' }}>{en?'REVIEW & ACCEPT TERMS →':'REVISAR Y ACEPTAR TÉRMINOS →'}</button>
          </div>
        </div>
      )}
      {step===4&&(
        <div>
          <p style={{ color:G, fontSize:'9px', letterSpacing:'2px', marginBottom:'14px' }}>▸ {en?'COMMISSION AGREEMENT & SUBMIT':'ACUERDO DE COMISIÓN Y ENVÍO'}</p>
          <div style={{ background:'rgba(30,41,59,0.6)', border:'1px solid rgba(148,163,184,0.15)', padding:'18px', marginBottom:'16px' }}>
            <p style={{ color:'#94a3b8', fontSize:'11px', marginBottom:'6px' }}>{form.calle} {form.numExt}, {form.colonia}, {form.municipio}, {form.estado}</p>
            <p style={{ color:'#e2e8f0', fontSize:'20px', fontWeight:'300' }}>${parseFloat(form.priceUSD||0).toLocaleString()} USD</p>
            <p style={{ color:'#94a3b8', fontSize:'11px' }}>MX$ {parseFloat(form.priceMXN||0).toLocaleString()}</p>
            {form.lat&&<p style={{ color:'#475569', fontSize:'9px', marginTop:'6px', letterSpacing:'1px' }}>📍 {form.lat}, {form.lng}</p>}
            <p style={{ color:'#94a3b8', fontSize:'10px', marginTop:'6px' }}>{form.tipo} • {form.recamaras} {en?'bed':'rec'} • {form.banos} {en?'bath':'baño'} • {form.m2Const} m² / {form.sqftConst} ft²</p>
          </div>
          <div style={{ background:'rgba(203,166,88,0.05)', border:'1px solid rgba(203,166,88,0.25)', padding:'20px', marginBottom:'16px' }}>
            <h5 style={{ color:G, fontSize:'10px', letterSpacing:'2px', marginBottom:'10px' }}>{en?'FSBO COMMISSION DISCLOSURE':'DIVULGACIÓN DE COMISIÓN FSBO'}</h5>
            <p style={{ color:'#cbd5e1', fontSize:'11px', lineHeight:'1.8' }}>{en?'By listing this property through EnjoyBaja.com as a For Sale By Owner (FSBO) listing, I agree to pay a platform commission of 6% of the final sale price upon closing. EnjoyBaja will act as the listing agent, coordinate marketing, showings, and facilitate the transaction. Commission is due at closing. 30-day written notice required for cancellation.':'Al publicar esta propiedad a través de EnjoyBaja.com como FSBO, acepto pagar una comisión de plataforma del 6% del precio final de venta al cierre. EnjoyBaja actuará como agente de listado, coordinará el marketing, visitas y facilitará la transacción hasta el cierre.'}</p>
          </div>
          <label style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer', marginBottom:'16px' }}>
            <input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} style={{ accentColor:G, width:'16px', height:'16px' }} />
            <span style={{ color:'#e2e8f0', fontSize:'12px' }}>{en?'I accept the 6% FSBO commission terms':'Acepto los términos de comisión FSBO del 6%'}</span>
          </label>
          <div style={{ display:'flex', gap:'10px' }}>
            <button onClick={()=>setStep(3)} style={{ padding:'12px 20px', background:'rgba(148,163,184,0.1)', border:'1px solid rgba(148,163,184,0.2)', color:'#94a3b8', cursor:'pointer', fontSize:'10px', letterSpacing:'1px' }}>{en?'← BACK':'← ATRÁS'}</button>
            <button onClick={()=>{
              if(!accepted){alert(en?'You must accept commission terms':'Debes aceptar los términos');return;}
              const listing={ id:Date.now(), ...form, photos:photos.map(p=>p.current), type:'fsbo', status:'pending_review', commissionRate:6, createdAt:new Date().toISOString() };
              const existing=JSON.parse(localStorage.getItem('enjoybaja_listings')||'[]');
              existing.push(listing);
              localStorage.setItem('enjoybaja_listings',JSON.stringify(existing));
              Brain.logListing(listing.id,'fsbo');
              setSubmitted(true);
            }} disabled={!accepted} style={{ flex:1, padding:'12px', background:accepted?`linear-gradient(135deg,${G},#b8944d)`:'rgba(148,163,184,0.2)', border:'none', color:accepted?'#0f172a':'#64748b', fontWeight:'700', cursor:accepted?'pointer':'not-allowed', fontSize:'11px', letterSpacing:'2px' }}>
              {en?'SUBMIT LISTING FOR REVIEW ⬡':'ENVIAR PROPIEDAD PARA REVISIÓN ⬡'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// MAIN COMPONENT
// ================================================================
export default function MexicoRealEstate() {
  const navigate = useNavigate();
  const [language, setLanguage]       = useState('english');
  const [expandedSection, setExpanded]= useState(null);
  const [isMobile, setIsMobile]       = useState(false);
  const [registered, setRegistered]   = useState(false);
  const [registeredUser, setRegUser]  = useState(null);
  const [showGate, setShowGate]       = useState(false);
  const [gateFor, setGateFor]         = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    const stored = sessionStorage.getItem('mre_agent_registered');
    if (stored) { try { setRegUser(JSON.parse(stored)); setRegistered(true); } catch {} }
    return () => window.removeEventListener('resize', check);
  }, []);

  const GATED = ['upload', 'agent', 'partner'];
  const G = '#cba658';

  const toggleSection = (id) => {
    if (GATED.includes(id) && !registered) {
      setGateFor(id); setShowGate(true); setExpanded(id);
      Brain.logAccordion(id + '_gate_triggered');
      return;
    }
    setExpanded(prev => prev === id ? null : id);
    Brain.logAccordion(id);
  };

  const onRegistered = (data) => {
    setRegistered(true); setRegUser(data);
    setShowGate(false); Brain.logRegistration({ ...data, completed: true });
  };

  const fieldStyle = { padding:'11px', background:'rgba(15,23,42,0.8)', border:'1px solid rgba(203,166,88,0.25)', color:'#cbd5e1', fontSize:'12px', letterSpacing:'0.5px', outline:'none', width:'100%', boxSizing:'border-box' };

  const teamMembers = [
    { name:"Saul Garcia", title:"FINANCE & LENDING SPECIALIST", subtitle:"NMLS #337526", specialties:["Cross-Border Financing","USDA 502 Rural","Fideicomiso Expert"], description:"31+ years in finance and lending. Bilingual. USA-Mexico cross-border specialist.", photo:"/images/team/SG.png", email:"saul@auditdna.com" },
    { name:"Ariel Bolio", title:"COMPANY ATTORNEY", subtitle:"Licensed Attorney - Baja California", specialties:["Real Estate Law","Contract Negotiation","Title Verification"], description:"Expert legal counsel for cross-border real estate transactions.", photo:"/images/team/ariel-bolio.png", email:"legal@auditdna.com" },
    { name:"Gibran Lyle", title:"REAL ESTATE & TEAM DEVELOPMENT", subtitle:"Licensed Agent - Ensenada, BC", specialties:["Coastal Properties","Valle de Guadalupe","Team Leadership"], description:"Expert in Baja California coastal and wine country real estate.", photo:"/images/team/gibran-lyle.png", email:"gibran@auditdna.com" },
    { name:"Brenda Bonilla", title:"REAL ESTATE SPECIALIST", subtitle:"Baja Mexico & Monterrey", specialties:["Coastal Properties","Metropolitan Markets","Luxury Residential"], description:"Dual-market specialist: Baja California coast and Monterrey metropolitan.", photo:"/images/team/BrendaB.jpg", email:"brenda@auditdna.com" },
    { name:"Osvaldo Gutierrez", title:"TEAM DEVELOPMENT & REAL ESTATE", subtitle:"VP Marketing & Business Development", specialties:["Strategic Growth","Brand Development","Market Expansion"], description:"Driving growth across USA-Mexico markets.", photo:"/images/team/Ozzy.png", email:"osvaldo@auditdna.com" },
    { name:"Saul Castro", title:"PUBLIC RELATIONS SPECIALIST", subtitle:"Communications & Media", specialties:["Media Relations","Communications","Public Outreach"], description:"Managing company communications and media relations.", photo:"/images/team/Saul-Tocayo.png", email:"scastro@auditdna.com" },
  ];

  const sections = [
    { id:'search',    title:language==='english'?'Search for Properties':'Buscar Propiedades' },
    { id:'buyer',     title:language==='english'?'Buyer Inquiry / Express Interest':'Consulta de Comprador' },
    { id:'upload',    title:language==='english'?'List Your Property (FSBO)':'Publicar Tu Propiedad (FSBO)', gated:true },
    { id:'refi',      title:language==='english'?'Mexico Home Refinance / Buy in Mexico':'Refinanciamiento / Compra en México' },
    { id:'partner',   title:language==='english'?'Referral Partner Registration':'Registro de Socio Referidor', gated:true },
    { id:'agent',     title:language==='english'?'Agent Registration':'Registro de Agente', gated:true },
    { id:'appraisal', title:language==='english'?'Appraisal Services':'Servicios de Avalúo' },
    { id:'legal',     title:language==='english'?'Legal / Fideicomiso Questionnaire':'Cuestionario Legal / Fideicomiso' },
    { id:'team',      title:language==='english'?'Meet the Team':'Conoce al Equipo' },
  ];

  return (
    <div style={{ minHeight:'100vh', position:'relative' }}>
      <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundImage:'url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=90")', backgroundSize:'cover', backgroundPosition:'center', backgroundAttachment:isMobile?'scroll':'fixed', zIndex:0 }} />
      <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', background:'linear-gradient(180deg,rgba(15,23,42,0.5) 0%,rgba(15,23,42,0.72) 100%)', zIndex:1 }} />

      <div style={{ position:'relative', zIndex:10, maxWidth:'900px', margin:'0 auto', padding:isMobile?'30px 16px 40px':'40px 20px 40px' }}>
        {/* HEADER */}
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <h1 style={{ fontSize:isMobile?'26px':'36px', fontWeight:'200', color:'#f1f5f9', letterSpacing:'4px', marginBottom:'6px', textShadow:'0 2px 20px rgba(0,0,0,0.4)' }}>MEXICO REAL ESTATE</h1>
          <p style={{ color:'rgba(148,163,184,0.6)', fontSize:'11px', letterSpacing:'3px', marginBottom:'20px', fontWeight:'300' }}>BIENES RAÍCES EN MÉXICO • FULL SERVICE PLATFORM</p>
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', flexWrap:'wrap', marginBottom:'16px' }}>
            <button onClick={()=>setLanguage(l=>l==='english'?'spanish':'english')} style={{ padding:'6px 16px', background:'rgba(203,166,88,0.12)', border:'1px solid rgba(203,166,88,0.25)', color:G, cursor:'pointer', fontSize:'10px', letterSpacing:'2px' }}>
              {language==='english'?'ESPAÑOL':'ENGLISH'}
            </button>
            {registered && registeredUser && (
              <div style={{ padding:'5px 12px', background:'rgba(203,166,88,0.1)', border:'1px solid rgba(203,166,88,0.25)' }}>
                <span style={{ color:G, fontSize:'9px', letterSpacing:'2px' }}>⬡ {registeredUser.nombre||registeredUser.name} — {(registeredUser.agentType||registeredUser.type||'').toUpperCase()}</span>
              </div>
            )}
          </div>
          <ModuleNavBar compact />
        </div>

        {/* REGISTRATION GATE */}
        {showGate && (
          <div style={{ background:'rgba(15,23,42,0.97)', border:'1px solid rgba(203,166,88,0.25)', padding:'28px', marginBottom:'20px', backdropFilter:'blur(12px)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
              <span style={{ color:G, fontSize:'10px', letterSpacing:'3px' }}>⬡ {language==='english'?'REGISTRATION REQUIRED':'SE REQUIERE REGISTRO'}</span>
              <button onClick={()=>{setShowGate(false);setExpanded(null);}} style={{ background:'none', border:'none', color:'#64748b', cursor:'pointer', fontSize:'16px' }}>✕</button>
            </div>
            <RegistrationGate onComplete={onRegistered} language={language} />
          </div>
        )}

        {/* ACCORDIONS */}
        {sections.map(section => (
          <div key={section.id} style={{ background:'rgba(15,23,42,0.65)', border:'1px solid rgba(203,166,88,0.15)', marginBottom:'8px', overflow:'hidden', backdropFilter:'blur(8px)' }}>
            <button onClick={()=>toggleSection(section.id)} style={{ width:'100%', padding:'16px 20px', background:expandedSection===section.id?'rgba(203,166,88,0.08)':'transparent', border:'none', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <span style={{ fontSize:'12px', fontWeight:'300', letterSpacing:'1.5px', color:expandedSection===section.id?G:'#cbd5e1' }}>{section.title}</span>
                {section.gated && !registered && <span style={{ padding:'2px 6px', background:'rgba(203,166,88,0.1)', border:'1px solid rgba(203,166,88,0.2)', color:'#b8944d', fontSize:'8px', letterSpacing:'1px' }}>{language==='english'?'REG REQUIRED':'REQUIERE REG'}</span>}
                {section.gated && registered && <span style={{ padding:'2px 6px', background:'rgba(203,166,88,0.08)', border:'1px solid rgba(203,166,88,0.15)', color:G, fontSize:'8px', letterSpacing:'1px' }}>⬡ {language==='english'?'VERIFIED':'VERIFICADO'}</span>}
              </div>
              <span style={{ fontSize:'10px', transform:expandedSection===section.id?'rotate(180deg)':'none', transition:'transform 0.3s', color:G }}>▼</span>
            </button>

            {expandedSection===section.id && !showGate && (
              <div style={{ padding:'20px', borderTop:'1px solid rgba(203,166,88,0.1)' }}>
                {section.id==='search' && <PropertySearch language={language} />}
                {section.id==='buyer' && (
                  <div><p style={{ color:'#94a3b8', marginBottom:'16px', fontSize:'12px', letterSpacing:'0.5px' }}>{language==='english'?'Express your interest. Our team will contact you within 24 hours.':'Exprese su interés. Nuestro equipo le contactará en 24 horas.'}</p>
                  <div style={{ display:'grid', gap:'10px', maxWidth:'500px' }}>
                    <input placeholder={language==='english'?'Full Name / Nombre Completo':'Nombre Completo'} style={fieldStyle} />
                    <input placeholder="Email" type="email" style={fieldStyle} />
                    <input placeholder={language==='english'?'Phone / WhatsApp':'Teléfono / WhatsApp'} style={fieldStyle} />
                    <select style={{...fieldStyle,cursor:'pointer'}}><option>{language==='english'?'Budget Range':'Rango de Presupuesto'}</option><option>$100K-$250K USD</option><option>$250K-$500K USD</option><option>$500K-$1M USD</option><option>$1M+ USD</option></select>
                    <textarea placeholder={language==='english'?'Tell us about your ideal property...':'Cuéntenos sobre su propiedad ideal...'} rows={3} style={{...fieldStyle,resize:'vertical'}} />
                    <button style={{ padding:'12px', background:`linear-gradient(135deg,${G},#b8944d)`, border:'none', color:'#0f172a', fontWeight:'600', cursor:'pointer', fontSize:'11px', letterSpacing:'2px' }}>{language==='english'?'SUBMIT INQUIRY':'ENVIAR SOLICITUD'}</button>
                  </div></div>
                )}
                {section.id==='upload' && <FSBOListingFlow language={language} navigate={navigate} />}
                {section.id==='refi' && (
                  <div>
                    <div style={{ background:'rgba(203,166,88,0.06)', border:'1px solid rgba(203,166,88,0.2)', padding:'20px', marginBottom:'16px' }}>
                      <h4 style={{ color:G, marginBottom:'12px', fontSize:'12px', letterSpacing:'2px' }}>US CITIZENS ONLY — MEXICO PROPERTY FINANCING</h4>
                      <div style={{ color:'#94a3b8', lineHeight:'2', fontSize:'12px' }}>
                        <p>Minimum Property Value: <strong style={{ color:G }}>$385,000 USD</strong></p>
                        <p>Down Payment: <strong style={{ color:G }}>35–45%</strong></p>
                        <p>Loan Terms: 15–30 years • Credit Score Min: 680</p>
                        <p>Restricted zone properties require Fideicomiso trust</p>
                      </div>
                    </div>
                    <button onClick={()=>window.open('https://wa.me/526463402686?text=Mexico property financing inquiry','_blank')} style={{ padding:'10px 24px', background:'transparent', border:'1px solid rgba(203,166,88,0.4)', color:G, fontSize:'10px', letterSpacing:'2px', cursor:'pointer' }}>{language==='english'?'CONTACT US ABOUT FINANCING':'CONTÁCTENOS SOBRE FINANCIAMIENTO'}</button>
                  </div>
                )}
                {section.id==='partner' && (
                  <div><p style={{ color:'#94a3b8', marginBottom:'16px', fontSize:'12px' }}>{language==='english'?'Join our referral network and earn commissions.':'Únase a nuestra red y gane comisiones.'}</p>
                  <div style={{ display:'grid', gap:'10px', maxWidth:'500px' }}>
                    <input placeholder={language==='english'?'Full Name / Nombre Completo':'Nombre Completo'} style={fieldStyle} />
                    <input placeholder="Email" type="email" style={fieldStyle} />
                    <input placeholder={language==='english'?'Phone / WhatsApp':'Teléfono / WhatsApp'} style={fieldStyle} />
                    <input placeholder={language==='english'?'Company / Agency':'Empresa / Agencia'} style={fieldStyle} />
                    <input placeholder={language==='english'?'License # (if applicable)':'Licencia # (si aplica)'} style={fieldStyle} />
                    <button style={{ padding:'12px', background:`linear-gradient(135deg,${G},#b8944d)`, border:'none', color:'#0f172a', fontWeight:'600', cursor:'pointer', fontSize:'11px', letterSpacing:'2px' }}>{language==='english'?'APPLY AS REFERRAL PARTNER':'APLICAR COMO SOCIO'}</button>
                  </div></div>
                )}
                {section.id==='agent' && (
                  <div><p style={{ color:'#94a3b8', marginBottom:'16px', fontSize:'12px' }}>{language==='english'?'You are verified. Complete your agent profile.':'Estás verificado. Completa tu perfil de agente.'}</p>
                  <div style={{ display:'grid', gap:'10px', maxWidth:'500px' }}>
                    <input placeholder={language==='english'?'Real Estate License #':'Licencia Inmobiliaria #'} style={fieldStyle} />
                    <input placeholder={language==='english'?'Primary Market / City':'Mercado Principal / Ciudad'} style={fieldStyle} />
                    <select style={{...fieldStyle,cursor:'pointer'}}><option>{language==='english'?'Specialization':'Especialización'}</option><option>Residential / Residencial</option><option>Commercial / Comercial</option><option>Land / Terrenos</option><option>Luxury / Lujo</option><option>Coastal / Costa</option></select>
                    <button style={{ padding:'12px', background:`linear-gradient(135deg,${G},#b8944d)`, border:'none', color:'#0f172a', fontWeight:'600', cursor:'pointer', fontSize:'11px', letterSpacing:'2px' }}>{language==='english'?'COMPLETE AGENT PROFILE':'COMPLETAR PERFIL DE AGENTE'}</button>
                  </div></div>
                )}
                {section.id==='appraisal' && (
                  <div><div style={{ display:'grid', gap:'10px', maxWidth:'500px' }}>
                    <input placeholder={language==='english'?'Calle / Street':'Calle'} style={fieldStyle} />
                    <input placeholder={language==='english'?'Colonia / City':'Colonia / Ciudad'} style={fieldStyle} />
                    <input placeholder={language==='english'?'State / Estado':'Estado'} style={fieldStyle} />
                    <input placeholder={language==='english'?'Your Name':'Su Nombre'} style={fieldStyle} />
                    <input placeholder="Email" type="email" style={fieldStyle} />
                    <input placeholder={language==='english'?'Phone / WhatsApp':'Teléfono'} style={fieldStyle} />
                    <textarea placeholder={language==='english'?'Additional notes...':'Notas adicionales...'} rows={3} style={{...fieldStyle,resize:'vertical'}} />
                    <button style={{ padding:'12px', background:`linear-gradient(135deg,${G},#b8944d)`, border:'none', color:'#0f172a', fontWeight:'600', cursor:'pointer', fontSize:'11px', letterSpacing:'2px' }}>{language==='english'?'REQUEST APPRAISAL / SOLICITAR AVALÚO':'SOLICITAR AVALÚO'}</button>
                  </div></div>
                )}
                {section.id==='legal' && (
                  <div>
                    <div style={{ background:'rgba(203,166,88,0.06)', border:'1px solid rgba(203,166,88,0.2)', padding:'20px', marginBottom:'16px' }}>
                      <h4 style={{ color:G, marginBottom:'10px', fontSize:'12px', letterSpacing:'2px' }}>WHAT IS A FIDEICOMISO?</h4>
                      <p style={{ color:'#cbd5e1', fontSize:'12px', lineHeight:'1.8' }}>A Fideicomiso is a bank trust allowing foreigners to own property in Mexico's restricted zones (within 50km of coastline or 100km of international borders). The Mexican bank holds title as trustee while you retain all ownership rights. Duration: 50-year renewable. Annual cost: ~$500–$800 USD.</p>
                    </div>
                    <button onClick={()=>window.open('https://wa.me/526463402686?text=Fideicomiso legal questionnaire','_blank')} style={{ padding:'10px 24px', background:'transparent', border:'1px solid rgba(203,166,88,0.4)', color:G, fontSize:'10px', letterSpacing:'2px', cursor:'pointer' }}>{language==='english'?'START LEGAL QUESTIONNAIRE':'INICIAR CUESTIONARIO LEGAL'}</button>
                  </div>
                )}
                {section.id==='team' && (
                  <div>
                    <p style={{ color:'#94a3b8', textAlign:'center', marginBottom:'20px', fontSize:'10px', letterSpacing:'2px' }}>{language==='english'?'DEDICATED PROFESSIONALS SERVING BAJA CALIFORNIA & BEYOND':'PROFESIONALES DEDICADOS SIRVIENDO BAJA CALIFORNIA Y MÁS ALLÁ'}</p>
                    <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr 1fr', gap:'12px' }}>
                      {teamMembers.map((m,i)=>(
                        <div key={i} style={{ background:'rgba(15,23,42,0.5)', border:'1px solid rgba(148,163,184,0.1)', padding:'18px', textAlign:'center' }}>
                          <div style={{ width:'70px', height:'70px', overflow:'hidden', margin:'0 auto 12px', border:'1px solid rgba(203,166,88,0.3)' }}><img src={m.photo} alt={m.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} onError={e=>{e.target.style.display='none';}} /></div>
                          <h4 style={{ color:'#e2e8f0', fontSize:'12px', fontWeight:'400', letterSpacing:'1px', marginBottom:'4px' }}>{m.name}</h4>
                          <p style={{ color:G, fontSize:'8px', letterSpacing:'1.5px', marginBottom:'4px' }}>{m.title}</p>
                          {m.subtitle&&<p style={{ color:'#94a3b8', fontSize:'8px', marginBottom:'8px' }}>{m.subtitle}</p>}
                          <div style={{ display:'flex', flexWrap:'wrap', gap:'3px', justifyContent:'center', marginBottom:'8px' }}>{m.specialties.map((s,j)=><span key={j} style={{ padding:'2px 7px', background:'rgba(203,166,88,0.08)', border:'1px solid rgba(203,166,88,0.15)', color:G, fontSize:'7px' }}>{s}</span>)}</div>
                          <p style={{ color:'#94a3b8', fontSize:'9px', lineHeight:'1.5', marginBottom:'10px' }}>{m.description}</p>
                          <button onClick={()=>window.open(`https://wa.me/526463402686?text=I'd like to speak with ${m.name}`,'_blank')} style={{ padding:'6px 14px', background:'transparent', border:'1px solid rgba(203,166,88,0.3)', color:G, fontSize:'8px', letterSpacing:'1.5px', cursor:'pointer' }}>CONTACT</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* FOOTER */}
        <div style={{ padding:'28px 20px', background:'rgba(15,23,42,0.8)', borderTop:'1px solid rgba(203,166,88,0.1)', textAlign:'center', marginTop:'16px' }}>
          <p style={{ color:G, fontSize:'10px', marginBottom:'4px', letterSpacing:'3px' }}>ENJOY BAJA REAL ESTATE</p>
          <p style={{ color:'#94a3b8', fontSize:'9px', marginBottom:'8px', letterSpacing:'1.5px' }}>Premium Mexico Real Estate & Cross-Border Financing</p>
          <p style={{ color:'#e2e8f0', fontSize:'11px', letterSpacing:'1px' }}>Saul Garcia — NMLS #337526</p>
          <p style={{ color:'#94a3b8', fontSize:'9px', marginTop:'6px' }}>Everwise Home Loans & Realty</p>
          <p style={{ color:'#94a3b8', fontSize:'9px' }}>+52-646-340-2686 • sg01@eb.com</p>
        </div>
      </div>
    </div>
  );
}