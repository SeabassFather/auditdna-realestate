<<<<<<< HEAD
// C:\AuditDNA\MiniAPI\server.js
=======
﻿// C:\AuditDNA\MiniAPI\server.js
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // allow http://localhost:3000
app.use(express.json());

const series = (base) =>
  Array.from({ length: 26 }, (_, i) => ({
    week: i + 1,
    price: +(base + Math.sin(i / 3) * 3 + i * 0.15).toFixed(2),
  }));

const DATASET = {
  Papaya: {
    varieties: ["Maradol", "Tainung"],
    unit: "$/case",
    market: "US composite",
    years: {
      2020: series(18.5),
      2021: series(19.2),
      2022: series(20.1),
      2023: series(21.4),
      2024: series(22.0),
    },
  },
  Orange: {
    varieties: ["Navel", "Valencia"],
    unit: "$/40lb",
    market: "US composite",
    years: {
      2020: series(24.0),
      2021: series(25.0),
      2022: series(26.1),
      2023: series(27.3),
      2024: series(28.0),
    },
  },
  Avocado: {
    varieties: ["Hass"],
    unit: "$/40lb",
    market: "US composite",
    years: {
      2020: series(32.0),
      2021: series(29.5),
      2022: series(35.0),
      2023: series(31.0),
      2024: series(34.0),
    },
  },
};

// GET /usda/prices?commodity=Papaya
app.get("/usda/prices", (req, res) => {
  const name = (req.query.commodity || "").trim();
  const entry = DATASET[name];
  if (!entry) {
    return res.status(404).json({ error: `Unknown commodity: ${name}` });
  }
  res.json({ commodity: name, ...entry });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Mini API listening on http://127.0.0.1:${PORT}`);
});
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
