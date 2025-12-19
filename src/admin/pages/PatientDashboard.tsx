import {
    Calendar,
    CreditCard,
    FileText,
    Pill
} from "lucide-react";
import { useState } from "react";
import PatientOverviewTab from "../tabs/PatientOverviewTab";
import PatientAppointmentsTab from "../tabs/PatientAppointmentsTab";
import PatientMedicationsTab from "../tabs/PatientMedicationsTab";
import PatientRecordsTab from "../tabs/PatientRecordsTab";
import PatientVitalsTab from "../tabs/PatientVitalsTab";

/* ---------------- COMPONENT ---------------- */
const tabs = ["Overview", "Appointments", "Medications", "Records", "Vitals"] as const;
type TabType = typeof tabs[number];

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>("Overview");
    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Welcome back, Sarah
                    </h1>
                    <p className="text-sm text-gray-500">
                        Your health dashboard – manage your care all in one place
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 border rounded-md text-sm">
                        Message Doctor
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
                        Book Appointment
                    </button>
                </div>
            </div>

            {/* ================= TOP CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <TopCard
                    icon={<Calendar />}
                    title="Next Appointment"
                    value="Tomorrow"
                    subtitle="10:30 AM with Dr. Johnson"
                    action="View details →"
                />
                <TopCard
                    icon={<Pill />}
                    title="Medications"
                    value="3 Active"
                    subtitle="Next dose in 2 hours"
                    action="View all medications →"
                />
                <TopCard
                    icon={<FileText />}
                    title="Test Results"
                    value="2 New"
                    subtitle="Blood work from 05/12"
                    action="View results →"
                />
                <TopCard
                    icon={<CreditCard />}
                    title="Billing"
                    value="$45.00"
                    subtitle="Due in 15 days"
                    action="Make payment →"
                />
            </div>

            {/* ================= TABS ================= */}
            <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-md text-sm transition ${activeTab === tab
                            ? "bg-gray-100 font-medium text-black"
                            : "text-gray-500 hover:bg-gray-50"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Overview" && <PatientOverviewTab />}
            {activeTab === "Appointments" && <PatientAppointmentsTab />}
            {activeTab === "Medications" && <PatientMedicationsTab />}
            {activeTab === "Records" && <PatientRecordsTab />}
            {activeTab === "Vitals" && <PatientVitalsTab />}


        </div>
    );
}

/* ================= REUSABLE COMPONENTS ================= */

function TopCard({ icon, title, value, subtitle, action }: any) {
    return (
        <div className="bg-white border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
            </div>
            <div className="font-medium">{title}</div>
            <div className="text-xl font-bold mt-1">{value}</div>
            <div className="text-xs text-gray-500">{subtitle}</div>
            <button className="text-sm text-blue-600 mt-2">{action}</button>
        </div>
    );
}


