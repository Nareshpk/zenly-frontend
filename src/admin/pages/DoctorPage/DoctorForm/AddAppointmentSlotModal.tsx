import { X, Calendar } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddAppointmentSlotModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">Add Appointment Slot</h2>
            <p className="text-sm text-gray-500">
              Create a new appointment slot for patients to book.
            </p>
          </div>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Date */}
          <div>
            <label className="text-sm font-medium mb-1 block">Date</label>
            <div className="relative">
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 pr-10 text-sm"
              />
              <Calendar
                size={16}
                className="absolute right-3 top-2.5 text-gray-400"
              />
            </div>
          </div>

          {/* Start Time */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Start Time
            </label>
            <select className="w-full border rounded-md px-3 py-2 text-sm">
              <option>09:00 AM</option>
              <option>09:30 AM</option>
              <option>10:00 AM</option>
              <option>10:30 AM</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Duration
            </label>
            <select className="w-full border rounded-md px-3 py-2 text-sm">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
          </div>

          {/* Repeat */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Repeat
            </label>
            <select className="w-full border rounded-md px-3 py-2 text-sm">
              <option>Do not repeat</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm bg-black text-white rounded-md">
            Add Slot
          </button>
        </div>
      </div>
    </div>
  );
}
