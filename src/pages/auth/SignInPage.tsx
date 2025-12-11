import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginAction } from "../../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

type FormValues = {
    email: string;
    password: string;
    remember: boolean;
};

export default function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: { email: "", password: "", remember: false },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    async function onSubmit(values: FormValues) {
        setServerError(null);

        // Basic validation
        if (!values.email || !values.password) {
            alert("Please fill in both email and password.");
            return;
        }

        try {
            const email = values.email;
            const password = values.password
            // dispatch(loginAction({ email, password }) as any).then((res: any) => {
            //     if (res.type === "LOGIN_FAILURE") {
            //         setServerError(res.payload.message || "Login failed. Please try again.");
            //         return;
            //     }
            //     navigate("/app/dashboard");
            // });
        } catch (error) {
            console.error("Error during login:", error);
            setServerError("An error occurred. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Sign in to your account</h1>
                    <p className="text-sm text-gray-500 mt-2">Enter your credentials to continue</p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-md rounded-lg p-6"
                    noValidate
                >
                    {serverError && (
                        <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">{serverError}</div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                            })}
                            className={`mt-1 block w-full px-3 py-2 rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"
                                } shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            placeholder="you@example.com"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                            <p id="email-error" className="mt-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                })}
                                className={`block w-full px-3 py-2 rounded-md border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="Your password"
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? "password-error" : undefined}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && (
                            <p id="password-error" className="mt-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <label className="inline-flex items-center text-sm">
                            <input
                                type="checkbox"
                                {...register("remember")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>

                        <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 disabled:opacity-60"
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </button>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <a href="/signup" className="text-indigo-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
