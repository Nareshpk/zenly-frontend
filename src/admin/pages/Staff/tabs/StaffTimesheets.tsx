import React from 'react';
import { 
  Calendar, 
  Filter, 
  Plus, 
  Eye, 
  Search,
  ChevronDown
} from 'lucide-react';

interface TimesheetRecord {
  id: string;
  name: string;
  avatar: string;
  department: string;
  weekStarting: string;
  totalHours: number;
  overtime: number;
  status: 'Approved' | 'Pending Approval';
}

const StaffTimesheets: React.FC = () => {
  const timesheets: TimesheetRecord[] = [
    { id: '1', name: 'Dr. Sarah Johnson', avatar: 'SJ', department: 'Medical', weekStarting: 'May 15, 2023', totalHours: 42.5, overtime: 2.5, status: 'Pending Approval' },
    { id: '2', name: 'Nurse Emma Wilson', avatar: 'EW', department: 'Nursing', weekStarting: 'May 15, 2023', totalHours: 40.0, overtime: 0.0, status: 'Approved' },
    { id: '3', name: 'James Rodriguez', avatar: 'JR', department: 'Laboratory', weekStarting: 'May 15, 2023', totalHours: 38.5, overtime: 0.0, status: 'Approved' },
    { id: '4', name: 'Dr. Michael Chen', avatar: 'MC', department: 'Medical', weekStarting: 'May 8, 2023', totalHours: 45.0, overtime: 5.0, status: 'Approved' },
    { id: '5', name: 'Lisa Thompson', avatar: 'LT', department: 'Administration', weekStarting: 'May 8, 2023', totalHours: 39.5, overtime: 0.0, status: 'Approved' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Header Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-900">Staff Timesheets</h2>
        <p className="text-sm text-gray-400">View and manage staff working hours</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Calendar size={16} className="text-gray-400" />
            This Week
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter size={16} className="text-gray-400" />
            Department
          </button>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-shadow shadow-md shadow-indigo-100">
          <Plus size={18} /> Add Timesheet
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider font-bold border-b border-gray-100">
              <th className="px-6 py-4">Staff</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Week Starting</th>
              <th className="px-6 py-4">Total Hours</th>
              <th className="px-6 py-4">Overtime</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {timesheets.map((sheet) => (
              <tr key={sheet.id} className="hover:bg-gray-50/50 transition-colors group">
                {/* Staff Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-700">
                      {sheet.avatar}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{sheet.name}</span>
                  </div>
                </td>

                {/* Department */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {sheet.department}
                </td>

                {/* Week Starting */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {sheet.weekStarting}
                </td>

                {/* Total Hours */}
                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  {sheet.totalHours.toFixed(1)}
                </td>

                {/* Overtime */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {sheet.overtime.toFixed(1)}
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  {sheet.status === 'Approved' ? (
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                      Approved
                    </span>
                  ) : (
                    <span className="bg-white border border-gray-300 text-gray-400 px-3 py-1 rounded-full text-[10px] font-bold inline-flex items-center">
                      Pending Approval
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors text-sm font-medium">
                    <Eye size={16} />
                    View
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

export default StaffTimesheets;