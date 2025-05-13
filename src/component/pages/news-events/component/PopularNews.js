"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from 'axios';
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";

export default function PopularNews() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [blogs, setBlogs] = useState([]);

    const getBlogs = async () => {
        try {
            const response = await axios.get(`${baseUrl}/blogs`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog => blog.status === true);
    const sortedNews = [...filteredBlogs].sort((a, b) => b.views - a.views); // Lưu ý: bỏ `new Date()` vì views là số
    const latestNews = sortedNews.slice(0, 4);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `Thứ Sáu, ${day} tháng ${month}, ${year}`;
    };

    return (
        <div className=" bg-mint shadow-md px-0">
            <h3 className="text-2xl text-primary font-bold text-center pt-5">
                Tin tức nhiều người đọc
            </h3>
            <div className="py-4 px-2 md:px-5">
                {latestNews && latestNews.length > 0 ? (
                    latestNews.map((item, index) => (
                        <Link
                            href={`/tin-tuc-su-kien/news/${item.id}`}
                            key={`table-news-${index}`}
                            className="flex gap-4 mb-6 items-start pb-4"
                        >
                            <div className="relative w-34 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                                <Image
                                    src={item.imageTitle?.url || "/default.jpg"}
                                    alt={item.imageTitle?.title || "image"}
                                    title={item.imageTitle?.title || ""}
                                    fill
                                    className="object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col justify-start gap-1">
                                <div className="flex items-center text-gray-500 text-xs">
                                    <FaCalendarAlt className="mr-1" />
                                    <span>{formatDate(item.time)}</span>
                                </div>
                                <h3 className="text-sm sm:text-md font-semibold text-primary hover:text-midnight leading-snug line-clamp-2 ">
                                    {item.title}
                                </h3>
                                <p className="text-sm sm:text-md text-gray-700 line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không có tin tức</p>
                )}
            </div>
        </div>
    );
}
