"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; // ✅ Thêm Autoplay
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

const MedicalSlider = () => {
    const images = [
        { src: "/images/bao-chi/Dan_tri_logo.webp", alt: "Original image" },
        { src: "/images/bao-chi/Suc-khoe-Doi-song-Logo.webp", alt: "Original image" },
        { src: "/images/bao-chi/tuoitre-online-logo.webp", alt: "Original image" },
        { src: "/images/bao-chi/VnExpress.net_Logo.webp", alt: "Original image" },
        { src: "/images/bao-chi/VTV3_logo_2013_final.webp", alt: "Original image" },
    ];

    return (
        <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-marquee flex gap-10">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        width={150}
                        height={100}
                        className="object-contain"
                    />
                ))}
                {/* Duplicate for seamless loop */}
                {images.map((image, index) => (
                    <Image
                        key={`clone-${index}`}
                        src={image.src}
                        alt={image.alt}
                        width={150}
                        height={100}
                        className="object-contain"
                    />
                ))}
            </div>
        </div>

    );
};

export default MedicalSlider;
