import { FileText, RotateCcw } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const tasks = [
  {
    title: "Review lab results for Emma Thompson",
    time: "Today, 2:00 PM",
    priority: "High",
    priorityStyle: "bg-red-100 text-red-600",
    completed: false,
  },
  {
    title: "Complete medical certificate for James Wilson",
    time: "Today, 4:00 PM",
    priority: "Medium",
    priorityStyle: "bg-yellow-100 text-yellow-600",
    completed: false,
  },
  {
    title: "Follow up on Michael Chen's medication",
    time: "Today, 5:00 PM",
    priority: "High",
    priorityStyle: "bg-red-100 text-red-600",
    completed: false,
  },
  {
    title: "Review treatment plan for Sophia Rodriguez",
    time: "Tomorrow, 10:00 AM",
    priority: "Medium",
    priorityStyle: "bg-yellow-100 text-yellow-600",
    completed: false,
  },
  {
    title: "Sign off on nurse practitioner notes",
    time: "Tomorrow, 3:00 PM",
    priority: "Low",
    priorityStyle: "bg-blue-100 text-blue-600",
    completed: true,
  },
];

const prescriptions = [
  {
    name: "Emma Thompson",
    time: "Today, 09:45 AM",
    medicines: ["Sumatriptan 50mg, 1 tablet as needed for migraine"],
  },
  {
    name: "Michael Chen",
    time: "Today, 11:20 AM",
    medicines: [
      "Lisinopril 10mg, 1 tablet daily",
      "Hydrochlorothiazide 12.5mg, 1 tablet daily",
    ],
  },
  {
    name: "Sophia Rodriguez",
    time: "Yesterday, 10:30 AM",
    medicines: [
      "Prenatal vitamins, 1 tablet daily",
      "Folic acid 400mcg, 1 tablet daily",
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function TasksTab() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* ================= LEFT: PENDING TASKS ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-lg">Pending Tasks</h3>
        <p className="text-sm text-gray-500 mb-4">
          Tasks requiring your attention
        </p>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.title}
              className={`border rounded-lg p-4 flex items-start justify-between ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mt-1"
                />

                <div>
                  <div
                    className={`font-medium ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {task.time} •{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${task.priorityStyle}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-black">
                  <FileText size={16} />
                </button>
                {!task.completed && (
                  <button className="text-gray-400 hover:text-black">
                    <RotateCcw size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT: RECENT PRESCRIPTIONS ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-lg">
          Recent Prescriptions
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Prescriptions you've written recently
        </p>

        <div className="space-y-4">
          {prescriptions.map((p) => (
            <div
              key={p.name + p.time}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {p.name.charAt(0)}
                  </div>
                  <div className="font-medium text-sm">
                    {p.name}
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  {p.time}
                </div>
              </div>

              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-3">
                {p.medicines.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>

              <div className="flex justify-end gap-4 text-sm">
                <button className="flex items-center gap-1 text-gray-600 hover:text-black">
                  <FileText size={14} /> View
                </button>
                <button className="flex items-center gap-1 text-gray-600 hover:text-black">
                  <RotateCcw size={14} /> Renew
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
