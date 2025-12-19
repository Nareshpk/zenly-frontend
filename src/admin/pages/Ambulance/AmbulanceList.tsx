
import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Settings,
  RefreshCw,
  UserPlus,
  Clock,
  Truck,
  Wrench,
  Search,
} from "lucide-react";

type AmbulanceStatus = "Available" | "On Call" | "Maintenance";

interface Ambulance {
  id: string;
  registration: string;
  model: string;
  year: number;
  type: string;
  status: AmbulanceStatus;
  driver: string;
  location: string;
}

const ambulances: Ambulance[] = [
  {
    id: "AMB-001",
    registration: "XYZ-1234",
    model: "Toyota HiAce",
    year: 2021,
    type: "Basic Life Support",
    status: "Available",
    driver: "Michael Johnson",
    location: "Main Hospital",
  },
  {
    id: "AMB-002",
    registration: "ABC-5678",
    model: "Mercedes Sprinter",
    year: 2022,
    type: "Advanced Life Support",
    status: "On Call",
    driver: "Sarah Wilson",
    location: "East Wing",
  },
  {
    id: "AMB-003",
    registration: "DEF-9012",
    model: "Ford Transit",
    year: 2020,
    type: "Basic Life Support",
    status: "Available",
    driver: "Robert Davis",
    location: "North Clinic",
  },
];

function StatusBadge({ status }: { status: AmbulanceStatus }) {
  const styles: Record<AmbulanceStatus, string> = {
    Available: "bg-black text-white",
    "On Call": "bg-gray-100 text-gray-700",
    Maintenance: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AmbulanceList() {
  const [filter, setFilter] = useState<"All" | AmbulanceStatus>("All");

  const filteredAmbulances =
    filter === "All"
      ? ambulances
      : ambulances.filter((a) => a.status === filter);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Ambulance List</h1>
          <p className="text-sm text-gray-500">
            Manage and track all ambulances in the fleet
          </p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
          + Add New Ambulance
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Ambulances"
          value="7"
          subtitle="+1 from last month"
          icon={<Truck />}
        />
        <StatCard
          title="Available Ambulances"
          value="4"
          subtitle="2 on call, 1 in maintenance"
          icon={<Truck />}
        />
        <StatCard
          title="Maintenance Due"
          value="2"
          subtitle="Next scheduled: May 20, 2023"
          icon={<Wrench />}
        />
      </div>

      {/* Fleet Table */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Ambulance Fleet</h2>
            <p className="text-sm text-gray-500">
              View and manage all ambulances in your fleet
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <input
              placeholder="Search ambulances..."
              className="pl-9 pr-3 py-2 border rounded-md text-sm w-64"
            />
          </div>

          <div className="flex gap-2 text-sm">
            {["All", "Available", "On Call", "Maintenance"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-3 py-1 rounded-md ${filter === s ? "bg-gray-100 font-medium" : "border"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="h-full">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-3">ID</th>
                <th>Registration</th>
                <th>Model</th>
                <th>Type</th>
                <th>Status</th>
                <th>Driver</th>
                <th>Location</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAmbulances.map((a) => (
                <tr key={a.id} className="border-b last:border-none">
                  <td className="py-4 font-medium">{a.id}</td>
                  <td>{a.registration}</td>
                  <td>
                    <div>{a.model}</div>
                    <div className="text-xs text-gray-500">{a.year}</div>
                  </td>
                  <td>{a.type}</td>
                  <td>
                    <StatusBadge status={a.status} />
                  </td>
                  <td>{a.driver}</td>
                  <td>{a.location}</td>
                  <td className="text-right">
                    <button className="p-2 rounded hover:bg-gray-100">
                      <AmbulanceActionMenu />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
      <div className="text-gray-400">{icon}</div>
    </div>
  );
}




function AmbulanceActionMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50">
          <div className="py-1 text-sm">
            <MenuItem icon={<Eye size={14} />} label="View Details" />
            <MenuItem icon={<Settings size={14} />} label="Maintenance Log" />
            <MenuItem icon={<RefreshCw size={14} />} label="Update Status" />
            <MenuItem icon={<UserPlus size={14} />} label="Assign Driver" />
            <MenuItem icon={<Clock size={14} />} label="View History" />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left">
      {icon}
      {label}
    </button>
  );
}
