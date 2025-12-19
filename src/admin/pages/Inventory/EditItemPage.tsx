import React from 'react';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react';

const EditItemPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-900">
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold">Edit Item: Disposable Gloves (Box)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
        {/* Top Left: Basic Information */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Basic Information</h2>
            <p className="text-sm text-gray-400">Edit the basic details of this inventory item</p>
          </div>
          <div className="space-y-4">
            <FormGroup label="Item Name" defaultValue="Disposable Gloves (Box)" />
            <FormGroup label="SKU / Item Code" defaultValue="GLV-MED-100" />
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Category</label>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400">
                  <option>Medical Supplies</option>
                  <option>Medications</option>
                  <option>Equipment</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Description</label>
              <textarea 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[120px] focus:outline-none focus:ring-1 focus:ring-zinc-400 resize-none"
                defaultValue="Powder-free latex examination gloves, size medium. Box of 100 gloves."
              />
            </div>
          </div>
        </div>

        {/* Top Right: Supplier & Location */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Supplier & Location</h2>
            <p className="text-sm text-gray-400">Edit supplier and storage information</p>
          </div>
          <div className="space-y-4">
            <FormGroup label="Supplier" defaultValue="MedSupply Co." />
            <FormGroup label="Storage Location" defaultValue="Storage Room A" />
            <FormGroup label="Batch Number" defaultValue="BN-2023-0456" />
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Expiry Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  defaultValue="December 31st, 2024"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left: Stock Information */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Stock Information</h2>
            <p className="text-sm text-gray-400">Edit stock levels and pricing</p>
          </div>
          <div className="space-y-4">
            <FormGroup label="Current Stock Level" defaultValue="45" />
            <div className="space-y-1">
              <FormGroup label="Minimum Stock Level" defaultValue="20" />
              <p className="text-[10px] text-gray-400">Alert will be triggered when stock falls below this level</p>
            </div>
            <FormGroup label="Maximum Stock Level" defaultValue="100" />
            <FormGroup label="Unit Price ($)" defaultValue="8.99" />
          </div>
        </div>

        {/* Bottom Right: Additional Information */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Additional Information</h2>
            <p className="text-sm text-gray-400">Edit additional details and settings</p>
          </div>
          <div className="flex-grow space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Notes</label>
              <textarea 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[120px] focus:outline-none focus:ring-1 focus:ring-zinc-400 resize-none"
                defaultValue="Preferred brand for examination rooms. Order well in advance during flu season."
              />
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="activeItem" 
                defaultChecked 
                className="w-4 h-4 rounded border-gray-300 text-zinc-900 focus:ring-zinc-900" 
              />
              <label htmlFor="activeItem" className="text-xs font-bold text-gray-700">
                Item is active and available for use
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3 z-50">
        <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-zinc-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-colors shadow-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Reusable Label + Input group
const FormGroup = ({ label, defaultValue }: { label: string; defaultValue: string }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-700">{label}</label>
    <input 
      type="text" 
      defaultValue={defaultValue}
      className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
    />
  </div>
);

export default EditItemPage;