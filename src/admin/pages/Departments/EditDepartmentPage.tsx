import {
    Building2,
    ChevronLeft,
    RefreshCw,
    Save
} from 'lucide-react';
import { useState } from 'react';

export const EditDepartmentPage = () => {
  // State for the color picker as shown in the design
  const [selectedColor, setSelectedColor] = useState('blue');
  const colors = [
    { name: 'red', bg: 'bg-red-500' },
    { name: 'blue', bg: 'bg-blue-500' },
    { name: 'green', bg: 'bg-emerald-500' },
    { name: 'yellow', bg: 'bg-amber-400' },
    { name: 'purple', bg: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-slate-900 font-sans">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 bg-white border rounded-xl hover:bg-gray-50 transition-colors">
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Edit Department</h1>
          <p className="text-sm text-slate-500 font-medium tracking-tight">Update the basic information for this department.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
        
        {/* LEFT COLUMN: DEPARTMENT INFORMATION */}
        <section className="lg:col-span-7 bg-white rounded-2xl border p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-1">Department Information</h3>
          <p className="text-xs text-slate-400 font-medium mb-8">Update the basic information for this department.</p>
          
          <div className="space-y-6">
            <EditInputField label="Department Name" defaultValue="Cardiology" />
            
            <div className="space-y-1">
              <label className="block text-sm font-bold text-slate-700">Department Head</label>
              <select className="w-full p-3 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer">
                <option>Dr. Sarah Johnson</option>
                <option>Dr. Michael Chen</option>
                <option>Dr. Emily Rodriguez</option>
              </select>
            </div>

            <EditInputField label="Location" defaultValue="East Wing, 3rd Floor" />

            <div className="grid grid-cols-2 gap-4">
              <EditInputField label="Phone Number" defaultValue="+1 (555) 123-4567" />
              <EditInputField label="Email" defaultValue="cardiology@clinic.com" type="email" />
            </div>

            {/* STATUS TOGGLE */}
            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="text-sm font-bold text-slate-700">Department Status</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Department is currently active</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
              </label>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: DEPARTMENT DETAILS & CUSTOMIZATION */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-1">Department Details</h3>
            <p className="text-xs text-slate-400 font-medium mb-8">Additional information about the department.</p>

            <div className="space-y-8">
              {/* DESCRIPTION TEXTAREA */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Description</label>
                <textarea 
                  className="w-full p-4 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none min-h-[140px] leading-relaxed text-slate-600"
                  defaultValue="The Cardiology department at our clinic is dedicated to providing exceptional care in the field of cardiology medicine. Our team of specialists works collaboratively to deliver comprehensive treatment plans tailored to each patient's unique needs."
                />
              </div>

              {/* ICON SELECTION */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Department Icon</label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 border-2 border-dashed rounded-xl flex items-center justify-center text-slate-400">
                    <Building2 size={24} />
                  </div>
                  <button className="px-4 py-2 text-xs font-bold border rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
                    <RefreshCw size={14} /> Change Icon
                  </button>
                </div>
              </div>

              {/* COLOR PICKER */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Department Color</label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full ${color.bg} transition-all ${
                        selectedColor === color.name 
                        ? 'ring-4 ring-offset-2 ring-slate-200 scale-110' 
                        : 'hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-12">
              <button className="flex-1 px-4 py-3 text-sm font-bold border rounded-xl hover:bg-gray-50 transition-all text-slate-600">
                Cancel
              </button>
              <button className="flex-[2] flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Helper Components ---

const EditInputField = ({ label, defaultValue, type = "text" }: any) => (
  <div className="space-y-1">
    <label className="block text-sm font-bold text-slate-700">{label}</label>
    <input 
      type={type}
      defaultValue={defaultValue}
      className="w-full p-3 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-600" 
    />
  </div>
);