import {
    AlertCircle,
    ArrowLeft,
    Filter,
    Search,
    UserCheck,
    UserMinus,
    UserX
} from 'lucide-react';
import React from 'react';
import StaffAttendanceSystem from './Viewpage/StaffAttendanceSystem';

interface AttendanceStat {
    title: string;
    count: number;
    total?: number;
    subtext: string;
    trend: string;
    color: string;
    icon: React.ReactNode;
    progress: number;
}

const StaffAttendance: React.FC = () => {
    const stats: AttendanceStat[] = [
        {
            title: "Present Today",
            count: 5,
            total: 8,
            subtext: "Out of 8 staff members",
            trend: "+2%",
            color: "text-green-500",
            progress: 62.5,
            icon: <UserCheck className="text-green-600" size={24} />
        },
        {
            title: "Absent Today",
            count: 1,
            subtext: "Unplanned above requests",
            trend: "-1%",
            color: "text-red-500",
            progress: 15,
            icon: <UserX className="text-red-600" size={24} />
        },
        {
            title: "On Leave",
            count: 1,
            subtext: "Planned leave today",
            trend: "0%",
            color: "text-blue-500",
            progress: 15,
            icon: <UserMinus className="text-blue-600" size={24} />
        },
        {
            title: "Late Arrivals",
            count: 1,
            subtext: "More than 30 minutes late",
            trend: "-3%",
            color: "text-amber-500",
            progress: 30,
            icon: <AlertCircle className="text-amber-600" size={24} />
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-800">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold">Staff Attendance</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-bold text-gray-800">{stat.title}</h3>
                            <div className={`p-3 rounded-full ${stat.color.replace('text', 'bg')}/10`}>
                                {stat.icon}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="text-4xl font-bold">{stat.count}</div>

                            <div className="space-y-2">
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${stat.color.replace('text', 'bg')}`}
                                        style={{ width: `${stat.progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-gray-400 uppercase tracking-wider">{stat.subtext}</span>
                                    <span className={stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Staff Table Section */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Detailed Report</h2>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search staff..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>

                {/* <AttendancePage /> */}
                <StaffAttendanceSystem/>
            </div>
        </div>
    );
};

export default StaffAttendance;