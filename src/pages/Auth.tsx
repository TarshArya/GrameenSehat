// src/pages/Auth.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient"; // adjust path if your file is elsewhere

type UserType = "patient" | "doctor" | "pharmacy" | "admin";

const Auth: React.FC = () => {
    const navigate = useNavigate();

    // Toggle between login and register modes
    const [mode, setMode] = useState<"login" | "register">("login");

    // Form state (bind your inputs to these)
    const [form, setForm] = useState({
        name: "",
        phone: "",
        userType: "patient" as UserType,
        email: "",
        password: "",
        confirmPassword: "",
    });

    // UI state
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Generic change handler
    const onChange =
        (key: keyof typeof form) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                setForm((prev) => ({ ...prev, [key]: e.target.value }));
            };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);

        try {
            if (mode === "register") {
                // Basic checks
                if (!form.email.trim()) throw new Error("Please enter your email.");
                if (form.password.length < 6)
                    throw new Error("Password must be at least 6 characters.");
                if (form.password !== form.confirmPassword)
                    throw new Error("Passwords do not match.");

                // Sign up
                const { error: signUpError } = await supabase.auth.signUp({
                    email: form.email.trim(),
                    password: form.password,
                    options: {
                        data: {
                            name: form.name.trim() || null,
                            phone: form.phone.trim() || null,
                            userType: form.userType,
                        },
                        // If email confirmations are ON in Supabase, you can set a redirect:
                        // emailRedirectTo: `${window.location.origin}/auth`,
                    },
                });
                if (signUpError) throw signUpError;

                // If confirmations are ON there won't be a session yet.
                const { data: sessionRes } = await supabase.auth.getSession();
                if (!sessionRes.session) {
                    alert(
                        "Sign-up successful. Please check your email to confirm your account."
                    );
                    setMode("login");
                    setLoading(false);
                    return;
                }

                // Logged in immediately (confirmations OFF)
                navigate("/");
                return;
            }

            // LOGIN
            if (!form.email.trim() || !form.password) {
                throw new Error("Please enter email and password.");
            }

            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: form.email.trim(),
                password: form.password,
            });
            if (signInError) throw signInError;

            navigate("/");
        } catch (err: any) {
            setErrorMsg(err?.message ?? "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-2">
                {mode === "login" ? "Log in" : "Create your account"}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
                {mode === "login"
                    ? "Use your email and password to sign in."
                    : "Fill the details to register."}
            </p>

            <form onSubmit={onSubmit} className="space-y-3">
                {/* REGISTER-ONLY FIELDS */}
                {mode === "register" && (
                    <>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Full name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={onChange("name")}
                                placeholder="e.g., John Doe"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Phone (optional)</label>
                            <input
                                type="text"
                                value={form.phone}
                                onChange={onChange("phone")}
                                placeholder="+91 9XXXXXXXXX"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">User type</label>
                            <select
                                value={form.userType}
                                onChange={onChange("userType")}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="pharmacy">Pharmacy</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </>
                )}

                {/* SHARED FIELDS */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={onChange("email")}
                        placeholder="you@example.com"
                        className="w-full border rounded px-3 py-2"
                        autoComplete="email"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={onChange("password")}
                        placeholder="••••••••"
                        className="w-full border rounded px-3 py-2"
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                </div>

                {mode === "register" && (
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Confirm password</label>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            onChange={onChange("confirmPassword")}
                            placeholder="••••••••"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                )}

                {/* ERROR */}
                {errorMsg && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                        {errorMsg}
                    </div>
                )}

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-600 text-white rounded px-3 py-2 disabled:opacity-60"
                >
                    {loading
                        ? "Please wait…"
                        : mode === "login"
                            ? "Log in"
                            : "Create account"}
                </button>

                {/* TOGGLE */}
                <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="w-full text-sm text-teal-700 underline mt-2"
                >
                    {mode === "login"
                        ? "New here? Create an account"
                        : "Already have an account? Log in"}
                </button>

                {/* Optional: Forgot password (wire later if you want) */}
                {/* <button
          type="button"
          onClick={async () => {
            if (!form.email) return alert("Enter your email first.");
            const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
              redirectTo: `${window.location.origin}/auth`,
            });
            if (error) alert(error.message);
            else alert("Password reset email sent.");
          }}
          className="w-full text-sm text-gray-600 underline"
        >
          Forgot your password?
        </button> */}
            </form>
        </div>
    );
};

export default Auth;
