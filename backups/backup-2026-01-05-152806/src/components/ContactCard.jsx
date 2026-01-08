<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

/**
 * Enhanced ContactCard: Module Access Request
 * Last updated: 2025-10-14 22:37 UTC
 *
 * Usage: <ContactCard moduleName="Dashboard" language="english" />
 * Props:
 *   - moduleName: string (required), e.g. "Dashboard", "AdminPanel"
 *   - language: "english" | "spanish"
 * 
 * Submits to /api/module-access-request (implement this endpoint in your backend).
 * After submission, shows Pending Approval.
 */

const text = {
  english: {
    title: "Request Access",
    subtitle: "Access to this module requires approval.",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    company: "Company (Optional)",
    reason: "Reason for Access",
    submit: "Request Access",
    pending: "Your access request is pending approval by the administrator. You will receive an email or SMS once approved.",
    error: "An error occurred. Please try again or contact support."
  },
  spanish: {
    title: "Solicitar acceso",
<<<<<<< HEAD
    subtitle: "El acceso a este m requiere aprobaci
    fullName: "Nombre completo",
    email: "Correo electr
    phone: "Tel
    company: "Empresa (Opcional)",
    reason: "Motivo de acceso",
    submit: "Solicitar acceso",
    pending: "Su solicitud de acceso est pendiente de aprobaci por el administrador. Recibir un correo electr o SMS una vez aprobado.",
    error: "Ocurri un error. Int de nuevo o contacte soporte."
    subtitle: "El acceso a este m requiere aprobaci
    fullName: "Nombre completo",
    email: "Correo electr
    phone: "Tel
    company: "Empresa (Opcional)",
    reason: "Motivo de acceso",
    submit: "Solicitar acceso",
    pending: "Su solicitud de acceso est pendiente de aprobaci por el administrador. Recibir un correo electr o SMS una vez aprobado.",
    error: "Ocurri un error. Int de nuevo o contacte soporte."
=======
    subtitle: "El acceso a este m requiere aprobaci
    fullName: "Nombre completo",
    email: "Correo electr
    phone: "Tel
    company: "Empresa (Opcional)",
    reason: "Motivo de acceso",
    submit: "Solicitar acceso",
    pending: "Su solicitud de acceso est pendiente de aprobaci por el administrador. Recibir un correo electr o SMS una vez aprobado.",
    error: "Ocurri un error. Int de nuevo o contacte soporte."
    subtitle: "El acceso a este m  requiere aprobaci 
    fullName: "Nombre completo",
    email: "Correo electr 
    phone: "Tel 
    company: "Empresa (Opcional)",
    reason: "Motivo de acceso",
    submit: "Solicitar acceso",
    pending: "Su solicitud de acceso est  pendiente de aprobaci  por el administrador. Recibir  un correo electr  o SMS una vez aprobado.",
    error: "Ocurri  un error. Int  de nuevo o contacte soporte."
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  }
};

export default function ContactCard({ moduleName = "Dashboard", language = "english" }) {
  const t = text[language] || text.english;
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    reason: ""
  });
  const [status, setStatus] = useState("form"); // "form" | "pending" | "error"

  // Handle form input
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Submit to real backend API
  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("pending");
    try {
      const res = await fetch("/api/module-access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          module: moduleName
        })
      });
      if (!res.ok) throw new Error("Request failed");
      // Success: show pending
      setStatus("pending");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-10 mt-10 max-w-xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">{t.title}</h2>
        <p className="text-purple-100 mt-1">{t.subtitle} <span className="font-bold">{moduleName}</span></p>
      </div>
      {status === "form" && (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.fullName} *</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.email} *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.phone} *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.company}</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.reason} *</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[80px]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            {t.submit}
          </button>
        </form>
      )}
      {status === "pending" && (
        <div className="p-8">
          <div className="bg-yellow-50 text-yellow-800 font-semibold rounded-lg p-4 text-center">
            {t.pending}
            <br />
            <span className="text-xs text-gray-400 block mt-2">Module: {moduleName}</span>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="p-8">
          <div className="bg-red-50 text-red-700 font-semibold rounded-lg p-4 text-center">
            {t.error}
          </div>
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

