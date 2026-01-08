<<<<<<< HEAD
// src/data/servicesData.js
=======
﻿// src/data/servicesData.js
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

import { AGRICULTURE_SERVICES } from './services/agricultureServices';
import { MORTGAGE_SERVICES } from './services/mortgageServices';
import { FACTORING_SERVICES } from './services/factoringServices';

// Import all other service category arrays (to be created)
// import { LEGAL_SERVICES } from './services/legalServices';
// import { EDUCATION_SERVICES } from './services/educationServices';
// etc...

const SERVICE_CATEGORIES_BASE = [
  {
    id: "agriculture",
    title: "Agriculture & Food Systems",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Comprehensive agricultural and trade compliance services",
    items: AGRICULTURE_SERVICES
  },
  {
    id: "mortgage",
    title: "Mortgage & Real Estate",
<<<<<<< HEAD
    icon: " ",
    icon: " ",
=======
    icon: " ",
    icon: " ",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Complete mortgage fraud detection and real estate services",
    items: MORTGAGE_SERVICES
  },
  {
    id: "factoring",
    title: "Finance & Factoring",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Invoice factoring and trade finance solutions",
    items: FACTORING_SERVICES
  },
  {
    id: "legal",
    title: "Legal & Compliance",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Legal compliance and regulatory services",
    items: [
      "Contracts & Templates",
      "E-Signature (DocuSign)",
      "IP Audit",
      "Privacy Compliance (GDPR, CCPA, GLBA, PDPA, PIPEDA)",
      "Global Ethics Dashboard",
      "Employment Law Tracker",
      "NDA Generator",
      "Corporate Governance Briefing",
      "Tax Compliance (IRS/State)",
      "Whistleblower Reporting",
      "SOX Compliance",
      "AML/KYC Verification",
      "FCPA Audit",
      "Cross-Border Contract Audit",
      "Data Retention Policies",
      "Cybersecurity Laws",
      "HR Compliance",
      "Insurance Law Audit",
      "Litigation Tracker",
      "Patent Verification",
      "GDPR Compliance Assessment",
      "CCPA/CPRA Audit",
      "AML Program Review",
      "BSA Compliance Audit",
      "OFAC Sanctions Screening",
      "SOC 2 Compliance",
      "Contract Review"
    ]
  },
  {
    id: "education",
    title: "Education & Workforce",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Education and workforce training compliance",
    items: [
      "Student Report Card Upload",
      "Attendance & Progress Tracker",
      "Teacher Audit Dashboard",
      "Workforce Training Compliance",
      "OSHA Certifications",
      "Continuing Education Credits",
      "Professional Licensing Renewal",
      "Internship & Apprenticeship Tracker",
      "Curriculum Compliance",
      "Grant Auditing",
      "FERPA Compliance",
      "Accreditation Audit",
      "University Financial Aid Verification",
      "Scholarship Compliance",
      "Credential Verification",
      "Exam Proctoring Audit",
      "Academic Misconduct Tracker",
      "Special Education Compliance",
      "Faculty Contract Verification",
      "Union Labor Compliance"
    ]
  },
  {
    id: "eco",
    title: "Eco & Sustainability",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Environmental compliance and sustainability services",
    items: [
      "Carbon Footprint Calculator",
      "Green Building Certifications",
      "LEED Compliance Tracker",
      "Renewable Energy Incentives",
      "Water Tech Marketplace",
      "Waste Management Audit",
      "Circular Economy Module",
      "Biodiversity Credits",
      "ESG Score Dashboard",
      "Solar Subsidy Verification",
      "Carbon Trading Compliance",
      "Recycling Audits",
      "Plastic Reduction Compliance",
      "Ocean Impact Reporting",
      "Sustainable Sourcing",
      "Forest Management Compliance",
      "Climate Reporting Audit",
      "Energy Grid Compliance",
      "Sustainability Bonds Verification",
      "Eco Labeling Compliance"
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare & Insurance",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Healthcare compliance and insurance services",
    items: [
      "Medical Compliance (HIPAA)",
      "Insurance Policy Tracker",
      "Claims Audit Engine",
      "Provider Licensing",
      "Pharma Supply Chain Audit",
      "Wellness Incentives",
      "Telehealth Compliance",
      "FDA Audit",
      "Medicare/Medicaid Compliance",
      "Insurance Fraud Detection",
      "Patient Consent Verification",
      "Hospital Accreditation Audit",
      "Clinical Trial Compliance",
      "Drug Pricing Transparency",
      "Insurance Licensing",
      "Healthcare Cybersecurity",
      "Electronic Health Record Audit",
      "Billing Compliance",
      "Worker Comp Audit",
      "Cross-Border Insurance Compliance"
    ]
  },
  {
    id: "trade",
    title: "Global Trade & Logistics",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "International trade and logistics compliance",
    items: [
      "Tariff Tracker",
      "Customs Compliance",
      "Import/Export Licensing",
      "Bill of Lading Upload",
      "Port Authority Audit",
      "Logistics Insurance",
      "Freight Forwarder Directory",
      "Trade Zone Compliance",
      "NAFTA/USMCA Audit",
      "Supply Chain Security",
      "Shipping Emissions Tracker",
      "Maritime Law Compliance",
      "Air Cargo Compliance",
      "Truck Safety Audits",
      "Warehouse Certification",
      "Bonded Warehouse Audit",
      "Hazmat Compliance",
      "Cross-Border VAT Audit",
      "Incoterms Verification",
      "International Sanctions Compliance"
    ]
  },
  {
    id: "technology",
    title: "Technology & Data",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Technology compliance and cybersecurity services",
    items: [
      "Cybersecurity Compliance",
      "Data Breach Response",
      "AI Audit",
      "Cloud Vendor Compliance",
      "Open Banking API Tracker",
      "IoT Sensor Integration (Ag/Water/Energy)",
      "Blockchain Audit",
      "IT Licensing Compliance",
      "Software Supply Chain Audit",
      "SOC 2 Compliance",
      "PCI DSS Compliance",
      "ISO Certification Tracker",
      "Bug Bounty Audit",
      "Data Residency Compliance",
      "Digital Identity Verification",
      "Smart Contract Verification",
      "Penetration Test Tracker",
      "Encryption Standards Compliance",
      "Network Infrastructure Audit",
      "Disaster Recovery Verification"
    ]
  },
  {
    id: "consumer",
    title: "Consumer & Retail",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Consumer protection and retail compliance",
    items: [
      "Product Recall Tracker",
      "Consumer Finance Compliance",
      "Retail Audit",
      "Supply Chain Transparency",
      "E-Commerce Compliance",
      "Advertising Standards Audit",
      "Food Labeling Verification",
      "Child Safety Compliance",
      "Consumer Warranty Audit",
      "Fair Trade Certification",
      "CSR Reporting",
      "ISO Retail Standards",
      "Retail Lease Compliance",
      "Point-of-Sale Security",
      "Merchandise Import Compliance",
      "Franchise Agreement Verification",
      "Online Privacy Compliance",
      "Retail Safety Audit",
      "Return Policy Compliance",
      "Consumer Complaint Tracker",
      "Auto Loan Audit",
      "Student Loan Overcharge Analysis",
      "Credit Card Rate/Fee Compliance",
      "Subscription Fee Audit",
      "Medical Bill Overcharge Review",
      "Utilities Audit (Gas/Water/Electric)",
      "Internet & Cell Phone Overcharges",
      "Insurance Premium Refunds",
      "401(k) Fee Audit",
      "Elder Financial Abuse Scan",
      "CFPB Complaint Filing"
    ]
  },
  {
    id: "payroll",
    title: "Payroll & Employment",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Payroll and employment compliance services",
    items: [
      "Payroll Tax Compliance Tracker",
      "401(k) Plan Compliance Audit",
      "ERISA Plan Compliance Tracker",
      "Unemployment Insurance Audit Logs",
      "Independent Contractor Audit Engine",
      "Minimum Wage Compliance Module",
      "Overtime Law Audit Tracker",
      "Multi-State Payroll Licensing Audit",
      "Global Payroll Compliance Engine",
      "Cross-Border Employment Compliance",
      "Union Contract Compliance Tracker",
      "Workplace Discrimination Audit Logs",
      "Wage Garnishment Compliance Audit",
      "Family Leave/Disability Law Tracker",
      "Immigration/Visa Work Compliance Logs",
      "Payroll Escrow Compliance Engine",
      "Pay Transparency Audit",
      "Worker Classification AI Engine",
      "Child Labor Law Audit Tracker",
      "Pension Fund Compliance Module",
      "Collective Bargaining Agreement Audit",
      "Labor Strike Compliance Logs",
      "Employee Data Privacy Audit",
      "Whistleblower Employment Law Tracker",
      "Global HR Compliance Dashboard"
    ]
  },
  {
    id: "insurance",
    title: "Insurance",
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    description: "Insurance compliance and audit services",
    items: [
      "Life Insurance Compliance Tracker",
      "Auto Insurance State Law Audit",
      "Crop Insurance Claim Audits",
      "Property/Casualty Insurance Audit Logs",
      "Health Insurance Disclosure Tracker",
      "Workers' Comp Compliance Audit",
      "Reinsurance Audit Module",
      "Insurance Broker Licensing Audit",
      "Underwriting Fairness Audit",
      "Title Insurance Compliance Tracker",
      "Insurance Claim Fraud Detection AI",
      "Captive Insurance Compliance Engine",
      "Cyber Insurance Risk Dashboard",
      "Insurance Policy Factoring Audit",
      "Actuarial Risk Audit Logs",
      "Insurance Escrow Licensing Audit",
      "Insurance Data Privacy Audit",
      "InsurTech Regulatory Tracker",
      "Multi-Country Insurance Compliance",
      "Cross-Border Claim Audit Engine",
      "FEMA/NFIP Flood Insurance Compliance",
      "Health Plan ERISA Audit Logs",
      "Medicare/Medicaid Compliance Audit",
      "Auto Claim Subrogation Tracker",
      "State Insurance Commissioner Licensing Logs"
    ]
  }
];

function ensureAtLeast275(categories) {
  const MIN = 275;
  const count = categories.reduce((n, c) => n + c.items.length, 0);
  if (count >= MIN) return categories;

  const need = MIN - count;
  let i = 1;
  const round = categories;
  while (i <= need) {
    const c = round[(i - 1) % round.length];
    c.items.push(`Reserved Slot ${String(i).padStart(3, "0")} (Coming Soon)`);
    i++;
  }
  return categories;
}

export const SERVICE_CATEGORIES = ensureAtLeast275(
  SERVICE_CATEGORIES_BASE.map((c) => ({ ...c, items: [...c.items] }))
<<<<<<< HEAD
);
=======
);
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
