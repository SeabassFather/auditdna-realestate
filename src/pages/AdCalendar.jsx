import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const G='#C9A84C',W='#F8F6F1',WD='rgba(248,246,241,0.55)',GLASS='rgba(255,255,255,0.04)',BORDER='rgba(201,168,76,0.22)',BORDERF='rgba(248,246,241,0.07)';
const SERIF='"Cormorant Garamond","Didot",Georgia,serif',SANS='"Helvetica Neue",Arial,sans-serif';
const BG='linear-gradient(150deg,#06080c 0%,#0b0f18 55%,#070a0f 100%)';
const lbl={fontSize:'8px',letterSpacing:'3px',color:G,textTransform:'uppercase',fontFamily:SANS};

const MONTHS=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
// eslint-disable-next-line no-unused-vars
const DAYS=['MON','TUE','WED','THU','FRI','SAT','SUN'];

const ads=[
  {slot:'FEB W1',client:'Pebble Beach Luxury',type:'BANNER',value:'$4,200',status:'LIVE'},
  {slot:'FEB W2',client:'Valle de Guadalupe Estates',type:'FEATURED',value:'$6,800',status:'LIVE'},
  {slot:'FEB W3',client:'Cabo San Lucas Realty',type:'SIDEBAR',value:'$2,100',status:'BOOKED'},
  {slot:'MAR W1',client:'—',type:'BANNER',value:'$4,200',status:'AVAILABLE'},
  {slot:'MAR W2',client:'Ensenada Marina',type:'FEATURED',value:'$6,800',status:'BOOKED'},
  {slot:'MAR W3',client:'—',type:'SIDEBAR',value:'$2,100',status:'AVAILABLE'},
];

const stColor={LIVE:G,BOOKED:'rgba(134,239,172,0.8)',AVAILABLE:'rgba(248,246,241,0.3)'};

export default function AdCalendar() {
  const nav=useNavigate();
  const [hov,setHov]=useState(null);
  const [month,setMonth]=useState(1);

  return (
    <div style={{minHeight:'100vh',background:BG,color:W,fontFamily:SANS}}>
      <div style={{borderBottom:`1px solid ${BORDER}`,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(28px)',position:'sticky',top:0,zIndex:100}}>
        <div>
          <div style={{...lbl,marginBottom:'6px'}}>AuditDNA Platform — Admin</div>
          <div style={{fontFamily:SERIF,fontSize:'26px',fontWeight:'300',letterSpacing:'1px',color:W}}>Ad Calendar</div>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <button style={{background:G,border:'none',color:'#000',padding:'11px 32px',fontSize:'8px',letterSpacing:'3px',fontFamily:SANS,fontWeight:'700',cursor:'pointer',textTransform:'uppercase'}}>+ BOOK SLOT</button>
          <button onClick={()=>nav('/admin')} style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'11px 24px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase'}}>← BACK</button>
        </div>
      </div>

      <div style={{padding:'40px 48px'}}>
        {/* STATS */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`,marginBottom:'40px'}}>
          {[{l:'BOOKED SLOTS',v:'18'},{l:'AVAILABLE',v:'14'},{l:'Q1 REVENUE',v:'$84,400'},{l:'FILL RATE',v:'56%'}].map((s,i)=>(
            <div key={i} style={{background:GLASS,backdropFilter:'blur(16px)',padding:'28px 32px'}}>
              <div style={{...lbl,marginBottom:'10px'}}>{s.l}</div>
              <div style={{fontFamily:SERIF,fontSize:'34px',fontWeight:'300',color:W}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* MONTH SELECTOR */}
        <div style={{display:'flex',gap:'0',borderBottom:`1px solid ${BORDER}`,marginBottom:'0',overflowX:'auto'}}>
          {MONTHS.map((m,i)=>(
            <button key={m} onClick={()=>setMonth(i)} style={{background:'transparent',border:'none',borderBottom:month===i?`2px solid ${G}`:'2px solid transparent',color:month===i?G:WD,padding:'12px 20px',fontSize:'9px',letterSpacing:'3px',fontFamily:SANS,cursor:'pointer',marginBottom:'-1px',whiteSpace:'nowrap'}}>{m}</button>
          ))}
        </div>

        {/* AD SLOTS TABLE */}
        <div style={{border:`1px solid ${BORDER}`,borderTop:'none',background:GLASS,backdropFilter:'blur(16px)'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'rgba(0,0,0,0.45)'}}>
                {['SLOT','CLIENT','AD TYPE','VALUE','STATUS',''].map((h,i)=>(
                  <th key={i} style={{...lbl,padding:'16px 24px',textAlign:'left',borderBottom:`1px solid ${BORDER}`,fontWeight:'400'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ads.map((a,i)=>(
                <tr key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{background:hov===i?'rgba(201,168,76,0.04)':'transparent',transition:'background 0.15s',borderBottom:`1px solid ${BORDERF}`}}>
                  <td style={{padding:'18px 24px',fontSize:'10px',color:G,fontFamily:SANS,letterSpacing:'2px'}}>{a.slot}</td>
                  <td style={{padding:'18px 24px',fontSize:'13px',fontFamily:SERIF,fontWeight:'300',color:a.client==='—'?WD:W}}>{a.client}</td>
                  <td style={{padding:'18px 24px',fontSize:'10px',color:WD,fontFamily:SANS,letterSpacing:'1px'}}>{a.type}</td>
                  <td style={{padding:'18px 24px',fontSize:'13px',fontFamily:SERIF,color:W}}>{a.value}</td>
                  <td style={{padding:'18px 24px'}}>
                    <span style={{fontSize:'8px',letterSpacing:'2px',padding:'4px 12px',border:`1px solid ${stColor[a.status]}`,color:stColor[a.status],fontFamily:SANS}}>{a.status}</span>
                  </td>
                  <td style={{padding:'18px 24px'}}>
                    {a.status==='AVAILABLE'
                      ? <button style={{background:G,border:'none',color:'#000',padding:'6px 18px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,fontWeight:'700',cursor:'pointer'}}>BOOK</button>
                      : <button style={{background:'transparent',border:`1px solid ${BORDER}`,color:G,padding:'6px 18px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>MANAGE</button>
                    }
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
