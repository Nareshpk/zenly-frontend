import { useState } from "react";
import DoctorCard from "../DoctorForm/DoctorCard";

import AppointmentsTab from "../DoctorForm/AppointmentsTab";
import OverviewTab from "../DoctorForm/OverviewTab";
import PatientsTab from "../DoctorForm/PatientsTab";
import PerformanceTab from "../DoctorForm/PerformanceTab";
import Tabs from "../DoctorForm/Tabs";

/* ---------------------------------- TYPES ---------------------------------- */
type Tab = "overview" | "appointments" | "patients" | "performance";

/* -------------------------------- COMPONENT -------------------------------- */
export default function DoctorProfile() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-xl font-semibold">Doctor Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT PROFILE CARD */}
        <DoctorCard />

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "appointments" && <AppointmentsTab />}
          {activeTab === "patients" && <PatientsTab />}
          {activeTab === "performance" && <PerformanceTab />}
        </div>
      </div>
    </div>
  );
}
