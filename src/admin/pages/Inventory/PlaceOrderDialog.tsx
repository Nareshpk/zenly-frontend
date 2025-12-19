import { Calendar, ChevronDown, X } from 'lucide-react';
import React from 'react'

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
}

const PlaceOrderDialog = ({ isOpen, onClose, itemName }: DialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-zinc-900">Place Order</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 space-y-5">
                    {/* Item Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Item</label>
                        <input type="text" disabled value={itemName} className="w-2/3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm text-gray-400" />
                    </div>

                    {/* Stock Info Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Current Stock</label>
                        <div className="w-2/3 flex items-center gap-4">
                            <input type="text" disabled value="45" className="w-20 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm text-gray-400" />
                            <span className="text-xs font-medium text-gray-400">Min Level: 20</span>
                        </div>
                    </div>

                    {/* Order Quantity Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Order Quantity</label>
                        <div className="w-2/3 relative">
                            <input
                                type="number"
                                defaultValue={1}
                                className="w-full border-2 border-zinc-900 rounded-xl px-4 py-2 text-sm font-bold text-indigo-600 focus:outline-none"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                <ChevronDown size={14} className="rotate-180 text-gray-400" />
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Supplier Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Supplier</label>
                        <input type="text" value="MedSupply Co." className="w-2/3 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium" />
                    </div>

                    {/* Delivery Date Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Estd Delivery</label>
                        <div className="w-2/3 relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                value="December 25th, 2025"
                                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm font-medium bg-white"
                            />
                        </div>
                    </div>

                    {/* Priority Field */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-sm font-bold text-zinc-700">Priority</label>
                        <div className="w-2/3 relative">
                            <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium bg-white outline-none">
                                <option>Normal</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Notes Field */}
                    <div className="flex items-start">
                        <label className="w-1/3 text-sm font-bold text-zinc-700 pt-2">Notes</label>
                        <textarea
                            placeholder="Additional instructions for this order"
                            className="w-2/3 border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[80px] focus:ring-2 focus:ring-zinc-900/10 focus:outline-none resize-none"
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold bg-white hover:bg-gray-100">
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};
export default PlaceOrderDialog
