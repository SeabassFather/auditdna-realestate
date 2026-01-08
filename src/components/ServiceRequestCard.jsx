<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function ServiceRequestCard({ serviceName }) {
  const [form, setForm] = useState({ name: "", email: "", message: "", file: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("message", form.message);
    if (form.file) data.append("file", form.file);

    try {
      const res = await fetch("http://localhost:5050/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
<<<<<<< HEAD
      alert(` Submitted! Reference: ${result.caseId || "ok"}`);
    } catch (err) {
      console.error("Upload failed", err);
      alert(" Failed to submit request.");
      alert(` Submitted! Reference: ${result.caseId || "ok"}`);
    } catch (err) {
      console.error("Upload failed", err);
      alert(" Failed to submit request.");
=======
      alert(` Submitted! Reference: ${result.caseId || "ok"}`);
    } catch (err) {
      console.error("Upload failed", err);
      alert(" Failed to submit request.");
      alert(` Submitted! Reference: ${result.caseId || "ok"}`);
    } catch (err) {
      console.error("Upload failed", err);
      alert(" Failed to submit request.");
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Request Service: {serviceName}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm dark:bg-slate-700 dark:text-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm dark:bg-slate-700 dark:text-white"
          required
        />
        <textarea
          name="message"
          placeholder="Describe your request..."
          value={form.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm dark:bg-slate-700 dark:text-white"
          rows={4}
        ></textarea>

        {/* File Upload */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Upload Document(s) for Audit
          </label>
          <input
            type="file"
            onChange={handleFile}
            className="w-full px-3 py-2 border rounded-lg shadow-sm dark:bg-slate-700 dark:text-white"
            accept=".pdf,.doc,.docx,.jpg,.png,.xls,.xlsx"
          />
          {form.file && (
            <span className="text-xs text-green-600 dark:text-green-400">
              Selected: {form.file.name}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}



<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

