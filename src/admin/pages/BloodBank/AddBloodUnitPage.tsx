import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, MapPin, 
  Droplet, Info, User, CheckCircle2 
} from 'lucide-react';

const AddBloodUnitPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button className="p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add Blood Unit</h1>
            <p className="text-sm text-gray-500">Add a new blood unit to the blood bank inventory</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
          Cancel
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">Blood Unit Information</h2>
          <p className="text-sm text-gray-400">Enter the details of the new blood unit to be added to the inventory.</p>
        </div>

        <div className="p-8 space-y-10">
          {/* Top Section: Donor & Collection Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            
            {/* Left Side: Donor Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" id="anon" className="rounded border-gray-300 text-black focus:ring-black" />
                <label htmlFor="anon" className="text-sm font-medium text-gray-700">Anonymous Donor</label>
              </div>

              <div className="space-y-4">
                <InputGroup label="Donor ID" placeholder="Enter donor ID" helpText="Enter the unique ID of the donor." />
                <InputGroup label="Donor Name" placeholder="Enter donor name" />
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Blood Group</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black transition-all">
                    <option>Select blood group</option>
                    <option>A+</option>
                    <option>O+</option>
                    <option>B-</option>
                  </select>
                </div>

                <InputGroup label="Quantity (units)" type="number" defaultValue="1" helpText="Standard unit is 450ml of whole blood." />
              </div>
            </div>

            {/* Right Side: Collection Info */}
            <div className="space-y-6">
              <DateInput label="Collection Date" />
              <DateInput label="Expiry Date" helpText="Typically 35-42 days after collection for whole blood." />
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Source Type</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black transition-all">
                  <option>Select source type</option>
                  <option>Voluntary</option>
                  <option>Replacement</option>
                </select>
              </div>

              <InputGroup label="Collection Location" placeholder="Enter collection location" />
            </div>
          </div>

          {/* Middle Section: Status Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatusCheckbox 
              label="Screening Complete" 
              description="Blood has been screened for infectious diseases." 
            />
            <StatusCheckbox 
              label="Processing Complete" 
              description="Blood has been processed and is ready for storage." 
            />
          </div>

          {/* Bottom Section: Notes */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Additional Notes</label>
            <textarea 
              rows={4}
              placeholder="Enter any additional information about this blood unit"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button className="px-8 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 shadow-md transition-all active:scale-95">
            Add Blood Unit
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const InputGroup = ({ label, placeholder, helpText, type = "text", defaultValue }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{label}</label>
    <input 
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-gray-400"
    />
    {helpText && <p className="text-[11px] text-gray-400 mt-1.5 italic">{helpText}</p>}
  </div>
);

const DateInput = ({ label, helpText }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{label}</label>
    <div className="relative">
      <input 
        type="text"
        placeholder="Pick a date"
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black cursor-pointer"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
    </div>
    {helpText && <p className="text-[11px] text-gray-400 mt-1.5 italic">{helpText}</p>}
  </div>
);

const StatusCheckbox = ({ label, description }: any) => (
  <div className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:border-black transition-all cursor-pointer group">
    <div className="pt-0.5">
      <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black" />
    </div>
    <div>
      <h4 className="text-sm font-bold text-gray-900">{label}</h4>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  </div>
);

export default AddBloodUnitPage;