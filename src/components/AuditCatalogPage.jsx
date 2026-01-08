<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

// Example: import your catalog data here or pass as prop
// import catalogData from "../data/servicesExpanded.json";

// Sample prop data structure (array of categories with services and subsections)
const catalogData = [
  {
    category: "Corporate & Financial Audits",
    services: [
      {
        service: "Financial Statement Audit",
        subsections: [
          "Internal Control Walkthroughs",
          "Expense vs Revenue Matching",
          "Fraud Risk Matrix",
          "Materiality Threshold Testing",
          "Balance Sheet Reconciliation",
          "Asset Valuation Consistency"
        ]
      }
      // ...more services
    ]
  }
  // ...more categories
];

export default function AuditCatalogPage({ data = catalogData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-slate-100 py-10 px-2 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 drop-shadow mb-2 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 20h20L12 2z"/></svg>
          AuditDNA Master Audit & Compliance Catalog
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          <span className="font-semibold text-blue-700">Explore</span> all categories, services, and subsections. Select any subsection to launch a full audit workflow.
        </p>
        <div className="space-y-6">
          {data.map((cat, i) => (
            <div
              key={cat.category + i}
              className="rounded-2xl border border-blue-200 bg-white/70 backdrop-blur-lg shadow-xl transition hover:shadow-2xl"
            >
              <div className="px-6 py-4 bg-gradient-to-r from-blue-500/80 via-blue-400/80 to-blue-300/70 rounded-t-2xl flex items-center gap-2">
                <span className="font-bold text-xl text-white drop-shadow-sm">
                  {cat.category}
                </span>
                <span className="ml-2 text-xs text-blue-100 bg-blue-900/40 px-2 py-0.5 rounded">
                  {cat.services?.length || 0} services
                </span>
              </div>
              <div className="p-6 space-y-5">
                {(cat.services || []).map((svc, j) => (
                  <div
                    key={svc.service + j}
                    className="mb-3"
                  >
                    <div className="font-semibold text-blue-700 text-lg mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                      {svc.service}
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {(svc.subsections || []).map((ss, k) => (
                        <button
                          key={ss + k}
                          className="w-full text-left px-4 py-2 rounded-lg border border-blue-200 bg-gradient-to-r from-slate-100 via-blue-50 to-slate-50 hover:from-blue-400 hover:to-cyan-300 hover:text-white font-medium shadow-sm transition-all duration-200 hover:scale-[1.03] focus:outline-none"
                        >
                          {ss}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

