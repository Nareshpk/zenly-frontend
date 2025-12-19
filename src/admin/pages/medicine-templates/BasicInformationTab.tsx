import { Save } from "lucide-react";

type BasicInfoProps = {
  template: {
    name: string;
    category: string;
    description: string;
  };
  setTemplate: React.Dispatch<any>;
};

export default function BasicInformationTab({ template, setTemplate }: BasicInfoProps) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-5">
      <h2 className="text-lg font-semibold">Basic Information</h2>

      <div>
        <label className="text-sm font-medium">Template Name *</label>
        <input
          value={template.name}
          onChange={(e) =>
            setTemplate({ ...template, name: e.target.value })
          }
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Category *</label>
        <select
          value={template.category}
          onChange={(e) =>
            setTemplate({ ...template, category: e.target.value })
          }
          className="mt-1 w-full border rounded-lg px-3 py-2"
        >
          <option>Cardiovascular</option>
          <option>Endocrine</option>
          <option>Respiratory</option>
          <option>Allergy</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          rows={4}
          value={template.description}
          onChange={(e) =>
            setTemplate({ ...template, description: e.target.value })
          }
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button className="border px-4 py-2 rounded-lg">Cancel</button>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
}
