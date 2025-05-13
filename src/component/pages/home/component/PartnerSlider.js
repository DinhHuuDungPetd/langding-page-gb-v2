"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from "next/image";

const MedicalSlider = () => {
    const images = [
        {
            src: "/images/partner/Benh-vien-da-khoa-Sai-Gon-Phan-Rang.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/Benh-vien-Phu-san-Tam-Phuc.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Buu-dien.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-Ha-Noi-cao-Bang.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Da-Khoa-Ha-Noi-Dong-Van.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-Ha-Noi.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-hung-ha.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Da-khoa-Minh-Thien.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-nong-nghiep.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-Phuong-Dong.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-quoc-te-Bac-Ha.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-quoc-te-Hop-Luc.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Da-khoa-Tam-Anh.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-thao-nguyen.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Da-khoa-tinh-Bac-Giang.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-da-khoa-Tri-Duc-Thanh---Thanh-Hoa.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Dai-hoc-Phenikaa.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-dai-hoc-y-duoc-buon-ma-thuot.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-dong-do.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/Bv-Duc-Phuc.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Hoan-My-Vinh.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Huu-Nghi-Lac-Viet.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Nam-hoc-va-Hiem-muon-Ha-Noi.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-phu-san---Nhi-Da-Nang.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-phu-san-An-Thinh.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Phu-san-Hai-Duong.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-phu-san-thien-an.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-quoc-te-Thai-nguyen.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Quoc-te-Vinh-Phuc.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-San--nhi-bac-giang.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/bv-San-nhi-Bac-Ninh.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-san-nhi-Phu-Tho.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/BV-Ung-Buou-Hung-Viet.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/Da-Khoa-Quoc-Te-Viet---Nga.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/Phong-kham-4womwnclinic.webp",
            alt: "Original image",
        },
        {
            src: "/images/partner/Phong-kham-Hieu-Le.webp",
            alt: "Original image",
        }
    ]

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