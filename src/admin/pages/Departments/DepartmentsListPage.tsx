import {
    Building2,
    Edit3,
    Eye,
    MapPin,
    MoreHorizontal,
    Plus,
    Search,
    Stethoscope,
    Trash2,
    Users
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Types ---

type DeptStatus = 'Active' | 'Inactive';

interface Department {
    id: string;
    name: string;
    head: string;
    staffCount: number;
    location: string;
    status: DeptStatus;
    email: string;
}

// --- Mock Data ---

const MOCK_DEPARTMENTS: Department[] = [
    { id: 'DEPT-001', name: 'Cardiology', head: 'Dr. Sarah Johnson', staffCount: 12, location: 'Building A, Floor 3', status: 'Active', email: 'cardiology@clinic.com' },
    { id: 'DEPT-002', name: 'Neurology', head: 'Dr. Michael Chen', staffCount: 8, location: 'Building B, Floor 2', status: 'Active', email: 'neuro@clinic.com' },
    { id: 'DEPT-003', name: 'Pediatrics', head: 'Dr. Emily Rodriguez', staffCount: 15, location: 'Building A, Floor 1', status: 'Active', email: 'peds@clinic.com' },
    { id: 'DEPT-004', name: 'Radiology', head: 'Dr. James Wilson', staffCount: 6, location: 'Building C, Basement', status: 'Inactive', email: 'radio@clinic.com' },
    { id: 'DEPT-005', name: 'Orthopedics', head: 'Dr. Robert Taylor', staffCount: 10, location: 'Building A, Floor 4', status: 'Active', email: 'ortho@clinic.com' },
];

export const DepartmentsListPage = () => {
    const [activeTab, setActiveTab] = useState<'All' | DeptStatus>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Filtering Logic
    const filteredDepts = useMemo(() => {
        return MOCK_DEPARTMENTS.filter(dept => {
            const matchesTab = activeTab === 'All' || dept.status === activeTab;
            const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dept.head.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-slate-900 font-sans">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Departments</h1>
                    <p className="text-sm text-slate-500 font-medium">Manage clinic departments, staff assignments, and locations.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                    <Plus size={18} />
                    Add Department
                </button>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Departments" value="12" icon={<Building2 className="text-blue-600" />} color="bg-blue-50" />
                <StatCard title="Active Staff" value="84" icon={<Users className="text-emerald-600" />} color="bg-emerald-50" />
                <StatCard title="Available Services" value="36" icon={<Stethoscope className="text-purple-600" />} color="bg-purple-50" />
            </div>

            {/* FILTER TABS & SEARCH */}
            <div className="bg-white rounded-t-2xl border-x border-t p-5 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex gap-6 border-b lg:border-none">
                        {['All', 'Active', 'Inactive'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-3 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab} Departments
                                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-full" />}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or head..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* DEPARTMENTS TABLE */}
            <div className="bg-white border rounded-b-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b">
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Head of Dept.</th>
                            <th className="px-6 py-4">Staff</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                        {filteredDepts.map((dept) => (
                            <tr key={dept.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">{dept.name}</div>
                                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{dept.id}</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-700">{dept.head}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                                        <Users size={14} className="text-slate-400" />
                                        {dept.staffCount} Members
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                        <MapPin size={14} className="text-slate-400" />
                                        {dept.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${dept.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                        {dept.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === dept.id ? null : dept.id)}
                                        className="p-1.5 hover:bg-gray-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>

                                    {/* ACTION MENU DROPDOWN */}
                                    {openMenuId === dept.id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                                            <div className="absolute right-6 top-12 w-44 bg-white border rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-100">
                                                <MenuAction icon={<Eye size={14} />} label="View Details" />
                                                <MenuAction icon={<Edit3 size={14} />} label="Edit Department" />
                                                <MenuAction icon={<Users size={14} />} label="Manage Staff" />
                                                <div className="h-px bg-gray-100 my-1" />
                                                <MenuAction icon={<Trash2 size={14} />} label="Delete" variant="danger" />
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredDepts.length === 0 && (
                    <div className="py-20 text-center text-slate-400 font-medium">
                        No departments found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Helper Components ---

const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-3xl font-black text-slate-900">{value}</p>
        </div>
        <div className={`p-4 ${color} rounded-2xl`}>
            {React.cloneElement(icon, { size: 28 })}
        </div>
    </div>
);

const MenuAction = ({
    icon,
    label,
    variant = "default",
}: any) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (label === "View Details") {
            navigate("/admin/departments-view");
        } else if (label === "Edit Department") {
            navigate("/admin/edit-department");
        } else if (label === "Manage Staff") {
            navigate("/admin/department-staff");
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-bold transition-colors rounded-lg
        ${variant === "danger"
                    ? "text-red-500 hover:bg-red-50"
                    : "text-slate-600 hover:bg-gray-50"
                }
      `}
        >
            {icon}
            {label}
        </button>
    );
};