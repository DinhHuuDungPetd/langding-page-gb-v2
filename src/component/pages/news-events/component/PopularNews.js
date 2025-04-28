"use client";
import Image from "next/image";
import { services } from "@/store/data2";
export default function PopularNews() {
    const news = services;
    const sortedNews = [...news].sort((a, b) => new Date(b.time) - new Date(a.time));
    const latestNews = sortedNews.slice(0, 4);
    return (
        <div className="w-[80%] bg-mint shadow-md">
            <h3 className="text-2xl text-primary font-bold items-center text-center pt-5">
                Tin tức nhiều người đọc
            </h3>
            <div className="py-4 px-4">
                {latestNews && latestNews.length > 0 ? (
                    latestNews.map((item, index) => (
                        <div
                            key={`table-news-${index}`}
                            className="mb-8 flex flex-col items-center text-center"
                        >
                            <Image
                                src={item.images}
                                alt={item.name}
                                width={1000}
                                height={1000}
                                className="w-[60%] max-w-[500px] object-cover rounded-lg"
                            />
                            <h3 className="text-xl text-primary font-bold font-fz-poppins mt-4">
                                {item.name}
                            </h3>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No news available</p>
                )}
            </div>
        </div>

    )
}