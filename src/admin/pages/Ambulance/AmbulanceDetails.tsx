import { useState } from "react";
import AmbulanceOverviewTab from "./AmbulanceOverviewTab";
import AmbulanceMaintenanceTab from "./AmbulanceMaintenanceTab";
import AmbulanceEquipmentTab from "./AmbulanceEquipmentTab";
import AmbulanceCallAssignmentsTab from "./AmbulanceCallAssignmentsTab";


type TabKey = "overview" | "maintenance" | "equipment" | "calls";

export default function AmbulanceDetails() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Ambulances</span> / 
          <span className="font-semibold text-black">AMB-002</span>
          <span className="px-2 py-0.5 bg-black text-white rounded-full text-xs">
            Available
          </span>
        </div>

        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-md text-sm">
            Schedule Maintenance
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
            Update Status
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Status" value="Available" sub="Last updated: Today, 9:30 AM" />
        <StatCard title="Last Maintenance" value="2023-04-02" sub="Next: 2023-07-02" />
        <StatCard title="Total Calls" value="42" sub="4 calls this month" />
        <StatCard title="Current Driver" value="Sarah Wilson" sub="Assigned since April 1, 2023" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 text-sm">
        <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
          Overview
        </TabButton>
        <TabButton active={activeTab === "maintenance"} onClick={() => setActiveTab("maintenance")}>
          Maintenance
        </TabButton>
        <TabButton active={activeTab === "equipment"} onClick={() => setActiveTab("equipment")}>
          Equipment
        </TabButton>
        <TabButton active={activeTab === "calls"} onClick={() => setActiveTab("calls")}>
          Call Assignments
        </TabButton>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <AmbulanceOverviewTab />}
      {activeTab === "maintenance" && <AmbulanceMaintenanceTab />}
      {activeTab === "equipment" && <AmbulanceEquipmentTab />}
      {activeTab === "calls" && <AmbulanceCallAssignmentsTab />}
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function StatCard({ title, value, sub }: any) {
  return (
    <div className="border rounded-xl p-5 space-y-1">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

function TabButton({ active, children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md border text-sm ${
        active ? "bg-black text-white" : "bg-white"
      }`}
    >
      {children}
    </button>
  );
}
