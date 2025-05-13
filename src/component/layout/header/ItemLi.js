"use client"
import { usePathname } from 'next/navigation'
import Link from "next/link";

export default function ItemLi({ item, setMenuOpen }) {
    const pathname = usePathname()
    return (
        <li>
            <Link
                className={`text-center block py-7 2xl:text-lg text-sm px-4 h-full hover:bg-central hover:text-white transition-all  font-medium 
                ${pathname === item.href ? "active" : ""}`}
                href={item.href || "/"}
                onClick={(() => setMenuOpen(false))}
            >
                {item.name}
            </Link>
        </li>
    )
}