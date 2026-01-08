<<<<<<< HEAD
// src/data/serviceDetails.js
=======
﻿// src/data/serviceDetails.js
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

import { AGRICULTURE_SERVICE_DETAILS } from './services/agricultureServices';
import { MORTGAGE_SERVICE_DETAILS } from './services/mortgageServices';
import { FACTORING_SERVICE_DETAILS } from './services/factoringServices';

// Combine all service details from different categories
export const SERVICE_DETAILS = {
  ...AGRICULTURE_SERVICE_DETAILS,
  ...MORTGAGE_SERVICE_DETAILS,
  ...FACTORING_SERVICE_DETAILS,
  
  // Additional service details for other categories
  "Privacy Compliance (GDPR, CCPA, GLBA, PDPA, PIPEDA)": {
    description: "Comprehensive global privacy law compliance across multiple jurisdictions",
    pricing: "$1,997",
    estimatedRefund: "Avoid fines: $7,500 - $2.5M+",
    timeline: "60-90 days",
    regulation: "GDPR, CCPA, GLBA, PDPA, PIPEDA",
    agency: "FTC, State AGs, EU DPAs",
    agencyContact: "ftc.gov/privacy | Various international authorities",
    requiredDocs: [
      "Privacy Policy",
      "Data Processing Agreements",
      "Data mapping documentation",
      "Consent records",
      "Security documentation",
      "Breach notification procedures"
    ],
    commonViolations: [
      "Missing privacy notices",
      "Inadequate consent mechanisms",
      "Data retention violations",
      "Missing data processing agreements",
      "Inadequate security measures"
    ]
  },
  
  "HIPAA Compliance": {
    description: "Healthcare data privacy and security compliance audit",
    pricing: "$2,497",
    estimatedRefund: "Avoid fines: $100 - $50,000 per violation",
    timeline: "45-60 days",
    regulation: "HIPAA (45 CFR Parts 160, 162, 164)",
    agency: "HHS Office for Civil Rights",
    agencyContact: "hhs.gov/hipaa | 800-368-1019",
    requiredDocs: [
      "Notice of Privacy Practices",
      "Business Associate Agreements",
      "Security Risk Assessment",
      "Breach notification logs",
      "Employee training records",
      "Access control documentation"
    ],
    commonViolations: [
      "Missing Business Associate Agreements",
      "Inadequate encryption",
      "Lack of employee training",
      "Insufficient access controls",
      "Delayed breach notifications"
    ]
  },
  
  "CFPB Complaint Filing": {
    description: "Professional CFPB complaint filing and regulatory escalation for financial services violations",
    pricing: "$497",
    estimatedRefund: "$500 - $50,000+",
    timeline: "15-60 days (CFPB response)",
    regulation: "CFPA, TILA, RESPA, FCRA, ECOA",
    agency: "CFPB",
    agencyContact: "cfpb.gov/complaint | 855-411-2372",
    requiredDocs: [
      "Account statements",
      "Correspondence with company",
      "Contracts or agreements",
      "Payment records",
      "Disclosure documents"
    ],
    commonViolations: [
      "Unfair lending practices",
      "Deceptive marketing",
      "Improper debt collection",
      "Credit reporting errors",
      "Servicing violations"
    ]
  },
  
  "Medical Bill Overcharge Review": {
    description: "Comprehensive medical billing audit for overcharges, coding errors, and insurance claim discrepancies",
    pricing: "$697",
    estimatedRefund: "$1,000 - $25,000",
    timeline: "30-45 days",
    regulation: "Fair Debt Collection Practices Act, State Consumer Protection Laws",
    agency: "State Attorney General, FTC",
    agencyContact: "Varies by state",
    requiredDocs: [
      "Medical bills (itemized)",
      "Insurance EOBs",
      "Medical records",
      "Insurance policy documents",
      "Payment receipts"
    ],
    commonViolations: [
      "Duplicate billing",
      "Upcoding services",
      "Unbundling procedures",
      "Balance billing violations",
      "Out-of-network surprise bills"
    ]
  },
  
  "Utilities Audit (Gas/Water/Electric)": {
    description: "Audit utility bills for rate errors, meter reading mistakes, and unauthorized charges",
    pricing: "$397",
    estimatedRefund: "$200 - $5,000",
    timeline: "30-45 days",
    regulation: "State Public Utility Commission Regulations",
    agency: "State PUC",
    agencyContact: "Varies by state",
    requiredDocs: [
      "Utility bills (12+ months)",
      "Service agreements",
      "Meter readings",
      "Rate schedules",
      "Payment history"
    ],
    commonViolations: [
      "Incorrect rate classification",
      "Meter reading errors",
      "Unauthorized fees",
      "Estimated billing errors",
      "Late fee violations"
    ]
  },
  
  "401(k) Fee Audit": {
    description: "Comprehensive 401(k) plan fee analysis for excessive fees and fiduciary violations",
    pricing: "$997",
    estimatedRefund: "$5,000 - $100,000+",
    timeline: "45-60 days",
<<<<<<< HEAD
    regulation: "ERISA (29 USC  1001 et seq.)",
    regulation: "ERISA (29 USC  1001 et seq.)",
=======
    regulation: "ERISA (29 USC  1001 et seq.)",
    regulation: "ERISA (29 USC  1001 et seq.)",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    agency: "DOL Employee Benefits Security Administration",
    agencyContact: "dol.gov/ebsa | 866-444-3272",
    requiredDocs: [
      "401(k) plan documents",
      "Fee disclosure statements (408(b)(2))",
      "Participant statements",
      "Investment fund prospectuses",
      "Service provider agreements"
    ],
    commonViolations: [
      "Excessive administrative fees",
      "Hidden investment fees",
      "Revenue sharing violations",
      "Failure to benchmark fees",
      "Inadequate fee disclosures"
    ]
  },
  
  "Auto Loan Audit": {
    description: "Review auto loan for rate markup, dealer reserve violations, and add-on product compliance",
    pricing: "$497",
    estimatedRefund: "$500 - $5,000",
    timeline: "30-45 days",
    regulation: "TILA, ECOA, State Lending Laws",
    agency: "CFPB, FTC, State AGs",
    agencyContact: "cfpb.gov/complaint",
    requiredDocs: [
      "Auto loan contract",
      "Truth in Lending disclosure",
      "Dealer invoice",
      "Credit application",
      "Payment history"
    ],
    commonViolations: [
      "Dealer markup violations",
      "Unnecessary add-on products",
      "GAP insurance overcharges",
      "Extended warranty violations",
      "Discriminatory pricing"
    ]
  },
  
  "Student Loan Overcharge Analysis": {
    description: "Audit federal and private student loans for servicing errors, payment misapplication, and forgiveness eligibility",
    pricing: "$697",
    estimatedRefund: "$2,000 - $50,000+",
    timeline: "45-60 days",
    regulation: "Higher Education Act, FCRA",
    agency: "FSA Ombudsman, CFPB",
    agencyContact: "studentaid.gov/feedback-ombudsman",
    requiredDocs: [
      "Student loan statements",
      "Promissory notes",
      "Payment history",
      "Loan servicer correspondence",
      "Employment certification (PSLF)"
    ],
    commonViolations: [
      "Payment misapplication",
      "PSLF qualifying payment errors",
      "Income-driven repayment miscalculations",
      "Forbearance steering",
      "Improper default procedures"
    ]
  },
  
  "Cybersecurity Compliance": {
    description: "Comprehensive cybersecurity audit for regulatory compliance and risk assessment",
    pricing: "$2,997",
    estimatedRefund: "Avoid fines: $5,000 - $5M+",
    timeline: "60-90 days",
    regulation: "NIST Cybersecurity Framework, State Laws",
    agency: "FTC, State AGs, Industry Regulators",
    agencyContact: "ftc.gov/cybersecurity",
    requiredDocs: [
      "Security policies and procedures",
      "Risk assessments",
      "Incident response plan",
      "Vendor security agreements",
      "Penetration test results",
      "Employee training records"
    ],
    commonViolations: [
      "Inadequate data encryption",
      "Missing incident response plan",
      "Weak access controls",
      "Insufficient employee training",
      "Vendor management failures"
    ]
  },
  
  "FDA Audit": {
    description: "FDA compliance audit for food, drug, and medical device manufacturers",
    pricing: "$3,997",
    estimatedRefund: "Avoid fines: $10,000 - $1M+",
    timeline: "60-120 days",
    regulation: "FDA 21 CFR, FDCA",
    agency: "FDA",
    agencyContact: "fda.gov | 888-INFO-FDA",
    requiredDocs: [
      "Product formulations",
      "Manufacturing records",
      "Quality control documentation",
      "Labeling and packaging",
      "Adverse event reports",
      "Supplier qualification records"
    ],
    commonViolations: [
      "Labeling violations",
      "CGMP failures",
      "Inadequate testing",
      "Recordkeeping deficiencies",
      "Misbranding"
    ]
  },
  
  "OSHA Certifications": {
    description: "OSHA workplace safety compliance audit and certification tracking",
    pricing: "$1,497",
    estimatedRefund: "Avoid fines: $7,000 - $136,532 per violation",
    timeline: "30-60 days",
    regulation: "OSHA 29 CFR",
    agency: "OSHA",
    agencyContact: "osha.gov | 800-321-6742",
    requiredDocs: [
      "Safety training records",
      "Incident logs (OSHA 300)",
      "Hazard assessments",
      "Equipment inspection records",
      "PPE documentation",
      "Safety Data Sheets (SDS)"
    ],
    commonViolations: [
      "Missing fall protection",
      "Inadequate hazard communication",
      "Respiratory protection failures",
      "Electrical safety violations",
      "Machine guarding deficiencies"
    ]
  },
  
  "SOC 2 Compliance": {
    description: "SOC 2 Type I/II audit readiness and compliance management for service organizations",
    pricing: "$4,997",
    estimatedRefund: "N/A - Audit readiness",
    timeline: "90-180 days",
    regulation: "AICPA SOC 2 Framework",
    agency: "AICPA",
    agencyContact: "aicpa.org",
    requiredDocs: [
      "System description",
      "Policies and procedures",
      "Risk assessments",
      "Control documentation",
      "Vendor assessments",
      "Monitoring reports"
    ],
    commonViolations: [
      "Inadequate access controls",
      "Missing change management",
      "Insufficient monitoring",
      "Incomplete vendor management",
      "Weak incident response"
    ]
  },
  
  "Carbon Trading Compliance": {
    description: "Carbon credit trading compliance and verification for emissions reduction programs",
    pricing: "$1,997",
    estimatedRefund: "N/A - Carbon credit value",
    timeline: "45-90 days",
    regulation: "State/Regional Cap-and-Trade Programs",
    agency: "EPA, State Environmental Agencies",
    agencyContact: "epa.gov/climatechange",
    requiredDocs: [
      "Emissions inventory",
      "Verification reports",
      "Carbon credit certificates",
      "Offset project documentation",
      "Compliance instruments"
    ],
    commonViolations: [
      "Inaccurate emissions reporting",
      "Missing verification",
      "Invalid offset projects",
      "Compliance deadline violations"
    ]
  },
  
  "LEED Compliance Tracker": {
    description: "LEED certification compliance management and documentation for green buildings",
    pricing: "$2,497",
    estimatedRefund: "N/A - Certification value",
    timeline: "60-180 days",
    regulation: "LEED v4.1 Standards",
    agency: "USGBC",
    agencyContact: "usgbc.org/leed",
    requiredDocs: [
      "Building design documents",
      "Energy modeling reports",
      "Material specifications",
      "Indoor air quality testing",
      "Water efficiency calculations",
      "Construction waste logs"
    ],
    commonViolations: [
      "Missing credit documentation",
      "Inadequate commissioning",
      "Material compliance failures",
      "Energy performance shortfalls"
    ]
  }
};

// Default service details for services not yet detailed
export const defaultDetails = (serviceName) => ({
  description: `Professional ${serviceName} service with comprehensive compliance review`,
  pricing: "Contact for quote",
  estimatedRefund: "Varies by case",
  timeline: "30-60 days",
  regulation: "Various applicable regulations",
  agency: "Multiple regulatory agencies",
  agencyContact: "Contact AuditDNA for details",
  requiredDocs: [
    "Relevant account statements",
    "Service agreements or contracts",
    "Payment history",
    "Correspondence with service provider"
  ],
  commonViolations: []
<<<<<<< HEAD
});
=======
});
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
