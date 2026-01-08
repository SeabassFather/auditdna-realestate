import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ================================================================
// USA LENDERS DATABASE (8 ANONYMOUS LENDERS - NEVER SHOW NAMES)
// Real FICO requirements, base rates, fees
// ================================================================
const USA_LENDERS = [
  {id:1,name:'Lender A',conv:620,fha:550,va:550,usda:620,jumbo:true,baseRate:6.875,fee:995},
  {id:2,name:'Lender B',conv:620,fha:600,va:600,usda:620,jumbo:true,baseRate:6.750,fee:995},
  {id:3,name:'Lender C',conv:620,fha:580,va:580,usda:580,jumbo:false,baseRate:6.625,fee:0},
  {id:4,name:'Lender D',conv:620,fha:600,va:600,usda:620,jumbo:true,baseRate:6.500,fee:915},
  {id:5,name:'Lender E',conv:620,fha:620,va:620,usda:0,jumbo:false,baseRate:6.990,fee:895},
  {id:6,name:'Lender F',conv:620,fha:580,va:620,usda:620,jumbo:false,baseRate:7.125,fee:965},
  {id:7,name:'Lender G',conv:620,fha:580,va:580,usda:580,jumbo:true,baseRate:6.800,fee:0},
  {id:8,name:'Lender H',conv:620,fha:580,va:580,usda:580,jumbo:true,baseRate:6.650,fee:1095}
];

