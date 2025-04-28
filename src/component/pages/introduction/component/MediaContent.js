import Image from "next/image"
import "@/component/pages/introduction/component/MediaConten.css"
const features = [
    { icon: "/icons/5. Icon_Vi_Sao_Nen_Chon-01.png", title: "BỀ DÀY", subtitle: "KINH NGHIỆM", description: "Phát triển dịch vụ từ năm 2014, với hơn 10 năm kinh nghiệm và phục vụ hơn 1 triệu lượt xét nghiệm chuyên sâu." },
    { icon: "/icons/5. Icon_Vi_Sao_Nen_Chon-02.png", title: "ĐỘI NGŨ", subtitle: "CỦA CHÚNG TÔI", description: "Đội ngũ bác sĩ và chuyên viên của Green Lab là những con người giàu kinh nghiệm, tận tâm với nghề." },
    { icon: "/icons/5. Icon_Vi_Sao_Nen_Chon-03.png", title: "MẠNG LƯỚI", subtitle: "HOẠT ĐỘNG", description: "Mạng lưới của Trung tâm xét nghiệm Green Lab phát triển mạnh tại Hà Nội và các tỉnh lân cận." },
    { icon: "/icons/5. Icon_Vi_Sao_Nen_Chon-04.png", title: "LIÊN KẾT", subtitle: "HỢP TÁC", description: "Hơn 50 bệnh viện, hơn 500 phòng khám, hơn 4000 bác sĩ và cộng tác viên." },
    { icon: "/icons/5. Icon_Vi_Sao_Nen_Chon-05.png", title: "THẾ MẠNH", subtitle: "CHUYÊN MÔN", description: "Trung tâm xét nghiệm Green Lab đáp ứng mọi loại xét nghiệm từ cơ bản đến chuyên sâu như: Di truyền, Huyết học, Tế bào – Giải phẫu bệnh, Sinh hóa – Miễn dịch, Vi sinh, Sinh học phân tử." },
    { icon: "/icons/5. Icon_Vi_Sao_Nen_Chon-06.png", title: "PHÒNG XÉT NGHIỆM", subtitle: "ĐẠT CHUẨN", description: "Sử dụng công nghệ hiện đại đảm bảo độ chính xác cao. Quy trình kiểm soát chất lượng nghiêm ngặt." },
    { icon: "/icons/5. Icon_Vi_Sao_Nen_Chon-07.png", title: "CHI PHÍ", subtitle: "XÉT NGHIỆM", description: "Giá xét nghiệm thực hiện tại nhà hay bệnh viện đều không đổi. Khách hàng chỉ trả them chi phí đi lại 10.000 đồng/lần lấy mẫu." },
    { icon: "/icons/5. Icon_Vi_Sao_Nen_Chon-08.png", title: "TRẢ KẾT QUẢ", subtitle: "XÉT NGHIỆM", description: "Kết quả xét nghiệm được trả tận nơi theo yêu cầu của khách hàng hoặc tra cứu trên website greenlab.vn." },
];

export default function MediaContent() {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="flip-card group w-full h-full"
                    >
                        <div className="flip-inner border-2 border-primary rounded-xl p-8 bg-mint transition-all text-center flex items-center justify-center relative min-h-[250px]">

                            <div className="flip-front absolute inset-0 p-8 flex flex-col items-center justify-center">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-gradient-to-b from-primary to-midnight border-central border-3">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={512}
                                        height={512}
                                        className="w-[50%] h-[50%] object-contain"
                                    />
                                </div>
                                <div className="font-bold text-base leading-tight uppercase">
                                    <div>{item.title}</div>
                                    <div>{item.subtitle}</div>
                                </div>
                            </div>

                            <div className="flip-back absolute inset-0 bg-midnight text-white rounded-lg p-6 flex flex-col justify-center text-sm ">
                                <p className="font-medium text-lg text-balance mb-2">
                                    {item.title}
                                    {item.subtitle}
                                </p>
                                <p className="font-medium text-md text-balance mb-2">{item.description}</p>
                            </div>

                        </div>
                    </div>

                ))}
            </div>
        </div >
    )
}