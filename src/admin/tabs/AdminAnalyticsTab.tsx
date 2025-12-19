import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Filter } from "lucide-react";

/* ---------------- DATA ---------------- */

const demographicsData = [
  { age: "0-17", male: 120, female: 140 },
  { age: "18-24", male: 150, female: 170 },
  { age: "25-34", male: 210, female: 280 },
  { age: "35-44", male: 190, female: 230 },
  { age: "45-54", male: 160, female: 180 },
  { age: "55-64", male: 140, female: 150 },
  { age: "65+", male: 110, female: 130 },
];

const appointmentTypes = [
  { name: "Check-up", value: 35, color: "#4F5DFF" },
  { name: "Consultation", value: 25, color: "#10B981" },
  { name: "Follow-up", value: 20, color: "#F59E0B" },
  { name: "Procedure", value: 10, color: "#EF4444" },
  { name: "Emergency", value: 5, color: "#8B5CF6" },
  { name: "Other", value: 5, color: "#EC4899" },
];

const revenueData = [
  { dept: "Orthopedics", value: 12500 },
  { dept: "Cardiology", value: 10800 },
  { dept: "Neurology", value: 8200 },
  { dept: "Pediatrics", value: 7600 },
  { dept: "Oncology", value: 6800 },
];

const satisfactionData = [
  { label: "Overall Experience", value: 87 },
  { label: "Wait Times", value: 72 },
  { label: "Staff Friendliness", value: 94 },
  { label: "Treatment Effectiveness", value: 89 },
];

const staffPerformance = [
  {
    name: "Dr. Sarah Chen",
    role: "Cardiologist",
    patients: 42,
    rating: "4.9/5",
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "Pediatrician",
    patients: 38,
    rating: "4.8/5",
  },
  {
    name: "Dr. Emily Johnson",
    role: "Neurologist",
    patients: 35,
    rating: "4.7/5",
  },
  {
    name: "Nurse Robert Kim",
    role: "Head Nurse",
    patients: 56,
    rating: "4.9/5",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function AdminAnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">Detailed Analytics</h2>
          <p className="text-sm text-gray-500">
            Insights and trends from your clinic data
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* ================= TOP ROW ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Patient Demographics */}
        <Card title="Patient Demographics" subtitle="Age and gender distribution">
          <ChartContainer>
            <BarChart data={demographicsData}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="male" fill="#4F5DFF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="female" fill="#EC4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <Legend
            items={[
              { label: "Male", color: "#4F5DFF" },
              { label: "Female", color: "#EC4899" },
            ]}
          />
        </Card>

        {/* Appointment Types */}
        <Card title="Appointment Types" subtitle="Distribution by service category">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentTypes}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {appointmentTypes.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue Sources */}
        <Card title="Revenue Sources" subtitle="Breakdown by department">
          <ChartContainer>
            <BarChart data={revenueData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="dept" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </Card>
      </div>

      {/* ================= BOTTOM ROW ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Patient Satisfaction */}
        <Card title="Patient Satisfaction" subtitle="Based on feedback surveys">
          <div className="space-y-4">
            {satisfactionData.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.label}</span>
                  <span className="font-medium">{s.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Staff Performance */}
        <Card title="Staff Performance" subtitle="Top performing staff members">
          <div className="space-y-4">
            {staffPerformance.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-gray-500">
                      {s.role}
                    </div>
                  </div>
                </div>

                <div className="text-right text-sm">
                  <div className="font-medium">
                    {s.patients} patients
                  </div>
                  <div className="text-xs text-gray-500">
                    Rating: {s.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE UI ---------------- */

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      {children}
    </div>
  );
}

function ChartContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        {children as any}
      </ResponsiveContainer>
    </div>
  );
}

function Legend({
  items,
}: {
  items: { label: string; color: string }[];
}) {
  return (
    <div className="flex gap-4 mt-3 text-sm">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: i.color }}
          />
          {i.label}
        </div>
      ))}
    </div>
  );
}
