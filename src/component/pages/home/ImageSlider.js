"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import styles from "@/component/pages/home/style/ImageSlider.module.css";
import { memo } from 'react';
import { motion } from "framer-motion";

const images = [
    {
        src: "https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745824874/greenlab/wc6pkyiovseiygbjturx.png",
        alt: "Green Lab - Dịch vụ xét nghiệm tại nhà uy tín",
        title: "Green Lab - Dịch vụ xét nghiệm tại nhà uy tín",
        priority: true
    },
    {
        src: "/images/silder/Cover-FB-03.webp",
        alt: "Green Lab - Xét nghiệm chính xác, nhanh chóng",
        title: "Green Lab - Xét nghiệm chính xác, nhanh chóng",
        priority: true
    },
    {
        src: "/images/silder/Cover-FB-04.png",
        alt: "Green Lab - Đội ngũ chuyên gia hàng đầu",
        title: "Green Lab - Đội ngũ chuyên gia hàng đầu",
        priority: true
    },
    {
        src: "/images/silder/Cover-FB-05.png",
        alt: "Green Lab - Chứng nhận ISO 15189:2012",
        title: "Green Lab - Chứng nhận ISO 15189:2012",
        priority: true
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const ImageSlider = memo(() => {
    return (
        <motion.div
            className="relative w-full mx-auto"
            role="region"
            aria-label="Image Slider"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
        >
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={{
                    clickable: true,
                    bulletClass: `swiper-pagination-bullet ${styles['swiper-pagination-bullet']}`,
                    bulletActiveClass: `swiper-pagination-bullet-active-custom ${styles['swiper-pagination-bullet-active-custom']}`,
                }}
                className={`mySwiper ${styles.swiperPagination}`}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <motion.div
                            className="relative w-full h-[80vh]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                title={image.title}
                                fill
                                priority={image.priority}
                                quality={85}
                                sizes="100vw"
                                style={{
                                    objectFit: "cover",
                                }}
                                loading={"eager"}
                            />
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
});

ImageSlider.displayName = 'ImageSlider';

export default ImageSlider;
