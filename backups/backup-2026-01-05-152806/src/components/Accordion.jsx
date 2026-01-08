<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
export default function Accordion({ open, onToggle, title, content }) {
  return (
    <div className="mb-4">
      <button
        className={`w-full text-left px-4 py-3 rounded-xl font-bold transition bg-gradient-to-r ${open ? "from-yellow-100 to-green-100" : "from-gray-50 to-white"} shadow border`}
        onClick={onToggle}
        aria-expanded={open}
      >
        {title}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[1000px] py-4 px-2" : "max-h-0 p-0"}`}
        aria-hidden={!open}
      >
        {open ? content : null}
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

