"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function TablePosts({ blogs, selectedBlogIds, setSelectedBlogIds }) {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;



    const handleCheckAll = (event) => {
        const isChecked = event.target.checked;
        setIsAllChecked(isChecked);

        if (isChecked) {
            const allBlogs = blogs.map((item) => ({ id: item.id, priority: '0' }));
            setSelectedBlogIds(allBlogs);
        } else {
            setSelectedBlogIds([]);
        }
    };

    const handleCheckBlog = (event, id) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedBlogIds((prev) => [...prev, { id, priority: '0' }]);
        } else {
            setSelectedBlogIds((prev) => prev.filter((blog) => blog.id !== id));
        }
    };

    useEffect(() => {
        if (blogs.length > 0) {
            const selectedIds = selectedBlogIds.map((blog) => blog.id);
            const allChecked = blogs.every((item) => selectedIds.includes(item.id));
            setIsAllChecked(allChecked);
        }
    }, [blogs, selectedBlogIds]);

    const isBlogSelected = (id) => {
        return selectedBlogIds.some((blog) => blog.id === id);
    };

    const sortedBlogs = [...blogs].sort((a, b) => a.time.localeCompare(b.time));
    const totalPages = Math.ceil(sortedBlogs.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedBlogs.slice(indexOfFirstItem, indexOfLastItem);

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
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-xl overflow-hidden">
                <thead className="bg-midnight text-white">
                    <tr>
                        <th className="px-4 py-3 font-medium text-xl">#</th>
                        <th className="px-4 py-3 font-medium text-xl">
                            <input
                                type="checkbox"
                                checked={isAllChecked}
                                onChange={handleCheckAll}
                            />
                        </th>
                        <th className="px-4 py-3 font-medium text-xl">Tên</th>
                        <th className="px-4 py-3 font-medium text-xl">Mô tả</th>
                        <th className="px-4 py-3 font-medium text-xl">Hình ảnh</th>
                        <th className="px-4 py-3 font-medium text-xl">Thời gian</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-green-100">
                                <td className="px-4 py-3 font-medium">
                                    {index + 1 + (currentPage - 1) * itemsPerPage}
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    <input
                                        type="checkbox"
                                        checked={isBlogSelected(item.id)}
                                        onChange={(e) => handleCheckBlog(e, item.id)}
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium text-xl text-midnight w-1/5">{item.title}</td>
                                <td className="px-4 py-3 font-medium text-md w-1/3 break-words whitespace-normal">
                                    {item.description}
                                </td>
                                <td className="px-4 py-3">
                                    <Image
                                        src={item.images}
                                        alt="Ảnh bài viết"
                                        width={200}
                                        height={60}
                                        className="rounded-md object-cover"
                                    />
                                </td>
                                <td className="px-4 py-3">{formatDate(item.time)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex flex-col items-center justify-center py-8 px-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}
                    >
                        <MdFirstPage />
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}
                    >
                        <GrFormPrevious />
                    </button>

                    {getPaginationItems().map((page) => (
                        <button
                            key={page}
                            onClick={() => handleClickPage(page)}
                            className={`w-10 h-10 border-1 rounded-full flex items-center justify-center transition 
                                ${page === currentPage
                                    ? "bg-midnight text-white border-primary"
                                    : "border-primary hover:bg-central hover:text-white"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full transition 
                            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}
                        `}
                    >
                        <GrFormNext />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full transition 
                            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}
                        `}
                    >
                        <MdLastPage />
                    </button>
                </div>
            </div>
        </>
    );
}
