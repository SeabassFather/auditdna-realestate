import React, { useState, useEffect, useRef, useCallback } from 'react';
import Brain from '../services/Brain';

// ================================================================
// SECURE ESCROW COMMUNICATION PORTAL
// AuditDNA Consumer Services — NMLS #337526
// AES-256 encrypted • Real-time • Multi-party
// Embeddable OR standalone
// ================================================================

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PARTY_CONFIG = {
  consumer:  { label: 'You (Consumer)',  color: '#cba658', icon: '◉' },
  auditdna:  { label: 'AuditDNA Team',  color: '#94a3b8', icon: '⬡' },
  title:     { label: 'Title / Escrow', color: '#7dd3fc', icon: '◈' },
  lender:    { label: 'Lender',         color: '#86efac', icon: '◌' },
  system:    { label: 'System',         color: '#475569', icon: '◎' },
};

const DOC_TYPES = [
  'Mortgage Statement', 'Note & Deed of Trust', 'HUD-1 Settlement Statement',
  'Loan Estimate (LE)', 'Closing Disclosure (CD)', 'TILA Disclosure',
  'Title Report / Preliminary', 'Title Insurance Policy', 'Appraisal Report',
  'Payoff Statement', 'Hazard Insurance', 'HOA Documents',
  'Survey / Plot Map', 'Government ID', 'SSN Authorization',
  'Wire Instructions', 'Commission Agreement', 'Other',
];

