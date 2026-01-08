<<<<<<< HEAD
// AuditDNA services master list (grouped for the accordion UI).
//  You can freely add/edit services below; the UI adjusts automatically.
//  You can freely add/edit services below; the UI adjusts automatically.
=======
﻿// AuditDNA services master list (grouped for the accordion UI).
//  You can freely add/edit services below; the UI adjusts automatically.
//  You can freely add/edit services below; the UI adjusts automatically.
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

import {
  Home,
  Shield,
  Building,
  Activity,
  BarChart3,
  Settings,
  Users,
  FileText,
  Globe,
  DollarSign,
  TrendingUp,
  Target,
  Crown,
  Bell,
  Lock,
  CreditCard,
  GraduationCap,
  Zap,
  Wifi,
  Heart,
  Briefcase,
  Flag,
  MapPin,
  Award,
  Leaf,
  Scale,
  CheckCircle,
  Database,
} from "lucide-react";

const cat = (id, title, icon, items) => ({ id, title, icon, items });

<<<<<<< HEAD
//  Primary categories (many real modules from our backlog/memory) 
//  Primary categories (many real modules from our backlog/memory) 
=======
//  Primary categories (many real modules from our backlog/memory) 
//  Primary categories (many real modules from our backlog/memory) 
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
export const SERVICE_CATEGORIES_BASE = [
  cat("mortgage", "Mortgage & Real Estate", Building, [
    "Mortgage Loan Audit",
    "Promissory Note Audit",
    "Escrow Fee Reconciliation",
    "TRID Compliance Review",
    "ECOA/Fair Lending Audit",
    "Appraisal Dispute & Rebuttal Helper",
    "Title/Lien Report Intake",
    "HOA Dues & Special Assessment Auditor",
    "Property Tax Overpayment Review",
    "REO/Short Sale Compliance Kit",
    "HELOC/2nd Mortgage Discovery",
    "DSCR Investor Loan Analyzer",
    "ARM/Rate Change Accuracy Check",
    "Servicing Transfer Error Review",
    "Forced-Placed Insurance Refunds",
  ]),

  cat("trade", "Trade Finance", DollarSign, [
<<<<<<< HEAD
    "Cross-Border Factoring (MX
    "Cross-Border Factoring (MX 
=======
    "Cross-Border Factoring (MX 
    "Cross-Border Factoring (MX 
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    "PO Financing Intake",
    "Invoice Factoring Eligibility",
    "AR Aging & Risk Flags",
    "SBA 7(a) & 504 Eligibility Screener",
    "UCC Filing Monitor",
    "KYC/KYB Pack (Docs Collector)",
    "FX & Remittance Ledger",
    "Logistics/BL Match & Verify",
    "Export Credit Insurance Prep",
  ]),

  cat("ag_market", "Ag Marketplace", Leaf, [
    "Commodity Catalog (USDA codes)",
    "Grower Onboarding (KYC/KYB/GlobalG.A.P.)",
    "Quality & Grade Intake",
    "Lot/Shipment Traceability",
    "Market Bid/Ask Board",
    "Buyer Matchmaking",
    "Cold-Chain Checklist",
    "Receiver Claim/Allowance Tracker",
    "PACA Notice Helper",
    "Labeling & Country-of-Origin Audit",
  ]),

  cat("regulatory", "Regulatory Compliance", Shield, [
    "CCPA/GDPR/GLBA Readiness",
    "AML / OFAC Checks (attest/record only)",
    "Record Retention Matrix",
    "Consent & Disclosures Hub",
    "Do-Not-Call / TCPA Audit",
    "Accessibility (WCAG) Checklist",
    "Complaint Handling (CFPB/AG) Log",
    "Vendor Risk Register",
    "Incident & Breach Triage Log",
    "Privacy Request (DSAR) Workflow",
  ]),

  cat("audit", "Audit & Reconciliation", Activity, [
    "Utilities Overcharge Review",
    "Internet & Mobile Plan Audit",
    "Subscription/App Fee Audit",
    "Insurance Premium Refunds",
    "Bank Fee & NSF Review",
    "Payment Processor Fee Audit",
    "Chargeback/Dispute Prep",
    "Unclaimed Property Search",
    "Wage Garnishment Review",
  ]),

  cat("consulting", "Consulting", Briefcase, [
    "Operational Diagnostic",
    "Process Mapping",
    "Policy & SOP Drafting",
    "Internal Controls Design",
    "Training & Playbooks",
    "Change-Management Plan",
  ]),

  cat("risk", "Risk Assessment", Target, [
    "Enterprise Risk Register",
    "Risk Heatmap",
    "Mitigation Plans",
    "Third-Party Risk",
    "Model/Algorithm Risk Notes",
  ]),

  cat("lending", "Custom Lending Solutions", CreditCard, [
    "Refi/Cash-Out Matcher",
    "Purchase Scenario Builder",
    "Second Mortgage/HELOC Finder",
    "Bridge & Construction Loan Finder",
    "Hard Money/Private Lender Intake",
  ]),

  cat("tickers", "Market Tickers", TrendingUp, [
<<<<<<< HEAD
    "USDA Weekly Price Graphs (W1
    "USDA Weekly Price Graphs (W1
=======
    "USDA Weekly Price Graphs (W1
    "USDA Weekly Price Graphs (W1
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    "Freight/Cold-Chain Index",
    "FX Watch (MXN/USD/EUR)",
    "Commodities Snapshot",
  ]),

  cat("agreements", "Required Agreements", FileText, [
    "NDA (Mutual/One-Way)",
    "MSA + SOW",
    "Service Licensing Agreement",
    "Data Processing Addendum",
    "Consent & Disclosures Pack",
  ]),

  cat("water", "Water & Soil Tech", DropletIcon(), [
    "Agri-Maxx Water Quality Intake (pH/EC/TDS)",
    "Soil Lab Results Capture",
    "Irrigation Audit",
    "Filter/Cartridge Maintenance Log",
    "Nutrient Blend Calculator",
  ]),

  cat("eco", "Environmental & EcoConscious", Leaf, [
<<<<<<< HEAD
    "CO Notes",
    "CO Notes",
=======
    "CO Notes",
    "CO Notes",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    "Energy Efficiency Checklist",
    "Green Housing Audit",
    "Waste & Recycling Tracker",
    "ESG Snapshot",
  ]),

  cat("education", "Education & Workforce", GraduationCap, [
    "Training Enrollment",
    "Course Completions",
    "Certification Vault",
    "Safety/OSHA Briefings",
  ]),

  cat("data", "Data & Analytics", Database, [
    "Dashboards & KPIs",
    "Export/CSV Builder",
    "API Keys (read-only stubs)",
    "Report Scheduler",
  ]),
];

