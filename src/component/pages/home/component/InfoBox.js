'use client'

import {motion} from "framer-motion";
import Icon from "@/component/Icon";
import Image from "next/image";

export default function InfoBox() {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2, // Staggered delay cho từng card
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    return(
        <div className="hop-tac flex items-center justify-center gap-0">
            {/* Cột 1: 2 hàng */}
            <div className="flex items-end justify-end flex-col">
                <motion.div
                    custom={0} // Index cho staggered animation
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger khi 30% card vào viewport
                    variants={cardVariants}
                    className="w-[230px] h-[230px] text-center bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-lg m-2 px-2 py-8"
                >
                    <div className="flex items-center justify-center">
                        <Icon
                            src={"icon-trang-chu-07.png"}
                            alt={"Xét nghiệm greenlab"}
                            size={84}
                        />
                    </div>
                    <h2 className="text-white text-xl md:text-4xl font-bold whitespace-nowrap uppercase">
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
                    className="w-[230px] h-[230px] text-center bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-lg m-2 px-2 py-8"
                >
                    <div className="flex items-center justify-center">
                        <Icon
                            src={"icon-trang-chu-09.png"}
                            alt={"Xét nghiệm greenlab"}
                            size={84}
                        />
                    </div>
                    <h2 className="text-white text-xl md:text-4xl font-bold whitespace-nowrap uppercase">
                        50+
                    </h2>
                    <h2 className="text-white text-xl md:text-xl font-bold whitespace-nowrap uppercase">
                        Bệnh viện
                    </h2>
                    <span className="text-white text-sm font-bold">
              Liên kết hợp tác
            </span>
                </motion.div>
            </div>

            {/* Cột 2: Hình ảnh */}
            <div className="bg-white w-[500px] h-[500px]">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/background/Frame-logo-01.png"
                        alt="Chứng chỉ ISO GREEN LAB"
                        fill
                        quality={100}
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>

            {/* Cột 3: 2 hàng */}
            <div className="flex items-start justify-end flex-col">
                <motion.div
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    className="w-[230px] h-[230px] text-center bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-lg m-2 px-2 py-8"
                >
                    <div className="flex items-center justify-center">
                        <Icon
                            src={"icon-trang-chu-08.png"}
                            alt={"Xét nghiệm greenlab"}
                            size={84}
                        />
                    </div>
                    <h2 className="text-white text-xl md:text-4xl font-bold whitespace-nowrap uppercase">
                        500+
                    </h2>
                    <h2 className="text-white text-xl md:text-xl font-bold whitespace-nowrap uppercase">
                        Bệnh viện
                    </h2>
                    <span className="text-white text-sm font-bold">
              Tin tưởng sử dụng dịch vụ
            </span>
                </motion.div>
                <motion.div
                    custom={3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    className="w-[230px] h-[230px] text-center bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central rounded-lg m-2 px-2 py-8"
                >
                    <div className="flex items-center justify-center">
                        <Icon
                            src={"icon-trang-chu-10.png"}
                            alt={"Xét nghiệm greenlab"}
                            size={84}
                        />
                    </div>
                    <h2 className="text-white text-xl md:text-4xl font-bold whitespace-nowrap uppercase">
                        4000+
                    </h2>
                    <h2 className="text-white text-xl md:text-xl font-bold whitespace-nowrap uppercase">
                        Bác sĩ & CTV
                    </h2>
                    <span className="text-white text-sm font-bold">
              Liên kết hợp tác
            </span>
                </motion.div>
            </div>
        </div>
    )
}