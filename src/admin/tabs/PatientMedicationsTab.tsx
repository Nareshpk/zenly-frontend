import { Pill, Bell } from "lucide-react";

/* ---------------- DATA ---------------- */

const activeMedications = [
  {
    name: "Lisinopril",
    dose: "10mg • Once daily • Morning",
    doctor: "Dr. Johnson",
    startDate: "January 15, 2023",
    refills: 3,
    nextRefill: "June 15, 2023",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Metformin",
    dose: "500mg • Twice daily • Morning and Evening",
    doctor: "Dr. Patel",
    startDate: "February 10, 2023",
    refills: 2,
    nextRefill: "May 25, 2023",
    color: "bg-green-100 text-green-600",
  },
];

const medicationHistory = [
  {
    name: "Amoxicillin",
    dose: "500mg • Three times daily • With meals",
    doctor: "Dr. Martinez",
    startDate: "December 5, 2022",
    endDate: "December 15, 2022",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function PatientMedicationsTab() {
  return (
    <div className="bg-white border rounded-xl p-6">
      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Your Medications</h2>
        <p className="text-sm text-gray-500">
          Current prescriptions and medication history
        </p>
      </div>

      {/* ================= ACTIVE MEDICATIONS ================= */}
      <h3 className="font-medium mb-3">Active Medications</h3>

      <div className="space-y-4 mb-8">
        {activeMedications.map((m) => (
          <div
            key={m.name}
            className="border rounded-lg p-5"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${m.color}`}
                >
                  <Pill size={18} />
                </div>

                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-500">
                    {m.dose}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
                  Active
                </span>
                <Bell size={16} className="text-gray-400" />
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
              <Detail label="Prescribed by:" value={m.doctor} />
              <Detail label="Start date:" value={m.startDate} />
              <Detail label="Refills remaining:" value={m.refills} />
              <Detail label="Next refill date:" value={m.nextRefill} />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-1.5 text-sm border rounded-md">
                Request Refill
              </button>
              <button className="px-4 py-1.5 text-sm border rounded-md">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MEDICATION HISTORY ================= */}
      <h3 className="font-medium mb-3">Medication History</h3>

      {medicationHistory.map((m) => (
        <div
          key={m.name}
          className="border rounded-lg p-5 opacity-75"
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Pill size={18} className="text-gray-500" />
              </div>

              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-gray-500">
                  {m.dose}
                </div>
              </div>
            </div>

            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              Completed
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4">
            <Detail label="Prescribed by:" value={m.doctor} />
            <Detail label="Start date:" value={m.startDate} />
            <Detail label="End date:" value={m.endDate} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- HELPER ---------------- */

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}
