import Icon from "@/component/Icon";
import InfoBox from "@/component/pages/home/component/InfoBox";
import AnimatedButton from "@/component/pages/home/component/AnimatedButton";

export default function InfoComponent() {
    return (
        <section>
            <div className="container mx-auto py-8 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="w-16 h-[2px] bg-[#36803E]"></span>
                </div>
                <h2 className="text-primary text-xl md:text-2xl font-bold whitespace-nowrap uppercase">
                    Con số nổi bật, ấn tượng
                </h2>
                <div className="flex items-center gap-1">
                    <span className="w-16 h-[2px] bg-[#36803E]"></span>
                    <span className="w-2 h-2 bg-[#36803E] rounded-full"></span>
                </div>
            </div>
            <InfoBox />
            <div className='page-color'>
                <div className=" container mx-auto flex items-center justify-center my-8 relative py-8">
                    <div className="flex flex-1 max-w-[300px] flex-col justify-center items-center gap-2 p-4">
                        <Icon
                            src={"icon-trang-chu-11.png"}
                            alt={"Xét nghiệm greenlab"}
                            size={84}
                        />
                        <h2 className="text-primary text-xl md:text-lg font-bold whitespace-nowrap uppercase">
                            Nhận báo giá
                        </h2>
                        <AnimatedButton text="Nhận ngay" href="#" />
                    </div>
                    <div className="flex relative flex-1 max-w-[300px] flex-col justify-center items-center gap-2 p-4 border-primary">
                        <Icon
                            src={"icon-trang-chu-12.png"}
                            alt={"Xét nghiệm greenlab"}
                            size={84}
                        />
                        <h2 className="text-primary text-xl md:text-lg font-bold whitespace-nowrap uppercase">
                            Đặt lịch tư vấn
                        </h2>
                        <AnimatedButton text="Đặt ngay" href="#" />
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-2/3 bg-primary"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-2/3 bg-primary"></div>
                    </div>
                    <div className="flex flex-1 max-w-[300px] flex-col justify-center items-center gap-2 p-4">
                        <Icon
                            src={"icon-trang-chu-13.png"}
                            alt={"Xét nghiệm greenlab"}
                            size={84}
                        />
                        <h2 className="text-primary text-xl md:text-lg font-bold whitespace-nowrap uppercase">
                            Nhận khuyến mãi
                        </h2>
                        <AnimatedButton text="Nhận ngay" href="#" />
                    </div>
                </div>
            </div>

        </section>
    );
}