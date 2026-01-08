<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

// ---- MEXICO REFI CARD ----
const PROPERTY_TYPES = [
  "Residential Home",
  "Condo/Apartment",
  "Land/Lot",
  "New Construction",
  "Beachfront Property",
  "Commercial Property"
];

const text = {
  english: {
    // Agent Registration
    title: "Agent Registration",
    subtitle: "Join AuditDNA Elite Real Estate Platform",
    alertTitle: "Registration Required Before Upload",
    alertText: "All fields are mandatory. You must complete this registration before you can upload properties to the platform. Your information will be verified before approval.",
    formTitle: "Agent Qualification Form",
    formSubtitle: "Please provide accurate information",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    agency: "Agency Name",
    terms: "By registering, you agree to comply with all platform terms and conditions, including the 50/50 commission split agreement on all transactions. You certify that all information provided is accurate and that you have the authority to list properties on behalf of property owners.",
    submit: "Complete Registration",
    questions: "Questions about registration?",
    contact: "Contact: support@auditdna.com",
    required: "is required",
    invalidEmail: "Email is invalid",
    invalidPhone: "Phone number is invalid",
    // Refi
    refiTitle: "Mexico Home Refinance / Buy in Mexico (US Citizens Only)",
    refiSubtitle: "Strictly for US Citizens seeking to refinance or buy a home in Mexico. Minimum loan: $385,000 USD. Down payment required: 35-45%. Other restrictions apply.",
    propertyType: "Property Type",
    address: "Property Address in Mexico",
    downPayment: "Down Payment (%)",
    loanAmount: "Desired Loan Amount (USD)",
    notes: "Additional Notes / Questions",
    refiSubmit: "Submit Refinance/Financing Request",
    refiThankyou: "Thank you! Our financing team will contact you for next steps.",
    invalidLoan: "Minimum loan amount is $385,000 USD",
    invalidDown: "Down payment must be between 35% and 45%",
    requiredField: "is required"
  },
  spanish: {
    // Agent Registration
    title: "Registro de Agente",
<<<<<<< HEAD
    subtitle: " a la Plataforma Elite de Bienes Ra AuditDNA",
    alertTitle: "Registro Requerido Antes de Subir Propiedades",
    alertText: "Todos los campos son obligatorios. Debe completar este registro antes de poder subir propiedades a la plataforma. Su informaci ser verificada antes de la aprobaci
    formTitle: "Formulario de Calificaci de Agente",
    formSubtitle: "Por favor proporcione informaci precisa",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    agency: "Nombre de la Agencia",
    terms: "Al registrarse, acepta cumplir con todos los t y condiciones de la plataforma, incluido el acuerdo de divisi de comisi 50/50 en todas las transacciones. Certifica que toda la informaci proporcionada es precisa y que tiene la autoridad para listar propiedades en nombre de los propietarios.",
    submit: "Completar Registro",
    questions: " sobre el registro?",
    contact: "Contacto: support@auditdna.com",
    required: "es requerido",
    invalidEmail: "El correo electr no es v
    invalidPhone: "El n de tel no es v
    // Refi
    refiTitle: "Refinanciamiento / Compra en M (Solo Ciudadanos USA)",
    refiSubtitle: "Exclusivo para ciudadanos estadounidenses que buscan refinanciar o comprar casa en M Pr m $385,000 USD. Anticipo requerido: 35-45%. Aplican otras restricciones.",
    propertyType: "Tipo de Propiedad",
    address: "Direcci de la Propiedad en M
    downPayment: "Anticipo (%)",
    loanAmount: "Monto de Pr Deseado (USD)",
    notes: "Notas Adicionales / Preguntas",
    refiSubmit: "Enviar Solicitud de Cr
    refiThankyou: " Nuestro equipo de cr se comunicar para los siguientes pasos.",
    invalidLoan: "El monto m de pr es $385,000 USD",
    subtitle: " a la Plataforma Elite de Bienes Ra AuditDNA",
    alertTitle: "Registro Requerido Antes de Subir Propiedades",
    alertText: "Todos los campos son obligatorios. Debe completar este registro antes de poder subir propiedades a la plataforma. Su informaci ser verificada antes de la aprobaci
    formTitle: "Formulario de Calificaci de Agente",
    formSubtitle: "Por favor proporcione informaci precisa",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    agency: "Nombre de la Agencia",
    terms: "Al registrarse, acepta cumplir con todos los t y condiciones de la plataforma, incluido el acuerdo de divisi de comisi 50/50 en todas las transacciones. Certifica que toda la informaci proporcionada es precisa y que tiene la autoridad para listar propiedades en nombre de los propietarios.",
    submit: "Completar Registro",
    questions: " sobre el registro?",
    contact: "Contacto: support@auditdna.com",
    required: "es requerido",
    invalidEmail: "El correo electr no es v
    invalidPhone: "El n de tel no es v
    // Refi
    refiTitle: "Refinanciamiento / Compra en M (Solo Ciudadanos USA)",
    refiSubtitle: "Exclusivo para ciudadanos estadounidenses que buscan refinanciar o comprar casa en M Pr m $385,000 USD. Anticipo requerido: 35-45%. Aplican otras restricciones.",
    propertyType: "Tipo de Propiedad",
    address: "Direcci de la Propiedad en M
    downPayment: "Anticipo (%)",
    loanAmount: "Monto de Pr Deseado (USD)",
    notes: "Notas Adicionales / Preguntas",
    refiSubmit: "Enviar Solicitud de Cr
    refiThankyou: " Nuestro equipo de cr se comunicar para los siguientes pasos.",
    invalidLoan: "El monto m de pr es $385,000 USD",
=======
    subtitle: " a la Plataforma Elite de Bienes Ra AuditDNA",
    alertTitle: "Registro Requerido Antes de Subir Propiedades",
    alertText: "Todos los campos son obligatorios. Debe completar este registro antes de poder subir propiedades a la plataforma. Su informaci ser verificada antes de la aprobaci
    formTitle: "Formulario de Calificaci de Agente",
    formSubtitle: "Por favor proporcione informaci precisa",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    agency: "Nombre de la Agencia",
    terms: "Al registrarse, acepta cumplir con todos los t y condiciones de la plataforma, incluido el acuerdo de divisi de comisi 50/50 en todas las transacciones. Certifica que toda la informaci proporcionada es precisa y que tiene la autoridad para listar propiedades en nombre de los propietarios.",
    submit: "Completar Registro",
    questions: " sobre el registro?",
    contact: "Contacto: support@auditdna.com",
    required: "es requerido",
    invalidEmail: "El correo electr no es v
    invalidPhone: "El n de tel no es v
    // Refi
    refiTitle: "Refinanciamiento / Compra en M (Solo Ciudadanos USA)",
    refiSubtitle: "Exclusivo para ciudadanos estadounidenses que buscan refinanciar o comprar casa en M Pr m $385,000 USD. Anticipo requerido: 35-45%. Aplican otras restricciones.",
    propertyType: "Tipo de Propiedad",
    address: "Direcci de la Propiedad en M
    downPayment: "Anticipo (%)",
    loanAmount: "Monto de Pr Deseado (USD)",
    notes: "Notas Adicionales / Preguntas",
    refiSubmit: "Enviar Solicitud de Cr
    refiThankyou: " Nuestro equipo de cr se comunicar para los siguientes pasos.",
    invalidLoan: "El monto m de pr es $385,000 USD",
    subtitle: "  a la Plataforma Elite de Bienes Ra  AuditDNA",
    alertTitle: "Registro Requerido Antes de Subir Propiedades",
    alertText: "Todos los campos son obligatorios. Debe completar este registro antes de poder subir propiedades a la plataforma. Su informaci  ser  verificada antes de la aprobaci 
    formTitle: "Formulario de Calificaci  de Agente",
    formSubtitle: "Por favor proporcione informaci  precisa",
    fullName: "Nombre Completo",
    email: "Correo Electr 
    phone: "N  de Tel 
    agency: "Nombre de la Agencia",
    terms: "Al registrarse, acepta cumplir con todos los t  y condiciones de la plataforma, incluido el acuerdo de divisi  de comisi  50/50 en todas las transacciones. Certifica que toda la informaci  proporcionada es precisa y que tiene la autoridad para listar propiedades en nombre de los propietarios.",
    submit: "Completar Registro",
    questions: " sobre el registro?",
    contact: "Contacto: support@auditdna.com",
    required: "es requerido",
    invalidEmail: "El correo electr  no es v 
    invalidPhone: "El n  de tel  no es v 
    // Refi
    refiTitle: "Refinanciamiento / Compra en M  (Solo Ciudadanos USA)",
    refiSubtitle: "Exclusivo para ciudadanos estadounidenses que buscan refinanciar o comprar casa en M  Pr  m  $385,000 USD. Anticipo requerido: 35-45%. Aplican otras restricciones.",
    propertyType: "Tipo de Propiedad",
    address: "Direcci  de la Propiedad en M 
    downPayment: "Anticipo (%)",
    loanAmount: "Monto de Pr  Deseado (USD)",
    notes: "Notas Adicionales / Preguntas",
    refiSubmit: "Enviar Solicitud de Cr 
    refiThankyou: " Nuestro equipo de cr  se comunicar  para los siguientes pasos.",
    invalidLoan: "El monto m  de pr  es $385,000 USD",
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    invalidDown: "El anticipo debe ser entre 35% y 45%",
    requiredField: "es requerido"
  }
};

