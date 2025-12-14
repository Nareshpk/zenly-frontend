import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, CheckCircle, ArrowRight, Users } from "lucide-react";
import { assets } from "../assets/assets";


export default function Hero() {
  const reduce = useReducedMotion();

  const headingAnim:any = reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };

  const paraAnim = reduce
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.12, duration: 0.6 } };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Responsive hero background using picture -> img (better for srcset & caching) */}
      <div className="absolute inset-0 -z-20">
        <picture>
          {/* Desktop / large */}
          <source media="(min-width:1280px)" srcSet={assets.hero_img_lg || assets.hero_img} />
          {/* Tablet / md */}
          <source media="(min-width:768px)" srcSet={assets.hero_img_md || assets.hero_img} />
          {/* Mobile fallback */}
          <img
            src={assets.hero_img_sm || assets.hero_img}
            alt=""
            aria-hidden="true"
            loading="eager"
            className="w-full h-full object-cover object-center"
            style={{ width: "100%", height: "100%" }}
          />
        </picture>
      </div>

      {/* Dim gradient + soft glass overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0f172a]/80 via-[#2a254d]/60 to-transparent" />

      {/* Decorative blob (hide on smallest screens) */}
      <svg
        className="pointer-events-none absolute -left-24 -bottom-48 w-[320px] sm:w-[420px] md:w-[520px] lg:w-[680px] opacity-18 blur-3xl -z-10 hidden sm:block"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g transform="translate(300,300)">
          <path
            d="M120,-160C156,-119,178,-74,188,-24C198,27,196,83,167,122.5C138,162,82,184.6,28,195.9C-26,207.2,-52,207.1,-94,193C-136,178.9,-195,150.7,-204,107C-213,63.3,-172,4.1,-151,-48.6C-130,-101.3,-129,-148.9,-103,-186.2C-77,-223.5,-26,-250.5,29,-268.3C84,-286.1,169,-200,120,-160Z"
            fill="#8B5CF6"
          />
        </g>
      </svg>

      {/* Content wrapper (responsive paddings & max width) */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-20 py-14 sm:py-18 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT: Headline + CTAs */}
          <div className="text-white flex flex-col">
            <motion.h1 {...headingAnim} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight drop-shadow-xl">
              World-class Medical Care
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                When You Need It Most
              </span>
            </motion.h1>

            <motion.p {...paraAnim} className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-indigo-100/90">
              Compassionate care, expert doctors and cutting-edge facilities — available 24/7.
              Book a consultation or appointment with a few clicks.
            </motion.p>

            {/* CTA group */}
            <motion.div
              {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.22, duration: 0.6 } })}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center"
            >
              <a
                href="/doctors"
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] px-5 py-3 text-white shadow-2xl transform transition hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-300/40"
                aria-label="Get Consultation"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Get Consultation</span>
                <span className="ml-2 -mr-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>

              <a
                href="/doctors"
                className="inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 text-white hover:bg-white/12 transition-shadow focus:outline-none focus:ring-4 focus:ring-indigo-200/25"
                aria-label="Get Appointment"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Book Appointment</span>
              </a>
            </motion.div>

            {/* Search pill (collapses on tiny screens: use full-width input under 420px) */}
            <motion.form
              {...(reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.38, duration: 0.6 } })}
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 sm:mt-8 max-w-md w-full"
              role="search"
              aria-label="Search doctors"
            >
              <label className="relative block">
                <input
                  aria-label="Search for doctors, specialties or hospitals"
                  placeholder="Search doctors, specialty or location"
                  className="w-full rounded-full bg-white/6 backdrop-blur-md px-4 py-3 pl-12 placeholder:text-indigo-100/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-300/30 text-sm sm:text-base"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-100/70 text-sm">🔎</span>
              </label>
            </motion.form>

            {/* Trust badges */}
            <motion.div
              {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.52, duration: 0.6 } })}
              className="mt-6 sm:mt-8 flex flex-wrap gap-3 items-center text-indigo-100/80"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/4 px-3 py-2 backdrop-blur-sm">
                <CheckCircle className="w-4 h-4 text-white/90" />
                <span className="text-xs sm:text-sm">Board Certified Doctors</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/4 px-3 py-2 backdrop-blur-sm">
                <Users className="w-4 h-4 text-white/90" />
                <span className="text-xs sm:text-sm">Over 20k Patients Served</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Glass card (collapses under md to full width and stacks below) */}
          <motion.aside
            {...(reduce ? {} : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.12, duration: 0.6 } })}
            className="relative lg:pt-10 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md bg-white/6 backdrop-blur-md border border-white/8 rounded-3xl p-5 sm:p-6 md:p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">Featured Clinic</h3>
                  <p className="text-xs sm:text-sm text-indigo-100/70">Apollo Health Center</p>
                </div>
                <div className="inline-flex items-center gap-2">
                  <div className="text-xs sm:text-sm text-indigo-100/80">4.8</div>
                  <div className="text-xs sm:text-sm text-indigo-100/60">★</div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex items-start gap-3 sm:gap-4">
                <img
                  src={"https://t3.ftcdn.net/jpg/00/77/16/14/360_F_77161499_tKvY6PBucWUl0TgZlpXZL3ZiGIu3BoNu.jpg"}
                  alt="Doctor"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-sm border border-white/6"
                  loading="lazy"
                />
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">Dr. Asha R.</p>
                  <p className="text-xs sm:text-sm text-indigo-100/70">Cardiologist • 15 yrs exp</p>

                  <p className="mt-2 text-indigo-100/70 text-xs sm:text-sm">"Exceptional service and a caring team — my recovery felt safe and supported."</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <a href="/doctors/featured" className="text-sm inline-flex items-center gap-2 rounded-md px-4 py-2 bg-indigo-700/80 text-white shadow-md hover:brightness-105 transition">
                  View Profile
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a href="/book" className="ml-auto text-sm inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 text-white border border-white/8 hover:bg-white/12 transition">
                  Book Now
                </a>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:text-sm text-indigo-100/60">
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-sm sm:text-base">24/7</span>
                  <span>Emergency Care</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-white text-sm sm:text-base">99%</span>
                  <span>Patient Satisfaction</span>
                </div>
              </div>
            </div>

            {/* floating badge (hidden on xs to avoid overlap) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="hidden sm:block absolute -bottom-6 left-6"
            >
              <div className="inline-flex items-center gap-3 rounded-full bg-white/7 backdrop-blur-md px-4 py-2 shadow-lg border border-white/6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#34D399] to-[#06B6D4] flex items-center justify-center text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 12.5l2.5 2.5L16 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-indigo-100/90">Verified Care</div>
                  <div className="text-sm font-medium text-white">Trusted by 20k+</div>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </div>

        {/* Bottom subtle testimonial strip */}
        <motion.div {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.62, duration: 0.6 } })} className="mt-10 mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-white/4 via-white/3 to-white/2 border border-white/6 p-3 sm:p-4 backdrop-blur-md text-indigo-100/80">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={assets.patient_photo || "https://img.freepik.com/..." } alt="patient" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-white/6" loading="lazy" />
              <div>
                <div className="text-white font-medium text-sm sm:text-base">Priya K.</div>
                <div className="text-xs sm:text-sm">"Saved my life. Compassionate and immediate care."</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 text-sm text-indigo-100/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Highly Rated Doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Trusted Network</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
