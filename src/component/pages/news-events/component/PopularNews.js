"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";

export default function PopularNews() {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await dataTestAPI.get(
                    `/api/v1/Blog/Oa?offset=0&limit=4`
                );
                if (response.status === 200) {
                    const zaloData = response.data.data.data.medias;
                    setBlog(zaloData);
                }
            } catch (err) {
                console.error("Error fetching blog:", err);
            }
        };

        fetchBlog();
    }, []);

    // FIX: Sửa lại hàm format ngày tháng để xử lý timestamp (miliseconds)
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };


    return (
        <div className=" bg-mint shadow-md px-0">
            <h3 className="text-2xl text-primary font-bold text-center pt-5">
                Tin tức
            </h3>
            <div className="py-4 px-5 md:px-5 max-w-[500px] mx-auto">
                {blog && blog.length > 0 ? (
                    blog.map((item) => (
                        <Link
                            href={`/tin-tuc-su-kien/${item.id}`}
                            key={`table-news-${item.id}`}
                            className="flex gap-4 mb-6 items-start pb-4"
                        >
                            <div className="relative w-34 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                                <Image
                                    src={item?.thumb}
                                    alt={item?.title || "image"}
                                    title={item?.title || ""}
                                    fill
                                    className="object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col justify-start gap-1">
                                <div className="flex items-center text-gray-500 text-xs">
                                    <FaCalendarAlt className="mr-1" />
                                    <span>{formatDate(item.createDate)}</span>
                                </div>
                                <h4 className="text-sm sm:text-base font-semibold text-primary hover:text-midnight leading-snug line-clamp-3 ">
                                    {item.title}
                                </h4>
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
