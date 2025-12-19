import {
    Activity,
    Droplet,
    Heart,
    Pill
} from "lucide-react";

/* ---------------- DATA ---------------- */

const metrics = [
  {
    label: "Heart Rate",
    value: "72 BPM",
    range: "Normal range: 60–100 BPM",
    percent: 75,
    icon: <Heart className="text-red-500" />,
  },
  {
    label: "Blood Pressure",
    value: "118/78 mmHg",
    range: "Normal range: Below 120/80 mmHg",
    percent: 82,
    icon: <Activity className="text-blue-500" />,
  },
  {
    label: "Glucose Level",
    value: "98 mg/dL",
    range: "Normal range: 70–140 mg/dL",
    percent: 65,
    icon: <Droplet className="text-orange-500" />,
  },
];

const appointments = [
  {
    doctor: "Dr. Johnson",
    dept: "Cardiology",
    date: "May 15, 2023 • 10:30 AM",
    note: "Annual checkup",
    badge: "Tomorrow",
  },
  {
    doctor: "Dr. Martinez",
    dept: "Dermatology",
    date: "May 22, 2023 • 2:15 PM",
    note: "Skin examination",
    badge: "Next Week",
  },
];

const medications = [
  { name: "Lisinopril", dose: "10mg • Once daily", time: "8:00 AM" },
  { name: "Metformin", dose: "500mg • Twice daily", time: "2:00 PM" },
  { name: "Atorvastatin", dose: "20mg • Once daily", time: "8:00 PM" },
  { name: "Atorvastatin", dose: "20mg • Once daily", time: "8:00 PM" },
];

const messages = [
  {
    from: "Dr. Johnson",
    time: "2 hours ago",
    msg: "Your recent test results look good. Let's discuss them at your next appointment.",
    newMsg: true,
  },
  {
    from: "Nurse Williams",
    time: "Yesterday",
    msg: "Just a reminder to bring your medication list to your appointment tomorrow.",
  },
];

const tips = [
  {
    title: "Heart Health",
    text: "Try to get 30 minutes of moderate exercise at least 5 days a week.",
    icon: <Heart className="text-red-500" />,
  },
  {
    title: "Stress Management",
    text: "Practice deep breathing exercises for 5 minutes daily to reduce stress.",
    icon: <Activity className="text-orange-500" />,
  },
  {
    title: "Nutrition",
    text: "Increase omega-3 fatty acids to help improve cholesterol levels.",
    icon: <Droplet className="text-green-500" />,
  },
];

/* ---------------- COMPONENT ---------------- */

export default function PatientOverviewTab() {
  return (
    <div className="space-y-6">
      {/* ================= TOP ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Health Summary */}
        <div className="xl:col-span-2 bg-white border rounded-xl p-6">
          <h3 className="font-semibold text-lg">Health Summary</h3>
          <p className="text-sm text-gray-500 mb-4">
            Your recent health metrics and goals
          </p>

          {metrics.map((m) => (
            <HealthMetric key={m.label} {...m} />
          ))}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold text-lg">
            Upcoming Appointments
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Your scheduled visits
          </p>

          {appointments.map((a) => (
            <UpcomingAppointment key={a.doctor} {...a} />
          ))}

          <button className="w-full mt-4 text-sm border rounded-md py-2">
            View All Appointments
          </button>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Medication Reminders */}
        <Card title="Medication Reminders" subtitle="Your daily medication schedule">
          {medications.map((m) => (
            <div
              key={m.name + m.time}
              className="flex justify-between items-center border rounded-lg p-3 mb-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Pill size={14} />
                </div>
                <div>
                  <div className="font-medium text-sm">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.dose}</div>
                </div>
              </div>
              <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
                {m.time}
              </span>
            </div>
          ))}
        </Card>

        {/* Recent Messages */}
        <Card title="Recent Messages" subtitle="Communications from your care team">
          {messages.map((m) => (
            <div
              key={m.from + m.time}
              className="border rounded-lg p-3 mb-2"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium text-sm">{m.from}</div>
                {m.newMsg && (
                  <span className="text-xs bg-gray-100 px-2 rounded">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{m.msg}</p>
              <div className="text-xs text-gray-400 mt-1">
                {m.time}
              </div>
            </div>
          ))}
          <button className="w-full mt-2 text-sm border rounded-md py-2">
            View All Messages
          </button>
        </Card>

        {/* Health Tips */}
        <Card title="Health Tips" subtitle="Personalized recommendations">
          {tips.map((t) => (
            <div key={t.title} className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                {t.icon}
                <span className="font-medium text-sm">
                  {t.title}
                </span>
              </div>
              <p className="text-sm text-gray-600">{t.text}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function HealthMetric({
  icon,
  label,
  value,
  percent,
  range,
}: any) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1 text-sm">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full">
        <div
          className="h-2 bg-black rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{range}</p>
    </div>
  );
}

function UpcomingAppointment({
  doctor,
  dept,
  date,
  note,
  badge,
}: any) {
  return (
    <div className="border rounded-lg p-4 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">{doctor}</div>
          <div className="text-xs text-gray-500">{dept}</div>
          <div className="text-xs text-gray-400">{date}</div>
          <div className="text-xs text-gray-500 mt-1">
            {note}
          </div>
        </div>
        <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600">
          {badge}
        </span>
      </div>
    </div>
  );
}

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
