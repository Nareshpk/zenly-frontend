import {
    Calendar,
    ChevronLeft, ChevronRight,
    Clock,
    Plus
} from 'lucide-react';
import React, { useState } from 'react';

type ViewMode = 'Day' | 'Week' | 'Month';

const AppointmentSchedule: React.FC = () => {
    const [view, setView] = useState<ViewMode>('Day');

    // Sample data for the Day view
    const dayAppointments = [
        { id: '1', time: '9:30 AM - 10:00 AM', name: 'John Smith', idNum: 'PT001', type: 'Follow-up', status: 'Confirmed' },
        { id: '2', time: '10:15 AM - 11:00 AM', name: 'Emily Johnson', idNum: 'PT045', type: 'Consultation', status: 'Confirmed' },
        { id: '3', time: '11:30 AM - 12:00 PM', name: 'Michael Brown', idNum: 'PT023', type: 'Check-up', status: 'Cancelled' },
    ];

    // Helper for Month View (Generating 35 cells as seen in your screenshot)
    const monthDays = Array.from({ length: 35 }, (_, i) => i + 1);

    return (
        <div className="flex min-h-screen bg-gray-50 p-8 font-sans text-slate-800">
            {/* Sidebar - Reusing your previous logic */}
            <aside className="w-64 flex-shrink-0">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                            <img src="https://via.placeholder.com/150" alt="Dr. Johnson" className="object-cover" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight">Dr. Sarah Johnson</h2>
                            <p className="text-gray-500 text-sm">Cardiologist</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-700">Regular Hours</h3>
                        <ul className="text-sm space-y-2 text-gray-600">
                            <li className="flex justify-between"><span>Monday:</span> <span>9:00 AM - 5:00 PM</span></li>
                            <li className="flex justify-between"><span>Tuesday:</span> <span>9:00 AM - 5:00 PM</span></li>
                            <li className="flex justify-between text-slate-400 italic"><span>Saturday:</span> <span>Off</span></li>
                        </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">Today's Stats</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span>Total Appointments:</span> <span className="font-bold bg-blue-50 px-2 rounded">6</span></div>
                            <div className="flex justify-between"><span>Confirmed:</span> <span className="font-bold text-green-600 bg-green-50 px-2 rounded">4</span></div>
                            <div className="flex justify-between text-red-500"><span>Cancelled:</span> <span className="font-bold bg-red-50 px-2 rounded text-red-600">1</span></div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 ml-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Appointment Schedule</h1>
                        <p className="text-gray-500 text-sm">View and manage appointments</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white border rounded-lg"><ChevronLeft size={18} /></button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm">
                            <Calendar size={16} /> June 12, 2023
                        </button>
                        <button className="p-2 bg-white border rounded-lg"><ChevronRight size={18} /></button>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-lg w-full mb-6 border">
                    {(['Day', 'Week', 'Month'] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setView(mode)}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${view === mode ? 'bg-white shadow-sm' : 'text-gray-500'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                {/* Dynamic Content Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-gray-800 text-lg">
                        {view === 'Day' && "Monday, June 12, 2023"}
                        {view === 'Week' && "Week of June 12 - June 18, 2023"}
                        {view === 'Month' && "June 2023"}
                    </h2>
                    <button className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm">
                        <Plus size={18} /> Add Appointment
                    </button>
                </div>

                {/* --- VIEW RENDERING --- */}

                {/* 1. DAY VIEW */}
                {view === 'Day' && (
                    <div className="space-y-4">
                        {dayAppointments.map((apt) => (
                            <div key={apt.id} className="bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm">
                                <div className="flex gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-semibold"><Clock size={16} /> {apt.time}</div>
                                        <span className="px-3 py-0.5 bg-gray-100 rounded-full text-xs">{apt.type}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{apt.name}</h4>
                                        <p className="text-gray-400 text-xs mt-1">Patient ID: {apt.idNum}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'Confirmed' ? 'bg-black text-white' : 'bg-red-50 text-red-600'}`}>
                                    {apt.status}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. WEEK VIEW */}
                {view === 'Week' && (
                    <div className="grid grid-cols-7 gap-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <div key={day} className="bg-white border rounded-xl p-3 min-h-[200px] shadow-sm">
                                <p className="font-bold text-sm mb-3">{day}</p>
                                <div className="space-y-2">
                                    <div className="bg-indigo-50 border border-indigo-100 p-2 rounded text-[10px] font-medium leading-tight text-indigo-900">
                                        9:30 AM - 10:00 AM - <br />John Smith
                                    </div>
                                    <div className="bg-indigo-50 border border-indigo-100 p-2 rounded text-[10px] font-medium leading-tight text-indigo-900">
                                        10:15 AM - 11:00 AM - <br />Emily Johnson
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. MONTH VIEW */}
                {view === 'Month' && (
                    <div className="grid grid-cols-7 gap-3">
                        {monthDays.map((day) => (
                            <div key={day} className="bg-white border border-gray-100 rounded-lg p-3 h-28 shadow-sm flex flex-col justify-between">
                                <span className="text-sm font-semibold text-gray-700">{day}</span>
                                {day < 31 && (
                                    <div className="bg-indigo-100 text-indigo-900 text-[10px] p-1.5 rounded font-medium">
                                        9:30 AM - 10:00 AM
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AppointmentSchedule;