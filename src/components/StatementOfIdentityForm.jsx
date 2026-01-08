<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function StatementOfIdentityForm({ escrowAccount }) {
  const [form, setForm] = useState({ name: "", dob: "", ssn: "", address: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Submit to backend to send to title/escrow
    alert("Statement of Identity submitted!");
  };

  if (!escrowAccount) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 my-8 border">
      <h3 className="text-lg font-bold mb-2">Statement of Identity</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border rounded px-3 py-2 w-full"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border rounded px-3 py-2 w-full"
          name="dob"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          required
        />
        <input
          className="border rounded px-3 py-2 w-full"
          name="ssn"
          placeholder="SSN"
          value={form.ssn}
          onChange={handleChange}
          required
        />
        <input
          className="border rounded px-3 py-2 w-full"
          name="address"
          placeholder="Current Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

