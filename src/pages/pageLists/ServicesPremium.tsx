import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ServicesPremium({ services }: { services: any[] }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // compute categories
  const categories = useMemo(() => {
    const set = new Set(services.map((s: any) => s.category || "General"));
    return ["All", ...Array.from(set)];
  }, [services]);

  // filtered list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s: any) => {
      if (activeCategory !== "All" && (s.category || "General") !== activeCategory) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q) ||
        (s.tags || []).join(" ").toLowerCase().includes(q)
      );
    });
  }, [services, query, activeCategory]);

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("All");
  };

  return (
    // Full width container — no max-width so it stretches across the page
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 w-full">
        <div className="w-full md:max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#231F53]">Our Services</h1>
          <p className="mt-1 text-gray-600 max-w-full">
            Explore our multi-speciality services. Click any card for a quick preview and booking options.
          </p>
        </div>

        {/* Search + Category (responsive) */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, tests or tags..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            {(query || activeCategory !== "All") && (
              <button
                onClick={resetFilters}
                className="absolute -right-8 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                aria-label="Reset filters"
              >
                Reset
              </button>
            )}
          </div>

          {/* On small screens show a compact select; on md+ show original select too */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span className="text-sm text-gray-600 hidden md:inline">Category</span>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="py-2 px-3 rounded-lg border border-gray-200 bg-white focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category chips: horizontally scrollable on small screens */}
      <div className="mb-6 w-full overflow-x-auto py-1">
        <div className="inline-flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                activeCategory === c
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Tag className="w-4 h-4" />
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive grid — stretches full width. Adjust columns at breakpoints for denser layouts on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((s: any, idx) => (
          <motion.article
            key={s.id}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.04 }}
            className="group bg-white rounded-2xl overflow-hidden shadow relative cursor-pointer flex flex-col h-full"
            onClick={() => navigate(`/app/services/${s.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/app/services/${s.id}`);
              }
            }}
          >
            {/* Image */}
            <div className="relative w-full h-56 md:h-44 lg:h-40">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              {s.category && (
                <div className="absolute left-3 top-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-[#231F53]">
                  {s.category}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-[#231F53]">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3 flex-1">{s.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {(s.tags || []).slice(0, 3).map((t: any) => (
                    <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-indigo-600 font-medium">View →</div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-8 text-center text-gray-500">No services found. Try a different search or category.</div>
      )}
    </div>
  );
}
