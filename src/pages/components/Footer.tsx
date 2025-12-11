import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { assets } from "../../assets/assets";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#F6F7FF] via-[#ECECFF] to-[#F4F5FF] text-slate-700 overflow-hidden">
      {/* Soft glow decorations */}
      <div
        className="pointer-events-none absolute -left-20 top-0 w-[380px] h-[380px] rounded-full blur-[120px] opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(168,85,247,0.25))",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 w-[380px] h-[380px] rounded-full blur-[120px] opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(56,189,248,0.35), rgba(129,140,248,0.25))",
        }}
      />

      <div className="relative w-full px-8 py-14 lg:py-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white shadow-md border border-slate-200">
                <img
                  src={assets.logo}
                  alt="logo"
                  className="h-12 object-contain"
                />
              </div>
            </div>

            <p className="mt-5 text-slate-600 leading-relaxed max-w-md">
              Delivering modern healthcare with trusted doctors, advanced
              diagnostics and seamless appointment experience — ensuring
              comfort, clarity and confidence at every step.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Facebook, link: "https://facebook.com" },
                { Icon: Twitter, link: "https://twitter.com" },
                { Icon: Instagram, link: "https://instagram.com" },
                { Icon: Linkedin, link: "https://linkedin.com" },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  aria-label={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/60 hover:bg-white transition shadow hover:shadow-lg border border-slate-200 backdrop-blur-sm"
                >
                  <Icon className="w-5 h-5 text-slate-700" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-semibold text-slate-900">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li><a href="/" className="hover:text-indigo-600">Home</a></li>
              <li><a href="/doctors" className="hover:text-indigo-600">Find Doctors</a></li>
              <li><a href="/services" className="hover:text-indigo-600">Services</a></li>
              <li><a href="/about" className="hover:text-indigo-600">About Us</a></li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-sm font-semibold text-slate-900">Specialties</h4>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-slate-600">
              <li><a href="/services/cardiology" className="hover:text-indigo-600">Cardiology</a></li>
              <li><a href="/services/orthopedics" className="hover:text-indigo-600">Orthopedics</a></li>
              <li><a href="/services/neurology" className="hover:text-indigo-600">Neurology</a></li>
              <li><a href="/services/pediatrics" className="hover:text-indigo-600">Pediatrics</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
            <div className="mt-4 space-y-4 text-slate-600 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <div>Kulithalai, Karur District, Tamil Nadu</div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-indigo-600" />
                <div>+91 82480 40188</div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-600" />
                <div>info@kulithalaihospital.example</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div>
            © {new Date().getFullYear()} <span className="font-semibold">Doctor Wise</span>.
            All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <a href="/privacy" className="hover:text-indigo-600">Privacy</a>
            <a href="/terms" className="hover:text-indigo-600">Terms</a>
            <a href="/sitemap.xml" className="hover:text-indigo-600">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
