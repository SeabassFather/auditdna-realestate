import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return { language: 'en', setLanguage: () => {}, toggleLanguage: () => {}, t: (key) => key };
  }
  return context;
};

const translations = {
  en: {
    home: 'Home', properties: 'Properties', developments: 'Developments', financing: 'Financing',
    about: 'About', contact: 'Contact Us', login: 'Login', register: 'Register', logout: 'Logout',
    uploadProperty: 'Upload Property', propertyDetails: 'Property Details', propertyTitle: 'Property Title',
    description: 'Description', price: 'Price', location: 'Location', territory: 'Territory',
    bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', squareFeet: 'Square Feet', lotSize: 'Lot Size',
    yearBuilt: 'Year Built', propertyType: 'Property Type', uploadPhotos: 'Upload Photos',
    photoRequirements: 'Photo Requirements', photoReqText: 'Upload 8 high-quality photos minimum. Maximum file size: 5MB per photo.',
    dragDrop: 'Drag and drop photos here, or click to select', photosUploaded: 'photos uploaded', remove: 'Remove',
    house: 'House', condo: 'Condo', land: 'Land', commercial: 'Commercial', villa: 'Villa', apartment: 'Apartment',
    submit: 'Submit', cancel: 'Cancel', save: 'Save', edit: 'Edit', delete: 'Delete', view: 'View',
    success: 'Success!', error: 'Error', loading: 'Loading...', uploading: 'Uploading...',
    propertyAdded: 'Property added successfully!', photosRequired: 'Please upload at least 8 photos',
    fillRequired: 'Please fill all required fields', overview: 'Overview', search: 'Search',
    process: 'Process', upload: 'Upload', myListings: 'My Listings'
  },
  es: {
    home: 'Inicio', properties: 'Propiedades', developments: 'Desarrollos', financing: 'Financiamiento',
    about: 'Acerca de', contact: 'Contacto', login: 'Iniciar Sesion', register: 'Registrarse', logout: 'Cerrar Sesion',
    uploadProperty: 'Subir Propiedad', propertyDetails: 'Detalles de Propiedad', propertyTitle: 'Titulo de Propiedad',
    description: 'Descripcion', price: 'Precio', location: 'Ubicacion', territory: 'Territorio',
    bedrooms: 'Recamaras', bathrooms: 'Banos', squareFeet: 'Pies Cuadrados', lotSize: 'Tamano del Lote',
    yearBuilt: 'Ano de Construccion', propertyType: 'Tipo de Propiedad', uploadPhotos: 'Subir Fotos',
    photoRequirements: 'Requisitos de Fotos', photoReqText: 'Sube 8 fotos de alta calidad minimo. Tamano maximo: 5MB por foto.',
    dragDrop: 'Arrastra y suelta fotos aqui, o haz clic para seleccionar', photosUploaded: 'fotos subidas', remove: 'Eliminar',
    house: 'Casa', condo: 'Condominio', land: 'Terreno', commercial: 'Comercial', villa: 'Villa', apartment: 'Departamento',
    submit: 'Enviar', cancel: 'Cancelar', save: 'Guardar', edit: 'Editar', delete: 'Borrar', view: 'Ver',
    success: 'Exito!', error: 'Error', loading: 'Cargando...', uploading: 'Subiendo...',
    propertyAdded: 'Propiedad agregada exitosamente!', photosRequired: 'Por favor sube al menos 8 fotos',
    fillRequired: 'Por favor llena todos los campos requeridos', overview: 'Resumen', search: 'Buscar',
    process: 'Proceso', upload: 'Subir', myListings: 'Mis Listados'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred_language');
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('preferred_language', lang);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguageState(newLang);
    localStorage.setItem('preferred_language', newLang);
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}