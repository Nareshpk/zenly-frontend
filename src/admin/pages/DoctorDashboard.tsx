import {
    Calendar,
    FileText,
    Users,
    ClipboardList,
} from "lucide-react";
import ScheduleTab from "../tabs/ScheduleTab";
import PatientsTab from "../tabs/PatientsTab";
import TasksTab from "../tabs/TasksTab";
import StatsTab from "../tabs/StatsTab";
import { useState } from "react";

const tabs = ["Schedule", "Patients", "Tasks", "Stats"] as const;
type TabType = typeof tabs[number];

export default function DoctorDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>("Schedule");
    return (
        <div className="space-y-6">
            {/* ---------------- HEADER ---------------- */}
            <div>
                <h1 className="text-2xl font-semibold">
                    Welcome back, Dr. Sarah
                </h1>
                <p className="text-sm text-gray-500">
                    Here's what's happening with your patients today.
                </p>
            </div>

            {/* ---------------- STATS CARDS ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    icon={<Calendar />}
                    title="Appointments"
                    count="12"
                    subtitle="Today's consultations"
                    badge="3 urgent"
                    badgeColor="text-red-500"
                    link="View Schedule"
                    border="border-blue-200"
                />

                <StatCard
                    icon={<FileText />}
                    title="Pending Reports"
                    count="7"
                    subtitle="Lab results awaiting review"
                    badge="2 ready"
                    badgeColor="text-green-500"
                    link="Review Reports"
                    border="border-green-200"
                />

                <StatCard
                    icon={<Users />}
                    title="Active Patients"
                    count="143"
                    subtitle="Total patient count this week"
                    badge="8 new"
                    badgeColor="text-orange-500"
                    link="Patient Records"
                    border="border-yellow-200"
                />

                <StatCard
                    icon={<ClipboardList />}
                    title="Pending Tasks"
                    count="5"
                    subtitle="Tasks requiring attention"
                    badge="2 high priority"
                    badgeColor="text-red-500"
                    link="View Tasks"
                    border="border-red-200"
                />
            </div>

            {/* ---------------- TABS ---------------- */}
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

            {/* -------- Tab Content -------- */}
            {activeTab === "Schedule" && <ScheduleTab />}
            {activeTab === "Patients" && <PatientsTab />}
            {activeTab === "Tasks" && <TasksTab />}
            {activeTab === "Stats" && <StatsTab />}
            {/* ---------------- MAIN CONTENT ---------------- */}

        </div>
    );
}

function StatCard({
    icon,
    title,
    count,
    subtitle,
    badge,
    badgeColor,
    link,
    border,
}: any) {
    return (
        <div className={`bg-white border rounded-xl p-6 ${border}`}>
            <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
                <span className={`text-xs ${badgeColor}`}>{badge}</span>
            </div>
            <div className="text-2xl font-bold">{count}</div>
            <div className="font-medium">{title}</div>
            <p className="text-xs text-gray-500">{subtitle}</p>
            <button className="text-sm text-blue-600 mt-2">{link}</button>
        </div>
    );
}

/* ---------------- COMPONENTS ---------------- */


