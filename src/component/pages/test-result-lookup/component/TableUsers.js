"use client";
import React, { useState } from 'react';
import TestResultsTable from './TestResultsTable';
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
                                    <button className="text-blue-500" onClick={() => toggleExpand(actualIndex)}>
                                        {expandedRow === actualIndex ? "Ẩn" : "Chi tiết"}
                                    </button>
                                </td>
                            </tr>
                            {expandedRow === actualIndex ?
                                <tr>
                                    <td className="p-2">-</td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Giới tính:</span> {item.sex || "-"}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Năm sinh:</span> {item.age || "-"}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Trạng thái:</span> {item.status || "-"}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>SEQ:</span> {item.seq || "-"}</div></td>
                                    <td className="p-2 text-center">-</td>
                                </tr>
                                : ""}

                            {expandedRow === actualIndex && (
                                <tr className="border-t bg-mint">
                                    <td colSpan={6}>
                                        <div className="w-full flex justify-center">
                                            <div className="w-full max-w-screen-lg">

                                                <div className="my-5 mx-6">
                                                    <TestResultsTable Token={Token} sid={item.sid} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })}
            </tbody>

        </table>
    );
}
