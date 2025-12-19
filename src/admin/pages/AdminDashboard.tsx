import {
  Calendar,
  DollarSign,
  Download,
  Users,
  Users2,
} from "lucide-react";
import { useState } from "react";
import AdminAnalyticsTab from "../tabs/AdminAnalyticsTab";
import AdminNotificationsTab from "../tabs/AdminNotificationsTab";
import AdminOverviewTab from "../tabs/AdminOverviewTab";
import AdminReportsTab from "../tabs/AdminReportsTab";



const tabs = ["Overview", "Analytics", "Reports", "Notifications"] as const;
type TabType = typeof tabs[number];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  return (
    <div className="space-y-6">
      {/* ---------- HEADER ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back, Dr. Johnson! Here's what's happening today.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm">
            Dec 16, 2025 - Dec 16, 2025
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* ---------- STATS CARDS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon={<DollarSign className="text-green-600" />}
        />
        <StatCard
          title="Appointments"
          value="+2,350"
          change="+10.1% from last month"
          icon={<Calendar className="text-blue-600" />}
        />
        <StatCard
          title="Patients"
          value="+12,234"
          change="+19% from last month"
          icon={<Users className="text-orange-500" />}
        />
        <StatCard
          title="Staff"
          value="+573"
          change="+4 new this month"
          icon={<Users2 className="text-purple-600" />}
        />
      </div>

      {/* ---------- TABS ---------- */}
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

      {/* ---------- CONTENT ---------- */}
      {activeTab === "Overview" && <AdminOverviewTab />}
      {activeTab === "Analytics" && <AdminAnalyticsTab />}
      {activeTab === "Reports" && <AdminReportsTab />}
      {activeTab === "Notifications" && <AdminNotificationsTab />}
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">{icon}</div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-xs text-green-600">{change}</p>
      <div className="text-2xl font-bold mt-3">{value}</div>
    </div>
  );
}


