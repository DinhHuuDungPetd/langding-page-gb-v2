"use client";
import Image from "next/image";
import { services } from "@/store/data2";

export default function RelatedPosts() {
    const news = services;
    const sortedNews = [...news].sort((a, b) => new Date(b.time) - new Date(a.time));
    const latestNews = sortedNews.slice(0, 4);

    return (
        <div className="w-full">
            <div className="mx-auto py-4 px-2 flex flex-wrap justify-between gap-y-6">
                {latestNews && latestNews.length > 0 ? (
                    latestNews.map((item, index) => (
                        <div
                            key={`table-news-${index}`}
                            className="w-[22%] text-center"
                        >
                            <Image
                                src={item.images}
                                alt={item.name}
                                width={1000}
                                height={1000}
                                className="w-full h-[70%] object-cover rounded-lg"
                            />
                            <h3 className="text-lg text-primary font-bold font-fz-poppins mt-4">
                                {item.name}
                            </h3>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 w-full">No news available</p>
                )}
            </div>
        </div>
    );
}
