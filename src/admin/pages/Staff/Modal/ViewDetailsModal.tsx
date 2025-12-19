import { Check, X } from 'lucide-react';
import React from 'react';

interface PermissionRow {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  description: string;
  permissions: PermissionRow[];
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  templateName, 
  description, 
  permissions 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{templateName} Template</h2>
            <p className="text-sm text-gray-500">Detailed permissions for this role template</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-1">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </section>

          {/* Permissions Table Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-4">Permissions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-400 font-medium border-b border-gray-100">
                    <th className="pb-3 font-semibold text-gray-500">Module</th>
                    <th className="pb-3 text-center">View</th>
                    <th className="pb-3 text-center">Create</th>
                    <th className="pb-3 text-center">Edit</th>
                    <th className="pb-3 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {permissions.map((row) => (
                    <tr key={row.module} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 font-bold text-gray-800">{row.module}</td>
                      <td className="py-4 text-center">
                        {row.view ? <Check className="w-4 h-4 mx-auto text-gray-800" /> : <span className="text-gray-300">-</span>}
                      </td>
                      <td className="py-4 text-center">
                        {row.create ? <Check className="w-4 h-4 mx-auto text-gray-800" /> : <span className="text-gray-300">-</span>}
                      </td>
                      <td className="py-4 text-center">
                        {row.edit ? <Check className="w-4 h-4 mx-auto text-gray-800" /> : <span className="text-gray-300">-</span>}
                      </td>
                      <td className="py-4 text-center">
                        {row.delete ? <Check className="w-4 h-4 mx-auto text-gray-800" /> : <span className="text-gray-300">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/30">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-zinc-900 text-white rounded-lg font-semibold hover:bg-black transition shadow-sm">
            Apply Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;