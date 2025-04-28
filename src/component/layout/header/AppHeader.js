"use client"
import Image from "next/image"
import ItemLi from "@/component/layout/header/ItemLi";
import TimelineProgressBar from "@/component/layout/header/TimelineProgressBar";
import SearchModal from "@/component/layout/header/SearchModal";
import Link from "next/link";
import { Suspense } from "react";

const menuItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Giới thiệu', href: '/gioi-thieu' },
    { name: 'Dịch vụ xét nghiệm', href: '/dich-vu' },
    { name: 'Đặt lịch', href: '/dat-lich' },
    { name: 'Kết quả xét nghiệm', href: '/tra-cuu' },
    { name: 'Tin tức – Sự kiện', href: '/tin-tuc-su-kien' },
    { name: 'Liên hệ', href: '/lien-he' },
]

export default function AppHeader() {
    return (
        <Suspense fallback={<div>Đang tải...</div>}>
            <header className="bg-white text-black shadow-md sticky top-0 z-50">
                <TimelineProgressBar />
                <nav className="container flex justify-between items-center mx-auto">
                    <Link
                        href="/">
                        <div>
                            <Image
                                className="lg:w-40 h-auto cursor-pointer"
                                src="/images/logo/Green-Lab-Logo-03.png"
                                alt="Green Lab Logo"
                                width={300}
                                height={300}
                                priority
                            />
                        </div>
                    </Link>
                    <div>
                        <div
                            id="nav-menu"
                        >
                            <ul className="flex flex-row items-center gap-0 w-full">
                                {menuItems.map((item, i) => (
                                    <ItemLi item={item} key={i} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="relative">
                        <SearchModal />
                    </div>
                </nav>
            </header>
        </Suspense>
    )
}