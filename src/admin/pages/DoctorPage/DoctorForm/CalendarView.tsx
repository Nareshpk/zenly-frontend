import React from 'react'

function CalendarView() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-center font-semibold mb-4">May 2023</h3>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="font-medium">{d}</div>
        ))}

        {days.map((d) => (
          <div
            key={d}
            className={`border rounded-lg py-4 ${
              d === 15 ? "bg-gray-100" : ""
            }`}
          >
            {d}
            {d === 15 && <div className="mt-1 text-xs">•••</div>}
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-4 text-sm">
        <span>● Appointments</span>
        <span>● Time Off</span>
      </div>
    </div>
  );
}


export default CalendarView
