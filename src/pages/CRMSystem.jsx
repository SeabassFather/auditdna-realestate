import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const G='#C9A84C',W='#F8F6F1',WD='rgba(248,246,241,0.55)',GLASS='rgba(255,255,255,0.04)',BORDER='rgba(201,168,76,0.22)',BORDERF='rgba(248,246,241,0.07)';
const SERIF='"Cormorant Garamond","Didot",Georgia,serif',SANS='"Helvetica Neue",Arial,sans-serif';
const BG='linear-gradient(150deg,#06080c 0%,#0b0f18 55%,#070a0f 100%)';
const lbl={fontSize:'8px',letterSpacing:'3px',color:G,textTransform:'uppercase',fontFamily:SANS};

const leads=[
  {name:'Richard Halverson',source:'Mexico RE',interest:'Luxury Villa — Ensenada',value:'$2.4M',status:'HOT',time:'14m ago'},
  {name:'Catherine Wohl',source:'FSBO',interest:'Beachfront Land — Rosarito',value:'$890K',status:'WARM',time:'1h ago'},
  {name:'Marco Delgado',source:'Lifestyle',interest:'Wine Country Estate',value:'$1.8M',status:'HOT',time:'3h ago'},
  {name:'Anna Fitzgerald',source:'USA Mortgage',interest:'Refi — $640K',value:'$640K',status:'WARM',time:'1d ago'},
  {name:'James Thornton',source:'Developments',interest:'Pre-sale — La Paz',value:'$520K',status:'COLD',time:'2d ago'},
];

const statusColor={HOT:'rgba(239,68,68,0.8)',WARM:G,COLD:'rgba(96,165,250,0.7)'};

export default function CRMSystem() {
  const nav=useNavigate();
  const [hov,setHov]=useState(null);
  const [view,setView]=useState('leads');

  return (
    <div style={{minHeight:'100vh',background:BG,color:W,fontFamily:SANS}}>
      <div style={{borderBottom:`1px solid ${BORDER}`,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(28px)',position:'sticky',top:0,zIndex:100}}>
        <div>
          <div style={{...lbl,marginBottom:'6px'}}>AuditDNA Platform — Admin</div>
          <div style={{fontFamily:SERIF,fontSize:'26px',fontWeight:'300',letterSpacing:'1px',color:W}}>CRM / PBX System</div>
        </div>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <div style={{width:'10px',height:'10px',background:'#86efac',boxShadow:'0 0 8px #86efac'}} />
          <span style={{fontSize:'9px',letterSpacing:'2px',color:'#86efac',fontFamily:SANS}}>ZADARMA LIVE</span>
          <button onClick={()=>nav('/admin')} style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'11px 24px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase',marginLeft:'16px'}}>← BACK</button>
        </div>
      </div>

      <div style={{padding:'40px 48px'}}>
        {/* STATS */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`,marginBottom:'40px'}}>
          {[{l:'TOTAL LEADS',v:'284'},{l:'HOT',v:'47'},{l:'WARM',v:'118'},{l:'CALLS TODAY',v:'23'},{l:'PIPELINE VALUE',v:'$14.2M'}].map((s,i)=>(
            <div key={i} style={{background:GLASS,backdropFilter:'blur(16px)',padding:'24px 28px'}}>
              <div style={{...lbl,marginBottom:'8px'}}>{s.l}</div>
              <div style={{fontFamily:SERIF,fontSize:'28px',fontWeight:'300',color:W}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{display:'flex',borderBottom:`1px solid ${BORDER}`}}>
          {['LEADS','CALLS','PIPELINE','PBX'].map(t=>(
            <button key={t} onClick={()=>setView(t.toLowerCase())} style={{background:'transparent',border:'none',borderBottom:view===t.toLowerCase()?`2px solid ${G}`:'2px solid transparent',color:view===t.toLowerCase()?G:WD,padding:'12px 28px',fontSize:'9px',letterSpacing:'3px',fontFamily:SANS,cursor:'pointer',marginBottom:'-1px'}}>{t}</button>
          ))}
        </div>

        <div style={{border:`1px solid ${BORDER}`,borderTop:'none',background:GLASS,backdropFilter:'blur(16px)'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'rgba(0,0,0,0.45)'}}>
                {['NAME','SOURCE','INTEREST','PIPELINE VALUE','STATUS','RECEIVED',''].map((h,i)=>(
                  <th key={i} style={{...lbl,padding:'16px 24px',textAlign:'left',borderBottom:`1px solid ${BORDER}`,fontWeight:'400'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l,i)=>(
                <tr key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{background:hov===i?'rgba(201,168,76,0.04)':'transparent',transition:'background 0.15s',borderBottom:`1px solid ${BORDERF}`}}>
                  <td style={{padding:'18px 24px',fontSize:'13px',fontFamily:SERIF,fontWeight:'300',color:W}}>{l.name}</td>
                  <td style={{padding:'18px 24px',fontSize:'10px',color:G,fontFamily:SANS,letterSpacing:'1px'}}>{l.source}</td>
                  <td style={{padding:'18px 24px',fontSize:'11px',color:WD,fontFamily:SANS}}>{l.interest}</td>
                  <td style={{padding:'18px 24px',fontSize:'13px',fontFamily:SERIF,color:W}}>{l.value}</td>
                  <td style={{padding:'18px 24px'}}>
                    <span style={{fontSize:'8px',letterSpacing:'2px',padding:'4px 12px',border:`1px solid ${statusColor[l.status]}`,color:statusColor[l.status],fontFamily:SANS}}>{l.status}</span>
                  </td>
                  <td style={{padding:'18px 24px',fontSize:'11px',color:WD,fontFamily:SANS}}>{l.time}</td>
                  <td style={{padding:'18px 24px',display:'flex',gap:'8px'}}>
                    <button style={{background:'transparent',border:`1px solid ${BORDER}`,color:G,padding:'5px 14px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>CALL</button>
                    <button style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'5px 14px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>VIEW</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}