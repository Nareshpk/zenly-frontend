import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface UserOption {
  id: string;
  name: string;
  department: string;
  position: string;
  avatarUrl?: string;
}

const MOCK_STAFF: UserOption[] = [
  { id: '1', name: 'User Name 1', department: 'Department', position: 'Position' },
  { id: '2', name: 'User Name 2', department: 'Department', position: 'Position' },
  { id: '3', name: 'User Name 3', department: 'Department', position: 'Position' },
  { id: '4', name: 'User Name 4', department: 'Department', position: 'Position' },
  { id: '5', name: 'User Name 5', department: 'Department', position: 'Position' },
];

interface AssignUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
}

const AssignUserDialog: React.FC<AssignUserDialogProps> = ({ isOpen, onClose, roleName }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Assign Users to {roleName} Role</h2>
            <p className="text-sm text-gray-500 mt-1">Select staff members to assign to this role</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-900 rounded-xl text-sm focus:outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* User List */}
        <div className="px-4 py-2 max-h-[400px] overflow-y-auto space-y-1">
          {MOCK_STAFF.map((user) => (
            <label 
              key={user.id} 
              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition group"
            >
              <input 
                type="checkbox" 
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUser(user.id)}
                className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-black cursor-pointer"
              />
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden border border-gray-100">
                {/* Placeholder for Avatar */}
                <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-white text-[10px]">
                  IMG
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900 truncate">{user.name}</div>
                <div className="text-xs text-gray-400 truncate">{user.department} • {user.position}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-6 flex justify-end gap-3 mt-2 border-t border-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button 
            disabled={selectedUsers.length === 0}
            className="px-6 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-black transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Selected Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignUserDialog;