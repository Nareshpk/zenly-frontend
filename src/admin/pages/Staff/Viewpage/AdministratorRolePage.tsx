import {
    ArrowLeft,
    Clock,
    Copy,
    Download,
    Edit3,
    Users
} from 'lucide-react';
import { useState } from 'react';
import AssignedUsersPage from '../tabs/AssignedUsersPage';
import ChangeHistoryPage from '../tabs/ChangeHistoryPage';

const AdministratorRolePage = () => {
    const [activeTab, setActiveTab] = useState('Detailed Permissions');

    return (
        <div className="min-h-screen bg-gray-50/50 p-8 font-sans">
            {/* Back Navigation */}
            <button className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-semibold">Administrator Role</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Role Details Card */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Role Details</h2>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition">
                                <Edit3 className="w-3.5 h-3.5" /> Edit Role
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition">
                                <Copy className="w-3.5 h-3.5" /> Clone
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6">
                        <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Category</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-700">Administrative</span>
                                <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">Default</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Users Assigned</p>
                            <button className="flex items-center gap-2 ml-auto text-sm font-bold text-gray-900 hover:underline">
                                3 <Users className="w-4 h-4 text-gray-400" /> View Users
                            </button>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Description</p>
                            <p className="text-sm text-gray-600">Full system access with all permissions</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Created By</p>
                            <p className="text-sm font-bold text-gray-800">System Admin</p>
                            <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" /> 2023-01-10
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Last Updated By</p>
                            <p className="text-sm font-bold text-gray-800">System Admin</p>
                            <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5 justify-end">
                                <Clock className="w-3 h-3" /> 2023-11-15
                            </p>
                        </div>
                    </div>
                </div>

                {/* Permission Summary Sidebar */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Permission Summary</h2>
                    <p className="text-xs text-gray-500 mb-6">Overview of permissions granted to this role</p>

                    <div className="space-y-4">
                        {['Dashboard', 'Patients', 'Appointments', 'Billing', 'Reports', 'Settings', 'Inventory', 'Staff'].map((item) => (
                            <div key={item} className="flex justify-between items-center">
                                <span className="text-xs font-semibold text-gray-600">{item}</span>
                                <div className="flex gap-1">
                                    {['View', 'Create', 'Edit', 'Delete'].map((action) => (
                                        <span key={action} className="bg-black text-white text-[8px] px-1.5 py-0.5 rounded font-bold uppercase">
                                            {action}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-6 border-b border-gray-200 mb-8">
                {['Detailed Permissions', 'Assigned Users', 'Change History'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                    </button>
                ))}
            </div>

            {/* Detailed Permission Matrix Section */}
            {activeTab === "Detailed Permissions" && (<div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Permission Matrix</h3>
                        <p className="text-xs text-gray-500">Detailed view of all permissions for this role</p>
                    </div>
                    <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 transition">
                        <Download className="w-4 h-4" /> Export Permissions
                    </button>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase">
                        <tr>
                            <th className="px-6 py-4 w-1/4">Module</th>
                            <th className="px-6 py-4 text-center">View</th>
                            <th className="px-6 py-4 text-center">Create</th>
                            <th className="px-6 py-4 text-center">Edit</th>
                            <th className="px-6 py-4 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {MODULE_DATA.map((row) => (
                            <tr key={row.name} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-5">
                                    <p className="text-sm font-bold text-gray-800">{row.name}</p>
                                    <p className="text-[11px] text-gray-400">{row.desc}</p>
                                </td>
                                <td className="px-6 py-5"><PermissionToggle active={row.view} /></td>
                                <td className="px-6 py-5"><PermissionToggle active={row.create} /></td>
                                <td className="px-6 py-5"><PermissionToggle active={row.edit} /></td>
                                <td className="px-6 py-5"><PermissionToggle active={row.delete} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>)}
            {activeTab === "Assigned Users" && (<AssignedUsersPage />)}
            {activeTab === "Change History" && (<ChangeHistoryPage />)}

        </div>
    );
};

// Helper Components
const PermissionToggle = ({ active }: { active: boolean }) => (
    <div className="flex justify-center">
        {active ? (
            <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-sm" />
            </div>
        ) : (
            <div className="w-5 h-5 border-2 border-gray-200 rounded" />
        )}
    </div>
);

const MODULE_DATA = [
    { name: 'Dashboard', desc: 'Access to system dashboard and analytics', view: true, create: false, edit: true, delete: false },
    { name: 'Patients', desc: 'Patient records and management', view: true, create: true, edit: true, delete: true },
    { name: 'Appointments', desc: 'Scheduling and appointment management', view: true, create: true, edit: true, delete: true },
    { name: 'Billing', desc: 'Invoices, payments, and financial records', view: true, create: true, edit: true, delete: true },
    { name: 'Reports', desc: 'Analytics and reporting tools', view: true, create: true, edit: true, delete: true },
    { name: 'Settings', desc: 'System configuration and settings', view: true, create: false, edit: true, delete: false },
    { name: 'Inventory', desc: 'Medical supplies and equipment', view: true, create: true, edit: true, delete: true },
    { name: 'Staff', desc: 'Staff management and scheduling', view: true, create: true, edit: true, delete: true },
];

export default AdministratorRolePage;