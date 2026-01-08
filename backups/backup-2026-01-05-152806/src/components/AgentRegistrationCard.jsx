import React, { useState } from "react";

// --- AGENT REGISTRATION CARD (BILINGUAL) ---
const text = {
  english: {
    title: "Agent Registration",
    subtitle: "Join AuditDNA Elite Real Estate Platform",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    agency: "Agency Name",
    terms: "By registering, you agree to comply with all platform terms and conditions, including the 50/50 commission split agreement on all transactions. You certify that all information provided is accurate and that you have the authority to list properties on behalf of property owners.",
    submit: "Complete Registration",
    thankyou: "Thank you! You are now registered."
  },
  spanish: {
    title: "Registro de Agente",
    subtitle: " a la Plataforma Elite de Bienes Ra AuditDNA",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    agency: "Nombre de la Agencia",
    terms: "Al registrarse, acepta cumplir con todos los t y condiciones de la plataforma, incluido el acuerdo de divisi de comisi 50/50 en todas las transacciones. Certifica que toda la informaci proporcionada es precisa y que tiene la autoridad para listar propiedades en nombre de los propietarios.",
    submit: "Completar Registro",
    thankyou: " Ahora est registrado."
    subtitle: " a la Plataforma Elite de Bienes Ra AuditDNA",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    agency: "Nombre de la Agencia",
    terms: "Al registrarse, acepta cumplir con todos los t y condiciones de la plataforma, incluido el acuerdo de divisi de comisi 50/50 en todas las transacciones. Certifica que toda la informaci proporcionada es precisa y que tiene la autoridad para listar propiedades en nombre de los propietarios.",
    submit: "Completar Registro",
    thankyou: " Ahora est registrado."
  }
};

function AgentRegistrationCard({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    agency: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-10 mt-10">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">{t.title}</h2>
        <p className="text-purple-100 mt-1">{t.subtitle}</p>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.agency} *</label>
            <input
              type="text"
              name="agency"
              value={form.agency}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">{t.terms}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            {t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

export default AgentRegistrationCard;

