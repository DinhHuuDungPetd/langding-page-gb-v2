"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
export default function RelatedPosts({ blogsRelated }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [relatedData, setRelatedData] = useState([]);

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!blogsRelated?.length) return;
            const fetchPromises = blogsRelated.map((item) =>
                axios.get(`${baseUrl}/blogs/${item.id}`)
                    .then((res) => res.data)
                    .catch((err) => {
                        console.error("Error fetching related blog:", err);
                        return null;
                    })
            );
            const results = await Promise.all(fetchPromises);
            const filtered = results.filter(Boolean);
            setRelatedData(filtered);
        };

        fetchRelatedData();

    }, [blogsRelated]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const filteredBlogs = relatedData.filter(blog => blog.status === true);
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
    return (
        <div className="w-full">
            <div className="mx-auto py-4 px-2 flex flex-wrap justify-center gap-x-4 gap-y-6">
                {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        <Link
                            href={`/tin-tuc-su-kien/${item.id}`}
                            key={`related-post-${index}`}
                            className="w-full sm:w-[45%] md:w-[40%] lg:w-[23%] text-center"
                        >
                            <div className="relative w-full h-[150px] lg:h-[100px] rounded-lg overflow-hidden">
                                <Image
                                    src={item.imageTitle.url}
                                    alt={item.imageTitle.title || "Related post"}
                                    title={item.imageTitle.title || ""}
                                    fill
                                    className="object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                                />
                            </div>
                            <h3
                                className="text-md sm:text-lg text-primary hover:text-midnight font-bold font-fz-poppins mt-4 truncate max-w-full cursor-default"
                                title={item.title}
                            >
                                {item.title}
                            </h3>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-500 w-full">No related posts found</p>
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
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full transition 
                    ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}
                    >
                        <GrFormNext />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 border-1 border-primary flex items-center justify-center rounded-full transition 
                    ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}
                    >
                        <MdLastPage />
                    </button>
                </div>
            </div>
        </div>

    );
}
