import React, { useState } from "react";

const text = {
  english: {
    title: "Request Appraisal Services",
    subtitle: "Order a certified property appraisal for Mexico or USA.",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    propertyAddress: "Property Address",
    propertyType: "Property Type",
    purpose: "Purpose of Appraisal",
    notes: "Additional Notes / Questions",
    uploadPhotos: "Upload Photos (optional)",
    uploadDocs: "Upload Legal Documents (optional)",
    submit: "Request Appraisal",
    thankyou: "Thank you! Our appraisal team will contact you with next steps."
  },
  spanish: {
    title: "Solicitar Servicios de Aval
    subtitle: "Solicite un aval certificado para propiedad en M o EE.UU.",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    propertyAddress: "Domicilio de la Propiedad",
    propertyType: "Tipo de Propiedad",
    purpose: "Prop del Aval
    notes: "Notas / Preguntas Adicionales",
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    submit: "Solicitar Aval
    thankyou: " Nuestro equipo de aval le contactar con los siguientes pasos."
    title: "Solicitar Servicios de Aval
    subtitle: "Solicite un aval certificado para propiedad en M o EE.UU.",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    propertyAddress: "Domicilio de la Propiedad",
    propertyType: "Tipo de Propiedad",
    purpose: "Prop del Aval
    notes: "Notas / Preguntas Adicionales",
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    submit: "Solicitar Aval
    thankyou: " Nuestro equipo de aval le contactar con los siguientes pasos."
  }
};

const PROPERTY_TYPES = [
  {en: "Residential", es: "Residencial"},
  {en: "Condo/Apartment", es: "Condominio/Apartamento"},
  {en: "Land/Lot", es: "Terreno/Lote"},
  {en: "Commercial", es: "Comercial"},
  {en: "Hotel/Resort", es: "Hotel/Resort"},
  {en: "Other", es: "Otro"}
];

const PURPOSES = [
  {en: "Purchase", es: "Compra"},
  {en: "Refinance", es: "Refinanciamiento"},
  {en: "Estate Planning", es: "Planificaci Patrimonial"},
  {en: "Estate Planning", es: "Planificaci Patrimonial"},
  {en: "Legal/Tax", es: "Legal/Impuestos"},
  {en: "Other", es: "Otro"}
];

export default function AppraisalServicesCard({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    purpose: "",
    notes: ""
  });
  const [photos, setPhotos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    <div className="bg-white rounded-xl shadow-xl border border-green-200 overflow-hidden mb-10">
      <div className="bg-gradient-to-r from-yellow-50 to-green-100 px-8 py-6">
        <h2 className="text-2xl font-bold text-green-900">{t.title}</h2>
        <p className="text-green-700 mt-1">{t.subtitle}</p>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.fullName} *</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.propertyAddress} *</label>
            <input
              type="text"
              name="propertyAddress"
              value={form.propertyAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.propertyType} *</label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            >
              <option value="">{language === "english" ? "Select property type" : "Seleccione tipo de propiedad"}</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type.en} value={language === "english" ? type.en : type.es}>
                  {language === "english" ? type.en : type.es}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.purpose} *</label>
            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            >
              <option value="">{language === "english" ? "Select purpose" : "Seleccione prop
              <option value="">{language === "english" ? "Select purpose" : "Seleccione prop
              {PURPOSES.map((purpose) => (
                <option key={purpose.en} value={language === "english" ? purpose.en : purpose.es}>
                  {language === "english" ? purpose.en : purpose.es}
                </option>
              ))}
            </select>
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
