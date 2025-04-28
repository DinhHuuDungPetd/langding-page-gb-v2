import Image from "next/image";
import { FaCalendarAlt, FaUser, FaEye } from 'react-icons/fa'

export default function Blog() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-[#1c1c1c] container">

            <div className="flex flex-wrap items-center medium-italic text-gray-400 text-sm space-x-4 border-b pb-4 mb-4 px-4">
                <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-green-700" size={30} />
                    <span>Ngày đăng: 09/04/2025</span>
                </div>
                <div className="h-4 border-l border-gray-300 mx-2" />
                <div className="flex items-center space-x-2">
                    <FaUser className="text-green-700" size={30} />
                    <span>Tác giả: admin</span>
                </div>
                <div className="h-4 border-l border-gray-300 mx-2" />
                <div className="flex items-center space-x-2">
                    <FaEye className="text-green-700" size={30} />
                    <span>121 lượt xem</span>
                </div>
            </div>

            <h1 className="text-2xl lg:text-2xl font-bold text-primary mb-6 text-pretty">
                Quy Trình Xét Nghiệm Tại Nhà Green Lab – Đơn Giản & Nhanh Chóng
            </h1>


            <p className="mb-4 medium-italic text-md text-pretty text-gray-500 text-base/8">
                Bạn muốn kiểm tra sức khỏe nhưng ngại thủ tục rườm rà ở bệnh viện?
                Quy trình xét nghiệm tại nhà của Green Lab sẽ khiến bạn bất ngờ vì sự đơn giản và nhanh chóng.
                Không cần xếp hàng, không mất thời gian chờ đợi – chỉ vài bước là bạn đã có kết quả chính xác ngay tại nhà.
                Với gói tổng quát chỉ 800K, Green Lab mang đến trải nghiệm y tế hiện đại, tiện lợi trong năm 2025.
                Hãy cùng tìm hiểu chi tiết nhé!
            </p>


            <ul className="bg-mint border border-primary text-primary p-4 rounded mb-8 medium-italic text-base/8 text-md text-pretty">
                <li>Quy trình xét nghiệm tại nhà Greenlab gồm những gì?</li>
                <li>Tại sao quy trình Green Lab lại đơn giản và nhanh?</li>
                <li>Bảng giá dịch vụ xét nghiệm</li>
                <li>Bảng giá dịch vụ xét nghiệm</li>
            </ul>


            <h2 className="text-lg bold-italic text-primary mb-4 text-pretty">Quy trình xét nghiệm tại nhà Greenlab gồm những gì?</h2>
            <p className="mb-4 medium text-md ">
                Green Lab – đơn vị tiên phong tại Hà Nội – đã tối ưu hóa quy trình xét nghiệm tại nhà thành 3 bước đơn giản:
            </p>
            <p className="mb-4 medium text-md text-pretty text-base/8">
                Đặt lịch, lấy mẫu, nhận kết quả. Dịch vụ này không chỉ tiện lợi mà còn đảm bảo chất lượng với công nghệ Roche và Siemens,
                chuẩn <strong>ISO 15189:2012</strong>. Dù bạn cần xét nghiệm tổng quát, tiểu đường, hay tầm soát ung thư, mọi thứ đều được thực hiện nhanh gọn ngay tại nhà bạn.
            </p>

            <Image
                src="/images/background/background_11.jpg"
                alt="Green Lab riders"
                width={1000}
                height={600}
                className="rounded mb-6"
            />

            <h3 className="font-bold text-md mb-2 text-pretty">Bước 1: Đăng lịch dễ dàng</h3>
            <p className="mb-4 font-medium text-md text-pretty">
                Bạn chỉ cần gọi hotline 1900 63 65 88 hoặc truy cập website Greenlab.vn. Chọn gói xét nghiệm phù hợp:
            </p>

            <br />

            <p className="mb-4 font-bold text-lg text-primary">
                1. GÓI TỔNG QUÁT 800K (MÁU, MỠ MÁU, GAN, THẬN)
            </p>
            <p className="mb-4 font-bold text-lg text-primary">
                2. GÓI CHUYÊN SÂU (1,2-1,5 TRIỆU CHO TIỂU ĐƯỜNG, UNG THƯ)
            </p>
            <p className="mb-4 font-bold text-lg text-primary">
                3. GÓI GIA ĐÌNH (GIẢM GIÁ KHI ĐẶT NHIỀU NGƯỜI)
            </p>

            <p className="mb-4 font-medium text-md text-pretty">
                Sau đó, chọn thời gian và địa điểm. Nhân viên Green Lab sẽ liên hệ xác nhận trong vòng 15 phút.
            </p>
            <p className="mb-4 font-medium text-md text-pretty">
                Chị Lan (35 tuổi, Hà Nội) chia sẻ: “Tôi đặt lịch qua web lúc 10h sáng, 10h15 đã có người gọi lại. Quá nhanh!"
            </p>

            <br />

            <h3 className="font-bold text-md mb-2 text-pretty">Bước 2: Lấy mẫu xét nghiệm</h3>
            <p className="mb-4 font-medium text-md text-pretty text-base/8">
                Đúng giờ hẹn, nhân viên Green Lab đến nhà bạn với trang bị bảo hộ đầy đủ, đảm bảo an toàn.
                Quá trình lấy mẫu chỉ mất 15-30 phút, tùy loại xét nghiệm (máu, nước tiểu...).
                Bạn không cần chuẩn bị gì phức tạp – chỉ cần nhịn ăn (nếu xét nghiệm đường huyết) hoặc uống đủ nước theo hướng dẫn.
            </p>
            <p className="mb-4 font-medium text-md text-pretty">
                Anh Tuấn (38 tuổi) kể: “Nhân viên đến lúc 7h sáng, lấy mẫu xong trước khi tôi đi làm. Không hề rắc rối!"
            </p>

            <br />

            <h3 className="font-bold text-md mb-2 text-pretty">Bước 3: Nhận kết quả xét nghiệm</h3>
            <p className="mb-4 font-medium text-md text-pretty text-base/8">
                Sau khi lấy mẫu, Green Lab xử lý bằng công nghệ Roche và Siemens, đảm bảo kết quả chính xác theo chuẩn
                ISO 15189:2012. Bạn nhận kết quả qua email hoặc ứng dụng trong 24 giờ – nếu cần gấp,
                tùy chọn siêu tốc 4 giờ chỉ thêm 200-300K. Kết quả đi kèm giải thích chi tiết, và nếu cần, nhân viên sẽ tư vấn miễn phí.
            </p>
            <p className="mb-4 font-medium text-md text-pretty">
                Chị Hoa (40 tuổi, Hà Nội) nói: “Tôi nhận kết quả lúc 8h tối cùng ngày, còn được gọi hỏi thăm. Dịch vụ quá tốt!"bài viết
            </p>
            <Image
                src="/images/background/background_12.jpg"
                alt="Green Lab lab"
                width={1000}
                height={600}
                className="rounded mb-6"
            />

            {/* Section 2 */}
            <h2 className="text-lg bold-italic text-primary mb-4 text-pretty">Tại sao quy trình Green Lab lại đơn giản và nhanh?</h2>
            <p className="mb-4 font-medium text-md">
                <strong>
                    1. Công nghệ hiện đại
                </strong>
            </p>
            <p className="mb-4 font-medium text-md text-pretty">
                Máy móc từ Roche và Siemens giúp rút ngắn thời gian phân tích mà vẫn đảm bảo độ chính xác.
            </p>
            <p className="mb-4 font-medium text-md text-pretty">
                Đội ngũ do PGS.TS Nguyễn Quang Tùng – Chuyên gia huyết học – cố vấn, giám sát chặt chẽ mọi khâu.
            </p>
            <br />

            <p className="mb-4 font-medium text-md text-pretty">
                <strong>
                    2. Tối ưu hóa dịch vụ
                </strong>
            </p>
            <p className="mb-4 font-medium text-md text-pretty text-base/8">
                Green Lab loại bỏ các bước không cần thiết như xếp hàng, chờ đợi ở bệnh viện.
                Nhân viên được đào tạo để lấy mẫu nhanh, an toàn, và thân thiện với khách hàng.
            </p>
            <br />

            <p className="mb-4 font-medium text-md text-pretty">
                <strong>
                    3. Linh hoạt cho mọi nhu cầu
                </strong>
            </p>
            <p className="mb-4 font-medium text-md text-pretty text-base/8">
                Dù bạn ở nội thành Hà Nội hay cần xét nghiệm gấp, Green Lab đều đáp ứng.
                Quy trình phù hợp cho cả cá nhân và gia đình – đặt một lần, lấy mẫu cùng lúc cho nhiều người.
            </p>
            <h2 className="text-lg bold-italic text-primary text-pretty">So sánh với quy trình truyền thống</h2>
            <p className="mb-4 font-medium text-md text-pretty">
                Bệnh viện/MEDLATEC: Đi lại, xếp hàng, chờ 2-3 ngày lấy kết quả, chi phí cao hơn (1-1,5 triệu).
            </p>
            <p className="mb-4 font-medium text-md text-pretty">
                Green Lab: Ở nhà, 15-30 phút lấy mẫu, kết quả 24 giờ, chỉ 800K.
            </p>
            <p className="mb-4 font-medium text-md text-pretty">
                Anh Minh (42 tuổi) nhận xét: “Đi bệnh viện mất nửa ngày, còn Green Lab xong trong 20 phút.
                800K mà tiện thế này thì không có gì để chê!"
            </p>


            <div className="bg-primary rounded-2xl border-l-4 border-primary px-4 py-2 text-sm text-white">
                <h2 className="text-xl bold-italic  mb-4 text-pretty">Lưu ý trước khi xét nghiệm:</h2>
                <p className="mb-4 font-medium text-md text-pretty">
                    Để quy trình suôn sẻ, bạn nên:
                </p>
                <ul className="list-disc list-inside font-medium text-md mb-4 text-pretty text-base/8">
                    <li>Chọn thời gian rảnh để nhân viên đến lấy mẫu.</li>
                    <li>Tuân thủ hướng dẫn (nhịn ăn, uống nước...) trước khi xét nghiệm.</li>
                    <li>Kiểm tra kết quả và liên hệ Green Lab nếu cần giải thích thêm.</li>
                    <li>Kết luận: Sức khỏe dễ dàng hơn bao giờ hết.</li>
                </ul>
                <p className="mb-4 font-medium text-md text-pretty text-base/8">
                    Quy trình xét nghiệm tại nhà của Green Lab đơn giản, nhanh chóng,
                    và hiệu quả – chỉ 3 bước là bạn đã chăm sóc sức khỏe xong xuôi.
                    Với 800K – giảm còn 720K nếu đặt trong 7 ngày tới – bạn nhận được dịch vụ chuẩn quốc tế ngay tại nhà.
                    Gọi 1900 63 65 88 hoặc truy cập vào website Greenlab.vn để đặt lịch ngay hôm nay.
                </p>
                <p className="mb-4 bold-italic text-md text-pretty">
                    Green Lab - sức khỏe không còn là gánh nặng!
                </p>
            </div>
        </div>
    )
}