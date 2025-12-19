import React from 'react';
import { Download, Clock } from 'lucide-react';

// --- Types ---
type HistoryAction = 'Permission Added' | 'Permission Removed' | 'Role Updated';

interface HistoryEntry {
  id: string;
  timestamp: string;
  action: HistoryAction;
  module: string;
  permission: string;
  changedBy: string;
}

const HISTORY_DATA: HistoryEntry[] = [
  { 
    id: '1', 
    timestamp: '2023-11-15 09:23:45', 
    action: 'Permission Added', 
    module: 'Reports', 
    permission: 'delete', 
    changedBy: 'System Admin' 
  },
  { 
    id: '2', 
    timestamp: '2023-10-14 14:12:30', 
    action: 'Permission Removed', 
    module: 'Billing', 
    permission: 'edit', 
    changedBy: 'Dr. Sarah Johnson' 
  },
  { 
    id: '3', 
    timestamp: '2023-09-10 11:05:22', 
    action: 'Role Updated', 
    module: 'All', 
    permission: 'N/A', 
    changedBy: 'Dr. Sarah Johnson' 
  },
];

const ChangeHistoryPage = () => {
  return (
    <div className="p-8 bg-white min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Change History</h1>
          <p className="text-sm text-gray-500">Record of changes made to this role</p>
        </div>
        
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition shadow-sm">
          <Download className="w-4 h-4" /> Export History
        </button>
      </div>

      {/* History Table */}
      <div className="border-t border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              <th className="py-6 pr-4">Timestamp</th>
              <th className="py-6 px-4">Action</th>
              <th className="py-6 px-4">Module</th>
              <th className="py-6 px-4">Permission</th>
              <th className="py-6 pl-4">Changed By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {HISTORY_DATA.map((entry) => (
              <tr key={entry.id} className="group hover:bg-gray-50/30 transition-colors">
                {/* Timestamp with technical styling */}
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Clock className="w-3.5 h-3.5 text-gray-300" />
                    {entry.timestamp}
                  </div>
                </td>

                {/* Action Badge - Conditional Styling */}
                <td className="py-5 px-4">
                  <span className={`
                    px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight
                    ${entry.action === 'Permission Added' ? 'bg-black text-white' : ''}
                    ${entry.action === 'Permission Removed' ? 'bg-red-500 text-white' : ''}
                    ${entry.action === 'Role Updated' ? 'bg-white border border-gray-200 text-gray-900' : ''}
                  `}>
                    {entry.action}
                  </span>
                </td>

                <td className="py-5 px-4 text-sm text-gray-600 font-medium">{entry.module}</td>
                
                {/* Permission specific text */}
                <td className="py-5 px-4">
                  <span className={`text-sm font-mono ${entry.permission === 'N/A' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {entry.permission}
                  </span>
                </td>

                <td className="py-5 pl-4 text-sm font-bold text-gray-800">
                  {entry.changedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChangeHistoryPage;