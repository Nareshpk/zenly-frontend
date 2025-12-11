import React from "react";
import { Users, Heart, ShieldCheck, Stethoscope, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Counter from "./Counter";

export default function AboutPremium() {
  return (
    <div className="bg-gradient-to-b from-[#F6F8FF] to-white">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.h1 initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-[#231F53] leading-tight">
              Compassionate care, advanced medicine — <span className="text-indigo-600">KMC Hospital, Kulithalai</span>
            </motion.h1>

            <motion.p initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08, duration: 0.5 }} className="mt-4 text-gray-600 max-w-2xl">
              We combine modern diagnostics, multi-specialty expertise and a patient-first approach to deliver outcomes that matter. From prevention to specialised treatment — we are with you at every step.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/services" className="inline-flex items-center gap-3 bg-[#231F53] text-white px-5 py-3 rounded-lg shadow-md hover:scale-[0.996] transition">
                Explore Services
                n                <ChevronRight className="w-4 h-4" />
              </a>

              <a href="/contact" className="inline-flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-lg text-gray-800 hover:shadow-sm transition">
                Book Appointment
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-4 items-center text-sm text-gray-600">
              <div className="inline-flex items-center gap-2 bg-white/80 px-3 py-2 rounded-lg shadow-sm">
                <ShieldCheck className="w-4 h-4 text-indigo-600" /> <span>Accredited Facilities</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/80 px-3 py-2 rounded-lg shadow-sm">
                <Users className="w-4 h-4 text-indigo-600" /> <span>Experienced Specialists</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Illustration / image placeholder */}
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/023/740/386/small/medicine-doctor-with-stethoscope-in-hand-on-hospital-background-medical-technology-healthcare-and-medical-concept-photo.jpg" alt="hospital" className="w-full h-[340px] object-cover" />
            </div>

            {/* subtle card */}
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }} className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-lg p-4 w-64">
              <div className="flex items-center gap-3">
                <div className="rounded-lg p-2 bg-indigo-50">
                  <Heart className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Patient Satisfaction</div>
                  <div className="font-semibold text-gray-800">98% Positive Care Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* WHO WE ARE / MISSION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#231F53]">Who we are</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">KMC Hospital is a community-focused multi-specialty hospital providing comprehensive medical services — from outpatient care to advanced surgery and critical care. Our team combines clinical expertise, modern technology and compassionate care to deliver outcomes that put patients first.</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Founded</div>
              <div className="font-bold text-gray-800">2008</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Beds</div>
              <div className="font-bold text-gray-800">120+</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-[#231F53]">Our Mission</h3>
          <p className="mt-3 text-gray-600">To provide compassionate, patient-centered care using evidence-based medicine, delivering the highest standards of clinical excellence while ensuring dignity and respect for all patients.</p>

          <h3 className="mt-6 text-2xl font-semibold text-[#231F53]">Our Vision</h3>
          <p className="mt-3 text-gray-600">To be the region’s most trusted healthcare provider — known for clinical quality, innovation, and community impact.</p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Specialties", value: 15, suffix: "+" },
            { label: "Patients Treated", value: 5000, suffix: "+" },
            { label: "Medical Staff", value: 50, suffix: "+" },
            { label: "Care", value: 24, suffix: "/7" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.06 * i }}
              className="p-6 bg-gradient-to-b from-[#F8FAFF] to-white rounded-xl shadow-sm"
            >
              {/* ANIMATED COUNTER */}
              <div className="text-3xl font-extrabold text-[#231F53]">
                <Counter to={s.value} duration={1500} />
                {s.suffix}
              </div>


              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US / VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-[#231F53]">Our values</h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">Compassion • Integrity • Excellence • Respect</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ translateY: -6 }} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-indigo-50">
                <Stethoscope className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Clinical Excellence</h4>
                <p className="text-sm text-gray-600 mt-1">Best-in-class protocols and multidisciplinary teams for better outcomes.</p>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ translateY: -6 }} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-indigo-50">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Patient Safety</h4>
                <p className="text-sm text-gray-600 mt-1">Rigorous safety standards and continuous quality improvement.</p>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ translateY: -6 }} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-indigo-50">
                <Briefcase className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Community Care</h4>
                <p className="text-sm text-gray-600 mt-1">Outreach programs and preventive care initiatives tailored for our region.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-[#231F53]">Meet our experts</h2>
        <p className="text-center text-gray-600 mt-2">Skilled specialists across multiple disciplines</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-lg transition">
              <div className="h-28 w-28 mx-auto rounded-full overflow-hidden bg-gray-100">
                <img src={`https://i.pravatar.cc/300?img=${i + 10}`} alt={`doctor-${i}`} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4">
                <div className="font-semibold text-gray-800">Dr. A. Example</div>
                <div className="text-sm text-gray-500">Cardiology</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-white">Ready to get care?</h3>
            <p className="text-white/90 mt-1">Book an appointment with our specialists today.</p>
          </div>

          <div className="flex gap-3">
            <a href="/services" className="inline-flex items-center gap-3 bg-white text-indigo-600 px-5 py-3 rounded-lg font-semibold">View Services</a>
            <a href="/contact" className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-lg">Contact Us</a>
          </div>
        </div>
      </section>

      <div className="h-16" />
    </div>
  );
}
