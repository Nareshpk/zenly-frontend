import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { benefitsData } from "../assets/assets";


const containerVariants:any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhyChooseUs() {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-gradient-to-b from-[#FBFDFF] to-[#F4F8FF] py-20 overflow-hidden">
      {/* soft background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-8 w-[420px] h-[420px] rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle at 10% 10%, rgba(99,102,241,0.08), transparent 35%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-8 w-[420px] h-[420px] rounded-full opacity-6 blur-3xl"
        style={{ background: "radial-gradient(circle at 90% 90%, rgba(6,182,212,0.06), transparent 35%)" }}
      />

      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT - Visual (spans 7 of 12 on lg screens) */}
          <VisualArea />

          {/* RIGHT - Content & Benefits (spans 5 of 12) */}
          <div className="lg:col-span-5 col-span-12 order-2 lg:order-1">
            <header className="mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                State <span className="text-indigo-600">of</span>-the <span className="text-indigo-600">Art</span> <br />
                Technology & Care
              </h2>
              <p className="mt-4 text-slate-600 max-w-xl">
                We combine advanced diagnostics, proven clinical pathways and compassionate care so you get the best
                outcomes — quickly, safely and respectfully.
              </p>
            </header>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              className="grid grid-cols-1 gap-4"
            >
              {benefitsData.map((item: any, i: number) => (
                <TiltCard key={i} index={i} item={item} />
              ))}
            </motion.div>

            {/* CTA strip */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <span
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-lg hover:translate-y-[-3px] transition"
              >
                Explore Services
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              <span
               onClick={() => navigate("/contact")}
                className="inline-flex items-center px-4 py-3 rounded-xl bg-white/10 border border-white/8 text-slate-900 hover:bg-white/20 transition"
              >
                Contact Us
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------
   VisualArea - large image with parallax hover + subtle animation
-----------------------------------*/
function VisualArea() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [par, setPar] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el: any = ref.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setPar({ x: px * 8, y: py * 6 });
    }
    function onLeave() { setPar({ x: 0, y: 0 }); }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="lg:col-span-7 col-span-12 order-1 lg:order-2">
      <div className="relative w-full">
        {/* Main image card */}
        <motion.div
          style={{ x: par.x, y: par.y }}
          animate={{ x: par.x, y: par.y }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="rounded-3xl overflow-hidden shadow-2xl border border-white/8 bg-white/20"
        >
          <img
            src={"https://www.pngitem.com/pimgs/m/347-3474591_doctors-22x-stock-photography-hd-png-download.png"}
            alt="Why Choose Us"
            className="w-full h-[520px] md:h-[620px] lg:h-full object-cover object-center"
          />
        </motion.div>

        {/* floating badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute left-6 top-6 inline-flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md border border-white/20"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-semibold">
            24
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">24 / 7</div>
            <div className="text-xs text-slate-600">Support</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* --------------------------------
   TiltCard - benefit item with small 3D tilt/translate on mouse move
   -> now includes highlights list under description
-----------------------------------*/
function TiltCard({ item, index }: { item: any; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function reset() { setTilt({ rx: 0, ry: 0, tx: 0, ty: 0 }); }
    el.addEventListener("mouseleave", reset);
    el.addEventListener("blur", reset);
    return () => {
      el.removeEventListener("mouseleave", reset);
      el.removeEventListener("blur", reset);
    };
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 8; // rotateY
    const rx = -(py - 0.5) * 8; // rotateX
    const tx = (px - 0.5) * 6;
    const ty = (py - 0.5) * 6;
    setTilt({ rx, ry, tx, ty });
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onMouseMove={handleMove}
      className="relative group"
      style={{ perspective: 1000 }}
    >
      {/* base card */}
      <div
        className={`
          relative rounded-xl overflow-hidden p-5 bg-white/50 backdrop-blur-md border border-white/8
          shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-transform duration-300
          hover:shadow-[0_20px_60px_rgba(99,102,241,0.08)]
        `}
        tabIndex={0}
        role="article"
        aria-label={item.heading}
      >
        {/* moving inner */}
        <motion.div
          animate={{
            rotateX: tilt.rx,
            rotateY: tilt.ry,
            x: tilt.tx,
            y: tilt.ty,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="relative z-10 flex items-start gap-4"
        >
          {/* Icon */}
          <div className="flex-none w-14 h-14 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
            <img src={item.image} alt={item.heading} className="w-8 h-8 object-contain" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{item.heading}</h3>
            <p className="text-sm text-slate-600 mt-1">{item.description}</p>

            {/* --- HIGHLIGHTS (new) --- */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="mt-3 grid gap-2">
                {item.highlights.slice(0, 4).map((h: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-none mt-1">
                      <Check className="w-4 h-4 text-emerald-500" />
                    </span>
                    <p className="text-sm text-slate-600">{h}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center gap-3">
              {item.badge && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/8 text-sm font-medium">
                  {item.badge}
                </span>
              )}
              <button
                className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-400 text-white text-sm font-semibold shadow-sm hover:translate-y-[-2px] transition"
                onClick={() => (window.location.href = item.link ?? "/services")}
                type="button"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>

        {/* gradient glow overlay appears on hover */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: "linear-gradient(120deg, rgba(99,102,241,0.06), rgba(6,182,212,0.04))" }}
        />

        {/* subtle accent floating element */}
        <div className="absolute -right-8 -top-6 w-28 h-28 rounded-full opacity-0 group-hover:opacity-60 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.08), transparent 45%)" }} />
      </div>
    </motion.div>
  );
}
