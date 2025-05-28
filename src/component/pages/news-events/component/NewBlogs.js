"use client";
import { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from "next/link";
import { blogAPI } from "@/hooks/authorizeAxiosInstance";

export default function NewBlogs({ category }) {
    const [featuredNews, setFeaturedNews] = useState(null);
    const [sideNews, setSideNews] = useState([]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getCategoryBlog = async () => {
        try {
            const response = await blogAPI.get(
                `api/v1/Blog?CategoryId=${category.categoryId}&BlogStatus=1&PageNumber=1&PageSize=10`
            );

            if (response.status === 200) {
                const blogs = response.data.data.items;

                const activeBlogs = blogs.filter(b => b.blogStatus === 1);
                const sortedBlogs = [...activeBlogs].sort((a, b) => a.blogPriority - b.blogPriority);
                const selectedBlogs = sortedBlogs.slice(0, 5);

                if (selectedBlogs.length === 0) return;

                const first = selectedBlogs[0];
                setFeaturedNews({
                    id: first.blogId,
                    title: first.blogTitle,
                    description: first.blogDescription,
                    imageUrl: first.imageTitle?.url || "/default.jpg",
                    titleImage: first.imageTitle?.title,
                    date: formatDate(first.blogCreatedAt),
                });

                const sides = selectedBlogs.slice(1).map(blog => ({
                    id: blog.blogId,
                    title: blog.blogTitle,
                    description: blog.blogDescription,
                    imageUrl: blog.imageTitle?.url || "/default.jpg",
                    titleImage: blog.imageTitle?.title,
                    date: formatDate(blog.blogCreatedAt),
                }));

                setSideNews(sides);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    };

    useEffect(() => {
        if (category?.categoryId) {
            getCategoryBlog();
        }
    }, [category]);

    if (!featuredNews) return null;

    return (
        <div className="bg-mint p-4 rounded-md mb-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-primary">{category.categoryName}</h2>
                <Link href={`/tin-tuc-su-kien/${category.categoryId}`} className="text-blue-500 text-sm font-medium hover:underline">
                    Xem thêm
                </Link>
            </div>

            <div className="md:flex gap-4">
                <div className="md:w-[60%] mb-4">
                    <Link href={`/tin-tuc-su-kien/${category.categoryId}/${featuredNews.id}`}>
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
                            <Link href={`/tin-tuc-su-kien/${category.categoryId}/${news.id}`} className="flex items-start gap-5">
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
                                    <p className="text-sm text-gray-700 mt-1 line-clamp-4" title={featuredNews.description}>
                                        {news.description}
                                    </p>
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
