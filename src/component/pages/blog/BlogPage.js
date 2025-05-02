import Blog from "@/component/pages/blog/component/Blog";
import RelatedPosts from "@/component/pages/blog/component/RelatedPosts";
import BookingForm from "@/component/pages/news-events/component/BookingForm";
import PopularNews from "@/component/pages/news-events/component/PopularNews";
export default function BlogPage() {
    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(/images/background/background_6.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-20 text-white text-xl medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Tin tức - Sự kiện</span> &gt; <span className="font-normal">Quy Trình Xét Nghiệm Tại Nhà GREEN LAB - Đơn giản & Nhanh Chóng</span>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3 ">
                        <Blog />
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
    )
}