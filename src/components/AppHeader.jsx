<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { NavLink, Link } from "react-router-dom";
const linkClass = ({ isActive }) =>
  "px-3 py-2 rounded-xl border text-sm font-medium mx-1 " +
  (isActive ? "bg-blue-100 text-blue-900" : "hover:bg-blue-50 text-blue-700");

export default function AppHeader() {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e4e7ec",
        padding: "0.5rem 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: 22,
            color: "#253858",
            marginRight: 24,
          }}
        >
          AuditDNA
        </Link>
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>
          <NavLink to="/mortgage" className={linkClass}>
            Mortgage
          </NavLink>
          <NavLink to="/trade-finance" className={linkClass}>
            Trade Finance
          </NavLink>
          <NavLink to="/ag-market" className={linkClass}>
            Ag Marketplace
          </NavLink>
          <NavLink to="/tickers" className={linkClass}>
            Tickers
          </NavLink>
          <NavLink to="/agreements" className={linkClass}>
            Agreements
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/compliance" className={linkClass}>
            Compliance
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

