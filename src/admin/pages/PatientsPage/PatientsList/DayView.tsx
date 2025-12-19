import { Appointment } from "../../../type/calendarTypes";


const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];

export default function DayView({
  date,
  appointments,
}: {
  date: string;
  appointments: Appointment[];
}) {
  return (
    <div className="border rounded-xl">
      {HOURS.map((hour) => {
        const slotAppointments = appointments.filter(
          (a) => a.date === date && a.startTime.startsWith(hour.slice(0, 2))
        );

        return (
          <div key={hour} className="flex border-b">
            <div className="w-24 p-3 bg-gray-50 text-sm font-medium">
              {hour}
            </div>
            <div className="flex-1 p-3">
              {slotAppointments.length === 0 ? (
                <span className="text-gray-400">No appointments</span>
              ) : (
                slotAppointments.map((a) => (
                  <div
                    key={a.id}
                    className={`p-3 rounded-lg border mb-2 ${
                      a.status === "Confirmed"
                        ? "bg-blue-50 border-blue-300"
                        : a.status === "In Progress"
                        ? "bg-orange-50 border-orange-300"
                        : "bg-green-50 border-green-300"
                    }`}
                  >
                    <div className="font-medium">{a.patientName}</div>
                    <div className="text-sm text-gray-600">
                      {a.startTime} - {a.endTime}
                    </div>
                    <div className="text-sm">{a.doctorName}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
