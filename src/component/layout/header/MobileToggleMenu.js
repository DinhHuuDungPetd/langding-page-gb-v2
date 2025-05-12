'use client'

import { useState } from 'react'
import { IoMenu, IoClose } from 'react-icons/io5'
import ItemLi from "@/component/layout/header/ItemLi";
export default function MobileToggleMenu({ menuItems }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <div className="lg:hidden" onClick={() => setMenuOpen(prev => !prev)}>
                {menuOpen ? (
                    <IoClose className="text-3xl cursor-pointer" />
                ) : (
                    <IoMenu className="text-3xl cursor-pointer" />
                )}
            </div>

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
        </>
    )
}
