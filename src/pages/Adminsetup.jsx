// =============================================
// ENJOYBAJA ADMIN DASHBOARD - FULL COMMAND CENTER
// OWNER: Full Access | SALES: CRM + Shared Calendar
// v3.0 - Command Center, Property CRUD, AI/SI, Agents, Marketing
// =============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ========== ZADARMA CONFIG ==========
const ZADARMA_CONFIG = {
  apiKey: '5765aborv0pw9ylc',
  apiSecret: '1fa016d4b2e7b173c188',
  baseUrl: 'https://api.zadarma.com',
  pbxNumber: '+526463402686'
};

// ========== CALENDAR CONFIG ==========
const CALENDAR_CONFIG = {
  ownerPrivate: 'sgarcia1911@gmail.com',
  teamShared: '982168e401754cc327337c323863b6c8de38ed85f70c04a620b6d593bd478d05@group.calendar.google.com'
};

// ========== STYLES ==========
const glassText = {
  fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: '100',
  color: 'rgba(203, 213, 225, 0.85)'
};

const styles = {
  accordion: { background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', marginBottom: '12px', backdropFilter: 'blur(20px)' },
  accordionHeader: { padding: '16px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', transition: 'all 0.2s' },
  accordionContent: { padding: '24px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' },
  statCard: { background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)', padding: '16px', textAlign: 'center' },
  button: { padding: '8px 16px', background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.25)', color: 'rgba(148, 163, 184, 0.8)', fontSize: '9px', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: '"Helvetica Neue", sans-serif' },
  buttonPrimary: { background: 'rgba(203, 166, 88, 0.15)', borderColor: 'rgba(203, 166, 88, 0.4)', color: '#cba658' },
  buttonSuccess: { background: 'rgba(74, 222, 128, 0.15)', borderColor: 'rgba(74, 222, 128, 0.4)', color: 'rgba(74, 222, 128, 0.9)' },
  buttonDanger: { background: 'rgba(248, 113, 113, 0.15)', borderColor: 'rgba(248, 113, 113, 0.4)', color: 'rgba(248, 113, 113, 0.9)' },
  input: { width: '100%', padding: '10px 14px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', color: 'rgba(226, 232, 240, 0.9)', fontSize: '12px', outline: 'none', fontFamily: '"Helvetica Neue", sans-serif', boxSizing: 'border-box' },
  th: { textAlign: 'left', padding: '12px 14px', fontSize: '8px', color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' },
  td: { padding: '12px 14px', fontSize: '11px', color: 'rgba(203, 213, 225, 0.8)', borderBottom: '1px solid rgba(148, 163, 184, 0.05)' },
  badge: { display: 'inline-block', padding: '3px 8px', fontSize: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }
};

// ========== ACCORDION COMPONENT ==========
function AccordionSection({ title, subtitle, icon, isOpen, onToggle, badge, locked, children }) {
  return (
    <div style={{ ...styles.accordion, ...(locked ? { opacity: 0.5, pointerEvents: 'none' } : {}) }}>
      <div style={{ ...styles.accordionHeader, background: isOpen ? 'rgba(203, 166, 88, 0.05)' : 'transparent' }} onClick={locked ? undefined : onToggle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '20px' }}>{icon}</span>
          <div>
            <h3 style={{ ...glassText, fontSize: '14px', letterSpacing: '2px', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              {title}
              {locked && <span style={{ fontSize: '10px', padding: '2px 8px', background: 'rgba(248, 113, 113, 0.15)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', letterSpacing: '1px' }}>OWNER ONLY</span>}
            </h3>
            {subtitle && <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)', margin: '4px 0 0' }}>{subtitle}</p>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {badge && <span style={{ ...styles.badge, background: 'rgba(203, 166, 88, 0.15)', color: '#cba658', border: '1px solid rgba(203, 166, 88, 0.3)' }}>{badge}</span>}
          {!locked && <span style={{ ...glassText, fontSize: '18px', color: 'rgba(203, 166, 88, 0.7)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>}
        </div>
      </div>
      {isOpen && !locked && <div style={styles.accordionContent}>{children}</div>}
    </div>
  );
}

// ================================================================
// COMMAND CENTER
// ================================================================
function CommandCenter({ navigate }) {
  const mx = JSON.parse(localStorage.getItem('mexico_properties') || '[]');
  const dev = JSON.parse(localStorage.getItem('development_properties') || '[]');
  const fsbo = JSON.parse(localStorage.getItem('fsbo_properties') || '[]');
  const pending = JSON.parse(localStorage.getItem('pending_agents') || '[]');
  const approved = JSON.parse(localStorage.getItem('approved_agents') || '[]');
  const camps = JSON.parse(localStorage.getItem('ad_campaigns') || '[]');
  const total = mx.length + dev.length + fsbo.length;
  const live = camps.filter(c => c.status === 'active').length;

  const modules = [
    { label: 'PROPERTIES', count: total, sub: `MX:${mx.length} DEV:${dev.length} US:${fsbo.length}`, color: '#cba658' },
    { label: 'REAL ESTATE', sub: 'Mexico Listings', color: '#60a5fa', path: '/mexico-real-estate' },
    { label: 'DEVELOPMENTS', count: dev.length, sub: 'New Projects', color: '#a78bfa', path: '/developments' },
    { label: 'MORTGAGE', sub: 'USA Lending', color: '#4ade80', path: '/usa-mortgage' },
    { label: 'URLA 1003', sub: 'Loan Apps', color: '#f472b6', path: '/1003-urla' },
    { label: 'LIFESTYLE', count: '246', sub: 'Baja Guide', color: '#fb923c', path: '/lifestyle' },
    { label: 'LUXURY GOODS', sub: 'Premium', color: '#e2e8f0', path: '/luxury-goods' },
    { label: 'AGENTS', count: `${pending.length} pend`, sub: `${approved.length} approved`, color: '#fbbf24' },
    { label: 'MARKETING', count: `${live} live`, sub: `${camps.length} total`, color: '#f472b6' },
    { label: 'CRM / PBX', sub: 'Zadarma VoIP', color: '#4ade80' },
    { label: 'AD PORTAL', sub: 'Self-Service', color: '#fb923c', path: '/advertise' },
    { label: 'UPLOAD', sub: 'Add Property', color: '#cba658', path: '/admin/property-upload' }
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        {modules.map((m, i) => (
          <div key={i} onClick={() => m.path && navigate(m.path)} style={{ ...styles.statCard, cursor: m.path ? 'pointer' : 'default', transition: 'all 0.2s' }}
            onMouseEnter={e => { if (m.path) { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)'; } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)'; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)'; }}>
            <div style={{ ...glassText, fontSize: '8px', letterSpacing: '2px', color: m.color, marginBottom: '6px' }}>{m.label}</div>
            {m.count != null && <div style={{ ...glassText, fontSize: '18px', color: 'rgba(226, 232, 240, 0.9)', marginBottom: '2px' }}>{m.count}</div>}
            <div style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)' }}>{m.sub}</div>
            {m.path && <div style={{ ...glassText, fontSize: '8px', color: m.color, marginTop: '6px' }}>OPEN →</div>}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/admin/property-upload')} style={{ ...styles.button, ...styles.buttonPrimary }}>+ UPLOAD PROPERTY</button>
        <button onClick={() => navigate('/agent/property-upload')} style={{ ...styles.button, ...styles.buttonSuccess }}>+ AGENT UPLOAD</button>
        <button onClick={() => navigate('/admin/marketing')} style={styles.button}>MARKETING</button>
        <button onClick={() => navigate('/admin/ads')} style={styles.button}>AD MGMT</button>
        <button onClick={() => navigate('/admin/vetting')} style={styles.button}>VETTING</button>
      </div>
    </div>
  );
}

// ================================================================
// PROPERTY MANAGER - Full CRUD
// ================================================================
function PropertyManager({ navigate }) {
  const [activeSection, setActiveSection] = useState('mexico');
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newProp, setNewProp] = useState({ title: '', location: '', price: '', beds: '', baths: '', sqft: '', type: 'house', description: '', status: 'active' });
  const [confirmDel, setConfirmDel] = useState(null);
  const keys = { mexico: 'mexico_properties', development: 'development_properties', fsbo: 'fsbo_properties' };

  const load = () => setProperties(JSON.parse(localStorage.getItem(keys[activeSection]) || '[]'));
  useEffect(() => { load(); }, [activeSection]);

  const save = (data) => { localStorage.setItem(keys[activeSection], JSON.stringify(data)); setProperties(data); };

  const handleAdd = () => {
    if (!newProp.title || !newProp.price || !newProp.location) { alert('Title, Price, Location required'); return; }
    save([...properties, { ...newProp, id: Date.now(), price: parseFloat(newProp.price), createdAt: new Date().toISOString(), uploadedBy: 'admin', photos: [] }]);
    setNewProp({ title: '', location: '', price: '', beds: '', baths: '', sqft: '', type: 'house', description: '', status: 'active' });
    setShowAdd(false);
  };

  const handleSaveEdit = () => {
    save(properties.map(p => p.id === editingId ? { ...editForm, price: parseFloat(editForm.price) } : p));
    setEditingId(null); setEditForm({});
  };

  const handleDelete = (id) => { save(properties.filter(p => p.id !== id)); setConfirmDel(null); };
  const toggleStatus = (id) => save(properties.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p));

  const handleAddPhotos = (propId, files) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProperties(prev => {
          const updated = prev.map(p => p.id === propId ? { ...p, photos: [...(p.photos || []), e.target.result] } : p);
          localStorage.setItem(keys[activeSection], JSON.stringify(updated));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (propId, idx) => {
    const updated = properties.map(p => {
      if (p.id === propId && p.photos) { const ph = [...p.photos]; ph.splice(idx, 1); return { ...p, photos: ph }; }
      return p;
    });
    save(updated);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {[{ id: 'mexico', l: 'MEXICO' }, { id: 'development', l: 'DEVELOPMENTS' }, { id: 'fsbo', l: 'FSBO USA' }].map(s => (
          <button key={s.id} onClick={() => { setActiveSection(s.id); setEditingId(null); setShowAdd(false); }} style={{ ...styles.button, ...(activeSection === s.id ? styles.buttonPrimary : {}) }}>
            {s.l} ({JSON.parse(localStorage.getItem(keys[s.id]) || '[]').length})
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button onClick={() => setShowAdd(!showAdd)} style={{ ...styles.button, ...styles.buttonSuccess }}>{showAdd ? 'CANCEL' : '+ QUICK ADD'}</button>
          <button onClick={() => navigate('/admin/property-upload')} style={{ ...styles.button, ...styles.buttonPrimary }}>FULL UPLOAD</button>
        </div>
      </div>

      {showAdd && (
        <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(74, 222, 128, 0.3)', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '10px' }}>
            <input placeholder="Title *" value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} style={styles.input} />
            <input placeholder="Location *" value={newProp.location} onChange={e => setNewProp({...newProp, location: e.target.value})} style={styles.input} />
            <input placeholder="Price USD *" type="number" value={newProp.price} onChange={e => setNewProp({...newProp, price: e.target.value})} style={styles.input} />
            <select value={newProp.type} onChange={e => setNewProp({...newProp, type: e.target.value})} style={styles.input}>
              <option value="house">House</option><option value="condo">Condo</option><option value="villa">Villa</option><option value="land">Land</option><option value="commercial">Commercial</option>
            </select>
            <input placeholder="Beds" type="number" value={newProp.beds} onChange={e => setNewProp({...newProp, beds: e.target.value})} style={styles.input} />
            <input placeholder="Baths" type="number" value={newProp.baths} onChange={e => setNewProp({...newProp, baths: e.target.value})} style={styles.input} />
          </div>
          <textarea placeholder="Description..." value={newProp.description} onChange={e => setNewProp({...newProp, description: e.target.value})} style={{ ...styles.input, minHeight: '50px', marginBottom: '10px' }} />
          <button onClick={handleAdd} style={{ ...styles.button, ...styles.buttonSuccess }}>SAVE PROPERTY</button>
        </div>
      )}

      {properties.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(30, 41, 59, 0.3)', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
          <p style={{ ...glassText, fontSize: '12px', color: 'rgba(148, 163, 184, 0.5)' }}>No properties yet</p>
          <button onClick={() => setShowAdd(true)} style={{ ...styles.button, ...styles.buttonPrimary, marginTop: '12px' }}>+ ADD FIRST PROPERTY</button>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              <th style={styles.th}>Title</th><th style={styles.th}>Location</th><th style={styles.th}>Price</th><th style={styles.th}>Type</th>
              <th style={styles.th}>Bd/Ba</th><th style={styles.th}>Photos</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th>
            </tr></thead>
            <tbody>
              {properties.map(p => (
                <tr key={p.id}>
                  {editingId === p.id ? (
                    <>
                      <td style={styles.td}><input value={editForm.title||''} onChange={e => setEditForm({...editForm, title: e.target.value})} style={{ ...styles.input, width: '130px' }} /></td>
                      <td style={styles.td}><input value={editForm.location||''} onChange={e => setEditForm({...editForm, location: e.target.value})} style={{ ...styles.input, width: '110px' }} /></td>
                      <td style={styles.td}><input type="number" value={editForm.price||''} onChange={e => setEditForm({...editForm, price: e.target.value})} style={{ ...styles.input, width: '90px' }} /></td>
                      <td style={styles.td}><select value={editForm.type||'house'} onChange={e => setEditForm({...editForm, type: e.target.value})} style={{ ...styles.input, width: '85px' }}>
                        <option value="house">House</option><option value="condo">Condo</option><option value="villa">Villa</option><option value="land">Land</option><option value="commercial">Commercial</option>
                      </select></td>
                      <td style={styles.td}><input value={editForm.beds||''} onChange={e => setEditForm({...editForm, beds: e.target.value})} style={{ ...styles.input, width: '35px', display: 'inline' }} />/<input value={editForm.baths||''} onChange={e => setEditForm({...editForm, baths: e.target.value})} style={{ ...styles.input, width: '35px', display: 'inline' }} /></td>
                      <td style={styles.td}>{p.photos?.length||0}</td>
                      <td style={styles.td}><button onClick={handleSaveEdit} style={{ ...styles.button, ...styles.buttonSuccess, padding: '4px 8px', fontSize: '8px' }}>SAVE</button></td>
                      <td style={styles.td}><button onClick={() => { setEditingId(null); setEditForm({}); }} style={{ ...styles.button, padding: '4px 6px', fontSize: '8px' }}>X</button></td>
                    </>
                  ) : (
                    <>
                      <td style={{ ...styles.td, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</td>
                      <td style={{ ...styles.td, fontSize: '10px' }}>{p.location}</td>
                      <td style={{ ...styles.td, color: '#4ade80', fontFamily: 'monospace' }}>${Number(p.price||0).toLocaleString()}</td>
                      <td style={styles.td}>{p.type}</td>
                      <td style={styles.td}>{p.beds||'-'}/{p.baths||'-'}</td>
                      <td style={styles.td}>
                        <span>{p.photos?.length||0} </span>
                        <label style={{ ...styles.button, padding: '2px 6px', fontSize: '7px', cursor: 'pointer', display: 'inline-block' }}>+<input type="file" multiple accept="image/*" onChange={e => handleAddPhotos(p.id, e.target.files)} style={{ display: 'none' }} /></label>
                      </td>
                      <td style={styles.td}>
                        <span onClick={() => toggleStatus(p.id)} style={{ ...styles.badge, cursor: 'pointer', background: p.status==='active'?'rgba(74,222,128,0.15)':'rgba(148,163,184,0.15)', color: p.status==='active'?'#4ade80':'rgba(148,163,184,0.6)', border: `1px solid ${p.status==='active'?'rgba(74,222,128,0.3)':'rgba(148,163,184,0.2)'}` }}>{p.status||'active'}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button onClick={() => { setEditingId(p.id); setEditForm({...p}); }} style={{ ...styles.button, ...styles.buttonPrimary, padding: '4px 8px', fontSize: '8px' }}>EDIT</button>
                          {confirmDel===p.id ? (
                            <><button onClick={() => handleDelete(p.id)} style={{ ...styles.button, ...styles.buttonDanger, padding: '4px 8px', fontSize: '8px' }}>YES</button><button onClick={() => setConfirmDel(null)} style={{ ...styles.button, padding: '4px 6px', fontSize: '8px' }}>NO</button></>
                          ) : (
                            <button onClick={() => setConfirmDel(p.id)} style={{ ...styles.button, ...styles.buttonDanger, padding: '4px 8px', fontSize: '8px' }}>DEL</button>
                          )}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingId && (properties.find(p=>p.id===editingId)?.photos||[]).length > 0 && (
        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)' }}>
          <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: '#cba658', marginBottom: '8px' }}>PHOTOS</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {(properties.find(p=>p.id===editingId)?.photos||[]).map((ph,idx) => (
              <div key={idx} style={{ position: 'relative', width: '70px', height: '70px' }}>
                <img src={ph} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid rgba(148,163,184,0.2)' }} />
                <button onClick={() => removePhoto(editingId, idx)} style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: 'rgba(248,113,113,0.9)', color: '#fff', border: 'none', borderRadius: '50%', fontSize: '9px', cursor: 'pointer', lineHeight: '16px', padding: 0 }}>x</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// ZADARMA CRM + AI/SI
// ================================================================
function ZadarmaCRM() {
  const [calls, setCalls] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [pbxStatus, setPbxStatus] = useState('checking');
  const [activeSubTab, setActiveSubTab] = useState('calls');
  const [dialNumber, setDialNumber] = useState('');

  useEffect(() => {
    setCalls([
      { id: 1, direction: 'inbound', number: '+1-555-123-4567', contact: 'John Smith', duration: '4:32', time: '2026-01-10 09:15', status: 'answered', sentiment: 'positive', leadScore: 87, followUp: 'Send property portfolio' },
      { id: 2, direction: 'outbound', number: '+52-646-987-6543', contact: 'Maria Garcia', duration: '2:18', time: '2026-01-10 08:45', status: 'answered', sentiment: 'neutral', leadScore: 62, followUp: 'Schedule Valle tour' },
      { id: 3, direction: 'inbound', number: '+1-555-789-0123', contact: 'Unknown', duration: '0:00', time: '2026-01-10 08:30', status: 'missed', sentiment: null, leadScore: 0, followUp: 'Call back immediately' },
      { id: 4, direction: 'outbound', number: '+52-646-555-1234', contact: 'Carlos Rivera', duration: '6:45', time: '2026-01-09 16:20', status: 'answered', sentiment: 'positive', leadScore: 94, followUp: 'Prepare offer docs Cabo villa' },
      { id: 5, direction: 'inbound', number: '+1-858-555-9876', contact: 'Jennifer Williams', duration: '3:15', time: '2026-01-09 14:00', status: 'answered', sentiment: 'interested', leadScore: 78, followUp: 'Email Ensenada listings' },
      { id: 6, direction: 'outbound', number: '+52-664-555-7890', contact: 'Ricardo Mendez', duration: '1:45', time: '2026-01-09 11:30', status: 'answered', sentiment: 'cold', leadScore: 25, followUp: 'Remove from pipeline' }
    ]);
    setContacts([
      { id: 1, name: 'John Smith', phone: '+1-555-123-4567', email: 'john@email.com', company: 'Smith Investments', lastContact: '2026-01-10', tier: 'HOT', source: 'WhatsApp' },
      { id: 2, name: 'Maria Garcia', phone: '+52-646-987-6543', email: 'maria@email.com', company: 'Valle Properties', lastContact: '2026-01-10', tier: 'WARM', source: 'Website' },
      { id: 3, name: 'Carlos Rivera', phone: '+52-646-555-1234', email: 'carlos@realty.mx', company: 'Baja Realty', lastContact: '2026-01-09', tier: 'HOT', source: 'Referral' },
      { id: 4, name: 'Jennifer Williams', phone: '+1-858-555-9876', email: 'jen@outlook.com', company: 'Private Buyer', lastContact: '2026-01-09', tier: 'WARM', source: 'Ad Campaign' },
      { id: 5, name: 'Ricardo Mendez', phone: '+52-664-555-7890', email: 'ricardo@mex.com', company: 'Mendez Group', lastContact: '2026-01-09', tier: 'COLD', source: 'Cold Call' }
    ]);
    setTimeout(() => setPbxStatus('online'), 1000);
  }, []);

  const handleDial = () => { if (dialNumber) { alert('Initiating call to ' + dialNumber + ' via Zadarma PBX'); setDialNumber(''); } };
  const sentColor = (s) => ({ positive: '#4ade80', interested: '#60a5fa', neutral: '#fbbf24', cold: '#f87171' }[s] || 'rgba(148,163,184,0.5)');
  const tierColor = (t) => ({ HOT: '#f87171', WARM: '#fbbf24', COLD: '#60a5fa' }[t] || 'rgba(148,163,184,0.5)');

  const subTabs = [
    { id: 'calls', label: 'CALL LOG' },
    { id: 'ai', label: 'AI INSIGHTS' },
    { id: 'contacts', label: 'CONTACTS' },
    { id: 'dialer', label: 'DIALER' },
    { id: 'si', label: 'SI COMPLIANCE' },
    { id: 'settings', label: 'PBX SETTINGS' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '12px 16px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: pbxStatus === 'online' ? '#4ade80' : '#fbbf24' }} />
          <span style={{ ...glassText, fontSize: '10px', letterSpacing: '1px' }}>PBX STATUS: {pbxStatus.toUpperCase()}</span>
        </div>
        <span style={{ ...glassText, fontSize: '9px', color: 'rgba(148, 163, 184, 0.5)' }}>{ZADARMA_CONFIG.pbxNumber}</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {subTabs.map(t => <button key={t.id} onClick={() => setActiveSubTab(t.id)} style={{ ...styles.button, ...(activeSubTab === t.id ? styles.buttonPrimary : {}) }}>{t.label}</button>)}
      </div>

      {/* CALL LOG */}
      {activeSubTab === 'calls' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th style={styles.th}>Dir</th><th style={styles.th}>Number</th><th style={styles.th}>Contact</th><th style={styles.th}>Duration</th><th style={styles.th}>Time</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
            <tbody>{calls.map(c => (
              <tr key={c.id}>
                <td style={styles.td}><span style={{ color: c.direction==='inbound'?'#4ade80':'#60a5fa' }}>{c.direction==='inbound'?'↓ IN':'↑ OUT'}</span></td>
                <td style={{ ...styles.td, fontFamily: 'monospace' }}>{c.number}</td>
                <td style={styles.td}>{c.contact}</td>
                <td style={styles.td}>{c.duration}</td>
                <td style={{ ...styles.td, fontSize: '10px' }}>{c.time}</td>
                <td style={styles.td}><span style={{ ...styles.badge, background: c.status==='answered'?'rgba(74,222,128,0.15)':'rgba(248,113,113,0.15)', color: c.status==='answered'?'#4ade80':'#f87171', border: `1px solid ${c.status==='answered'?'rgba(74,222,128,0.3)':'rgba(248,113,113,0.3)'}` }}>{c.status}</span></td>
                <td style={styles.td}><button style={{ ...styles.button, padding: '4px 8px', fontSize: '8px' }}>CALLBACK</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {/* AI INSIGHTS */}
      {activeSubTab === 'ai' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>HOT LEADS</div><div style={{ ...glassText, fontSize: '28px', color: '#f87171' }}>{calls.filter(c=>c.leadScore>=80).length}</div></div>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>AVG SCORE</div><div style={{ ...glassText, fontSize: '28px', color: '#cba658' }}>{Math.round(calls.filter(c=>c.leadScore>0).reduce((a,c)=>a+c.leadScore,0)/calls.filter(c=>c.leadScore>0).length)}</div></div>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>POSITIVE</div><div style={{ ...glassText, fontSize: '28px', color: '#4ade80' }}>{calls.filter(c=>c.sentiment==='positive'||c.sentiment==='interested').length}</div></div>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>MISSED/COLD</div><div style={{ ...glassText, fontSize: '28px', color: '#f87171' }}>{calls.filter(c=>c.status==='missed'||c.sentiment==='cold').length}</div></div>
          </div>
          <div style={{ ...glassText, fontSize: '10px', letterSpacing: '2px', color: '#cba658', marginBottom: '10px' }}>AI CALL SENTIMENT & LEAD SCORING</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><th style={styles.th}>Contact</th><th style={styles.th}>Sentiment</th><th style={styles.th}>Lead Score</th><th style={styles.th}>AI Recommendation</th><th style={styles.th}>Priority</th></tr></thead>
              <tbody>{calls.filter(c=>c.contact!=='Unknown').sort((a,b)=>b.leadScore-a.leadScore).map(c => (
                <tr key={c.id}>
                  <td style={styles.td}><div>{c.contact}</div><div style={{ fontSize: '9px', color: 'rgba(148,163,184,0.5)' }}>{c.number}</div></td>
                  <td style={styles.td}><span style={{ ...styles.badge, background: sentColor(c.sentiment)+'22', color: sentColor(c.sentiment), border: '1px solid '+sentColor(c.sentiment)+'44' }}>{c.sentiment||'N/A'}</span></td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', background: 'rgba(30,41,59,0.8)', overflow: 'hidden' }}><div style={{ width: c.leadScore+'%', height: '100%', background: c.leadScore>=80?'#4ade80':c.leadScore>=50?'#fbbf24':'#f87171' }} /></div>
                      <span style={{ ...glassText, fontSize: '11px', color: c.leadScore>=80?'#4ade80':c.leadScore>=50?'#fbbf24':'#f87171' }}>{c.leadScore}</span>
                    </div>
                  </td>
                  <td style={{ ...styles.td, fontSize: '10px', maxWidth: '200px' }}>{c.followUp}</td>
                  <td style={styles.td}><span style={{ ...styles.badge, background: c.leadScore>=80?'rgba(248,113,113,0.15)':c.leadScore>=50?'rgba(251,191,36,0.15)':'rgba(96,165,250,0.15)', color: c.leadScore>=80?'#f87171':c.leadScore>=50?'#fbbf24':'#60a5fa', border: `1px solid ${c.leadScore>=80?'rgba(248,113,113,0.3)':c.leadScore>=50?'rgba(251,191,36,0.3)':'rgba(96,165,250,0.3)'}` }}>{c.leadScore>=80?'URGENT':c.leadScore>=50?'FOLLOW UP':'LOW'}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTACTS */}
      {activeSubTab === 'contacts' && (
        <div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Phone</th><th style={styles.th}>Email</th><th style={styles.th}>Company</th><th style={styles.th}>Tier</th><th style={styles.th}>Source</th><th style={styles.th}>Last</th><th style={styles.th}>Actions</th></tr></thead>
              <tbody>{contacts.map(c => (
                <tr key={c.id}>
                  <td style={styles.td}>{c.name}</td>
                  <td style={{ ...styles.td, fontFamily: 'monospace' }}>{c.phone}</td>
                  <td style={styles.td}>{c.email}</td>
                  <td style={styles.td}>{c.company}</td>
                  <td style={styles.td}><span style={{ ...styles.badge, background: tierColor(c.tier)+'22', color: tierColor(c.tier), border: '1px solid '+tierColor(c.tier)+'44' }}>{c.tier}</span></td>
                  <td style={{ ...styles.td, fontSize: '9px' }}>{c.source}</td>
                  <td style={styles.td}>{c.lastContact}</td>
                  <td style={styles.td}><div style={{ display: 'flex', gap: '4px' }}><button style={{ ...styles.button, ...styles.buttonSuccess, padding: '4px 8px', fontSize: '8px' }}>CALL</button><button style={{ ...styles.button, padding: '4px 8px', fontSize: '8px' }}>EDIT</button></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* DIALER */}
      {activeSubTab === 'dialer' && (
        <div style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'center' }}>
          <input type="tel" value={dialNumber} onChange={(e) => setDialNumber(e.target.value)} placeholder="+1 555 123 4567" style={{ ...styles.input, fontSize: '24px', textAlign: 'center', padding: '16px', marginBottom: '16px', letterSpacing: '2px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {['1','2','3','4','5','6','7','8','9','*','0','#'].map(d => <button key={d} onClick={() => setDialNumber(p => p + d)} style={{ ...styles.button, padding: '16px', fontSize: '18px' }}>{d}</button>)}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setDialNumber('')} style={{ ...styles.button, ...styles.buttonDanger, flex: 1, padding: '12px' }}>CLEAR</button>
            <button onClick={handleDial} style={{ ...styles.button, ...styles.buttonSuccess, flex: 2, padding: '12px' }}>DIAL</button>
          </div>
        </div>
      )}

      {/* SI COMPLIANCE */}
      {activeSubTab === 'si' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>COMPLIANCE</div><div style={{ ...glassText, fontSize: '28px', color: '#4ade80' }}>96%</div></div>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>MONITORED</div><div style={{ ...glassText, fontSize: '28px', color: '#60a5fa' }}>{calls.length}</div></div>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>FLAGGED</div><div style={{ ...glassText, fontSize: '28px', color: '#fbbf24' }}>0</div></div>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>RECORDING</div><div style={{ ...glassText, fontSize: '12px', color: '#4ade80' }}>ACTIVE</div></div>
          </div>
          <div style={{ ...glassText, fontSize: '10px', letterSpacing: '2px', color: '#cba658', marginBottom: '10px' }}>SI COMPLIANCE CHECKS</div>
          {[
            { l: 'Call Recording Disclosure', s: 'pass', d: 'Auto-disclosure on all recorded calls' },
            { l: 'Do Not Call Registry', s: 'pass', d: 'Outbound numbers verified against DNC' },
            { l: 'Cross-Border Communication', s: 'pass', d: 'MX/US regulatory requirements met' },
            { l: 'Data Retention Policy', s: 'pass', d: 'Recordings retained 90 days per policy' },
            { l: 'Agent Script Compliance', s: 'warning', d: '1 call missing disclosures - review' },
            { l: 'PII Handling', s: 'pass', d: 'No SSN/financial data on voice' }
          ].map((c,i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(148,163,184,0.1)', marginBottom: '4px' }}>
              <div><span style={{ ...glassText, fontSize: '11px' }}>{c.l}</span><div style={{ ...glassText, fontSize: '9px', color: 'rgba(148,163,184,0.4)', marginTop: '2px' }}>{c.d}</div></div>
              <span style={{ ...styles.badge, background: c.s==='pass'?'rgba(74,222,128,0.15)':'rgba(251,191,36,0.15)', color: c.s==='pass'?'#4ade80':'#fbbf24', border: `1px solid ${c.s==='pass'?'rgba(74,222,128,0.3)':'rgba(251,191,36,0.3)'}` }}>{c.s==='pass'?'PASS':'REVIEW'}</span>
            </div>
          ))}
        </div>
      )}

      {/* PBX SETTINGS */}
      {activeSubTab === 'settings' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>API KEY</div><div style={{ ...glassText, fontSize: '11px', fontFamily: 'monospace' }}>{ZADARMA_CONFIG.apiKey.slice(0,8)}...</div></div>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>PBX NUMBER</div><div style={{ ...glassText, fontSize: '11px', fontFamily: 'monospace' }}>{ZADARMA_CONFIG.pbxNumber}</div></div>
            <div style={styles.statCard}><div style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.6)', marginBottom: '6px' }}>STATUS</div><div style={{ ...glassText, fontSize: '11px', color: '#4ade80' }}>CONNECTED</div></div>
          </div>
          {[{ l:'Forward to WhatsApp',e:true },{ l:'Voicemail',e:true },{ l:'Call Recording',e:true },{ l:'SMS Notifications',e:true },{ l:'AI Sentiment Analysis',e:true },{ l:'SI Compliance Monitor',e:true }].map((s,i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(148,163,184,0.1)', marginBottom: '4px' }}>
              <span style={{ ...glassText, fontSize: '11px' }}>{s.l}</span>
              <span style={{ ...styles.badge, background: s.e?'rgba(74,222,128,0.15)':'rgba(148,163,184,0.15)', color: s.e?'#4ade80':'rgba(148,163,184,0.6)', border: `1px solid ${s.e?'rgba(74,222,128,0.3)':'rgba(148,163,184,0.2)'}` }}>{s.e?'ON':'OFF'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ================================================================
// DUAL CALENDAR
// ================================================================
function DualCalendar({ accessLevel }) {
  const [activeCal, setActiveCal] = useState(accessLevel === 'owner' ? 'private' : 'team');
  const priv = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_CONFIG.ownerPrivate)}&ctz=America/Los_Angeles&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0`;
  const team = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_CONFIG.teamShared)}&ctz=America/Los_Angeles&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0`;
  return (
    <div>
      {accessLevel === 'owner' && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button onClick={() => setActiveCal('private')} style={{ ...styles.button, ...(activeCal==='private'?{background:'rgba(203,166,88,0.2)',borderColor:'rgba(203,166,88,0.5)',color:'#cba658'}:{}) }}>PRIVATE CALENDAR</button>
          <button onClick={() => setActiveCal('team')} style={{ ...styles.button, ...(activeCal==='team'?{background:'rgba(96,165,250,0.2)',borderColor:'rgba(96,165,250,0.5)',color:'#60a5fa'}:{}) }}>TEAM CALENDAR</button>
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button onClick={() => window.open('https://calendar.google.com/calendar/u/0/r/eventedit','_blank')} style={{ ...styles.button, ...styles.buttonPrimary }}>+ NEW EVENT</button>
        <button onClick={() => window.open('https://calendar.google.com/calendar/u/0/r/day','_blank')} style={styles.button}>TODAY</button>
        <button onClick={() => window.open('https://calendar.google.com/calendar/u/0/r/month','_blank')} style={styles.button}>MONTH VIEW</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', padding: '8px 12px', background: activeCal==='private'?'rgba(203,166,88,0.1)':'rgba(96,165,250,0.1)', border: `1px solid ${activeCal==='private'?'rgba(203,166,88,0.2)':'rgba(96,165,250,0.2)'}` }}>
        <span style={{ ...glassText, fontSize: '10px', letterSpacing: '2px', color: activeCal==='private'?'#cba658':'#60a5fa' }}>{activeCal==='private'?'OWNER PRIVATE CALENDAR':'TEAM SHARED CALENDAR'}</span>
      </div>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', border: '1px solid rgba(148,163,184,0.2)' }}>
        <iframe src={activeCal==='private'?priv:team} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, filter: 'invert(0.88) hue-rotate(180deg)' }} title="Calendar" />
      </div>
    </div>
  );
}

// ================================================================
// AGENT APPROVALS - Wired to AuthContext localStorage
// ================================================================
function AgentApprovals() {
  const auth = useAuth();
  const [agents, setAgents] = useState({ pending: [], approved: [], rejected: [] });
  const [view, setView] = useState('pending');
  const [modal, setModal] = useState(null);
  const [docView, setDocView] = useState(null);
  const [addMode, setAddMode] = useState(null);
  const [addForm, setAddForm] = useState({ fullName: '', email: '', phone: '', password: '', pin: '', role: 'agent' });
  const [form, setForm] = useState({ password: '', pin: '', agentCommission: '5', modules: { realEstate: true, developments: false, mortgage: false, lifestyle: false, luxuryGoods: false }, commissionAccepted: false });

  const refresh = () => {
    if (auth.getAllAgents) { setAgents(auth.getAllAgents()); }
    else {
      const p = JSON.parse(localStorage.getItem('pending_agents') || '[]');
      const a = JSON.parse(localStorage.getItem('approved_agents') || '[]');
      const r = JSON.parse(localStorage.getItem('rejected_agents') || '[]');
      setAgents({ pending: p, approved: a, rejected: r });
    }
  };
  useEffect(() => { refresh(); }, []);

  const doApprove = () => {
    if (!form.password) { alert('Set a password'); return; }
    if (!form.pin || form.pin.length < 4) { alert('Set 4+ digit PIN'); return; }
    if (!form.commissionAccepted) { alert('Commission agreement must be accepted'); return; }
    if (auth.approveAgent) { auth.approveAgent(modal.id, { password: form.password, pin: form.pin, modules: form.modules, agentCommission: parseFloat(form.agentCommission), commissionAgreement: { platformRate: '2% under $250K / 3% over $250K', agentRate: form.agentCommission + '%', agreedAt: new Date().toISOString(), agreedBy: 'owner' } }); }
    else {
      const p = JSON.parse(localStorage.getItem('pending_agents') || '[]');
      const a = JSON.parse(localStorage.getItem('approved_agents') || '[]');
      const idx = p.findIndex(x => x.id === modal.id);
      if (idx !== -1) { a.push({ ...p[idx], status: 'approved', password: form.password, pin: form.pin, modules: form.modules, agentCommission: parseFloat(form.agentCommission), commissionAgreement: { platformRate: '2% under $250K / 3% over $250K', agentRate: form.agentCommission + '%', agreedAt: new Date().toISOString(), agreedBy: 'owner' }, approvedAt: new Date().toISOString() }); p.splice(idx, 1); localStorage.setItem('pending_agents', JSON.stringify(p)); localStorage.setItem('approved_agents', JSON.stringify(a)); }
    }
    setModal(null); setForm({ password: '', pin: '', agentCommission: '5', modules: { realEstate: true, developments: false, mortgage: false, lifestyle: false, luxuryGoods: false }, commissionAccepted: false }); refresh();
  };

  const doReject = (id) => {
    const reason = prompt('Rejection reason:');
    if (!reason) return;
    if (auth.rejectAgent) { auth.rejectAgent(id, reason); }
    else {
      const p = JSON.parse(localStorage.getItem('pending_agents') || '[]');
      const r = JSON.parse(localStorage.getItem('rejected_agents') || '[]');
      const idx = p.findIndex(x => x.id === id);
      if (idx !== -1) { r.push({ ...p[idx], status: 'rejected', rejectionReason: reason, rejectedAt: new Date().toISOString() }); p.splice(idx, 1); localStorage.setItem('pending_agents', JSON.stringify(p)); localStorage.setItem('rejected_agents', JSON.stringify(r)); }
    }
    refresh();
  };

  const doRemove = (id, list) => {
    if (!window.confirm('Remove permanently?')) return;
    const key = list === 'approved' ? 'approved_agents' : 'rejected_agents';
    localStorage.setItem(key, JSON.stringify(JSON.parse(localStorage.getItem(key) || '[]').filter(a => a.id !== id)));
    refresh();
  };

  const handleAddUser = () => {
    if (!addForm.fullName || !addForm.email || !addForm.password || !addForm.pin) { alert('All fields required'); return; }
    const key = addMode === 'admin' ? 'approved_agents' : addMode === 'sales' ? 'approved_agents' : 'approved_agents';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    if (existing.find(a => a.email.toLowerCase() === addForm.email.toLowerCase())) { alert('Email already exists'); return; }
    existing.push({ id: Date.now(), fullName: addForm.fullName, email: addForm.email, phone: addForm.phone, password: addForm.password, pin: addForm.pin, role: addMode, status: 'approved', modules: { realEstate: true, developments: true, mortgage: addMode === 'admin', lifestyle: true, luxuryGoods: addMode === 'admin' }, approvedAt: new Date().toISOString(), createdBy: 'owner' });
    localStorage.setItem(key, JSON.stringify(existing));
    setAddMode(null); setAddForm({ fullName: '', email: '', phone: '', password: '', pin: '', role: 'agent' }); refresh();
  };

  const cur = agents[view] || [];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div style={styles.statCard}><div style={{ ...glassText, fontSize: '24px', color: '#fbbf24' }}>{agents.pending.length}</div><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>PENDING</div></div>
        <div style={styles.statCard}><div style={{ ...glassText, fontSize: '24px', color: '#4ade80' }}>{agents.approved.length}</div><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>APPROVED</div></div>
        <div style={styles.statCard}><div style={{ ...glassText, fontSize: '24px', color: '#f87171' }}>{agents.rejected.length}</div><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>REJECTED</div></div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['pending','approved','rejected'].map(v => <button key={v} onClick={() => setView(v)} style={{ ...styles.button, ...(view===v?styles.buttonPrimary:{}) }}>{v.toUpperCase()} ({agents[v].length})</button>)}
        <div style={{ flex: 1 }} />
        <button onClick={() => setAddMode('admin')} style={{ ...styles.button, background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.5)', color: '#a78bfa', fontSize: '9px', padding: '4px 12px' }}>+ ADD ADMIN</button>
        <button onClick={() => setAddMode('sales')} style={{ ...styles.button, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.5)', color: '#60a5fa', fontSize: '9px', padding: '4px 12px' }}>+ ADD SALES</button>
      </div>

      {cur.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(30,41,59,0.3)', border: '1px solid rgba(148,163,184,0.1)' }}>
          <p style={{ ...glassText, fontSize: '12px', color: 'rgba(148,163,184,0.5)' }}>No {view} agents</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              <th style={styles.th}>Name</th><th style={styles.th}>Email</th><th style={styles.th}>Phone</th><th style={styles.th}>Company</th><th style={styles.th}>Date</th>
              {view==='pending'&&<th style={styles.th}>Docs</th>}
              {view==='approved'&&<th style={styles.th}>Role</th>}
              {view==='approved'&&<th style={styles.th}>Commission</th>}
              {view==='approved'&&<th style={styles.th}>Modules</th>}
              {view==='approved'&&<th style={styles.th}>PIN</th>}
              <th style={styles.th}>Actions</th>
            </tr></thead>
            <tbody>{cur.map(a => (
              <tr key={a.id}>
                <td style={styles.td}>{a.fullName||a.name||'-'}</td>
                <td style={{ ...styles.td, fontSize: '10px' }}>{a.email}</td>
                <td style={{ ...styles.td, fontSize: '10px' }}>{a.phone||'-'}</td>
                <td style={styles.td}>{a.companyName||a.company||'-'}</td>
                <td style={{ ...styles.td, fontSize: '9px' }}>{a.approvedAt?new Date(a.approvedAt).toLocaleDateString():a.rejectedAt?new Date(a.rejectedAt).toLocaleDateString():a.submittedAt?new Date(a.submittedAt).toLocaleDateString():'-'}</td>
                {view==='pending'&&<td style={styles.td}><button onClick={() => setDocView(a)} style={{ ...styles.button, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.5)', color: '#60a5fa', padding: '3px 8px', fontSize: '8px' }}>{a.idDocumentUrl || a.selfieUrl ? 'VIEW DOCS' : 'NO DOCS'}</button></td>}
                {view==='approved'&&<td style={styles.td}><span style={{ ...styles.badge, background: a.role==='admin'?'rgba(139,92,246,0.2)':a.role==='sales'?'rgba(59,130,246,0.2)':'rgba(203,166,88,0.15)', color: a.role==='admin'?'#a78bfa':a.role==='sales'?'#60a5fa':'#cba658', border: '1px solid ' + (a.role==='admin'?'rgba(139,92,246,0.4)':a.role==='sales'?'rgba(59,130,246,0.4)':'rgba(203,166,88,0.3)') }}>{(a.role||'agent').toUpperCase()}</span></td>}
                {view==='approved'&&<td style={{ ...styles.td, fontSize: '10px', color: '#4ade80' }}>{a.agentCommission ? a.agentCommission + '%' : '-'}</td>}
                {view==='approved'&&<td style={styles.td}><div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>{a.modules?Object.entries(a.modules).filter(([_,v])=>v).map(([m])=><span key={m} style={{ ...styles.badge, background: 'rgba(203,166,88,0.15)', color: '#cba658', border: '1px solid rgba(203,166,88,0.3)' }}>{m}</span>):<span style={{ ...glassText, fontSize: '9px', color: 'rgba(148,163,184,0.4)' }}>Default</span>}</div></td>}
                {view==='approved'&&<td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '10px' }}>{a.pin||'-'}</td>}
                <td style={styles.td}><div style={{ display: 'flex', gap: '4px' }}>
                  {view==='pending'&&<><button onClick={() => { setModal(a); setForm({ password: '', pin: '', agentCommission: '5', modules: { realEstate: true, developments: false, mortgage: false, lifestyle: false, luxuryGoods: false }, commissionAccepted: false }); }} style={{ ...styles.button, ...styles.buttonSuccess, padding: '4px 8px', fontSize: '8px' }}>APPROVE</button><button onClick={() => doReject(a.id)} style={{ ...styles.button, ...styles.buttonDanger, padding: '4px 8px', fontSize: '8px' }}>REJECT</button></>}
                  {view!=='pending'&&<button onClick={() => doRemove(a.id, view)} style={{ ...styles.button, ...styles.buttonDanger, padding: '4px 8px', fontSize: '8px' }}>REMOVE</button>}
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {/* VIEW DOCS MODAL — ID + Selfie side by side */}
      {docView && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(203,166,88,0.4)', padding: '32px', maxWidth: '700px', width: '100%', backdropFilter: 'blur(20px)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ ...glassText, fontSize: '12px', letterSpacing: '3px', color: '#cba658', marginBottom: '8px' }}>IDENTITY VERIFICATION</div>
            <div style={{ ...glassText, fontSize: '16px', color: 'rgba(226,232,240,0.9)', marginBottom: '4px' }}>{docView.fullName||docView.name}</div>
            <div style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)', marginBottom: '20px' }}>{docView.email} • {docView.idType || 'Unknown ID Type'}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>ID DOCUMENT</div>
                <div style={{ border: '1px solid rgba(148,163,184,0.2)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(30,41,59,0.4)', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {docView.idDocumentUrl ? (
                    <img src={docView.idDocumentUrl} alt="ID Document" style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain' }} />
                  ) : (
                    <p style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.4)', padding: '20px' }}>No ID document uploaded</p>
                  )}
                </div>
              </div>
              <div>
                <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '8px' }}>SELFIE WITH ID</div>
                <div style={{ border: '1px solid rgba(148,163,184,0.2)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(30,41,59,0.4)', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {docView.selfieUrl ? (
                    <img src={docView.selfieUrl} alt="Selfie" style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain' }} />
                  ) : (
                    <p style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.4)', padding: '20px' }}>No selfie uploaded</p>
                  )}
                </div>
              </div>
            </div>

            {/* AI/SI Verification Status */}
            <div style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '12px' }}>AI/SI VERIFICATION</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...glassText, fontSize: '18px', color: docView.aiScore >= 85 ? '#4ade80' : docView.aiScore >= 50 ? '#fbbf24' : '#f87171' }}>{docView.aiScore || '—'}%</div>
                  <div style={{ ...glassText, fontSize: '8px', color: 'rgba(148,163,184,0.5)' }}>FACE MATCH</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...glassText, fontSize: '14px', color: docView.idValid ? '#4ade80' : '#fbbf24' }}>{docView.idValid ? 'VALID' : 'PENDING'}</div>
                  <div style={{ ...glassText, fontSize: '8px', color: 'rgba(148,163,184,0.5)' }}>ID CHECK (SI)</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...glassText, fontSize: '14px', color: docView.aiScore >= 85 ? '#4ade80' : docView.aiScore >= 50 ? '#fbbf24' : '#f87171' }}>{docView.aiScore >= 85 ? 'AUTO-PASS' : docView.aiScore >= 50 ? 'REVIEW' : docView.aiScore ? 'FLAGGED' : 'PENDING'}</div>
                  <div style={{ ...glassText, fontSize: '8px', color: 'rgba(148,163,184,0.5)' }}>STATUS</div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {(docView.rfc || docView.licenseNumber || docView.brokerageName) && (
              <div style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', marginBottom: '12px' }}>PROFESSIONAL DETAILS</div>
                <div style={{ display: 'grid', gap: '6px', color: '#94a3b8', fontSize: '12px' }}>
                  {docView.rfc && <div>RFC: <strong style={{ color: '#e2e8f0' }}>{docView.rfc}</strong></div>}
                  {docView.licenseNumber && <div>License: <strong style={{ color: '#e2e8f0' }}>{docView.licenseNumber}</strong></div>}
                  {docView.brokerageName && <div>Brokerage: <strong style={{ color: '#e2e8f0' }}>{docView.brokerageName}</strong></div>}
                  {docView.yearsExperience && <div>Experience: <strong style={{ color: '#e2e8f0' }}>{docView.yearsExperience} years</strong></div>}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { setDocView(null); setModal(docView); setForm({ password: '', pin: '', agentCommission: '5', modules: { realEstate: true, developments: false, mortgage: false, lifestyle: false, luxuryGoods: false }, commissionAccepted: false }); }} style={{ ...styles.button, ...styles.buttonSuccess, flex: 1, padding: '12px' }}>PROCEED TO APPROVE</button>
              <button onClick={() => { doReject(docView.id); setDocView(null); }} style={{ ...styles.button, ...styles.buttonDanger, padding: '12px' }}>REJECT</button>
              <button onClick={() => setDocView(null)} style={{ ...styles.button, padding: '12px' }}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* APPROVE MODAL — with Commission Agreement */}
      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(203,166,88,0.4)', padding: '32px', maxWidth: '520px', width: '100%', backdropFilter: 'blur(20px)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ ...glassText, fontSize: '12px', letterSpacing: '3px', color: '#cba658', marginBottom: '20px' }}>APPROVE AGENT</div>
            <div style={{ ...glassText, fontSize: '14px', color: 'rgba(226,232,240,0.9)', marginBottom: '4px' }}>{modal.fullName||modal.name}</div>
            <div style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)', marginBottom: '20px' }}>{modal.email}</div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '6px', color: 'rgba(148,163,184,0.6)' }}>PASSWORD *</label>
              <input type="text" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Set login password" style={styles.input} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '6px', color: 'rgba(148,163,184,0.6)' }}>PIN (4+ DIGITS) *</label>
              <input type="text" value={form.pin} onChange={e => setForm({...form, pin: e.target.value})} placeholder="e.g. 7706" maxLength={6} style={{ ...styles.input, letterSpacing: '4px', fontSize: '16px' }} />
            </div>

            {/* COMMISSION AGREEMENT */}
            <div style={{ background: 'rgba(203,166,88,0.08)', border: '1px solid rgba(203,166,88,0.3)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
              <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: '#cba658', marginBottom: '12px' }}>COMMISSION AGREEMENT</div>
              <div style={{ ...glassText, fontSize: '11px', color: '#94a3b8', lineHeight: '1.8', marginBottom: '12px' }}>
                <div>Platform Fee: <strong style={{ color: '#4ade80' }}>2%</strong> under $250K / <strong style={{ color: '#cba658' }}>3%</strong> over $250K</div>
                <div>Agent Commission (on top of platform):</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <input type="number" value={form.agentCommission} onChange={e => setForm({...form, agentCommission: e.target.value})} min="1" max="15" step="0.5" style={{ ...styles.input, width: '80px', textAlign: 'center', fontSize: '16px' }} />
                <span style={{ ...glassText, fontSize: '14px', color: '#cba658' }}>%</span>
                <span style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.5)' }}>agent rate</span>
              </div>
              <div style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.6)', lineHeight: '1.6', background: 'rgba(15,23,42,0.4)', padding: '10px', borderRadius: '4px' }}>
                Example on $300K sale: Platform 3% ($9,000) + Agent {form.agentCommission}% (${(300000 * (parseFloat(form.agentCommission)||0) / 100).toLocaleString()}) = Total {3 + (parseFloat(form.agentCommission)||0)}% (${(300000 * (3 + (parseFloat(form.agentCommission)||0)) / 100).toLocaleString()})
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.commissionAccepted} onChange={e => setForm({...form, commissionAccepted: e.target.checked})} style={{ accentColor: '#cba658', marginTop: '2px' }} />
                <span style={{ ...glassText, fontSize: '10px', color: '#e2e8f0', lineHeight: '1.5' }}>I confirm the commission structure for {modal.fullName||modal.name}: Platform 2%/3% + Agent {form.agentCommission}%</span>
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '8px', color: 'rgba(148,163,184,0.6)' }}>MODULE ACCESS</label>
              {[{k:'realEstate',l:'Real Estate'},{k:'developments',l:'Developments'},{k:'mortgage',l:'USA Mortgage'},{k:'lifestyle',l:'Lifestyle / Baja Guide'},{k:'luxuryGoods',l:'Luxury Goods'}].map(m => (
                <label key={m.k} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.modules[m.k]} onChange={e => setForm({...form, modules: {...form.modules, [m.k]: e.target.checked}})} style={{ accentColor: '#cba658' }} />
                  <span style={{ ...glassText, fontSize: '11px' }}>{m.l}</span>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={doApprove} disabled={!form.commissionAccepted} style={{ ...styles.button, ...(form.commissionAccepted ? styles.buttonSuccess : {}), flex: 1, padding: '12px', opacity: form.commissionAccepted ? 1 : 0.4, cursor: form.commissionAccepted ? 'pointer' : 'not-allowed' }}>APPROVE & SAVE</button>
              <button onClick={() => setModal(null)} style={{ ...styles.button, ...styles.buttonDanger, padding: '12px' }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD ADMIN / SALES MODAL */}
      {addMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid ' + (addMode==='admin' ? 'rgba(139,92,246,0.4)' : 'rgba(59,130,246,0.4)'), padding: '32px', maxWidth: '420px', width: '100%', backdropFilter: 'blur(20px)' }}>
            <div style={{ ...glassText, fontSize: '12px', letterSpacing: '3px', color: addMode==='admin' ? '#a78bfa' : '#60a5fa', marginBottom: '20px' }}>ADD {addMode.toUpperCase()} ACCOUNT</div>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div><label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '6px', color: 'rgba(148,163,184,0.6)' }}>FULL NAME *</label><input value={addForm.fullName} onChange={e => setAddForm({...addForm, fullName: e.target.value})} style={styles.input} /></div>
              <div><label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '6px', color: 'rgba(148,163,184,0.6)' }}>EMAIL *</label><input type="email" value={addForm.email} onChange={e => setAddForm({...addForm, email: e.target.value})} style={styles.input} /></div>
              <div><label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '6px', color: 'rgba(148,163,184,0.6)' }}>PHONE</label><input value={addForm.phone} onChange={e => setAddForm({...addForm, phone: e.target.value})} style={styles.input} /></div>
              <div><label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '6px', color: 'rgba(148,163,184,0.6)' }}>PASSWORD *</label><input type="text" value={addForm.password} onChange={e => setAddForm({...addForm, password: e.target.value})} style={styles.input} /></div>
              <div><label style={{ ...glassText, fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '6px', color: 'rgba(148,163,184,0.6)' }}>PIN *</label><input value={addForm.pin} onChange={e => setAddForm({...addForm, pin: e.target.value})} maxLength={6} style={{ ...styles.input, letterSpacing: '4px' }} /></div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              <button onClick={handleAddUser} style={{ ...styles.button, background: addMode==='admin' ? 'rgba(139,92,246,0.3)' : 'rgba(59,130,246,0.3)', border: '1px solid ' + (addMode==='admin' ? 'rgba(139,92,246,0.5)' : 'rgba(59,130,246,0.5)'), color: addMode==='admin' ? '#a78bfa' : '#60a5fa', flex: 1, padding: '12px' }}>CREATE {addMode.toUpperCase()}</button>
              <button onClick={() => setAddMode(null)} style={{ ...styles.button, ...styles.buttonDanger, padding: '12px' }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// MARKETING HUB
// ================================================================
function MarketingHub({ navigate }) {
  const [campaigns, setCampaigns] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newCamp, setNewCamp] = useState({ name: '', type: 'social', budget: '', status: 'active', platform: 'Facebook', startDate: '', endDate: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ad_campaigns') || '[]');
    if (saved.length === 0) {
      const demo = [
        { id: 1, name: 'Cabo Luxury Villas', type: 'social', budget: 5000, status: 'active', platform: 'Facebook', impressions: 45000, clicks: 823, conversions: 12, startDate: '2026-01-01', endDate: '2026-02-28' },
        { id: 2, name: 'Valle Wine Country', type: 'social', budget: 3000, status: 'active', platform: 'Instagram', impressions: 28000, clicks: 512, conversions: 8, startDate: '2026-01-15', endDate: '2026-03-15' },
        { id: 3, name: 'Ensenada Condos', type: 'search', budget: 2000, status: 'paused', platform: 'Google', impressions: 15000, clicks: 210, conversions: 3, startDate: '2025-12-01', endDate: '2026-01-31' }
      ];
      localStorage.setItem('ad_campaigns', JSON.stringify(demo));
      setCampaigns(demo);
    } else { setCampaigns(saved); }
  }, []);

  const save = (d) => { localStorage.setItem('ad_campaigns', JSON.stringify(d)); setCampaigns(d); };
  const handleAdd = () => {
    if (!newCamp.name || !newCamp.budget) { alert('Name and budget required'); return; }
    save([...campaigns, { ...newCamp, id: Date.now(), budget: parseFloat(newCamp.budget), impressions: 0, clicks: 0, conversions: 0 }]);
    setNewCamp({ name: '', type: 'social', budget: '', status: 'active', platform: 'Facebook', startDate: '', endDate: '' });
    setShowAdd(false);
  };
  const toggle = (id) => save(campaigns.map(c => c.id===id?{...c, status: c.status==='active'?'paused':'active'}:c));
  const del = (id) => { if (window.confirm('Delete campaign?')) save(campaigns.filter(c => c.id!==id)); };

  const totB = campaigns.reduce((a,c) => a+(c.budget||0), 0);
  const totI = campaigns.reduce((a,c) => a+(c.impressions||0), 0);
  const totK = campaigns.reduce((a,c) => a+(c.clicks||0), 0);
  const totC = campaigns.reduce((a,c) => a+(c.conversions||0), 0);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        <div style={styles.statCard}><div style={{ ...glassText, fontSize: '20px', color: '#cba658' }}>${totB.toLocaleString()}</div><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>BUDGET</div></div>
        <div style={styles.statCard}><div style={{ ...glassText, fontSize: '20px', color: '#60a5fa' }}>{totI.toLocaleString()}</div><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>IMPRESSIONS</div></div>
        <div style={styles.statCard}><div style={{ ...glassText, fontSize: '20px', color: '#4ade80' }}>{totK.toLocaleString()}</div><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>CLICKS</div></div>
        <div style={styles.statCard}><div style={{ ...glassText, fontSize: '20px', color: '#f472b6' }}>{totC}</div><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>CONVERSIONS</div></div>
        <div style={styles.statCard}><div style={{ ...glassText, fontSize: '20px', color: '#fb923c' }}>{totK>0?((totC/totK)*100).toFixed(1):0}%</div><div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>CONV RATE</div></div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button onClick={() => setShowAdd(!showAdd)} style={{ ...styles.button, ...styles.buttonSuccess }}>{showAdd?'CANCEL':'+ NEW CAMPAIGN'}</button>
        <button onClick={() => navigate('/admin/marketing')} style={{ ...styles.button, ...styles.buttonPrimary }}>FULL DASHBOARD</button>
        <button onClick={() => navigate('/admin/ads')} style={styles.button}>AD MANAGEMENT</button>
      </div>

      {showAdd && (
        <div style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(74,222,128,0.3)', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '10px' }}>
            <input placeholder="Campaign Name *" value={newCamp.name} onChange={e => setNewCamp({...newCamp, name: e.target.value})} style={styles.input} />
            <select value={newCamp.platform} onChange={e => setNewCamp({...newCamp, platform: e.target.value})} style={styles.input}>
              <option>Facebook</option><option>Instagram</option><option>Google</option><option>TikTok</option><option>WhatsApp</option>
            </select>
            <input placeholder="Budget USD *" type="number" value={newCamp.budget} onChange={e => setNewCamp({...newCamp, budget: e.target.value})} style={styles.input} />
            <input type="date" value={newCamp.startDate} onChange={e => setNewCamp({...newCamp, startDate: e.target.value})} style={styles.input} />
          </div>
          <button onClick={handleAdd} style={{ ...styles.button, ...styles.buttonSuccess }}>CREATE CAMPAIGN</button>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th style={styles.th}>Campaign</th><th style={styles.th}>Platform</th><th style={styles.th}>Budget</th><th style={styles.th}>Impr</th><th style={styles.th}>Clicks</th><th style={styles.th}>Conv</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
          <tbody>{campaigns.map(c => (
            <tr key={c.id}>
              <td style={styles.td}>{c.name}</td>
              <td style={styles.td}>{c.platform}</td>
              <td style={{ ...styles.td, fontFamily: 'monospace', color: '#cba658' }}>${Number(c.budget||0).toLocaleString()}</td>
              <td style={styles.td}>{(c.impressions||0).toLocaleString()}</td>
              <td style={styles.td}>{(c.clicks||0).toLocaleString()}</td>
              <td style={styles.td}>{c.conversions||0}</td>
              <td style={styles.td}><span onClick={() => toggle(c.id)} style={{ ...styles.badge, cursor: 'pointer', background: c.status==='active'?'rgba(74,222,128,0.15)':'rgba(251,191,36,0.15)', color: c.status==='active'?'#4ade80':'#fbbf24', border: `1px solid ${c.status==='active'?'rgba(74,222,128,0.3)':'rgba(251,191,36,0.3)'}` }}>{c.status}</span></td>
              <td style={styles.td}><button onClick={() => del(c.id)} style={{ ...styles.button, ...styles.buttonDanger, padding: '4px 8px', fontSize: '8px' }}>DEL</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ================================================================
// ANALYTICS
// ================================================================
function AnalyticsDashboard() {
  const mx = JSON.parse(localStorage.getItem('mexico_properties') || '[]');
  const dev = JSON.parse(localStorage.getItem('development_properties') || '[]');
  const fsbo = JSON.parse(localStorage.getItem('fsbo_properties') || '[]');
  const camps = JSON.parse(localStorage.getItem('ad_campaigns') || '[]');
  const approved = JSON.parse(localStorage.getItem('approved_agents') || '[]');
  const totP = mx.length + dev.length + fsbo.length;
  const totB = camps.reduce((a,c) => a+(c.budget||0), 0);
  const totK = camps.reduce((a,c) => a+(c.clicks||0), 0);
  const totI = camps.reduce((a,c) => a+(c.impressions||0), 0);

  const stats = [
    { label: 'Total Properties', value: totP, color: '#cba658' },
    { label: 'Active Agents', value: approved.length, color: '#4ade80' },
    { label: 'Ad Budget', value: '$'+totB.toLocaleString(), color: '#60a5fa' },
    { label: 'Impressions', value: totI.toLocaleString(), color: '#a78bfa' },
    { label: 'Clicks', value: totK.toLocaleString(), color: '#f472b6' },
    { label: 'CTR', value: totI>0?((totK/totI)*100).toFixed(2)+'%':'0%', color: '#fb923c' }
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {stats.map((s,i) => (
          <div key={i} style={styles.statCard}>
            <div style={{ ...glassText, fontSize: '24px', color: s.color }}>{s.value}</div>
            <div style={{ ...glassText, fontSize: '8px', letterSpacing: '1px', color: 'rgba(148,163,184,0.6)' }}>{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(148,163,184,0.1)', padding: '40px', textAlign: 'center' }}>
        <p style={{ ...glassText, fontSize: '11px', color: 'rgba(148,163,184,0.6)', letterSpacing: '1px', margin: 0 }}>LIVE DATA FROM LOCALSTORAGE</p>
        <p style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.4)', marginTop: '8px' }}>Updates in real-time as you add properties, approve agents, manage campaigns</p>
      </div>
    </div>
  );
}

// ================================================================
// MAIN ADMIN DASHBOARD - EXPORT
// ================================================================
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [accessLevel, setAccessLevel] = useState('sales');
  const [openSections, setOpenSections] = useState({ command: true, crm: false, properties: false, calendar: false, marketing: false, agents: false, analytics: false });

  useEffect(() => {
    const level = sessionStorage.getItem('admin_access_level') || 'sales';
    setAccessLevel(level);
    if (level === 'sales') setOpenSections({ command: false, crm: true, properties: false, calendar: false, marketing: false, agents: false, analytics: false });
  }, []);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const toggle = (s) => {
    if (accessLevel === 'sales' && !['crm', 'calendar'].includes(s)) return;
    setOpenSections(p => ({ ...p, [s]: !p[s] }));
  };

  const handleLogout = () => { sessionStorage.removeItem('admin_access_level'); logout(); navigate('/'); };
  const isOwner = accessLevel === 'owner';
  const pendingAgents = JSON.parse(localStorage.getItem('pending_agents') || '[]');
  const totalProps = (JSON.parse(localStorage.getItem('mexico_properties') || '[]')).length + (JSON.parse(localStorage.getItem('development_properties') || '[]')).length + (JSON.parse(localStorage.getItem('fsbo_properties') || '[]')).length;
  const liveCampaigns = (JSON.parse(localStorage.getItem('ad_campaigns') || '[]')).filter(c => c.status === 'active').length;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, zIndex: 0 }} />

      {/* TOP NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile?'12px 16px':'16px 48px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(203,166,88,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div onClick={() => navigate('/')} style={{ ...glassText, fontSize: '11px', letterSpacing: '4px', color: 'rgba(203,166,88,0.9)', cursor: 'pointer' }}>ENJOY BAJA</div>
          <div style={{ ...glassText, fontSize: '9px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)', padding: '4px 12px', background: 'rgba(203,166,88,0.1)', border: '1px solid rgba(203,166,88,0.2)' }}>{isOwner?'OWNER ACCESS':'SALES ACCESS'}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ ...glassText, fontSize: '10px', color: 'rgba(148,163,184,0.7)' }}>{user?.name||user?.email}</span>
          <button onClick={handleLogout} style={{ ...styles.button, ...styles.buttonDanger }}>LOGOUT</button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, padding: isMobile?'80px 16px 40px':'100px 48px 60px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ ...glassText, fontSize: isMobile?'24px':'32px', letterSpacing: '6px', marginBottom: '8px', color: 'rgba(226,232,240,0.9)' }}>{isOwner?'ADMIN COMMAND CENTER':'SALES DASHBOARD'}</h1>
          <p style={{ ...glassText, fontSize: '10px', letterSpacing: '2px', color: 'rgba(148,163,184,0.6)' }}>{isOwner?'FULL ACCESS • PROPERTIES • CRM/AI/SI • CALENDAR • AGENTS • MARKETING • ANALYTICS':'ZADARMA CRM/PBX • TEAM CALENDAR'}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', padding: '12px 20px', background: isOwner?'rgba(203,166,88,0.1)':'rgba(96,165,250,0.1)', border: `1px solid ${isOwner?'rgba(203,166,88,0.3)':'rgba(96,165,250,0.3)'}` }}>
          <div>
            <p style={{ ...glassText, fontSize: '11px', color: isOwner?'#cba658':'#60a5fa', margin: 0, letterSpacing: '1px' }}>{isOwner?'OWNER MODE - FULL ACCESS':'SALES MODE - LIMITED ACCESS'}</p>
            <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148,163,184,0.5)', margin: '2px 0 0' }}>{isOwner?'All admin features unlocked':'CRM/PBX and Team Calendar only'}</p>
          </div>
        </div>

        {/* ACCORDION SECTIONS */}
        {isOwner && (
          <AccordionSection title="COMMAND CENTER" subtitle="All Modules • Quick Actions • Live Counts" icon="⚡" isOpen={openSections.command} onToggle={() => toggle('command')}>
            <CommandCenter navigate={navigate} />
          </AccordionSection>
        )}

        <AccordionSection title="PROPERTY MANAGER" subtitle="Add, Edit, Remove Properties & Photos" icon="🏠" isOpen={openSections.properties} onToggle={() => toggle('properties')} badge={isOwner?`${totalProps} LISTED`:null} locked={!isOwner}>
          <PropertyManager navigate={navigate} />
        </AccordionSection>

        <AccordionSection title="ZADARMA CRM / PBX" subtitle="Call Management, AI Insights, SI Compliance, VoIP Dialer" icon="📞" isOpen={openSections.crm} onToggle={() => toggle('crm')}>
          <ZadarmaCRM />
        </AccordionSection>

        <AccordionSection title={isOwner?"CALENDARS":"TEAM CALENDAR"} subtitle={isOwner?"Private + Shared Team Calendar":"View team activities"} icon="📅" isOpen={openSections.calendar} onToggle={() => toggle('calendar')}>
          <DualCalendar accessLevel={accessLevel} />
        </AccordionSection>

        <AccordionSection title="MARKETING HUB" subtitle="Campaigns, Budgets, Performance" icon="📊" isOpen={openSections.marketing} onToggle={() => toggle('marketing')} badge={isOwner?`${liveCampaigns} LIVE`:null} locked={!isOwner}>
          <MarketingHub navigate={navigate} />
        </AccordionSection>

        <AccordionSection title="AGENT MANAGEMENT" subtitle="Approve, Reject, Set Permissions & PIN" icon="👥" isOpen={openSections.agents} onToggle={() => toggle('agents')} badge={isOwner&&pendingAgents.length>0?`${pendingAgents.length} PENDING`:null} locked={!isOwner}>
          <AgentApprovals />
        </AccordionSection>

        <AccordionSection title="ANALYTICS" subtitle="Live Data from Properties, Agents & Campaigns" icon="📈" isOpen={openSections.analytics} onToggle={() => toggle('analytics')} locked={!isOwner}>
          <AnalyticsDashboard />
        </AccordionSection>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '24px 48px', borderTop: '1px solid rgba(148,163,184,0.1)', textAlign: 'center' }}>
        <p style={{ ...glassText, fontSize: '9px', color: 'rgba(148,163,184,0.4)', letterSpacing: '1px' }}>ENJOYBAJA {isOwner?'ADMIN':'SALES'} DASHBOARD v3.0 • {isOwner?'COMMAND CENTER':'LIMITED ACCESS'}</p>
      </div>
    </div>
  );
}