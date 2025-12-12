import { useState } from "react";
import Awards from "./ProfileSubPage/Awards";
import BasicDetails from "./ProfileSubPage/BasicDetails";
import BusinessHours from "./ProfileSubPage/BusinessHours";
import Clinics from "./ProfileSubPage/Clinics";
import Education from "./ProfileSubPage/Education";
import Experience from "./ProfileSubPage/Experience";
import Insurances from "./ProfileSubPage/Insurances";


export default function ProfileSettings() {
    const [activeTab, setActiveTab] = useState<string>("Basic Details");



    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Profile Settings</h2>

            {/* Tabs */}
            <div className="mb-6">
                <div className="bg-white rounded-lg shadow-sm p-3 flex gap-3 flex-wrap">
                    {["Basic Details", "Experience", "Education", "Awards", "Insurances", "Clinics", "Business Hours"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === t ? "bg-blue-500 text-white shadow" : "text-slate-600 bg-transparent border border-transparent hover:bg-slate-100"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content card */}
            {activeTab === "Basic Details" && (
                <BasicDetails />
            )}
            {activeTab === "Experience" && (
                <Experience />
            )}
            {activeTab === "Education" && (
                <Education />
            )}
            {activeTab === "Awards" && (
                <Awards />
            )}
            {activeTab === "Insurances" && (
                <Insurances />
            )}
            {activeTab === "Clinics" && (
                <Clinics />
            )}
            {activeTab === "Business Hours" && (
                <BusinessHours />
            )}
        </div>
    );
}
