import { MoreVertical } from "lucide-react";
import { useState } from "react";

/* ================= TAB ================= */

export default function AmbulanceCallAssignmentsTab() {
    return (
        <div className="border rounded-xl p-6">
            <h2 className="text-lg font-semibold">Call Assignments</h2>
            <p className="text-sm text-gray-500 mb-4">
                History of calls this ambulance has been assigned to
            </p>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="border-b text-gray-500">
                        <tr>
                            <th className="text-left py-3">ID</th>
                            <th className="text-left">Date & Time</th>
                            <th className="text-left">Patient</th>
                            <th className="text-left">Location</th>
                            <th className="text-left">Reason</th>
                            <th className="text-left">Duration</th>
                            <th className="text-left">Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <CallRow
                            id="CA001"
                            date="2023-04-18"
                            time="14:30"
                            patient="John Doe"
                            location="123 Main St, Anytown"
                            reason="Chest Pain"
                            duration="45 min"
                        />

                        <CallRow
                            id="CA002"
                            date="2023-04-15"
                            time="09:15"
                            patient="Jane Smith"
                            location="456 Oak Ave, Somewhere"
                            reason="Traffic Accident"
                            duration="1 hr 20 min"
                        />

                        <CallRow
                            id="CA003"
                            date="2023-04-10"
                            time="18:45"
                            patient="Robert Johnson"
                            location="789 Pine Rd, Elsewhere"
                            reason="Stroke Symptoms"
                            duration="55 min"
                        />

                        <CallRow
                            id="CA004"
                            date="2023-04-05"
                            time="11:30"
                            patient="Emily Davis"
                            location="321 Elm St, Nowhere"
                            reason="Allergic Reaction"
                            duration="40 min"
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ================= ROW ================= */

function CallRow({
    id,
    date,
    time,
    patient,
    location,
    reason,
    duration,
}: any) {
    return (
        <tr className="border-b last:border-none">
            <td className="py-4 font-medium">{id}</td>

            <td>
                <div className="font-medium">{date}</div>
                <div className="text-xs text-gray-500">{time}</div>
            </td>

            <td>{patient}</td>
            <td>{location}</td>
            <td>{reason}</td>
            <td>{duration}</td>

            <td>
                <StatusBadge />
            </td>

            <td className="text-right">
                <RowActions />
            </td>
        </tr>
    );
}

/* ================= STATUS ================= */

function StatusBadge() {
    return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-black text-white">
            Completed
        </span>
    );
}

/* ================= ACTION MENU ================= */

function RowActions() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded hover:bg-gray-100"
            >
                <MoreVertical size={16} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <ActionItem label="View Call Details" />
                    <ActionItem label="View Patient" />
                    <ActionItem label="Print Report" />
                </div>
            )}
        </div>
    );
}

function ActionItem({ label }: { label: string }) {
    return (
        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
            {label}
        </button>
    );
}
