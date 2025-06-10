"use client";
import React, { useState, useEffect } from 'react';
import ListUsersMobile from '@/component/pages/test-result-lookup/component/ListUsersMobile';
import TableUsers from '@/component/pages/test-result-lookup/component/TableUsers';
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import ChangePassword from '@/component/pages/test-result-lookup/component/ChangePassword';
import Link from 'next/link'
import { jwtDecode } from "jwt-decode";

export default function LabPatientSearchPage({ params }) {

    const { slug } = params;
    const DoctorID = slug;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 70;
    const [expandedRow, setExpandedRow] = useState(null);
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        search: "",
        fromDate: "",
        toDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const getPatient = async () => {
        try {

            const response = await dataTestAPI.get(`api/v1/Patient?ID=${DoctorID}&FromTime=${formData.fromDate}&ToTime=${formData.toDate}&SearchInfo=${formData.search}`);
            if (response.status == 200) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }

    }
    useEffect(() => {
        getPatient();

    }, [formData]);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        setToken(accessToken);
        const decoded = jwtDecode(accessToken);
        const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        if (username !== DoctorID) {
            alert("Bạn không có quyền truy cập vào trang này.");
            window.location.href = `/tra-cuu/${username}`;
        }
    }, []);

    const toggleExpand = (index) => {
        setExpandedRow(prev => (prev === index ? null : index));
    };
    const sortedNews = Array.isArray(users) ? [...users].sort((a, b) => a?.time?.localeCompare(b?.time)) : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedNews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedNews.length / itemsPerPage);

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

                <ChangePassword />

                <Link
                    href="/logout"
                    className="text-red-600 hover:text-red-800 font-medium underline transition-colors duration-150"
                >
                    Logout
                </Link>
            </div>



            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6 max-w-2/3 mx-auto">
                <div className="flex flex-col gap-2">
                    <label className="text-primary font-semibold">
                        Từ ngày:
                    </label>
                    <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-primary font-semibold">
                        Đến ngày:
                    </label>
                    <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>
            <div className="max-w-2/3 mx-auto mb-6">
                <div className="flex flex-col gap-2">
                    <label className="text-primary font-semibold">
                        Tìm kiếm:
                    </label>
                    <input
                        type="text"
                        name="search"
                        value={formData.search}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            <div className='max-w-2/3 mx-auto'>
                <TableUsers Token={token} itemsPerPage={itemsPerPage} currentPage={currentPage} expandedRow={expandedRow} toggleExpand={toggleExpand} users={currentItems} />
            </div>
            <ListUsersMobile Token={token} itemsPerPage={itemsPerPage} currentPage={currentPage} expandedRow={expandedRow} toggleExpand={toggleExpand} users={currentItems} />
            {expandedRow === null && (
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
            )}
        </div>
    );
}
