import React, { useEffect, useState } from "react";
/** Props: endpoint (URL), label (string) */
export default function Ticker({ endpoint, label }){
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");

  useEffect(()=>{
    let timer; let abort = false;
    async function pull(){
      if(!endpoint){ setRows([]); return; }
      try{
        const r = await fetch(endpoint);
        if(!r.ok) throw new Error("HTTP "+r.status);
        const j = await r.json();
        if(!abort) setRows(Array.isArray(j)? j : [j]);
      }catch(e){ if(!abort){ setErr(String(e)); setRows([]);} }
    }
    pull(); timer = setInterval(pull, 3000);
    return ()=>{ abort = true; clearInterval(timer); };
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-title">{label} Ticker</div>
      {!endpoint && <div className="empty">backend not configured</div>}
      {!!err && <div className="subtext">error: {err}</div>}
      {rows && rows.length>0 && (
        <ul style={{margin:0,paddingLeft:16}}>{rows.slice(0,5).map((r,i)=><li key={i} className="subtext">{JSON.stringify(r)}</li>)}</ul>
      )}
    </div>
  );
}