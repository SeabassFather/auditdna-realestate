import React, { useState } from "react";
import {
  Upload,
  FlaskConical,
  FileText,
  FileUp,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

// Tabs for main sections
const tabs = [
  { key: "water", label: "Water Lab Reports", icon: FlaskConical },
  { key: "soil", label: "Soil Testing & Compliance", icon: ShieldCheck },
  { key: "marketing", label: "Marketing Services", icon: TrendingUp },
  { key: "upload", label: "Upload Center", icon: FileUp },
];

function WaterLabReports() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        Primary Water Quality Parameters
      </h2>
      <ul className="list-disc pl-6 text-slate-700">
        <li>
          <b>pH (6.5-8.4 optimal range):</b> Measures water acidity/alkalinity
        </li>
        <li>
          <b>Electrical Conductivity (EC):</b> Measures dissolved salt content
        </li>
        <li>
          <b>Total Dissolved Solids (TDS):</b> Total concentration of dissolved
          substances
        </li>
        <li>
          <b>Hardness:</b> Calcium and magnesium content (50-150 ppm optimal)
        </li>
        <li>
          <b>Alkalinity:</b> Water's buffering capacity (30-150 mg/L optimal)
        </li>
      </ul>
      <h3 className="text-xl font-bold text-blue-700 mt-6">
        Secondary Analysis Parameters
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>
          <b>Sodium Adsorption Ratio (SAR):</b> Sodium hazard assessment
        </li>
        <li>
          <b>Sodium Percentage (%Na):</b> Relative sodium concentration
        </li>
        <li>
          <b>Chloride levels:</b> Plant toxicity and equipment corrosion
          potential
        </li>
        <li>
          <b>Sulfate content:</b> Taste and scale formation
        </li>
        <li>
          <b>Nitrate-nitrogen:</b> Nutrient content analysis
        </li>
        <li>
          <b>Phosphorus and Potassium:</b> Essential nutrients
        </li>
        <li>
          <b>Boron:</b> Micronutrient/toxicity assessment
        </li>
      </ul>
      <h3 className="text-xl font-bold text-blue-700 mt-6">
        Specialized Testing
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Heavy metals (Iron, Manganese, Copper, Zinc)</li>
        <li>Carbonate/Bicarbonate levels</li>
        <li>Calcium and Magnesium individual analysis</li>
        <li>Residual Sodium Carbonate (RSC)</li>
        <li>Permeability Index (PI)</li>
      </ul>
      <p className="mt-4 text-xs text-slate-500">
        Sources: Penn State, Oklahoma State University, Interpreting Irrigation
        Water Tests
      </p>
    </div>
  );
}

function SoilTestingCompliance() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-2">
        Essential Soil Parameters
      </h2>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Soil pH and buffering capacity</li>
        <li>Soil salinity (ECe)</li>
        <li>Sodium content and exchangeable sodium percentage</li>
        <li>Cation Exchange Capacity (CEC)</li>
        <li>Nutrient levels (N-P-K, secondary and micronutrients)</li>
        <li>Organic matter content</li>
        <li>Soil texture analysis</li>
      </ul>
      <h3 className="text-xl font-bold text-teal-700 mt-6">
        Compliance Testing
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Environmental compliance for water discharge</li>
        <li>Agricultural runoff monitoring</li>
        <li>Irrigation efficiency assessments</li>
        <li>Before/after treatment comparisons</li>
        <li>Crop yield and quality documentation</li>
      </ul>
    </div>
  );
}

