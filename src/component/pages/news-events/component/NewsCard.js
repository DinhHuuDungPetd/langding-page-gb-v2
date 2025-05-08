"use client";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
import Link from "next/link";

export default function NewsCard({blogs}) {


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;


    const filteredBlogs = blogs.filter(blog => blog.status === true);
    const sortedNews = [...filteredBlogs].sort((a, b) => new Date(b.time) - new Date(a.time));

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
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <div>
                {currentItems && currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        <div key={`table-news-${index}`}>
                            <div className="flex flex-col lg:flex-row items-center justify-between py-4 px-4 border-b border-primary">
                                <Link href={`/tin-tuc-su-kien/${item.id}`}>
                                    <div className="flex items-center">
                                        <div className="relative w-48 h-32 rounded-lg overflow-hidden shrink-0">
                                            <Image
                                                src={item.images}
                                                alt={item.titleImage}
                                                title={item.titleImage}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="lg:text-xl text-primary font-bold  overflow-hidden text-ellipsis max-w-full">
                                                {item.title}
                                            </h3>
                                            <p className="font-medium text-balance text-md line-clamp-2">{item.description}</p>
                                            <div className="flex items-start mt-2 gap-1.5 font-medium text-xs text-gray-600">
                                                <p className="self-center mt-1">{formatDate(item.time)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    ))
                ) : (
                    <div className="text-center py-4 text-gray-500">Không có dữ liệu</div>
                )}
            </div>

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
                        className={`w-10 h-10 border-1 border-primary  flex items-center justify-center rounded-full transition 
                            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}
                        `}
                    >
                        <GrFormNext />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 border-1 border-primary  flex items-center justify-center rounded-full transition 
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
