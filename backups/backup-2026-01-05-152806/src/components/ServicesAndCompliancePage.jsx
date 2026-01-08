<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

const services = [
  {
    name: "Mortgage & Real Estate",
    description:
      "Manage mortgage loans, real estate documents, and upload related files.",
    items: [
      {
        label: "Mortgage Documents",
        action: "Upload mortgage files and contracts.",
      },
      { label: "Property Appraisals", action: "Upload appraisal reports." },
    ],
  },
  // ... other services
];

export default function ServicesPage() {
  const [openIdx, setOpenIdx] = useState(null);

  const handleUpload = (service, item, e) => {
    alert(
      `Uploading ${item.label} for ${service.name}: ${e.target.files[0].name}`,
    );
  };

  return (
    <div style={{ minHeight: "80vh", background: "#f7f8fa", paddingTop: 40 }}>
      <h1
        style={{
          textAlign: "center",
          color: "#253858",
          fontWeight: 700,
          marginBottom: 32,
        }}
      >
        Audit & Compliance Services
      </h1>
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 16px #e4e7ec",
          padding: "2rem",
        }}
      >
        {services.map((service, idx) => (
          <div key={service.name} style={{ marginBottom: 16 }}>
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              style={{
                width: "100%",
                textAlign: "left",
                background: openIdx === idx ? "#e2eafc" : "#f0f4fb",
                border: "none",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "1.05rem",
                cursor: "pointer",
                marginBottom: 5,
              }}
            >
              {service.name}
            </button>
            {openIdx === idx && (
              <div
                style={{
                  padding: "11px 20px",
                  background: "#fff",
                  borderRadius: 8,
                  marginBottom: 7,
                }}
              >
                <div style={{ color: "#666", marginBottom: 10 }}>
                  {service.description}
                </div>
                <ul>
                  {service.items.map((item, j) => (
                    <li key={item.label} style={{ marginBottom: 8 }}>
<<<<<<< HEAD
                      <b>{item.label}</b>  {item.action}
                      <b>{item.label}</b>  {item.action}
=======
                      <b>{item.label}</b>  {item.action}
                      <b>{item.label}</b>  {item.action}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                      <br />
                      <input
                        type="file"
                        onChange={(e) => handleUpload(service, item, e)}
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
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

