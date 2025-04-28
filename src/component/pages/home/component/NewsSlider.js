"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Home_12 from "@/icons/Home_12"

const MedicalSlider = () => {
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
                slidesPerView={3}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
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
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex h-[200px] bg-white overflow-hidden cursor-pointer hover:bg-gray-100 rounded-lg">
                            {/* Phần hình ảnh */}
                            <div className="relative w-1/2 h-full">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
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
                                <h3 className="text-sm font-semibold">Lorem Ipsum</h3>
                                <div className="flex items-center mt-2 gap-1.5 font-medium text-xs text-gray-600">
                                    <p className="w-[30%] h-[20%]"><Home_12 /></p>
                                    <p>2023-02-05</p>
                                </div>
                                <p className="text-xs text-black text-justify leading-relaxed line-clamp-7">
                                    Lorem Ipsum is simply dummy text of the printing
                                    and typesetting industry. Lorem Ipsum has been
                                    the industry's standard dummy text ever since
                                    the 1500s, when an unknown printer took a galley
                                    of type and scrambled it to make a type specimen
                                    book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised
                                    in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently
                                    with desktop publishing software like Aldus PageMaker
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MedicalSlider;