"use client";
import React, { useState, useEffect } from 'react';
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

// Hàm lấy 10 ngày gần nhất
const getDefaultDateRange = () => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 9); // 9 ngày trước + hôm nay = 10 ngày

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
    const itemsPerPage = 70;
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
     */
    const fetchData = async (filters) => {
        const { fromDate, toDate, search } = filters;

        // --- 1. VALIDATION DỮ LIỆU ---
        if (!fromDate || !toDate) {
            alert("Vui lòng chọn cả 'Từ ngày' và 'Đến ngày'.");
            return;
        }

        const dFrom = new Date(fromDate);
        const dTo = new Date(toDate);

        // So sánh ngày (bỏ qua giờ)
        dFrom.setHours(0, 0, 0, 0);
        dTo.setHours(0, 0, 0, 0);

        if (dTo < dFrom) {
            alert("'Đến ngày' không được nhỏ hơn 'Từ ngày'. Vui lòng chọn lại.");
            return;
        }

        // --- 2. GỌI API ---
        setIsLoading(true);
        try {
            const trimmedSearch = search.trim(); // "Validation" tìm kiếm
            const response = await dataTestAPI.get(`api/v1/Patient?ID=${DoctorID}&FromTime=${fromDate}&ToTime=${toDate}&SearchInfo=${trimmedSearch}`);

            if (response.status == 200) {
                setUsers(response.data.data || []);
                setCurrentPage(1); // Reset về trang 1
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Xóa dữ liệu cũ nếu lỗi
        } finally {
            setIsLoading(false);
        }
    }

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
                // Xác thực thành công, tải dữ liệu lần đầu với bộ lọc mặc định
                fetchData(defaultFilters);
            }
        } catch (error) {
            console.error("Lỗi giải mã token:", error);
            alert("Token không hợp lệ, vui lòng đăng nhập lại.");
            window.location.href = `/login`;
        }
    }, [DoctorID]); // Chỉ chạy lại nếu DoctorID thay đổi

    // Hàm xử lý khi nhấn nút "Lọc"
    const handleSearch = () => {
        fetchData(formData); // Gọi API với state hiện tại của form
    }

    // Hàm xử lý khi nhấn nút "Làm mới"
    const handleReset = () => {
        setFormData(defaultFilters); // 1. Reset state của form
        fetchData(defaultFilters);  // 2. Tải lại dữ liệu với bộ lọc mặc định
    }

    // --- Logic phân trang ---
    const displayUsers = Array.isArray(users) ? users : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = displayUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(displayUsers.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
        setExpandedRow(null);
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
        <div className="overflow-x-auto p-4">
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
                        <TableUsers itemsPerPage={itemsPerPage} currentPage={currentPage} expandedRow={expandedRow} users={currentItems} />
                    </div>
                    <ListUsersMobile users={currentItems} />

                    {/* Xử lý hiển thị phân trang hoặc thông báo "Không có dữ liệu" */}
                    {displayUsers.length > 0 ? (
                        totalPages > 1 && expandedRow === null && (
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