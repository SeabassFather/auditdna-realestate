<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

const services = [
  {
    name: "Core Infrastructure",
    children: [
      "Authentication & Authorization",
      "Database & Data Layer",
      "Document Management",
    ],
  },
  {
    name: "AI & Automation",
    children: [
<<<<<<< HEAD
      "Audit Chain (OCR   AI Validation   Rules Engine)",
      "Audit Chain (OCR   AI Validation   Rules Engine)",
=======
      "Audit Chain (OCR   AI Validation   Rules Engine)",
      "Audit Chain (OCR   AI Validation   Rules Engine)",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
      "Automated Letter Generation",
      "Notifications",
    ],
  },
  {
    name: "Regulatory Compliance Audits",
    children: [
      "Financial (Mortgages, Utilities, Insurance, Credit)",
      "Legal (Contract Audits, CFPB Complaints, UCC)",
      "Food & Agriculture (FDA, USDA, Organic, HACCP)",
      "Environmental & Travel (Carbon, ESG, Pollution Reporting)",
    ],
  },
  {
    name: "Professional Services & IP",
    children: [
      "Patent Strategy & Portfolio Management",
      "Attorney Tools",
      "CPA/Tax Tools",
    ],
  },
  {
    name: "Expansion Modules",
    children: [
      "Healthcare Audits",
      "Education Audits",
      "Government & Military",
      "Crowdsourced Witnessing",
      "Financial Wellness Coaching",
      "Medical Test Audit",
    ],
  },
  {
    name: "Investor & Partner Portal",
    children: [
      "Pledge Intake Form & API",
      "Tokenized Equity",
      "Dashboard (Charts, Exports)",
    ],
  },
];

export default function ServicesComplianceAccordion() {
  const [openIdx, setOpenIdx] = useState(null);

  const handleUpload = (cat, sub, e) => {
    alert(`Uploaded for ${cat.name} - ${sub}: ${e.target.files[0].name}`);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: "#253858" }}>
        Services & Compliance
      </h2>
      {services.map((cat, idx) => (
        <div key={cat.name} style={{ marginBottom: 16 }}>
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            style={{
              width: "100%",
              textAlign: "left",
              background: openIdx === idx ? "#e2eafc" : "#f0f4fb",
              border: "none",
              padding: "0.85rem 1.2rem",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "1.08rem",
              cursor: "pointer",
              marginBottom: 5,
            }}
          >
            {cat.name}
          </button>
          {openIdx === idx && (
            <div
              style={{
                background: "#fff",
                borderRadius: 7,
                padding: "0.9rem 1rem",
                marginBottom: 7,
              }}
            >
              <ul>
                {cat.children.map((sub, j) => (
                  <li key={j} style={{ marginBottom: 12 }}>
                    <span style={{ fontWeight: 500, color: "#333" }}>
                      {sub}
                    </span>
                    <br />
                    <input
                      type="file"
                      onChange={(e) => handleUpload(cat, sub, e)}
                      style={{ marginTop: 5 }}
                    />
                  </li>
                ))}
              </ul>
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

