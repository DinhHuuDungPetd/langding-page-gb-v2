"use client";
import React from 'react';
export default function TableUsers({ itemsPerPage, currentPage, expandedRow, users }) {

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };

    return (
        <div className="overflow-x-auto bg-mint px-2">
            <div className="relative">
                <table
                    className="min-w-full text-sm text-left border border-red-400 shadow-lg rounded-lg overflow-hidden bg-white hidden sm:table"
                >
                    <thead className="bg-primary text-white font-medium">
                        <tr>
                            <th className="p-3 text-center">STT</th>
                            <th className="p-3 text-center">Mã</th>
                            <th className="p-3 text-center">Tên</th>
                            <th className="p-3 text-center">SĐT</th>
                            <th className="p-3 text-center">Thời gian</th>
                            <th className="p-3 text-center">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(expandedRow !== null ? [users[expandedRow]] : users).map((item, index) => {
                            const actualIndex = expandedRow !== null ? expandedRow : index;

                            return (
                                <React.Fragment key={actualIndex}>
                                    <tr className="hover:bg-green-100 border-b border-gray-200 transition-colors">
                                        <td className="px-3 py-4 text-center">
                                            {index + 1 + (currentPage - 1) * itemsPerPage}
                                        </td>
                                        <td className="px-3 py-4 text-center">{item.sid || ""}</td>
                                        <td className="px-3 py-4 text-center">{item.patientName || ""}</td>
                                        <td className="px-3 py-4 text-center">{item.phone || ""}</td>
                                        <td className="px-3 py-4 text-center">
                                            {formatDate(item.dateIn || "")}
                                        </td>
                                        <td className="px-3 py-4 text-center">
                                            <a
                                                href={`/tra-cuu/${String(item.id).padStart(5, "0")}/${item.sid}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline hover:text-blue-700"
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

                {/* Hình nền mờ phía sau */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-[length:500px_500px] opacity-10 pointer-events-none z-0"
                    style={{
                        backgroundImage:
                            "url('https://res.cloudinary.com/dgfwxibj4/image/upload/v1747380669/backgroundPC/lilroenrmomopl3a8qsp.png')",
                    }}
                ></div>
            </div>
        </div>
    );

}
