
import React from 'react'


import Navbar from '../pages/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Footer from '../pages/components/Footer';

export default function Dashboard(props: any) {
  const { children } = props;
  const location = useLocation();
  const doctorPath = location.pathname.includes("doctor-dashboard");
  return (
    <>
      <Toaster />
      {!doctorPath && <Navbar />}
      <main>
        {children}
      </main>
      {!doctorPath && <Footer />}
    </>
  );
}
