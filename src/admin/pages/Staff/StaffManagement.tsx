import {
    Building2,
    Calendar,
    CalendarDays,
    ChevronRight,
    Download,
    Eye,
    Filter,
    LayoutGrid,
    List,
    Mail,
    MoreVertical,
    Pencil,
    Phone,
    Plus,
    Search,
    Settings,
    Trash2,
    UserMinus,
    Users
} from 'lucide-react';
import React, { useState } from 'react';

// Types
interface StaffMember {
    id: string;
    name: string;
    avatar: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    joinedDate: string;
    status: 'Active' | 'On Leave' | 'Inactive';
}

const StaffManagement: React.FC = () => {
    const [viewType, setViewType] = useState<'list' | 'grid'>('list');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    // Mock Data
    const staffData: StaffMember[] = [
        { id: '1', name: 'Dr. Sarah Johnson', role: 'Cardiologist', department: 'Medical', email: 'sarah.j@clinic.com', phone: '555-0101', joinedDate: 'May 15, 2012', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: '2', name: 'Dr. Michael Chen', role: 'Neurologist', department: 'Medical', email: 'michael.c@clinic.com', phone: '555-0102', joinedDate: 'Jun 22, 2015', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: '3', name: 'Emma Rodriguez', role: 'Head Nurse', department: 'Nursing', email: 'emma.r@clinic.com', phone: '555-0103', joinedDate: 'Feb 10, 2018', status: 'On Leave', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: '4', name: 'Robert Davis', role: 'Lab Technician', department: 'Laboratory', email: 'robert.d@clinic.com', phone: '555-0104', joinedDate: 'Nov 5, 2019', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'On Leave': return 'bg-orange-100 text-orange-700';
            case 'Inactive': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100';
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            {/* Top Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
                    <p className="text-gray-500 text-sm">Manage clinic staff, roles, and permissions</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
                        <Plus className="w-4 h-4" /> Add New Staff
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
                        More Options <ChevronRight className="w-4 h-4 rotate-90" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`flex items-center gap-2 px-6 py-1.5 rounded-md text-sm font-medium transition-all ${viewType === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                                >
                                    <List className="w-4 h-4" /> List View
                                </button>
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`flex items-center gap-2 px-6 py-1.5 rounded-md text-sm font-medium transition-all ${viewType === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" /> Grid View
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="Search staff..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-black outline-none" />
                                </div>
                                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <Filter className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* View Implementation */}
                        {viewType === 'list' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500 font-medium">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4">Department</th>
                                            <th className="px-6 py-4">Contact</th>
                                            <th className="px-6 py-4">Joined</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {staffData.map((staff) => (
                                            <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 flex items-center gap-3">
                                                    <img src={staff.avatar} className="w-8 h-8 rounded-full border border-gray-200" alt="" />
                                                    <span className="font-bold text-gray-900">{staff.name}</span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{staff.role}</td>
                                                <td className="px-6 py-4 text-gray-600">{staff.department}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-500 text-xs">{staff.email}</div>
                                                    <div className="text-gray-400 text-xs">{staff.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{staff.joinedDate}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusColor(staff.status)}`}>
                                                        {staff.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 relative">
                                                    <button
                                                        onClick={() => setActiveMenu(activeMenu === staff.id ? null : staff.id)}
                                                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                                    >
                                                        <MoreVertical className="w-4 h-4 text-gray-400" />
                                                    </button>

                                                    {/* Action Menu (Floating) */}
                                                    {activeMenu === staff.id && (
                                                        <div className="absolute right-12 top-0 w-48 bg-white border border-gray-200 shadow-xl rounded-lg z-50 p-1">
                                                            <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase">Actions</p>
                                                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                                                                <Eye className="w-4 h-4" /> View Profile
                                                            </button>
                                                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                                                                <Pencil className="w-4 h-4" /> Edit
                                                            </button>
                                                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                                                                <Calendar className="w-4 h-4" /> Schedule
                                                            </button>
                                                            <div className="border-t border-gray-100 my-1"></div>
                                                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                                                                <UserMinus className="w-4 h-4" /> Deactivate
                                                            </button>
                                                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                                                                <Trash2 className="w-4 h-4" /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-gray-50/50">
                                {staffData.map((member) => (
                                    <div key={member.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                                        {/* Card Header */}
                                        <div className="p-5 flex justify-between items-start">
                                            <div className="flex gap-3">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                                                />
                                                <div>
                                                    <h3 className="font-bold text-gray-900 leading-tight">{member.name}</h3>
                                                    <p className="text-xs text-gray-500 font-medium">{member.role}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(member.status)}`}>
                                                {member.status}
                                            </span>
                                        </div>

                                        {/* Info Section */}
                                        <div className="px-5 pb-5 space-y-2.5 flex-grow">
                                            <div className="flex items-center gap-3 text-gray-500">
                                                <Building2 size={14} className="shrink-0" />
                                                <span className="text-xs font-medium">{member.department}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-500">
                                                <Mail size={14} className="shrink-0" />
                                                <span className="text-xs font-medium truncate">{member.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-500">
                                                <Phone size={14} className="shrink-0" />
                                                <span className="text-xs font-medium">{member.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-500">
                                                <Calendar size={14} className="shrink-0" />
                                                <span className="text-xs font-medium italic">Joined {member.joinedDate}</span>
                                            </div>
                                        </div>

                                        {/* Action Footer */}
                                        <div className="grid grid-cols-3 border-t border-gray-100">
                                            <button className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-100">
                                                <Eye size={14} /> View
                                            </button>
                                            <button className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-100">
                                                <Pencil size={14} /> Edit
                                            </button>
                                            <button className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                                <CalendarDays size={14} /> Schedule
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Footer */}
                        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                            <p>Showing 1-8 of 63 staff members</p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">Previous</button>
                                <button className="px-3 py-1.5 bg-black text-white rounded-md">Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Widgets */}
                <div className="space-y-6">
                    {/* Staff Overview Widget */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900">Staff Overview</h3>
                            <Users className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="mb-4">
                            <p className="text-3xl font-bold">63</p>
                            <p className="text-xs text-gray-400">Total Staff</p>
                        </div>
                        <div className="space-y-2">
                            {[{ l: 'Active', c: '52', p: '83%' }, { l: 'On Leave', c: '8', p: '13%' }, { l: 'Inactive', c: '3', p: '4%' }].map(i => (
                                <div key={i.l} className="flex justify-between text-xs py-1">
                                    <span className="text-gray-500">{i.l}</span>
                                    <span className="font-bold text-gray-900">{i.c} <span className="text-gray-300 ml-1">{i.p}</span></span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Departments Widget */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Departments</h3>
                        <div className="space-y-3">
                            {[{ n: 'Medical', c: 12, cl: 'bg-blue-500' }, { n: 'Nursing', c: 18, cl: 'bg-green-500' }, { n: 'Administration', c: 8, cl: 'bg-purple-500' }].map(d => (
                                <div key={d.n} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${d.cl}`}></div>
                                        <span className="text-xs text-gray-600">{d.n}</span>
                                    </div>
                                    <span className="text-xs font-bold">{d.c}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center justify-center gap-2">
                            <Settings className="w-3 h-3" /> Manage Departments
                        </button>
                    </div>

                    {/* Quick Actions Widget */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            {[
                                { l: 'Add New Staff', i: <Plus /> },
                                { l: 'Manage Roles', i: <ShieldCheck /> },
                                { l: 'Attendance', i: <Calendar /> },
                                { l: 'Export Staff List', i: <Download /> }
                            ].map(a => (
                                <button key={a.l} className="w-full flex items-center justify-between p-2.5 border border-gray-100 rounded-lg text-xs hover:bg-gray-50 text-gray-700 font-medium">
                                    <span className="flex items-center gap-3">
                                        {/* Fix: Wrap the icon in a span to control sizing or cast the element */}
                                        <span className="text-gray-400">
                                            {React.cloneElement(a.i as React.ReactElement<any>, {
                                                size: 16, // Lucide icons use 'size' instead of 'className' for dimensions in some TS configs
                                                strokeWidth: 2
                                            })}
                                        </span>
                                        {a.l}
                                    </span>
                                    <ChevronRight className="w-3 h-3 text-gray-300" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for one of the missing icons in the quick actions loop
const ShieldCheck = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);

export default StaffManagement;