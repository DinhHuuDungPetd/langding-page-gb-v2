"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
import Link from "next/link";
import axios from 'axios';

export default function TablePosts({ setLoading, blogs, getBlogs }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const handleUpdateStatus = async (id, isChecked) => {
        try {
            setLoading(true);
            await axios.patch(`${baseUrl}/blogs/${id}`, { status: isChecked });
            await getBlogs();
        } catch (error) {
            console.error("Error updating blog status:", error);
        } finally {
            setLoading(false);
        }
    };

    const sortedNews = [...blogs].sort((a, b) => a?.time?.localeCompare(b?.time));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedNews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedNews.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    const getPaginationItems = () => {
        let startPage, endPage;
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    };

    return (
        <>

            <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-xl overflow-hidden">
                <thead className="bg-midnight text-white">
                    <tr>
                        <th className="px-4 py-3 font-medium text-xl">#</th>
                        <th className="px-4 py-3 font-medium text-xl">Tên</th>
                        <th className="px-4 py-3 font-medium text-xl">Mô tả</th>
                        <th className="px-4 py-3 font-medium text-xl">Hình ảnh</th>
                        <th className="px-4 py-3 font-medium text-xl">Thời gian</th>
                        <th className="px-4 py-3 font-medium text-xl">Trạng thái</th>
                        <th className="px-4 py-3 font-medium text-xl">Hành động</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-post-${index}`} className="border-b hover:bg-green-100">
                                <td className="px-4 py-3 font-medium">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td className="px-4 py-3 font-medium text-xl text-midnight w-1/5">{item.title}</td>
                                <td className="px-4 py-3 font-medium text-md w-1/4 break-words whitespace-normal">{item.description}</td>
                                <td className="px-4 py-3">
                                    <Image
                                        src={item.imageTitle.url}
                                        alt="Ảnh bài viết"
                                        width={200}
                                        height={60}
                                        className="rounded-md object-cover"
                                    />
                                </td>
                                <td className="px-4 py-3">{formatDate(item.time)}</td>
                                <td className="px-4 py-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.status === true}
                                            onChange={(e) => handleUpdateStatus(item.id, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-central
                    rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                    after:transition-all dark:border-gray-600 peer-checked:bg-midnight">
                                        </div>
                                    </label>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <Link href={`/admin/posts/updatePosts/${item.id}`}>
                                            <button className="text-blue-500 hover:text-blue-700 font-medium cursor-pointer" onClick={() => setLoading(true)}>Sửa</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-gray-500">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex flex-col items-center justify-center py-8 px-4">
                <div className="flex gap-2">
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                        <MdFirstPage />
                    </button>
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}
                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                        <GrFormPrevious />
                    </button>
                    {getPaginationItems().map((page) => (
                        <button key={page} onClick={() => handleClickPage(page)}
                            className={`w-10 h-10 border rounded-full flex items-center justify-center transition 
                ${page === currentPage ? "bg-midnight text-white border-primary" : "border-primary hover:bg-central hover:text-white"}`}>
                            {page}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}
                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full transition 
              ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                        <GrFormNext />
                    </button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full transition 
              ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                        <MdLastPage />
                    </button>
                </div>
            </div>
        </>
    );
}
