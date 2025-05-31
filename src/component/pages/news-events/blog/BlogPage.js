"use client";
import { useEffect, useState } from 'react';
import Blog from "@/component/pages/news-events/component/Blog";
import RelatedPosts from "@/component/pages/news-events/component/RelatedPosts";
import BookingForm from "@/component/pages/news-events/component/BookingForm";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
import Image from "next/image";
import { blogAPI } from "@/hooks/authorizeAxiosInstance";

export default function BlogPage({ params }) {
    const PAGE_SIZE = 4;
    const { slug } = params;
    const id = parseInt(slug, 10);

    const [blog, setBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const fetchBlog = async () => {
        try {
            const response = await blogAPI.get(
                `api/v1/Blog?BlogId=${id}&BlogStatus=1&PageNumber=${currentPage}&PageSize=${PAGE_SIZE}`
            );
            if (response.status === 200) {
                const BlogData = response.data.data.items[0];
                setBlog(BlogData);
                setTotalCount(response.data.data.totalCount);
            }
        } catch (err) {
            console.error("Error fetching blog:", err);
        }
    };

    useEffect(() => {
        if (!isNaN(id)) {
            fetchBlog(1);

        }
    }, [id, currentPage]);

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
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017912/backgroundMobile/skwnwgkb13t5kaqlfl3z.jpg)] md:bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825601/greenlab/kwicnww6fxa63f9fplra.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20 text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span className=" text-md medium-italic ">Tin tức - Sự kiện</span> &gt;{" "}
                    {blog ? <span className=" text-md medium-italic ">{blog?.title}</span> : 'Loading...'}
                </div>
            </div>
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3 ">
                        {blog ? <Blog blog={blog} /> : 'Loading...'}
                        {blog ?
                            <RelatedPosts
                                blog={blog?.blogRelated}
                                handleClickPage={handleClickPage}
                                getPaginationItems={getPaginationItems}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                            : 'Loading...'
                        }


                    </div>

                    <div className="w-full lg:w-[35%] my-5">
                        <div className='lg:w-[90%] md:w-[60%] w-[80%] mx-auto mb-5 overflow-hidden'>
                            <Image
                                src={blog?.sideBanner?.url || "/default.jpg"}
                                alt={blog?.sideBanner?.title || "hot news"}
                                title={blog?.sideBanner?.title || ""}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                        </div>
                        <div className='lg:w-[90%] md:w-[60%] w-[80%] mx-auto mb-5 overflow-hidden'>
                            <Image
                                src={blog?.promoBanner?.url || "/default.jpg"}
                                alt={blog?.promoBanner?.title || "hot news"}
                                title={blog?.promoBanner?.title || ""}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                        </div>
                        <div className="rounded p-4 mb-5">
                            <PopularNews />
                        </div>
                        <div className="rounded p-4 mb-5">
                            <BookingForm />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
