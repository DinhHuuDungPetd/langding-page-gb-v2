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
        <div className="relative w-full my-2">
            <div className="absolute top-25 w-full h-[75%] bg-gradient-to-b from-primary to-midnight transform origin-bottom skew-x-[-3deg] -rotate-3 z-0" />

            <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                className="relative z-10 grid grid-cols-1 p-5"
            >
                <div className="relative w-full aspect-[3/2]">
                    <Image
                        src="/images/nv/nv_1.png"
                        alt="nhan vien"
                        fill
                        className="object-contain "
                        priority
                    />
                </div>

                <div className="relative flex text-white text-center py-5">
                    <div className="pointer-events-none">
                        <h2 className="text-5xl font-bold text-outline-3">2014</h2>
                        <p className="text-base mt-4">
                            <span className="font-poppins font-medium text-sm">Green Lab ra đời dưới sự dẫn dắt của</span><br />
                            <span className="font-bold text-sm">Công ty Cổ phần Đầu tư và Công nghệ Y tế Hà Nội</span><br />
                            <span className="font-medium text-sm">với một khát vọng giản dị nhưng mạnh mẽ:</span>
                        </p>
                        <p className="text-md font-bold mt-2">
                            MANG ĐẾN DỊCH VỤ XÉT NGHIỆM Y HỌC CHẤT LƯỢNG,
                            ĐÁNG TIN CẬY CHO MỌI NGƯỜI DÂN VIỆT NAM
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}