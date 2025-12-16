import React, { useEffect, useState } from "react";
import {
  Home,
  Bell,
  Calendar,
  Clock,
  Users,
  Star,
  User,
  FileText,
  CreditCard,
  Settings,
  MessageCircle,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { useDispatch } from "react-redux";
import { getDoctorById } from "../../redux/actions/doctorProfileAction";
import { useData } from "../../shared/DataProvider";

type NavItem = {
  id: string;
  label: string;
  link: string;
  icon: React.ReactNode;
  badge?: number;
};



export default function DoctorSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState("dashboard");
  const authString = localStorage.getItem("auth");
  const parsedAuth = authString ? JSON.parse(authString) : null;

  const { docId, setDocId } = useData() as any;

  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [doctorDetails, setDoctorDetails] = useState(null as any);

  useEffect(() => {
    dispatch(getDoctorById(parsedAuth.user.id) as any).then((action: any) => {
      if (action.type === "DOCTOR_DETAILS_SUCCESS") {
        setDoctorDetails(action.payload)
        setDocId(action.payload)
        localStorage.setItem("docId", JSON.stringify(action.payload))
      }
    });

  }, [dispatch]);



  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 1024; // tailwind lg breakpoint ~1024
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
      else setIsOpen(true);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // prevent scrolling when mobile sidebar open
    if (isMobile) document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto" };
  }, [isOpen, isMobile]);




  useEffect(() => {
    if (!doctorDetails?._id) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Doctor socket connected:", socket.id);

      // ✅ JOIN USER ROOM (for notifications)
      socket.emit("join-user", doctorDetails._id);
    });

    // ✅ LISTEN TO CORRECT EVENT
    socket.on("new-notification", (data) => {
      console.log("🔔 Doctor notification:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("new-notification");
      socket.disconnect();
    };
  }, [doctorDetails?._id]);



  const NAV: NavItem[] = [
    { id: "dashboard", link: "/doctor/doctor-dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "requests", link: "/doctor/doctor-requests", label: "Requests", icon: <Bell size={18} />, badge: notifications?.length > 0 ? notifications?.length : 0 },
    { id: "appointments", link: "/doctor/doctor-appointments", label: "Appointments", icon: <Calendar size={18} /> },
    { id: "timings", link: "/doctor/doctor-timings", label: "Available Timings", icon: <Clock size={18} /> },
    { id: "patients", link: "/doctor/doctor-patients", label: "My Patients", icon: <Users size={18} /> },
    { id: "services", link: "/doctor/doctor-services", label: "Specialties & Services", icon: <User size={18} /> },
    { id: "reviews", link: "/doctor/doctor-reviews", label: "Reviews", icon: <Star size={18} /> },
    { id: "accounts", link: "/doctor/doctor-accounts", label: "Accounts", icon: <FileText size={18} /> },
    { id: "invoices", link: "/doctor/doctor-invoices", label: "Invoices", icon: <CreditCard size={18} /> },
    { id: "payout", link: "/doctor/doctor-payout", label: "Payout Settings", icon: <Settings size={18} /> },
    { id: "message", link: "/doctor/doctor-message", label: "Message", icon: <MessageCircle size={18} />, badge: 1 },
    { id: "profile", link: "/doctor/doctor-profile", label: "Profile Settings", icon: <Settings size={18} /> },
    { id: "social", link: "/doctor/doctor-social", label: "Social Media", icon: <Users size={18} /> },
    { id: "password", link: "/doctor/doctor-password", label: "Change Password", icon: <Settings size={18} /> },
    { id: "logout", link: "/doctor/doctor-logout", label: "Logout", icon: <LogOut size={18} /> },
  ];

  return (
    <>
      {/* Toggle button - visible on mobile and for collapsing on desktop */}
      <div className="fixed z-50 top-4 left-4 lg:left-6">
        <button
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setIsOpen((s) => !s)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-md border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isMobile ? (isOpen ? "translate-x-0 w-72" : "-translate-x-full w-72") : "w-80"
          }`}
        aria-label="Sidebar"
      >
        <div className="h-28 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-500" />
        </div>

        <div className="px-6 -mt-12 h-full flex flex-col">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-100">
            <div className="flex items-center">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full p-0.5"
                  style={{ background: "conic-gradient(from 180deg, #7c3aed, #3b82f6)" }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 block w-4 h-4 bg-emerald-400 ring-2 ring-white rounded-full" />
              </div>

              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-slate-800">Dr Edalin Hendry</h3>
                <p className="text-xs text-slate-500 mt-1">BDS, MDS - Oral & Maxillofacial Surgery</p>
                <div className="mt-2">
                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-700">• Dentist</span>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <label className="text-xs text-slate-500 block mb-2">Availability *</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>I am Available Now</option>
                <option>I am Busy</option>
                <option>I am Offline</option>
              </select>
            </div>
          </div>

          {/* SCROLLABLE MENU */}
          <nav className="mt-4 flex-1 overflow-y-auto pr-2">
            <ul className="space-y-1">
              {NAV.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => { navigate(item.link); setActive(item.id) }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500
                        ${isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-50 text-slate-700"}`}
                    >
                      <span className={isActive ? "text-white" : "text-slate-500"}>{item.icon}</span>

                      <span className="flex-1 text-sm text-left truncate">{item.label}</span>

                      {item.badge ? (
                        <span className={`min-w-[20px] h-5 px-2 text-xs rounded-full flex items-center justify-center ${isActive ? "bg-white/20 text-white" : "bg-yellow-100 text-yellow-800"}`}>
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight size={16} className={isActive ? "text-white" : "text-slate-300"} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-4 text-center text-xs text-slate-400 pb-6">App Version 1.0</div>
        </div>
      </aside>

      {/* Push page content when not mobile */}
      <style>{`
        @media (min-width: 1024px) {
          body {
            --sidebar-width: 20rem; /* 80 */
            padding-left: var(--sidebar-width);
            transition: padding-left .2s ease-in-out;
          }
        }
      `}</style>
    </>
  );
}
