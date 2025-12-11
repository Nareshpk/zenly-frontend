/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/Dashboard';
import toast from 'react-hot-toast';
import { use } from 'react';

export default function AuthenticatedRoutes() {

    const authString = localStorage.getItem("auth");
    const parsedAuth = authString ? JSON.parse(authString) : null;
    const navigate = useNavigate();

    if (!parsedAuth || parsedAuth.isAuthenticated !== true) {
        const id = toast.error("Please login to continue", { duration: 2000 });
        toast.dismiss(id);

        return <Navigate to="/" replace state={{ showLogin: true }} />;
    }
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
}


