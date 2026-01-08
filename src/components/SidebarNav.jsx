<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function SidebarNav({ active, setActive }) {
  const items = [
    { key: "services", label: "Audit & Compliance Services" },
    { key: "agreements", label: "Required Agreements" },
    { key: "compliance", label: "Regulatory Compliance" },
    { key: "market", label: "Market Tickers" },
    // Add more as needed
  ];
  return (
    <nav
      style={{
        width: 240,
        background: "#181b23",
        color: "#fff",
        minHeight: "85vh",
        borderRadius: "14px",
        boxShadow: "0 2px 14px #e4e7ec",
        padding: "1.5rem 0.8rem",
        marginRight: "36px",
      }}
    >
      <h2
        style={{
          fontSize: "1.3rem",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#fff",
        }}
      >
        AuditDNA
      </h2>
      {items.map((item) => (
        <button
          key={item.key}
          style={{
            width: "93%",
            padding: "0.85rem 0.7rem",
            margin: "0.35rem auto",
            background: active === item.key ? "#243262" : "#22253d",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "1.05rem",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => setActive(item.key)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

