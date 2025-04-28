"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from "next/image";

const MedicalSlider = () => {
    const images = [
        {
            src: "/images/bao-chi/Dan_tri_logo.png",
            alt: "Original image",
        },
        {
            src: "/images/bao-chi/Suc-khoe-Doi-song-Logo.jpeg",
            alt: "Original image",
        },
        {
            src: "/images/bao-chi/tuoitre-online-logo.png",
            alt: "Original image",
        },
        {
            src: "/images/bao-chi/VnExpress.net_Logo.png",
            alt: "Original image",
        },
        {
            src: "/images/bao-chi/VTV3_logo_2013_final.png",
            alt: "Original image",
        },
    ]

    return (
        <>
            <div className="relative pt-8">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 4.5,
                            spaceBetween: 25
                        }
                    }}
                    className="w-full"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className=" relative h-[100px] w-full">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{
                                        objectFit: "contain",
                                    }}
                                    loading='lazy'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default MedicalSlider;