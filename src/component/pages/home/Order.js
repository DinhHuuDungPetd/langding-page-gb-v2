import Image from "next/image";

export default function OrderComponent() {
    return (
        <section className="relative page py-12 px-4 sm:px-6">
            <div className="relative z-10 mx-auto flex flex-col xl:flex-row gap-10 max-w-7xl">
                {/* Hình ảnh */}
                <div className="w-full xl:w-2/5 flex justify-center items-center">
                    <Image
                        src="/images/order/order.jpg"
                        width={900}
                        height={1000}
                        alt="Nhân viên chăm sóc khách hàng green lab"
                        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-full h-auto object-cover rounded-md"
                    />
                </div>

                {/* Form */}
                <div className="w-full xl:flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        ĐẶT LỊCH LẤY MẪU XÉT NGHIỆM
                    </h2>
                    <p className="font-medium mb-4">
                        Đặt lịch xét nghiệm ngay để nhận được ưu đãi dành riêng cho Khách hàng chỉ có tại Green Lab.
                    </p>

                    <form className="space-y-4 text-[16px]">
                        {/** Mỗi nhóm input được bọc để có thể responsive */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-primary md:w-1/5 font-semibold">
                                Họ và tên:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Họ tên khách hàng"
                                className="flex-1 bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-primary md:w-1/5 font-semibold">
                                Số điện thoại:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Số điện thoại"
                                className="flex-1 bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-primary md:w-1/5 font-semibold">
                                Địa chỉ:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Địa chỉ lấy mẫu xét nghiệm"
                                className="flex-1 bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-primary md:w-1/5 font-semibold">
                                Ngày lấy mẫu:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                className="w-full md:w-[200px] bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-primary md:w-1/5 font-semibold">
                                Khung giờ:<span className="text-red-500">*</span>
                            </label>
                            <select className="w-full md:w-auto bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                                <option value="">Chọn khung giờ</option>
                                {[
                                    "8h00 - 9h00",
                                    "9h00 - 10h00",
                                    "10h00 - 11h00",
                                    "11h00 - 12h00",
                                    "12h00 - 13h00",
                                    "13h00 - 14h00",
                                    "14h00 - 15h00",
                                    "15h00 - 16h00",
                                    "16h00 - 17h00",
                                    "17h00 - 18h00",
                                    "18h00 - 19h00",
                                    "19h00 - 20h00",
                                    "20h00 - 21h00",
                                    "21h00 - 22h00",
                                ].map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <label htmlFor="note" className="text-primary md:w-1/5 font-semibold">
                                Ghi chú:<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="note"
                                placeholder="Ghi chú thêm những yêu cầu của bạn khi làm xét nghiệm"
                                className="flex-1 h-[100px] bg-gray-50 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder-gray-400 text-sm"
                            />
                        </div>

                        <div className="w-full flex justify-center">
                            <button
                                type="submit"
                                className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded"
                            >
                                Đặt lịch
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
