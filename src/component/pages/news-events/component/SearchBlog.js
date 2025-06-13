"use client";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";

export default function SearchBlog({ category, blogs, getPaginationItems, handleClickPage, currentPage, setCurrentPage, totalPages }) {
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((item, index) => (
                    <div key={`table-news-${index}`} className="py-5">
                        <Link href={`/tin-tuc-su-kien/${category?.categoryId}/${blogs.blogId}`}>
                            <div className="flex flex-col lg:flex-row items-center">
                                <div className="relative w-30 lg:w-48 h-24 lg:h-32 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={item.imageTitle?.url || "https://placehold.co/600x600"}
                                        alt={item.imageTitle?.title || "Blog Image"}
                                        title={item.imageTitle?.title || ""}
                                        fill
                                        className="object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                                    />
                                </div>
                                <div className="ml-4 w-[70%]">
                                    <h3 className="text-md sm:text-lg text-primary font-bold line-clamp-2">
                                        {item.blogTitle}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                                        {item.blogDescription}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                                        <FaCalendarAlt className="mt-[2px]" />
                                        <span>{formatDate(item.blogCreatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-center py-4 text-gray-500">Không có dữ liệu</div>
            )}
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
        </div>

    );
}
