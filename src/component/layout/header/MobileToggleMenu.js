'use client'

import { useState, useEffect } from 'react'
import { IoMenu, IoClose } from 'react-icons/io5'

export default function MobileToggleMenu() {
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const navMenu = document.getElementById('nav-menu-mobile')
        if (navMenu) {
            navMenu.style.top = menuOpen ? '' : '-100%'
        }
    }, [menuOpen])

    return (
        <div className="xl:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
                <IoClose className="text-3xl cursor-pointer" />
            ) : (
                <IoMenu className="text-3xl cursor-pointer" />
            )}
        </div>
    )
}
