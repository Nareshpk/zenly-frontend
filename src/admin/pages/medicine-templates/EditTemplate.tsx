import { useState } from "react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import BasicInformationTab from "./BasicInformationTab";
import MedicationsTab from "./MedicationsTab";

type Medication = {
  id: number;
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  duration: string;
  instructions?: string;
};

export default function EditTemplate() {
  const [activeTab, setActiveTab] = useState<"basic" | "medications">("basic");

  const [template, setTemplate] = useState({
    name: "Hypertension Standard",
    category: "Cardiovascular",
    description:
      "Standard treatment protocol for hypertension management in adults.",
  });

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      route: "Oral",
      frequency: "Once daily",
      duration: "30 days",
      instructions: "Take in the morning with or without food",
    },
  ]);

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        id: Date.now(),
        name: "",
        dosage: "",
        route: "Oral",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="border rounded-lg p-2">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Edit Template</h1>
            <p className="text-sm text-gray-500">
              Modify an existing medication template.
            </p>
          </div>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("basic")}
          className={`px-4 py-2 rounded-lg text-sm ${
            activeTab === "basic"
              ? "bg-black text-white"
              : "border text-gray-700"
          }`}
        >
          Basic Information
        </button>

        <button
          onClick={() => setActiveTab("medications")}
          className={`px-4 py-2 rounded-lg text-sm ${
            activeTab === "medications"
              ? "bg-black text-white"
              : "border text-gray-700"
          }`}
        >
          Medications
        </button>
      </div>

      {/* Content */}
      {activeTab === "basic" && (
        <BasicInformationTab
          template={template}
          setTemplate={setTemplate}
        />
      )}

      {activeTab === "medications" && (
        <MedicationsTab
          medications={medications}
          addMedication={addMedication}
          removeMedication={removeMedication}
          setMedications={setMedications}
        />
      )}
    </div>
  );
}
