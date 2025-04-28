import Image from "next/image";

export default function OrderComponent() {
    return (
        <section className="relative page py-12">
            <div className="relative z-10 mx-auto flex flex-col xl:flex-row px-6 xl:px-20 gap-8">
                <div className="w-1/3 flex items-center">
                    <img
                        src="/images/order/order.png"
                        alt="Nhân viên chăm sóc khách hàng green lab"
                        className="w-full h-full object-left object-cover"
                    />
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        ĐẶT LỊCH LẤY MẪU XÉT NGHIỆM
                    </h2>
                    <p className="font-medium mb-4">
                        Đặt lịch xét nghiệm ngay để nhận được ưu đãi dành riêng cho Khách hàng chỉ có tại Green Lab.
                    </p>

                    <form className="space-y-4 text-[16px]">
                        <div className="flex justify-between items-center">
                            <label className="text-primary w-1/5 font-semibold mb-1">
                                Họ và tên:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Họ tên khách hàng"
                                className="flex-1 bg-gray-50 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className=" text-primary w-1/5 font-semibold mb-1">
                                Số điện thoại:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="phone"
                                placeholder="Số điện thoại"
                                className="flex-1 bg-gray-50 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className=" text-primary w-1/5 font-semibold mb-1">
                                Địa chỉ:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="phone"
                                placeholder="Địa chỉ lấy mẫu xét nghiệm"
                                className="flex-1 bg-gray-50 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/5 text-primary font-semibold mb-1">
                                Ngày lấy mẫu:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                className="w-[200px] bg-gray-50 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/5 text-primary font-semibold mb-1">
                                Khung giờ:<span className="text-red-500">*</span>
                            </label>
                            <select className=" bg-gray-50 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                                <option value="">Chọn khung giờ</option>
                                <option value="8h00 - 9h00">8h00 - 9h00</option>
                                <option value="9h00 - 10h00">9h00 - 10h00</option>
                                <option value="10h00 - 11h00">10h00 - 11h00</option>
                                <option value="11h00 - 12h00">11h00 - 12h00</option>
                                <option value="12h00 - 13h00">12h00 - 13h00</option>
                                <option value="13h00 - 14h00">13h00 - 14h00</option>
                                <option value="14h00 - 15h00">14h00 - 15h00</option>
                                <option value="15h00 - 16h00">15h00 - 16h00</option>
                                <option value="16h00 - 17h00">16h00 - 17h00</option>
                                <option value="17h00 - 18h00">17h00 - 18h00</option>
                                <option value="18h00 - 19h00">18h00 - 19h00</option>
                                <option value="19h00 - 20h00">19h00 - 20h00</option>
                                <option value="20h00 - 21h00">20h00 - 21h00</option>
                                <option value="21h00 - 22h00">21h00 - 22h00</option>
                            </select >
                        </div>

                        <div className="w-full flex items-center">
                            <label htmlFor="note" className="w-1/5 text-[#38803E] font-semibold mb-1">
                                Ghi chú:<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="note"
                                placeholder="Ghi chú thêm những yêu cầu của bạn khi làm xét nghiệm"
                                className="flex-1 h-[100px] bg-gray-50 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder-gray-400 text-sm"
                            >
                            </textarea>
                        </div>
                        <div className="w-full flex items-center justify-center ">
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
    )
}