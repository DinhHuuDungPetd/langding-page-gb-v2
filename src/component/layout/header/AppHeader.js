'use client'
import Image from "next/image"
import ItemLi from "@/component/layout/header/ItemLi";
import TimelineProgressBar from "@/component/layout/header/TimelineProgressBar";
import MobileToggleMenu from "@/component/layout/header/MobileToggleMenu";
import SearchModal from "@/component/layout/header/SearchModal";
import Link from "next/link";
import { Suspense, useState } from "react";

import { IoMenu, IoClose } from 'react-icons/io5'
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
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <Suspense fallback={<div>Đang tải...</div>}>
            <header className="bg-white text-black shadow-md sticky top-0 z-50">
                <TimelineProgressBar />
                <nav className="container flex justify-between items-center mx-auto px-2">
                    <Link
                        href="/">
                        <div className="relative w-40 h-15">
                            <Image
                                src="/images/logo/Green-Lab-Logo-03.png"
                                alt="Green Lab Logo"
                                fill
                                priority
                                className="object-contain cursor-pointer"
                            />
                        </div>
                    </Link>
                    <div>
                        <div
                            id="nav-menu"
                        >
                            <ul className="lg:flex flex-row items-center gap-0 w-full hidden">
                                {menuItems.map((item, i) => (
                                    <ItemLi item={item} key={i} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="relative">
                        <SearchModal />
                    </div>
                    <div className="lg:hidden" onClick={() => setMenuOpen(prev => !prev)}>
                        {menuOpen ? (
                            <IoClose className="text-3xl cursor-pointer" />
                        ) : (
                            <IoMenu className="text-3xl cursor-pointer" />
                        )}
                    </div>
                </nav>
                <div
                    id="nav-menu-mobile"
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-md ${menuOpen ? 'max-h-screen py-4' : 'max-h-0'
                        }`}
                >
                    <ul className="flex flex-col text-center divide-y">
                        {menuItems.map((item, i) => (
                            <ItemLi item={item} key={i} />
                        ))}
                    </ul>
                </div>
            </header>
        </Suspense>
    )
}