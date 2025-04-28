"use client"
import { motion } from 'framer-motion';
import styles from '@/component/style/circleStyle.module.css';
import Icon from '@/component/Icon';

export default function CircleComponent({ item, index }) {
    let sizeIcon = Math.round(250 / 3);

    return (
        <motion.div
            className="w-fit"
            initial={{ opacity: 0, scale: 0.1 }} // Trạng thái ban đầu: mờ và thu nhỏ
            animate={{ opacity: 1, scale: 1 }} // Trạng thái sau animation: hiện rõ và kích thước đầy đủ
            transition={{
                duration: 1,
                delay: index * 0.5,
                ease: 'linear',
            }}
        >
            <div className="bg-white flex flex-col items-center justify-center p-4 z-50">
                <div className={`${styles.circleContainer} h-[250px] w-[250px]`}>
                    <div className={styles.outerCircle}>
                        <div className={styles.dot}></div>
                        <div className={styles.innerRing1}>
                            <div className={`${styles.innerRing2} bg-gradient-to-t from-midnight to-green-600`}>
                                <div className={styles.innerRing3}>
                                    <div className="icon-calendar">
                                        {item.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.arrow}></div>
                    <div className={styles.length}>
                        <div className={styles.bottomLength}></div>
                    </div>
                </div>
            </div>
            <div className="pt-8 font-bold text-primary text-center text-lg leading-none uppercase">
                {item.title}
            </div>
            <div className="flex flex-col items-center justify-center">
                <p
                    className="text-center pt-2 whitespace-pre-line text-sm text-gray-700"
                    style={{ lineHeight: '28px', width: "250px" }}
                >
                    {item.content}
                </p>
            </div>
        </motion.div>
    );
}