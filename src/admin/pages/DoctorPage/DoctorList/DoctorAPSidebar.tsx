/* eslint-disable jsx-a11y/alt-text */
import { Plus } from "lucide-react";

function DoctorAPSidebar() {
  return (
    <div className="border rounded-xl p-5 space-y-6">
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100?img=32"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">Dr. Sarah Johnson</p>
          <p className="text-sm text-gray-500">Cardiology</p>
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">Weekly Schedule</p>
        {[
          ["Monday", "09:00 - 17:00"],
          ["Tuesday", "09:00 - 17:00"],
          ["Wednesday", "09:00 - 13:00"],
          ["Thursday", "09:00 - 17:00"],
          ["Friday", "09:00 - 15:00"],
          ["Saturday", "Unavailable"],
          ["Sunday", "Unavailable"],
        ].map(([day, time]) => (
          <div key={day} className="flex justify-between text-sm mb-1">
            <span>{day}</span>
            <span
              className={
                time === "Unavailable"
                  ? "text-gray-400"
                  : "text-gray-700"
              }
            >
              {time}
            </span>
          </div>
        ))}
      </div>

      <div>
        <p className="font-medium mb-2">Time Off</p>

        <div className="border rounded-lg p-3 mb-2">
          <p className="text-sm font-medium">Annual Leave</p>
          <p className="text-xs text-gray-500">
            2023-05-22 – 2023-05-26
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded">
            Approved
          </span>
        </div>

        <div className="border rounded-lg p-3">
          <p className="text-sm font-medium">Medical Conference</p>
          <p className="text-xs text-gray-500">2023-06-15</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-orange-100 text-orange-600 rounded">
            Pending
          </span>
        </div>

        <button className="w-full mt-3 border rounded-md py-2 text-sm flex justify-center gap-2">
          <Plus size={16} /> Request Time Off
        </button>
      </div>
    </div>
  );
}

export default DoctorAPSidebar
