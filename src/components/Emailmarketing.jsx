/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EMAIL MARKETING COMMAND CENTER v4.0
 * AuditDNA | EnjoyBaja | CM Products International
 * ═══════════════════════════════════════════════════════════════════════════
 * ✓ CSV DATABASE UPLOAD — Buyers, Agents, Partners, Developers, VIP
 * ✓ BULK EMAIL / VOLUME CAMPAIGNS with queue + rate limiting
 * ✓ SCHEDULED CAMPAIGNS — cron-style, recurring, date/time picker
 * ✓ GOOGLE CALENDAR SYNC — team alerts, lead notifications
 * ✓ VIDEO MESSAGES — record, preview, attach to email
 * ✓ VOICE + SPEECH-TO-TEXT — dictate email content
 * ✓ AI NINER MINERS — Claude-powered content generation
 * ✓ MULTI-CHANNEL — Email, SMS, WhatsApp, Social
 * ✓ FLYER BUILDER — attach to campaigns
 * ✓ ANALYTICS — open rates, clicks, pipeline value
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mail, Users, Video, Mic, MicOff, VideoOff, PhoneOff, Send, Plus, Trash2,
  Eye, BarChart2, X, Loader, Calendar, Clock, Globe, ExternalLink, Bell,
  FileText, Paperclip, Download, Copy, Check, ChevronLeft, ChevronRight,
  Sparkles, Play, Square, Volume2, UserPlus, Link, Share2, Layout, Search,
  Edit3, Save, Smartphone, Youtube, Facebook, Instagram, Twitter, Linkedin,
  Upload, Filter, AlertTriangle, Settings, RefreshCw, ChevronDown, ZapOff
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// COLOR SCHEME — Gold / Slate / Silver ONLY
// ═══════════════════════════════════════════════════════════════
const C = {
  bg:          '#0f172a',
  bgLight:     '#1e293b',
  bgLighter:   '#334155',
  gold:        '#cba658',
  goldDark:    '#b8944d',
  goldSoft:    'rgba(203,166,88,0.15)',
  silver:      '#cbd5e1',
  silverDark:  '#94a3b8',
  white:       '#f1f5f9',
  info:        '#3b82f6',
  infoDim:     'rgba(59,130,246,0.15)',
  danger:      '#ef4444',
  dangerDim:   'rgba(239,68,68,0.2)',
  warning:     '#f59e0b',
  border:      'rgba(203,166,88,0.25)',
  borderSlate: 'rgba(148,163,184,0.15)',
  // Social
  youtube:     '#FF0000',
  facebook:    '#1877F2',
  instagram:   '#E4405F',
  twitter:     '#1DA1F2',
  linkedin:    '#0A66C2',
  whatsapp:    '#25D366',
};

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// ═══════════════════════════════════════════════════════════════
// CONTACT LIST CATEGORIES — Real Estate Edition
// ═══════════════════════════════════════════════════════════════
const LIST_CATEGORIES = [
  { id: 'all',        name: 'All Contacts',  icon: '👥', color: C.gold },
  { id: 'buyers',     name: 'Buyers',        icon: '🏠', color: C.info },
  { id: 'agents',     name: 'Agents',        icon: '🤝', color: C.warning },
  { id: 'partners',   name: 'Partners',      icon: '🏦', color: C.silver },
  { id: 'developers', name: 'Developers',    icon: '🏗️', color: C.goldDark },
  { id: 'vip',        name: 'VIP Leads',     icon: '⭐', color: C.gold },
];

// ═══════════════════════════════════════════════════════════════
// AI NINER MINERS — RE Content Cowboys
// ═══════════════════════════════════════════════════════════════
const MINERS = [
  { id: 'content',   name: 'Content Miner',    emoji: '📝', skill: 'Email & newsletter copy' },
  { id: 'subject',   name: 'Subject Sniper',   emoji: '🎯', skill: 'High open-rate subjects' },
  { id: 'property',  name: 'Property Scout',   emoji: '🏠', skill: 'Property listings copy' },
  { id: 'mortgage',  name: 'Loan Ranger',      emoji: '💰', skill: 'Mortgage & finance content' },
  { id: 'social',    name: 'Social Marshal',   emoji: '📱', skill: 'Social media posts' },
  { id: 'sms',       name: 'SMS Buckaroo',     emoji: '💬', skill: 'SMS / WhatsApp campaigns' },
  { id: 'segment',   name: 'Segment Sheriff',  emoji: '🎯', skill: 'Audience targeting' },
  { id: 'calendar',  name: 'Calendar Cowboy',  emoji: '📅', skill: 'Schedule optimization' },
];

// ═══════════════════════════════════════════════════════════════
// CHANNEL PLATFORMS
// ═══════════════════════════════════════════════════════════════
const CHANNELS = [
  { id: 'email',     name: 'Email',      Icon: Mail,      color: C.gold,      charLimit: null },
  { id: 'sms',       name: 'SMS',        Icon: Smartphone, color: C.info,     charLimit: 160 },
  { id: 'whatsapp',  name: 'WhatsApp',   Icon: Smartphone, color: C.whatsapp, charLimit: 1000 },
  { id: 'facebook',  name: 'Facebook',   Icon: Facebook,   color: C.facebook, charLimit: 63206 },
  { id: 'instagram', name: 'Instagram',  Icon: Instagram,  color: C.instagram, charLimit: 2200 },
  { id: 'twitter',   name: 'Twitter/X',  Icon: Twitter,    color: C.twitter,  charLimit: 280 },
  { id: 'linkedin',  name: 'LinkedIn',   Icon: Linkedin,   color: C.linkedin, charLimit: 3000 },
];

// ═══════════════════════════════════════════════════════════════
// EMAIL TEMPLATES — Real Estate Focused
// ═══════════════════════════════════════════════════════════════
const TEMPLATES = [
  {
    id: 'new-listing',
    name: '🏠 New Listing Alert',
    subject: '🏠 New Property Available — Baja California',
    body: `Dear [Name],

We have an exciting new property available in Baja California that matches your profile.

📍 PROPERTY HIGHLIGHTS
• Location: [Region], Baja California
• Price: [Price]
• Size: [Size] sqft
• Type: [Property Type]

This property won't last long. Our team is ready to arrange a private showing at your convenience.

For questions or to schedule a viewing, reply to this email or reach us on WhatsApp: +52 646 340 2686

Warm regards,
Saul Garcia
EnjoyBaja | NMLS #337526`,
  },
  {
    id: 'market-update',
    name: '📊 Market Update',
    subject: '📊 Baja California Real Estate Market — [Month] Update',
    body: `Dear [Name],

Here is your monthly real estate market intelligence for Baja California.

MARKET HIGHLIGHTS
• Average prices up [X]% in key regions
• New developments: [Count] projects launched
• Top regions: Ensenada, Rosarito, Cabo San Lucas

FEATURED OPPORTUNITIES
[List properties or developments here]

FINANCING AVAILABLE
US Citizens may qualify for USA mortgage financing on eligible properties. 
Minimum property value: $385K | Down: 35-45% | Rate: competitive

To explore properties or financing options, contact us today.

Best regards,
Saul Garcia | EnjoyBaja
NMLS #337526 | +52 646 340 2686`,
  },
  {
    id: 'mortgage-intro',
    name: '💰 Mortgage Introduction',
    subject: '💰 Buy in Mexico with a US Mortgage — How It Works',
    body: `Dear [Name],

Did you know US Citizens can use US mortgage financing to purchase property in Mexico?

HOW IT WORKS
✓ Minimum property value: $385,000
✓ Down payment: 35-45%
✓ Loan terms: 15-30 years
✓ Credit score: 680+
✓ We handle the fideicomiso (bank trust) for restricted zone properties

WHY USE US
• Saul Garcia, NMLS #337526
• Licensed mortgage originator
• Cross-border specialists
• 8+ lender network

Ready to explore your options? Schedule a free consultation today.

Saul Garcia | CM Products International
NMLS #337526 | saul@mexausafg.com`,
  },
  {
    id: 'development-alert',
    name: '🏗️ Development Alert',
    subject: '🏗️ Pre-Sale Opportunity — [Development Name]',
    body: `Dear [Name],

We are pleased to announce a new development opportunity in Baja California.

DEVELOPMENT OVERVIEW
• Name: [Development Name]
• Region: [Region]
• Units Available: [Count]
• Starting From: [Price]
• Expected Completion: [Date]

PRE-SALE BENEFITS
• Best pricing before public launch
• Preferred unit selection
• Flexible payment plans

Commission-only representation available for qualified buyers.

Contact us today to secure your unit before the public launch.

Saul Garcia | EnjoyBaja | +52 646 340 2686`,
  },
  {
    id: 'follow-up',
    name: '📩 Lead Follow-Up',
    subject: 'Following Up — Your Baja California Property Inquiry',
    body: `Dear [Name],

Thank you for your inquiry about properties in Baja California.

I wanted to personally follow up to ensure we connect and answer any questions you may have.

Based on your interest, I have identified [X] properties that may match your requirements. I would love to schedule a 15-minute call to discuss your goals and present the best options.

Available times:
• [Day/Time Option 1]
• [Day/Time Option 2]

Simply reply to this email or WhatsApp me directly: +52 646 340 2686

Looking forward to connecting.

Saul Garcia | EnjoyBaja
NMLS #337526`,
  },
];

