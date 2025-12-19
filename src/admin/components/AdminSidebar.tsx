import {
  Ambulance,
  BedDouble,
  Boxes,
  Building2,
  Calendar,
  ChevronDown,
  CreditCard,
  Droplet,
  FileText,
  Folder,
  LayoutDashboard,
  Pill,
  Settings,
  Stethoscope,
  Users,
  Users2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- MENU CONFIG ---------------- */

export const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { name: "Admin Dashboard", link: "/admin/admin-dashboard" },
      { name: "Doctor Dashboard", link: "/admin/doctor-dashboard" },
      { name: "Patient Dashboard", link: "/admin/patient-dashboard" },
    ],
  },
  {
    name: "Doctors",
    icon: Stethoscope,
    children: [
      { name: "Doctors List", link: "/admin/doctors-lit" },
      { name: "Add Doctor", link: "/admin/doctors/add" },
      { name: "Doctor Schedule", link: "/admin/doctors/schedule" },
      { name: "Specializations", link: "/admin/doctors/specializations" },
    ],
  },
  {
    name: "Patients",
    icon: Users,
    children: [
      { name: "Patients List", link: "/admin/patients-list" },
      { name: "Add Patient", link: "/admin/patients/add" },
    ],
  },
  {
    name: "Appointments",
    icon: Calendar,
    children: [
      { name: "All Appointments", link: "/admin/appointments" },
      { name: "Add Appointment", link: "/admin/add/appointments" },
      { name: "Today Appointments", link: "/admin/calendar-view" },
      { name: "Appointment Requests", link: "/admin/appointments/requests" },
    ],
  },
  {
    name: "Prescriptions",
    icon: FileText,
    children: [
      { name: "Prescription List", link: "/admin/prescriptions-list" },
      { name: "Add Prescription", link: "/admin/prescriptions/add" },
      { name: "Medicine Templates", link: "/admin/medicine-list" },
    ],
  },
  {
    name: "Ambulance",
    icon: Ambulance,
    children: [
      { name: "Ambulance Call List", link: "/admin/ambulance-call-list" },
      { name: "Ambulance  List", link: "/admin/ambulance-list" },
      { name: "Ambulance Details", link: "/admin/ambulance/details" },
    ],
  },
  {
    name: "pharmacy",
    icon: Pill,
    children: [
      { name: "Medicine List", link: "/admin/pharmacy-medicine-list" },
      { name: "Add New Medicine", link: "/admin/pharmacy-medicine-add" },

    ],
  },

  {
    name: "Blood Bank",
    icon: Droplet,
    children: [
      { name: "Blood Stock", link: "/admin/blood-bank/stock" },
      { name: "Donors List", link: "/admin/blood-bank/donors" },
      { name: "Add Blood Unit", link: "/admin/blood-bank/add" },
      { name: "Issue Blood", link: "/admin/blood-bank/issue-blood" },
      { name: "Blood Issued", link: "/admin/blood-bank/blood-issued" },
    ],
  },
  {
    name: "Billing",
    icon: CreditCard,
    children: [
      { name: "Invoices", link: "/admin/invoices-list" },
      { name: "Create Invoice", link: "/admin/create-invoice" },
      { name: "Payments History", link: "/admin/payments-history" },
      { name: "Insurance Claims", link: "/admin/insurance-claims" },
    ],
  },
  {
    name: "Departments",
    icon: Building2,
    children: [
      { name: "Department List", link: "/admin/departments-list" },
      { name: "Add Department", link: "/admin/departments/add" },
      { name: "Services Offered", link: "/admin/services-offered" },
    ],
  },
  {
    name: "Inventory",
    icon: Boxes,
    children: [
      { name: "Inventory List", link: "/admin/inventory-dashboard" },
      { name: "Add Items", link: "/admin/inventory-Add" },
      { name: "Stock Alerts", link: "/admin/inventory/stock-alerts" },
      { name: "Suppliers", link: "/admin/inventory/suppliers-list" },
    ],
  },
  {
    name: "Staff",
    icon: Users2,
    children: [
      { name: "All Staff", link: "/admin/all-staff" },
      { name: "Add Staff", link: "/admin/staff/add" },
      { name: "Roles & Permissions", link: "/admin/staff-roles" },
      { name: "Attendance", link: "/admin/staff/attendance" },


    ],
  },
  {
    name: "Records",
    icon: Folder,
    children: [
      { name: "Birth Records", link: "/admin/records/birth-records-list" },
      { name: "Death Records", link: "/admin/records/death-records-list" },
    ],
  },
  {
    name: "Room Allotment",
    icon: BedDouble,
    children: [
      { name: "Alloted Rooms", link: "/admin/rooms/alloted-rooms" },
      { name: "New Room Allotment", link: "/admin/rooms/new-room-allotment" },
      { name: "Rooms by Department", link: "/admin/rooms/rooms-by-department" },
      { name: "Add New Room", link: "/admin/rooms/add-new-room" },
    ],
  },
  {
    name: "Settings",
    icon: Settings,
    children: [
      { name: "General Settings", link: "/admin/settings/general-settings" },
      { name: "Working Hours", link: "/admin/settings/working-hours" },
      // { name: "Integrations", link: "/admin/rooms/add-new-room" },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function AdminSidebar({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>("Dashboard");

  return (
    <aside
      className={`${open ? "w-64" : "w-16"
        } h-screen bg-white border-r flex flex-col transition-all duration-300`}
    >
      {/* ---------- LOGO ---------- */}
      <div className="h-16 px-4 flex items-center gap-3 border-b shrink-0">
        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold">
          +
        </div>
        {open && <span className="font-semibold text-lg">MedixPro</span>}
      </div>

      {/* ---------- MENU (SCROLLABLE) ---------- */}
      <nav className="flex-1 overflow-y-auto min-h-0 px-2 py-3 space-y-1">
        {menuItems.map((menu) => {
          const isOpen = openMenu === menu.name;

          return (
            <div key={menu.name}>
              {/* Parent */}
              <button
                onClick={() =>
                  setOpenMenu(isOpen ? null : menu.name)
                }
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg
                           text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600
                           transition-colors"
              >
                <div className="flex items-center gap-3">
                  <menu.icon size={18} />
                  {open && <span>{menu.name}</span>}
                </div>

                {open && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                )}
              </button>

              {/* Submenu (SMOOTH ANIMATION) */}
              <div
                className={`ml-9 overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen && open
                    ? "max-h-96 opacity-100 translate-y-0 mt-1"
                    : "max-h-0 opacity-0 -translate-y-1"
                  }
                `}
              >
                <div className="space-y-1 py-1">
                  {menu.children.map((child) => (
                    <button
                      key={child.name}
                      onClick={() => navigate(child.link)}
                      className="block w-full text-left px-3 py-2 text-sm rounded-md
                                 text-gray-600 hover:bg-blue-100 hover:text-blue-600
                                 transition-colors"
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* ---------- USER (FIXED BOTTOM) ---------- */}
      <div className="border-t p-4 shrink-0 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          SJ
        </div>
        {open && (
          <div>
            <div className="text-sm font-semibold">Dr. Sarah Johnson</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
        )}
      </div>
    </aside>
  );
}
