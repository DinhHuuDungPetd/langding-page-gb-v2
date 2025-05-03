"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from "@/component/pages/blog/component/Blog2";
import RelatedPosts from "@/component/pages/blog/component/RelatedPosts";
import BookingForm from "@/component/pages/news-events/component/BookingForm";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
export default function BlogPage({ params }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { slug } = params;
    const id = parseInt(slug, 10);

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (!isNaN(id)) {
            axios.get(`${baseUrl}/blogs/${id}`)
                .then(response => {
                    console.log(response.data);
                    setBlog(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            setError('ID không hợp lệ');
        }
    }, [id]);

    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(/images/background/background_6.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-20 text-white text-xl medium-italic z-9">
                    Trang chủ &gt; <span className=" text-xl medium-italic ">Tin tức - Sự kiện</span> &gt;{" "}
                    {blog ? <span className=" text-xl medium-italic ">{blog?.title}</span> : 'Loading...'}
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3 ">
                        {blog ? <Blog blog={blog} /> : 'Loading...'}
                        <div className=" mx-auto px-4 py-2 container">
                            <h3 className="font-bold text-2xl text-primary uppercase">Các bài viết liên quan</h3>
                            <RelatedPosts />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="rounded p-4 mb-5">
                            <PopularNews />
                        </div>
                        <BookingForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
