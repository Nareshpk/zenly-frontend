import { Appointment } from "../../../type/calendarTypes";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeekView({
  appointments,
}: {
  date: string;
  appointments: Appointment[];
}) {
  return (
    <div className="grid grid-cols-7 gap-4">
      {DAYS.map((day) => (
        <div key={day} className="border rounded-lg p-3">
          <div className="font-semibold mb-2">{day}</div>

          {appointments.length === 0 ? (
            <div className="text-gray-400 text-sm">No appointments</div>
          ) : (
            appointments.map((a) => (
              <div
                key={a.id}
                className="p-2 mb-2 rounded bg-blue-50 border"
              >
                <div className="text-sm font-medium">{a.patientName}</div>
                <div className="text-xs text-gray-600">{a.startTime}</div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