function MexicoRefiCard({ language }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    address: "",
    downPayment: "",
    loanAmount: "",
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const t = text[language];

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = `${t.fullName} ${t.requiredField}`;
    if (!form.email.trim()) {
      errs.email = `${t.email} ${t.requiredField}`;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = t.invalidEmail;
    }
    if (!form.phone.trim()) errs.phone = `${t.phone} ${t.requiredField}`;
    if (!form.propertyType.trim()) errs.propertyType = `${t.propertyType} ${t.requiredField}`;
    if (!form.address.trim()) errs.address = `${t.address} ${t.requiredField}`;
    if (!form.downPayment.trim() || isNaN(form.downPayment) || Number(form.downPayment) < 35 || Number(form.downPayment) > 45) {
      errs.downPayment = t.invalidDown;
    }
    if (!form.loanAmount.trim() || isNaN(form.loanAmount) || Number(form.loanAmount) < 385000) {
      errs.loanAmount = t.invalidLoan;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-10 mt-10">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 flex items-center">
        <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 3v2M6.7 6.7l-1.4 1.4M3 12h2m1.3 5.3l1.4 1.4M12 19v2m5.3-1.3l1.4-1.4M19 12h2m-1.3-5.3l-1.4-1.4" /></svg>
        <div>
          <h2 className="text-2xl font-bold text-white">{t.refiTitle}</h2>
          <p className="text-purple-100 mt-1">{t.refiSubtitle}</p>
        </div>
      </div>
      {submitted ? (
        <div className="p-8">
          <div className="bg-green-50 text-green-700 font-semibold rounded-lg p-4 text-center">
            {t.refiThankyou}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.fullName} *</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
<<<<<<< HEAD
              placeholder={language === "english" ? "John Doe" : "Juan P
              placeholder={language === "english" ? "John Doe" : "Juan P
=======
              placeholder={language === "english" ? "John Doe" : "Juan P
              placeholder={language === "english" ? "John Doe" : "Juan P 
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.email} *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.phone} *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555 234 4567"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.propertyType} *</label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.propertyType ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">{language === "english" ? "Select property type" : "Seleccione tipo de propiedad"}</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.propertyType && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.propertyType}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.address} *</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
<<<<<<< HEAD
              placeholder={language === "english" ? "Mexico, Address" : "Direcci en M
              placeholder={language === "english" ? "Mexico, Address" : "Direcci en M
=======
              placeholder={language === "english" ? "Mexico, Address" : "Direcci en M
              placeholder={language === "english" ? "Mexico, Address" : "Direcci  en M 
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.downPayment} *</label>
            <input
              type="number"
              name="downPayment"
              value={form.downPayment}
              min="35"
              max="45"
              onChange={handleChange}
              placeholder="35 - 45"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.downPayment ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.downPayment && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.downPayment}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.loanAmount} *</label>
            <input
              type="number"
              name="loanAmount"
              value={form.loanAmount}
              min="385000"
              onChange={handleChange}
              placeholder="385000"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.loanAmount ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.loanAmount && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.loanAmount}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.notes}</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
<<<<<<< HEAD
              placeholder={language === "english" ? "Tell us more about your needs..." : "Cu m sobre sus necesidades..."}
              placeholder={language === "english" ? "Tell us more about your needs..." : "Cu m sobre sus necesidades..."}
=======
              placeholder={language === "english" ? "Tell us more about your needs..." : "Cu m sobre sus necesidades..."}
              placeholder={language === "english" ? "Tell us more about your needs..." : "Cu  m  sobre sus necesidades..."}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[60px]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            {t.refiSubmit}
          </button>
        </form>
      )}
    </div>
  );
}

