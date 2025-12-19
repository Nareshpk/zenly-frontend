import React from 'react';
import { Download, Eye } from 'lucide-react';

// --- Types ---
type AuditAction = 'Permission Added' | 'Permission Removed' | 'Role Created';

interface AuditLog {
  id: string;
  timestamp: string;
  role: string;
  action: AuditAction;
  module: string;
  permission: string;
  user: string;
}

const LOGS: AuditLog[] = [
  { id: '1', timestamp: '2023-11-15 09:23:45', role: 'Administrator', action: 'Permission Added', module: 'Reports', permission: 'delete', user: 'System Admin' },
  { id: '2', timestamp: '2023-11-14 14:12:30', role: 'Doctor', action: 'Permission Removed', module: 'Billing', permission: 'edit', user: 'Dr. Sarah Johnson' },
  { id: '3', timestamp: '2023-11-10 11:05:22', role: 'Senior Doctor', action: 'Role Created', module: 'All', permission: 'N/A', user: 'Dr. Sarah Johnson' },
  { id: '4', timestamp: '2023-11-08 16:45:10', role: 'Nurse', action: 'Permission Added', module: 'Patients', permission: 'edit', user: 'Dr. Michael Chen' },
  { id: '5', timestamp: '2023-11-05 10:30:15', role: 'Receptionist', action: 'Permission Removed', module: 'Billing', permission: 'create', user: 'System Admin' },
];

// --- Sub-component: Action Badge ---
const ActionBadge = ({ action }: { action: AuditAction }) => {
  const styles = {
    'Permission Added': 'bg-zinc-900 text-white',
    'Permission Removed': 'bg-red-500 text-white',
    'Role Created': 'bg-white border border-gray-200 text-gray-900',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${styles[action]}`}>
      {action}
    </span>
  );
};

const PermissionAuditLogs = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permission Audit Logs</h1>
          <p className="text-sm text-gray-500">Track changes to roles and permissions</p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-white transition bg-white shadow-sm">
          <Download className="w-4 h-4" /> Export Logs
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-50">
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Module</th>
              <th className="px-6 py-4">Permission</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5 text-gray-500 font-mono text-xs">{log.timestamp}</td>
                <td className="px-6 py-5 text-gray-700 font-medium">{log.role}</td>
                <td className="px-6 py-5">
                  <ActionBadge action={log.action} />
                </td>
                <td className="px-6 py-5 text-gray-700">{log.module}</td>
                <td className="px-6 py-5 text-gray-700 font-medium">{log.permission}</td>
                <td className="px-6 py-5 text-gray-700 font-medium">{log.user}</td>
                <td className="px-6 py-5 text-right">
                  <button className="inline-flex items-center gap-2 text-gray-900 font-bold hover:underline transition">
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionAuditLogs;