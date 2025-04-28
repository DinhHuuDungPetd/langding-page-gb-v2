import OrderComponent from "@/component/pages/home/Order";
import CircleComponent from "@/component/Circle";
export default function ServicePage() {

    const items = [
        {
            title: "Đăng ký lịch hẹn",
            icon: "orders/4-Icon-Dat-Lich-01.png",
            content: "Qua tổng đài: 1900 636 588\nQua hotline: 0912 615 997\nQua website: greenlab.vn"
        },
        {
            title: "Lấy mẫu tận nơi",
            icon: "orders/4-Icon-Dat-Lich-02.png",
            content: "Theo yêu cầu của khách hàng"
        },
        {
            title: "Trả kết quả",
            icon: "orders/4-Icon-Dat-Lich-03.png",
            content: "Trực tiếp qua mail" +
                "\n" +
                "Trực tuyến website"
        },
        {
            title: "Tư vấn kết quả",
            icon: "orders/4-Icon-Dat-Lich-04.png",
            content: "Khi có kết quả, khách hàng sẽ được đội ngũ bác sĩ giàu kinh nghiệm tư vấn về kết quả và đưa ra chế độ dinh dưỡng hợp lý."
        },
    ]


    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(/images/background/background_7.webp)] bg-blend-multiply">
                <div className="absolute bottom-4 left-20 text-white text-2xl medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Đặt lịch xét nghiệm</span>
                </div>
            </div>
            <div className="container mx-auto py-8 ">
                <h2 className='text-center text-5xl uppercase text-primary font-bold my-4'>Quy trình lấy mẫu tại green lab</h2>
                <div className=" w-full  flex justify-center">
                    <div className="w-fit pt-8 flex justify-center relative px-4">
                        <div className="absolute inset-x-0 top-1/3 h-[1px] bg-[#b3b3b3] z-0">
                        </div>
                        {items.map((item, index) => (
                            <CircleComponent key={index} item={item} index={index} />

                        ))}
                    </div>
                </div>
            </div>

            <OrderComponent />
        </div>
    )
}