"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Banner() {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    return (
        <div className="relative w-full my-6">
            <div className="absolute inset-0 top-10 lg:h-[90%] bg-gradient-to-b from-primary to-midnight transform origin-bottom skew-x-[-3deg] -rotate-3 z-0 flex justify-end items-center overflow-hidden">
                <Image
                    src="/images/background/background_2.png"
                    alt="background"
                    width={512}
                    height={512}
                    className="w-1/2 md:w-[55%] opacity-30 pr-4 sm:pr-10 hidden md:block object-contain"
                />
            </div>

            <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center z-10"
            >
                <div className="relative w-full">
                    <Image
                        src="/images/nv/nv_1.png"
                        alt="nhan vien"
                        width={780}
                        height={900}
                        className="object-cover transform origin-bottom -rotate-3 w-full h-auto"
                        priority
                    />
                </div>

                <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-center text-white text-center h-full">
                        <h2 className="text-outline-3 font-bold text-3xl lg:text-5xl xl:text-7xl mb-2">2014</h2>
                        <p className="text-sm sm:text-md mb-4 text-pretty">
                            <span className="font-medium text-pretty">
                                Green Lab ra đời dưới sự dẫn dắt của
                            </span>
                            <br />
                            <span className="font-bold text-pretty">
                                Công ty Cổ phần Đầu tư và Công nghệ Y tế Hà Nội
                            </span>
                            <br />
                            <span className="font-medium text-pretty">
                                với một khát vọng giản dị nhưng mạnh mẽ:
                            </span>
                        </p>
                        <p className="font-bold text-sm sm:text-md text-pretty">
                            MANG ĐẾN DỊCH VỤ XÉT NGHIỆM Y HỌC CHẤT LƯỢNG,
                            <br />
                            ĐÁNG TIN CẬY CHO MỌI NGƯỜI DÂN VIỆT NAM
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
