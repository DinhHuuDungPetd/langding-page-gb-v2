"use client";
import Image from "next/image"
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
        <div className="relative w-full h-[700px] md:h-[700px] xl:h-[530px] my-2">
            <div
                className="absolute left-0 w-full h-[650px] md:h-[700px] xl:h-[500px] bg-gradient-to-b from-primary  to-midnight transform origin-bottom skew-x-[-3deg] -rotate-3 z-0 xl:top-10 md:top-27 top-18 flex justify-end items-center"
            >
                <Image
                    src="/images/background/background_2.png"
                    alt="background"
                    width={512}
                    height={512}
                    className="object-cover w-[55%] opacity-32 h-auto hidden xl:block  pr-10"
                />
            </div>
            <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                className="relative grid grid-cols-1 xl:grid-cols-2 h-full z-8 xl:mx-10 pl-30"
            >
                <div className="relative">
                    <Image
                        src="/images/nv/nv_1.png"
                        alt="nhan vien"
                        width={780}
                        height={900}
                        className="object-cover transform origin-bottom xl:-rotate-3"
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex flex-col items-center lg:justify-center text-white px-4 text-center pointer-events-none">
                        <h2 className="xl:text-8xl text-outline-3 font-bold">2014</h2>
                        <p className="text-base">
                            <span className="font-fz-poppins medium xl:text-md">Green Lab ra đời dưới sự dẫn dắt của</span > <br />
                            <span className=" xl:text-md font-bold">Công ty Cổ phần Đầu tư và Công nghệ Y tế Hà Nội</span><br />
                            <span className="medium xl:text-md">với một khát vọng giản dị nhưng mạnh mẽ:</span>
                        </p>
                        <br />
                        <p className="xl:text-xl font-bold">
                            MANG ĐẾN DỊCH VỤ XÉT NGHIỆM Y HỌC CHẤT LƯỢNG,<br />
                            ĐÁNG TIN CẬY CHO MỌI NGƯỜI DÂN VIỆT NAM
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}