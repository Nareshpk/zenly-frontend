import {
    ArrowLeft,
    User,
    Printer,
    Download,
    Edit,
    Sparkles,
    Wrench,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- TYPES ---------------- */
type Tab = "Patient History" | "Maintenance History" | "Cleaning History";

/* ---------------- PAGE ---------------- */
export default function RoomDetailsPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("Patient History");

    return (
        <div className="p-6 space-y-6 bg-slate-50/30 min-h-screen">
            {/* ---------------- HEADER ---------------- */}
            <div className="flex justify-between items-start">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-2"
                    >
                        <ArrowLeft size={16} />
                        Back to Rooms by Department
                    </button>

                    <h1 className="text-2xl font-bold">Room 101 Details</h1>
                    <p className="text-sm text-gray-500">
                        Cardiology Department • 1st Floor • East Wing
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600">
                        Discharge Patient
                    </button>
                    <button onClick={() => navigate("/admin/rooms/edit-room-details")} className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2">
                        <Edit size={16} /> Edit Room
                    </button>
                    <button className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2">
                        <Printer size={16} /> Print
                    </button>
                    <button className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* ---------------- INFO GRID ---------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ROOM INFORMATION */}
                <Card title="Room Information">
                    <InfoGrid
                        items={[
                            { label: "Room Number", value: "101" },
                            { label: "Room Type", value: "Private" },
                            { label: "Department", value: "Cardiology" },
                            {
                                label: "Status",
                                value: (
                                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-bold">
                                        Occupied
                                    </span>
                                ),
                            },
                        ]}
                    />

                    <div className="mt-4 space-y-2">
                        <Label>Room Features</Label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Private Bathroom",
                                "Window View",
                                "TV",
                                "WiFi",
                                "Nurse Call System",
                            ].map((f) => (
                                <span
                                    key={f}
                                    className="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold"
                                >
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <Label>Last Cleaned</Label>
                            <Value>Apr 25, 2023, 10:30 AM</Value>
                        </div>
                        <div>
                            <Label>Last Maintenance</Label>
                            <Value>Mar 15, 2023, 02:00 PM</Value>
                        </div>
                    </div>
                </Card>

                {/* CURRENT PATIENT */}
                <Card title="Current Patient">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User size={20} className="text-gray-500" />
                        </div>
                        <div>
                            <p className="font-semibold">John Smith</p>
                            <p className="text-xs text-gray-500">45 years • Male</p>
                        </div>
                    </div>

                    <Divider />

                    <InfoGrid
                        items={[
                            {
                                label: "Admission Date",
                                value: "Apr 20, 2023, 09:15 AM",
                            },
                            {
                                label: "Attending Physician",
                                value: "Dr. Emily Chen",
                            },
                            {
                                label: "Diagnosis",
                                value: "Acute Myocardial Infarction",
                            },
                        ]}
                    />

                    <Divider />

                    <InfoGrid
                        items={[
                            {
                                label: "Contact Number",
                                value: "+1 (555) 123-4567",
                            },
                            {
                                label: "Emergency Contact",
                                value: "Mary Smith (+1 (555) 987-6543)",
                            },
                        ]}
                    />

                    <div className="mt-4 text-right">
                        <button className="text-sm font-semibold text-slate-700 hover:underline">
                            View Full Patient Profile
                        </button>
                    </div>
                </Card>
            </div>

            {/* ---------------- TABS ---------------- */}
            <div className="bg-gray-100 p-1 rounded-xl w-fit">
                {(["Patient History", "Maintenance History", "Cleaning History"] as Tab[]).map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition
                ${activeTab === tab
                                    ? "bg-white shadow"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    )
                )}
            </div>

            {/* ---------------- TAB CONTENT ---------------- */}
            {activeTab === "Patient History" && <PatientHistory />}
            {activeTab === "Maintenance History" && <MaintenanceHistoryTab />}
            {activeTab === "Cleaning History" && <CleaningHistoryTab />}
        </div>
    );
}

/* ---------------- SUB COMPONENTS ---------------- */

function Card({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4">{title}</h3>
            {children}
        </div>
    );
}

