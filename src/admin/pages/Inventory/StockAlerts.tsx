/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    ChevronDown,
    Download,
    Eye,
    MoreHorizontal,
    RotateCcw,
    Search,
    Settings,
    ShoppingCart,
    XCircle
} from 'lucide-react';
import React, { useState } from 'react';
import { DismissAlertDialog } from './DismissAlertDialog';

const StockAlerts: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Low Stock');
    const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
    const [isDismissOpen, setIsDismissOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState({
        name: '',
        alertType: ''
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-900">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Stock Alerts</h1>
                        <p className="text-sm text-gray-400">Monitor and manage inventory alerts</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                        <Download size={16} /> Export
                    </button>
                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </div>

            {/* Metric Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard title="Low Stock Items" value="7" subtitle="+8 since last week" icon={<AlertCircle className="text-amber-500" size={20} />} />
                <MetricCard title="Out of Stock Items" value="5" subtitle="+3 since last week" icon={<XCircle className="text-red-500" size={20} />} />
                <MetricCard title="Expiring Soon" value="6" subtitle="Within next 30 days" icon={<Calendar className="text-gray-400" size={20} />} />
                <MetricCard title="Pending Orders" value="7" subtitle="View orders" icon={<ShoppingCart className="text-gray-400" size={20} />} />
            </div>

            {/* Search and Filters Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search alerts..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 shadow-sm"
                    />
                </div>

                <FilterDropdown label="All Alerts" />
                <FilterDropdown label="All Categories" />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 mb-8 bg-gray-200/50 w-fit p-1 rounded-lg border border-gray-200">
                {['Low Stock', 'Out of Stock', 'Expiring Soon', 'All Alerts'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === tab
                            ? 'bg-white shadow-sm text-zinc-900 border border-gray-100'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Results Table Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-visible">
                <div className="p-8">
                    <h2 className="text-xl font-bold mb-1">Low Stock Items</h2>
                    <p className="text-sm text-gray-400 mb-8 font-medium">Items that have fallen below their minimum stock level</p>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                <th className="py-4 px-2">Item ID</th>
                                <th className="py-4 px-2">Name</th>
                                <th className="py-4 px-2">Category</th>
                                <th className="py-4 px-2">Current Stock</th>
                                <th className="py-4 px-2">Min. Level</th>
                                <th className="py-4 px-2">Status</th>
                                <th className="py-4 px-2">Supplier</th>
                                <th className="py-4 px-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {[
                                { id: 'INV002', name: 'Ibuprofen 200mg', cat: 'Medications', stock: 12, min: 15, status: 'Low Stock', supplier: 'PharmaTech Inc.' },
                                { id: 'INV005', name: 'Amoxicillin 500mg', cat: 'Medications', stock: 8, min: 10, status: 'Low Stock', supplier: 'MedPlus Supplies' },
                                { id: 'INV007', name: 'Examination Table Paper', cat: 'Medical Supplies', stock: 3, min: 5, status: 'Low Stock', supplier: 'Health Supply Co.' },
                            ].map((row, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-2 font-bold text-zinc-600">{row.id}</td>
                                    <td className="py-4 px-2 font-bold text-zinc-900">{row.name}</td>
                                    <td className="py-4 px-2 text-zinc-500">{row.cat}</td>
                                    <td className="py-4 px-2 font-bold text-zinc-800">{row.stock}</td>
                                    <td className="py-4 px-2 text-zinc-500">{row.min}</td>
                                    <td className="py-4 px-2">
                                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-zinc-500">{row.supplier}</td>
                                    <td className="py-4 px-2 text-right relative">
                                        <button
                                            onClick={() => setOpenActionMenu(openActionMenu === idx ? null : idx)}
                                            className="p-1 hover:bg-gray-200 rounded-md transition-colors text-gray-400"
                                        >
                                            <MoreHorizontal size={18} />
                                        </button>
                                        {openActionMenu === idx && <ActionMenu onClose={() => setOpenActionMenu(null)} setIsDismissOpen={setIsDismissOpen} />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DismissAlertDialog
                isOpen={isDismissOpen}
                onClose={() => setIsDismissOpen(false)}
                itemName={selectedItem.name}
                alertType={selectedItem.alertType}
            />
        </div>
    );
};

// --- HELPER COMPONENTS ---

const MetricCard = ({ title, value, subtitle, icon }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
        <div className="absolute top-6 right-6">{icon}</div>
        <h3 className="text-sm font-bold text-zinc-800 mb-6">{title}</h3>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
    </div>
);

const FilterDropdown = ({ label }: { label: string }) => (
    <button className="flex items-center gap-8 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-gray-50 transition-colors shadow-sm">
        {label}
        <ChevronDown size={16} className="text-gray-400" />
    </button>
);

const ActionMenu = ({ onClose, setIsDismissOpen }: { onClose: () => void, setIsDismissOpen: any }) => (
    <>
        <div className="fixed inset-0 z-10" onClick={onClose} />
        <div className="absolute right-0 top-10 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">Actions</div>
            <ActionItem icon={<Eye size={16} />} label="View details" setIsDismissOpen={setIsDismissOpen} />
            <ActionItem icon={<RotateCcw size={16} />} label="Update stock" setIsDismissOpen={setIsDismissOpen} />
            <ActionItem icon={<ShoppingCart size={16} />} label="Place order" setIsDismissOpen={setIsDismissOpen} />
            <ActionItem icon={<XCircle size={16} />} label="Dismiss alert" isDanger setIsDismissOpen={setIsDismissOpen} />
        </div>
    </>
);

const ActionItem = ({ icon, label, isDanger = false, setIsDismissOpen }: any) => {
    const handleOpen = () => {
        if (label === "Dismiss alert") {
            setIsDismissOpen(true)
        }
    }
    return (
        <button onClick={handleOpen} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${isDanger ? 'text-red-600 hover:bg-red-50' : 'text-zinc-700 hover:bg-gray-50'}`}>
            {icon}
            {label}
        </button>
    )
};

export default StockAlerts;