'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import Home_7 from "@/icons/Home_7"
import Home_8 from "@/icons/Home_8"
import Home_9 from "@/icons/Home_9"
import Home_10 from "@/icons/Home_10"

const cardData = [
    {
        id: 0,
        icon: <Home_7 />,
        number: "1.000.000+",
        title: "",
        description: "Xét nghiệm chuyên sâu",
        align: "end",
    },
    {
        id: 1,
        icon: <Home_9 />,
        number: "50+",
        title: "Bệnh viện",
        description: "Liên kết hợp tác",
        align: "end",
    },
    {
        id: 2,
        icon: <Home_8 />,
        number: "500+",
        title: "Bệnh viện",
        description: "Tin tưởng sử dụng dịch vụ",
        align: "start",
    },
    {
        id: 3,
        icon: <Home_10 />,
        number: "4000+",
        title: "Bác sĩ & CTV",
        description: "Liên kết hợp tác",
        align: "start",
    },
];

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

export default function InfoBox() {
    return (
        <div className="hop-tac flex  items-center justify-center gap-0 px-5">
            {/* Cột 1: 2 hàng */}
            <div className="flex items-end justify-end flex-col">
                <motion.div
                    custom={0} // Index cho staggered animation
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger khi 30% card vào viewport
                    variants={cardVariants}
                    className="w-[150px] h-[150px] md:w-[230px] md:h-[230px] text-center bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-lg m-2 px-0 md:px-2 md:py-5  "
                >
                    <div className="">
                        <Home_7 />
                    </div>
                    <h2 className="text-white text-lg md:text-2xl font-bold whitespace-nowrap uppercase">
                        1.000.000+
                    </h2>
                    <span className="text-white text-sm font-bold">
                        Xét nghiệm chuyên sâu
                    </span>
                </motion.div>
                <motion.div
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    className="w-[150px] h-[150px] md:w-[230px] md:h-[230px] text-center bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-lg m-2 px-0 md:px-2 md:py-5  "
                >
                    <div className="">
                        <Home_9 />
                    </div>
                    <h2 className="text-white text-lg md:text-2xl font-bold whitespace-nowrap uppercase">
                        50+
                    </h2>
                    <h2 className="text-white text-lg font-bold whitespace-nowrap uppercase">
                        Bệnh viện
                    </h2>
                    <span className="text-white text-sm font-bold whitespace-nowrap">
                        Liên kết hợp tác
                    </span>
                </motion.div>
            </div>

            {/* Cột giữa: Hình ảnh */}
            <div className="bg-white w-[500px] h-[500px] hidden md:block">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/background/Frame-logo-01.webp"
                        alt="Chứng chỉ ISO GREEN LAB"
                        fill
                        quality={100}
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>

            {/* Cột phải */}
            <div className="flex items-start justify-end flex-col">
                <motion.div
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    className="w-[150px] h-[150px] md:w-[230px] md:h-[230px] text-center bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-lg m-2 px-0 md:px-2 md:py-5  "
                >
                    <div className="">
                        <Home_8 />
                    </div>
                    <h2 className="text-white text-lg md:text-2xl font-bold whitespace-nowrap uppercase">
                        500+
                    </h2>
                    <h2 className="text-white text-lg  font-bold whitespace-nowrap uppercase">
                        Bệnh viện
                    </h2>
                    <span className="text-white text-sm font-bold">
                        Tin tưởng&nbsp;sử dụng
                    </span>
                </motion.div>
                <motion.div
                    custom={3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    className="w-[150px] h-[150px] md:w-[230px] md:h-[230px] text-center bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-lg m-2 px-0 md:px-2 md:py-5  "
                >
                    <div className="">
                        <Home_10 />
                    </div>
                    <h2 className="text-white text-lg md:text-2xl font-bold whitespace-nowrap uppercase">
                        4000+
                    </h2>
                    <h2 className="text-white text-lg font-bold whitespace-nowrap uppercase">
                        Bác sĩ & CTV
                    </h2>
                    <span className="text-white text-sm font-bold whitespace-nowrap">
                        Liên kết hợp tác
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
