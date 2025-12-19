import React, { useState } from 'react';
import { X, Calendar, Clock, FileText, Printer, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

type HistoryTab = 'Attendance Log' | 'Time Edits' | 'Notes';

interface AttendanceHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  staffName: string;
  role: string;
  dept: string;
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ isOpen, onClose, staffName, role, dept }) => {
  const [activeTab, setActiveTab] = useState<HistoryTab>('Attendance Log');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Attendance History</h2>
              <p className="text-sm text-gray-400 mt-1">
                Viewing attendance history for {staffName} ({role} - {dept})
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
          </div>

          {/* Sub-Tabs */}
          <div className="flex gap-2 mt-8">
            {(['Attendance Log', 'Time Edits', 'Notes'] as HistoryTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                  activeTab === tab 
                  ? 'bg-white border-slate-900 text-slate-900 shadow-sm' 
                  : 'bg-gray-100 border-transparent text-gray-400 hover:bg-gray-200'
                }`}
              >
                {tab === 'Attendance Log' && <Calendar size={16} />}
                {tab === 'Time Edits' && <Clock size={16} />}
                {tab === 'Notes' && <FileText size={16} />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto flex-1 bg-white">
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase tracking-wider font-bold">
                {activeTab === 'Attendance Log' && (
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Check In</th>
                    <th className="px-6 py-4">Check Out</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Hours</th>
                    <th className="px-6 py-4">Notes</th>
                  </tr>
                )}
                {activeTab === 'Time Edits' && (
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Field</th>
                    <th className="px-6 py-4">Old Value</th>
                    <th className="px-6 py-4">New Value</th>
                    <th className="px-6 py-4">Edited By</th>
                    <th className="px-6 py-4">Reason</th>
                  </tr>
                )}
                {activeTab === 'Notes' && (
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Note</th>
                    <th className="px-6 py-4">Added By</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* 1. ATTENDANCE LOG VIEW */}
                {activeTab === 'Attendance Log' && [
                  { d: '2023-05-15', in: '08:45 AM', out: '05:30 PM', s: 'Present', h: 8.75, n: '-' },
                  { d: '2023-05-12', in: '09:20 AM', out: '05:45 PM', s: 'Late', h: 8.42, n: 'Traffic delay reported' },
                  { d: '2023-05-09', in: '-', out: '-', s: 'Absent', h: 0, n: 'Sick leave' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-slate-700">{row.d}</td>
                    <td className="px-6 py-4 text-gray-500"><span className="flex items-center gap-2"><Clock size={14} className="text-gray-300"/>{row.in}</span></td>
                    <td className="px-6 py-4 text-gray-500"><span className="flex items-center gap-2"><Clock size={14} className="text-gray-300"/>{row.out}</span></td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1.5 ${
                        row.s === 'Present' ? 'bg-emerald-500 text-white' : 
                        row.s === 'Late' ? 'bg-orange-500 text-white' : 'bg-rose-500 text-white'
                      }`}>
                        {row.s === 'Present' ? <CheckCircle2 size={10}/> : row.s === 'Late' ? <AlertCircle size={10}/> : <XCircle size={10}/>}
                        {row.s}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{row.h}</td>
                    <td className="px-6 py-4 text-xs text-gray-400 italic flex items-center gap-2">
                      {row.n !== '-' && <FileText size={12}/>} {row.n}
                    </td>
                  </tr>
                ))}

                {/* 2. TIME EDITS VIEW */}
                {activeTab === 'Time Edits' && [
                  { d: '2023-05-12', f: 'Check In', old: '09:30 AM', new: '09:20 AM', by: 'Lisa Thompson', r: 'Corrected time - system error' },
                  { d: '2023-05-10', f: 'Check Out', old: '05:30 PM', new: '04:30 PM', by: 'Lisa Thompson', r: 'Approved early departure' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-medium">{row.d}</td>
                    <td className="px-6 py-4 text-gray-600">{row.f}</td>
                    <td className="px-6 py-4 text-rose-400 line-through">{row.old}</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">{row.new}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700 font-bold text-xs">{row.by}</div>
                      <div className="text-[10px] text-gray-400">2023-05-12 10:15 AM</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{row.r}</td>
                  </tr>
                ))}

                {/* 3. NOTES VIEW */}
                {activeTab === 'Notes' && [
                  { d: '2023-05-12', t: 'General', n: 'Traffic delay reported by employee', by: 'Lisa Thompson' },
                  { d: '2023-05-10', t: 'Approval', n: 'Approved early departure for medical appointment', by: 'Dr. William Smith' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-medium">{row.d}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold">{row.t}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.n}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700 font-bold text-xs">{row.by}</div>
                      <div className="text-[10px] text-gray-400">09:45 AM</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-white border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm font-bold text-slate-700 hover:bg-gray-50">
            Close
          </button>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black transition-colors">
            <Printer size={16} /> Print History
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;