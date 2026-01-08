<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
export default function TabsBar({ tabs = [], value, onChange }) {
  return (
    <div className="tabs flex gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={"tab" + (t.id === value ? " active" : "")}
          onClick={() => onChange && onChange(t.id)}
          type="button"
          aria-pressed={t.id === value}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

