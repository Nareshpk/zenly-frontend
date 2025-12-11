
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
  }
])
export default routes