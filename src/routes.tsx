
import { createBrowserRouter } from "react-router-dom"
import AuthenticatedRoutes from "./pages/auth/AuthenticatedRoutes"
import About from "./pages/pageLists/About"
import Contact from "./pages/pageLists/Contact"
import DoctorDetails from "./pages/pageLists/DoctorDetails"
import Doctors from "./pages/pageLists/Doctors"
import Home from "./pages/pageLists/Home"
import Login from "./pages/pageLists/Login"
import MyAppointments from "./pages/pageLists/MyAppointments"
import Profile from "./pages/pageLists/Profile"
import Services from "./pages/pageLists/Services"
import Signup from "./pages/pageLists/Signup"
import UnauthenticatedRoutes from "./pages/auth/UnauthenticatedRoutes"
import AdminDashboard from "./admin/pages/AdminDashboard"
import ManageDoctors from "./admin/pages/ManageDoctors"
import ManageServices from "./admin/pages/ManageServices"
import ManageAppointments from "./admin/pages/ManageAppointments"
import AdminProfile from "./admin/pages/AdminProfile"
import DoctorDashboard from "./doctor/pages/DoctorDashboard"
import MyPatients from "./doctor/pages/MyPatients"
import Appointments from "./doctor/pages/Appointments"
import AdminRoutes from "./admin/components/AdminRoutes"
import DoctorRoutes from "./doctor/components/DoctorRoutes"
import AdminDoctorForm from "./admin/pages/AdminDoctorForm"
import Requests from "./doctor/pages/Requests"
import AvailableTimings from "./doctor/pages/AvailableTimings"
import SpecialtiesServices from "./doctor/pages/SpecialtiesServices"
import { Reviews } from "@mui/icons-material"
import Accounts from "./doctor/pages/Accounts"
import Invoices from "./doctor/pages/Invoices"
import PayoutSettings from "./doctor/pages/PayoutSettings"
import Message from "./doctor/pages/Message"
import ProfileSettings from "./doctor/pages/ProfileSettings"
import SocialMedia from "./doctor/pages/SocialMedia"
import ChangePassword from "./doctor/pages/ChangePassword"
import Logout from "./doctor/pages/Logout"
import DoctorReviews from "./doctor/pages/DoctorReviews"
import AppointmentDetails from "./doctor/pages/AppointmentDetails"

const routes = createBrowserRouter([

  {
    path: "/",
    element: <UnauthenticatedRoutes ><Home /></UnauthenticatedRoutes>,

  },
  {
    path: "/services",
    element: <UnauthenticatedRoutes ><Services /></UnauthenticatedRoutes>,

  },
  {
    path: "/doctors",
    element: <UnauthenticatedRoutes ><Doctors /></UnauthenticatedRoutes>,

  },
  {
    path: "/about",
    element: <UnauthenticatedRoutes ><About /></UnauthenticatedRoutes>,

  },
  {
    path: "/contact",
    element: <UnauthenticatedRoutes ><Contact /></UnauthenticatedRoutes>,

  },
  {
    path: "/login",
    element: <UnauthenticatedRoutes ><Login /></UnauthenticatedRoutes>,

  },
  {
    path: "/signup",
    element: <UnauthenticatedRoutes ><Signup /></UnauthenticatedRoutes>,

  },
  {
    path: "/app",
    element: <AuthenticatedRoutes />,
    children: [

      {
        path: "dashboard",
        element: <Home />
      },
      {
        path: "services",
        element: <Services />

      },
      {
        path: "doctors",
        element: <Doctors />

      },
      {
        path: "about",
        element: <About />

      },
      {
        path: "contact",
        element: <Contact />

      },
      { path: "doctor-details/:id", element: <DoctorDetails /> },

      { path: "services/:id", element: <Services /> },

      { path: "my-appointments", element: <MyAppointments /> },
      { path: "profile", element: <Profile /> },
    ]
  },
  {
    path: "/admin",
    element: <AdminRoutes />,   // <-- Protect using role="admin"
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "doctors", element: <ManageDoctors /> },
      { path: "services", element: <ManageServices /> },
      { path: "appointments", element: <ManageAppointments /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "doctor-form", element: <AdminDoctorForm /> },
    ]
  },
  {
    path: "/doctor",
    element: <DoctorRoutes />,   // <-- Protect using role="doctor"
    children: [
      { path: "doctor-dashboard", element: <DoctorDashboard /> },
      { path: "doctor-requests", element: <Requests /> },
      { path: "doctor-appointments", element: <Appointments /> },
      { path: "doctor-timings", element: <AvailableTimings /> },
      { path: "doctor-patients", element: <MyPatients /> },
      { path: "doctor-services", element: <SpecialtiesServices /> },
      { path: "doctor-reviews", element: <DoctorReviews /> },
      { path: "doctor-accounts", element: <Accounts /> },
      { path: "doctor-invoices", element: <Invoices /> },
      { path: "doctor-payout", element: <PayoutSettings /> },
      { path: "doctor-message", element: <Message /> },
      { path: "doctor-profile", element: <ProfileSettings /> },
      { path: "doctor-social", element: <SocialMedia /> },
      { path: "doctor-password", element: <ChangePassword /> },
      { path: "doctor-logout", element: <Logout /> },
      { path: "doctor-appointment-details", element: <AppointmentDetails /> },

    ]
  }
])
export default routes