"use client";
import dynamic from "next/dynamic";
import { Suspense, memo } from "react";
import { useInView } from "react-intersection-observer";
import ImageSlider from "@/component/pages/home/ImageSlider";
import SectionSkeleton from "./component/SectionSkeleton";
import ResourcePreloader from "@/components/ResourcePreloader";
import FontLoader from "@/components/FontLoader";
import LazyLibraryLoader from "@/components/LazyLibraryLoader";
// Dynamic imports với skeleton fallback và preload
const ServiceComponent = dynamic(() => import("@/component/pages/home/Service"), {
  loading: () => <SectionSkeleton />,
  ssr: true
});
const ExpertComponent = dynamic(() => import("@/component/pages/home/Expert"), {
  loading: () => <SectionSkeleton />,
  ssr: true
});
const CertificateComponent = dynamic(() => import("@/component/pages/home/Certificate"), {
  loading: () => <SectionSkeleton />,
  ssr: true
});
const InfoComponent = dynamic(() => import("@/component/pages/home/Info"), {
  loading: () => <SectionSkeleton />,
  ssr: true
});
const TechnologyComponent = dynamic(() => import("@/component/pages/home/Technology"), {
  loading: () => <SectionSkeleton />,
  ssr: true
});

// Các section cuối chỉ load khi scroll tới với preload
const LazyMedia = dynamic(() => import("@/component/pages/home/Media"), {
  loading: () => <SectionSkeleton />,
  ssr: false
});
const LazyNews = dynamic(() => import("@/component/pages/home/News"), {
  loading: () => <SectionSkeleton />,
  ssr: false
});
const LazyPartner = dynamic(() => import("@/component/pages/home/Partner"), {
  loading: () => <SectionSkeleton />,
  ssr: false
});
const LazyOrder = dynamic(() => import("@/component/pages/home/Order"), {
  loading: () => <SectionSkeleton />,
  ssr: false
});

// Component helper để lazy load khi vào viewport
const LazyLoadOnView = memo(({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px" // load trước khi scroll tới 100px
  });

  return <div ref={ref}>{inView ? children : <SectionSkeleton />}</div>;
});

LazyLoadOnView.displayName = 'LazyLoadOnView';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <ResourcePreloader />
      <FontLoader />
      <LazyLibraryLoader />
      <ImageSlider />

      {/* Các section load ngay */}
      <Suspense fallback={<SectionSkeleton />}>
        <ServiceComponent />
        <ExpertComponent />
        <CertificateComponent />
        <InfoComponent />
        <TechnologyComponent />
      </Suspense>

      {/* Các section chỉ load khi scroll gần tới */}
      <LazyLoadOnView>
        <LazyMedia />
      </LazyLoadOnView>
      <LazyLoadOnView>
        <LazyNews />
      </LazyLoadOnView>
      <LazyLoadOnView>
        <LazyPartner />
      </LazyLoadOnView>
      <LazyLoadOnView>
        <LazyOrder />
      </LazyLoadOnView>
    </main>
  );
}
