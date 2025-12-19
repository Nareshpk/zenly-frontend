import React from "react";
import { MedicationTemplate } from "../../../type/MedicationTypes";
import { MEDICATION_TEMPLATES } from "../../../type/templates";


interface Props {
  onTemplateApply: (template: MedicationTemplate) => void;
}

const UseMedicationTemplate: React.FC<Props> = ({ onTemplateApply }) => {
  return (
    <div className="border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Use Medication Template</h3>

        <select
          className="border rounded-md px-3 py-2 text-sm w-64"
          defaultValue=""
          onChange={(e) => {
            const selected = MEDICATION_TEMPLATES.find(
              (t) => t.id === e.target.value
            );
            if (selected) onTemplateApply(selected);
          }}
        >
          <option value="" disabled>
            Select template
          </option>
          {MEDICATION_TEMPLATES.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-500">
        Selecting a template will auto-fill diagnosis and medications.
      </p>
    </div>
  );
};

export default UseMedicationTemplate;
