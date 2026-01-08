import React from "react";
import { useLanguage } from "./LanguageContext";
export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  // ...button code from above...
}

