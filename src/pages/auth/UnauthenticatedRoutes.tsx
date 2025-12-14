import { Navigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';


interface props {
    children: any;
}
const UnauthenticatedRoutes = ({ children }: props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const doctorPath = location.pathname.includes("doctor-dashboard");

    const authString = localStorage.getItem("auth");
    const parsedAuth = authString ? JSON.parse(authString) : null;
    const isLoggedIn = parsedAuth?.isAuthenticated === true;
    return !isLoggedIn ? <> {!doctorPath && <Navbar sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen} />
    }{children} {!doctorPath && <Footer />} </> : <Navigate to="/app/dashboard" />;
}

export default UnauthenticatedRoutes;
