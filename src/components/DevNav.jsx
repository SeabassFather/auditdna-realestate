<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { Link } from "react-router-dom";

export default function DevNav() {
  const Item = (props) => (
    <Link {...props} className="px-3 py-2 rounded border" />
  );
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b p-3 mb-4">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-2 text-sm">
        <span className="font-semibold mr-2">Quick Nav:</span>
        <Item to="/">Home</Item>
        <Item to="/services">Services</Item>
        <Item to="/ag">Ag (login)</Item>
        <Item to="/mortgage">Mortgage</Item>
        <Item to="/legal">Legal</Item>
        <Item to="/admin/legals-hub">Admin: Legals</Item>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

