import {
    AlertCircle,
    ArrowUpDown,
    Download,
    MoreHorizontal,
    Package,
    Plus,
    RotateCcw,
    Search,
    ShoppingCart,
    Truck
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateStockDialog from './UpdateStockDialog';
import PlaceOrderDialog from './PlaceOrderDialog';

interface InventoryItem {
    id: string;
    name: string;
    category: string;
    stockLevel: string;
    status: 'In Stock' | 'Low Stock';
    lastUpdated: string;
}

const InventoryDashboard: React.FC = () => {
    const navigate = useNavigate();
    const stats = [
        { title: 'Total Items', value: '1,284', sub: '+24 items added this month', icon: <Package className="text-gray-400" /> },
        { title: 'Low Stock Items', value: '42', sub: 'View alerts', icon: <AlertCircle className="text-orange-500" />, subColor: 'text-orange-500' },
        { title: 'Value of Inventory', value: '$124,750', sub: '+12.5% from last month', icon: <ShoppingCart className="text-gray-400" /> },
        { title: 'Active Suppliers', value: '38', sub: 'View all suppliers', icon: <Truck className="text-gray-400" /> },
    ];

    const [activeTab, setActiveTab] = useState('All Items');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isUpdateStockOpen, setUpdateStockOpen] = useState(false);
    const [isPlaceOrderOpen, setPlaceOrderOpen] = useState(false);

    // Data to pass as params
    const itemData = {
        name: "Disposable Gloves (Box)",
        currentStock: 45,
        minLevel: 20
    };
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fullInventory: InventoryItem[] = [
        { id: 'INV001', name: 'Disposable Gloves (Box)', category: 'Medical Supplies', stockLevel: '45 / 20', status: 'In Stock', lastUpdated: '2023-04-15' },
        { id: 'INV002', name: 'Ibuprofen 200mg', category: 'Medications', stockLevel: '12 / 15', status: 'Low Stock', lastUpdated: '2023-04-14' },
        { id: 'INV003', name: 'Blood Pressure Monitor', category: 'Equipment', stockLevel: '5 / 3', status: 'In Stock', lastUpdated: '2023-04-10' },
    ];

    // Logic for Tabs Filtering
    const filteredInventory = activeTab === 'All Items'
        ? fullInventory
        : fullInventory.filter(item => item.category === activeTab);

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Inventory Management</h1>
                    <p className="text-gray-500 text-sm">Manage your clinic's inventory, supplies, and equipment</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
                        <Plus size={18} /> Add Item
                    </button>
                    <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
                        <div className="absolute top-6 right-6">{stat.icon}</div>
                        <p className="text-sm font-medium text-gray-600 mb-4">{stat.title}</p>
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className={`text-xs ${stat.subColor || 'text-gray-400'}`}>{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="relative flex-grow max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white outline-none">
                    <option>All Categories</option>
                </select>
                <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white outline-none">
                    <option>All Status</option>
                </select>
                <button className="p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50">
                    <RotateCcw size={18} className="text-gray-600" />
                </button>
            </div>

            {/* Tabs */}
            <div className="p-8 bg-gray-50 min-h-screen">
                {/* --- TABS FILTER --- */}
                <div className="flex gap-1 mb-8 bg-gray-200/50 w-fit p-1 rounded-lg border border-gray-200">
                    {['All Items', 'Medications', 'Medical Supplies', 'Equipment'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === tab
                                ? 'bg-white shadow-sm text-zinc-900'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* --- TABLE SECTION --- */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-visible">
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-1">Inventory Items</h2>
                        <p className="text-sm text-gray-400 font-medium">
                            Showing {filteredInventory.length} items.
                        </p>
                    </div>

                    <div className="h-full">
                        <table className="w-full h-full text-left border-collapse">
                            <thead>
                                <tr className="border-y border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <th className="px-6 py-4"><div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">Item ID <ArrowUpDown size={12} /></div></th>
                                    <th className="px-6 py-4"><div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">Name <ArrowUpDown size={12} /></div></th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4"><div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">Stock Level <ArrowUpDown size={12} /></div></th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4"><div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">Last Updated <ArrowUpDown size={12} /></div></th>
                                    <th className="px-6 py-4 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredInventory.map((item) => (
                                    <tr key={item.id} className="text-sm group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-5 font-semibold text-zinc-500">{item.id}</td>
                                        <td className="px-6 py-5 font-bold text-zinc-800">{item.name}</td>
                                        <td className="px-6 py-5 text-zinc-600 font-medium">{item.category}</td>
                                        <td className="px-6 py-5 font-bold text-zinc-700">{item.stockLevel}</td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-tight ${item.status === 'In Stock'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-orange-100 text-orange-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 font-medium">{item.lastUpdated}</td>
                                        <td className="px-6 py-5 text-right relative">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                                className={`p-1 rounded-md transition-colors ${openMenuId === item.id ? 'bg-gray-100 text-black' : 'text-gray-400 hover:text-gray-600'}`}
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>

                                            {/* --- DYNAMIC ACTION MENU --- */}
                                            {openMenuId === item.id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-12 top-4 bg-white border border-gray-200 shadow-xl rounded-xl w-44 py-2 z-50 animate-in fade-in zoom-in duration-100 origin-top-right"
                                                >
                                                    <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Actions</div>
                                                    <button onClick={() => navigate("/admin/inventory-details")} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">View details</button>
                                                    <button onClick={() => navigate("/admin/edit-item")} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Edit item</button>
                                                    <div className="h-px bg-gray-100 my-1 mx-2"></div>
                                                    <button onClick={() => setUpdateStockOpen(true)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Update stock</button>
                                                    <button onClick={() => setPlaceOrderOpen(true)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Place order</button>
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
            <UpdateStockDialog
                isOpen={isUpdateStockOpen}
                onClose={() => setUpdateStockOpen(false)}
                itemName={itemData.name}
            />

            <PlaceOrderDialog
                isOpen={isPlaceOrderOpen}
                onClose={() => setPlaceOrderOpen(false)}
                itemName={itemData.name}
            />

        </div>
    );
};



export default InventoryDashboard;