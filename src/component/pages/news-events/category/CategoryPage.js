"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import PopularNews from "@/component/pages/news-events/component/PopularNews";
import BlogCategory from "@/component/pages/news-events/component/BlogCategory";
import OrderComponent from "@/component/pages/home/Order";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
export default function BlogPage({ params }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { categorySlug } = params;
    const id = categorySlug;
    const [featuredNews, setFeaturedNews] = useState(null);
    const [sideNews, setSideNews] = useState([]);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}/categorys/${id}`)
            .then(response => {
                if (response.data.status === true) {
                    setCategory(response.data);
                } else {
                    console.warn('Category is inactive');
                    setCategory(null); // hoặc bỏ qua
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        if (!category?.id_bogs) return;

        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/blogs`);
                const blogs = res.data;

                if (!category?.id_bogs) return;

                const sortedBlogIds = [...category.id_bogs].sort((a, b) => Number(a.priority) - Number(b.priority));
                const selectedBlogs = sortedBlogIds
                    .map(b => blogs.find(blog => blog.id === b.id))
                    .filter(Boolean)
                    .slice(0, 5);

                if (selectedBlogs.length === 0) return;

                const first = selectedBlogs[0];
                console.log(first)
                setFeaturedNews(first);

                const sides = selectedBlogs.slice(1).map(blog => blog);
                console.log(sides)
                setSideNews(sides);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [category]);

    if (!featuredNews) return null;
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `Thứ Sáu, ${day} tháng ${month}, ${year}`;
    };
    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017912/backgroundMobile/skwnwgkb13t5kaqlfl3z.jpg)] md:bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825601/greenlab/kwicnww6fxa63f9fplra.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20 text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span className=" text-md medium-italic ">Tin tức - Sự kiện</span> &gt;{" "}
                    <span className=" text-md medium-italic ">{category?.name}</span>
                </div>
            </div>
            <div className="container mx-auto px-2">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-[65%] bg-mint px-2 lg:px-10 mb-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-start w-full max-w-5xl mx-auto py-6">
                            <div className="w-[70%] lg:w-[50%] rounded-md overflow-hidden">
                                <Image
                                    src={featuredNews.imageTitle?.url || "/default.jpg"}
                                    alt={featuredNews.imageTitle?.title || "hot news"}
                                    title={featuredNews.imageTitle?.title || ""}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                />
                            </div>

                            <div className="flex flex-col gap-3 lg:w-[50%]">
                                <p className="uppercase text-sm text-gray-500 font-semibold">Tin tức hot nhất</p>
                                <Link href={`/tin-tuc-su-kien/news/${featuredNews.id}`}>
                                    <h2 className="text-lg sm:text-xl font-bold text-primary hover:text-midnight leading-snug  transition-colors">
                                        {featuredNews.title}
                                    </h2>
                                </Link>
                                <p className="text-gray-700 text-sm line-clamp-3">
                                    {featuredNews.description}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                                    <FaCalendarAlt className="mt-[2px]" />
                                    <span>{formatDate(featuredNews.time)}</span>
                                </div>
                            </div>
                        </div>
                        <BlogCategory category={category} sideNews={sideNews} />
                    </div>

                    <div className="w-full lg:w-[35%] my-5">
                        <div className='lg:w-[90%] md:w-[60%] w-[80%] mx-auto mb-5 overflow-hidden'>
                            <Image
                                src={category?.sideBanner?.url || "/default.jpg"}
                                alt={category?.sideBanner?.title || "hot news"}
                                title={category?.sideBanner?.title || ""}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                        </div>
                        <div className='lg:w-[90%] md:w-[60%] w-[80%] mx-auto mb-5 overflow-hidden'>
                            <Image
                                src={category?.promoBanner?.url || "/default.jpg"}
                                alt={category?.promoBanner?.title || "hot news"}
                                title={category?.promoBanner?.title || ""}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                        </div>
                        <div className="rounded p-4 mb-5">
                            <PopularNews />
                        </div>
                    </div>
                </div>
            </div>
            <OrderComponent />
        </div>
    );
}
