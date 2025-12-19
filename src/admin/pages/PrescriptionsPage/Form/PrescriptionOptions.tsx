import { useState } from "react";

export default function PrescriptionOptions() {
  const [format, setFormat] = useState<"electronic" | "print" | "both">(
    "electronic"
  );
  const [notifyPatient, setNotifyPatient] = useState(true);
  const [urgent, setUrgent] = useState(false);

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <h2 className="text-lg font-semibold">Prescription Options</h2>

      {/* Prescription Format */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">
          Prescription Format
        </p>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="format"
            checked={format === "electronic"}
            onChange={() => setFormat("electronic")}
            className="h-4 w-4 accent-black"
          />
          <span className="text-sm">Electronic Prescription</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="format"
            checked={format === "print"}
            onChange={() => setFormat("print")}
            className="h-4 w-4 accent-black"
          />
          <span className="text-sm">Print Prescription</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="format"
            checked={format === "both"}
            onChange={() => setFormat("both")}
            className="h-4 w-4 accent-black"
          />
          <span className="text-sm">Both Electronic and Print</span>
        </label>
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        {/* Notify Patient */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Notify Patient</span>
          <button
            onClick={() => setNotifyPatient(!notifyPatient)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              notifyPatient ? "bg-black" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                notifyPatient ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Mark as Urgent */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Mark as Urgent</span>
          <button
            onClick={() => setUrgent(!urgent)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              urgent ? "bg-black" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                urgent ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