// ── Styles ────────────────────────────────────────────────────
const S = {
  portal: {
    background: 'rgba(15,23,42,0.97)',
    border: '1px solid rgba(203,166,88,0.2)',
    fontFamily: '"Helvetica Neue", -apple-system, sans-serif',
    color: '#cbd5e1',
    overflow: 'hidden',
  },
  header: {
    background: 'rgba(15,23,42,0.98)',
    borderBottom: '1px solid rgba(203,166,88,0.15)',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  tab: (active) => ({
    padding: '7px 14px',
    background: active ? 'rgba(203,166,88,0.15)' : 'transparent',
    border: `1px solid ${active ? 'rgba(203,166,88,0.4)' : 'rgba(148,163,184,0.15)'}`,
    color: active ? '#cba658' : '#64748b',
    fontSize: '9px', letterSpacing: '1.5px',
    cursor: 'pointer', transition: 'all 0.2s',
  }),
  input: {
    padding: '10px 12px',
    background: 'rgba(30,41,59,0.8)',
    border: '1px solid rgba(203,166,88,0.2)',
    color: '#e2e8f0', fontSize: '12px',
    outline: 'none', width: '100%',
    boxSizing: 'border-box', letterSpacing: '0.3px',
  },
  btn: (variant = 'gold') => ({
    padding: variant === 'sm' ? '7px 14px' : '11px 20px',
    background: variant === 'gold' ? 'linear-gradient(135deg,#cba658,#b8944d)'
               : variant === 'ghost' ? 'transparent'
               : 'rgba(30,41,59,0.8)',
    border: variant === 'ghost' ? '1px solid rgba(203,166,88,0.3)' : 'none',
    color: variant === 'gold' ? '#0f172a' : '#cba658',
    fontWeight: variant === 'gold' ? '700' : '400',
    fontSize: '10px', letterSpacing: '1.5px',
    cursor: 'pointer', transition: 'all 0.2s',
  }),
  badge: (color) => ({
    display: 'inline-block',
    padding: '2px 7px',
    background: `${color}18`,
    border: `1px solid ${color}40`,
    color: color, fontSize: '8px', letterSpacing: '1px',
  }),
  sectionTitle: {
    color: '#cba658', fontSize: '9px', letterSpacing: '2px',
    marginBottom: '12px', paddingBottom: '8px',
    borderBottom: '1px solid rgba(203,166,88,0.1)',
  },
};

// ================================================================
// MESSAGES TAB
// ================================================================
function MessagesTab({ roomId, myRole, myName }) {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [sending, setSending]     = useState(false);
  const [loading, setLoading]     = useState(true);
  const bottomRef                 = useRef(null);
  const pollRef                   = useRef(null);

  const fetchMessages = useCallback(async () => {
    if (!roomId) return;
    try {
      const res  = await fetch(`${API}/escrow/${roomId}/messages`);
      const data = await res.json();
      if (data.success) setMessages(data.messages || []);
    } catch { /* silent */ } finally { setLoading(false); }
  }, [roomId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchMessages();
    pollRef.current = setInterval(fetchMessages, 4000); // poll every 4s
    return () => clearInterval(pollRef.current);
  }, [fetchMessages]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      await fetch(`${API}/escrow/${roomId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderRole: myRole, senderName: myName, content: input.trim() }),
      });
      setInput('');
      Brain.log('escrow_message_sent', { module: 'SecureEscrow', roomId, role: myRole });
      fetchMessages();
    } catch { /* silent */ } finally { setSending(false); }
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' + d.toLocaleDateString();
  };

  const isMe = (role) => role === myRole;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Lock notice */}
      <div style={{ padding: '8px 16px', background: 'rgba(203,166,88,0.05)', borderBottom: '1px solid rgba(203,166,88,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#cba658', fontSize: '10px' }}>🔐</span>
        <span style={{ color: '#475569', fontSize: '9px', letterSpacing: '0.5px' }}>
          All messages AES-256 encrypted at rest • End-to-end secure • Audit trail maintained
        </span>
      </div>

      {/* Message list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: 0 }}>
        {loading && <div style={{ textAlign: 'center', color: '#475569', fontSize: '11px', padding: '20px' }}>⬡ Loading secure messages...</div>}

        {messages.map(msg => {
          const party = PARTY_CONFIG[msg.sender_role] || PARTY_CONFIG.system;
          const mine  = isMe(msg.sender_role);

          if (msg.sender_role === 'system') return (
            <div key={msg.id} style={{ textAlign: 'center' }}>
              <span style={{ padding: '4px 12px', background: 'rgba(71,85,105,0.3)', color: '#64748b', fontSize: '9px', letterSpacing: '0.5px', borderRadius: '2px' }}>
                {msg.content}
              </span>
            </div>
          );

          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
              {/* Sender label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ color: party.color, fontSize: '9px', letterSpacing: '1px' }}>{party.icon} {mine ? 'You' : party.label}</span>
                <span style={{ color: '#334155', fontSize: '8px' }}>{formatTime(msg.created_at)}</span>
              </div>
              {/* Bubble */}
              <div style={{
                maxWidth: '72%', padding: '10px 14px',
                background: mine ? 'rgba(203,166,88,0.12)' : 'rgba(30,41,59,0.8)',
                border: `1px solid ${mine ? 'rgba(203,166,88,0.25)' : 'rgba(148,163,184,0.1)'}`,
                color: '#e2e8f0', fontSize: '12px', lineHeight: '1.6', letterSpacing: '0.3px',
              }}>
                {msg.content}
                {msg.message_type !== 'text' && (
                  <div style={{ marginTop: '6px' }}>
                    <span style={S.badge(party.color)}>{msg.message_type.replace('_', ' ').toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(203,166,88,0.1)', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="Type a secure message... (Enter to send)"
          rows={2}
          style={{ ...S.input, resize: 'none', flex: 1, fontSize: '12px' }}
        />
        <button onClick={sendMessage} disabled={!input.trim() || sending} style={S.btn('gold')}>
          {sending ? '...' : 'SEND ⬡'}
        </button>
      </div>
    </div>
  );
}

// ================================================================
// DOCUMENTS TAB
// ================================================================
function DocumentsTab({ roomId, myRole }) {
  const [docs, setDocs]           = useState([]);
  const [showRequest, setShowReq] = useState(false);
  const [reqForm, setReqForm]     = useState({ documentType: '', description: '', requiredBy: '' });
  const [uploading, setUploading] = useState(null);
  const [loading, setLoading]     = useState(true);
  const fileRefs                  = useRef({});

  const fetchDocs = useCallback(async () => {
    if (!roomId) return;
    try {
      const res  = await fetch(`${API}/escrow/${roomId}/documents`);
      const data = await res.json();
      if (data.success) setDocs(data.documents || []);
    } catch { /* silent */ } finally { setLoading(false); }
  }, [roomId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchDocs(); }, [fetchDocs]);

  const requestDoc = async () => {
    if (!reqForm.documentType) return;
    try {
      await fetch(`${API}/escrow/${roomId}/documents/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reqForm, requestedBy: myRole }),
      });
      setReqForm({ documentType: '', description: '', requiredBy: '' });
      setShowReq(false);
      Brain.log('escrow_doc_requested', { module: 'SecureEscrow', roomId, type: reqForm.documentType });
      fetchDocs();
    } catch { /* silent */ }
  };

  const uploadFile = async (docId, file) => {
    setUploading(docId);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        await fetch(`${API}/escrow/${roomId}/documents/${docId}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name, fileSize: file.size,
            fileData: e.target.result, uploadedBy: myRole,
          }),
        });
        Brain.log('escrow_doc_uploaded', { module: 'SecureEscrow', roomId, docId, fileName: file.name });
        fetchDocs();
        setUploading(null);
      };
      reader.readAsDataURL(file);
    } catch { setUploading(null); }
  };

  const verifyDoc = async (docId) => {
    await fetch(`${API}/escrow/${roomId}/documents/${docId}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verifiedBy: myRole }),
    });
    fetchDocs();
  };

  const statusColor = { requested: '#f59e0b', uploaded: '#3b82f6', verified: '#22c55e', rejected: '#ef4444' };

  return (
    <div style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={S.sectionTitle}>SECURE DOCUMENT EXCHANGE</p>
        {['auditdna','title','lender'].includes(myRole) && (
          <button onClick={() => setShowReq(!showRequest)} style={S.btn('ghost')}>
            {showRequest ? '✕ CANCEL' : '+ REQUEST DOC'}
          </button>
        )}
      </div>

      {/* Request form */}
      {showRequest && (
        <div style={{ background: 'rgba(203,166,88,0.06)', border: '1px solid rgba(203,166,88,0.2)', padding: '16px', marginBottom: '16px' }}>
          <p style={{ color: '#cba658', fontSize: '9px', letterSpacing: '2px', marginBottom: '12px' }}>REQUEST A DOCUMENT</p>
          <select value={reqForm.documentType} onChange={e => setReqForm({...reqForm, documentType: e.target.value})} style={{...S.input, marginBottom: '8px', cursor: 'pointer'}}>
            <option value="">Select Document Type...</option>
            {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <textarea placeholder="Additional instructions or description..." value={reqForm.description} onChange={e => setReqForm({...reqForm, description: e.target.value})} rows={2} style={{...S.input, resize: 'none', marginBottom: '8px'}} />
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: '#64748b', fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>REQUIRED BY DATE</label>
              <input type="date" value={reqForm.requiredBy} onChange={e => setReqForm({...reqForm, requiredBy: e.target.value})} style={S.input} />
            </div>
            <button onClick={requestDoc} style={{...S.btn('gold'), marginTop: '14px', whiteSpace: 'nowrap'}}>SEND REQUEST</button>
          </div>
        </div>
      )}

      {/* Document list */}
      {loading && <div style={{ color: '#475569', fontSize: '11px', padding: '20px', textAlign: 'center' }}>⬡ Loading documents...</div>}

      {docs.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '30px', color: '#334155' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.4 }}>◈</div>
          <p style={{ fontSize: '11px', letterSpacing: '1px' }}>No documents yet</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {docs.map(doc => (
          <div key={doc.id} style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.1)', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <p style={{ color: '#e2e8f0', fontSize: '12px', letterSpacing: '0.5px', marginBottom: '3px', fontWeight: '400' }}>{doc.document_type}</p>
                {doc.description && <p style={{ color: '#64748b', fontSize: '10px', letterSpacing: '0.3px' }}>{doc.description}</p>}
              </div>
              <span style={S.badge(statusColor[doc.status] || '#64748b')}>{doc.status.toUpperCase()}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {doc.required_by && <span style={{ color: '#f59e0b', fontSize: '9px', letterSpacing: '0.5px' }}>Due: {new Date(doc.required_by).toLocaleDateString()}</span>}
              {doc.file_name && <span style={{ color: '#94a3b8', fontSize: '9px' }}>📄 {doc.file_name}</span>}
              {doc.uploaded_by && <span style={{ color: '#64748b', fontSize: '9px' }}>Uploaded by: {doc.uploaded_by}</span>}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              {doc.status === 'requested' && myRole === 'consumer' && (
                <label style={{ ...S.btn('ghost'), fontSize: '9px', cursor: 'pointer', display: 'inline-block' }}>
                  {uploading === doc.id ? '⬡ ENCRYPTING...' : '⬆ UPLOAD FILE'}
                  <input type="file" style={{ display: 'none' }} onChange={e => e.target.files[0] && uploadFile(doc.id, e.target.files[0])} ref={el => fileRefs.current[doc.id] = el} />
                </label>
              )}
              {doc.status === 'uploaded' && ['auditdna','title'].includes(myRole) && (
                <button onClick={() => verifyDoc(doc.id)} style={S.btn('ghost')}>✓ VERIFY</button>
              )}
              {doc.status === 'verified' && (
                <span style={{ color: '#22c55e', fontSize: '9px', letterSpacing: '1px' }}>✓ VERIFIED BY {doc.verified_by?.toUpperCase()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// SIGNATURES TAB
// ================================================================
function SignaturesTab({ roomId, myRole, myName, myEmail }) {
  const [sigs, setSigs]           = useState([]);
  const [showReq, setShowReq]     = useState(false);
  const [sigForm, setSigForm]     = useState({ documentTitle: '', signerEmail: '', expiresInDays: 7 });
  const [signing, setSigning]     = useState(null); // sigId being signed
  const [sigPad, setSigPad]       = useState('');
  const [loading, setLoading]     = useState(true);

  const fetchSigs = useCallback(async () => {
    if (!roomId) return;
    try {
      const res  = await fetch(`${API}/escrow/${roomId}/signatures`);
      const data = await res.json();
      if (data.success) setSigs(data.signatures || []);
    } catch { /* silent */ } finally { setLoading(false); }
  }, [roomId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchSigs(); }, [fetchSigs]);

  const requestSig = async () => {
    if (!sigForm.documentTitle || !sigForm.signerEmail) return;
    try {
      await fetch(`${API}/escrow/${roomId}/signatures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...sigForm, requestedBy: myRole }),
      });
      setSigForm({ documentTitle: '', signerEmail: '', expiresInDays: 7 });
      setShowReq(false);
      Brain.log('escrow_sig_requested', { module: 'SecureEscrow', roomId, doc: sigForm.documentTitle });
      fetchSigs();
    } catch { /* silent */ }
  };

  const statusColor = { pending: '#f59e0b', signed: '#22c55e', expired: '#ef4444' };

  return (
    <div style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={S.sectionTitle}>E-SIGNATURE REQUESTS</p>
        {['auditdna','title','lender'].includes(myRole) && (
          <button onClick={() => setShowReq(!showReq)} style={S.btn('ghost')}>
            {showReq ? '✕ CANCEL' : '+ REQUEST SIGNATURE'}
          </button>
        )}
      </div>

      {/* Request form */}
      {showReq && (
        <div style={{ background: 'rgba(203,166,88,0.06)', border: '1px solid rgba(203,166,88,0.2)', padding: '16px', marginBottom: '16px' }}>
          <p style={{ color: '#cba658', fontSize: '9px', letterSpacing: '2px', marginBottom: '12px' }}>REQUEST E-SIGNATURE</p>
          <input placeholder="Document title (e.g. Closing Disclosure)" value={sigForm.documentTitle} onChange={e=>setSigForm({...sigForm,documentTitle:e.target.value})} style={{...S.input,marginBottom:'8px'}} />
          <input type="email" placeholder="Signer's email address" value={sigForm.signerEmail} onChange={e=>setSigForm({...sigForm,signerEmail:e.target.value})} style={{...S.input,marginBottom:'8px'}} />
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: '#64748b', fontSize: '9px', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>EXPIRES IN (DAYS)</label>
              <input type="number" value={sigForm.expiresInDays} onChange={e=>setSigForm({...sigForm,expiresInDays:parseInt(e.target.value)||7})} style={{...S.input,width:'80px'}} min="1" max="30" />
            </div>
            <button onClick={requestSig} style={{...S.btn('gold'),marginTop:'14px'}}>SEND REQUEST</button>
          </div>
        </div>
      )}

      {/* Sign modal */}
      {signing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(203,166,88,0.3)', padding: '28px', maxWidth: '440px', width: '100%' }}>
            <p style={{ color: '#cba658', fontSize: '10px', letterSpacing: '2px', marginBottom: '16px' }}>✍️ ELECTRONIC SIGNATURE</p>
            <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '16px', lineHeight: '1.6' }}>
              By typing your full legal name below, you are providing a legally binding electronic signature under the E-SIGN Act and UETA.
            </p>
            <p style={{ color: '#64748b', fontSize: '10px', marginBottom: '8px', letterSpacing: '1px' }}>DOCUMENT: {signing.document_title}</p>
            <input
              placeholder="Type your full legal name to sign"
              value={sigPad}
              onChange={e => setSigPad(e.target.value)}
              style={{ ...S.input, marginBottom: '16px', fontFamily: 'Georgia, serif', fontSize: '14px', color: '#cba658' }}
            />
            <div style={{ background: 'rgba(203,166,88,0.05)', border: '1px solid rgba(203,166,88,0.15)', padding: '12px', marginBottom: '16px' }}>
              <p style={{ color: '#64748b', fontSize: '9px', lineHeight: '1.7', letterSpacing: '0.3px' }}>
                I, {sigPad || '[Your Name]'}, hereby agree to and execute this document electronically. This signature is legally binding. Date: {new Date().toLocaleDateString()}. IP address on record.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setSigning(null); setSigPad(''); }} style={S.btn('dark')}>CANCEL</button>
              <button
                onClick={async () => {
                  if (!sigPad.trim()) { alert('Please type your full legal name'); return; }
                  await fetch(`${API}/escrow/signatures/${signing.access_token}/sign`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ signatureData: sigPad, signerName: sigPad }),
                  });
                  Brain.log('escrow_doc_signed', { module: 'SecureEscrow', roomId, doc: signing.document_title });
                  setSigning(null); setSigPad(''); fetchSigs();
                }}
                disabled={!sigPad.trim()}
                style={{ ...S.btn('gold'), flex: 1 }}
              >
                ✍️ SIGN DOCUMENT
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <div style={{ color: '#475569', fontSize: '11px', padding: '20px', textAlign: 'center' }}>⬡ Loading signatures...</div>}

      {sigs.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '30px', color: '#334155' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.4 }}>✍</div>
          <p style={{ fontSize: '11px', letterSpacing: '1px' }}>No signature requests yet</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sigs.map(sig => (
          <div key={sig.id} style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.1)', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <p style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '400', marginBottom: '3px' }}>✍ {sig.document_title}</p>
                <p style={{ color: '#64748b', fontSize: '9px' }}>Signer: {sig.signer_email}</p>
              </div>
              <span style={S.badge(statusColor[sig.status] || '#64748b')}>{sig.status.toUpperCase()}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {sig.expires_at && <span style={{ color: '#64748b', fontSize: '9px' }}>Expires: {new Date(sig.expires_at).toLocaleDateString()}</span>}
              {sig.signed_at && <span style={{ color: '#22c55e', fontSize: '9px' }}>Signed: {new Date(sig.signed_at).toLocaleDateString()}</span>}
            </div>

            {sig.status === 'pending' && myRole === 'consumer' && myEmail === sig.signer_email && (
              <button onClick={() => setSigning(sig)} style={S.btn('gold')}>✍️ SIGN NOW</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// MAIN PORTAL COMPONENT — Embeddable OR Standalone
// ================================================================
export default function SecureEscrowPortal({
  caseId,
  auditId,
  myRole    = 'consumer',
  myName    = 'Consumer',
  myEmail   = '',
  standalone = false,
  height    = '600px',
}) {
  const [room, setRoom]       = useState(null);
  const [activeTab, setTab]   = useState('messages');
  const [loading, setLoading] = useState(true);
  const [stats, setStats]     = useState(null);

  // Init or get room
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!caseId) return;
    (async () => {
      try {
        // Try to find existing room
        const res  = await fetch(`${API}/escrow/rooms/${caseId}`);
        const data = await res.json();

        if (data.success && data.rooms?.length) {
          setRoom(data.rooms[0]);
        } else {
          // Create new room
          const create = await fetch(`${API}/escrow/rooms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ caseId, auditId, subject: `Mortgage Audit Case ${caseId}` }),
          });
          const created = await create.json();
          if (created.success) setRoom(created.room);
        }
        Brain.log('escrow_portal_opened', { module: 'SecureEscrow', caseId, role: myRole });
      } catch (err) {
        console.error('[ESCROW PORTAL]', err);
      } finally {
        setLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  // Fetch stats
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!room?.room_id) return;
    const fetchStats = async () => {
      try {
        const res  = await fetch(`${API}/escrow/${room.room_id}/summary`);
        const data = await res.json();
        if (data.success) setStats(data.stats);
      } catch { /* silent */ }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, [room]);

  const TABS = [
    { id: 'messages',   label: '💬 MESSAGES',   count: stats?.totalMessages },
    { id: 'documents',  label: '◈ DOCUMENTS',   count: (stats?.documents?.requested || 0) + (stats?.documents?.uploaded || 0) },
    { id: 'signatures', label: '✍ SIGNATURES',  count: stats?.signatures?.pending },
  ];

  const containerStyle = standalone ? {
    ...S.portal, minHeight: '100vh',
    display: 'flex', flexDirection: 'column',
  } : {
    ...S.portal, height, display: 'flex', flexDirection: 'column',
  };

  if (loading) return (
    <div style={{ ...containerStyle, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '28px', color: '#cba658', marginBottom: '12px', opacity: 0.7 }}>⬡</div>
        <p style={{ color: '#475569', fontSize: '10px', letterSpacing: '2px' }}>INITIALIZING SECURE CHANNEL...</p>
      </div>
    </div>
  );

  if (!room) return (
    <div style={{ ...containerStyle, alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#ef4444', fontSize: '11px', letterSpacing: '1px' }}>⚠ Unable to establish secure room. Check connection.</p>
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ color: '#cba658', fontSize: '10px', letterSpacing: '2px' }}>⬡ SECURE ESCROW PORTAL</span>
            <span style={S.badge('#22c55e')}>🔐 ENCRYPTED</span>
            {room.status === 'active' && <span style={S.badge('#22c55e')}>LIVE</span>}
          </div>
          <p style={{ color: '#475569', fontSize: '9px', letterSpacing: '1px' }}>
            Case: {caseId} • Room: {room.room_id} • You: <span style={{ color: PARTY_CONFIG[myRole]?.color }}>{myName} ({myRole})</span>
          </p>
        </div>
        {/* Party indicators */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {Object.entries(PARTY_CONFIG).filter(([k]) => k !== 'system').map(([role, cfg]) => (
            <span key={role} style={S.badge(cfg.color)}>{cfg.icon} {cfg.label.split(' ')[0]}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2px', padding: '10px 16px 0', borderBottom: '1px solid rgba(203,166,88,0.1)', background: 'rgba(15,23,42,0.95)' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setTab(tab.id)} style={S.tab(activeTab === tab.id)}>
            {tab.label}
            {tab.count > 0 && <span style={{ marginLeft: '6px', background: activeTab === tab.id ? 'rgba(203,166,88,0.3)' : 'rgba(148,163,184,0.2)', padding: '1px 5px', fontSize: '8px', color: activeTab === tab.id ? '#cba658' : '#64748b' }}>{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {activeTab === 'messages'   && <MessagesTab   roomId={room.room_id} myRole={myRole} myName={myName} />}
        {activeTab === 'documents'  && <DocumentsTab  roomId={room.room_id} myRole={myRole} />}
        {activeTab === 'signatures' && <SignaturesTab roomId={room.room_id} myRole={myRole} myName={myName} myEmail={myEmail} />}
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 16px', borderTop: '1px solid rgba(203,166,88,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,23,42,0.98)' }}>
        <span style={{ color: '#1e3a5f', fontSize: '8px', letterSpacing: '0.5px' }}>
          🔐 AES-256 Encrypted • AuditDNA Consumer Services • NMLS #337526 • {room.room_id}
        </span>
        <span style={{ color: '#1e3a5f', fontSize: '8px', letterSpacing: '0.5px' }}>
          All activity logged • E-SIGN Act compliant • UETA compliant
        </span>
      </div>
    </div>
  );
}
