import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    Clock,
    Download,
    FileDown,
    FileText, History,
    MoreHorizontal,
    Plus,
    Printer,
    XCircle
} from 'lucide-react';
import React, { useState } from 'react';
import AddNoteDialog from '../Modal/AddNoteDialog';
import AttendanceHistory from '../Modal/AttendanceHistory';
import EditAttendanceDialog from '../Modal/EditAttendanceDialog';
import LeaveRequestDialog from '../Modal/LeaveRequestDialog';
import StaffTimesheets from '../tabs/StaffTimesheets';
interface StaffRecord {
    id: string;
    name: string;
    avatar: string;
    department: string;
    role: string;
    checkIn: string;
    checkOut: string;
    hours: number;
    status: 'Present' | 'Absent' | 'Late';
}


type TabType = 'Daily Attendance' | 'Calendar View' | 'Timesheets' | 'Leave Requests' | 'Reports';

const StaffAttendanceSystem: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalHistoryOpen, setIsModalHistoryOpen] = useState(false);
    const [isModalLeaveOpen, setIsModalLeaveOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('Daily Attendance');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const staffData: StaffRecord[] = [
        { id: '1', name: 'Dr. Sarah Johnson', avatar: 'SJ', department: 'Medical', role: 'Cardiologist', checkIn: '08:45 AM', checkOut: '05:30 PM', hours: 8.75, status: 'Present' },
        { id: '2', name: 'Dr. Michael Chen', avatar: 'MC', department: 'Medical', role: 'Neurologist', checkIn: '09:15 AM', checkOut: '06:00 PM', hours: 8.75, status: 'Present' },
        { id: '3', name: 'Nurse Emma Wilson', avatar: 'EW', department: 'Nursing', role: 'Head Nurse', checkIn: '08:00 AM', checkOut: '04:30 PM', hours: 8.5, status: 'Present' },
        { id: '4', name: 'James Rodriguez', avatar: 'JR', department: 'Laboratory', role: 'Lab Technician', checkIn: '08:30 AM', checkOut: '05:00 PM', hours: 8.5, status: 'Present' },
        { id: '5', name: 'Lisa Thompson', avatar: 'LT', department: 'Administration', role: 'Receptionist', checkIn: '08:55 AM', checkOut: '05:15 PM', hours: 8.33, status: 'Present' },
    ];
    // --- DATA MOCKS ---
    const staffRecords = [
        { id: '1', name: 'Dr. Sarah Johnson', dept: 'Medical', role: 'Cardiologist', in: '08:45 AM', out: '05:30 PM', hours: 8.75, status: 'Present' },
        { id: '2', name: 'Dr. Michael Chen', dept: 'Medical', role: 'Neurologist', in: '09:15 AM', out: '06:00 PM', hours: 8.75, status: 'Present' },
        { id: '3', name: 'Nurse Emma Wilson', dept: 'Nursing', role: 'Head Nurse', in: '08:00 AM', out: '04:30 PM', hours: 8.5, status: 'Present' },
    ];

    const leaveRequests = [
        { id: '1', name: 'Dr. Sarah Johnson', type: 'Vacation', duration: '7 days', dates: '2023-06-10 to 2023-06-17', status: 'Approved' },
        { id: '2', name: 'Nurse Emma Wilson', type: 'Sick Leave', duration: '2 days', dates: '2023-05-20 to 2023-05-22', status: 'Pending' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-800">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors"><ArrowLeft size={20} /></button>
                    <h1 className="text-2xl font-bold">Staff Attendance</h1>
                </div>
                <div className="flex gap-2">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <Clock size={16} /> Record Time
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-medium">
                        <FileDown size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-6 mb-8 text-sm border-b overflow-x-auto whitespace-nowrap">
                {['Daily Attendance', 'Calendar View', 'Timesheets', 'Leave Requests', 'Reports'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as TabType)}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === tab ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />}
                    </button>
                ))}
            </div>

            {/* --- TAB CONTENT RENDERING --- */}

            {/* 1. DAILY ATTENDANCE RECORD */}
            {activeTab === 'Daily Attendance' && (
                <div className="border rounded-xl shadow-sm overflow-visible">
                    <div className="p-6 flex justify-between items-center border-b">
                        <h2 className="text-xl font-bold">Daily Attendance Record</h2>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium"><Printer size={14} /> Print</button>
                            <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium"><FileText size={14} /> Export CSV</button>
                        </div>
                    </div>

                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Staff</th>
                                <th className="px-6 py-4 font-semibold">Department</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold text-center">Check In</th>
                                <th className="px-6 py-4 font-semibold text-center">Check Out</th>
                                <th className="px-6 py-4 font-semibold">Hours</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 relative">
                            {staffData.map((staff) => (
                                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-700">
                                                {staff.avatar}
                                            </div>
                                            <span className="text-sm font-semibold">{staff.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{staff.department}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{staff.role}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-center">
                                        <span className="flex items-center justify-center gap-1.5"><Clock size={14} className="text-gray-300" /> {staff.checkIn}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-center">
                                        <span className="flex items-center justify-center gap-1.5"><Clock size={14} className="text-gray-300" /> {staff.checkOut}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">{staff.hours}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Present
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <button
                                            onClick={() => setActiveMenu(activeMenu === staff.id ? null : staff.id)}
                                            className="text-gray-300 hover:text-gray-600 transition-colors"
                                        >
                                            <MoreHorizontal size={20} />
                                        </button>

                                        {/* ACTION MENU POPUP */}
                                        {activeMenu === staff.id && (
                                            <div className="absolute right-6 top-12 w-40 bg-white border border-gray-100 shadow-xl rounded-xl z-50 py-2">
                                                <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b mb-1">Actions</div>
                                                <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                    <Clock size={16} className="text-gray-400" /> Edit Time
                                                </button>
                                                <button onClick={() => setIsModalAddOpen(true)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                    <FileText size={16} className="text-gray-400" /> Add Note
                                                </button>
                                                <button onClick={() => setIsModalHistoryOpen(true)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                    <History size={16} className="text-gray-400" /> View History
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 2. MONTHLY CALENDAR VIEW */}
            {activeTab === 'Calendar View' && (
                <div className="bg-white border rounded-xl p-6 shadow-sm overflow-x-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Monthly Attendance Calendar</h2>
                        <div className="flex items-center gap-2">
                            <button className="p-1 border rounded"><ArrowLeft size={16} /></button>
                            <span className="text-sm font-bold px-2">May 2023</span>
                            <button className="p-1 border rounded"><ChevronDown className="-rotate-90" size={16} /></button>
                        </div>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-800 text-white text-[10px]">
                                <th className="p-4 text-left border-r border-slate-700">Staff</th>
                                {Array.from({ length: 31 }, (_, i) => (
                                    <th key={i} className="p-2 border-r border-slate-700 font-normal">{i + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {staffRecords.map(staff => (
                                <tr key={staff.id} className="border-b">
                                    <td className="p-4 flex items-center gap-2 border-r bg-slate-50">
                                        <div className="w-6 h-6 rounded-full bg-white border text-[8px] flex items-center justify-center font-bold">SJ</div>
                                        <span className="text-xs font-semibold text-slate-600">{staff.name}</span>
                                    </td>
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <td key={i} className="p-2 border-r text-center">
                                            <CheckCircle2 size={14} className="text-emerald-500 mx-auto" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-6 flex justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Present</div>
                        <div className="flex items-center gap-2"><XCircle size={14} className="text-rose-500" /> Absent</div>
                        <div className="flex items-center gap-2"><AlertCircle size={14} className="text-amber-500" /> Late</div>
                    </div>
                </div>
            )}
            {activeTab === 'Timesheets' && (<StaffTimesheets />)}

            {/* 3. LEAVE REQUESTS */}
            {activeTab === 'Leave Requests' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Leave Requests</h2>
                            <p className="text-sm text-gray-500">Manage staff leave and time off requests</p>
                        </div>
                        <button onClick={() => setIsModalLeaveOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                            <Plus size={18} /> New Request
                        </button>
                    </div>
                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Staff</th>
                                    <th className="px-6 py-4">Leave Type</th>
                                    <th className="px-6 py-4">Duration</th>
                                    <th className="px-6 py-4">Dates</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leaveRequests.map(request => (
                                    <tr key={request.id} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 text-sm font-semibold">{request.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{request.type}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{request.duration}</td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{request.dates}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${request.status === 'Approved' ? 'bg-emerald-500 text-white' : 'bg-white border text-gray-400'
                                                }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4"><MoreHorizontal size={18} className="text-gray-300" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 4. ATTENDANCE REPORTS */}
            {activeTab === 'Reports' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Attendance Reports</h2>
                            <p className="text-sm text-gray-500">Generate and view comprehensive attendance reports</p>
                        </div>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-indigo-100 shadow-lg">
                            <Download size={16} /> Export Report
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border rounded-xl p-6 shadow-sm">
                            <h3 className="text-gray-300 font-bold text-lg mb-6">Attendance Summary</h3>
                            <div className="space-y-3 text-sm font-medium">
                                <div className="flex justify-between"><span>Present:</span> <span>92%</span></div>
                                <div className="flex justify-between"><span>Absent:</span> <span>3%</span></div>
                                <div className="flex justify-between"><span>On Leave:</span> <span>4%</span></div>
                            </div>
                        </div>
                        <div className="bg-white border rounded-xl p-6 shadow-sm">
                            <h3 className="text-gray-300 font-bold text-lg mb-6">Department Breakdown</h3>
                            <div className="space-y-3 text-sm font-medium">
                                <div className="flex justify-between"><span>Medical:</span> <span>95% present</span></div>
                                <div className="flex justify-between"><span>Nursing:</span> <span>90% present</span></div>
                                <div className="flex justify-between"><span>Administration:</span> <span>93% present</span></div>
                            </div>
                        </div>
                        <div className="bg-white border rounded-xl p-6 shadow-sm">
                            <h3 className="text-gray-300 font-bold text-lg mb-6">Leave Statistics</h3>
                            <div className="space-y-3 text-sm font-medium">
                                <div className="flex justify-between"><span>Vacation:</span> <span>45%</span></div>
                                <div className="flex justify-between"><span>Sick Leave:</span> <span>30%</span></div>
                                <div className="flex justify-between"><span>Personal:</span> <span>15%</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800 text-white border rounded-xl p-20 shadow-sm text-center">
                        <p className="text-gray-400 text-sm">Attendance trend chart would be displayed here</p>
                    </div>
                </div>
            )}
            <EditAttendanceDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} staffName={"Naresh"} />
            <AddNoteDialog isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} staffName={"Naresh"} />
            <AttendanceHistory isOpen={isModalHistoryOpen} onClose={() => setIsModalHistoryOpen(false)} staffName={"Naresh"} role={"Cardiologist"} dept={"Medical"} />
            <LeaveRequestDialog isOpen={isModalLeaveOpen} onClose={() => setIsModalLeaveOpen(false)} />
        </div>
    );
};

export default StaffAttendanceSystem;