import { MoreHorizontal } from 'lucide-react';
import React from 'react'

function ListView() {
  const rows = [
    {
      name: "John Smith",
      time: "10:00 AM",
      duration: "30 min",
      type: "Check-up",
    },
    {
      name: "Emily Davis",
      time: "11:30 AM",
      duration: "45 min",
      type: "Consultation",
    },
    {
      name: "Michael Johnson",
      time: "02:00 PM",
      duration: "30 min",
      type: "Follow-up",
    },
  ];

  return (
    <div className="border rounded-xl p-4">
      <table className="w-full text-sm">
        <thead className="text-gray-500 text-left">
          <tr>
            <th>Patient</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Type</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t">
              <td className="py-3 font-medium">{r.name}</td>
              <td>{r.time}</td>
              <td>{r.duration}</td>
              <td>{r.type}</td>
              <td>
                <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                  Confirmed
                </span>
              </td>
              <td>
                <MoreHorizontal size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default ListView
