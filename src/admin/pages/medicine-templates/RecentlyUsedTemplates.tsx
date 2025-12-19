import { FileClock } from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  createdBy: string;
  medications: {
    name: string;
    route: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  usage: number;
  lastUsed: string;
  createdOn: string;
}

interface Props {
  templates: Template[];
  selectedTemplate: Template | null;
  onSelect: (t: Template) => void;
}

export default function RecentlyUsedTemplates({
  templates,
  selectedTemplate,
  onSelect,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Recently Used */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold text-lg">Recently Used Templates</h2>
        <p className="text-sm text-gray-500 mb-6">
          Templates that have been used in the last 30 days.
        </p>

        {templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <FileClock size={36} />
            <p className="mt-3 text-sm">
              No recently used templates found
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelect(t)}
                className="w-full text-left py-4 hover:bg-gray-50 px-2 rounded-lg"
              >
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-gray-500">
                  {t.category} • Last used {t.lastUsed}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Template Details */}
      {selectedTemplate && (
        <div className="bg-white border rounded-xl p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg">Template Details</h2>
            <p className="text-sm text-gray-500">
              View detailed information about a selected template.
            </p>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">
                {selectedTemplate.name}
              </h3>
              <p className="text-xs text-gray-500">
                {selectedTemplate.category} • Created by{" "}
                {selectedTemplate.createdBy}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm border rounded-lg">
                Edit
              </button>
              <button className="px-3 py-1.5 text-sm bg-black text-white rounded-lg">
                Use Template
              </button>
            </div>
          </div>

          {/* Medications */}
          <div className="space-y-4">
            {selectedTemplate.medications.map((m, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 grid grid-cols-3 gap-6"
              >
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    <div>Route</div>
                    <div className="text-black">{m.route}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Instructions
                    <div className="text-black">{m.instructions}</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Frequency
                  <div className="text-black">{m.frequency}</div>
                </div>

                <div className="text-xs text-gray-500">
                  Duration
                  <div className="text-black">{m.duration}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Usage Statistics */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="border rounded-lg p-4">
              <div className="text-xl font-semibold">
                {selectedTemplate.usage}
              </div>
              <div className="text-xs text-gray-500">Total Uses</div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-xl font-semibold">
                {selectedTemplate.lastUsed}
              </div>
              <div className="text-xs text-gray-500">Last Used</div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-xl font-semibold">
                {selectedTemplate.createdOn}
              </div>
              <div className="text-xs text-gray-500">Created On</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
