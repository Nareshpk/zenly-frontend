import { useState } from "react";
import { Pencil, Copy, Trash2 } from "lucide-react";
import { myTemplates } from "./myTemplates";
import TemplateDetails from "./TemplateDetails";


export default function MyTemplatesTab() {
  const [selectedTemplate, setSelectedTemplate] = useState(myTemplates[1]);

  return (
    <div className="space-y-6">
      {/* My Templates Table */}
      <div className="bg-white border rounded-xl">
        <div className="p-4">
          <h2 className="font-semibold text-lg">My Templates</h2>
          <p className="text-sm text-gray-500">Templates created by you.</p>
        </div>

        <table className="w-full text-sm">
          <thead className="border-t border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Template Name</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Medications</th>
              <th className="text-left px-4 py-3">Created On</th>
              <th className="text-left px-4 py-3">Last Used</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myTemplates.map((tpl) => (
              <tr
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3 font-medium">{tpl.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                    {tpl.category}
                  </span>
                </td>
                <td className="px-4 py-3">{tpl.medicationsCount}</td>
                <td className="px-4 py-3">{tpl.createdOn}</td>
                <td className="px-4 py-3">{tpl.lastUsed}</td>
                <td className="px-4 py-3 flex justify-end gap-2">
                  <button className="p-1 border rounded hover:bg-gray-100">
                    <Pencil size={14} />
                  </button>
                  <button className="p-1 border rounded hover:bg-gray-100">
                    <Copy size={14} />
                  </button>
                  <button className="p-1 border rounded text-red-500 hover:bg-red-50">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Template Details */}
      {selectedTemplate && (
        <TemplateDetails template={selectedTemplate} />
      )}
    </div>
  );
}
