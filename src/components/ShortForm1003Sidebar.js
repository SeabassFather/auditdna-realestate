<<<<<<< HEAD
import React, { useState } from "react";
=======
﻿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function ShortForm1003Sidebar() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    amount: "",
    income: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    // Call backend/email API
    try {
      // Replace this URL with your backend email endpoint!
      const res = await fetch("/api/email-1003", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setError("Email failed to send.");
    } catch (err) {
      setError("Error sending email.");
    }
    setSending(false);
  };

  return (
    <div style={{
      position: "fixed", right: 0, top: 0, width: 340, height: "100vh",
      background: "#f8faff", boxShadow: "-4px 0 16px rgba(0,0,0,0.12)", padding: 24, zIndex: 9999
    }}>
      <h2>Quick 1003 Application</h2>
      {submitted ? (
        <div style={{ color: "green", fontWeight: 600 }}>
<<<<<<< HEAD
           Sent! Check your email for your copy.<br />We reach out soon!
           Sent! Check your email for your copy.<br />We reach out soon!
=======
           Sent! Check your email for your copy.<br />We reach out soon!
           Sent! Check your email for your copy.<br />We reach out soon!
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={{ width: "100%", margin: "8px 0" }} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" style={{ width: "100%", margin: "8px 0" }} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required style={{ width: "100%", margin: "8px 0" }} />
          <input name="property" placeholder="Property Address" value={form.property} onChange={handleChange} required style={{ width: "100%", margin: "8px 0" }} />
          <input name="amount" placeholder="Loan Amount ($)" value={form.amount} onChange={handleChange} required type="number" style={{ width: "100%", margin: "8px 0" }} />
          <input name="income" placeholder="Annual Income ($)" value={form.income} onChange={handleChange} required type="number" style={{ width: "100%", margin: "8px 0" }} />
          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
          <button type="submit" disabled={sending} style={{ width: "100%", padding: 12, background: "#3a77ff", color: "#fff", border: "none", borderRadius: 4 }}>
            {sending ? "Sending..." : "Email me a copy"}
          </button>
        </form>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
