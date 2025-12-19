import React, { useState } from 'react';
import { X, Calendar, Plus, Trash2, Building2 } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface NewOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  supplierName?: string;
}

export const NewOrderDialog: React.FC<NewOrderDialogProps> = ({ 
  isOpen, 
  onClose, 
  supplierName = "MedPlus Supplies" 
}) => {
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1', name: '', quantity: 1, unitPrice: 0 },
    { id: '2', name: '', quantity: 1, unitPrice: 0 }
  ]);

  if (!isOpen) return null;

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), name: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-zinc-900">Place Order with {supplierName}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Supplier Sub-header */}
          <div className="flex items-center gap-2 mb-6">
            <Building2 size={18} className="text-gray-400" />
            <span className="text-md font-bold text-zinc-800">{supplierName}</span>
          </div>

          {/* Order Items Table-like Container */}
          <div className="border border-gray-100 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-bold text-zinc-700 mb-4">Order Items</h3>
            
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <input 
                    type="text" 
                    placeholder="Item name"
                    className="flex-[3] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                  <input 
                    type="number" 
                    defaultValue={item.quantity}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Unit price"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                  <div className="flex-1 px-3 py-2 text-sm text-gray-400 bg-gray-50 rounded-lg">
                    Total
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
              <button 
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 border-2 border-zinc-900 rounded-lg text-sm font-bold text-zinc-900 hover:bg-zinc-50 transition-all"
              >
                <Plus size={16} /> Add Item
              </button>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
                <p className="text-2xl font-black text-zinc-900">${calculateTotal()}</p>
              </div>
            </div>
          </div>

          {/* Delivery & Priority Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-700">Expected Delivery</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  defaultValue="December 25th, 2025"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-700">Priority</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none appearance-none bg-white">
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700">Notes</label>
            <textarea 
              placeholder="Additional instructions for this order"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[100px] focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold bg-white hover:bg-gray-100 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all shadow-md">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};