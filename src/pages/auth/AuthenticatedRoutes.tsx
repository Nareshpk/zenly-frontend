/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import DashboardLayout from '../../layouts/Dashboard'

export default function AuthenticatedRoutes() {
    const auth: any = localStorage.getItem("auth");
    const parsedAuth = auth ? JSON.parse(auth) : null;
    const navigateTo = useNavigate();


    function redirectToLogin() {
        navigateTo("/");
    }

    useEffect(() => {
        if (!parsedAuth || !parsedAuth?.isAuthenticated) {
            redirectToLogin();
        }
    }, [auth]);


    return (
        <div>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </div>
    )
}
