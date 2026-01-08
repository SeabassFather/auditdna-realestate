<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { useLocation } from "react-router-dom";
export default function Topbar() {
  const loc = useLocation();
  return (
    <header className="topbar">
      <div className="left">
        <span className="title">Control Panel</span>
        <span className="crumb">{loc.pathname}</span>
      </div>
      <div className="right">
        <span className="pill">FIRE THEME</span>
      </div>
    </header>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

