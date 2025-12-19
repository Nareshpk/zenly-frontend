/* eslint-disable jsx-a11y/alt-text */
import {
    ArrowLeft,
    Check,
    MoreVertical,
    Search,
    X,
} from "lucide-react";
import { useState } from "react";

type RequestStatus = "Pending" | "Approved" | "Rejected";
type Urgency = "Low" | "Normal" | "High";

interface AppointmentRequest {
  id: number;
  patient: string;
  avatar: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  urgency: Urgency;
}

const REQUESTS: AppointmentRequest[] = [
  {
    id: 1,
    patient: "John Smith",
    avatar: "https://i.pravatar.cc/40?img=1",
    doctor: "Dr. Sarah Johnson",
    date: "2023-07-25",
    time: "Morning",
    type: "Check-up",
    urgency: "Normal",
  },
  {
    id: 2,
    patient: "Emily Davis",
    avatar: "https://i.pravatar.cc/40?img=2",
    doctor: "Any cardiologist",
    date: "2023-07-28",
    time: "Afternoon",
    type: "Consultation",
    urgency: "High",
  },
  {
    id: 3,
    patient: "David Miller",
    avatar: "https://i.pravatar.cc/40?img=3",
    doctor: "Dr. Jennifer Lee",
    date: "2023-07-31",
    time: "Morning",
    type: "Check-up",
    urgency: "Low",
  },
];

export default function AppointmentRequests() {
  const [activeTab, setActiveTab] = useState<RequestStatus>("Pending");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const urgencyBadge = (urgency: Urgency) => {
    switch (urgency) {
      case "High":
        return "bg-red-500 text-white";
      case "Normal":
        return "bg-blue-500 text-white";
      case "Low":
        return "border border-green-500 text-green-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg border hover:bg-gray-100">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold">Appointment Requests</h1>
          <p className="text-sm text-gray-500">
            Manage patient appointment requests.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 rounded-lg p-1 w-fit">
        {["Pending", "Approved", "Rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as RequestStatus)}
            className={`px-4 py-1.5 rounded-md text-sm ${
              activeTab === tab
                ? "bg-white shadow font-medium"
                : "text-gray-600"
            }`}
          >
            {tab} Requests
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        {/* Card Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Pending Appointment Requests
            </h2>
            <p className="text-sm text-gray-500">
              Review and process incoming appointment requests.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                placeholder="Search requests..."
                className="pl-9 pr-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <button className="p-2 border rounded-lg hover:bg-gray-100">
              ⚲
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-gray-500">
                <th className="py-3">Patient</th>
                <th>Requested Doctor</th>
                <th>Preferred Date</th>
                <th>Type</th>
                <th>Urgency</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {REQUESTS.map((req) => (
                <tr key={req.id} className="border-b last:border-none">
                  {/* Patient */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.avatar}
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="font-medium">{req.patient}</span>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td>{req.doctor}</td>

                  {/* Date */}
                  <td>
                    <div className="font-medium">{req.date}</div>
                    <div className="text-gray-500 text-xs">{req.time}</div>
                  </td>

                  {/* Type */}
                  <td>{req.type}</td>

                  {/* Urgency */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyBadge(
                        req.urgency
                      )}`}
                    >
                      {req.urgency}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === req.id ? null : req.id)
                      }
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenu === req.id && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          View details
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          View patient profile
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <Check size={16} /> Approve request
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50">
                          <X size={16} /> Reject request
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
