import {
    Calendar,
    ChevronDown,
    Download,
    MoreVertical,
    RefreshCw,
    Search
} from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Types ---

type PaymentStatus = 'Completed' | 'Pending' | 'Failed' | 'Processing';
type PaymentMethod = 'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer' | 'Check' | 'Insurance';

interface Payment {
    id: string;
    patient: {
        name: string;
        id: string;
        avatar?: string;
    };
    invoiceId: string;
    date: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
}

// --- Mock Data ---

const MOCK_PAYMENTS: Payment[] = [
    { id: 'PMT-007', patient: { name: 'Michael Johnson', id: 'P56789' }, invoiceId: 'INV-005', date: '2024-04-28', amount: 450.00, method: 'Check', status: 'Pending' },
    { id: 'PMT-006', patient: { name: 'Emily Davis', id: 'P23456' }, invoiceId: 'INV-002', date: '2024-04-25', amount: 350.00, method: 'Credit Card', status: 'Failed' },
    { id: 'PMT-001', patient: { name: 'John Smith', id: 'P12345' }, invoiceId: 'INV-001', date: '2024-04-22', amount: 200.00, method: 'Credit Card', status: 'Completed' },
    { id: 'PMT-002', patient: { name: 'Robert Wilson', id: 'P34567' }, invoiceId: 'INV-003', date: '2024-04-20', amount: 175.00, method: 'Debit Card', status: 'Completed' },
    { id: 'PMT-003', patient: { name: 'Jessica Brown', id: 'P45678' }, invoiceId: 'INV-004', date: '2024-04-18', amount: 520.00, method: 'Bank Transfer', status: 'Completed' },
    { id: 'PMT-004', patient: { name: 'Sarah Thompson', id: 'P67890' }, invoiceId: 'INV-008', date: '2024-04-15', amount: 300.00, method: 'Cash', status: 'Completed' },
    { id: 'PMT-005', patient: { name: 'John Smith', id: 'P12345' }, invoiceId: 'INV-001', date: '2024-04-10', amount: 50.00, method: 'Insurance', status: 'Processing' },
];

// --- Sub-Components ---

const StatusBadge = ({ status }: { status: PaymentStatus }) => {
    const styles = {
        Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        Pending: 'bg-orange-100 text-orange-700 border-orange-200',
        Failed: 'bg-red-100 text-red-700 border-red-200',
        Processing: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
            {status}
        </span>
    );
};

// --- Main Component ---

export const PaymentHistory: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'All' | PaymentStatus>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [methodFilter, setMethodFilter] = useState<string>('All Methods');

    // Filtering Logic
    const filteredPayments = useMemo(() => {
        return MOCK_PAYMENTS.filter((payment) => {
            const matchesTab = activeTab === 'All' || payment.status === activeTab;
            const matchesSearch = payment.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesMethod = methodFilter === 'All Methods' || payment.method === methodFilter;

            return matchesTab && matchesSearch && matchesMethod;
        });
    }, [activeTab, searchQuery, methodFilter]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-slate-900">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
                    <p className="text-sm text-slate-500">View and manage all payment transactions.</p>
                </div>
                <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 text-sm text-slate-600 shadow-sm">
                    <Calendar size={16} />
                    <span>Feb 28, 2024 - Dec 17, 2025</span>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-t-xl border-x border-t p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">

                    {/* Left: Search and Dropdown */}
                    <div className="flex flex-1 items-center gap-3 min-w-[300px]">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search payments..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <select
                                className="appearance-none bg-white border rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
                                value={methodFilter}
                                onChange={(e) => setMethodFilter(e.target.value)}
                            >
                                <option>All Methods</option>
                                <option>Credit Card</option>
                                <option>Debit Card</option>
                                <option>Cash</option>
                                <option>Bank Transfer</option>
                                <option>Check</option>
                                <option>Insurance</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                        </div>

                        <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                            <RefreshCw size={18} className="text-slate-600" />
                        </button>
                        <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                            <Download size={18} className="text-slate-600" />
                        </button>
                    </div>
                </div>

                {/* Tabs Filter */}
                <div className="flex gap-6 mt-6 border-b -mb-4">
                    {['All Payments', 'Completed', 'Pending', 'Failed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab === 'All Payments' ? 'All' : tab as PaymentStatus)}
                            className={`pb-3 text-sm font-medium transition-all relative ${(tab === 'All Payments' && activeTab === 'All') || activeTab === tab
                                ? 'text-slate-900'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                            {((tab === 'All Payments' && activeTab === 'All') || activeTab === tab) && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-slate-500 text-xs uppercase tracking-wider border-b">
                            <th className="px-6 py-4 font-semibold">Payment ID</th>
                            <th className="px-6 py-4 font-semibold">Patient</th>
                            <th className="px-6 py-4 font-semibold">Invoice</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Amount</th>
                            <th className="px-6 py-4 font-semibold">Method</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                        {filteredPayments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-700">{payment.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${payment.patient.name}`} alt="avatar" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{payment.patient.name}</div>
                                            <div className="text-xs text-slate-400">{payment.patient.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{payment.invoiceId}</td>
                                <td className="px-6 py-4 text-slate-600">{payment.date}</td>
                                <td className="px-6 py-4 font-semibold">${payment.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-slate-600">{payment.method}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={payment.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600 p-1">
                                        <ActionMenu />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredPayments.length === 0 && (
                    <div className="py-20 text-center text-slate-400">
                        No payments found matching your criteria.
                    </div>
                )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <SummaryCard
                    title="Total Payments"
                    value="$1,195.00"
                    subtext="From 4 transactions"
                    color="bg-emerald-500"
                />
                <SummaryCard
                    title="Pending Payments"
                    value="$500.00"
                    subtext="From 2 transactions"
                    color="bg-orange-400"
                />
                <SummaryCard
                    title="Failed Payments"
                    value="$350.00"
                    subtext="From 1 transaction"
                    color="bg-red-500"
                />
                <div className="bg-white p-5 rounded-xl border shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-500 mb-4">Payment Methods</h3>
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Credit Card</span>
                            <span className="font-bold">2</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Debit Card</span>
                            <span className="font-bold">1</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Cash</span>
                            <span className="font-bold">1</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-slate-400 italic">Other</span>
                            <span className="font-bold text-slate-400 italic">3</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SummaryCard = ({ title, value, subtext, color }: { title: string, value: string, subtext: string, color: string }) => (
    <div className="bg-white p-5 rounded-xl border shadow-sm relative overflow-hidden">
        <h3 className="text-sm font-semibold text-slate-500 mb-1">{title}</h3>
        <div className="text-2xl font-bold mb-1 tracking-tight">{value}</div>
        <div className="text-xs text-slate-400">{subtext}</div>
        <div className={`absolute bottom-0 left-0 h-1 w-2/3 ${color} rounded-full`} />
    </div>
);

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

                <button onClick={() => navigate("/admin/payment-receipt")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    View Receipt
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    View Invoice
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Process Payment
                </button>

                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Download Receipt</button>
            </div>)}

        </div>
    );
}