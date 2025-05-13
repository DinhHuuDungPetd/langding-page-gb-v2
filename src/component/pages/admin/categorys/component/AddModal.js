"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UpImage from "@/component/pages/admin/categorys/component/UpImage";
import axios from 'axios';
import FullScreenLoader from "@/component/FullScreenLoader";
export default function SearchModal({ getCategorys }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [upFileSideBanner, setUpFileSideBanner] = useState(null);
    const [upFilePromoBanner, setUpFilePromoBanner] = useState(null);
    const [titleTextSideBanner, setTitleTextSideBanner] = useState("");
    const [titleTextPromoBanner, setTitleTextPromoBanner] = useState("");
    const [previewSideBanner, setPreviewSideBanner] = useState("");
    const [previewPromoBanner, setPreviewPromoBanner] = useState("");
    const [name, setName] = useState("");


    const handleSave = async () => {
        if (!name.trim()) {
            alert("Vui lòng nhập tiêu đề danh mục.");
            return;
        }

        if (!titleTextSideBanner.trim()) {
            alert("Vui lòng nhập tiêu đề cho side banner.");
            return;
        }

        if (!titleTextPromoBanner.trim()) {
            alert("Vui lòng nhập tiêu đề cho promo banner.");
            return;
        }

        if (!upFileSideBanner) {
            alert("Vui lòng tải lên hình ảnh side banner.");
            return;
        }

        if (!upFilePromoBanner) {
            alert("Vui lòng tải lên hình ảnh promo banner.");
            return;
        }

        setLoading(true);
        try {
            const now = new Date();
            const formattedTime = now.toISOString();

            const uploadedSideBannerUrl = await uploadToCloudinary(upFileSideBanner);
            const uploadedPromoBannerUrl = await uploadToCloudinary(upFilePromoBanner);

            const categorys = {
                name: name.trim(),
                time: formattedTime,
                sideBanner: { url: uploadedSideBannerUrl, title: titleTextSideBanner.trim() },
                promoBanner: { url: uploadedPromoBannerUrl, title: titleTextPromoBanner.trim() },
                priority: "0",
                status: true,
                id_bogs: []
            };

            await axios.post(`${baseUrl}/categorys`, categorys);
            alert('Lưu danh mục thành công!');
        } catch (error) {
            console.error('Lỗi khi lưu danh mục:', error);
            alert('Đã xảy ra lỗi khi lưu danh mục. Vui lòng thử lại.');
        } finally {
            setLoading(false);
            getCategorys();
            setIsOpen(false);
        }
    };


    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="border border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-4 rounded transition-all duration-200"
            >
                <span className="text-md font-medium">Thêm danh mục</span>
            </button>

            <AnimatePresence>
                {loading && <FullScreenLoader />}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Thêm danh mục:</h2>
                            <div className="relative mb-4 space-y-2 max-h-[80vh] overflow-y-auto">
                                <input
                                    type="text"
                                    placeholder="Nhập từ khoá..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-central"
                                />

                                <UpImage previewImage={previewSideBanner} setPreviewImage={setPreviewSideBanner} titleText={titleTextSideBanner} setTitleText={setTitleTextSideBanner} setUpFile={setUpFileSideBanner} inputId={1} />
                                <UpImage previewImage={previewPromoBanner} setPreviewImage={setPreviewPromoBanner} titleText={titleTextPromoBanner} setTitleText={setTitleTextPromoBanner} setUpFile={setUpFilePromoBanner} inputId={2} />
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-primary text-white rounded mx-1 
             hover:bg-green-700 transition duration-200 
             transform active:scale-95 cursor-pointer"
                                >
                                    Lưu thông tin
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "greenlab"); // Đổi theo preset của bạn

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dgfwxibj4/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error?.message || "Upload thất bại");

        return data.secure_url;
    } catch (error) {
        console.error("Lỗi upload Cloudinary:", error);
        throw error;
    }
};