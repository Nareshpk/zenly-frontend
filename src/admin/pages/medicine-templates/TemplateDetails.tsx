import { Pencil, Clipboard } from "lucide-react";

export default function TemplateDetails({ template }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">Template Details</h3>
          <p className="text-sm text-gray-500">
            View detailed information about a selected template.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 border rounded-lg text-sm flex items-center gap-2">
            <Pencil size={14} /> Edit
          </button>
          <button className="px-3 py-1.5 bg-black text-white rounded-lg text-sm flex items-center gap-2">
            <Clipboard size={14} /> Use Template
          </button>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">{template.name}</h4>
        <p className="text-sm text-gray-500">
          {template.category} • Created by {template.createdBy}
        </p>
      </div>

      {/* Medications */}
      <div className="space-y-4">
        {template.medications.map((med: any, i: number) => (
          <div key={i} className="border rounded-lg p-4">
            <h5 className="font-semibold">{med.name}</h5>

            <div className="grid grid-cols-3 gap-6 mt-3 text-sm">
              <div>
                <p className="text-gray-500">Route</p>
                <p>{med.route}</p>

                <p className="text-gray-500 mt-2">Instructions</p>
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

      {/* Usage Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-2xl font-semibold">{template.usage}</p>
          <p className="text-sm text-gray-500">Total Uses</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-lg font-semibold">{template.lastUsed}</p>
          <p className="text-sm text-gray-500">Last Used</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-lg font-semibold">{template.createdOn}</p>
          <p className="text-sm text-gray-500">Created On</p>
        </div>
      </div>
    </div>
  );
}
