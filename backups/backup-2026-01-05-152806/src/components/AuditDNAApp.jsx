import React, { useState } from "react";
import {
  BarChart3, Shield, FileText, Upload, Search as SearchIcon, TrendingUp, Leaf, CreditCard, DollarSign, ChevronDown, ChevronRight
} from "lucide-react";
import servicesCatalogue from "./auditdna-services-catalogue.jsx"; 
import AuditDNAApiService from "./audit-dna-search"; 
import { ESCROW_AUDITING_DETAILS, getEscrowAuditDetail } from "./data/escrowAuditingDetails";

const proModules = [
  {
    key: "mortgage",
    label: "Mortgage/Factoring Search",
    color: "#00ff88",
    icon: <BarChart3 size={22} />, 
    desc: "US/Mexico cross-border loan & factoring engine.",
  },
  {
    key: "usda",
    label: "USDA 5-Year Avg Pricing",
    color: "#4a96ff",
    icon: <TrendingUp size={22} />, 
    desc: "Commodity pricing dashboard with 5yr overlay.",
  },
  {
    key: "water",
    label: "Water Tech Upload/Analysis",
    color: "#84cc16",
    icon: <Leaf size={22} />, 
    desc: "Lab PDF/CSV upload, analytics, compliance.",
  },
  {
    key: "compliance",
    label: "Global Compliance & Ethics",
    color: "#ffb347",
    icon: <Shield size={22} />, 
    desc: "Search regulations, export briefing kits.",
  },
  {
    key: "search",
    label: "Search Engines",
    color: "#ff6b6b",
    icon: <SearchIcon size={22} />, 
    desc: "6 integrated search engines with tabbed interface.",
  }
];

