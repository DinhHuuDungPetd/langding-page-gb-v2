'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import {
    IoPersonCircleOutline,
    IoLogOutOutline,
    IoChevronDown,
} from 'react-icons/io5'
import ChangePassword from '@/component/layout/header/ChangePassword';
import SearchModal from '@/component/layout/header/SearchModal'

const GIVEN_NAME_CLAIM =
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'

export default function UserMenuDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const dropdownRef = useRef(null)
    const router = useRouter()

    function extractProperName(rawName) {
        if (!rawName) return 'User'
        const hyphenIndex = rawName.indexOf('-')
        let namePart = rawName
        if (hyphenIndex !== -1) {
            namePart = rawName.substring(0, hyphenIndex).trim()
        }
        const firstSpaceIndex = namePart.indexOf(' ')
        if (firstSpaceIndex !== -1) {
            return namePart.substring(firstSpaceIndex + 1).trim()
        }
        return namePart.trim()
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        if (!token) {
            setIsLoggedIn(false)
            setIsLoading(false)
            return
        }

        try {
            const decodedToken = jwtDecode(token)

            if (decodedToken.exp * 1000 < Date.now()) {
                console.warn('Token đã hết hạn.')
                localStorage.removeItem('accessToken')
                setIsLoggedIn(false)
            } else {
                const givenName = decodedToken[GIVEN_NAME_CLAIM]
                const properName = extractProperName(givenName)
                setUserInfo({ givenName: properName })
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.error('Giải mã token thất bại:', error)
            localStorage.removeItem('accessToken')
            setIsLoggedIn(false)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        setUserInfo(null)
        setIsLoggedIn(false)
        setIsOpen(false)
        router.push('/tra-cuu')
    }

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                <span className="text-sm font-medium text-gray-400">Đang tải...</span>
            </div>
        )
    }

    if (!isLoggedIn) {
        return <SearchModal isLoggedIn={isLoggedIn} />
    }



    return (
        <div className="relative" ref={dropdownRef}>
            {/* Nút bấm để kích hoạt dropdown (hiển thị tên user) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
                title={userInfo?.givenName}
            >
                <SearchModal isLoggedIn={isLoggedIn} />
                <IoPersonCircleOutline className="text-2xl text-primary" />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                    {userInfo?.givenName}
                </span>
                <IoChevronDown
                    className={`text-sm text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Menu dropdown (chỉ hiển thị khi đã đăng nhập) */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                    <div className="py-1">
                        {/* Thông tin user (lấy từ token) */}
                        <div className="px-4 py-2 mb-1 border-b border-gray-100">
                            <p
                                className="text-sm font-medium text-gray-900 truncate"
                                title={userInfo?.givenName}
                            >
                                {userInfo?.givenName}
                            </p>
                        </div>

                        {/* Đổi mật khẩu */}
                        <ChangePassword />

                        {/* Nút Đăng xuất */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <IoLogOutOutline className="text-lg" />
                            Đăng xuất
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}