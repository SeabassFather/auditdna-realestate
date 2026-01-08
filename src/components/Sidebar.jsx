<<<<<<< HEAD
import React, { useMemo, useState } from "react";
=======
ï»¿import React, { useMemo, useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { NavLink, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/serviceData";
import { slugify } from "../utils/slugify";

export default function Sidebar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(
    () =>
      new Set([
        "consumer",
        "mortgage",
        "agri",
        "legal",
        "insurance",
        "medical",
        "biz",
        "elite",
      ]),
  );
  const nav = useNavigate();

  const filtered = useMemo(() => {
    if (!q) return CATEGORIES;
    const t = q.toLowerCase();
    return CATEGORIES.map((c) => ({
      ...c,
      services: c.services.filter(
        (s) =>
          s.name.toLowerCase().includes(t) ||
          (s.desc || "").toLowerCase().includes(t),
      ),
    })).filter((c) => c.services.length > 0);
  }, [q]);

  return (
    <aside className="sidebar">
      <div className="brand" onClick={() => nav("/")}>
        AuditDNA
      </div>
      <div className="search">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search services"
        />
      </div>

      {/* Elite quick access */}
      <nav className="navcol">
        <NavLink
          to="/elite"
          className={({ isActive }) =>
            isActive ? "nav item active" : "nav item"
          }
        >
          Elite Suite
        </NavLink>
        <NavLink
          to="/mortgage-search"
          className={({ isActive }) =>
            isActive ? "nav item active" : "nav item"
          }
        >
          Mortgage Search
        </NavLink>
        <NavLink
          to="/ag-market"
          className={({ isActive }) =>
            isActive ? "nav item active" : "nav item"
          }
        >
          Ag Marketplace
        </NavLink>
        <NavLink
          to="/trade-finance"
          className={({ isActive }) =>
            isActive ? "nav item active" : "nav item"
          }
        >
          Factoring & PO Finance
        </NavLink>
        <NavLink
          to="/usda-organic"
          className={({ isActive }) =>
            isActive ? "nav item active" : "nav item"
          }
        >
          USDA/FDA/Organic
        </NavLink>
        <NavLink
          to="/water-tech"
          className={({ isActive }) =>
            isActive ? "nav item active" : "nav item"
          }
        >
          Water Tech Uploads
        </NavLink>
        <NavLink
          to="/tickers"
          className={({ isActive }) =>
            isActive ? "nav item active" : "nav item"
          }
        >
          Live Tickers
        </NavLink>
      </nav>

      <nav className="navcol">
        {filtered.map((cat) => {
          const isOpen = open.has(cat.key);
          const s = slugify(cat.title);
          return (
            <div key={cat.key} className="cat">
              <button
                className="cat-head"
                onClick={() => {
                  const n = new Set(open);
                  n.has(cat.key) ? n.delete(cat.key) : n.add(cat.key);
                  setOpen(n);
                }}
                onDoubleClick={() => nav(`/cat/${s}`)}
              >
                <span>{cat.title}</span>
                <span className="count">{cat.services.length}</span>
              </button>
              {isOpen && (
                <div className="cat-list">
                  {cat.services.map((svc) => (
                    <NavLink
                      key={svc.id}
                      to={`/service/${svc.id}`}
                      className={({ isActive }) =>
                        isActive ? "nav item active" : "nav item"
                      }
                    >
                      {svc.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

