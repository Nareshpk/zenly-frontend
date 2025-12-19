import React from 'react';
import { X, ChevronDown, Upload } from 'lucide-react';

interface AddSupplierDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Add New Supplier</h2>
            <p className="text-xs text-gray-400 font-medium">Register a new vendor in the system</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Scrollable if content exceeds height */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Section: Company Info */}
            <div className="col-span-2">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Company Information</h3>
            </div>

            <DialogField label="Supplier Name" placeholder="e.g. PharmaTech Inc." isRequired />
            <DialogField label="Supplier ID" placeholder="e.g. SUP-001" />

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-700">Category</label>
              <div className="relative">
                <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium bg-white focus:ring-2 focus:ring-zinc-900/10 focus:outline-none">
                  <option>Select Category</option>
                  <option>Medications</option>
                  <option>Medical Supplies</option>
                  <option>Equipment</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <DialogField label="Website" placeholder="https://..." />

            {/* Section: Contact Info */}
            <div className="col-span-2 pt-4">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Primary Contact</h3>
            </div>

            <DialogField label="Contact Person" placeholder="Full name" />
            <DialogField label="Email Address" placeholder="email@company.com" />
            <DialogField label="Phone Number" placeholder="+1 (555) 000-0000" />
            <DialogField label="Location" placeholder="City, Country" />

            {/* Section: Additional Details */}
            <div className="col-span-2 pt-4">
              <label className="text-xs font-bold text-zinc-700 block mb-2">Notes & Terms</label>
              <textarea 
                placeholder="Payment terms, lead times, or general notes..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[100px] focus:ring-2 focus:ring-zinc-900/10 focus:outline-none resize-none"
              />
            </div>

            {/* Logo Upload Mockup */}
            <div className="col-span-2">
              <div className="border-2 border-dashed border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload size={24} className="text-gray-300 mb-2" />
                <p className="text-xs font-bold text-zinc-600">Click to upload company logo</p>
                <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold bg-white hover:bg-gray-100 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all shadow-md"
          >
            Create Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Component
const DialogField = ({ label, placeholder, isRequired = false }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-zinc-700">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-zinc-900/10 focus:outline-none placeholder:text-gray-300"
    />
  </div>
);