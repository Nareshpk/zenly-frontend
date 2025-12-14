
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../admin/components/AdminSidebar";
import DoctorSidebar from "../doctor/components/DoctorSidebar";
import Footer from "../pages/components/Footer";
import Navbar from "../pages/components/Navbar";
import AppSidebar from "../pages/components/Sidebar";

type AuthShape = {
  isAuthenticated?: boolean;
  role?: "user" | "admin" | "doctor" | string;
  // add other fields from your auth object if needed
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const doctorPath = location.pathname.includes("doctor-dashboard");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [auth, setAuth] = useState<AuthShape | null>(null);


  useEffect(() => {
    try {
      const authString = localStorage.getItem("auth");
      if (authString) {
        const parsed = JSON.parse(authString) as AuthShape;
        setAuth(parsed);
      } else {
        setAuth(null);
      }
    } catch (err) {
      console.error("Failed to parse auth from localStorage:", err);
      setAuth(null);
    }
  }, []);

  const isUser = auth?.role === "user";
  const isAdmin = auth?.role === "admin";
  const isDoctor = auth?.role === "doctor";

  return (
    <>
      <Toaster />

      {isAdmin ? (
        <div className="flex h-screen overflow-hidden">

          {/* Sidebar */}
          <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          {/* MAIN CONTENT */}
          <main
            className="flex-1 p-6 bg-gray-50 overflow-y-auto transition-all duration-300"

          >
            {children}
          </main>

        </div>


      ) : isDoctor ? (
        <div className="flex h-screen overflow-hidden">

          <DoctorSidebar />

          <div
            className={`flex flex-col flex-1 transition-all duration-300`}
          >
            <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
              {children}
            </main>
          </div>

        </div>

      ) : (

        <div className="flex h-screen overflow-hidden">
          {/* SIDEBAR → ONLY IF LOGGED IN */}
          {auth?.isAuthenticated && (
            <AppSidebar
              isOpen={sidebarOpen}
              setIsOpen={setSidebarOpen}
            />
          )}

          {/* RIGHT SIDE */}
          <div
            className={`flex flex-col flex-1 transition-all duration-300
        ${auth?.isAuthenticated
                ? sidebarOpen
                  ? "ml-[260px]"
                  : "ml-[80px]"
                : "ml-0"
              }`}
          >
            {/* NAVBAR */}
            <Navbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            {/* CONTENT */}
            <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
              {children}
            </main>
          </div>
        </div>
      )}
      {!doctorPath && isUser && !auth.isAuthenticated && <Footer />}
    </>
  );
}
