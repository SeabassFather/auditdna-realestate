import React, { useMemo, useState } from "react";

/**
 * COMPLETE, SELF-CONTAINED UI (no extra files):
 * - Search box for commodity
 * - Half selector (W1 / W27
 * - Year toggles (multi-select)
 * - KPIs (means, YoY change, peak week)
 * - SVG line chart (multiple years + 5-yr avg)
 * - Data table (weeks x series)
 *
 * TODO (later): swap DATA for live USDA feed.
 */

const DATA = {
  Papaya: {
    unit: "$/lb",
    years: {
      2020: [
        1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.0, 1.0, 1.1, 1.1, 1.1, 1.2, 1.2, 1.3,
        1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2,
        1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3, 1.2,
        1.2, 1.1, 1.1, 1.1, 1.0, 1.0, 1.1, 1.1, 1.2, 1.2,
      ],
      2021: [
        1.1, 1.1, 1.1, 1.1, 1.0, 1.0, 1.0, 1.0, 1.1, 1.1, 1.2, 1.2, 1.3, 1.3,
        1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.0, 1.0, 1.0, 1.1, 1.1, 1.1, 1.1,
        1.2, 1.2, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.0, 1.0, 1.0,
        1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1,
      ],
      2022: [
        1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.3, 1.4, 1.4,
        1.4, 1.4, 1.3, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2,
        1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2,
        1.2, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.3, 1.3,
      ],
      2023: [
        1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.0, 1.0, 1.1, 1.1, 1.2, 1.2, 1.2, 1.3,
        1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2,
        1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.3, 1.3,
        1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2,
      ],
      2024: [
        1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.2, 1.2, 1.2, 1.3, 1.3, 1.4,
        1.4, 1.4, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3, 1.3,
        1.4, 1.4, 1.4, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3, 1.2,
        1.2, 1.2, 1.1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2,
      ],
    },
  },
  "Oranges (Navel)": {
    unit: "$/lb",
    years: {
      2020: [
        1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5,
        1.5, 1.5, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.4,
        1.5, 1.5, 1.5, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.4,
        1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.4,
      ],
      2021: [
        1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5,
        1.5, 1.5, 1.4, 1.4, 1.4, 1.3, 1.3, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3, 1.3,
        1.4, 1.4, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.4, 1.4,
        1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.4,
      ],
      2022: [
        1.6, 1.6, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.6, 1.7, 1.7,
        1.7, 1.7, 1.6, 1.6, 1.6, 1.5, 1.5, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5,
        1.6, 1.6, 1.6, 1.6, 1.5, 1.5, 1.5, 1.5, 1.6, 1.6, 1.6, 1.5, 1.5, 1.5,
        1.5, 1.4, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5,
      ],
      2023: [
        1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5, 1.5, 1.6,
        1.6, 1.6, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5,
        1.6, 1.6, 1.5, 1.5, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5, 1.6, 1.6,
        1.6, 1.5, 1.5, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5,
      ],
      2024: [
        1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.5, 1.5, 1.6, 1.6, 1.6, 1.7, 1.8, 1.8,
        1.8, 1.8, 1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.7,
        1.8, 1.8, 1.8, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.6,
        1.6, 1.6, 1.5, 1.5, 1.5, 1.5, 1.6, 1.6, 1.6, 1.6,
      ],
    },
  },
};

