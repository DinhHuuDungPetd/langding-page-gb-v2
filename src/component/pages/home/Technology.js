"use client";
import { memo } from 'react';
import { motion } from 'framer-motion';
import Icon from "@/component/Icon";
import Image from "next/image";

const TechnologyComponent = memo(() => {
    const images = [
        {
            src: "/images/technology/t-1.webp",
            alt: "Công nghệ xét nghiệm hiện đại tại Green Lab - Máy móc tự động hóa",
            title: "Công nghệ xét nghiệm hiện đại tại Green Lab"
        },
        {
            src: "/images/technology/t-2.webp",
            alt: "Phòng xét nghiệm tiêu chuẩn quốc tế tại Green Lab",
            title: "Phòng xét nghiệm tiêu chuẩn quốc tế"
        },
        {
            src: "/images/technology/t-3.webp",
            alt: "Quy trình xét nghiệm tự động hóa tại Green Lab",
            title: "Quy trình xét nghiệm tự động hóa"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.section 
            className="page-3 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="container mx-auto py-12 sm:py-20">
                <motion.div 
                    className="text-white w-full lg:w-1/2"
                    variants={itemVariants}
                >
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 uppercase text-primary">
                        Công nghệ tiên tiến
                    </h1>
                    <p className="text-sm sm:text-md text-black mb-4 leading-relaxed font-medium">
                        Sử dụng công nghệ hiện đại của các hãng sản phẩm đầu thế
                        giới như: Roche, Beckman-Coulter, Siemens, Stago, Horiba, NovaCyt,
                        Perkin Elmer, Qiagen...
                    </p>
                    <p className="text-sm sm:text-md text-black mb-4 leading-relaxed font-medium">
                        Quy trình xét nghiệm được tự động hóa hoàn toàn, được quản lý bằng phần mềm do GreenLab phát triển.
                    </p>
                </motion.div>
                <motion.div 
                    className="flex items-center justify-start gap-4"
                    variants={containerVariants}
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="relative w-full max-w-[300px] aspect-[3/2] shadow-md rounded-lg overflow-hidden"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                title={image.title}
                                fill
                                quality={85}
                                loading="lazy"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover rounded-lg"
                            />
                            <div
                                className="absolute inset-0 rounded-lg pointer-events-none"
                                style={{
                                    boxShadow: "inset 0 0 35px 25px rgba(225,225,225,0.8), inset 0 2px 1px 1px rgba(255,255,255,1), inset 0 -2px 1px rgba(255,255,255,0.2)",
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
});

TechnologyComponent.displayName = 'TechnologyComponent';

export default TechnologyComponent;