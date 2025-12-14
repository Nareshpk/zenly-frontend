import { motion } from "framer-motion";
import {
  Bot,
  Calendar,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AppSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  const menus = [
    { name: "Dashboard", path: "/app/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Doctors", path: "/app/doctors", icon: <User size={18} /> },
    { name: "Appointments", path: "/app/my-appointments", icon: <Calendar size={18} /> },
    { name: "Chat", path: "/app/user-message", icon: <MessageSquare size={18} /> },
    { name: "AI Assistant", path: "/app/ai-chat", icon: <Bot  size={18} /> },
    { name: "Settings", path: "/app/profile", icon: <Settings size={18} /> },
  ];

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <motion.aside
      animate={{ width: isOpen ? 260 : 80 }}
      transition={{ duration: 0.25 }}
      className="fixed left-0 top-0 h-screen bg-white border-r shadow-sm z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b font-bold text-indigo-600">
        {isOpen ? "MEDCARE" : "MC"}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-1">
        {menus.map((m) => (
          <NavLink
            key={m.path}
            to={m.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all
              ${isActive
                ? "bg-indigo-50 text-indigo-600 font-semibold"
                : "text-slate-700 hover:bg-slate-50"}`
            }
          >
            {m.icon}
            {isOpen && <span>{m.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50"
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
