import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Mail,
  Phone,
  Save,
  Star,
  UploadCloud,
  User,
  X,
  Award,
  BarChart3
} from "lucide-react";

// Alternative Ultra Premium Profile (Bolder visual language)
// - Strong hero with animated gradient blob
// - Neumorphic/pill inputs, large avatar, tier badge
// - Clean two-column layout with right-side KPIs
// - Accessibility friendly, mobile-first

export default function Profile() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dark, setDark] = useState(false);

  const initial = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+92-300-1234567",
    bio: "Patient · Health enthusiast · Platinum member",
    avatar: null as string | null,
    tier: "Platinum",
  };

  const [profile, setProfile] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-a", dark ? "#00d4ff" : "#0ea5e9");
    document.documentElement.style.setProperty("--accent-b", dark ? "#7c3aed" : "#6366f1");
    document.documentElement.style.setProperty("--bg", dark ? "#071029" : "#f8fafc");
    document.documentElement.style.setProperty("--card", dark ? "rgba(255,255,255,0.03)" : "#ffffff");
  }, [dark]);

  const validators = (d: typeof draft) => {
    const e: Record<string, string> = {};
    if (!d.name || d.name.trim().length < 2) e.name = "Enter a valid name";
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email";
    if (!/^\+?[0-9\-\s]{7,}$/.test(d.phone)) e.phone = "Enter a valid phone";
    return e;
  };

  const startEdit = () => {
    setDraft({ ...profile });
    setErrors({});
    setEditing(true);
  };
  const cancel = () => {
    setDraft({ ...profile });
    setErrors({});
    setEditing(false);
  };
  const save = async () => {
    const e = validators(draft);
    setErrors(e);
    if (Object.keys(e).length) return;
    await new Promise((r) => setTimeout(r, 300));
    setProfile({ ...draft });
    setEditing(false);
  };

  const pick = (file?: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setDraft((p: any) => ({ ...p, avatar: String(r.result) }));
    r.readAsDataURL(file);
  };
  const trigger = () => fileRef.current?.click();

  return (
    <div className={`min-h-screen py-12 transition-colors`} style={{ background: `var(--bg)`, color: dark ? '#e6eef8' : '#0f172a' }}>
      <div className="max-w-8xl mx-auto px-6">
        {/* Animated hero */}
        <div className="relative rounded-3xl overflow-hidden pb-6" style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.04), rgba(124,58,237,0.04))' }}>
          <svg className="absolute -right-20 -top-24 w-96 h-96 opacity-60 transform-gpu" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="var(--accent-a)" />
                <stop offset="1" stopColor="var(--accent-b)" />
              </linearGradient>
            </defs>
            <motion.path d="M300 30C370 30 510 40 540 120C570 200 520 340 430 390C340 440 200 460 120 380C40 300 35 160 90 90C145 20 230 30 300 30Z" fill="url(#g1)" opacity="0.22" animate={{ rotate: [0, 6, 0], scale: [1, 1.02, 1] }} transition={{ duration: 8, repeat: Infinity }} />
          </svg>

          <div className="relative z-10 p-8 flex gap-6 items-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-full overflow-hidden shadow-2xl ring-2 ring-white/6 bg-gradient-to-br from-[var(--accent-a)] to-[var(--accent-b)]">
                {draft.avatar || profile.avatar ? (
                  <img src={draft.avatar || profile.avatar!} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold"><User className="w-16 h-16" /></div>
                )}
              </div>

              <button onClick={() => { trigger(); if (!editing) startEdit(); }} aria-label="Upload avatar" className="absolute -bottom-2 -right-2 bg-white text-slate-800 rounded-full p-3 shadow"> <UploadCloud className="w-4 h-4" /></button>

              <div className="absolute -left-3 -top-3 px-3 py-1 rounded-lg text-xs font-semibold text-black bg-gradient-to-tr from-yellow-300 via-orange-300 to-pink-300">{profile.tier}</div>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-extrabold truncate">{profile.name}</h2>
              <p className="mt-1 text-sm opacity-80 truncate">{profile.bio}</p>

              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 backdrop-blur text-sm border border-white/6">
                  <Mail className="w-4 h-4" /> <span className="truncate max-w-xs">{profile.email}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 backdrop-blur text-sm border border-white/6">
                  <Phone className="w-4 h-4" /> {profile.phone}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent-a)] to-[var(--accent-b)] text-white text-sm shadow"> <Star className="w-4 h-4" /> Premium</div>
              </div>
            </div>

            <div className="flex-shrink-0">
              {!editing ? (
                <motion.button whileTap={{ scale: 0.98 }} onClick={startEdit} className="px-5 py-3 rounded-full bg-gradient-to-r from-[var(--accent-a)] to-[var(--accent-b)] text-white font-semibold shadow-lg"> <Edit2 className="w-4 h-4 inline-block mr-2" /> Edit</motion.button>
              ) : (
                <div className="flex gap-3">
                  <button onClick={save} className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent-a)] to-[var(--accent-b)] text-white"> <Save className="w-4 h-4 inline-block mr-2" /> Save</button>
                  <button onClick={cancel} className="px-3 py-2 rounded-full bg-transparent border border-white/10"> <X className="w-4 h-4" /></button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <section className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl p-6 bg-[var(--card)] shadow-md border border-white/6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Personal details</div>
                  <div className="text-xs opacity-70">Update info to get personalized care</div>
                </div>
                <div className="flex items-center gap-3 text-xs opacity-70">
                  <Award className="w-4 h-4" /> VIP
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); save(); }} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-2">Full name</label>
                  <input name="name" value={editing ? draft.name : profile.name} onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))} disabled={!editing} className={`w-full rounded-2xl py-3 px-4 ${editing ? 'shadow-input border-0' : 'bg-transparent border border-white/6'} outline-none`} />
                  {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">Email</label>
                  <input name="email" value={editing ? draft.email : profile.email} onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))} disabled={!editing} className={`w-full rounded-2xl py-3 px-4 ${editing ? 'shadow-input border-0' : 'bg-transparent border border-white/6'} outline-none`} />
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">Phone</label>
                  <input name="phone" value={editing ? draft.phone : profile.phone} onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))} disabled={!editing} className={`w-full rounded-2xl py-3 px-4 ${editing ? 'shadow-input border-0' : 'bg-transparent border border-white/6'} outline-none`} />
                  {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-2">About</label>
                  <textarea name="bio" rows={3} value={editing ? draft.bio : profile.bio} onChange={(e) => setDraft((p) => ({ ...p, bio: e.target.value }))} disabled={!editing} className={`w-full rounded-2xl py-3 px-4 ${editing ? 'shadow-input border-0' : 'bg-transparent border border-white/6'} outline-none`} />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                  {editing && (
                    <>
                      <button type="button" onClick={cancel} className="px-4 py-2 rounded-full border">Cancel</button>
                      <button type="submit" className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent-a)] to-[var(--accent-b)] text-white">Save changes</button>
                    </>
                  )}
                </div>
              </form>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-4 bg-[var(--card)] border border-white/6">
                <div className="text-xs opacity-70">Next appointment</div>
                <div className="mt-2 font-semibold">Jan 12, 2026 · 9:00 AM</div>
              </div>

              <div className="rounded-2xl p-4 bg-[var(--card)] border border-white/6">
                <div className="text-xs opacity-70">Support</div>
                <div className="mt-2 font-semibold">Premium hotline</div>
                <div className="text-xs opacity-70 mt-1">+91 82480 40188</div>
              </div>
            </div>
          </section>

          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl p-4 bg-[var(--card)] border border-white/6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-70">Health Index</div>
                  <div className="text-2xl font-semibold mt-1">92</div>
                </div>
                <div className="text-xs opacity-70">Goal 95</div>
              </div>
              <div className="mt-3 h-3 bg-white/6 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '92%', background: 'linear-gradient(90deg,var(--accent-a),var(--accent-b))' }} />
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-[var(--card)] border border-white/6">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium">Quick actions</div>
                <div className="text-xs opacity-70">Shortcuts</div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="w-full text-left px-3 py-2 rounded-lg bg-white/4">New appointment</button>
                <button className="w-full text-left px-3 py-2 rounded-lg bg-white/4">Add record</button>
                <button className="w-full text-left px-3 py-2 rounded-lg bg-white/4">Export</button>
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-[var(--card)] border border-white/6 text-sm opacity-70">
              <div className="font-medium mb-2">Tips</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Keep your profile updated</li>
                <li>Enable notifications for reminders</li>
              </ul>
            </div>
          </aside>
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => pick(e.target.files?.[0] as File)} />

        <div className="mt-6 text-center text-sm opacity-70">Crafted with care — Alternative premium look</div>
      </div>
    </div>
  );
}
