import React, { useState } from "react";
import ResultsUploadHub from "./ResultsUploadHub";

// Example offers
const demoOffers = [
  {
    buyer: "Avocado Imports US",
    size: "48ct",
    volume: 2200,
    price: 33.25,
    packing: "Box",
    deliveryPort: "Laredo, TX",
    financeEligible: true,
    factoringEligible: true,
    status: "Active",
    lotID: "AVO-2025-C"
  },
  {
    buyer: "FreshMex Retail",
    size: "Maya-bag",
    volume: 950,
    price: 29.8,
    packing: "Maya-bag",
    deliveryPort: "Nogales, AZ",
    financeEligible: false,
    factoringEligible: true,
    status: "Pending",
    lotID: "AVO-2025-C"
  },
];

export default function OfferBoard() {
  const [offers, setOffers] = useState(demoOffers);
  const [labResults, setLabResults] = useState({});
  function handleLabExtract(extracted) {
    // Attach lab result to offer by lotID (simulate/expand with API when ready)
    setLabResults(prev => ({
      ...prev,
      [extracted.lotID]: extracted
    }));
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border mb-12">
      <h2 className="text-2xl font-bold text-green-700 mb-5">Offer Board</h2>

      {/* Upload hub for lab test extraction (per offer/lot) */}
      <ResultsUploadHub onExtract={handleLabExtract} />

      <table className="min-w-full border">
        <thead className="bg-green-100">
          <tr>
            <th className="p-3">Buyer</th>
            <th className="p-3">Size</th>
            <th className="p-3">Volume</th>
            <th className="p-3">Price</th>
            <th className="p-3">Packing</th>
            <th className="p-3">Port</th>
            <th className="p-3">Finance</th>
            <th className="p-3">Factoring</th>
            <th className="p-3">Status</th>
            <th className="p-3">Lab Tests</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-3">{offer.buyer}</td>
              <td className="p-3">{offer.size}</td>
              <td className="p-3">{offer.volume}</td>
              <td className="p-3">${offer.price.toFixed(2)}</td>
              <td className="p-3">{offer.packing}</td>
              <td className="p-3">{offer.deliveryPort}</td>
              <td className="p-3">{offer.financeEligible ? " : "
              <td className="p-3">{offer.factoringEligible ? " : "
              <td className="p-3">{offer.status}</td>
              <td className="p-3">
                {labResults[offer.lotID] ? (
                  <ul className="text-xs bg-blue-50 rounded p-2">
                    <li><b>{labResults[offer.lotID].labReport}</b></li>
                    {labResults[offer.lotID].extractedParams.map((p, j) =>
                      <li key={j}><b>{p.name}</b>: {p.value} <span style={{ color: p.status === "PASS" ? "green" : "red" }}>{p.status}</span></li>
                    )}
                  </ul>
                ) : (
                  "
                )}
              </td>
              <td className="p-3">
                <button className="px-3 py-1 bg-green-600 text-white rounded">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

