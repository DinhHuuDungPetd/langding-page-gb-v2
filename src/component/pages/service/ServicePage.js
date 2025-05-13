"use client";

import Image from "next/image";
import MedicalSlider from "@/component/pages/service/component/MedicalSlider";
import Banner from "@/component/pages/service/component/Banner";
import CertificateComponent from "@/component/pages/home/Certificate";
import PartnerComponent from "@/component/pages/home/Partner";
import OrderComponent from "@/component/pages/home/Order";
import MediaContent from "@/component/pages/introduction/component/MediaContent"
import Head from 'next/head';
import { motion } from "framer-motion";

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
                    className="absolute bottom-4 left-5 md:left-10 lg:left-20  text-white text-md italic z-9"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Trang chủ &gt; <span className="font-normal">Dịch vụ xét nghiệm</span>
                </motion.div>
            </motion.div>
            <div className="relative w-full min-h-screen bg-mint overflow-hidden">
                <Banner />
            </div>
            <motion.div
                className="pointer-events-none flex lg:hidden justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="pointer-events-auto max-w-[95vw]">
                    <MedicalSlider />
                </div>
            </motion.div>
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