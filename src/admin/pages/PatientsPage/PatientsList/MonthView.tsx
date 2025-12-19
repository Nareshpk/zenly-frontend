import { Appointment } from "../../../type/calendarTypes";

export default function MonthView({
  appointments,
}: {
  date: string;
  appointments: Appointment[];
}) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-3">
      {days.map((day) => (
        <div key={day} className="border rounded-lg p-2 min-h-[100px]">
          <div className="text-sm font-semibold mb-1">{day}</div>

          {appointments.map((a) => (
            <div
              key={a.id}
              className="text-xs bg-blue-50 border rounded px-1 mb-1"
            >
              {a.startTime} - {a.patientName}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
