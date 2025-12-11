import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";
import { motion } from "framer-motion";

const cardVariant:any = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

const HealthSpecialties = () => {
  const { healthSpecialties } = useAppContext();
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-b from-[#F6F8FF] to-[#EEF2FF] py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-12 px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Our Healthcare{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            Specialties
          </span>
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
          Explore our premium healthcare services designed to deliver expert care with modern
          facilities and trusted specialists.
        </p>
      </div>

      {/* Responsive grid: 1 / 2 / 3 / 4 */}
      <div className="w-full px-4 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {healthSpecialties.map((specialty: any, index: number) => (
            <motion.article
              key={specialty.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 140 }}
              onClick={() => {
                navigate(`/app/services/${specialty.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/app/services/${specialty.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              className={`group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md
                hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col
                items-center text-center
                border border-transparent sm:border-white/20 bg-white/40 backdrop-blur-xl
                `}
            >
              {/* Image / icon area - responsive sizing */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shadow-lg overflow-hidden mb-4 sm:mb-6">
                {/* Use img with loading="lazy" and object-contain to keep images crisp */}
                <img
                  src={specialty.image}
                  alt={specialty.name}
                  loading="lazy"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-snug">
                {specialty.name}
              </h3>

              {/* Description - more compact on small screens */}
              <p className="text-sm sm:text-sm md:text-base text-slate-600 mt-2 md:mt-3 leading-relaxed max-w-xs">
                {specialty.description}
              </p>

              {/* Spacer ensures CTA stays bottom on taller cards */}
              <div className="flex-1" />

              {/* CTA row */}
              <div className="mt-4 w-full flex items-center justify-center gap-2">
                <span className="text-indigo-600 font-semibold text-sm sm:text-base">Explore</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 transform group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthSpecialties;
