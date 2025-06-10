"use client"
import AddModal from "@/component/pages/admin/categorys/component/AddModal";
import TableCategorys from "@/component/pages/admin/categorys/component/TableCategorys"
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/component/FullScreenLoader";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import TablePriorityCategory from "@/component/pages/admin/categorys/component/TablePriorityCategory"
import { usePermission } from '@/hooks/usePermission';
import { permissions } from '@/hooks/permissions';
const PAGE_SIZE = 4;
export default function CategorysPage() {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categorys, setCategorys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedPrioritys, setSelectedPrioritys] = useState([]);
    const [sort, setSort] = useState(true);

    const router = useRouter();

    const canView = usePermission([
        permissions.users.view,
        permissions.roles.view,
        permissions.rolesClaims.view
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

    const getCategorys = useCallback(async () => {
        try {
            const response = await dataTestAPI.get(
                `api/v1/Category?PageNumber=${currentPage}&PageSize=${PAGE_SIZE}`
            );
            if (response.status === 200) {
                const CategoryData = response.data.data.items;
                setCategorys(CategoryData);
                setTotalCount(response.data.data.totalCount);
            }
        } catch (err) {
            console.error("Error fetching blog:", err);
        }
    });

    useEffect(() => {
        getCategorys();
    }, [currentPage]);


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

    const handleSort = async () => {
        if (sort) {
            setSort(false)
        } else {
            setSort(true)
        }

    };

    const handleSave = async () => {
        try {
            const response = await dataTestAPI.post(
                `api/v1/Category/sort`,
                {
                    sortCategory: selectedPrioritys // cần bọc trong {}
                }
            );
            if (response.status === 200) {
                alert("Cập nhật ưu tiên thành công");
                await getCategorys();
                setSort(true);
                setSelectedPrioritys([]);
            }
        } catch (err) {
            console.error("Error updating category priority:", err);
        }
    };

    // Không render nếu chưa sẵn sàng hoặc không có quyền
    if (!isClient || !canView) return null;

    return (
        <div>
            {loading && <FullScreenLoader />}
            <div className="flex items-center justify-start mb-6 gap-5">
                <h2 className="font-medium text-3xl">Danh mục</h2>
            </div>
            <div className="flex items-center justify-start mb-6 gap-5">
                <AddModal getCategorys={getCategorys} />
            </div>
            <div className="flex items-center justify-start mb-6 gap-5">
                <button
                    onClick={handleSort}
                    className="px-4 py-2 bg-primary text-white rounded mx-1 
             hover:bg-green-700 transition duration-200 
             transform active:scale-95 cursor-pointer m-5"
                >
                    Sắp sếp ưu tiên
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-red-600 text-white rounded mx-1 
             hover:bg-red-900 transition duration-200 
             transform active:scale-95 cursor-pointer m-5"
                >
                    Lưu
                </button>
            </div>
            <div>
                {sort ?
                    <TableCategorys
                        setLoading={setLoading}
                        categorys={categorys}
                        getCategorys={getCategorys}
                        handleClickPage={handleClickPage}
                        getPaginationItems={getPaginationItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        PAGE_SIZE={PAGE_SIZE}
                    />
                    :
                    <TablePriorityCategory selectedPrioritys={selectedPrioritys} setSelectedPrioritys={setSelectedPrioritys} />
                }

            </div>

        </div>
    )
}