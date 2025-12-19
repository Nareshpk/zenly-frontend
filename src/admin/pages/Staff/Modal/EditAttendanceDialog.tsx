import { ChevronDown, Clock, X } from 'lucide-react';
import React from 'react';

interface EditAttendanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staffName: string;
}

const EditAttendanceDialog: React.FC<EditAttendanceDialogProps> = ({ isOpen, onClose, staffName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={onClose}
      />

      {/* DIALOG BOX */}
      <div className="relative bg-white w-full max-w-[500px] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-1 flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Edit Attendance Time</h2>
            <p className="text-sm text-gray-500">
              Update check-in or check-out time for {staffName}.
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
          
          {/* Record Type Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Record Type</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border-2 border-slate-900 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-0 cursor-pointer">
                <option>Check Out</option>
                <option>Check In</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Time</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="05:30"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Date</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="Thu Dec 18 2025"
                readOnly
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Reason for Edit */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Reason for Edit</label>
            <input 
              type="text" 
              placeholder="Reason for editing the time record"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 pb-8 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-lg shadow-gray-200"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditAttendanceDialog;