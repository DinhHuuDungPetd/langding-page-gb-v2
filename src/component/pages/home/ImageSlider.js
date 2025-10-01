"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import OptimizedImage from "@/components/OptimizedImage";
import styles from "@/component/pages/home/style/ImageSlider.module.css";
import { memo, useMemo } from 'react';
import { motion } from "framer-motion";

const images = [
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1758854205/wizpfnza5gkqmuvhd7tb.avif",
        alt: "Green Lab - Dịch vụ xét nghiệm tại nhà uy tín",
        title: "Green Lab - Dịch vụ xét nghiệm tại nhà uy tín",
        priority: true
    },
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1747302696/slider/mbhcprkhphijmah7qqwi.png",
        alt: "Green Lab - Xét nghiệm chính xác, nhanh chóng",
        title: "Green Lab - Xét nghiệm chính xác, nhanh chóng",
        priority: true
    },
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1749718719/slider/mkklh6sjdltvb4qhspj6.png",
        alt: "Green Lab - Đội ngũ chuyên gia hàng đầu",
        title: "Green Lab - Đội ngũ chuyên gia hàng đầu",
        priority: true
    },
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1747302696/slider/opobc9simuxikbbshcao.png",
        alt: "Green Lab - Sàng lọc sau sinh",
        title: "Green Lab - Sàng lọc sau sinh",
        priority: true
    },
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1747302697/slider/adszilozasiimpvmrbc8.png",
        alt: "Green Lab - Chứng nhận ISO 15189:2012",
        title: "Green Lab - Chứng nhận ISO 15189:2012",
        priority: true
    },
];
const imagesMobile = [
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1747295499/slider/vks414sgc4mpmdyciqgt.png",
        alt: "Green Lab - Dịch vụ xét nghiệm tại nhà uy tín",
        title: "Green Lab - Dịch vụ xét nghiệm tại nhà uy tín",
        priority: true
    },
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1747295500/slider/hqj9kfr9toozvc5kvgsx.png",
        alt: "Green Lab - Xét nghiệm chính xác, nhanh chóng",
        title: "Green Lab - Xét nghiệm chính xác, nhanh chóng",
        priority: true
    },
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1747295500/slider/fsq9n6hkn6bhnnche0jd.png",
        alt: "Green Lab - Sàng lọc sau sinh",
        title: "Green Lab - Sàng lọc sau sinh",
        priority: true
    },
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1748849470/slider/al3ayhvkrs3iury2an0l.png",
        alt: "Green Lab - Đội ngũ chuyên gia hàng đầu",
        title: "Green Lab - Đội ngũ chuyên gia hàng đầu",
        priority: true
    },
    {
        src: "https://res.cloudinary.com/dgfwxibj4/image/upload/v1747295501/slider/otqosoavkdaythsk2sf5.png",
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
    // Memoize swiper config để tránh re-render không cần thiết
    const swiperConfig = useMemo(() => ({
        modules: [Autoplay, Pagination],
        spaceBetween: 0,
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            clickable: true,
            bulletClass: `swiper-pagination-bullet ${styles['swiper-pagination-bullet']}`,
            bulletActiveClass: `swiper-pagination-bullet-active-custom ${styles['swiper-pagination-bullet-active-custom']}`,
        }
    }), []);

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
                {...swiperConfig}
                className={`mySwiper ${styles.swiperPagination}`}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={`${image.src}-${index}`}>
                        {/* Desktop image */}
                        <motion.div
                            className="relative w-full aspect-[2.627/1] hidden md:block"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <OptimizedImage
                                src={image.src}
                                alt={image.alt}
                                width={1920}
                                height={731}
                                priority={index === 0} // Chỉ ảnh đầu tiên có priority
                                quality={85}
                                sizes="(max-width: 768px) 100vw, 120vw"
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Mobile image */}
                        <motion.div
                            className="relative w-full h-[80vh] block md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <OptimizedImage
                                src={imagesMobile[index]?.src || image.src}
                                alt={imagesMobile[index]?.alt || image.alt}
                                width={768}
                                height={600}
                                priority={index === 0} // Chỉ ảnh đầu tiên có priority
                                quality={85}
                                sizes="100vw"
                                className="object-cover"
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
