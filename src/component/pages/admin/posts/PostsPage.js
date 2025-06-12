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

const PAGE_SIZE = 10;

export default function PostsPage() {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchDebounce, setSearchDebounce] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();

    const canView = usePermission([
        permissions.users.view,
        permissions.roles.view,
        permissions.rolesClaims.view,
    ]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && !canView) {
            router.push("/unauthorized");
        }
    }, [canView, isClient, router]);

    const fetchBlog = useCallback(async () => {
        setLoading(true);
        try {
            const response = await dataTestAPI.get(
                `/api/v1/Blog?BlogTitle=${encodeURIComponent(
                    searchDebounce
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
    }, [currentPage, searchDebounce]);

    useEffect(() => {
        if (isClient && canView) {
            fetchBlog();
        }
    }, [fetchBlog, isClient, canView]);

    useEffect(() => {
        if (!searchName) {
            setSearchDebounce("");
        }
    }, [searchName]);

    const handleClickPage = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                <SearchModal
                    searchName={searchName}
                    setSearchName={setSearchName}
                    onSearch={() => {
                        setCurrentPage(1);
                        setSearchDebounce(searchName);
                    }}
                />

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