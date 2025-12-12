import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from '../../layouts/Dashboard';

export default function DoctorRoutes() {

    const authString = localStorage.getItem("auth");
    const parsedAuth = authString ? JSON.parse(authString) : null;

    if (!parsedAuth || parsedAuth.isAuthenticated !== true) {
        const id = toast.error("Please login to continue", { duration: 2000 });
        toast.dismiss(id);
        return <Navigate to="/" replace state={{ showLogin: true }} />;
    }

    if (parsedAuth.role !== "doctor") {
        toast.error("Access denied — Doctors only", { duration: 2000 });
        return <Navigate to="/unauthorized" replace />;
    }

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
}
