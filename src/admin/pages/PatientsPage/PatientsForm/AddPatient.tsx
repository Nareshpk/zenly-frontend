import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import PatientPersonalInfo from "./PatientPersonalInfo";
// later you can add:
import PatientMedicalInfo from "./PatientMedicalInfo";
import PatientInsuranceBilling from "./PatientInsuranceBilling";

import PatientConsentDocuments from "./PatientConsentDocuments";

const TABS = [
    "Personal Information",
    "Medical Information",
    "Insurance & Billing",
    "Consent & Documents",
];

export default function AddPatient() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button className="p-2 border rounded-md">
                    <ArrowLeft size={16} />
                </button>

                <div>
                    <h1 className="text-xl font-semibold">Add Patient</h1>
                    <p className="text-sm text-gray-500">
                        Register a new patient in your clinic.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm rounded-t-md border-b-2 transition ${activeTab === tab
                            ? "border-black font-medium"
                            : "border-transparent text-gray-500 hover:text-black"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === "Personal Information" && <PatientPersonalInfo />}

                {activeTab === "Medical Information" && (
                    <PatientMedicalInfo />
                )}

                {activeTab === "Insurance & Billing" && <PatientInsuranceBilling />}

                {activeTab === "Consent & Documents" && (
                    <PatientConsentDocuments />
                )}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3">
                <button className="px-4 py-2 border rounded-md text-sm">
                    Cancel
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
                    Register Patient
                </button>
            </div>
        </div>
    );
}
