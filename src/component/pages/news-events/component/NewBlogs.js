"use client";
import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function NewBlogs({ blogs }) {
    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="grid gap-6">
            {blogs.map((item, index) => (
                <div key={`blog-${index}`} className="bg-mint p-4 rounded-md">
                    <Link href={`/tin-tuc-su-kien/${item.id}`} target="_blank">
                        <div className="md:flex gap-4">
                            <div className="md:w-[40%]">
                                <Image
                                    src={item.thumb || "/default.jpg"}
                                    alt={item.title}
                                    width={600}
                                    height={400}
                                    className="rounded-md object-cover w-full h-auto transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="md:w-[60%] mt-3 md:mt-0">
                                <h3
                                    className="text-lg font-semibold text-primary hover:text-midnight line-clamp-2"
                                    title={item.title}
                                >
                                    {item.title}
                                </h3>
                                <div className="flex items-center text-gray-500 text-xs mt-2">
                                    <FaCalendarAlt className="w-4 h-4 mr-1" />
                                    {formatDate(item.createDate)}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
