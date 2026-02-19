import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const G='#C9A84C',W='#F8F6F1',WD='rgba(248,246,241,0.55)',GLASS='rgba(255,255,255,0.04)',BORDER='rgba(201,168,76,0.22)',BORDERF='rgba(248,246,241,0.07)';
const SERIF='"Cormorant Garamond","Didot",Georgia,serif',SANS='"Helvetica Neue",Arial,sans-serif';
const BG='linear-gradient(150deg,#06080c 0%,#0b0f18 55%,#070a0f 100%)';
const lbl={fontSize:'8px',letterSpacing:'3px',color:G,textTransform:'uppercase',fontFamily:SANS};

const sections=[
  {id:'HOM',name:'Homepage — Hero',type:'LANDING',updated:'2h ago',status:'LIVE',items:4},
  {id:'MRE',name:'Mexico Real Estate',type:'PAGE',updated:'1d ago',status:'LIVE',items:12},
  {id:'LIF',name:'Lifestyle Guide — Featured',type:'EDITORIAL',updated:'3d ago',status:'LIVE',items:8},
  {id:'ADV',name:'Developments — Banner',type:'PROMO',updated:'5d ago',status:'LIVE',items:3},
  {id:'MTG',name:'USA Mortgage — Copy',type:'PAGE',updated:'1w ago',status:'REVIEW',items:6},
  {id:'FTR',name:'Footer — Legal Links',type:'COMPONENT',updated:'2w ago',status:'LIVE',items:9},
];

export default function ContentManager() {
  const nav=useNavigate();
  const [hov,setHov]=useState(null);
  const [sel,setSel]=useState(null);

  return (
    <div style={{minHeight:'100vh',background:BG,color:W,fontFamily:SANS}}>
      <div style={{borderBottom:`1px solid ${BORDER}`,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(28px)',position:'sticky',top:0,zIndex:100}}>
        <div>
          <div style={{...lbl,marginBottom:'6px'}}>AuditDNA Platform — Admin</div>
          <div style={{fontFamily:SERIF,fontSize:'26px',fontWeight:'300',letterSpacing:'1px',color:W}}>Content Manager</div>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <button style={{background:G,border:'none',color:'#000',padding:'11px 32px',fontSize:'8px',letterSpacing:'3px',fontFamily:SANS,fontWeight:'700',cursor:'pointer',textTransform:'uppercase'}}>+ NEW BLOCK</button>
          <button onClick={()=>nav('/admin')} style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'11px 24px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase'}}>← BACK</button>
        </div>
      </div>

      <div style={{padding:'40px 48px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`,marginBottom:'40px'}}>
          {[{l:'CONTENT BLOCKS',v:'44'},{l:'LIVE',v:'38'},{l:'IN REVIEW',v:'4'},{l:'LAST UPDATED',v:'2h ago'}].map((s,i)=>(
            <div key={i} style={{background:GLASS,backdropFilter:'blur(16px)',padding:'28px 32px'}}>
              <div style={{...lbl,marginBottom:'10px'}}>{s.l}</div>
              <div style={{fontFamily:SERIF,fontSize:'34px',fontWeight:'300',color:W}}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`}}>
          {sections.map((s,i)=>(
            <div key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} onClick={()=>setSel(sel===i?null:i)}
              style={{background:hov===i||sel===i?'rgba(201,168,76,0.06)':GLASS,backdropFilter:'blur(16px)',padding:'28px 32px',cursor:'pointer',transition:'background 0.15s',borderLeft:sel===i?`3px solid ${G}`:'3px solid transparent'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <div style={{...lbl,marginBottom:'8px',color:WD}}>{s.id} — {s.type}</div>
                  <div style={{fontFamily:SERIF,fontSize:'18px',fontWeight:'300',color:W,marginBottom:'8px'}}>{s.name}</div>
                  <div style={{fontSize:'10px',color:WD,fontFamily:SANS}}>{s.items} items · Updated {s.updated}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'12px'}}>
                  <span style={{fontSize:'8px',letterSpacing:'2px',padding:'4px 12px',border:`1px solid ${s.status==='LIVE'?'rgba(134,239,172,0.35)':BORDER}`,color:s.status==='LIVE'?'#86efac':WD,fontFamily:SANS}}>{s.status}</span>
                  <button style={{background:'transparent',border:`1px solid ${BORDER}`,color:G,padding:'6px 16px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>EDIT</button>
                </div>
              </div>
              {sel===i && (
                <div style={{marginTop:'20px',paddingTop:'20px',borderTop:`1px solid ${BORDERF}`,display:'flex',gap:'10px'}}>
                  <button style={{background:G,border:'none',color:'#000',padding:'8px 20px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,fontWeight:'700',cursor:'pointer'}}>PUBLISH</button>
                  <button style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'8px 20px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>PREVIEW</button>
                  <button style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'8px 20px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>DUPLICATE</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}