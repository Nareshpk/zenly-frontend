import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// Premium Contact page
// - Gradient hero with floating SVG/illustration
// - Glassmorphic form card with validation and subtle motion
// - Contact cards with icons and micro-interactions
// - Full-bleed responsive map with overlay CTA
// - Tailwind CSS required (recommended v3+) + framer-motion + lucide-react

export default function ContactPremium() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Please enter phone number";
    else if (!/^\+?\d{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.message.trim()) e.message = "Please enter a short message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error("Fix the errors before submitting");
    setSubmitting(true);
    try {
      // replace with real API logic
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Message sent — We'll contact you shortly");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6F8FF] via-white to-[#F3F6FF]">
      {/* Hero */}
      <header className="w-full relative overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <motion.h1 initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-[#231F53] leading-tight">
                We're here for you — <span className="text-indigo-600">Contact KMC Hospital, Kulithalai</span>
              </motion.h1>

              <motion.p initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08, duration: 0.5 }} className="mt-4 text-gray-600 max-w-2xl">
                Quick appointments, emergency support, and friendly guidance. Use the form to reach our care team or call us directly for urgent assistance.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="tel:+918248040188" className="inline-flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-lg shadow-md hover:scale-[0.995] transition">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>

                <a href="#form" className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-lg text-gray-800 hover:shadow-sm transition">
                  <Mail className="w-5 h-5" />
                  Send Message
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              {/* Floating glass card */}
              <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.12 }} className="relative bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-50">
                    <MapPin className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Visit Us</div>
                    <div className="font-semibold text-gray-800">KMC Hospital, Kulithalai</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="font-medium text-gray-800">+91 82480 40188</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500">Hours</div>
                    <div className="font-medium text-gray-800">24/7 Emergency</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-12 -top-8 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 opacity-70 blur-3xl" />
              <div className="pointer-events-none absolute -right-6 bottom-[-24px] w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-yellow-100 opacity-60 blur-2xl" />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="-mt-12 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form column (larger) */}
            <div className="lg:col-span-2">
              <motion.section id="form" initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800">Send us a message</h3>
                <p className="mt-2 text-sm text-gray-500">Fill the form and our care team will respond within 24 hours.</p>

                <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Full name</label>
                    <input name="name" value={form.name} onChange={handleChange} className={`mt-2 w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-100`} placeholder="Your name" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className={`mt-2 w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-100`} placeholder="you@example.com" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className={`mt-2 w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-100`} placeholder="+91 82480 40188" />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} className={`mt-2 w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-100 h-36`} placeholder="How can we help?" />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end">
                    <button type="submit" disabled={submitting} className="inline-flex items-center gap-3 bg-[#231F53] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-95 transition">
                      {submitting ? 'Sending...' : 'Send Message'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.section>
            </div>

            {/* Right column: contact cards + map preview */}
            <aside className="space-y-6">
              <motion.div initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow p-5 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-semibold text-gray-800">KMC Hospital, Kulithalai</div>
                  <div className="text-sm text-gray-600 mt-1">No. 18, Trichy Main Road, Kulithalai - 639104</div>
                </div>
              </motion.div>

              <motion.div initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.05, duration: 0.45 }} className="bg-white rounded-2xl shadow p-5 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50">
                  <Phone className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <a href="tel:+918248040188" className="font-semibold text-gray-800">+91 82480 40188</a>
                  <div className="text-sm text-gray-600 mt-1">24/7 Emergency</div>
                </div>
              </motion.div>

              <motion.div initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.45 }} className="bg-white rounded-2xl shadow p-5 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Visiting Hours</div>
                  <div className="font-semibold text-gray-800">Mon - Sat: 9:00 AM - 6:00 PM</div>
                  <div className="text-sm text-gray-600 mt-1">Emergency: 24/7</div>
                </div>
              </motion.div>

              {/* Map preview card */}
              <motion.div initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.45 }} className="rounded-2xl overflow-hidden shadow-lg">
                <iframe title="kulithalai-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.320919740751!2d78.4067!3d10.9362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa6c3d83c33863%3A0xf7f0c6e5a52bdea!2sKMC%20Hospital%2C%20Kulithalai!5e0!3m2!1sen!2sin!4v1700000000000" className="w-full h-48 md:h-56 border-0" loading="lazy" />
                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Kulithalai</div>
                    <div className="font-semibold text-gray-800">KMC Hospital</div>
                  </div>
                  <a href="https://www.google.com/maps/search/?api=1&query=KMC+Hospital+Kulithalai" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg">Open in Maps <ArrowRight className="w-4 h-4" /></a>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </main>

      {/* Floating help CTA */}
      <a href="tel:+918248040188" className="fixed right-6 bottom-6 z-50 inline-flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-full shadow-lg hover:scale-[0.99] transition">
        <Phone className="w-5 h-5" /> Emergency Call
      </a>
    </div>
  );
}
