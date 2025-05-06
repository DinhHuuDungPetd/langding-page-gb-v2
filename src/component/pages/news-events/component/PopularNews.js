"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from 'axios';
import Link from "next/link";

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

    const sortedNews = [...filteredBlogs].sort((a, b) => new Date(b.views) - new Date(a.views));
    const latestNews = sortedNews.slice(0, 4);
    return (
        <div className="w-[80%] bg-mint shadow-md">
            <h3 className="text-2xl text-primary font-bold items-center text-center pt-5">
                Tin tức nhiều người đọc
            </h3>
            <div className="py-4 px-4">
                {latestNews && latestNews.length > 0 ? (
                    latestNews.map((item, index) => (
                        <Link href={`/tin-tuc-su-kien/${item.id}`} key={`table-news-${index}`} className="mb-8 flex flex-col items-center text-center">

                            <div className="relative w-[60%] max-w-[500px] aspect-[3/2] rounded-lg overflow-hidden">
                                <Image
                                    src={item.images}
                                    alt={item.titleImage || "Related post"}
                                    title={item.titleImage || "Related post"}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <h3 className="text-xl text-primary font-bold font-fz-poppins mt-4">
                                {item.name}
                            </h3>

                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No news available</p>
                )}
            </div>
        </div>

    )
}