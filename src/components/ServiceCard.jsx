<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  if (!service) return null;
  const {
    title = "Untitled",
    description = "",
    slug = "",
    services = [],
  } = service || {};
  const tags = Array.isArray(services)
    ? services.slice(0, 6).map((s) => s.title || s.name || s)
    : [];

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 6px", fontWeight: 800 }}>{title}</h3>
      {description ? (
        <p className="small-muted" style={{ margin: "0 0 10px" }}>
          {description}
        </p>
      ) : null}
      {tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 10,
          }}
        >
          {tags.map((t, i) => (
            <span key={i} className="badge">
              {t}
            </span>
          ))}
        </div>
      )}
      {slug ? (
        <Link className="btn" to={`/services/${slug}`}>
          Open
        </Link>
      ) : null}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

