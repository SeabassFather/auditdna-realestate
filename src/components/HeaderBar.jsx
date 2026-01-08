<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export default function HeaderBar() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="font-bold">
          AuditDNA
        </Link>
        <div className="flex-1" />
        <Link to="/services" className="px-2 py-1 rounded hover:bg-gray-100">
          {t("services")}
        </Link>
        <Link to="/cases" className="px-2 py-1 rounded hover:bg-gray-100">
          {t("cases")}
        </Link>
        <Link
          to="/market/prices"
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          {t("prices")}
        </Link>
        <Link to="/marketplace" className="px-2 py-1 rounded hover:bg-gray-100">
          {t("marketplace")}
        </Link>
        <Link to="/admin" className="px-2 py-1 rounded hover:bg-gray-100">
          {t("admin")}
        </Link>
        <div className="px-2 py-1 text-sm text-gray-500">{t("language")}:</div>
        <button
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          className="px-2 py-1 rounded bg-gray-900 text-white hover:brightness-95"
        >
          {lang.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

