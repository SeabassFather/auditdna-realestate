<<<<<<< HEAD
/* eslint-disable no-unused-vars */
=======
ï»¿/* eslint-disable no-unused-vars */
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import React, { useState } from 'react';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import ServiceDrawer from '../components/ServiceDrawer';
import { SERVICE_DETAILS, defaultDetails } from '../data/serviceDetails';

// COMPLETE AUDIT SERVICES DATABASE
const AUDIT_CATEGORIES = {
  "Consumer Financial Protection": {
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    color: "#3b82f6",
    description: "CFPB-regulated financial services audits",
    services: [
      {
        id: "CFP001",
        name: "Mortgage Loan Audit (TRID/RESPA/ECOA)",
        price: "$1,497",
        recovery: "Average recovery: $12,500",
        successRate: "94.2%",
        timeframe: "30-45 business days",
        description: "Complete mortgage compliance audit - TILA-RESPA violations, fee discrepancies, ECOA discrimination"
      },
      {
        id: "CFP002",
        name: "Escrow Account Audit",
        price: "$897",
        recovery: "Average recovery: $3,200",
        successRate: "91.7%",
        timeframe: "21-30 business days",
        description: "Escrow shortage analysis, cushion violations, shortage notice compliance"
      },
      {
        id: "CFP003",
        name: "Credit Card Compliance Audit",
        price: "$747",
        recovery: "Average recovery: $2,890",
        successRate: "85.9%",
        timeframe: "21-30 business days",
        description: "CARD Act violations, improper rate increases, fee compliance"
      },
      {
        id: "CFP004",
        name: "Banking NSF/Overdraft Fee Audit",
        price: "$597",
        recovery: "Average recovery: $1,850",
        successRate: "88.3%",
        timeframe: "14-21 business days",
        description: "NSF fee analysis, overdraft consent compliance, duplicate charge detection"
      },
      {
        id: "CFP005",
        name: "Auto Loan Compliance Audit",
        price: "$1,297",
        recovery: "Average recovery: $8,750",
        successRate: "89.7%",
        timeframe: "35-45 business days",
        description: "Auto financing TILA compliance, rate markup analysis, add-on product verification"
      },
      {
        id: "CFP006",
        name: "Student Loan Federal Compliance Audit",
        price: "$997",
        recovery: "Average recovery: $5,600",
        successRate: "90.1%",
        timeframe: "30-45 business days",
        description: "Federal student loan servicer compliance, payment misapplication, forgiveness eligibility"
      }
    ]
  },
  "Retirement & Investment Audits": {
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    color: "#10b981",
    description: "401k, IRA, and investment account fee audits",
    services: [
      {
        id: "RIA001",
        name: "401(k) Hidden Fee Audit",
        price: "$1,197",
        recovery: "Average recovery: $7,200",
        successRate: "92.4%",
        timeframe: "30-45 business days",
        description: "ERISA compliance, hidden administrative fees, fiduciary breach analysis"
      },
      {
        id: "RIA002",
        name: "Roth IRA Compliance Audit",
        price: "$897",
        recovery: "Average recovery: $4,100",
        successRate: "87.6%",
        timeframe: "21-30 business days",
        description: "Contribution limit violations, early withdrawal penalty analysis, custodian fee review"
      }
    ]
  },
  "Healthcare & Medical Billing": {
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    color: "#ef4444",
    description: "Medical billing code audits (ICD-11/12)",
    services: [
      {
        id: "MED001",
        name: "Medical Billing Code Audit (ICD-11/12)",
        price: "$897",
        recovery: "Average recovery: $5,300",
        successRate: "93.1%",
        timeframe: "21-35 business days",
        description: "ICD-11/12 billing code verification, upcoding detection, duplicate charge analysis"
      },
      {
        id: "MED002",
        name: "Medical Bill Overcharge Review",
        price: "$697",
        recovery: "Average recovery: $3,800",
        successRate: "89.5%",
        timeframe: "21-30 business days",
        description: "Comprehensive medical billing audit for overcharges, coding errors, and insurance claim discrepancies"
      }
    ]
  },
  "Business & Commercial Audits": {
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    color: "#06b6d4",
    description: "Business loans, factoring, P.O. financing",
    services: [
      {
        id: "BUS001",
        name: "Business Loan Audit (Mexico/USA)",
        price: "$1,897",
        recovery: "Average recovery: $15,200",
        successRate: "91.3%",
        timeframe: "45-60 business days",
        description: "Cross-border business loan compliance, SBA loan audit, factoring agreement review"
      }
    ]
  },
  "Utilities & Consumer Services": {
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    color: "#f59e0b",
    description: "Utility bills, telecom, subscription services",
    services: [
      {
        id: "UTL001",
        name: "Utilities Audit (Gas/Water/Electric)",
        price: "$397",
        recovery: "Average recovery: $1,500",
        successRate: "86.2%",
        timeframe: "21-30 business days",
        description: "Audit utility bills for rate errors, meter reading mistakes, and unauthorized charges"
      },
      {
        id: "UTL002",
        name: "Internet & Cell Phone Overcharges",
        price: "$297",
        recovery: "Average recovery: $890",
        successRate: "82.7%",
        timeframe: "14-21 business days",
        description: "Telecom billing audit for hidden fees, incorrect rates, and service violations"
      }
    ]
  },
  "Agriculture & Trade": {
<<<<<<< HEAD
    icon: "
    icon: "
=======
    icon: "
    icon: "
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    color: "#22c55e",
    description: "USDA, customs, trade compliance",
    services: [
      {
        id: "AGR001",
        name: "USDA Weekly Pricing (W1-W26)",
        price: "$299/month",
        recovery: "Market intelligence value",
        successRate: "N/A",
        timeframe: "Real-time",
        description: "Real-time commodity pricing data across all 26 weekly USDA reports"
      },
      {
        id: "AGR002",
<<<<<<< HEAD
        name: "Mexico Grower   U.S. Buyer Matching",
        name: "Mexico Grower   U.S. Buyer Matching",
=======
        name: "Mexico Grower   U.S. Buyer Matching",
        name: "Mexico Grower   U.S. Buyer Matching",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
        price: "$499/match",
        recovery: "Trade facilitation",
        successRate: "N/A",
        timeframe: "7-14 business days",
        description: "Connect certified Mexican growers with U.S. buyers"
      },
      {
        id: "AGR003",
        name: "GlobalGAP Certification Audit",
        price: "$799/audit",
        recovery: "Compliance certification",
        successRate: "N/A",
        timeframe: "30-45 business days",
        description: "Full GlobalGAP compliance audit and certification support"
      }
    ]
  }
};

