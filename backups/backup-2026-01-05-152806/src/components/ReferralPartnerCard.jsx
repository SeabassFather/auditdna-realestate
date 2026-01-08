/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const text = {
  english: {
    title: "Referral Partner Registration",
    subtitle: "Partner with AuditDNA for Mexico Loans & Real Estate",
    org: "Organization Name",
    contact: "Contact Name",
    email: "Email Address",
    phone: "Phone Number",
    role: "Partner Type",
    dealVolume: "Deals/Referrals per Year",
    regions: "Regions Covered",
    coBrand: "Interested in Co-Branding?",
    uploadPhotos: "Upload Photos (optional)",
    uploadDocs: "Upload Legal Documents (optional)",
    uploadLogo: "Upload Org Logo (optional)",
    notes: "Additional Notes / Comments",
    submit: "Register as Partner",
    thankyou: "Thank you! Our partnerships team will contact you."
  },
  spanish: {
    title: "Registro de Socio de Referencia",
    subtitle: "As con AuditDNA para Pr y Bienes Ra en M
    org: "Nombre de la Organizaci
    contact: "Nombre del Contacto",
    email: "Correo Electr
    phone: "N de Tel
    role: "Tipo de Socio",
    dealVolume: "Referencias/Negocios por A
    regions: "Regiones Cubiertas",
    coBrand: " en Co-Branding?",
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    uploadLogo: "Subir Logo de la Organizaci (opcional)",
    notes: "Notas / Comentarios Adicionales",
    submit: "Registrarse como Socio",
    thankyou: " Nuestro equipo de alianzas le contactar
    subtitle: "As   con AuditDNA para Pr   y Bienes Ra   en M  
    org: "Nombre de la Organizaci  
    contact: "Nombre del Contacto",
    email: "Correo Electr  
    phone: "N   de Tel  
    role: "Tipo de Socio",
    dealVolume: "Referencias/Negocios por A  
    regions: "Regiones Cubiertas",
    coBrand: "  en Co-Branding?",
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    uploadLogo: "Subir Logo de la Organizaci   (opcional)",
    notes: "Notas / Comentarios Adicionales",
    submit: "Registrarse como Socio",
    thankyou: "  Nuestro equipo de alianzas le contactar  
  }
};

const ROLES = [
  { en: "Broker", es: "Corredor" },
  { en: "Bank/Lender", es: "Banco/Prestamista" },
  { en: "Real Estate Team", es: "Equipo Inmobiliario" },
  { en: "Builder/Developer", es: "Constructor/Desarrollador" },
  { en: "Attorney", es: "Abogado" },
  { en: "Other", es: "Otro" }
];

function ReferralPartnerCard({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({
    org: "",
    contact: "",
    email: "",
    phone: "",
    role: "",
    dealVolume: "",
    regions: "",
    coBrand: false,
    logo: null,
    notes: ""
  });
  const [photos, setPhotos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file" && name === "logo") {
      setForm((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleDocChange = (e) => {
    setDocs(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-10">
      <div className="bg-gradient-to-r from-yellow-50 to-green-100 px-8 py-6 flex items-center">
        <svg className="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></svg>
        <div>
          <h2 className="text-2xl font-bold text-green-900">{t.title}</h2>
          <p className="text-green-700 mt-1">{t.subtitle}</p>
        </div>
      </div>
      {submitted ? (
        <div className="p-8">
          <div className="bg-green-50 text-green-700 font-semibold rounded-lg p-4 text-center">
            {t.thankyou}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.org} *</label>
            <input
              type="text"
              name="org"
              value={form.org}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contact} *</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.email} *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.phone} *</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.role} *</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            >
              <option value="">{language === "english" ? "Select partner type" : "Seleccione tipo de socio"}</option>
              {ROLES.map(r => (
                <option key={r.en} value={language === "english" ? r.en : r.es}>
                  {language === "english" ? r.en : r.es}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.dealVolume}</label>
            <input
              type="number"
              name="dealVolume"
              value={form.dealVolume}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.regions}</label>
            <input
              type="text"
              name="regions"
              value={form.regions}
              onChange={handleChange}
              placeholder={language === "english" ? "Baja, CDMX, Quintana Roo" : "Baja, CDMX, Quintana Roo"}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <input
                type="checkbox"
                name="coBrand"
                checked={form.coBrand}
                onChange={handleChange}
                className="accent-green-500"
              />
              {t.coBrand}
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.uploadLogo}</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.notes}</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300 min-h-[60px]"
            />
          </div>
          {/* Upload photos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.uploadPhotos}</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="w-full"
            />
          </div>
          {/* Upload legal docs */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.uploadDocs}</label>
            <input
              type="file"
              name="docs"
              accept="application/pdf,image/*"
              multiple
              onChange={handleDocChange}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-yellow-200 text-gray-900 py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            {t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

export default ReferralPartnerCard;

