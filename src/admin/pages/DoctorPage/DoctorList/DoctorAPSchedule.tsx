import {
    ArrowLeft
} from "lucide-react";
import { useState } from "react";
import CalendarView from "../DoctorForm/CalendarView";
import DayView from "../DoctorForm/DayView";
import ListView from "../DoctorForm/ListView";
import ViewTabs from "../DoctorForm/ViewTabs";
import AppointmentsHeader from "./AppointmentsHeader";
import DoctorAPSidebar from "./DoctorAPSidebar";

type View = "list" | "day" | "calendar";

export default function DoctorAPSchedule() {
    const [view, setView] = useState<View>("list");

    return (
        <div className="p-2">
            {/* Header */}
            <div>
                <button className="flex items-center gap-2 text-sm mb-2">
                    <ArrowLeft size={16} />
                </button>
                <h1 className="text-xl font-semibold">Doctor Schedule</h1>
                <p className="text-sm text-gray-500">
                    Manage schedule and appointments for Dr. Sarah Johnson
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <DoctorAPSidebar />

                <div className="lg:col-span-3 space-y-6">
                    <AppointmentsHeader />
                    <ViewTabs view={view} setView={setView} />

                    {view === "list" && <ListView />}
                    {view === "day" && <DayView />}
                    {view === "calendar" && <CalendarView />}
                </div>
            </div>
        </div>
    );
}

