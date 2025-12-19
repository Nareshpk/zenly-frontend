import React, { useState, useMemo } from 'react';
import {
    Stethoscope,
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Clock,
    DollarSign,
    ChevronDown,
    Edit3,
    Trash2,
    EyeOff,
    CheckCircle2,
    Download,
    Activity,
    Star
} from 'lucide-react';

// --- Types ---
type ServiceCategory = 'Consultation' | 'Diagnostics' | 'Treatment' | 'Surgery';

interface MedicalService {
    id: string;
    name: string;
    category: ServiceCategory;
    department: string;
    duration: string;
    price: number;
    status: 'Active' | 'Paused';
}

// --- Mock Data ---
const MOCK_SERVICES: MedicalService[] = [
    { id: 'SRV-101', name: 'General Consultation', category: 'Consultation', department: 'General Medicine', duration: '30 min', price: 150, status: 'Active' },
    { id: 'SRV-204', name: 'Cardiac Stress Test', category: 'Diagnostics', department: 'Cardiology', duration: '60 min', price: 450, status: 'Active' },
    { id: 'SRV-309', name: 'Physical Therapy Session', category: 'Treatment', department: 'Orthopedics', duration: '45 min', price: 120, status: 'Active' },
    { id: 'SRV-402', name: 'Laparoscopic Appendectomy', category: 'Surgery', department: 'General Surgery', duration: '120 min', price: 2500, status: 'Paused' },
    { id: 'SRV-105', name: 'Neurological Assessment', category: 'Consultation', department: 'Neurology', duration: '45 min', price: 200, status: 'Active' },
];

export const ServicesOfferedPage = () => {
    const [activeTab, setActiveTab] = useState<'All' | ServiceCategory>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Filtering Logic
    const filteredServices = useMemo(() => {
        return MOCK_SERVICES.filter(service => {
            const matchesTab = activeTab === 'All' || service.category === activeTab;
            const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.department.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-slate-900 font-sans">


            {/* 1. HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-lg">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Services Offered</h1>
                        <p className="text-sm text-slate-500 font-medium">Define and manage clinical treatments and procedures.</p>
                    </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                    <Plus size={18} />
                    Add New Service
                </button>
            </div>

            {/* METRIC CARDS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                {/* Total Services Card */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-bold text-slate-900">Total Services</h3>
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">86</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
                            Across 12 departments
                        </span>
                    </div>
                    {/* Decorative progress line as seen in design */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100">
                        <div className="h-full bg-slate-900 w-full"></div>
                    </div>
                </div>

                {/* Most Popular Card */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-bold text-slate-900">Most Popular</h3>
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                            <Star size={20} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-900 truncate">General Checkup</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
                            248 appointments this month
                        </span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100">
                        <div className="h-full bg-blue-500 w-3/4"></div>
                    </div>
                </div>

                {/* Average Duration Card */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-bold text-slate-900">Average Duration</h3>
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">45 min</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
                            Across all services
                        </span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100">
                        <div className="h-full bg-amber-400 w-1/2"></div>
                    </div>
                </div>

                {/* Monthly Revenue Card */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-bold text-slate-900">Monthly Revenue</h3>
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">$128,450</span>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase mt-1 tracking-wider">
                            +12% from last month
                        </span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100">
                        <div className="h-full bg-emerald-500 w-2/3"></div>
                    </div>
                </div>

            </div>

            {/* 2. SEARCH & GLOBAL FILTER BAR */}
            <div className="bg-white p-2 rounded-2xl border shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by service name or department..."
                        className="w-full pl-12 pr-4 py-3 bg-transparent text-sm font-medium focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto px-2 border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                        <Filter size={18} />
                        Filters
                        <ChevronDown size={14} className="text-slate-400" />
                    </button>
                    <button className="p-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                        <Download size={20} />
                    </button>
                </div>
            </div>

            {/* 3. CATEGORY TABS */}
            <div className="flex gap-1 bg-gray-200/50 p-1 rounded-xl w-fit mb-6 overflow-x-auto no-scrollbar">
                {['All', 'Consultation', 'Diagnostics', 'Treatment', 'Surgery'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 4. SERVICES TABLE */}
            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b">
                            <th className="px-6 py-4">Service Details</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Base Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                        {filteredServices.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">{service.name}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{service.category}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 font-medium text-slate-600">
                                        <Stethoscope size={14} className="text-slate-400" />
                                        {service.department}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                        <Clock size={14} />
                                        {service.duration}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-0.5 font-black text-slate-900">
                                        <DollarSign size={14} />
                                        {service.price.toLocaleString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${service.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-100 text-gray-500 border-gray-200'
                                        }`}>
                                        {service.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === service.id ? null : service.id)}
                                        className="p-2 hover:bg-gray-100 rounded-lg text-slate-400 transition-colors"
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>

                                    {/* ACTION MENU DROPDOWN */}
                                    {openMenuId === service.id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                                            <div className="absolute right-6 top-12 w-48 bg-white border rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-100">
                                                <MenuAction icon={<Edit3 size={14} />} label="Edit Service" />
                                                <MenuAction icon={<DollarSign size={14} />} label="Adjust Pricing" />
                                                <MenuAction icon={service.status === 'Active' ? <EyeOff size={14} /> : <CheckCircle2 size={14} />}
                                                    label={service.status === 'Active' ? "Pause Service" : "Activate"} />
                                                <div className="h-px bg-gray-100 my-1" />
                                                <MenuAction icon={<Trash2 size={14} />} label="Delete Service" variant="danger" />
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredServices.length === 0 && (
                    <div className="py-20 text-center text-slate-400 font-medium">
                        No medical services found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Helper Components ---

const MenuAction = ({ icon, label, variant = 'default' }: any) => (
    <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${variant === 'danger' ? 'text-red-500 hover:bg-red-50' : 'text-slate-600 hover:bg-gray-50'
        }`}>
        {icon}
        {label}
    </button>
);