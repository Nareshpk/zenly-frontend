import {
    ArrowLeft,
    CheckCircle,
    Clock,
    MapPin,
    Phone,
    Printer,
    Truck,
    User
} from "lucide-react";
import { useState } from "react";
import DocumentsTab from "./DocumentsTab";
import MedicalDetailsTab from "./MedicalDetailsTab";
import NotesTab from "./NotesTab";
import TimelineTab from "./TimelineTab";

type CallStatus = "Pending" | "In Progress" | "Completed";
type TabKey = "timeline" | "medical" | "notes" | "documents";

const StatusBadge = ({ status }: { status: CallStatus }) => {
    const styles: Record<CallStatus, string> = {
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
};

export default function AmbulanceCallDetails() {
    const [activeTab, setActiveTab] = useState<TabKey>("timeline");
    return (
        <div className="p-6 space-y-6">

            {/* ================= HEADER ================= */}
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-md border hover:bg-gray-100">
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-xl font-semibold">Ambulance Call Details</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Call ID: AC001</span>
                        <StatusBadge status="Completed" />
                    </div>
                </div>
            </div>

            {/* ================= SUMMARY + PATIENT INFO (SAME ROW) ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ================= LEFT ================= */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Call Summary */}
                    <Card title="Call Summary">
                        <div className="grid grid-cols-2 gap-6 text-sm">
                            <Info label="Date & Time" value="2023-04-22 08:30 AM" />
                            <Info label="Ambulance" value="AMB-001" icon={<Truck size={14} />} />
                            <Info label="Reason" value="Chest Pain" />
                            <Info label="Driver" value="Michael Johnson" />
                            <Info label="Hospital" value="Memorial Hospital" />
                            <Info label="Paramedic" value="Sarah Wilson" />
                            <Info label="Priority" value="High" />
                            <Info
                                label="Response Time"
                                value="12 minutes"
                                icon={<Clock size={14} />}
                            />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button className="btn-outline">
                                <Printer size={14} /> Print Report
                            </button>
                            <button className="btn-primary">
                                <CheckCircle size={14} /> Complete Call
                            </button>
                        </div>
                    </Card>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="space-y-6">
                    {/* Patient Info */}
                    <Card title="Patient Information">
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <User size={14} />
                                <span className="font-medium">John Doe</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} />
                                +1 (555) 123-4567
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin size={14} className="mt-0.5" />
                                123 Main St, Anytown, NY 10001
                            </div>
                        </div>
                    </Card>

                    {/* Map */}
                    <Card title="Live Location">
                        <div className="h-64 w-full rounded-md overflow-hidden border">
                            <iframe
                                title="map"
                                className="w-full h-full"
                                src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            />
                        </div>

                        <button className="mt-3 w-full border rounded-md py-2 text-sm hover:bg-gray-50">
                            Get Directions
                        </button>
                    </Card>
                </div>
            </div>


            {/* ================= TABS ================= */}
            <div className="space-y-6">
                {/* Tabs */}
                <div className="flex gap-2 text-sm border-b pb-2">
                    {[
                        { key: "timeline", label: "Timeline" },
                        { key: "medical", label: "Medical Details" },
                        { key: "notes", label: "Notes" },
                        { key: "documents", label: "Documents" },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as TabKey)}
                            className={`px-4 py-1.5 rounded-md ${activeTab === tab.key
                                ? "bg-gray-100 font-medium"
                                : "text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === "timeline" && <TimelineTab />}
                {activeTab === "medical" && <MedicalDetailsTab />}
                {activeTab === "notes" && <NotesTab />}
                {activeTab === "documents" && <DocumentsTab />}

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button className="px-4 py-2 border rounded-md flex items-center gap-2">
                        ✏️ Edit Call
                    </button>
                    <button className="px-4 py-2 border rounded-md flex items-center gap-2">
                        🖨 Print Report
                    </button>
                    <button className="px-4 py-2 bg-gray-400 text-white rounded-md flex items-center gap-2">
                        ✔ Complete Call
                    </button>
                </div>
            </div>


        </div>
    );
}

function Card({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold">{title}</h2>
            {children}
        </div>
    );
}

function Info({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon?: React.ReactNode;
}) {
    return (
        <div>
            <div className="text-gray-500 text-xs mb-1">{label}</div>
            <div className="flex items-center gap-2 font-medium">
                {icon}
                {value}
            </div>
        </div>
    );
}
