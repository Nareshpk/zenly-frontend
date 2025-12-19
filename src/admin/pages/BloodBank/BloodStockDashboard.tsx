import {
    AlertCircle,
    Calendar,
    Download,
    Filter,
    MoreVertical,
    Plus,
    RefreshCw,
    Search
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Types ---
interface BloodUnit {
    id: string;
    type: string;
    units: number;
    collectionDate: string;
    expiryDate: string;
    status: 'Available' | 'Reserved' | 'Expiring Soon';
    location: string;
    donor: string;
}

const BloodStockDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Blood Stock</h1>
                <p className="text-sm text-gray-500">Manage and monitor blood inventory in the blood bank</p>
            </header>

            {/* 1. Metric Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <MetricCard title="Total Blood Units" value="50" subtext="Units available across all types" icon={<Plus className="text-red-500" size={20} />} />
                <DistributionCard />
                <MetricCard title="Expiring Soon" value="10" subtext="Units expiring within the next 7 days" icon={<AlertCircle className="text-orange-500" size={20} />} />
                <MetricCard title="Critical Levels" value="2" subtext="Blood types with critically low inventory" icon={<AlertCircle className="text-red-600" size={20} />} />
            </div>

            {/* 2. Blood Type Availability (Progress Bars) */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2 className="text-lg font-bold mb-1">Blood Type Availability</h2>
                <p className="text-sm text-gray-500 mb-6">Current inventory levels for each blood type</p>

                <div className="space-y-4">
                    <ProgressBar label="A+" value={12} max={15} color="bg-emerald-500" />
                    <ProgressBar label="A-" value={4} max={15} color="bg-orange-400" />
                    <ProgressBar label="B+" value={8} max={15} color="bg-emerald-500" />
                    <ProgressBar label="B-" value={2} max={15} color="bg-red-500" />
                    <ProgressBar label="AB+" value={3} max={15} color="bg-orange-400" />
                    <ProgressBar label="AB-" value={1} max={15} color="bg-red-500" />
                    <ProgressBar label="O+" value={15} max={15} color="bg-emerald-500" />
                    <ProgressBar label="O-" value={5} max={15} color="bg-emerald-500" />
                </div>
            </section>

            {/* 3. Table Section */}
            <InventoryTable />
        </div>
    );
};

// --- Sub-Components ---

const MetricCard = ({ title, value, subtext, icon }: any) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
            <div className="p-1 rounded-md bg-gray-50">{icon}</div>
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <p className="text-xs text-gray-400">{subtext}</p>
    </div>
);

const DistributionCard = () => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Blood Type Distribution</h3>
            <Plus className="text-red-500" size={20} />
        </div>
        <div className="flex flex-wrap gap-2">
            {['A+: 12', 'A-: 4', 'B+: 8', 'B-: 2', 'AB+: 3', 'AB-: 1', 'O+: 15', 'O-: 5'].map((tag) => (
                <span key={tag} className={`text-[10px] px-2 py-0.5 rounded border font-medium ${tag.includes('B-') || tag.includes('AB-') ? 'bg-red-500 text-white border-red-500' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

const ProgressBar = ({ label, value, max, color }: any) => (
    <div className="flex items-center gap-4">
        <span className="w-8 text-sm font-bold text-gray-700">{label}</span>
        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${(value / max) * 100}%` }}></div>
        </div>
        <span className="w-12 text-right text-xs text-gray-500 font-medium">{value} units</span>
    </div>
);

const InventoryTable = () => {
    const data: BloodUnit[] = [
        { id: 'BS-001', type: 'A+', units: 12, collectionDate: '2023-04-15', expiryDate: '2023-05-15', status: 'Available', location: 'Refrigerator 1', donor: 'John Smith' },
        { id: 'BS-002', type: 'O-', units: 5, collectionDate: '2023-04-16', expiryDate: '2023-05-16', status: 'Reserved', location: 'Refrigerator 2', donor: 'Emily Johnson' },
        { id: 'BS-003', type: 'B+', units: 8, collectionDate: '2023-04-10', expiryDate: '2023-05-10', status: 'Expiring Soon', location: 'Refrigerator 1', donor: 'Michael Brown' },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table Toolbar */}
            <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" placeholder="Search blood units..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-red-100" />
                    </div>
                    <select className="border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white outline-none">
                        <option>All Types</option>
                    </select>
                    <select className="border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white outline-none">
                        <option>All Status</option>
                    </select>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Filter size={18} className="text-gray-500" /></button>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Calendar size={18} className="text-gray-500" /></button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 text-sm font-medium px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <RefreshCw size={16} /> Refresh
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Download size={16} /> Export
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        <Plus size={18} /> Add Blood Units
                    </button>
                </div>
            </div>

            {/* Table Tabs */}
            <div className="flex gap-6 px-6 pt-4 border-b border-gray-100 text-sm font-medium text-gray-500">
                <button className="pb-3 border-b-2 border-black text-black">All Units</button>
                <button className="pb-3 hover:text-gray-700">Available</button>
                <button className="pb-3 hover:text-gray-700">Reserved</button>
                <button className="pb-3 hover:text-gray-700">Expiring Soon</button>
            </div>

            {/* Main Table */}
            <div className="h-full">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-500 font-semibold border-b border-gray-100">
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Blood Type</th>
                            <th className="px-6 py-4">Units</th>
                            <th className="px-6 py-4">Collection Date</th>
                            <th className="px-6 py-4">Expiry Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Donor</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-blue-600">{row.id}</td>
                                <td className="px-6 py-4"><span className="px-2 py-0.5 border border-gray-300 rounded-full text-[11px] font-bold">{row.type}</span></td>
                                <td className="px-6 py-4">{row.units}</td>
                                <td className="px-6 py-4 text-gray-600">{row.collectionDate}</td>
                                <td className="px-6 py-4 text-gray-600">{row.expiryDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${row.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                                        row.status === 'Reserved' ? 'bg-gray-100 text-gray-600' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{row.location}</td>
                                <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">{row.donor}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600"> <ActionMenu /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BloodStockDashboard;

function ActionMenu() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative group">
            <button
                onClick={() => setOpen((v) => !v)}
                className="p-2 rounded hover:bg-gray-100"
            >
                <MoreVertical size={16} />
            </button>

            {open && (<div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">

                <button onClick={() => navigate("/admin/view/stock-details")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    View Details
                </button>
                <button onClick={() => navigate("/admin/update/stock")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Update Status
                </button>

                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Print Label</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">Discard Unit</button>
            </div>)}

        </div>
    );
}