import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface DismissAlertProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  alertType: string;
}

export const DismissAlertDialog: React.FC<DismissAlertProps> = ({ 
  isOpen, 
  onClose, 
  itemName, 
  alertType 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-zinc-900">Dismiss Alert</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          
          {/* Item Field (Disabled) */}
          <div className="flex items-center">
            <label className="w-1/3 text-sm font-bold text-zinc-700 text-right pr-6">Item</label>
            <input 
              type="text" 
              disabled 
              value={itemName} 
              className="w-2/3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-400 font-medium cursor-not-allowed" 
            />
          </div>

          {/* Alert Type Field (Disabled) */}
          <div className="flex items-center">
            <label className="w-1/3 text-sm font-bold text-zinc-700 text-right pr-6">Alert Type</label>
            <input 
              type="text" 
              disabled 
              value={alertType} 
              className="w-2/3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-400 font-medium cursor-not-allowed" 
            />
          </div>

          {/* Reason Field (Focused State) */}
          <div className="flex items-center">
            <label className="w-1/3 text-sm font-bold text-zinc-700 text-right pr-6">Reason</label>
            <div className="w-2/3 relative">
              <select className="w-full appearance-none border-2 border-zinc-900 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-900 focus:outline-none bg-white">
                <option>Issue Resolved</option>
                <option>Restock in Progress</option>
                <option>Incorrect Data</option>
                <option>Other</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Notes Field */}
          <div className="flex items-start">
            <label className="w-1/3 text-sm font-bold text-zinc-700 text-right pr-6 pt-2">Notes</label>
            <textarea 
              placeholder="Additional details about dismissing this alert"
              className="w-2/3 border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[100px] focus:ring-2 focus:ring-zinc-900/10 focus:outline-none resize-none placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold bg-white hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all shadow-sm"
          >
            Dismiss Alert
          </button>
        </div>
      </div>
    </div>
  );
};