// ---- AGENT REGISTRATION FORM ----

const AgentRegistrationForm = () => {
  const [language, setLanguage] = useState("english");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agency: ""
  });
  const [errors, setErrors] = useState({});
  const t = text[language];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = `${t.fullName} ${t.required}`;
    if (!formData.email.trim()) {
      newErrors.email = `${t.email} ${t.required}`;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = `${t.phone} ${t.required}`;
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = t.invalidPhone;
    }
    if (!formData.agency.trim()) newErrors.agency = `${t.agency} ${t.required}`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Do something with the data if needed
      alert('Registration complete!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-lg shadow-sm p-1 flex gap-1">
            <button
              onClick={() => setLanguage("english")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                language === "english"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("spanish")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                language === "spanish"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
<<<<<<< HEAD
              Espa
              Espa
=======
              Espa
              Espa 
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full">
              {/* UserCheck icon */}
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {t.title}
          </h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start gap-3">
            {/* AlertCircle icon */}
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">{t.alertTitle}</h3>
              <p className="text-yellow-800 leading-relaxed">{t.alertText}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">{t.formTitle}</h2>
            <p className="text-purple-100 mt-1">{t.formSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">{t.fullName} *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">{t.email} *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="agent@example.com"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">{t.phone} *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+52 664 123 4567"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">{t.agency} *</label>
              <input
                type="text"
                name="agency"
                value={formData.agency}
                onChange={handleChange}
                placeholder="ABC Real Estate Agency"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.agency ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.agency && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">{errors.agency}</p>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{t.terms}</p>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              {t.submit}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>{t.questions}</p>
          <p className="font-semibold mt-1">{t.contact}</p>
        </div>

        {/* ---- MEXICO REFI CARD: Appears below Agent Registration ---- */}
        <MexicoRefiCard language={language} />
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default AgentRegistrationForm;
=======
export default AgentRegistrationForm;
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

