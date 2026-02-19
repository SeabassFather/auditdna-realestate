import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const G='#C9A84C',W='#F8F6F1',WD='rgba(248,246,241,0.55)',GLASS='rgba(255,255,255,0.04)',BORDER='rgba(201,168,76,0.22)',BORDERF='rgba(248,246,241,0.07)';
const SERIF='"Cormorant Garamond","Didot",Georgia,serif',SANS='"Helvetica Neue",Arial,sans-serif';
const BG='linear-gradient(150deg,#06080c 0%,#0b0f18 55%,#070a0f 100%)';
const lbl={fontSize:'8px',letterSpacing:'3px',color:G,textTransform:'uppercase',fontFamily:SANS};
const hd=(s={})=>({fontFamily:SERIF,fontWeight:'300',color:W,...s});

const issues=[
  {id:'EB-024',title:'Baja California — The New Riviera',status:'LIVE',date:'Feb 2026',views:'12,440',author:'Editorial'},
  {id:'EB-023',title:'Valle de Guadalupe: Wine Country Reborn',status:'LIVE',date:'Jan 2026',views:'9,871',author:'S. Guerrero'},
  {id:'EB-022',title:'The Art of the Baja Investment',status:'DRAFT',date:'Mar 2026',views:'—',author:'Editorial'},
  {id:'EB-021',title:'Luxury Living Below the Border',status:'DRAFT',date:'Apr 2026',views:'—',author:'S. Guerrero'},
  {id:'EB-020',title:'Ensenada — Port City Renaissance',status:'LIVE',date:'Dec 2025',views:'7,203',author:'A. Beltrán'},
];

export default function MagazineEditor() {
  const nav=useNavigate();
  const [tab,setTab]=useState('issues');
  const [hov,setHov]=useState(null);
  return (
    <div style={{minHeight:'100vh',background:BG,color:W,fontFamily:SANS}}>
      <div style={{borderBottom:`1px solid ${BORDER}`,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(28px)',position:'sticky',top:0,zIndex:100}}>
        <div>
          <div style={{...lbl,marginBottom:'6px'}}>AuditDNA Platform — Admin</div>
          <div style={hd({fontSize:'26px',letterSpacing:'1px'})}>Magazine Editor</div>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <button style={{background:G,border:'none',color:'#000',padding:'11px 32px',fontSize:'8px',letterSpacing:'3px',fontFamily:SANS,fontWeight:'700',cursor:'pointer',textTransform:'uppercase'}}>+ NEW ISSUE</button>
          <button onClick={()=>nav('/admin')} style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'11px 24px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase'}}>← BACK</button>
        </div>
      </div>
      <div style={{padding:'40px 48px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`,marginBottom:'40px'}}>
          {[{l:'TOTAL ISSUES',v:'24'},{l:'LIVE',v:'20'},{l:'DRAFTS',v:'4'},{l:'TOTAL VIEWS',v:'89,204'}].map((s,i)=>(
            <div key={i} style={{background:GLASS,backdropFilter:'blur(16px)',padding:'28px 32px'}}>
              <div style={{...lbl,marginBottom:'10px'}}>{s.l}</div>
              <div style={hd({fontSize:'38px'})}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',borderBottom:`1px solid ${BORDER}`}}>
          {['ISSUES','SCHEDULE','ANALYTICS'].map(t=>(
            <button key={t} onClick={()=>setTab(t.toLowerCase())} style={{background:'transparent',border:'none',borderBottom:tab===t.toLowerCase()?`2px solid ${G}`:'2px solid transparent',color:tab===t.toLowerCase()?G:WD,padding:'12px 28px',fontSize:'9px',letterSpacing:'3px',fontFamily:SANS,cursor:'pointer',marginBottom:'-1px'}}>{t}</button>
          ))}
        </div>
        <div style={{border:`1px solid ${BORDER}`,borderTop:'none',background:GLASS,backdropFilter:'blur(16px)'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'rgba(0,0,0,0.45)'}}>
                {['ISSUE','TITLE','AUTHOR','STATUS','PUBLISH','VIEWS',''].map((h,i)=>(
                  <th key={i} style={{...lbl,padding:'16px 24px',textAlign:'left',borderBottom:`1px solid ${BORDER}`,fontWeight:'400'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map((row,i)=>(
                <tr key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{background:hov===i?'rgba(201,168,76,0.04)':'transparent',transition:'background 0.15s',borderBottom:`1px solid ${BORDERF}`}}>
                  <td style={{padding:'18px 24px',fontSize:'10px',color:G,fontFamily:SANS,letterSpacing:'1px'}}>{row.id}</td>
                  <td style={{padding:'18px 24px',fontSize:'14px',fontFamily:SERIF,fontWeight:'300',color:W}}>{row.title}</td>
                  <td style={{padding:'18px 24px',fontSize:'11px',color:WD,fontFamily:SANS}}>{row.author}</td>
                  <td style={{padding:'18px 24px'}}>
                    <span style={{fontSize:'8px',letterSpacing:'2px',padding:'4px 12px',border:`1px solid ${row.status==='LIVE'?'rgba(134,239,172,0.35)':BORDER}`,color:row.status==='LIVE'?'#86efac':WD,fontFamily:SANS}}>{row.status}</span>
                  </td>
                  <td style={{padding:'18px 24px',fontSize:'11px',color:WD,fontFamily:SANS}}>{row.date}</td>
                  <td style={{padding:'18px 24px',fontSize:'11px',color:WD,fontFamily:SANS}}>{row.views}</td>
                  <td style={{padding:'18px 24px'}}><button style={{background:'transparent',border:`1px solid ${BORDER}`,color:G,padding:'6px 18px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>EDIT</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}