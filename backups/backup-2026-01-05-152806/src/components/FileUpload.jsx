<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
export default function FileUpload({
  label = "Uploads",
  multiple = true,
  onFiles,
}) {
  return (
    <div style={{ marginTop: 8 }}>
      <label
        style={{
          display: "block",
          fontSize: 12,
          opacity: 0.8,
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      <input
        type="file"
        multiple={multiple}
        onChange={(e) => onFiles?.(Array.from(e.target.files || []))}
      />
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

