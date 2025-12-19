import { X, Calendar, Clock } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DischargePatientDialog({ open, onClose, onConfirm }: Props) {
  const [date, setDate] = useState("December 18th, 2025");
  const [time, setTime] = useState("12:00");
  const [type, setType] = useState("Regular Discharge");
  const [billing, setBilling] = useState("Payment Pending");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold">Discharge Patient</h2>
            <p className="text-sm text-gray-500 mt-1">
              Complete the discharge process for patient John Smith from room 301.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Discharge Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Discharge Time</label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Discharge Type */}
          <div>
            <label className="text-sm font-medium mb-1 block">Discharge Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>Regular Discharge</option>
              <option>Transfer</option>
              <option>Against Medical Advice</option>
            </select>
          </div>

          {/* Billing Status */}
          <div>
            <label className="text-sm font-medium mb-1 block">Billing Status</label>
            <select
              value={billing}
              onChange={(e) => setBilling(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>Payment Pending</option>
              <option>Paid</option>
              <option>Insurance Processing</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium mb-1 block">Discharge Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Enter any notes regarding the discharge"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-900"
          >
            Confirm Discharge
          </button>
        </div>
      </div>
    </div>
  );
}
