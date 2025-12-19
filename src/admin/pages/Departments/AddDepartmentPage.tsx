import { ChevronLeft, Plus } from 'lucide-react';

export const AddDepartmentPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-slate-900 font-sans">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white border rounded-xl hover:bg-gray-50 transition-colors">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Add Department</h1>
            <p className="text-sm text-slate-500 font-medium">Create a new department in your clinic.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white border rounded-xl hover:bg-gray-50 transition-colors">
          Back to Departments
        </button>
      </div>

      <div className="space-y-6">
        
        {/* SECTION 1: DEPARTMENT INFORMATION */}
        <section className="bg-white rounded-2xl border p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            Department Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField label="Department Name" placeholder="e.g. Cardiology" helper="The official name of the department" />
            <SelectField label="Head of Department" placeholder="Select a doctor" helper="The doctor who will lead this department" />
            
            <InputField label="Location" placeholder="e.g. Building A, Floor 3" helper="Physical location of the department" />
            <SelectField label="Status" options={['Active', 'Inactive']} helper="Current operational status" />
            
            <InputField label="Contact Email" placeholder="department@clinic.com" helper="Department contact email" type="email" />
            <InputField label="Contact Phone" placeholder="(555) 123-4567" helper="Department contact phone" />
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
              <textarea 
                className="w-full p-3 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none min-h-[100px]" 
                placeholder="Provide a description of the department's purpose, specialties, and functions..."
              />
              <p className="text-[10px] text-slate-400 mt-1 font-medium">Detailed description of the department.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: ASSIGN STAFF */}
        <section className="bg-white rounded-2xl border p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-2">Assign Staff</h3>
          <p className="text-xs text-slate-400 font-medium mb-6">Select staff members to assign to this department.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StaffCard name="Dr. Sarah Johnson" role="Cardiologist" />
            <StaffCard name="Dr. Michael Chen" role="Neurologist" />
            <StaffCard name="Dr. Emily Rodriguez" role="Pediatrician" />
            <StaffCard name="Nurse Robert Taylor" role="Head Nurse" />
            <StaffCard name="Nurse Jessica Adams" role="Registered Nurse" />
            <StaffCard name="Dr. James Wilson" role="Orthopedic Surgeon" />
          </div>
        </section>

        {/* SECTION 3: AVAILABLE SERVICES */}
        <section className="bg-white rounded-2xl border p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-2">Available Services</h3>
          <p className="text-xs text-slate-400 font-medium mb-6">Select services that will be offered by this department.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ServiceCheckbox label="General Consultation" sub="Initial patient assessment and diagnosis" />
            <ServiceCheckbox label="Specialized Treatment" sub="Advanced procedures specific to department" />
            <ServiceCheckbox label="Diagnostic Testing" sub="Comprehensive tests and screenings" />
            <ServiceCheckbox label="Emergency Care" sub="Urgent medical attention" />
            <ServiceCheckbox label="Follow-up Visits" sub="Post-treatment monitoring and care" />
            <ServiceCheckbox label="Preventive Care" sub="Health maintenance and disease prevention" />
          </div>
        </section>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            <Plus size={18} />
            Create Department
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const InputField = ({ label, placeholder, helper, type = "text" }: any) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full p-3 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none" 
    />
    <p className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-tight">{helper}</p>
  </div>
);

const SelectField = ({ label, placeholder, helper, options = [] }: any) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>
    <select className="w-full p-3 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer">
      <option value="">{placeholder || 'Select option'}</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <p className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-tight">{helper}</p>
  </div>
);

const StaffCard = ({ name, role }: any) => (
  <label className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    <div>
      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{name}</p>
      <p className="text-[10px] font-medium text-slate-400">{role}</p>
    </div>
  </label>
);

const ServiceCheckbox = ({ label, sub }: any) => (
  <label className="flex items-start gap-3 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    <div>
      <p className="text-sm font-bold text-slate-900">{label}</p>
      <p className="text-[10px] font-medium text-slate-400 leading-tight mt-0.5">{sub}</p>
    </div>
  </label>
);