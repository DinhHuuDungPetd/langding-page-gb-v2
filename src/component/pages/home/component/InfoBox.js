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

const InfoCard = ({ icon, number, title, description, index }) => (
    <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        className="w-[160px] h-[160px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[230px] lg:h-[230px]
                   text-center bg-gradient-to-t from-midnight to-green-700
                   border-[4px] border-central rounded-lg m-2 px-2 py-6 md:py-8"
    >
        <div className="flex items-center justify-center mb-1">
            {icon}
        </div>
        <h2 className="text-white text-base sm:text-lg md:text-2xl lg:text-4xl font-bold whitespace-nowrap uppercase">
            {number}
        </h2>
        {title && (
            <h2 className="text-white text-xs sm:text-sm md:text-base lg:text-xl font-bold whitespace-nowrap uppercase">
                {title}
            </h2>
        )}
        <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold">
            {description}
        </span>
    </motion.div>
);


export default function InfoBox() {
    return (
        <div className="hop-tac flex items-center justify-center gap-0 px-5">
            {/* Cột trái */}
            <div className="flex items-end justify-end flex-col">
                {cardData
                    .filter(card => card.align === "end")
                    .map((card) => (
                        <InfoCard key={card.id} {...card} index={card.id} />
                    ))}
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
                {cardData
                    .filter(card => card.align === "start")
                    .map((card) => (
                        <InfoCard key={card.id} {...card} index={card.id} />
                    ))}
            </div>
        </div>
    );
}
