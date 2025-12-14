import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, StarIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doctorsData } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../redux/actions/doctorProfileAction";

type Specialty = {
  id: string;
  title: string;
  about: string;
};

type Doctor = {
  _id: string;
  displayName: string;
  designation: string;
  phone: string;
  email: string;
  languages: string[];
  specialties: Specialty[];
};

export default function Doctors() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ---------- Redux state ---------- */
  const doctors = useSelector((state: any) => state.doctor.allDoctors || []);
  const loading = useSelector((state: any) => state.doctor.loading);

  /* ---------- Local UI state ---------- */
  const [query, setQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [selected, setSelected] = useState<Doctor | null>(null);

  /* ================= API CALL ================= */
  useEffect(() => {
    dispatch(getAllDoctors() as any).then((action: any) => {
      console.log("Doctors API response:", action.payload);
    });
  }, [dispatch]);

  /* ================= SPECIALTY CHIPS ================= */
  const specialties = useMemo(() => {
    const all = doctors.flatMap((d: Doctor) =>
      d.specialties?.map((s) => s.title) || []
    );
    return ["All", ...Array.from(new Set(all))];
  }, [doctors]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return doctors.filter((d: Doctor) => {
      const matchQuery =
        d.displayName?.toLowerCase().includes(query.toLowerCase()) ||
        d.specialties?.some((s) =>
          s.title.toLowerCase().includes(query.toLowerCase())
        );

      const matchSpecialty =
        activeSpecialty === "All" ||
        d.specialties?.some((s) => s.title === activeSpecialty);

      return matchQuery && matchSpecialty;
    });
  }, [doctors, query, activeSpecialty]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FBFBFF] to-[#F3F6FF] py-6 px-4 sm:px-6 lg:px-12">
      <div className="w-full max-w-[1920px] mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#231F53]">
              Our <span className="text-indigo-600">Doctors</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Skilled specialists across multiple disciplines
            </p>
          </div>

          <div className="relative w-full md:w-[420px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctors or specialties..."
              className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 w-full"
            />
          </div>
        </div>

        {/* SPECIALTIES */}
        <div className="mb-6 flex flex-wrap gap-2">
          {specialties.map((s: any, key: any) => (
            <button
              key={key}
              onClick={() => setActiveSpecialty(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${activeSpecialty === s
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700"
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading doctors...
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((doctor: Doctor, idx: number) => (
            <motion.article
              key={doctor._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelected(doctor)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer flex flex-col"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                alt={doctor.displayName}
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold">
                  {doctor.displayName}
                </h3>

                <div className="text-sm text-indigo-600 font-medium">
                  {doctor.specialties?.[0]?.title}
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {doctor.specialties?.[0]?.about}
                </p>

                <div className="mt-auto pt-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/app/doctor-details/${doctor._id}`);
                    }}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/app/doctor-details/${doctor._id}`);
                    }}
                    className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg text-sm"
                  >
                    Book
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center mt-10 text-gray-500">
            No doctors found
          </div>
        )}

        {/* MODAL */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white rounded-xl w-full max-w-2xl"
            >
              <div className="p-6 flex gap-4 border-b">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                  className="w-20 h-20 rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selected.displayName}
                  </h3>
                  <p className="text-indigo-600">
                    {selected.specialties?.[0]?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selected.designation}
                  </p>
                </div>

                <button onClick={() => setSelected(null)}>
                  <X />
                </button>
              </div>

              <div className="p-6">
                <p>{selected.specialties?.[0]?.about}</p>

                <p className="mt-3 text-sm text-gray-600">
                  Languages: {selected.languages.join(", ")}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
