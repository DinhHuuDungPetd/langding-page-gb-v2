"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const images = [
    "/images/introduce/sl-1.webp",
    "/images/introduce/sl-2.webp",
    "/images/introduce/sl-3.webp",
];

const ImageSlider = () => {
    return (
        <div className="w-full max-w-xl mx-auto">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    bulletClass:
                        "swiper-pagination-bullet w-4 h-4 rounded-full bg-pantone-5ab147 transition-colors duration-300",
                    bulletActiveClass: "swiper-pagination-bullet-active bg-pantone-36803e",
                }}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full aspect-[20/13]">
                            <Image
                                src={image}
                                alt={`Slide ${index + 1}`}
                                fill
                                className="object-cover"
                                quality={75}
                                priority={index === 0}
                                placeholder="blur"
                                blurDataURL={"/images/introduce/sl-1.webp"}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </div>
    );
};

export default ImageSlider;
