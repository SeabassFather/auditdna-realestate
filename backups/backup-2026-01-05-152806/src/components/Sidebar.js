<<<<<<< HEAD
import React from 'react';
=======
﻿import React from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { X } from 'lucide-react';

const serviceCategories = {
  'Business & Finance': ['Corporate Tax Audits', 'Financial Statement Compliance', 'Business Continuity Audits', 'Payroll Audits', '401k / Retirement Plan Audits', 'Loan Underwriting Verification', 'Ag Factoring Compliance', 'Escrow & Settlement Audits', 'Mexico Cross-Border Mortgage Audits', 'Real Estate Valuation & Risk Checks', 'Startup Capital Audits', 'Consumer Lending Risk Scoring', 'Investment Fund Audits', 'AML / Anti-Fraud Checks', 'Insurance Premium Audits'],
  'Legal & Compliance': ['TRID Compliance Audits', 'ECOA / Fair Lending Audits', 'GLBA / Data Privacy Audits', 'GDPR / UK GDPR Audits', 'CCPA / CPRA California Compliance', 'PIPEDA / Canada Compliance', 'PDPA / Singapore Data Compliance', 'HIPAA / Health Data Security Audits', 'Cross-Border Trade Compliance', 'Corporate Governance Audits', 'Litigation Readiness Reviews', 'Attorney & CPA Audit Bundles', 'Licensing Verification Services', 'Contract Compliance Audits', 'Regulatory Briefing Kit Packaging'],
  'Agriculture & Food': ['USDA Quick Stats API Pricing Graphs', 'NASS Data Analysis', 'Produce Pricing Reports', 'Water & Soil Lab Compliance Uploads', 'Agri-Maxx Water Conditioning Reports', 'Fertilizer & Pesticide Compliance Audits', 'Farm-to-Market Logistics Risk Checks', 'Mexico Grower Factoring Module', 'Cold Chain Transport Audits', 'GlobalGAP Certification Audits', 'Organic Certification Audits', 'Livestock Traceability Compliance', 'Food Safety Modernization Act Audits', 'Commodity Futures Risk Tracking', 'Import/Export Documentation Audits'],
  'Eco & Sustainability': ['Eco-Housing Audits', 'Green Mortgage Lending Compliance', 'Solar Panel Installation Certification', 'Carbon Credit Trading Audits', 'WaterTech Search Engine', 'Sustainable Agriculture Risk Models', 'EcoConscious Business Certification', 'LEED Building Compliance', 'Renewable Energy Risk Assessments', 'Waste & Recycling Audits', 'ESG Corporate Audits', 'Global Climate Risk Audits', 'Environmental Impact Reports', 'Eco Label Verification Audits', 'Circular Economy Compliance'],
  'Education': ['Student Report Card Audit Engine', 'Teacher Credential Verification', 'Federal Education Grants Compliance', 'University Accreditation Audits', 'Student Loan Repayment Audits', 'Private School Risk Assessments', 'Scholarship Compliance Checks', 'Digital Learning Platform Security', 'Parent Transparency Reports', 'Cross-Border Education Accreditation', 'Education Insurance Audits', 'Workforce Training Program Audits', 'Online Exam Proctoring Audits', 'Attendance & Records Verification', 'K-12 Performance Benchmarking'],
  'Medical & Healthcare': ['HIPAA Audits & Risk Scoring', 'Medicare/Medi-Cal Fraud Audits', 'Medical Insurance Claim Audits', 'Telemedicine Compliance', 'FDA Regulatory Compliance', 'Prescription Drug Audits', 'Hospital Operational Audits', 'Nursing Facility Risk Audits', 'Clinical Trial Compliance Audits', 'Cross-Border Medical Practice Checks', 'Medical Device Certification', 'Healthcare Data Security Reports', 'Patient Consent Compliance', 'Emergency Preparedness Audits', 'Global Health Accreditation'],
  'Travel & Consumer': ['Airline Safety Compliance Audits', 'Hotel & Hospitality Risk Audits', 'Eco-Tourism Certification', 'Travel Insurance Claim Audits', 'Consumer Protection Compliance', 'Warranty Audits', 'Subscription & Membership Risk Checks', 'Digital Commerce Risk Audits', 'Fair Pricing Audits', 'Tourism Tax & Regulation Audits', 'Cross-Border Travel Documentation Checks', 'Rental Car Insurance Audits', 'Cruise Line Safety Audits', 'Vacation Property Risk Checks', 'Consumer Rights Verification'],
  'Mortgage & Real Estate': ['Mortgage Loan Audit', 'Escrow Fee Reconciliation', 'Escrow Account Analysis', 'Title Insurance Audit', 'Property Tax Assessment Review', 'Homeowners Insurance Premium Audit', 'PMI Removal Analysis', 'Promissory Note Audit', 'Servicing Audit', 'TRID Compliance Review', 'QM/ATR Documentation Review', 'Appraisal Independence Review', 'FHA Loan File Review', 'VA Loan Compliance Audit', 'HMDA Data Integrity Review'],
  'Trade Finance & Factoring': ['Invoice Verification Audit', 'UCC Filing Compliance', 'Debtor Credit Analysis', 'Advance Rate Optimization', 'Collections Process Audit', 'Trade Finance Documentation Review', 'Export Credit Insurance Audit', 'Letter of Credit Compliance'],
  'Water & Utilities Tech': ['Water Quality Testing Analysis', 'pH Level Monitoring', 'TDS Measurement Compliance', 'Water Conditioning Reports', 'EPA Compliance Audits', 'Utility Rate Audits', 'Smart Meter Verification', 'Water Conservation Audits', 'Municipal Water System Audits']
};

export default function Sidebar({ sidebarOpen, setSidebarOpen, expandedCategory, setExpandedCategory, selectedService, setSelectedService }) {
  if (!sidebarOpen) return null;

  return (
    <div style={{ position: 'fixed', left: 0, top: 0, width: '320px', height: '100vh', background: 'linear-gradient(135deg, #f0f4f8 0%, #e1e8ed 100%)', borderRight: '2px solid #bbdefb', overflowY: 'auto', padding: '24px', zIndex: 1000, boxShadow: '4px 0 12px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: '#1a365d', fontSize: '20px', fontWeight: '700' }}>Services</h2>
        <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="#2d3748" /></button>
      </div>
      {Object.entries(serviceCategories).map(([cat, svcs]) => (
        <div key={cat} style={{ marginBottom: '12px' }}>
          <button onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)} style={{ width: '100%', padding: '14px 18px', background: expandedCategory === cat ? 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)' : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', color: expandedCategory === cat ? '#fff' : '#1a365d', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', textAlign: 'left', boxShadow: expandedCategory === cat ? '0 4px 12px rgba(66,165,245,0.3)' : '0 2px 6px rgba(0,0,0,0.06)' }}>{cat}</button>
          {expandedCategory === cat && (
            <div style={{ marginTop: '8px', marginLeft: '8px' }}>
              {svcs.map((svc, i) => (
                <button key={i} onClick={() => setSelectedService(svc)} style={{ width: '100%', padding: '12px 16px', background: selectedService === svc ? 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)' : '#fff', color: '#2d3748', border: '1px solid #e0e0e0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', textAlign: 'left', marginBottom: '6px', boxShadow: selectedService === svc ? '0 2px 8px rgba(76,175,80,0.2)' : 'none' }} onMouseEnter={(e) => { if (selectedService !== svc) e.target.style.background = 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)'; }} onMouseLeave={(e) => { if (selectedService !== svc) e.target.style.background = '#fff'; }}>{svc}</button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
