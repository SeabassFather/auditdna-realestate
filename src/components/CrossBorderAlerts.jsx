import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
export default function Alerts() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    fetch("/api/latin/alerts").then(res => res.json()).then(setAlerts);
  }, []);
  // ...render list with t('alerts.title'), etc...
}

