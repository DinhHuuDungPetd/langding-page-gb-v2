'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { AiFillHome } from 'react-icons/ai'
import { FaRegFileAlt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { HiOutlineMenu } from 'react-icons/hi'
import { MdLogout } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-container flex min-h-screen relative">
      {/* Sidebar */}
      <div className={`admin-sidebar fixed xl:static inset-y-0 left-0 z-50 w-64 bg-mint p-4 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0 xl:flex xl:flex-col xl:items-center xl:justify-start text-center`}>
        <Link href="/" className="mb-4">
          <Image
            className="lg:w-52 h-auto cursor-pointer"
            src="/images/logo/Green-Lab-Logo-03.png"
            alt="Green Lab Logo"
            width={512}
            height={512}
            priority
          />
        </Link>
        <hr className="w-full border-gray-400 mb-6" />
        <nav className="space-y-4 flex flex-col gap-4 w-full ml-10">
          <SidebarLink href="/admin" icon={<AiFillHome size={20} />}>Dashboard</SidebarLink>
          <SidebarLink href="/admin/posts" icon={<FaRegFileAlt size={20} />}>Bài viết</SidebarLink>
          <SidebarLink href="/admin/categorys" icon={<BiCategory size={20} />}>Danh mục</SidebarLink>
          <SidebarLink href="/admin/settings" icon={<FiSettings size={20} />}>Cài đặt</SidebarLink>
        </nav>
        <hr className="w-full border-gray-400 mb-6" />
        <nav className="space-y-4 w-full ml-10">
          <SidebarLink href="/logout" icon={<MdLogout size={20} />}>Đăng xuất</SidebarLink>
        </nav>
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="admin-content flex-1 flex flex-col">
        {/* Header */}
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

        {/* Main */}
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
