const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const hours = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default function WeekSchedule() {
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="grid grid-cols-8 bg-gray-50 text-sm">
        <div />
        {days.map((day) => (
          <div key={day} className="p-3 font-medium border-l">
            {day}
          </div>
        ))}
      </div>

      {hours.map((hour) => (
        <div key={hour} className="grid grid-cols-8 border-t">
          <div className="p-3 text-xs text-gray-500">{hour}</div>

          {days.map((day) => (
            <div key={day} className="border-l p-2 min-h-[60px]">
              {/* Example appointment */}
              {day === "Tuesday" && hour === "2:00 PM" && (
                <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded text-xs">
                  <p className="font-medium">Jessica Brown</p>
                  <p>14:00 - 15:00</p>
                  <p className="text-gray-500">Dr. Sarah Johnson</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
