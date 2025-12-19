import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface AddNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staffName: string;
}

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({ isOpen, onClose, staffName }) => {
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
            <h2 className="text-xl font-bold text-slate-900">Add Attendance Note</h2>
            <p className="text-sm text-gray-500">
              Add a note to {staffName}'s attendance record.
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
          
          {/* Note Type Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Note Type</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border-2 border-slate-900 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-0 cursor-pointer">
                <option>General Note</option>
                <option>Late Arrival Explanation</option>
                <option>Early Departure</option>
                <option>Special Requirement</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Note Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Note</label>
            <textarea 
              rows={4}
              placeholder="Enter your note here"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {/* Visibility Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Visibility</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none cursor-pointer">
                <option>Management Only</option>
                <option>Staff & Management</option>
                <option>Admin Only</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            </div>
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
            Save Note
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddNoteDialog;