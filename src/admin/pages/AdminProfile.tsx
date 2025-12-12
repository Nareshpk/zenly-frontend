// AdminProfile.tsx
import React, { useEffect, useState } from "react";
import { User, Mail, Phone, Edit, Camera, Lock, Save } from "lucide-react";
import toast from "react-hot-toast";

/**
 * AdminProfile.tsx
 *
 * - Profile view + edit for admin
 * - Avatar upload (client-side preview)
 * - Edit basic info (name, email, phone)
 * - Change password flow (simple client-side validation)
 * - Persists to localStorage (replace with real API)
 *
 * Drop into /admin/profile route.
 */

/* ------------------------- Types & Mock API ------------------------ */
type Admin = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string; // data URL or remote URL
};

function loadAdminFromLocal(): Admin | null {
  try {
    const s = localStorage.getItem("auth");
    if (!s) return null;
    const parsed = JSON.parse(s);
    // expecting auth to include admin object; fallback to simple shape
    return (
      parsed?.user ??
      parsed?.admin ??
      (parsed?.name ? { id: parsed.id ?? "admin_1", name: parsed.name, email: parsed.email ?? "", phone: parsed.phone ?? "", avatar: parsed.avatar } : null)
    );
  } catch {
    return null;
  }
}

function saveAdminToLocal(admin: Admin) {
  // This function writes to the same `auth` localStorage entry if it exists,
  // otherwise it writes a simple `auth` wrapper. Adjust to your auth shape.
  try {
    const s = localStorage.getItem("auth");
    if (!s) {
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, role: "admin", user: admin }));
      return;
    }
    const parsed = JSON.parse(s);
    parsed.user = admin;
    localStorage.setItem("auth", JSON.stringify(parsed));
  } catch (err) {
    console.error(err);
  }
}

function fakeUpdateAdminProfile(payload: Partial<Admin>): Promise<Admin> {
  return new Promise((res) =>
    setTimeout(() => {
      const existing = loadAdminFromLocal() || { id: "admin_1", name: "Admin", email: "admin@example.com", phone: "", avatar: "" };
      const updated = { ...existing, ...payload };
      saveAdminToLocal(updated);
      res(updated);
    }, 500)
  );
}

function fakeChangePassword(current: string, next: string): Promise<boolean> {
  return new Promise((res, rej) =>
    setTimeout(() => {
      // mock: any current password of length >= 4 is accepted
      if (!current || current.length < 4) rej(new Error("Current password incorrect"));
      else res(true);
    }, 500)
  );
}

/* ----------------------------- Component --------------------------- */
export default function AdminProfile() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);

  // password modal state
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", password: "", confirm: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const a = loadAdminFromLocal();
    if (a) {
      setAdmin(a);
      setForm({ name: a.name, email: a.email, phone: a.phone ?? "" });
      setAvatarPreview(a.avatar);
    } else {
      // fallback default
      const fallback: Admin = { id: "admin_1", name: "Admin User", email: "admin@example.com", phone: "" };
      setAdmin(fallback);
      setForm({ name: fallback.name, email: fallback.email, phone: fallback.phone ?? "" });
    }
  }, []);

  useEffect(() => {
    if (!avatarFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(String(reader.result));
    };
    reader.readAsDataURL(avatarFile);
  }, [avatarFile]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    // small client-side size check (~5MB)
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Avatar must be smaller than 5MB");
      return;
    }
    setAvatarFile(f);
  }

  async function handleSaveProfile() {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setSaving(true);
    try {
      const payload: Partial<Admin> = { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() || undefined };
      if (avatarPreview) payload.avatar = avatarPreview;
      const updated = await fakeUpdateAdminProfile(payload);
      setAdmin(updated);
      toast.success("Profile updated");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    if (!pwForm.current || !pwForm.password) {
      toast.error("Please fill all password fields");
      return;
    }
    if (pwForm.password.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (pwForm.password !== pwForm.confirm) {
      toast.error("Password and confirm do not match");
      return;
    }
    setSaving(true);
    try {
      await fakeChangePassword(pwForm.current, pwForm.password);
      toast.success("Password changed");
      setPwForm({ current: "", password: "", confirm: "" });
      setPwModalOpen(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  }

  function resetAvatar() {
    setAvatarFile(null);
    setAvatarPreview(admin?.avatar);
  }

  return (
    <div className="w-full p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-6">
          <div>
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-4xl text-gray-500">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} />
                )}
              </div>

              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer border"
                title="Change avatar"
              >
                <Camera size={16} />
                <input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{admin?.name}</h2>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>

              <div className="flex items-center gap-2">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                    title="Edit profile"
                  >
                    <Edit size={14} /> Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditing(false);
                        // reset form to current admin
                        setForm({ name: admin?.name ?? "", email: admin?.email ?? "", phone: admin?.phone ?? "" });
                        setAvatarPreview(admin?.avatar);
                        setAvatarFile(null);
                      }}
                      className="px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <Save size={14} /> {saving ? "Saving..." : "Save"}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {!editing ? (
                  <span className="text-sm text-gray-600">{admin?.email}</span>
                ) : (
                  <input
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none"
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                {!editing ? (
                  <span className="text-sm text-gray-600">{admin?.phone || "—"}</span>
                ) : (
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none"
                  />
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-gray-500">Full name</label>
                {!editing ? (
                  <div className="text-sm text-gray-700">{admin?.name}</div>
                ) : (
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none mt-1"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPwModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              <Lock size={14} /> Change Password
            </button>

            <button
              onClick={resetAvatar}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              <Camera size={14} /> Reset Avatar
            </button>
          </div>

          <div className="text-sm text-gray-500">Member since: <span className="font-medium">{admin ? new Date().toLocaleDateString() : "—"}</span></div>
        </div>
      </div>

      {/* ---------------- Password Modal ---------------- */}
      {pwModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPwModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Change Password</h3>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm text-gray-600">Current password</label>
                <input
                  type="password"
                  value={pwForm.current}
                  onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))}
                  className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">New password</label>
                <input
                  type="password"
                  value={pwForm.password}
                  onChange={(e) => setPwForm((p) => ({ ...p, password: e.target.value }))}
                  className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Confirm new password</label>
                <input
                  type="password"
                  value={pwForm.confirm}
                  onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
                  className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={() => setPwModalOpen(false)} className="px-4 py-2 rounded-md hover:bg-gray-100">Cancel</button>
              <button onClick={handleChangePassword} disabled={saving} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                {saving ? "Saving..." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
