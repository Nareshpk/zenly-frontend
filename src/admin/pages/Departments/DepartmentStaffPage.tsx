import {
    ChevronLeft,
    Clock,
    Edit3,
    ExternalLink,
    Mail,
    MessageSquare,
    MoreHorizontal,
    Phone,
    Search,
    ShieldCheck,
    Star,
    UserMinus,
    UserPlus
} from 'lucide-react';
import { useState } from 'react';

export const DepartmentStaffPage = () => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const staffMembers = [
    { id: 'ST-001', name: 'Dr. Sarah Johnson', role: 'Head of Department', specialty: 'Invasive Cardiology', status: 'Active', shift: 'Morning', rating: 4.9 },
    { id: 'ST-002', name: 'Dr. Michael Chen', role: 'Senior Specialist', specialty: 'Electrophysiology', status: 'Active', shift: 'Afternoon', rating: 4.8 },
    { id: 'ST-003', name: 'Nurse Emily Davis', role: 'Head Nurse', specialty: 'Cardiac Care', status: 'On Leave', shift: 'Night', rating: 4.7 },
    { id: 'ST-004', name: 'Dr. James Wilson', role: 'Specialist', specialty: 'Echocardiography', status: 'Active', shift: 'Morning', rating: 4.6 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-slate-900 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white border rounded-xl hover:bg-gray-50 transition-colors">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Cardiology Staff</h1>
            <p className="text-sm text-slate-500 font-medium">Manage medical professionals and clinical staff in this department.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <UserPlus size={18} />
          Assign New Staff
        </button>
      </div>

      {/* SEARCH & GLOBAL ACTIONS */}
      <div className="bg-white p-4 rounded-2xl border mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, specialty or staff ID..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2.5 text-slate-600 bg-white border rounded-xl hover:bg-gray-50"><Phone size={18} /></button>
           <button className="p-2.5 text-slate-600 bg-white border rounded-xl hover:bg-gray-50"><Mail size={18} /></button>
        </div>
      </div>

      {/* STAFF TABLE */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b">
              <th className="px-6 py-4">Staff Member</th>
              <th className="px-6 py-4">Specialty</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Shift</th>
              <th className="px-6 py-4 text-center">Rating</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {staffMembers.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border flex items-center justify-center font-bold text-slate-500">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{staff.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{staff.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 font-medium text-slate-600">
                    <ShieldCheck size={14} className="text-blue-500" />
                    {staff.specialty}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                    staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                  }`}>
                    {staff.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Clock size={14} />
                    {staff.shift}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 font-bold text-slate-700">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    {staff.rating}
                  </div>
                </td>
                <td className="px-6 py-4 text-right relative">
                  <button 
                    onClick={() => setActiveMenuId(activeMenuId === staff.id ? null : staff.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-slate-400 transition-colors"
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {/* STAFF ACTION MENU */}
                  {activeMenuId === staff.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                      <div className="absolute right-6 top-12 w-48 bg-white border rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-100">
                        <MenuButton icon={<ExternalLink size={14} />} label="View Profile" />
                        <MenuButton icon={<Edit3 size={14} />} label="Edit Info" />
                        <MenuButton icon={<MessageSquare size={14} />} label="Send Message" />
                        <div className="h-px bg-gray-100 my-1" />
                        <MenuButton icon={<UserMinus size={14} />} label="Remove from Dept" variant="danger" />
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label, variant = 'default' }: any) => (
  <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${
    variant === 'danger' ? 'text-red-500 hover:bg-red-50' : 'text-slate-600 hover:bg-gray-50'
  }`}>
    {icon}
    {label}
  </button>
);