import {
    Calendar,
    MoreHorizontal,
    Plus,
    Search,
    Filter,
    Edit3,
    Eye,
    LogOut,
    Printer
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DischargePatientDialog from "./DischargePatientDialog";

interface RoomAllotment {
    id: string;
    patient: string;
    patientId: string;
    room: string;
    roomType: string;
    department: string;
    date: string;
    status: "Occupied" | "Discharged";
    doctor: string;
}

export default function AllottedRoomsPage() {
    const [showDischarge, setShowDischarge] = useState(false);
    const [records] = useState<RoomAllotment[]>([
        { id: "RA-001", patient: "John Smith", patientId: "P-1001", room: "301", roomType: "Private", department: "Cardiology", date: "2023-04-15", status: "Occupied", doctor: "Dr. Emily Chen" },
        { id: "RA-002", patient: "Sarah Johnson", patientId: "P-1002", room: "205", roomType: "Semi-Private", department: "Orthopedics", date: "2023-04-16", status: "Occupied", doctor: "Dr. Michael Brown" },
        { id: "RA-003", patient: "Robert Davis", patientId: "P-1003", room: "102", roomType: "General", department: "Neurology", date: "2023-04-10", status: "Discharged", doctor: "Dr. Lisa Wong" },
        { id: "RA-004", patient: "Maria Garcia", patientId: "P-1004", room: "405", roomType: "ICU", department: "Pulmonology", date: "2023-04-17", status: "Occupied", doctor: "Dr. James Wilson" },
        { id: "RA-005", patient: "David Lee", patientId: "P-1005", room: "210", roomType: "Semi-Private", department: "Gastroenterology", date: "2023-04-12", status: "Discharged", doctor: "Dr. Sarah Miller" },
    ]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">Allotted Rooms</h1>
                    <p className="text-sm text-gray-500">Manage and track all room allotments</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-primary flex items-center gap-2">
                        <Plus size={16} /> New Allotment
                    </button>
                    <button className="btn-outline p-2">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Rooms" value="120" />
                <StatCard title="Occupied" value="78" />
                <StatCard title="Available" value="42" />
                <StatCard title="Occupancy Rate" value="65%" />
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between gap-4 w-full">
                {/* Left side: Search + Date */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative w-[320px]">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            placeholder="Search by patient, room..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm
                   focus:outline-none focus:ring-2 focus:ring-black/5"
                        />
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl
                    text-sm text-gray-700 whitespace-nowrap">
                        <Calendar size={16} className="text-gray-400" />
                        Dec 18, 2025 - Dec 18, 2025
                    </div>
                </div>

                {/* Right side: Filters */}
                <div className="flex items-center gap-3">
                    {/* Filter label */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                        <Filter size={16} className="text-gray-400" />
                        Filter by:
                    </div>

                    <select className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white
                       focus:outline-none">
                        <option>All Statuses</option>
                    </select>

                    <select className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white
                       focus:outline-none">
                        <option>All Departments</option>
                    </select>

                    <select className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white
                       focus:outline-none">
                        <option>All Types</option>
                    </select>
                </div>
            </div>





            {/* Table */}
            <div className="bg-white border rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-xs uppercase text-gray-400">
                            <th className="px-6 py-4">Allotment ID</th>
                            <th className="px-6 py-4">Patient</th>
                            <th className="px-6 py-4">Room</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Allotment Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Doctor</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {records.map(r => (
                            <tr key={r.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-semibold">{r.id}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">{r.patient}</div>
                                    <div className="text-xs text-gray-500">{r.patientId}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">{r.room}</div>
                                    <div className="text-xs text-gray-500">{r.roomType}</div>
                                </td>
                                <td className="px-6 py-4">{r.department}</td>
                                <td className="px-6 py-4">{r.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${r.status === "Occupied" ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{r.doctor}</td>
                                <td className="px-6 py-4 text-right">
                                    <ActionMenu setShowDischarge={setShowDischarge} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DischargePatientDialog
                open={showDischarge}
                onClose={() => setShowDischarge(false)}
                onConfirm={() => {
                    // discharge logic here
                    setShowDischarge(false);
                }}
            />
        </div>
    );
}

/* ---------------- Components ---------------- */

const StatCard = ({ title, value }: any) => (
    <div className="bg-white border rounded-xl p-6">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
);


const ActionMenu = ({ setShowDischarge }: any) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative" ref={ref}>
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-lg hover:bg-gray-100"
            >
                <MoreHorizontal size={18} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200
                        rounded-xl shadow-lg z-50 overflow-hidden">

                    <MenuItem icon={<Eye size={16} />} label="View Details" setShowDischarge={setShowDischarge} />
                    <MenuItem icon={<Edit3 size={16} />} label="Edit Allotment" setShowDischarge={setShowDischarge} />
                    <MenuItem
                        icon={<LogOut size={16} />}
                        label="Discharge Patient"
                        danger
                        setShowDischarge={setShowDischarge}
                    />
                    <MenuItem icon={<Printer size={16} />} label="Print Details" setShowDischarge={setShowDischarge} />
                </div>
            )}
        </div>
    );
};

const MenuItem = ({
    icon,
    label,
    danger = false,
    setShowDischarge
}: {
    icon: React.ReactNode;
    label: string;
    danger?: boolean;
    setShowDischarge?: any
}) => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        if (label === "View Details") {
            navigate("/admin/rooms/room-allotment-details");
        } else if (label === "Discharge Patient") {
            setShowDischarge(true)
        } else if (label === "Edit Allotment") {
            navigate("/admin/rooms/edit-room-allotment-details");
        }
    }
    return (<button onClick={handleNavigate}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
      ${danger
                ? "text-red-600 hover:bg-red-50"
                : "text-gray-700 hover:bg-gray-50"
            }`}
    >
        <span className="text-gray-400">{icon}</span>
        {label}
    </button>)
};
