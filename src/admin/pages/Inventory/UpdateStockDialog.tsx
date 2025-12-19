import { ChevronDown, X } from 'lucide-react';
import React from 'react'


interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
}


const UpdateStockDialog = ({ isOpen, onClose, itemName }: DialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-zinc-900">Update Stock Level</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    {/* Item Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Item</label>
                        <input
                            type="text"
                            disabled
                            value={itemName}
                            className="w-2/3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-400 font-medium"
                        />
                    </div>

                    {/* Current Stock Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Current Stock</label>
                        <input
                            type="text"
                            disabled
                            value="45"
                            className="w-2/3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-400 font-medium"
                        />
                    </div>

                    {/* New Stock Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">New Stock</label>
                        <div className="w-2/3 relative">
                            <input
                                type="number"
                                defaultValue={45}
                                className="w-full border-2 border-zinc-900 rounded-xl px-4 py-2.5 text-sm font-bold text-indigo-600 focus:outline-none"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                <ChevronDown size={14} className="rotate-180 text-gray-400" />
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Reason Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Reason</label>
                        <div className="w-2/3 relative">
                            <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-zinc-900/10 focus:outline-none bg-white">
                                <option>Restock</option>
                                <option>Inventory Audit</option>
                                <option>Damaged Goods</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Notes Field */}
                    <div className="flex items-start">
                        <label className="w-1/3 text-sm font-bold text-zinc-700 pt-2">Notes</label>
                        <textarea
                            placeholder="Additional details about this stock update"
                            className="w-2/3 border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[100px] focus:ring-2 focus:ring-zinc-900/10 focus:outline-none resize-none"
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold bg-white hover:bg-gray-100 transition-colors">
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all">
                        Update Stock
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateStockDialog
