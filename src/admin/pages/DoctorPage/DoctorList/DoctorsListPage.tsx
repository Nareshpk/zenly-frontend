/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type DoctorStatus = "Active" | "On Leave" | "Inactive";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  status: DoctorStatus;
  patients: number;
  experience: string;
  email: string;
  phone: string;
  avatar: string;
}

/* ---------------- DATA ---------------- */

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    status: "Active",
    patients: 120,
    experience: "8 years",
    email: "sarah.johnson@medixpro.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    status: "Active",
    patients: 85,
    experience: "12 years",
    email: "michael.chen@medixpro.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Dr. Lisa Patel",
    specialty: "Pediatrics",
    status: "On Leave",
    patients: 150,
    experience: "10 years",
    email: "lisa.patel@medixpro.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    status: "Active",
    patients: 95,
    experience: "15 years",
    email: "james.wilson@medixpro.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    status: "Active",
    patients: 110,
    experience: "7 years",
    email: "emily.rodriguez@medixpro.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Psychiatry",
    status: "Inactive",
    patients: 75,
    experience: "9 years",
    email: "robert.kim@medixpro.com",
    phone: "+1 (555) 678-9012",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function DoctorsListPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Doctors</h1>
          <p className="text-gray-500">
            Manage your medical staff and their information.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md">
          <Plus size={16} />
          Add Doctor
        </button>
      </div>

      {/* ================= LIST CARD ================= */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Doctors List</h2>
            <p className="text-sm text-gray-500">
              A list of all doctors in your clinic with their details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                placeholder="Search doctors..."
                className="pl-9 pr-3 py-2 border rounded-md text-sm"
              />
            </div>

            <button className="border p-2 rounded-md">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-3">Name</th>
                <th className="text-left">Specialty</th>
                <th className="text-left">Status</th>
                <th className="text-left">Patients</th>
                <th className="text-left">Experience</th>
                <th className="text-left">Contact</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((d) => (
                <tr
                  key={d.id} 
                  className="border-b last:border-none"
                >
                  {/* NAME */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={d.avatar}
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="font-medium">{d.name}</span>
                    </div>
                  </td>

                  {/* SPECIALTY */}
                  <td>{d.specialty}</td>

                  {/* STATUS */}
                  <td>
                    <StatusBadge status={d.status} />
                  </td>

                  {/* PATIENTS */}
                  <td>{d.patients}</td>

                  {/* EXPERIENCE */}
                  <td>{d.experience}</td>

                  {/* CONTACT */}
                  <td>
                    <div>{d.email}</div>
                    <div className="text-xs text-gray-400">
                      {d.phone}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === d.id ? null : d.id
                        )
                      }
                    >
                      <MoreHorizontal />
                    </button>

                    {openMenu === d.id && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-10">
                        <div className="px-3 py-2 font-medium text-sm">
                          Actions
                        </div>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                          View profile
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                          Edit details
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                          View schedule
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                          Deactivate
                        </button>
                      </div>
                    )}
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

/* ---------------- COMPONENTS ---------------- */

function StatusBadge({ status }: { status: DoctorStatus }) {
  const styles =
    status === "Active"
      ? "bg-green-100 text-green-600"
      : status === "On Leave"
      ? "bg-orange-100 text-orange-600"
      : "bg-red-100 text-red-600";

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full ${styles}`}
    >
      {status}
    </span>
  );
}
