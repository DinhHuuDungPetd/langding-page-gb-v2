import Image from "next/image";

export default function Account() {
    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(/images/background/background_4.PNG)]  bg-blend-multiply">
                <div className="absolute bottom-4 left-20 text-white text-xl medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Kết quả xét nghiệm</span>
                </div>
            </div>
            <section className="relative  py-12">
                <div className="absolute inset-0">
                    <div className="w-full h-full bg-no-repeat bg-cover bg-[url(/images/background/Frame-02.PNG)] bg-mint" />
                </div>

                <div className="relative z-10 mx-auto flex flex-col xl:flex-row px-6 xl:px-20">
                    <div className="w-full xl:w-1/2 ">
                        <Image
                            src="/images/nv/nv_6.png"
                            alt="Test Image"
                            width={800}
                            height={800}
                            className="rounded-lg"
                        />
                    </div>

                    {/* Bên phải - Form */}
                    <div className="w-full max-w-3xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                            THÔNG TIN TÀI KHOẢN TRA CỨU MẪU XÉT NGHIỆM
                        </h2>

                        <form className="space-y-4">

                            <div>
                                <label className="block text-primary font-medium mb-1">
                                    Tài khoản:<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập tài khoản tra cứu"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38803E]"
                                />
                            </div>

                            <div>
                                <label className="block text-primary font-medium mb-1">
                                    Mật khẩu:<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu tra cứu"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38803E]"
                                />
                            </div>

                            <div className="text-sm  medium-italic">
                                <p>- Đối với khách hàng lẻ, tải khoản tra cứu là mã khách hàng (ví dụ 010120-1234567), mật khẩu được cung cấp trong biên lai thu tiền hoặc tin nhắn báo kết quả</p>
                                <br />
                                <p>- Đối với bác sĩ cộng tác viên, phòng khám, bệnh viện, tải khoản và mật khẩu tra cứu được Green Lab cung cấp qua Email hoặc tin nhắn điện thoại.</p>
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
        </div>
    )
}