'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { AiFillHome } from 'react-icons/ai'
import { FaRegFileAlt } from 'react-icons/fa'
import { FiUsers, FiSettings } from 'react-icons/fi'
import { HiOutlineMenu } from 'react-icons/hi'
import { MdLogout } from "react-icons/md";
export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="admin-container grid grid-cols-6 min-h-screen gap-3 shadow-md">

      <div className={`admin-sidebar col-span-6 xl:col-span-1 bg-mint p-4 transition-all duration-300
  ${sidebarOpen ? 'block' : 'hidden'} xl:flex flex-col items-center justify-start text-center`}>
        <Link href="/" className="mb-4">
          <Image
            className="lg:w-52 h-auto cursor-pointer"
            src="/images/logo/Green Lab Logo-03.png"
            alt="Green Lab Logo"
            width={512}
            height={512}
            priority
          />
        </Link>
        <hr className="w-full border-gray-400 mb-6" />
        <nav className="space-y-4 flex flex-col gap-4 w-full ml-15">
          <SidebarLink href="/admin" icon={<AiFillHome size={20} />}>Dashboard</SidebarLink>
          <SidebarLink href="/admin/posts" icon={<FaRegFileAlt size={20} />}>Bài viết</SidebarLink>
          <SidebarLink href="/admin/settings" icon={<FiSettings size={20} />}>Cài đặt</SidebarLink>
        </nav>
        <hr className="w-full border-gray-400 mb-6" />
        <nav className="space-y-4 w-full ml-15">
          <SidebarLink href="/logout" icon={<MdLogout size={20} />}>Đăng xuất</SidebarLink>
        </nav>
      </div>


      <div className="admin-content col-span-6 xl:col-span-5 ">

        <div className="admin-header flex items-center justify-between bg-white p-4 shadow-md">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="xl:hidden"
          >
            <HiOutlineMenu size={24} />
          </button>
          <h1 className="text-lg font-medium">Quản trị hệ thống</h1>
          <div className="text-sm font-medium">Xin chào, Admin</div>
        </div>


        <div className="admin-main p-6 shadow-md">
          {children}
        </div>
      </div>
    </div>
  )
}


const SidebarLink = ({ href, icon, children }) => (
  <Link
    href={href}
    className="group flex items-center gap-4 text-sm my-6 transition-all duration-200"
  >
    <div className="border-2 border-gray-200 rounded-full p-3 bg-gray-200 flex items-center justify-center flex-shrink-0
    text-dark group-hover:text-white group-hover:bg-primary group-hover:border-central transition-all duration-200">
      {icon}
    </div>

    <p className="font-medium text-lg group-hover:text-primary transition-all duration-200">
      {children}
    </p>
  </Link>

)
