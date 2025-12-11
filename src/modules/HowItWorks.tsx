
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { howItWorks } from "../assets/assets";

const containerVariants:any = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const headerVariants:any = { hidden: { opacity: 0, y: -10, scale: 0.995 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } } };
const cardVariants:any = { hidden: { opacity: 0, y: 18, scale: 0.995 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } } };

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="howitworks-heading"
      className="w-full bg-gradient-to-b from-[#FBFDFF] via-[#F6F9FF] to-[#EEF6FF] py-14 sm:py-16 md:py-20 relative overflow-hidden"
    >
      {/* Decorative glows — smaller on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-16 sm:-left-20 sm:-top-24 w-[260px] sm:w-[520px] h-[260px] sm:h-[520px] rounded-full opacity-20 blur-2xl sm:blur-3xl"
        style={{ background: "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.10), transparent 35%)" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-16 sm:-right-24 sm:-bottom-24 w-[260px] sm:w-[520px] h-[260px] sm:h-[520px] rounded-full opacity-20 blur-2xl sm:blur-3xl"
        style={{ background: "radial-gradient(circle at 80% 80%, rgba(14,165,233,0.08), transparent 35%)" }}
      />

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-24">
        {/* Header */}
        <motion.header
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.55 }}
          variants={headerVariants}
        >
          <motion.h2
            id="howitworks-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight"
            variants={headerVariants}
          >
            Streamlined Healthcare <br className="hidden sm:block" />
            <span className="text-indigo-600">Approach</span>
          </motion.h2>

          <motion.p
            className="mt-3 sm:mt-4 mx-auto text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl"
            variants={headerVariants}
          >
            Our streamlined approach makes healthcare simple, efficient and reassuring. Follow four easy steps from
            consultation to care — thoughtfully designed to keep you safe and comfortable.
          </motion.p>

          {/* Appointment time badge */}
          <motion.div
            className="mt-6 sm:mt-8 inline-flex items-center gap-3 sm:gap-4 bg-white shadow-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
            variants={headerVariants}
          >
            <motion.span
              className="flex items-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: [0.95, 1.03, 0.95] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
            </motion.span>

            <motion.span variants={headerVariants} className="text-xs sm:text-sm text-slate-600">
              Average appointment time: <strong className="text-slate-800 ml-1">20–30 mins</strong>
            </motion.span>
          </motion.div>
        </motion.header>

        {/* Steps Grid — fully responsive */}
        <motion.div
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {howItWorks.map((item: any, idx: number) => (
            <motion.article
              key={idx}
              variants={cardVariants}
              whileHover={{ translateY: -6 }}
              className="relative group rounded-2xl p-5 sm:p-6 bg-white border border-slate-100 shadow-md overflow-hidden cursor-pointer focus:outline-none transform-gpu"
              tabIndex={0}
              role="button"
              aria-label={`Step ${idx + 1}: ${item.heading}`}
              onKeyDown={(e) => { if (e.key === "Enter") window.location.href = item.ctaLink ?? "#"; }}
            >
              {/* Hover accent */}
              <motion.span
                aria-hidden
                className="absolute -inset-0.5 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  boxShadow: "0 8px 32px rgba(99,102,241,0.06)",
                  background: "linear-gradient(120deg, rgba(99,102,241,0.04), rgba(14,165,233,0.03))",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Step icon */}
                  <motion.div className="flex-none" initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-indigo-100 to-cyan-50 flex items-center justify-center text-indigo-600 shadow-sm ring-1 ring-slate-50">
                      <motion.span
                        initial={{ y: 0 }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="font-semibold text-base sm:text-lg"
                      >
                        {idx + 1}
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 text-base sm:text-lg font-semibold">{item.heading}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-4">{item.description}</p>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="mt-4 grid gap-2">
                        {item.highlights.slice(0, 3).map((h: string, i: number) => (
                          <li key={i} className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 bg-slate-50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                            <span className="truncate">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Buttons */}
                    <div className="mt-4 sm:mt-5 flex items-center gap-3">
                      <motion.a
                        href={item.ctaLink ?? "#"}
                        whileHover={{ scale: 1.03, y: -1 }}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 px-3 py-2 rounded-full shadow-sm hover:brightness-105"
                      >
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </motion.a>

                      <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        whileHover={{ scale: 1.02 }}
                        className="text-xs sm:text-sm text-slate-500 underline underline-offset-2 bg-transparent"
                        aria-label="Quick help"
                      >
                        Quick help
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-6 -bottom-10 sm:-right-8 sm:-bottom-12 w-32 sm:w-44 h-32 sm:h-44 rounded-full blur-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileHover={{ opacity: 0.6, scale: 1.02 }}
                transition={{ duration: 0.45 }}
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.06), transparent 40%)" }}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Footer trust badges */}
        <motion.div
          className="mt-8 sm:mt-10 mx-auto max-w-4xl text-center text-xs sm:text-sm text-slate-600"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span className="inline-flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-100 shadow-sm">
            ✅ Board-certified doctors
          </motion.span>
          <span className="mx-2 sm:mx-4">•</span>
          <motion.span className="inline-flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-100 shadow-sm">

            24/7 Emergency </motion.span> </motion.div> </div> </section>);
}