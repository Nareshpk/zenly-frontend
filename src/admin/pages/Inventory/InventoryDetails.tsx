import {
    ArrowLeft,
    Calendar,
    Edit3,
    Eye,
    FileText,
    MapPin,
    RotateCcw,
    ShoppingCart,
    Truck,
    User
} from 'lucide-react';
import React, { useState } from 'react';
import PlaceOrderDialog from './PlaceOrderDialog';
import UpdateStockDialog from './UpdateStockDialog';

const InventoryDetails: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [isUpdateStockOpen, setUpdateStockOpen] = useState(false);
    const [isPlaceOrderOpen, setPlaceOrderOpen] = useState(false);

    // Data to pass as params
    const itemData = {
        name: "Disposable Gloves (Box)",
        currentStock: 45,
        minLevel: 20
    };
    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-900">
            {/* Header Navigation */}
            <div className="flex items-center gap-4 mb-8">
                <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <ArrowLeft size={18} />
                </button>
                <h1 className="text-2xl font-bold">Disposable Gloves (Box)</h1>
                <span className="bg-zinc-900 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Medical Supplies
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold">Item Information</h2>
                            <p className="text-sm text-gray-400">Detailed information about this inventory item</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Basic Information */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Basic Information</h3>
                                    <div className="space-y-3">
                                        <DetailRow label="Item ID:" value="INV001" />
                                        <DetailRow label="SKU:" value="GLV-MED-100" />
                                        <DetailRow label="Category:" value="Medical Supplies" />
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-sm text-gray-500">Status:</span>
                                            <span className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full">In Stock</span>
                                        </div>
                                        <DetailRow label="Last Updated:" value="2023-04-15" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Supplier & Location</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Truck size={16} className="text-gray-400" />
                                            <span className="text-gray-500">Supplier:</span>
                                            <span className="font-semibold">MedSupply Co.</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="text-gray-500">Location:</span>
                                            <span className="font-semibold">Storage Room A</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stock & Value Information */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Stock Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-sm text-gray-500">Current Stock:</span>
                                            <span className="text-lg font-bold">45</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div className="bg-zinc-900 h-full w-[45%]" />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                                            <span>Min: 20</span>
                                            <span>Max: 100</span>
                                        </div>
                                        <DetailRow label="Batch Number:" value="BN-2023-0456" />
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-sm text-gray-500">Expiry Date:</span>
                                            <div className="flex items-center gap-1 font-semibold text-sm">
                                                <Calendar size={14} className="text-gray-400" /> 2024-12-31
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Value Information</h3>
                                    <div className="space-y-3">
                                        <DetailRow label="Unit Price:" value="$8.99" />
                                        <DetailRow label="Total Value:" value="$404.55" className="text-lg font-bold" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description & Notes */}
                        <div className="mt-12 pt-8 border-t border-gray-50 space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    Powder-free latex examination gloves, size medium. Box of 100 gloves.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notes</h3>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    Preferred brand for examination rooms. Order well in advance during flu season.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <button onClick={() => setUpdateStockOpen(true)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all border bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800`}>
                                <RotateCcw size={18} />
                                {"Update Stock"}
                            </button>
                            <button onClick={() => setPlaceOrderOpen(true)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all border bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800`}>
                                <ShoppingCart size={18} />
                                {"Place Order"}
                            </button>
                            <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all border bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800`}>
                                <Edit3 size={18} />
                                {"Edit Item"}
                            </button>
                            <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all border bg-white border-gray-200 text-zinc-700 hover:bg-gray-50`}>
                                <FileText size={18} />
                                {"Generate Report"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-4 py-8">
                {/* Tab Navigation */}
                <div className="flex gap-1 bg-gray-200/50 w-fit p-1 rounded-lg border border-gray-200">
                    {['Overview', 'Stock History', 'Related Items'].map((tab) => (
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

                {/* Tab Content Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 min-h-[300px]">
                    {activeTab === 'Overview' && <OverviewTab />}
                    {activeTab === 'Stock History' && <StockHistoryTab />}
                    {activeTab === 'Related Items' && <RelatedItemsTab />}
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

const OverviewTab = () => (
    <div className="animate-in fade-in duration-300">
        <h2 className="text-xl font-bold mb-1">Item Overview</h2>
        <p className="text-sm text-gray-400 mb-8 font-medium">Summary of this inventory item</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-sm font-bold text-zinc-800 mb-2">Item Details</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                    Powder-free latex examination gloves, size medium. Box of 100 gloves.
                </p>
            </div>
            <div>
                <h3 className="text-sm font-bold text-zinc-800 mb-2">Stock Status</h3>
                <div className="flex items-center gap-3">
                    <span className="bg-emerald-100 text-emerald-700 text-[11px] font-black px-3 py-1 rounded-full uppercase">
                        In Stock
                    </span>
                    <span className="text-sm text-gray-500 font-medium">45 units available</span>
                </div>
            </div>
        </div>
    </div>
);

const StockHistoryTab = () => (
    <div className="animate-in fade-in duration-300">
        <h2 className="text-xl font-bold mb-1">Stock History</h2>
        <p className="text-sm text-gray-400 mb-6 font-medium">Record of stock level changes</p>

        <table className="w-full text-left">
            <thead>
                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                    <th className="py-4 font-bold">Date</th>
                    <th className="py-4 font-bold">Action</th>
                    <th className="py-4 font-bold">Quantity</th>
                    <th className="py-4 font-bold">Previous Level</th>
                    <th className="py-4 font-bold">Updated By</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
                {[
                    { date: '2023-04-15', action: 'Stock Update', qty: 45, prev: 20, user: 'Dr. Sarah Johnson' },
                    { date: '2023-03-28', action: 'Stock Update', qty: 20, prev: 5, user: 'Nurse Mike Chen' },
                    { date: '2023-03-10', action: 'Stock Update', qty: 5, prev: 35, user: 'Dr. Sarah Johnson' },
                    { date: '2023-02-15', action: 'Initial Stock', qty: 35, prev: 0, user: 'Admin Lisa Wong' },
                ].map((row, i) => (
                    <tr key={i} className="text-zinc-600 font-medium">
                        <td className="py-4">{row.date}</td>
                        <td className="py-4 text-zinc-800 font-bold">{row.action}</td>
                        <td className="py-4 font-bold">{row.qty}</td>
                        <td className="py-4">{row.prev}</td>
                        <td className="py-4">
                            <div className="flex items-center gap-2">
                                <User size={14} className="text-gray-400" /> {row.user}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const RelatedItemsTab = () => (
    <div className="animate-in fade-in duration-300">
        <h2 className="text-xl font-bold mb-1">Related Items</h2>
        <p className="text-sm text-gray-400 mb-8 font-medium">Other items in the same category</p>

        <table className="w-full text-left">
            <thead>
                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                    <th className="py-4">Item ID</th>
                    <th className="py-4">Name</th>
                    <th className="py-4">Category</th>
                    <th className="py-4">Stock Level</th>
                    <th className="py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
                {[
                    { id: 'INV015', name: 'Disposable Gloves (Small)', cat: 'Medical Supplies', stock: '30 / 20' },
                    { id: 'INV016', name: 'Disposable Gloves (Large)', cat: 'Medical Supplies', stock: '25 / 20' },
                    { id: 'INV022', name: 'Hand Sanitizer', cat: 'Medical Supplies', stock: '40 / 15' },
                ].map((item, i) => (
                    <tr key={i} className="text-zinc-600 font-medium">
                        <td className="py-4 font-bold">{item.id}</td>
                        <td className="py-4 text-zinc-800 font-bold">{item.name}</td>
                        <td className="py-4">{item.cat}</td>
                        <td className="py-4 font-bold">{item.stock}</td>
                        <td className="py-4 text-right">
                            <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs font-bold">
                                <Eye size={14} /> View
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Helper Components
const DetailRow = ({ label, value, className = "" }: { label: string, value: string, className?: string }) => (
    <div className="flex justify-between items-center py-1">
        <span className="text-sm text-gray-500">{label}</span>
        <span className={`text-sm font-semibold text-zinc-800 ${className}`}>{value}</span>
    </div>
);


export default InventoryDetails;