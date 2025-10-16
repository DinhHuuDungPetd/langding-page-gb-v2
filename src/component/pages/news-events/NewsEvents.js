"use client";
import { useEffect, useState } from "react";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import NewBlogs from "@/component/pages/news-events/component/NewBlogs";
import BookingForm from "@/component/pages/news-events/component/BookingForm";
import ZaloQRCard from "@/component/pages/news-events/component/ZaloQRCard";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
import { useSearchParams } from "next/navigation";
import { FaArrowCircleDown } from 'react-icons/fa';

export default function NewsEvents() {
    const PAGE_SIZE = 10;
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    useEffect(() => {
        setBlogs([]);
        setCurrentPage(1);
    }, [searchQuery]);

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, searchQuery]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const offset = (currentPage - 1) * PAGE_SIZE;

            let apiUrl = `api/v1/Blog/Oa?offset=${offset}&limit=${PAGE_SIZE}`;
            if (searchQuery) {
                apiUrl += `&search=${encodeURIComponent(searchQuery)}`;
            }

            const response = await dataTestAPI.get(apiUrl);

            if (response.status === 200 && response.data?.isSucceeded) {
                const medias = response.data?.data?.data?.medias || [];
                const total = response.data?.data?.data?.total || 0;

                // Nếu currentPage = 1 thì replace, nếu >1 thì nối thêm
                setBlogs((prev) =>
                    currentPage === 1 ? medias : [...prev, ...medias]
                );
                setTotalPages(Math.ceil(total / PAGE_SIZE));
                console.log("Tổng bài viết:", total, "=> tổng trang:", Math.ceil(total / PAGE_SIZE));
            } else {
                if (currentPage === 1) setBlogs([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            if (currentPage === 1) setBlogs([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            {/* Banner */}
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017912/backgroundMobile/skwnwgkb13t5kaqlfl3z.jpg)] md:bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1749698639/backgroundPC/uubndn2ctjzzbkfwf7ce.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20 text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Tin tức - Sự kiện</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3">
                        <NewBlogs blogs={blogs} />
                        {currentPage < totalPages && (
                            <div className="flex justify-center mt-8">
                                <FaArrowCircleDown
                                    onClick={handleLoadMore}
                                    className={`text-4xl text-primary cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-green-700 ${loading ? "opacity-60 cursor-not-allowed" : ""
                                        }`}
                                />
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="rounded mb-5">
                            <ZaloQRCard />
                        </div>

                        <div className="rounded mb-5">
                            <PopularNews />
                        </div>
                        <BookingForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
