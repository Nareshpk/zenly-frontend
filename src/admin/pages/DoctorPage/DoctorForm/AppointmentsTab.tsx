import { Plus } from "lucide-react";

export default function AppointmentsTab() {
  const appointments = [
    { name: "John Smith", time: "09:00 AM", type: "Check-up", status: "Completed" },
    { name: "Emily Davis", time: "10:30 AM", type: "Consultation", status: "Completed" },
    { name: "Michael Brown", time: "01:00 PM", type: "Follow-up", status: "Scheduled" },
    { name: "Jessica Wilson", time: "03:30 PM", type: "New Patient", status: "Scheduled" },
  ];

  return (
    <Card title="Appointment History" right={
      <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm">
        <Plus size={16} /> New Appointment
      </button>
    }>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th>Patient</th>
            <th>Time</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.name} className="border-t">
              <td className="py-3 font-medium">{a.name}</td>
              <td>{a.time}</td>
              <td>{a.type}</td>
              <td
                className={`font-medium ${
                  a.status === "Completed"
                    ? "text-green-500"
                    : "text-blue-500"
                }`}
              >
                {a.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function Card({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="border rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}