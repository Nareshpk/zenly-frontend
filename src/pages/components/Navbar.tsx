import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, User, X, LogOut, Settings } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useData } from "../../shared/DataProvider";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = (useData() as any) || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
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

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
        transition={{ duration: 0.3 }}
        className="w-full fixed top-0 left-0 z-50"
        aria-label="Primary navigation"
      >
        {/* Background + border */}
        <div className="w-full bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
          {/* CONSTRAINED CENTERED ROW: keeps balanced look on huge screens */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Use a single row with fixed height so items align perfectly */}
            <div className="h-16 md:h-20 flex items-center justify-between">
              {/* LEFT: logo + (optional) nav */}
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-3 flex-shrink-0">
                  {/* Keep logo height modest and consistent */}
                  <img
                    src={assets.logo}
                    alt="logo"
                    className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
                    style={{ maxWidth: 260 }}
                  />
                </Link>

                {/* desktop nav (hidden below md) */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                  {menus.map((m, i) => (
                    <NavLink key={i} to={m.link} className={navLinkClass}>
                      {m.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* RIGHT: icons & auth */}
              <div className="flex items-center gap-3">
                {/* notifications */}
                <button
                  aria-label="Notifications"
                  className="relative p-2 rounded-full hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <Bell className="w-5 h-5 text-slate-700" />
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs font-semibold bg-rose-500 text-white rounded-full w-5 h-5">3</span>
                </button>

      
                {/* user or auth buttons */}
                {isLoggedIn ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserOpen((s) => !s)}
                      aria-haspopup="menu"
                      aria-expanded={isUserOpen}
                      className="inline-flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      <img
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-iYjwl8-DBBtp1SXOL6rQ9HI7iEgEob1A-1tJgmmog&s"}
                        alt="user"
                        className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-sm"
                      />
                      <div className="hidden md:flex flex-col text-left">
                        <span className="text-xs font-semibold text-slate-800">{parsedAuth?.name || user?.name || "You"}</span>
                        <span className="text-[11px] text-slate-500">Member</span>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isUserOpen && (
                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }}
                          className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 border border-slate-100 overflow-hidden z-50" role="menu">
                          <div className="p-3">
                            <button onClick={() => { setIsUserOpen(false); navigate("/app/profile"); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50">
                              <User className="w-4 h-4 text-slate-700" /> Profile
                            </button>
                            <button onClick={() => { setIsUserOpen(false); navigate("/app/my-appointments"); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50">
                              <Settings className="w-4 h-4 text-slate-700" /> My Appointments
                            </button>
                            <div className="mt-2 border-t pt-2">
                              <button onClick={() => handleLogout()} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-rose-600 hover:bg-slate-50">
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
                    <button onClick={() => navigate("/login")} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">Login</button>
                    <button onClick={() => navigate("/signup")} className="px-3 py-2 rounded-md border border-indigo-600 text-indigo-600 text-sm">Sign up</button>
                  </div>
                )}

                {/* hamburger for mobile */}
                <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen((s) => !s)} aria-label="Toggle menu" aria-expanded={isMenuOpen} className="p-2 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                    {isMenuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* mobile drawer (unchanged) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="fixed inset-0 z-40 bg-black/40" onClick={() => setIsMenuOpen(false)} />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed right-0 top-0 z-50 h-full w-full max-w-xs sm:max-w-sm bg-white p-5 shadow-lg" aria-label="Mobile menu">
              <div className="flex items-center justify-between">
                <img src={assets.logo} alt="logo" className="h-10 sm:h-12 object-contain" />
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close" className="p-2 rounded-md"><X className="w-6 h-6" /></button>
              </div>

              <nav className="mt-6 flex flex-col gap-2" role="menu">
                {menus.map((m, i) => (
                  <NavLink key={i} to={m.link} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-md text-lg font-medium ${isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-800 hover:bg-slate-50"}`}>
                    {m.name}
                  </NavLink>
                ))}

                <div className="mt-4 border-t pt-4">
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-2">
                      <button onClick={() => { setIsMenuOpen(false); navigate("/app/profile"); }} className="text-left px-4 py-3 rounded hover:bg-slate-50">Profile</button>
                      <button onClick={() => { setIsMenuOpen(false); navigate("/app/my-appointments"); }} className="text-left px-4 py-3 rounded hover:bg-slate-50">My Appointments</button>
                      <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="text-left px-4 py-3 rounded text-rose-600">Logout</button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button onClick={() => { setIsMenuOpen(false); navigate("/login"); }} className="flex-1 px-4 py-3 rounded-md bg-indigo-600 text-white">Login</button>
                      <button onClick={() => { setIsMenuOpen(false); navigate("/signup"); }} className="flex-1 px-4 py-3 rounded-md border border-indigo-600 text-indigo-600">Sign up</button>
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

      {/* spacer so page content starts below nav */}
      <div className="h-16 md:h-20" />
    </>
  );
}
