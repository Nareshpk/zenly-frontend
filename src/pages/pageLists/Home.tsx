/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Hero from '../../modules/Hero'
import HealthSpecialties from '../../modules/HealthSpecialities'
import Mission from '../../modules/Mission'
import Featured from '../../modules/Featured'
import HowItWorks from '../../modules/HowItWorks'
import WhyChooseUs from '../../modules/WhyChooseUs'
import OurDoctors from '../../modules/OurDoctors'
import Testimonial from '../../modules/Testimonial'
import Gallery from '../../modules/Gallery'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginDialog from '../dialog/LoginDialog'

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openLogin, setOpenLogin] = useState(false);
  const [returnTo, setReturnTo] = useState(null);

  useEffect(() => {
    if (location.state?.showLogin) {
      setOpenLogin(true);
      setReturnTo(location.state?.from ?? null);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);


  const handleLoginSuccess = (authObject: any) => {
    localStorage.setItem("auth", JSON.stringify(authObject));
    setOpenLogin(false);

    if (returnTo) {
      navigate(returnTo, { replace: true });
    } else {
      navigate("/app", { replace: true });
    }
  };

  return (
    <div>
      <Hero />
      <HealthSpecialties />
      <Mission />
      <Featured />
      <HowItWorks />
      <WhyChooseUs />
      <OurDoctors />
      <Testimonial />
      <Gallery />
      <LoginDialog open={openLogin} onClose={() => setOpenLogin(false)} onLoginSuccess={handleLoginSuccess} />

    </div>
  )
}

export default Home
