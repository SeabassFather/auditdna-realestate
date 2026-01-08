<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
export default function ServiceItem({ title, description, links }) {
  return (
    <div className="bg-white rounded-xl border shadow-md p-4 mb-4">
      <div className="font-bold text-lg">{title}</div>
      <div className="text-sm text-gray-600 mb-2">{description}</div>
      {links && (
        <div className="flex flex-wrap gap-2 mb-2">
          {links.map((l, i) => (
            <a key={i} href={l.to} className="underline text-blue-700 text-xs">
              {l.label}
            </a>
          ))}
        </div>
      )}
      <button className="bg-blue-100 px-3 py-1 rounded-xl mt-2">Open</button>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

