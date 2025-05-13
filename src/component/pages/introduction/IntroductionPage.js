"use client";
import { memo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import Introduction_01 from "@/icons/Introduction_01"
import Introduction_02 from "@/icons/Introduction_02"
import Introduction_03 from "@/icons/Introduction_03"

// Lazy load các component không cần thiết ngay lập tức
const ImageSlider = dynamic(() => import("@/component/pages/introduction/component/ImageSlider"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const CertificateComponent = dynamic(() => import("@/component/pages/home/Certificate"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const PartnerComponent = dynamic(() => import("@/component/pages/home/Partner"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const OrderComponent = dynamic(() => import("@/component/pages/home/Order"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const Banner = dynamic(() => import("@/component/pages/introduction/component/Banner"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const BannerMobile = dynamic(() => import("@/component/pages/introduction/component/BannerMobile"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const MediaContent = dynamic(() => import("@/component/pages/introduction/component/MediaContent"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});

const IntroductionPage = memo(() => {
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

    const visionCards = [
        {
            icon: <Introduction_01 />,
            alt: "Tầm nhìn Green Lab - Trung tâm xét nghiệm hàng đầu",
            title: "TẦM NHÌN",
            content: "Trở thành Trung tâm Xét nghiệm Y học hàng đầu Miền Bắc về chất lượng và dịch vụ, tiên phong trong cập nhật và ứng dụng công nghệ mới. Mãi là người bạn đồng hành đáng tin cậy và bền vững của cộng đồng."
        },
        {
            icon: <Introduction_02 />,
            alt: "Sứ mệnh Green Lab - Dịch vụ xét nghiệm chất lượng cao",
            title: "SỨ MỆNH",
            content: "Cung cấp dịch vụ Xét nghiệm Y học chất lượng cao, đa khoa và chuyên sâu, kết hợp dịch vụ nhanh chóng với chi phí hợp lý. Luôn đồng hành phục vụ và chăm sóc sức khoẻ cộng đồng."
        },
        {
            icon: <Introduction_03 />,
            alt: "Giá trị cốt lõi Green Lab - Chất lượng và chuyên môn",
            title: "GIÁ TRỊ CỐT LÕI",
            content: "Chất lượng và Chuyên môn: Cam kết cung cấp dịch vụ y tế với chất lượng cao. Tận tụy: Trân trọng từng khách hàng, nhân viên và đối tác. Đổi mới: Không ngừng vươn xa với công nghệ và dịch vụ ưu việt."
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
                className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747016194/backgroundMobile/ykqtdkarozwrx623p0wn.jpg)] sm:bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825600/greenlab/aan50gixyarmomdlnyqb.webp)] bg-no-repeat bg-cover bg-blend-multiply"
                variants={itemVariants}
            >
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20  text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Giới thiệu</span>
                </div>
            </motion.div>

            <motion.h3
                className="text-xl sm:text-2xl text-primary text-center my-5 font-bold"
                variants={itemVariants}
            >
                "Đồng hành vì sức khỏe, mang chất lượng đến từng gia đình"
            </motion.h3>

            <div className='hidden md:block'>
                <Banner />
            </div>
            <div className='md:hidden'>
                <BannerMobile />
            </div>


            <motion.div
                className="flex flex-col xl:flex-row w-[90%] items-center mt-5 container mx-auto py-8 "
                variants={containerVariants}
            >
                <motion.div
                    className="w-[80%] xl:w-[50%] flex justify-center items-center"
                    variants={itemVariants}
                >
                    <ImageSlider />
                </motion.div>

                <motion.div
                    className="space-y-6 mt-8 lg:mt-12 xl:mt-0 xl:ml-8  sm:px-6 w-full mx-auto"
                    variants={containerVariants}
                >
                    <motion.article variants={itemVariants}>
                        <h2 className="text-lg sm:text-xl text-primary mb-2 font-bold">
                            Khởi nguồn từ tâm huyết và sứ mệnh
                        </h2>
                        <div className="space-y-4 text-sm sm:text-md leading-relaxed text-justify text-pretty">
                            <p className="font-medium">
                                Được cố vấn bởi những Giáo sư, Bác sĩ đầu ngành – những người không chỉ
                                giỏi chuyên môn mà còn trọn vẹn y đức – Green Lab khởi đầu hành trình
                                với cam kết đặt sức khỏe cộng đồng lên hàng đầu.
                            </p>
                            <p className="font-medium">
                                Dưới sự dẫn dắt của{" "}
                                <strong>Bà Vũ Thị Thu Hoài – Giám đốc Công ty</strong>, Green Lab không
                                chỉ là một trung tâm xét nghiệm, mà còn là nơi hội tụ tinh thần trách
                                nhiệm và tận tâm. Bà Hoài luôn tâm niệm: "Y đức phải là kim chỉ nam,
                                mọi hành động của chúng tôi đều hướng đến việc chăm sóc sức khỏe một
                                cách hiệu quả và thân thiện nhất." Từ đó, Green Lab không ngừng nỗ lực
                                để trở thành người bạn đồng hành đáng tin cậy của từng gia đình.
                            </p>
                        </div>
                    </motion.article>

                    <motion.article variants={itemVariants}>
                        <h2 className="text-lg sm:text-xl text-primary mb-2 font-bold text-pretty">
                            Hành trình vươn tầm chất lượng
                        </h2>
                        <p className="font-medium text-sm sm:text-md leading-relaxed text-justify text-pretty">
                            Từ những ngày đầu thành lập, Green Lab đã đặt mục tiêu cao: Không chỉ
                            cung cấp dịch vụ xét nghiệm, mà còn phải làm tốt hơn cả mong đợi. Với
                            đội ngũ chuyên gia hàng đầu – Giáo sư, Tiến sĩ, Thạc sĩ, Bác sĩ giàu
                            kinh nghiệm, Green Lab đã xây dựng một nền tảng vững chắc về chuyên môn và chất
                            lượng.
                        </p>
                    </motion.article>
                </motion.div>
            </motion.div>

            <motion.div
                className="grid grid-cols-1  lg:grid-cols-3 gap-5 px-4 sm:px-6 xl:px-40 py-4 container mx-auto"
                variants={containerVariants}
            >
                {visionCards.map((card, index) => (
                    <motion.article
                        key={index}
                        className="w-full h-full min-h-[320px] bg-gradient-to-t from-midnight to-green-700 border-[4px] border-central text-white rounded-xl p-4 shadow-lg flex flex-col items-center text-center"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-4 text-4xl">{card.icon}</div>
                        <h3 className="text-lg uppercase font-bold mb-3">{card.title}</h3>
                        <div className="font-medium text-sm sm:text-md text-pretty line-clamp-5">
                            {card.content}
                        </div>
                    </motion.article>
                ))}
            </motion.div>


            <motion.section
                className="bg-mint px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-xl lg:text-2xl font-bold text-primary text-center my-2 uppercase"
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
                <motion.div
                    className="w-full max-w-screen-lg px-4 mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 mb-10"
                    variants={itemVariants}
                >
                    <div className="relative  aspect-video "> {/* aspect-ratio 16:9 */}
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                            src="https://www.youtube.com/embed/KpZK2l0fZwU"
                            title="Nhân viên greenlab và nhiệt huyết"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </motion.div>

            </motion.section>

            <CertificateComponent />
            <PartnerComponent />
            <OrderComponent />
        </motion.main>
    );
});

IntroductionPage.displayName = 'IntroductionPage';

export default IntroductionPage;