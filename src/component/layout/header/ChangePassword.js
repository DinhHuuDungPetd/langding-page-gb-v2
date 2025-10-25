"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loginAPI } from "@/hooks/authorizeAxiosInstance";
import FullScreenLoader from "@/component/FullScreenLoader";
import {
    IoKeyOutline
} from 'react-icons/io5'

const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
        />
    </svg>
);


export default function ChangePassword() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.password.trim()) newErrors.password = "Vui lòng nhập mật khẩu cũ.";
        if (!formData.newPassword.trim()) newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
        if (!formData.confirmNewPassword.trim()) newErrors.confirmNewPassword = "Vui lòng xác nhận mật khẩu mới.";
        if (formData.newPassword && formData.confirmNewPassword && formData.newPassword !== formData.confirmNewPassword) {
            newErrors.confirmNewPassword = "Mật khẩu xác nhận không khớp.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const payload = {
                password: formData.password,
                newPassword: formData.newPassword,
                confirmNewPassword: formData.confirmNewPassword
            };

            const response = await loginAPI.post("api/v1/Accounts/change-password", payload);

            if (response.status === 200) {
                alert("Đổi mật khẩu thành công!");
                setIsOpen(false);
                setFormData({
                    password: "",
                    newPassword: "",
                    confirmNewPassword: ""
                });
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setTimeout(() => (window.location.href = `/tra-cuu`), 1000);
            }
        } catch (error) {
            console.error("Lỗi khi đổi mật khẩu:", error);

            if (error.response?.status === 400 && error.response.data?.errors) {
                const errorMessages = error.response.data.errors
                    .map(err => `• ${err.message}`)
                    .join('\n');

                alert(`Lỗi xác thực:\n${errorMessages}`);
            } else {
                alert("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };


    const handleCloseModal = () => {
        setIsOpen(false);
        setErrors({});
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-gray-100"
            >
                <IoKeyOutline className="text-lg" />
                Đổi mật khẩu
            </button>


            <AnimatePresence>
                {loading && <FullScreenLoader />}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" // Thêm padding p-4
                        // Thay đổi onClick ở đây
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-lg relative" // Thêm "relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Nút "X" (Đóng) */}
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Đóng"
                            >
                                <CloseIcon />
                            </button>

                            {/* Tiêu đề Modal */}
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Đổi mật khẩu:</h2>

                            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"> {/* Thêm pr-2 để scrollbar không bị đè */}

                                {/* Mật khẩu cũ */}
                                <div>
                                    <label className="text-primary font-semibold block mb-1">
                                        Mật khẩu cũ: <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                {/* Mật khẩu mới */}
                                <div>
                                    <label className="text-primary font-semibold block mb-1">
                                        Mật khẩu mới: <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                                </div>

                                {/* Xác nhận mật khẩu */}
                                <div>
                                    <label className="text-primary font-semibold block mb-1">
                                        Xác nhận mật khẩu: <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        value={formData.confirmNewPassword}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>}
                                </div>

                                {/* Nút Hủy và Lưu */}
                                <div className="flex justify-end gap-3 pt-2">
                                    {/* Nút "Hủy" */}
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200 active:scale-95"
                                    >
                                        Hủy
                                    </button>

                                    {/* Nút "Lưu" */}
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={loading} // Vô hiệu hóa khi đang loading
                                        className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700 transition duration-200 active:scale-95 disabled:opacity-50"
                                    >
                                        {loading ? "Đang lưu..." : "Lưu thông tin"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}