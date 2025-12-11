import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { doctorsData } from "../../assets/assets";



export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor: any = doctorsData.find((d: any) => String(d._id) === String(id)) || doctorsData[0];

  // Form state
  const [booking, setBooking] = useState({
    patientName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    symptoms: "",
    paymentMethod: "cash",
  });

  useEffect(() => {
    // prefill date to today for convenience
    const today = new Date().toISOString().split("T")[0];
    setBooking(b => ({ ...b, date: b.date || today }));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBooking(b => ({ ...b, [name]: value }));
  };

  const submit = () => {
    if (!booking.patientName || !booking.phone || !booking.email || !booking.date || !booking.time) {
      toast.error("Please complete the highlighted fields.");
      return;
    }

    // simulate booking action
    console.log("Booked:", { doctor: doctor.name, ...booking });
    toast.success(`Appointment confirmed with ${doctor.name}`);
    setBooking({ patientName: "", phone: "", email: "", date: "", time: "", symptoms: "", paymentMethod: "cash" });
    navigate("/my-appointments");
  };

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`} />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-indigo-600 text-white shadow-sm">
        <div className="max-w-8xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Doctor Profile</h1>
            <p className="text-sm opacity-90">Premium experience • secure booking</p>
          </div>
        </div>
      </header>

      <main className="max-w-8xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        {/* Left / Details */}
        <section className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <div className="rounded-full p-1 bg-gradient-to-tr from-primary to-indigo-500 shadow-lg">
                    <img src={doctor.image} alt={doctor.name} className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 border-white" />
                  </div>
                  <div className="absolute -bottom-2 right-0 bg-white rounded-full px-3 py-1 text-xs font-medium shadow">{doctor.yearsActive || "Senior"}</div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{doctor.name}</h2>
                  <p className="text-primary font-semibold mt-1">{doctor.specialty}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 bg-slate-50/60 py-2 px-3 rounded-lg">
                      {renderStars(doctor.rating)}
                      <span className="text-sm text-gray-600">({doctor.reviews || 120} reviews)</span>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50/60 py-2 px-3 rounded-lg">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-700">{doctor.education}</span>
                    </div>

                    <div className="py-2 px-3 rounded-lg bg-slate-50/60 text-sm text-gray-700">{doctor.location}</div>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Consultation</div>
                    <div className="text-xl font-semibold text-slate-800">$ {doctor.fees}</div>
                  </div>

                  <motion.button whileHover={{ scale: 1.03 }} className="bg-primary text-white px-4 py-2 rounded-full shadow" onClick={() => document.getElementById("booking-panel")?.scrollIntoView({ behavior: "smooth" })}>
                    Book Now
                  </motion.button>
                </div>
              </div>

              {/* Bio / Highlights */}
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">{doctor.bio || "Highly experienced specialist with a patient-centered approach. Focus on evidence-based care and modern diagnostics."}</p>

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-b from-white to-slate-50 border">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Experience</h4>
                      </div>
                      <div className="text-gray-600">{doctor.experience}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-b from-white to-slate-50 border">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Clinic</h4>
                      </div>
                      <div className="text-gray-600">{doctor.clinicName || doctor.location}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-b from-white to-slate-50 border">
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Contact</h4>
                      </div>
                      <div className="text-gray-600 break-words">{doctor.email} • {doctor.phone}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-b from-white to-slate-50 border">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Specialties</h4>
                      </div>
                      <div className="text-gray-600">{(doctor.specialties || [doctor.specialty]).join(", ")}</div>
                    </div>
                  </div>
                </div>

                {/* Testimonials / Quick stats */}
                <aside className="p-4 rounded-xl bg-gradient-to-b from-white to-slate-50 border">
                  <h4 className="font-semibold mb-3">Quick Stats</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Patients treated</span>
                      <strong className="text-slate-800">{doctor.patients || 2000}+</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Years</span>
                      <strong className="text-slate-800">{doctor.years || 15}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Languages</span>
                      <strong className="text-slate-800">{doctor.languages?.join(", ") || "English"}</strong>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* Clinic gallery or timeline could go here - compressed for brevity */}
          </motion.div>
        </section>

        {/* Right / Sticky Booking Panel */}
        <aside id="booking-panel" className="sticky top-24">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-2xl border">
            <div className="flex items-start gap-4">
              <img src={doctor.image} alt={doctor.name} className="w-14 h-14 object-cover rounded-full border-2 border-white shadow" />
              <div>
                <div className="text-sm text-gray-500">Consult with</div>
                <div className="font-semibold text-slate-800">{doctor.name}</div>
                <div className="text-xs text-gray-500">{doctor.specialty}</div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-gray-600">Patient</label>
              <div className="mt-2 relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input name="patientName" value={booking.patientName} onChange={handleChange} placeholder="Full name" className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600">Phone</label>
                <div className="relative mt-2">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input name="phone" value={booking.phone} onChange={handleChange} placeholder="Mobile" className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600">Email</label>
                <div className="relative mt-2">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input name="email" value={booking.email} onChange={handleChange} placeholder="you@domain.com" className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600">Date</label>
                <div className="relative mt-2">
                  <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input type="date" name="date" value={booking.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600">Time</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {timeSlots.map(t => (
                    <button key={t} onClick={() => setBooking(b => ({ ...b, time: t }))} className={`px-3 py-2 rounded-full text-sm border ${booking.time === t ? "bg-primary text-white" : "bg-white"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs text-gray-600">Symptoms</label>
              <textarea name="symptoms" value={booking.symptoms} onChange={handleChange} rows={3} className="w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Short description..."></textarea>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Fee</div>
                <div className="text-lg font-semibold">$ {doctor.fees}</div>
              </div>

              <div>
                <label className="text-xs text-gray-600">Payment</label>
                <select name="paymentMethod" value={booking.paymentMethod} onChange={handleChange} className="ml-2 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="cash">Pay at clinic</option>
                  <option value="online">Online</option>
                </select>
              </div>
            </div>

            <button onClick={submit} className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white font-semibold shadow-lg">
              {booking.paymentMethod === "cash" ? "Confirm & Pay at Clinic" : "Pay Now"}
            </button>

            <p className="text-xs text-gray-500 mt-3">You will receive confirmation by call or email within 24 hours.</p>
          </motion.div>

          {/* Small note card */}
          <div className="mt-4 text-xs text-gray-500">Need help? <a href={`tel:${doctor.phone}`} className="text-primary underline">Call clinic</a></div>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-12 text-center text-sm text-gray-500">© {new Date().getFullYear()} HealthPlatform — Premium experience</footer>
    </div>
  );
}
