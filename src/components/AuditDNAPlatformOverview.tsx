import React, { useState } from "react";

const platformData = {
  totalServices: 255,
  lastUpdated: "2025-01-15",
  platform: "12-Platform AI Technology",
  administrator: "Saul Garcia - COO & CEO",
  platformStatus: "ELITE",
  aiAccuracy: "99.7%",
  overallSuccessRate: "94.2%",
  activeCases: 247,
  totalRecovery: "$2,847,593",
  technology: "12-Platform AI Integration",
  partnerships: ["AgriMAXX", "Zadanin CRM", "SendGrid", "MongoDB"],
  complianceFrameworks: [
    "CFPB Regulations",
    "FINRA Rules",
    "RESPA Compliance",
    "TILA Standards",
    "GDPR Compliance",
    "HIPAA Requirements",
    "SOX Compliance",
    "Basel III Standards",
  ],
  legalFramework: {
    primaryRegulations: [
      "Consumer Financial Protection Bureau (CFPB)",
      "Truth in Lending Act (TILA)",
      "Real Estate Settlement Procedures Act (RESPA)",
      "Fair Credit Reporting Act (FCRA)",
      "Electronic Fund Transfer Act (EFTA)",
      "Fair Debt Collection Practices Act (FDCPA)",
      "Dodd-Frank Wall Street Reform Act",
      "Sarbanes-Oxley Act (SOX)",
      "Basel III International Banking Regulations",
      "GDPR Data Protection Regulation",
      "HIPAA Privacy and Security Rules",
    ],
    jurisdictions: [
      "Federal (United States)",
      "State-level (All 50 States)",
      "International (EU, Canada, Mexico)",
      "Industry-specific regulatory bodies",
    ],
  },
  technologyStack: {
    aiPlatforms: [
      "Document Classification AI",
      "OCR Processing Engine",
      "Legal Compliance AI",
      "Risk Assessment AI",
      "Pattern Recognition AI",
      "Natural Language Processing",
      "Predictive Analytics Engine",
      "Fraud Detection AI",
      "Regulatory Monitoring AI",
      "Automated Reporting AI",
      "Decision Support AI",
      "Quality Assurance AI",
    ],
    integrations: [
      "Soft Credit Pull APIs",
      "CFPB Complaint System",
      "Blockchain Audit Trail",
      "QR Code Tracking",
      "Multi-language Support",
      "Document Upload Verification",
      "Payment Processing Gateway",
      "CRM Integration (Zadanin)",
      "Email Automation (SendGrid)",
      "Database Management (MongoDB)",
    ],
  },
};

const serviceCategoriesData = [
  {
    key: "consumerProtectionServices",
    title: "Consumer Protection Services",
    icon: "🛡️",
    total: 39,
    description: "Individual & Family Financial Auditing",
  },
  {
    key: "eliteCommercialServices",
    title: "Elite Commercial & Business Services",
    icon: "🏢",
    total: 28,
    description: "Enterprise & Government Compliance",
  },
  {
    key: "eliteFinancialServices",
    title: "Elite Financial Regulations & Threshold Compliance",
    icon: "👑",
    total: 15,
    description: "Premium regulatory compliance and advanced audit services",
  },
  {
    key: "agricultureWaterServices",
    title: "Agriculture & Water Audit Services",
    icon: "🌾",
    total: 6,
    description: "AgriMAXX Technology Integration",
  },
  {
    key: "securitiesServices",
    title: "Securities & Investment Compliance",
    icon: "📈",
    total: 15,
    description: "Investment & Securities Monitoring",
  },
  {
    key: "healthcarePrivacyServices",
    title: "Healthcare & Privacy Compliance",
    icon: "🏥",
    total: 15,
    description: "Healthcare & Data Protection Services",
  },
  {
    key: "realEstateServices",
    title: "Real Estate & Construction Compliance",
    icon: "🏘️",
    total: 15,
    description: "Property & Construction Services",
  },
  {
    key: "environmentalServices",
    title: "Environmental & Safety Compliance",
    icon: "🌱",
    total: 21,
    description: "ESG Compliance & Environmental Monitoring",
  },
  {
    key: "taxServices",
    title: "International Tax & Compliance",
    icon: "💼",
    total: 15,
    description: "Global Tax Compliance Services",
  },
  {
    key: "insuranceServices",
    title: "Insurance & Employee Benefits",
    icon: "🛡️",
    total: 15,
    description: "Personal Insurance & Benefits Protection",
  },
  {
    key: "tradeServices",
    title: "International Trade & Sanctions",
    icon: "🌍",
    total: 15,
    description: "Global Business Compliance",
  },
  {
    key: "travelSecurityServices",
    title: "Travel & Global Security Compliance",
    icon: "✈️",
    total: 12,
    description: "International Travel & Security Services",
  },
  {
    key: "platformInfrastructureServices",
    title: "Platform Infrastructure & Technical Modules",
    icon: "🔧",
    total: 16,
    description: "Core Technical Systems & API Integrations",
  },
  {
    key: "administratorServices",
    title: "Administrator & Elite Management",
    icon: "⚙️",
    total: 8,
    description: "Platform Administration & Elite Services",
  },
];

