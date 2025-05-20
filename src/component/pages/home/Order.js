'use client';
import Image from "next/image";
import { useState } from "react";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";

export default function OrderComponent() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        date: "",
        timeSlot: "",
        note: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            setIsSubmitting(true);
            // await dataTestAPI.post("/api/v1/orders", formData);
            alert("Đặt lịch thành công!");
            setFormData({
                name: "",
                phone: "",
                address: "",
                date: "",
                timeSlot: "",
                note: ""
            });
        } catch (error) {
            alert("Đặt lịch thất bại. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
        if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
        else if (!/^0\d{9,10}$/.test(formData.phone)) newErrors.phone = "Số điện thoại không hợp lệ";
        if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
        if (!formData.date) newErrors.date = "Vui lòng chọn ngày";
        if (!formData.timeSlot) newErrors.timeSlot = "Vui lòng chọn khung giờ";
        if (!formData.note.trim()) newErrors.note = "Vui lòng nhập ghi chú";
        return newErrors;
    };

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
                    <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
                        ĐẶT LỊCH LẤY MẪU XÉT NGHIỆM
                    </h2>
                    <p className="font-medium text-sm sm:text-base mb-4">
                        Đặt lịch xét nghiệm ngay để nhận được ưu đãi dành riêng cho Khách hàng chỉ có tại Green Lab.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 text-[16px]">
                        {/* Họ và tên */}
                        <FormField label="Họ và tên" required name="name" value={formData.name} error={errors.name} onChange={handleChange} placeholder={`Họ tên khách hàng`} />
                        {/* Số điện thoại */}
                        <FormField label="Số điện thoại" required name="phone" value={formData.phone} error={errors.phone} onChange={handleChange} placeholder={`Số điện thoại`} />
                        {/* Địa chỉ */}
                        <FormField label="Địa chỉ" required name="address" value={formData.address} error={errors.address} onChange={handleChange} placeholder={`Địa chỉ lấy mẫu xét nghiệm`} />

                        {/* Ngày lấy mẫu */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-primary md:w-1/5 font-semibold">
                                Ngày lấy mẫu:<span className="text-red-500">*</span>
                            </label>
                            <div className="flex-1">
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                            </div>
                        </div>

                        {/* Khung giờ */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-primary md:w-1/5 font-semibold">
                                Khung giờ:<span className="text-red-500">*</span>
                            </label>
                            <div className="flex-1">
                                <select
                                    name="timeSlot"
                                    value={formData.timeSlot}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                >
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
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                                {errors.timeSlot && <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>}
                            </div>
                        </div>

                        {/* Ghi chú */}
                        <div className="flex flex-col md:flex-row gap-2">
                            <label htmlFor="note" className="text-primary md:w-1/5 font-semibold">
                                Ghi chú:<span className="text-red-500">*</span>
                            </label>
                            <div className="flex-1">
                                <textarea
                                    id="note"
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Ghi chú thêm những yêu cầu của bạn khi làm xét nghiệm"
                                    className="w-full h-[100px] bg-gray-50 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                />
                                {errors.note && <p className="text-red-500 text-sm mt-1">{errors.note}</p>}
                            </div>
                        </div>

                        <div className="w-full flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded disabled:opacity-60"
                            >
                                {isSubmitting ? "Đang gửi..." : "Đặt lịch"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

function FormField({ label, name, value, onChange, error, required, placeholder }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="text-primary md:w-1/5 font-semibold">
                {label}:{required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex-1">
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        </div>
    );
}
