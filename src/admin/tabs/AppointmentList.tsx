const appointments = [
  {
    patient: "Michael Johnson",
    time: "16:00 - 17:00",
    doctor: "Dr. Michael Chen",
    status: "In Progress",
  },
  {
    patient: "Jessica Brown",
    time: "14:00 - 15:00",
    doctor: "Dr. Sarah Johnson",
    status: "Cancelled",
  },
];

export default function AppointmentList() {
  return (
    <div className="border rounded-xl divide-y">
      {appointments.map((a) => (
        <div
          key={a.patient}
          className="flex items-center justify-between p-4"
        >
          <div>
            <p className="font-medium">{a.patient}</p>
            <p className="text-xs text-gray-500">{a.time}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs">{a.doctor}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                a.status === "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {a.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
