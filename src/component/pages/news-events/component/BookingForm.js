"use client";
import { useState, memo } from "react";
import dynamic from "next/dynamic";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";

const Image = dynamic(() => import("next/image"), { ssr: false });

const FormInput = memo(({ label, id, type = "text", placeholder, value, onChange, error }) => (
    <div>
        <label htmlFor={id} className="block text-white font-medium mb-1 text-sm sm:text-base">
            {label} <span className="text-red-500">*</span>
        </label>
        <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            className={`w-full border bg-white border-gray-300 px-4 py-2 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base ${error ? "border-red-500" : ""}`}
            required
            value={value}
            onChange={onChange}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
));

FormInput.displayName = "FormInput";

const BookingForm = () => {
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

    const validate = () => {
        const newErrors = {};
        const today = new Date();
        const selectedDate = formData.date ? new Date(formData.date) : null;

        // Làm tròn today và selectedDate về 00:00 để chỉ so sánh theo ngày
        today.setHours(0, 0, 0, 0);
        if (selectedDate) selectedDate.setHours(0, 0, 0, 0);

        if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
        if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
        else if (!/^0\d{9,10}$/.test(formData.phone)) newErrors.phone = "Số điện thoại không hợp lệ";
        if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";

        if (!formData.date) {
            newErrors.date = "Vui lòng chọn ngày";
        } else if (selectedDate < today) {
            newErrors.date = "Ngày lấy mẫu không được là ngày quá khứ";
        }

        if (!formData.timeSlot) newErrors.timeSlot = "Vui lòng chọn khung giờ";

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const getAvailableTimeSlots = () => {
        const slots = [
            "08h00-09h00",
            "09h00-10h00",
            "10h00-11h00",
            "11h00-12h00",
            "12h00-13h00",
            "13h00-14h00",
            "14h00-15h00",
            "15h00-16h00",
            "16h00-17h00",
            "17h00-18h00",
            "18h00-19h00",
            "19h00-20h00",
            "20h00-21h00",
            "21h00-22h00",
        ];

        const now = new Date();
        const selectedDate = new Date(formData.date);

        // Nếu không chọn ngày hoặc không phải hôm nay, hiện tất cả
        if (!formData.date || selectedDate.toDateString() !== now.toDateString()) {
            return slots;
        }

        // Nếu là hôm nay, lọc những khung giờ chưa qua
        const currentHour = now.getHours();
        return slots.filter(slot => {
            const [startHour] = slot.split("-")[0].split("h");
            return parseInt(startHour) > currentHour;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);

        const orderData = {
            PatientName: formData.name,
            Phone: formData.phone,
            Address: formData.address,
            ScheduleDate: formData.date,
            ScheduleTime: formData.timeSlot,
            Comment: formData.note,
        };

        try {
            const request = await dataTestAPI.post("/api/v1/Booking", orderData);
            if (request.status === 200) {
                alert("Đặt lịch thành công!");
                setFormData({
                    name: "",
                    phone: "",
                    address: "",
                    date: "",
                    timeSlot: "",
                    note: ""
                });
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            alert("Đặt lịch thất bại. Vui lòng thử lại sau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-3xl p-6 bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-xl shadow-lg text-white mx-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">ĐẶT LỊCH</h2>
            <h2 className="text-lg sm:text-xl font-bold mb-6 text-center">LẤY MẪU XÉT NGHIỆM</h2>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <FormInput
                    label="Họ và tên"
                    id="name"
                    placeholder="Họ tên khách hàng"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <FormInput
                    label="Số điện thoại"
                    id="phone"
                    type="tel"
                    placeholder="Số điện thoại khách hàng"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                />

                <FormInput
                    label="Địa chỉ"
                    id="address"
                    placeholder="Địa chỉ lấy mẫu xét nghiệm"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                />

                <FormInput
                    label="Ngày lấy mẫu"
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    error={errors.date}
                />

                <div>
                    <label htmlFor="timeSlot" className="block text-white font-medium mb-1 text-sm sm:text-base">
                        Khung giờ: <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="timeSlot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className={`w-full bg-white border ${errors.timeSlot ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base`}
                        required
                    >
                        <option value="">Chọn khung giờ</option>
                        {getAvailableTimeSlots().map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                    {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
                </div>

                <div>
                    <label htmlFor="note" className="block text-white font-semibold mb-1 text-sm sm:text-base">
                        Nội dung:
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Nội dung tin nhắn"
                        className={`text-sm md:text-base w-full border bg-white px-4 py-2 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white h-32 ${errors.note ? "border-red-500" : "border-gray-300"}`}
                        required
                    />
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-sm md:text-base bg-red-600 text-white hover:bg-red-800 py-3 px-7 rounded-full transition duration-200 font-bold"
                    >
                        {isSubmitting ? "Đang gửi..." : "Đặt lịch"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(BookingForm);
