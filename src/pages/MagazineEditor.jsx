import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── EXACT TOKENS FROM YOUR FILE ───────────────────────────────────────────────
const G='#C9A84C',W='#F8F6F1',WD='rgba(248,246,241,0.55)',GLASS='rgba(255,255,255,0.04)',BORDER='rgba(201,168,76,0.22)',BORDERF='rgba(248,246,241,0.07)';
const SERIF='"Cormorant Garamond","Didot",Georgia,serif',SANS='"Helvetica Neue",Arial,sans-serif';
const BG='linear-gradient(150deg,#06080c 0%,#0b0f18 55%,#070a0f 100%)';
const lbl={fontSize:'8px',letterSpacing:'3px',color:G,textTransform:'uppercase',fontFamily:SANS};
const hd=(s={})=>({fontFamily:SERIF,fontWeight:'300',color:W,...s});

// ── DATA ──────────────────────────────────────────────────────────────────────
const INIT_ISSUES=[
  {id:'EB-025',title:'Casa del Caracol — Ensenada\'s Crown Jewel',status:'LIVE',date:'Mar 2026',views:'4,891',author:'Saul Garcia',category:'Featured Estate',pages:'5'},
  {id:'EB-024',title:'Baja California — The New Riviera',status:'LIVE',date:'Feb 2026',views:'12,440',author:'Editorial',category:'Lifestyle',pages:'48'},
  {id:'EB-023',title:'Valle de Guadalupe: Wine Country Reborn',status:'LIVE',date:'Jan 2026',views:'9,871',author:'S. Guerrero',category:'Wine & Culture',pages:'36'},
  {id:'EB-022',title:'The Art of the Baja Investment',status:'DRAFT',date:'Mar 2026',views:'—',author:'Editorial',category:'Investment',pages:'0'},
  {id:'EB-021',title:'Luxury Living Below the Border',status:'DRAFT',date:'Apr 2026',views:'—',author:'S. Guerrero',category:'Lifestyle',pages:'0'},
  {id:'EB-020',title:'Ensenada — Port City Renaissance',status:'LIVE',date:'Dec 2025',views:'7,203',author:'A. Beltrán',category:'Culture',pages:'42'},
  {id:'EB-019',title:'Cabo: The Last Frontier',status:'LIVE',date:'Nov 2025',views:'11,090',author:'Editorial',category:'Travel',pages:'44'},
  {id:'EB-018',title:'Rosarito Rising',status:'LIVE',date:'Oct 2025',views:'6,544',author:'S. Guerrero',category:'Development',pages:'38'},
];

const INIT_APPTS=[
  {id:'APT-001',property:'Casa del Caracol — $15M',client:'James & Patricia Holbrook',agent:'Saul Garcia',date:'2026-02-24',time:'10:00',status:'CONFIRMED',type:'PRIVATE SHOWING',phone:'+13105550192'},
  {id:'APT-002',property:'Valle Vineyard Estate — $2.5M',client:'Robert Chen',agent:'A. Beltrán',date:'2026-02-25',time:'14:00',status:'CONFIRMED',type:'PRIVATE SHOWING',phone:'+14155550834'},
  {id:'APT-003',property:'Cabo Marina Penthouse — $1.8M',client:'Sofia Mendez',agent:'S. Guerrero',date:'2026-02-26',time:'11:30',status:'PENDING',type:'VIRTUAL TOUR',phone:'+526645550291'},
  {id:'APT-004',property:'San Jose Golf Estate — $3.2M',client:'William & Anne Porter',agent:'Saul Garcia',date:'2026-02-27',time:'09:00',status:'CONFIRMED',type:'PRIVATE SHOWING',phone:'+19495550477'},
  {id:'APT-005',property:'Todos Santos Villa — $890K',client:'Marcus Lee',agent:'A. Beltrán',date:'2026-02-28',time:'15:00',status:'CANCELLED',type:'OPEN HOUSE',phone:'+12135550651'},
  {id:'APT-006',property:'Casa del Caracol — $15M',client:'Eduardo Salinas',agent:'Saul Garcia',date:'2026-03-02',time:'10:00',status:'PENDING',type:'PRIVATE SHOWING',phone:'+525555550384'},
];

