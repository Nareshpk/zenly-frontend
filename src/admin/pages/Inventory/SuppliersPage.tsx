import {
    ChevronDown, Download,
    Edit3,
    ExternalLink,
    Eye, Mail,
    MapPin,
    MoreVertical,
    Package,
    Phone,
    Plus,
    Search,
    ShoppingCart,
    Star, Truck,
    Users
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddSupplierDialog } from './AddSupplierDialog';
import { NewOrderDialog } from './NewOrderDialog';

const suppliers = [
    {
        id: "SUP002",
        name: "PharmaTech Inc.",
        category: "Medications",
        email: "sales@pharmatech.com",
        rating: 4,
        status: "Active",
    },
    {
        id: "SUP006",
        name: "Global Pharma Ltd.",
        category: "Medications",
        email: "sales@globalpharma.com",
        rating: 5,
        status: "Active",
    },
];


const SuppliersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Medications');
    const [isAddSupplierOpen, setAddSupplierOpen] = useState(false);
    const [isPlaceOrderOpen, setPlaceOrderOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Suppliers</h1>
                    <p className="text-sm text-gray-400">Manage your inventory suppliers and vendors</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-shadow shadow-sm">
                        <Plus size={18} /> Add Supplier
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Suppliers" value="38" subtitle="+3 new this quarter" icon={<Users className="text-gray-400" size={20} />} />
                <StatCard title="Active Orders" value="12" subtitle="4 arriving this week" icon={<Package className="text-gray-400" size={20} />} />
                <StatCard title="Top Supplier" value="MedPlus" subtitle="98% reliability rating" icon={<Star className="text-amber-400" size={20} />} />
                <StatCard title="Monthly Spend" value="$24,350" subtitle="-8% from last month" icon={<Truck className="text-gray-400" size={20} />} />
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-grow max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Search suppliers..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 shadow-sm" />
                </div>
                <FilterDropdown label="All Categories" />
                <FilterDropdown label="Active" />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 mb-8 bg-gray-200/50 w-fit p-1 rounded-lg border border-gray-200">
                {['All Suppliers', 'Preferred', 'Medications', 'Medical Supplies'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === tab ? 'bg-white shadow-sm text-zinc-900 border border-gray-100' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-8">
                <div className="p-8">
                    <h2 className="text-xl font-bold mb-1">{activeTab} Suppliers</h2>
                    <p className="text-sm text-gray-400 mb-8 font-medium">Suppliers specializing in pharmaceutical products</p>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                <th className="pb-4">ID</th>
                                <th className="pb-4">Name</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4">Contact</th>
                                <th className="pb-4">Rating</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {suppliers.map((supplier) => (
                                <SupplierRow
                                    key={supplier.id}
                                    id={supplier.id}
                                    name={supplier.name}
                                    category={supplier.category}
                                    email={supplier.email}
                                    rating={supplier.rating}
                                    status={supplier.status}
                                    setAddSupplierOpen={setAddSupplierOpen}
                                    setPlaceOrderOpen={setPlaceOrderOpen}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Grid: Featured & Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h3 className="text-lg font-bold mb-6">Featured Suppliers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FeaturedCard name="MedPlus Supplies" rating={4} location="Chicago, IL" contact="Sarah Johnson" />
                        <FeaturedCard name="PharmaTech Inc." rating={5} location="Boston, MA" contact="Michael Chen" />
                        <FeaturedCard name="MedEquip Solutions" rating={4} location="San Diego, CA" contact="David Rodriguez" />
                        <FeaturedCard name="Global Pharma Ltd." rating={5} location="New York, NY" contact="Emma Wilson" />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-6">Recent Orders</h3>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                        <RecentOrder supplier="MedPlus Supplies" id="#ORD4872" date="Apr 18, 2023" price="$1,245.00" status="Delivered" />
                        <RecentOrder supplier="PharmaTech Inc." id="#ORD4865" date="Apr 15, 2023" price="$876.50" status="Shipped" />
                        <RecentOrder supplier="MedEquip Solutions" id="#ORD4861" date="Apr 12, 2023" price="$2,340.75" status="Processing" />
                        <button className="w-full py-2 text-sm font-bold text-zinc-500 border-t border-gray-100 mt-2 hover:text-zinc-900 transition-colors">
                            View All Orders
                        </button>
                    </div>
                </div>
            </div>
            <AddSupplierDialog isOpen={isAddSupplierOpen} onClose={() => setAddSupplierOpen(false)} />
            <NewOrderDialog isOpen={isPlaceOrderOpen} onClose={() => setPlaceOrderOpen(false)} />
        </div>
    );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ title, value, subtitle, icon }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
        <div className="absolute top-6 right-6 p-2 bg-gray-50 rounded-lg">{icon}</div>
        <h3 className="text-sm font-bold text-zinc-500 mb-6">{title}</h3>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-tight">{subtitle}</p>
    </div>
);

const SupplierRow = ({ id, name, category, email, rating, status, setAddSupplierOpen, setPlaceOrderOpen }: any) => {
    const navigate = useNavigate();
    const handleEdit = (item: any) => {

    }
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="py-5 font-bold text-zinc-400">{id}</td>
            <td className="py-5 font-bold text-zinc-900">{name}</td>
            <td className="py-5 text-zinc-500">{category}</td>
            <td className="py-5 flex items-center gap-2 text-zinc-500">
                <Mail size={14} /> {email}
            </td>
            <td className="py-5">
                <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} />)}
                </div>
            </td>
            <td className="py-5">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full">{status}</span>
            </td>
            <td className="py-5 text-right">
                <ActionMenu
                    onViewDetails={() => navigate("/admin/supplier-info")}
                    onContactSupplier={setAddSupplierOpen}
                    onPlaceOrder={setPlaceOrderOpen}
                    onEditSupplier={() => handleEdit({ id, name, category, email, rating, status })}
                />
            </td>
        </tr>
    )
};