// Enhanced Accordion Section for Left Pane with Sub-Categories
function AccordionNav({ categories, active, setActive, activeSubCategory, setActiveSubCategory, onSelectService }) {
  return (
    <aside className="accordion-nav">
      {categories.map(cat => (
        <div key={cat.key} className="accordion-section">
          <button
            className={`accordion-header${active === cat.key ? " active" : ""}`}
            onClick={() => setActive(cat.key)}
            style={{ borderLeftColor: cat.color }}
          >
            <span className="icon">{cat.icon}</span>
            <span>{cat.label}</span>
            {active === cat.key ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {active === cat.key && (
            <div className="accordion-body">
              {cat.subCategories ? (
                // Sub-categories structure
                cat.subCategories.map((subCat) => (
                  <div key={subCat.key} className="sub-accordion">
                    <button
                      className={`sub-accordion-header${activeSubCategory === subCat.key ? " active" : ""}`}
                      onClick={() => setActiveSubCategory(activeSubCategory === subCat.key ? null : subCat.key)}
                    >
                      <span className="sub-icon">{subCat.icon}</span>
                      <span>{subCat.label}</span>
                      <span className="service-count">({subCat.services.length})</span>
                      {activeSubCategory === subCat.key ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {activeSubCategory === subCat.key && (
                      <div className="sub-accordion-body">
                        {subCat.services.map((svc) => (
                          <div key={svc} className="accordion-service">
                            <button
                              className="service-link"
                              onClick={() => onSelectService(cat, subCat, svc)}
                            >
                              {svc}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                // Legacy services structure (fallback)
                cat.services?.map((svc, i) => (
                  <div key={svc} className="accordion-service">
                    <button
                      className="service-link"
                      onClick={() => onSelectService(cat, null, svc)}
                    >
                      {svc}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}

// Enhanced Service Panel with Escrow Auditing Details
function ServicePanel({ category, subCategory, service, uploading, uploadSuccess, uploadError, handleUpload }) {
  const escrowDetail = getEscrowAuditDetail(service);
  
  if (escrowDetail) {
    return (
      <div className="service-panel enhanced-panel">
        <div className="service-header">
          <div className="title">{service}</div>
          <div className="category-badge">{escrowDetail.category}</div>
          <div className={`priority-badge priority-${escrowDetail.priority.toLowerCase()}`}>
            {escrowDetail.priority}
          </div>
        </div>
        
        <div className="service-meta">
          <div className="timeframe">Estimated Time: {escrowDetail.timeframe}</div>
          <div className="brief">{escrowDetail.brief}</div>
        </div>

        <div className="process-section">
          <h3>Process Steps</h3>
          <div className="process-list">
            {escrowDetail.process?.map((step, index) => (
              <div key={index} className="process-step">
                <span className="step-number">{index + 1}</span>
                <span className="step-text">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="checklist-section">
          <h3>Checklist</h3>
          <div className="checklist">
            {escrowDetail.checklist?.map((item, index) => (
              <div key={index} className="checklist-item">
                <input 
                  type="checkbox" 
                  id={`check-${index}`}
                  defaultChecked={item.completed}
                />
                <label htmlFor={`check-${index}`}>{item.item}</label>
              </div>
            ))}
          </div>
        </div>

        {escrowDetail.redFlags && (
          <div className="red-flags-section">
            <h3>Red Flags to Monitor</h3>
            <div className="red-flags-list">
              {escrowDetail.redFlags.map((flag, index) => (
                <div key={index} className="red-flag-item">
                  <span className="flag-icon">
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {escrowDetail.quickTests && (
          <div className="quick-tests-section">
            <h3>Quick Tests</h3>
            <div className="quick-tests-list">
              {escrowDetail.quickTests.map((test, index) => (
                <div key={index} className="quick-test-item">
                  <div className="test-header">
                    <span className="test-name">{test.test}</span>
                    <span className="test-duration">{test.duration}</span>
                  </div>
                  <div className="test-description">{test.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {escrowDetail.raciMatrix && (
          <div className="raci-section">
            <h3>RACI Matrix</h3>
            <div className="raci-table">
              <div className="raci-header">
                <div>Activity</div>
                <div>Responsible</div>
                <div>Accountable</div>
                <div>Consulted</div>
                <div>Informed</div>
              </div>
              {escrowDetail.raciMatrix.map((row, index) => (
                <div key={index} className="raci-row">
                  <div>{row.activity}</div>
                  <div>{row.responsible}</div>
                  <div>{row.accountable}</div>
                  <div>{row.consulted}</div>
                  <div>{row.informed}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="action-buttons">
          {escrowDetail.actionButtons?.map((button, index) => (
            <button key={index} className="action-btn">
              {button}
            </button>
          ))}
        </div>

        <div className="deliverables-section">
          <h3>Expected Deliverables</h3>
          <div className="deliverables-list">
            {escrowDetail.deliverables?.map((deliverable, index) => (
              <div key={index} className="deliverable-item">
                <FileText size={16} />
                <span>{deliverable}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Standard service panel for non-escrow services
  return (
    <div className="service-panel">
      <div className="title">{service}</div>
      <div className="desc">
        Upload all required documentation to begin your <b>{service}</b> audit/compliance verification.
      </div>
      <div>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.png"
          style={{ display: "none" }}
          id={`upload-${service}`}
          onChange={e => handleUpload(e, service)}
          disabled={uploading}
        />
        <label htmlFor={`upload-${service}`}> 
          <button className="upload-btn" disabled={uploading}>
            <Upload className="w-5 h-5" />
            {uploading ? "Uploading..." : "Upload Documentation"}
          </button>
        </label>
        {uploadSuccess && (
          <div className="upload-success">Upload successful!</div>
        )}
        {uploadError && (
          <div className="upload-error">Upload failed. Try again.</div>
        )}
      </div>
    </div>
  );
}

// Search Engines View Component
function SearchEnginesView() {
  const [activeEngine, setActiveEngine] = useState(0);
  const [query, setQuery] = useState("");
  
  const searchEngines = [
    {
      name: "Google",
      url: "https://www.google.com/search?q=",
      color: "#4285F4",
      icon: "
    },
    {
      name: "Bing", 
      url: "https://www.bing.com/search?q=",
      color: "#2580d5",
      icon: "
    },
    {
      name: "DuckDuckGo",
      url: "https://duckduckgo.com/?q=",
      color: "#DE5833", 
      icon: "
    },
    {
      name: "USDA Database",
      url: "https://www.usda.gov/search?search=",
      color: "#417505",
      icon: "
    },
    {
      name: "SEC EDGAR",
      url: "https://www.sec.gov/edgar/search/#/q=",
      color: "#1f4e79",
      icon: "
    },
    {
      name: "Legal Research",
      url: "https://scholar.google.com/scholar?q=",
      color: "#34495e",
      icon: "
    }
  ];

  const handleSearch = (engine) => {
    if (query.trim()) {
      const searchUrl = engine.url + encodeURIComponent(query.trim());
      window.open(searchUrl, '_blank');
    }
  };

  return (
    <div className="search-engines-view">
      <div className="search-header">
        <h2>Search Engines</h2>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Enter search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchEngines[activeEngine])}
          />
        </div>
      </div>
      
      <div className="search-tabs">
        {searchEngines.map((engine, index) => (
          <button
            key={engine.name}
            className={`search-tab ${activeEngine === index ? 'active' : ''}`}
            onClick={() => setActiveEngine(index)}
            style={{
              borderColor: activeEngine === index ? engine.color : '#ccc',
              color: activeEngine === index ? engine.color : '#666'
            }}
          >
            <span className="engine-icon">{engine.icon}</span>
            {engine.name}
          </button>
        ))}
      </div>

      <div className="search-engine-panel">
        <div className="engine-info">
          <h3>{searchEngines[activeEngine].name}</h3>
          <p>Search the web using {searchEngines[activeEngine].name}</p>
        </div>
        
        <button 
          onClick={() => handleSearch(searchEngines[activeEngine])}
          className="primary-search-btn"
          style={{ backgroundColor: searchEngines[activeEngine].color }}
          disabled={!query.trim()}
        >
          Search with {searchEngines[activeEngine].name}
        </button>

        <div className="search-all-section">
          <h4>Search All Engines</h4>
          <div className="search-all-buttons">
            {searchEngines.map((engine) => (
              <button
                key={engine.name}
                onClick={() => handleSearch(engine)}
                className="engine-search-btn"
                style={{ borderColor: engine.color }}
                disabled={!query.trim()}
              >
                {engine.icon} {engine.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Top Pro Module Row
function ProModuleRow({ modules, activeModule, setActiveModule }) {
  return (
    <div className="pro-modules-row">
      {modules.map(mod =>
        <button
          className={`pro-module-btn${activeModule === mod.key ? " active" : ""}`}
          key={mod.key}
          onClick={() => setActiveModule(mod.key)}
          style={{
            borderColor: activeModule === mod.key ? mod.color : "#232d44",
            color: activeModule === mod.key ? mod.color : undefined
          }}
        >
          {mod.icon}
          <span>{mod.label}</span>
        </button>
      )}
    </div>
  );
}

// Main Dashboard Layout
export default function AuditDNAApp() {
  const [activeCategory, setActiveCategory] = useState(servicesCatalogue[0].key);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [selectedService, setSelectedService] = useState({ 
    category: servicesCatalogue[0], 
    subCategory: null,
    service: servicesCatalogue[0].subCategories ? servicesCatalogue[0].subCategories[0].services[0] : "Mortgage Loan Audit"
  });
  const [activeModule, setActiveModule] = useState(null); // null = show service panel
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  // Upload Handler
  const handleUpload = async (e, svc) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setUploadSuccess(false); setUploadError(false);
    try {
      const formData = new FormData();
      formData.append("service", svc);
      formData.append("category", activeCategory);
      formData.append("file", file);
      await fetch("/api/services/upload", { method: "POST", body: formData });
      setUploading(false); setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    } catch {
      setUploading(false); setUploadError(true);
      setTimeout(() => setUploadError(false), 2000);
    }
  };

  // Enhanced Service Selection Handler
  const handleSelectService = (cat, subCat, svc) => {
    setActiveModule(null);
    setActiveCategory(cat.key);
    setSelectedService({ category: cat, subCategory: subCat, service: svc });
  };

  // --- CSS ---
  // (All premium CSS, dark, boxed, glowing, sticky left, etc.)
  // You can move this to a CSS file if desired.
  return (
    <div className="auditdna-root">
      <style>{`
        body, .auditdna-root { background: #12171e; color: #fff; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; min-height: 100vh; }
        .auditdna-layout { display: flex; justify-content: center; align-items: flex-start; padding: 0; min-height: 100vh; }
        .accordion-nav {
          width: 320px;
          background: #181e2f;
          border-radius: 1.7rem;
          box-shadow: 0 6px 32px #00ff8822;
          padding: 2.3rem 1.2rem 2.3rem 1.2rem;
          margin: 2.5rem 0 2.5rem 2.5rem;
          position: sticky; top: 1.5rem; align-self: flex-start;
          min-height: 500px;
        }
        .accordion-section { margin-bottom: 1.3rem; }
        .accordion-header {
          width: 100%; text-align: left; background: none; border: none; font-size: 1.13em; font-weight: 700;
          padding: 0.65em 0.5em; border-left: 4px solid #232d44; color: #d4eaff;
          border-radius: 0.6em; cursor: pointer; display: flex; align-items: center; gap: 0.7em;
          transition: all .15s;
        }
        .accordion-header.active, .accordion-header:focus {
          background: #232d44;
          border-left-color: #00ff88;
          color: #00ff88;
        }
        .accordion-body { margin-top: 0.41em; margin-left: 1.6em; }
        .accordion-service { margin-bottom: 0.31em; }
        .service-link {
          background: none; border: none; color: #b8c5d1; font-size: 1em; cursor: pointer; text-align: left;
          padding: .23em .13em; border-radius: .4em; transition: background .15s, color .15s;
        }
        .service-link:hover, .service-link:focus { background: #00ff8822; color: #00ff88; }
        .main-pane {
          flex: 1; min-width: 440px; max-width: 700px;
          margin: 2.5rem 2.2rem 2.5rem 0; background: linear-gradient(132deg,rgba(25,35,46,.98) 90%,#00ff8830 100%);
          box-shadow: 0 10px 80px #00ff8830; border-radius: 2.3rem; padding: 2.7rem 2.7rem 2.8rem 2.7rem;
          display: flex; flex-direction: column; align-items: center;
        }
        .pro-modules-row { display: flex; gap: 1.7rem; margin-bottom: 2.1rem; }
        .pro-module-btn {
          flex: 1; background: linear-gradient(110deg,#181e2f 80%,#fff0 100%);
          border-radius: 1.2rem; border: 2.5px solid #222b3a; color: #fff;
          font-size: 1.13rem; font-weight: 700; padding: 1.2rem 1.2rem 1.2rem 1.2rem;
          display: flex; flex-direction: column; align-items: center; cursor: pointer;
          transition: box-shadow .19s, border-color .19s, background .13s; box-shadow: 0 6px 32px #00ff8822; min-width: 160px; outline: none;
        }
        .pro-module-btn.active, .pro-module-btn:focus {
          border-color: #00ff88; background: linear-gradient(110deg,#111a24 40%,#00ff8830 100%);
          color: #00ff88; box-shadow: 0 2px 18px #00ff8844;
        }
        .service-panel {
          background: #171d2a; border-radius: 1.1em; border: 1.5px solid #222b3a; box-shadow: 0 8px 32px #00ff8855;
          padding: 2.1em 1.5em 1.8em 1.5em; margin-top: 1.5em; width: 100%; max-width: 600px;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .service-panel .title {
          font-size: 1.23em; font-weight: 800; color: #00ff88; margin-bottom: .41em;
        }
        .service-panel .desc { color: #b8c5d1; font-size: 1em; margin-bottom: 1.1em; }
        .upload-btn {
          background: linear-gradient(90deg,#00ff88,#4a96ff); color: #0a0b0f; font-weight: 600; border: none;
          border-radius: 10px; padding: 0.7em 1.5em; cursor: pointer; font-size: 1.05em; margin-top: .3em;
          transition: box-shadow .16s; box-shadow: 0 2px 15px #00ff8888;
        }
        .upload-btn:active { box-shadow: 0 2px 8px #00ff8855; }
        .upload-success { color: #00ff88; font-size: .95em; font-weight: 600; margin-top: 0.35em; }
        .upload-error { color: #ff4d4d; font-size: .95em; font-weight: 600; margin-top: 0.35em; }
        
        /* Sub-accordion styles */
        .sub-accordion { margin-left: 1em; margin-bottom: 0.8em; }
        .sub-accordion-header {
          width: 100%; text-align: left; background: none; border: none; font-size: 0.95em; font-weight: 600;
          padding: 0.5em 0.3em; color: #a8b5c2; border-radius: 0.5em; cursor: pointer; 
          display: flex; align-items: center; gap: 0.5em; transition: all .15s;
        }
        .sub-accordion-header.active, .sub-accordion-header:hover { background: #1a2332; color: #00ff88; }
        .sub-accordion-body { margin-top: 0.3em; margin-left: 1.5em; }
        .service-count { font-size: 0.8em; opacity: 0.7; margin-left: auto; margin-right: 0.5em; }
        
        /* Enhanced service panel styles */
        .enhanced-panel { max-width: none !important; }
        .service-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .category-badge { background: #4a96ff33; color: #4a96ff; padding: 0.3em 0.8em; border-radius: 0.8em; font-size: 0.85em; font-weight: 600; }
        .priority-badge { padding: 0.3em 0.8em; border-radius: 0.8em; font-size: 0.85em; font-weight: 600; }
        .priority-critical { background: #ff4d4d33; color: #ff4d4d; }
        .priority-high { background: #ff8c0033; color: #ff8c00; }
        .priority-medium { background: #ffd70033; color: #ffd700; }
        .service-meta { margin-bottom: 1.5rem; padding: 1rem; background: #1a2332; border-radius: 0.8em; }
        .timeframe { color: #4a96ff; font-weight: 600; margin-bottom: 0.5rem; }
        .brief { color: #d4eaff; line-height: 1.5; }
        
        .process-section, .checklist-section, .red-flags-section, .quick-tests-section, .raci-section, .deliverables-section { 
          margin-bottom: 2rem; 
        }
        .process-section h3, .checklist-section h3, .red-flags-section h3, .quick-tests-section h3, .raci-section h3, .deliverables-section h3 { 
          color: #00ff88; margin-bottom: 1rem; font-size: 1.1em; 
        }
        .process-list, .quick-tests-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .process-step { display: flex; align-items: flex-start; gap: 0.8rem; }
        .step-number { 
          background: #00ff88; color: #0a0b0f; width: 1.8em; height: 1.8em; border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9em; flex-shrink: 0;
        }
        .step-text { color: #d4eaff; line-height: 1.4; }
        
        .checklist { display: flex; flex-direction: column; gap: 0.6rem; }
        .checklist-item { display: flex; align-items: center; gap: 0.8rem; }
        .checklist-item input[type="checkbox"] { 
          width: 1.2em; height: 1.2em; accent-color: #00ff88; 
        }
        .checklist-item label { color: #d4eaff; cursor: pointer; }
        
        .red-flags-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .red-flag-item { display: flex; align-items: center; gap: 0.8rem; color: #ffb3b3; }
        
        .quick-test-item { padding: 1rem; background: #1a2332; border-radius: 0.6em; }
        .test-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .test-name { color: #00ff88; font-weight: 600; }
        .test-duration { color: #4a96ff; font-size: 0.9em; }
        .test-description { color: #d4eaff; font-size: 0.9em; line-height: 1.4; }
        
        .raci-table { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; }
        .raci-header { display: contents; font-weight: 600; color: #00ff88; }
        .raci-header > div { padding: 0.8rem; background: #1a2332; border-radius: 0.5em; }
        .raci-row { display: contents; }
        .raci-row > div { padding: 0.6rem; background: #232d44; border-radius: 0.3em; font-size: 0.9em; }
        
        .action-buttons { display: flex; gap: 1rem; margin: 2rem 0; flex-wrap: wrap; }
        .action-btn { 
          background: linear-gradient(90deg, #00ff88, #4a96ff); color: #0a0b0f; border: none;
          padding: 0.8rem 1.5rem; border-radius: 0.8em; font-weight: 600; cursor: pointer;
          transition: all .15s; box-shadow: 0 4px 15px #00ff8844;
        }
        .action-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px #00ff8866; }
        
        .deliverables-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .deliverable-item { display: flex; align-items: center; gap: 0.8rem; color: #d4eaff; }
        
        /* Search engines view styles */
        .search-engines-view { width: 100%; }
        .search-header { margin-bottom: 2rem; }
        .search-header h2 { color: #00ff88; margin-bottom: 1rem; }
        .search-input-container { margin-bottom: 1.5rem; }
        .search-input { 
          width: 100%; padding: 0.8rem 1rem; background: #1a2332; border: 2px solid #232d44;
          border-radius: 0.8em; color: #fff; font-size: 1rem;
        }
        .search-input:focus { border-color: #00ff88; outline: none; }
        
        .search-tabs { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .search-tab { 
          padding: 0.6rem 1rem; background: #1a2332; border: 2px solid #232d44; border-radius: 0.6em;
          color: #d4eaff; cursor: pointer; transition: all .15s; display: flex; align-items: center; gap: 0.5rem;
        }
        .search-tab.active { border-color: currentColor; background: #232d44; }
        .search-tab:hover { background: #232d44; }
        
        .search-engine-panel { padding: 2rem; background: #1a2332; border-radius: 1rem; }
        .engine-info h3 { color: #00ff88; margin-bottom: 0.5rem; }
        .engine-info p { color: #d4eaff; margin-bottom: 1.5rem; }
        .primary-search-btn { 
          padding: 1rem 2rem; border: none; border-radius: 0.8em; color: #fff; 
          font-weight: 600; cursor: pointer; margin-bottom: 2rem; font-size: 1.1rem;
        }
        .primary-search-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .search-all-section h4 { color: #4a96ff; margin-bottom: 1rem; }
        .search-all-buttons { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .engine-search-btn { 
          padding: 0.8rem 1rem; background: #232d44; border: 2px solid; border-radius: 0.6em;
          color: #d4eaff; cursor: pointer; transition: all .15s;
        }
        .engine-search-btn:hover { background: #2a3b52; }
        .engine-search-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
      <div className="auditdna-layout">
        {/* Accordion Left Pane */}
        <AccordionNav
          categories={servicesCatalogue}
          active={activeCategory}
          setActive={setActiveCategory}
          activeSubCategory={activeSubCategory}
          setActiveSubCategory={setActiveSubCategory}
          onSelectService={handleSelectService}
        />
        {/* Main Pane */}
        <div className="main-pane">
          {/* Pro Module Buttons */}
          <ProModuleRow
            modules={proModules}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
          {/* Main Content */}
          {activeModule === "search" ? (
            <SearchEnginesView />
          ) : activeModule ? (
            <div style={{ width: "100%", marginTop: "2.5rem", color: "#fff", textAlign: "center" }}>
              <b>{proModules.find((m)=>m.key===activeModule)?.label}</b>
              <div style={{ opacity: 0.7, fontSize: "1.04em", margin: "1em 0 2em 0" }}>
                <i>[Module dashboard would be rendered here. Plug in your search engine/module component for "{activeModule}".]</i>
              </div>
            </div>
          ) : (
            <ServicePanel
              category={selectedService.category}
              subCategory={selectedService.subCategory}
              service={selectedService.service}
              uploading={uploading}
              uploadSuccess={uploadSuccess}
              uploadError={uploadError}
              handleUpload={handleUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
}

