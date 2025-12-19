import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- DATA ---------------- */

const chartData = [
  { month: "Jan", total: 1200, patients: 80 },
  { month: "Feb", total: 3200, patients: 150 },
  { month: "Mar", total: 4800, patients: 200 },
  { month: "Apr", total: 2200, patients: 120 },
  { month: "May", total: 2600, patients: 140 },
  { month: "Jun", total: 4600, patients: 190 },
  { month: "Jul", total: 2000, patients: 110 },
  { month: "Aug", total: 2600, patients: 145 },
  { month: "Sep", total: 3100, patients: 160 },
  { month: "Oct", total: 4400, patients: 210 },
  { month: "Nov", total: 5200, patients: 230 },
  { month: "Dec", total: 5000, patients: 220 },
];

const appointments = [
  {
    name: "John Smith",
    type: "Check-up",
    time: "Today @ 10:00 AM",
    status: "Confirmed",
  },
  {
    name: "Emily Davis",
    type: "Consultation",
    time: "Today @ 11:30 AM",
    status: "In Progress",
  },
  {
    name: "Robert Wilson",
    type: "Follow-up",
    time: "Today @ 09:15 AM",
    status: "Completed",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function AdminOverviewTab() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* ================= LEFT: OVERVIEW CHART ================= */}
      <div className="xl:col-span-2 bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-lg">Overview</h3>
        <p className="text-sm text-gray-500 mb-4">
          Patient visits and revenue for the current period.
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <Tooltip />
              <Bar
                dataKey="total"
                fill="#4F5DFF"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="patients"
                fill="#22C55E"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#4F5DFF] rounded-sm" />
            total
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#22C55E] rounded-sm" />
            patients
          </div>
        </div>
      </div>

      {/* ================= RIGHT: RECENT APPOINTMENTS ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-lg">
          Recent Appointments
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          You have 12 appointments today.
        </p>

        <div className="space-y-4">
          {appointments.map((a) => (
            <div
              key={a.name}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                  {a.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-gray-500">
                    {a.type}
                  </div>
                  <div className="text-xs text-gray-400">
                    {a.time}
                  </div>
                </div>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  a.status === "Confirmed"
                    ? "bg-blue-100 text-blue-600"
                    : a.status === "In Progress"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-sm text-blue-600">
          View all appointments
        </button>
      </div>
    </div>
  );
}
