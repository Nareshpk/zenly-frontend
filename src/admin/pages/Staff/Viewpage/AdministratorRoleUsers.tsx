import React, { useState } from 'react';
import {
    ArrowLeft, Search, ListFilter, UserPlus,
    Download, MoreHorizontal, UserCircle,
    Mail, RefreshCcw, UserMinus
} from 'lucide-react';
import AssignUserDialog from '../Modal/AssignUserDialog';
import { useNavigate } from 'react-router-dom';

interface AssignedUser {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    department: string;
    position: string;
    assignedDate: string;
    status: 'Active' | 'Inactive';
}

const USERS_DATA: AssignedUser[] = [
    { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@clinic.com', department: 'Cardiology', position: 'Medical Director', assignedDate: '2023-01-15', status: 'Active' },
    { id: '2', name: 'Michael Chen', email: 'michael.chen@clinic.com', department: 'Administration', position: 'IT Manager', assignedDate: '2023-02-10', status: 'Active' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily.rodriguez@clinic.com', department: 'Administration', position: 'Clinic Manager', assignedDate: '2023-03-05', status: 'Active' },
    { id: '4', name: 'Dr. James Wilson', email: 'james.wilson@clinic.com', department: 'Neurology', position: 'Department Head', assignedDate: '2023-01-20', status: 'Active' },
    { id: '5', name: 'Lisa Thompson', email: 'lisa.thompson@clinic.com', department: 'Administration', position: 'Finance Director', assignedDate: '2023-02-15', status: 'Active' },
    { id: '6', name: 'Robert Garcia', email: 'robert.garcia@clinic.com', department: 'IT', position: 'Systems Administrator', assignedDate: '2023-03-10', status: 'Inactive' },
];

const AdministratorRoleUsers = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white p-8 font-sans">
            {/* Top Navigation */}
            <button className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition group">
                <div className="p-1 border border-gray-200 rounded group-hover:bg-gray-50">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                <div className="text-left">
                    <h1 className="text-lg font-bold text-gray-900 leading-none">Administrator Role - Users</h1>
                    <p className="text-[11px] text-gray-400 mt-1">Manage users assigned to this role</p>
                </div>
            </button>

            {/* Stats and Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Users with Administrator Role</h2>
                    <p className="text-sm text-gray-400">Total of 12 users assigned to this role</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 outline-none"
                        />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <ListFilter className="w-5 h-5 text-gray-600" />
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 transition shadow-sm">
                        <UserPlus className="w-4 h-4" /> Assign User
                    </button>
                    <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition shadow-sm">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                        <tr>
                            <th className="pb-4 pr-4">Name</th>
                            <th className="pb-4 px-4">Department</th>
                            <th className="pb-4 px-4">Position</th>
                            <th className="pb-4 px-4">Assigned Date</th>
                            <th className="pb-4 px-4">Status</th>
                            <th className="pb-4 pl-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {USERS_DATA.map((user) => (
                            <tr key={user.id} className="group hover:bg-gray-50/40 transition-colors">
                                <td className="py-5 pr-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100">
                                            {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="rounded-full" /> : user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900 leading-tight">{user.name}</div>
                                            <div className="text-[11px] text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-5 px-4 text-sm text-gray-600 font-medium">{user.department}</td>
                                <td className="py-5 px-4 text-sm text-gray-600 font-medium">{user.position}</td>
                                <td className="py-5 px-4 text-[13px] text-gray-500 font-mono tracking-tighter">{user.assignedDate}</td>
                                <td className="py-5 px-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${user.status === 'Active' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-5 pl-4 text-right relative">
                                    <button
                                        onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                                        className="p-1.5 hover:bg-gray-100 rounded-md transition"
                                    >
                                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                    </button>

                                    {/* Action Menu */}
                                    {activeMenu === user.id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                                            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 text-left animate-in fade-in zoom-in-95 duration-150">
                                                <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Actions</div>
                                                <button onClick={() => navigate("/admin/staff/profile")} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm font-bold text-gray-800 transition">
                                                    <UserCircle className="w-4 h-4 text-gray-400" /> View Profile
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm font-bold text-gray-800 transition">
                                                    <Mail className="w-4 h-4 text-gray-400" /> Send Email
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm font-bold text-gray-800 transition">
                                                    <RefreshCcw className="w-4 h-4 text-gray-400" /> Change Role
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-sm font-bold text-red-500 transition mt-1">
                                                    <UserMinus className="w-4 h-4" /> Remove from Role
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AssignUserDialog
                isOpen={isModalOpen}
                roleName="Administrator"
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default AdministratorRoleUsers;