const FeaturedCard = ({ name, rating, location, contact }: any) => (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <h4 className="font-bold text-zinc-900">{name}</h4>
            <span className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-md font-bold">Active</span>
        </div>
        <div className="space-y-2 text-xs text-zinc-500 mb-4">
            <div className="flex items-center gap-2"><Users size={12} /> {contact}</div>
            <div className="flex items-center gap-2"><Phone size={12} /> (555) 123-4567</div>
            <div className="flex items-center gap-2"><MapPin size={12} /> {location}</div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="flex text-amber-400">
                {[...Array(rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-[10px] font-bold hover:bg-gray-50">
                <ExternalLink size={12} /> Visit Website
            </button>
        </div>
    </div>
);

const RecentOrder = ({ supplier, id, date, price, status }: any) => {
    const statusColor = status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600';
    return (
        <div className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
            <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-900">{supplier}</p>
                <p className="text-[10px] text-gray-400">Order {id} • {date}</p>
                <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded ${statusColor}`}>{status}</span>
            </div>
            <div className="text-right">
                <p className="text-xs font-bold text-zinc-900">{price}</p>
                <p className="text-[10px] text-gray-400">12 items</p>
            </div>
        </div>
    );
};

const FilterDropdown = ({ label }: { label: string }) => (
    <button className="flex items-center gap-8 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-gray-50 transition-colors shadow-sm">
        {label}
        <ChevronDown size={16} className="text-gray-400" />
    </button>
);



const ActionMenu = ({
    onViewDetails,
    onContactSupplier,
    onPlaceOrder,
    onEditSupplier
}: any) => {
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

            {open && (
                <div className="absolute right-0 top-10 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-150">
                    {/* Menu Header */}
                    <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                        Actions
                    </div>

                    {/* Action Items */}
                    <button
                        onClick={onViewDetails}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition-colors"
                    >
                        <Eye size={16} className="text-gray-400" />
                        View details
                    </button>

                    <button
                        onClick={onContactSupplier}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition-colors"
                    >
                        <Mail size={16} className="text-gray-400" />
                        Contact supplier
                    </button>

                    {/* Visual separator line as seen in the mockup */}
                    <div className="my-1 border-t border-gray-50" />

                    <button
                        onClick={onPlaceOrder}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition-colors"
                    >
                        <ShoppingCart size={16} className="text-gray-400" />
                        Place order
                    </button>

                    <button
                        onClick={() => navigate("/admin/edit-supplier")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition-colors"
                    >
                        <Edit3 size={16} className="text-gray-400" />
                        Edit supplier
                    </button>
                </div>
            )}

        </div>
    );
}


export default SuppliersPage;