"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function TableRelatedPosts({
    blogs,
    selectedBlogIds,
    setSelectedBlogIds,
}) {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const handleCheckAll = (event) => {
        const isChecked = event.target.checked;
        setIsAllChecked(isChecked);

        if (isChecked) {
            const allBlogs = blogs.map((item) => ({ id: item.blogId }));
            setSelectedBlogIds(allBlogs);
        } else {
            setSelectedBlogIds([]);
        }
    };

    const handleCheckBlog = (event, id) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedBlogIds((prev) => [...prev, { id }]);
        } else {
            setSelectedBlogIds((prev) => prev.filter((blog) => blog.id !== id));
        }
    };

    useEffect(() => {
        if (blogs.length > 0) {
            const selectedIds = selectedBlogIds.map((blog) => blog.id);
            const allChecked = blogs.every((item) => selectedIds.includes(item.blogId));
            setIsAllChecked(allChecked);
        }
    }, [blogs, selectedBlogIds]);

    const isBlogSelected = (id) => {
        return selectedBlogIds.some((blog) => blog.id === id);
    };

    // Memoize sorted blogs to avoid unnecessary sorting on every render
    const sortedBlogs = useMemo(() => {
        return [...blogs].sort(
            (a, b) => new Date(a.blogCreatedAt).getTime() - new Date(b.blogCreatedAt).getTime()
        );
    }, [blogs]);

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
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-xl overflow-hidden">
                <thead className="bg-midnight text-white">
                    <tr>
                        <th className="px-4 py-3 font-medium text-xl" scope="col">
                            #
                        </th>
                        <th className="px-4 py-3 font-medium text-xl" scope="col">
                            <input
                                type="checkbox"
                                checked={isAllChecked}
                                onChange={handleCheckAll}
                                aria-label="Select all blogs"
                            />
                        </th>
                        <th className="px-4 py-3 font-medium text-xl" scope="col">
                            Tên
                        </th>
                        <th className="px-4 py-3 font-medium text-xl" scope="col">
                            Mô tả
                        </th>
                        <th className="px-4 py-3 font-medium text-xl" scope="col">
                            Hình ảnh
                        </th>
                        <th className="px-4 py-3 font-medium text-xl" scope="col">
                            Thời gian
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={item.blogId} className="border-b hover:bg-green-100">
                                <td className="px-4 py-3 font-medium">
                                    {index + 1 + (currentPage - 1) * itemsPerPage}
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    <input
                                        type="checkbox"
                                        checked={isBlogSelected(item.blogId)}
                                        onChange={(e) => handleCheckBlog(e, item.blogId)}
                                        aria-label={`Select blog ${item.blogTitle}`}
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium text-xl text-midnight w-1/5">
                                    {item.blogTitle}
                                </td>
                                <td className="px-4 py-3 font-medium text-md w-1/3 break-words whitespace-normal">
                                    {item.blogDescription}
                                </td>
                                <td className="px-4 py-3">
                                    {item.imageTitle.url && item.imageTitle.url !== "string" ? (
                                        <Image
                                            src={item?.imageTitle?.url || "https://placehold.co/200x60"}
                                            alt={item?.imageTitle?.title || "Ảnh bài viết"}
                                            width={200}
                                            height={60}
                                            className="rounded-md object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500">No image</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">{formatDate(item.blogCreatedAt)}</td>
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
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"
                            }`}
                        aria-label="Go to first page"
                    >
                        <MdFirstPage />
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"
                            }`}
                        aria-label="Go to previous page"
                    >
                        <GrFormPrevious />
                    </button>

                    {getPaginationItems().map((page) => (
                        <button
                            key={page}
                            onClick={() => handleClickPage(page)}
                            className={`w-10 h-10 border-1 rounded-full flex items-center justify-center transition ${page === currentPage
                                ? "bg-midnight text-white border-primary"
                                : "border-primary hover:bg-central hover:text-white"
                                }`}
                            aria-label={`Go to page ${page}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full transition ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"
                            }`}
                        aria-label="Go to next page"
                    >
                        <GrFormNext />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full transition ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"
                            }`}
                        aria-label="Go to last page"
                    >
                        <MdLastPage />
                    </button>
                </div>
            </div>
        </>
    );
}