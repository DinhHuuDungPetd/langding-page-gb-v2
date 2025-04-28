"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ImageSlider from "@/component/pages/home/ImageSlider";

// Lazy load các component không cần thiết ngay lập tức
const ServiceComponent = dynamic(() => import("@/component/pages/home/Service"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const ExpertComponent = dynamic(() => import("@/component/pages/home/Expert"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const CertificateComponent = dynamic(() => import("@/component/pages/home/Certificate"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const InfoComponent = dynamic(() => import("@/component/pages/home/Info"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const TechnologyComponent = dynamic(() => import("@/component/pages/home/Technology"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const MediaComponent = dynamic(() => import("@/component/pages/home/Media"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const NewsComponent = dynamic(() => import("@/component/pages/home/News"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const PartnerComponent = dynamic(() => import("@/component/pages/home/Partner"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});
const OrderComponent = dynamic(() => import("@/component/pages/home/Order"), {
    loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
});

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <ImageSlider />
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <ServiceComponent />
            </Suspense>
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <ExpertComponent />
            </Suspense>
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <CertificateComponent />
            </Suspense>
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <InfoComponent />
            </Suspense>
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <TechnologyComponent />
            </Suspense>
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <MediaComponent />
            </Suspense>
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <NewsComponent />
            </Suspense>
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <PartnerComponent />
            </Suspense>
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <OrderComponent />
            </Suspense>
        </main>
    );
}