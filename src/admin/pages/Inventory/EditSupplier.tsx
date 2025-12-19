import React from 'react';
import { ArrowLeft, Save, ChevronDown } from 'lucide-react';

const EditSupplierPage = () => {
  return (
    <div className="min-h-screen bg-gray-50/30 p-8">
      {/* Top Navigation / Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all shadow-sm">
            <ArrowLeft size={20} className="text-zinc-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Edit Supplier</h1>
            <p className="text-sm text-gray-400 font-medium">Update supplier information</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all shadow-md">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Basic Information */}
        <div className="lg:col-span-2 space-y-8">
          <Section title="Basic Information" description="Edit the basic information about this supplier">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-700">Supplier ID</label>
                <input 
                  disabled
                  value="SUP001"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 cursor-not-allowed"
                />
                <span className="text-[10px] text-gray-400">Supplier ID cannot be changed</span>
              </div>
              <Field label="Supplier Name" defaultValue="MedPlus Supplies" />
              
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-700">Description</label>
                <textarea 
                  defaultValue="Leading provider of high-quality medical supplies and equipment for healthcare facilities."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[120px] focus:outline-none focus:ring-1 focus:ring-zinc-400 resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-700">Category</label>
                <Select defaultValue="Medical Supplies" options={['Medical Supplies', 'Medications', 'Equipment', 'Services']} />
              </div>

              <div className="flex items-center gap-4 pt-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-5 bg-zinc-900 rounded-full relative cursor-pointer p-1">
                    <div className="absolute right-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-bold text-zinc-900">Active</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Contact Information */}
          <Section title="Contact Information" description="Edit contact details for this supplier">
            <div className="grid grid-cols-2 gap-6">
              <Field label="Contact Person" defaultValue="Sarah Johnson" />
              <Field label="Email" defaultValue="contact@medplus.com" />
              <Field label="Phone" defaultValue="(555) 123-4567" />
              <Field label="Location" defaultValue="Chicago, IL" />
              <div className="col-span-2">
                <Field label="Website" defaultValue="https://example.com" />
              </div>
            </div>
          </Section>
        </div>

        {/* Right Column: Additional Settings */}
        <div className="lg:col-span-1">
          <Section title="Additional Settings" description="Configure additional supplier settings">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-700">Payment Terms</label>
                <Select defaultValue="Net 30" options={['Net 30', 'Net 60', 'Due on Receipt', 'Advance Payment']} />
              </div>
              
              <Field label="Average Lead Time (days)" defaultValue="5" />
              <Field label="Minimum Order Value ($)" defaultValue="100" />
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-700">Rating (1-5)</label>
                <Select defaultValue="5 - Excellent" options={['5 - Excellent', '4 - Good', '3 - Average', '2 - Poor', '1 - Unacceptable']} />
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-sm font-bold text-zinc-800">Preferred Supplier</span>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer p-1">
                  <div className="absolute left-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const Section = ({ title, description, children }: any) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-50 bg-white">
      <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
      <p className="text-xs text-gray-400 font-medium">{description}</p>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Field = ({ label, defaultValue, type = "text" }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-zinc-700">{label}</label>
    <input 
      type={type}
      defaultValue={defaultValue}
      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
    />
  </div>
);

const Select = ({ defaultValue, options }: any) => (
  <div className="relative">
    <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all">
      <option>{defaultValue}</option>
      {options.filter((o: string) => o !== defaultValue).map((opt: string) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default EditSupplierPage;