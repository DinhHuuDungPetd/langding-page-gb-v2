"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchModal from "@/component/pages/admin/posts/component/SearchModal";
import TablePosts from "@/component/pages/admin/posts/component/TablePosts";
import FullScreenLoader from "@/component/FullScreenLoader";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import { usePermission } from "@/hooks/usePermission";
import { permissions } from "@/hooks/permissions";

const PAGE_SIZE = 10; // Định nghĩa hằng số ở đầu file

export default function PostsPage() {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();

    // Kiểm tra quyền truy cập
    const canView = usePermission([
        permissions.users.view,
        permissions.roles.view,
        permissions.rolesClaims.view,
    ]);

    // Đánh dấu là client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Chuyển hướng nếu không có quyền
    useEffect(() => {
        if (isClient && !canView) {
            router.push("/unauthorized");
        }
    }, [canView, isClient, router]);

    // Hàm fetch blog với useCallback để tránh tạo lại hàm không cần thiết
    const fetchBlog = useCallback(async () => {
        setLoading(true);
        try {
            const response = await dataTestAPI.get(
                `/api/v1/Blog?BlogTitle=${encodeURIComponent(
                    searchName
                )}&PageNumber=${currentPage}&PageSize=${PAGE_SIZE}`
            );
            if (response.status === 200) {
                setBlogs(response.data.data.items);
                setTotalPages(Math.ceil(response.data.data.totalCount / PAGE_SIZE));
            }
        } catch (error) {
            console.error("Error fetching blog:", error);
            alert("Không thể tải danh sách bài viết. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchName]);

    // Fetch blog khi currentPage hoặc searchName thay đổi
    useEffect(() => {
        if (isClient && canView) {
            fetchBlog();
        }
    }, [fetchBlog, isClient, canView]);

    // Xử lý khi click vào trang
    const handleClickPage = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Tạo danh sách trang cho phân trang
    const getPaginationItems = useCallback(() => {
        let startPage, endPage;
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );
    }, [currentPage, totalPages]);

    // Không render nếu chưa sẵn sàng hoặc không có quyền
    if (!isClient || !canView) return null;

    return (
        <div className="p-6">
            {loading && <FullScreenLoader />}
            <div className="flex items-center justify-start mb-6 gap-5">
                <h2 className="font-medium text-3xl">Bài viết</h2>
                <Link
                    href="/admin/posts/newPosts"
                    className="border border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-4 rounded transition-all duration-200"
                    onClick={() => setLoading(true)}
                >
                    Viết bài mới
                </Link>
            </div>
            <div className="mb-6">
                <SearchModal searchName={searchName} setSearchName={setSearchName} />
            </div>
            <TablePosts
                setLoading={setLoading}
                blogs={blogs}
                fetchBlog={fetchBlog}
                handleClickPage={handleClickPage}
                getPaginationItems={getPaginationItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                PAGE_SIZE={PAGE_SIZE}
            />
        </div>
    );
}