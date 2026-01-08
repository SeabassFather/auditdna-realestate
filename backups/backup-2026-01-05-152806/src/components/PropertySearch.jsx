import React, { useState } from "react";

const text = {
  english: {
    title: "Property Search",
    propertyType: "Property Type",
    region: "Region",
    priceRange: "Price Range (USD)",
    bedrooms: "Bedrooms",
    uploadPhotos: "Upload Photos (optional)",
    uploadDocs: "Upload Legal Documents (optional)",
    search: "Search Properties"
  },
  spanish: {
    title: "B de Propiedades",
    propertyType: "Tipo de Propiedad",
    region: "Regi
    priceRange: "Rango de Precio (USD)",
    bedrooms: "Rec
    title: "B de Propiedades",
    propertyType: "Tipo de Propiedad",
    region: "Regi
    priceRange: "Rango de Precio (USD)",
    bedrooms: "Rec
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    search: "Buscar Propiedades"
  }
};

const PROPERTY_TYPES = [
  { en: "All Types", es: "Todos los Tipos" },
  { en: "Residential", es: "Residencial" },
  { en: "Condo/Apartment", es: "Condominio/Apartamento" },
  { en: "Land/Lot", es: "Terreno/Lote" },
  { en: "Commercial", es: "Comercial" },
  { en: "Hotel/Resort", es: "Hotel/Resort" },
  { en: "Other", es: "Otro" }
];

const REGIONS = [
  { en: "All Regions", es: "Todas las Regiones" },
  { en: "Baja", es: "Baja" },
  { en: "CDMX", es: "CDMX" },
  { en: "Quintana Roo", es: "Quintana Roo" },
  { en: "Sonora", es: "Sonora" },
  { en: "Jalisco", es: "Jalisco" },
  { en: "Other", es: "Otro" }
];

const PRICE_RANGES = [
  { en: "Any Price", es: "Cualquier Precio" },
  { en: "Under $100,000", es: "Menos de $100,000" },
  { en: "$100,000 - $250,000", es: "$100,000 - $250,000" },
  { en: "$250,000 - $500,000", es: "$250,000 - $500,000" },
  { en: "$500,000 - $1,000,000", es: "$500,000 - $1,000,000" },
  { en: "Over $1,000,000", es: "M de $1,000,000" }
  { en: "Over $1,000,000", es: "M de $1,000,000" }
];

const BEDROOMS = [
  { en: "Any", es: "Cualquiera" },
  { en: "1", es: "1" },
  { en: "2", es: "2" },
  { en: "3", es: "3" },
  { en: "4+", es: "4+" }
];

export default function PropertySearch({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({
    propertyType: "",
    region: "",
    priceRange: "",
    bedrooms: ""
  });
  const [photos, setPhotos] = useState([]);
  const [docs, setDocs] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = e => {
    setPhotos(Array.from(e.target.files));
  };

  const handleDocChange = e => {
    setDocs(Array.from(e.target.files));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Search logic or send data to backend
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-green-200 overflow-hidden mb-10">
      <div className="px-8 py-6 flex items-center">
        <svg className="w-7 h-7 text-purple-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <h2 className="text-2xl font-bold text-purple-900">{t.title}</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.propertyType}</label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-300"
            >
              {PROPERTY_TYPES.map(type => (
                <option key={type.en} value={language === "english" ? type.en : type.es}>
                  {language === "english" ? type.en : type.es}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.region}</label>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-300"
            >
              {REGIONS.map(region => (
                <option key={region.en} value={language === "english" ? region.en : region.es}>
                  {language === "english" ? region.en : region.es}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.priceRange}</label>
            <select
              name="priceRange"
              value={form.priceRange}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-300"
            >
              {PRICE_RANGES.map(pr => (
                <option key={pr.en} value={language === "english" ? pr.en : pr.es}>
                  {language === "english" ? pr.en : pr.es}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.bedrooms}</label>
            <select
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-300"
            >
              {BEDROOMS.map(bd => (
                <option key={bd.en} value={language === "english" ? bd.en : bd.es}>
                  {language === "english" ? bd.en : bd.es}
                </option>
              ))}
            </select>
          </div>
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
          className="w-full bg-gradient-to-r from-purple-500 to-pink-400 text-white py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            {t.search}
          </span>
        </button>
      </form>
    </div>
  );
}
