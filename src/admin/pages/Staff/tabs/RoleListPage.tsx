import React, { useState, useMemo } from 'react';
import {
    Search, ListFilter, Plus, Download, MoreHorizontal,
    Eye, Pencil, Users, Copy, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Types ---
type Category = 'All Roles' | 'Medical' | 'Administrative' | 'Custom';

interface Role {
    id: string;
    name: string;
    isDefault: boolean;
    category: Exclude<Category, 'All Roles'>;
    description: string;
    users: number;
    lastUpdated: string;
    updatedBy: string;
}

const MOCK_ROLES: Role[] = [
    { id: '1', name: 'Administrator', isDefault: true, category: 'Administrative', description: 'Full system access with all permissions', users: 3, lastUpdated: '2023-11-15', updatedBy: 'System Admin' },
    { id: '2', name: 'Doctor', isDefault: true, category: 'Medical', description: 'Access to patient records, appointments, and prescriptions', users: 12, lastUpdated: '2023-10-22', updatedBy: 'System Admin' },
    { id: '3', name: 'Senior Doctor', isDefault: false, category: 'Custom', description: 'Extended permissions for senior medical staff', users: 3, lastUpdated: '2023-11-10', updatedBy: 'Dr. Sarah Johnson' },
    // Add more items here...
];

const RoleListPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Category>('All Roles');
    const [searchQuery, setSearchQuery] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const tabs: Category[] = ['All Roles', 'Medical', 'Administrative', 'Custom'];

    // --- Logic ---
    const filteredRoles = useMemo(() => {
        return MOCK_ROLES.filter((role) => {
            const matchesTab = activeTab === 'All Roles' || role.category === activeTab;
            const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                role.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-900">
            {/* --- Top Header --- */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search roles..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                        <ListFilter className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                        <Plus className="w-4 h-4" /> Add Role
                    </button>
                    <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            {/* --- Tabs --- */}
            <div className="flex gap-1 bg-gray-200/50 p-1 rounded-xl w-fit mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* --- Table --- */}
            <div className="bg-white border border-gray-200 rounded-xl h-full">
                <table className="w-full text-left border-collapse h-full">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-sm">
                            <th className="px-6 py-4 font-medium">Role Name</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium">Users</th>
                            <th className="px-6 py-4 font-medium">Last Updated</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredRoles.map((role) => (
                            <tr key={role.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-800">{role.name}</span>
                                        {role.isDefault && (
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase font-bold">Default</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{role.category}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{role.description}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{role.users}</td>
                                <td className="px-6 py-4 text-xs text-gray-500">
                                    <div className="font-medium text-gray-700">{role.lastUpdated}</div>
                                    <div>by {role.updatedBy}</div>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === role.id ? null : role.id)}
                                        className="p-1 hover:bg-gray-200 rounded-md transition"
                                    >
                                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                    </button>

                                    {/* --- Action Menu Dropdown --- */}
                                    {openMenuId === role.id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                                            <div className="absolute right-6 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-20 py-1 text-sm text-left">
                                                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">Actions</div>
                                                <button onClick={() => navigate("/admin/view-roles")} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"><Eye className="w-4 h-4" /> View Details</button>
                                                <button onClick={() => navigate("/admin/edit-roles")} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"><Pencil className="w-4 h-4" /> Edit Role</button>
                                                <button onClick={() => navigate("/admin/view-user")} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"><Users className="w-4 h-4" /> View Users</button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 border-b border-gray-100"><Copy className="w-4 h-4" /> Clone Role</button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /> Delete Role</button>
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

export default RoleListPage;