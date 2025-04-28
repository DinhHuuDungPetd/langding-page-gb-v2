"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { services } from "@/store/data";
import { useState } from "react";
import ServiceContent from "@/component/pages/home/component/ServiceContent";
import Icon from "@/component/Icon";
const MedicalSlider = () => {
    const slides = services;
    const [content, setContent] = useState(slides[0]);
    const [activeSlideId, setActiveSlideId] = useState(slides[0].id); // Thêm state để theo dõi slide active

    const handleClick = (slide) => {
        setContent(slide);
        setActiveSlideId(slide.id);
    };

    return (
        <>
            <div className="container mx-auto py-8 px-4 relative">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={true}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 25
                        }
                    }}
                    className="w-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div
                                onClick={() => handleClick(slide)}
                                className={`cursor-pointer h-40 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border-1 border-primary ${activeSlideId === slide.id
                                        ? ' bg-central text-white' // Style khi active
                                        : ' bg-white' // Style mặc định
                                    }`}
                            >
                                <h3 className={`text-lg font-medium text-center px-4 ${activeSlideId === slide.id
                                        ? 'text-white' // Text color khi active
                                        : 'text-black' // Text color mặc định
                                }`}>
                                    <div className="flex items-center justify-center">
                                        <Icon src={slide.icon} alt={slide.name} size={83}/>
                                    </div>
                                    {slide.name}
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary p-2 rounded-full shadow-md cursor-pointer hover:bg-central transition-colors">
                    <FiChevronLeft className="text-white text-sm" />
                </div>
                <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary p-2 rounded-full shadow-md cursor-pointer hover:bg-central transition-colors">
                    <FiChevronRight className="text-white text-sm" />
                </div>
            </div>
            <ServiceContent content={content} />
        </>
    );
};

export default MedicalSlider;