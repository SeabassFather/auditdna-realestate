import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function USDACommodityChart({ data = [] }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-400 mb-2">
        Weekly price vs 5-year average
      </div>
      <div style={{ width: "100%", height: 420 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,.08)"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#a3a3a3" }}
              interval={Math.max(0, Math.floor(data.length / 12))}
            />
            <YAxis tick={{ fontSize: 11, fill: "#a3a3a3" }} />
            <Tooltip
              contentStyle={{
                background: "#0b1020",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 12,
                color: "#e5e7eb",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              name="Price"
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="avg5y"
              name="5y Avg"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

