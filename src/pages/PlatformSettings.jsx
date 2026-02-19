import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const G='#C9A84C',W='#F8F6F1',WD='rgba(248,246,241,0.55)',GLASS='rgba(255,255,255,0.04)',BORDER='rgba(201,168,76,0.22)',BORDERF='rgba(248,246,241,0.07)';
const SERIF='"Cormorant Garamond","Didot",Georgia,serif',SANS='"Helvetica Neue",Arial,sans-serif';
const BG='linear-gradient(150deg,#06080c 0%,#0b0f18 55%,#070a0f 100%)';
const lbl={fontSize:'8px',letterSpacing:'3px',color:G,textTransform:'uppercase',fontFamily:SANS};

const Toggle=({on,onChange})=>(
  <div onClick={()=>onChange(!on)} style={{width:'44px',height:'24px',background:on?G:'rgba(255,255,255,0.1)',cursor:'pointer',position:'relative',transition:'background 0.2s',flexShrink:0}}>
    <div style={{position:'absolute',top:'4px',left:on?'22px':'4px',width:'16px',height:'16px',background:on?'#000':W,transition:'left 0.2s'}} />
  </div>
);

export default function PlatformSettings() {
  const nav=useNavigate();
  const [tab,setTab]=useState('general');
  const [settings,setSettings]=useState({
    maintenance:false,demoMode:false,agentApproval:true,emailNotifs:true,
    brainEnabled:true,sslStrict:true,rateLimit:true,auditLogs:true,
  });
  const set=(k,v)=>setSettings(s=>({...s,[k]:v}));

  const rows=[
    {section:'PLATFORM',items:[
      {key:'maintenance',label:'Maintenance Mode',desc:'Take platform offline for all non-admin users'},
      {key:'demoMode',label:'Demo Mode Global',desc:'Apply DEMO watermark across all sessions'},
      {key:'agentApproval',label:'Agent Approval Required',desc:'New agents require admin vetting before access'},
    ]},
    {section:'NOTIFICATIONS',items:[
      {key:'emailNotifs',label:'Email Notifications',desc:'System alerts sent to saul@mexausafg.com'},
      {key:'auditLogs',label:'Audit Logging',desc:'Log all admin actions to audit trail'},
    ]},
    {section:'SYSTEM',items:[
      {key:'brainEnabled',label:'Brain — 81 Niner Miners',desc:'Core AI/SI intelligence layer operational'},
      {key:'sslStrict',label:'SSL Strict Mode',desc:'Force HTTPS for all connections'},
      {key:'rateLimit',label:'API Rate Limiting',desc:'Protect endpoints from abuse'},
    ]},
  ];

  return (
    <div style={{minHeight:'100vh',background:BG,color:W,fontFamily:SANS}}>
      <div style={{borderBottom:`1px solid ${BORDER}`,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(28px)',position:'sticky',top:0,zIndex:100}}>
        <div>
          <div style={{...lbl,marginBottom:'6px'}}>AuditDNA Platform — Admin</div>
          <div style={{fontFamily:SERIF,fontSize:'26px',fontWeight:'300',letterSpacing:'1px',color:W}}>Platform Settings</div>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <button style={{background:G,border:'none',color:'#000',padding:'11px 32px',fontSize:'8px',letterSpacing:'3px',fontFamily:SANS,fontWeight:'700',cursor:'pointer',textTransform:'uppercase'}}>SAVE CHANGES</button>
          <button onClick={()=>nav('/admin')} style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'11px 24px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase'}}>← BACK</button>
        </div>
      </div>

      <div style={{padding:'40px 48px',maxWidth:'900px'}}>
        {rows.map((group,gi)=>(
          <div key={gi} style={{marginBottom:'40px'}}>
            <div style={{...lbl,marginBottom:'0',paddingBottom:'16px',borderBottom:`1px solid ${BORDER}`}}>{group.section}</div>
            <div style={{border:`1px solid ${BORDER}`,borderTop:'none',background:GLASS,backdropFilter:'blur(16px)'}}>
              {group.items.map((item,ii)=>(
                <div key={ii} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 32px',borderBottom:ii<group.items.length-1?`1px solid ${BORDERF}`:'none'}}>
                  <div>
                    <div style={{fontSize:'14px',fontFamily:SERIF,fontWeight:'300',color:W,marginBottom:'4px'}}>{item.label}</div>
                    <div style={{fontSize:'11px',color:WD,fontFamily:SANS}}>{item.desc}</div>
                  </div>
                  <Toggle on={settings[item.key]} onChange={v=>set(item.key,v)} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* DANGER ZONE */}
        <div style={{...lbl,marginBottom:'0',paddingBottom:'16px',borderBottom:'1px solid rgba(239,68,68,0.3)',color:'rgba(239,68,68,0.7)'}}>DANGER ZONE</div>
        <div style={{border:'1px solid rgba(239,68,68,0.2)',borderTop:'none',background:'rgba(239,68,68,0.03)',backdropFilter:'blur(16px)'}}>
          {[
            {label:'Clear All Sessions',desc:'Force logout all active users immediately',btn:'CLEAR'},
            {label:'Reset Demo Accounts',desc:'Restore all demo credentials to defaults',btn:'RESET'},
            {label:'Purge Audit Logs',desc:'Permanently delete logs older than 90 days',btn:'PURGE'},
          ].map((d,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'22px 32px',borderBottom:i<2?`1px solid rgba(239,68,68,0.1)`:'none'}}>
              <div>
                <div style={{fontSize:'14px',fontFamily:SERIF,fontWeight:'300',color:W,marginBottom:'4px'}}>{d.label}</div>
                <div style={{fontSize:'11px',color:WD,fontFamily:SANS}}>{d.desc}</div>
              </div>
              <button style={{background:'transparent',border:'1px solid rgba(239,68,68,0.4)',color:'rgba(239,68,68,0.8)',padding:'8px 20px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>{d.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}