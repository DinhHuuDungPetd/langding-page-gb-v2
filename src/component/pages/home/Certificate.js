"use client";
import Image from "next/image";
import { memo } from 'react';
import { motion } from "framer-motion";

const CertificateComponent = memo(() => {
    const benefits = [
        "Kết quả xét nghiệm chính xác, tin cậy giúp bác sĩ chẩn đoán và đưa ra phương án điều trị hiệu quả",
        "Rút ngắn thời gian chờ đợi kết quả, tỷ lệ sai sót được giảm thiểu tối đa",
        "Kết quả xét nghiệm của Green Lab có thể được sử dụng liên thông tại các bệnh viện",
        "Từ đó giảm chi phí xét nghiệm khi tái khám cho khách hàng"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section 
            className="page-2 w-full" 
            aria-labelledby="certificate-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="container mx-auto py-1 flex flex-col lg:flex-row justify-between items-center">
                <motion.div 
                    className="w-full lg:w-2/3 text-white"
                    variants={itemVariants}
                >
                    <motion.h1 
                        id="certificate-heading" 
                        className="text-2xl font-bold text-white mb-6 uppercase text-outline-4"
                        variants={itemVariants}
                    >
                        TỰ HÀO ĐƯỢC CẤP CHỨNG NHẬN<br />
                        <motion.span 
                            className="text-white text-4xl"
                            variants={itemVariants}
                        >
                            ISO 15189:2012 VILAS MED 134
                        </motion.span>
                    </motion.h1>
                    <motion.p 
                        className="text-md mb-6 leading-relaxed"
                        variants={itemVariants}
                    >
                        Trong hành trình phát triển nỗ lực không ngừng, Trung tâm Xét nghiệm Green Lab đã dần gây dựng được vị thế tiền phong trong việc cung cấp dịch vụ xét nghiệm uy tín, nhanh chóng và hợp lý.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <motion.p 
                            className="text-md"
                            variants={itemVariants}
                        >
                            Tháng 12/2020, Green Lab được cấp chứng nhận <span className="font-semibold">ISO 15189:2012 VILAS MED 134</span> - tiêu chuẩn quốc tế về năng lực kỹ thuật và hệ thống quản lý của Green Lab.
                        </motion.p>
                    </motion.div>
                    <motion.ul 
                        className="space-y-4 text-md mt-6" 
                        role="list"
                        variants={containerVariants}
                    >
                        {benefits.map((item, index) => (
                            <motion.li 
                                key={index} 
                                className="text-white before:content-['•'] before:text-white before:mr-2 before:text-xl"
                                variants={itemVariants}
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="pt-4">{item}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                <motion.div 
                    className="w-full lg:w-1/3 flex items-center justify-center mt-10 lg:mt-0 p-4"
                    variants={imageVariants}
                >
                    <Image
                        src="/images/cnf.png"
                        alt="Chứng chỉ ISO 15189:2012 VILAS MED 134 của Green Lab"
                        placeholder="blur"
                        quality={85}
                        blurDataURL={"/images/introduce/sl-1.webp"}
                        width={350}
                        height={800}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 350px"
                        style={{
                            objectFit: "cover",
                        }}
                        className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                </motion.div>
            </div>
        </motion.section>
    );
});

CertificateComponent.displayName = 'CertificateComponent';

export default CertificateComponent;

