import { Calendar } from "lucide-react";

/* ---------------- DATA ---------------- */

const upcomingAppointments = [
  {
    title: "Annual Checkup",
    date: "May 15, 2023 • 10:30 AM",
    doctor: "Dr. Johnson (Cardiology)",
    badge: "Tomorrow",
    badgeStyle: "bg-black text-white",
  },
  {
    title: "Skin Examination",
    date: "May 22, 2023 • 2:15 PM",
    doctor: "Dr. Martinez (Dermatology)",
    badge: "Next Week",
    badgeStyle: "bg-gray-100 text-gray-600",
  },
];

const pastAppointments = [
  {
    title: "Blood Work",
    date: "April 30, 2023 • 9:00 AM",
    doctor: "Dr. Patel (Internal Medicine)",
  },
  {
    title: "Dental Cleaning",
    date: "March 15, 2023 • 11:30 AM",
    doctor: "Dr. Garcia (Dentistry)",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function PatientAppointmentsTab() {
  return (
    <div className="bg-white border rounded-xl p-6">
      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Your Appointments</h2>
        <p className="text-sm text-gray-500">
          Manage your upcoming and past appointments
        </p>
      </div>

      {/* ================= UPCOMING ================= */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Upcoming</h3>

        <div className="space-y-4">
          {upcomingAppointments.map((a) => (
            <AppointmentCard
              key={a.title}
              title={a.title}
              date={a.date}
              doctor={a.doctor}
              badge={a.badge}
              badgeStyle={a.badgeStyle}
              actions={
                <>
                  <button className="px-3 py-1.5 text-sm border rounded-md">
                    Reschedule
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-black text-white rounded-md">
                    Details
                  </button>
                </>
              }
            />
          ))}
        </div>
      </div>

      {/* ================= PAST ================= */}
      <div>
        <h3 className="font-medium mb-3">Past</h3>

        <div className="space-y-4">
          {pastAppointments.map((a) => (
            <AppointmentCard
              key={a.title}
              title={a.title}
              date={a.date}
              doctor={a.doctor}
              muted
              actions={
                <>
                  <button className="px-3 py-1.5 text-sm border rounded-md">
                    View Results
                  </button>
                  <button className="px-3 py-1.5 text-sm border rounded-md">
                    Notes
                  </button>
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function AppointmentCard({
  title,
  date,
  doctor,
  badge,
  badgeStyle,
  actions,
  muted,
}: {
  title: string;
  date: string;
  doctor: string;
  badge?: string;
  badgeStyle?: string;
  actions: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between ${
        muted ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            muted ? "bg-gray-100" : "bg-indigo-100"
          }`}
        >
          <Calendar size={18} className="text-indigo-600" />
        </div>

        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-500">{date}</div>
          <div className="text-xs text-gray-400">{doctor}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${badgeStyle}`}
          >
            {badge}
          </span>
        )}
        {actions}
      </div>
    </div>
  );
}
