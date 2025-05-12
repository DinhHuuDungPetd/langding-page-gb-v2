"use client";
import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";

const ContactPage = memo(() => {
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

    const contactInfo = [
        {
            icon: <FaMapMarkedAlt className="text-primary" />,
            text: "121 Bùi Thị Xuân, Q. Hai Bà Trưng, TP. Hà Nội"
        },
        {
            icon: <MdOutlineEmail className="text-primary" />,
            text: "xetnghiemgreenlab@gmail.com"
        },
        {
            icon: <FaPhone className="text-primary" />,
            text: "0912 615 997",
            additionalIcon: <FaPhoneVolume className="text-primary" />,
            additionalText: "1900 636 588"
        }
    ];

    return (
        <motion.main
            className="min-h-screen"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747018636/backgroundMobile/bw4hk7or82wnbqlpxbsj.jpg)] md:bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825601/greenlab/modzoiaox5xwvavuyyai.webp)] bg-blend-multiply"
                variants={itemVariants}
            >
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20 text-white text-xl medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Liên hệ</span>
                </div>
            </motion.div>

            <motion.section
                className="bg-mint px-4 md:px-16 py-10"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-center text-green-700 text-2xl font-bold uppercase mb-8"
                    variants={itemVariants}
                >
                    Bản đồ chỉ dẫn đường đi
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    variants={containerVariants}
                >
                    <motion.div
                        className="w-full md:h-full rounded-xl overflow-hidden shadow-md"
                        variants={itemVariants}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4566984195967!2d105.84743137596261!3d21.014404780631477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8b0c400001%3A0xf4271e655b7acc51!2zMTIxIFAuIELDuWkgVGjhu4sgWHXDom4sIELDuWkgVGjhu4sgWHXDom4sIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1744960140723!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                            title="Bản đồ Green Lab - 121 Bùi Thị Xuân, Q. Hai Bà Trưng, TP. Hà Nội"
                        />
                    </motion.div>

                    <motion.div
                        className="flex flex-col items-start gap-4"
                        variants={itemVariants}
                    >
                        <Image
                            src="/images/nv/nv_2.webp"
                            alt="Trung tâm xét nghiệm Green Lab - Lấy mẫu tại trung tâm"
                            width={1000}
                            height={1000}
                            className="w-full h-auto rounded-xl shadow-md"
                            loading="lazy"
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        <motion.article
                            className="mt-4"
                            variants={itemVariants}
                        >
                            <h3 className="text-primary text-xl font-bold uppercase mb-4">
                                Trung tâm xét nghiệm GREEN LAB
                            </h3>
                            <div className="space-y-3">
                                {contactInfo.map((info, index) => (
                                    <p key={index} className="text-md font-medium flex items-center gap-2">
                                        {info.icon} {info.text}
                                        {info.additionalIcon && (
                                            <>
                                                &nbsp;|&nbsp; {info.additionalIcon} {info.additionalText}
                                            </>
                                        )}
                                    </p>
                                ))}
                            </div>
                        </motion.article>
                    </motion.div>
                </motion.div>
            </motion.section>
        </motion.main>
    );
});

ContactPage.displayName = 'ContactPage';

export default ContactPage;
