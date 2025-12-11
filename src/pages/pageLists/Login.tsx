import { motion } from "framer-motion";
import { Eye, EyeOff, Hospital, Lock, MailIcon, User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/actions/loginActions";
import { useData } from "../../shared/DataProvider";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, setUser, setLoading, loading } = useData() as any;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // prefill role if you want (example: patient)
    setFormData((f) => ({ ...f, role: f.role || "patient" }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.email) next.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) next.email = "Enter a valid email";
    if (!formData.password) next.password = "Password is required";
    if (!formData.role) next.role = "Please select a role";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors and try again");
      return;
    }

    try {
      setLoading?.(true);
      dispatch(loginAction({ email: formData.email, password: formData.password }) as any).then((res: any) => {
        if (res.type === "LOGIN_SUCCESS") {
          toast.success("Login successful");
          setUser?.(true as any);
          if (formData.remember) localStorage.setItem("hospital_remember", formData.email);
          navigate("/app/my-appointments");
        }
      });

    } catch (err) {
      toast.error("Login failed. Check your credentials.");
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F6FF] to-[#EBEBFE] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-8xl bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
        aria-labelledby="login-title"
      >
        {/* Illustration / branding column (hidden on very small screens) */}
        <div className="hidden md:flex flex-col justify-center items-start gap-6 p-10 bg-gradient-to-br from-white via-[#EEF2FF] to-[#F9F7FF]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#EEF2FF]">
              <Hospital className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">Apex Multi‑Speciality Hospital</h3>
              <p className="text-sm text-gray-500">Compassionate care, all specialties under one roof.</p>
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            <p>
              Secure access for patients, doctors and staff. Use your hospital account to access appointments,
              medical records and internal tools.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Book and manage appointments</li>
              <li>• View test results and prescriptions</li>
              <li>• Doctor dashboard & patient records</li>
            </ul>
          </div>

          <div className="mt-auto w-full">
            <img
              src="https://watermark.lovepik.com/photo/40194/8251.jpg_wh1200.jpg"
              alt="Hospital illustration"
              className="rounded-xl w-full object-cover "
            />
          </div>
        </div>

        {/* Form column */}
        <div className="p-8 md:p-12">
          <h1 id="login-title" className="text-2xl md:text-3xl font-semibold text-gray-800">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to your hospital account</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs text-gray-600">Email</span>
              <div className="mt-2 flex items-center bg-gray-50 border rounded-full h-11 px-4 focus-within:ring-2 focus-within:ring-indigo-300">
                <MailIcon className="w-5 h-5 text-gray-400" />
                <input
                  aria-label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-transparent ml-3 outline-none text-sm w-full"
                  required
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Role</span>
              <div className="mt-2 flex items-center bg-gray-50 border rounded-full h-11 px-4">
                <User2Icon className="w-5 h-5 text-gray-400" />
                <select
                  aria-label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-transparent ml-3 outline-none text-sm w-full"
                >
                  <option value="">Select role</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Password</span>
              <div className="mt-2 flex items-center bg-gray-50 border rounded-full h-11 px-4 focus-within:ring-2 focus-within:ring-indigo-300">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  aria-label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="bg-transparent ml-3 outline-none text-sm w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="ml-2 rounded-full p-1 hover:bg-gray-100"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </label>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-indigo-600 text-white font-medium hover:opacity-95 transition-opacity disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="pt-2 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
                Create account
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs text-gray-400">or continue with</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="h-11 rounded-full border flex items-center justify-center text-sm">
                Sign in with Google
              </button>
              <button type="button" className="h-11 rounded-full border flex items-center justify-center text-sm">
                Sign in with Microsoft
              </button>
            </div>
          </form>

          <p className="mt-6 text-xs text-gray-400">By continuing, you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.</p>
        </div>
      </motion.div>
    </div>
  );
}
