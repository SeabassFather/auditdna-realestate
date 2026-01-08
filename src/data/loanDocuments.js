export const loanDocuments = {
  personal: [
    { id: 1, name: "Government Issued Photo ID", desc: "Driver's License, Passport, or State ID", required: true },
    { id: 2, name: "Social Security Card", desc: "OR Social Security Number verification", required: true },
    { id: 3, name: "Proof of US Residency", desc: "Green Card, Visa, or Citizenship Certificate (if applicable)", required: false }
  ],
  income: [
    { id: 4, name: "Pay Stubs (Most Recent 30 Days)", desc: "All jobs, all income sources", required: true },
    { id: 5, name: "W-2 Forms (Last 2 Years)", desc: "All employers", required: true },
    { id: 6, name: "Tax Returns (Last 2 Years)", desc: "Complete returns with all schedules - 1040, Schedule C, Schedule E", required: true },
    { id: 7, name: "1099 Forms (If Self-Employed)", desc: "All 1099-MISC, 1099-NEC forms", required: false },
    { id: 8, name: "Profit & Loss Statement (YTD)", desc: "For self-employed borrowers", required: false },
    { id: 9, name: "Business License", desc: "If self-employed or business owner", required: false },
    { id: 10, name: "CPA Letter", desc: "Verification of self-employment income", required: false }
  ],
  assets: [
    { id: 11, name: "Bank Statements (Last 2 Months)", desc: "All checking, savings, money market accounts", required: true },
    { id: 12, name: "Investment Account Statements", desc: "Stocks, bonds, mutual funds, 401k, IRA", required: true },
    { id: 13, name: "Gift Letter (If Applicable)", desc: "For down payment funds from family", required: false },
    { id: 14, name: "Asset Verification Letter", desc: "From financial institution for large deposits", required: false },
    { id: 15, name: "Retirement Account Statements", desc: "401k, IRA, pension statements", required: false }
  ],
  credit: [
    { id: 16, name: "Credit Authorization Form", desc: "Signed authorization for credit pull", required: true },
    { id: 17, name: "Explanation Letters", desc: "For any derogatory credit items, late payments, collections", required: false },
    { id: 18, name: "Bankruptcy Discharge Papers", desc: "If applicable - Chapter 7 or 13", required: false },
    { id: 19, name: "Foreclosure Documents", desc: "If applicable - full documentation", required: false },
    { id: 20, name: "Payment History Letters", desc: "For disputed credit items", required: false }
  ],
  property: [
    { id: 21, name: "Purchase Agreement", desc: "Fully executed contract with all addendums", required: true },
    { id: 22, name: "Property Appraisal", desc: "Ordered by lender after application", required: true },
    { id: 23, name: "Home Inspection Report", desc: "Complete inspection with photos", required: false },
    { id: 24, name: "HOA Documents", desc: "Budget, CCRs, master insurance (if applicable)", required: false },
    { id: 25, name: "Title Report/Commitment", desc: "Preliminary title report", required: true },
    { id: 26, name: "Survey/Plot Plan", desc: "Property boundaries and structures", required: false },
    { id: 27, name: "Flood Certification", desc: "FEMA flood zone determination", required: true },
    { id: 28, name: "Pest Inspection", desc: "Termite/wood destroying insect report", required: false }
  ],
  employment: [
    { id: 29, name: "Employment Verification Letter", desc: "On company letterhead with HR contact", required: true },
    { id: 30, name: "Offer Letter (If New Job)", desc: "Signed offer letter with start date and salary", required: false },
    { id: 31, name: "Business License (Self-Employed)", desc: "Active business license", required: false },
    { id: 32, name: "Contracts (Self-Employed)", desc: "Current signed contracts showing ongoing income", required: false }
  ],
  additional: [
    { id: 33, name: "Divorce Decree", desc: "If applicable - complete decree with settlement", required: false },
    { id: 34, name: "Child Support/Alimony Documentation", desc: "Court orders and 12 months payment history", required: false },
    { id: 35, name: "Rental Income Documentation", desc: "Leases and tax returns Schedule E", required: false },
    { id: 36, name: "VA Certificate of Eligibility", desc: "For VA loans only", required: false },
    { id: 37, name: "Disability/SSI Award Letters", desc: "If receiving disability income", required: false },
    { id: 38, name: "Power of Attorney", desc: "If someone signing on borrower's behalf", required: false },
    { id: 39, name: "Trust Documents", desc: "If property held in trust", required: false },
    { id: 40, name: "Previous Mortgage Statement", desc: "For refinance - most recent statement", required: false }
  ]
};

export function getRequiredDocs(loanType, employmentType, hasGift, isRefinance) {
  let required = [
    ...loanDocuments.personal.filter(d => d.required),
    ...loanDocuments.income.filter(d => d.required),
    ...loanDocuments.assets.filter(d => d.required),
    ...loanDocuments.credit.filter(d => d.required),
    ...loanDocuments.property.filter(d => d.required),
    ...loanDocuments.employment.filter(d => d.required)
  ];

  if (employmentType === "self-employed") {
    required.push(loanDocuments.income.find(d => d.id === 8)); // P&L
    required.push(loanDocuments.income.find(d => d.id === 9)); // Business License
  }

  if (hasGift) {
    required.push(loanDocuments.assets.find(d => d.id === 13)); // Gift Letter
  }

  if (loanType === "VA") {
    required.push(loanDocuments.additional.find(d => d.id === 36)); // VA COE
  }

  if (isRefinance) {
    required.push(loanDocuments.additional.find(d => d.id === 40)); // Previous Mortgage
  }

  return required;
}