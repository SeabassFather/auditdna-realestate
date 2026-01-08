<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function ShortLoanApp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    loanAmount: "",
    propertyValue: "",
    occupancy: "Primary",
    creditScore: "",
    loanPurpose: "Purchase"
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Submission failed. Please try again later.");
      }
    } catch (err) {
      alert("Error: " + err);
    }
    setSending(false);
  };

  if (submitted) return <div>Thank you! We received your application and will contact you immediately.</div>;

  return (
    <form className="short-loan-app" onSubmit={handleSubmit}>
      <h2>Quick Loan Inquiry</h2>
      <label>
        Name*
        <input name="name" required value={form.name} onChange={handleChange} />
      </label>
      <label>
        Email*
        <input name="email" type="email" required value={form.email} onChange={handleChange} />
      </label>
      <label>
        Phone*
        <input name="phone" required value={form.phone} onChange={handleChange} />
      </label>
      <label>
        Loan Purpose*
        <select name="loanPurpose" value={form.loanPurpose} onChange={handleChange}>
          <option>Purchase</option>
          <option>Refinance</option>
          <option>Cash-Out</option>
        </select>
      </label>
      <label>
        Occupancy*
        <select name="occupancy" value={form.occupancy} onChange={handleChange}>
          <option>Primary</option>
          <option>Second Home</option>
          <option>Investment</option>
        </select>
      </label>
      <label>
        Credit Score*
        <input name="creditScore" type="number" min={400} max={850} required value={form.creditScore} onChange={handleChange} />
      </label>
      <label>
        Loan Amount*
        <input name="loanAmount" type="number" required value={form.loanAmount} onChange={handleChange} />
      </label>
      <label>
        Property Value*
        <input name="propertyValue" type="number" required value={form.propertyValue} onChange={handleChange} />
      </label>
      <button type="submit" disabled={sending}>{sending ? "Submitting..." : "Submit Application"}</button>
    </form>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

