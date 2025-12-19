import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import PersonalInformationForm from "./DoctorPage/DoctorForm/PersonalInformationForm";
import AddDoctorProfessionalDetails from "./DoctorPage/DoctorForm/AddDoctorProfessionalDetails";
import AddDoctorAccountSettings from "./DoctorPage/DoctorForm/AddDoctorAccountSettings";

export default function AddDoctorPersonalInfo() {
    const [activeTab, setActiveTab] = useState<
        "personal" | "professional" | "account"
    >("personal");

    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}
            <div className="flex items-center gap-3">
                <button className="border rounded-md p-2">
                    <ArrowLeft size={16} />
                </button>
                <div>
                    <h1 className="text-xl font-semibold">Add Doctor</h1>
                    <p className="text-sm text-gray-500">
                        Add a new doctor to your clinic.
                    </p>
                </div>
            </div>

            {/* ================= TABS ================= */}
            <div className="flex gap-2 text-sm">
                <TabButton
                    active={activeTab === "personal"}
                    onClick={() => setActiveTab("personal")}
                >
                    Personal Information
                </TabButton>
                <TabButton
                    active={activeTab === "professional"}
                    onClick={() => setActiveTab("professional")}
                >
                    Professional Details
                </TabButton>
                <TabButton
                    active={activeTab === "account"}
                    onClick={() => setActiveTab("account")}
                >
                    Account Settings
                </TabButton>
            </div>

            {/* ================= FORM ================= */}
            {activeTab === "personal" && <PersonalInformationForm />}
            {activeTab === "professional" && <AddDoctorProfessionalDetails />}
            {activeTab === "account" && <AddDoctorAccountSettings />}

            {/* ================= ACTIONS ================= */}
            <div className="flex justify-end gap-3">
                <button className="px-4 py-2 border rounded-md">
                    Cancel
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-md">
                    Save Doctor
                </button>
            </div>
        </div>
    );
}

/* ================= PERSONAL INFO FORM ================= */


/* ================= REUSABLE COMPONENTS ================= */


function TabButton({
    active,
    children,
    onClick,
}: {
    active: boolean;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 rounded-md text-sm ${active
                    ? "bg-gray-100 font-medium"
                    : "text-gray-500"
                }`}
        >
            {children}
        </button>
    );
}
