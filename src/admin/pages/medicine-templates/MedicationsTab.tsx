import { Plus, Trash2 } from "lucide-react";

type MedicationsTabProps = {
  medications: any[];
  addMedication: () => void;
  removeMedication: (id: number) => void;
  setMedications: React.Dispatch<any>;
};

export default function MedicationsTab({
  medications,
  addMedication,
  removeMedication,
  setMedications,
}: MedicationsTabProps) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Medications</h2>
        <button
          onClick={addMedication}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Add Medication
        </button>
      </div>

      {medications.map((med, index) => (
        <div
          key={med.id}
          className="border rounded-xl p-5 relative space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">
              Medication #{index + 1}
            </h3>
            <button onClick={() => removeMedication(med.id)}>
              <Trash2 className="text-red-500" size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Medication Name *</label>
              <input
                value={med.name}
                onChange={(e) =>
                  setMedications((prev: any[]) =>
                    prev.map((m) =>
                      m.id === med.id ? { ...m, name: e.target.value } : m
                    )
                  )
                }
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Dosage *</label>
              <input
                value={med.dosage}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Route</label>
              <select className="mt-1 w-full border rounded-lg px-3 py-2">
                <option>Oral</option>
                <option>IV</option>
                <option>Injection</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Frequency *</label>
              <select className="mt-1 w-full border rounded-lg px-3 py-2">
                <option>Once daily</option>
                <option>Twice daily</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Duration</label>
              <select className="mt-1 w-full border rounded-lg px-3 py-2">
                <option>30 days</option>
                <option>14 days</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Instructions <span className="text-gray-400">(optional)</span>
              </label>
              <input
                value={med.instructions}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
