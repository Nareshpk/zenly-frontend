import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- DATA ---------------- */

const visitsData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 61 },
  { month: "May", value: 55 },
  { month: "Jun", value: 68 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 63 },
  { month: "Sep", value: 59 },
  { month: "Oct", value: 69 },
  { month: "Nov", value: 74 },
  { month: "Dec", value: 65 },
];

const satisfactionData = [
  { month: "Jan", value: 78 },
  { month: "Feb", value: 80 },
  { month: "Mar", value: 79 },
  { month: "Apr", value: 82 },
  { month: "May", value: 81 },
  { month: "Jun", value: 84 },
  { month: "Jul", value: 86 },
  { month: "Aug", value: 85 },
  { month: "Sep", value: 83 },
  { month: "Oct", value: 87 },
  { month: "Nov", value: 88 },
  { month: "Dec", value: 86 },
];

/* ---------------- COMPONENT ---------------- */

export default function StatsTab() {
  const [activeTab, setActiveTab] = useState<
    "visits" | "satisfaction"
  >("visits");

  const data =
    activeTab === "visits" ? visitsData : satisfactionData;

  return (
    <div className="space-y-6">
      {/* ---------- HEADER ---------- */}
      <div>
        <h2 className="text-lg font-semibold">Performance Metrics</h2>
        <p className="text-sm text-gray-500">
          Your clinical performance and patient outcomes
        </p>
      </div>

      {/* ---------- TOGGLE ---------- */}
      <div className="inline-flex bg-gray-100 rounded-md p-1">
        <button
          onClick={() => setActiveTab("visits")}
          className={`px-4 py-1.5 text-sm rounded-md ${
            activeTab === "visits"
              ? "bg-white shadow font-medium"
              : "text-gray-500"
          }`}
        >
          Patient Visits
        </button>
        <button
          onClick={() => setActiveTab("satisfaction")}
          className={`px-4 py-1.5 text-sm rounded-md ${
            activeTab === "satisfaction"
              ? "bg-white shadow font-medium"
              : "text-gray-500"
          }`}
        >
          Patient Satisfaction
        </button>
      </div>

      {/* ---------- CHART ---------- */}
      <div className="bg-white border rounded-xl p-6">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#7367F0"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------- METRIC CARDS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Avg. Daily"
          value="12.4"
          change="+2.1 from last month"
        />
        <MetricCard
          title="Total Monthly"
          value="248"
          change="+42 from last month"
        />
        <MetricCard
          title="Yearly Trend"
          value="+8.3%"
          change="Year over year growth"
        />
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function MetricCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="font-medium">{title}</div>
      <div className="text-2xl font-bold mt-4">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{change}</div>
    </div>
  );
}
