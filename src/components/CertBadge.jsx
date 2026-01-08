<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
export default function CertBadge({ ok, name }) {
  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 8,
        fontSize: 12,
        marginRight: 6,
        background: ok ? "#0b4" : "#333",
        color: ok ? "#fff" : "#bbb",
        border: "1px solid #1f1f1f",
      }}
    >
      {name}
      {ok ? " " : ""}
    </span>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

