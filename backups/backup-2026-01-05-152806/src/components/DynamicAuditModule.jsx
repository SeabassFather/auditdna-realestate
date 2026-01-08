<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function DynamicAuditModule({ category, service, subsection, onClose }) {
  const [contact, setContact] = useState({ name: "", email: "" });
  const [docs, setDocs] = useState([]);
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("Not Submitted");
  const [notified, setNotified] = useState(false);

  function handleFile(e) {
    setDocs([...docs, ...Array.from(e.target.files)]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitted");
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.33)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          minWidth: 420,
          maxWidth: 560,
          boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 18,
            top: 16,
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
          }}
          aria-label="Close"
        >
<<<<<<< HEAD
          
          
=======
          
           
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
        </button>
        <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
          {category} &mdash; {service}
        </h2>
        <div style={{ color: "#4b5563", fontSize: 16, fontWeight: 500, marginBottom: 12 }}>
          {subsection}
        </div>

        {/* Contact Card */}
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: 14, marginBottom: 18, fontSize: 14 }}>
          <b>Contact Info</b>
          <div>
            <input
              value={contact.name}
              onChange={(e) => setContact((v) => ({ ...v, name: e.target.value }))}
              placeholder="Full Name"
              style={{ width: "100%", padding: 8, margin: "8px 0", borderRadius: 8, border: "1px solid #d1d5db" }}
            />
            <input
              value={contact.email}
              onChange={(e) => setContact((v) => ({ ...v, email: e.target.value }))}
              placeholder="Email"
              style={{ width: "100%", padding: 8, margin: "8px 0", borderRadius: 8, border: "1px solid #d1d5db" }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div style={{ marginBottom: 12 }}>
          <b>Checklist for {subsection}:</b>
          <ul>
            <li>Upload relevant documents</li>
            <li>Complete audit form</li>
            <li>Review and submit</li>
          </ul>
        </div>

        {/* Document Uploader */}
        <div style={{ marginBottom: 16 }}>
          <b>Document Upload</b>
          <input type="file" multiple onChange={handleFile} style={{ display: "block", marginTop: 8 }} />
          <ul>
            {docs.map((file, i) => (
              <li key={i} style={{ fontSize: 13 }}>{file.name}</li>
            ))}
          </ul>
        </div>

        {/* Dynamic Audit Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <b>Audit Form</b>
            <input
              required
              placeholder={`Details for ${subsection}`}
              value={form.detail || ""}
              onChange={e => setForm({ ...form, detail: e.target.value })}
              style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #d1d5db", marginTop: 6 }}
            />
          </div>
          <button type="submit" style={{ marginTop: 6, padding: "8px 28px", background: "#2563eb", color: "#fff", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 15 }}>
            Submit Audit
          </button>
        </form>

        {/* Status Card */}
        <div style={{ background: "#f3f4f6", marginTop: 18, borderRadius: 8, padding: 8, fontSize: 14 }}>
          <b>Status:</b> {status}
        </div>

        {/* Notification Controls */}
        <div style={{ marginTop: 10 }}>
          <label>
            <input type="checkbox" checked={notified} onChange={e => setNotified(e.target.checked)} />
            &nbsp;Notify regulators (CFPB/Escrow/Legal)
          </label>
        </div>

        {/* QR Generator Placeholder */}
        <div style={{ marginTop: 12, textAlign: "center", color: "#a3a3a3", fontSize: 13 }}>
          <div style={{ border: "1px dashed #cbd5e1", display: "inline-block", padding: 10, borderRadius: 6 }}>
            [QR Code for tracking will appear here]
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

