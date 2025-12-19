import React, { useState } from 'react';
import { 
  ArrowLeft, Save, X, User, 
  Stethoscope, Settings, Calendar, 
  Mail, Phone, MapPin 
} from 'lucide-react';

const EditDonorPage = () => {
  const [activeTab, setActiveTab] = useState('Personal Information');

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      {/* Top Navigation */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Edit Donor</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Fixed Profile Card */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center">
            <h2 className="text-lg font-bold w-full text-left mb-6 uppercase tracking-widest text-gray-400 text-[10px]">Donor Profile</h2>
            
            <div className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-gray-50">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop" 
                alt="John Smith" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-xl font-bold mb-1">John Smith</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 border border-red-200 text-red-600 bg-red-50 rounded-full text-[10px] font-bold">O+</span>
              <span className="px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-bold">Eligible</span>
            </div>
            <span className="text-[11px] text-gray-400 font-bold tracking-widest uppercase">ID: D-1001</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Tabbed Form Section */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[650px] flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">Edit Donor Information</h2>
              <p className="text-sm text-gray-400 mt-1">Update the donor's personal and medical information</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 p-4 bg-gray-50/50 border-b border-gray-100">
              {['Personal Information', 'Medical Information', 'Preferences'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab 
                    ? 'bg-white shadow-sm border border-gray-200 text-black' 
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-8 flex-1">
              {activeTab === 'Personal Information' && <PersonalInfoTab />}
              {activeTab === 'Medical Information' && <MedicalInfoTab />}
              {activeTab === 'Preferences' && <PreferencesTab />}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
              <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-white transition-colors">
                Cancel
              </button>
              <button className="flex items-center gap-2 px-8 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Tab Sub-Components ---

const PersonalInfoTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
    <InputGroup label="Full Name" defaultValue="John Smith" />
    <InputGroup label="Date of Birth" type="text" defaultValue="Wed Dec 17 2025" icon={<Calendar size={16}/>} />
    
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Gender</label>
      <div className="flex gap-4 mt-3">
        {['Male', 'Female', 'Other'].map((g) => (
          <label key={g} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="gender" defaultChecked={g === 'Male'} className="w-4 h-4 text-black focus:ring-black border-gray-300" />
            <span className="text-sm text-gray-600">{g}</span>
          </label>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Blood Type</label>
      <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black">
        <option>O+</option>
        <option>A+</option>
        <option>B+</option>
      </select>
    </div>

    <InputGroup label="Email" type="email" defaultValue="john.smith@example.com" />
    <InputGroup label="Phone" type="tel" defaultValue="+1 (555) 123-4567" />
    
    <div className="md:col-span-2">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Address</label>
      <textarea 
        rows={3}
        defaultValue="123 Main Street, Anytown, CA 12345"
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black resize-none"
      />
    </div>
  </div>
);

const MedicalInfoTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-8">
      <InputGroup label="Weight (kg)" defaultValue="75" />
      <InputGroup label="Height (cm)" defaultValue="180" />
    </div>
    
    <TextAreaGroup label="Allergies" defaultValue="None" />
    <TextAreaGroup label="Current Medications" defaultValue="None" />
    <TextAreaGroup label="Chronic Conditions" defaultValue="None" />
    <TextAreaGroup label="Previous Surgeries" defaultValue="Appendectomy (2010)" />

    <div className="pt-4">
      <div className="flex gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded border-gray-300 text-black focus:ring-black" />
        <div>
          <h4 className="text-sm font-bold">Eligible for Donation</h4>
          <p className="text-xs text-gray-500">Check if the donor is currently eligible to donate blood</p>
        </div>
      </div>
    </div>
  </div>
);

const PreferencesTab = () => (
  <div className="space-y-8">
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">Preferred Contact Method</label>
      <div className="space-y-3">
        {['Email', 'Phone Call', 'SMS'].map((method) => (
          <label key={method} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="contact" defaultChecked={method === 'Email'} className="w-4 h-4 text-black focus:ring-black border-gray-300" />
            <span className="text-sm text-gray-600">{method}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="flex gap-4">
        <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded border-gray-300 text-black focus:ring-black" />
        <div>
          <h4 className="text-sm font-bold">Consent to Contact</h4>
          <p className="text-xs text-gray-500 mt-1">The donor has given consent to be contacted for future donation drives and updates</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Form Helpers ---

const InputGroup = ({ label, defaultValue, type = "text", icon }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{label}</label>
    <div className="relative">
      <input 
        type={type}
        defaultValue={defaultValue}
        className={`w-full ${icon ? 'pl-10' : 'px-4'} py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black transition-all`}
      />
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
    </div>
  </div>
);

const TextAreaGroup = ({ label, defaultValue }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{label}</label>
    <textarea 
      defaultValue={defaultValue}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black resize-none min-h-[80px]"
    />
  </div>
);

export default EditDonorPage;