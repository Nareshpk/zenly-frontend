import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import { Search, StarIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doctorsData } from "../../assets/assets";

export default function Doctors() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selected, setSelected] = useState(null as any);

  const specialties = useMemo(() => {
    const s = new Set(doctorsData.map((d) => d.specialty || "General"));
    return ["All", ...Array.from(s)];
  }, []);


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = doctorsData.filter((d: any) => {
      if (activeSpecialty !== "All" && d.specialty !== activeSpecialty) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        (d.specialty || "").toLowerCase().includes(q) ||
        (d.bio || "").toLowerCase().includes(q)
      );
    });

    if (sortBy === "rating") list = list.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === "experience") list = list.sort((a: any, b: any) => (b.experience || 0) - (a.experience || 0));
    return list;
  }, [query, activeSpecialty, sortBy]);

  useEffect(() => {
    setSelected(null);
  }, [query, activeSpecialty, sortBy]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBFBFF] to-[#F3F6FF] py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#231F53]">Our <span className="text-indigo-600">Doctors</span></h1>
            <p className="text-gray-600 mt-1">Skilled specialists across multiple disciplines — book consultations or view profiles.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctors or specialties..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-64 md:w-96 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-lg border border-gray-200 bg-white"
              aria-label="Sort doctors"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="experience">Most experienced</option>
            </select>
          </div>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSpecialty(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${activeSpecialty === s
                ? "bg-indigo-600 text-white shadow"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doctor: any, idx: number) => (
            <motion.article
              key={doctor._id ?? idx}
              initial={{ y: 6, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition transform duration-200 cursor-pointer h-full flex flex-col"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/app/doctor-details/${doctor._id}`)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/doctor-details/${doctor._id}`)}
            >
              <div className="relative flex-shrink-0">
                <div className="h-68 md:h-68 w-full overflow-hidden rounded-t-2xl bg-gray-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>


                <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-800">{doctor.rating ?? "—"}</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                  <div className="text-sm text-indigo-600 font-medium mt-1">{doctor.specialty}</div>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">{doctor.bio ?? doctor.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                      {doctor.experience ?? "—"} yrs
                    </span>
                    {(doctor.tags || []).slice(0, 2).map((t: string) => (
                      <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/doctor-details/${doctor._id}`);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:opacity-95 transition"
                    >
                      View Profile
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/book/${doctor._id}`);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-2 border border-indigo-600 text-indigo-600 rounded-full text-sm hover:bg-indigo-50 transition"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 text-center text-gray-500">No doctors found. Try a different search or specialty.</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative bg-white rounded-t-lg md:rounded-lg w-full md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-auto shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start gap-4 p-4 border-b">
              <img src={selected.image} alt={selected.name} className="h-20 w-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{selected.name}</h3>
                <div className="text-sm text-indigo-600 font-medium">{selected.specialty}</div>
                <div className="text-sm text-gray-600 mt-1">{selected.experience ?? "—"} yrs experience • {selected.degree ?? ""}</div>
              </div>

              <button onClick={() => setSelected(null)} className="p-2 rounded-md hover:bg-gray-100">
                <X />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-600 mb-2">About</h4>
                <p className="text-gray-700 mb-4">{selected.bio || selected.description}</p>

                <h4 className="text-sm font-medium text-gray-600 mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(selected.tags || []).map((t: string) => (
                    <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  <a href={`tel:+918248040188`} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg">Call Clinic</a>
                  <button onClick={() => navigate(`/book/${selected._id}`)} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">Book Appointment</button>
                </div>
              </div>

              <aside className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
                <div className="mb-3">
                  <div className="text-sm text-gray-500">Ratings</div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <div className="font-semibold text-gray-800">{selected.rating ?? "—"}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-gray-500">Experience</div>
                  <div className="font-medium text-gray-800 mt-1">{selected.experience ?? "—"} yrs</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Languages</div>
                  <div className="mt-1 text-gray-700">{(selected.languages || ["Tamil", "English"]).join(", ")}</div>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
