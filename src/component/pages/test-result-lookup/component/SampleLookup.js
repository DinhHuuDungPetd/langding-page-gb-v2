"use client";
import { useState } from "react";
import Image from "next/image";
import { loginAPI } from "@/hooks/authorizeAxiosInstance";
export default function SampleLookup() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn reload trang
        try {
            const userRq = {
                username: username,
                password: password,
            };
            const response = await loginAPI.post("api/v1/Auth/login", userRq);
            if (response.status === 200) {
                const doctorToken = response.data.data.token;
                const refreshToken = response.data.data.refreshToken;
                localStorage.setItem("accessToken", doctorToken);
                localStorage.setItem("refreshToken", refreshToken);
                alert("Đăng nhập thành công.");
                setTimeout(() => (window.location.href = `/tra-cuu/${username}`), 1000);
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Đăng nhập thất bại. Vui lòng kiểm tra tài khoản và mật khẩu.");
        }
    };

    return (
        <section className="relative py-12">
            <div className="absolute inset-0">
                <div className="w-full h-full bg-no-repeat bg-cover bg-[url(/images/background/Frame-01.webp)] bg-mint bg-blend-multiply" />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row px-6 xl:px-20 gap-5">
                <div className="w-3/5 xl:w-1/3 mx-auto lg:mx-10">
                    <Image
                        src="/images/nv/nv_16.png"
                        alt="Test Image"
                        width={800}
                        height={800}
                        className="rounded-lg mx-auto"
                    />
                </div>

                <div className="w-full xl:w-2/3 max-w-2xl">
                    <h2 className="text-lg md:text-2xl font-bold text-primary mb-4 text-center">
                        THÔNG TIN TÀI KHOẢN TRA CỨU MẪU XÉT NGHIỆM
                    </h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-primary font-medium mb-1 text-sm sm:text-base">
                                Tài khoản:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nhập tài khoản tra cứu"
                                className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38803E] text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-primary font-medium mb-1 text-sm sm:text-base">
                                Mật khẩu:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu tra cứu"
                                className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38803E] text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div className="text-xs sm:text-md medium-italic text-gray-500">
                            <p>- Đối với khách hàng lẻ, tài khoản là mã khách hàng (VD: 010120-1234567), mật khẩu có trong biên lai hoặc tin nhắn báo kết quả.</p>
                            <br />
                            <p>- Đối với bác sĩ/phòng khám, tài khoản và mật khẩu được Green Lab cung cấp qua email hoặc tin nhắn.</p>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded"
                        >
                            TRA CỨU
                        </button>


                        <p className="text-xs medium-italic text-primary mt-3">
                            *Xem hướng dẫn chi tiết chức năng tra cứu kết quả
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
