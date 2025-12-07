
import { createBrowserRouter, Navigate } from "react-router-dom"
import SignInPage from "./pages/auth/SignInPage"
import SignUpPage from "./pages/auth/SignUpPage"
import AuthenticatedRoutes from "./pages/auth/AuthenticatedRoutes"
import Dashboard from "./pages/components/Dashboard"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <SignInPage />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    },
    {
        path: "/*",
        element: <Navigate to="/" replace />,
    },
    {
        path: "/app",
        element: <AuthenticatedRoutes />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ]
    }
])
export default routes