function ServiceCard({ service, category, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(service, category)} 
      className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{service.name}</h3>
        <span className="text-xl font-bold text-blue-600">{service.price}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
      <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
        <TrendingUp size={16} />
        <span className="font-semibold">{service.successRate} success | {service.recovery}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
<<<<<<< HEAD
        <span> {service.timeframe}</span>
        <span className="text-blue-600 font-semibold group-hover:underline">Request Audit  
        <span> {service.timeframe}</span>
        <span className="text-blue-600 font-semibold group-hover:underline">Request Audit  
=======
        <span> {service.timeframe}</span>
        <span className="text-blue-600 font-semibold group-hover:underline">Request Audit  
        <span> {service.timeframe}</span>
        <span className="text-blue-600 font-semibold group-hover:underline">Request Audit  
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
      </div>
    </div>
  );
}

export default function Services() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleServiceSelect = (service, category) => {
    setSelectedService(service);
    setSelectedCategory(category);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setSelectedService(null);
      setSelectedCategory(null);
    }, 300);
  };

  // Get service details from serviceDetails.js or use defaults
  const getServiceDetails = (serviceName) => {
    return SERVICE_DETAILS[serviceName] || defaultDetails(serviceName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            AuditDNA <span className="text-blue-600">Professional Services</span>
          </h1>
          <p className="text-xl text-gray-600">Comprehensive auditing & compliance services - 300+ services across all industries</p>
          <div className="mt-6 flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
<<<<<<< HEAD
              <span className="text-2xl">
              <span className="font-semibold">90%+ Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
              <span className="font-semibold">$2.5K - $15K Avg Recovery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
              <span className="text-2xl">
              <span className="font-semibold">90%+ Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
              <span className="font-semibold">$2.5K - $15K Avg Recovery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
=======
              <span className="text-2xl">
              <span className="font-semibold">90%+ Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
              <span className="font-semibold">$2.5K - $15K Avg Recovery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
              <span className="text-2xl">
              <span className="font-semibold">90%+ Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
              <span className="font-semibold">$2.5K - $15K Avg Recovery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              <span className="font-semibold">30-45 Day Turnaround</span>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="space-y-6">
          {Object.entries(AUDIT_CATEGORIES).map(([categoryKey, category], idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
              <button 
                onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)} 
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors" 
                style={{ borderLeft: `6px solid ${category.color}` }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-4xl">{category.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{categoryKey}</h2>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">
                    {category.services.length} Services
                  </div>
                </div>
                {expandedCategory === idx ? (
                  <ChevronUp className="w-6 h-6 text-gray-400 ml-4" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 ml-4" />
                )}
              </button>
              
              {expandedCategory === idx && (
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 border-t border-gray-200">
                  {category.services.map((service, idx2) => (
                    <ServiceCard 
                      key={idx2} 
                      service={service} 
                      category={categoryKey} 
                      onSelect={() => handleServiceSelect(service, categoryKey)} 
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Service?</h2>
          <p className="text-xl mb-6 opacity-90">We offer 300+ auditing and compliance services across all industries</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Contact Us for Custom Audits
          </button>
        </div>
      </div>

      {/* Service Drawer Modal */}
      {selectedService && (
        <ServiceDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          service={selectedService.name}
          category={selectedCategory}
          details={getServiceDetails(selectedService.name)}
        />
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

