import { MoreVertical, Plus, Search, Filter, Download } from "lucide-react";
import { useState } from "react";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  status: "Active" | "Inactive";
  lastVisit: string;
  condition: string;
  doctor: string;
  avatar: string;
}

const patientsData: Patient[] = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    status: "Active",
    lastVisit: "2023-06-15",
    condition: "Hypertension",
    doctor: "Dr. Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Emily Davis",
    age: 32,
    gender: "Female",
    status: "Active",
    lastVisit: "2023-07-02",
    condition: "Diabetes Type 2",
    doctor: "Dr. Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Robert Wilson",
    age: 58,
    gender: "Male",
    status: "Inactive",
    lastVisit: "2023-05-20",
    condition: "Arthritis",
    doctor: "Dr. Lisa Patel",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
];

export default function PatientsList() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Patients</h1>
          <p className="text-sm text-gray-500">
            Manage your patients and their medical records.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm">
          <Plus size={16} />
          Add Patient
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border p-5">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Patients List</h2>
            <p className="text-sm text-gray-500">
              A list of all patients in your clinic with their details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                placeholder="Search patients..."
                className="pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none"
              />
            </div>

            <button className="border rounded-md px-3 py-2 text-sm flex items-center gap-1">
              <Filter size={14} />
              Filters
            </button>

            <button className="border rounded-md p-2">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-3">Name</th>
                <th>Age / Gender</th>
                <th>Status</th>
                <th>Last Visit</th>
                <th>Condition</th>
                <th>Doctor</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {patientsData.map((p) => (
                <tr key={p.id} className="border-b last:border-none">
                  <td className="py-4 flex items-center gap-3">
                    <img
                      src={p.avatar}
                      className="w-9 h-9 rounded-full"
                      alt={p.name}
                    />
                    <span className="font-medium">{p.name}</span>
                  </td>

                  <td>
                    {p.age} • {p.gender}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td>{p.lastVisit}</td>
                  <td>{p.condition}</td>
                  <td>{p.doctor}</td>

                  {/* Actions */}
                  <td className="text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === p.id ? null : p.id)
                      }
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenu === p.id && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md z-10">
                        <ul className="text-sm">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            View profile
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Edit details
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Medical history
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Prescriptions
                          </li>
                          <li className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">
                            Delete
                          </li>
                        </ul>
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
