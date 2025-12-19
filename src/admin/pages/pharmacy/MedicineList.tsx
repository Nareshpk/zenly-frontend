import { useEffect, useRef, useState } from "react";
import { Calendar, MinusCircle, MoreVertical, Plus, PlusCircle, X, Search, Download, } from "lucide-react";
import { Check, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";


/* ---------------- TYPES ---------------- */
export type Category =
    | "All"
    | "Antibiotics"
    | "Analgesics"
    | "Antidiabetics"
    | "Antihypertensives"
    | "Antihistamines";

export type StockStatus =
    | "All"
    | "In Stock"
    | "Low Stock"
    | "Out of Stock";

type MedicineType = "Prescription" | "OTC" | "Controlled";

interface Medicine {
    id: string;
    name: string;
    generic: string;
    category: string;
    stock: number;
    expiry: string;
    status: StockStatus;
    type: MedicineType;
}

/* ---------------- MOCK DATA ---------------- */
const medicines: Medicine[] = [
    {
        id: "MED001",
        name: "Amoxicillin 500mg",
        generic: "Amoxicillin",
        category: "Antibiotics",
        stock: 1250,
        expiry: "2025-06-15",
        status: "In Stock",
        type: "Prescription",
    },
    {
        id: "MED004",
        name: "Lisinopril 10mg",
        generic: "Lisinopril",
        category: "Antihypertensives",
        stock: 120,
        expiry: "2024-09-30",
        status: "Low Stock",
        type: "Prescription",
    },
    {
        id: "MED006",
        name: "Cetirizine 10mg",
        generic: "Cetirizine HCl",
        category: "Antihistamines",
        stock: 0,
        expiry: "2025-03-18",
        status: "Out of Stock",
        type: "OTC",
    },
];

/* ---------------- STATUS BADGE ---------------- */
function StatusBadge({ status }: { status: StockStatus }) {
    const styles: Record<StockStatus, string> = {
        "All": "bg-gray-100 text-green-700",
        "In Stock": "bg-green-100 text-green-700",
        "Low Stock": "bg-orange-100 text-orange-700",
        "Out of Stock": "bg-red-100 text-red-700",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {status}
        </span>
    );
}

/* ---------------- ACTION MENU ---------------- */
function ActionMenu({ onClose, setTransactionIsOpen }: { onClose: any, setTransactionIsOpen: any }) {
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

                <button onClick={() => navigate("/admin/medicine-info")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    View details
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Edit Medicine
                </button>
                <button onClick={() => onClose(true)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Update Stock
                </button>

                <button onClick={() => setTransactionIsOpen(true)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">View History</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Download Info</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">Delete</button>
            </div>)}

        </div>
    );
}

/* ---------------- MAIN PAGE ---------------- */
export default function MedicineList() {
    const [category, setCategory] = useState<Category>("All");
    const [status, setStatus] = useState<StockStatus>("All");
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTransaction, setTransactionIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"All" | MedicineType>("All");

    const filtered = medicines.filter((m) => {
        const matchesTab = activeTab === "All" || m.type === activeTab;
        const matchesSearch =
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.generic.toLowerCase().includes(search.toLowerCase());

        return matchesTab && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Medicine List</h1>
                    <p className="text-sm text-gray-500">
                        Manage and view all medicines in the pharmacy inventory
                    </p>
                </div>

                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md">
                    <Plus size={16} /> Add New Medicine
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
                <SummaryCard title="Total Medicines" value="1,248" sub="+24 added this month" />
                <SummaryCard title="Low Stock Items" value="42" sub="Need reordering soon" />
                <SummaryCard title="Expiring Soon" value="18" sub="Within next 30 days" />
                <SummaryCard title="Categories" value="36" sub="Medicine categories" />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
                <input
                    placeholder="Search medicines..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border rounded-md px-3 py-2 text-sm"
                />

                <div className="flex items-center gap-3">
                    {/* Category Filter */}
                    <Dropdown
                        label="All Categories"
                        options={[
                            "All",
                            "Antibiotics",
                            "Analgesics",
                            "Antidiabetics",
                            "Antihypertensives",
                            "Antihistamines",
                        ]}
                        value={category}
                        onChange={setCategory}
                    />

                    {/* Status Filter */}
                    <Dropdown
                        label="All Status"
                        options={["All", "In Stock", "Low Stock", "Out of Stock"]}
                        value={status}
                        onChange={setStatus}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 text-sm">
                {["All", "Prescription", "OTC", "Controlled"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setActiveTab(t as any)}
                        className={`px-3 py-1 rounded-md ${activeTab === t ? "bg-gray-100 font-medium" : "border"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white border rounded-xl h-full">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr className="text-left">
                            <th className="p-4">ID</th>
                            <th className="p-4">Medicine Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Expiry Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((m) => (
                            <tr key={m.id} className="border-t">
                                <td className="p-4 font-medium">{m.id}</td>
                                <td className="p-4">
                                    <div className="font-medium">{m.name}</div>
                                    <div className="text-xs text-gray-500">{m.generic}</div>
                                </td>
                                <td className="p-4">{m.category}</td>
                                <td className="p-4">{m.stock} units</td>
                                <td className="p-4">{m.expiry}</td>
                                <td className="p-4">
                                    <StatusBadge status={m.status} />
                                </td>
                                <td className="p-4 text-right">
                                    <ActionMenu onClose={setIsOpen} setTransactionIsOpen={setTransactionIsOpen} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UpdateStockModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <TransactionHistoryModal isOpen={isOpenTransaction} onClose={() => setTransactionIsOpen(false)} />
        </div>
    );
}

/* ---------------- SUMMARY CARD ---------------- */
function SummaryCard({
    title,
    value,
    sub,
}: {
    title: string;
    value: string;
    sub: string;
}) {
    return (
        <div className="bg-white border rounded-xl p-4">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-2xl font-semibold mt-2">{value}</div>
            <div className="text-xs text-gray-400 mt-1">{sub}</div>
        </div>
    );
}



interface DropdownProps<T extends string> {
    label: string;
    options: T[];
    value: T;
    onChange: (value: T) => void;
}

export function Dropdown<T extends string>({
    label,
    options,
    value,
    onChange,
}: DropdownProps<T>) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between gap-2 px-3 py-2 border rounded-md text-sm bg-white min-w-[160px]"
            >
                {value}
                <ChevronDown size={14} />
            </button>

            {open && (
                <div className="absolute z-20 mt-2 w-full bg-white border rounded-md shadow-md">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 ${value === option ? "bg-gray-50 font-medium" : ""
                                }`}
                        >
                            {value === option && <Check size={14} />}
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}




const UpdateStockModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [action, setAction] = useState<'add' | 'remove'>('add');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Update Stock: Amoxicillin 500mg</h2>
                        <p className="text-sm text-gray-500">Current stock: 1250 units</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Action Toggles */}
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => setAction('add')}
                        className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border-2 py-4 transition-all ${action === 'add' ? 'border-black bg-white' : 'border-gray-100 bg-gray-50 text-gray-500'
                            }`}
                    >
                        <PlusCircle size={24} />
                        <span className="font-semibold">Add Stock</span>
                    </button>

                    <button
                        onClick={() => setAction('remove')}
                        className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border-2 py-4 transition-all ${action === 'remove' ? 'border-black bg-white' : 'border-gray-100 bg-gray-50 text-gray-500'
                            }`}
                    >
                        <MinusCircle size={24} />
                        <span className="font-semibold">Remove Stock</span>
                    </button>
                </div>

                {/* Form Fields */}
                <div className="mt-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Quantity</label>
                        <input
                            type="number"
                            className="w-full rounded-md border border-gray-300 p-2.5 focus:border-gray-500 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Batch Number</label>
                        <input
                            type="text"
                            className="w-full rounded-md border border-gray-300 p-2.5 focus:border-gray-500 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Expiry Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Select date"
                                className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 focus:border-gray-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Notes</label>
                        <textarea
                            rows={3}
                            placeholder="Add any additional information"
                            className="w-full resize-none rounded-md border border-gray-300 p-2.5 focus:border-gray-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button className="rounded-md bg-gray-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-gray-600">
                        Update Stock
                    </button>
                </div>
            </div>
        </div>
    );
};



