"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchModal({ searchName, setSearchName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("search_history");
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    // Lưu lại lịch sử
    const saveSearch = (text) => {
        if (!text.trim()) return;

        const updatedHistory = [text, ...history.filter((item) => item !== text)].slice(0, 10);
        setHistory(updatedHistory);
        localStorage.setItem("search_history", JSON.stringify(updatedHistory));
        setSearchName("");
    };

    const handleSearch = () => {
        saveSearch(searchName);
        setIsOpen(false);
    };

    const removeItem = (item) => {
        const updated = history.filter((i) => i !== item);
        setHistory(updated);
        localStorage.setItem("search_history", JSON.stringify(updated));
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white cursor-pointer"
            >
                <FiSearch className="text-xl text-gray-600" />
                <span className="text-md font-medium text-gray-600">{searchName || "Tìm kiếm bài viết"}</span>
            </button>

            <AnimatePresence>
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
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Tìm kiếm bài viết</h2>
                            <div className="relative mb-4">
                                <FiSearch className="absolute top-3 left-4 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Nhập từ khoá..."
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-central"
                                />
                            </div>

                            {history.length > 0 && (
                                <div className="mt-2">
                                    <h3 className="text-gray-600 text-sm font-semibold mb-2">Tìm kiếm gần đây</h3>
                                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                                        {history.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                                                onClick={() => setSearchName(item)}
                                            >
                                                <span>{item}</span>
                                                <FiX
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeItem(item);
                                                    }}
                                                    className="text-gray-400 hover:text-red-500"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
