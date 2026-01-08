import React, { useState } from "react";
import jsPDF from "jspdf";
import { v4 as uuidv4 } from "uuid";

export default function ProducePOForm({ onNext }) {
  const [poData, setPoData] = useState({
    buyer: "",
    seller: "Mexausa Food Group",
    commodity: "",
    variety: "",
    packaging: "",
    quantityBoxes: 0,
    unitPrice: 0,
    terms: "FOB Origin",
  });

  const handleGeneratePO = () => {
    const poId = "PO-" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 9999);
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("PURCHASE ORDER", 14, 20);
    doc.setFontSize(11);
    doc.text(`PO ID: ${poId}`, 14, 30);
    Object.entries(poData).forEach(([k, v], i) => {
      doc.text(`${k}: ${v}`, 14, 40 + i * 7);
    });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 90);
    doc.save(`${poId}.pdf`);
    alert(` Purchase Order ${poId} generated!`);
    onNext();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Purchase Order (PO)</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {Object.keys(poData).map((key) => (
          <div key={key}>
            <label className="block font-semibold capitalize">{key}</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={poData[key]}
              onChange={(e) => setPoData({ ...poData, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleGeneratePO}
        className="bg-green-600 text-white px-5 py-2 rounded font-semibold"
      >
        Generate Purchase Order PDF
      </button>
    </div>
  );
}

