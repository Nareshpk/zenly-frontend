/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  FileText,
  Edit,
  RotateCcw,
  X,
} from "lucide-react";

type PrescriptionStatus = "Active" | "Expired";

interface Prescription {
  id: number;
  patient: string;
  avatar: string;
  doctor: string;
  date: string;
  status: PrescriptionStatus;
  medications: string[];
  refills: number;
}

const PRESCRIPTIONS: Prescription[] = [
  {
    id: 1,
    patient: "John Smith",
    avatar: "https://i.pravatar.cc/40?img=1",
    doctor: "Dr. Sarah Johnson",
    date: "2023-07-15",
    status: "Active",
    medications: [
      "Lisinopril 10mg (Once daily)",
      "Metformin 500mg (Twice daily)",
    ],
    refills: 2,
  },
  {
    id: 2,
    patient: "Emily Davis",
    avatar: "https://i.pravatar.cc/40?img=2",
    doctor: "Dr. Michael Chen",
    date: "2023-07-10",
    status: "Active",
    medications: ["Atorvastatin 20mg (Once daily)"],
    refills: 3,
  },
  {
    id: 3,
    patient: "Robert Wilson",
    avatar: "https://i.pravatar.cc/40?img=3",
    doctor: "Dr. Lisa Patel",
    date: "2023-06-28",
    status: "Expired",
    medications: [
      "Prednisone 5mg (Once daily)",
      "Albuterol 90mcg (As needed)",
    ],
    refills: 0,
  },
  {
    id: 4,
    patient: "Jessica Brown",
    avatar: "https://i.pravatar.cc/40?img=4",
    doctor: "Dr. James Wilson",
    date: "2023-07-05",
    status: "Active",
    medications: ["Amoxicillin 500mg (Three times daily)"],
    refills: 0,
  },
  {
    id: 5,
    patient: "Michael Johnson",
    avatar: "https://i.pravatar.cc/40?img=5",
    doctor: "Dr. Emily Rodriguez",
    date: "2023-07-12",
    status: "Active",
    medications: ["Sertraline 50mg (Once daily)"],
    refills: 5,
  },
  {
    id: 6,
    patient: "Sarah Thompson",
    avatar: "https://i.pravatar.cc/40?img=6",
    doctor: "Dr. Robert Kim",
    date: "2023-06-20",
    status: "Expired",
    medications: [
      "Hydrochlorothiazide 25mg (Once daily)",
      "Ibuprofen 600mg (As needed)",
    ],
    refills: 0,
  },
];

export default function Prescriptions() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const statusBadge = (status: PrescriptionStatus) =>
    status === "Active"
      ? "bg-green-500 text-white"
      : "bg-red-500 text-white";

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Prescriptions</h1>
          <p className="text-sm text-gray-500">
            Manage patient prescriptions and medications.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg">
          <Plus size={16} /> Create Prescription
        </button>
      </div>

      {/* Card */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        {/* Card Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">All Prescriptions</h2>
            <p className="text-sm text-gray-500">
              View and manage all patient prescriptions.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                placeholder="Search prescriptions..."
                className="pl-9 pr-3 py-2 border rounded-lg text-sm"
              />
            </div>

            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
              ⚲ All Status
            </button>

            <button className="p-2 border rounded-lg">⤓</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-gray-500">
                <th className="py-3">Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
                <th>Medications</th>
                <th>Refills</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {PRESCRIPTIONS.map((p) => (
                <tr key={p.id} className="border-b last:border-none">
                  {/* Patient */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatar}
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="font-medium">{p.patient}</span>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td>{p.doctor}</td>

                  {/* Date */}
                  <td>{p.date}</td>

                  {/* Status */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Medications */}
                  <td>
                    <ul className="space-y-1">
                      {p.medications.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </td>

                  {/* Refills */}
                  <td>{p.refills}</td>

                  {/* Actions */}
                  <td className="text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === p.id ? null : p.id)
                      }
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenu === p.id && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
                        <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <FileText size={16} /> View details
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <Edit size={16} /> Edit prescription
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <RotateCcw size={16} /> Renew prescription
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50">
                          <X size={16} /> Cancel prescription
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
