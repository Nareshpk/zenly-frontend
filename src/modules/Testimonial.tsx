import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react";

const testimonials = [
  { id: 1, quote: "Radiant made undercutting all of our competitors an absolute breeze. The team was responsive and professional.", name: "John Doe", role: "Content Marketing", rating: 5, image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop", },
  { id: 2, quote: "Their approach to patient care is outstanding — modern, compassionate, and efficient. Highly recommended.", name: "Priya Sharma", role: "Product Manager", rating: 5, image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop", },
  { id: 3, quote: "We saw measurable improvements in patient satisfaction after partnering with them — excellent team and service.", name: "Amit Verma", role: "Operations Lead", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop", },
  { id: 4, quote: "Professional, caring, and efficient. Booking was seamless and the follow-up was excellent.", name: "Swathi R", role: "HR Manager", rating: 5, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop", },
  { id: 5, quote: "The doctors explained everything clearly and the staff were incredibly supportive throughout the process.", name: "Karan Mehta", role: "Software Engineer", rating: 5, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop", },
  { id: 6, quote: "Fast, friendly and professional service. I felt cared for and well-informed at every step.", name: "Neha Kapoor", role: "UX Designer", rating: 5, image: "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D", },
  { id: 7, quote: "Excellent facilities and empathetic staff. My treatment plan was easy to follow and effective.", name: "Rahul Singh", role: "Financial Analyst", rating: 5, image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=1000&auto=format&fit=crop", },
  { id: 8, quote: "Highly recommended for anyone seeking precise diagnosis and compassionate care.", name: "Anjali Menon", role: "Teacher", rating: 5, image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1000&auto=format&fit=crop", }, { id: 9, quote: "Their teleconsultation was smooth and solved my issue without needing a clinic visit.", name: "Suresh Iyer", role: "Entrepreneur", rating: 5, image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1000&auto=format&fit=crop", },
  { id: 10, quote: "The entire experience from booking to follow-up was handled professionally with great care.", name: "Meera N", role: "Researcher", rating: 5, image: "https://img.freepik.com/free-photo/beautiful-young-woman-posing-park_1153-6553.jpg?semt=ais_hybrid&w=740&q=80", },
  { id: 11, quote: "I appreciated the attention to detail and the personalized care plan I received.", name: "Arjun P", role: "Consultant", rating: 5, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop", },
  { id: 12, quote: "Friendly staff, excellent doctors, and prompt responses — couldn't ask for more.", name: "Radha K", role: "Marketing Lead", rating: 5, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop", },];

const AUTOPLAY_DELAY = 5200;

export default function TestimonialFullWidthLight() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  // horizontal scroll-to-center (prevents vertical page jumps)
  const scrollTo = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[idx] as HTMLElement | undefined;
    if (!child) return;

    const containerWidth = container.clientWidth;
    const childLeft = child.offsetLeft;
    const childWidth = child.clientWidth;

    // center child in container horizontally
    const targetLeft = Math.round(childLeft - (containerWidth - childWidth) / 2);

    container.scrollTo({ left: targetLeft, behavior: "smooth" });

    setActive(idx);

    // reset progress bar smoothly
    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0%";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progressRef.current!.style.transition = `width ${AUTOPLAY_DELAY}ms linear`;
          progressRef.current!.style.width = "100%";
        });
      });
    }
  };

  const prev = () => scrollTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => scrollTo((active + 1) % testimonials.length);

  // autoplay
  useEffect(() => {
    if (isPaused) {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      // freeze progress bar
      if (progressRef.current) {
        const computed = getComputedStyle(progressRef.current);
        const w = computed.width;
        progressRef.current.style.transition = "";
        progressRef.current.style.width = w;
      }
      return;
    }

    // start progress bar
    if (progressRef.current) {
      progressRef.current.style.transition = `width ${AUTOPLAY_DELAY}ms linear`;
      requestAnimationFrame(() => (progressRef.current!.style.width = "100%"));
    }

    autoplayRef.current = window.setInterval(() => {
      // use functional update to avoid stale active
      setActive((curr) => {
        const nextIdx = (curr + 1) % testimonials.length;
        // use scrollTo to animate horizontally
        scrollTo(nextIdx);
        return nextIdx;
      });
    }, AUTOPLAY_DELAY);

    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  // update active by scroll center detection (throttled via RAF)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (!el) return;
      const children = Array.from(el.children) as HTMLElement[];
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
      if (closest !== active) setActive(closest);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  // pointer pause (touch/drag)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onPointerDown = () => setIsPaused(true);
    const onPointerUp = () => setIsPaused(false);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <section
      className="w-full bg-gradient-to-b from-white to-[#F7FAFF] py-20 overflow-hidden"
      aria-label="Testimonials"
    >
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Full-width header (edge-to-edge) */}
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mx-auto max-w-[1600px]">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            What Our <span className="text-indigo-600">Patients</span> Say
          </h2>
          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            Real stories from people who trusted our care — honest, human, and reassuring.
          </p>
        </div>

        {/* Controls + progress */}
        <div className="mt-8 flex items-center justify-between gap-4 mx-auto max-w-[1600px]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                prev();
              }}
              aria-label="Previous testimonial"
              className="p-2 rounded-full bg-white ring-1 ring-slate-100 shadow-sm hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-indigo-200"
              type="button"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            <button
              onClick={() => {
                next();
              }}
              aria-label="Next testimonial"
              className="p-2 rounded-full bg-white ring-1 ring-slate-100 shadow-sm hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-indigo-200"
              type="button"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </div>

          <div className="flex-1 px-6">
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                style={{ width: "0%" }}
                aria-hidden
              />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <p className="text-sm text-slate-600">Swipe or use arrows to navigate</p>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`w-2.5 h-2.5 rounded-full ${i === active ? "bg-indigo-600" : "bg-slate-300"}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width carousel (edge-to-edge) */}
      <div
        ref={containerRef}
        className="mt-8 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-8 px-6 no-scrollbar"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0}
      >
        {testimonials.map((t, idx) => (
          <motion.article
            key={t.id}
            aria-roledescription="slide"
            aria-label={`testimonial ${idx + 1} of ${testimonials.length}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.04 }}
            className={`
              snap-center flex-none
              w-[320px] sm:w-[420px] md:w-[520px] lg:w-[620px]
              bg-white shadow-sm rounded-3xl overflow-hidden border border-slate-100
            `}
            style={{ backdropFilter: "blur(6px)" }}
          >
            {/* Top image */}
            <div className="relative w-full h-[260px] sm:h-[300px] md:h-[330px] lg:h-[360px] overflow-hidden rounded-t-2xl">
              <img
                src={t.image}
                alt={t.name}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105"
                style={{ willChange: "transform" }}
              />

              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(0,0,0,0.10) 100%)",
                }}
              />

              <div className="absolute left-6 bottom-6 flex items-center gap-4 z-20">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/80 bg-white shadow-md">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" draggable={false} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white drop-shadow-sm">{t.name}</p>
                  <p className="text-xs text-white/80">{t.role}</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="p-6">
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-lg text-slate-800 leading-relaxed">
                “{t.quote}”
              </motion.p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1 text-slate-800">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <strong>{t.rating}</strong>
                  </div>
                  <div className="text-sm text-slate-500 ml-2 hidden sm:block">Verified patient</div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => scrollTo(idx)} className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-800 text-sm hover:shadow transition" type="button">
                    Read
                  </button>

                  <button onClick={() => (window.location.href = "#contact")} className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow" type="button">
                    Share your story
                  </button>
                </div>
              </div>
            </div>

            {/* decorative */}
            <div aria-hidden className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-0 md:opacity-60 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.06), transparent 45%)" }} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
