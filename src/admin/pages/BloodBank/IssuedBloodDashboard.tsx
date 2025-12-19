/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AlertTriangle, Building2,
    Calendar,
    ChevronDown,
    Download,
    Droplet,
    Eye,
    HospitalIcon,
    MoreHorizontal,
    Printer, RefreshCcw, RotateCcw,
    Search
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

// --- Mock Data ---
const SUMMARY_STATS = [
    { title: "Total Units Issued", value: "1,284", trend: "+12% vs last month", icon: <Droplet className="text-red-500" size={20} /> },
    { title: "Emergency Issues", value: "142", trend: "High Priority", icon: <AlertTriangle className="text-amber-500" size={20} /> },
    { title: "Hospital Recipients", value: "89", trend: "Active Facilities", icon: <HospitalIcon size={20} className="text-blue-500" /> },
    { title: "External Requests", value: "24", trend: "Processed", icon: <Building2 size={20} className="text-purple-500" /> },
];

const ISSUE_DATA = [
    { id: 'IS-9021', recipient: 'Jane Doe', type: 'Hospital Patient', bloodType: 'O-', units: 2, date: '2025-12-17', status: 'Emergency', location: 'ICU - Ward A' },
    { id: 'IS-9022', recipient: 'City General', type: 'External', bloodType: 'A+', units: 10, date: '2025-12-16', status: 'Routine', location: 'Main Entrance' },
    { id: 'IS-9023', recipient: 'Michael Chen', type: 'Hospital Patient', bloodType: 'B+', units: 1, date: '2025-12-15', status: 'Routine', location: 'Surgery' },
];

const typeDistribution = [
    { name: 'O-', value: 45 }, { name: 'O+', value: 32 },
    { name: 'A+', value: 28 }, { name: 'A-', value: 15 },
    { name: 'B+', value: 20 }, { name: 'AB+', value: 10 },
];

const issuanceTrend = [
    { month: 'Jul', units: 120 }, { month: 'Aug', units: 150 },
    { month: 'Sep', units: 140 }, { month: 'Oct', units: 180 },
    { month: 'Nov', units: 210 }, { month: 'Dec', units: 195 },
];

const IssuedBloodDashboard = () => {
    const [activeTab, setActiveTab] = useState('All Issues');
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // --- Filter Logic ---
    const filteredData = useMemo(() => {
        return ISSUE_DATA.filter(item => {
            const matchesTab =
                activeTab === 'All Issues' ||
                (activeTab === 'Emergency' && item.status === 'Emergency') ||
                (activeTab === 'Hospital' && item.type === 'Hospital Patient') ||
                (activeTab === 'External' && item.type === 'External');

            const matchesSearch = item.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.id.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Issued Blood Dashboard</h1>
                    <p className="text-sm text-gray-500">Monitor and track all blood unit distributions</p>
                </div>
                <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                    + Issue New Blood
                </button>
            </header>

            {/* SECTION 1: Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {SUMMARY_STATS.map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-xs font-bold text-gray-900">{stat.title}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{stat.trend}</p>
                    </div>
                ))}
            </div>

            {/* SECTION 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-80 flex flex-col">
                    <h3 className="text-sm font-bold mb-6">Issuance by Blood Type</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={typeDistribution}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-80 flex flex-col">
                    <h3 className="text-sm font-bold mb-6">Monthly Issuance Trend</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={issuanceTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="units" stroke="#000" strokeWidth={3} dot={{ r: 4, fill: '#000' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <IssuedBloodFilters />

            {/* TABS & TABLE SECTION */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Table Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                        {['All Issues', 'Emergency', 'Hospital', 'External'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search recipient or ID..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 outline-none focus:ring-1 focus:ring-black"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                            <Download size={16} /> Export
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-bold tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Recipient</th>
                                <th className="px-6 py-4">Blood Info</th>
                                <th className="px-6 py-4">Date & Location</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{item.recipient}</div>
                                        <div className="text-[10px] text-gray-400 font-medium uppercase">{item.id} • {item.type}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 border border-red-100 bg-red-50 text-red-600 rounded text-[10px] font-bold">{item.bloodType}</span>
                                            <span className="font-medium text-gray-600">{item.units} Units</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-700 font-medium">{item.date}</div>
                                        <div className="text-xs text-gray-400">{item.location}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${item.status === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                        >
                                            <MoreHorizontal size={20} className="text-gray-400" />
                                        </button>

                                        {/* ACTION MENU DROPDOWN */}
                                        {openMenuId === item.id && (
                                            <div className="absolute right-6 top-12 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-10 py-2 animate-in fade-in slide-in-from-top-2">
                                                <MenuOption icon={<Eye size={14} />} label="View Details" />
                                                <MenuOption icon={<Printer size={14} />} label="Print Receipt" />
                                                <div className="my-1 border-t border-gray-100"></div>
                                                <MenuOption icon={<RotateCcw size={14} />} label="Reverse Issue" variant="danger" />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---
const MenuOption = ({ icon, label, variant = 'default' }: any) => (
    <button className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-bold transition-colors ${variant === 'danger' ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-50'
        }`}>
        {icon} {label}
    </button>
);


const IssuedBloodFilters = () => {
    const [filters, setFilters] = useState({
        bloodGroup: 'All Groups',
        department: 'All Departments',
        timeframe: 'Last 30 Days'
    });

    return (
        <div className="w-full space-y-4 mb-8">
            {/* Search + Filters Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">

                {/* Search Input */}
                <div className="relative lg:col-span-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black shadow-sm"
                        placeholder="Search by Patient Name, Unit ID, or Hospital..."
                    />
                </div>

                {/* Filters */}
                <div className="lg:col-span-6 flex flex-wrap gap-3">
                    <FilterDropdown
                        label="Blood Group"
                        value={filters.bloodGroup}
                        options={['All Groups', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']}
                    />

                    <FilterDropdown
                        label="Department"
                        value={filters.department}
                        options={['All Departments', 'ICU', 'Emergency', 'Surgery', 'Maternity', 'External']}
                    />

                    {/* Timeframe */}
                    <button className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 shadow-sm min-w-[140px]">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span>{filters.timeframe}</span>
                        </div>
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 flex gap-3 justify-start lg:justify-end">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
                        <RefreshCcw size={16} />
                        Refresh
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Active Filters */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Active Filters:
                </span>

                {filters.bloodGroup !== 'All Groups' && (
                    <FilterTag label={filters.bloodGroup} />
                )}

                <FilterTag label={filters.timeframe} />
            </div>
        </div>

    );
};

// --- Sub-components for cleaner code ---

const FilterDropdown = ({ label, value, options }: { label: string, value: string, options: string[] }) => (
    <div className="relative group">
        <button className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm min-w-[130px]">
            <span className="text-gray-400 font-normal mr-1">{label}:</span>
            <span className="text-gray-900">{value}</span>
            <ChevronDown size={14} className="text-gray-400 transition-transform group-hover:rotate-180" />
        </button>

        {/* Simple CSS-based hover dropdown or use a state-based popover */}
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 hidden group-hover:block animate-in fade-in zoom-in-95 duration-100">
            {options.map((opt) => (
                <button key={opt} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

const FilterTag = ({ label }: { label: string }) => (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg">
        <span className="text-[10px] font-bold text-gray-600">{label}</span>
        <button className="text-gray-400 hover:text-red-500">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
    </div>
);

export default IssuedBloodDashboard;
