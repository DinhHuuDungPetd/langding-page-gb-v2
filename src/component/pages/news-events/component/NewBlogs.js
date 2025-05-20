
"use client";
import { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import axios from 'axios';
import Link from "next/link";

export default function NewBlogs({ category }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [featuredNews, setFeaturedNews] = useState(null);
    const [sideNews, setSideNews] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/blogs`);
                const blogs = res.data.filter(blog => blog.status === true); // Lọc blog có status = true

                if (!category?.id_bogs) return;

                const sortedBlogIds = [...category.id_bogs].sort((a, b) => Number(a.priority) - Number(b.priority));
                const selectedBlogs = sortedBlogIds
                    .map(b => blogs.find(blog => blog.id === b.id))
                    .filter(Boolean)
                    .slice(0, 5);

                if (selectedBlogs.length === 0) return;

                const first = selectedBlogs[0];
                setFeaturedNews({
                    id: first.id,
                    title: first.title,
                    description: first.description,
                    imageUrl: first.imageTitle?.url || "/default.jpg",
                    titleImage: first.imageTitle?.title,
                    date: new Date(first.time).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }),
                });

                const sides = selectedBlogs.slice(1).map(blog => ({
                    id: blog.id,
                    title: blog.title,
                    imageUrl: blog.imageTitle?.url || "/default.jpg",
                    titleImage: blog.imageTitle?.title,
                    date: new Date(blog.time).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }),
                }));

                setSideNews(sides);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [category]);


    if (!featuredNews) return null;

    return (
        <div className="bg-mint p-4 rounded-md mb-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-primary">{category.name}</h2>
                <Link href={`/tin-tuc-su-kien/${category.id}`} className="text-blue-500 text-sm font-medium hover:underline">Xem thêm</Link>
            </div>

            <div className="md:flex gap-4">
                <div className="md:w-[60%] mb-4">
                    <Link href={`/tin-tuc-su-kien/${category.id}/${featuredNews.id}`}>
                        <div className="rounded overflow-hidden">
                            <Image
                                src={featuredNews.imageUrl}
                                alt={featuredNews.titleImage}
                                title={featuredNews.titleImage}
                                width={700}
                                height={550}
                                className="w-full h-auto object-cover rounded transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                        </div>
                        <h3 className="mt-3 text-md sm:text-lg font-semibold line-clamp-2 text-primary hover:text-midnight" title={featuredNews.title}>
                            {featuredNews.title}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1 line-clamp-4" title={featuredNews.description}>
                            {featuredNews.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-xs mt-2">
                            <FaCalendarAlt className="w-4 h-4 mr-1" />
                            {featuredNews.date}
                        </div>
                    </Link>
                </div>

                <div className="md:w-[40%] md:mt-0 space-y-5">
                    {sideNews.map((news, index) => (
                        <div key={index}>
                            <Link href={`/tin-tuc-su-kien/${category.id}/${news.id}`} className="flex items-start gap-5">
                                <div className="h-25 rounded overflow-hidden w-1/2">
                                    <Image
                                        src={news.imageUrl}
                                        alt={news.titleImage}
                                        title={news.titleImage}
                                        width={200}
                                        height={200}
                                        className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <h4 className="text-sm font-semibold text-primary hover:text-midnight leading-snug line-clamp-3">
                                        {news.title}
                                    </h4>
                                    <div className="flex items-center text-gray-500 text-xs mt-1">
                                        <FaCalendarAlt className="w-3 h-3 mr-1" />
                                        {news.date}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
