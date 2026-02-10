import React, { useState, useRef, useEffect } from 'react';

// ================================================================
// DARK THEME CONSTANTS — Matches EnjoyBaja platform
// ================================================================
const G = { fontFamily: '"Helvetica Neue",-apple-system,BlinkMacSystemFont,sans-serif', fontWeight: '100', color: '#7a8a9e' };
const CARD = { padding: '14px 18px', background: '#000000', border: '1px solid #334155', borderRadius: '0', marginBottom: '6px' };
const TH = { padding: '8px 12px', textAlign: 'left', fontSize: '8px', letterSpacing: '1.5px', color: 'rgba(148,163,184,0.5)', textTransform: 'uppercase', borderBottom: '1px solid #1e293b' };
const TD = { padding: '8px 12px', fontSize: '11px', color: '#8b9bb5', borderBottom: '1px solid #1e293b' };
const INPUT = { padding: '10px 14px', background: '#000000', border: '1px solid #475569', borderRadius: '0', color: '#94a3b8', fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: '"Helvetica Neue",sans-serif' };
const BTN = (bg, bdr, clr) => ({ padding: '6px 14px', background: bg, border: `1px solid ${bdr}`, borderRadius: '0', color: clr, fontSize: '9px', letterSpacing: '1px', cursor: 'pointer', fontFamily: '"Helvetica Neue",sans-serif', fontWeight: '400' });
const TAG = (bg, bdr, clr) => ({ padding: '2px 8px', fontSize: '7px', letterSpacing: '1px', background: bg, border: `1px solid ${bdr}`, color: clr, borderRadius: '0', display: 'inline-block', marginRight: '4px', textTransform: 'uppercase' });