// ----------------- MAIN PAGE -----------------
export default function AgMarket() {
  const commodities = Object.keys(DATA);
  const [commodity, setCommodity] = useState(commodities[0]);
  const [half, setHalf] = useState("H1"); // W1 or W27
  const [showYears, setShowYears] = useState(
    () => new Set(getYears(DATA, commodities[0]).slice(-2)),
  );

  const years = useMemo(() => getYears(DATA, commodity), [commodity]);

  const { byYear, avg, halfRange } = useMemo(() => {
    const hr = half === "H1" ? [1, 26] : [27, 52];
    const allYears = getYears(DATA, commodity);
    const series = allYears.map((y) => ({
      year: y,
      weeks: sliceWeeks(DATA[commodity]?.years?.[y] || [], hr),
    }));
    const avg = computeAverage(series.map((s) => s.weeks));
    return { byYear: series, avg, halfRange: hr };
  }, [commodity, half]);

  // KPIs
  const kpi = useMemo(() => {
    const latestYear = years[years.length - 1];
    const prevYear = years[years.length - 2];
    const latestArr = byYear.find((s) => s.year === latestYear)?.weeks || [];
    const prevArr = byYear.find((s) => s.year === prevYear)?.weeks || [];
    const latestMean = mean(latestArr);
    const prevMean = mean(prevArr);
    const yoy = percentChange(prevMean, latestMean);
    const peakIdx = maxIdx(latestArr);
    return { latestYear, prevYear, latestMean, prevMean, yoy, peakIdx };
  }, [years, byYear]);

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gap: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>Ag Market  {commodity}</h2>
        <span style={badge}>Source: sample JSON (swap to USDA when ready)</span>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <CommoditySearch
          options={commodities}
          value={commodity}
          onSelect={(c) => {
            setCommodity(c);
            setShowYears(new Set(getYears(DATA, c).slice(-2)));
          }}
          placeholder="Search commodity (Papaya, Oranges)
        />

        <label
          style={{
            fontSize: 12,
            display: "inline-flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          Half:
          <select
            value={half}
            onChange={(e) => setHalf(e.target.value)}
            style={{
              padding: "6px 8px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
            }}
          >
            <option value="H1">W1
            <option value="H2">W27
          </select>
        </label>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 12, opacity: 0.8 }}>Show years:</span>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => {
                const next = new Set(showYears);
                next.has(y) ? next.delete(y) : next.add(y);
                setShowYears(next);
              }}
              style={{
                fontSize: 12,
                padding: "6px 8px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: showYears.has(y) ? "#111" : "#fff",
                color: showYears.has(y) ? "#fff" : "#111",
                cursor: "pointer",
              }}
              type="button"
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div style={cardGrid}>
        <MetricCard
          title={`Mean (${kpi.latestYear ?? "
          value={fmt(kpi.latestMean)}
          sub={halfLabel(half)}
        />
        <MetricCard
          title={`Mean (${kpi.prevYear ?? "
          value={fmt(kpi.prevMean)}
          sub="YoY base"
        />
        <MetricCard
          title="YoY  %"
          value={isFinite(kpi.yoy) ? `${kpi.yoy.toFixed(1)}%` : "
          sub="(current vs prev)"
        />
        <MetricCard
          title="Peak week (curr)"
          value={kpi.peakIdx ? `W${kpi.peakIdx}` : "
          sub="Local max index"
        />
      </div>

      {/* Chart */}
      <CommodityChart
        title={`${commodity}  ${half === "H1" ? "Weeks 1 : "Weeks 27
        unit={DATA[commodity]?.unit || "$/lb"}
        weeks={range(halfRange[0], halfRange[1])}
        series={[
          ...byYear
            .filter((s) => showYears.has(s.year))
            .map((s) => ({ name: String(s.year), values: s.weeks })),
          { name: "5-yr Avg", values: avg, thick: true },
        ]}
      />

      {/* Data table */}
      <DataTable
        weeks={range(halfRange[0], halfRange[1])}
        series={[
          ...byYear
            .filter((s) => showYears.has(s.year))
            .map((s) => ({ name: String(s.year), values: s.weeks })),
          { name: "5-yr Avg", values: avg },
        ]}
      />
    </div>
  );
}

// ----------------- SMALL COMPONENTS -----------------
function CommoditySearch({ options = [], value, onSelect, placeholder }) {
  const [q, setQ] = useState(value || "");
  const list = useMemo(() => {
    const t = (q || "").trim().toLowerCase();
    if (!t) return options.slice(0, 12);
    return options.filter((o) => o.toLowerCase().includes(t)).slice(0, 12);
  }, [q, options]);

  return (
    <div style={{ position: "relative", minWidth: 260 }}>
      <input
        aria-label="Commodity"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const pick = list[0] || q;
            setQ(pick);
            if (typeof onSelect === "function") onSelect(pick);
          }
        }}
        placeholder={placeholder || "Commodity
        style={{
          padding: "8px 10px",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          width: "100%",
        }}
      />
      {q && (
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            zIndex: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {list.map((opt) => (
            <div
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault();
                setQ(opt);
                if (typeof onSelect === "function") onSelect(opt);
              }}
              style={{ padding: "8px 10px", cursor: "pointer" }}
            >
              {opt}
            </div>
          ))}
          {list.length === 0 && (
            <div
              style={{ padding: "8px 10px", color: "#6b7280", fontSize: 12 }}
            >
              No matches
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CommodityChart({ title, unit = "$/lb", weeks = [], series = [] }) {
  const dims = { w: 1000, h: 380, pad: 48 };
  const flat = series
    .flatMap((s) => s.values)
    .filter((v) => Number.isFinite(v));
  const yMin = Math.max(0, Math.min(...flat) - 0.2);
  const yMax = Math.max(...flat, 1) + 0.2;

  const x = (i) =>
    dims.pad + (i * (dims.w - 2 * dims.pad)) / Math.max(1, weeks.length - 1);
  const y = (val) =>
    dims.h -
    dims.pad -
    ((val - yMin) / (yMax - yMin || 1)) * (dims.h - 2 * dims.pad);

  const xTicks = [];
  for (let i = 0; i < weeks.length; i++)
    if (i % 5 === 0 || i === weeks.length - 1) xTicks.push({ i, w: weeks[i] });

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <div
        style={{
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <strong>{title}</strong>
        <span style={{ fontSize: 12, color: "#6b7280" }}>{unit}</span>
      </div>
      <svg
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        width="100%"
        height="auto"
        role="img"
      >
        <line
          x1={dims.pad}
          y1={dims.h - dims.pad}
          x2={dims.w - dims.pad}
          y2={dims.h - dims.pad}
          stroke="#e5e7eb"
        />
        <line
          x1={dims.pad}
          y1={dims.pad}
          x2={dims.pad}
          y2={dims.h - dims.pad}
          stroke="#e5e7eb"
        />
        {niceTicks(yMin, yMax, 6).map((t) => (
          <g key={`y-${t}`}>
            <line
              x1={dims.pad}
              y1={y(t)}
              x2={dims.w - dims.pad}
              y2={y(t)}
              stroke="#f3f4f6"
            />
            <text
              x={dims.pad - 8}
              y={y(t)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="10"
            >
              {t.toFixed(1)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text
            key={`x-${t.i}`}
            x={x(t.i)}
            y={dims.h - dims.pad + 14}
            textAnchor="middle"
            fontSize="10"
          >
            W{t.w}
          </text>
        ))}
        {series.map((s, idx) => {
          const pts = s.values
            .map((v, i) => [x(i), y(v)])
            .filter(([, yy]) => Number.isFinite(yy));
          const path = pts
            .map(([xx, yy], i) => (i === 0 ? `M ${xx} ${yy}` : `L ${xx} ${yy}`))
            .join(" ");
          const stroke = s.thick ? "#111" : palette(idx);
          const sw = s.thick ? 3 : 1.6;
          const dash = s.dashed ? "5,5" : "0";
          return (
            <path
              key={s.name}
              d={path}
              fill="none"
              stroke={stroke}
              strokeWidth={sw}
              strokeDasharray={dash}
              opacity={s.thick ? 1 : 0.9}
            />
          );
        })}
        <Legend series={series} x={dims.pad} y={dims.pad - 12} />
      </svg>
    </div>
  );
}

function Legend({ series, x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {series.map((s, i) => (
        <g key={s.name} transform={`translate(${i * 130},0)`}>
          <rect
            width="10"
            height="10"
            y="-10"
            fill={s.thick ? "#111" : palette(i)}
          />
          <text x="14" y="-2" fontSize="10">
            {s.name}
          </text>
        </g>
      ))}
    </g>
  );
}

function MetricCard({ title, value, sub }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: 12,
        background: "#fafafa",
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>
        {title}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
      {sub ? <div style={{ fontSize: 12, color: "#6b7280" }}>{sub}</div> : null}
    </div>
  );
}

function DataTable({ weeks = [], series = [] }) {
  const headers = ["Week", ...series.map((s) => s.name)];
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <strong>Weekly values</strong>
        <span style={badge}>read-only</span>
      </div>
      <div style={{ padding: "12px 16px", overflowX: "auto" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} style={thtd(true)}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((w, i) => (
              <tr key={w}>
                <td style={thtd()}>{`W${w}`}</td>
                {series.map((s) => (
                  <td key={s.name + "-" + i} style={thtd()}>
                    {fmt2(s.values[i])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------- UTILS -----------------
function getYears(db, key) {
  return Object.keys(db[key]?.years || {})
    .map((x) => Number(x))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
}
function sliceWeeks(weeks, [start, end]) {
  const s = Math.max(1, start) - 1;
  const e = Math.min(52, end) - 1;
  const out = [];
  for (let i = s; i <= e; i++) out.push(Number(weeks[i] ?? NaN));
  return out;
}
function computeAverage(arrays) {
  if (!arrays.length) return [];
  const len = Math.max(...arrays.map((a) => a.length));
  const out = [];
  for (let i = 0; i < len; i++) {
    const nums = arrays.map((a) => a[i]).filter((v) => Number.isFinite(v));
    out.push(
      nums.length
        ? Math.round((nums.reduce((p, c) => p + c, 0) / nums.length) * 100) /
            100
        : NaN,
    );
  }
  return out;
}
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const mean = (arr) => {
  const v = arr.filter(Number.isFinite);
  return v.length ? v.reduce((p, c) => p + c, 0) / v.length : NaN;
};
const percentChange = (oldV, newV) =>
  Number.isFinite(oldV) && oldV !== 0 && Number.isFinite(newV)
    ? ((newV - oldV) / oldV) * 100
    : NaN;
const maxIdx = (arr) => {
  let m = -Infinity,
    idx = 0;
  for (let i = 0; i < arr.length; i++)
    if (Number.isFinite(arr[i]) && arr[i] > m) {
      m = arr[i];
      idx = i + 1;
    }
  return idx;
};
const fmt = (n) => (Number.isFinite(n) ? `$${n.toFixed(2)}` : "
const fmt2 = (n) => (Number.isFinite(n) ? n.toFixed(2) : "
const halfLabel = (h) => (h === "H1" ? "Weeks 1 : "Weeks 27
const palette = (i) =>
  ["#2563eb", "#16a34a", "#ea580c", "#9333ea", "#dc2626", "#059669", "#eab308"][
    i % 7
  ];
const badge = {
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 999,
  background: "#f3f4f6",
  color: "#111",
  border: "1px solid #e5e7eb",
};
const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: 12,
};
const thtd = (head = false) => ({
  borderBottom: "1px solid #e5e7eb",
  padding: "8px",
  textAlign: head ? "left" : "right",
  color: head ? "#6b7280" : "inherit",
  fontWeight: head ? 600 : 400,
});


