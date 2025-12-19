import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- DATA ---------------- */

const bpData = [
  { date: "May 1", systolic: 122, diastolic: 78 },
  { date: "May 5", systolic: 125, diastolic: 80 },
  { date: "May 10", systolic: 120, diastolic: 78 },
  { date: "May 15", systolic: 128, diastolic: 82 },
  { date: "May 20", systolic: 130, diastolic: 84 },
];

const weightData = [
  { date: "May 1", value: 170 },
  { date: "May 5", value: 169 },
  { date: "May 10", value: 168.5 },
  { date: "May 15", value: 168 },
  { date: "May 20", value: 168 },
];

const glucoseData = [
  { date: "May 1", value: 108 },
  { date: "May 5", value: 102 },
  { date: "May 10", value: 110 },
  { date: "May 15", value: 98 },
  { date: "May 20", value: 105 },
];

/* ---------------- COMPONENT ---------------- */

export default function PatientVitalsTab() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold">Health Vitals</h2>
        <p className="text-sm text-gray-500">
          Track your health metrics over time
        </p>
      </div>

      {/* ================= BLOOD PRESSURE ================= */}
      <VitalSection
        title="Blood Pressure"
        chart={
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={bpData}>
              <XAxis dataKey="date" />
              <YAxis domain={[60, 150]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#6366F1"
                strokeWidth={2}
                dot
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#A855F7"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        }
        cards={[
          { label: "Latest Reading", value: "118/78", sub: "May 10, 2023" },
          { label: "Average (30 days)", value: "120/80", sub: "Normal" },
          { label: "Goal", value: "<120/80", sub: "On Track" },
        ]}
      />

      {/* ================= WEIGHT ================= */}
      <VitalSection
        title="Weight"
        chart={
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={weightData}>
              <XAxis dataKey="date" />
              <YAxis domain={[160, 180]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        }
        cards={[
          { label: "Latest Reading", value: "168 lbs", sub: "May 8, 2023" },
          {
            label: "Change (30 days)",
            value: "-2.5 lbs",
            sub: "Decreasing",
          },
          { label: "Goal", value: "160 lbs", sub: "8 lbs to go" },
        ]}
        bg="bg-green-50"
      />

      {/* ================= BLOOD GLUCOSE ================= */}
      <VitalSection
        title="Blood Glucose"
        chart={
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={glucoseData}>
              <XAxis dataKey="date" />
              <YAxis domain={[60, 140]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#F59E0B"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        }
        cards={[
          { label: "Latest Reading", value: "98 mg/dL", sub: "May 12, 2023" },
          {
            label: "Average (30 days)",
            value: "105 mg/dL",
            sub: "Normal",
          },
          { label: "Goal", value: "<140 mg/dL", sub: "On Track" },
        ]}
        bg="bg-yellow-50"
      />
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function VitalSection({
  title,
  chart,
  cards,
  bg = "bg-indigo-50",
}: {
  title: string;
  chart: React.ReactNode;
  cards: { label: string; value: string; sub: string }[];
  bg?: string;
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <button className="text-xs border px-2 py-1 rounded">
          Add Reading
        </button>
      </div>

      <div className={`border rounded-lg p-4 ${bg}`}>
        {chart}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="border rounded-lg p-4 text-center"
          >
            <div className="text-xs text-gray-500">{c.label}</div>
            <div className="font-semibold mt-1">{c.value}</div>
            <div className="text-xs text-gray-400 mt-1">{c.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
