import {
  Calendar,
  Download,
  Edit3,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  X
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DeathRecord {
  id: string;
  name: string;
  age: number;
  dateOfDeath: string;
  causeOfDeath: string;
  status: "Verified" | "Pending";
}

const DeathRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"All" | "Verified" | "Pending">("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const records: DeathRecord[] = [
    { id: "DR-2023-001", name: "Robert Anderson", age: 78, dateOfDeath: "5/10/2023", causeOfDeath: "Natural causes", status: "Verified" },
    { id: "DR-2023-002", name: "Eleanor Thompson", age: 85, dateOfDeath: "5/12/2023", causeOfDeath: "Heart failure", status: "Pending" },
    { id: "DR-2023-003", name: "George Harris", age: 67, dateOfDeath: "5/15/2023", causeOfDeath: "Respiratory failure", status: "Verified" },
    { id: "DR-2023-004", name: "Margaret Clark", age: 92, dateOfDeath: "5/18/2023", causeOfDeath: "Natural causes", status: "Verified" },
    { id: "DR-2023-005", name: "Thomas Wright", age: 71, dateOfDeath: "5/20/2023", causeOfDeath: "Cardiac arrest", status: "Pending" },
  ];

  const filteredRecords = records.filter(record =>
    activeTab === "All" ? true : record.status === activeTab
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/30 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Death Records</h1>
          <p className="text-sm text-gray-500">
            Manage and track all death records in the system
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
            <Download size={18} /> Export
          </button>
          <button
            onClick={() => navigate("/admin/records/death-records-add")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-black shadow-md"
          >
            <Plus size={18} /> Add Record
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100/80 p-1 rounded-xl flex border border-gray-200">
        {(["All Records", "Verified", "Pending"] as const).map(tab => {
          const value = tab === "All Records" ? "All" : tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(value)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg ${
                activeTab === value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900/5"
          />
        </div>
        <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500">
          <Filter size={20} />
        </button>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm">
          <Calendar size={18} className="text-gray-400" />
          Dec 18, 2025 - Dec 18, 2025
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-400 text-[11px] uppercase font-bold">
              <th className="px-6 py-4">Record ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">Date of Death</th>
              <th className="px-6 py-4">Cause of Death</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredRecords.map(record => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{record.id}</td>
                <td className="px-6 py-4">{record.name}</td>
                <td className="px-6 py-4">{record.age}</td>
                <td className="px-6 py-4">{record.dateOfDeath}</td>
                <td className="px-6 py-4">{record.causeOfDeath}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    record.status === "Verified"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-orange-50 text-orange-600"
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right relative">
                  <button onClick={() => toggleMenu(record.id)}>
                    <MoreHorizontal size={20} />
                  </button>

                  {openMenuId === record.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-6 top-12 bg-white border rounded-xl shadow-xl min-w-[200px]"
                    >
                      <button
                        onClick={() => navigate("/admin/records/death-records-details")}
                        className="w-full px-4 py-2.5 text-left hover:bg-gray-50"
                      >
                        <FileText size={16} /> View Details
                      </button>
                      <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50">
                        <Edit3 size={16} /> Edit Record
                      </button>
                      <div className="border-t">
                        <button className="w-full px-4 py-2.5 text-left text-rose-600 hover:bg-rose-50">
                          <X size={16} /> Delete Record
                        </button>
                      </div>
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
};

export default DeathRecordsPage;
