"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewCard from "@/component/pages/news-events/component/NewCard";
import BookingForm from "@/component/pages/news-events/component/BookingForm";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
import SearchBlog from "@/component/pages/news-events/component/SearchBlog";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import { useSearchParams } from 'next/navigation';
export default function NewsEvents() {
    const PAGE_SIZE = 7;
    const [categorys, setCategorys] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    useEffect(() => {
        getCategoryAll();
    }, []);

    useEffect(() => {
        fetchBlog();
    }, [currentPage, searchQuery]);

    const getCategoryAll = async () => {
        try {
            const response = await dataTestAPI.get("api/v1/Category?CategoryStatus=1&PageNumber=1&PageSize=10");
            if (response.status === 200) {
                setCategorys(response.data.data.items);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchBlog = async () => {
        try {
            const response = await dataTestAPI.get(
                `api/v1/Blog?BlogTitle=${searchQuery}&PageNumber=${currentPage}&PageSize=${PAGE_SIZE}`
            );
            if (response.status === 200) {
                const BlogData = response.data.data.items;
                setBlogs(BlogData);
                setTotalCount(response.data.data.totalCount);
            }
        } catch (err) {
            console.error("Error fetching blog:", err);
        }
    };
    useEffect(() => {
        if (totalCount) {
            const pages = Math.ceil(totalCount / PAGE_SIZE);
            setTotalPages(pages);
        }
    }, [totalCount]);

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

    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017912/backgroundMobile/skwnwgkb13t5kaqlfl3z.jpg)] md:bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1749698639/backgroundPC/uubndn2ctjzzbkfwf7ce.webp)]  bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20 text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Tin tức - Sự kiện</span>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3">
                        {searchQuery ?
                            <SearchBlog
                                categorys={categorys}
                                blogs={blogs}
                                handleClickPage={handleClickPage}
                                getPaginationItems={getPaginationItems}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                            :
                            <NewCard categorys={categorys} />}
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="rounded mb-5">
                            <PopularNews />
                        </div>
                        <BookingForm />
                    </div>
                </div>
            </div>
        </div>
    )
}