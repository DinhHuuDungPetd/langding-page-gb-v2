"use client";
import { useEffect, useState } from "react";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
import BlogCategory from "@/component/pages/news-events/component/BlogCategory";
import OrderComponent from "@/component/pages/home/Order";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function CategoryPage({ params }) {
    const PAGE_SIZE = 7;
    const { categorySlug } = params;
    const id = categorySlug;

    const [featuredNews, setFeaturedNews] = useState(null);
    const [sideNews, setSideNews] = useState([]);
    const [category, setCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };

    useEffect(() => {
        getCategoryAll();
    }, [id]);

    useEffect(() => {
        if (id) {
            featuredBlog();
            fetchBlog();
        }
    }, [id, currentPage]);

    useEffect(() => {
        if (totalCount) {
            const pages = Math.ceil(totalCount / PAGE_SIZE);
            setTotalPages(pages);
        }
    }, [totalCount]);

    const getCategoryAll = async () => {
        try {
            const response = await dataTestAPI.get("api/v1/Category?CategoryId=1&CategoryStatus=1&PageNumber=1&PageSize=1");
            if (response.status === 200) {
                setCategory(response.data.data.items[0]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const featuredBlog = async () => {
        try {
            const response = await dataTestAPI.get(
                `api/v1/Blog?CategoryId=${id}&BlogStatus=1&PageNumber=1&PageSize=1`
            );
            if (response.status === 200) {
                setFeaturedNews(response.data.data.items[0]);
            }
        } catch (err) {
            console.error("Error fetching featured blog:", err);
        }
    };

    const fetchBlog = async () => {
        try {
            const response = await dataTestAPI.get(
                `api/v1/Blog?CategoryId=${id}&BlogStatus=1&PageNumber=${currentPage}&PageSize=${PAGE_SIZE}`
            );
            if (response.status === 200) {
                setSideNews(response.data.data.items);
                setTotalCount(response.data.data.totalCount);
            }
        } catch (err) {
            console.error("Error fetching blog list:", err);
        }
    };

    const handleClickPage = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const getPaginationItems = () => {
        let startPage, endPage;
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    if (!featuredNews || !category) {
        return <div className="text-center py-10">Đang tải dữ liệu...</div>;
    }

    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017912/backgroundMobile/skwnwgkb13t5kaqlfl3z.jpg)] md:bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825601/greenlab/kwicnww6fxa63f9fplra.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20 text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span>Tin tức - Sự kiện</span> &gt;{" "}
                    <span>{category.categoryName}</span>
                </div>
            </div>

            <div className="container mx-auto px-2">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column */}
                    <div className="w-full lg:w-[65%] bg-mint px-2 lg:px-10 mb-3">
                        <Link href={`/tin-tuc-su-kien/news/${featuredNews.blogId}`} className="flex flex-col lg:flex-row gap-6 items-start w-full max-w-5xl mx-auto py-6">
                            <div className="w-[70%] lg:w-[50%] rounded-md overflow-hidden">
                                <Image
                                    src={featuredNews.imageTitle?.url || "/https://placehold.co/600x400"}
                                    alt={featuredNews.imageTitle?.title || "hot news"}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col gap-3 lg:w-[50%]">
                                <p className="uppercase text-sm text-gray-500 font-semibold">
                                    Tin tức hot nhất
                                </p>

                                <h2 className="text-lg sm:text-xl font-bold text-primary hover:text-midnight leading-snug transition-colors">
                                    {featuredNews.blogTitle}
                                </h2>

                                <p className="text-gray-700 text-sm line-clamp-3">
                                    {featuredNews.blogDescription}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                                    <FaCalendarAlt className="mt-[2px]" />
                                    <span>{formatDate(featuredNews.blogCreatedAt)}</span>
                                </div>
                            </div>
                        </Link>

                        <BlogCategory category={category} sideNews={sideNews} />

                        {/* Pagination */}
                        <div className="flex flex-col items-center justify-center py-8 px-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className={`w-10 h-10 border-1 border-primary rounded-full flex items-center justify-center ${currentPage === 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-central hover:text-white"
                                        }`}
                                >
                                    <MdFirstPage />
                                </button>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`w-10 h-10 border-1 border-primary rounded-full flex items-center justify-center ${currentPage === 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-central hover:text-white"
                                        }`}
                                >
                                    <GrFormPrevious />
                                </button>

                                {getPaginationItems().map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handleClickPage(page)}
                                        className={`w-10 h-10 border-1 rounded-full flex items-center justify-center transition ${page === currentPage
                                            ? "bg-midnight text-white border-primary"
                                            : "border-primary hover:bg-central hover:text-white"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`w-10 h-10 border-1 border-primary rounded-full flex items-center justify-center ${currentPage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-central hover:text-white"
                                        }`}
                                >
                                    <GrFormNext />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className={`w-10 h-10 border-1 border-primary rounded-full flex items-center justify-center ${currentPage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-central hover:text-white"
                                        }`}
                                >
                                    <MdLastPage />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[35%] my-5">
                        {[category?.sideBanner, category?.promoBanner].map(
                            (banner, index) =>
                                banner && (
                                    <div
                                        key={index}
                                        className="lg:w-[90%] md:w-[60%] w-[80%] mx-auto mb-5 overflow-hidden"
                                    >
                                        <Image
                                            src={banner?.url || "https://placehold.co/600x400"}
                                            alt={banner?.title || "banner"}
                                            title={banner?.title || ""}
                                            width={600}
                                            height={400}
                                            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                        />
                                    </div>
                                )
                        )}
                        <div className="rounded p-4 mb-5">
                            <PopularNews />
                        </div>
                    </div>
                </div>
            </div>

            <OrderComponent />
        </div>
    );
}
