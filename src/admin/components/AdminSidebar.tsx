import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Wrench,
  CalendarCheck,
  UserCog,
  LogOut as LogOutIcon,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  className?: string;
};

export default function AdminSidebar({ isOpen, setIsOpen, className = "" }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Doctors", path: "/admin/doctors", icon: <Users size={20} /> },
    { name: "Manage Services", path: "/admin/services", icon: <Wrench size={20} /> },
    { name: "Appointments", path: "/admin/appointments", icon: <CalendarCheck size={20} /> },
    { name: "Profile", path: "/admin/profile", icon: <UserCog size={20} /> },
  ];

  function handleLogout() {
    localStorage.removeItem("auth");
    toast.success("Logged out");
    navigate("/", { replace: true });
  }

  return (
    <aside
      aria-label="Sidebar"
      className={`flex flex-col transition-all duration-300 bg-white shadow-lg z-20 ${isOpen ? "w-64" : "w-20"} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4">
        <div className={`flex items-center gap-3 ${!isOpen ? "justify-center w-full" : ""}`}>
          <div
            className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold"
            aria-hidden
          >
            CL
          </div>

          {isOpen && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">Codinglab</span>
              <span className="text-sm text-gray-500">Web developer</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Search */}
      <div className="px-3">
        <div
          className={`flex items-center gap-2 rounded-md px-2 py-2 bg-indigo-50 cursor-text ${!isOpen ? "justify-center" : ""}`}
        >
          <Search size={16} className="text-indigo-600" />
          {isOpen && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex-1 overflow-auto px-1 py-2" aria-label="Main navigation">
        <ul className="space-y-1">
          {links
            .filter((l) => (query ? l.name.toLowerCase().includes(query.toLowerCase()) : true))
            .map((l) => (
              <li key={l.path}>
                <NavLink
                  to={l.path}
                  className={({ isActive }) =>
                    `flex items-center w-full gap-3 px-3 py-2 rounded-md transition-colors text-left focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-600 hover:text-white"
                    } ${!isOpen ? "justify-center px-0" : ""}`
                  }
                >
                  <span className="flex items-center justify-center min-w-[36px]">{l.icon}</span>
                  {isOpen && <span className="truncate">{l.name}</span>}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-200">
        <div className={`flex items-center gap-3 ${!isOpen ? "justify-center" : ""}`}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full rounded-md px-2 py-2 hover:bg-red-100 text-red-600 focus:outline-none"
          >
            <LogOutIcon size={16} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