function USAMortgage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [tab, setTab] = useState('overview');
  
  // USA PURCHASE STATE
  const [purchaseForm, setPurchaseForm] = useState({
    loanType:'conventional',propertyValue:'',downPayment:'',loanAmount:'',creditScore:'',propertyType:'sfr',occupancy:'primary'
  });
  const [purchaseResults, setPurchaseResults] = useState([]);
  
  // USA REFINANCE STATE
  const [refinanceForm, setRefinanceForm] = useState({
    loanType:'conventional',propertyValue:'',currentBalance:'',cashOut:'0',creditScore:'',propertyType:'sfr',occupancy:'primary'
  });
  const [refinanceResults, setRefinanceResults] = useState([]);
  
  // MEXICO PURCHASE STATE (MOXXI - NEVER DISCLOSED)
  const [mexicoForm, setMexicoForm] = useState({
    name:'',email:'',phone:'',citizenship:'us',propertyValue:'',downPayment:'',loanAmount:'',propertyLocation:'',propertyType:'',creditScore:''
  });
  const [mexicoSubmitted, setMexicoSubmitted] = useState(false);
  
  // FSBO (For Sale By Owner) STATE
  const [fsboTab, setFsboTab] = useState('browse');
  const [fsboProperties, setFsboProperties] = useState([]);
  const [fsboForm, setFsboForm] = useState({
    title:'',address:'',city:'',state:'',zip:'',price:'',beds:'',baths:'',sqft:'',yearBuilt:'',
    propertyType:'sfr',description:'',photos:[],sellerName:'',sellerPhone:'',sellerEmail:''
  });
  
  // ================================================================
  // USA PURCHASE - LENDER SEARCH
  // ================================================================
  const searchPurchaseLenders = () => {
    const propValue = parseFloat(purchaseForm.propertyValue);
    const downPmt = parseFloat(purchaseForm.downPayment);
    const loanAmt = parseFloat(purchaseForm.loanAmount);
    const fico = parseInt(purchaseForm.creditScore);
    
    if(!propValue || !loanAmt || !fico) {
      alert('Please fill all required fields');
      return;
    }
    
    const ltv = (loanAmt/propValue)*100;
    const isJumbo = loanAmt > 766550;
    
    const qualified = USA_LENDERS.filter(lender => {
      if(isJumbo && !lender.jumbo) return false;
      
      let minFico = 0;
      switch(purchaseForm.loanType) {
        case 'conventional': minFico = lender.conv; break;
        case 'fha': minFico = lender.fha; break;
        case 'va': minFico = lender.va; break;
        case 'usda': minFico = lender.usda; break;
        default: minFico = lender.conv;
      }
      
      if(minFico === 0) return false;
      return fico >= minFico;
    });
    
    const results = qualified.map(lender => {
      let rate = lender.baseRate;
      
      // FICO adjustments
      if(fico < 700) rate += 0.25;
      else if(fico < 740) rate += 0.125;
      
      // Jumbo adjustment
      if(isJumbo) rate += 0.25;
      
      // LTV adjustment
      if(ltv > 80) rate += 0.125;
      if(ltv > 90) rate += 0.25;
      
      // Investment property adjustment
      if(purchaseForm.occupancy === 'investment') rate += 0.5;
      else if(purchaseForm.occupancy === 'second') rate += 0.375;
      
      const monthlyRate = rate / 100 / 12;
      const numPayments = 360;
      const payment = loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      return {
        id:lender.id,
        name:lender.name,
        rate:rate.toFixed(3),
        apr:(rate + 0.125).toFixed(3),
        payment:Math.round(payment),
        fee:lender.fee,
        loanType:purchaseForm.loanType.toUpperCase(),
        ltv:ltv.toFixed(1)
      };
    }).sort((a,b)=>parseFloat(a.rate)-parseFloat(b.rate));
    
    setPurchaseResults(results);
  };
  
  // ================================================================
  // USA REFINANCE - LENDER SEARCH
  // ================================================================
  const searchRefinanceLenders = () => {
    const propValue = parseFloat(refinanceForm.propertyValue);
    const currentBal = parseFloat(refinanceForm.currentBalance);
    const cashOut = parseFloat(refinanceForm.cashOut);
    const fico = parseInt(refinanceForm.creditScore);
    
    if(!propValue || !currentBal || !fico) {
      alert('Please fill all required fields');
      return;
    }
    
    const newLoanAmount = currentBal + cashOut;
    const ltv = (newLoanAmount/propValue)*100;
    const isCashOut = cashOut > 0;
    const isJumbo = newLoanAmount > 766550;
    
    const qualified = USA_LENDERS.filter(lender => {
      if(isJumbo && !lender.jumbo) return false;
      
      let minFico = 0;
      switch(refinanceForm.loanType) {
        case 'conventional': minFico = lender.conv; break;
        case 'fha': minFico = lender.fha; break;
        case 'va': minFico = lender.va; break;
        default: minFico = lender.conv;
      }
      
      if(minFico === 0) return false;
      return fico >= minFico;
    });
    
    const results = qualified.map(lender => {
      let rate = lender.baseRate;
      
      // FICO adjustments
      if(fico < 700) rate += 0.25;
      else if(fico < 740) rate += 0.125;
      
      // Cash-out adjustment
      if(isCashOut) rate += 0.375;
      
      // Jumbo adjustment
      if(isJumbo) rate += 0.25;
      
      // LTV adjustment
      if(ltv > 80) rate += 0.125;
      
      // Investment property adjustment
      if(refinanceForm.occupancy === 'investment') rate += 0.5;
      else if(refinanceForm.occupancy === 'second') rate += 0.375;
      
      const monthlyRate = rate / 100 / 12;
      const numPayments = 360;
      const payment = newLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      return {
        id:lender.id,
        name:lender.name,
        rate:rate.toFixed(3),
        apr:(rate + 0.125).toFixed(3),
        payment:Math.round(payment),
        fee:lender.fee,
        loanType:refinanceForm.loanType.toUpperCase(),
        ltv:ltv.toFixed(1),
        newLoanAmount:newLoanAmount,
        cashOut:cashOut
      };
    }).sort((a,b)=>parseFloat(a.rate)-parseFloat(b.rate));
    
    setRefinanceResults(results);
  };
  
  // ================================================================
  // MEXICO PURCHASE - APPLICATION (MOXXI - NEVER DISCLOSED)
  // ================================================================
  const submitMexicoLoan = () => {
    const loanAmt = parseFloat(mexicoForm.loanAmount);
    const downPct = parseFloat(mexicoForm.downPayment);
    
    if(mexicoForm.citizenship !== 'us') {
      alert('Currently only available for US Citizens');
      return;
    }
    if(!mexicoForm.name || !mexicoForm.email || !mexicoForm.phone) {
      alert('Please fill all required fields');
      return;
    }
    if(loanAmt < 385000) {
      alert('Minimum loan amount: $385,000 USD');
      return;
    }
    if(downPct < 35 || downPct > 45) {
      alert('Down payment must be 35-45%');
      return;
    }
    
    const phone = '526463402686';
    const message = encodeURIComponent(`Mexico Financing Inquiry
Name: ${mexicoForm.name}
Email: ${mexicoForm.email}
Phone: ${mexicoForm.phone}
Property Value: $${parseFloat(mexicoForm.propertyValue).toLocaleString()}
Down Payment: ${downPct}%
Loan Amount: $${loanAmt.toLocaleString()}
Location: ${mexicoForm.propertyLocation}
Type: ${mexicoForm.propertyType}
FICO: ${mexicoForm.creditScore}`);
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    setMexicoSubmitted(true);
  };
  
  // ================================================================
  // FSBO - PHOTO UPLOAD
  // ================================================================
  const handleFsboPhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if(fsboForm.photos.length + files.length > 10) {
      alert('Maximum 10 photos allowed');
      return;
    }
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setFsboForm({...fsboForm, photos:[...fsboForm.photos,...newPhotos]});
  };
  
  const removeFsboPhoto = (idx) => {
    const newPhotos = fsboForm.photos.filter((_,i)=>i!==idx);
    setFsboForm({...fsboForm,photos:newPhotos});
  };
  
  const submitFsbo = () => {
    if(!fsboForm.title || !fsboForm.price || !fsboForm.address || fsboForm.photos.length===0) {
      alert('Please fill required fields and add photos');
      return;
    }
    
    const newProperty = {
      id:Date.now(),
      title:fsboForm.title,
      address:fsboForm.address,
      city:fsboForm.city,
      state:fsboForm.state,
      zip:fsboForm.zip,
      price:parseInt(fsboForm.price),
      beds:parseInt(fsboForm.beds)||0,
      baths:parseInt(fsboForm.baths)||0,
      sqft:parseInt(fsboForm.sqft)||0,
      yearBuilt:fsboForm.yearBuilt,
      propertyType:fsboForm.propertyType,
      description:fsboForm.description,
      photos:fsboForm.photos,
      sellerName:fsboForm.sellerName,
      sellerPhone:fsboForm.sellerPhone,
      sellerEmail:fsboForm.sellerEmail,
      status:'Active',
      views:0
    };
    
    setFsboProperties([...fsboProperties,newProperty]);
    alert('Property listed successfully!');
    setFsboForm({title:'',address:'',city:'',state:'',zip:'',price:'',beds:'',baths:'',sqft:'',yearBuilt:'',propertyType:'sfr',description:'',photos:[],sellerName:'',sellerPhone:'',sellerEmail:''});
    setFsboTab('browse');
  };

  return (
    <div style={s.container}>
      {/* HEADER */}
      <div style={s.header}>
        <div style={s.headerContent}>
          <div>
            <h1 style={s.title}>USA Mortgage Loans</h1>
            <p style={s.subtitle}>Private loan search engine for USA properties and Mexico financing</p>
          </div>
          <div style={s.actions}>
            <button onClick={()=>setLang(lang==='en'?'es':'en')} style={s.langBtn}>{lang==='en'?'ðŸ‡²ðŸ‡½ ES':'ðŸ‡ºðŸ‡¸ EN'}</button>
            <button onClick={()=>navigate('/')} style={s.homeBtn}>â† Home</button>
          </div>
        </div>
      </div>

      {/* MAIN TABS */}
      <div style={s.tabs}>
        <button onClick={()=>setTab('overview')} style={tab==='overview'?{...s.tab,...s.tabActive}:s.tab}>Overview</button>
        <button onClick={()=>setTab('purchase')} style={tab==='purchase'?{...s.tab,...s.tabActive}:s.tab}>USA Purchase Search</button>
        <button onClick={()=>setTab('purchaseinfo')} style={tab==='purchaseinfo'?{...s.tab,...s.tabActive}:s.tab}>Purchase Process</button>
        <button onClick={()=>setTab('refinance')} style={tab==='refinance'?{...s.tab,...s.tabActive}:s.tab}>USA Refinance Search</button>
        <button onClick={()=>setTab('refinanceinfo')} style={tab==='refinanceinfo'?{...s.tab,...s.tabActive}:s.tab}>Refinance Options</button>
        <button onClick={()=>setTab('mexico')} style={tab==='mexico'?{...s.tab,...s.tabActive}:s.tab}>Mexico Application</button>
        <button onClick={()=>setTab('mexproperties')} style={tab==='mexproperties'?{...s.tab,...s.tabActive}:s.tab}>Mexico Properties</button>
        <button onClick={()=>setTab('title')} style={tab==='title'?{...s.tab,...s.tabActive}:s.tab}>Title/Escrow</button>
        <button onClick={()=>setTab('urla')} style={tab==='urla'?{...s.tab,...s.tabActive}:s.tab}>1003 URLA</button>
        <button onClick={()=>setTab('fsbo')} style={tab==='fsbo'?{...s.tab,...s.tabActive}:s.tab}>For Sale By Owner</button>
      </div>

      <div style={s.content}>
        {/* OVERVIEW TAB */}
        {tab==='overview' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ“Š USA Mortgage Overview</h2>
            <p style={s.sectionSubtitle}>Loan products and qualification requirements</p>
            
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'24px',marginBottom:'60px'}}>
              {[
                { title: 'Conventional', rate: '6.5% - 7.5%', down: '3% - 20%', features: ['Best rates for qualified buyers', '620+ credit score', 'Lower PMI costs'] },
                { title: 'FHA', rate: '6.0% - 7.0%', down: '3.5%', features: ['Lower credit requirements', '580+ credit score', 'Higher debt-to-income ratio'] },
                { title: 'VA', rate: '6.0% - 7.0%', down: '0%', features: ['No down payment', 'No PMI required', 'Military service required'] }
              ].map((loan, idx) => (
                <div key={idx} style={{...s.formBox,background:'rgba(255,255,255,0.95)'}}>
                  <h4 style={{fontSize:'24px',fontWeight:'700',color:'#1a1a1a',marginBottom:'20px'}}>{loan.title}</h4>
                  <div style={{fontSize:'15px',color:'#666',marginBottom:'8px'}}><strong>Rate:</strong> {loan.rate}</div>
                  <div style={{fontSize:'15px',color:'#666',marginBottom:'20px'}}><strong>Down Payment:</strong> {loan.down}</div>
                  <ul style={{paddingLeft:'20px',margin:0}}>
                    {loan.features.map((f, i) => (
                      <li key={i} style={{fontSize:'14px',color:'#666',marginBottom:'8px'}}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h4 style={s.sectionTitle}>Pre-Qualification Requirements</h4>
            <div style={s.formBox}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'16px'}}>
                {['Credit score 620+', 'Debt-to-income ratio <43%', '2 years employment history', '2 years tax returns', 'Bank statements (3 months)', 'Proof of down payment', 'Valid government ID', 'Proof of residency'].map((req, idx) => (
                  <div key={idx} style={{display:'flex',alignItems:'center',gap:'12px',fontSize:'15px',color:'#1a1a1a'}}>
                    <span style={{color:'#1e3a8a',fontSize:'18px'}}>âœ“</span><span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USA PURCHASE TAB */}
        {tab==='purchase' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ  USA Purchase Loan Search</h2>
            <p style={s.sectionSubtitle}>Find the best mortgage rates from our network of lenders</p>
            
            <div style={s.formBox}>
              <div style={s.formGrid}>
                <div style={s.inputGroup}>
                  <label style={s.label}>Loan Type *</label>
                  <select value={purchaseForm.loanType} onChange={e=>setPurchaseForm({...purchaseForm,loanType:e.target.value})} style={s.input}>
                    <option value="conventional">Conventional</option>
                    <option value="fha">FHA</option>
                    <option value="va">VA (Veterans)</option>
                    <option value="usda">USDA (Rural)</option>
                  </select>
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Property Type *</label>
                  <select value={purchaseForm.propertyType} onChange={e=>setPurchaseForm({...purchaseForm,propertyType:e.target.value})} style={s.input}>
                    <option value="sfr">Single Family</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="multi">Multi-Family</option>
                  </select>
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Occupancy *</label>
                  <select value={purchaseForm.occupancy} onChange={e=>setPurchaseForm({...purchaseForm,occupancy:e.target.value})} style={s.input}>
                    <option value="primary">Primary Residence</option>
                    <option value="second">Second Home</option>
                    <option value="investment">Investment Property</option>
                  </select>
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Property Value (USD) *</label>
                  <input type="number" value={purchaseForm.propertyValue} onChange={e=>setPurchaseForm({...purchaseForm,propertyValue:e.target.value})} style={s.input} placeholder="500000" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Down Payment (USD) *</label>
                  <input type="number" value={purchaseForm.downPayment} onChange={e=>setPurchaseForm({...purchaseForm,downPayment:e.target.value})} style={s.input} placeholder="100000" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Loan Amount (USD) *</label>
                  <input type="number" value={purchaseForm.loanAmount} onChange={e=>setPurchaseForm({...purchaseForm,loanAmount:e.target.value})} style={s.input} placeholder="400000" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Credit Score *</label>
                  <input type="number" value={purchaseForm.creditScore} onChange={e=>setPurchaseForm({...purchaseForm,creditScore:e.target.value})} style={s.input} placeholder="720" />
                </div>
              </div>
              
              <button onClick={searchPurchaseLenders} style={s.searchBtn}>ðŸ” Search Lenders</button>
            </div>

            {purchaseResults.length > 0 && (
              <div style={s.results}>
                <h3 style={s.resultsTitle}>âœ… {purchaseResults.length} Lenders Found</h3>
                <div style={s.resultsGrid}>
                  {purchaseResults.map((r,i)=>(
                    <div key={r.id} style={s.resultCard}>
                      <div style={s.resultHeader}>
                        <div style={s.resultRank}>#{i+1}</div>
                        <div style={s.resultLoanType}>{r.loanType}</div>
                      </div>
                      <div style={s.resultRate}>{r.rate}%</div>
                      <div style={s.resultLabel}>Interest Rate</div>
                      <div style={s.resultApr}>APR: {r.apr}%</div>
                      <div style={s.resultLtv}>LTV: {r.ltv}%</div>
                      <div style={s.resultPayment}>
                        <div style={s.resultPaymentLabel}>Monthly Payment</div>
                        <div style={s.resultPaymentAmount}>${r.payment.toLocaleString()}</div>
                      </div>
                      {r.fee > 0 && <div style={s.resultFee}>Origination: ${r.fee}</div>}
                      <button style={s.resultBtn}>Get Pre-Qualified</button>
                    </div>
                  ))}
                </div>
                <div style={s.disclaimer}>* Rates are estimates. Final rates subject to underwriting.</div>
              </div>
            )}
          </div>
        )}


        {/* PURCHASE PROCESS TAB */}
        {tab==='purchaseinfo' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ  Purchase Loan Process</h2>
            <p style={s.sectionSubtitle}>Timeline: Day 1 to Closing (30-45 days)</p>
            
            <div style={{...s.formBox,marginBottom:'40px'}}>
              <div style={{display:'grid',gap:'16px'}}>
                {[
                  { day: 'Day 1-3', title: 'Pre-Approval', desc: 'Submit application, provide documentation, receive pre-approval letter' },
                  { day: 'Day 4-7', title: 'Home Shopping', desc: 'Search for homes within your budget with pre-approval in hand' },
                  { day: 'Day 8-10', title: 'Offer Accepted', desc: 'Submit offer, enter into purchase agreement, order appraisal' },
                  { day: 'Day 11-25', title: 'Processing', desc: 'Underwriting review, home inspection, title search, appraisal completion' },
                  { day: 'Day 26-30', title: 'Clear to Close', desc: 'Final underwriting approval, review closing disclosure' },
                  { day: 'Day 30-45', title: 'Closing', desc: 'Sign documents, transfer funds, receive keys to your new home' }
                ].map((phase, idx) => (
                  <div key={idx} style={{display:'flex',gap:'16px',padding:'16px',background:'rgba(30,58,138,0.05)',border:'1px solid #e0e0e0',borderRadius:'8px'}}>
                    <div style={{width:'80px',padding:'8px 12px',background:'#1e3a8a',color:'#fff',borderRadius:'6px',fontSize:'12px',fontWeight:'700',textAlign:'center',height:'fit-content'}}>{phase.day}</div>
                    <div>
                      <h5 style={{fontSize:'16px',fontWeight:'600',color:'#1a1a1a',marginBottom:'6px'}}>{phase.title}</h5>
                      <p style={{fontSize:'14px',color:'#666',margin:0}}>{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h4 style={s.sectionTitle}>Estimated Closing Costs</h4>
            <div style={s.formBox}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'12px'}}>
                {[
                  { item: 'Appraisal Fee', cost: '$500-$800' },
                  { item: 'Home Inspection', cost: '$400-$600' },
                  { item: 'Title Insurance', cost: '$1,000-$2,500' },
                  { item: 'Origination Fee', cost: '1-2% of loan (complexity)' },
                  { item: 'Credit Report', cost: '$25-$50' },
                  { item: 'Recording Fees', cost: '$100-$300' }
                ].map((cost, idx) => (
                  <div key={idx} style={{display:'flex',justifyContent:'space-between',padding:'12px',background:'rgba(30,58,138,0.05)',borderRadius:'6px'}}>
                    <span style={{fontSize:'14px',color:'#1a1a1a'}}>{cost.item}</span>
                    <span style={{fontSize:'14px',color:'#1e3a8a',fontWeight:'600'}}>{cost.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USA REFINANCE TAB */}
        {tab==='refinance' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ”„ USA Refinance Loan Search</h2>
            <p style={s.sectionSubtitle}>Rate-and-term or cash-out refinance options</p>
            
            <div style={s.formBox}>
              <div style={s.formGrid}>
                <div style={s.inputGroup}>
                  <label style={s.label}>Loan Type *</label>
                  <select value={refinanceForm.loanType} onChange={e=>setRefinanceForm({...refinanceForm,loanType:e.target.value})} style={s.input}>
                    <option value="conventional">Conventional</option>
                    <option value="fha">FHA</option>
                    <option value="va">VA (Veterans)</option>
                  </select>
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Property Type *</label>
                  <select value={refinanceForm.propertyType} onChange={e=>setRefinanceForm({...refinanceForm,propertyType:e.target.value})} style={s.input}>
                    <option value="sfr">Single Family</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="multi">Multi-Family</option>
                  </select>
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Occupancy *</label>
                  <select value={refinanceForm.occupancy} onChange={e=>setRefinanceForm({...refinanceForm,occupancy:e.target.value})} style={s.input}>
                    <option value="primary">Primary Residence</option>
                    <option value="second">Second Home</option>
                    <option value="investment">Investment Property</option>
                  </select>
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Property Value (USD) *</label>
                  <input type="number" value={refinanceForm.propertyValue} onChange={e=>setRefinanceForm({...refinanceForm,propertyValue:e.target.value})} style={s.input} placeholder="500000" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Current Loan Balance (USD) *</label>
                  <input type="number" value={refinanceForm.currentBalance} onChange={e=>setRefinanceForm({...refinanceForm,currentBalance:e.target.value})} style={s.input} placeholder="350000" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Cash Out (USD)</label>
                  <input type="number" value={refinanceForm.cashOut} onChange={e=>setRefinanceForm({...refinanceForm,cashOut:e.target.value})} style={s.input} placeholder="0" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Credit Score *</label>
                  <input type="number" value={refinanceForm.creditScore} onChange={e=>setRefinanceForm({...refinanceForm,creditScore:e.target.value})} style={s.input} placeholder="720" />
                </div>
              </div>
              
              <button onClick={searchRefinanceLenders} style={s.searchBtn}>ðŸ” Search Refinance Lenders</button>
            </div>

            {refinanceResults.length > 0 && (
              <div style={s.results}>
                <h3 style={s.resultsTitle}>âœ… {refinanceResults.length} Lenders Found</h3>
                <div style={s.resultsGrid}>
                  {refinanceResults.map((r,i)=>(
                    <div key={r.id} style={s.resultCard}>
                      <div style={s.resultHeader}>
                        <div style={s.resultRank}>#{i+1}</div>
                        <div style={s.resultLoanType}>{r.loanType} {r.cashOut>0?'CASH-OUT':'REFI'}</div>
                      </div>
                      <div style={s.resultRate}>{r.rate}%</div>
                      <div style={s.resultLabel}>Interest Rate</div>
                      <div style={s.resultApr}>APR: {r.apr}%</div>
                      <div style={s.resultLtv}>LTV: {r.ltv}%</div>
                      {r.cashOut>0 && <div style={s.cashOutBadge}>Cash Out: ${r.cashOut.toLocaleString()}</div>}
                      <div style={s.resultPayment}>
                        <div style={s.resultPaymentLabel}>Monthly Payment</div>
                        <div style={s.resultPaymentAmount}>${r.payment.toLocaleString()}</div>
                      </div>
                      {r.fee > 0 && <div style={s.resultFee}>Origination: ${r.fee}</div>}
                      <button style={s.resultBtn}>Get Pre-Qualified</button>
                    </div>
                  ))}
                </div>
                <div style={s.disclaimer}>* Rates are estimates. Final rates subject to underwriting.</div>
              </div>
            )}
          </div>
        )}


        {/* REFINANCE OPTIONS TAB */}
        {tab==='refinanceinfo' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ”„ Refinance Options</h2>
            <p style={s.sectionSubtitle}>When to refinance and what options are available</p>
            
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'24px',marginBottom:'40px'}}>
              {[
                { title: 'Rate & Term Refinance', desc: 'Lower your interest rate or change loan term', best: 'Rates dropped 0.5%+, Credit improved, Want lower payment' },
                { title: 'Cash-Out Refinance', desc: 'Access your home equity in cash', best: 'Home improvements, Debt consolidation, Investment opportunities' },
                { title: 'FHA Streamline', desc: 'Quick refinance for existing FHA loans', best: 'Already have FHA loan, Want lower rate, No appraisal needed' }
              ].map((option, idx) => (
                <div key={idx} style={s.formBox}>
                  <h4 style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a',marginBottom:'12px'}}>{option.title}</h4>
                  <p style={{fontSize:'14px',color:'#666',marginBottom:'20px'}}>{option.desc}</p>
                  <div style={{fontSize:'13px',color:'#666'}}>
                    <strong>Best For:</strong><br/>{option.best}
                  </div>
                </div>
              ))}
            </div>

            <h4 style={s.sectionTitle}>When to Refinance</h4>
            <div style={s.formBox}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'16px'}}>
                {['Rates dropped 0.5%+', 'Credit score improved significantly', 'Want to switch ARM to fixed', 'Remove PMI (reached 20% equity)', 'Access home equity', 'Change loan term (30yr to 15yr)', 'Consolidate high-interest debt', 'Home value increased substantially'].map((when, idx) => (
                  <div key={idx} style={{display:'flex',alignItems:'center',gap:'12px',fontSize:'15px',color:'#1a1a1a'}}>
                    <span style={{color:'#1e3a8a',fontSize:'18px'}}>âœ“</span><span>{when}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MEXICO PURCHASE TAB */}
        {tab==='mexico' && (
          <div>
            {!mexicoSubmitted ? (
              <div>
                <div style={s.mexicoHeader}>
                  <h2 style={s.sectionTitle}>ðŸ‡²ðŸ‡½ Mexico Property Financing</h2>
                  <div style={s.usCitizenBadge}>ðŸ‡ºðŸ‡¸ US Citizens Only</div>
                </div>
                <p style={s.sectionSubtitle}>Financing for US Citizens purchasing property in Mexico</p>
                
                <div style={s.reqBox}>
                  <h4 style={s.reqTitle}>ðŸ“‹ Loan Requirements</h4>
                  <div style={s.reqGrid}>
                    <div style={s.reqItem}>âœ“ Minimum Loan: $385,000 USD</div>
                    <div style={s.reqItem}>âœ“ Down Payment: 35-45%</div>
                    <div style={s.reqItem}>âœ“ Terms: 15-30 years</div>
                    <div style={s.reqItem}>âœ“ Credit Score: 680+ typical</div>
                    <div style={s.reqItem}>âœ“ US Citizens ONLY</div>
                    <div style={s.reqItem}>âœ“ Fideicomiso included</div>
                  </div>
                </div>

                <div style={s.formBox}>
                  <div style={s.formGrid}>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Full Name *</label>
                      <input value={mexicoForm.name} onChange={e=>setMexicoForm({...mexicoForm,name:e.target.value})} style={s.input} placeholder="John Smith" />
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Email *</label>
                      <input type="email" value={mexicoForm.email} onChange={e=>setMexicoForm({...mexicoForm,email:e.target.value})} style={s.input} placeholder="john@example.com" />
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Phone *</label>
                      <input type="tel" value={mexicoForm.phone} onChange={e=>setMexicoForm({...mexicoForm,phone:e.target.value})} style={s.input} placeholder="+1 310-555-0199" />
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Citizenship *</label>
                      <select value={mexicoForm.citizenship} onChange={e=>setMexicoForm({...mexicoForm,citizenship:e.target.value})} style={s.input}>
                        <option value="us">US Citizen</option>
                        <option value="other">Other (Not Available)</option>
                      </select>
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Property Location *</label>
                      <input value={mexicoForm.propertyLocation} onChange={e=>setMexicoForm({...mexicoForm,propertyLocation:e.target.value})} style={s.input} placeholder="Tulum, Quintana Roo" />
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Property Type *</label>
                      <select value={mexicoForm.propertyType} onChange={e=>setMexicoForm({...mexicoForm,propertyType:e.target.value})} style={s.input}>
                        <option value="">Select Type</option>
                        <option value="beachfront">Beachfront</option>
                        <option value="villa">Villa</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Property Value (USD) *</label>
                      <input type="number" value={mexicoForm.propertyValue} onChange={e=>setMexicoForm({...mexicoForm,propertyValue:e.target.value})} style={s.input} placeholder="600000" />
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Down Payment (%) *</label>
                      <input type="number" value={mexicoForm.downPayment} onChange={e=>setMexicoForm({...mexicoForm,downPayment:e.target.value})} style={s.input} placeholder="40" min="35" max="45" />
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Loan Amount (USD) *</label>
                      <input type="number" value={mexicoForm.loanAmount} onChange={e=>setMexicoForm({...mexicoForm,loanAmount:e.target.value})} style={s.input} placeholder="385000" min="385000" />
                    </div>
                    <div style={s.inputGroup}>
                      <label style={s.label}>Credit Score</label>
                      <input type="number" value={mexicoForm.creditScore} onChange={e=>setMexicoForm({...mexicoForm,creditScore:e.target.value})} style={s.input} placeholder="720" />
                    </div>
                  </div>

                  <div style={s.docBox}>
                    <h4 style={s.docTitle}>ðŸ“„ Required Documentation</h4>
                    <div style={s.docList}>
                      <div style={s.docItem}>âœ“ Valid US Passport</div>
                      <div style={s.docItem}>âœ“ Proof of Income (2 years tax returns)</div>
                      <div style={s.docItem}>âœ“ Bank Statements (3 months minimum)</div>
                      <div style={s.docItem}>âœ“ US Credit Report</div>
                      <div style={s.docItem}>âœ“ Property Appraisal (Mexican-licensed)</div>
                      <div style={s.docItem}>âœ“ Down Payment Verification</div>
                      <div style={s.docItem}>âœ“ Fideicomiso Setup (if coastal/border)</div>
                    </div>
                  </div>

                  <button onClick={submitMexicoLoan} style={s.submitBtn}>Submit Financing Application</button>
                </div>
              </div>
            ) : (
              <div style={s.successBox}>
                <div style={s.successIcon}>âœ…</div>
                <h3 style={s.successTitle}>Application Submitted Successfully!</h3>
                <p style={s.successText}>Our financing team will review your application and contact you within 24-48 hours.</p>
                <p style={s.successText}>WhatsApp: +52-646-340-2686</p>
                <button onClick={()=>setMexicoSubmitted(false)} style={s.successBtn}>Submit Another Application</button>
              </div>
            )}
          </div>
        )}


        {/* MEXICO PROPERTIES TAB */}
        {tab==='mexproperties' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ‡²ðŸ‡½ Mexico Real Estate for USA Buyers</h2>
            <p style={s.sectionSubtitle}>Premium properties available with USA cross-border financing</p>

            <div style={{...s.formBox,background:'rgba(251, 191, 36, 0.1)',border:'2px solid rgba(251, 191, 36, 0.3)',marginBottom:'40px'}}>
              <h3 style={{fontSize:'22px',fontWeight:'700',color:'#1a1a1a',marginBottom:'20px'}}>USA Financing Available</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'16px',marginBottom:'20px'}}>
                {[
                  { label: 'Min Loan', value: '$100K' },
                  { label: 'Down Payment', value: '35-45%' },
                  { label: 'Term', value: '15-30yr' }
                ].map((item, idx) => (
                  <div key={idx} style={{padding:'16px',background:'#fff',borderRadius:'8px',textAlign:'center'}}>
                    <div style={{fontSize:'12px',color:'#666',marginBottom:'8px'}}>{item.label}</div>
                    <div style={{fontSize:'20px',fontWeight:'700',color:'#1e3a8a'}}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={s.sectionTitle}>Featured Mexico Properties</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(350px, 1fr))',gap:'24px',marginBottom:'40px'}}>
              {[
                { title: 'Valle de Guadalupe Wine Estate', location: 'Valle de Guadalupe, BC', price: 1250000, beds: 4, baths: 3.5, sqft: 3800, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' },
                { title: 'Cabo Oceanfront Villa', location: 'Cabo San Lucas, BCS', price: 1850000, beds: 5, baths: 4.5, sqft: 4200, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' },
                { title: 'Puerto Vallarta Beachfront', location: 'Puerto Vallarta, Jalisco', price: 895000, beds: 3, baths: 3, sqft: 2600, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
                { title: 'Tulum Jungle Retreat', location: 'Tulum, Quintana Roo', price: 675000, beds: 3, baths: 2.5, sqft: 2200, image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800' }
              ].map((property, idx) => (
                <div key={idx} style={{background:'#fff',borderRadius:'12px',overflow:'hidden',border:'1px solid #e0e0e0'}}>
                  <div style={{position:'relative',height:'220px'}}>
                    <img src={property.image} alt={property.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  </div>
                  <div style={{padding:'20px'}}>
                    <div style={{fontSize:'24px',fontWeight:'700',color:'#1e3a8a',marginBottom:'8px'}}>${(property.price / 1000).toFixed(0)}K</div>
                    <h5 style={{fontSize:'16px',fontWeight:'600',color:'#1a1a1a',marginBottom:'6px'}}>{property.title}</h5>
                    <p style={{fontSize:'13px',color:'#666',marginBottom:'16px'}}>{property.location}</p>
                    <div style={{display:'flex',gap:'16px',fontSize:'13px',color:'#666',marginBottom:'16px'}}>
                      <span>{property.beds} beds</span><span>â€¢</span><span>{property.baths} baths</span><span>â€¢</span><span>{property.sqft.toLocaleString()} sf</span>
                    </div>
                    <button style={{width:'100%',padding:'12px',background:'#1e3a8a',color:'#fff',border:'none',borderRadius:'6px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>Get Pre-Approved</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TITLE/ESCROW TAB */}
        {tab==='title' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ“‹ Title Insurance & Escrow</h2>
            <p style={s.sectionSubtitle}>Provided by First American Title</p>

            <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'24px',marginBottom:'40px'}}>
              <div style={s.formBox}>
                <h4 style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a',marginBottom:'20px'}}>Owners Title Insurance</h4>
                <div style={{fontSize:'28px',fontWeight:'700',color:'#1e3a8a',marginBottom:'16px'}}>$1,000 - $2,500</div>
                <ul style={{paddingLeft:'20px',margin:0}}>
                  {['Protects ownership rights', 'Covers legal fees', 'Lasts forever', 'Fraud protection'].map((item, idx) => (
                    <li key={idx} style={{fontSize:'14px',color:'#666',marginBottom:'8px'}}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={s.formBox}>
                <h4 style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a',marginBottom:'20px'}}>Lenders Title Insurance</h4>
                <div style={{fontSize:'28px',fontWeight:'700',color:'#1e3a8a',marginBottom:'16px'}}>$500 - $1,000</div>
                <ul style={{paddingLeft:'20px',margin:0}}>
                  {['Required by lender', 'Protects lender only', 'Decreases over time', 'Separate from owner'].map((item, idx) => (
                    <li key={idx} style={{fontSize:'14px',color:'#666',marginBottom:'8px'}}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 1003 URLA TAB */}
        {tab==='urla' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ“ 1003 URLA Form</h2>
            <p style={s.sectionSubtitle}>Uniform Residential Loan Application</p>
            
            <div style={s.formBox}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'16px',marginBottom:'32px'}}>
                <div style={s.inputGroup}>
                  <label style={s.label}>First Name*</label>
                  <input style={s.input} placeholder="John" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Last Name*</label>
                  <input style={s.input} placeholder="Smith" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Email*</label>
                  <input type="email" style={s.input} placeholder="john@example.com" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Phone*</label>
                  <input type="tel" style={s.input} placeholder="310-555-0199" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Property Address*</label>
                  <input style={s.input} placeholder="123 Main St" />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Purchase Price*</label>
                  <input type="number" style={s.input} placeholder="500000" />
                </div>
              </div>

              <button style={{...s.submitBtn,background:'linear-gradient(135deg, #fbbf24, #f59e0b)'}}>
                ðŸ“¥ Download 1003 URLA Application
              </button>
            </div>
          </div>
        )}

        {/* FOR SALE BY OWNER (FSBO) TAB */}
        {tab==='fsbo' && (
          <div>
            <h2 style={s.sectionTitle}>ðŸ¡ For Sale By Owner (FSBO)</h2>
            <p style={s.sectionSubtitle}>List or browse USA properties sold directly by owners</p>
            
            <div style={s.fsboTabs}>
              <button onClick={()=>setFsboTab('browse')} style={fsboTab==='browse'?{...s.fsboTab,...s.fsboTabActive}:s.fsboTab}>
                Browse Listings ({fsboProperties.length})
              </button>
              <button onClick={()=>setFsboTab('list')} style={fsboTab==='list'?{...s.fsboTab,...s.fsboTabActive}:s.fsboTab}>
                List Your Property
              </button>
            </div>

            {/* BROWSE FSBO LISTINGS */}
            {fsboTab==='browse' && (
              <div>
                {fsboProperties.length === 0 ? (
                  <div style={s.emptyState}>
                    <div style={s.emptyIcon}>ðŸ </div>
                    <h3 style={s.emptyTitle}>No FSBO Listings Yet</h3>
                    <p style={s.emptyText}>Be the first to list your property!</p>
                    <button onClick={()=>setFsboTab('list')} style={s.emptyBtn}>List Your Property</button>
                  </div>
                ) : (
                  <div style={s.fsboGrid}>
                    {fsboProperties.map(p=>(
                      <div key={p.id} style={s.fsboCard}>
                        <div style={s.fsboPhoto}>
                          <img src={p.photos[0]} style={s.photo} alt="" />
                          <div style={s.fsboBadge}>FSBO</div>
                        </div>
                        <div style={s.fsboBody}>
                          <div style={s.fsboTitle}>{p.title}</div>
                          <div style={s.fsboAddress}>{p.address}, {p.city}, {p.state} {p.zip}</div>
                          <div style={s.fsboPrice}>${p.price.toLocaleString()}</div>
                          <div style={s.fsboSpecs}>
                            <div style={s.fsboSpec}>{p.beds} Beds</div>
                            <div style={s.fsboSpec}>{p.baths} Baths</div>
                            <div style={s.fsboSpec}>{p.sqft.toLocaleString()} sqft</div>
                          </div>
                          <div style={s.fsboSeller}>ðŸ‘¤ {p.sellerName}</div>
                          <div style={s.fsboContact}>ðŸ“ž {p.sellerPhone}</div>
                          <button style={s.viewBtn}>View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* LIST FSBO PROPERTY */}
            {fsboTab==='list' && (
              <div style={s.formBox}>
                <h3 style={s.formTitle}>ðŸ“ List Your Property</h3>
                <p style={s.formSubtitle}>No commissions â€¢ Direct buyer contact â€¢ Full control</p>
                
                <div style={s.formGrid}>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Property Title *</label>
                    <input value={fsboForm.title} onChange={e=>setFsboForm({...fsboForm,title:e.target.value})} style={s.input} placeholder="Beautiful 3BR Home" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Street Address *</label>
                    <input value={fsboForm.address} onChange={e=>setFsboForm({...fsboForm,address:e.target.value})} style={s.input} placeholder="123 Main St" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>City *</label>
                    <input value={fsboForm.city} onChange={e=>setFsboForm({...fsboForm,city:e.target.value})} style={s.input} placeholder="San Diego" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>State *</label>
                    <input value={fsboForm.state} onChange={e=>setFsboForm({...fsboForm,state:e.target.value})} style={s.input} placeholder="CA" maxLength="2" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>ZIP Code *</label>
                    <input value={fsboForm.zip} onChange={e=>setFsboForm({...fsboForm,zip:e.target.value})} style={s.input} placeholder="92101" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Asking Price (USD) *</label>
                    <input type="number" value={fsboForm.price} onChange={e=>setFsboForm({...fsboForm,price:e.target.value})} style={s.input} placeholder="450000" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Property Type *</label>
                    <select value={fsboForm.propertyType} onChange={e=>setFsboForm({...fsboForm,propertyType:e.target.value})} style={s.input}>
                      <option value="sfr">Single Family</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="multi">Multi-Family</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Bedrooms</label>
                    <input type="number" value={fsboForm.beds} onChange={e=>setFsboForm({...fsboForm,beds:e.target.value})} style={s.input} placeholder="3" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Bathrooms</label>
                    <input type="number" value={fsboForm.baths} onChange={e=>setFsboForm({...fsboForm,baths:e.target.value})} style={s.input} placeholder="2" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Square Feet</label>
                    <input type="number" value={fsboForm.sqft} onChange={e=>setFsboForm({...fsboForm,sqft:e.target.value})} style={s.input} placeholder="2000" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Year Built</label>
                    <input value={fsboForm.yearBuilt} onChange={e=>setFsboForm({...fsboForm,yearBuilt:e.target.value})} style={s.input} placeholder="2015" />
                  </div>
                </div>

                <div style={s.inputGroup}>
                  <label style={s.label}>Description</label>
                  <textarea value={fsboForm.description} onChange={e=>setFsboForm({...fsboForm,description:e.target.value})} style={s.textarea} rows="4" placeholder="Describe your property..."></textarea>
                </div>

                <div style={s.inputGroup}>
                  <label style={s.label}>Photos * (Max 10)</label>
                  <input type="file" multiple accept="image/*" onChange={handleFsboPhotoUpload} style={s.fileInput} />
                  <div style={s.photoGrid}>
                    {fsboForm.photos.map((photo,i)=>(
                      <div key={i} style={s.photoPreview}>
                        <img src={photo} style={s.previewImg} alt="" />
                        <button onClick={()=>removeFsboPhoto(i)} style={s.removePhotoBtn}>Ã—</button>
                      </div>
                    ))}
                  </div>
                </div>

                <h4 style={s.formSubtitle2}>Seller Contact Information</h4>
                <div style={s.formGrid}>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Your Name *</label>
                    <input value={fsboForm.sellerName} onChange={e=>setFsboForm({...fsboForm,sellerName:e.target.value})} style={s.input} placeholder="John Smith" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Phone *</label>
                    <input type="tel" value={fsboForm.sellerPhone} onChange={e=>setFsboForm({...fsboForm,sellerPhone:e.target.value})} style={s.input} placeholder="310-555-0199" />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Email *</label>
                    <input type="email" value={fsboForm.sellerEmail} onChange={e=>setFsboForm({...fsboForm,sellerEmail:e.target.value})} style={s.input} placeholder="john@example.com" />
                  </div>
                </div>

                <button onClick={submitFsbo} style={s.submitBtn}>Publish Listing</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const s={
  container:{minHeight:'100vh',background:'linear-gradient(135deg,#1e3a8a 0%,#1e293b 100%)'},
  header:{background:'rgba(30,58,138,0.95)',padding:'32px',borderBottom:'2px solid rgba(255,255,255,0.1)'},
  headerContent:{maxWidth:'1400px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'},
  title:{fontSize:'36px',fontWeight:'700',color:'#fff',margin:0},
  subtitle:{fontSize:'16px',color:'rgba(255,255,255,0.8)',margin:'8px 0 0'},
  actions:{display:'flex',gap:'12px'},
  langBtn:{padding:'10px 20px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.3)',borderRadius:'6px',color:'#fff',fontWeight:'600',cursor:'pointer',fontSize:'14px'},
  homeBtn:{padding:'10px 24px',background:'#fff',border:'none',borderRadius:'6px',color:'#1e3a8a',fontWeight:'700',cursor:'pointer',fontSize:'14px'},
  tabs:{background:'rgba(30,58,138,0.8)',padding:'0 32px',display:'flex',gap:'8px',borderBottom:'2px solid rgba(255,255,255,0.1)'},
  tab:{padding:'16px 32px',background:'transparent',border:'none',borderBottom:'3px solid transparent',color:'rgba(255,255,255,0.7)',fontWeight:'600',cursor:'pointer',fontSize:'15px',transition:'all 0.3s'},
  tabActive:{color:'#fff',borderBottomColor:'#fbbf24',background:'rgba(255,255,255,0.05)'},
  content:{maxWidth:'1400px',margin:'0 auto',padding:'48px 32px'},
  
  sectionTitle:{fontSize:'28px',fontWeight:'700',color:'#fff',marginBottom:'8px'},
  sectionSubtitle:{fontSize:'16px',color:'rgba(255,255,255,0.8)',marginBottom:'32px'},
  formBox:{background:'rgba(255,255,255,0.95)',padding:'40px',borderRadius:'12px',marginBottom:'32px'},
  formTitle:{fontSize:'24px',fontWeight:'700',color:'#1a1a1a',marginBottom:'8px'},
  formSubtitle:{fontSize:'14px',color:'#666',marginBottom:'32px'},
  formSubtitle2:{fontSize:'18px',fontWeight:'700',color:'#1a1a1a',marginTop:'32px',marginBottom:'16px'},
  formGrid:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'24px',marginBottom:'24px'},
  inputGroup:{display:'flex',flexDirection:'column'},
  label:{fontSize:'13px',fontWeight:'600',color:'#333',marginBottom:'8px'},
  input:{padding:'14px 16px',border:'1px solid #d0d0d0',borderRadius:'6px',fontSize:'15px',background:'#fff'},
  textarea:{padding:'14px 16px',border:'1px solid #d0d0d0',borderRadius:'6px',fontSize:'15px',background:'#fff',fontFamily:'inherit',resize:'vertical'},
  searchBtn:{width:'100%',padding:'18px',background:'#1e3a8a',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'700',cursor:'pointer',fontSize:'16px',marginTop:'16px'},
  submitBtn:{width:'100%',padding:'18px',background:'#1e3a8a',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'700',cursor:'pointer',fontSize:'16px'},
  
  results:{marginTop:'32px'},
  resultsTitle:{fontSize:'24px',fontWeight:'700',color:'#fff',marginBottom:'24px'},
  resultsGrid:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'24px',marginBottom:'24px'},
  resultCard:{background:'#fff',borderRadius:'12px',padding:'24px',textAlign:'center'},
  resultHeader:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'},
  resultRank:{background:'#1e3a8a',color:'#fff',width:'36px',height:'36px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',fontSize:'16px'},
  resultLoanType:{background:'#f0f0f0',padding:'6px 12px',borderRadius:'6px',fontSize:'11px',fontWeight:'700',color:'#666'},
  resultRate:{fontSize:'48px',fontWeight:'700',color:'#1e3a8a',marginBottom:'4px'},
  resultLabel:{fontSize:'14px',color:'#666',marginBottom:'8px'},
  resultApr:{fontSize:'16px',color:'#666',marginBottom:'8px'},
  resultLtv:{fontSize:'14px',color:'#999',marginBottom:'16px'},
  cashOutBadge:{background:'#10b981',color:'#fff',padding:'8px 12px',borderRadius:'6px',fontSize:'13px',fontWeight:'700',marginBottom:'12px'},
  resultPayment:{background:'#f8f9fa',padding:'20px',borderRadius:'8px',marginBottom:'16px'},
  resultPaymentLabel:{fontSize:'13px',color:'#666',marginBottom:'6px'},
  resultPaymentAmount:{fontSize:'32px',fontWeight:'700',color:'#1e3a8a'},
  resultFee:{fontSize:'13px',color:'#999',marginBottom:'16px'},
  resultBtn:{width:'100%',padding:'14px',background:'#1e3a8a',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'700',cursor:'pointer',fontSize:'15px'},
  disclaimer:{fontSize:'13px',color:'rgba(255,255,255,0.7)',textAlign:'center',fontStyle:'italic'},
  
  mexicoHeader:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'},
  usCitizenBadge:{background:'#dc2626',color:'#fff',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'},
  reqBox:{background:'#ecfdf5',border:'2px solid #86efac',borderRadius:'12px',padding:'24px',marginBottom:'32px'},
  reqTitle:{fontSize:'18px',fontWeight:'700',color:'#166534',marginBottom:'16px'},
  reqGrid:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px'},
  reqItem:{fontSize:'14px',color:'#166534',fontWeight:'600'},
  docBox:{background:'#fef3c7',border:'2px solid #fde68a',borderRadius:'12px',padding:'24px',marginBottom:'24px'},
  docTitle:{fontSize:'18px',fontWeight:'700',color:'#92400e',marginBottom:'16px'},
  docList:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px'},
  docItem:{fontSize:'14px',color:'#92400e',fontWeight:'600'},
  
  successBox:{background:'#ecfdf5',border:'3px solid #86efac',borderRadius:'16px',padding:'60px 40px',textAlign:'center'},
  successIcon:{fontSize:'80px',marginBottom:'24px'},
  successTitle:{fontSize:'28px',fontWeight:'700',color:'#166534',marginBottom:'16px'},
  successText:{fontSize:'16px',color:'#166534',marginBottom:'12px'},
  successBtn:{padding:'16px 40px',background:'#166534',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'700',cursor:'pointer',fontSize:'16px',marginTop:'24px'},
  
  fsboTabs:{display:'flex',gap:'16px',marginBottom:'32px',justifyContent:'center'},
  fsboTab:{padding:'16px 32px',background:'rgba(255,255,255,0.1)',border:'2px solid rgba(255,255,255,0.3)',borderRadius:'8px',color:'#fff',fontWeight:'600',cursor:'pointer',fontSize:'15px'},
  fsboTabActive:{background:'#fff',color:'#1e3a8a',border:'2px solid #fff'},
  
  emptyState:{background:'rgba(255,255,255,0.95)',padding:'80px 40px',borderRadius:'16px',textAlign:'center'},
  emptyIcon:{fontSize:'80px',marginBottom:'20px'},
  emptyTitle:{fontSize:'24px',fontWeight:'700',color:'#1a1a1a',marginBottom:'12px'},
  emptyText:{fontSize:'16px',color:'#666',marginBottom:'32px'},
  emptyBtn:{padding:'16px 40px',background:'#1e3a8a',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'700',cursor:'pointer',fontSize:'16px'},
  
  fsboGrid:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))',gap:'24px'},
  fsboCard:{background:'#fff',borderRadius:'12px',overflow:'hidden',border:'1px solid #e0e0e0'},
  fsboPhoto:{height:'240px',position:'relative',overflow:'hidden',background:'#f0f0f0'},
  photo:{width:'100%',height:'100%',objectFit:'cover'},
  fsboBadge:{position:'absolute',top:'16px',left:'16px',background:'#dc2626',color:'#fff',padding:'8px 16px',borderRadius:'6px',fontSize:'12px',fontWeight:'700'},
  fsboBody:{padding:'24px'},
  fsboTitle:{fontSize:'18px',fontWeight:'700',color:'#1a1a1a',marginBottom:'8px'},
  fsboAddress:{fontSize:'13px',color:'#666',marginBottom:'12px'},
  fsboPrice:{fontSize:'28px',fontWeight:'700',color:'#1e3a8a',marginBottom:'16px'},
  fsboSpecs:{display:'flex',gap:'16px',marginBottom:'12px',paddingBottom:'12px',borderBottom:'1px solid #f0f0f0'},
  fsboSpec:{fontSize:'14px',color:'#666'},
  fsboSeller:{fontSize:'14px',color:'#666',marginBottom:'4px'},
  fsboContact:{fontSize:'14px',color:'#666',marginBottom:'16px'},
  viewBtn:{width:'100%',padding:'14px',background:'#1e3a8a',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'700',cursor:'pointer',fontSize:'15px'},
  
  fileInput:{padding:'14px 16px',border:'1px solid #d0d0d0',borderRadius:'8px',fontSize:'15px',background:'#fff',width:'100%',marginBottom:'20px'},
  photoGrid:{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'16px'},
  photoPreview:{position:'relative',paddingTop:'100%',borderRadius:'8px',overflow:'hidden',border:'1px solid #e0e0e0'},
  previewImg:{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover'},
  removePhotoBtn:{position:'absolute',top:'8px',right:'8px',background:'rgba(0,0,0,0.7)',color:'#fff',border:'none',borderRadius:'50%',width:'28px',height:'28px',fontSize:'18px',cursor:'pointer',lineHeight:'1'}
};

export default USAMortgage;