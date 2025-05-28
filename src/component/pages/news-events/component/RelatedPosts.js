"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
import Link from "next/link";
export default function RelatedPosts({ blog, getPaginationItems, handleClickPage, currentPage, setCurrentPage, totalPages }) {


    return (
        <div className="w-full">
            <div className="mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {blog?.length > 0 ? (
                    blog.map((item, index) => (
                        <Link
                            href={`/tin-tuc-su-kien/${item.id}`}
                            key={`related-post-${index}`}
                            className="text-center block"
                        >
                            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
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
                                title={item.blogTitle}
                            >
                                {item.blogTitle}
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
