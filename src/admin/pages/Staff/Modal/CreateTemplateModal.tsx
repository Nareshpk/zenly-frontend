import { X } from 'lucide-react';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PERMISSION_CATEGORIES = [
  'Dashboard', 'Patients', 'Appointments', 'Billing', 'Reports', 'Settings', 'Inventory', 'Staff'
];

const ACTIONS = ['View', 'Create', 'Edit', 'Delete'];

const CreateTemplateModal = ({ isOpen, onClose }: CreateTemplateModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Role Template</h2>
            <p className="text-sm text-gray-500">Define a new role template with specific permissions</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Template Name</label>
              <input 
                type="text" 
                placeholder="Enter template name"
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-black outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none bg-white">
                <option>Medical</option>
                <option>Administrative</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea 
                rows={3}
                placeholder="Enter template description"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none resize-none"
              />
            </div>
          </div>

          {/* Permissions Grid */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Permissions</h3>
            <div className="space-y-4">
              {PERMISSION_CATEGORIES.map((cat) => (
                <div key={cat} className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-800">{cat}</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {ACTIONS.map((action) => (
                      <label key={action} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" 
                        />
                        <span className="text-sm text-gray-600 group-hover:text-black transition">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-zinc-900 text-white rounded-lg font-semibold hover:bg-black transition">
            Create Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplateModal;