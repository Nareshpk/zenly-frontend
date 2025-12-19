import React, { useState } from 'react';
import { Search, ListFilter, UserPlus, MoreHorizontal, UserCircle, RefreshCcw, UserMinus } from 'lucide-react';

// --- Types ---
interface AssignedUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  department: string;
  position: string;
  assignedDate: string;
  status: 'Active' | 'Inactive';
}

const MOCK_ASSIGNED_USERS: AssignedUser[] = [
  { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@clinic.com', department: 'Cardiology', position: 'Medical Director', assignedDate: '2023-01-15', status: 'Active' },
  { id: '2', name: 'Michael Chen', email: 'michael.chen@clinic.com', department: 'Administration', position: 'IT Manager', assignedDate: '2023-02-10', status: 'Active' },
  { id: '3', name: 'Emily Rodriguez', email: 'emily.rodriguez@clinic.com', department: 'Administration', position: 'Clinic Manager', assignedDate: '2023-03-05', status: 'Active' },
];

const AssignedUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="p-8 bg-white min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users with Administrator Role</h1>
          <p className="text-sm text-gray-500">Staff members currently assigned to this role</p>
        </div>

        <div className="flex gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-black/5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Filter Button */}
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <ListFilter className="w-5 h-5 text-gray-600" />
          </button>
          {/* Assign User Button */}
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-zinc-800 transition shadow-sm">
            <UserPlus className="w-4 h-4" /> Assign User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="border-t border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              <th className="py-6 pr-4">Name</th>
              <th className="py-6 px-4">Department</th>
              <th className="py-6 px-4">Position</th>
              <th className="py-6 px-4">Assigned Date</th>
              <th className="py-6 px-4">Status</th>
              <th className="py-6 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_ASSIGNED_USERS.map((user) => (
              <tr key={user.id} className="group hover:bg-gray-50/30 transition-colors">
                {/* User Identity */}
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-xs font-bold text-gray-400">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-5 px-4 text-sm text-gray-600 font-medium">{user.department}</td>
                <td className="py-5 px-4 text-sm text-gray-600 font-medium">{user.position}</td>
                <td className="py-5 px-4 text-sm text-gray-500 font-mono">{user.assignedDate}</td>
                
                {/* Status Badge */}
                <td className="py-5 px-4">
                  <span className="bg-black text-white text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tight">
                    {user.status}
                  </span>
                </td>

                {/* Action Menu */}
                <td className="py-5 pl-4 text-right relative">
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                    className="p-1.5 hover:bg-gray-100 rounded-md transition"
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>

                  {openMenuId === user.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-2 text-sm text-left animate-in fade-in zoom-in duration-100">
                        <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Actions</div>
                        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-gray-700 font-semibold">
                          <UserCircle className="w-4 h-4 text-gray-400"/> View Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-gray-700 font-semibold border-b border-gray-50">
                          <RefreshCcw className="w-4 h-4 text-gray-400"/> Change Role
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition text-red-500 font-semibold mt-1">
                          <UserMinus className="w-4 h-4"/> Remove from Role
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedUsersPage;