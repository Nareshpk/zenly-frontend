import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit3,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- TYPES ---------------- */
type RoomStatus = "Occupied" | "Available";

interface Room {
  roomNo: string;
  type: string;
  status: RoomStatus;
  patient: string;
  doctor: string;
}

/* ---------------- DATA ---------------- */
const departments = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Pulmonology",
  "Gastroenterology",
  "Pediatrics",
];

const rooms: Room[] = [
  {
    roomNo: "101",
    type: "Private",
    status: "Occupied",
    patient: "John Smith",
    doctor: "Dr. Emily Chen",
  },
  {
    roomNo: "102",
    type: "Private",
    status: "Available",
    patient: "—",
    doctor: "—",
  },
  {
    roomNo: "103",
    type: "Semi-Private",
    status: "Occupied",
    patient: "Maria Garcia",
    doctor: "Dr. James Wilson",
  },
  {
    roomNo: "104",
    type: "Semi-Private",
    status: "Occupied",
    patient: "Robert Davis",
    doctor: "Dr. Lisa Wong",
  },
  {
    roomNo: "105",
    type: "General",
    status: "Available",
    patient: "—",
    doctor: "—",
  },
];

/* ---------------- PAGE ---------------- */
export default function RoomsByDepartmentTabs() {
  const navigate = useNavigate();
  const [activeDept, setActiveDept] = useState("Cardiology");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close menu on outside click */
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="mt-8 space-y-6 bg-slate-50/30 min-h-screen">
      {/* ---------------- DEPARTMENT TABS ---------------- */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition
              ${
                activeDept === dept
                  ? "bg-white shadow text-slate-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* ---------------- FILTER BAR ---------------- */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-[300px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search rooms..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black/5 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter size={16} /> Filter by:
          </div>

          <select className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">
            <option>All Statuses</option>
            <option>Available</option>
            <option>Occupied</option>
          </select>

          <select className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">
            <option>All Types</option>
            <option>Private</option>
            <option>Semi-Private</option>
            <option>General</option>
          </select>
        </div>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-400">
            <tr>
              <th className="px-6 py-4">Room Number</th>
              <th className="px-6 py-4">Room Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Doctor</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {rooms.map((room) => (
              <tr key={room.roomNo} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">
                  {room.roomNo}
                </td>
                <td className="px-6 py-4">{room.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold
                      ${
                        room.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4">{room.patient}</td>
                <td className="px-6 py-4">{room.doctor}</td>

                {/* ACTION MENU */}
                <td className="px-6 py-4 text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === room.roomNo ? null : room.roomNo
                      )
                    }
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenu === room.roomNo && (
                    <div
                      ref={menuRef}
                      className="absolute right-6 top-12 w-48 bg-white border rounded-xl shadow-lg z-50"
                    >
                      <MenuItem
                        icon={<Eye size={16} />}
                        label="View Details"
                        onClick={() =>
                          navigate("/admin/rooms/room-details")
                        }
                      />
                      <MenuItem
                        icon={<LogOut size={16} />}
                        label="Discharge Patient"
                        danger
                      />
                      <MenuItem
                        icon={<Edit3 size={16} />}
                        label="Edit Room"
                        onClick={() =>
                          navigate("/admin/rooms/edit-room")
                        }
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- MENU ITEM ---------------- */
function MenuItem({
  icon,
  label,
  danger = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </button>
  );
}
