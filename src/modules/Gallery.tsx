import React from "react";
import { galleryData } from "../assets/assets";

// Responsive Gallery
// - On md+ screens: a full-width interactive flex gallery where hovered card expands
// - On small screens: a 2-column grid with images in cover mode and always-visible captions
// - Touch-friendly: hover effects are disabled on small screens (using separate layout)

const Gallery = () => {
  return (
    <section className="py-20 w-full overflow-hidden bg-gradient-to-b from-[#F7F9FF] to-white">
      {/* GOOGLE FONT (optional — you can move this to your index.html for better performance) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800">
          Explore Our <span className="text-indigo-600">Gallery</span>
        </h1>
        <p className="text-slate-500 mt-3 text-sm md:text-base">
          A modern, cinematic visual showcase featuring our finest work— crafted
          with precision, beauty and passion.
        </p>
      </div>

      {/* ---------- DESKTOP / TABLET: expanding flex gallery ---------- */}
      <div className="hidden md:flex items-center gap-6 mt-12 w-screen px-4 md:px-8 lg:px-12 h-[420px] md:h-[520px]">
        {galleryData.map((item, idx) => (
          <div
            key={idx}
            className={
              `relative group flex-1 h-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)] hover:flex-[3]`
            }
            style={{ flex: 1 }}
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.heading || `gallery-${idx}`}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-110"
            />

            {/* GRADIENT LAYER */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

            {/* TEXT OVERLAY */}
            <div className="absolute bottom-10 left-8 right-8 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
              <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-lg">
                {item.heading}
              </h2>
              <p className="text-xs md:text-sm mt-2 text-white/90 max-w-md leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* GLOW EFFECT */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-40 transition-all duration-700 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 blur-2xl" />
          </div>
        ))}
      </div>

      {/* ---------- MOBILE: 2-column grid fallback ---------- */}
      <div className="md:hidden grid grid-cols-2 gap-4 mt-8 px-4">
        {galleryData.map((item, idx) => (
          <div key={idx} className="relative rounded-2xl overflow-hidden h-44 sm:h-52">
            <img
              src={item.image}
              alt={item.heading || `gallery-${idx}`}
              draggable={false}
              className="w-full h-full object-cover object-center"
            />

            {/* Gradient bottom area to make text readable on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute left-3 right-3 bottom-3 text-white">
              <h3 className="text-sm font-semibold line-clamp-1">{item.heading}</h3>
              <p className="text-xs text-white/90 line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Small note: ensure galleryData images are reasonably large (at least 1200px wide) for desktop */}
    </section>
  );
};

export default Gallery;
