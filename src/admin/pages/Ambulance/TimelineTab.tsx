const timeline = [
  { time: "08:30 AM", status: "Pending", label: "Call received" },
  { time: "08:32 AM", status: "Dispatched", label: "Ambulance dispatched" },
  { time: "08:45 AM", status: "In Progress", label: "Arrived at location" },
  { time: "08:55 AM", status: "In Progress", label: "Patient assessment completed" },
  { time: "09:00 AM", status: "In Progress", label: "Transport to hospital started" },
  { time: "09:10 AM", status: "In Progress", label: "Arrived at hospital" },
  { time: "09:45 AM", status: "Completed", label: "Call completed" },
];

export default function TimelineTab() {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-1">Call Timeline</h2>
      <p className="text-sm text-gray-500 mb-6">
        Chronological events of the ambulance call
      </p>

      <div className="space-y-6 relative">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  item.status === "Completed" ? "bg-black" : "bg-gray-300"
                }`}
              />
              {i !== timeline.length - 1 && (
                <div className="w-px h-full bg-gray-200 mt-1" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="font-medium">{item.time}</span>
                <span className="px-2 py-0.5 rounded-full text-xs border">
                  {item.status}
                </span>
              </div>
              <p className="text-sm mt-1">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
