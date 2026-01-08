import React from "react";
import { Link, useLocation } from "react-router-dom";

// Demo avatar, replace with user image as needed
const avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/usda", label: "USDA Search" },
  { to: "/ag-market", label: "Marketplace" },
  { to: "/mortgages", label: "Mortgages" },
  { to: "/services", label: "Services" },
  { to: "/compliance", label: "Compliance" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#fff",
        boxShadow: "0 2px 12px #0001",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        height: 68,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontWeight: 900, fontSize: 28, color: "#17853b" }}>
          🧬 AuditDNA
        </span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              fontWeight: 700,
              fontSize: 16,
              color:
                location.pathname === link.to
                  ? "#17853b"
                  : "#222",
              textDecoration: "none",
              borderBottom:
                location.pathname === link.to
                  ? "2.5px solid #17853b"
                  : "2.5px solid transparent",
              padding: "8px 0",
              transition: "color 0.15s, border-bottom 0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
        <span
          title="Notifications"
          style={{
            fontSize: 22,
            color: "#17853b",
            marginLeft: 12,
            marginRight: 6,
            cursor: "pointer",
          }}
        >
          🛎️
        </span>
        <div
          style={{
            marginLeft: 16,
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #17853b",
            cursor: "pointer",
            boxShadow: "0 2px 8px #0001",
          }}
          title="Profile"
        >
          <img
            src={avatarUrl}
            alt="profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </nav>
  );
}