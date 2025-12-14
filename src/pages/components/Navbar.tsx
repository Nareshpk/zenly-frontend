import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useData } from "../../shared/DataProvider";
import PatientNavbarNotifications from "../pageLists/PatientNavbarNotifications";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
};

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const navigate = useNavigate();
  const { user, setUser } = (useData() as any) || {};

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // 🔐 Auth
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");  
  const isLoggedIn = auth?.isAuthenticated === true || Boolean(user);

  // 🧑‍⚕️ Patient id (replace with real one from auth/context)
  const patientId =
    auth?.user?.id ||
    auth?.user?.id ||
    "693d011a967e26f12037eec1";

  const menus = [
    { name: "Home", link: "/" },
    { name: "Doctors", link: isLoggedIn ? "/app/doctors" : "/doctors" },
    { name: "Services", link: isLoggedIn ? "/app/services" : "/services" },
    { name: "About", link: isLoggedIn ? "/app/about" : "/about" },
    { name: "Contact", link: isLoggedIn ? "/app/contact" : "/contact" },
  ];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function logout() {
    setUser?.(null);
    localStorage.clear();
    navigate("/");
  }

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-semibold transition
     ${
       isActive
         ? "text-indigo-600 bg-indigo-50"
         : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
     }`;

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 bg-white border-b shadow-sm"
      >
        <div className="h-16 flex items-center justify-between px-4">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle (only when logged in) */}
            {isLoggedIn && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-slate-100"
              >
                <Menu size={22} />
              </button>
            )}

            {/* Logo */}
            <Link to="/">
              <img src={assets.logo} alt="logo" className="h-9" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2 ml-4">
              {menus.map((m) => (
                <NavLink key={m.name} to={m.link} className={navClass}>
                  {m.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* 🔔 Notifications (ALWAYS VISIBLE) */}
            <PatientNavbarNotifications patientId={patientId} />

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-slate-100"
                >
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden md:block text-sm font-medium">
                    {auth?.name || user?.name || "User"}
                  </span>
                </button>

                <AnimatePresence>
                  {userOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50"
                    >
                      <button
                        onClick={() => navigate("/app/profile")}
                        className="w-full px-4 py-3 flex items-center gap-2 hover:bg-slate-50"
                      >
                        <User size={16} /> Profile
                      </button>
                      <button
                        onClick={() => navigate("/app/settings")}
                        className="w-full px-4 py-3 flex items-center gap-2 hover:bg-slate-50"
                      >
                        <Settings size={16} /> Settings
                      </button>
                      <button
                        onClick={logout}
                        className="w-full px-4 py-3 flex items-center gap-2 text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 text-sm"
                >
                  Sign up
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-72 bg-white z-40 shadow-lg p-4"
          >
            {menus.map((m) => (
              <NavLink
                key={m.name}
                to={m.link}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-md hover:bg-slate-50"
              >
                {m.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
