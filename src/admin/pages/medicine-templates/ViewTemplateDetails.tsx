import {
  ArrowLeft,
  Pencil,
  Copy,
  Play,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Medication = {
  name: string;
  route: string;
  frequency: string;
  duration: string;
  instructions: string;
};

export default function ViewTemplateDetails() {
  const navigate = useNavigate();
  const template = {
    name: "Hypertension Standard",
    category: "Cardiovascular",
    createdBy: "Dr. Sarah Johnson",
    description:
      "Standard treatment protocol for hypertension management in adults.",
    medications: [
      {
        name: "Lisinopril 10mg",
        route: "Oral",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take in the morning with or without food",
      },
      {
        name: "Hydrochlorothiazide 12.5mg",
        route: "Oral",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take in the morning with food",
      },
    ] as Medication[],
    usage: {
      total: 42,
      lastUsed: "2024-03-15",
      createdOn: "2023-05-10",
    },
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
            <h1 className="text-xl font-semibold">Template Details</h1>
            <p className="text-sm text-gray-500">
              View and manage medication template details.
            </p>
          </div>
        </div>
      </div>

      {/* Template Title Card */}
      <div className="bg-white border rounded-xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{template.name}</h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
              {template.category}
            </span>
            <span>Created by {template.createdBy}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/admin/edit-template")} className="border px-3 py-2 rounded-lg text-sm flex items-center gap-2">
            <Pencil size={14} /> Edit Template
          </button>
          <button className="border px-3 py-2 rounded-lg text-sm flex items-center gap-2">
            <Copy size={14} /> Duplicate
          </button>
          <button className="bg-black text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
            <Play size={14} /> Use Template
          </button>
          <button className="border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Template Information */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        <div>
          <h3 className="font-semibold">Template Information</h3>
          <p className="text-sm text-gray-500">
            Detailed information about this medication template.
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm font-medium mb-1">Description</p>
          <p className="text-sm text-gray-700">
            {template.description}
          </p>
        </div>

        {/* Medications */}
        <div>
          <p className="text-sm font-medium mb-3">
            Medications ({template.medications.length})
          </p>

          <div className="space-y-4">
            {template.medications.map((med, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-5"
              >
                <h4 className="font-semibold mb-4">{med.name}</h4>

                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-gray-500">Route</p>
                    <p>{med.route}</p>

                    <p className="text-gray-500 mt-3">Instructions</p>
                    <p>{med.instructions}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Frequency</p>
                    <p>{med.frequency}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p>{med.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Statistics */}
        <div>
          <p className="text-sm font-medium mb-3">Usage Statistics</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-xl p-5 text-center">
              <p className="text-2xl font-semibold">
                {template.usage.total}
              </p>
              <p className="text-xs text-gray-500">Total Uses</p>
            </div>

            <div className="border rounded-xl p-5 text-center">
              <p className="text-xl font-semibold">
                {template.usage.lastUsed}
              </p>
              <p className="text-xs text-gray-500">Last Used</p>
            </div>

            <div className="border rounded-xl p-5 text-center">
              <p className="text-xl font-semibold">
                {template.usage.createdOn}
              </p>
              <p className="text-xs text-gray-500">Created On</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
