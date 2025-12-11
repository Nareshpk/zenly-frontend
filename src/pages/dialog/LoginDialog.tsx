// src/components/LoginDialog.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { X, Eye, EyeOff } from "lucide-react";

export default function LoginDialog({ open, onClose, onLoginSuccess }: {
  open: boolean;
  onClose?: () => void;
  onLoginSuccess?: (authObject: any) => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // e.g. "doctor", "nurse", "admin", "patient"
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", role: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      // reset form when closed
      setEmail("");
      setPassword("");
      setRole("");
      setShowPassword(false);
      setRemember(false);
      setErrors({ email: "", password: "", role: "" });
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  function validate() {
    const e = { email: "", password: "", role: "" };
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) e.email = "Email is required.";
    else if (!emailRegex.test(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    if (!role) e.role = "Please select your role.";
    setErrors(e);
    return !e.email && !e.password && !e.role;
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      // TODO: replace with real auth API call
      // For now we mock a successful response with role included
      await new Promise((r) => setTimeout(r, 600)); // simulate network

      const mockAuth = {
        isAuthenticated: true,
        token: "mock-token-xyz",
        user: {
          name: role === "doctor" ? "Dr. Naresh" : "Naresh",
          email,
          role,
        },
        remember,
      };

      onLoginSuccess?.(mockAuth);
      // optionally close after success
      onClose?.();
    } catch (err) {
      // handle server error (show generic message)
      setErrors((prev) => ({ ...prev, password: "Login failed. Please check credentials." }));
    } finally {
      setSubmitting(false);
    }
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="login-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-60 w-full max-w-3xl mx-4 md:mx-6 rounded-lg overflow-hidden shadow-2xl bg-white">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-50 rounded-full bg-white p-1 shadow hover:bg-gray-50"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[460px]">
          {/* Left - Branding / Info */}
          <div className="bg-sky-700 text-white p-8 flex flex-col justify-between">
            <div>
              <h2 id="login-dialog-title" className="text-3xl font-semibold mb-2">Hospital Login</h2>
              <p className="text-sm opacity-95">
                Secure access for staff and patients — sign in with your hospital account.
              </p>
            </div>

            <div className="mt-6">
              {/* small illustrative SVG or image - replace path as needed */}
              <img
                src="/assets/hospital-illustration.svg"
                alt=""
                className="w-48 h-auto opacity-95"
              />
            </div>

            <div className="text-xs opacity-90">
              <strong>Roles:</strong> Doctor • Nurse • Admin • Patient
            </div>
          </div>

          {/* Right - Form */}
          <div className="p-8 bg-white flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="you@hospital.org"
                  required
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full rounded-md border px-3 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                      errors.password ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>

              {/* Role select */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.role ? "border-red-400" : "border-gray-200"
                  }`}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="admin">Admin</option>
                  <option value="patient">Patient</option>
                </select>
                {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
              </div>

              {/* Remember + forgot */}
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="mr-2 rounded border-gray-300"
                  />
                  Remember me
                </label>

                <div className="text-sm">
                  <a href="/forgot-password" className="text-sky-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-md text-white bg-sky-600 hover:bg-sky-700 font-medium shadow disabled:opacity-60"
                >
                  {submitting ? "Signing in..." : "Sign in"}
                </button>
              </div>

              {/* Signup / info */}
              <div className="text-center text-sm">
                <a href="/signup" className="text-sky-600 hover:underline">
                  New user? Register an account
                </a>
              </div>
            </form>

            {/* small footer */}
            <div className="mt-6 text-xs text-gray-400 text-center">
              Access is logged for security. Contact admin@hospital.org for account issues.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
