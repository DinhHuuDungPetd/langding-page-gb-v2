"use client"
import { motion } from 'framer-motion';
import styles from '@/component/style/circleStyle.module.css';

export default function CircleComponent({ item, index }) {
    let sizeIcon = Math.round(250 / 3);

    return (
        <motion.div
            className="flex flex-row md:flex-col items-center md:items-center py-2 w-full md:w-fit gap-x-5"
            initial={{ opacity: 0, scale: 0.1 }} // Trạng thái ban đầu: mờ và thu nhỏ
            animate={{ opacity: 1, scale: 1 }} // Trạng thái sau animation: hiện rõ và kích thước đầy đủ
            transition={{
                duration: 1,
                delay: index * 0.5,
                ease: 'linear',
            }}
        >
            <div className="bg-white flex flex-row md:flex-col items-center justify-center gap-4  z-50 text-left md:text-center">
                <div className={`${styles.circleContainer} xl:h-[250px] lg:h-[220px] md:h-[150px] h-[150px]  xl:w-[250px] lg:w-[220px] md:w-[150px] w-[150px]`}>
                    <div className='block md:hidden'>
                        <div className={styles.topLength}>
                        </div>
                    </div>
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
            {/*Text*/}
            <div className="flex flex-col items-center justify-center text-center w-full">
                <h3 className="font-bold text-primary text-md sm:text-lg leading-none uppercase md:pt-8">
                    {item.title}
                </h3>
                <div className="flex flex-col items-center justify-center">
                    <p className="pt-2 whitespace-pre-line text-sm sm:text-md text-gray-700 w-full md:w-[150px] xl:w-[250px] lg:w-[220px] text-center" style={{ lineHeight: '28px' }}>
                        {item.content}
                    </p>
                </div>
            </div>


        </motion.div>
    );
}