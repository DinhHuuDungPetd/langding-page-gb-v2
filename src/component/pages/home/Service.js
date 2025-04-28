"use client";
import { memo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const MedicalSlider = dynamic(() => import("@/component/pages/home/component/MedicalSlider"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});

const ServiceComponent = memo(() => {
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

    return (
        <motion.section 
            className="pt-8 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <motion.div 
                className="flex items-center justify-center gap-2 mb-8"
                variants={itemVariants}
            >
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="w-8 sm:w-16 h-[2px] bg-[#36803E]"></span>
                </div>
                <h2 className="text-primary text-xl sm:text-2xl font-bold whitespace-nowrap">
                    CÁC DỊCH VỤ XÉT NGHIỆM NỔI BẬT
                </h2>
                <div className="flex items-center gap-1">
                    <span className="w-8 sm:w-16 h-[2px] bg-[#36803E]"></span>
                    <span className="w-2 h-2 bg-[#36803E] rounded-full"></span>
                </div>
            </motion.div>
            <motion.div 
                variants={itemVariants}
                className="relative"
            >
                <MedicalSlider />
            </motion.div>
        </motion.section>
    );
});

ServiceComponent.displayName = 'ServiceComponent';

export default ServiceComponent;