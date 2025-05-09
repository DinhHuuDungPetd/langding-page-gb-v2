"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewCard from "@/component/pages/news-events/component/NewCard";
import BookingForm from "@/component/pages/news-events/component/BookingForm";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
import { useSearchParams } from 'next/navigation';
export default function NewsEvents() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [categorys, setCategorys] = useState([]);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    useEffect(() => {
        axios.get(`${baseUrl}/categorys`)
            .then(response => {
                setCategorys(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825601/greenlab/kwicnww6fxa63f9fplra.webp)]  bg-blend-multiply">
                <div className="absolute bottom-4 left-20 text-white text-xl medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Tin tức - Sự kiện</span>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3">
                        <NewCard categorys={categorys} />
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