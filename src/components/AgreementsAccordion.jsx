<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

const agreements = [
  "Grower KYB Consent",
  "Buyer Verification Consent",
  "PO Financing T&Cs",
  "Factoring Agreement",
  "UCC Consent",
  "Data Privacy Notices",
  "Import/Logistics Consent",
];

export default function AgreementsAccordion() {
  const [open, setOpen] = useState(true);

  const handleUpload = (item, e) => {
    alert(`Uploaded for ${item}: ${e.target.files[0].name}`);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: "#253858" }}>
        Required Agreements
      </h2>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          background: open ? "#e2eafc" : "#f0f4fb",
          border: "none",
          padding: "0.85rem 1.2rem",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: "1.08rem",
          cursor: "pointer",
          marginBottom: 5,
        }}
      >
        Agreements List
      </button>
      {open && (
        <div
          style={{
            background: "#fff",
            borderRadius: 7,
            padding: "0.9rem 1rem",
            marginBottom: 7,
          }}
        >
          <ul>
            {agreements.map((item, i) => (
              <li key={i} style={{ marginBottom: 12 }}>
                <span style={{ fontWeight: 500, color: "#333" }}>{item}</span>
                <br />
                <input
                  type="file"
                  onChange={(e) => handleUpload(item, e)}
                  style={{ marginTop: 5 }}
                />
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 10 }}>
            PDF Viewer:{" "}
            <a href="#" style={{ color: "#253858" }}>
              View Sample Agreement
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

