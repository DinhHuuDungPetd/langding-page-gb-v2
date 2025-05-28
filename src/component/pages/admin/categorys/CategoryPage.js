"use client"
import Link from "next/link";
import AddModal from "@/component/pages/admin/categorys/component/AddModal";
import TableCategorys from "@/component/pages/admin/categorys/component/TableCategorys"
import axios from 'axios';
import { useEffect, useState } from "react";
import FullScreenLoader from "@/component/FullScreenLoader";
import { blogAPI } from "@/hooks/authorizeAxiosInstance";
export default function CategorysPage() {
    const PAGE_SIZE = 4;
    const [loading, setLoading] = useState(false);
    const [categorys, setCategorys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const getCategorys = async () => {
        try {
            const response = await blogAPI.get(
                `api/v1/Category?PageNumber=${currentPage}&PageSize=${PAGE_SIZE}`
            );
            if (response.status === 200) {
                const CategoryData = response.data.data.items;
                setCategorys(CategoryData);
                setTotalCount(response.data.data.totalCount);
                console.log("CategoryData", CategoryData)
            }
        } catch (err) {
            console.error("Error fetching blog:", err);
        }
    };

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

    return (
        <div>
            {loading && <FullScreenLoader />}
            <div className="flex items-center justify-start mb-6 gap-5">
                <h2 className="font-medium text-3xl">Danh mục</h2>

            </div>
            <div className="flex items-center justify-start mb-6 gap-5">
                <AddModal getCategorys={getCategorys} />
            </div>
            <div>
                <TableCategorys setLoading={setLoading} categorys={categorys} getCategorys={getCategorys} />
            </div>

        </div>
    )
}