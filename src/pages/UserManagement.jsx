import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const G='#C9A84C',W='#F8F6F1',WD='rgba(248,246,241,0.55)',GLASS='rgba(255,255,255,0.04)',BORDER='rgba(201,168,76,0.22)',BORDERF='rgba(248,246,241,0.07)';
const SERIF='"Cormorant Garamond","Didot",Georgia,serif',SANS='"Helvetica Neue",Arial,sans-serif';
const BG='linear-gradient(150deg,#06080c 0%,#0b0f18 55%,#070a0f 100%)';
const lbl={fontSize:'8px',letterSpacing:'3px',color:G,textTransform:'uppercase',fontFamily:SANS};

const users=[
  {id:'sg01',name:'Saul Guerrero',email:'sg01@eb.com',role:'OWNER',status:'ACTIVE',last:'Just now',pin:'✓'},
  {id:'jl-02',name:'José Luis',email:'jl-02@eb.com',role:'ADMIN',status:'ACTIVE',last:'2h ago',pin:'✓'},
  {id:'ab-03',name:'Ariel Beltrán',email:'ab-03@eb.com',role:'ADMIN',status:'ACTIVE',last:'1d ago',pin:'✓'},
  {id:'admin01',name:'Admin 01',email:'admin01@eb.com',role:'ADMIN',status:'ACTIVE',last:'3d ago',pin:'✓'},
  {id:'sales01',name:'Sales 01',email:'sales01@eb.com',role:'SALES',status:'ACTIVE',last:'5h ago',pin:'✓'},
  {id:'REagent-01',name:'RE Agent 01',email:'REagent-01@eb.com',role:'AGENT',status:'PENDING',last:'—',pin:'—'},
];

const roleColor={OWNER:G,ADMIN:'#93c5fd',SALES:'#fcd34d',AGENT:WD,PENDING:'rgba(248,246,241,0.3)'};

export default function UserManagement() {
  const nav=useNavigate();
  const [filter,setFilter]=useState('ALL');
  const [hov,setHov]=useState(null);
  const roles=['ALL','OWNER','ADMIN','SALES','AGENT'];
  const filtered=filter==='ALL'?users:users.filter(u=>u.role===filter);

  return (
    <div style={{minHeight:'100vh',background:BG,color:W,fontFamily:SANS}}>
      <div style={{borderBottom:`1px solid ${BORDER}`,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(28px)',position:'sticky',top:0,zIndex:100}}>
        <div>
          <div style={{...lbl,marginBottom:'6px'}}>AuditDNA Platform — Admin</div>
          <div style={{fontFamily:SERIF,fontSize:'26px',fontWeight:'300',letterSpacing:'1px',color:W}}>User Management</div>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <button style={{background:G,border:'none',color:'#000',padding:'11px 32px',fontSize:'8px',letterSpacing:'3px',fontFamily:SANS,fontWeight:'700',cursor:'pointer',textTransform:'uppercase'}}>+ ADD USER</button>
          <button onClick={()=>nav('/admin')} style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'11px 24px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase'}}>← BACK</button>
        </div>
      </div>

      <div style={{padding:'40px 48px'}}>
        {/* STATS */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`,marginBottom:'40px'}}>
          {[{l:'TOTAL USERS',v:'1,000'},{l:'ACTIVE',v:'847'},{l:'AGENTS',v:'742'},{l:'ADMINS',v:'8'},{l:'PENDING',v:'153'}].map((s,i)=>(
            <div key={i} style={{background:GLASS,backdropFilter:'blur(16px)',padding:'24px 28px'}}>
              <div style={{...lbl,marginBottom:'8px'}}>{s.l}</div>
              <div style={{fontFamily:SERIF,fontSize:'34px',fontWeight:'300',color:W}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* FILTER */}
        <div style={{display:'flex',gap:'0',borderBottom:`1px solid ${BORDER}`,marginBottom:'0'}}>
          {roles.map(r=>(
            <button key={r} onClick={()=>setFilter(r)} style={{background:'transparent',border:'none',borderBottom:filter===r?`2px solid ${G}`:'2px solid transparent',color:filter===r?G:WD,padding:'12px 24px',fontSize:'9px',letterSpacing:'3px',fontFamily:SANS,cursor:'pointer',marginBottom:'-1px'}}>{r}</button>
          ))}
        </div>

        {/* TABLE */}
        <div style={{border:`1px solid ${BORDER}`,borderTop:'none',background:GLASS,backdropFilter:'blur(16px)'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'rgba(0,0,0,0.45)'}}>
                {['ID','NAME','EMAIL','ROLE','STATUS','LAST SEEN','PIN',''].map((h,i)=>(
                  <th key={i} style={{...lbl,padding:'16px 24px',textAlign:'left',borderBottom:`1px solid ${BORDER}`,fontWeight:'400'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u,i)=>(
                <tr key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{background:hov===i?'rgba(201,168,76,0.04)':'transparent',transition:'background 0.15s',borderBottom:`1px solid ${BORDERF}`}}>
                  <td style={{padding:'16px 24px',fontSize:'10px',color:G,fontFamily:'monospace',letterSpacing:'1px'}}>{u.id}</td>
                  <td style={{padding:'16px 24px',fontSize:'13px',fontFamily:SERIF,fontWeight:'300',color:W}}>{u.name}</td>
                  <td style={{padding:'16px 24px',fontSize:'11px',color:WD,fontFamily:SANS}}>{u.email}</td>
                  <td style={{padding:'16px 24px'}}>
                    <span style={{fontSize:'8px',letterSpacing:'2px',color:roleColor[u.role]||WD,fontFamily:SANS}}>{u.role}</span>
                  </td>
                  <td style={{padding:'16px 24px'}}>
                    <span style={{fontSize:'8px',letterSpacing:'2px',padding:'3px 10px',border:`1px solid ${u.status==='ACTIVE'?'rgba(134,239,172,0.3)':'rgba(248,246,241,0.15)'}`,color:u.status==='ACTIVE'?'#86efac':WD,fontFamily:SANS}}>{u.status}</span>
                  </td>
                  <td style={{padding:'16px 24px',fontSize:'11px',color:WD,fontFamily:SANS}}>{u.last}</td>
                  <td style={{padding:'16px 24px',fontSize:'11px',color:u.pin==='✓'?G:WD,fontFamily:SANS}}>{u.pin}</td>
                  <td style={{padding:'16px 24px',display:'flex',gap:'8px'}}>
                    <button style={{background:'transparent',border:`1px solid ${BORDER}`,color:G,padding:'5px 14px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>EDIT</button>
                    <button style={{background:'transparent',border:'1px solid rgba(239,68,68,0.3)',color:'rgba(239,68,68,0.7)',padding:'5px 14px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>REVOKE</button>
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