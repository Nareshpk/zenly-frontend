import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, Search, User, X, LogOut, Settings } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useData } from "../../shared/DataProvider";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = (useData() as any) || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // small-screen search
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const authString = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
  const parsedAuth = authString ? JSON.parse(authString) : null;
  const isLoggedIn = parsedAuth?.isAuthenticated === true || Boolean(user);

  const menus = [
    { name: "Home", link: "/" },
    { name: "Doctors", link: isLoggedIn ? "/app/doctors" : "/doctors" },
    { name: "Services", link: isLoggedIn ? "/app/services" : "/services" },
    { name: "About", link: isLoggedIn ? "/app/about" : "/about" },
    { name: "Contact", link: isLoggedIn ? "/app/contact" : "/contact" },
  ];

  // Prevent background scroll while drawer open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menus on outside click / Esc
  useEffect(() => {
    function onDocClick(e: any) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsUserOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleLogout = () => {
    setUser && setUser(null);
    localStorage.clear();
    navigate("/");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 rounded-md text-sm font-semibold transition-colors
     after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2
     after:h-0.5 after:w-0 after:rounded-full after:transition-all
     ${isActive
       ? "text-indigo-600 after:w-10 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-500"
       : "text-slate-800 hover:text-indigo-600 hover:after:w-8 hover:after:bg-indigo-200"
     }`;

  return (
    <>
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.38 }}
        className="w-full fixed top-0 left-0 z-50"
        aria-label="Primary navigation"
      >
        <div className="w-full bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border-b border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="h-20 flex items-center justify-between">

              {/* LEFT: logo + menu (menu visible from md and up; hidden on sm) */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
                <Link to="/" className="flex items-center gap-3">
                  {/* logo scales with breakpoints */}
                  <img src={assets.logo} alt="logo" className="w-24 sm:w-28 md:w-36 lg:w-44 object-contain" />
                </Link>

                {/* nav: show from md upwards; center align on md/lg; on lg we allow more spacing */}
                <div className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8 w-full justify-center">
                  {menus.map((m, i) => (
                    <NavLink key={i} to={m.link} className={navLinkClass}>
                      {m.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* RIGHT: search, notifications, user, hamburger */}
              <div className="flex items-center gap-2 sm:gap-3">
             
                <button aria-label="Notifications" className="relative p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center text-xs font-semibold bg-rose-500 text-white rounded-full w-4 h-4">3</span>
                </button>

                {/* User or auth buttons */}
                {isLoggedIn ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserOpen((s) => !s)}
                      aria-haspopup="menu"
                      aria-expanded={isUserOpen}
                      className="inline-flex items-center gap-2 sm:gap-3 rounded-full px-2 py-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      <img src={parsedAuth?.avatar || user?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTReksmWyNPLFzrUc0Qjm9BBNkFGd6B6yQZiw&s"} alt="user" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/8 shadow-sm" />
                      <div className="hidden md:flex flex-col text-left">
                        <span className="text-xs font-semibold">{parsedAuth?.name || user?.name || "You"}</span>
                        <span className="text-[11px] text-slate-600">Member</span>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isUserOpen && (
                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }}
                          className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl ring-1 ring-black ring-opacity-5 border border-white/8 overflow-hidden z-50" role="menu">
                          <div className="p-3">
                            <button onClick={() => { setIsUserOpen(false); navigate("/app/profile"); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                              <User className="w-4 h-4 text-slate-700" /> Profile
                            </button>
                            <button onClick={() => { setIsUserOpen(false); navigate("/app/my-appointments"); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                              <Settings className="w-4 h-4 text-slate-700" /> My Appointments
                            </button>
                            <div className="mt-2 border-t pt-2">
                              <button onClick={() => handleLogout()} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-rose-600 hover:bg-gray-50">
                                <LogOut className="w-4 h-4" /> Logout
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <button onClick={() => navigate("/login")} className="px-3 sm:px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-sm hover:shadow-md">Login</button>
                    <button onClick={() => navigate("/signup")} className="px-3 sm:px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 bg-white/40 hover:bg-white/50">Sign up</button>
                  </div>
                )}

                {/* HAMBURGER: visible below md (<= md), on md we show horizontal menu */}
                <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen((s) => !s)} aria-label="Toggle menu" aria-expanded={isMenuOpen} className="p-2 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="fixed inset-0 z-40 bg-black/40" onClick={() => setIsMenuOpen(false)} />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed right-0 top-0 z-50 h-full w-full max-w-xs sm:max-w-sm bg-white/95 backdrop-blur p-5 shadow-2xl" aria-label="Mobile menu">
              <div className="flex items-center justify-between">
                <img src={assets.logo} alt="logo" className="w-28 sm:w-32 object-contain" />
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close" className="p-2 rounded-md"><X className="w-6 h-6" /></button>
              </div>

              <nav className="mt-6 flex flex-col gap-2" role="menu">
                {menus.map((m, i) => (
                  <NavLink key={i} to={m.link} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-md text-lg font-medium ${isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-800 hover:bg-gray-50"}`}>
                    {m.name}
                  </NavLink>
                ))}

                <div className="mt-4 border-t pt-4">
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-2">
                      <button onClick={() => { setIsMenuOpen(false); navigate("/app/profile"); }} className="text-left px-4 py-3 rounded hover:bg-gray-50">Profile</button>
                      <button onClick={() => { setIsMenuOpen(false); navigate("/app/my-appointments"); }} className="text-left px-4 py-3 rounded hover:bg-gray-50">My Appointments</button>
                      <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="text-left px-4 py-3 rounded text-rose-600">Logout</button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button onClick={() => { setIsMenuOpen(false); navigate("/login"); }} className="flex-1 px-4 py-3 rounded-lg bg-indigo-600 text-white">Login</button>
                      <button onClick={() => { setIsMenuOpen(false); navigate("/signup"); }} className="flex-1 px-4 py-3 rounded-lg border border-indigo-600 text-indigo-600">Sign up</button>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-sm text-slate-500">
                  <div>Verified clinics • 24/7 support • Trusted by 20k+</div>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Small-screen Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40" onClick={() => setSearchOpen(false)} />
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.2 }} className="fixed z-50 left-1/2 -translate-x-1/2 top-24 w-[92%] max-w-xl bg-white rounded-xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-600" />
                <input autoFocus id="mobile-search" placeholder="Search doctors, services or location" className="flex-1 bg-transparent outline-none text-sm" />
                <button onClick={() => setSearchOpen(false)} className="px-2 py-1 rounded-md">Cancel</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* spacer to avoid content hidden by fixed nav */}
      <div className="h-20" />
    </>
  );
}
