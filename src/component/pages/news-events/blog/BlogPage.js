"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from "@/component/pages/news-events/component/Blog";
import RelatedPosts from "@/component/pages/news-events/component/RelatedPosts";
import BookingForm from "@/component/pages/news-events/component/BookingForm";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
import Image from "next/image";
export default function BlogPage({ params }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { slug } = params;
    const id = parseInt(slug, 10);

    const [blog, setBlog] = useState(null);
    const [blogsRelated, setBlogsRelated] = useState(null);
    useEffect(() => {
        if (!isNaN(id)) {
            axios.get(`${baseUrl}/blogs/${id}`)
                .then(response => {
                    setBlog(response.data);
                    const updatedViews = response.data.views + 1;
                    axios.put(`${baseUrl}/blogs/${id}`, {
                        ...response.data,
                        views: updatedViews
                    })
                        .catch(error => {
                            console.error('Error updating views:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            axios.get(`${baseUrl}/blogs_related?id_blog=${id}`)
                .then(response => {
                    setBlogsRelated(response.data[0]?.related_blog_id || []);
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
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017912/backgroundMobile/skwnwgkb13t5kaqlfl3z.jpg)] md:bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825601/greenlab/kwicnww6fxa63f9fplra.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20 text-white text-xl medium-italic z-9">
                    Trang chủ &gt; <span className=" text-xl medium-italic ">Tin tức - Sự kiện</span> &gt;{" "}
                    {blog ? <span className=" text-xl medium-italic ">{blog?.title}</span> : 'Loading...'}
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3 ">
                        {blog ? <Blog blog={blog} /> : 'Loading...'}
                        <div className=" mx-auto px-4 py-2 container">
                            {Array.isArray(blogsRelated) && blogsRelated.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-2xl text-primary uppercase">Các bài viết liên quan</h3>
                                    <RelatedPosts blogsRelated={blogsRelated} />
                                </div>
                            )}
                        </div>
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
                    </div>
                </div>
            </div>

        </div>
    );
}
