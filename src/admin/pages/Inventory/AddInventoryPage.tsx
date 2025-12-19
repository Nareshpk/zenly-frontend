import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Save } from 'lucide-react';

const AddInventoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Item Details');

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-900">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-zinc-900">Add Inventory Item</h1>
      </div>
      <p className="text-sm text-gray-400 mb-8 ml-12">Add a new item to your inventory</p>

      {/* Internal Navigation Tabs */}
      <div className="flex gap-1 mb-8 bg-gray-200/50 w-fit p-1 rounded-lg border border-gray-200">
        {['Item Details', 'Stock Management', 'Suppliers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === tab 
                ? 'bg-white shadow-sm text-zinc-900 border border-gray-100' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="space-y-6 mb-24">
        {activeTab === 'Item Details' && <ItemDetailsTab />}
        {activeTab === 'Stock Management' && <StockManagementTab />}
        {activeTab === 'Suppliers' && <SuppliersTab />}
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3 z-50">
        <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-zinc-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm">
          <Save size={18} />
          Save Item
        </button>
      </div>
    </div>
  );
};

// --- TAB COMPONENTS ---

const ItemDetailsTab = () => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <SectionCard title="Basic Information" description="Enter the basic details of the inventory item">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Item Name" placeholder="Enter item name" />
        <FormInput label="Item ID/SKU" placeholder="Enter item ID or SKU" />
        <FormSelect label="Category" options={['Select category', 'Medical Supplies', 'Medications', 'Equipment']} />
        <FormSelect label="Subcategory" options={['Select subcategory']} />
        <div className="md:col-span-2">
          <FormTextArea label="Description" placeholder="Enter item description" />
        </div>
        <FormSelect label="Unit of Measure" options={['Select unit', 'Box', 'Bottle', 'Each']} />
        <FormInput label="Unit Quantity" placeholder="Quantity per unit" />
        <FormInput label="Storage Location" placeholder="Enter storage location" />
      </div>
    </SectionCard>

    <SectionCard title="Additional Information" description="Enter additional details about the item">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Manufacturer" placeholder="Enter manufacturer" />
        <FormInput label="Brand" placeholder="Enter brand name" />
        <FormInput label="Model/Version" placeholder="Enter model or version" />
        <FormSelect label="Expiry Tracking" options={['Select option', 'Track by Batch', 'No Tracking']} />
        <div className="flex flex-wrap gap-8 pt-2">
          <Checkbox label="Requires Refrigeration" />
          <Checkbox label="Controlled Substance" />
          <Checkbox label="Hazardous Material" />
          <Checkbox label="Sterile" />
        </div>
        <div className="md:col-span-2">
          <FormTextArea label="Notes" placeholder="Enter any additional notes" />
        </div>
      </div>
    </SectionCard>
  </div>
);

const StockManagementTab = () => (
  <div className="animate-in fade-in duration-300">
    <SectionCard title="Stock Information" description="Configure stock levels and reorder settings">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormInput label="Current Stock" placeholder="Enter current quantity" />
        <FormInput label="Minimum Stock Level" placeholder="Enter minimum quantity" />
        <FormInput label="Maximum Stock Level" placeholder="Enter maximum quantity" />
        <FormInput label="Reorder Point" placeholder="Enter reorder point" />
        <FormInput label="Reorder Quantity" placeholder="Enter reorder quantity" />
        <div className="grid grid-cols-2 gap-4 md:col-span-3">
          <FormInput label="Unit Cost ($)" placeholder="Enter unit cost" />
          <FormInput label="Unit Price ($)" placeholder="Enter unit price" />
        </div>
        <div className="flex gap-8 pt-4">
          <Checkbox label="Enable Low Stock Alerts" defaultChecked />
          <Checkbox label="Enable Expiry Alerts" />
        </div>
      </div>
    </SectionCard>
  </div>
);

const SuppliersTab = () => (
  <div className="animate-in fade-in duration-300">
    <SectionCard title="Supplier Information" description="Link suppliers to this inventory item">
      <div className="space-y-6">
        <FormSelect label="Primary Supplier" options={['Select primary supplier', 'MedSupply Co.', 'PharmaTech Inc.']} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Supplier Item Code" placeholder="Enter supplier's item code" />
          <FormInput label="Supplier Price ($)" placeholder="Enter supplier price" />
          <FormInput label="Lead Time (Days)" placeholder="Enter lead time in days" />
          <FormInput label="Minimum Order Quantity" placeholder="Enter minimum order quantity" />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-700">Alternative Suppliers</label>
          <div className="flex flex-col gap-2">
            <Checkbox label="PharmaTech Inc." />
            <Checkbox label="MedEquip Solutions" />
            <Checkbox label="Health Supply Co." />
          </div>
        </div>
      </div>
    </SectionCard>
  </div>
);

// --- HELPER COMPONENTS ---

const SectionCard = ({ title, description, children }: any) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
    <h2 className="text-xl font-bold text-zinc-900 mb-1">{title}</h2>
    <p className="text-sm text-gray-400 mb-8 font-medium">{description}</p>
    {children}
  </div>
);

const FormInput = ({ label, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-700">{label}</label>
    <input type="text" placeholder={placeholder} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-gray-300" />
  </div>
);

const FormSelect = ({ label, options }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-700">{label}</label>
    <div className="relative">
      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-400">
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

const FormTextArea = ({ label, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-700">{label}</label>
    <textarea placeholder={placeholder} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-zinc-400 resize-none placeholder:text-gray-300" />
  </div>
);

const Checkbox = ({ label, defaultChecked = false }: any) => (
  <div className="flex items-center gap-2">
    <input type="checkbox" defaultChecked={defaultChecked} className="w-4 h-4 rounded border-gray-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer" />
    <label className="text-xs font-bold text-zinc-700 cursor-pointer">{label}</label>
  </div>
);

export default AddInventoryPage;