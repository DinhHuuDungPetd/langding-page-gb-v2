"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from 'next/link';
import Home_14 from "@/icons/Home_14";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";

const MedicalSlider = () => {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await dataTestAPI.get(
                    `/api/v1/Blog/Oa?offset=0&limit=5`
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
                {blog && blog.length > 0 ? (
                    blog.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Link href={`/tin-tuc-su-kien/${item.id}`}>
                                <div className="flex h-[200px] bg-white overflow-hidden cursor-pointer hover:bg-gray-100 rounded-lg">
                                    <div className="relative w-1/2 h-full">
                                        <Image
                                            src={item?.thumb}
                                            alt={item?.title || "image"}
                                            title={item?.title || ""}
                                            fill
                                            style={{
                                                objectFit: "cover",
                                            }}
                                            className="p-2 rounded-xl"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="w-1/2 p-2 flex flex-col">
                                        <h3 className="text-sm font-semibold leading-snug line-clamp-2" title={item.title}>{item.title}</h3>
                                        <div className="flex items-center mt-2 gap-1.5 font-medium text-xs text-gray-600">
                                            <Home_14 />
                                            <p>{formatDate(item.createDate)}</p>
                                        </div>
                                        <p className="text-xs text-black text-justify leading-relaxed line-clamp-5 mt-2" title={item.title}>
                                            {item.title}
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