export default function AuditDNAPlatformOverview() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          AuditDNA Platform Overview
        </h1>
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-xs text-slate-500">Total Services</div>
            <div className="text-2xl font-bold text-blue-800">
              {platformData.totalServices}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-xs text-slate-500">Active Cases</div>
            <div className="text-2xl font-bold text-blue-700">
              {platformData.activeCases}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-xs text-slate-500">Total Recovery</div>
            <div className="text-xl font-bold text-green-700">
              {platformData.totalRecovery}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-xs text-slate-500">Success Rate</div>
            <div className="text-2xl font-bold text-indigo-700">
              {platformData.overallSuccessRate}
            </div>
          </div>
        </div>
        {/* Platform Details */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-bold text-slate-800 mb-2">Platform:</div>
            <div className="mb-2">{platformData.platform}</div>
            <div className="font-bold text-slate-800 mb-2">Administrator:</div>
            <div className="mb-2">{platformData.administrator}</div>
            <div className="font-bold text-slate-800 mb-2">Status:</div>
            <div className="mb-2">{platformData.platformStatus}</div>
            <div className="font-bold text-slate-800 mb-2">AI Accuracy:</div>
            <div className="mb-2">{platformData.aiAccuracy}</div>
            <div className="font-bold text-slate-800 mb-2">Last Updated:</div>
            <div>{platformData.lastUpdated}</div>
          </div>
          <div>
            <div className="font-bold text-slate-800 mb-2">Partnerships:</div>
            <ul className="list-disc pl-6 mb-2 text-slate-700">
              {platformData.partnerships.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="font-bold text-slate-800 mb-2">
              Compliance Frameworks:
            </div>
            <ul className="list-disc pl-6 text-slate-700">
              {platformData.complianceFrameworks.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Legal & Tech */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-3">
              Legal Framework
            </h2>
            <div className="font-semibold text-slate-700 mb-2">
              Primary Regulations:
            </div>
            <ul className="list-disc pl-6 mb-2 text-slate-700">
              {platformData.legalFramework.primaryRegulations.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <div className="font-semibold text-slate-700 mb-2">
              Jurisdictions:
            </div>
            <ul className="list-disc pl-6 text-slate-700">
              {platformData.legalFramework.jurisdictions.map((j) => (
                <li key={j}>{j}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-3">
              Technology Stack
            </h2>
            <div className="font-semibold text-slate-700 mb-2">
              AI Platforms:
            </div>
            <ul className="list-disc pl-6 mb-2 text-slate-700">
              {platformData.technologyStack.aiPlatforms.map((ai) => (
                <li key={ai}>{ai}</li>
              ))}
            </ul>
            <div className="font-semibold text-slate-700 mb-2">
              Integrations:
            </div>
            <ul className="list-disc pl-6 text-slate-700">
              {platformData.technologyStack.integrations.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Service Category Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            Service Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategoriesData.map((cat) => (
              <div
                key={cat.key}
                className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg transition"
                onClick={() =>
                  setExpanded(expanded === cat.key ? null : cat.key)
                }
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="font-bold text-slate-800 text-lg">
                    {cat.title}
                  </span>
                  <span className="ml-auto bg-blue-100 text-blue-900 rounded-full px-3 py-1 text-xs font-semibold">
                    {cat.total}
                  </span>
                </div>
                <div className="text-slate-600 mb-2">{cat.description}</div>
                {expanded === cat.key && (
                  <div className="mt-3 text-slate-700 text-sm">
                    <em>
                      Click on a category in the app to view full service
                      details.
                    </em>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
