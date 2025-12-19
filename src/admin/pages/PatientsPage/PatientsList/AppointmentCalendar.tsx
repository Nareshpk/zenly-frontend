/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Appointment } from "../../../type/calendarTypes";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";


const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    patientName: "John Smith",
    doctorName: "Dr. Sarah Johnson",
    date: "2025-12-16",
    startTime: "10:00",
    endTime: "10:30",
    type: "Check-up",
    status: "Confirmed",
  },
  {
    id: "2",
    patientName: "Emily Davis",
    doctorName: "Dr. Michael Chen",
    date: "2025-12-16",
    startTime: "11:30",
    endTime: "12:15",
    type: "Consultation",
    status: "In Progress",
  },
  {
    id: "3",
    patientName: "Robert Wilson",
    doctorName: "Dr. Lisa Patel",
    date: "2025-12-16",
    startTime: "14:15",
    endTime: "14:35",
    type: "Follow-up",
    status: "Completed",
  },
];

export default function AppointmentCalendar() {
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [currentDate, setCurrentDate] = useState("2025-12-16");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Appointment Calendar</h1>
          <p className="text-gray-500">
            View and manage appointments in calendar view.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="btn">Today</button>
          <button className="btn">◀</button>
          <button className="btn">▶</button>
          <span className="font-medium">{currentDate}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 rounded-lg">
          {["day", "week", "month"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === v
                  ? "bg-white shadow"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <select className="input">
            <option>All Doctors</option>
          </select>
          <button className="btn-primary">+ New</button>
        </div>
      </div>

      {/* Views */}
      {view === "day" && (
        <DayView date={currentDate} appointments={MOCK_APPOINTMENTS} />
      )}
      {view === "week" && (
        <WeekView date={currentDate} appointments={MOCK_APPOINTMENTS} />
      )}
      {view === "month" && (
        <MonthView date={currentDate} appointments={MOCK_APPOINTMENTS} />
      )}
    </div>
  );
}
