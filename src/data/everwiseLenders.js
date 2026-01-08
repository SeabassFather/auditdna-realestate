// EVERWISE APPROVED LENDERS - CONFIDENTIAL
export const everwiseLenders = [
  { id: 1, name: "Lender Option 1", comp: 2.5, minFee: 995, fha: 550, va: 550, conv: 620, programs: ["conv", "fha", "va", "jumbo", "nonqm"] },
  { id: 2, name: "Lender Option 2", comp: 2.5, minFee: 0, fha: 580, va: 580, conv: 620, programs: ["nonqm", "dscr"] },
  { id: 3, name: "Lender Option 3", comp: 2.0, minFee: 1000, fha: 600, va: 600, conv: 620, programs: ["conv", "fha", "va", "jumbo"] },
  { id: 4, name: "Lender Option 4", comp: 2.25, minFee: 0, fha: 580, va: 580, conv: 620, programs: ["conv", "fha", "va"] },
  { id: 5, name: "Lender Option 5", comp: 1.5, minFee: 1000, fha: 600, va: 600, conv: 620, programs: ["conv", "fha", "va", "jumbo"] },
  { id: 6, name: "Lender Option 6", comp: 1.0, minFee: 895, fha: 620, va: 620, conv: 620, programs: ["conv", "fha", "va"] },
  { id: 7, name: "Lender Option 7", comp: 2.0, minFee: 965, fha: 580, va: 620, conv: 620, programs: ["conv", "fha", "va"] },
  { id: 8, name: "Lender Option 8", comp: 1.75, minFee: 0, fha: 580, va: 580, conv: 620, programs: ["conv", "fha", "va", "jumbo", "nonqm", "dscr"] }
];

export function matchLenders(loanType, creditScore) {
  const type = loanType.toLowerCase();
  
  return everwiseLenders.filter(lender => {
    // Check FICO requirements
    let minScore = 620;
    if (type.includes('fha')) minScore = lender.fha;
    else if (type.includes('va')) minScore = lender.va;
    else minScore = lender.conv;
    
    if (creditScore < minScore) return false;
    
    // Check program availability
    const hasProgram = lender.programs.some(p => type.includes(p));
    if (!hasProgram) return false;
    
    return true;
  }).map(lender => {
    // Calculate rate based on credit score
    let baseRate = 6.5;
    if (creditScore >= 740) baseRate -= 0.5;
    else if (creditScore >= 700) baseRate -= 0.25;
    else if (creditScore < 640) baseRate += 0.5;
    
    // Adjust for loan type
    if (type.includes('fha')) baseRate += 0.25;
    if (type.includes('va')) baseRate -= 0.125;
    if (type.includes('jumbo')) baseRate += 0.375;
    if (type.includes('nonqm')) baseRate += 1.5;
    
    const rate = baseRate.toFixed(3);
    const apr = (parseFloat(rate) + 0.3).toFixed(3);
    
    return {
      ...lender,
      rate,
      apr,
      monthly: 0
    };
  });
}