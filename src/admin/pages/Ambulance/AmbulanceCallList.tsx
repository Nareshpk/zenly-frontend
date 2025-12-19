import {
    Plus,
    Search,
    Eye,
    User,
    Truck,
    MoreVertical,
    Clock,
    PhoneCall,
    Ambulance,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


interface AmbulanceCall {
    id: string;
    date: string;
    time: string;
    patient: string;
    phone: string;
    location: string;
    reason: string;
    status: CallStatus;
    ambulanceId: string;
    driver: string;
}

const calls: AmbulanceCall[] = [
    {
        id: "AC001",
        date: "2023-04-22",
        time: "08:30 AM",
        patient: "John Doe",
        phone: "+1 (555) 123-4567",
        location: "123 Main St, Anytown",
        reason: "Chest Pain",
        status: "Completed",
        ambulanceId: "AMB-001",
        driver: "Michael Johnson",
    },
    {
        id: "AC002",
        date: "2023-04-22",
        time: "09:45 AM",
        patient: "Jane Smith",
        phone: "+1 (555) 987-6543",
        location: "456 Oak Ave, Somewhere",
        reason: "Traffic Accident",
        status: "In Progress",
        ambulanceId: "AMB-003",
        driver: "Robert Davis",
    },
    {
        id: "AC003",
        date: "2023-04-22",
        time: "11:15 AM",
        patient: "Emily Johnson",
        phone: "+1 (555) 456-7890",
        location: "789 Pine Rd, Elsewhere",
        reason: "Difficulty Breathing",
        status: "Pending",
        ambulanceId: "AMB-002",
        driver: "Sarah Wilson",
    },
];

type CallStatus = "All" | "Pending" | "In Progress" | "Completed";
export default function AmbulanceCallList() {
    const [activeStatus, setActiveStatus] = useState<CallStatus>("All");
    const filteredCalls =
        activeStatus === "All"
            ? calls
            : calls.filter((call) => call.status === activeStatus);
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Ambulance Call List</h1>
                    <p className="text-sm text-gray-500">
                        Manage and track all ambulance calls and dispatches
                    </p>
                </div>

                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    <Plus size={16} /> New Ambulance Call
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
                <StatCard
                    title="Total Calls"
                    value="127"
                    sub="+5.2% from last month"
                    icon={<Ambulance size={22} />}
                />
                <StatCard
                    title="Active Calls"
                    value="3"
                    sub="2 pending, 1 in progress"
                    icon={<PhoneCall size={22} />}
                />
                <StatCard
                    title="Average Response Time"
                    value="8.5 min"
                    sub="-1.2 min from last month"
                    icon={<Clock size={22} />}
                />
            </div>

            {/* Calls Table */}
            <div className="bg-white border rounded-xl p-6 space-y-4">
                <div>
                    <h2 className="font-semibold text-lg">Ambulance Calls</h2>
                    <p className="text-sm text-gray-500">
                        View and manage all ambulance calls and dispatches
                    </p>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                placeholder="Search calls..."
                                className="pl-9 pr-3 py-2 border rounded-lg text-sm w-64"
                            />
                        </div>

                        <div className="flex gap-2 text-sm">
                            {(["All", "Pending", "In Progress", "Completed"] as CallStatus[]).map(
                                (status) => (
                                    <button
                                        key={status}
                                        onClick={() => setActiveStatus(status)}
                                        className={`px-3 py-1 rounded-md border transition
          ${activeStatus === status
                                                ? "bg-gray-100 font-medium border-gray-300"
                                                : "hover:bg-gray-50"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <select className="border rounded-lg px-3 py-2 text-sm">
                            <option>All Statuses</option>
                        </select>
                        <select className="border rounded-lg px-3 py-2 text-sm">
                            <option>Today</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="h-full">
                    <table className="w-full h-full text-sm">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="text-left py-3">Call ID</th>
                                <th className="text-left py-3">Date & Time</th>
                                <th className="text-left py-3">Patient</th>
                                <th className="text-left py-3">Location</th>
                                <th className="text-left py-3">Reason</th>
                                <th className="text-left py-3">Status</th>
                                <th className="text-left py-3">Ambulance</th>
                                <th />
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCalls.map((call) => (
                                <tr key={call.id} className="border-b">
                                    <td className="py-4 font-medium">{call.id}</td>

                                    <td className="py-4">
                                        <div>{call.date}</div>
                                        <div className="text-xs text-gray-500">{call.time}</div>
                                    </td>

                                    <td className="py-4">
                                        <div>{call.patient}</div>
                                        <div className="text-xs text-gray-500">{call.phone}</div>
                                    </td>

                                    <td className="py-4">{call.location}</td>
                                    <td className="py-4">{call.reason}</td>

                                    <td className="py-4">
                                        <StatusBadge status={call.status} />
                                    </td>

                                    <td className="py-4">
                                        <div>{call.ambulanceId}</div>
                                        <div className="text-xs text-gray-500">
                                            {call.driver}
                                        </div>
                                    </td>

                                    <td className="py-4 text-right">
                                        <ActionMenu />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ---------- Components ---------- */

function StatCard({
    title,
    value,
    sub,
    icon,
}: {
    title: string;
    value: string;
    sub: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="bg-white border rounded-xl p-6 flex justify-between">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-semibold mt-2">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
            <div className="text-gray-400">{icon}</div>
        </div>
    );
}

function StatusBadge({ status }: { status: CallStatus }) {
    const styles: Record<any, string> = {
        Pending: "bg-gray-100 text-gray-700",
        "In Progress": "bg-gray-100 text-gray-700",
        Completed: "bg-black text-white",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
        >
            {status}
        </span>
    );
}

function ActionMenu() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded hover:bg-gray-100"
            >
                <MoreVertical size={16} />
            </button>

            {/* Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                    <button onClick={() => navigate("/admin/ambulance-details")} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                        <Eye size={14} /> View Details
                    </button>

                    <button onClick={() => navigate("/admin/patient-details")} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                        <User size={14} /> View Patient
                    </button>

                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                        <Truck size={14} /> View Ambulance
                    </button>

                    <button className="w-full px-4 py-2 text-sm hover:bg-gray-100">
                        Print Report
                    </button>
                </div>
            )}
        </div>
    );
}