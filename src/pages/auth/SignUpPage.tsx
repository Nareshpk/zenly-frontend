import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signup } from "../../redux/actions/signupActions";
import { useDispatch } from "react-redux";

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    confirmPassword: string;
};

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<FormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: "user",
            password: "",
            confirmPassword: "",
        },
    });
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const passwordValue = watch("password");

    const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    async function onSubmit(values: FormValues) {
        if (values.password !== values.confirmPassword) {
            setError("confirmPassword", {
                message: "Passwords do not match",
            });
            return;
        }
        dispatch(signup(values) as any);
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* First name */}
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                            {...register("firstName", { required: "First name is required" })}
                            className="mt-1 w-full border px-3 py-2 rounded"
                            placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-600 text-xs">{errors.firstName.message}</p>}
                    </div>

                    {/* Last name */}
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                            {...register("lastName", { required: "Last name is required" })}
                            className="mt-1 w-full border px-3 py-2 rounded"
                            placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-red-600 text-xs">{errors.lastName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" },
                            })}
                            className="mt-1 w-full border px-3 py-2 rounded"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <input
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: { value: /^\+?\d{7,15}$/, message: "Enter a valid phone number" },
                            })}
                            className="mt-1 w-full border px-3 py-2 rounded"
                            placeholder="+911234567890"
                        />
                        {errors.phone && <p className="text-red-600 text-xs">{errors.phone.message}</p>}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            {...register("role", { required: "Role is required" })}
                            className="mt-1 w-full border px-3 py-2 rounded"
                        >
                            <option value="user">User</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.role && <p className="text-red-600 text-xs">{errors.role.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium">Password</label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    validate: (value) =>
                                        passwordRules.test(value) ||
                                        "Must contain: 1 uppercase, 1 number, 1 symbol, min 6 chars",
                                })}
                                className="mt-1 w-full border px-3 py-2 rounded"
                                placeholder="Create password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-600 text-xs">{errors.password.message}</p>
                        )}

                        <ul className="text-xs text-gray-600 mt-1">
                            <li>• Must contain an uppercase letter</li>
                            <li>• Must contain a number</li>
                            <li>• Must contain a symbol (!@#$%^&*)</li>
                            <li>• Minimum 6 characters</li>
                        </ul>
                    </div>

                    {/* Confirm password */}
                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: (value) =>
                                    value === passwordValue || "Passwords do not match",
                            })}
                            className="mt-1 w-full border px-3 py-2 rounded"
                            placeholder="Re-enter password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-xs">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        {isSubmitting ? "Creating account..." : "Create Account"}
                    </button>

                    <p className="text-center text-sm mt-2">
                        Already have an account?{" "}
                        <a href="/" className="text-indigo-600 underline">
                            Sign in
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
