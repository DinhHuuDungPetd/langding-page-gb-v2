"use client";

import Image from "next/image";
import MedicalSlider from "@/component/pages/service/component/MedicalSlider";
import CertificateComponent from "@/component/pages/home/Certificate";
import PartnerComponent from "@/component/pages/home/Partner";
import OrderComponent from "@/component/pages/home/Order";
import MediaContent from "@/component/pages/introduction/component/MediaContent"
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";

export default function ServicePage() {
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
        <div>
            <Head>
                <link
                    rel="preload"
                    href="/images/background/background_3.webp"
                    as="image"
                />
            </Head>
            <motion.div
                className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017212/backgroundMobile/o4wmtltzspcfhnq233co.jpg)] md:bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747016415/backgroundMobile/ijn1tfp5aavhibez02hi.jpg)]  bg-blend-multiply"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="absolute bottom-4 left-5 md:left-10 lg:left-20  text-white text-xl italic z-9"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Trang chủ &gt; <span className="font-normal">Dịch vụ xét nghiệm</span>
                </motion.div>
            </motion.div>
            <div className="relative w-full min-h-screen bg-mint overflow-hidden">
                <div className="class_1 relative">
                    <div className="relative w-full h-full xl:h-[1000px] px-6 overflow-hidden">
                        <motion.div
                            className="absolute top-0 right-0 w-[30%] h-[45%] opacity-30 z-0 mx-30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.3, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/images/nv/nv_3.webp"
                                alt="Doctor Transparent"
                                fill
                                className="w-full h-full object-cover hidden xl:block"
                                sizes="(min-width: 1280px) 30vw, 0vw"
                                quality={50}
                            />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-0 right-0 w-[80%] lg:w-[30%] h-[50%] opacity-50 z-0"
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
                            className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-5 py-18 xl:px-70"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="w-[75%] flex h-[650px] justify-center mr-10 border-1 border-primary rounded-tr-[200px] relative"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute w-full bottom-8 left-8 h-[650px] rounded-tr-[200px] bg-green-100 flex justify-center items-center overflow-hidden">
                                    <Image
                                        src={"/images/nv/nv_7.webp"}
                                        alt={"Image"}
                                        fill
                                        className="w-full h-full object-cover hidden xl:block"
                                        sizes="(min-width: 1280px) 30vw, 0vw"
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
                                            className="text-xl lg:text-3xl text-primary font-bold whitespace-nowrap uppercase"
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
                                        className="leading-relaxed font-medium xl:text-md"
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
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    className="absolute top-[40%] left-[55%] transform -translate-x-1/2 z-20 pointer-events-none hidden xl:flex justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="pointer-events-auto max-w-[60vw] md:mx-auto px-10">
                        <MedicalSlider />
                    </div>
                </motion.div>
            </div>
            <motion.section
                className="bg-mint px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-[20px] lg:text-3xl font-bold text-primary text-center my-2 uppercase"
                    variants={itemVariants}
                >
                    Tại sao nên chọn GREEN LAB?
                </motion.h2>
                <motion.div
                    className="my-10"
                    variants={itemVariants}
                >
                    <MediaContent />
                </motion.div>
            </motion.section>
            <CertificateComponent />
            {/* <PartnerComponent /> */}
            <OrderComponent />
        </div>
    )
}