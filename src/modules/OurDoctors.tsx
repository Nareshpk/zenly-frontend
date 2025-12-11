import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doctorsData } from "../assets/assets";

/**
 * OurDoctors — Full-Width Ultra-Premium Carousel (copy-paste)
 *
 * - Full-bleed section (edge-to-edge)
 * - Smooth snap horizontal scrolling
 * - Framer Motion entrance + hover micro-interactions
 * - Arrow controls, keyboard navigation, touch drag friendly
 * - Autoplay with pause-on-hover/focus
 * - Accessible: aria labels, focusable cards
 */

export default function OurDoctors() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // calculate scroll amount ≈ 85% of container width
  const scrollByAmount = (multiplier = 0.85) => {
    const el = containerRef.current;
    if (!el) return 0;
    return Math.round(el.clientWidth * multiplier);
  };

  const scroll = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = scrollByAmount();
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Keep track of active visible card for indicators
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (!el) return;
      const children = Array.from(el.querySelectorAll<HTMLElement>("[data-card-index]"));
      if (!children.length) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((c, i) => {
        const left = c.offsetLeft;
        const mid = left + c.clientWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {});
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // keyboard nav (global)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        scroll("right");
      } else if (e.key === "ArrowLeft") {
        scroll("left");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autoplay (pause on hover/focus)
  useEffect(() => {
    const id = setInterval(() => {
      if (isPaused) return;
      scroll("right");
    }, 4500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  return (
    <section className="w-full bg-gradient-to-b from-[#FBFBFF] to-[#F4F8FF] py-20">
      {/* Full-width header */}
      <div className="w-full px-6 md:px-12 lg:px-24">
        <div className="w-full text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Our <span className="text-indigo-600">Specialist</span> Doctors
          </h2>
          <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
            Our team of highly qualified specialists is dedicated to providing expert care tailored to your needs.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              aria-label="Scroll left"
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-white shadow-md hover:scale-105 transition transform focus:outline-none focus:ring-4 focus:ring-indigo-200"
              type="button"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            <button
              aria-label="Scroll right"
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-white shadow-md hover:scale-105 transition transform focus:outline-none focus:ring-4 focus:ring-indigo-200"
              type="button"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500 hidden md:block">Swipe or use arrow keys to explore more</p>

            {/* indicators (first 8 for brevity) */}
            <div className="flex items-center gap-2">
              {doctorsData.slice(0, 8).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to doctor ${i + 1}`}
                  onClick={() => {
                    const el = containerRef.current?.querySelector<HTMLElement>(`[data-card-index="${i}"]`) ?? null;
                    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center" });
                  }}
                  className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-indigo-600" : "bg-slate-300"}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH CAROUSEL */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="w-full mt-10 flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 px-6 md:px-12 lg:px-24 no-scrollbar"
      >
        <style>
          {`
            .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
          `}
        </style>

        {doctorsData.map((doctor: any, idx: number) => (
          <motion.article
            key={doctor._id ?? idx}
            data-card-index={idx}
            initial={{ opacity: 0, y: 10, scale: 0.995 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02, translateY: -6 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.04 }}
            tabIndex={0}
            role="group"
            aria-label={`${doctor.name} — ${doctor.specialty}`}
            className={`
              snap-start flex-none
              w-[320px] sm:w-[360px] md:w-[420px] lg:w-[520px] xl:w-[600px]
              bg-white rounded-3xl border border-slate-100 p-4 lg:p-6
              shadow-[0_12px_40px_rgba(2,6,23,0.06)] relative
              focus:outline-none focus:ring-4 focus:ring-indigo-200/40
            `}
          >
            <div className="flex flex-col lg:flex-row gap-4 h-full">
              {/* Image (left) — large, covers container height on larger screens */}
              <div className="flex-shrink-0 w-full lg:w-[240px] h-[220px] lg:h-[260px] rounded-2xl overflow-hidden bg-slate-50 ring-1 ring-slate-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-center"
                  draggable={false}
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
                      {doctor.specialty}
                    </span>

                    {doctor.experience && (
                      <span className="ml-2 inline-block text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                        {doctor.experience} yrs
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-slate-600 line-clamp-3">{doctor.bio ?? doctor.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <strong className="font-semibold">{doctor.rating ?? "4.8"}</strong>
                    </span>

                    {doctor.hospital && (
                      <span className="text-xs text-slate-500 hidden md:inline">• {doctor.hospital}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigate("/app/doctor-details/" + doctor._id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-3 py-2 rounded-full border border-indigo-100 text-indigo-600 text-sm hover:bg-indigo-50 transition focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      aria-label={`See details for ${doctor.name}`}
                      type="button"
                    >
                      See Details
                    </button>

                    <button
                      onClick={() => {
                        navigate("/book/" + doctor._id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-3 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-semibold shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      aria-label={`Book appointment with ${doctor.name}`}
                      type="button"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* decorative overlay for subtle glow (non-blocking) */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
              style={{
                boxShadow: "0 20px 60px rgba(35,31,83,0.06)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
                opacity: 0,
              }}
            />
          </motion.article>
        ))}
      </div>

      {/* Hint */}
      <div className="mt-6 text-sm text-slate-500 text-center px-6">Tip: swipe or use ← → keys</div>
    </section>
  );
}
