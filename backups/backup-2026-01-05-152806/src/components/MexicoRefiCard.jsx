import React, { useState } from "react";

const PROPERTY_TYPES = [
  "Residential Home",
  "Condo/Apartment",
  "Land/Lot",
  "New Construction",
  "Beachfront Property",
  "Commercial Property",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Ranch/Farm",
  "Hotel/Resort",
  "Investment",
  "Vacation Rental"
];

const text = {
  english: {
    refiTitle: "Mexico Home Refinance / Buy in Mexico (US Citizens Only)",
    refiSubtitle: "Strictly for US Citizens seeking to refinance or buy a home in Mexico. Minimum loan: $385,000 USD. Down payment required: 35-45%. Other restrictions apply.",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
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
    refiTitle: "Refinanciamiento / Compra en M (Solo Ciudadanos USA)",
    refiSubtitle: "Exclusivo para ciudadanos estadounidenses que buscan refinanciar o comprar casa en M Pr m $385,000 USD. Anticipo requerido: 35-45%. Aplican otras restricciones.",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    propertyType: "Tipo de Propiedad",
    address: "Direcci de la Propiedad en M
    downPayment: "Anticipo (%)",
    loanAmount: "Monto de Pr Deseado (USD)",
    notes: "Notas Adicionales / Preguntas",
    refiSubmit: "Enviar Solicitud de Cr
    refiThankyou: " Nuestro equipo de cr se comunicar para los siguientes pasos.",
    invalidLoan: "El monto m de pr es $385,000 USD",
    refiTitle: "Refinanciamiento / Compra en M (Solo Ciudadanos USA)",
    refiSubtitle: "Exclusivo para ciudadanos estadounidenses que buscan refinanciar o comprar casa en M Pr m $385,000 USD. Anticipo requerido: 35-45%. Aplican otras restricciones.",
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "N de Tel
    propertyType: "Tipo de Propiedad",
    address: "Direcci de la Propiedad en M
    downPayment: "Anticipo (%)",
    loanAmount: "Monto de Pr Deseado (USD)",
    notes: "Notas Adicionales / Preguntas",
    refiSubmit: "Enviar Solicitud de Cr
    refiThankyou: " Nuestro equipo de cr se comunicar para los siguientes pasos.",
    invalidLoan: "El monto m de pr es $385,000 USD",
    invalidDown: "El anticipo debe ser entre 35% y 45%",
    requiredField: "es requerido"
  }
};

function MexicoRefiCard({ language = "english" }) {
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
      errs.email = language === "english" ? "Email is invalid" : "El correo electr no es v
      errs.email = language === "english" ? "Email is invalid" : "El correo electr no es v
    }
    if (!form.phone.trim()) errs.phone = `${t.phone} ${t.requiredField}`;
    if (!form.propertyType.trim()) errs.propertyType = `${t.propertyType} ${t.requiredField}`;
    if (!form.address.trim()) errs.address = `${t.address} ${t.requiredField}`;
    if (
      !form.downPayment.trim() ||
      isNaN(form.downPayment) ||
      Number(form.downPayment) < 35 ||
      Number(form.downPayment) > 45
    ) {
      errs.downPayment = t.invalidDown;
    }
    if (
      !form.loanAmount.trim() ||
      isNaN(form.loanAmount) ||
      Number(form.loanAmount) < 385000
    ) {
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
        <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M12 3v2M6.7 6.7l-1.4 1.4M3 12h2m1.3 5.3l1.4 1.4M12 19v2m5.3-1.3l1.4-1.4M19 12h2m-1.3-5.3l-1.4-1.4" />
        </svg>
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
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              {t.fullName} *
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder={language === "english" ? "John Doe" : "Juan P
              placeholder={language === "english" ? "John Doe" : "Juan P
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                {errors.fullName}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              {t.email} *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              {t.phone} *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555 234 4567"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              {t.propertyType} *
            </label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.propertyType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">
                {language === "english"
                  ? "Select property type"
                  : "Seleccione tipo de propiedad"}
              </option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.propertyType && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                {errors.propertyType}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              {t.address} *
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder={
                language === "english"
                  ? "Mexico, Address"
                  : "Direcci en M
                  : "Direcci en M
              }
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                {errors.address}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              {t.downPayment} *
            </label>
            <input
              type="number"
              name="downPayment"
              value={form.downPayment}
              min="35"
              max="45"
              onChange={handleChange}
              placeholder="35 - 45"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.downPayment ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.downPayment && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                {errors.downPayment}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              {t.loanAmount} *
            </label>
            <input
              type="number"
              name="loanAmount"
              value={form.loanAmount}
              min="385000"
              onChange={handleChange}
              placeholder="385000"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.loanAmount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.loanAmount && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                {errors.loanAmount}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              {t.notes}
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder={
                language === "english"
                  ? "Tell us more about your needs..."
                  : "Cu m sobre sus necesidades..."
                  : "Cu m sobre sus necesidades..."
              }
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

export default MexicoRefiCard;
