<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

const tickers = [
  { name: "Corn", value: "$4.85/bu", updated: "2025-08-22" },
  { name: "Soybeans", value: "$12.20/bu", updated: "2025-08-22" },
  { name: "Wheat", value: "$6.45/bu", updated: "2025-08-22" },
];

export default function TickersSection() {
  return (
    <div
      style={{
        marginTop: 40,
        padding: "1.5rem",
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 10px #e4e7ec",
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ color: "#253858", marginBottom: 16 }}>Market Tickers</h2>
      <ul>
        {tickers.map((t) => (
          <li key={t.name} style={{ marginBottom: 8, fontWeight: 500 }}>
            {t.name}: <span style={{ color: "#243262" }}>{t.value}</span>{" "}
            <small style={{ color: "#888" }}>({t.updated})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

