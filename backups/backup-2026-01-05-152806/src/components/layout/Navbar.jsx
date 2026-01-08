import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppMode } from "../../context/AppModeContext";

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-xl text-sm ${active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { mode, setMode } = useAppMode();
  return (
    <div className="sticky top-0 z-40">
      <div className="glass">
        <nav className="container-w py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600"></div>
            <div className="font-bold text-lg tracking-tight">AuditDNA</div>
          </div>
          <div className="flex-1"></div>
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/market/prices">USDA Pricing</NavLink>
            <NavLink to="/files">Files</NavLink>
            <NavLink to="/docusign">DocuSign</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <span className="badge">Mode</span>
            <button
              onClick={() => setMode(mode === "demo" ? "live" : "demo")}
              className={`btn ${mode === "live" ? "bg-green-600/70 border-green-400/40" : "bg-slate-900/80"}`}
              title="Toggle Demo/Live data"
            >
              {mode.toUpperCase()}
            </button>
          </div>
        </nav>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
}

