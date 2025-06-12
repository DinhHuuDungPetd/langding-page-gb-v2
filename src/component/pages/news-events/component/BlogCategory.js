"use client";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

export default function BlogCategory({ category, sideNews }) {
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            {sideNews && sideNews.length > 0 ? (
                sideNews.map((item, index) => (
                    <div key={`table-news-${index}`} className="py-5">
                        <Link href={`/tin-tuc-su-kien/${category.categoryId}/${item.blogId}`}>
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
        </div>
    );
}
