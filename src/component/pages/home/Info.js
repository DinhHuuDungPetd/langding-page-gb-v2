
import InfoBox from "@/component/pages/home/component/InfoBox";
import AnimatedButton from "@/component/pages/home/component/AnimatedButton";
import Home_11 from "@/icons/Home_11"
import Home_12 from "@/icons/Home_12"
import Home_13 from "@/icons/Home_13"

export default function InfoComponent() {
    return (
        <section>
            <div className="container mx-auto py-8 flex items-center justify-center gap-2">
                <div className="hidden md:flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="w-16 h-[2px] bg-[#36803E]"></span>
                </div>
                <h1 className="text-primary text-xl md:text-2xl font-bold whitespace-nowrap uppercase">
                    Con số nổi bật, ấn tượng
                </h1>
                <div className="hidden md:flex items-center gap-1">
                    <span className="w-16 h-[2px] bg-[#36803E]"></span>
                    <span className="w-2 h-2 bg-[#36803E] rounded-full"></span>
                </div>
            </div>
            <InfoBox />
            <div className='page-color'>
                <div className="container mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center my-5 relative">
                    {/* Cột 1 */}
                    <div className="w-1/2 sm:w-[300px] flex flex-col justify-center items-center gap-2 p-4">
                        <Home_11 />
                        <h2 className="text-primary text-base md:text-lg font-bold whitespace-nowrap uppercase">
                            Nhận báo giá
                        </h2>
                        <AnimatedButton text="Nhận ngay" href="/dat-lich" />
                    </div>

                    {/* Cột 2 */}
                    <div className="w-1/2 sm:w-[300px] relative flex flex-col justify-center items-center gap-2 p-4">
                        <Home_12 />
                        <h2 className="text-primary text-base md:text-lg font-bold whitespace-nowrap uppercase">
                            Đặt lịch tư vấn
                        </h2>
                        <AnimatedButton text="Đặt ngay" href="/dat-lich" />
                        <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-2/3 bg-primary"></div>
                        <div className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-2/3 bg-primary"></div>
                    </div>

                    {/* Cột 3 */}
                    <div className="w-1/2 sm:w-[300px] flex flex-col justify-center items-center gap-2 p-4">
                        <Home_13 />
                        <h2 className="text-primary text-base md:text-lg font-bold whitespace-nowrap uppercase">
                            Nhận khuyến mãi
                        </h2>
                        <AnimatedButton text="Nhận ngay" href="/dat-lich" />
                    </div>
                </div>
            </div>


        </section>
    );
}