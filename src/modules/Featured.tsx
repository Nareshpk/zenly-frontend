import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { featuresData } from "../assets/assets";
import { Check } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Featured() {
  const [activeDetail, setActiveDetail] = useState<any>(null);

  return (
    <section
      aria-labelledby="featured-heading"
      className="w-full bg-gradient-to-b from-[#FBFBFF] to-[#F6F8FF] py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Decorative soft gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-4 top-4 sm:left-8 sm:top-8 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full opacity-10 blur-3xl"
        style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)", zIndex: 0 }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Heading */}
        <header className="text-center max-w-4xl mx-auto">
          <h2 id="featured-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Committed to Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-400">
              Health
            </span>{" "}
            & Happiness
          </h2>

          <p className="mt-3 sm:mt-4 mx-auto text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl">
            Your well-being is our priority. Explore our core features and services — designed for clarity,
            comfort, and exceptional outcomes.
          </p>
        </header>

        {/* Cards grid (FULL-WIDTH) — mobile-first responsive columns */}
        <motion.div
          className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
        >
          {featuresData.map((feature: any, idx: number) => (
            <FeatureCard key={idx} feature={feature} idx={idx} onOpen={() => setActiveDetail(feature)} />
          ))}
        </motion.div>

        {/* Trust strip */}
        <div className="mt-8 sm:mt-10 mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-slate-600">
          <div className="inline-flex items-center gap-3 bg-white/20 px-3 py-1.5 rounded-full border border-white/8 shadow-sm">
            <strong className="text-slate-900">20k+</strong> Patients Trusted
          </div>
          <div className="inline-flex items-center gap-3 bg-white/20 px-3 py-1.5 rounded-full border border-white/8 shadow-sm">
            <strong className="text-slate-900">24/7</strong> Emergency Support
          </div>
          <div className="inline-flex items-center gap-3 bg-white/20 px-3 py-1.5 rounded-full border border-white/8 shadow-sm">
            <strong className="text-slate-900">Board-Certified</strong> Specialists
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {activeDetail && <DetailModal feature={activeDetail} onClose={() => setActiveDetail(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ---------------------------
   Feature Card Component
   - full height cards (h-full)
   - responsive adjustments for mobile/tablet/desktop
----------------------------*/
function FeatureCard({ feature, idx, onOpen }: { feature: any; idx: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  // Only enable tilt on devices that support hover/fine pointer (desktop/laptop)
  useEffect(() => {
    const canHover = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return; // don't register hover listeners on touch devices

    function reset() {
      setTilt({ rx: 0, ry: 0, tx: 0, ty: 0 });
    }
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mouseleave', reset);
    el.addEventListener('blur', reset);
    return () => {
      el.removeEventListener('mouseleave', reset);
      el.removeEventListener('blur', reset);
    };
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    // guard: ignore pointer move on touch devices
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 8;
    const rx = -(py - 0.5) * 8;
    const tx = (px - 0.5) * 6;
    const ty = (py - 0.5) * 6;
    setTilt({ rx, ry, tx, ty });
  };

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      className="relative rounded-2xl overflow-hidden cursor-pointer h-full"
      style={{ perspective: 1200 }}
      onMouseMove={handleMove}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      aria-label={`Open details for ${feature.heading}`}
    >
      {/* Glass card base - make it fill height with flex layout */}
      <div
        className={`
          relative flex flex-col justify-between h-full
          bg-gradient-to-tr from-white/30 to-white/20 backdrop-blur-md border border-white/8
          shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          hover:shadow-[0_14px_40px_rgba(99,102,241,0.06)]
          transition-all duration-300
          p-4 sm:p-5 md:p-6
        `}
      >
        {/* Animated inner layer to create 3D tilt */}
        <motion.div
          animate={{
            rotateX: tilt.rx,
            rotateY: tilt.ry,
            x: tilt.tx,
            y: tilt.ty,
            scale: 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.4 }}
          className="relative z-10 flex-1 flex flex-col"
        >
          {/* Top section */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div
              className="flex-none w-16 h-16 sm:w-20 sm:h-20 rounded-xl grid place-items-center
                         bg-gradient-to-tr from-white/10 to-white/5 border border-white/6"
            >
              <img src={feature.image} alt={feature.heading} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 truncate">
                {feature.heading}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-3">{feature.description}</p>
            </div>
          </div>

          {/* Highlights (added) */}
          {feature.highlights && feature.highlights.length > 0 && (
            <div className="mt-3 sm:mt-4 grid gap-2">
              {feature.highlights.slice(0, 4).map((h: string, i: number) => (
                <div key={i} className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-none mt-1">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600">{h}</p>
                </div>
              ))}
            </div>
          )}

          {/* stretch spacer so CTA is at bottom */}
          <div className="flex-1" />

          {/* Stats + CTA (bottom row) */}
          <div className="mt-4 sm:mt-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              {feature.stat && (
                <div className="inline-flex items-center gap-2 bg-white/10 px-2 sm:px-3 py-1 rounded-full text-sm font-medium text-slate-900 border border-white/6">
                  <span className="text-xs opacity-80">{feature.stat}</span>
                </div>
              )}

              <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white/30" />
                Trusted & Verified
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation(); // prevents parent card click if intended
                if (typeof onOpen === "function") onOpen();
              }}
              className="relative z-20 pointer-events-auto inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full
             bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm sm:text-sm font-semibold shadow-md
             focus:outline-none focus:ring-4 focus:ring-indigo-200/40"
            >
              Learn More
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Subtle floating accent */}
        <div
          className="pointer-events-none absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          style={{ background: "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.12), transparent 35%)" }}
        />
      </div>
    </motion.article>
  );
}

/* ---------------------------
   Detail Modal (motion) — responsive image/content layout
----------------------------*/
function DetailModal({ feature, onClose }: { feature: any; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 to-white/85 shadow-2xl border border-white/10"
        initial={{ y: 20, opacity: 0, scale: 0.995 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.995 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ maxHeight: '85vh' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[70vh]">
          {/* Left: image uses responsive height; on small screens image sits above content */}
          <div className="h-56 md:h-full overflow-hidden">
            <img src={feature.image} alt={feature.heading} className="w-full h-full object-cover object-center" />
          </div>

          {/* Right: content */}
          <div className="p-4 sm:p-6 md:p-8 overflow-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">{feature.heading}</h3>
                {feature.stat && <div className="mt-1 text-sm text-slate-600">{feature.stat}</div>}
              </div>

              <button
                onClick={onClose}
                aria-label="Close details"
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 sm:mt-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>{feature.details ?? feature.description}</p>

              {/* highlights (if provided) */}
              {feature.highlights && feature.highlights.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Highlights</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-sm text-slate-600">
                    {feature.highlights.map((h: string, i: number) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* extra details mock */}
              <ul className="mt-4 list-disc pl-5 text-sm text-slate-600 space-y-2">
                <li>Board certified clinicians & experienced support staff</li>
                <li>Advanced diagnostic & treatment pathways</li>
                <li>Integrated digital follow-up & appointment scheduling</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:brightness-105"
              >
                Book Consultation
              </a>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/features";
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-800"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
