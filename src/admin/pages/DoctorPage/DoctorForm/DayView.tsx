import React from 'react'

function DayView() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <DaySection
        title="Morning"
        items={[
          ["10:00 AM", "John Smith", "Check-up"],
          ["11:30 AM", "Emily Davis", "Consultation"],
        ]}
      />
      <DaySection
        title="Afternoon"
        items={[["02:00 PM", "Michael Johnson", "Follow-up"]]}
      />
    </div>
  );
}

function DaySection({ title, items }: any) {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-semibold mb-4">{title}</h3>
      {items.map(([time, name, type]: any) => (
        <div
          key={time}
          className="border rounded-lg p-3 flex justify-between mb-3"
        >
          <div>
            <p className="font-medium">{time} · {name}</p>
            <p className="text-sm text-gray-500">{type}</p>
          </div>
          <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full h-fit">
            Confirmed
          </span>
        </div>
      ))}
    </div>
  );
}


export default DayView
