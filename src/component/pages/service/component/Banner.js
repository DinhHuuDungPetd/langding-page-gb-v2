"use client";

import Image from "next/image";
import MedicalSlider from "@/component/pages/service/component/MedicalSlider";
import { motion } from "framer-motion";

export default function Banner() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <>
            <div className="class_1 relative">
                <div className="relative w-full h-full lg:h-[1200px] xl:h-[1000px] px-6 overflow-hidden">
                    <motion.div
                        className="absolute top-0 right-0 w-[48%] xl:w-[30%] h-[45%] opacity-30 z-0 xl:mx-30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/images/nv/nv_3.webp"
                            alt="Doctor Transparent"
                            fill
                            className="w-full h-full object-cover hidden lg:block"
                        />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-0 right-0 w-[90%] lg:w-[30%] h-[50%] opacity-50 z-0"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 0.5, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Image
                            src="/images/background/bgn.webp"
                            alt="Decor Icon"
                            fill
                            className="w-full h-full object-contain"
                        />
                    </motion.div>

                    <motion.div
                        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 py-5 lg:py-18 xl:px-20 2xl:px-70"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="w-[90%] h-[650px] justify-center mr-10 border-1 border-primary rounded-tr-[200px] relative hidden lg:flex"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute w-full bottom-8 left-8 h-[650px] rounded-tr-[200px] bg-green-100 flex justify-center items-center overflow-hidden">
                                <Image
                                    src={"/images/nv/nv_7.webp"}
                                    alt={"Image"}
                                    fill
                                    className="w-full h-full object-cover"
                                    sizes="(min-width: 580px) 30vw, 0vw"
                                    quality={50}
                                    priority={true}
                                    loading={"eager"}
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full h-full xl:mt-[15%] md:flex md:items-center md:justify-center xl:items-start xl:justify-start"
                            variants={itemVariants}
                        >
                            <div className="max-w-[700px] text-justify">
                                <motion.div
                                    className="flex items-center justify-center my-6 gap-3"
                                    variants={itemVariants}
                                >
                                    <div className="hidden md:block">
                                        <div className="flex items-center gap-1 hi">
                                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                                            <span className="w-16 h-[2px] bg-[#36803E]"></span>
                                        </div>
                                    </div>
                                    <motion.h2
                                        className="text-xl lg:text-2xl text-primary font-bold whitespace-nowrap uppercase"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Các dịch vụ xét nghiệm
                                    </motion.h2>
                                    <div className="hidden md:block">
                                        <div className="flex items-center gap-1">
                                            <span className="w-16 h-[2px] bg-[#36803E]"></span>
                                            <span className="w-2 h-2 bg-[#36803E] rounded-full"></span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.p
                                    className="leading-relaxed font-medium text-sm md:text-base"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Sức khỏe là tài sản quý giá nhất, nhưng cuộc sống bận rộn khiến bạn khó dành thời gian để kiểm tra định kỳ?
                                    Hằng giờ xếp hàng ở bệnh viện, chờ đợi kết quả hàng tuần – những điều này có làm bạn chán nản? Đừng lo,
                                    dịch vụ xét nghiệm tại nhà chính là giải pháp toàn diện cho sức khỏe mà bạn đang tìm kiếm. Với Green Lab,
                                    bạn không chỉ tiết kiệm thời gian mà còn nhận được kết quả chính xác, nhanh chóng ngay tại nhà.
                                </motion.p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full max-w-4xl mx-auto relative blog lg:hidden"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative w-full aspect-[16/9] bg-green-100 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/nv/nv_9.jpg"
                                    alt="Image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <motion.div
                className="absolute lg:top-[42%] xl:top-[40%] left-[55%] transform -translate-x-1/2 z-20 pointer-events-none hidden lg:flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="pointer-events-auto max-w-[80vw] xl:max-w-[60vw] 2xl:max-w-[50vw] md:mx-auto ">
                    <MedicalSlider />
                </div>
            </motion.div>
        </>
    )
}