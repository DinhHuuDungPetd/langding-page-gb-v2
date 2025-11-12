"use client";
import React, { useState, useEffect, useCallback } from 'react'; // NEW: Thêm useCallback
import ListUsersMobile from '@/component/pages/test-result-lookup/component/ListUsersMobile';
import TableUsers from '@/component/pages/test-result-lookup/component/TableUsers';
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import { jwtDecode } from "jwt-decode";

const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// Hàm lấy 30 ngày gần nhất
const getDefaultDateRange = () => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 29); // 29 ngày trước + hôm nay = 30 ngày

    return {
        fromDate: formatDate(fromDate),
        toDate: formatDate(toDate)
    };
}

// Giá trị mặc định cho bộ lọc
const defaultFilters = {
    search: "",
    ...getDefaultDateRange()
};

// --- COMPONENT CHÍNH ---

export default function LabPatientSearchPage({ params }) {

    const { slug } = params;
    const DoctorID = slug;

    const [currentPage, setCurrentPage] = useState(1);
    // NEW: Quản lý itemsPerPage và totalCount từ state
    const [itemsPerPage, setItemsPerPage] = useState(20); // Đặt giá trị này khớp với PageSize của API
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [expandedRow, setExpandedRow] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Sử dụng defaultFilters để khởi tạo state
    const [formData, setFormData] = useState(defaultFilters);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Hàm lấy dữ liệu từ API, đã bao gồm validate
     * @param {object} filters - Đối tượng chứa { fromDate, toDate, search }
     * @param {number} page - Số trang cần lấy
     */
    const fetchData = useCallback(async (filters, page = 1) => {
        const { fromDate, toDate, search } = filters;

        // --- 1. VALIDATION DỮ LIỆU ---
        if (!fromDate || !toDate) {
            alert("Vui lòng chọn cả 'Từ ngày' và 'Đến ngày'.");
            return;
        }

        const dFrom = new Date(fromDate);
        const dTo = new Date(toDate);

        dFrom.setHours(0, 0, 0, 0);
        dTo.setHours(0, 0, 0, 0);

        if (dTo < dFrom) {
            alert("'Đến ngày' không được nhỏ hơn 'Từ ngày'. Vui lòng chọn lại.");
            return;
        }

        // --- 2. GỌI API ---
        setIsLoading(true);
        try {
            const trimmedSearch = search.trim();
            const response = await dataTestAPI.get(
                `api/v1/Patient/GetPatientPagination?ID=${DoctorID}&FromTime=${fromDate}&ToTime=${toDate}&SearchInfo=${trimmedSearch}&PageNumber=${page}&PageSize=${itemsPerPage}`
            );

            if (response.status == 200 && response.data.data) {
                setUsers(response.data.data.items || []);
                const total = response.data.data.totalCount || 0;
                setTotalCount(total);
                setTotalPages(Math.ceil(total / itemsPerPage));
                setCurrentPage(page);
            } else {
                setUsers([]);
                setTotalCount(0);
                setTotalPages(0);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Xóa dữ liệu cũ nếu lỗi
            setTotalCount(0); // Reset
            setTotalPages(0); // Reset
        } finally {
            setIsLoading(false);
        }
    }, [DoctorID, itemsPerPage]); // NEW: Thêm dependencies cho useCallback

    // useEffect này CHỈ chạy 1 lần để xác thực và tải dữ liệu ban đầu
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("Bạn chưa đăng nhập.");
            window.location.href = `/login`;
            return;
        }

        try {
            const decoded = jwtDecode(accessToken);
            const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

            if (username !== DoctorID) {
                alert("Bạn không có quyền truy cập vào trang này.");
                window.location.href = `/tra-cuu/${username}`;
            } else {
                // Xác thực thành công, tải dữ liệu lần đầu với bộ lọc mặc định, trang 1
                fetchData(defaultFilters, 1);
            }
        } catch (error) {
            console.error("Lỗi giải mã token:", error);
            alert("Token không hợp lệ, vui lòng đăng nhập lại.");
            window.location.href = `/login`;
        }
    }, [DoctorID, fetchData]);

    // Hàm xử lý khi nhấn nút "Lọc"
    const handleSearch = () => {
        fetchData(formData, 1);
    }

    // Hàm xử lý khi nhấn nút "Làm mới"
    const handleReset = () => {
        setFormData(defaultFilters); // 1. Reset state của form
        fetchData(defaultFilters, 1);
    }

    // --- Logic phân trang ---
    const handleClickPage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) {
            return; // Không làm gì nếu trang không hợp lệ hoặc là trang hiện tại
        }
        setExpandedRow(null);
        fetchData(formData, pageNumber); // Tải dữ liệu cho trang mới với bộ lọc hiện tại
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
        // Đảm bảo startPage không nhỏ hơn 1
        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(3, totalPages);
        }
        // Đảm bảo endPage không lớn hơn totalPages
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, totalPages - 2);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <div className="overflow-x-auto p-4 bg-mint">
            <div className="flex flex-col items-center justify-center gap-4 py-6">
                <h1 className="text-2xl font-bold text-primary text-center">
                    Tra cứu kết quả xét nghiệm
                </h1>
            </div>


            <div className="grid gap-4 grid-cols-2 mb-6 sm:max-w-2/3 mx-auto px-4">
                <div className="flex flex-col gap-2">
                    <label className="text-primary font-semibold">Từ ngày:</label>
                    <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-primary font-semibold">Đến ngày:</label>
                    <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="sm:max-w-2/3 mx-auto mb-6 px-4">
                <label className="text-primary font-semibold">
                    Tìm kiếm theo tên hoặc mã khách hàng:
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <input
                        type="text"
                        name="search"
                        value={formData.search}
                        onChange={handleChange}
                        placeholder="Nhập tên hoặc mã khách hàng..."
                        className="flex-1 bg-gray-50 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={isLoading} // Vô hiệu hóa khi đang tải
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Đang lọc..." : "Lọc"}
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isLoading} // Vô hiệu hóa khi đang tải
                        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Làm mới
                    </button>
                </div>
            </div>

            {/* Hiển thị Loading */}
            {isLoading && (
                <div className="flex justify-center items-center h-40">
                    <p>Đang tải dữ liệu...</p>
                    {/* <LoadingSpinner /> */}
                </div>
            )}

            {/* Hiển thị dữ liệu khi không loading */}
            {!isLoading && (
                <>
                    <div className='max-w-2/3 mx-auto'>
                        <TableUsers itemsPerPage={itemsPerPage} currentPage={currentPage} expandedRow={expandedRow} users={users} />
                    </div>
                    <ListUsersMobile users={users} />

                    {users.length > 0 ? (
                        totalPages > 1 && expandedRow === null && (
                            <div className="flex flex-col items-center justify-center py-8 px-4">
                                <div className="flex gap-2">
                                    <button onClick={() => handleClickPage(1)} disabled={currentPage === 1}
                                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                                        <MdFirstPage />
                                    </button>
                                    <button onClick={() => handleClickPage(currentPage - 1)} disabled={currentPage === 1}
                                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                                        <GrFormPrevious />
                                    </button>

                                    {getPaginationItems()[0] > 1 && (
                                        <span className="w-10 h-10 flex items-center justify-center">...</span>
                                    )}

                                    {getPaginationItems().map((page) => (
                                        <button key={page} onClick={() => handleClickPage(page)}
                                            className={`w-10 h-10 border rounded-full flex items-center justify-center transition 
                                        ${page === currentPage ? "bg-midnight text-white border-primary" : "border-primary hover:bg-central hover:text-white"}`}>
                                            {page}
                                        </button>
                                    ))}

                                    {getPaginationItems()[getPaginationItems().length - 1] < totalPages && (
                                        <span className="w-10 h-10 flex items-center justify-center">...</span>
                                    )}

                                    <button onClick={() => handleClickPage(currentPage + 1)} disabled={currentPage === totalPages}
                                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full transition 
                                    ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                                        <GrFormNext />
                                    </button>
                                    <button onClick={() => handleClickPage(totalPages)} disabled={currentPage === totalPages}
                                        className={`w-10 h-10 border border-primary flex items-center justify-center rounded-full transition 
                                    ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-central hover:text-white"}`}>
                                        <MdLastPage />
                                    </button>
                                </div>
                                <div className="mt-4 text-sm text-gray-600">
                                    Trang {currentPage} / {totalPages} (Tổng số: {totalCount} bệnh nhân từ ngày {formData.fromDate} đến {formData.toDate})
                                </div>
                            </div>
                        )
                    ) : (
                        // Thông báo khi không có dữ liệu
                        <div className="text-center py-10 text-gray-500">
                            <p>Không tìm thấy bệnh nhân nào phù hợp.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}