function InfoGrid({
    items,
}: {
    items: { label: string; value: React.ReactNode }[];
}) {
    return (
        <div className="grid grid-cols-2 gap-4 text-sm">
            {items.map((i) => (
                <div key={i.label}>
                    <Label>{i.label}</Label>
                    <Value>{i.value}</Value>
                </div>
            ))}
        </div>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return <p className="text-xs text-gray-500">{children}</p>;
}

function Value({ children }: { children: React.ReactNode }) {
    return <p className="font-medium">{children}</p>;
}

function Divider() {
    return <div className="my-4 border-t" />;
}

/* ---------------- PATIENT HISTORY TABLE ---------------- */
function PatientHistory() {
    const rows = [
        {
            date: "Apr 20, 2023, 09:15 AM",
            event: "Patient Admitted",
            staff: "Dr. Emily Chen",
            notes: "Patient admitted with chest pain and shortness of breath.",
        },
        {
            date: "Apr 21, 2023, 11:30 AM",
            event: "Medication Change",
            staff: "Dr. Emily Chen",
            notes: "Started on beta blockers and aspirin.",
        },
        {
            date: "Apr 22, 2023, 02:45 PM",
            event: "Procedure",
            staff: "Dr. James Wilson",
            notes: "Coronary angiography performed.",
        },
        {
            date: "Apr 24, 2023, 10:00 AM",
            event: "Consultation",
            staff: "Dr. Lisa Wong",
            notes: "Cardiology consultation with Dr. Lisa Wong.",
        },
    ];

    return (
        <Card title="Patient Room History">
            <p className="text-sm text-gray-500 mb-4">
                History of events for the current patient in this room
            </p>

            <table className="w-full text-left text-sm">
                <thead className="border-b text-gray-400">
                    <tr>
                        <th className="py-3">Date & Time</th>
                        <th>Event</th>
                        <th>Staff</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <td className="py-3">{r.date}</td>
                            <td>{r.event}</td>
                            <td>{r.staff}</td>
                            <td>{r.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}

export function MaintenanceHistoryTab() {
    const maintenance = [
        {
            date: "Mar 15, 2023, 02:00 PM",
            type: "Routine Maintenance",
            staff: "Maintenance Team",
            notes: "Checked electrical outlets and nurse call system.",
        },
        {
            date: "Feb 10, 2023, 09:30 AM",
            type: "Repair",
            staff: "Plumbing Team",
            notes: "Fixed leaking faucet in bathroom.",
        },
        {
            date: "Jan 5, 2023, 11:15 AM",
            type: "Inspection",
            staff: "Facility Management",
            notes: "Annual safety inspection completed.",
        },
    ];

    return (
        <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <Wrench size={18} /> Maintenance History
            </h3>
            <p className="text-sm text-gray-500 mb-6">
                Record of maintenance activities for this room
            </p>

            <table className="w-full text-sm">
                <thead className="text-gray-400 border-b">
                    <tr>
                        <th className="text-left py-3">Date & Time</th>
                        <th className="text-left py-3">Type</th>
                        <th className="text-left py-3">Staff</th>
                        <th className="text-left py-3">Notes</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {maintenance.map((m, i) => (
                        <tr key={i}>
                            <td className="py-4">{m.date}</td>
                            <td className="py-4 font-medium">{m.type}</td>
                            <td className="py-4">{m.staff}</td>
                            <td className="py-4 text-gray-600">{m.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function CleaningHistoryTab() {
    const cleaning = [
        {
            date: "Apr 25, 2023, 10:30 AM",
            type: "Daily Cleaning",
            staff: "Housekeeping Staff",
            notes: "Standard daily cleaning performed.",
        },
        {
            date: "Apr 24, 2023, 10:15 AM",
            type: "Daily Cleaning",
            staff: "Housekeeping Staff",
            notes: "Standard daily cleaning performed.",
        },
        {
            date: "Apr 23, 2023, 11:00 AM",
            type: "Deep Cleaning",
            staff: "Housekeeping Team",
            notes: "Weekly deep cleaning of all surfaces and bathroom.",
        },
    ];

    return (
        <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles size={18} /> Cleaning History
            </h3>
            <p className="text-sm text-gray-500 mb-6">
                Record of cleaning activities for this room
            </p>

            <table className="w-full text-sm">
                <thead className="text-gray-400 border-b">
                    <tr>
                        <th className="text-left py-3">Date & Time</th>
                        <th className="text-left py-3">Type</th>
                        <th className="text-left py-3">Staff</th>
                        <th className="text-left py-3">Notes</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {cleaning.map((c, i) => (
                        <tr key={i}>
                            <td className="py-4">{c.date}</td>
                            <td className="py-4 font-medium">{c.type}</td>
                            <td className="py-4">{c.staff}</td>
                            <td className="py-4 text-gray-600">{c.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
