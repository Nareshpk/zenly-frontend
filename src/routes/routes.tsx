
import { createBrowserRouter } from "react-router-dom"
import AdminRoutes from "../admin/components/AdminRoutes"
import AdminDashboard from "../admin/pages/AdminDashboard"

import AIChat from "../CommenPage/AIChat"
import DoctorRoutes from "../doctor/components/DoctorRoutes"
import Accounts from "../doctor/pages/Accounts"
import AppointmentDetails from "../doctor/pages/AppointmentDetails"
import Appointments from "../doctor/pages/Appointments"
import AvailableTimings from "../doctor/pages/AvailableTimings"
import DoctorAudioCall from "../doctor/pages/Calls/DoctorAudioCall"
import DoctorVideoCall from "../doctor/pages/Calls/DoctorVideoCall"
import ChangePassword from "../doctor/pages/ChangePassword"
import DoctorDashboard from "../doctor/pages/DoctorDashboard"
import DoctorDashboards from "../admin/pages/DoctorDashboard"
import DoctorReviews from "../doctor/pages/DoctorReviews"
import Invoices from "../doctor/pages/Invoices"
import Logout from "../doctor/pages/Logout"
import Message from "../doctor/pages/Message"
import MyPatients from "../doctor/pages/MyPatients"
import PayoutSettings from "../doctor/pages/PayoutSettings"
import ProfileSettings from "../doctor/pages/ProfileSettings"
import Requests from "../doctor/pages/Requests"
import SocialMedia from "../doctor/pages/SocialMedia"
import SpecialtiesServices from "../doctor/pages/SpecialtiesServices"
import AuthenticatedRoutes from "../pages/auth/AuthenticatedRoutes"
import UnauthenticatedRoutes from "../pages/auth/UnauthenticatedRoutes"
import About from "../pages/pageLists/About"
import Contact from "../pages/pageLists/Contact"
import DoctorDetails from "../pages/pageLists/DoctorDetails"
import Doctors from "../pages/pageLists/Doctors"
import Home from "../pages/pageLists/Home"
import Login from "../pages/pageLists/Login"
import MyAppointments from "../pages/pageLists/MyAppointments"
import PatientIncomingCall from "../pages/pageLists/PatientIncomingCall"
import PatientVideoCall from "../pages/pageLists/PatientVideoCall"
import Profile from "../pages/pageLists/Profile"
import Services from "../pages/pageLists/Services"
import Signup from "../pages/pageLists/Signup"
import PatientDashboard from "../admin/pages/PatientDashboard"
import DoctorsListPage from "../admin/pages/DoctorPage/DoctorList/DoctorsListPage"
import AddDoctorPersonalInfo from "../admin/pages/AddDoctorPersonalInfo"
import DoctorSchedule from "../admin/pages/DoctorPage/DoctorList/DoctorSchedule"
import SpecializationsPage from "../admin/pages/DoctorPage/DoctorList/SpecializationsPage"
import PatientsList from "../admin/pages/PatientsPage/PatientsList/PatientsList"
import AddPatient from "../admin/pages/PatientsPage/PatientsForm/AddPatient"
import AllAppointments from "../admin/pages/PatientsPage/PatientsList/AllAppointments"
import AppointmentCalendar from "../admin/pages/PatientsPage/PatientsList/AppointmentCalendar"
import AddAppointment from "../admin/pages/PatientsPage/PatientsForm/AddAppointment"
import AppointmentRequests from "../admin/pages/PatientsPage/PatientsList/AppointmentRequests"
import Prescriptions from "../admin/pages/PrescriptionsPage/List/Prescriptions"
import CreatePrescription from "../admin/pages/PrescriptionsPage/Form/CreatePrescription"
import MedicineTemplates from "../admin/pages/medicine-templates/MedicineTemplates"
import EditTemplate from "../admin/pages/medicine-templates/EditTemplate"
import ViewTemplateDetails from "../admin/pages/medicine-templates/ViewTemplateDetails"
import AmbulanceCallList from "../admin/pages/Ambulance/AmbulanceCallList"
import AmbulanceCallDetails from "../admin/pages/Ambulance/AmbulanceCallDetails"
import PatientDetailsPage from "../admin/pages/Ambulance/PatientDetailsPage"
import AmbulanceList from "../admin/pages/Ambulance/AmbulanceList"
import AmbulanceDetails from "../admin/pages/Ambulance/AmbulanceDetails"
import AddNewMedicine from "../admin/pages/pharmacy/AddNewMedicine"
import MedicineList from "../admin/pages/pharmacy/MedicineList"
import MedicineInformationPage from "../admin/pages/pharmacy/MedicineInformation"
import BloodStockDashboard from "../admin/pages/BloodBank/BloodStockDashboard"
import UpdateBloodUnit from "../admin/pages/BloodBank/UpdateBloodUnit"
import BloodUnitDetails from "../admin/pages/BloodBank/BloodUnitDetails"
import BloodDonorsPage from "../admin/pages/BloodBank/BloodDonorsPage"
import DonorDetailsPage from "../admin/pages/BloodBank/DonorDetailsPage"
import AddBloodUnitPage from "../admin/pages/BloodBank/AddBloodUnitPage"
import EditDonorPage from "../admin/pages/BloodBank/EditDonorPage"
import IssueBloodPage from "../admin/pages/BloodBank/IssueBloodPage"
import IssuedBloodDashboard from "../admin/pages/BloodBank/IssuedBloodDashboard"
import InvoicesListPage from "../admin/pages/Invoices/InvoicesListPage"
import CreateInvoicePage from "../admin/pages/Invoices/CreateInvoicePage"
import { PaymentHistory } from "../admin/pages/Invoices/PaymentHistory"
import { ViewInvoice } from "../admin/pages/Invoices/ViewInvoice"
import { PaymentReceipt } from "../admin/pages/Invoices/PaymentReceipt"
import { InsuranceClaimsPage } from "../admin/pages/Invoices/InsuranceClaimsPage"
import { ClaimDetailsPage } from "../admin/pages/Invoices/ClaimDetailsPage"
import { AddDepartmentPage } from "../admin/pages/Departments/AddDepartmentPage"
import { DepartmentsListPage } from "../admin/pages/Departments/DepartmentsListPage"
import { DepartmentViewPage } from "../admin/pages/Departments/DepartmentViewPage"
import { EditDepartmentPage } from "../admin/pages/Departments/EditDepartmentPage"
import { DepartmentStaffPage } from "../admin/pages/Departments/DepartmentStaffPage"
import { ServicesOfferedPage } from "../admin/pages/Departments/ServicesOfferedPage"
import InventoryDashboard from "../admin/pages/Inventory/InventoryDashboard"
import InventoryDetails from "../admin/pages/Inventory/InventoryDetails"
import EditItemPage from "../admin/pages/Inventory/EditItemPage"
import AddInventoryPage from "../admin/pages/Inventory/AddInventoryPage"
import StockAlerts from "../admin/pages/Inventory/StockAlerts"
import SuppliersPage from "../admin/pages/Inventory/SuppliersPage"
import SupplierInformationPage from "../admin/pages/Inventory/SupplierInformationPage"
import EditSupplierPage from "../admin/pages/Inventory/EditSupplier"
import AddNewStaff from "../admin/pages/Staff/AddNewStaff"
import StaffManagement from "../admin/pages/Staff/StaffManagement"
import RolesPermissionsPage from "../admin/pages/Staff/RolesPermissionsPage"
import AdministratorRolePage from "../admin/pages/Staff/Viewpage/AdministratorRolePage"
import EditAdministratorRole from "../admin/pages/Staff/Viewpage/EditAdministratorRole"
import AdministratorRoleUsers from "../admin/pages/Staff/Viewpage/AdministratorRoleUsers"
import StaffProfilePage from "../admin/pages/Staff/Viewpage/StaffProfilePage"
import EditStaffProfile from "../admin/pages/Staff/Viewpage/EditStaffProfile"
import StaffScheduleEdit from "../admin/pages/Staff/Viewpage/StaffScheduleEdit"
import StaffAttendance from "../admin/pages/Staff/StaffAttendance"
import BirthRecordsPage from "../admin/pages/Records/BirthRecordsPage"
import AddBirthRecord from "../admin/pages/Records/AddBirthRecord"
import BirthRecordDetailsPage from "../admin/pages/Records/BirthRecordDetailsPage"
import BirthCertificatePage from "../admin/pages/Records/BirthCertificatePage"
import DeathRecordsPage from "../admin/pages/Records/DeathRecordsPage"
import AddDeathRecordPage from "../admin/pages/Records/AddDeathRecordPage"
import DeathRecordDetailsPage from "../admin/pages/Records/DeathRecordDetailsPage"
import AllottedRoomsPage from "../admin/pages/RoomAllotment/AllottedRoomsPage"
import RoomAllotmentDetailsPage from "../admin/pages/RoomAllotment/RoomAllotmentDetailsPage"
import EditRoomAllotmentPage from "../admin/pages/RoomAllotment/EditRoomAllotmentPage"
import NewRoomAllotment from "../admin/pages/RoomAllotment/NewRoomAllotment"
import RoomsByDepartmentPage from "../admin/pages/RoomAllotment/RoomsByDepartmentPage"
import RoomDetailsPage from "../admin/pages/RoomAllotment/RoomDetailsPage"
import EditRoomPage from "../admin/pages/RoomAllotment/EditRoomPage"
import AddNewRoomPage from "../admin/pages/RoomAllotment/AddNewRoomPage"
import GeneralSettings from "../admin/pages/Settings/GeneralSettings"
import WorkingHoursPage from "../admin/pages/Settings/WorkingHoursPage"
import DoctorProfile from "../admin/pages/DoctorPage/DoctorList/DoctorProfile"
import DoctorAPSchedule from "../admin/pages/DoctorPage/DoctorList/DoctorAPSchedule"
import EditSpecializationPage from "../admin/pages/DoctorPage/DoctorList/EditSpecializationPage"


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
      { path: "patient/audio-call/:id", element: <PatientIncomingCall /> },
      { path: "patient/video-call/:id", element: <PatientVideoCall /> },
      { path: "user-message", element: <Message /> },
      { path: "ai-chat", element: <AIChat /> },

    ]
  },
  {
    path: "/admin",
    element: <AdminRoutes />,   // <-- Protect using role="admin"
    children: [
      { path: "admin-dashboard", element: <AdminDashboard /> },
      { path: "doctor-dashboard", element: <DoctorDashboards /> },
      { path: "patient-dashboard", element: <PatientDashboard /> },
      { path: "doctors/appointment-schedule", element: <DoctorAPSchedule /> },
      { path: "doctors-lit", element: <DoctorsListPage /> },
      { path: "doctor-profile", element: <DoctorProfile /> },
      { path: "doctors/add", element: <AddDoctorPersonalInfo /> },
      { path: "doctors/edit/:id", element: <AddDoctorPersonalInfo /> },
      { path: "doctors/schedule", element: <DoctorSchedule /> },
      { path: "doctors/specializations", element: <SpecializationsPage /> },
      { path: "doctors/specializations-edit/:id", element: <EditSpecializationPage /> },
      { path: "patients-list", element: <PatientsList /> },
      { path: "patients/add", element: <AddPatient /> },
      { path: "appointments", element: <AllAppointments /> },
      { path: "calendar-view", element: <AppointmentCalendar /> },
      { path: "add/appointments", element: <AddAppointment /> },
      { path: "appointments/requests", element: <AppointmentRequests /> },
      { path: "prescriptions-list", element: <Prescriptions /> },
      { path: "prescriptions/add", element: <CreatePrescription /> },
      { path: "medicine-list", element: <MedicineTemplates /> },
      { path: "edit-template", element: <EditTemplate /> },
      { path: "view-details", element: <ViewTemplateDetails /> },
      { path: "ambulance-call-list", element: <AmbulanceCallList /> },
      { path: "ambulance-list", element: <AmbulanceList /> },
      { path: "ambulance-details", element: <AmbulanceCallDetails /> },
      { path: "patient-details", element: <PatientDetailsPage /> },
      { path: "ambulance/details", element: <AmbulanceDetails /> },
      { path: "pharmacy-medicine-add", element: <AddNewMedicine /> },
      { path: "pharmacy-medicine-list", element: <MedicineList /> },
      { path: "medicine-info", element: <MedicineInformationPage /> },
      { path: "blood-bank/stock", element: <BloodStockDashboard /> },
      { path: "update/stock", element: <UpdateBloodUnit /> },
      { path: "view/stock-details", element: <BloodUnitDetails /> },
      { path: "blood-bank/donors", element: <BloodDonorsPage /> },
      { path: "donor-details", element: <DonorDetailsPage /> },
      { path: "blood-bank/add", element: <AddBloodUnitPage /> },
      { path: "blood-bank/edit", element: <EditDonorPage /> },
      { path: "blood-bank/issue-blood", element: <IssueBloodPage /> },
      { path: "blood-bank/blood-issued", element: <IssuedBloodDashboard /> },
      { path: "invoices-list", element: <InvoicesListPage /> },
      { path: "create-invoice", element: <CreateInvoicePage /> },
      { path: "payments-history", element: <PaymentHistory /> },
      { path: "view-invoice", element: <ViewInvoice /> },
      { path: "payment-receipt", element: <PaymentReceipt /> },
      { path: "insurance-claims", element: <InsuranceClaimsPage /> },
      { path: "claim-details", element: <ClaimDetailsPage /> },
      { path: "departments/add", element: <AddDepartmentPage /> },
      { path: "departments-list", element: <DepartmentsListPage /> },
      { path: "departments-view", element: <DepartmentViewPage /> },
      { path: "edit-department", element: <EditDepartmentPage /> },
      { path: "department-staff", element: <DepartmentStaffPage /> },
      { path: "services-offered", element: <ServicesOfferedPage /> },
      { path: "inventory-dashboard", element: <InventoryDashboard /> },
      { path: "inventory-details", element: <InventoryDetails /> },
      { path: "edit-item", element: <EditItemPage /> },
      { path: "inventory-Add", element: <AddInventoryPage /> },
      { path: "inventory/stock-alerts", element: <StockAlerts /> },
      { path: "inventory/suppliers-list", element: <SuppliersPage /> },
      { path: "supplier-info", element: <SupplierInformationPage /> },
      { path: "edit-supplier", element: <EditSupplierPage /> },
      { path: "edit-supplier", element: <EditSupplierPage /> },
      { path: "staff/add", element: <AddNewStaff /> },
      { path: "all-staff", element: <StaffManagement /> },
      { path: "staff-roles", element: <RolesPermissionsPage /> },
      { path: "view-roles", element: <AdministratorRolePage /> },
      { path: "edit-roles", element: <EditAdministratorRole /> },
      { path: "view-user", element: <AdministratorRoleUsers /> },
      { path: "staff/profile", element: <StaffProfilePage /> },
      { path: "staff/edit-profile", element: <EditStaffProfile /> },
      { path: "staff/schedule", element: <StaffScheduleEdit /> },
      { path: "staff/attendance", element: <StaffAttendance /> },
      { path: "records/birth-records-list", element: <BirthRecordsPage /> },
      { path: "records/birth-records-add", element: <AddBirthRecord /> },
      { path: "records/birth-records-details", element: <BirthRecordDetailsPage /> },
      { path: "records/birth-records-certificate", element: <BirthCertificatePage /> },
      { path: "records/death-records-list", element: <DeathRecordsPage /> },
      { path: "records/death-records-add", element: <AddDeathRecordPage /> },
      { path: "records/death-records-details", element: <DeathRecordDetailsPage /> },
      { path: "rooms/alloted-rooms", element: <AllottedRoomsPage /> },
      { path: "rooms/room-allotment-details", element: <RoomAllotmentDetailsPage /> },
      { path: "rooms/edit-room-allotment-details", element: <EditRoomAllotmentPage /> },
      { path: "rooms/new-room-allotment", element: <NewRoomAllotment /> },
      { path: "rooms/rooms-by-department", element: <RoomsByDepartmentPage /> },
      { path: "rooms/room-details", element: <RoomDetailsPage /> },
      { path: "rooms/edit-room-details", element: <EditRoomPage /> },
      { path: "rooms/add-new-room", element: <AddNewRoomPage /> },
      { path: "settings/general-settings", element: <GeneralSettings /> },
      { path: "settings/working-hours", element: <WorkingHoursPage /> },
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
      { path: "audio-call/:id", element: <DoctorAudioCall /> },
      { path: "video-call/:id", element: <DoctorVideoCall /> }

    ]
  }
])
export default routes