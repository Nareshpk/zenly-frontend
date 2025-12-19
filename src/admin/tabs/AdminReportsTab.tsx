import {
    Activity,
    ChevronRight,
    DollarSign,
    Download,
    FileText,
    Users
} from "lucide-react";

/* ---------------- DATA ---------------- */

const financialReports = [
  { name: "Monthly Revenue Summary", updated: "Today" },
  { name: "Quarterly Financial Analysis", updated: "Last week" },
  { name: "Insurance Claims Report", updated: "2 days ago" },
  { name: "Outstanding Payments", updated: "Yesterday" },
];

const patientReports = [
  { name: "New Patient Registrations", updated: "Today" },
  { name: "Patient Demographics", updated: "3 days ago" },
  { name: "Visit Frequency Analysis", updated: "Last week" },
  { name: "Treatment Outcomes", updated: "Yesterday" },
];

const operationalReports = [
  { name: "Staff Performance Metrics", updated: "Yesterday" },
  { name: "Inventory Status", updated: "Today" },
  { name: "Room Utilization", updated: "2 days ago" },
  { name: "Wait Time Analysis", updated: "Last week" },
];

const recentActivity = [
  {
    user: "Dr. Johnson",
    action: "generated Monthly Revenue Summary",
    time: "2 hours ago",
  },
  {
    user: "Admin Sarah",
    action: "viewed Staff Performance Metrics",
    time: "Yesterday, 4:30 PM",
  },
  {
    user: "Dr. Rodriguez",
    action: "generated Patient Demographics",
    time: "Yesterday, 2:15 PM",
  },
  {
    user: "Nurse Kim",
    action: "viewed Inventory Status",
    time: "2 days ago",
  },
  {
    user: "Dr. Chen",
    action: "generated Treatment Outcomes",
    time: "3 days ago",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function AdminReportsTab() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">Available Reports</h2>
          <p className="text-sm text-gray-500">
            Access and generate detailed reports
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm">
          <Download size={16} /> Generate New Report
        </button>
      </div>

      {/* ================= REPORT CARDS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ReportCard
          title="Financial Reports"
          subtitle="Revenue, expenses, and billing"
          icon={<DollarSign />}
          reports={financialReports}
          footer="View all financial reports"
        />

        <ReportCard
          title="Patient Reports"
          subtitle="Demographics and visit analytics"
          icon={<Users />}
          reports={patientReports}
          footer="View all patient reports"
        />

        <ReportCard
          title="Operational Reports"
          subtitle="Staff, inventory, and efficiency"
          icon={<Activity />}
          reports={operationalReports}
          footer="View all operational reports"
        />
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-1">
          Recent Report Activity
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Reports generated or viewed recently
        </p>

        <div className="space-y-3">
          {recentActivity.map((a) => (
            <div
              key={a.user + a.time}
              className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                  {a.user.charAt(0)}
                </div>
                <div>
                  <div className="text-sm">
                    <span className="font-medium">{a.user}</span>{" "}
                    {a.action}
                  </div>
                  <div className="text-xs text-gray-400">
                    {a.time}
                  </div>
                </div>
              </div>

              <button className="px-3 py-1 text-sm border rounded-md">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ReportCard({
  title,
  subtitle,
  icon,
  reports,
  footer,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  reports: { name: string; updated: string }[];
  footer: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>

      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

      <div className="space-y-3">
        {reports.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-gray-400" />
              {r.name}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              Updated: {r.updated}
              <ChevronRight size={14} />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-sm text-blue-600">
        {footer}
      </button>
    </div>
  );
}