function MarketingServices() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-indigo-700 mb-2">
        Marketing Services for Sectors
      </h2>
      <h3 className="text-lg font-bold text-indigo-700 mt-2">
        For Agricultural Growers
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Irrigation efficiency audits and optimization</li>
        <li>Fertilizer reduction programs (20% savings guarantee)</li>
        <li>Crop yield enhancement services (20% increase guarantee)</li>
        <li>Scale prevention and equipment maintenance reduction</li>
        <li>Soil health improvement programs</li>
        <li>Water quality monitoring and reporting</li>
      </ul>
      <h3 className="text-lg font-bold text-indigo-700 mt-2">
        For Housing Communities/HOAs
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Landscape irrigation optimization</li>
        <li>Lawn and garden water efficiency programs</li>
        <li>Community water cost reduction initiatives</li>
        <li>Sustainable water management consulting</li>
        <li>Pool and recreational water treatment</li>
      </ul>
      <h3 className="text-lg font-bold text-indigo-700 mt-2">
        For Golf Courses and Turf Management
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Turf quality enhancement programs</li>
        <li>Irrigation system efficiency upgrades</li>
        <li>Chemical input reduction services</li>
        <li>Water conservation compliance assistance</li>
        <li>Course maintenance cost reduction</li>
      </ul>
      <h3 className="text-lg font-bold text-indigo-700 mt-2">
        For Commercial/Industrial Facilities
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Cooling tower scale prevention</li>
        <li>Boiler efficiency improvement</li>
        <li>Process water optimization</li>
        <li>Equipment maintenance reduction</li>
        <li>Environmental compliance assistance</li>
      </ul>
      <h3 className="text-lg font-bold text-indigo-700 mt-2">
        For Nurseries and Greenhouses
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Plant health and growth optimization</li>
        <li>Nutrient efficiency programs</li>
        <li>Disease and pest management support</li>
        <li>Water quality monitoring systems</li>
        <li>Organic certification support</li>
      </ul>
      <h3 className="text-lg font-bold text-indigo-700 mt-2">
        Additional Service Opportunities
      </h3>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Water treatment system consultation</li>
        <li>ROI analysis and financial reporting</li>
        <li>Ongoing monitoring and support services</li>
        <li>Compliance documentation and reporting</li>
        <li>Technology integration with existing systems</li>
      </ul>
      <p className="mt-4 text-xs text-slate-500">
        <b>Note:</b> We guarantee 20% reduction in water/fertilizer/chemicals
        and a 20% yield increase, backed by a one-year money-back guarantee.
      </p>
    </div>
  );
}

function UploadCenter() {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, upload the file and info to backend here
    alert("Uploaded! Our team will analyze your submission.");
    setFile(null);
    setInfo("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">Upload Center</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-slate-700 font-semibold mb-2">
          Upload Water/Soil Reports, Lab Analyses, or Test Results
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.png"
          onChange={handleFileChange}
          className="block w-full mb-2"
        />
        <label className="block text-slate-700 font-semibold mb-2">
          Additional Information (e.g. soil type, plant type, water use,
          location, notes)
        </label>
        <textarea
          rows={4}
          value={info}
          onChange={handleInfoChange}
          placeholder="Describe your soil type, plant variety, water source, application, or any other details..."
          className="block w-full p-2 border border-blue-200 rounded-md"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
        >
          Submit for Audit
        </button>
      </form>
      <p className="mt-2 text-xs text-slate-500">
        All uploads are securely handled for analysis. Our team will determine
        process frequency and design recommendations based on your data.
      </p>
    </div>
  );
}

export default function AuditDNAWaterSolutionTechnology() {
  const [activeTab, setActiveTab] = useState("water");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        AuditDNA Water Solution Technology
      </h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <nav className="md:w-1/4">
          <ul className="space-y-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.key}>
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-xl font-semibold text-left transition 
                      ${activeTab === tab.key ? "bg-blue-100 text-blue-900 shadow-lg" : "bg-white text-slate-700"}
                      hover:bg-blue-50`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <Icon className="mr-3 text-blue-600" />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Tab Content */}
        <section className="flex-1 bg-white rounded-2xl shadow-md p-8">
          {activeTab === "water" && <WaterLabReports />}
          {activeTab === "soil" && <SoilTestingCompliance />}
          {activeTab === "marketing" && <MarketingServices />}
          {activeTab === "upload" && <UploadCenter />}
        </section>
      </div>
    </div>
  );
}
