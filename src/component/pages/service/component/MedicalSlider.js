"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import "swiper/css";
import "swiper/css/navigation";
import Service_01 from "@/icons/Service_01"
import Service_02 from "@/icons/Service_02"
import Service_03 from "@/icons/Service_03"
import Service_04 from "@/icons/Service_04"
import Service_05 from "@/icons/Service_05"
import Service_06 from "@/icons/Service_06"
import Service_07 from "@/icons/Service_07"
import Service_08 from "@/icons/Service_08"

const MedicalSwiper = () => {
    return (
        <div className="relative container md:mx-auto py-5">
            <Swiper
                modules={[Navigation]}
                spaceBetween={5}
                slidesPerView={1}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                breakpoints={{
                    350: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                    }
                }}
                className="w-full"
            >
                <SwiperSlide>
                    <div className="relative bg-white border-3 border-central rounded-2xl pt-5 md:pt-12 pb-5 text-center shadow-sm mx-2 my-8 md:m-10 w-[85%] md:w-[80%]">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-primary to-midnight border-4 border-central flex items-center justify-center shadow-md">
                                <Service_01 />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-fz-poppins font-bold text-md lg:text-xl uppercase text-primary  mb-2 text-pretty">XÉT NGHIỆM<br /> HÓA SINH</h3>
                            <p className="font-fz-poppins font-midium text-sm lg:text-md text-primary">Xem thêm <span>»</span></p>
                        </div>
                    </div>
                    <div className="relative bg-white border-3 border-central bg-gradient-to-b from-primary to-midnight rounded-2xl pt-5 md:pt-12 pb-5 text-center shadow-sm mx-2 my-8 md:m-10 w-[85%] md:w-[80%]">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-midnight flex items-center justify-center shadow-md">
                                <Service_02 />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-fz-poppins font-bold text-md lg:text-xl uppercase text-white  mb-2 text-pretty">XÉT NGHIỆM<br /> VI SINH</h3>
                            <p className="font-fz-poppins font-midium text-sm lg:text-md text-white">Xem thêm <span>»</span></p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative bg-white border-3 border-central bg-gradient-to-b from-primary to-midnight rounded-2xl pt-5 md:pt-12 pb-5 text-center shadow-sm mx-2 my-8 md:m-10 w-[85%] md:w-[80%]">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-midnight flex items-center justify-center shadow-md">
                                <Service_04 />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-fz-poppins font-bold text-md lg:text-xl uppercase text-white  mb-2 text-pretty">XÉT NGHIỆM <br /> HUYẾT HỌC</h3>
                            <p className="font-fz-poppins font-midium text-sm lg:text-md text-white">Xem thêm <span>»</span></p>
                        </div>
                    </div>
                    <div className="relative bg-white border-3 border-central rounded-2xl pt-5 md:pt-12 pb-5 text-center shadow-sm mx-2 my-8 md:m-10 w-[85%] md:w-[80%]">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-primary to-midnight border-4 border-central flex items-center justify-center shadow-md">
                                <Service_03 />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-fz-poppins font-bold text-md lg:text-xl uppercase text-primary  mb-2 text-pretty">XÉT NGHIỆM <br className="hidden md:block" /> SINH HỌC PHÂN TỬ</h3>
                            <p className="font-fz-poppins font-midium text-sm lg:text-md text-primary">Xem thêm <span>»</span></p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative bg-white border-3 border-central rounded-2xl pt-5 md:pt-12 pb-5 text-center shadow-sm mx-2 my-8 md:m-10 w-[85%] md:w-[80%]">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-primary to-midnight border-4 border-central flex items-center justify-center shadow-md">
                                <Service_07 />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-fz-poppins font-bold text-md lg:text-xl uppercase text-primary  mb-2 text-pretty">XÉT NGHIỆM<br /> MIỄN DỊCH</h3>
                            <p className="font-fz-poppins font-midium text-sm lg:text-md text-primary">Xem thêm <span>»</span></p>
                        </div>
                    </div>
                    <div className="relative bg-white border-3 border-central bg-gradient-to-b from-primary to-midnight rounded-2xl pt-5 md:pt-12 pb-5 text-center shadow-sm mx-2 my-8 md:m-10 w-[85%] md:w-[80%]">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-midnight flex items-center justify-center shadow-md">
                                <Service_06 />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-fz-poppins font-bold text-md lg:text-xl uppercase text-white  mb-2 text-pretty">XÉT NGHIỆM<br /> GIẢI PHẪU BỆNH</h3>
                            <p className="font-fz-poppins font-midium text-sm lg:text-md text-white">Xem thêm <span>»</span></p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative bg-white border-3 border-central bg-gradient-to-b from-primary to-midnight rounded-2xl pt-5 md:pt-12 pb-5 text-center shadow-sm mx-2 my-8 md:m-10 w-[85%] md:w-[80%]">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-midnight flex items-center justify-center shadow-md">
                                <Service_08 />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-fz-poppins font-bold text-md lg:text-xl uppercase text-white  mb-2 text-pretty">XÉT NGHIỆM<br /> TẠI NHÀ</h3>
                            <p className="font-fz-poppins font-midium text-sm lg:text-md text-white">Xem thêm <span>»</span></p>
                        </div>
                    </div>
                    <div className="relative bg-white border-3 border-central rounded-2xl pt-5 md:pt-12 pb-5 text-center shadow-sm mx-2 my-8 md:m-10 w-[85%] md:w-[80%] ">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-primary to-midnight border-4 border-central flex items-center justify-center shadow-md">
                                <Service_05 />
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="font-fz-poppins font-bold text-md lg:text-xl uppercase text-primary  mb-2 text-pretty">GÓI<br /> XÉT NGHIỆM</h3>
                            <p className="font-fz-poppins font-midium text-sm lg:text-md text-primary">Xem thêm <span>»</span></p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className="flex">
                <div className="swiper-button-prev-custom mx-2  left-0 top-1/2 -translate-y-1/2 z-10 bg-primary p-2 rounded-full shadow-md cursor-pointer hover:bg-central transition-colors">
                    <FiChevronLeft className="text-white text-sm" />
                </div>
                <div className="swiper-button-next-custom mx-2  right-0 top-1/2 -translate-y-1/2 z-10 bg-primary p-2 rounded-full shadow-md cursor-pointer hover:bg-central transition-colors">
                    <FiChevronRight className="text-white text-sm" />
                </div>
            </div>
        </div >
    );
};

export default MedicalSwiper;
