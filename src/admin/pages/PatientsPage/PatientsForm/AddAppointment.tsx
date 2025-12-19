import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";

type AppointmentStatus = "Scheduled" | "Tentative" | "Waitlist";

export default function AddAppointment() {
  const [status, setStatus] = useState<AppointmentStatus>("Scheduled");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg border hover:bg-gray-100">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold">Add Appointment</h1>
          <p className="text-sm text-gray-500">
            Enter the details for the new appointment.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT – Appointment Details */}
        <div className="lg:col-span-2 bg-white rounded-xl border p-6 space-y-6">
          <h2 className="font-semibold text-lg">Appointment Details</h2>

          {/* Appointment Type */}
          <div>
            <label className="text-sm font-medium">Appointment Type</label>
            <select className="mt-1 w-full border rounded-lg px-3 py-2">
              <option>Select appointment type</option>
              <option>Check-up</option>
              <option>Consultation</option>
              <option>Follow-up</option>
              <option>Therapy Session</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-sm font-medium">Time</label>
            <select className="mt-1 w-full border rounded-lg px-3 py-2">
              <option>Select time slot</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:30 AM</option>
              <option>02:15 PM</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium">Duration (minutes)</label>
            <select className="mt-1 w-full border rounded-lg px-3 py-2">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm font-medium">Reason for Visit</label>
            <textarea
              rows={4}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="Enter the reason for the appointment"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Appointment Status
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={status === "Scheduled"}
                  onChange={() => setStatus("Scheduled")}
                />
                Scheduled
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={status === "Tentative"}
                  onChange={() => setStatus("Tentative")}
                />
                Tentative (Pending Confirmation)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={status === "Waitlist"}
                  onChange={() => setStatus("Waitlist")}
                />
                Add to Waitlist
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium">Notes for Staff</label>
            <textarea
              rows={3}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="Enter any additional notes for staff"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg">
              Schedule Appointment
            </button>
          </div>
        </div>

        {/* RIGHT – Patient & Doctor */}
        <div className="space-y-6">
          {/* Select Patient */}
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Select Patient</h2>

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-9 pr-3 py-2 border rounded-lg"
              />
            </div>

            <button className="w-full border rounded-lg py-2 hover:bg-gray-100">
              Register New Patient
            </button>
          </div>

          {/* Select Doctor */}
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Select Doctor</h2>

            <select className="w-full border rounded-lg px-3 py-2">
              <option>Select a doctor</option>
              <option>Dr. Sarah Johnson</option>
              <option>Dr. Michael Chen</option>
              <option>Dr. Lisa Patel</option>
              <option>Dr. James Wilson</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
