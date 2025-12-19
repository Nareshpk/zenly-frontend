import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Medication = {
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  instructions: string;
};

export default function CreateTemplateModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [medications, setMedications] = useState<Medication[]>([
    {
      name: "",
      dosage: "",
      route: "Oral",
      frequency: "",
      instructions: "",
    },
  ]);

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        name: "",
        dosage: "",
        route: "Oral",
        frequency: "",
        instructions: "",
      },
    ]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">Create New Template</h2>
            <p className="text-sm text-gray-500">
              Create a reusable medication template for prescriptions.
            </p>
          </div>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="mt-5 space-y-4">
          <input
            placeholder="Enter template name"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />

          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option>Select category</option>
            <option>Cardiovascular</option>
            <option>Endocrine</option>
            <option>Respiratory</option>
          </select>

          <textarea
            placeholder="Enter template description"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />

          {/* Medications Header */}
          <div className="flex justify-between items-center pt-2">
            <h3 className="font-semibold">Medications</h3>
            <button
              onClick={addMedication}
              className="flex items-center gap-1 border px-3 py-1.5 rounded-md text-sm"
            >
              <Plus size={14} /> Add Medication
            </button>
          </div>

          {/* Medications */}
          {medications.map((_, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-3 relative"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Medication #{index + 1}</h4>
                {medications.length > 1 && (
                  <button onClick={() => removeMedication(index)}>
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Medication name"
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  placeholder="Dosage"
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>Oral</option>
                  <option>Injection</option>
                  <option>Topical</option>
                </select>
                <input
                  placeholder="Frequency"
                  className="border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <input
                placeholder="Instructions"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
