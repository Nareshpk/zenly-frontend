import React, { useState } from 'react';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react';

const UpdateBloodUnit = () => {
  const [status, setStatus] = useState('Available');

  const statusOptions = ['Available', 'Reserved', 'Issued', 'Expired', 'Discarded'];

  return (
    <div className="min-h-screen bg-white p-8 font-sans text-gray-900">
      {/* Top Navigation Bar */}
      <div className="flex items-center gap-4 mb-10">
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Update Blood Unit</h1>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 border border-gray-300 rounded-md text-xs font-bold bg-white">A+</span>
          <span className="px-3 py-0.5 bg-emerald-500 text-white rounded-full text-xs font-semibold">Available</span>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-xl font-bold">Blood Unit Information</h2>
        <p className="text-sm text-gray-500 mt-1">Update the status and details of blood unit BS-002</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
        {/* Left Column: Status Selection */}
        <div className="space-y-4">
          <label className="text-sm font-bold block mb-4">Status</label>
          <div className="space-y-3">
            {statusOptions.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="status"
                    value={option}
                    checked={status === option}
                    onChange={(e) => setStatus(e.target.value)}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-black transition-all"
                  />
                  <div className="absolute w-2.5 h-2.5 bg-black rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="space-y-6">
          {/* Storage Location */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800">Storage Location</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border-2 border-black rounded-lg px-4 py-3 text-sm focus:outline-none">
                <option>Refrigerator 1</option>
                <option>Refrigerator 2</option>
                <option>Freezer A</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Units */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800">Units</label>
            <input 
              type="text" 
              defaultValue="12"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-black focus:outline-none transition-colors"
            />
            <p className="text-xs text-gray-400 font-medium">Number of units available</p>
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800">Expiry Date</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="May 15th, 2023"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-black focus:outline-none transition-colors"
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section - Full Width */}
      <div className="mt-10 space-y-2">
        <label className="text-sm font-bold text-gray-800">Notes</label>
        <textarea 
          placeholder="Add any additional notes or comments about this update"
          className="w-full min-h-[160px] border border-gray-200 rounded-lg p-4 text-sm focus:border-black focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Footer Actions */}
      <div className="mt-10 flex justify-end gap-4 border-t border-gray-100 pt-8">
        <button className="px-8 py-2.5 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-8 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
          Update Blood Unit
        </button>
      </div>
    </div>
  );
};

export default UpdateBloodUnit;