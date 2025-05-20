"use client";
import Image from 'next/image';
import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpertComponent = memo(() => {
    const experts = [
        {
            src: "/images/expert/bs-1.webp",
            alt: "Bác sĩ chuyên gia Green Lab - Chuyên gia huyết học",
            width: 350,
            height: 350
        },
        {
            src: "/images/expert/bs-2.webp",
            alt: "Bác sĩ chuyên gia Green Lab - Chuyên gia xét nghiệm",
            width: 350,
            height: 350
        },
        {
            src: "/images/expert/bs-3.webp",
            alt: "Bác sĩ chuyên gia Green Lab - Chuyên gia tư vấn",
            width: 350,
            height: 350
        }
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
        <AnimatePresence>
            <motion.section
                className="container mx-auto py-8 mt-2"
                aria-labelledby="expert-heading"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.div
                    className="flex items-center justify-center gap-2"
                    variants={itemVariants}
                >
                    <div className=" items-center gap-1 hidden md:flex">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="w-16 h-[2px] bg-[#36803E]"></span>
                    </div>
                    <h2 id="expert-heading" className="text-primary text-xl md:text-2xl font-bold whitespace-nowrap">
                        ĐỘI NGŨ CHUYÊN GIA HÀNG ĐẦU
                    </h2>
                    <div className=" items-center gap-1 hidden md:flex">
                        <span className="w-16 h-[2px] bg-[#36803E]"></span>
                        <span className="w-2 h-2 bg-[#36803E] rounded-full"></span>
                    </div>
                </motion.div>
                <motion.div
                    className="flex items-center justify-center text-center pt-8 mb-5"
                    variants={itemVariants}
                >
                    <p className="w-full px-5 md:w-4/5 md:px-0 text-sm sm:text-base text-justify md:text-center">
                        Đội ngũ chuyên gia hàng đầu với hơn 20 năm kinh nghiệm trong lĩnh vực y học mang đến dịch vụ xét nghiệm tại nhà, giúp bạn yên tâm về kết quả.
                        Với chuyên môn cao mức độ chuyên gia, Green Lab không chỉ là xét nghiệm, mà là sự đảm bảo cho sức khỏe của bạn và gia đình!
                    </p>
                </motion.div>
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-center "
                    variants={containerVariants}
                >
                    {experts.map((expert, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={expert.src}
                                alt={expert.alt}
                                width={expert.width}
                                height={expert.height}
                                loading="lazy"
                                quality={85}
                                sizes="(max-width: 768px) 100vw, 350px"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>
        </AnimatePresence>
    );
});

ExpertComponent.displayName = 'ExpertComponent';

export default ExpertComponent;