import { useState } from "react";
// import OverviewTab from "./tabs/OverviewTab";
import PatientProfile from "./PatientProfile";
import OverviewTab from "./OverviewTab";
import AppointmentHistoryTab from "./AppointmentHistoryTab";
import PrescriptionsTab from "./PrescriptionsTab";
import LabResultsTab from "./LabResultsTab";
import BillingHistoryTab from "./BillingHistoryTab";

type TabKey =
    | "overview"
    | "appointments"
    | "prescriptions"
    | "labs"
    | "billing";

export default function PatientDetailsPage() {
    const [activeTab, setActiveTab] = useState<TabKey>("overview");

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button className="p-2 border rounded-md">←</button>
                <div>
                    <h1 className="text-xl font-semibold">Patient Details</h1>
                    <p className="text-sm text-gray-500">
                        View and manage patient information.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* LEFT PROFILE */}
                <aside className="col-span-12 lg:col-span-3">
                    <PatientProfile />
                </aside>

                {/* RIGHT CONTENT */}
                <section className="col-span-12 lg:col-span-9 space-y-4">
                    {/* Tabs */}
                    <div className="flex gap-2 text-sm border rounded-lg p-1 bg-gray-50">
                        {[
                            ["overview", "Overview"],
                            ["appointments", "Appointments"],
                            ["prescriptions", "Prescriptions"],
                            ["labs", "Lab Results"],
                            ["billing", "Billing"],
                        ].map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key as TabKey)}
                                className={`px-4 py-1.5 rounded-md ${activeTab === key
                                        ? "bg-white shadow text-black font-medium"
                                        : "text-gray-500"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === "overview" && <OverviewTab />}
                    {activeTab === "appointments" && <AppointmentHistoryTab />}
                    {activeTab === "prescriptions" && <PrescriptionsTab />}
                    {activeTab === "labs" && <LabResultsTab />}
                    {activeTab === "billing" && <BillingHistoryTab />}
                </section>
            </div>
        </div>
    );
}
