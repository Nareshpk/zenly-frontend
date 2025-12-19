import {
    ArrowRight,
    Calendar,
    ChevronLeft,
    Edit3,
    Mail,
    MapPin,
    Phone,
    Stethoscope,
    UserPlus,
    Users
} from 'lucide-react';
import React, { useState } from 'react';

export const DepartmentViewPage = () => {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-slate-900 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 bg-white border rounded-xl hover:bg-gray-50 transition-colors">
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black tracking-tight">Cardiology</h1>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[10px] font-bold uppercase">
            Active
          </span>
        </div>
      </div>

      {/* 2. ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Staff Members" value="8" trend="+2 from last month" icon={<Users />} />
        <StatCard title="Services Offered" value="12" trend="+3 new services added" icon={<Stethoscope />} />
        <StatCard title="Monthly Appointments" value="128" trend="+14% from last month" icon={<Calendar />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 3. SIDEBAR: DEPARTMENT INFORMATION */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-1">Department Information</h3>
            <p className="text-xs text-slate-400 font-medium mb-6">Details about the Cardiology department</p>
            
            <div className="space-y-4 mb-8">
              <InfoItem icon={<Calendar size={16} />} label="Established" value="January 2015" />
              <InfoItem icon={<MapPin size={16} />} label="Location" value="East Wing, 3rd Floor" />
              <InfoItem icon={<Phone size={16} />} label="Contact" value="+1 (555) 123-4567" />
              <InfoItem icon={<Mail size={16} />} label="Email" value="cardiology@clinic.com" />
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-slate-700 uppercase">Department Capacity</p>
                <p className="text-xs font-bold text-slate-400">75%</p>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 rounded-full" style={{ width: '75%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-medium italic">75% of maximum capacity</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold border rounded-xl hover:bg-gray-50 transition-all">
                <Edit3 size={14} /> Edit Department
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <UserPlus size={14} /> Manage Staff
              </button>
            </div>
          </div>
        </div>

        {/* 4. MAIN CONTENT: OVERVIEW TABS */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border p-6 shadow-sm min-h-[500px] flex flex-col">
            <h3 className="text-lg font-bold mb-1">Department Overview</h3>
            <p className="text-xs text-slate-400 font-medium mb-6">Key information and statistics</p>

            {/* TAB TRID */}
            <div className="flex p-1 bg-gray-100 rounded-xl w-fit mb-8">
              {['About', 'Key Staff', 'Services'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1">
              {activeTab === 'About' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    The Cardiology department at our clinic is dedicated to providing exceptional care in the field of cardiology medicine. Our team of specialists works collaboratively to deliver comprehensive treatment plans tailored to each patient's unique needs.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    Established in 2015, the department has grown to become a center of excellence, equipped with state-of-the-art technology and facilities. We pride ourselves on staying at the forefront of medical advancements.
                  </p>
                  <div>
                    <h4 className="text-sm font-black mb-4">Department Goals</h4>
                    <ul className="space-y-3">
                      <GoalItem text="Provide exceptional patient care with compassion and expertise" />
                      <GoalItem text="Advance medical knowledge through research and innovation" />
                      <GoalItem text="Train the next generation of medical professionals" />
                      <GoalItem text="Engage with the community to promote health and wellness" />
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'Key Staff' && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <StaffRow initials="DSJ" name="Dr. Sarah Johnson" role="Department Head" />
                  <StaffRow initials="S1" name="Dr. Alex Parker" role="Senior Specialist" />
                  <StaffRow initials="S2" name="Dr. Jamie Smith" role="Specialist" />
                  <StaffRow initials="S3" name="Dr. Taylor Jones" role="Resident" />
                  <button className="w-full mt-4 py-3 border-t flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                    <Users size={14} /> View All Staff
                  </button>
                </div>
              )}

              {activeTab === 'Services' && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <ServiceRow name="Comprehensive Consultations" duration="30-60 min" price="$150" />
                  <ServiceRow name="Diagnostic Procedures" duration="45-90 min" price="$250" />
                  <ServiceRow name="Therapeutic Interventions" duration="60-120 min" price="$350" />
                  <ServiceRow name="Follow-up Care" duration="15-30 min" price="$100" />
                  <ServiceRow name="Emergency Services" duration="As needed" price="Varies" />
                  <button className="w-full mt-4 py-3 border border-dashed rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 hover:bg-gray-50 transition-all">
                    View All Services
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatCard = ({ title, value, trend, icon }: any) => (
  <div className="bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-3xl font-black text-slate-900">{value}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl text-slate-400 group-hover:text-slate-900 transition-colors">
        {React.cloneElement(icon, { size: 24 })}
      </div>
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{trend}</p>
  </div>
);

const InfoItem = ({ icon, label, value }: any) => (
  <div className="flex items-start gap-3">
    <div className="text-slate-400 mt-0.5">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const GoalItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
    <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
    {text}
  </li>
);

const StaffRow = ({ initials, name, role }: any) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-100 border flex items-center justify-center text-xs font-black text-slate-500">
        {initials}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{name}</p>
        <p className="text-[10px] font-medium text-slate-400">{role}</p>
      </div>
    </div>
    <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
  </div>
);

const ServiceRow = ({ name, duration, price }: any) => (
  <div className="flex items-center justify-between p-4 border-b last:border-0">
    <div>
      <p className="text-sm font-bold text-slate-900">{name}</p>
      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">{duration}</p>
    </div>
    <div className="px-3 py-1 bg-gray-50 border rounded-lg text-xs font-black text-slate-700">
      {price}
    </div>
  </div>
);