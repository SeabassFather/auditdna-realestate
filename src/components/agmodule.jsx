import React, { useState, useEffect } from "react";

function Ticker({ label, endpoint }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let id = setInterval(async () => {
      try {
        const r = await fetch(endpoint);
        const j = await r.json();
        setData(j.slice(0, 5)); // show latest 5 entries
      } catch (e) {
        console.error("Ticker error", e);
      }
    }, 3000);
    return () => clearInterval(id);
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-title">{label} Ticker</div>
      <ul>
        {data.map((row, i) => (
          <li key={i} className="subtext">
            {JSON.stringify(row)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AgModule() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchProduce = async () => {
    try {
      const r = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${
          process.env.REACT_APP_USDA_API_KEY
        }&query=${encodeURIComponent(query)}`,
      );
      const j = await r.json();
      setResults(j.foods || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4">
      <h2 className="h2"> Agriculture Module</h2>
      <div className="grid">
        <div className="card">
          <div className="card-title"> Water Management</div>
          <p className="subtext">
            Track irrigation audits, water usage efficiency, and compliance.
          </p>
        </div>

        <div className="card">
          <div className="card-title"> Factoring</div>
          <p className="subtext">
            Provide financing for farmers against accounts receivable.
          </p>
        </div>

        <div className="card">
          <div className="card-title"> Produce Market Search</div>
          <input
            type="text"
            className="filter"
            placeholder="Search USDA commodities (e.g. Papaya, Oranges)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn" onClick={searchProduce}>
            Search
          </button>
          <ul>
            {results.slice(0, 5).map((f) => (
              <li key={f.fdcId} className="subtext">
                {f.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="h2" style={{ marginTop: "20px" }}>
          Live Tickers
      </h3>
      <div className="grid">
        <Ticker label="Corn Prices" endpoint="/api/ticker/corn" />
        <Ticker label="Wheat Prices" endpoint="/api/ticker/wheat" />
        <Ticker label="Water Rights" endpoint="/api/ticker/water" />
      </div>
    </div>
  );
}


