import { Plus, Pencil, Trash2 } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const todayPatients = [
  {
    name: "Emma Thompson",
    age: 42,
    gender: "Female",
    tag: "New Patient",
    tagStyle: "bg-blue-100 text-blue-600",
  },
  {
    name: "Michael Chen",
    age: 35,
    gender: "Male",
    tag: "Follow-up",
    tagStyle: "bg-gray-100 text-gray-600",
  },
  {
    name: "Sophia Rodriguez",
    age: 28,
    gender: "Female",
    tag: "Regular",
    tagStyle: "bg-gray-100 text-gray-600",
  },
  {
    name: "James Wilson",
    age: 67,
    gender: "Male",
    tag: "Urgent",
    tagStyle: "bg-red-100 text-red-600",
  },
  {
    name: "Olivia Parker",
    age: 8,
    gender: "Female",
    tag: "Regular",
    tagStyle: "bg-gray-100 text-gray-600",
  },
];

const patientNotes = [
  {
    name: "Emma Thompson",
    time: "Today, 09:45 AM",
    note:
      "Patient presented with persistent headaches for 2 weeks. Prescribed sumatriptan 50mg and recommended follow-up in 2 weeks if symptoms persist.",
  },
  {
    name: "Michael Chen",
    time: "Today, 11:20 AM",
    note:
      "Follow-up for hypertension. BP readings have improved (135/85). Continuing current medication regimen. Advised on dietary modifications.",
  },
  {
    name: "James Wilson",
    time: "Yesterday, 02:15 PM",
    note:
      "Chest pain evaluation. ECG normal. Ordered stress test and lipid panel. Patient to return next week for results discussion.",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function PatientsTab() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* ================= LEFT: TODAY'S PATIENTS ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-lg">Today's Patients</h3>
        <p className="text-sm text-gray-500 mb-4">
          Patients you're seeing today
        </p>

        <div className="space-y-3">
          {todayPatients.map((p) => (
            <div
              key={p.name}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                  {p.name.charAt(0)}
                </div>

                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">
                    {p.age} yrs • {p.gender}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${p.tagStyle}`}
                >
                  {p.tag}
                </span>

                <button className="px-3 py-1 text-sm border rounded-md">
                  History
                </button>
                <button className="px-3 py-1 text-sm bg-black text-white rounded-md">
                  Examine
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT: PATIENT NOTES ================= */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">
              Recent Patient Notes
            </h3>
            <p className="text-sm text-gray-500">
              Your latest clinical notes
            </p>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm">
            <Plus size={14} /> New Note
          </button>
        </div>

        <div className="space-y-4">
          {patientNotes.map((note) => (
            <div
              key={note.name + note.time}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {note.name.charAt(0)}
                  </div>
                  <div className="font-medium text-sm">
                    {note.name}
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  {note.time}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                {note.note}
              </p>

              <div className="flex justify-end gap-4 text-sm">
                <button className="flex items-center gap-1 text-gray-600 hover:text-black">
                  <Pencil size={14} /> Edit Note
                </button>
                <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
                  <Trash2 size={14} /> Delete Note
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