const ANALYTICS_MONTHS=[
  {m:'Sep 2025',v:42100},{m:'Oct 2025',v:51340},{m:'Nov 2025',v:58920},
  {m:'Dec 2025',v:63400},{m:'Jan 2026',v:71880},{m:'Feb 2026',v:89204},
];

const TOP_ARTICLES=[
  {title:'Baja California — The New Riviera',views:'12,440',time:'8m 32s',leads:34},
  {title:'Cabo: The Last Frontier',views:'11,090',time:'7m 15s',leads:29},
  {title:'Valle de Guadalupe: Wine Country Reborn',views:'9,871',time:'9m 04s',leads:41},
  {title:'Ensenada — Port City Renaissance',views:'7,203',time:'6m 48s',leads:22},
  {title:'Rosarito Rising',views:'6,544',time:'5m 30s',leads:17},
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const inp={background:'rgba(255,255,255,0.05)',border:`1px solid ${BORDER}`,color:W,padding:'10px 14px',fontSize:'12px',fontFamily:SANS,width:'100%',boxSizing:'border-box',outline:'none'};

const GoldBtn=({children,onClick,style={}})=>(
  <button onClick={onClick} style={{background:G,border:'none',color:'#000',padding:'11px 32px',fontSize:'8px',letterSpacing:'3px',fontFamily:SANS,fontWeight:'700',cursor:'pointer',textTransform:'uppercase',...style}}>{children}</button>
);
const GhostBtn=({children,onClick,style={}})=>(
  <button onClick={onClick} style={{background:'transparent',border:`1px solid ${BORDER}`,color:G,padding:'7px 18px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase',...style}}>{children}</button>
);
const DangerBtn=({children,onClick})=>(
  <button onClick={onClick} style={{background:'transparent',border:'1px solid rgba(248,100,100,0.25)',color:'rgba(248,100,100,0.7)',padding:'7px 12px',fontSize:'8px',letterSpacing:'1px',fontFamily:SANS,cursor:'pointer'}}>{children}</button>
);

function Toast({msg}){
  if(!msg) return null;
  return <div style={{position:'fixed',top:'24px',right:'24px',zIndex:9999,background:G,color:'#000',padding:'12px 28px',fontSize:'9px',letterSpacing:'3px',fontFamily:SANS,fontWeight:'700'}}>{msg}</div>;
}

function Bar({pct,alpha=0.65}){
  return(
    <div style={{background:'rgba(255,255,255,0.07)',height:'5px',width:'100%',marginTop:'4px'}}>
      <div style={{background:`rgba(201,168,76,${alpha})`,height:'100%',width:`${Math.min(pct,100)}%`,transition:'width 0.4s'}}/>
    </div>
  );
}

// ── ISSUE MODAL ───────────────────────────────────────────────────────────────
function IssueModal({issue,onSave,onClose}){
  const blank={id:'',title:'',author:'',status:'DRAFT',date:'',category:'Lifestyle',pages:'0'};
  const [f,setF]=useState(issue||blank);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.88)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{background:'#0b0f18',border:`1px solid ${BORDER}`,width:'100%',maxWidth:'540px',padding:'40px'}}>
        <div style={{...lbl,marginBottom:'6px'}}>{issue?'Edit Issue':'New Issue'}</div>
        <div style={hd({fontSize:'22px',marginBottom:'28px'})}>{issue?issue.title:'Create New Issue'}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
          <div><div style={{...lbl,marginBottom:'5px'}}>Issue ID</div><input style={inp} value={f.id} onChange={e=>set('id',e.target.value)} placeholder="EB-025"/></div>
          <div><div style={{...lbl,marginBottom:'5px'}}>Status</div>
            <select style={{...inp,cursor:'pointer'}} value={f.status} onChange={e=>set('status',e.target.value)}>
              {['DRAFT','LIVE','ARCHIVED'].map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div style={{marginBottom:'14px'}}><div style={{...lbl,marginBottom:'5px'}}>Title</div><input style={inp} value={f.title} onChange={e=>set('title',e.target.value)} placeholder="Issue title..."/></div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px',marginBottom:'14px'}}>
          <div><div style={{...lbl,marginBottom:'5px'}}>Author</div><input style={inp} value={f.author} onChange={e=>set('author',e.target.value)}/></div>
          <div><div style={{...lbl,marginBottom:'5px'}}>Publish Date</div><input style={inp} value={f.date} onChange={e=>set('date',e.target.value)} placeholder="Mar 2026"/></div>
          <div><div style={{...lbl,marginBottom:'5px'}}>Pages</div><input style={inp} type="number" value={f.pages} onChange={e=>set('pages',e.target.value)}/></div>
        </div>
        <div style={{marginBottom:'28px'}}><div style={{...lbl,marginBottom:'5px'}}>Category</div>
          <select style={{...inp,cursor:'pointer'}} value={f.category} onChange={e=>set('category',e.target.value)}>
            {['Lifestyle','Wine & Culture','Investment','Culture','Travel','Development','Design','Real Estate'].map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <GhostBtn onClick={onClose} style={{color:WD,borderColor:'rgba(248,246,241,0.15)'}}>CANCEL</GhostBtn>
          <GoldBtn onClick={()=>onSave(f)}>SAVE ISSUE</GoldBtn>
        </div>
      </div>
    </div>
  );
}

