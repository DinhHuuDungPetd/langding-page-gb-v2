"use client"
import Link from "next/link";
import SearchModal from "@/component/pages/admin/posts/component/SearchModal";
import TablePosts from "@/component/pages/admin/posts/component/TablePosts"
import { useEffect, useState } from "react";
import FullScreenLoader from "@/component/FullScreenLoader";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import { usePermission } from '@/hooks/usePermission';
import { permissions } from '@/hooks/permissions';

export default function PostsPage() {
    const canView = usePermission([
        permissions.users.view,
        permissions.roles.view,
        permissions.rolesClaims.view
    ]);
    const PAGE_SIZE = 4;
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (!canView) {
            window.location.href = "/unauthorized";
        }
    }, [canView]);

    if (!canView) return (<></>);

    const fetchBlog = async () => {
        try {
            const response = await dataTestAPI.get(
                `api/v1/Blog?BlogTitle=${searchName}&PageNumber=${currentPage}&PageSize=${PAGE_SIZE}`
            );
            if (response.status === 200) {
                const BlogData = response.data.data.items;
                setBlogs(BlogData);
                setTotalCount(response.data.data.totalCount);
            }
        } catch (err) {
            console.error("Error fetching blog:", err);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [currentPage, searchName]);


    useEffect(() => {
        if (totalCount) {
            const pages = Math.ceil(totalCount / PAGE_SIZE);
            setTotalPages(pages);
        }
    }, [totalCount]);

    const handleClickPage = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const getPaginationItems = () => {
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
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <div>
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
            <div className="flex items-center justify-start mb-6 gap-5">
                <SearchModal searchName={searchName} setSearchName={setSearchName} />
            </div>
            <div>
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

        </div>
    )
}