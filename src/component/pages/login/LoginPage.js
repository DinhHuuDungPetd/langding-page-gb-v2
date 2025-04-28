"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const toggleType = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic
    };

    return (
        <div className="flex min-h-screen w-full flex-wrap items-stretch bg-white  max-md:pb-20 max-md:pt-32">
            <div className="grow md:flex md:w-1/2 md:flex-col md:items-center md:justify-center md:py-20">
                <div className="w-full px-4 text-center text-xs lg:w-1/2">
                    <h1 className="mb-8 text-2xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="mb-6 text-gray-600">
                        Access your account to explore our amazing features.
                    </p>

                    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                        <input id="plan" type="hidden" name="plan" value="" />

                        <div className="relative">
                            <label
                                htmlFor="email"
                                className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 mb-3"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800    placeholder-gray-400 transition-colors focus:border-green-500 focus:outline-0 focus:ring focus:ring-green-200 "
                            />
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700  mb-3"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Your password"
                                    className="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800   placeholder-gray-400 transition-colors focus:border-green-500 focus:outline-0 focus:ring focus:ring-green-200"
                                />
                                <button
                                    type="button"
                                    onClick={toggleType}
                                    className="absolute right-3 top-1/2 z-10 inline-flex -translate-y-1/2 items-center justify-center rounded hover:bg-gray-200 "
                                >
                                    {showPassword ? (
                                        // Eye-slash icon
                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                            <path d="M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        // Eye icon
                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="my-2 flex justify-between gap-2">
                            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 ">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="peer rounded border-gray-300  focus:ring focus:ring-green-200 "
                                />
                                Remember me
                            </label>
                            <a className="text-green-600 text-sm" href="/forgot-password">
                                Forgot Password?
                            </a>
                        </div>

                        <input className="hidden" id="recaptcha" value="0" readOnly />
                        <button
                            id="LoginFormButton"
                            type="submit"
                            className="lqd-btn group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl bg-green-600 text-white hover:bg-green-500 focus-visible:bg-green-700 focus-visible:shadow-green-300/10 px-5 py-3"
                        >
                            Sign in
                        </button>

                        <div className="text-gray-600  text-xs">
                            By proceeding, you acknowledge and accept our{" "}
                            <a className="font-medium text-green-600 underline" href="/terms" target="_blank">
                                Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a className="font-medium text-green-600 underline" href="/privacy-policy" target="_blank">
                                Privacy Policy
                            </a>.
                        </div>
                    </form>

                    <div className="mt-20 text-gray-600  text-sm">
                        Don't have an account yet?{" "}
                        <a className="font-medium text-green-600 underline" href="/register">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>

            <div
                className="hidden flex-col justify-center overflow-hidden bg-cover bg-center md:flex md:w-1/2 bg-[rgba(102,231,113,0.88)] bg-no-repeat bg-[url(/images/background/background.jpg)]  bg-blend-multiply"
            >
                <div className="relative w-full h-[80%] translate-x-[25%]">
                    <Image
                        className="rounded-[36px] shadow-[0_24px_88px_rgba(0,0,0,0.55)] object-cover"
                        src="/images/nv/nv_8.jpg"
                        alt="Service Dashboard Mockup"
                        fill
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
