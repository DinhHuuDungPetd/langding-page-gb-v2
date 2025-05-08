"use client"
import Link from "next/link";
import AddModal from "@/component/pages/admin/categorys/component/AddModal";
import TableCategorys from "@/component/pages/admin/categorys/component/TableCategorys"
import axios from 'axios';
import { useEffect, useState } from "react";
import FullScreenLoader from "@/component/FullScreenLoader";
export default function CategorysPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [categorys, setCategorys] = useState([]);
    
    const getCategorys = async () => {
        try {
            const response = await axios.get(`${baseUrl}/categorys`);
            setCategorys(response.data);
        } catch (error) {
            console.error('Error fetching categorys:', error);
        }
    };

    useEffect(() => {
        getCategorys();
    }, []);

    return (
        <div>
            {loading && <FullScreenLoader />}
            <div className="flex items-center justify-start mb-6 gap-5">
                <h2 className="font-medium text-3xl">Danh mục</h2>

            </div>
            <div className="flex items-center justify-start mb-6 gap-5">
                <AddModal getCategorys={getCategorys}  />
            </div>
            <div>
                <TableCategorys setLoading={setLoading} categorys={categorys} getCategorys={getCategorys} />
            </div>

        </div>
    )
}