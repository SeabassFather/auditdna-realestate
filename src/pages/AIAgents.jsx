import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const G='#C9A84C',W='#F8F6F1',WD='rgba(248,246,241,0.55)',GLASS='rgba(255,255,255,0.04)',BORDER='rgba(201,168,76,0.22)',BORDERF='rgba(248,246,241,0.07)';
const SERIF='"Cormorant Garamond","Didot",Georgia,serif',SANS='"Helvetica Neue",Arial,sans-serif';
const BG='linear-gradient(150deg,#06080c 0%,#0b0f18 55%,#070a0f 100%)';
const lbl={fontSize:'8px',letterSpacing:'3px',color:G,textTransform:'uppercase',fontFamily:SANS};

const teams=[
  {name:'Data Intelligence',miners:9,active:9,tasks:1204,avg:'0.4s'},
  {name:'Workflow Automation',miners:9,active:8,tasks:987,avg:'0.6s'},
  {name:'Security & Compliance',miners:9,active:9,tasks:2341,avg:'0.3s'},
  {name:'Financial Intelligence',miners:9,active:9,tasks:654,avg:'0.8s'},
  {name:'Real Estate Intelligence',miners:9,active:7,tasks:891,avg:'0.5s'},
  {name:'Agricultural Intelligence',miners:9,active:9,tasks:1122,avg:'0.4s'},
  {name:'Communication & CRM',miners:9,active:8,tasks:3201,avg:'0.2s'},
  {name:'Mortgage Audit',miners:9,active:9,tasks:445,avg:'1.1s'},
  {name:'System Operations',miners:9,active:9,tasks:5610,avg:'0.1s'},
];

export default function AIAgents() {
  const nav=useNavigate();
  const [hov,setHov]=useState(null);
  // eslint-disable-next-line no-unused-vars
  const [live,setLive]=useState(true);
  const totalTasks=teams.reduce((s,t)=>s+t.tasks,0);
  const totalActive=teams.reduce((s,t)=>s+t.active,0);

  return (
    <div style={{minHeight:'100vh',background:BG,color:W,fontFamily:SANS}}>
      <div style={{borderBottom:`1px solid ${BORDER}`,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(28px)',position:'sticky',top:0,zIndex:100}}>
        <div>
          <div style={{...lbl,marginBottom:'6px'}}>AuditDNA Platform — Admin</div>
          <div style={{fontFamily:SERIF,fontSize:'26px',fontWeight:'300',letterSpacing:'1px',color:W}}>AI Agents — 81 Niner Miners</div>
        </div>
        <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'8px',height:'8px',background:live?'#86efac':'rgba(239,68,68,0.8)',boxShadow:live?'0 0 8px #86efac':'none',animation:live?'pulse 2s infinite':''}} />
            <span style={{fontSize:'9px',letterSpacing:'2px',color:live?'#86efac':'rgba(239,68,68,0.8)',fontFamily:SANS}}>{live?'BRAIN ONLINE':'OFFLINE'}</span>
          </div>
          <button onClick={()=>nav('/admin')} style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'11px 24px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase'}}>← BACK</button>
        </div>
      </div>

      <div style={{padding:'40px 48px'}}>
        {/* BRAIN STATUS */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`,marginBottom:'40px'}}>
          {[{l:'TOTAL MINERS',v:'81'},{l:'ACTIVE NOW',v:`${totalActive}`},{l:'TASKS PROCESSED',v:totalTasks.toLocaleString()},{l:'TEAMS',v:'9'}].map((s,i)=>(
            <div key={i} style={{background:GLASS,backdropFilter:'blur(16px)',padding:'28px 32px'}}>
              <div style={{...lbl,marginBottom:'10px'}}>{s.l}</div>
              <div style={{fontFamily:SERIF,fontSize:'38px',fontWeight:'300',color:W}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* TEAMS GRID */}
        <div style={{...lbl,marginBottom:'16px',paddingBottom:'16px',borderBottom:`1px solid ${BORDER}`}}>NINER MINER TEAMS</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`}}>
          {teams.map((t,i)=>(
            <div key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{background:hov===i?'rgba(201,168,76,0.06)':GLASS,backdropFilter:'blur(16px)',padding:'28px 32px',cursor:'pointer',transition:'background 0.15s'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
                <div style={{...lbl,color:WD}}>{t.name}</div>
                <span style={{fontSize:'8px',letterSpacing:'1px',padding:'3px 10px',border:`1px solid rgba(134,239,172,0.3)`,color:'#86efac',fontFamily:SANS}}>{t.active}/{t.miners} ACTIVE</span>
              </div>
              <div style={{fontFamily:SERIF,fontSize:'32px',fontWeight:'300',color:W,marginBottom:'6px'}}>{t.tasks.toLocaleString()}</div>
              <div style={{fontSize:'10px',color:WD,fontFamily:SANS}}>tasks processed · avg {t.avg}</div>
              <div style={{marginTop:'16px',display:'flex',gap:'4px'}}>
                {Array.from({length:t.miners},(_, i)=>(
                  <div key={i} style={{width:'6px',height:'6px',background:i<t.active?G:'rgba(201,168,76,0.2)'}} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