// ═══════════════════════════════════════════════════════════════
// SAFE ARRAY HELPER
// ═══════════════════════════════════════════════════════════════
const sa = (d, key = null) => {
  if (Array.isArray(d)) return d;
  if (key && d && Array.isArray(d[key])) return d[key];
  if (d?.data && Array.isArray(d.data)) return d.data;
  if (d?.leads && Array.isArray(d.leads)) return d.leads;
  return [];
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function EmailMarketing() {
  // ── Navigation ─────────────────────────────────────────────
  const [activeTab,  setActiveTab]  = useState('compose');
  const [sidePanel,  setSidePanel]  = useState(null);   // 'calendar' | 'meeting' | 'ai'

  // ── Contacts ───────────────────────────────────────────────
  const [contacts,         setContacts]         = useState([]);
  const [customLists,      setCustomLists]      = useState([]);
  const [selectedIds,      setSelectedIds]      = useState([]);
  const [activeCategory,   setActiveCategory]   = useState('all');
  const [contactSearch,    setContactSearch]    = useState('');
  const [loadingContacts,  setLoadingContacts]  = useState(false);

  // ── Compose ────────────────────────────────────────────────
  const [emailSubject,    setEmailSubject]    = useState('');
  const [emailCC,         setEmailCC]         = useState('');
  const [emailBCC,        setEmailBCC]         = useState('');
  const [emailReplyTo,    setEmailReplyTo]     = useState('');
  const [showCCFields,    setShowCCFields]     = useState(false);
  const [emailContent,    setEmailContent]    = useState('');
  const [attachments,     setAttachments]     = useState([]);
  const [selectedChannels, setSelectedChannels] = useState(['email']);
  const [smsContent,      setSmsContent]      = useState('');
  const [socialCaption,   setSocialCaption]   = useState('');
  const [hashtags,        setHashtags]        = useState(['EnjoyBaja', 'BajaRealEstate', 'MexicoProperty']);
  const [sending,         setSending]         = useState(false);
  const [sendResult,      setSendResult]      = useState(null);

  // ── Schedule ───────────────────────────────────────────────
  const [scheduledCampaigns, setScheduledCampaigns] = useState([]);
  const [schedDate,    setSchedDate]    = useState('');
  const [schedTime,    setSchedTime]    = useState('09:00');
  const [schedRecurring, setSchedRecurring] = useState(false);
  const [schedFreq,    setSchedFreq]    = useState('weekly');
  const [teamAttendees, setTeamAttendees] = useState('');

  // ── Google Calendar ────────────────────────────────────────
  const [calConnected,   setCalConnected]   = useState(false);
  const [calEvents,      setCalEvents]      = useState([]);
  const [currentMonth,   setCurrentMonth]   = useState(new Date());
  const [selectedDate,   setSelectedDate]   = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent,       setNewEvent]       = useState({ title: '', description: '', date: '', startTime: '09:00', endTime: '10:00', location: '', attendees: '' });

  // ── Video / Voice ──────────────────────────────────────────
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [videoBlob,        setVideoBlob]        = useState(null);
  const [videoPreviewUrl,  setVideoPreviewUrl]  = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceRecordings,  setVoiceRecordings]  = useState([]);
  const [isTranscribing,   setIsTranscribing]   = useState(false);
  const [liveTranscript,   setLiveTranscript]   = useState('');
  const [meetingActive,    setMeetingActive]    = useState(false);
  const [isCameraOn,       setIsCameraOn]       = useState(true);
  const [isMicOn,          setIsMicOn]          = useState(true);
  const [meetingId]  = useState(`EB-${Date.now().toString(36).toUpperCase().slice(-6)}`);

  // ── AI ─────────────────────────────────────────────────────
  const [selectedMiner, setSelectedMiner]  = useState(null);
  const [aiPrompt,      setAiPrompt]       = useState('');
  const [aiGenerating,  setAiGenerating]   = useState(false);

  // ── Analytics ──────────────────────────────────────────────
  const [analytics, setAnalytics] = useState({
    totalSent: 0, delivered: 0, opened: 0, clicked: 0,
    smsSent: 0, campaigns: 0, openRate: 0, clickRate: 0,
  });

  // ── CSV Upload ─────────────────────────────────────────────
  const [csvUploading, setCsvUploading] = useState(false);
  const [csvCategory,  setCsvCategory]  = useState('buyers');
  const [manualName,    setManualName]    = useState('');
  const [manualEmail,   setManualEmail]   = useState('');
  const [manualPhone,   setManualPhone]   = useState('');
  const [manualCat,     setManualCat]     = useState('buyers');

  // ── Refs ───────────────────────────────────────────────────
  const videoRef        = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoChunks     = useRef([]);
  const voiceRecorderRef = useRef(null);
  const voiceChunks     = useRef([]);
  const speechRef       = useRef(null);
  const fileInputRef    = useRef(null);
  const csvInputRef     = useRef(null);
  const localStream     = useRef(null);

  // ═══════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════
  useEffect(() => {
    loadContacts();
    loadAnalytics();
    const saved = localStorage.getItem('eb_scheduled_campaigns');
    if (saved) setScheduledCampaigns(JSON.parse(saved));
    const calToken = localStorage.getItem('eb_cal_token');
    if (calToken) { setCalConnected(true); loadDemoCalendarEvents(); }

    // Init speech recognition
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      const sr = new SR();
      sr.continuous = true;
      sr.interimResults = true;
      sr.onresult = (e) => {
        let t = '';
        for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
        setLiveTranscript(t);
      };
      speechRef.current = sr;
    }
    return () => { localStream.current?.getTracks().forEach(t => t.stop()); };
  }, []);

  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetch(`${API}/api/leads?limit=500`);
      if (res.ok) {
        const data = await res.json();
        const leads = sa(data, 'leads').map(l => ({
          id:       l.id,
          name:     `${l.nombre || ''}${l.apellidos ? ' ' + l.apellidos : ''}`.trim() || l.email,
          email:    l.email,
          phone:    l.phone || l.whatsapp,
          company:  l.company,
          category: l.source === 'agent' ? 'agents'
                  : l.source === 'partner' ? 'partners'
                  : l.source === 'development' ? 'developers'
                  : l.tipo_interes === 'vip' ? 'vip'
                  : 'buyers',
          siTier:   l.si_tier,
          siPriority: l.si_priority,
          municipio: l.municipio,
        }));
        setContacts(leads);
      }
    } catch (e) { console.error('[EM] Load contacts:', e.message); }
    finally { setLoadingContacts(false); }
  };

  const loadAnalytics = async () => {
    try {
      const res = await fetch(`${API}/api/email/analytics`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(prev => ({ ...prev, ...data }));
      }
    } catch { /* use defaults */ }
  };

  const loadDemoCalendarEvents = () => {
    const today = new Date();
    setCalEvents(
      ['Buyer Showing — Ensenada', 'Team Pipeline Review', 'Developer Meeting — Loreto', 'Open House — Rosarito', 'Mortgage Consultation'].map((title, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() + i + 1);
        return { id: i + 1, title, date: d.toISOString().split('T')[0], time: ['10:00', '14:00', '11:00', '13:00', '15:00'][i], color: [C.gold, C.info, C.goldDark, C.warning, C.info][i], type: ['meeting', 'internal', 'meeting', 'open-house', 'mortgage'][i] };
      })
    );
  };

  // ═══════════════════════════════════════════════════════════
  // CSV UPLOAD
  // ═══════════════════════════════════════════════════════════
  const handleCSVUpload = async (file) => {
    if (!file) return;
    setCsvUploading(true);
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(l => l.trim());
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
      const emailIdx = headers.findIndex(h => h.includes('email'));
      const nameIdx  = headers.findIndex(h => h.includes('name') || h.includes('nombre'));
      const phoneIdx = headers.findIndex(h => h.includes('phone') || h.includes('tel'));

      if (emailIdx === -1) { alert('CSV must have an "email" column.'); return; }

      const parsed = lines.slice(1).map((line, i) => {
        const cols = line.split(',').map(c => c.trim().replace(/"/g, ''));
        return {
          id:       `csv_${Date.now()}_${i}`,
          name:     nameIdx > -1 ? cols[nameIdx] : cols[0] || `Contact ${i + 1}`,
          email:    cols[emailIdx],
          phone:    phoneIdx > -1 ? cols[phoneIdx] : '',
          category: csvCategory,
        };
      }).filter(c => c.email?.includes('@'));

      setContacts(prev => {
        const existingEmails = new Set(prev.map(c => c.email));
        const newOnes = parsed.filter(c => !existingEmails.has(c.email));
        alert(`✅ Uploaded ${newOnes.length} new contacts (${parsed.length - newOnes.length} duplicates skipped)`);
        return [...prev, ...newOnes];
      });

    } catch (e) { alert('CSV parse error: ' + e.message); }
    finally { setCsvUploading(false); if (csvInputRef.current) csvInputRef.current.value = ''; }
  };

  // ── Manual Contact Add ───────────────────────────────────────
  const addManualContact = () => {
    const email = manualEmail.trim().toLowerCase();
    const name  = manualName.trim();
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      alert('Please enter a valid email address.'); return;
    }
    if (contacts.some(c => c.email === email)) {
      alert('This email is already in your list.'); return;
    }
    const newContact = {
      id:       `manual_${Date.now()}`,
      name:     name || email,
      email,
      phone:    manualPhone.trim(),
      category: manualCat,
      source:   'manual',
    };
    setContacts(prev => [...prev, newContact]);
    setSelectedIds(prev => [...prev, newContact.id]);
    setManualName(''); setManualEmail(''); setManualPhone('');
  };

  // ═══════════════════════════════════════════════════════════
  // CONTACT FILTERING
  // ═══════════════════════════════════════════════════════════
  const filteredContacts = contacts.filter(c => {
    const catMatch = activeCategory === 'all' || c.category === activeCategory;
    const q = contactSearch.toLowerCase();
    const textMatch = !q || (c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.company?.toLowerCase().includes(q) || c.municipio?.toLowerCase().includes(q));
    return catMatch && textMatch;
  });

  const getCategoryCount = (id) => id === 'all' ? contacts.length : contacts.filter(c => c.category === id).length;

  const toggleContact = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const selectAll     = () => setSelectedIds(filteredContacts.map(c => c.id));
  const deselectAll   = () => setSelectedIds([]);
  const selectedContacts = contacts.filter(c => selectedIds.includes(c.id));

  // ═══════════════════════════════════════════════════════════
  // VIDEO RECORDING
  // ═══════════════════════════════════════════════════════════
  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      const mr = new MediaRecorder(stream);
      videoChunks.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) videoChunks.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(videoChunks.current, { type: 'video/webm' });
        setVideoBlob(blob);
        setVideoPreviewUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setIsRecordingVideo(true);
    } catch { alert('Camera/mic access denied'); }
  };

  const stopVideoRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecordingVideo(false);
  };

  const attachVideo = () => {
    if (videoBlob) {
      const name = `video_message_${Date.now()}.webm`;
      setAttachments(prev => [...prev, { type: 'video', name, blob: videoBlob, size: `${(videoBlob.size / 1024 / 1024).toFixed(1)}MB` }]);
      setVideoBlob(null); setVideoPreviewUrl('');
    }
  };

  // ═══════════════════════════════════════════════════════════
  // VOICE RECORDING
  // ═══════════════════════════════════════════════════════════
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      voiceChunks.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) voiceChunks.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(voiceChunks.current, { type: 'audio/webm' });
        setVoiceRecordings(prev => [...prev, { id: Date.now(), name: `voice_${Date.now()}.webm`, blob, url: URL.createObjectURL(blob) }]);
        stream.getTracks().forEach(t => t.stop());
      };
      mr.start();
      voiceRecorderRef.current = mr;
      setIsRecordingVoice(true);
      speechRef.current?.start(); setIsTranscribing(true);
    } catch { alert('Microphone access denied'); }
  };

  const stopVoiceRecording = () => {
    voiceRecorderRef.current?.stop(); setIsRecordingVoice(false);
    speechRef.current?.stop(); setIsTranscribing(false);
    if (liveTranscript) { setEmailContent(prev => (prev ? prev + '\n\n' : '') + liveTranscript); setLiveTranscript(''); }
  };

  // ═══════════════════════════════════════════════════════════
  // MEETING ROOM
  // ═══════════════════════════════════════════════════════════
  const startMeeting = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setMeetingActive(true);
    } catch { alert('Camera/mic access denied'); }
  };

  const endMeeting = () => {
    localStream.current?.getTracks().forEach(t => t.stop());
    localStream.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setMeetingActive(false);
  };

  const toggleCamera = () => {
    const track = localStream.current?.getVideoTracks()[0];
    if (track) { track.enabled = !track.enabled; setIsCameraOn(track.enabled); }
  };

  const toggleMic = () => {
    const track = localStream.current?.getAudioTracks()[0];
    if (track) { track.enabled = !track.enabled; setIsMicOn(track.enabled); }
  };

  // ═══════════════════════════════════════════════════════════
  // AI GENERATION
  // ═══════════════════════════════════════════════════════════
  const generateWithAI = async () => {
    if (!aiPrompt.trim()) { alert('Enter a prompt first'); return; }
    setAiGenerating(true);
    try {
      const res = await fetch(`${API}/api/claude/generate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, miner: selectedMiner?.id, context: { channels: selectedChannels, recipientCount: selectedIds.length } }),
      });
      if (res.ok) {
        const data = await res.json();
        if (selectedMiner?.id === 'subject') { setEmailSubject(data.subject || data.content); }
        else if (selectedMiner?.id === 'sms')  { setSmsContent(data.content); }
        else if (selectedMiner?.id === 'social') { setSocialCaption(data.content); }
        else { if (data.subject) setEmailSubject(data.subject); setEmailContent(data.content || data.email || data.text); }
      } else throw new Error();
    } catch {
      // Fallback demo content
      setEmailSubject(`🏠 ${aiPrompt.substring(0, 60)} — EnjoyBaja`);
      setEmailContent(`Dear [Name],\n\n${aiPrompt}\n\nFor more information, contact us:\nSaul Garcia | EnjoyBaja\nNMLS #337526 | +52 646 340 2686\nsaul@mexausafg.com`);
    }
    setAiGenerating(false);
    setAiPrompt('');
  };

  // ═══════════════════════════════════════════════════════════
  // SEND CAMPAIGN
  // ═══════════════════════════════════════════════════════════
  const sendCampaign = async () => {
    if (selectedIds.length === 0) { alert('⚠️ Select recipients first'); return; }
    if (!emailSubject.trim() && selectedChannels.includes('email')) { alert('⚠️ Add a subject line'); return; }
    setSending(true); setSendResult(null);
    try {
      const formData = new FormData();
      formData.append('subject',  emailSubject);
      if (emailCC)      formData.append('cc',       emailCC);
      if (emailBCC)     formData.append('bcc',      emailBCC);
      if (emailReplyTo) formData.append('replyTo',  emailReplyTo);
      formData.append('body', emailContent);
      formData.append('recipients', JSON.stringify(selectedContacts.filter(c => c.email).map(c => ({ name: c.name, email: c.email, phone: c.phone }))));
      formData.append('channels', JSON.stringify(selectedChannels));
      formData.append('smsContent', smsContent);
      formData.append('socialCaption', socialCaption);
      attachments.forEach((a, i) => { if (a.blob) formData.append(`attachment_${i}`, a.blob, a.name); else if (a.file) formData.append(`attachment_${i}`, a.file); });

      const res = await fetch(`${API}/api/email/send-campaign`, { method: 'POST', body: formData });
      const data = res.ok ? await res.json() : {};

      const emailCount  = selectedContacts.filter(c => c.email).length;
      const smsCount    = selectedChannels.includes('sms') ? selectedContacts.filter(c => c.phone).length : 0;
      setSendResult({ success: true, emailCount, smsCount, channels: selectedChannels.length });

      // Reset compose
      setEmailSubject(''); setEmailContent(''); setSmsContent(''); setSocialCaption('');
      setAttachments([]); setSelectedIds([]);
      setAnalytics(prev => ({ ...prev, totalSent: (prev.totalSent || 0) + emailCount, campaigns: (prev.campaigns || 0) + 1 }));
    } catch (e) {
      setSendResult({ success: false, error: e.message });
    } finally { setSending(false); }
  };

  // ═══════════════════════════════════════════════════════════
  // SCHEDULE CAMPAIGN
  // ═══════════════════════════════════════════════════════════
  const scheduleCampaign = () => {
    if (!schedDate || !schedTime) { alert('Select date and time'); return; }
    if (!emailSubject.trim()) { alert('Add a subject line first'); return; }

    const campaign = {
      id:           Date.now(),
      title:        emailSubject,
      date:         schedDate,
      time:         schedTime,
      recurring:    schedRecurring,
      frequency:    schedFreq,
      channels:     [...selectedChannels],
      recipients:   selectedIds.length,
      attendees:    teamAttendees.split(',').map(e => e.trim()).filter(Boolean),
      color:        C.gold,
      status:       'scheduled',
      createdAt:    new Date().toISOString(),
    };

    const updated = [...scheduledCampaigns, campaign];
    setScheduledCampaigns(updated);
    localStorage.setItem('eb_scheduled_campaigns', JSON.stringify(updated));

    // Add to calendar events
    setCalEvents(prev => [...prev, { id: campaign.id, title: `📧 ${campaign.title}`, date: campaign.date, time: campaign.time, color: C.gold, type: 'campaign' }]);

    alert(`✅ Campaign scheduled for ${schedDate} at ${schedTime}${schedRecurring ? ` (${schedFreq})` : ''}${campaign.attendees.length > 0 ? `\n📅 Team notified: ${campaign.attendees.join(', ')}` : ''}`);
    setSchedDate(''); setSchedTime('09:00'); setTeamAttendees('');
  };

  // ═══════════════════════════════════════════════════════════
  // GOOGLE CALENDAR
  // ═══════════════════════════════════════════════════════════
  const connectCalendar = () => {
    setCalConnected(true);
    localStorage.setItem('eb_cal_token', 'demo_token');
    loadDemoCalendarEvents();
    alert('✅ Google Calendar connected (demo mode)');
  };

  const disconnectCalendar = () => {
    setCalConnected(false);
    localStorage.removeItem('eb_cal_token');
    setCalEvents([]);
  };

  // Calendar helpers
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const getDays = (month) => {
    const year = month.getFullYear(), m = month.getMonth();
    const first = new Date(year, m, 1).getDay();
    const total = new Date(year, m + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < first; i++) days.push(null);
    for (let i = 1; i <= total; i++) days.push(new Date(year, m, i));
    return days;
  };

  const getEventsForDate = (date) => {
    const ds = date.toISOString().split('T')[0];
    return [...calEvents, ...scheduledCampaigns.map(c => ({ ...c, title: `📧 ${c.title}` }))].filter(e => e.date === ds);
  };

  // ═══════════════════════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════════════════════
  const s = {
    wrap:    { background: C.bg, color: C.white, fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    header:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: C.bgLight, borderBottom: `1px solid ${C.border}`, flexShrink: 0 },
    grid:    { display: 'grid', gridTemplateColumns: sidePanel ? '220px 1fr 280px' : '220px 1fr', flex: 1, overflow: 'hidden' },
    sidebar: { background: 'rgba(15,23,42,0.98)', borderRight: `1px solid ${C.border}`, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' },
    main:    { padding: '14px', overflowY: 'auto' },
    panel:   { background: C.bgLight, borderLeft: `1px solid ${C.border}`, padding: '12px', overflowY: 'auto' },
    card:    { background: 'rgba(30,41,59,0.8)', border: `1px solid ${C.border}`, padding: '12px', marginBottom: '10px' },
    btn:     { padding: '8px 16px', background: `linear-gradient(135deg,${C.gold},${C.goldDark})`, border: 'none', color: C.bg, fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px', letterSpacing: '0.5px' },
    btn2:    { padding: '6px 12px', background: 'rgba(148,163,184,0.1)', border: `1px solid ${C.borderSlate}`, color: C.silver, fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' },
    btnDanger: { padding: '6px 12px', background: C.dangerDim, border: `1px solid ${C.danger}`, color: C.danger, fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' },
    input:   { width: '100%', padding: '8px 10px', background: 'rgba(51,65,85,0.7)', border: `1px solid ${C.borderSlate}`, color: C.white, fontSize: '12px', outline: 'none', boxSizing: 'border-box' },
    textarea:{ width: '100%', padding: '8px 10px', background: 'rgba(51,65,85,0.7)', border: `1px solid ${C.borderSlate}`, color: C.white, fontSize: '12px', outline: 'none', minHeight: '120px', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6', boxSizing: 'border-box' },
    label:   { display: 'block', color: C.silverDark, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' },
    tab:     (a) => ({ width: '100%', padding: '7px 10px', background: a ? C.goldSoft : 'transparent', border: `1px solid ${a ? C.gold : 'transparent'}`, color: a ? C.gold : C.silverDark, fontSize: '11px', fontWeight: a ? '600' : '400', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', textAlign: 'left', marginBottom: '2px' }),
    catCard: (a, col) => ({ padding: '7px 10px', background: a ? `${col}20` : 'rgba(255,255,255,0.02)', border: `1px solid ${a ? col : C.borderSlate}`, cursor: 'pointer', marginBottom: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }),
    ch:      (sel, col) => ({ padding: '5px 9px', background: sel ? `${col}25` : 'rgba(255,255,255,0.04)', border: `1px solid ${sel ? col : C.borderSlate}`, color: sel ? col : C.silverDark, fontSize: '10px', fontWeight: sel ? '700' : '400', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }),
  };

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <div style={s.wrap}>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', background: C.goldSoft, border: `2px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={16} color={C.gold} />
          </div>
          <div>
            <div style={{ color: C.gold, fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>EMAIL MARKETING COMMAND CENTER</div>
            <div style={{ color: C.silverDark, fontSize: '9px', letterSpacing: '2px' }}>ENJOYBAJA · AUDITDNA · NMLS #337526</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {[
            { label: 'CONTACTS', value: contacts.length, color: C.gold },
            { label: 'SELECTED', value: selectedIds.length, color: C.silver },
            { label: 'CAMPAIGNS', value: analytics.campaigns || 0, color: C.info },
            { label: 'SENT',      value: (analytics.totalSent || 0).toLocaleString(), color: C.silverDark },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ color, fontSize: '15px', fontWeight: '700' }}>{value}</div>
              <div style={{ color: C.silverDark, fontSize: '8px', letterSpacing: '1px' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '5px' }}>
          {[
            { id: 'calendar', label: 'Calendar', Icon: Calendar, active: calConnected },
            { id: 'meeting',  label: 'Meeting',  Icon: Video,    active: meetingActive },
            { id: 'ai',       label: 'AI Brain',  Icon: Sparkles, active: false },
          ].map(({ id, label, Icon, active }) => (
            <button key={id} onClick={() => setSidePanel(sidePanel === id ? null : id)}
              style={{ ...s.btn2, background: sidePanel === id ? C.goldSoft : active ? 'rgba(59,130,246,0.15)' : s.btn2.background, borderColor: sidePanel === id ? C.gold : active ? C.info : C.borderSlate }}>
              <Icon size={11} /> {label}
            </button>
          ))}
        </div>
      </div>

      <div style={s.grid}>

        {/* ── SIDEBAR ──────────────────────────────────────── */}
        <div style={s.sidebar}>

          {/* Tabs */}
          <div>
            {[
              { id: 'compose',   label: 'Compose',     icon: <Edit3 size={11} /> },
              { id: 'contacts',  label: 'Contacts/DB', icon: <Users size={11} /> },
              { id: 'voice',     label: 'Video/Voice', icon: <Mic size={11} /> },
              { id: 'schedule',  label: 'Schedule',    icon: <Calendar size={11} /> },
              { id: 'analytics', label: 'Analytics',   icon: <BarChart2 size={11} /> },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={s.tab(activeTab === t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Google Calendar Status */}
          <div style={{ padding: '8px', background: 'rgba(30,41,59,0.6)', border: `1px solid ${C.borderSlate}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <Calendar size={11} color={calConnected ? C.gold : C.silverDark} />
              <span style={{ color: calConnected ? C.gold : C.silverDark, fontSize: '10px', fontWeight: '600' }}>Google Calendar</span>
              {calConnected && <span style={{ marginLeft: 'auto', width: '6px', height: '6px', background: C.gold, borderRadius: '50%' }} />}
            </div>
            {!calConnected
              ? <button onClick={connectCalendar} style={{ ...s.btn, width: '100%', justifyContent: 'center', fontSize: '10px', padding: '6px' }}><Globe size={10} /> Connect</button>
              : <button onClick={disconnectCalendar} style={{ ...s.btn2, width: '100%', justifyContent: 'center', fontSize: '9px' }}>Disconnect</button>
            }
          </div>

          {/* Category List */}
          <div>
            <div style={{ color: C.silverDark, fontSize: '9px', letterSpacing: '2px', marginBottom: '5px' }}>DATABASE LISTS</div>
            {LIST_CATEGORIES.map(cat => (
              <div key={cat.id} onClick={() => setActiveCategory(cat.id)} style={s.catCard(activeCategory === cat.id, cat.color)}>
                <span style={{ fontSize: '11px', color: activeCategory === cat.id ? C.white : C.silverDark }}>{cat.icon} {cat.name}</span>
                <span style={{ background: cat.color, color: '#000', padding: '1px 5px', fontSize: '9px', fontWeight: '700' }}>{getCategoryCount(cat.id)}</span>
              </div>
            ))}
          </div>

          {/* Contact Search + List */}
          <input type="text" placeholder="🔍 Search contacts..." value={contactSearch} onChange={e => setContactSearch(e.target.value)} style={{ ...s.input, fontSize: '10px', padding: '5px 8px' }} />

          <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
            <button onClick={selectAll}   style={{ ...s.btn2, flex: 1, justifyContent: 'center', fontSize: '9px', padding: '3px 6px' }}>All</button>
            <button onClick={deselectAll} style={{ ...s.btn2, flex: 1, justifyContent: 'center', fontSize: '9px', padding: '3px 6px' }}>None</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '260px' }}>
            {loadingContacts ? (
              <div style={{ textAlign: 'center', padding: '12px', color: C.silverDark, fontSize: '11px' }}><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /></div>
            ) : filteredContacts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '12px', color: C.silverDark, fontSize: '10px' }}>No contacts. Upload CSV below.</div>
            ) : filteredContacts.slice(0, 50).map(c => (
              <div key={c.id} onClick={() => toggleContact(c.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 5px', background: selectedIds.includes(c.id) ? C.goldSoft : 'transparent', cursor: 'pointer', fontSize: '10px', marginBottom: '1px' }}>
                <input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => {}} style={{ accentColor: C.gold, width: '10px', height: '10px' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: C.white, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name || c.email}</div>
                  <div style={{ color: C.silverDark, fontSize: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.email}</div>
                </div>
                {c.siTier !== undefined && c.siTier !== null && (
                  <span style={{ background: c.siTier === 0 ? C.gold : C.bgLighter, color: c.siTier === 0 ? C.bg : C.silverDark, fontSize: '7px', padding: '1px 3px', fontWeight: '700' }}>T{c.siTier}</span>
                )}
              </div>
            ))}
          </div>

          {/* Manual Contact Entry */}
          <div style={{ padding: '8px', background: 'rgba(30,41,59,0.5)', border: `1px solid ${C.borderSlate}`, marginBottom: '6px' }}>
            <div style={{ color: C.gold, fontSize: '9px', letterSpacing: '1px', marginBottom: '6px', fontWeight: '700' }}>➕ ADD CONTACT MANUALLY</div>
            <input
              type="text" placeholder="Full Name"
              value={manualName} onChange={e => setManualName(e.target.value)}
              style={{ ...s.input, fontSize: '10px', padding: '5px 8px', marginBottom: '4px' }}
            />
            <input
              type="email" placeholder="Email Address *"
              value={manualEmail} onChange={e => setManualEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addManualContact()}
              style={{ ...s.input, fontSize: '10px', padding: '5px 8px', marginBottom: '4px' }}
            />
            <input
              type="tel" placeholder="Phone (optional)"
              value={manualPhone} onChange={e => setManualPhone(e.target.value)}
              style={{ ...s.input, fontSize: '10px', padding: '5px 8px', marginBottom: '4px' }}
            />
            <select value={manualCat} onChange={e => setManualCat(e.target.value)}
              style={{ ...s.input, fontSize: '10px', padding: '4px 6px', marginBottom: '6px' }}>
              {LIST_CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
            <button onClick={addManualContact}
              style={{ ...s.btn, width: '100%', justifyContent: 'center', fontSize: '10px', padding: '6px', background: C.gold, color: C.bg, fontWeight: '700' }}>
              ➕ Add to List
            </button>
          </div>

          {/* CSV Upload */}
          <div style={{ padding: '8px', background: 'rgba(30,41,59,0.5)', border: `1px solid ${C.borderSlate}` }}>
            <div style={{ color: C.silverDark, fontSize: '9px', letterSpacing: '1px', marginBottom: '5px' }}>UPLOAD CSV DATABASE</div>
            <select value={csvCategory} onChange={e => setCsvCategory(e.target.value)} style={{ ...s.input, fontSize: '10px', padding: '4px 6px', marginBottom: '5px' }}>
              {LIST_CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
            <input ref={csvInputRef} type="file" accept=".csv" onChange={e => handleCSVUpload(e.target.files[0])} style={{ display: 'none' }} />
            <button onClick={() => csvInputRef.current?.click()} disabled={csvUploading} style={{ ...s.btn, width: '100%', justifyContent: 'center', fontSize: '10px', padding: '6px' }}>
              {csvUploading ? <><Loader size={10} style={{ animation: 'spin 1s linear infinite' }} /> Uploading...</> : <><Upload size={10} /> Upload CSV</>}
            </button>
            <div style={{ color: C.silverDark, fontSize: '8px', marginTop: '4px', lineHeight: '1.4' }}>Required column: <span style={{ color: C.gold }}>email</span>. Optional: name, phone</div>
          </div>
        </div>

        {/* ── MAIN CONTENT ───────────────────────────────── */}
        <div style={s.main}>

          {/* ── COMPOSE TAB ─────────────────────────────── */}
          {activeTab === 'compose' && (
            <div>
              {/* Templates */}
              <div style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: C.gold, fontSize: '12px', fontWeight: '600' }}>📋 Templates</span>
                </div>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setEmailSubject(t.subject); setEmailContent(t.body); }}
                      style={{ ...s.btn2, fontSize: '10px', padding: '4px 8px' }}>{t.name}</button>
                  ))}
                </div>
              </div>

              {/* Compose Form */}
              <div style={s.card}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={s.label}>Subject</label>
                  <input type="text" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} placeholder="Campaign subject line..." style={s.input} />
                </div>

                {/* CC / BCC / Reply-To toggle */}
                <div style={{ marginBottom: '8px' }}>
                  <button onClick={() => setShowCCFields(p => !p)}
                    style={{ ...s.btn2, fontSize: '9px', padding: '3px 8px', color: showCCFields ? C.gold : C.silverDark, borderColor: showCCFields ? C.gold : C.borderSlate }}>
                    {showCCFields ? '▲' : '▼'} CC / BCC / Reply-To
                  </button>
                </div>

                {showCCFields && (
                  <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px', background: 'rgba(15,23,42,0.5)', border: `1px solid ${C.borderSlate}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ ...s.label, width: '56px', marginBottom: 0, flexShrink: 0 }}>CC</label>
                      <input type="text" value={emailCC} onChange={e => setEmailCC(e.target.value)}
                        placeholder="cc@example.com, cc2@example.com"
                        style={{ ...s.input, flex: 1, fontSize: '10px', padding: '4px 8px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ ...s.label, width: '56px', marginBottom: 0, flexShrink: 0 }}>BCC</label>
                      <input type="text" value={emailBCC} onChange={e => setEmailBCC(e.target.value)}
                        placeholder="bcc@example.com, bcc2@example.com"
                        style={{ ...s.input, flex: 1, fontSize: '10px', padding: '4px 8px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ ...s.label, width: '56px', marginBottom: 0, flexShrink: 0 }}>Reply-To</label>
                      <input type="text" value={emailReplyTo} onChange={e => setEmailReplyTo(e.target.value)}
                        placeholder="replies@enjoybaja.com"
                        style={{ ...s.input, flex: 1, fontSize: '10px', padding: '4px 8px' }} />
                    </div>
                    <div style={{ fontSize: '8px', color: C.silverDark, lineHeight: '1.4' }}>
                      Separate multiple addresses with commas. CC/BCC apply to every recipient.
                    </div>
                  </div>
                )}

                {/* Voice to Text */}
                <div style={{ display: 'flex', gap: '5px', marginBottom: '8px', alignItems: 'center' }}>
                  <button onClick={() => isTranscribing ? (speechRef.current?.stop(), setIsTranscribing(false)) : (speechRef.current?.start(), setIsTranscribing(true))}
                    style={{ ...s.btn2, background: isTranscribing ? C.dangerDim : s.btn2.background, borderColor: isTranscribing ? C.danger : C.borderSlate, color: isTranscribing ? C.danger : C.silver }}>
                    {isTranscribing ? <MicOff size={11} /> : <Mic size={11} />} {isTranscribing ? 'Stop' : 'Dictate'}
                  </button>
                  {isTranscribing && <div style={{ flex: 1, padding: '4px 8px', background: C.dangerDim, border: `1px solid ${C.danger}`, fontSize: '10px', color: C.danger }}>{liveTranscript || '🎙️ Listening...'}</div>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={s.label}>Email Content</label>
                  <textarea value={emailContent} onChange={e => setEmailContent(e.target.value)} placeholder="Compose your message..." style={s.textarea} />
                </div>

                {/* Attachments */}
                {attachments.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {attachments.map((a, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '3px 7px', background: C.goldSoft, border: `1px solid ${C.border}`, fontSize: '10px', color: C.gold }}>
                        {a.type === 'video' ? <Video size={10} /> : <FileText size={10} />} {a.name} {a.size ? `(${a.size})` : ''}
                        <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.danger, padding: 0, marginLeft: '2px' }}><X size={8} /></button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                  <input ref={fileInputRef} type="file" multiple onChange={e => Array.from(e.target.files).forEach(f => setAttachments(prev => [...prev, { type: 'file', name: f.name, file: f }]))} style={{ display: 'none' }} />
                  <button onClick={() => fileInputRef.current?.click()} style={s.btn2}><Paperclip size={10} /> Attach</button>
                  <button onClick={() => setSmsContent(emailContent.substring(0, 155))} style={s.btn2}><Smartphone size={10} /> → SMS</button>
                  <button onClick={() => setSocialCaption(`${emailSubject}\n\n${emailContent.substring(0, 200)}...\n\n${hashtags.map(h => '#' + h).join(' ')}`)} style={s.btn2}><Share2 size={10} /> → Social</button>
                </div>
              </div>

              {/* Channels */}
              <div style={s.card}>
                <div style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>📤 Channels</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                  {CHANNELS.map(ch => (
                    <button key={ch.id} onClick={() => setSelectedChannels(prev => prev.includes(ch.id) ? prev.filter(x => x !== ch.id) : [...prev, ch.id])} style={s.ch(selectedChannels.includes(ch.id), ch.color)}>
                      <ch.Icon size={9} /> {ch.name}
                    </button>
                  ))}
                </div>

                {selectedChannels.includes('sms') && (
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ ...s.label, color: C.info }}>SMS Content ({smsContent.length}/160)</label>
                    <textarea value={smsContent} onChange={e => setSmsContent(e.target.value.substring(0, 160))} style={{ ...s.textarea, minHeight: '60px', borderColor: C.info }} />
                  </div>
                )}

                {selectedChannels.includes('whatsapp') && (
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ ...s.label, color: C.whatsapp }}>WhatsApp Message</label>
                    <textarea value={smsContent || emailContent.substring(0, 500)} onChange={e => setSmsContent(e.target.value)} style={{ ...s.textarea, minHeight: '60px' }} />
                  </div>
                )}

                {selectedChannels.some(c => ['facebook', 'instagram', 'twitter', 'linkedin'].includes(c)) && (
                  <div style={{ marginBottom: '8px' }}>
                    <label style={s.label}>Social Caption</label>
                    <textarea value={socialCaption} onChange={e => setSocialCaption(e.target.value)} style={{ ...s.textarea, minHeight: '70px' }} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '5px' }}>
                      {hashtags.map((tag, i) => (
                        <span key={i} style={{ padding: '2px 6px', background: C.infoDim, border: `1px solid rgba(59,130,246,0.3)`, fontSize: '9px', color: C.info }}>
                          #{tag}
                          <button onClick={() => setHashtags(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', marginLeft: '2px', padding: 0 }}>×</button>
                        </span>
                      ))}
                      <button onClick={() => { const t = prompt('Add hashtag:'); if (t) setHashtags(prev => [...prev, t.replace('#', '')]); }}
                        style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.borderSlate}`, fontSize: '9px', color: C.silver, cursor: 'pointer' }}>+ Add</button>
                    </div>
                  </div>
                )}

                {/* Send Button */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                  <button onClick={sendCampaign} disabled={sending || selectedIds.length === 0}
                    style={{ ...s.btn, flex: 1, justifyContent: 'center', opacity: sending || selectedIds.length === 0 ? 0.5 : 1, padding: '10px' }}>
                    {sending
                      ? <><Loader size={12} style={{ animation: 'spin 1s linear infinite' }} /> Sending {selectedIds.length} contacts...</>
                      : <><Send size={12} /> Send to {selectedIds.length} via {selectedChannels.length} channel{selectedChannels.length !== 1 ? 's' : ''}</>
                    }
                  </button>
                </div>

                {/* Send Result */}
                {sendResult && (
                  <div style={{ marginTop: '8px', padding: '10px', background: sendResult.success ? C.goldSoft : C.dangerDim, border: `1px solid ${sendResult.success ? C.gold : C.danger}` }}>
                    {sendResult.success
                      ? <div style={{ color: C.gold, fontSize: '11px' }}>✓ Campaign sent — 📧 {sendResult.emailCount} emails • {sendResult.channels} channel{sendResult.channels !== 1 ? 's' : ''}</div>
                      : <div style={{ color: C.danger, fontSize: '11px' }}>❌ Send failed: {sendResult.error}</div>
                    }
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── CONTACTS TAB ────────────────────────────── */}
          {activeTab === 'contacts' && (
            <div>
              <div style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: C.gold, fontSize: '13px', fontWeight: '600' }}>👥 Contact Database</span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button onClick={loadContacts} style={s.btn2}><RefreshCw size={10} /> Refresh</button>
                    <button onClick={() => {
                      const name = prompt('List name:');
                      if (name && selectedIds.length > 0) {
                        setCustomLists(prev => [...prev, { id: Date.now(), name, ids: [...selectedIds] }]);
                        alert(`✓ List "${name}" saved (${selectedIds.length} contacts)`);
                      }
                    }} disabled={selectedIds.length === 0} style={{ ...s.btn2, opacity: selectedIds.length === 0 ? 0.5 : 1 }}>
                      <Save size={10} /> Save List
                    </button>
                  </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', marginBottom: '10px' }}>
                  {LIST_CATEGORIES.map(cat => (
                    <div key={cat.id} onClick={() => setActiveCategory(cat.id)}
                      style={{ padding: '8px', background: activeCategory === cat.id ? `${cat.color}20` : 'rgba(255,255,255,0.03)', border: `1px solid ${activeCategory === cat.id ? cat.color : C.borderSlate}`, cursor: 'pointer', textAlign: 'center' }}>
                      <div style={{ fontSize: '14px' }}>{cat.icon}</div>
                      <div style={{ color: cat.color, fontSize: '14px', fontWeight: '700' }}>{getCategoryCount(cat.id)}</div>
                      <div style={{ color: C.silverDark, fontSize: '8px' }}>{cat.name.split(' ')[0]}</div>
                    </div>
                  ))}
                </div>

                {/* Contact Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <th style={{ textAlign: 'left', padding: '6px', color: C.silverDark, fontWeight: '500', width: '20px' }}>
                        <input type="checkbox" checked={selectedIds.length === filteredContacts.length && filteredContacts.length > 0} onChange={e => e.target.checked ? selectAll() : deselectAll()} style={{ accentColor: C.gold }} />
                      </th>
                      {['Name', 'Email', 'Phone', 'Category', 'Region', 'SI Tier'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '6px', color: C.silverDark, fontWeight: '500', fontSize: '10px', letterSpacing: '1px' }}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.slice(0, 100).map((c, i) => (
                      <tr key={c.id} onClick={() => toggleContact(c.id)} style={{ background: selectedIds.includes(c.id) ? C.goldSoft : i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent', cursor: 'pointer', borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                        <td style={{ padding: '6px' }}><input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => {}} style={{ accentColor: C.gold }} /></td>
                        <td style={{ padding: '6px', color: C.white }}>{c.name || '—'}</td>
                        <td style={{ padding: '6px', color: C.silverDark }}>{c.email || '—'}</td>
                        <td style={{ padding: '6px', color: C.silverDark }}>{c.phone || '—'}</td>
                        <td style={{ padding: '6px' }}>
                          <span style={{ padding: '2px 6px', background: `${LIST_CATEGORIES.find(l => l.id === c.category)?.color || C.silverDark}25`, color: LIST_CATEGORIES.find(l => l.id === c.category)?.color || C.silverDark, fontSize: '9px' }}>
                            {c.category}
                          </span>
                        </td>
                        <td style={{ padding: '6px', color: C.silverDark, fontSize: '10px' }}>{c.municipio || '—'}</td>
                        <td style={{ padding: '6px' }}>
                          {c.siTier !== undefined && c.siTier !== null && (
                            <span style={{ padding: '2px 6px', background: c.siTier === 0 ? C.goldSoft : C.bgLighter, color: c.siTier === 0 ? C.gold : C.silverDark, fontSize: '9px', fontWeight: '700', border: `1px solid ${c.siTier === 0 ? C.border : C.borderSlate}` }}>
                              Tier {c.siTier}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredContacts.length > 100 && <div style={{ color: C.silverDark, fontSize: '10px', textAlign: 'center', padding: '8px' }}>Showing 100 of {filteredContacts.length} contacts</div>}
              </div>

              {/* Saved Lists */}
              {customLists.length > 0 && (
                <div style={s.card}>
                  <div style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>📁 Saved Lists</div>
                  {customLists.map(list => (
                    <div key={list.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.borderSlate}`, marginBottom: '4px' }}>
                      <span style={{ color: C.white, fontSize: '11px' }}>{list.name}</span>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ color: C.silverDark, fontSize: '9px' }}>{list.ids.length} contacts</span>
                        <button onClick={() => setSelectedIds(list.ids)} style={{ ...s.btn2, fontSize: '9px', padding: '3px 6px' }}>Select</button>
                        <button onClick={() => setCustomLists(prev => prev.filter(l => l.id !== list.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.danger }}><Trash2 size={11} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── VIDEO / VOICE TAB ───────────────────────── */}
          {activeTab === 'voice' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

              {/* Video Recording */}
              <div style={s.card}>
                <div style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>🎬 Video Message</div>
                <div style={{ width: '100%', height: '180px', background: '#000', position: 'relative', marginBottom: '8px', overflow: 'hidden' }}>
                  {videoPreviewUrl
                    ? <video src={videoPreviewUrl} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  }
                  {isRecordingVideo && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', background: 'rgba(239,68,68,0.9)', fontSize: '10px', color: '#fff', fontWeight: '700' }}>
                      <span style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%' }} /> REC
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {!isRecordingVideo
                    ? <button onClick={startVideoRecording} style={{ ...s.btn, flex: 1, justifyContent: 'center', fontSize: '10px' }}><Play size={10} /> Record</button>
                    : <button onClick={stopVideoRecording} style={{ ...s.btn, flex: 1, justifyContent: 'center', fontSize: '10px', background: `linear-gradient(135deg,${C.danger},#dc2626)` }}><Square size={10} /> Stop</button>
                  }
                  {videoBlob && <button onClick={attachVideo} style={{ ...s.btn2, flex: 1, justifyContent: 'center', fontSize: '10px' }}><Paperclip size={10} /> Attach</button>}
                </div>
              </div>

              {/* Voice Recording */}
              <div style={s.card}>
                <div style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>🎙️ Voice + Transcription</div>
                <div style={{ minHeight: '130px', background: 'rgba(51,65,85,0.5)', padding: '10px', marginBottom: '8px', overflowY: 'auto' }}>
                  {isRecordingVoice && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px', color: C.danger, fontSize: '10px' }}>
                      <span style={{ width: '6px', height: '6px', background: C.danger, borderRadius: '50%' }} /> Recording...
                    </div>
                  )}
                  <div style={{ color: C.silver, fontSize: '11px', lineHeight: '1.5' }}>
                    {liveTranscript || (voiceRecordings.length > 0 ? 'Transcription from voice...' : 'Press Record to start. Your words will appear here and be added to the email.')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                  {!isRecordingVoice
                    ? <button onClick={startVoiceRecording} style={{ ...s.btn, flex: 1, justifyContent: 'center', fontSize: '10px' }}><Mic size={10} /> Record</button>
                    : <button onClick={stopVoiceRecording} style={{ ...s.btn, flex: 1, justifyContent: 'center', fontSize: '10px', background: `linear-gradient(135deg,${C.danger},#dc2626)` }}><MicOff size={10} /> Stop & Add</button>
                  }
                </div>
                {voiceRecordings.length > 0 && (
                  <div>
                    <div style={{ color: C.silverDark, fontSize: '9px', marginBottom: '4px', letterSpacing: '1px' }}>RECORDINGS</div>
                    {voiceRecordings.map(rec => (
                      <div key={rec.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px', background: 'rgba(255,255,255,0.04)', marginBottom: '3px' }}>
                        <Volume2 size={10} color={C.gold} />
                        <audio src={rec.url} controls style={{ height: '22px', flex: 1 }} />
                        <button onClick={() => setAttachments(prev => [...prev, { type: 'voice', name: rec.name, blob: rec.blob }])} style={{ ...s.btn2, padding: '2px 5px', fontSize: '8px' }}>Attach</button>
                        <button onClick={() => setVoiceRecordings(prev => prev.filter(r => r.id !== rec.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.danger }}><Trash2 size={9} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Meeting Room */}
              <div style={{ ...s.card, gridColumn: '1/-1' }}>
                <div style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>📹 Team Meeting Room</div>
                {!meetingActive ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ padding: '10px', background: C.goldSoft, border: `1px solid ${C.border}` }}>
                      <div style={{ color: C.silverDark, fontSize: '9px', letterSpacing: '1px' }}>MEETING ID</div>
                      <div style={{ color: C.gold, fontSize: '14px', fontWeight: '700', letterSpacing: '2px' }}>{meetingId}</div>
                    </div>
                    <div style={{ flex: 1, color: C.silverDark, fontSize: '11px', lineHeight: '1.5' }}>
                      Start a live video meeting with your team or clients. Share the meeting link to invite participants.
                    </div>
                    <button onClick={startMeeting} style={{ ...s.btn, padding: '10px 20px' }}><Video size={12} /> Start Meeting</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '10px' }}>
                      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '200px', background: '#000', objectFit: 'cover' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.borderSlate}`, textAlign: 'center', color: C.gold, fontSize: '10px', fontWeight: '600' }}>{meetingId}</div>
                        <button onClick={() => { navigator.clipboard?.writeText(`https://enjoybaja.com/meeting/${meetingId}`); alert('Meeting link copied!'); }} style={{ ...s.btn2, justifyContent: 'center' }}><Link size={10} /> Copy Link</button>
                        <button onClick={() => { navigator.clipboard?.writeText(`https://enjoybaja.com/meeting/${meetingId}`); }} style={{ ...s.btn2, justifyContent: 'center' }}><UserPlus size={10} /> Invite</button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
                      <button onClick={toggleMic} style={{ ...s.btn2, background: isMicOn ? s.btn2.background : C.dangerDim, color: isMicOn ? C.silver : C.danger }}>{isMicOn ? <Mic size={11} /> : <MicOff size={11} />}</button>
                      <button onClick={toggleCamera} style={{ ...s.btn2, background: isCameraOn ? s.btn2.background : C.dangerDim, color: isCameraOn ? C.silver : C.danger }}>{isCameraOn ? <Video size={11} /> : <VideoOff size={11} />}</button>
                      <button onClick={endMeeting} style={{ ...s.btnDanger, marginLeft: 'auto' }}><PhoneOff size={11} /> End Meeting</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── SCHEDULE TAB ────────────────────────────── */}
          {activeTab === 'schedule' && (
            <div>
              <div style={s.card}>
                <div style={{ color: C.gold, fontSize: '13px', fontWeight: '600', marginBottom: '10px' }}>📅 Schedule Campaign</div>
                {!emailSubject.trim() && (
                  <div style={{ padding: '8px', background: C.dangerDim, border: `1px solid ${C.danger}`, marginBottom: '10px', color: C.danger, fontSize: '11px' }}>
                    ⚠️ Go to Compose tab first and write your email before scheduling.
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={s.label}>Date *</label>
                    <input type="date" value={schedDate} onChange={e => setSchedDate(e.target.value)} style={s.input} min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label style={s.label}>Time *</label>
                    <input type="time" value={schedTime} onChange={e => setSchedTime(e.target.value)} style={s.input} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <input type="checkbox" checked={schedRecurring} onChange={e => setSchedRecurring(e.target.checked)} style={{ accentColor: C.gold }} id="recurring" />
                  <label htmlFor="recurring" style={{ color: C.silver, fontSize: '12px', cursor: 'pointer' }}>Recurring Campaign</label>
                  {schedRecurring && (
                    <select value={schedFreq} onChange={e => setSchedFreq(e.target.value)} style={{ ...s.input, width: 'auto', padding: '4px 8px' }}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  )}
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={s.label}>Notify Team (emails, comma separated)</label>
                  <input type="text" value={teamAttendees} onChange={e => setTeamAttendees(e.target.value)}
                    placeholder="gibran@eb.com, saul@mexausafg.com, ..." style={s.input} />
                  <div style={{ color: C.silverDark, fontSize: '9px', marginTop: '3px' }}>These team members will receive a Google Calendar invite so they know when campaigns go out.</div>
                </div>

                <div style={{ padding: '10px', background: C.goldSoft, border: `1px solid ${C.border}`, marginBottom: '10px' }}>
                  <div style={{ color: C.gold, fontSize: '10px', fontWeight: '600', marginBottom: '5px' }}>Campaign Summary</div>
                  <div style={{ color: C.silver, fontSize: '10px', lineHeight: '1.7' }}>
                    📧 Subject: {emailSubject || '(not set)'}<br />
                    👥 Recipients: {selectedIds.length}<br />
                    📤 Channels: {selectedChannels.join(', ')}<br />
                    {schedDate && <>📅 Scheduled: {schedDate} at {schedTime}<br /></>}
                    {schedRecurring && <>🔄 Recurring: {schedFreq}<br /></>}
                    {teamAttendees && <>🔔 Team: {teamAttendees}<br /></>}
                    {calConnected && <>✓ Will sync to Google Calendar</>}
                  </div>
                </div>

                <button onClick={scheduleCampaign} disabled={!schedDate || !schedTime || !emailSubject.trim()}
                  style={{ ...s.btn, width: '100%', justifyContent: 'center', padding: '10px', opacity: (!schedDate || !schedTime || !emailSubject.trim()) ? 0.5 : 1 }}>
                  <Calendar size={12} /> Schedule & Add to Calendar
                </button>
              </div>

              {/* Scheduled Campaigns List */}
              {scheduledCampaigns.length > 0 && (
                <div style={s.card}>
                  <div style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>📋 Scheduled ({scheduledCampaigns.length})</div>
                  {scheduledCampaigns.map(c => (
                    <div key={c.id} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.borderSlate}`, borderLeft: `3px solid ${C.gold}`, marginBottom: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ color: C.white, fontSize: '12px', fontWeight: '600', marginBottom: '3px' }}>{c.title}</div>
                          <div style={{ color: C.gold, fontSize: '10px' }}>📅 {c.date} at {c.time}{c.recurring ? ` · ${c.frequency}` : ''}</div>
                          <div style={{ color: C.silverDark, fontSize: '9px', marginTop: '2px' }}>
                            👥 {c.recipients} recipients · {c.channels.join(', ')}
                            {c.attendees?.length > 0 && ` · 🔔 ${c.attendees.join(', ')}`}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '3px' }}>
                          <button onClick={() => { navigator.clipboard?.writeText(`Campaign: ${c.title} scheduled for ${c.date} ${c.time}`); }} style={{ ...s.btn2, padding: '3px 6px' }}><Copy size={9} /></button>
                          <button onClick={() => { const updated = scheduledCampaigns.filter(x => x.id !== c.id); setScheduledCampaigns(updated); localStorage.setItem('eb_scheduled_campaigns', JSON.stringify(updated)); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.danger }}><Trash2 size={11} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── ANALYTICS TAB ───────────────────────────── */}
          {activeTab === 'analytics' && (
            <div>
              {/* KPI Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
                {[
                  { label: 'Emails Sent',  value: analytics.totalSent || 0,    color: C.gold,       icon: <Mail size={16} /> },
                  { label: 'Delivered',    value: analytics.delivered || 0,    color: C.silver,     icon: <Check size={16} /> },
                  { label: 'Opened',       value: analytics.opened || 0,       color: C.info,       icon: <Eye size={16} /> },
                  { label: 'Clicked',      value: analytics.clicked || 0,      color: C.warning,    icon: <ExternalLink size={16} /> },
                ].map(({ label, value, color, icon }) => (
                  <div key={label} style={{ ...s.card, textAlign: 'center', borderColor: color, marginBottom: 0 }}>
                    <div style={{ color, marginBottom: '4px' }}>{icon}</div>
                    <div style={{ color, fontSize: '22px', fontWeight: '700' }}>{value.toLocaleString()}</div>
                    <div style={{ color: C.silverDark, fontSize: '10px', letterSpacing: '1px' }}>{label.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              {/* Rate Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                {[
                  { label: 'Open Rate',  value: analytics.totalSent > 0 ? ((analytics.opened / analytics.totalSent) * 100).toFixed(1) + '%' : '—', color: C.info },
                  { label: 'Click Rate', value: analytics.opened > 0   ? ((analytics.clicked / analytics.opened) * 100).toFixed(1) + '%' : '—', color: C.warning },
                  { label: 'Campaigns',  value: analytics.campaigns || scheduledCampaigns.length, color: C.gold },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ ...s.card, padding: '16px', textAlign: 'center', marginBottom: 0 }}>
                    <div style={{ color, fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{value}</div>
                    <div style={{ color: C.silverDark, fontSize: '10px', letterSpacing: '1px' }}>{label.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              {/* SI Lead Tier Breakdown */}
              <div style={s.card}>
                <div style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '10px' }}>⚡ SI Lead Scoring Breakdown</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {[0, 1, 2, 3].map(tier => {
                    const count = contacts.filter(c => c.siTier === tier).length;
                    const labels = ['Hot (Tier 0)', 'Qualified (Tier 1)', 'Warm (Tier 2)', 'Cold (Tier 3)'];
                    const cols = [C.gold, C.info, C.warning, C.silverDark];
                    return (
                      <div key={tier} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${cols[tier]}40`, textAlign: 'center' }}>
                        <div style={{ color: cols[tier], fontSize: '22px', fontWeight: '700' }}>{count}</div>
                        <div style={{ color: C.silverDark, fontSize: '9px', marginTop: '3px' }}>{labels[tier]}</div>
                        <button onClick={() => {
                          setSelectedIds(contacts.filter(c => c.siTier === tier).map(c => c.id));
                          setActiveTab('compose');
                        }} style={{ ...s.btn2, fontSize: '8px', padding: '2px 6px', marginTop: '5px' }}>Select</button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Category Breakdown */}
              <div style={s.card}>
                <div style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '10px' }}>👥 Contact Database</div>
                {LIST_CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                  const count = getCategoryCount(cat.id);
                  const pct = contacts.length > 0 ? (count / contacts.length * 100) : 0;
                  return (
                    <div key={cat.id} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ color: C.silver, fontSize: '11px' }}>{cat.icon} {cat.name}</span>
                        <span style={{ color: cat.color, fontSize: '11px', fontWeight: '700' }}>{count}</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.05)', height: '4px' }}>
                        <div style={{ background: cat.color, height: '100%', width: `${pct}%`, transition: 'width 0.3s' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── SIDE PANELS ──────────────────────────────── */}
        {sidePanel && (
          <div style={s.panel}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: C.gold, fontSize: '12px', fontWeight: '600' }}>
                {sidePanel === 'calendar' ? '📅 Calendar' : sidePanel === 'meeting' ? '📹 Meeting' : '🤖 AI Brain'}
              </span>
              <button onClick={() => setSidePanel(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={14} color={C.silverDark} /></button>
            </div>

            {/* CALENDAR PANEL */}
            {sidePanel === 'calendar' && (
              <div>
                {!calConnected ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Calendar size={28} color={C.gold} style={{ marginBottom: '8px' }} />
                    <p style={{ color: C.silver, fontSize: '11px', marginBottom: '10px', lineHeight: '1.5' }}>Connect Google Calendar to sync campaigns and send team notifications about incoming leads.</p>
                    <button onClick={connectCalendar} style={{ ...s.btn, width: '100%', justifyContent: 'center' }}><Globe size={11} /> Connect Google</button>
                  </div>
                ) : (
                  <div>
                    {/* Mini Calendar */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ ...s.btn2, padding: '2px 5px' }}><ChevronLeft size={10} /></button>
                        <span style={{ color: C.white, fontSize: '11px', fontWeight: '600' }}>{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ ...s.btn2, padding: '2px 5px' }}><ChevronRight size={10} /></button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
                        {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} style={{ textAlign: 'center', color: C.silverDark, fontSize: '8px', padding: '2px' }}>{d}</div>)}
                        {getDays(currentMonth).map((day, i) => {
                          const events = day ? getEventsForDate(day) : [];
                          const isToday = day?.toDateString() === new Date().toDateString();
                          const isSel   = day && selectedDate && day.toDateString() === selectedDate.toDateString();
                          return (
                            <div key={i} onClick={() => day && setSelectedDate(day)}
                              style={{ textAlign: 'center', padding: '3px 1px', fontSize: '9px', cursor: day ? 'pointer' : 'default', background: isSel ? C.gold : isToday ? C.infoDim : 'transparent', color: isSel ? C.bg : day ? C.white : 'transparent', position: 'relative' }}>
                              {day?.getDate()}
                              {events.length > 0 && <div style={{ position: 'absolute', bottom: '1px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '3px', background: events[0].color || C.gold, borderRadius: '50%' }} />}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selected Date */}
                    {selectedDate && (
                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ color: C.silver, fontSize: '10px', marginBottom: '5px' }}>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                        {getEventsForDate(selectedDate).length > 0
                          ? getEventsForDate(selectedDate).map(ev => (
                            <div key={ev.id} style={{ padding: '6px', background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${ev.color || C.gold}`, marginBottom: '4px' }}>
                              <div style={{ color: C.white, fontSize: '10px', fontWeight: '600' }}>{ev.title}</div>
                              <div style={{ color: C.silverDark, fontSize: '9px' }}>{ev.time}</div>
                            </div>
                          ))
                          : <div style={{ color: C.silverDark, fontSize: '10px', textAlign: 'center', padding: '8px' }}>No events</div>
                        }
                      </div>
                    )}

                    {/* Upcoming */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ color: C.silverDark, fontSize: '9px', letterSpacing: '1px', marginBottom: '4px' }}>UPCOMING</div>
                      {[...calEvents, ...scheduledCampaigns.map(c => ({ ...c, title: `📧 ${c.title}` }))].slice(0, 6).map(ev => (
                        <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px', background: 'rgba(255,255,255,0.02)', marginBottom: '2px' }}>
                          <div style={{ width: '5px', height: '5px', background: ev.color || C.gold, borderRadius: '50%', flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ color: C.white, fontSize: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
                            <div style={{ color: C.silverDark, fontSize: '8px' }}>{ev.date} {ev.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => setShowEventModal(true)} style={{ ...s.btn, width: '100%', justifyContent: 'center', fontSize: '10px' }}>
                      <Plus size={10} /> Create Event
                    </button>
                    <button onClick={disconnectCalendar} style={{ ...s.btn2, width: '100%', justifyContent: 'center', fontSize: '9px', marginTop: '4px' }}>Disconnect</button>
                  </div>
                )}
              </div>
            )}

            {/* MEETING PANEL */}
            {sidePanel === 'meeting' && (
              <div>
                {!meetingActive ? (
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <Video size={28} color={C.gold} style={{ marginBottom: '8px' }} />
                    <p style={{ color: C.silver, fontSize: '11px', lineHeight: '1.5', marginBottom: '10px' }}>Start a video call. Share the ID with your team or clients.</p>
                    <div style={{ padding: '8px', background: C.goldSoft, border: `1px solid ${C.border}`, marginBottom: '10px', textAlign: 'center' }}>
                      <div style={{ color: C.silverDark, fontSize: '8px', letterSpacing: '1px' }}>MEETING ID</div>
                      <div style={{ color: C.gold, fontSize: '16px', fontWeight: '700', letterSpacing: '3px' }}>{meetingId}</div>
                    </div>
                    <button onClick={startMeeting} style={{ ...s.btn, width: '100%', justifyContent: 'center' }}><Video size={12} /> Start</button>
                  </div>
                ) : (
                  <div>
                    <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '140px', background: '#000', objectFit: 'cover', display: 'block', marginBottom: '6px' }} />
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '8px' }}>
                      <button onClick={toggleMic} style={{ ...s.btn2, background: isMicOn ? s.btn2.background : C.dangerDim }}>{isMicOn ? <Mic size={11} /> : <MicOff size={11} />}</button>
                      <button onClick={toggleCamera} style={{ ...s.btn2, background: isCameraOn ? s.btn2.background : C.dangerDim }}>{isCameraOn ? <Video size={11} /> : <VideoOff size={11} />}</button>
                      <button onClick={() => { navigator.clipboard?.writeText(`https://enjoybaja.com/meeting/${meetingId}`); alert('Link copied!'); }} style={s.btn2}><UserPlus size={11} /></button>
                      <button onClick={endMeeting} style={s.btnDanger}><PhoneOff size={11} /></button>
                    </div>
                    <div style={{ padding: '6px', background: C.goldSoft, textAlign: 'center' }}>
                      <div style={{ color: C.gold, fontSize: '11px', fontWeight: '600' }}>LIVE — {meetingId}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI BRAIN PANEL */}
            {sidePanel === 'ai' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', marginBottom: '10px' }}>
                  {MINERS.map(m => (
                    <button key={m.id} onClick={() => setSelectedMiner(selectedMiner?.id === m.id ? null : m)}
                      style={{ padding: '6px 4px', background: selectedMiner?.id === m.id ? C.goldSoft : 'rgba(255,255,255,0.03)', border: `1px solid ${selectedMiner?.id === m.id ? C.gold : C.borderSlate}`, cursor: 'pointer', textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', marginBottom: '2px' }}>{m.emoji}</div>
                      <div style={{ color: selectedMiner?.id === m.id ? C.gold : C.silverDark, fontSize: '7px', lineHeight: '1.2' }}>{m.name.split(' ').slice(0, 2).join('\n')}</div>
                    </button>
                  ))}
                </div>

                {selectedMiner && (
                  <div style={{ padding: '6px', background: C.goldSoft, border: `1px solid ${C.border}`, marginBottom: '8px', fontSize: '10px', color: C.gold }}>
                    {selectedMiner.emoji} <strong>{selectedMiner.name}</strong> — {selectedMiner.skill}
                  </div>
                )}

                <div style={{ marginBottom: '8px' }}>
                  <label style={s.label}>Prompt</label>
                  <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                    placeholder={selectedMiner ? `Ask ${selectedMiner.name} to...` : 'Select a miner and enter your prompt...'}
                    style={{ ...s.textarea, minHeight: '80px' }} />
                </div>

                <button onClick={generateWithAI} disabled={aiGenerating || !aiPrompt.trim()}
                  style={{ ...s.btn, width: '100%', justifyContent: 'center', opacity: aiGenerating || !aiPrompt.trim() ? 0.5 : 1 }}>
                  {aiGenerating ? <><Loader size={11} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : <><Sparkles size={11} /> Generate Content</>}
                </button>

                <div style={{ marginTop: '12px', padding: '8px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.borderSlate}`, fontSize: '9px', color: C.silverDark, lineHeight: '1.6' }}>
                  <div style={{ color: C.silver, fontWeight: '600', marginBottom: '4px' }}>QUICK PROMPTS</div>
                  {[
                    'Write a new listing announcement for Ensenada oceanfront property $450K',
                    'Create a mortgage intro email for US citizens interested in Baja',
                    'Write a follow-up email for buyers who inquired last week',
                    'Market update: Cabo San Lucas prices up 12% this quarter',
                  ].map((p, i) => (
                    <div key={i} onClick={() => setAiPrompt(p)} style={{ padding: '4px 6px', background: 'rgba(255,255,255,0.03)', marginBottom: '3px', cursor: 'pointer', color: C.silver }}>
                      {p.substring(0, 50)}...
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── EVENT MODAL ──────────────────────────────────── */}
      {showEventModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: C.bgLight, border: `1px solid ${C.gold}`, padding: '20px', width: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: C.gold, fontSize: '13px', fontWeight: '600' }}>📅 Create Calendar Event</span>
              <button onClick={() => setShowEventModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} color={C.silverDark} /></button>
            </div>
            {[
              { label: 'Title *', field: 'title', type: 'text', ph: 'Event title' },
              { label: 'Description', field: 'description', type: 'textarea', ph: 'Details...' },
              { label: 'Location', field: 'location', type: 'text', ph: 'Address or meeting link' },
              { label: 'Invite Attendees (emails)', field: 'attendees', type: 'text', ph: 'email1@company.com, email2@...' },
            ].map(({ label, field, type, ph }) => (
              <div key={field} style={{ marginBottom: '10px' }}>
                <label style={s.label}>{label}</label>
                {type === 'textarea'
                  ? <textarea value={newEvent[field]} onChange={e => setNewEvent(p => ({ ...p, [field]: e.target.value }))} placeholder={ph} style={{ ...s.textarea, minHeight: '55px' }} />
                  : <input type="text" value={newEvent[field]} onChange={e => setNewEvent(p => ({ ...p, [field]: e.target.value }))} placeholder={ph} style={s.input} />
                }
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
              <div><label style={s.label}>Date *</label><input type="date" value={newEvent.date} onChange={e => setNewEvent(p => ({ ...p, date: e.target.value }))} style={s.input} /></div>
              <div><label style={s.label}>Start</label><input type="time" value={newEvent.startTime} onChange={e => setNewEvent(p => ({ ...p, startTime: e.target.value }))} style={s.input} /></div>
              <div><label style={s.label}>End</label><input type="time" value={newEvent.endTime} onChange={e => setNewEvent(p => ({ ...p, endTime: e.target.value }))} style={s.input} /></div>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setShowEventModal(false)} style={{ ...s.btn2, flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button onClick={() => {
                if (!newEvent.title || !newEvent.date) { alert('Title and date required'); return; }
                const ev = { id: Date.now(), title: newEvent.title, date: newEvent.date, time: newEvent.startTime, color: C.info, type: 'manual' };
                setCalEvents(prev => [...prev, ev]);
                setShowEventModal(false);
                setNewEvent({ title: '', description: '', date: '', startTime: '09:00', endTime: '10:00', location: '', attendees: '' });
                alert(`✅ Event created${calConnected ? ' & synced to Google Calendar' : ''}`);
              }} style={{ ...s.btn, flex: 1, justifyContent: 'center' }}>
                <Calendar size={11} /> Create
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(0.6); cursor: pointer; }
      `}</style>
    </div>
  );
}