"use client";
import { useEffect, useState } from 'react';
import Blog from "@/component/pages/news-events/component/Blog";
import BookingForm from "@/component/pages/news-events/component/BookingForm";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
import Image from "next/image";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";

export default function BlogPage({ params }) {
    const { slug } = params;
    const id = slug;

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await dataTestAPI.get(`api/v1/Blog/Oa?id=${id}`);

            if (response.status === 200 && response.data?.isSucceeded) {
                const BlogData = response.data?.data?.data;
                setBlog(BlogData);
            } else {
                console.error("Không có dữ liệu blog.");
            }
        } catch (err) {
            console.error("Error fetching blog:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchBlog();
        }
    }, [id]);

    return (
        <div>
            {/* Banner */}
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017912/backgroundMobile/skwnwgkb13t5kaqlfl3z.jpg)] md:bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1749698639/backgroundPC/uubndn2ctjzzbkfwf7ce.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20 text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span className=" text-md medium-italic ">Tin tức - Sự kiện</span> &gt;{" "}
                    {blog ? <span className=" text-md medium-italic ">{blog.blogTitle}</span> : 'Đang tải...'}
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3">
                        {loading ? (
                            <p className='mx-auto text-center'>Đang tải bài viết...</p>
                        ) : blog ? (
                            <Blog blog={blog} />
                        ) : (
                            <p className='mx-auto text-center'>Không tìm thấy bài viết.</p>
                        )}
                    </div>

                    <div className="w-full lg:w-[35%] my-5">
                        <div className='lg:w-[90%] md:w-[60%] w-[80%] mx-auto mb-5 overflow-hidden'>
                            <Image
                                src={'https://res.cloudinary.com/dgfwxibj4/image/upload/v1749523143/folderBlogs/efbnzizipqygwidnvozr.png'}
                                alt={"Hành trình 10 năm"}
                                title={"Hành trình 10 năm"}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                        </div>
                        <div className='lg:w-[90%] md:w-[60%] w-[80%] mx-auto mb-5 overflow-hidden'>
                            <Image
                                src={'https://res.cloudinary.com/dgfwxibj4/image/upload/v1747386458/slider/fsq9n6hkn6bhnnche0jd.png'}
                                alt={'Sàng lọc sơ sinh tại Green Lab'}
                                title={'Sàng lọc sơ sinh tại Green Lab'}
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