interface Transaction {
    date: string;
    type: 'Dispensed' | 'Stock Adjustment' | 'Received';
    quantity: number;
    reference: string;
    user: string;
    notes: string;
}

const transactions: Transaction[] = [
    { date: '2024-04-15', type: 'Dispensed', quantity: -30, reference: 'PRE20240415001', user: 'Dr. Sarah Johnson', notes: 'Prescribed to patient #...' },
    { date: '2024-04-10', type: 'Dispensed', quantity: -20, reference: 'PRE20240410003', user: 'Dr. Michael Chen', notes: 'Prescribed to patient #...' },
    { date: '2024-04-05', type: 'Dispensed', quantity: -15, reference: 'PRE20240405002', user: 'Dr. Robert Williams', notes: 'Prescribed to patient #...' },
    { date: '2024-04-01', type: 'Stock Adjustment', quantity: -5, reference: 'ADJ20240401', user: 'Jane Smith', notes: 'Damaged inventory' },
    { date: '2024-03-25', type: 'Received', quantity: 500, reference: 'PO20240325', user: 'John Doe', notes: 'Received from supplier...' },
    { date: '2024-03-10', type: 'Received', quantity: 250, reference: 'PO20240310', user: 'John Doe', notes: 'Received from supplier...' },
    { date: '2024-03-05', type: 'Stock Adjustment', quantity: -10, reference: 'ADJ20240305', user: 'Jane Smith', notes: 'Expired inventory' },
    { date: '2024-02-28', type: 'Dispensed', quantity: -25, reference: 'PRE20240228005', user: 'Dr. Sarah Johnson', notes: 'Prescribed to patient #...' },
];

const TransactionHistoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-xl bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-2">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Transaction History: Amoxicillin 500mg</h2>
                        <p className="text-sm text-gray-500 font-medium">View all stock movements and transactions for this medicine</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Filters Toolbar */}
                <div className="flex flex-wrap items-center gap-3 px-6 py-4">
                    <div className="relative flex-1 min-w-[280px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by reference, user or notes..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-black focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <select className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm font-medium text-gray-700 focus:border-black focus:outline-none cursor-pointer">
                            <option>All Types</option>
                            <option>Dispensed</option>
                            <option>Received</option>
                            <option>Stock Adjustment</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Calendar size={18} className="text-gray-500" />
                        Date Range
                    </button>

                    <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Download size={18} className="text-gray-500" />
                        Export
                    </button>
                </div>

                {/* Table Container */}
                <div className="flex-1 overflow-auto px-6 pb-6">
                    <div className="min-w-[800px] rounded-lg border border-gray-200">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Date</th>
                                    <th className="px-4 py-3 font-semibold">Type</th>
                                    <th className="px-4 py-3 font-semibold">Quantity</th>
                                    <th className="px-4 py-3 font-semibold">Reference</th>
                                    <th className="px-4 py-3 font-semibold">User</th>
                                    <th className="px-4 py-3 font-semibold">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactions.map((t, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="whitespace-nowrap px-4 py-4 text-gray-700 font-medium">{t.date}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${t.type === 'Received'
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-gray-800 ring-gray-200'
                                                }`}>
                                                {t.type}
                                            </span>
                                        </td>
                                        <td className={`px-4 py-4 font-bold ${t.quantity > 0 ? 'text-emerald-500' : 'text-rose-400'}`}>
                                            {t.quantity > 0 ? `+${t.quantity}` : t.quantity}
                                        </td>
                                        <td className="px-4 py-4 text-gray-600 font-medium">{t.reference}</td>
                                        <td className="px-4 py-4 text-gray-700">{t.user}</td>
                                        <td className="px-4 py-4 text-gray-500 truncate max-w-[200px]">{t.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Custom Scrollbar Styling (Optional) */}
                <div className="h-1.5 bg-gray-200 rounded-full mx-6 mb-2">
                    <div className="h-full bg-gray-400 w-2/3 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};


