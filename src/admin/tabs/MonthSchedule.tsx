const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

export default function MonthSchedule() {
  return (
    <div className="border rounded-xl p-4">
      <div className="grid grid-cols-7 gap-3 text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-medium text-center">
            {d}
          </div>
        ))}

        {daysInMonth.map((day) => (
          <div
            key={day}
            className="border rounded-lg p-2 min-h-[90px]"
          >
            <div className="text-xs text-gray-500 mb-1">{day}</div>

            {day === 16 && (
              <div className="bg-blue-50 text-xs p-1 rounded">
                Michael Johnson
                <div className="text-gray-500">16:00</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
