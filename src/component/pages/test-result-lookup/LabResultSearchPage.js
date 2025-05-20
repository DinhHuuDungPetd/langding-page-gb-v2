"use client";
import React, { useState, useEffect } from 'react';
import ListUsersMobile from './component/ListUsersMobile';
import TableUsers from './component/TableUsers';
import axios from 'axios';
import { MdFirstPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
export default function LabResultSearchPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [expandedRow, setExpandedRow] = useState(null);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get(`${baseUrl}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const toggleExpand = (index) => {
        setExpandedRow(prev => (prev === index ? null : index));
    };
    const sortedNews = [...users].sort((a, b) => a?.time?.localeCompare(b?.time));
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
            <div className='max-w-2/3 mx-auto'>
                <TableUsers expandedRow={expandedRow} toggleExpand={toggleExpand} users={currentItems} />
            </div>
            <ListUsersMobile expandedRow={expandedRow} toggleExpand={toggleExpand} users={currentItems} />
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
        </div>
    );
}
