<<<<<<< HEAD
import React, { useMemo, useState } from "react";
=======
ï»¿import React, { useMemo, useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { SERVICE_CATEGORIES } from "../data/servicesData";
import { SERVICE_DETAILS, defaultDetails } from "../data/serviceDetails";
import ServiceDrawer from "./ServiceDrawer";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slug";

function AccordionItem({ title, count, isOpen, onToggle, children }) {
  return (
    <div className="bg-white/80 rounded-xl shadow-sm border border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-xl"
      >
        <div className="font-semibold">{title}</div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
            {count}
          </span>
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </button>
      {isOpen && <div className="px-4 pb-3">{children}</div>}
    </div>
  );
}

export default function ServicesAccordion() {
  const [openSet, setOpenSet] = useState(new Set());
  const [q, setQ] = useState("");
  const [drawer, setDrawer] = useState({
    open: false,
    service: null,
    category: null,
  });
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return SERVICE_CATEGORIES;
    return SERVICE_CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter((s) => s.toLowerCase().includes(term)),
    })).filter((c) => c.items.length > 0);
  }, [q]);

  const openAll = () => setOpenSet(new Set(filtered.map((c) => c.id)));
  const closeAll = () => setOpenSet(new Set());
  const toggle = (id) =>
    setOpenSet((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const total = filtered.reduce((n, c) => n + c.items.length, 0);

  const onSelectService = (service, categoryTitle) =>
    setDrawer({ open: true, service, category: categoryTitle });
  const onStart = (slug, serviceName) => {
    setDrawer({ open: false, service: null, category: null });
    navigate(/start/, { state: { serviceName } });
  };

  const activeDetails = drawer.service
    ? SERVICE_DETAILS[drawer.service] || defaultDetails(drawer.service)
    : null;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Services</h1>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 flex-1 border rounded-xl px-3 py-2 bg-white">
          <Search size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search 275+ services"
            className="outline-none w-full"
          />
        </div>
        <button
          onClick={openAll}
          className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:brightness-95"
        >
          Open all
        </button>
        <button
          onClick={closeAll}
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Close all
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Showing <span className="font-medium">{total}</span> services across{" "}
        {filtered.length} categories
      </div>

      <div className="space-y-3">
        {filtered.map((cat) => (
          <AccordionItem
            key={cat.id}
            title={cat.title}
            count={cat.items.length}
            isOpen={openSet.has(cat.id)}
            onToggle={() => toggle(cat.id)}
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.items.map((s, i) => (
                <li
                  key={i}
                  className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onSelectService(s, cat.title)}
                >
                  {s}
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </div>

      <ServiceDrawer
        open={drawer.open}
        onClose={() =>
          setDrawer({ open: false, service: null, category: null })
        }
        service={drawer.service}
        category={drawer.category}
        details={activeDetails || {}}
        onStart={onStart}
      />
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

