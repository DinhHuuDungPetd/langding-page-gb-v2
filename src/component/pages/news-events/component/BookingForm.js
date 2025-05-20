"use client";
import { memo } from "react";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), { ssr: false });

const FormInput = memo(({ label, id, type = "text", placeholder, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-white font-medium mb-1 text-sm sm:text-base">
            {label} <span className="text-red-500">*</span>
        </label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            className="w-full border bg-white border-gray-300 px-4 py-2 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
            required
            aria-required="true"
            {...props}
        />
    </div>
));

FormInput.displayName = 'FormInput';

const TimeSlotSelect = memo(() => (
    <div>
        <label htmlFor="timeSlot" className="block text-white font-medium mb-1 text-sm sm:text-base">
            Khung giờ:<span className="text-red-500">*</span>
        </label>
        <select
            id="timeSlot"
            className="w-full bg-white border border-gray-300 px-4 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
            required
            aria-required="true"
            aria-label="Chọn khung giờ lấy mẫu"
        >
            <option value="">Chọn khung giờ</option>
            {Array.from({ length: 15 }, (_, i) => {
                const hour = i + 8;
                return (
                    <option key={hour} value={`${hour}h00 - ${hour + 1}h00`}>
                        {`${hour}h00 - ${hour + 1}h00`}
                    </option>
                );
            })}
        </select>
    </div>
));

TimeSlotSelect.displayName = 'TimeSlotSelect';

const BookingForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="w-full max-w-3xl p-6 bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-xl shadow-lg text-white mx-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">
                ĐẶT LỊCH
            </h2>
            <h2 className="text-lg sm:text-xl font-bold mb-6 text-center">
                LẤY MẪU XÉT NGHIỆM
            </h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
                aria-describedby="formDescription"
                noValidate
            >
                <p id="formDescription" className="sr-only">
                    Mẫu đơn đặt lịch lấy mẫu xét nghiệm. Vui lòng điền đầy đủ thông tin trong các trường bắt buộc được đánh dấu bằng dấu sao.
                </p>

                <FormInput
                    label="Họ và tên"
                    id="fullName"
                    placeholder="Họ tên khách hàng"
                />

                <FormInput
                    label="Số điện thoại"
                    id="phone"
                    type="tel"
                    placeholder="Số điện thoại khách hàng"
                />

                <FormInput
                    label="Địa chỉ"
                    id="address"
                    placeholder="Địa chỉ lấy mẫu xét nghiệm"
                />

                <FormInput
                    label="Ngày lấy mẫu"
                    id="sampleDate"
                    type="date"
                />

                <TimeSlotSelect />

                <FormInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Email khách hàng"
                />

                <div>
                    <label htmlFor="message" className="block text-white font-semibold mb-1 text-sm sm:text-base">
                        Nội dung:<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        placeholder="Nội dung tin nhắn"
                        className=" text-sm md:text-base xl:text-base w-full border bg-white border-gray-300 px-4 py-2 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white h-32"
                        required
                        aria-required="true"
                    />
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="text-sm md:text-base xl:text-base bg-red-600 text-white hover:bg-red-800 py-3 px-7 rounded-full transition duration-200 font-bold font-fz-poppins"
                        aria-label="Gửi mẫu đơn đặt lịch"
                    >
                        Đặt lịch
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(BookingForm);