// ── APPOINTMENT MODAL ─────────────────────────────────────────────────────────
function ApptModal({appt,onSave,onClose}){
  const blank={id:'',property:'',client:'',agent:'Saul Garcia',date:'',time:'',status:'PENDING',type:'PRIVATE SHOWING',phone:''};
  const [f,setF]=useState(appt||blank);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.88)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{background:'#0b0f18',border:`1px solid ${BORDER}`,width:'100%',maxWidth:'540px',padding:'40px'}}>
        <div style={{...lbl,marginBottom:'6px'}}>{appt?'Edit Appointment':'New Appointment'}</div>
        <div style={hd({fontSize:'22px',marginBottom:'28px'})}>{appt?appt.property:'Schedule Viewing'}</div>
        <div style={{marginBottom:'14px'}}><div style={{...lbl,marginBottom:'5px'}}>Property</div><input style={inp} value={f.property} onChange={e=>set('property',e.target.value)} placeholder="Property name & price"/></div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
          <div><div style={{...lbl,marginBottom:'5px'}}>Client Name</div><input style={inp} value={f.client} onChange={e=>set('client',e.target.value)} placeholder="Full name"/></div>
          <div><div style={{...lbl,marginBottom:'5px'}}>Client Phone</div><input style={inp} value={f.phone} onChange={e=>set('phone',e.target.value)} placeholder="+1 XXX XXX XXXX"/></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px',marginBottom:'14px'}}>
          <div><div style={{...lbl,marginBottom:'5px'}}>Date</div><input style={inp} type="date" value={f.date} onChange={e=>set('date',e.target.value)}/></div>
          <div><div style={{...lbl,marginBottom:'5px'}}>Time</div><input style={inp} type="time" value={f.time} onChange={e=>set('time',e.target.value)}/></div>
          <div><div style={{...lbl,marginBottom:'5px'}}>Agent</div>
            <select style={{...inp,cursor:'pointer'}} value={f.agent} onChange={e=>set('agent',e.target.value)}>
              {['Saul Garcia','A. Beltrán','S. Guerrero'].map(a=><option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'28px'}}>
          <div><div style={{...lbl,marginBottom:'5px'}}>Type</div>
            <select style={{...inp,cursor:'pointer'}} value={f.type} onChange={e=>set('type',e.target.value)}>
              {['PRIVATE SHOWING','VIRTUAL TOUR','OPEN HOUSE','INSPECTION'].map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div><div style={{...lbl,marginBottom:'5px'}}>Status</div>
            <select style={{...inp,cursor:'pointer'}} value={f.status} onChange={e=>set('status',e.target.value)}>
              {['PENDING','CONFIRMED','CANCELLED'].map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <GhostBtn onClick={onClose} style={{color:WD,borderColor:'rgba(248,246,241,0.15)'}}>CANCEL</GhostBtn>
          <GoldBtn onClick={()=>onSave(f)}>SAVE APPOINTMENT</GoldBtn>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function MagazineEditor(){
  const nav=useNavigate();
  const [tab,setTab]=useState('issues');
  const [hov,setHov]=useState(null);
  const [hovA,setHovA]=useState(null);
  const [issues,setIssues]=useState(INIT_ISSUES);
  const [appts,setAppts]=useState(INIT_APPTS);
  const [modal,setModal]=useState(null);
  const [filter,setFilter]=useState('ALL');
  const [toast,setToast]=useState(null);

  const ping=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),2600);};

  const saveIssue=(f)=>{modal.data?setIssues(p=>p.map(i=>i.id===modal.data.id?f:i)):setIssues(p=>[f,...p]);ping(modal.data?'Issue updated.':'Issue created.');setModal(null);};
  const delIssue=(id)=>{if(window.confirm('Delete this issue?')){setIssues(p=>p.filter(i=>i.id!==id));ping('Issue deleted.');}};

  const saveAppt=(f)=>{
    const rec={...f,id:f.id||('APT-'+String(appts.length+1).padStart(3,'0'))};
    modal.data?setAppts(p=>p.map(a=>a.id===modal.data.id?rec:a)):setAppts(p=>[rec,...p]);
    ping(modal.data?'Appointment updated.':'Appointment scheduled.');setModal(null);
  };
  const delAppt=(id)=>{if(window.confirm('Remove appointment?')){setAppts(p=>p.filter(a=>a.id!==id));ping('Appointment removed.');}};
  const sendWA=(a)=>{
    const t=encodeURIComponent(`EnjoyBaja — Appointment Confirmation\n\nProperty: ${a.property}\nDate: ${a.date} at ${a.time}\nType: ${a.type}\nAgent: ${a.agent}\n\nPlease confirm attendance.`);
    window.open(`https://wa.me/${a.phone.replace(/\D/g,'')}?text=${t}`,'_blank');
  };

  const liveN=issues.filter(i=>i.status==='LIVE').length;
  const draftN=issues.filter(i=>i.status==='DRAFT').length;
  const totalV=issues.reduce((s,i)=>s+(parseInt((i.views||'0').replace(/,/g,''))||0),0);
  const confirmedN=appts.filter(a=>a.status==='CONFIRMED').length;
  const filtAppts=filter==='ALL'?appts:appts.filter(a=>a.status===filter);
  const maxV=Math.max(...ANALYTICS_MONTHS.map(a=>a.v));
  const maxL=Math.max(...TOP_ARTICLES.map(a=>a.leads));

  return(
    <div style={{minHeight:'100vh',background:BG,color:W,fontFamily:SANS}}>

      <Toast msg={toast}/>
      {modal?.mode==='issue'&&<IssueModal issue={modal.data} onSave={saveIssue} onClose={()=>setModal(null)}/>}
      {modal?.mode==='appt' &&<ApptModal  appt={modal.data}  onSave={saveAppt}  onClose={()=>setModal(null)}/>}

      {/* ── HEADER — your exact markup ── */}
      <div style={{borderBottom:`1px solid ${BORDER}`,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(28px)',position:'sticky',top:0,zIndex:100}}>
        <div>
          <div style={{...lbl,marginBottom:'6px'}}>AuditDNA Platform — Admin</div>
          <div style={hd({fontSize:'26px',letterSpacing:'1px'})}>Magazine Editor</div>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          {tab==='issues'  &&<GoldBtn onClick={()=>setModal({mode:'issue',data:null})}>+ NEW ISSUE</GoldBtn>}
          {tab==='schedule'&&<GoldBtn onClick={()=>setModal({mode:'appt', data:null})}>+ NEW APPOINTMENT</GoldBtn>}
          <button onClick={()=>nav('/admin')} style={{background:'transparent',border:`1px solid ${BORDER}`,color:WD,padding:'11px 24px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer',textTransform:'uppercase'}}>← BACK</button>
        </div>
      </div>

      <div style={{padding:'40px 48px'}}>

        {/* ── KPI STRIP — your exact markup + 5th tile ── */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`,marginBottom:'40px'}}>
          {[
            {l:'TOTAL ISSUES',   v:issues.length},
            {l:'LIVE',           v:liveN},
            {l:'DRAFTS',         v:draftN},
            {l:'TOTAL VIEWS',    v:totalV.toLocaleString()},
            {l:'CONFIRMED APPTS',v:confirmedN},
          ].map((s,i)=>(
            <div key={i} style={{background:GLASS,backdropFilter:'blur(16px)',padding:'28px 32px'}}>
              <div style={{...lbl,marginBottom:'10px'}}>{s.l}</div>
              <div style={hd({fontSize:'38px'})}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* ── TABS — your exact markup ── */}
        <div style={{display:'flex',borderBottom:`1px solid ${BORDER}`}}>
          {['ISSUES','SCHEDULE','ANALYTICS'].map(t=>(
            <button key={t} onClick={()=>setTab(t.toLowerCase())} style={{background:'transparent',border:'none',borderBottom:tab===t.toLowerCase()?`2px solid ${G}`:'2px solid transparent',color:tab===t.toLowerCase()?G:WD,padding:'12px 28px',fontSize:'9px',letterSpacing:'3px',fontFamily:SANS,cursor:'pointer',marginBottom:'-1px'}}>{t}</button>
          ))}
        </div>

        {/* ════════ TAB: ISSUES ════════ */}
        {tab==='issues'&&(
          <div style={{border:`1px solid ${BORDER}`,borderTop:'none',background:GLASS,backdropFilter:'blur(16px)'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'rgba(0,0,0,0.45)'}}>
                  {['ISSUE','TITLE','CATEGORY','AUTHOR','STATUS','PUBLISH','VIEWS','PAGES',''].map((h,i)=>(
                    <th key={i} style={{...lbl,padding:'16px 20px',textAlign:'left',borderBottom:`1px solid ${BORDER}`,fontWeight:'400'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {issues.map((row,i)=>(
                  <tr key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{background:hov===i?'rgba(201,168,76,0.04)':'transparent',transition:'background 0.15s',borderBottom:`1px solid ${BORDERF}`}}>
                    <td style={{padding:'18px 20px',fontSize:'10px',color:G,fontFamily:SANS,letterSpacing:'1px'}}>{row.id}</td>
                    <td style={{padding:'18px 20px',fontSize:'14px',fontFamily:SERIF,fontWeight:'300',color:W}}>{row.title}</td>
                    <td style={{padding:'18px 20px',fontSize:'10px',color:WD,fontFamily:SANS,letterSpacing:'1px'}}>{row.category}</td>
                    <td style={{padding:'18px 20px',fontSize:'11px',color:WD,fontFamily:SANS}}>{row.author}</td>
                    <td style={{padding:'18px 20px'}}>
                      <span style={{fontSize:'8px',letterSpacing:'2px',padding:'4px 12px',border:`1px solid ${row.status==='LIVE'?'rgba(134,239,172,0.35)':BORDER}`,color:row.status==='LIVE'?'#86efac':WD,fontFamily:SANS}}>{row.status}</span>
                    </td>
                    <td style={{padding:'18px 20px',fontSize:'11px',color:WD,fontFamily:SANS}}>{row.date}</td>
                    <td style={{padding:'18px 20px',fontSize:'11px',color:WD,fontFamily:SANS}}>{row.views}</td>
                    <td style={{padding:'18px 20px',fontSize:'11px',color:WD,fontFamily:SANS}}>{row.pages||'—'}</td>
                    <td style={{padding:'18px 20px'}}>
                      <div style={{display:'flex',gap:'6px'}}>
                        <GhostBtn onClick={()=>setModal({mode:'issue',data:row})}>EDIT</GhostBtn>
                        <DangerBtn onClick={()=>delIssue(row.id)}>✕</DangerBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ════════ TAB: SCHEDULE ════════ */}
        {tab==='schedule'&&(
          <div style={{paddingTop:'28px'}}>
            <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'24px'}}>
              <div style={{...lbl,marginRight:'8px'}}>FILTER:</div>
              {['ALL','CONFIRMED','PENDING','CANCELLED'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'rgba(201,168,76,0.1)':'transparent',border:`1px solid ${filter===f?G:BORDER}`,color:filter===f?G:WD,padding:'7px 18px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>{f}</button>
              ))}
              <div style={{marginLeft:'auto',fontSize:'10px',color:WD,fontFamily:SANS,letterSpacing:'1px'}}>{filtAppts.length} APPOINTMENT{filtAppts.length!==1?'S':''}</div>
            </div>

            <div style={{display:'grid',gap:'10px'}}>
              {filtAppts.map((a,i)=>{
                const sc=a.status==='CONFIRMED'?'rgba(134,239,172,0.35)':a.status==='CANCELLED'?'rgba(248,100,100,0.25)':BORDER;
                const tx=a.status==='CONFIRMED'?'#86efac':a.status==='CANCELLED'?'rgba(248,120,120,0.9)':WD;
                return(
                  <div key={i} onMouseEnter={()=>setHovA(i)} onMouseLeave={()=>setHovA(null)}
                    style={{background:hovA===i?'rgba(201,168,76,0.04)':GLASS,border:`1px solid ${BORDER}`,backdropFilter:'blur(16px)',
                      padding:'22px 28px',display:'grid',gridTemplateColumns:'2fr 1fr 1fr auto',gap:'24px',alignItems:'center',transition:'background 0.15s'}}>
                    <div>
                      <div style={{...lbl,color:G,marginBottom:'5px'}}>{a.id} · {a.type}</div>
                      <div style={hd({fontSize:'15px',marginBottom:'3px'})}>{a.property}</div>
                      <div style={{fontSize:'12px',color:WD,fontFamily:SANS}}>{a.client}</div>
                      <div style={{fontSize:'11px',color:'rgba(248,246,241,0.3)',fontFamily:SANS,marginTop:'2px'}}>{a.phone}</div>
                    </div>
                    <div>
                      <div style={{...lbl,marginBottom:'7px'}}>DATE & TIME</div>
                      <div style={hd({fontSize:'16px',marginBottom:'1px'})}>{new Date(a.date+'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</div>
                      <div style={{fontSize:'12px',color:G,fontFamily:SANS,letterSpacing:'1px'}}>{a.time}</div>
                      <div style={{fontSize:'11px',color:WD,fontFamily:SANS,marginTop:'5px'}}>Agent: {a.agent}</div>
                    </div>
                    <div>
                      <div style={{...lbl,marginBottom:'7px'}}>STATUS</div>
                      <span style={{fontSize:'8px',letterSpacing:'2px',padding:'5px 12px',border:`1px solid ${sc}`,color:tx,fontFamily:SANS}}>{a.status}</span>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                      <GhostBtn onClick={()=>setModal({mode:'appt',data:a})}>EDIT</GhostBtn>
                      {a.status!=='CANCELLED'&&(
                        <button onClick={()=>sendWA(a)} style={{background:'rgba(134,239,172,0.07)',border:'1px solid rgba(134,239,172,0.28)',color:'#86efac',padding:'7px 14px',fontSize:'8px',letterSpacing:'2px',fontFamily:SANS,cursor:'pointer'}}>WHATSAPP</button>
                      )}
                      <DangerBtn onClick={()=>delAppt(a.id)}>REMOVE</DangerBtn>
                    </div>
                  </div>
                );
              })}
              {filtAppts.length===0&&(
                <div style={{padding:'48px',textAlign:'center',color:WD,fontSize:'11px',fontFamily:SANS,letterSpacing:'3px',border:`1px solid ${BORDER}`}}>NO APPOINTMENTS FOUND</div>
              )}
            </div>
          </div>
        )}

        {/* ════════ TAB: ANALYTICS ════════ */}
        {tab==='analytics'&&(
          <div style={{paddingTop:'28px'}}>

            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:BORDER,border:`1px solid ${BORDER}`,marginBottom:'32px'}}>
              {[{l:'VIEWS THIS MONTH',v:'89,204',d:'+24%'},{l:'LEADS GENERATED',v:'203',d:'+18%'},{l:'CONVERSIONS',v:'12',d:'+33%'}].map((s,i)=>(
                <div key={i} style={{background:GLASS,backdropFilter:'blur(16px)',padding:'28px 32px'}}>
                  <div style={{...lbl,marginBottom:'10px'}}>{s.l}</div>
                  <div style={{display:'flex',alignItems:'baseline',gap:'14px'}}>
                    <div style={hd({fontSize:'38px'})}>{s.v}</div>
                    <div style={{fontSize:'11px',color:'#86efac',fontFamily:SANS,letterSpacing:'1px'}}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{border:`1px solid ${BORDER}`,background:GLASS,backdropFilter:'blur(16px)',padding:'28px 32px',marginBottom:'28px'}}>
              <div style={{...lbl,marginBottom:'24px'}}>MONTHLY VIEWS — 6 MONTH TREND</div>
              <div style={{display:'flex',gap:'10px',alignItems:'flex-end',height:'110px'}}>
                {ANALYTICS_MONTHS.map((a,i)=>{
                  const pct=(a.v/maxV)*100;
                  const cur=i===ANALYTICS_MONTHS.length-1;
                  return(
                    <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',height:'100%',justifyContent:'flex-end'}}>
                      <div style={{fontSize:'9px',color:cur?G:WD,fontFamily:SANS}}>{(a.v/1000).toFixed(0)}k</div>
                      <div style={{width:'100%',background:cur?G:'rgba(201,168,76,0.32)',height:`${pct}%`}}/>
                      <div style={{fontSize:'8px',color:WD,fontFamily:SANS,letterSpacing:'1px'}}>{a.m.split(' ')[0]}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{border:`1px solid ${BORDER}`,background:GLASS,backdropFilter:'blur(16px)',marginBottom:'28px'}}>
              <div style={{...lbl,padding:'18px 24px',borderBottom:`1px solid ${BORDER}`}}>TOP PERFORMING ARTICLES</div>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'rgba(0,0,0,0.3)'}}>
                    {['#','ARTICLE','VIEWS','AVG TIME','LEADS',''].map((h,i)=>(
                      <th key={i} style={{...lbl,padding:'12px 20px',textAlign:'left',borderBottom:`1px solid ${BORDER}`,fontWeight:'400'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOP_ARTICLES.map((a,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${BORDERF}`}}>
                      <td style={{padding:'15px 20px',fontSize:'11px',color:G,fontFamily:SANS}}>0{i+1}</td>
                      <td style={{padding:'15px 20px',fontSize:'13px',fontFamily:SERIF,fontWeight:'300',color:W}}>{a.title}</td>
                      <td style={{padding:'15px 20px',fontSize:'12px',color:W,fontFamily:SANS}}>{a.views}</td>
                      <td style={{padding:'15px 20px',fontSize:'12px',color:WD,fontFamily:SANS}}>{a.time}</td>
                      <td style={{padding:'15px 20px',fontSize:'12px',color:G,fontFamily:SANS,fontWeight:'700'}}>{a.leads}</td>
                      <td style={{padding:'15px 20px',width:'140px'}}><Bar pct={(a.leads/maxL)*100}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}}>
              <div style={{border:`1px solid ${BORDER}`,background:GLASS,backdropFilter:'blur(16px)',padding:'28px'}}>
                <div style={{...lbl,marginBottom:'20px'}}>LEAD FUNNEL — FEB 2026</div>
                {[{l:'PAGE VIEWS',v:'89,204',pct:100},{l:'ENGAGED (3m+)',v:'31,220',pct:35},{l:'INQUIRY CLICKS',v:'8,128',pct:9},{l:'FORM FILLS',v:'4,460',pct:5},{l:'CONVERSIONS',v:'1,070',pct:1.2}].map((r,i)=>(
                  <div key={i} style={{marginBottom:'14px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                      <div style={{fontSize:'10px',color:WD,fontFamily:SANS,letterSpacing:'1px'}}>{r.l}</div>
                      <div style={{fontSize:'10px',color:G,fontFamily:SANS}}>{r.v} <span style={{color:WD}}>({r.pct}%)</span></div>
                    </div>
                    <Bar pct={r.pct===100?100:r.pct*7} alpha={i===0?0.8:i===4?1:0.45}/>
                  </div>
                ))}
              </div>
              <div style={{border:`1px solid ${BORDER}`,background:GLASS,backdropFilter:'blur(16px)',padding:'28px'}}>
                <div style={{...lbl,marginBottom:'20px'}}>TRAFFIC SOURCES</div>
                {[{l:'ORGANIC SEARCH',pct:38},{l:'DIRECT',pct:27},{l:'SOCIAL MEDIA',pct:18},{l:'EMAIL CAMPAIGNS',pct:12},{l:'REFERRAL',pct:5}].map((r,i)=>(
                  <div key={i} style={{marginBottom:'14px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                      <div style={{fontSize:'10px',color:WD,fontFamily:SANS,letterSpacing:'1px'}}>{r.l}</div>
                      <div style={{fontSize:'10px',color:G,fontFamily:SANS}}>{r.pct}%</div>
                    </div>
                    <Bar pct={r.pct} alpha={0.3+r.pct*0.014}/>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}