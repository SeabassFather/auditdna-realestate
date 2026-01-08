import React, { useState } from 'react';

// Simulate upload + extraction
export default function ResultsUploadHub({ onExtract }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [results, setResults] = useState(null);

  function handleFile(e) {
    const f = e.target.files[0];
    setFile(f);
    setStatus("Processing...");
    setTimeout(() => {
      // Simulated AI lab data extraction demo
      let type = "water";
      if (f.name.includes("Soil")) type = "soil";
      if (f.name.includes("Fertilizer")) type = "fertilizer";
      if (f.name.includes("Microbe")) type = "microbial";
      if (f.name.includes("Metal") || f.name.includes("Mercury")) type = "metals";
      // Replace with real AI/ML parsing
      const extracted = {
        type,
        labReport: f.name,
        lotID: "TOM-2025-A",
        extractedParams: [
          { name: "pH", value: type==="water"? "6.8":"5.8", status: "PASS" },
          { name: "Lead (Pb)", value: "0.008", status: "PASS" },
          { name: "Mercury (Hg)", value: "0.001", status: "PASS" },
          { name: "E. coli", value: "0", status: "PASS" }
        ]
      };
      setResults(extracted);
      setStatus("Extracted");
      if(onExtract) onExtract(extracted);
    }, 1500);
  }

  return (
    <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-200">
      <h3 className="font-bold text-lg mb-2">Lab/Water/Soil/Fertilizer Upload</h3>
      <input type="file" accept=".pdf,.xls,.csv,.jpg,.png" onChange={handleFile} className="mb-2"/>
      {status && <div className="mb-2">{status}</div>}
      {results &&
        <div>
          <b>File:</b> {results.labReport} | <b>Lot:</b> {results.lotID}
          <ul>
            {results.extractedParams.map((p,i)=>
              <li key={i}><b>{p.name}</b>: {p.value} <span style={{color: p.status==="PASS" ? "green" : "red"}}>{p.status}</span></li>
            )}
          </ul>
        </div>
      }
    </div>
  );
}