// little water drop icon (lucide has Droplet; alias here to avoid extra imports if needed)
function DropletIcon() {
  return Zap;
}

<<<<<<< HEAD
//  Filler: auto-extend to at least 275 services 
// We duplicate small labeled  Slot) items across categories
//  Filler: auto-extend to at least 275 services 
// We duplicate small labeled  Slot) items across categories
=======
//  Filler: auto-extend to at least 275 services 
// We duplicate small labeled  Slot) items across categories
//  Filler: auto-extend to at least 275 services 
// We duplicate small labeled  Slot) items across categories
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
// so the UI shows 275+ immediately. Replace these with real modules anytime.

function ensureAtLeast275(categories) {
  const MIN = 275;
  const count = categories.reduce((n, c) => n + c.items.length, 0);
  if (count >= MIN) return categories;

  const needed = MIN - count;
  let i = 1;
  const round = [...categories];
  while (i <= needed) {
    const c = round[(i - 1) % round.length];
    c.items.push(`Reserved Slot ${String(i).padStart(3, "0")} (Coming Soon)`);
    i++;
  }
  return categories;
}

export const SERVICE_CATEGORIES = ensureAtLeast275(
  SERVICE_CATEGORIES_BASE.map((c) => ({ ...c, items: [...c.items] })),
);
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
