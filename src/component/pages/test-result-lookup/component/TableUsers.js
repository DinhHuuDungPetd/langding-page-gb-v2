"use client";
import React from 'react';
export default function TableUsers({ Token, itemsPerPage, currentPage, expandedRow, toggleExpand, users }) {

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };

    return (
        <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-lg overflow-hidden hidden sm:table ">
            <thead className="bg-primary text-white font-medium ">
                <tr>
                    <th className="p-2">STT</th>
                    <th className="p-2 text-center">Mã</th>
                    <th className="p-2 text-center">Tên</th>
                    <th className="p-2 text-center">SĐT</th>
                    <th className="p-2 text-center">Thời gian</th>
                    <th className="p-2 text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {(expandedRow !== null ? [users[expandedRow]] : users).map((item, index) => {
                    const actualIndex = expandedRow !== null ? expandedRow : index;

                    return (
                        <React.Fragment key={actualIndex}>
                            <tr className={`border-t hover:bg-gray-50`}>
                                <td className="p-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td className="p-2 text-center">{item.sid || "-"}</td>
                                <td className="p-2 text-center">{item.patientName || "-"}</td>
                                <td className="p-2 text-center">{item.phone || "-"}</td>
                                <td className="p-2 text-center">{formatDate(item.dateIn || "-")}</td>
                                <td className="p-2 text-center">
                                    <a
                                        href={`/tra-cuu/${String(item.id).padStart(5, "0")}/${item.sid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Chi tiết
                                    </a>
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                })}
            </tbody>

        </table>
    );
}
