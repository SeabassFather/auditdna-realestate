import React, { useState } from "react";

export default function LoanMatchForm() {
  const [propVal, setPropVal] = useState("");
  const [loanAmt, setLoanAmt] = useState("");
  const [occupancy, setOccupancy] = useState("primary");

  const ltv = calcLTV(propVal, loanAmt);

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting match with LTV ${ltv}% and occupancy ${occupancy}`);
  };

  return (
    <form onSubmit={onSubmit} style={{display:"grid",gap:12,maxWidth:640}}>
      <h3>Loan Match</h3>

      <label>
        Property Value ($)
        <input value={propVal} onChange={(e)=>setPropVal(e.target.value)} type="number" step="0.01"/>
      </label>

      <label>
        Loan Amount ($)
        <input value={loanAmt} onChange={(e)=>setLoanAmt(e.target.value)} type="number" step="0.01"/>
      </label>

      <div className="badge">LTV: {ltv}%</div>

      <fieldset style={{border:"1px solid var(--border)",borderRadius:10,padding:8}}>
        <legend>Occupancy</legend>
        <label style={{marginRight:12}}>
          <input type="radio" name="occ" value="primary"
            checked={occupancy === "primary"} onChange={()=>setOccupancy("primary")} />
          {" "}Primary
        </label>
        <label style={{marginRight:12}}>
          <input type="radio" name="occ" value="secondary"
            checked={occupancy === "secondary"} onChange={()=>setOccupancy("secondary")} />
          {" "}Secondary
        </label>
        <label>
          <input type="radio" name="occ" value="investment"
            checked={occupancy === "investment"} onChange={()=>setOccupancy("investment")} />
          {" "}Investment
        </label>
      </fieldset>

      <button type="submit">Match Lenders</button>
    </form>
  );
}

function calcLTV(propVal, loanAmt) {
  const v = Number(propVal || 0);
  const l = Number(loanAmt || 0);
  if (v <= 0) return 0;
  return Math.round((l / v) * 1000) / 10; // one decimal place
}