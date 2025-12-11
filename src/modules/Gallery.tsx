/* eslint-disable jsx-a11y/img-redundant-alt */
import { galleryData } from "../assets/assets";

const Gallery = () => {
  return (
    <section className="py-20 w-full overflow-hidden bg-gradient-to-b from-[#F7F9FF] to-white">
      {/* GOOGLE FONT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          Explore Our <span className="text-indigo-600">Gallery</span>
        </h1>
        <p className="text-slate-500 mt-3">
          A modern, cinematic visual showcase featuring our finest work—
          crafted with precision, beauty and passion.
        </p>
      </div>

      {/* FULL-WIDTH PREMIUM GALLERY */}
      <div
        className="
          flex items-center gap-6 mt-16
          w-[100vw] px-4 md:px-8 lg:px-12
          h-[450px] md:h-[520px] 
        "
      >
        {galleryData.map((item, index) => (
          <div
            key={index}
            className="
              relative group flex-1
              h-full rounded-3xl overflow-hidden cursor-pointer
              transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)]
              hover:flex-[3]
            "
            style={{ flex: "1" }}
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt="image"
              draggable="false"
              className="
                absolute inset-0 w-full h-full object-cover object-center
                transition-transform duration-[1200ms]
                group-hover:scale-110
              "
            />

            {/* GRADIENT LAYER */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-black/60 via-black/20 to-transparent
                opacity-0 group-hover:opacity-100
                transition-all duration-700
              "
            />

            {/* TEXT OVERLAY */}
            <div
              className="
                absolute bottom-10 left-8 right-8
                opacity-0 translate-y-6
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-700 ease-out
              "
            >
              <h2 className="text-3xl font-semibold text-white drop-shadow-lg">
                {item.heading}
              </h2>
              <p className="text-sm mt-2 text-white/90 max-w-md leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* GLOW EFFECT */}
            <div
              className="
                absolute inset-0 rounded-3xl pointer-events-none
                opacity-0 group-hover:opacity-40
                transition-all duration-700
                bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 blur-2xl
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
