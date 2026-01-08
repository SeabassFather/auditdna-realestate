import React, { useState } from "react";
import ResultsUploadHub from "./ResultsUploadHub";

// Example grower uploads--expand with real data or context!
const demoGrowers = [
  {
    name: "Green Valley MX",
    variety: "Hass",
    size: "48ct",
    region: "Michoac
    season: "2025-12 to 2026-03",
    casesPlanned: 5000,
    certifications: ["PrimusGFS", "GLOBALG.A.P."],
    complianceScore: 97,
    lastUpload: "2025-11-07",
    files: ["cert-primus.pdf", "crop-plan.xlsx", "trace-chain.pdf"],
    waterTest: { result: "PASS", ec: 2.8, pH: 7.6 },
    foodSafety: "All Clear"
  },
  {
    name: "Las Fincas", variety: "Fuerte", size: "60ct", region: "Jalisco",
    season: "2025-11 to 2026-04", casesPlanned: 3200, certifications: ["PrimusGFS"],
    complianceScore: 92, lastUpload: "2025-10-28", files: ["cert-globalgap.pdf"],
    waterTest: { result: "PASS", ec: 3.1, pH: 7.2 }, foodSafety: "OK"
  },
];

export default function GrowerUploads() {
  const [growers, setGrowers] = useState(demoGrowers);
  const [labResults, setLabResults] = useState({});
  function handleLabExtract(extracted) {
    // Attach upload to grower; you could match by id or name etc.
    setLabResults(prev => ({
      ...prev,
      [extracted.lotID]: extracted
    }));
    // Optionally, pop up notification or save to backend API here.
  }

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Grower Uploads & Analytics</h1>

      <ResultsUploadHub onExtract={handleLabExtract} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {growers.map((g,i) => (
          <div key={i} className="bg-green-50 p-6 rounded-xl shadow border border-green-200 mb-6">
            <b className="text-lg">{g.name} - {g.variety} ({g.size}) </b>
            <div>Region: <b>{g.region}</b></div>
            <div>Season: <b>{g.season}</b></div>
            <div>Cases Planned: <b>{g.casesPlanned}</b></div>
            <div>Certifications: <b>{g.certifications.join(", ")}</b></div>
            <div>Compliance Score: <b>{g.complianceScore}</b></div>
            <div>Last Upload: <b>{g.lastUpload}</b></div>
            <div>Files: {g.files.map((file,j)=>
              <span key={j} className="mx-1 text-blue-700 underline">{file}</span>)}</div>
            <div>Water Test: <b>{g.waterTest.result}</b> (EC: {g.waterTest.ec}, pH: {g.waterTest.pH})</div>
            <div>Food Safety: <b className="text-green-700">{g.foodSafety}</b></div>

            {labResults[g.name] && (
              <div className="bg-blue-100 mt-3 p-2 rounded border border-blue-400">
                <b>Latest Lab Upload:</b> {labResults[g.name].labReport}
                <ul>
                  {labResults[g.name].extractedParams.map((p,idx) =>
                    <li key={idx}>
                      <b>{p.name}</b>: {p.value} <span style={{color: p.status==="PASS"?"green":"red"}}>{p.status}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

