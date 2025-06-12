"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Home_14 from "@/icons/Home_14"
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import Link from 'next/link'
const MedicalSlider = () => {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await dataTestAPI.get(
                    `api/v1/Blog?BlogStatus=1`
                );
                if (response.status === 200) {
                    const categoryData = response.data.data.items;
                    setBlog(categoryData);
                }
            } catch (err) {
                console.error("Error fetching blog:", err);
            }
        };

        fetchBlog();
    }, []);

    const sortedNews = [...blog].sort((a, b) => b.blogView - a.blogView);
    const latestNews = sortedNews.slice(0, 7);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };

    const images = [
        {
            src: "/images/news/image.webp",
            alt: "Original image",
        },
        {
            src: "/images/news/image.webp",
            alt: "Original image",
        },
        {
            src: "/images/news/image.webp",
            alt: "Original image",
        },
        {
            src: "/images/news/image.webp",
            alt: "Original image",
        },
        {
            src: "/images/news/image.webp",
            alt: "Original image",
        },
    ];

    return (
        <div className="container mx-auto w-full pt-8">
            <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                    },
                }}
                className="w-full"
            >
                {latestNews && latestNews.length > 0 ? (
                    latestNews.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link href={`/tin-tuc-su-kien/news/${item.blogId}`}>
                                <div className="flex h-[200px] bg-white overflow-hidden cursor-pointer hover:bg-gray-100 rounded-lg">
                                    {/* Phần hình ảnh */}
                                    <div className="relative w-1/2 h-full">
                                        <Image
                                            src={item.imageTitle?.url || "https://placehold.co/600x600"}
                                            alt={item.imageTitle?.title || "image"}
                                            title={item.imageTitle?.title || ""}
                                            fill
                                            style={{
                                                objectFit: "cover",
                                            }}
                                            className="p-2"
                                            loading="lazy"
                                        />
                                    </div>
                                    {/* Phần nội dung */}
                                    <div className="w-1/2 p-2">
                                        <h3 className="text-sm font-semibold leading-snug line-clamp-2" title={item.blogTitle}>{item.blogTitle}</h3>
                                        <div className="flex items-start mt-2 gap-1.5 font-medium text-xs text-gray-600">
                                            <Home_14 />
                                            <p className="self-center mt-1">{formatDate(item.blogCreatedAt)}</p>
                                        </div>
                                        <p className="text-xs text-black text-justify leading-relaxed line-clamp-6" title={item.blogDescription}>
                                            {item.blogDescription}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không có tin tức</p>
                )}
            </Swiper>
        </div>
    );
};

export default MedicalSlider;