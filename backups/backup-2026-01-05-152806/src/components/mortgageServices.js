<<<<<<< HEAD
// src/data/services/mortgageServices.js
=======
﻿// src/data/services/mortgageServices.js
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export const MORTGAGE_SERVICES = [
  "Mortgage Search Engine",
  "Lender Matching Engine",
  "Cross-Border Leasehold Financing",
  "ADU Builder Module",
  "Green Housing Incentives",
  "Construction Lending",
  "Escrow & Compliance Checks",
  "Foreclosure Tracker",
  "REIT Investment Dashboard",
  "Property Insurance Integration",
  "Loan Factoring",
  "Reverse Mortgage Analysis",
  "Energy Efficiency Financing",
  "Land Title Audit",
  "Property Tax Compliance",
  "HOA Compliance Tracker",
  "Leasehold Verification",
  "Zoning Law Audit",
  "International Lending",
  "Tenant Screening Compliance",
  "Mortgage Loan Audit",
  "Escrow Fee Reconciliation",
  "Escrow Account Analysis",
  "Title Insurance Audit",
  "Property Tax Assessment Review",
  "Homeowners Insurance Premium Audit",
  "PMI Removal Analysis",
  "Promissory Note Audit",
  "Servicing Audit",
  "TRID Compliance Review",
  "QM/ATR Documentation Review",
  "Appraisal Independence Review",
  "FHA Loan File Review",
  "VA Loan Compliance Audit",
  "HMDA Data Integrity Review",
  "Mortgage Servicing Transfer Audit"
];

export const MORTGAGE_SERVICE_DETAILS = {
  "TRID Compliance Review": {
    description: "Comprehensive audit of TILA-RESPA Integrated Disclosure compliance, examining Loan Estimates and Closing Disclosures for timing, accuracy, and fee tolerances",
    pricing: "$497",
    estimatedRefund: "$500 - $5,000",
    timeline: "30-45 days",
<<<<<<< HEAD
    regulation: "TRID, RESPA, TILA (12 CFR  1026)",
    regulation: "TRID, RESPA, TILA (12 CFR  1026)",
=======
    regulation: "TRID, RESPA, TILA (12 CFR  1026)",
    regulation: "TRID, RESPA, TILA (12 CFR  1026)",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    agency: "CFPB",
    agencyContact: "cfpb.gov/complaint | 855-411-2372",
    requiredDocs: [
      "Loan Estimate (LE)",
      "Closing Disclosure (CD)",
      "Good Faith Estimate (if pre-2015)",
      "HUD-1 Settlement Statement (if pre-2015)",
      "Loan Application (Form 1003)",
      "All email correspondence with lender",
      "Proof of closing date"
    ],
    commonViolations: [
      "Loan Estimate not provided within 3 business days",
      "Closing Disclosure not provided 3 business days before closing",
      "Fees exceeded tolerance thresholds (0%, 10%)",
      "Incorrect APR calculation",
      "Missing or incomplete disclosures",
      "Change of circumstance not properly documented"
    ]
  },
  "Escrow Account Analysis": {
    description: "Analysis of escrow account management for property taxes and insurance, checking for overcharges, surplus violations, and shortage manipulation",
    pricing: "$697",
    estimatedRefund: "$500 - $5,000",
    timeline: "30-60 days",
<<<<<<< HEAD
    regulation: "RESPA Section 10, Regulation X (12 CFR  1024.17)",
    regulation: "RESPA Section 10, Regulation X (12 CFR  1024.17)",
=======
    regulation: "RESPA Section 10, Regulation X (12 CFR  1024.17)",
    regulation: "RESPA Section 10, Regulation X (12 CFR  1024.17)",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    agency: "CFPB",
    agencyContact: "cfpb.gov/complaint | 855-411-2372",
    requiredDocs: [
      "Escrow Account Annual Statements (3 years)",
      "Monthly Mortgage Statements",
      "Property Tax Bills",
      "Homeowner's Insurance Declarations",
      "PMI Statements (if applicable)",
      "Initial Escrow Disclosure",
      "Escrow Shortage Notices"
    ],
    commonViolations: [
      "Excessive escrow cushion (>2 months)",
      "Failure to refund escrow surplus",
      "Improper escrow analysis",
      "Unauthorized escrow increases"
    ]
  },
  "FHA Loan File Review": {
    description: "Government-backed FHA loan regulation compliance review for proper origination and servicing",
    pricing: "$1,497",
    estimatedRefund: "$1,000 - $20,000",
    timeline: "60-90 days",
    regulation: "FHA Handbook 4000.1, HUD Regulations",
    agency: "HUD",
    agencyContact: "hud.gov/complaints | 800-669-9777",
    requiredDocs: [
      "FHA Loan Application",
      "FHA Case Number Documentation",
      "Appraisal Report",
      "Loan Estimate & Closing Disclosure",
      "All Fee Disclosures",
      "Upfront MIP Documentation"
    ],
    commonViolations: [
      "Excessive origination fees",
      "Prohibited junk fees",
      "Appraisal violations",
      "MIP overcharges"
    ]
  },
  "Reverse Mortgage Analysis": {
    description: "HECM and reverse mortgage compliance review for proper counseling, disclosures, and servicing",
    pricing: "$1,497",
    estimatedRefund: "$2,000 - $15,000",
    timeline: "45-60 days",
<<<<<<< HEAD
    regulation: "HECM Regulations (12 USC  1715z-20)",
    regulation: "HECM Regulations (12 USC  1715z-20)",
=======
    regulation: "HECM Regulations (12 USC  1715z-20)",
    regulation: "HECM Regulations (12 USC  1715z-20)",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    agency: "HUD, CFPB",
    agencyContact: "hud.gov/complaints",
    requiredDocs: [
      "HECM Counseling Certificate",
      "Loan Agreement",
      "Total Annual Loan Cost (TALC) Disclosure",
      "Servicing statements",
      "Property appraisal"
    ],
    commonViolations: [
      "Missing required counseling",
      "Improper fee disclosures",
      "Servicing violations",
      "Foreclosure procedure violations"
    ]
  },
  "Cross-Border Leasehold Financing": {
    description: "US citizen financing for Mexico property leasehold with fideicomiso support and legal review",
    pricing: "$997",
    estimatedRefund: "N/A",
    timeline: "45-60 days",
    regulation: "Mexican Banking Law, US Lending Regulations",
    agency: "Multiple jurisdictions",
    agencyContact: "Varies by lender",
    requiredDocs: [
      "Fideicomiso trust documents",
      "Property appraisal (Mexico)",
      "Title report",
      "Proof of income",
      "Credit reports (US & Mexico)"
    ],
    commonViolations: []
  },
  "Title Insurance Audit": {
    description: "Review title insurance policies for overcharges, unnecessary endorsements, and simultaneous issue rate violations",
    pricing: "$797",
    estimatedRefund: "$500 - $3,000",
    timeline: "30-45 days",
    regulation: "State Insurance Regulations, RESPA",
    agency: "State Insurance Commissioners, CFPB",
    agencyContact: "Varies by state",
    requiredDocs: [
      "Title Insurance Policy",
      "Closing Disclosure or HUD-1",
      "Title Commitment",
      "Endorsement schedule"
    ],
    commonViolations: [
      "Simultaneous issue rate not applied",
      "Unnecessary endorsements",
      "Premium calculation errors",
      "Kickback arrangements"
    ]
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
