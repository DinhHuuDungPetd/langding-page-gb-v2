"use client";
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
import Link from "next/link";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";

export default function TableCategorys({ PAGE_SIZE, setLoading, categorys, getCategorys, getPaginationItems, handleClickPage, currentPage, setCurrentPage, totalPages }) {


    const handleUpdateStatus = async (id, isChecked) => {
        try {
            setLoading(true);
            const response = await dataTestAPI.post(`api/v1/Category`, {
                CategoryId: id,
                Status: isChecked ? 1 : 2
            });
            if (response.status === 200) {
                alert("Cập nhật trạng thái thành công");
                await getCategorys();
            } else {
                alert("Cập nhật trạng thái không thành công");
            }
        } catch (error) {
            console.error("Error updating blog status:", error);
        } finally {
            setLoading(false);
        }
    };
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };

    return (
        <>

            <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-xl overflow-hidden">
                <thead className="bg-midnight text-white">
                    <tr>
                        <th className="px-4 py-3 font-medium text-xl">#</th>
                        <th className="px-4 py-3 font-medium text-xl">Tên</th>
                        <th className="px-4 py-3 font-medium text-xl">Thời gian</th>
                        <th className="px-4 py-3 font-medium text-xl">Trạng thái</th>
                        <th className="px-4 py-3 font-medium text-xl">Hành động</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {categorys.length > 0 ? (
                        categorys.map((item, index) => (
                            <tr key={`table-post-${item.categoryId}`} className="border-b hover:bg-green-100">
                                <td className="px-4 py-3 font-medium">{index + 1 + (currentPage - 1) * PAGE_SIZE}</td>
                                <td className="px-4 py-3 font-medium text-xl text-midnight w-1/5">{item.categoryName}</td>
                                <td className="px-4 py-3">{formatDate(item.categoryCreateAt)}</td>
                                <td className="px-4 py-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.categoryStatus === 1}
                                            onChange={(e) => handleUpdateStatus(item.categoryId, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-central
                    rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                    after:transition-all dark:border-gray-600 peer-checked:bg-midnight">
                                        </div>
                                    </label>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <Link href={`/admin/categorys/edit/${item.categoryId}`}>
                                            <button className="text-blue-500 hover:text-blue-700 font-medium cursor-pointer" onClick={() => setLoading(true)}>Sửa</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex flex-col items-center justify-center py-8 px-4">
                <div className="flex gap-2">
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                        <MdFirstPage />
                    </button>
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}
                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                        <GrFormPrevious />
                    </button>
                    {getPaginationItems().map((page) => (
                        <button key={page} onClick={() => handleClickPage(page)}
                            className={`w-10 h-10 border rounded-full flex items-center justify-center transition 
                ${page === currentPage ? "bg-midnight text-white border-primary" : "border-primary hover:bg-central hover:text-white"}`}>
                            {page}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}
                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full transition 
              ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                        <GrFormNext />
                    </button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full transition 
              ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                        <MdLastPage />
                    </button>
                </div>
            </div>
        </>
    );
}
