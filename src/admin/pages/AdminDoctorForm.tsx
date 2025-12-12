import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/signupActions";

type FormValues = {
    username?: string;
    role: "user" | "doctor" | "admin" | "staff" | string;
    password: string;
    email: string;
    phone: string;
    name?: string;
};

type DoctorRow = {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    status: "active" | "inactive";
};

export default function AdminDoctorForm() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            username: "",
            password: "",
            email: "",
            phone: "",
            name: "",
        },
    });

    const password = watch("password");
    const [showPassword, setShowPassword] = useState(false);
  
    const [doctors, setDoctors] = useState<DoctorRow[]>([
        { id: 1, username: "doctor123", name: "Dr. John Doe", email: "doc@example.com", phone: "+91 98765 43210", status: "active" },
        { id: 2, username: "sarah_md", name: "Dr. Sarah Lee", email: "sarah@example.com", phone: "+91 99876 54321", status: "inactive" },
        { id: 3, username: "kumar_doc", name: "Dr. Kumar R.", email: "kumar@example.com", phone: "+91 91234 56789", status: "active" },
    ]);

    function passwordStrengthScore(pw: string) {
        let score = 0;
        if (!pw) return score;
        if (pw.length >= 8) score += 1;
        if (/[A-Z]/.test(pw)) score += 1;
        if (/[0-9]/.test(pw)) score += 1;
        if (/[^A-Za-z0-9]/.test(pw)) score += 1;
        return score; // 0..4
    }

    const score = passwordStrengthScore(password || "");
    const scoreLabel = ["", "Weak", "Fair", "Good", "Strong"][score];

    async function onSubmit(data: FormValues) {
        try {
            const payload = {
                username: (data.username || "").trim(),
                password: data.password,
                email: data.email.trim(),
                phone: data.phone.trim(),
                name: data.name?.trim(),
                role: data.role,
            };

            dispatch(signup(payload) as any).then((res: any) => {
                if (res.type === "SIGNUP_SUCCESS") {
                    toast.success("Created successfully");
                    setDoctors((prev) => [
                        { id: Date.now(), username: payload.username, name: payload.name || "-", email: payload.email, phone: payload.phone, status: "active" },
                        ...prev,
                    ]);
                    reset();
                }

            });

        } catch (err: any) {
            const message = err?.response?.data?.message || (err?.response?.data?.errors?.[0]?.msg) || "Failed to create";
            toast.error(message);
        }
    }

    // UI helpers for table
    function toggleStatus(id: number) {
        setDoctors((prev) => prev.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' } : d));
        toast.success('Status updated');
    }

    function removeDoctor(id: number) {
        setDoctors((prev) => prev.filter(d => d.id !== id));
        toast.success('Removed');
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <Toaster position="top-right" />

            {/* full-width center container */}
            <div className="container w-full px-4">
                {/* card: form + left info */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <aside className="p-8 md:col-span-1 border-r hidden md:flex flex-col items-center justify-center gap-4">
                            <div className="w-28 h-28 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <User size={44} />
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-semibold">New Doctor</h4>
                                <p className="text-sm text-slate-500">Create account & assign services later</p>
                            </div>
                            <ul className="mt-4 text-sm text-slate-600 space-y-2">
                                <li>• Validated fields are highlighted</li>
                                <li>• Auto reset after success</li>
                            </ul>
                        </aside>

                        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2 p-6 md:p-8">
                            <h3 className="text-2xl font-semibold mb-6">Create Doctor Account</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="block">
                                    <span className="text-sm text-slate-700">Username <span className="text-red-500">*</span></span>
                                    <input {...register("username", { required: "Username required", minLength: { value: 3, message: "Min 3 chars" } })} className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.username ? 'border-red-300' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-indigo-100`} placeholder="doctor123" />
                                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                                </label>

                                <label className="block">
                                    <span className="text-sm text-slate-700">Email <span className="text-red-500">*</span></span>
                                    <div className="relative mt-1">
                                        <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                                        <input {...register("email", { required: "Email required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className={`w-full pl-10 pr-3 py-2 rounded-md border ${errors.email ? 'border-red-300' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-indigo-100`} placeholder="doc@example.com" />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </label>

                                <label className="block">
                                    <span className="text-sm text-slate-700">Mobile Number <span className="text-red-500">*</span></span>
                                    <div className="relative mt-1">
                                        <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                                        <input {...register("phone", { required: "Mobile required", minLength: { value: 7, message: "Invalid number" } })} className={`w-full pl-10 pr-3 py-2 rounded-md border ${errors.phone ? 'border-red-300' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-indigo-100`} placeholder="+91 98765 43210" />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </label>

                                <label className="block">
                                    <span className="text-sm text-slate-700">Name</span>
                                    <input {...register("name")} className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Dr. John Doe" />
                                </label>

                                <label className="block">
                                    <span className="text-sm text-slate-700">Password <span className="text-red-500">*</span></span>
                                    <div className="relative mt-1">
                                        <div className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowPassword(s => !s)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</div>
                                        <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password required", minLength: { value: 8, message: "Min 8 chars" } })} className={`w-full px-3 py-2 rounded-md border ${errors.password ? 'border-red-300' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-indigo-100`} placeholder="At least 8 characters" />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                    <div className="mt-2 flex items-center gap-3">
                                        <div className="w-full bg-slate-100 rounded h-2 overflow-hidden">
                                            <div style={{ width: `${(score / 4) * 100}%` }} className="h-2 transition-all rounded bg-indigo-400" />
                                        </div>
                                        <div className="text-xs text-slate-500 w-20 text-right">{scoreLabel}</div>
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm text-slate-700">
                                        Role <span className="text-red-500">*</span>
                                    </span>

                                    <select
                                        {...register("role", { required: "Role is required" })}
                                        className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    >
                                        <option value="doctor">Doctor</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                    </select>

                                    {errors.role && (
                                        <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                                    )}
                                </label>


                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <button type="submit" disabled={isSubmitting} className={`inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60`}>
                                    {isSubmitting ? 'Creating...' : 'Create Account'}
                                </button>
                                <button type="button" onClick={() => reset()} className="px-4 py-2 border rounded-md bg-white text-slate-700 hover:bg-slate-50">Reset</button>
                                <button type="button" onClick={() => { reset(); toast('Form cleared', { icon: '🧹' }); }} className="ml-auto text-sm text-slate-500">Clear & Notify</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bottom: table list using full width card */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="p-4 md:p-6 border-b flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Doctors</h4>
                        <div className="flex items-center gap-2">
                            <input type="search" placeholder="Search doctors..." className="px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100" onChange={(e) => { /* simple client-side filter could be implemented */ }} />
                            <button className="px-3 py-2 bg-indigo-600 text-white rounded-md">New</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Username</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Mobile</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                                    <th className="px-6 py-3 text-right text-sm font-medium text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {doctors.map((d) => (
                                    <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">{d.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{d.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{d.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{d.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${d.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{d.status}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => toggleStatus(d.id)} className="mr-2 text-sm px-3 py-1 rounded-md border">Toggle</button>
                                            <button onClick={() => removeDoctor(d.id)} className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 flex items-center justify-between border-t">
                        <div className="text-sm text-slate-500">Showing {doctors.length} doctors</div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1 border rounded-md">Prev</button>
                            <button className="px-3 py-1 border rounded-md">1</button>
                            <button className="px-3 py-1 border rounded-md">2</button>
                            <button className="px-3 py-1 border rounded-md">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
