import {
    ChevronLeft,
    ChevronRight,
    Plus,
} from "lucide-react";
import { useState } from "react";
import AppointmentList from "../../../tabs/AppointmentList";
import DaySchedule from "../../../tabs/DaySchedule";
import MonthSchedule from "../../../tabs/MonthSchedule";
import WeekSchedule from "../../../tabs/WeekSchedule";


export default function DoctorSchedule() {
    const [view, setView] = useState("Day");

    return (
        <div className="flex gap-6">
            {/* ================= LEFT PANEL ================= */}
            <aside className="w-72 bg-white border rounded-xl p-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Calendar</h3>
                    <p className="text-sm text-gray-500">
                        Select a date to view schedules.
                    </p>
                </div>

                {/* Calendar (static UI) */}
                <div className="border rounded-lg p-3 text-sm">
                    <div className="text-center font-medium mb-2">
                        December 2025
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                            <div key={d}>{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-sm">
                        {Array.from({ length: 31 }, (_, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-md cursor-pointer ${i + 1 === 16
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter */}
                <div>
                    <label className="text-sm font-medium">
                        Filter by Doctor
                    </label>
                    <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm">
                        <option>All Doctors</option>
                        <option>Dr. Sarah Johnson</option>
                        <option>Dr. Michael Chen</option>
                    </select>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-md py-2 text-sm">
                    <Plus size={16} />
                    Add Appointment
                </button>
            </aside>

            {/* ================= RIGHT PANEL ================= */}
            <main className="flex-1 bg-white border rounded-xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="font-semibold text-lg">Doctor Schedule</h2>
                        <p className="text-sm text-gray-500">
                            Manage and view doctor schedules and appointments.
                        </p>
                    </div>
                </div>

                {/* View Tabs */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                        {["Day", "Week", "Month", "List"].map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-3 py-1.5 rounded-md text-sm ${view === v
                                    ? "bg-gray-100 font-medium"
                                    : "text-gray-500"
                                    }`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <button className="border rounded-md p-1">
                            <ChevronLeft size={16} />
                        </button>
                        <span>December 16, 2025</span>
                        <button className="border rounded-md p-1">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Schedule */}
                {view === "Day" && <DaySchedule />}
                {view === "Week" && <WeekSchedule />}
                {view === "Month" && <MonthSchedule />}
                {view === "List" && <AppointmentList />}
                 
            </main>
        </div>
    );
}

/* ================= APPOINTMENT CARD ================= */


