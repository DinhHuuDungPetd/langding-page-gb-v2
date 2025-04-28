import Image from 'next/image'
import Link from 'next/link'
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
export default function AppFooter() {
    return (
        <footer className="bg-gradient-to-b from-primary to-midnight text-white px-5 md:px-16 py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5 mx-auto text-center md:text-left">
                    <div className="flex items-center gap-2 mb-4">
                        <Image src="/images/logo/Logo-05.png" alt="Green Lab" width={250} height={250}/>
                        <div>
                            <Image src="/icons/Iso-Vilas-med 134_W.png" alt="Green Lab" width={150} height={150} />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">TRUNG TÂM XÉT NGHIỆM GREEN LAB</p>
                    <ul className="space-y-1">
                        <li className='flex gap-3 font-medium text-md'><FaMapMarkedAlt className="text-white" /> 121 Bùi Thị Xuân, Q. Hai Bà Trưng, Hà Nội</li>
                        <li className='flex gap-3 font-medium text-md'><MdOutlineEmail className="text-white" /> <a href="mailto:xetnghiemgreenlab@gmail.com" className="hover:underline">xetnghiemgreenlab@gmail.com</a></li>
                        <li className='flex gap-3 font-medium text-md'><FaPhone className="text-white" /> 0912 615 997 | <FaPhoneVolume className="text-white" /> 1900 636 588</li>
                    </ul>
                    <p className="text-xs mt-4 font-medium">
                        Trang web thuộc sở hữu của Công ty Cổ phần Đầu tư và Công nghệ Y tế Hà Nội. <br />
                        Mã số thuế: 0106064740 do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp ngày 18/12/2012. <br />
                        Địa chỉ: Số nhà 87 ngõ 649/77/77 đường Lĩnh Nam, Phường Hoàng Mai, Hà Nội.
                    </p>
                    <p className="text-base font-medium mt-2">Copyright 2025 © Trung tâm xét nghiệm Green Lab</p>
                </div>

                <div className="md:col-span-3 text-base mx-auto text-center md:text-left">
                    <ul className="space-y-2 px-10">
                        {[
                            { name: 'Trang chủ', href: '/' },
                            { name: 'Giới thiệu', href: '/introduction' },
                            { name: 'Dịch vụ xét nghiệm', href: '/service' },
                            { name: 'Đặt lịch xét nghiệm', href: '/order' },
                            { name: 'Kết quả xét nghiệm', href: '/account' },
                            { name: 'Tin tức – Sự kiện', href: '/news-events' },
                            { name: 'Liên hệ', href: '/contact' },
                        ].map((item, i) => (
                            <li key={i}>
                                <Link href={item.href} className="hover:underline">{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-white text-primary font-bold text-center py-4 px-8 rounded-md mt-4 w-fit text-base">
                        Thời gian hoạt động<br />
                        <span className="font-medium text-base">Thứ 2 đến Chủ Nhật: 7h00 - 21h00</span>
                    </div>
                </div>

                <div className="md:col-span-4 text-center">
                    <p className="font-bold text-xl mb-2">BẢN ĐỒ TRUNG TÂM XÉT NGHIỆM GREEN LAB</p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4566984195967!2d105.84743137596261!3d21.014404780631477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8b0c400001%3A0xf4271e655b7acc51!2zMTIxIFAuIELDuWkgVGjhu4sgWHXDom4sIELDuWkgVGjhu4sgWHXDom4sIEhhaSBCw6AgVHmdsG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1744960140723!5m2!1svi!2s"
                        width="100%"
                        height="300"
                        loading="lazy"
                        title="Map đến green lab 109 Bùi Thị Xuân"
                        className="rounded-md border-none"
                    ></iframe>

                    <div className="flex items-center gap-3 mt-4">
                        <span className="text-xl font-medium">THEO DÕI GREEN LAB</span>
                        <a href="https://www.facebook.com/tuyendunggreenlab"><Image src="/icons/Logo-02.png" alt="Facebook" width={40} height={40} /></a>
                        {/* <a href="#"><Image src="/icons/Logo-03.png" alt="Tiktok" width={40} height={40} /></a> */}
                        <a href="https://youtube.com/@ttxn.green lab?si=_mPNSoYqdKagvDjO"><Image src="/icons/Logo-04.png" alt="YouTube" width={40} height={40} /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
