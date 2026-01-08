import { leadAPI } from '../../services/api';
import React, { useState } from 'react';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I can help you find your perfect property in Mexico. What are you looking for?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          messages: [
            { role: 'user', content: `You are a luxury real estate agent for AuditDNA Estates specializing in Mexico properties. User asks: "${input}". Provide helpful, concise advice about Mexico real estate, financing, or the buying process. Mention our services: Mexico properties, cross-border financing, fideicomiso, and full legal support.` }
          ]
        })
      });
      
      const data = await response.json();
      const aiMsg = { role: 'assistant', text: data.content[0].text };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I had trouble connecting. Please try again.' }]);
    }
    setLoading(false);
  };

  const s = {
    widget: { position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 },
    button: { width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #cba658, #b8944d)', border: 'none', boxShadow: '0 4px 12px rgba(203, 166, 88, 0.4)', cursor: 'pointer', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    chat: { position: 'absolute', bottom: '80px', right: '0', width: '380px', height: '500px', background: '#1e293b', border: '2px solid #cba658', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' },
    header: { padding: '16px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', fontWeight: '700', fontSize: '16px', borderRadius: '10px 10px 0 0' },
    messages: { flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
    userMsg: { alignSelf: 'flex-end', background: '#3b82f6', color: '#fff', padding: '10px 14px', borderRadius: '12px', maxWidth: '70%', fontSize: '14px' },
    aiMsg: { alignSelf: 'flex-start', background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', color: '#f1f5f9', padding: '10px 14px', borderRadius: '12px', maxWidth: '70%', fontSize: '14px' },
    input: { display: 'flex', padding: '12px', borderTop: '1px solid rgba(203, 166, 88, 0.2)' },
    textInput: { flex: 1, padding: '10px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '6px', color: '#f1f5f9', fontSize: '14px', marginRight: '8px' },
    sendBtn: { padding: '10px 20px', background: 'linear-gradient(135deg, #cba658, #b8944d)', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }
  };

  return (
    <div style={s.widget}>
      {isOpen && (
        <div style={s.chat}>
          <div style={s.header}> AuditDNA AI Assistant</div>
          <div style={s.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={msg.role === 'user' ? s.userMsg : s.aiMsg}>{msg.text}</div>
            ))}
            {loading && <div style={s.aiMsg}>Typing...</div>}
          </div>
          <div style={s.input}>
            <input 
              style={s.textInput} 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
            />
            <button style={s.sendBtn} onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button style={s.button} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '' : ''}
      </button>
    </div>
  );
}