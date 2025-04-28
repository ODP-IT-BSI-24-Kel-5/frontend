"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from '@/stores/authStore';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const setToken = useAuthStore(state => state.setToken);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});
        setGeneralError("");
        try {
            await login(email, password);
            toast.success("Login successful!");
            router.push("/");
        } catch (err) {
            if (typeof err === "object" && err?.message) {
                if (typeof err.message === "string") {
                    setGeneralError(err.message);
                    toast.error(err.message);
                } else {
                    setError(err.message);
                }
            } else {
                setGeneralError("Something went wrong");
                toast.error("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="w-full h-fit my-auto md:w-3/4 lg:w-1/3 p-6 md:p-10 flex flex-col justify-center bg-base-100 rounded-lg shadow-lg">
                <div className="mb-6">
                    <Image src="/Logo.png" alt="Logo" width={270} height={82} />
                </div>

                <h1 className="text-2xl font-semibold mb-2 text-primary">
                    Sign In
                </h1>
                <p className="text-gray-600 mb-6">
                    Welcome back! Please log in to your account with registered
                    email and password.
                </p>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-secondary">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`w-full border ${
                                error.email ? "border-error" : "border-gray-300"
                            } text-base-content rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error.email && (
                            <p className="text-error text-sm mt-1">
                                {error.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-secondary"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                className={`w-full border ${
                                    error.password
                                        ? "border-error"
                                        : "border-gray-300"
                                } text-base-content rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                            >
                                {showPassword ? (
                                    <Eye className="w-5 h-5" />
                                ) : (
                                    <EyeOff className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {error.password && (
                            <p className="text-error text-sm mt-1">
                                {error.password}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end text-sm mt-4">
                        <Link href="/forgot-password" className="text-primary">
                            Forgot Password
                        </Link>
                    </div>

                    {generalError && (
                        <p className="text-error text-sm mt-2 text-center">
                            {generalError}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-success w-full mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner mr-2"></span>
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="flex items-center justify-center text-gray-600 mt-4 mb-6">
                    <span>Don't have an account?</span>
                    <Link href="/register" className="text-primary pl-1">
                        Register Now
                    </Link>
                </div>
            </div>

            <div className="hidden md:flex w-1/3 md:w-1/2 lg:w-1/3 justify-center items-center bg-base-100">
                <Image
                    src="/Frame.png"
                    alt="Illustration"
                    width={1000}
                    height={1000}
                />
            </div>
        </>
    );
}
