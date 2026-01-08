import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    properties: 'Properties',
    developments: 'Developments',
    financing: 'Financing',
    about: 'About',
    contact: 'Contact Us',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Property Upload
    uploadProperty: 'Upload Property',
    propertyDetails: 'Property Details',
    propertyTitle: 'Property Title',
    description: 'Description',
    price: 'Price',
    location: 'Location',
    territory: 'Territory',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    squareFeet: 'Square Feet',
    lotSize: 'Lot Size',
    yearBuilt: 'Year Built',
    propertyType: 'Property Type',
    
    // Photo Upload
    uploadPhotos: 'Upload Photos',
    photoRequirements: 'Photo Requirements',
    photoReqText: 'Upload 8 high-quality photos minimum. Maximum file size: 5MB per photo.',
    dragDrop: 'Drag and drop photos here, or click to select',
    photosUploaded: 'photos uploaded',
    remove: 'Remove',
    
    // Property Types
    house: 'House',
    condo: 'Condo',
    land: 'Land',
    commercial: 'Commercial',
    villa: 'Villa',
    apartment: 'Apartment',
    
    // Buttons
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    
    // Messages
    success: 'Success!',
    error: 'Error',
    loading: 'Loading...',
    uploading: 'Uploading...',
    propertyAdded: 'Property added successfully!',
    photosRequired: 'Please upload at least 8 photos',
    fillRequired: 'Please fill all required fields',
    
    // Tabs
    overview: 'Overview',
    search: 'Search',
    process: 'Process',
    upload: 'Upload',
    myListings: 'My Listings'
  },
  es: {
    // Navigation
    home: 'Inicio',
    properties: 'Propiedades',
    developments: 'Desarrollos',
    financing: 'Financiamiento',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar Sesion',
    register: 'Registrarse',
    logout: 'Cerrar Sesion',
    
    // Property Upload
    uploadProperty: 'Subir Propiedad',
    propertyDetails: 'Detalles de Propiedad',
    propertyTitle: 'Titulo de Propiedad',
    description: 'Descripcion',
    price: 'Precio',
    location: 'Ubicacion',
    territory: 'Territorio',
    bedrooms: 'Recamaras',
    bathrooms: 'Banos',
    squareFeet: 'Pies Cuadrados',
    lotSize: 'Tamano del Lote',
    yearBuilt: 'Ano de Construccion',
    propertyType: 'Tipo de Propiedad',
    
    // Photo Upload
    uploadPhotos: 'Subir Fotos',
    photoRequirements: 'Requisitos de Fotos',
    photoReqText: 'Sube 8 fotos de alta calidad minimo. Tamano maximo: 5MB por foto.',
    dragDrop: 'Arrastra y suelta fotos aqui, o haz clic para seleccionar',
    photosUploaded: 'fotos subidas',
    remove: 'Eliminar',
    
    // Property Types
    house: 'Casa',
    condo: 'Condominio',
    land: 'Terreno',
    commercial: 'Comercial',
    villa: 'Villa',
    apartment: 'Departamento',
    
    // Buttons
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Borrar',
    view: 'Ver',
    
    // Messages
    success: 'Exito!',
    error: 'Error',
    loading: 'Cargando...',
    uploading: 'Subiendo...',
    propertyAdded: 'Propiedad agregada exitosamente!',
    photosRequired: 'Por favor sube al menos 8 fotos',
    fillRequired: 'Por favor llena todos los campos requeridos',
    
    // Tabs
    overview: 'Resumen',
    search: 'Buscar',
    process: 'Proceso',
    upload: 'Subir',
    myListings: 'Mis Listados'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred_language');
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
  }, []);

  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('preferred_language', lang);
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}