import React from "react";
import { Users, CalendarCheck, ClipboardList, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  // Dummy stats — replace with API data
  const stats = [
    {
      title: "Total Doctors",
      value: 24,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Appointments",
      value: 180,
      icon: <CalendarCheck className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Pending Approvals",
      value: 12,
      icon: <ClipboardList className="w-6 h-6 text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Total Revenue",
      value: "₹1,25,000",
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="w-full p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-5 bg-white shadow-md rounded-xl flex items-center space-x-4 hover:shadow-lg transition-all"
          >
            <div className={`p-3 rounded-lg ${item.bg}`}>{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-semibold text-gray-800">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3">
          <li className="p-4 bg-gray-50 rounded-lg flex justify-between">
            <span>New doctor registered: <b>Dr. Priya</b></span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </li>

          <li className="p-4 bg-gray-50 rounded-lg flex justify-between">
            <span>Appointment completed: <b>#A1023</b></span>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </li>

          <li className="p-4 bg-gray-50 rounded-lg flex justify-between">
            <span>New appointment booked: <b>#A1028</b></span>
            <span className="text-sm text-gray-500">6 hours ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
