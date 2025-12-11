import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { assets } from "../assets/assets";


const values = [
  { title: "Integrity", desc: "We act with honesty and strong moral principles." },
  { title: "Respect", desc: "We honor the dignity of every patient and colleague." },
  { title: "Innovation", desc: "We embrace new technology and better ways of caring." },
  { title: "Excellence", desc: "We deliver outstanding clinical outcomes and service." },
];

export default function Mission() {
  return (
    <section className="w-full bg-gradient-to-b from-[#F3F5FF] to-[#EEF2FF] py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 ">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
          relative bg-white/60 backdrop-blur-2xl border border-white/10 
          rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 
          shadow-xl h-full
        "
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Our Mission &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-400">
                Values
              </span>
            </h2>

            <div className="mt-4 space-y-4 text-slate-700">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                <strong>Mission:</strong> Our mission is to deliver compassionate,
                patient-centered healthcare...
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We strive to provide accessible, affordable, and high-quality care...
              </p>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                <strong>Vision:</strong> To become a globally recognized healthcare
                ecosystem known for excellence and innovation.
              </p>
            </div>

            {/* VALUES GRID */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-start gap-3 bg-white/40 border border-white/10 rounded-xl p-3"
                >
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-tr from-[#06B6D4] to-[#7c3aed] flex items-center justify-center text-white">
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* COMMITMENTS + TRUST */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold">Our Commitments</h4>
                <ul className="mt-2 text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• Patient-first consultations</li>
                  <li>• Personalized care plans</li>
                  <li>• Highest ethical standards</li>
                  <li>• Continuous improvement</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Why Patients Trust Us</h4>
                <ul className="mt-2 text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• Experienced medical professionals</li>
                  <li>• International-grade equipment</li>
                  <li>• Transparent communication</li>
                  <li>• 24/7 emergency support</li>
                </ul>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/about"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-md text-sm sm:text-base"
              >
                Learn More
              </a>
              <a
                href="/contact"
                className="px-5 py-3 rounded-xl bg-white/20 border border-white/10 text-slate-900 hover:bg-white/30 text-sm sm:text-base"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-full flex justify-center"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://www.kindpng.com/picc/m/275-2754908_department-of-health-doctors-hd-png-download.png"
                className="w-full h-full object-cover"
                alt="Medical team"
              />
            </div>

            {/* FLOATING SMALL IMAGE */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute bottom-6 right-6 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={assets.mission_img2}
                className="w-full h-full object-cover"
                alt="Medical staff portrait"
              />
            </motion.div>

            {/* FLOATING BADGE */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-md border border-white/20 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-400 flex items-center justify-center text-white text-xs">
                24
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-800">24 / 7</div>
                <div className="text-slate-600">Emergency Support</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

  );
}
