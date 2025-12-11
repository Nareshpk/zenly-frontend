import React, { useState } from "react";
import { Lock, MailIcon, PhoneIcon, User2Icon, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContextProvider";
import { signup } from "../../redux/actions/signupActions";
import { useDispatch } from "react-redux";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setLoading, loading, setUser } = useAppContext();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "", role: "patient", agree: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({} as Record<string, string>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name) next.name = "Full name is required";
    if (!formData.phone) next.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) next.phone = "Enter a valid phone number";
    if (!formData.email) next.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) next.email = "Invalid email";
    if (!formData.password) next.password = "Password is required";
    else if (formData.password.length < 6) next.password = "Password must be at least 6 characters";
    if (!formData.agree) next.agree = "You must agree to terms";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fix the errors");
    setLoading?.(true);
    try {
      dispatch(signup(formData) as any).then((res: any) => {
        console.log("res===============>>>", res);

        if (res.type === "SIGNUP_SUCCESS") {
          toast.success("Signup successful");
          setUser?.(true as any);
          navigate("/login");
        }

      });

    } catch (err) {
      toast.error("Signup failed");
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F6FF] to-[#EBEBFE] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-8xl bg-white rounded-2xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col p-8 bg-gradient-to-br from-[#F9FAFF] to-[#EEF2FF] gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">Create your account</h2>

          <p className="text-sm text-gray-600">
            Join Apex Hospital to book appointments, access medical records and connect with specialists.
          </p>

          {/* FULL HEIGHT IMAGE */}
          <div className="flex-1 w-full">
            <img
              src="https://img.freepik.com/premium-photo/doctor-icon-virtual-screen-health-care-medical-background-copy-space_55997-4372.jpg"
              alt="signup"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>


        <div className="p-6 md:p-10">
          <h3 className="text-xl font-semibold text-gray-800">Sign up</h3>
          <p className="mt-1 text-sm text-gray-500">Register as a patient, doctor or staff member</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs text-gray-600">Full name</span>
              <div className="mt-2 flex items-center bg-gray-50 border rounded-full h-11 px-4">
                <User2Icon className="w-5 h-5 text-gray-400" />
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className="bg-transparent ml-3 outline-none text-sm w-full" required />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Phone</span>
              <div className="mt-2 flex items-center bg-gray-50 border rounded-full h-11 px-4">
                <PhoneIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile number"
                  inputMode="numeric"
                  className="bg-transparent ml-3 outline-none text-sm w-full"
                  required
                />

              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Email</span>
              <div className="mt-2 flex items-center bg-gray-50 border rounded-full h-11 px-4">
                <MailIcon className="w-5 h-5 text-gray-400" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="bg-transparent ml-3 outline-none text-sm w-full" required />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Role</span>
              <div className="mt-2 flex items-center bg-gray-50 border rounded-full h-11 px-4">
                <User2Icon className="w-5 h-5 text-gray-400" />
                <select name="role" value={formData.role} onChange={handleChange} className="bg-transparent ml-3 outline-none text-sm w-full">
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin"> Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Password</span>
              <div className="mt-2 flex items-center bg-gray-50 border rounded-full h-11 px-4">
                <Lock className="w-5 h-5 text-gray-400" />
                <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Create a password" className="bg-transparent ml-3 outline-none text-sm w-full" required />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="ml-2 rounded-full p-1 hover:bg-gray-100" aria-label={showPassword ? "Hide" : "Show"}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </label>

            <label className="flex items-start gap-3 text-sm">
              <input name="agree" type="checkbox" checked={formData.agree} onChange={handleChange} className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <div className="text-gray-600">I agree to the <Link to="/terms" className="text-indigo-600 underline">Terms</Link> and <Link to="/privacy" className="text-indigo-600 underline">Privacy Policy</Link></div>
            </label>
            {errors.agree && <p className="text-xs text-red-500 mt-1">{errors.agree}</p>}

            <button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-indigo-600 text-white font-medium hover:opacity-95 transition-opacity disabled:opacity-60">{loading ? "Creating..." : "Create account"}</button>

            <div className="mt-2 text-center text-sm text-gray-500">Already a member? <Link to="/login" className="text-indigo-600 font-medium hover:underline">Log in</Link></div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs text-gray-400">or sign up with</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="h-11 rounded-full border flex items-center justify-center text-sm">Sign up with Google</button>
              <button type="button" className="h-11 rounded-full border flex items-center justify-center text-sm">Sign up with Microsoft</button>
            </div>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
