/* eslint-disable react-hooks/exhaustive-deps */
import { Calendar, MoreVertical, Plus, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

type AppointmentStatus =
    | "Confirmed"
    | "In Progress"
    | "Completed"
    | "Cancelled";

interface Appointment {
    id: string;
    patient: string;
    doctor: string;
    date: string;
    time: string;
    type: string;
    duration: string;
    status: AppointmentStatus;
}

/* ================= MOCK DATA ================= */

const APPOINTMENTS: Appointment[] = [
    {
        id: "1",
        patient: "John Smith",
        doctor: "Dr. Sarah Johnson",
        date: "2023-07-15",
        time: "10:00 AM",
        status: "Confirmed",
        type: "Check-up",
        duration: "30 min",
    },
    {
        id: "2",
        patient: "Emily Davis",
        doctor: "Dr. Michael Chen",
        date: "2025-12-16",
        time: "11:30 AM",
        status: "In Progress",
        type: "Consultation",
        duration: "45 min",
    },
    {
        id: "3",
        patient: "Robert Wilson",
        doctor: "Dr. Lisa Patel",
        date: "2025-12-16",
        time: "02:15 PM",
        status: "Completed",
        type: "Follow-up",
        duration: "20 min",
    },
    {
        id: "4",
        patient: "Jessica Brown",
        doctor: "Dr. James Wilson",
        date: "2023-07-25",
        time: "09:00 AM",
        status: "Confirmed",
        type: "Dental Cleaning",
        duration: "60 min",
    },
    {
        id: "5",
        patient: "Sarah Thompson",
        doctor: "Dr. Robert Kim",
        date: "2023-07-10",
        time: "01:45 PM",
        status: "Cancelled",
        type: "Therapy Session",
        duration: "45 min",
    },
];

/* ================= UTIL ================= */

const badgeStyle = (status: AppointmentStatus) => {
    switch (status) {
        case "Confirmed":
            return "border border-blue-500 text-blue-600";
        case "In Progress":
            return "bg-orange-100 text-orange-700";
        case "Completed":
            return "bg-green-100 text-green-700";
        case "Cancelled":
            return "bg-red-100 text-red-700";
    }
};

const isToday = (date: string) =>
    new Date(date).toDateString() === new Date().toDateString();

/* ================= OUTSIDE CLICK ================= */

const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement>,
    close: () => void
) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target as Node)) return;
            close();
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [close]);
};

/* ================= COMPONENT ================= */

export default function AllAppointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] =
        useState<Appointment[]>(APPOINTMENTS);
    const [tab, setTab] = useState("All");
    const [search, setSearch] = useState("");
    const [openId, setOpenId] = useState<string | null>(null);

    const filtered = appointments.filter((a) => {
        if (tab === "Upcoming") return a.status === "Confirmed";
        if (tab === "Today") return isToday(a.date);
        if (tab === "Completed") return a.status === "Completed";
        if (tab === "Cancelled") return a.status === "Cancelled";

        return true;
    });

    const searched = filtered.filter(
        (a) =>
            a.patient.toLowerCase().includes(search.toLowerCase()) ||
            a.doctor.toLowerCase().includes(search.toLowerCase())
    );

    const updateStatus = (id: string, status: AppointmentStatus) => {
        setAppointments((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
        setOpenId(null);
    };

    return (
        <div className="p-6 bg-white rounded-xl border">
            {/* ================= HEADER ================= */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">Appointments</h1>
                    <p className="text-sm text-gray-500">
                        Manage your clinic's appointments and schedules.
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-4">
                        {["All", "Upcoming", "Today", "Completed", "Cancelled"].map(
                            (t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`px-4 py-1.5 rounded-lg text-sm border ${tab === t
                                        ? "bg-gray-100 font-medium"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {t}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex gap-3">
                    <button onClick={()=>navigate("/admin/calendar-view")} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
                        <Calendar size={16} />
                        Calendar View
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm">
                        <Plus size={16} />
                        New Appointment
                    </button>
                </div>
            </div>

            {/* ================= LIST HEADER ================= */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">{tab} Appointments</h2>
                    <p className="text-sm text-gray-500">
                        View and manage all scheduled appointments.
                    </p>
                </div>

                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-2.5 text-gray-400"
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search appointments..."
                        className="pl-9 pr-3 py-2 border rounded-lg text-sm"
                    />
                </div>
            </div>

            {/* ================= TABLE ================= */}
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left border-b text-gray-500">
                        <th className="py-3">Patient</th>
                        <th>Doctor</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Duration</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {searched.map((a) => (
                        <tr key={a.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 font-medium">{a.patient}</td>
                            <td>{a.doctor}</td>
                            <td>
                                <div>{a.date}</div>
                                <div className="text-xs text-gray-500">{a.time}</div>
                            </td>
                            <td>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs ${badgeStyle(
                                        a.status
                                    )}`}
                                >
                                    {a.status}
                                </span>
                            </td>
                            <td>{a.type}</td>
                            <td>{a.duration}</td>
                            <td className="text-right">
                                <ActionMenu
                                    appointment={a}
                                    open={openId === a.id}
                                    onToggle={() =>
                                        setOpenId(openId === a.id ? null : a.id)
                                    }
                                    onClose={() => setOpenId(null)}
                                    onStatusChange={updateStatus}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ================= ACTION MENU ================= */

function ActionMenu({
    appointment,
    open,
    onToggle,
    onClose,
    onStatusChange,
}: {
    appointment: Appointment;
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
    onStatusChange: (id: string, s: AppointmentStatus) => void;
}) {
    const ref: any = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onClose);

    return (
        <div ref={ref} className="relative inline-block">
            <button
                onClick={onToggle}
                className="p-2 rounded hover:bg-gray-100"
            >
                <MoreVertical size={16} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-20">
                    <div className="px-4 py-2 font-medium border-b">Actions</div>

                    <button className="menu-item">View details</button>
                    <button className="menu-item">Edit appointment</button>
                    <button className="menu-item">Reschedule</button>

                    <button
                        className="menu-item"
                        onClick={() =>
                            onStatusChange(appointment.id, "In Progress")
                        }
                    >
                        ✓ Mark as in progress
                    </button>

                    <button
                        className="menu-item text-red-600"
                        onClick={() =>
                            onStatusChange(appointment.id, "Cancelled")
                        }
                    >
                        Cancel appointment
                    </button>
                </div>
            )}
        </div>
    );
}
