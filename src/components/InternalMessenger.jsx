import React, { useState, useEffect, useRef, useCallback } from 'react';
import Brain from '../services/Brain';

// ================================================================
// INTERNAL STAFF MESSENGER
// AuditDNA Platform — Sales ↔ Admin ↔ Agents
// Floating widget — lives inside the app at all times
// Direct messages + group channels + data sharing
// ================================================================

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ROLE_COLORS = {
  admin:   '#cba658',
  sales:   '#7dd3fc',
  agent:   '#86efac',
  owner:   '#f59e0b',
  staff:   '#94a3b8',
  system:  '#475569',
};

const STATUS_COLORS = {
  online:  '#22c55e',
  away:    '#f59e0b',
  busy:    '#ef4444',
  offline: '#334155',
};

const EMOJIS = ['👍','✅','🔥','❗','💰','📄','🏠','⚡'];

// ── Styles ────────────────────────────────────────────────────
const G = '#cba658';
const DARK = '#0f172a';
// ================================================================
// CHANNEL LIST SIDEBAR
// ================================================================
function ChannelList({ channels, activeChannel, onSelect, unreadTotals, onNewDM, onNewChannel }) {
  const groups  = channels.filter(c => c.type === 'group' || c.type === 'broadcast');
  const dms     = channels.filter(c => c.type === 'direct');

  const ChannelItem = ({ ch }) => {
    const unread = parseInt(ch.unread_count) || 0;
    const isActive = activeChannel?.channel_id === ch.channel_id;
    return (
      <button onClick={() => onSelect(ch)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '7px 12px', textAlign: 'left',
        background: isActive ? 'rgba(203,166,88,0.12)' : 'transparent',
        border: 'none',
        borderLeft: isActive ? `2px solid ${G}` : '2px solid transparent',
        cursor: 'pointer', transition: 'all 0.15s',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: isActive ? G : unread ? '#e2e8f0' : '#64748b', fontSize: '11px', letterSpacing: '0.5px', marginBottom: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {ch.name}
          </p>
          {ch.last_message && (
            <p style={{ color: '#334155', fontSize: '9px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {ch.last_message.sender_name?.split(' ')[0]}: {ch.last_message.content}
            </p>
          )}
        </div>
        {unread > 0 && (
          <span style={{ minWidth: '18px', height: '18px', background: G, color: DARK, fontSize: '9px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '6px', flexShrink: 0 }}>
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>
    );
  };

  return (
    <div style={{ width: '180px', borderRight: '1px solid rgba(203,166,88,0.1)', display: 'flex', flexDirection: 'column', flexShrink: 0, background: 'rgba(15,23,42,0.98)' }}>
      {/* Header */}
      <div style={{ padding: '12px', borderBottom: '1px solid rgba(203,166,88,0.1)' }}>
        <p style={{ color: G, fontSize: '9px', letterSpacing: '2px', marginBottom: '8px' }}>⬡ AUDITDNA CHAT</p>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button onClick={onNewChannel} title="New Channel" style={{ flex: 1, padding: '5px', background: 'rgba(203,166,88,0.08)', border: '1px solid rgba(203,166,88,0.2)', color: G, fontSize: '9px', letterSpacing: '1px', cursor: 'pointer' }}>+ CHANNEL</button>
          <button onClick={onNewDM} title="New Direct Message" style={{ flex: 1, padding: '5px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(148,163,184,0.15)', color: '#94a3b8', fontSize: '9px', letterSpacing: '1px', cursor: 'pointer' }}>+ DM</button>
        </div>
      </div>

      {/* Scrollable channel list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {/* Groups */}
        <p style={{ color: '#334155', fontSize: '8px', letterSpacing: '2px', padding: '4px 12px 2px', textTransform: 'uppercase' }}>CHANNELS</p>
        {groups.map(ch => <ChannelItem key={ch.channel_id} ch={ch} />)}

        {/* DMs */}
        {dms.length > 0 && (
          <>
            <p style={{ color: '#334155', fontSize: '8px', letterSpacing: '2px', padding: '10px 12px 2px', textTransform: 'uppercase' }}>DIRECT</p>
            {dms.map(ch => <ChannelItem key={ch.channel_id} ch={ch} />)}
          </>
        )}
      </div>
    </div>
  );
}

// ================================================================
// PRESENCE PANEL
// ================================================================
function PresencePanel({ users }) {
  const online  = users.filter(u => u.status === 'online');
  const away    = users.filter(u => u.status === 'away' || u.status === 'busy');
  const offline = users.filter(u => u.status === 'offline');

  const UserRow = ({ u }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '5px 12px' }}>
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: STATUS_COLORS[u.status], flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: u.status === 'offline' ? '#334155' : '#94a3b8', fontSize: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</p>
        <p style={{ color: '#1e3a5f', fontSize: '8px', letterSpacing: '0.5px' }}>{u.role}</p>
      </div>
    </div>
  );

  return (
    <div style={{ width: '150px', borderLeft: '1px solid rgba(203,166,88,0.1)', background: 'rgba(15,23,42,0.98)', overflowY: 'auto', flexShrink: 0 }}>
      <p style={{ color: '#334155', fontSize: '8px', letterSpacing: '2px', padding: '12px 12px 6px' }}>TEAM ONLINE</p>
      {online.length === 0 && <p style={{ color: '#1e3a5f', fontSize: '9px', padding: '4px 12px' }}>No one online</p>}
      {online.map(u => <UserRow key={u.email} u={u} />)}
      {away.length > 0 && (
        <>
          <p style={{ color: '#1e3a5f', fontSize: '8px', letterSpacing: '2px', padding: '8px 12px 4px' }}>AWAY</p>
          {away.map(u => <UserRow key={u.email} u={u} />)}
        </>
      )}
      {offline.length > 0 && (
        <>
          <p style={{ color: '#1e3a5f', fontSize: '8px', letterSpacing: '2px', padding: '8px 12px 4px' }}>OFFLINE</p>
          {offline.slice(0, 5).map(u => <UserRow key={u.email} u={u} />)}
        </>
      )}
    </div>
  );
}

// ================================================================
// MESSAGE BUBBLE
// ================================================================
function MessageBubble({ msg, myEmail, onReact, onDelete }) {
  const [showActions, setShowActions] = useState(false);
  const isMe = msg.sender_email === myEmail;
  const roleColor = ROLE_COLORS[msg.sender_role] || ROLE_COLORS.staff;

  if (msg.deleted) return (
    <div style={{ padding: '4px 0', opacity: 0.4 }}>
      <span style={{ color: '#334155', fontSize: '10px', fontStyle: 'italic' }}>Message deleted</span>
    </div>
  );

  if (msg.msg_type === 'system') return (
    <div style={{ textAlign: 'center', padding: '4px 0' }}>
      <span style={{ color: '#334155', fontSize: '9px', background: 'rgba(30,41,59,0.5)', padding: '3px 10px', letterSpacing: '0.5px' }}>{msg.content}</span>
    </div>
  );

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', marginBottom: '10px', position: 'relative' }}
    >
      {/* Sender + time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
        <span style={{ color: roleColor, fontSize: '9px', letterSpacing: '0.5px', fontWeight: '600' }}>
          {isMe ? 'You' : msg.sender_name}
        </span>
        <span style={{ color: '#1e3a5f', fontSize: '8px' }}>
          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {msg.edited && <span style={{ color: '#1e3a5f', fontSize: '8px', fontStyle: 'italic' }}>(edited)</span>}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '75%', padding: '9px 13px',
        background: isMe ? 'rgba(203,166,88,0.12)' : 'rgba(30,41,59,0.7)',
        border: `1px solid ${isMe ? 'rgba(203,166,88,0.25)' : 'rgba(148,163,184,0.1)'}`,
        color: '#e2e8f0', fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.2px',
        wordBreak: 'break-word',
      }}>
        {/* Data payload card */}
        {msg.data_payload && (
          <div style={{ background: 'rgba(203,166,88,0.08)', border: '1px solid rgba(203,166,88,0.2)', padding: '8px', marginBottom: '8px' }}>
            <p style={{ color: G, fontSize: '8px', letterSpacing: '1.5px', marginBottom: '6px' }}>⬡ SHARED DATA</p>
            {Object.entries(msg.data_payload).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '3px' }}>
                <span style={{ color: '#64748b', fontSize: '9px', letterSpacing: '0.5px' }}>{k}</span>
                <span style={{ color: '#e2e8f0', fontSize: '9px', fontWeight: '600' }}>{String(v)}</span>
              </div>
            ))}
          </div>
        )}
        {msg.content}

        {/* Attachments */}
        {msg.attachments?.length > 0 && (
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {msg.attachments.map((att, i) => (
              <div key={i} style={{ padding: '5px 8px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.15)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#64748b', fontSize: '11px' }}>📄</span>
                <span style={{ color: '#94a3b8', fontSize: '10px' }}>{att.name || att}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reactions */}
      {msg.reactions && Object.keys(msg.reactions).length > 0 && (
        <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
          {Object.entries(msg.reactions).map(([emoji, users]) => users.length > 0 && (
            <button key={emoji} onClick={() => onReact(msg.id, emoji)} style={{
              padding: '2px 7px', background: users.includes(myEmail) ? 'rgba(203,166,88,0.15)' : 'rgba(30,41,59,0.6)',
              border: `1px solid ${users.includes(myEmail) ? 'rgba(203,166,88,0.3)' : 'rgba(148,163,184,0.15)'}`,
              cursor: 'pointer', fontSize: '11px', color: '#94a3b8',
            }}>
              {emoji} <span style={{ fontSize: '9px' }}>{users.length}</span>
            </button>
          ))}
        </div>
      )}

      {/* Hover actions */}
      {showActions && (
        <div style={{
          position: 'absolute', top: '-28px', [isMe ? 'left' : 'right']: 0,
          display: 'flex', gap: '2px', background: DARK,
          border: '1px solid rgba(148,163,184,0.15)', padding: '3px',
          zIndex: 10,
        }}>
          {EMOJIS.map(e => (
            <button key={e} onClick={() => onReact(msg.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: '2px 3px', opacity: 0.8 }}>{e}</button>
          ))}
          {isMe && (
            <button onClick={() => onDelete(msg.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '10px', padding: '2px 4px' }}>✕</button>
          )}
        </div>
      )}
    </div>
  );
}

// ================================================================
// MAIN MESSENGER COMPONENT
// ================================================================
export default function InternalMessenger({ myEmail, myName, myRole = 'staff' }) {
  const [open, setOpen]           = useState(false);
  const [channels, setChannels]   = useState([]);
  const [activeChannel, setActive]= useState(null);
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [users, setUsers]         = useState([]);
  const [showPresence, setShowP]  = useState(true);
  const [totalUnread, setUnread]  = useState(0);
  const [showShareData, setShareD]= useState(false);
  const [dataFields, setDataF]    = useState([{ key: '', value: '' }]);
  const [newDMEmail, setNewDMEmail]= useState('');
  const [showNewDM, setShowNewDM] = useState(false);
  const bottomRef                 = useRef(null);
  const pollRef                   = useRef(null);
  const presencePollRef           = useRef(null);
  const presencePingRef           = useRef(null);

  // Fetch channels
  const fetchChannels = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/internal-messenger/channels?email=${myEmail}`);
      const data = await res.json();
      if (data.success) {
        setChannels(data.channels);
        setUnread(data.channels.reduce((s, c) => s + (parseInt(c.unread_count) || 0), 0));
      }
    } catch { /* silent */ }
  }, [myEmail]);

  // Fetch messages for active channel
  const fetchMessages = useCallback(async () => {
    if (!activeChannel) return;
    try {
      const res  = await fetch(`${API}/internal-messenger/${activeChannel.channel_id}/messages?email=${myEmail}`);
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch { /* silent */ }
  }, [activeChannel, myEmail]);

  // Fetch presence
  const fetchPresence = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/internal-messenger/presence`);
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch { /* silent */ }
  }, []);

  // Ping presence
  const pingPresence = useCallback(async () => {
    if (!myEmail) return;
    try {
      await fetch(`${API}/internal-messenger/presence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: myEmail, name: myName, role: myRole, status: open ? 'online' : 'away' }),
      });
    } catch { /* silent */ }
  }, [myEmail, myName, myRole, open]);

  const mountedRef = useRef(false);  // StrictMode double-mount guard

  useEffect(() => {
    if (!myEmail) return;
    if (mountedRef.current) return;   // already mounted — skip duplicate
    mountedRef.current = true;

    fetchChannels();
    fetchPresence();
    pingPresence();

    pollRef.current          = setInterval(fetchChannels, 30000);
    presencePollRef.current  = setInterval(fetchPresence, 30000);
    presencePingRef.current  = setInterval(pingPresence, 60000);

    return () => {
      mountedRef.current = false;
      clearInterval(pollRef.current);
      clearInterval(presencePollRef.current);
      clearInterval(presencePingRef.current);
    };
  }, [myEmail, fetchChannels, fetchPresence, pingPresence]);

  useEffect(() => {
    if (!activeChannel) return;
    fetchMessages();
    const poll = setInterval(fetchMessages, 4000);
    return () => clearInterval(poll);
  }, [activeChannel, fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (extraPayload = {}) => {
    if (!input.trim() || !activeChannel) return;
    try {
      await fetch(`${API}/internal-messenger/${activeChannel.channel_id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderEmail: myEmail, senderName: myName, senderRole: myRole,
          content: input.trim(), ...extraPayload,
        }),
      });
      setInput('');
      Brain.log('im_message_sent', { module: 'InternalMessenger', channel: activeChannel.channel_id, role: myRole });
      fetchMessages();
    } catch { /* silent */ }
  };

  const shareData = async () => {
    const payload = {};
    dataFields.filter(f => f.key && f.value).forEach(f => { payload[f.key] = f.value; });
    if (!Object.keys(payload).length) return;
    await fetch(`${API}/internal-messenger/${activeChannel.channel_id}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderEmail: myEmail, senderName: myName, senderRole: myRole,
        content: input || '(Shared data below)',
        msgType: 'data', dataPayload: payload,
      }),
    });
    setInput(''); setDataF([{ key: '', value: '' }]); setShareD(false);
    Brain.log('im_data_shared', { module: 'InternalMessenger', channel: activeChannel.channel_id });
    fetchMessages();
  };

  const reactToMessage = async (msgId, emoji) => {
    await fetch(`${API}/internal-messenger/${activeChannel.channel_id}/messages/${msgId}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji, userEmail: myEmail }),
    });
    fetchMessages();
  };

  const deleteMessage = async (msgId) => {
    await fetch(`${API}/internal-messenger/${activeChannel.channel_id}/messages/${msgId}`, { method: 'DELETE' });
    fetchMessages();
  };

  const openDM = async () => {
    if (!newDMEmail.trim()) return;
    try {
      const res = await fetch(`${API}/internal-messenger/channels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'direct', createdBy: myEmail, targetEmail: newDMEmail.trim() }),
      });
      const data = await res.json();
      if (data.success) { setActive(data.channel); setShowNewDM(false); setNewDMEmail(''); fetchChannels(); }
    } catch { /* silent */ }
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '52px', height: '52px',
          background: open ? 'rgba(15,23,42,0.95)' : `linear-gradient(135deg, ${G}, #b8944d)`,
          border: open ? '1px solid rgba(203,166,88,0.3)' : 'none',
          color: open ? G : DARK,
          fontSize: '20px', cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        title="Staff Messenger"
      >
        {open ? '✕' : '💬'}
        {/* Unread badge */}
        {!open && totalUnread > 0 && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            background: '#ef4444', color: '#fff',
            fontSize: '9px', fontWeight: '700',
            minWidth: '18px', height: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 4px',
          }}>
            {totalUnread > 99 ? '99+' : totalUnread}
          </span>
        )}
      </button>

      {/* Messenger window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '86px', right: '24px',
          width: showPresence ? '680px' : '530px',
          height: '520px',
          background: 'rgba(15,23,42,0.98)',
          border: '1px solid rgba(203,166,88,0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column',
          zIndex: 9998, overflow: 'hidden',
          transition: 'width 0.2s',
        }}>

          {/* Header */}
          <div style={{ padding: '10px 14px', background: 'rgba(15,23,42,0.99)', borderBottom: '1px solid rgba(203,166,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: G, fontSize: '10px', letterSpacing: '2px' }}>⬡ STAFF MESSENGER</span>
              {activeChannel && <span style={{ color: '#64748b', fontSize: '10px' }}>{activeChannel.name}</span>}
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: STATUS_COLORS.online }} />
              <span style={{ color: '#334155', fontSize: '9px' }}>{users.filter(u => u.status === 'online').length} online</span>
              <button onClick={() => setShowP(p => !p)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '11px', padding: '2px 6px' }} title="Toggle team list">
                {showPresence ? '◀' : '▶'}
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
            {/* Channel sidebar */}
            <ChannelList
              channels={channels}
              activeChannel={activeChannel}
              onSelect={ch => { setActive(ch); setMessages([]); }}
              onNewDM={() => setShowNewDM(true)}
              onNewChannel={() => {/* TODO */}}
            />

            {/* Chat area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              {!activeChannel ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: '#1e3a5f', fontSize: '24px' }}>💬</span>
                  <p style={{ color: '#334155', fontSize: '11px', letterSpacing: '1px' }}>Select a channel to start chatting</p>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', minHeight: 0 }}>
                    {messages.map(msg => (
                      <MessageBubble
                        key={msg.id} msg={msg} myEmail={myEmail}
                        onReact={reactToMessage} onDelete={deleteMessage}
                      />
                    ))}
                    <div ref={bottomRef} />
                  </div>

                  {/* Share data panel */}
                  {showShareData && (
                    <div style={{ borderTop: '1px solid rgba(203,166,88,0.1)', padding: '10px 14px', background: 'rgba(203,166,88,0.04)' }}>
                      <p style={{ color: G, fontSize: '9px', letterSpacing: '2px', marginBottom: '8px' }}>⬡ SHARE DATA</p>
                      {dataFields.map((f, i) => (
                        <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                          <input placeholder="Field name" value={f.key} onChange={e => { const d=[...dataFields]; d[i].key=e.target.value; setDataF(d); }}
                            style={{ flex: 1, padding: '6px 8px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(203,166,88,0.2)', color: '#e2e8f0', fontSize: '11px', outline: 'none' }} />
                          <input placeholder="Value" value={f.value} onChange={e => { const d=[...dataFields]; d[i].value=e.target.value; setDataF(d); }}
                            style={{ flex: 1, padding: '6px 8px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(203,166,88,0.2)', color: '#e2e8f0', fontSize: '11px', outline: 'none' }} />
                          <button onClick={() => setDataF(dataFields.filter((_,j)=>j!==i))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                        <button onClick={() => setDataF([...dataFields, { key: '', value: '' }])} style={{ padding: '5px 10px', background: 'transparent', border: '1px solid rgba(148,163,184,0.2)', color: '#64748b', fontSize: '9px', cursor: 'pointer' }}>+ ADD FIELD</button>
                        <button onClick={shareData} style={{ padding: '5px 14px', background: `linear-gradient(135deg,${G},#b8944d)`, border: 'none', color: DARK, fontSize: '9px', fontWeight: '700', cursor: 'pointer', letterSpacing: '1px' }}>SHARE ⬡</button>
                        <button onClick={() => setShareD(false)} style={{ padding: '5px 10px', background: 'transparent', border: 'none', color: '#475569', fontSize: '9px', cursor: 'pointer' }}>CANCEL</button>
                      </div>
                    </div>
                  )}

                  {/* New DM panel */}
                  {showNewDM && (
                    <div style={{ borderTop: '1px solid rgba(203,166,88,0.3)', padding: '12px 14px', background: 'rgba(203,166,88,0.06)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '4px' }}>
                        <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#cba658' }}>NEW DIRECT MESSAGE</span>
                        <input
                          autoFocus
                          placeholder="Staff email — e.g. gl@eb.com"
                          value={newDMEmail}
                          onChange={e => setNewDMEmail(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && openDM()}
                          style={{ padding: '8px 10px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(203,166,88,0.35)', color: '#e2e8f0', fontSize: '12px', outline: 'none' }}
                        />
                      </div>
                      <button onClick={openDM} style={{ padding: '8px 16px', background: `linear-gradient(135deg,${G},#b8944d)`, border: 'none', color: DARK, fontSize: '9px', fontWeight: '700', cursor: 'pointer', letterSpacing: '1px', flexShrink: 0 }}>OPEN DM</button>
                      <button onClick={() => { setShowNewDM(false); setNewDMEmail(''); }} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '16px', flexShrink: 0 }}>✕</button>
                    </div>
                  )}

                  {/* Input */}
                  <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(203,166,88,0.1)', display: 'flex', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
                    <button onClick={() => setShareD(s => !s)} title="Share data" style={{ padding: '8px', background: showShareData ? 'rgba(203,166,88,0.15)' : 'rgba(30,41,59,0.6)', border: `1px solid ${showShareData ? 'rgba(203,166,88,0.4)' : 'rgba(148,163,184,0.15)'}`, color: showShareData ? G : '#475569', cursor: 'pointer', fontSize: '12px', flexShrink: 0 }}>⬡</button>
                    <textarea
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                      placeholder={`Message ${activeChannel?.name || ''}...`}
                      rows={1}
                      style={{ flex: 1, padding: '8px 10px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(203,166,88,0.2)', color: '#e2e8f0', fontSize: '12px', outline: 'none', resize: 'none', letterSpacing: '0.3px' }}
                    />
                    <button onClick={() => sendMessage()} disabled={!input.trim()} style={{ padding: '8px 14px', background: input.trim() ? `linear-gradient(135deg,${G},#b8944d)` : 'rgba(30,41,59,0.4)', border: 'none', color: input.trim() ? DARK : '#334155', fontWeight: '700', cursor: input.trim() ? 'pointer' : 'not-allowed', fontSize: '10px', letterSpacing: '1px', flexShrink: 0 }}>
                      SEND
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Presence panel */}
            {showPresence && <PresencePanel users={users} />}
          </div>
        </div>
      )}
    </>
  );
}