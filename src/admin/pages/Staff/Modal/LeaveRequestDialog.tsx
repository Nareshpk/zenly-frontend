import React from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';

interface LeaveRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveRequestDialog: React.FC<LeaveRequestDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={onClose}
      />

      {/* DIALOG BOX */}
      <div className="relative bg-white w-full max-w-[550px] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-1 flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Submit Leave Request</h2>
            <p className="text-sm text-gray-400">
              Request time off or leave of absence.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          
          {/* Staff Member Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300">Staff Member</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border-2 border-slate-900 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-0 cursor-pointer">
                <option value="">Select staff member</option>
                <option>Dr. Sarah Johnson</option>
                <option>Nurse Emma Wilson</option>
                <option>James Rodriguez</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Leave Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300">Leave Type</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none cursor-pointer">
                <option value="">Select leave type</option>
                <option>Vacation</option>
                <option>Sick Leave</option>
                <option>Personal Leave</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Date Range Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">Start Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="dd-mm-yyyy"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">End Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="dd-mm-yyyy"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Reason (Optional) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300">Reason (Optional)</label>
            <textarea 
              rows={3}
              placeholder="Brief explanation for the leave request"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 pb-8 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
          >
            Submit Request
          </button>
        </div>

      </div>
    </div>
  );
};

export default LeaveRequestDialog;