// ================================================================
// 1. SIGNATURE PAD — Canvas, offline, touch + mouse
// ================================================================
export function SignaturePad({ onSave, label = 'Firme Aquí / Sign Here', width = 500, height = 180 }) {
  const ref = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSig, setHasSig] = useState(false);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(203,166,88,0.25)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(20, height - 40); ctx.lineTo(width - 20, height - 40); ctx.stroke();
    ctx.fillStyle = 'rgba(203,166,88,0.4)'; ctx.font = '11px Helvetica Neue'; ctx.fillText('X', 25, height - 46);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  }, [width, height]);

  const pos = (e) => { const r = ref.current.getBoundingClientRect(); const sx = ref.current.width / r.width; const sy = ref.current.height / r.height; return e.touches ? { x: (e.touches[0].clientX - r.left) * sx, y: (e.touches[0].clientY - r.top) * sy } : { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy }; };
  const start = (e) => { e.preventDefault(); const p = pos(e); ref.current.getContext('2d').beginPath(); ref.current.getContext('2d').moveTo(p.x, p.y); setDrawing(true); setHasSig(true); };
  const draw = (e) => { if (!drawing) return; e.preventDefault(); const p = pos(e); const ctx = ref.current.getContext('2d'); ctx.lineTo(p.x, p.y); ctx.stroke(); };
  const end = () => setDrawing(false);
  const clear = () => { const c = ref.current; const ctx = c.getContext('2d'); ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, width, height); ctx.strokeStyle = 'rgba(203,166,88,0.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(20, height - 40); ctx.lineTo(width - 20, height - 40); ctx.stroke(); ctx.fillStyle = 'rgba(203,166,88,0.4)'; ctx.font = '11px Helvetica Neue'; ctx.fillText('X', 25, height - 46); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; setHasSig(false); };
  const save = () => { if (!hasSig) return alert('Firme primero / Please sign first'); if (onSave) onSave(ref.current.toDataURL('image/png')); };

  return (
    <div>
      <div style={{ ...G, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>{label}</div>
      <div style={{ border: '1px solid #8b7332', background: '#000000', overflow: 'hidden', marginBottom: '8px' }}>
        <canvas ref={ref} width={width} height={height} style={{ width: '100%', height: 'auto', cursor: 'crosshair', touchAction: 'none', display: 'block' }}
          onMouseDown={start} onMouseMove={draw} onMouseUp={end} onMouseLeave={end} onTouchStart={start} onTouchMove={draw} onTouchEnd={end} />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={clear} style={BTN('#000000', '#475569', '#94a3b8')}>BORRAR / CLEAR</button>
        <button onClick={save} style={BTN(hasSig ? '#b8944d' : '#1e293b', hasSig ? '#cba658' : '#334155', hasSig ? '#0f172a' : '#64748b')}>CONFIRMAR FIRMA / CONFIRM</button>
      </div>
    </div>
  );
}

// ================================================================
// 2. SMS VERIFICATION — Zadarma PBX +52-646-340-2686
// ================================================================
export function SMSVerification({ phone, onVerified, purpose = 'identity' }) {
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [genCode, setGenCode] = useState('');

  useEffect(() => { if (countdown > 0) { const t = setTimeout(() => setCountdown(countdown - 1), 1000); return () => clearTimeout(t); } }, [countdown]);

  const sendCode = () => {
    if (!phone || phone.length < 10) { setError('Número de teléfono inválido / Invalid phone'); return; }
    const c = Math.floor(100000 + Math.random() * 900000).toString();
    setGenCode(c);
    const log = JSON.parse(localStorage.getItem('sms_verifications') || '[]');
    log.push({ phone, code: c, purpose, sentAt: new Date().toISOString(), verified: false });
    localStorage.setItem('sms_verifications', JSON.stringify(log));
    // PRODUCTION: POST https://api.zadarma.com/v1/sms/send/ { number: phone, message: `EnjoyBaja: ${c}` }
    setSent(true); setCountdown(60); setError('');
  };

  const verify = () => {
    if (code === genCode) {
      setVerified(true); setError('');
      const log = JSON.parse(localStorage.getItem('sms_verifications') || '[]');
      const last = log.findLast(a => a.phone === phone && a.purpose === purpose);
      if (last) { last.verified = true; last.verifiedAt = new Date().toISOString(); }
      localStorage.setItem('sms_verifications', JSON.stringify(log));
      if (onVerified) onVerified({ phone, purpose, verifiedAt: new Date().toISOString() });
    } else { setError('Código inválido / Invalid code'); }
  };

  if (verified) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#000000', border: '1px solid #166534' }}>
      <span style={{ color: '#4ade80', fontSize: '16px' }}>✓</span>
      <div><div style={{ ...G, fontSize: '12px', color: '#4ade80' }}>Teléfono Verificado / Phone Verified</div><div style={{ ...G, fontSize: '10px', color: 'rgba(148,163,184,0.5)' }}>{phone}</div></div>
    </div>
  );

  return (
    <div style={{ background: '#000000', border: '1px solid #334155', padding: '16px' }}>
      <div style={{ ...G, fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '12px' }}>VERIFICACIÓN SMS / SMS VERIFICATION</div>
      {!sent ? (
        <div>
          <div style={{ ...G, fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>Se enviará código a / Code will be sent to: <strong style={{ color: '#cba658' }}>{phone || 'N/A'}</strong></div>
          <button onClick={sendCode} style={BTN('#b8944d', '#cba658', '#0f172a')}>ENVIAR CÓDIGO / SEND CODE</button>
        </div>
      ) : (
        <div>
          <div style={{ ...G, fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>Ingrese código de 6 dígitos / Enter 6-digit code — <strong style={{ color: '#cba658' }}>{phone}</strong></div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <input type="text" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" maxLength={6} style={{ ...INPUT, width: '160px', textAlign: 'center', fontSize: '20px', letterSpacing: '8px', fontFamily: 'monospace' }} />
            <button onClick={verify} disabled={code.length !== 6} style={BTN(code.length === 6 ? '#22c55e' : '#1e293b', code.length === 6 ? '#4ade80' : '#334155', code.length === 6 ? '#0f172a' : '#64748b')}>VERIFICAR</button>
          </div>
          {error && <div style={{ color: '#f87171', fontSize: '11px', marginBottom: '6px' }}>{error}</div>}
          <div style={{ ...G, fontSize: '10px', color: 'rgba(148,163,184,0.4)' }}>{countdown > 0 ? `Reenviar en ${countdown}s` : <button onClick={sendCode} style={{ background: 'none', border: 'none', color: '#cba658', fontSize: '10px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Reenviar / Resend</button>}</div>
          <div style={{ marginTop: '8px', padding: '6px 10px', background: '#000000', border: '1px solid #4c1d95' }}>
            <span style={{ ...G, fontSize: '8px', color: '#a78bfa', letterSpacing: '1px' }}>DEV — Code: <strong style={{ fontSize: '12px', letterSpacing: '3px' }}>{genCode}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// 3. DOCUMENT TEMPLATES — 25+ Bilingual Real Estate Documents
// ================================================================
const NOW = () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const REF = (pre) => `${pre}-${Date.now().toString(36).toUpperCase()}`;
const USD = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });

const TEMPLATES = {
  // ======== AGENT DOCUMENTS ========
  agent_commission: { title: 'Independent Agent Commission Agreement', titleEs: 'Acuerdo de Comisión de Agente Independiente', cat: 'agent', sig: true, sms: true, notary: false,
    gen: (d) => `INDEPENDENT AGENT COMMISSION AGREEMENT\nACUERDO DE COMISIÓN DE AGENTE INDEPENDIENTE\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('AGT')}\n\nBETWEEN/ENTRE:\nEnjoyBaja Real Estate Platform — CM Products International\ninfo@enjoybaja.com | WhatsApp: +52-646-340-2686\n\nAND/Y:\nAgent/Agente: ${d.agentName||'_____'}\nEmail: ${d.agentEmail||'_____'}  |  Tel: ${d.agentPhone||'_____'}\nLicense/Licencia: ${d.agentLicense||'N/A'}\n\n1. PLATFORM FEE / TARIFA DE PLATAFORMA:\n   • Sales under $250,000 USD / Ventas menores a $250,000 USD: 2%\n   • Sales over $250,000 USD / Ventas mayores a $250,000 USD: 3%\n\n2. AGENT COMMISSION / COMISIÓN DEL AGENTE:\n   Agent Rate / Tasa del Agente: ${d.agentRate||'___'}% (in addition to / además de platform fee)\n\n3. TOTAL: Under $250K = ${2+parseFloat(d.agentRate||0)}% | Over $250K = ${3+parseFloat(d.agentRate||0)}%\n\n4. PAYMENT/PAGO: Earned at closing of escrow/fideicomiso. Agent paid within 15 business days.\n   Comisiones devengadas al cierre. Agente pagado dentro de 15 días hábiles.\n\n5. TERM/VIGENCIA: 12 months, 30-day written notice to terminate.\n   12 meses, aviso por escrito de 30 días para terminar.\n\n6. INDEPENDENT CONTRACTOR: Agent is not employee of Platform.\n   CONTRATISTA INDEPENDIENTE: Agente no es empleado de la Plataforma.\n\n7. GOVERNING LAW: Laws of Mexico, State of Baja California. Courts of Ensenada.\n   LEY APLICABLE: Leyes de México, Estado de Baja California. Tribunales de Ensenada.\n\nFIRMA DEL AGENTE / AGENT SIGNATURE: ________________________\nFIRMA DE PLATAFORMA / PLATFORM: ________________________\nDate/Fecha: ${NOW()}` },

  agent_nda: { title: 'Non-Disclosure Agreement (NDA)', titleEs: 'Acuerdo de Confidencialidad', cat: 'agent', sig: true, sms: false, notary: false,
    gen: (d) => `NON-DISCLOSURE AND CONFIDENTIALITY AGREEMENT\nACUERDO DE NO DIVULGACIÓN Y CONFIDENCIALIDAD\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('NDA')}\n\nBETWEEN/ENTRE: EnjoyBaja Real Estate Platform\nAND/Y: ${d.agentName||'_____'} (${d.agentEmail||'_____'})\n\n1. CONFIDENTIAL INFORMATION / INFORMACIÓN CONFIDENCIAL includes/incluye:\n   • Client lists, contacts, transaction histories / Listas de clientes, contactos, historiales\n   • Unpublished listings, pricing strategies / Listados no publicados, estrategias de precios\n   • Lender relationships, internal financials / Relaciones con prestamistas, finanzas internas\n   • Platform technology, proprietary methods / Tecnología de plataforma, métodos propietarios\n\n2. OBLIGATIONS/OBLIGACIONES: No disclosure to third parties. Use only for Platform business.\n   No divulgar a terceros. Usar solo para negocios de la Plataforma.\n\n3. DURATION/DURACIÓN: 3 years after termination / 3 años después de terminación\n\n4. BREACH/INCUMPLIMIENTO: Immediate termination, legal action, damages.\n   Terminación inmediata, acción legal, daños y perjuicios.\n\nFIRMA / SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  agent_terms: { title: 'Platform Terms of Service', titleEs: 'Términos de Servicio de Plataforma', cat: 'agent', sig: true, sms: false, notary: false,
    gen: (d) => `ENJOYBAJA PLATFORM TERMS OF SERVICE\nTÉRMINOS DE SERVICIO DE LA PLATAFORMA\n\nEffective/Vigente: ${NOW()}  |  Agent/Agente: ${d.agentName||'_____'}\n\n1. Acceptable Use / Uso Aceptable: Legitimate real estate transactions only.\n2. Listing Accuracy / Precisión: All listings must be accurate and current.\n3. Compliance / Cumplimiento: All applicable laws of Mexico and USA.\n4. Data Protection / Protección de Datos: Per applicable privacy laws.\n5. Anti-Money Laundering / Anti-Lavado: No suspicious transactions.\n6. Platform Integrity / Integridad: No circumventing fees or diverting clients.\n7. Termination / Terminación: Platform reserves right to terminate for violations.\n\nACCEPTED/ACEPTADO: ${d.agentName||'_____'}\nFIRMA / SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  // ======== FSBO SELLER DOCUMENTS ========
  fsbo_listing: { title: 'FSBO Exclusive Listing Agreement', titleEs: 'Acuerdo Exclusivo de Listado FSBO', cat: 'fsbo', sig: true, sms: true, notary: false,
    gen: (d) => `FOR SALE BY OWNER — EXCLUSIVE LISTING AGREEMENT\nVENTA POR PROPIETARIO — ACUERDO EXCLUSIVO DE LISTADO\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('FSBO')}\n\nPROPERTY/PROPIEDAD: ${d.propertyAddress||'_____'}, ${d.city||''}, ${d.state||'Baja California'}\nASKING PRICE/PRECIO: ${USD(d.askingPrice)}\n\nSELLER/VENDEDOR: ${d.sellerName||'_____'}\nEmail: ${d.sellerEmail||'_____'}  |  Tel: ${d.sellerPhone||'_____'}\nID/Identificación: ${d.sellerID||'_____'}\n\nPLATFORM COMMISSION/COMISIÓN:\n• Under $250,000 USD: 2% = ${USD(parseFloat(d.askingPrice||0)*0.02)}\n• Over $250,000 USD: 3% = ${USD(parseFloat(d.askingPrice||0)*0.03)}\nYOUR RATE/SU TASA: ${parseFloat(d.askingPrice||0) > 250000 ? '3' : '2'}% = ${USD(parseFloat(d.askingPrice||0) * (parseFloat(d.askingPrice||0) > 250000 ? 0.03 : 0.02))}\n\nTERMS/TÉRMINOS:\n1. Listing period: 180 days, renewable / Período: 180 días, renovable\n2. Commission earned at closing / Comisión al cierre de fideicomiso\n3. Platform authorized to market on enjoybaja.com and partners\n4. Seller warrants legal ownership / Vendedor garantiza propiedad legal\n5. Agent commission is SEPARATE / Comisión de agente es SEPARADA\n6. Cancel with 30-day written notice / Cancelar con aviso de 30 días\n\nNOTE/NOTA: In Mexico, all transfers require Notary Public / Notario Público.\n\nFIRMA DEL VENDEDOR / SELLER SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  fsbo_disclosure: { title: 'Property Condition Disclosure', titleEs: 'Divulgación del Estado de la Propiedad', cat: 'fsbo', sig: true, sms: false, notary: false,
    gen: (d) => `PROPERTY CONDITION DISCLOSURE STATEMENT\nDECLARACIÓN DE DIVULGACIÓN DEL ESTADO DE LA PROPIEDAD\n\nProperty/Propiedad: ${d.propertyAddress||'_____'}\nSeller/Vendedor: ${d.sellerName||'_____'}\nDate/Fecha: ${NOW()}\n\nThe Seller discloses known conditions / El Vendedor divulga condiciones conocidas:\n\n□ Structural / Estructural: _______________\n□ Plumbing / Plomería: _______________\n□ Electrical / Eléctrico: _______________\n□ Roof / Techo: _______________\n□ Water Damage / Daño por Agua: _______________\n□ Pests / Plagas: _______________\n□ Environmental / Ambiental: _______________\n□ Legal Encumbrances / Gravámenes: _______________\n□ Fideicomiso Status: _______________\n□ Property Taxes / Impuestos: _______________\n□ HOA / Cuotas de Condominio: _______________\n□ Permits / Permisos: _______________\n□ Flood Zone / Zona de Inundación: _______________\n□ Seismic Risk / Riesgo Sísmico: _______________\n\nSeller certifies accuracy / Vendedor certifica precisión.\n\nFIRMA / SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  // ======== BUYER DOCUMENTS ========
  buyer_representation: { title: 'Buyer Representation Agreement', titleEs: 'Acuerdo de Representación del Comprador', cat: 'buyer', sig: true, sms: true, notary: false,
    gen: (d) => `BUYER REPRESENTATION AGREEMENT\nACUERDO DE REPRESENTACIÓN DEL COMPRADOR\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('BRA')}\n\nBUYER/COMPRADOR: ${d.buyerName||'_____'}\nEmail: ${d.buyerEmail||'_____'}  |  Tel: ${d.buyerPhone||'_____'}\nNationality/Nacionalidad: ${d.buyerNationality||'_____'}\n\n1. REPRESENTATION: EnjoyBaja represents Buyer in locating and negotiating purchase in Baja California.\n   EnjoyBaja representa al Comprador en la búsqueda y negociación de compra en Baja California.\n\n2. BUYER OBLIGATIONS / OBLIGACIONES:\n   • Work exclusively through Platform / Trabajar exclusivamente a través de la Plataforma\n   • Provide accurate financial information / Proporcionar información financiera precisa\n   • Respond within 48 hours during negotiations / Responder en 48 horas durante negociaciones\n\n3. COMMISSION: Typically paid by Seller. If not, Buyer notified before offer.\n   COMISIÓN: Típicamente pagada por el Vendedor. Si no, Comprador notificado antes de oferta.\n\n4. FIDEICOMISO: Foreign buyers in restricted zone require bank trust.\n   Compradores extranjeros en zona restringida requieren fideicomiso.\n\n5. DURATION/DURACIÓN: 90 days, renewable / 90 días, renovable\n\nFIRMA / SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  buyer_offer_loi: { title: 'Letter of Intent / Offer to Purchase', titleEs: 'Carta de Intención / Oferta de Compra', cat: 'buyer', sig: true, sms: true, notary: true,
    gen: (d) => `LETTER OF INTENT TO PURCHASE\nCARTA DE INTENCIÓN DE COMPRA\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('LOI')}\n\nFROM/DE: ${d.buyerName||'_____'} ("Buyer/Comprador")\nTO/PARA: ${d.sellerName||'_____'} ("Seller/Vendedor")\n\nPROPERTY/PROPIEDAD: ${d.propertyAddress||'_____'}\nOFFER PRICE/PRECIO: ${USD(d.offerPrice)}\nEARNEST DEPOSIT/DEPÓSITO: ${USD(d.deposit)}\n\nCONTINGENCIES/CONTINGENCIAS:\n□ Property inspection within 15 days / Inspección en 15 días\n□ Title search / Búsqueda de título\n□ Fideicomiso approval (if applicable / si aplica)\n□ Financing approval within 30 days / Aprobación de financiamiento en 30 días\n□ Appraisal / Avalúo\n\nCLOSING/CIERRE: Within 60 days / Dentro de 60 días\nEXPIRES/VENCE: 5 business days / 5 días hábiles\n\nNOTE: Final agreement before Notary Public / Contrato final ante Notario Público.\n\nFIRMA DEL COMPRADOR / BUYER SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  // ======== SALES CONTRACTS ========
  purchase_agreement: { title: 'Real Estate Purchase Agreement', titleEs: 'Contrato de Compraventa de Inmueble', cat: 'contract', sig: true, sms: true, notary: true,
    gen: (d) => `REAL ESTATE PURCHASE AND SALE AGREEMENT\nCONTRATO DE COMPRAVENTA DE BIEN INMUEBLE\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('PSA')}\n\nSELLER/VENDEDOR: ${d.sellerName||'_____'} (ID: ${d.sellerID||'_____'})\nBUYER/COMPRADOR: ${d.buyerName||'_____'} (ID: ${d.buyerID||'_____'})\n\nPROPERTY/PROPIEDAD: ${d.propertyAddress||'_____'}\nMunicipio: ${d.city||'_____'}, ${d.state||'Baja California'}\nRegistro Público #: ${d.registryNumber||'_____'}\n\nPURCHASE PRICE/PRECIO: ${USD(d.purchasePrice)}\n\nPAYMENT STRUCTURE / ESTRUCTURA DE PAGO:\n1. Earnest Money/Arras: ${USD(d.deposit)} due at signing / al firmar\n2. Down Payment/Enganche: ${USD(d.downPayment)} due at _______________\n3. Balance/Saldo: ${USD(parseFloat(d.purchasePrice||0) - parseFloat(d.deposit||0) - parseFloat(d.downPayment||0))} at closing / al cierre\n4. Financing/Financiamiento: ${d.financing||'Cash / Efectivo'}\n\nCOMMISSIONS / COMISIONES:\n• Platform Fee / Tarifa de Plataforma: ${parseFloat(d.purchasePrice||0) > 250000 ? '3' : '2'}% (${USD(parseFloat(d.purchasePrice||0) * (parseFloat(d.purchasePrice||0) > 250000 ? 0.03 : 0.02))})\n• Agent Commission / Comisión de Agente: ${d.agentRate||'___'}%\n• Paid by / Pagado por: ${d.commissionPaidBy||'Seller / Vendedor'}\n\nCONDITIONS / CONDICIONES:\n1. Clear title / Título limpio\n2. Property delivered in current condition / Propiedad entregada en condición actual\n3. All liens and encumbrances removed / Todos los gravámenes eliminados\n4. Fideicomiso transfer (if applicable / si aplica)\n5. Notary fees split: ${d.notaryFeeSplit||'50/50 Buyer-Seller'}\n\nCLOSING DATE / FECHA DE CIERRE: ${d.closingDate||'_____'}\nNOTARY / NOTARIO: ${d.notaryName||'_____'}, Notaría #${d.notaryNumber||'___'}\n\nTHIS CONTRACT IS BINDING / ESTE CONTRATO ES VINCULANTE\n\nFIRMA VENDEDOR / SELLER: ________________________\nFIRMA COMPRADOR / BUYER: ________________________\nFIRMA NOTARIO / NOTARY: ________________________\nDate/Fecha: ${NOW()}` },

  lease_agreement: { title: 'Residential Lease Agreement', titleEs: 'Contrato de Arrendamiento Residencial', cat: 'contract', sig: true, sms: false, notary: false,
    gen: (d) => `RESIDENTIAL LEASE AGREEMENT\nCONTRATO DE ARRENDAMIENTO RESIDENCIAL\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('LSE')}\n\nLANDLORD/ARRENDADOR: ${d.landlordName||'_____'}\nTENANT/ARRENDATARIO: ${d.tenantName||'_____'}\n\nPROPERTY/PROPIEDAD: ${d.propertyAddress||'_____'}\n\nMONTHLY RENT / RENTA MENSUAL: ${USD(d.monthlyRent)} ${d.currency||'USD'}\nSECURITY DEPOSIT / DEPÓSITO: ${USD(d.securityDeposit)}\nLEASE TERM / PLAZO: ${d.leaseTerm||'12 months / 12 meses'}\nSTART DATE / INICIO: ${d.startDate||'_____'}\n\nTERMS / TÉRMINOS:\n1. Rent due 1st of each month / Renta al 1ro de cada mes\n2. Late fee after 5th: ${d.lateFee||'5%'}\n3. Utilities paid by tenant / Servicios pagados por arrendatario\n4. No subletting without written consent / No subarrendar sin consentimiento\n5. Maintenance of premises / Mantenimiento del inmueble\n6. 30-day notice to vacate / Aviso de 30 días para desalojar\n\nFIRMA ARRENDADOR / LANDLORD: ________________________\nFIRMA ARRENDATARIO / TENANT: ________________________` },

  // ======== ESCROW & TITLE ========
  escrow_instructions: { title: 'Escrow Instructions', titleEs: 'Instrucciones de Fideicomiso / Escrow', cat: 'escrow', sig: true, sms: true, notary: true,
    gen: (d) => `ESCROW INSTRUCTIONS\nINSTRUCCIONES DE ESCROW / FIDEICOMISO\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('ESC')}\nEscrow Officer / Oficial: ${d.escrowOfficer||'_____'}\nTitle Company / Compañía de Títulos: ${d.titleCompany||'First American Title'}\n\nPARTIES / PARTES:\nSeller/Vendedor: ${d.sellerName||'_____'}\nBuyer/Comprador: ${d.buyerName||'_____'}\n\nPROPERTY/PROPIEDAD: ${d.propertyAddress||'_____'}\nPURCHASE PRICE/PRECIO: ${USD(d.purchasePrice)}\n\nESCROW ACCOUNT / CUENTA ESCROW:\nBank/Banco: ${d.escrowBank||'_____'}\nAccount/Cuenta: ${d.escrowAccount||'_____'}\n\nDEPOSIT SCHEDULE / CALENDARIO DE DEPÓSITOS:\n1. Earnest Money: ${USD(d.deposit)} — Due: ${d.depositDue||'Within 3 business days'}\n2. Additional Deposit: ${USD(d.additionalDeposit||0)} — Due: ${d.addlDepositDue||'N/A'}\n3. Balance: ${USD(parseFloat(d.purchasePrice||0) - parseFloat(d.deposit||0) - parseFloat(d.additionalDeposit||0))} — Due at closing\n\nCONDITIONS FOR RELEASE / CONDICIONES PARA LIBERACIÓN:\n□ Clear title confirmed / Título limpio confirmado\n□ All contingencies removed / Todas las contingencias removidas\n□ Notary execution complete / Ejecución notarial completa\n□ Fideicomiso transfer recorded / Transferencia de fideicomiso registrada\n□ All commissions calculated and disbursed / Comisiones calculadas y distribuidas\n\nDISBURSEMENTS / DISTRIBUCIÓN:\n• Seller proceeds: ${USD(parseFloat(d.purchasePrice||0) * 0.94)}\n• Platform fee: ${parseFloat(d.purchasePrice||0) > 250000 ? '3' : '2'}%\n• Agent commission: ${d.agentRate||'___'}%\n• Notary fees: Estimated ${d.notaryFeeEstimate||'3-6%'}\n• Title insurance: ${USD(d.titleInsurance||0)}\n\nFIRMA / SIGNATURES:\nSeller: ________________________  Buyer: ________________________\nEscrow Officer: ________________________\nDate/Fecha: ${NOW()}` },

  title_order: { title: 'Preliminary Title Report Order', titleEs: 'Orden de Reporte Preliminar de Título', cat: 'escrow', sig: true, sms: false, notary: false,
    gen: (d) => `PRELIMINARY TITLE REPORT ORDER\nORDEN DE REPORTE PRELIMINAR DE TÍTULO\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('TTL')}\n\nORDERED BY / SOLICITADO POR: EnjoyBaja Real Estate Platform\nTITLE COMPANY / COMPAÑÍA: ${d.titleCompany||'First American Title'}\n\nPROPERTY/PROPIEDAD: ${d.propertyAddress||'_____'}\nMunicipio: ${d.city||'_____'}, ${d.state||'Baja California'}\nRegistro Público / Public Registry #: ${d.registryNumber||'_____'}\nCatastro / Cadastral #: ${d.cadastralNumber||'_____'}\n\nCURRENT OWNER / PROPIETARIO ACTUAL: ${d.currentOwner||'_____'}\nFIDEICOMISO #: ${d.fideicomisoNumber||'N/A'}\nFIDEICOMISO BANK / BANCO: ${d.fideicomisoBank||'N/A'}\n\nREPORT MUST INCLUDE / EL REPORTE DEBE INCLUIR:\n1. Chain of title for last 20 years / Cadena de título últimos 20 años\n2. Current liens and encumbrances / Gravámenes actuales\n3. Property tax status / Estado de impuestos\n4. Easements and restrictions / Servidumbres y restricciones\n5. Legal description / Descripción legal\n6. Survey/plat reference / Referencia de plano\n7. Fideicomiso status and terms / Estado y términos del fideicomiso\n8. Zona federal maritime status / Estado de zona federal marítima\n9. Environmental restrictions / Restricciones ambientales\n10. Pending legal actions / Acciones legales pendientes\n\nDELIVERY / ENTREGA: ${d.deliveryDate||'Within 10 business days / En 10 días hábiles'}\n\nAUTHORIZED BY / AUTORIZADO POR: ________________________\nDate/Fecha: ${NOW()}` },

  title_insurance: { title: 'Title Insurance Application', titleEs: 'Solicitud de Seguro de Título', cat: 'escrow', sig: true, sms: false, notary: false,
    gen: (d) => `TITLE INSURANCE APPLICATION\nSOLICITUD DE SEGURO DE TÍTULO\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('TIA')}\n\nINSURER / ASEGURADORA: ${d.insurer||'Stewart Title / First American Title'}\nAPPLICANT / SOLICITANTE: ${d.buyerName||'_____'}\n\nPROPERTY/PROPIEDAD: ${d.propertyAddress||'_____'}\nPURCHASE PRICE / PRECIO: ${USD(d.purchasePrice)}\nPOLICY AMOUNT / MONTO DE PÓLIZA: ${USD(d.purchasePrice)}\n\nCOVERAGE REQUESTED / COBERTURA SOLICITADA:\n□ Owner's Policy / Póliza del Propietario\n□ Lender's Policy / Póliza del Prestamista\n□ Enhanced Coverage / Cobertura Mejorada\n\nNOTE: Title insurance for Mexico properties is available through US-based companies.\nNOTA: El seguro de título para propiedades en México está disponible a través de compañías estadounidenses.\n\nAPPLICANT SIGNATURE / FIRMA: ________________________\nDate/Fecha: ${NOW()}` },

  // ======== APPRAISAL ========
  appraisal_order: { title: 'Appraisal Order Form', titleEs: 'Orden de Avalúo', cat: 'appraisal', sig: true, sms: false, notary: false,
    gen: (d) => `APPRAISAL ORDER FORM\nORDEN DE AVALÚO INMOBILIARIO\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('APR')}\n\nORDERED BY / SOLICITADO POR: ${d.orderedBy||'EnjoyBaja Real Estate'}\nAPPRAISER / VALUADOR: ${d.appraiser||'_____'}\nLicense / Licencia: ${d.appraiserLicense||'_____'}\n\nPROPERTY / PROPIEDAD:\nAddress / Dirección: ${d.propertyAddress||'_____'}\nCity / Ciudad: ${d.city||'_____'}\nState / Estado: ${d.state||'Baja California'}\nType / Tipo: ${d.propertyType||'Residential / Residencial'}\n\nPURPOSE / PROPÓSITO: ${d.purpose||'Purchase / Compra'}\nESTIMATED VALUE / VALOR ESTIMADO: ${USD(d.estimatedValue)}\n\nSCOPE OF WORK / ALCANCE:\n1. Physical inspection of property / Inspección física del inmueble\n2. Comparable sales analysis (6 months) / Análisis de ventas comparables (6 meses)\n3. Market conditions assessment / Evaluación de condiciones de mercado\n4. Construction quality evaluation / Evaluación de calidad de construcción\n5. Land value assessment / Evaluación del valor del terreno\n6. Highest and best use analysis / Análisis de mayor y mejor uso\n7. Photo documentation (min 20 photos) / Documentación fotográfica (mín 20 fotos)\n\nDELIVERABLE / ENTREGABLE:\n• Full narrative appraisal report in English AND Spanish\n• Reporte completo de avalúo narrativo en Inglés Y Español\n• Comparable sales grid / Cuadro de ventas comparables\n• Subject property photos / Fotos del inmueble\n• Location maps / Mapas de ubicación\n\nFEE / HONORARIO: ${USD(d.appraisalFee||2500)}\nDELIVERY / ENTREGA: ${d.deliveryDays||'10-15'} business days / días hábiles\n\nAUTHORIZED / AUTORIZADO: ________________________\nDate/Fecha: ${NOW()}` },

  appraisal_report: { title: 'Appraisal Report Template', titleEs: 'Plantilla de Reporte de Avalúo', cat: 'appraisal', sig: true, sms: false, notary: false,
    gen: (d) => `REAL ESTATE APPRAISAL REPORT\nREPORTE DE AVALÚO INMOBILIARIO\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('AVL')}\nAppraiser/Valuador: ${d.appraiser||'_____'} (Lic: ${d.appraiserLicense||'_____'})\n\nSUBJECT PROPERTY / INMUEBLE SUJETO:\nAddress: ${d.propertyAddress||'_____'}\nType: ${d.propertyType||'_____'}  |  Year Built: ${d.yearBuilt||'_____'}\nLot Size: ${d.lotSize||'_____'} m²  |  Building: ${d.buildingSize||'_____'} m²\nBeds: ${d.beds||'_____'}  |  Baths: ${d.baths||'_____'}  |  Parking: ${d.parking||'_____'}\n\nVALUATION / VALORACIÓN:\n• Market Approach / Enfoque de Mercado: ${USD(d.marketValue)}\n• Cost Approach / Enfoque de Costo: ${USD(d.costValue)}\n• Income Approach / Enfoque de Ingresos: ${USD(d.incomeValue||'N/A')}\n\nFINAL APPRAISED VALUE / VALOR FINAL DE AVALÚO:\n${USD(d.appraisedValue)}\n\nCOMPARABLE SALES / VENTAS COMPARABLES:\n1. ${d.comp1||'_____'} — ${USD(d.comp1Price)} — ${d.comp1Date||'_____'}\n2. ${d.comp2||'_____'} — ${USD(d.comp2Price)} — ${d.comp2Date||'_____'}\n3. ${d.comp3||'_____'} — ${USD(d.comp3Price)} — ${d.comp3Date||'_____'}\n\nCONDITION/CONDICIÓN: ${d.condition||'Good / Bueno'}\nMARKET TREND/TENDENCIA: ${d.marketTrend||'Stable / Estable'}\n\nCERTIFICATION: I certify this appraisal was prepared per professional standards.\nCERTIFICACIÓN: Certifico que este avalúo fue preparado conforme a estándares profesionales.\n\nAPPRAISER SIGNATURE / FIRMA DEL VALUADOR: ________________________\nDate/Fecha: ${NOW()}` },

  // ======== LEGAL / MEXICO ========
  fideicomiso: { title: 'Fideicomiso (Bank Trust) Disclosure', titleEs: 'Divulgación de Fideicomiso Bancario', cat: 'legal', sig: true, sms: false, notary: true,
    gen: (d) => `FIDEICOMISO (BANK TRUST) DISCLOSURE\nDIVULGACIÓN DE FIDEICOMISO BANCARIO\n\nClient/Cliente: ${d.clientName||'_____'}\nProperty/Propiedad: ${d.propertyAddress||'_____'}\nDate/Fecha: ${NOW()}\n\nIMPORTANT / IMPORTANTE:\nUnder Mexican law (Article 27), foreign nationals cannot directly own property in the "restricted zone" (100km borders, 50km coastlines). Property held via bank trust = FIDEICOMISO.\n\nConforme a ley mexicana (Art. 27), extranjeros no pueden poseer directamente inmuebles en "zona restringida." La propiedad se mantiene en fideicomiso bancario.\n\nKEY FACTS / DATOS CLAVE:\n• Duration / Duración: 50 years, renewable / renovable\n• Annual Fee / Cuota Anual: $500-$2,000 USD\n• Setup Time / Tiempo de Constitución: 4-8 weeks / semanas\n• Setup Cost / Costo: $1,500-$3,500 USD (one-time / único)\n• Rights / Derechos: Full use, sale, lease, inheritance / Uso, venta, renta, herencia\n• Required / Requiere: SRE Permit / Permiso de la SRE\n\nBANKS / BANCOS: Banorte, BBVA, Scotiabank, Santander, HSBC\n\nACKNOWLEDGED / RECONOCIDO: ________________________\nDate/Fecha: ${NOW()}\n\nMUST BE NOTARIZED / DEBE SER NOTARIADO\nNotary/Notario: ________________________  Notaría #: ________` },

  notary_ack: { title: 'Notary Requirement Acknowledgment', titleEs: 'Reconocimiento de Requisito Notarial', cat: 'legal', sig: true, sms: false, notary: false,
    gen: (d) => `NOTARY REQUIREMENT ACKNOWLEDGMENT\nRECONOCIMIENTO DE REQUISITO NOTARIAL\n\nClient/Cliente: ${d.clientName||'_____'}\nDate/Fecha: ${NOW()}\n\nI acknowledge / Reconozco:\n\n1. All Mexico real estate transactions MUST be formalized before Notary Public.\n   Todas las transacciones inmobiliarias en México DEBEN formalizarse ante Notario Público.\n\n2. Mexican Notary is a legal officer, NOT merely a witness (unlike USA).\n   El Notario mexicano es un oficial legal, NO solo un testigo (a diferencia de EE.UU.).\n\n3. Notary verifies title, collects taxes, files with Public Registry.\n   El Notario verifica título, recauda impuestos, registra ante el Registro Público.\n\n4. Notary fees: 3-6% of property value, IN ADDITION to commissions.\n   Honorarios notariales: 3-6% del valor, ADEMÁS de comisiones.\n\n5. EnjoyBaja recommends qualified Notaries. Final selection is client's choice.\n   EnjoyBaja recomienda Notarios calificados. La selección final es del cliente.\n\n6. Digital signatures here are for PRELIMINARY agreements only.\n   Las firmas digitales aquí son SOLO para acuerdos preliminares.\n\nFIRMA / SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  cross_border: { title: 'Cross-Border Transaction Disclosure', titleEs: 'Divulgación de Transacción Transfronteriza', cat: 'legal', sig: true, sms: false, notary: false,
    gen: (d) => `CROSS-BORDER REAL ESTATE TRANSACTION DISCLOSURE\nDIVULGACIÓN DE TRANSACCIÓN INMOBILIARIA TRANSFRONTERIZA\n\nClient/Cliente: ${d.clientName||'_____'}\nCountry/País: ${d.clientCountry||'_____'}\nDate/Fecha: ${NOW()}\n\n1. CURRENCY / MONEDA: Transactions in USD or MXN. Exchange rate risk exists.\n2. TAXES / IMPUESTOS: Both US and Mexican obligations may apply. Consult cross-border advisor.\n3. FATCA: US persons must report foreign accounts (including fideicomiso) via FBAR.\n4. AML / ANTI-LAVADO: Source of funds verification required.\n5. TITLE INSURANCE / SEGURO DE TÍTULO: Available through US-based companies.\n6. FINANCING / FINANCIAMIENTO: Cross-border mortgages have different requirements.\n7. ESCROW: Not traditional in Mexico — fideicomiso serves similar function.\n8. CAPITAL GAINS / PLUSVALÍA: Mexico ISR tax and US capital gains may both apply.\n9. INHERITANCE / HERENCIA: Both countries' succession laws may apply.\n10. WIRE TRANSFERS: International wire fees and compliance delays expected.\n\nEnjoyBaja recommends legal and tax professionals in BOTH countries.\nEnjoyBaja recomienda profesionales legales y fiscales en AMBOS países.\n\nFIRMA / SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  power_of_attorney: { title: 'Limited Power of Attorney', titleEs: 'Poder Notarial Limitado', cat: 'legal', sig: true, sms: true, notary: true,
    gen: (d) => `LIMITED POWER OF ATTORNEY\nPODER NOTARIAL LIMITADO\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('POA')}\n\nGRANTOR / OTORGANTE: ${d.grantorName||'_____'}\nID: ${d.grantorID||'_____'}  |  Nationality: ${d.grantorNationality||'_____'}\n\nATTORNEY-IN-FACT / APODERADO: ${d.attorneyName||'_____'}\nID: ${d.attorneyID||'_____'}\n\nSCOPE / ALCANCE:\nThis power is LIMITED to the following real estate transaction:\nEste poder está LIMITADO a la siguiente transacción inmobiliaria:\n\nProperty/Propiedad: ${d.propertyAddress||'_____'}\nAction/Acción: ${d.action||'Purchase and execute fideicomiso / Comprar y ejecutar fideicomiso'}\n\nThis power EXPIRES / Este poder VENCE: ${d.expirationDate||'90 days from date / 90 días desde la fecha'}\n\nMUST BE NOTARIZED AND APOSTILLED\nDEBE SER NOTARIADO Y APOSTILLADO\n\nGRANTOR SIGNATURE / FIRMA DEL OTORGANTE: ________________________\nNOTARY / NOTARIO: ________________________  Notaría #: ________\nDate/Fecha: ${NOW()}` },

  anti_money_laundering: { title: 'AML / Source of Funds Declaration', titleEs: 'Declaración Anti-Lavado / Origen de Fondos', cat: 'legal', sig: true, sms: true, notary: false,
    gen: (d) => `ANTI-MONEY LAUNDERING — SOURCE OF FUNDS DECLARATION\nANTI-LAVADO DE DINERO — DECLARACIÓN DE ORIGEN DE FONDOS\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('AML')}\n\nDECLARANT / DECLARANTE: ${d.declarantName||'_____'}\nNationality / Nacionalidad: ${d.nationality||'_____'}\nID/Identificación: ${d.declarantID||'_____'}\n\nTRANSACTION / TRANSACCIÓN: Purchase of ${d.propertyAddress||'_____'}\nAMOUNT / MONTO: ${USD(d.transactionAmount)}\n\nSOURCE OF FUNDS / ORIGEN DE FONDOS:\n□ Employment Income / Ingresos por Empleo: _______________\n□ Business Income / Ingresos Empresariales: _______________\n□ Investment Returns / Rendimientos de Inversión: _______________\n□ Sale of Property / Venta de Propiedad: _______________\n□ Inheritance / Herencia: _______________\n□ Savings / Ahorros: _______________\n□ Other / Otro: _______________\n\nBANK / BANCO: ${d.bank||'_____'}\nACCOUNT / CUENTA: ${d.accountNumber||'_____'}\n\nI declare under penalty of perjury that the funds are from legitimate sources.\nDeclaro bajo protesta de decir verdad que los fondos provienen de fuentes legítimas.\n\nFIRMA / SIGNATURE: ________________________\nDate/Fecha: ${NOW()}` },

  // ======== PRELIMINARY REPORTS ========
  prelim_title_report: { title: 'Preliminary Title Report', titleEs: 'Reporte Preliminar de Título', cat: 'report', sig: false, sms: false, notary: false,
    gen: (d) => `PRELIMINARY TITLE REPORT\nREPORTE PRELIMINAR DE TÍTULO\n\nDate/Fecha: ${NOW()}  |  Report #: ${REF('PTR')}\nPrepared by / Preparado por: EnjoyBaja Real Estate Intelligence\n\n${'═'.repeat(60)}\nPROPERTY / PROPIEDAD\n${'═'.repeat(60)}\nAddress / Dirección: ${d.propertyAddress||'_____'}\nMunicipio: ${d.city||'_____'}, ${d.state||'Baja California'}\nRegistro Público #: ${d.registryNumber||'_____'}\nCatastro #: ${d.cadastralNumber||'_____'}\nLot Size / Superficie: ${d.lotSize||'_____'} m²\nZoning / Uso de Suelo: ${d.zoning||'_____'}\n\n${'═'.repeat(60)}\nOWNERSHIP / TITULARIDAD\n${'═'.repeat(60)}\nCurrent Owner / Propietario: ${d.currentOwner||'_____'}\nOwnership Type / Tipo: ${d.ownershipType||'Fee Simple / Pleno Dominio'}\nFideicomiso #: ${d.fideicomisoNumber||'N/A'}\nFideicomiso Bank / Banco: ${d.fideicomisoBank||'N/A'}\nExpiration / Vencimiento: ${d.fideicomisoExpiry||'N/A'}\n\n${'═'.repeat(60)}\nCHAIN OF TITLE (Last 20 Years) / CADENA DE TÍTULO\n${'═'.repeat(60)}\n${d.chainOfTitle||'1. _____ to _____ — Date: _____ — Deed #: _____\n2. _____ to _____ — Date: _____ — Deed #: _____'}\n\n${'═'.repeat(60)}\nLIENS & ENCUMBRANCES / GRAVÁMENES\n${'═'.repeat(60)}\n${d.liens||'□ None found / Ninguno encontrado'}\n\n${'═'.repeat(60)}\nTAX STATUS / ESTADO FISCAL\n${'═'.repeat(60)}\nProperty Tax / Predial: ${d.taxStatus||'Current / Al corriente'}\nLast Paid / Último Pago: ${d.lastTaxPaid||'_____'}\nAnnual Amount / Monto Anual: ${USD(d.annualTax)}\n\n${'═'.repeat(60)}\nEASEMENTS & RESTRICTIONS / SERVIDUMBRES Y RESTRICCIONES\n${'═'.repeat(60)}\n${d.easements||'□ None found / Ninguno encontrado'}\n\n${'═'.repeat(60)}\nZONA FEDERAL MARÍTIMA STATUS\n${'═'.repeat(60)}\n${d.zofemat||'Not applicable / No aplica'}\n\n${'═'.repeat(60)}\nTITLE OPINION / OPINIÓN DE TÍTULO\n${'═'.repeat(60)}\n${d.titleOpinion||'Title appears clear and marketable, subject to standard exceptions.\nEl título parece limpio y comercializable, sujeto a excepciones estándar.'}\n\nPREPARED BY / PREPARADO POR: ________________________\nDate/Fecha: ${NOW()}\n\nTHIS IS A PRELIMINARY REPORT — NOT A GUARANTEE OF TITLE\nESTE ES UN REPORTE PRELIMINAR — NO ES GARANTÍA DE TÍTULO` },

  property_report: { title: 'Comprehensive Property Report', titleEs: 'Reporte Integral de Propiedad', cat: 'report', sig: false, sms: false, notary: false,
    gen: (d) => `COMPREHENSIVE PROPERTY REPORT\nREPORTE INTEGRAL DE PROPIEDAD\n\nDate/Fecha: ${NOW()}  |  Report #: ${REF('CPR')}\n\n${'═'.repeat(60)}\nPROPERTY OVERVIEW / RESUMEN\n${'═'.repeat(60)}\nAddress: ${d.propertyAddress||'_____'}\nType: ${d.propertyType||'_____'}  |  Year: ${d.yearBuilt||'_____'}\nLot: ${d.lotSize||'_____'} m²  |  Building: ${d.buildingSize||'_____'} m²\nBeds: ${d.beds||'_'}  |  Baths: ${d.baths||'_'}  |  Parking: ${d.parking||'_'}\n\n${'═'.repeat(60)}\nVALUATION / VALORACIÓN\n${'═'.repeat(60)}\nListing Price / Precio de Lista: ${USD(d.listingPrice)}\nEstimated Market Value / Valor Estimado: ${USD(d.estimatedValue)}\nPrice per m² / Precio por m²: ${USD(d.pricePerSqm)}\nComparable Range / Rango Comparable: ${USD(d.compLow)} — ${USD(d.compHigh)}\n\n${'═'.repeat(60)}\nLOCATION ANALYSIS / ANÁLISIS DE UBICACIÓN\n${'═'.repeat(60)}\nNeighborhood / Colonia: ${d.neighborhood||'_____'}\nProximity to Beach / Distancia a Playa: ${d.beachDistance||'_____'}\nNearby Amenities / Servicios Cercanos: ${d.amenities||'_____'}\nSchool District / Zona Escolar: ${d.schoolDistrict||'_____'}\nSafety Rating / Calificación de Seguridad: ${d.safetyRating||'_____'}\n\n${'═'.repeat(60)}\nINVESTMENT ANALYSIS / ANÁLISIS DE INVERSIÓN\n${'═'.repeat(60)}\nEstimated Monthly Rent / Renta Mensual Estimada: ${USD(d.estimatedRent)}\nCap Rate: ${d.capRate||'_____'}%\nROI (Annual): ${d.roi||'_____'}%\nAppreciation Trend / Tendencia: ${d.appreciationTrend||'_____'}\n\nGenerated by EnjoyBaja AI/SI Property Intelligence\nGenerado por Inteligencia de Propiedad AI/SI de EnjoyBaja` },

  // ======== COMMISSION & FINANCIAL ========
  commission_disbursement: { title: 'Commission Disbursement Statement', titleEs: 'Estado de Distribución de Comisiones', cat: 'financial', sig: true, sms: false, notary: false,
    gen: (d) => `COMMISSION DISBURSEMENT STATEMENT\nESTADO DE DISTRIBUCIÓN DE COMISIONES\n\nDate/Fecha: ${NOW()}  |  Ref: ${REF('CDS')}\nTransaction / Transacción: ${d.transactionRef||'_____'}\n\nPROPERTY / PROPIEDAD: ${d.propertyAddress||'_____'}\nSALE PRICE / PRECIO DE VENTA: ${USD(d.salePrice)}\nCLOSING DATE / FECHA DE CIERRE: ${d.closingDate||'_____'}\n\nCOMMISSION BREAKDOWN / DESGLOSE DE COMISIONES:\n\nPlatform Fee / Tarifa de Plataforma:\n  Rate / Tasa: ${parseFloat(d.salePrice||0) > 250000 ? '3' : '2'}%\n  Amount / Monto: ${USD(parseFloat(d.salePrice||0) * (parseFloat(d.salePrice||0) > 250000 ? 0.03 : 0.02))}\n\nListing Agent / Agente de Listado: ${d.listingAgent||'_____'}\n  Rate / Tasa: ${d.listingAgentRate||'___'}%\n  Amount / Monto: ${USD(parseFloat(d.salePrice||0) * parseFloat(d.listingAgentRate||0) / 100)}\n\nBuyer Agent / Agente del Comprador: ${d.buyerAgent||'_____'}\n  Rate / Tasa: ${d.buyerAgentRate||'___'}%\n  Amount / Monto: ${USD(parseFloat(d.salePrice||0) * parseFloat(d.buyerAgentRate||0) / 100)}\n\nTOTAL COMMISSIONS / TOTAL COMISIONES: ${USD(parseFloat(d.salePrice||0) * ((parseFloat(d.salePrice||0) > 250000 ? 0.03 : 0.02) + parseFloat(d.listingAgentRate||0)/100 + parseFloat(d.buyerAgentRate||0)/100))}\n\nNET TO SELLER / NETO AL VENDEDOR: ${USD(parseFloat(d.salePrice||0) - parseFloat(d.salePrice||0) * ((parseFloat(d.salePrice||0) > 250000 ? 0.03 : 0.02) + parseFloat(d.listingAgentRate||0)/100 + parseFloat(d.buyerAgentRate||0)/100))}\n\nAPPROVED / APROBADO: ________________________\nDate/Fecha: ${NOW()}` },

  invoice: { title: 'Platform Commission Invoice', titleEs: 'Factura de Comisión de Plataforma', cat: 'financial', sig: false, sms: false, notary: false,
    gen: (d) => `INVOICE / FACTURA\n\nEnjoyBaja Real Estate Platform\nCM Products International\nEnsenada, Baja California, Mexico\ninfo@enjoybaja.com | +52-646-340-2686\n\nDate/Fecha: ${NOW()}  |  Invoice #: ${REF('INV')}\n\nBILL TO / FACTURAR A:\n${d.billTo||'_____'}\n${d.billToAddress||'_____'}\n\nTRANSACTION / TRANSACCIÓN:\nProperty / Propiedad: ${d.propertyAddress||'_____'}\nSale Price / Precio: ${USD(d.salePrice)}\nClosing Date / Cierre: ${d.closingDate||'_____'}\n\nDESCRIPTION                                    AMOUNT\n─────────────────────────────────────────────────────\nPlatform Commission (${parseFloat(d.salePrice||0) > 250000 ? '3' : '2'}%)     ${USD(parseFloat(d.salePrice||0) * (parseFloat(d.salePrice||0) > 250000 ? 0.03 : 0.02))}\nIVA (16%)                                      ${USD(parseFloat(d.salePrice||0) * (parseFloat(d.salePrice||0) > 250000 ? 0.03 : 0.02) * 0.16)}\n─────────────────────────────────────────────────────\nTOTAL DUE / TOTAL                              ${USD(parseFloat(d.salePrice||0) * (parseFloat(d.salePrice||0) > 250000 ? 0.03 : 0.02) * 1.16)}\n\nPAYMENT / PAGO: Due at closing / Al cierre\n\nTHANK YOU / GRACIAS` }
};

// ================================================================
// 4. DOCUMENT SIGNING FLOW
// ================================================================
export function DocumentSigningFlow({ template, data, onComplete, onCancel }) {
  const [step, setStep] = useState(1);
  const [smsOk, setSmsOk] = useState(!template.sms);
  const [sig, setSig] = useState(null);

  const doc = template.gen(data);

  const finish = () => {
    const rec = { id: Date.now(), title: template.title, titleEs: template.titleEs, cat: template.cat, data, text: doc, signature: sig, smsVerified: smsOk, notary: template.notary, notarized: false, signedAt: new Date().toISOString(), signedBy: data.agentName || data.sellerName || data.buyerName || data.clientName || data.declarantName || 'Unknown' };
    const all = JSON.parse(localStorage.getItem('signed_documents') || '[]');
    all.push(rec); localStorage.setItem('signed_documents', JSON.stringify(all));
    if (onComplete) onComplete(rec);
    setStep(4);
  };

  return (
    <div style={{ background: '#000000', border: '1px solid #334155', padding: '24px' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
        {[1, 2, 3, 4].map(s => <div key={s} style={{ flex: 1, height: '3px', background: s <= step ? '#cba658' : '#1e293b' }} />)}
      </div>

      {step === 1 && (<div>
        <div style={{ ...G, fontSize: '14px', color: '#cba658', marginBottom: '2px' }}>{template.title}</div>
        <div style={{ ...G, fontSize: '11px', color: 'rgba(148,163,184,0.5)', marginBottom: '16px' }}>{template.titleEs}</div>
        <div style={{ background: '#000000', border: '1px solid #334155', padding: '16px', maxHeight: '400px', overflowY: 'auto', marginBottom: '16px' }}>
          <pre style={{ ...G, fontSize: '11px', color: '#8b9bb5', whiteSpace: 'pre-wrap', lineHeight: '1.6', margin: 0 }}>{doc}</pre>
        </div>
        {template.notary && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#000000', border: '1px solid #854d0e', marginBottom: '16px' }}><span>⚠</span><span style={{ ...G, fontSize: '11px', color: '#fbbf24' }}>Requiere Notarización / Requires Notarization</span></div>}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setStep(template.sms ? 2 : (template.sig ? 3 : 4))} style={BTN('#b8944d', '#cba658', '#0f172a')}>REVISADO — CONTINUAR / REVIEWED — CONTINUE</button>
          {onCancel && <button onClick={onCancel} style={BTN('#000000', '#475569', '#94a3b8')}>CANCELAR / CANCEL</button>}
        </div>
      </div>)}

      {step === 2 && (<div>
        <div style={{ ...G, fontSize: '14px', color: '#cba658', marginBottom: '16px' }}>Verificación Requerida / Verification Required</div>
        <SMSVerification phone={data.agentPhone || data.sellerPhone || data.buyerPhone || data.clientPhone || ''} purpose="document_signing" onVerified={() => { setSmsOk(true); setTimeout(() => setStep(3), 500); }} />
        {onCancel && <button onClick={onCancel} style={{ ...BTN('#0f172a', '#475569', '#94a3b8'), marginTop: '12px' }}>CANCELAR</button>}
      </div>)}

      {step === 3 && (<div>
        <div style={{ ...G, fontSize: '14px', color: '#cba658', marginBottom: '4px' }}>Firma Digital / Digital Signature</div>
        <div style={{ ...G, fontSize: '11px', color: 'rgba(148,163,184,0.5)', marginBottom: '16px' }}>Firme abajo para ejecutar este documento / Sign below to execute</div>
        <SignaturePad onSave={(s) => { setSig(s); finish(); }} />
        <button onClick={() => setStep(1)} style={{ ...BTN('#0f172a', '#475569', '#94a3b8'), marginTop: '12px' }}>← REGRESAR / BACK</button>
      </div>)}

      {step === 4 && (<div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>✓</div>
        <div style={{ ...G, fontSize: '16px', color: '#4ade80', marginBottom: '8px' }}>Documento Firmado / Document Signed</div>
        <div style={{ ...G, fontSize: '11px', color: 'rgba(148,163,184,0.5)', marginBottom: '4px' }}>{template.title} — {template.titleEs}</div>
        <div style={{ ...G, fontSize: '10px', color: 'rgba(148,163,184,0.4)' }}>{new Date().toLocaleString()} {smsOk ? '• SMS ✓' : ''} {template.notary ? '• Pendiente Notarización' : ''}</div>
        {sig && <div style={{ marginTop: '16px' }}><img src={sig} alt="Firma" style={{ maxWidth: '200px', border: '1px solid #334155' }} /></div>}
      </div>)}
    </div>
  );
}

// ================================================================
// 5. DOCUMENT CENTER — Full Admin View
// ================================================================
export function DocumentCenter() {
  const [tab, setTab] = useState('templates');
  const [cat, setCat] = useState('all');
  const [signingKey, setSigningKey] = useState(null);
  const [signedDocs, setSignedDocs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => { setSignedDocs(JSON.parse(localStorage.getItem('signed_documents') || '[]')); }, [signingKey]);

  const entries = Object.entries(TEMPLATES);
  const filtered = entries.filter(([k, t]) => (cat === 'all' || t.cat === cat) && (search === '' || t.title.toLowerCase().includes(search.toLowerCase()) || t.titleEs.toLowerCase().includes(search.toLowerCase())));

  const cats = [
    { id: 'all', l: 'ALL / TODOS', c: '#94a3b8' },
    { id: 'agent', l: 'AGENT', c: '#cba658' },
    { id: 'fsbo', l: 'FSBO', c: '#4ade80' },
    { id: 'buyer', l: 'BUYER', c: '#60a5fa' },
    { id: 'contract', l: 'CONTRACTS', c: '#f472b6' },
    { id: 'escrow', l: 'ESCROW/TITLE', c: '#c084fc' },
    { id: 'appraisal', l: 'APPRAISAL', c: '#fb923c' },
    { id: 'legal', l: 'LEGAL/MX', c: '#f87171' },
    { id: 'report', l: 'REPORTS', c: '#2dd4bf' },
    { id: 'financial', l: 'FINANCIAL', c: '#facc15' }
  ];

  if (signingKey) {
    const t = TEMPLATES[signingKey];
    return <DocumentSigningFlow template={t} data={{ agentName: 'Test', agentEmail: 'test@test.com', agentPhone: '+526461234567', propertyAddress: '123 Test, Ensenada BC', askingPrice: '350000', purchasePrice: '350000', salePrice: '350000', agentRate: '5', clientName: 'Test Client', sellerName: 'Test Seller', buyerName: 'Test Buyer', deposit: '35000', offerPrice: '340000' }} onComplete={() => setSigningKey(null)} onCancel={() => setSigningKey(null)} />;
  }

  return (
    <div style={{ background: '#000000', padding: '12px', margin: '-12px', minHeight: '300px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {[{ id: 'templates', l: `PLANTILLAS / TEMPLATES (${entries.length})`, c: '#cba658' }, { id: 'signed', l: `FIRMADOS / SIGNED (${signedDocs.length})`, c: '#4ade80' }, { id: 'sms', l: 'SMS LOG', c: '#a78bfa' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '6px 14px', background: '#000000', border: `1px solid ${tab === t.id ? t.c : '#1e293b'}`, borderRadius: '0', color: tab === t.id ? t.c : '#64748b', fontSize: '9px', letterSpacing: '1px', cursor: 'pointer', fontFamily: '"Helvetica Neue",sans-serif' }}>{t.l}</button>
        ))}
      </div>

      {/* TEMPLATES */}
      {tab === 'templates' && (<div>
        {/* Search */}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar documentos / Search documents..." style={{ ...INPUT, marginBottom: '12px', fontSize: '11px' }} />
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{ padding: '3px 8px', background: '#000000', border: `1px solid ${cat === c.id ? c.c : '#475569'}`, borderRadius: '0', color: cat === c.id ? c.c : '#64748b', fontSize: '9px', letterSpacing: '1px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Helvetica Neue",sans-serif' }}>{c.l}</button>
          ))}
        </div>
        {/* Document Cards */}
        <div style={{ display: 'grid', gap: '4px' }}>
          {filtered.map(([key, t]) => {
            const catInfo = cats.find(c => c.id === t.cat) || cats[0];
            return (
              <div key={key} style={{ ...CARD, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ ...G, fontSize: '12px', color: '#e2e8f0', fontWeight: '300', marginBottom: '2px' }}>{t.title}</div>
                  <div style={{ ...G, fontSize: '10px', color: 'rgba(148,163,184,0.45)', marginBottom: '6px' }}>{t.titleEs}</div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <span style={TAG(`${catInfo.c}10`, `${catInfo.c}30`, catInfo.c)}>{catInfo.l}</span>
                    {t.sig && <span style={TAG('#000000', '#8b7332', '#cba658')}>FIRMA</span>}
                    {t.sms && <span style={TAG('#000000', '#4c1d95', '#a78bfa')}>SMS</span>}
                    {t.notary && <span style={TAG('#000000', '#991b1b', '#f87171')}>NOTARIO</span>}
                  </div>
                </div>
                <button onClick={() => setSigningKey(key)} style={BTN('#000000', '#8b7332', '#cba658')}>PREVIEW</button>
              </div>
            );
          })}
        </div>
        <div style={{ ...G, fontSize: '9px', color: 'rgba(148,163,184,0.3)', marginTop: '12px', textAlign: 'center' }}>{filtered.length} of {entries.length} documents • EnjoyBaja Document Intelligence</div>
      </div>)}

      {/* SIGNED DOCS */}
      {tab === 'signed' && (<div>
        {signedDocs.length === 0 ? (
          <div style={{ ...CARD, padding: '40px', textAlign: 'center' }}><p style={{ ...G, fontSize: '12px', color: 'rgba(148,163,184,0.4)' }}>No hay documentos firmados / No signed documents yet</p></div>
        ) : (
          <div style={{ display: 'grid', gap: '4px' }}>
            {[...signedDocs].reverse().map((d, i) => (
              <div key={i} style={{ ...CARD, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #166534', background: '#000000' }}>
                <div>
                  <div style={{ ...G, fontSize: '12px', color: '#e2e8f0' }}>{d.title}</div>
                  <div style={{ ...G, fontSize: '10px', color: 'rgba(148,163,184,0.45)' }}>{d.titleEs}</div>
                  <div style={{ ...G, fontSize: '9px', color: 'rgba(148,163,184,0.35)', marginTop: '4px' }}>Firmado por / Signed by: {d.signedBy} • {new Date(d.signedAt).toLocaleString()}</div>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                    {d.smsVerified && <span style={TAG('#000000', '#166534', '#4ade80')}>SMS ✓</span>}
                    {d.notary && <span style={TAG(d.notarized ? '#0a1f15' : '#1a1608', d.notarized ? '#166534' : '#854d0e', d.notarized ? '#4ade80' : '#fbbf24')}>{d.notarized ? 'NOTARIADO ✓' : 'PENDIENTE NOTARIO'}</span>}
                  </div>
                </div>
                {d.signature && <img src={d.signature} alt="sig" style={{ width: '80px', height: '30px', objectFit: 'contain', border: '1px solid #1e293b' }} />}
              </div>
            ))}
          </div>
        )}
      </div>)}

      {/* SMS LOG */}
      {tab === 'sms' && (<div>
        {(() => {
          const log = JSON.parse(localStorage.getItem('sms_verifications') || '[]');
          return log.length === 0 ? (
            <div style={{ ...CARD, padding: '40px', textAlign: 'center' }}><p style={{ ...G, fontSize: '12px', color: 'rgba(148,163,184,0.4)' }}>No hay verificaciones SMS / No SMS verifications</p></div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={TH}>TELÉFONO</th><th style={TH}>PROPÓSITO</th><th style={TH}>ENVIADO</th><th style={TH}>ESTADO</th></tr></thead>
                <tbody>{[...log].reverse().map((s, i) => (
                  <tr key={i}>
                    <td style={TD}>{s.phone}</td>
                    <td style={{ ...TD, fontSize: '10px' }}>{s.purpose}</td>
                    <td style={{ ...TD, fontSize: '10px' }}>{new Date(s.sentAt).toLocaleString()}</td>
                    <td style={TD}><span style={TAG(s.verified ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)', s.verified ? 'rgba(74,222,128,0.3)' : 'rgba(251,191,36,0.3)', s.verified ? '#4ade80' : '#fbbf24')}>{s.verified ? 'VERIFICADO' : 'PENDIENTE'}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          );
        })()}
      </div>)}
    </div>
  );
}

// ================================================================
// EXPORTS
// ================================================================
export { TEMPLATES as DOCUMENT_TEMPLATES };
export default DocumentCenter;