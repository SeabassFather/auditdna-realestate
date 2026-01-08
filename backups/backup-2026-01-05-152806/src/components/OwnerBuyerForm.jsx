/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Home, Mail, Phone, AlertCircle, Image as ImageIcon, DollarSign, MapPin } from "lucide-react";

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
    title: "List Your Property / Request Help Buying",
    subtitle: "Need help selling or buying a property? Fill out the form and our team will contact you.",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    propertyType: "Property Type",
    address: "Property Address",
    price: "Asking Price (USD)",
    upload: "Upload Property Photos",
    submit: "Submit Request",
    thankyou: "Thank you! Our team will contact you soon.",
    required: "is required",
    invalidEmail: "Invalid email",
    invalidPrice: "Valid asking price is required"
  },
  spanish: {
    title: "Publicar Propiedad / Solicitar Ayuda para Comprar",
    subtitle: " ayuda para vender o comprar una propiedad? Complete el formulario y nuestro equipo lo contactar
    fullName: "Nombre Completo",
    email: "Correo Electr
    phone: "Tel
    propertyType: "Tipo de Propiedad",
    address: "Direcci de la Propiedad",
    price: "Precio Solicitado (USD)",
    upload: "Subir Fotos de la Propiedad",
    submit: "Enviar Solicitud",
    thankyou: " Nuestro equipo lo contactar pronto.",
    required: "es requerido",
    invalidEmail: "Correo electr no v
    invalidPrice: "Se requiere un precio solicitado v
    subtitle: "  ayuda para vender o comprar una propiedad? Complete el formulario y nuestro equipo lo contactar  
    fullName: "Nombre Completo",
    email: "Correo Electr  
    phone: "Tel  
    propertyType: "Tipo de Propiedad",
    address: "Direcci   de la Propiedad",
    price: "Precio Solicitado (USD)",
    upload: "Subir Fotos de la Propiedad",
    submit: "Enviar Solicitud",
    thankyou: "  Nuestro equipo lo contactar   pronto.",
    required: "es requerido",
    invalidEmail: "Correo electr   no v  
    invalidPrice: "Se requiere un precio solicitado v  
  }
};

const OwnerBuyerForm = ({ language }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyType: '',
    address: '',
    price: '',
    images: []
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const t = text[language];

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = `${t.fullName} ${t.required}`;
    if (!form.email.trim()) {
      errs.email = `${t.email} ${t.required}`;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = t.invalidEmail;
    }
    if (!form.phone.trim()) errs.phone = `${t.phone} ${t.required}`;
    if (!form.propertyType.trim()) errs.propertyType = `${t.propertyType} ${t.required}`;
    if (!form.address.trim()) errs.address = `${t.address} ${t.required}`;
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = t.invalidPrice;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Home className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-purple-700">{t.title}</h2>
      </div>
      <p className="mb-5 text-gray-700">{t.subtitle}</p>
      {submitted ? (
        <div className="bg-green-50 text-green-700 font-semibold rounded-lg p-4 text-center">
          {t.thankyou}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.fullName} *</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder={language === 'english' ? "Jane Doe" : "Juan P
              placeholder={language === 'english' ? "Jane Doe" : "Juan P  
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.fullName}</p>}
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
            {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.phone} *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+52 123 456 7890"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.phone}</p>}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.propertyType} *</label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.propertyType ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">{language === 'english' ? 'Select property type' : 'Seleccione tipo de propiedad'}</option>
              {PROPERTY_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.propertyType && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.propertyType}</p>}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.address} *</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder={language === 'english' ? "123 Main St, City, Country" : "Av. Principal 123, Ciudad, Pa
              placeholder={language === 'english' ? "123 Main St, City, Country" : "Av. Principal 123, Ciudad, Pa  
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.address && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.address}</p>}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.price} *</label>
            <input
              type="number"
              name="price"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="100000"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.price && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.price}</p>}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">{t.upload}</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600"
            />
            {form.images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.images.map((file, idx) => (
                  <span key={idx} className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">{file.name}</span>
                ))}
              </div>
            )}
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
};

export default OwnerBuyerForm;

