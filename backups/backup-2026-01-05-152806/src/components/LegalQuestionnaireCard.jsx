/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const text = {
  english: {
    title: "Legal & Fideicomiso Questionnaire",
    subtitle: "Legal questions, fideicomisos, trusts, and property contracts.",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    questionType: "Type of Legal Question",
    question: "Describe your question (details)",
    uploadPhotos: "Upload Photos (optional)",
    uploadDocs: "Upload Legal Documents (optional)",
    submit: "Submit Legal Question",
    thankyou: "Thank you! Our legal team will contact you soon."
  },
  spanish: {
    title: "Cuestionario Legal y Fideicomiso",
    subtitle: "Preguntas legales, fideicomisos, trusts y contratos de propiedad.",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    email: "Correo Electr  
    phone: "N   de Tel  
    questionType: "Tipo de Pregunta Legal",
    question: "Describa su pregunta (detalles)",
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    submit: "Enviar Pregunta Legal",
    thankyou: " Nuestro equipo legal le contactar pronto."
    thankyou: "  Nuestro equipo legal le contactar   pronto."
  }
};

const QUESTION_TYPES = [
  { en: "Fideicomiso or Bank Trust", es: "Fideicomiso o Trust Bancario" },
  { en: "Purchase Contract", es: "Contrato de Compra" },
  { en: "Title/Deed Issues", es: "Problemas de T },
  { en: "Inheritance/Estate", es: "Herencia/Sucesi },
  { en: "Title/Deed Issues", es: "Problemas de T   },
  { en: "Inheritance/Estate", es: "Herencia/Sucesi   },
  { en: "Other", es: "Otro" }
];

export default function LegalQuestionnaireCard({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    questionType: "",
    question: ""
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
    <div className="bg-white rounded-xl shadow-xl border border-yellow-200 overflow-hidden mb-10">
      <div className="bg-gradient-to-r from-yellow-50 to-green-100 px-8 py-6">
        <h2 className="text-2xl font-bold text-yellow-900">{t.title}</h2>
        <p className="text-yellow-700 mt-1">{t.subtitle}</p>
      </div>
      {submitted ? (
        <div className="p-8">
          <div className="bg-yellow-50 text-yellow-700 font-semibold rounded-lg p-4 text-center">
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-yellow-300"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-yellow-300"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-yellow-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.questionType} *</label>
            <select
              name="questionType"
              value={form.questionType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-yellow-300"
            >
              <option value="">{language === "english" ? "Select question type" : "Seleccione tipo de pregunta"}</option>
              {QUESTION_TYPES.map((qt) => (
                <option key={qt.en} value={language === "english" ? qt.en : qt.es}>
                  {language === "english" ? qt.en : qt.es}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.question} *</label>
            <textarea
              name="question"
              value={form.question}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-yellow-300 min-h-[80px]"
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
            className="w-full bg-gradient-to-r from-yellow-200 to-green-100 text-yellow-900 py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            {t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

